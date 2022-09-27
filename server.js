if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const { EXEC_MODE, PORT, SESSION_SECRET, TIEMPO_EXPIRACION } = require("./src/config/globals");
const { logger } = require("./src/utils/logger")
const express = require("express");
const app = express();
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const { authRouter, checkNotAuth, checkAuthOK } = require('./src/routes/AuthRoutes');
const productRouter = require('./src/routes/ProductRoutes');
const cartRouter = require('./src/routes/CartRoutes');
const chatRouter = require('./src/routes/ChatRoutes');
const chatController = require('./src/controllers/chat')
const session = require('express-session');
const flash = require('express-flash');
const { authPassport } = require('./src/config/passport-config');
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, { parser: require("socket.io-msgpack-parser") });

const workerInit = () => {
  let server = httpServer.listen(PORT, (err) => {
    if (!err)
      logger.info(
        `Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`
      );
  });
  server.on("error", (error) => logger.error(`Error en el servidor ${error}`));
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(__dirname + '/public'))
app.use(flash());

const sessionMiddleware = session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    secure: false,
    maxAge: parseInt(TIEMPO_EXPIRACION)
  },
})

app.use(sessionMiddleware);

app.use(authPassport.initialize());
app.use(authPassport.session());

app.set('view engine', 'ejs');
app.set('views', './src/views')

app.use("/auth", authRouter);
app.use("/products", checkAuthOK, productRouter);
app.use("/cart", checkAuthOK, cartRouter);
app.use("/chat", checkAuthOK, chatRouter);

app.get("/", checkNotAuth, (req, res) => {
  res.render('index', {});
})

app.get("/auth/*", checkAuthOK, (req, res) => {
  res.status(404).render("loggedin", { user: req.user, displayPage: 'error404' });
});
app.get("*", checkAuthOK, (req, res) => {
  res.status(404).render("loggedin", { user: req.user, displayPage: 'error404' });
});

io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

io.on("connection", async (socket) => {
  const session = socket.request.session;
  session.connections++;
  session.save();

  try {
    console.log(socket.id)
    const msgs = await chatController.getMessages()
    socket.emit("msgs", msgs);
  } catch (error) {
    console.log(error);
    throw error;
  }

  socket.on("new-message", async (data) => {
    await chatController.insertNewMessage(data);
    io.sockets.emit('msgs', await chatController.getMessages());
  });

});

app.use((req, res, next, error) => {
  logger.error(req.error || res.error || error);
});


if (cluster.isMaster) {

  logger.info(`PID MASTER ${process.pid}`);
  if (EXEC_MODE === "CLUSTER") {
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  } else if (EXEC_MODE === "FORK") {
    cluster.fork();
  } else {
    logger.error(`INCORRECT EXEC_MODE: ${EXEC_MODE}`);
  }

  cluster.on("exit", (worker) => {
    logger.error(
      "Worker ",
      worker.process.pid,
      " died",
      new Date().toLocaleString()
    );
    cluster.fork();
  });
} else {
  workerInit()
}
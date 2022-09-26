if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const { EXEC_MODE, PORT, SESSION_SECRET } = require("./src/config/globals");
const { logger } = require("./src/utils/logger")
const express = require("express");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const productRouter = require('./src/routes/ProductRoutes');
const { authRouter, checkNotAuth, checkAuthOK } = require('./src/routes/AuthRoutes');
const cartRouter = require('./src/routes/CartRoutes');
const io = require('./src/config/socketio');
// const chatRouter = require('./src/routes/ChatRoutes');
const session = require('express-session');
const flash = require('express-flash');
const { authPassport } = require('./src/config/passport-config');
const { Server: HttpServer } = require('http');
// const { Server:IOServer } = require('socket.io');
const compression = require('compression');
const app = express();
const httpServer = new HttpServer(app);

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
app.use(compression())
app.use('/static', express.static(__dirname + '/public'))
app.use(flash());
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(authPassport.initialize());
app.use(authPassport.session());

io(httpServer, authPassport); //io wrapper

app.set('view engine', 'ejs');
app.set('views', './src/views')

app.use("/auth", authRouter);
app.use("/products", checkAuthOK, productRouter);
app.use("/cart", checkAuthOK, cartRouter);
app.use("/chat", checkAuthOK, chatRouter);

app.get("/", checkNotAuth, (req, res) => {
  res.render('index', {});
})
app.get("*", (req, res) => {
  res.status(404).send("404 Not found :( ");
});

app.use((req, res, next, error) => {
  logger.error(req.errors);
  logger.error(error);
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

module.exports = { app };
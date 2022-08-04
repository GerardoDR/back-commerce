if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}
const express = require("express");
const productRouter = require ('./src/routes/ProductRoutes');
const {authRouter, checkNotAuth, checkAuthOK } = require('./src/routes/AuthRoutes');
const cartRouter = require ('./src/routes/CartRoutes');
const session = require('express-session');
const flash = require('express-flash');
// const cookieParser = require('cookie-parser');
const {authPassport} = require('./src/config/passport-config');

const PORT = process.env.PORT || 8080;
const app = express();

// app.use(cookieParser());
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(__dirname + '/public'))
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(authPassport.initialize());
app.use(authPassport.session());

app.set('view engine', 'ejs' );
app.set('views', './src/views')

app.use("/auth", authRouter);
app.use("/products", checkAuthOK, productRouter);
app.use("/cart", checkAuthOK, cartRouter);

app.get("/", checkNotAuth, (req, res) => {
  res.render('index', {});
})
app.get("*", (req, res) => {
  res.status(404).send("404 Not found :( ");
});

app.listen(8080, () => {
  console.log(`Server on port http://localhost:${PORT}`);
});
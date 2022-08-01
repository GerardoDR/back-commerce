if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}
const express = require("express");
const productRouter = require ('./src/routes/ProductRoutes');
const {authRouter, checkAuthentication} = require('./src/routes/AuthRoutes');
// const cartRouter = require ('./src/routes/CartRoutes');
const session = require('express-session');
const flash = require('express-flash');
const {authPassport} = require('./src/config/passport-config');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))
app.use(authPassport.initialize());
app.use(authPassport.session());

app.set('view engine', 'ejs' );
app.set('views', './src/views')

app.use("/auth", authRouter);
app.use("/products", productRouter);
// app.use("/carts", cartRouter);

app.get("/", checkAuthentication, (req, res) => {
  res.render('index', {});
})
app.get("*", (req, res) => {
  res.status(404).send("Not found");
});

app.listen(8080, () => {
  console.log(`Server on port http://localhost:${PORT}`);
});
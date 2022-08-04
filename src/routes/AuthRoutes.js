const { Router } = require("express");
const { authPassport } = require("../config/passport-config");
const authRouter = Router();
const upload = require("../utils/multer");
const {transporter, defaultMailOptions} = require("../utils/transporter");


authRouter.get("/login", checkNotAuth, async (req, res) => {
  try {
    res.render("login", {});
  } catch (e) {
    throw new Error(e);
  }
});

authRouter.post(
  "/login", checkNotAuth,
  authPassport.authenticate("login", {
    failureRedirect: "/auth/login",
    failureFlash: true,
  }),
  async (req, res) => {
    try {
      res.redirect("/auth/profile");
    } catch (e) {
      throw new Error(e);
    }
  }
);

authRouter.get("/register", checkNotAuth, async (req, res) => {
  try {
    res.status(200).render("register", {});
  } catch (e) {
    throw new Error(e);
  }
});

authRouter.post(
  "/register", upload.single('avatar'), authPassport.authenticate("signup", {
    failureRedirect: "/auth/register",
    failureFlash: true,
  }),
  async (req, res) => {
    try {
      let mailOptions = {...defaultMailOptions}
      mailOptions.html=`
      <h1 style="color: blue;">NUEVO USUARIO CREADO ${req.user.email}</h1>
      <span style="color: green;">${req.user.name}</span>
      <span style="color: green;">${req.user.lastname}</span>
      <span style="color: green;">${req.user.address}</span>
      <span style="color: green;">${req.user.age}</span>
      <span style="color: green;">${req.user.avatar}</span>
      <span style="color: green;">${req.user.phone}</span>
      <span style="color: green;">${req.user.date.toString()}</span>`;
      await transporter.sendMail(mailOptions)
      res.status(200).redirect('/auth/login');
    } catch (e) {
      throw new Error(e);
    }
  }
);

authRouter.get("/profile", (req, res) => {
  req.isAuthenticated()
  ? res.render("loggedin", { user: req.user, displayPage: 'profile' })
  : res.render("index", {});
});

authRouter.post("/logout", async (req, res) => {
  try {
    req.logout(async (err) => {
      if (err) { return next(err); }
      res.redirect('/')
    });
  } catch (e) {
    throw new Error(e);
  }
});

function checkAuthOK(req, res, next) {
  if (req.isAuthenticated()) {
      next();
  } else {
      res.redirect("/");
  }
}

function checkNotAuth (req, res, next) {
  if (!req.isAuthenticated()) {
    next();
} else {
    res.redirect("/auth/profile");
}
}

module.exports = {authRouter, checkNotAuth, checkAuthOK };

const { Router } = require("express");
const { authPassport } = require("../config/passport-config");
const authRouter = Router();

authRouter.get("/login", checkNotAuth, async (req, res) => {
  try {
    res.render("login", {});
  } catch (e) {
    throw new Error(e);
  }
});

authRouter.post(
  "/login",
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
  "/register",
  authPassport.authenticate("signup", {
    failureRedirect: "/auth/register",
    failureFlash: true,
  }),
  async (req, res) => {
    try {
      res.status(200).redirect('/auth/login');
    } catch (e) {
      throw new Error(e);
    }
  }
);

authRouter.get("/profile", (req, res) => {
  req.isAuthenticated()
  ? res.render("profile", { user: req.user.name })
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

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
      next();
  } else {
      res.redirect("/auth/login");
  }
}

function checkNotAuth (req, res, next) {
  if (!req.isAuthenticated()) {
    next();
} else {
    res.redirect("/auth/profile");
}
}

module.exports = {authRouter, checkAuthentication};

const { Router } = require("express");

const authRouter = Router();

const login = "/login";
const logout = "/logout";
const register = "/register";

authRouter.get("", async (req, res) => {
  try {
    res.status(200).render("index", { login, register, logout });
  } catch (e) {
    throw new Error(e);
  }
});

authRouter.get("/login", async (req, res) => {
  try {
    res.status(200).render("login", { login, register });
  } catch (e) {
    throw new Error(e);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    res.status(200).json({ message: "user logged in" });
  } catch (e) {
    throw new Error(e);
  }
});

authRouter.post("/register", async (req, res) => {
  try {
    res.status(200).render("register", {});
  } catch (e) {
    throw new Error(e);
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res.status(200).json({ message: "logout message" });
  } catch (e) {
    throw new Error(e);
  }
});

authRouter.all("*", async (req, res) => {
  try {
    res.status(404).json({ message: "route not existent" });
  } catch (e) {
    throw new Error(e);
  }
});

module.exports = authRouter;

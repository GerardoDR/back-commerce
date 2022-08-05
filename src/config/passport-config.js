const LocalStrategy = require("passport-local").Strategy;
const { validatePass, createHash } = require("../utils/bcrypt");
const UserModel = require("../models/usuarios");
const authPassport = require("passport");
const { logger } = require("../utils/logger");

authPassport.use(
  "login",
  new LocalStrategy({ usernameField: "email" }, (email, password, callback) => {
    UserModel.findOne({ email }, (err, user) => {
      if (err) {
        return callback(err);
      }

      if (!user) {
        return callback(null, false, {
          message: "usuario o contraseña incorrectos",
        });
      }

      if (!validatePass(user, password)) {
        return callback(null, false, {
          message: "usuario o contraseña incorrectos",
        });
      }

      return callback(null, user);
    });
  })
);

authPassport.use(
  "signup",
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    (req, email, password, callback) => {
      UserModel.findOne({ email }, (err, user) => {
        if (err) {
          logger.warn("Error al registrarse");
          return callback(err);
        }

        if (user) {
          logger.warn("El usuario ya existe");
          return callback(null, false, {
            message: "El usuario ya existe",
          });
        }

        let newUser = {};
        let params = {
          email: email,
          password: createHash(password),
        };

        for (field in req.body) {
          if (req.body[field] === "" || false) {
            continue;
          }
          newUser[field] = params[field] || req.body[field];
        }

        if (req.file) {
          newUser[req.file.fieldname] = "/static/avatars/" + req.file.filename;
        }

        logger.info(newUser);

        UserModel.create(newUser, (err, userWithId) => {
          if (err) {
            logger.warn("Error al registrarse");
            return callback(err);
          }
          logger.info("Usuario creado");

          return callback(null, userWithId);
        });
      });
    }
  )
);

authPassport.serializeUser((user, callback) => {
  callback(null, user._id);
});

authPassport.deserializeUser((id, callback) => {
  UserModel.findById(id, callback);
});

module.exports = { authPassport };

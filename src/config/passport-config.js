const LocalStrategy = require("passport-local").Strategy;
const { validatePass, createHash } = require("../utils/bcrypt");
const UserModel = require("../models/usuarios");
const authPassport = require("passport");

authPassport.use(
  "login",
  new LocalStrategy({usernameField:'email'},(email, password, callback) => {
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
    { usernameField:'email', passReqToCallback: true },
    (req, email, password, callback) => {
      UserModel.findOne({ email }, (err, user) => {
        if (err) {
          console.log("Hay un error al registrarse");
          return callback(err);
        }

        if (user) {
          console.log("El usuario ya existe");
          return callback(null, false);
        }

        const newUser = {
          email: email,
          password: createHash(password),
          name: req.body.name,
          lastname: req.body.lastname,
          address: req.body.address,
          age: req.body.age,
        };

        UserModel.create(newUser, (err, userWithId) => {
          if (err) {
            console.log("Hay un error al registrarse");
            return callback(err);
          }
          console.log("Registro de usuario satisfactoria");

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

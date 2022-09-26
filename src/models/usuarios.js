const mongoose = require("mongoose");
const { MONGO_URI } = require("../config/globals");
const { logger } = require("../utils/logger")

mongoose.connect(
  MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => logger.info("Connected")
);

const usersCollection = "users";

const UsersSchema = new mongoose.Schema({
  email: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
  name: { type: String, default: "unnamed", required: true, max: 100 },
  lastname: { type: String, default: "nosurname", required: true, max: 100 },
  admin: { type: Boolean, default: false},
  avatar: {
    type: String,
    default: "http://fakeimg.pl/160?text=avatar&font=lobster",
    required: true,
    max: 500,
  },
  phone: {
    type: Number,
    defaul: 0000000001,
    required: true,
    max: 9999999999999,
  },
  date: { type: Date, default: Date.now, required: true },
});
const users = mongoose.model(usersCollection, UsersSchema);
module.exports = users;

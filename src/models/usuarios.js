const mongoose = require("mongoose");
const { MONGO_URI } = require("../config/globals");

mongoose.connect(
  MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected")
);

const usersCollection = "users";

const UsersSchema = new mongoose.Schema({
  email: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
  name: { type: String, default:'foo', max: 100 },
  lastname: { type: String, default: 'bar', max: 100 },
  address: { type: String, default:'unknown', max: 100 },
  age: { type: Number, default:'unknown', max: 100 },
  avatar: {
    type: String,
    default: "http://fakeimg.pl/160?text=avatar&font=lobster",
    max: 100,
  },
  date: { type: Date, default: Date.now() },
});
const users = mongoose.model(usersCollection, UsersSchema);
module.exports = users;

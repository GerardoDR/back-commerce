const mongoose = require('mongoose');
const { MONGO_URI } = require('../config/globals')

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  }, () => console.log('Connected'))

const usersCollection = 'users';

const UsersSchema = new mongoose.Schema({
    firstName: {type: String, required: true, max: 100},
    lastName: {type: String, required: true, max: 100},
    email: {type: String, required: true, max: 100},
    username: {type: String, required: true, max: 100},
    password: {type: String, required: true, max: 100},
    date: {type: Date, default: Date.now()},
})
const users = mongoose.model(usersCollection, UsersSchema)
module.exports = users;
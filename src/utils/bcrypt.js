const bcrypt = require('bcrypt');

function validatePass(user, password) {
    return bcrypt.compareSync(password, user.password)
}

function createHash(password) {
    return bcrypt.hashSync(
        password,
        bcrypt.genSaltSync(10),
        null
    )
}
module.exports = {validatePass, createHash}
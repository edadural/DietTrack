//PasswordExtension.js
const bcrypt = require('bcrypt');
require('dotenv').config();

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function comparePassword(pass1, pass2) {
    return await bcrypt.compare(pass1, pass2);
}

module.exports = {
    hashPassword,
    comparePassword,
};
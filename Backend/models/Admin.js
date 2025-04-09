const mongoose = require('mongoose');
const User = require('./User');

// On utilise le même schéma que User pour Admin
const Admin = mongoose.model('Admin', User.schema);
module.exports = Admin;

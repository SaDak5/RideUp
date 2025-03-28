const mongoose = require('mongoose');
const User = require('./User');  


const AdminSchema = new mongoose.Schema({
  localisation: {
    type: String,  
    required: true
  }
});


AdminSchema.add(User.schema);

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;

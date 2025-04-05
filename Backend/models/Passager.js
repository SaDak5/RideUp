const mongoose = require('mongoose');
const User = require('./User');  


const PassagerSchema = new mongoose.Schema({
  localisation: {
    type: String,  
    required: true
  }
});


PassagerSchema.add(User.schema);

const Passager = mongoose.model('Passager', PassagerSchema);
module.exports = Passager;

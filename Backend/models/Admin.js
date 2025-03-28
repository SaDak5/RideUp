const mongoose = require('mongoose');
const User = require('./User');  

// Définir le schéma Admin avec un champ spécifique 'adressse' et 'numTelephone'
const AdminSchema = new mongoose.Schema({
    adresse: {
    type: String,  
    required: true
    },
    numTelephone: {
        type: Number, 
        required: true
        }
});


AdminSchema.add(User.schema);

const Admin= mongoose.model('Admin', AdminSchema);
module.exports = Admin;

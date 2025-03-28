const mongoose = require('mongoose');
const User = require('./User');  

// Définir le schéma Conducteur avec un champ spécifique 'typeVehicule'
const ConducteurSchema = new mongoose.Schema({
    typeVehicule: {
    type: String,  // Attribut supplémentaire pour le type de véhicule
    required: true
    }
});


ConducteurSchema.add(User.schema);

const Conducteur = mongoose.model('Conducteur', ConducteurSchema);
module.exports = Conducteur;

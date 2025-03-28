const mongoose = require('mongoose');
// Définir le schéma utilisateur
const UserSchema = new mongoose.Schema({ //hdhi toslo7 bch nstaamlou required , unique (bch données tebda mnadhma w maysirich confusion)
username: {type: String,
required: true,
},
email: {
type: String,
required: true,
unique: true, 
},
password: {
type: String,
required: true,
},
role: {
type: String,
}
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
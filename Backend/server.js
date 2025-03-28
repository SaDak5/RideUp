//appel des packages installées
const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");


const app = express();//Pour dire que votre application utilise express
app.use(express.json());//Analyser les corps des requêtes HTTP contenant des données au format JSON
app.use(cors());//permettre le partage de ressources entre différentes origines (domaines, protocoles, ou ports).

const mongo_url = config.get("mongo_url");
mongoose.set('strictQuery', true);
mongoose.connect(mongo_url).then(() => console.log("MongoDB connected..."))
.catch((err) => console.log(err));

const port = process.env.PORT || 3001;//démarrer le serveur Express et définir sur quel port il doit écouter les requêtes entrantes.
app.listen(port, () => console.log(`Server running on port ${port}`));

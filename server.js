//Importation des modules utilisés
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

//Prise en charge du protocole CORS
var corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

// Parse et 'traite' le contenu des requêtes de type application/json
app.use(express.json());

// Parse et 'traite' le contenu des requêtes de type application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//Connexion à la bdd
const db = require("./models");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successful connection to the db !");
  })
  .catch((err) => {
    console.log("Cannot connect to the db !", err);
    process.exit();
  });

//Route principale du site
app.get("/", (req, res) => {
  //Permet d'afficher correctement les accents
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  //Phrase affichée si le serveur est bien fonctionnel et lancé
  res.write(
    "Vous êtes à la racine du Projet de plateforme d'e-commerce crée par le groupe composé de Léa HAMADOUCHE, Adrian SOREAU et Victorien MOYRET - E4 WMD A !"
  );
  res.send();
});

//Création du serveur web et écoute des requêtes
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//Importation des modules utilisés
require("dotenv").config();
const dbUrl = process.env.URI;
const mongoose = require("mongoose");

//Déclaration globale de mongoose
mongoose.Promise = global.Promise;

//Initialisation de la bdd
const db = {};
db.mongoose = mongoose;
db.url = dbUrl;
db.users = require("./user.model")(mongoose);
db.roles = require("./role.model")(mongoose);

//Définition des rôles
db.ROLES = ["user", "admin"];

module.exports = db;

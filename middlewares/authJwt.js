//Importation des modules utlisés
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.users;
const Role = db.roles;

//Vérification de validité du token d'authentification
exports.verifyToken = (req, res, next) => {
  //Définition de l'en-tête recevant le token
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send("No token provided !");
  }
  //Décodage du token pour en récupérer ses informations
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send(
          "Unauthorized ! Token is invalid or expired, please check the integrity of the token or re login."
        );
    }
    req.userId = decoded.id;
    next();
  });
};

//Vérification du rôle d'administrateur
exports.isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send(err.message);
          return;
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
        res.status(403).send("Admin role required !");
        return;
      }
    );
  });
};

//Vérification de la présence d'un rôle admin ou d'un client
exports.isRole = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send(err.message);
          return;
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin" || "user") {
            next();
            return;
          }
        }
        res.status(403).send("Admin role required !");
        return;
      }
    );
  });
};

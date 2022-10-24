//Importation des modules utilisés
const db = require("../models");
const User = db.users;
var bcrypt = require("bcryptjs");

/*------------ AFFICHAGE ------------*/

//Affichage de tous les utilisateurs
exports.getAll = (req, res) => {
  User.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err.message || "Error while finding all users ...");
    });
};

//Affichage d'un utilisateur en fonction de son id
exports.getById = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send(
            `Cannot retrieve user with id: ${id}, you must verify the id !`
          );
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message || "Error while finding user ...");
    });
};

/*------------ MODIFICATION ------------*/

//Modification d'un utilisateur via son id
exports.updateById = (req, res) => {
  if (!req.body) {
    return res.status(400).send("Cannot update user with empty body");
  }

  const id = req.params.id;
  req.body.password = bcrypt.hashSync(req.body.password, 10);

  User.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send(`Cannot update user with id: ${id}, you must verify the id !`);
      } else res.send("User was successfully updated.");
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          "Error while updating user with the following id: " +
            id +
            ", please check if there is no identical data in the database !"
        );
    });
};

/*------------ SUPPRESSION ------------*/

//Efface un utilisateur en fonction de son id
exports.deleteById = (req, res) => {
  const id = req.params.id;

  User.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send(`Cannot delete user with id: ${id}, you must verify the id !`);
      } else {
        res.send("User was successfully deleted !");
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send("Could not delete user with the following id: " + id);
    });
};

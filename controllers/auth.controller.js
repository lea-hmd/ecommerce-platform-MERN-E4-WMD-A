//Importation des modules utilisés
const config = require("../config/auth.config");
const db = require("../models");
const User = db.users;
const Role = db.roles;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//Création d'un utilisateur
exports.signup = (req, res) => {
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  });
  //Enregistrement dans la bdd
  user.save((err, user) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send(err.message);
            return;
          }
          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send(err.message);
              return;
            }
            res.send({ message: "User was successfully registered !" });
          });
        }
      );
    } else {
      //Si un rôle n'est pas spécifié il sera par défaut un client
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send(err.message);
          return;
        }
        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send(err.message);
            return;
          }
          res.send({ message: "User was successfully registered !" });
        });
      });
    }
  });
};

//Connexion d'un utilisateur
exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send(err.message);
        return;
      }
      if (!user) {
        return res
          .status(404)
          .send("User not found, please verify the informations !");
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid password !",
        });
      }
      //Création d'un token d'authentification
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: "1h",
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE : " + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    });
};

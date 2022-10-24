module.exports = function (app) {
  //Importation des modules utilisés
  const checking = require("../middlewares/verifyRoleSignUp");
  const auth = require("../controllers/auth.controller");
  const authJwt = require("../middlewares/authJwt");
  var router = require("express").Router();

  //Spécification des headers
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  /*------------ AJOUT ------------*/

  //Route de la requête de création d'un utilisateur
  router.post(
    "/auth/signup",
    [authJwt.verifyToken, authJwt.isRole],
    checking.verifyRoleSignUp,
    auth.signup
  );

  //Route de la requête de connexion d'un utilisateur
  router.post("/auth/signin", auth.signin);

  //Route racine de l'api
  app.use("/api", router);
};

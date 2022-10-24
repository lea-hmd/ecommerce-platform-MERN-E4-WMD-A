module.exports = (app) => {
  var router = require("express").Router();
  const authJwt = require("../middlewares/authJwt");
  const users = require("../controllers/users.controller");

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  /*------------ AFFICHAGE ------------*/

  //Route de la requête d'affichage de tous les utilisateurs
  router.get("/users/all", [authJwt.verifyToken, authJwt.isAdmin], users.getAll);

  //Route de la requête d'affichage d'un utilisateur en fonction de son id
  router.get(
    "/users/:id",
    [authJwt.verifyToken, authJwt.isRole],
    users.getById
  );

  /*------------ MODIFICATION ------------*/

  //Route de la requête de modification d'un utilisateur en fonction de son id
  router.put(
    "/users/updateById/:id",
    [authJwt.verifyToken, authJwt.isRole],
    users.updateById
  );

  /*------------ SUPPRESSION ------------*/

  //Route de la requête de suppression d'un utilisateur en fonction de son id
  router.delete(
    "/users/deleteById/:id",
    [authJwt.verifyToken, authJwt.isRole],
    users.deleteById
  );

  //Route racine de l'api
  app.use("/api", router);
};

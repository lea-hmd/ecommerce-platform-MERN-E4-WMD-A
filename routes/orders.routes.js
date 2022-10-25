module.exports = (app) => {
  const order = require('../controllers/orders.controller');
  const authJwt = require('../middlewares/authJwt');
  var router = require('express').Router();

  /*------------ AJOUT ------------*/

  //Route de la requête de création d'un nouveau produit
  router.post(
    '/orders/payment/:userId',
    [authJwt.verifyToken, authJwt.isRole],
    order.payment
  );

  /*------------ AFFICHAGE ------------*/

  //Route de la requête d'affichage de tous les produits
  router.get(
    '/orders/all/:userId',
    [authJwt.verifyToken, authJwt.isRole],
    order.getAllByUser
  );

  //Route racine de l'api
  app.use('/api', router);
};

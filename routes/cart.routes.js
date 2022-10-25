module.exports = (app) => {
  const cart = require('../controllers/cart.controller');
  const authJwt = require('../middlewares/authJwt');
  var router = require('express').Router();

  /*------------ AJOUT ------------*/

  //Route de la requête d'ajout d'un nouveau produit dans le panier
  router.post(
    '/cart/addProduct/:userId',
    [authJwt.verifyToken, authJwt.isRole],
    cart.addProduct
  );

  /*------------ AFFICHAGE ------------*/

  //Route de la requête d'affichage de tous les produits du panier
  router.get(
    '/cart/allProducts/:userId',
    [authJwt.verifyToken, authJwt.isRole],
    cart.getProducts
  );

  /*------------ MODIFICATION ------------*/

  //Route de la requête de modification d'un produit dans le panier via son id
  router.put(
    '/cart/updateProduct/:userId',
    [authJwt.verifyToken, authJwt.isRole],
    cart.updateProduct
  );

  /*------------ SUPPRESSION ------------*/

  //Route de la requête de suppression d'un produit dans le panier en fonction de son id et de celui de l'utilisateur
  router.delete(
    '/cart/deleteProduct/:userId/:pId',
    [authJwt.verifyToken, authJwt.isRole],
    cart.deleteProduct
  );

  //Route racine de l'api
  app.use('/api', router);
};

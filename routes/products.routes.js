module.exports = (app) => {
  const product = require('../controllers/products.controller');
  const authJwt = require('../middlewares/authJwt');
  var router = require('express').Router();

  /*------------ AJOUT ------------*/

  //Route de la requête de création d'un nouveau produit
  router.post(
    '/products/addOne',
    [authJwt.verifyToken, authJwt.isAdmin],
    product.createOne
  );

  //Route de la requête de création de plusieurs produits
  router.post(
    '/products/addMany',
    [authJwt.verifyToken, authJwt.isAdmin],
    product.createMany
  );

  /*------------ AFFICHAGE ------------*/

  //Route de la requête d'affichage de tous les produits
  router.get('/products/all', product.getAll);
  router.get('/products/:id', product.getById);

  /*------------ MODIFICATION ------------*/

  //Route de la requête de modification d'un produit via son id
  router.put(
    '/products/updateById/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    product.updateById
  );

  //Route de la requête de modification d'un produit via son nom
  router.put(
    '/products/updateByName/:name',
    [authJwt.verifyToken, authJwt.isAdmin],
    product.updateByName
  );

  /*------------ SUPPRESSION ------------*/

  //Route de la requête de suppression de tous les produits
  router.delete(
    '/products/deleteAll',
    [authJwt.verifyToken, authJwt.isAdmin],
    product.deleteAll
  );

  //Route de la requête de suppression d'un produit en fonction de son nom
  router.delete(
    '/products/deleteByName/:name',
    [authJwt.verifyToken, authJwt.isAdmin],
    product.deleteByName
  );

  //Route de la requête de suppression d'un produit en fonction de son id
  router.delete(
    '/products/deleteById/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    product.deleteById
  );

  //Route racine de l'api
  app.use('/api', router);
};

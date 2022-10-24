//Importation des modules utilisés
const db = require('../models');
const Product = db.product;

/*------------ AJOUT ------------*/

//Ajout d'un nouveau produit
exports.createOne = (req, res) => {
  //Création d'un nouvel objet Produit
  const product = new Product({
    ...req.body,
  });

  //Enregistrement du produit dans la bdd
  product
    .save(product)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send(err.message || 'Error while creating a new product ...');
    });
};

//Ajout de plusieurs produits
exports.createMany = (req, res) => {
  Product.insertMany(req.body.product)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send(err.message || 'Error while creating multiple products ...');
    });
};

/*------------ AFFICHAGE ------------*/

//Affichage de tous les produits
exports.getAll = (req, res) => {
  Product.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send(err.message || 'Error while finding all products ...');
    });
};

//Affichage d'un produit en fonction de son id
exports.getById = (req, res) => {
  const id = req.params.id;

  Product.findById(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send(
            `Cannot retrieve product with id: ${id}, you must verify the id !`
          );
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message || 'Error while finding product ...');
    });
};

/*------------ MODIFICATION ------------*/

//Modification d'un produit via son id
exports.updateById = (req, res) => {
  if (!req.body) {
    return res.status(400).send('Cannot update product with empty body');
  }

  const id = req.params.id;

  Product.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send(
            `Cannot update product with id: ${id}, you must verify the id !`
          );
      } else res.send('Product was successfully updated.');
    })
    .catch((err) => {
      res
        .status(500)
        .send('Error while updating product with the following id: ' + id);
    });
};

//Modification d'un produit via son nom
exports.updateByName = (req, res) => {
  if (!req.body) {
    return res.status(400).send('Cannot update product with empty body');
  }

  const name = req.params.name;

  Product.findOneAndUpdate(name, req.body)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send(
            `Cannot update product with name: ${name}, you must verify the name !`
          );
      } else res.send('Product was successfully updated.');
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          'Error while updating product with the following name: ' +
            name +
            ', please check if there is no identical data in the database !'
        );
    });
};

/*------------ SUPPRESSION ------------*/

//Efface tous les produits
exports.deleteAll = (req, res) => {
  Product.deleteMany({})
    .then((data) => {
      res.send(`${data.deletedCount} product(s) were successfully deleted !`);
    })
    .catch((err) => {
      res
        .status(500)
        .send(err.message || 'Error while deleting all products ...');
    });
};

//Efface un produit via son nom
exports.deleteByName = (req, res) => {
  const name = req.params.name;

  Product.findOneAndDelete({ name: name })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send(
            `Cannot delete product with name: ${name}, you must verify the name !`
          );
      } else {
        res.send('Product was successfully deleted !');
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send('Could not delete the product with the following name: ' + name);
    });
};

//Efface un produit via son id
exports.deleteById = (req, res) => {
  const id = req.params.id;

  Product.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send(
            `Cannot delete product with id: ${id}, you must verify the id !`
          );
      } else {
        res.send('Product was successfully deleted !');
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send('Could not delete the product with the following id: ' + id);
    });
};

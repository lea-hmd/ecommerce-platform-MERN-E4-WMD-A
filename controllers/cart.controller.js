//Importation des modules utilisés
const db = require('../models');
const Cart = db.cart;
const Product = db.products;

/*------------ AJOUT ------------*/

//Ajout d'un nouveau produit dans le panier
module.exports.addProduct = async (req, res) => {
  const userId = req.params.userId;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    let product = await Product.findOne({ _id: productId });
    if (!product) {
      res.status(404).send('Product not found!');
    }
    const price = product.productPrice;
    const name = product.productName;

    if (cart) {
      //Vérification d'un panier existant pour l'utilisateur
      let productIndex = cart.products.findIndex(
        (product) => product.productId == productId
      );

      //Vérification si le produit existe déjà dans le panier
      if (productIndex > -1) {
        let product = cart.products[productIndex];
        product.quantity += quantity;
        cart.products[productIndex] = product;
      } else {
        cart.products.push({ productId, name, quantity, price });
      }
      cart.cartBill += quantity * price;
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      //Création d'un nouveau panier pour l'utilisateur
      const newCart = await Cart.create({
        userId,
        products: [{ productId, name, quantity, price }],
        cartBill: quantity * price,
      });
      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
};

/*------------ AFFICHAGE ------------*/

//Affichage de tous les produits du panier
exports.getProducts = async (req, res) => {
  const userId = req.params.userId;

  try {
    const cart = await Cart.findOne({ userId })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res
          .status(500)
          .send(err.message || 'Error while finding all products ...');
      });

    if (cart && cart.products.length > 0) {
      res.send(cart);
    } else {
      res.send('No products in cart');
    }
  } catch (err) {
    console.log('Error in get cart ', err);
    res.status(500).send('Something went wrong');
  }
};

/*------------ MODIFICATION ------------*/

//Modification d'un produit du panier via son id
module.exports.updateProduct = async (req, res) => {
  const userId = req.params.userId;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    let product = await Product.findOne({ _id: productId });

    if (!product) return res.status(404).send('Product not found!');

    if (!cart) return res.status(400).send('Cart not found');
    else {
      let productIndex = cart.products.findIndex(
        (product) => product.productId == productId
      );

      if (productIndex == -1)
        return res.status(404).send('Product not found in cart!');
      else {
        let product = cart.products[productIndex];
        product.quantity = quantity;
        cart.products[productIndex] = product;
      }
      cart.cartBill = cart.products.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
      );
      cart = await cart.save();
      return res.status(201).send(cart);
    }
  } catch (err) {
    console.log('Error in update cart ', err);
    res.status(500).send('Something went wrong');
  }
};

/*------------ SUPPRESSION ------------*/

//Efface un produit du panier via son id
exports.deleteProduct = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.pId;

  try {
    let cart = await Cart.findOne({ userId });
    let productIndex = cart.products.findIndex(
      (product) => product.productId == productId
    );

    if (productIndex > -1) {
      let product = cart.products[productIndex];
      cart.cartBill -= product.price * product.quantity;
      cart.products.splice(productIndex, 1);
    }
    cart = await cart.save();
    return res.status(201).send(cart);
  } catch (err) {
    console.log('Error in get cart ', err);
    res.status(500).send('Something went wrong');
  }
};

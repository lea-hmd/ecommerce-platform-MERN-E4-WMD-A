//Importation des modules utilisés
const db = require('../models');
const Order = db.orders;
const Cart = db.cart;

/*------------ AJOUT ------------*/
//Ajout d'une nouvelle commande après le paiement
module.exports.payment = async (req, res) => {
  try {
    //Récupération de l'id de l'utilisateur
    const userId = req.params.userId;
    const paymentMethod = req.body.paymentMethod;

    //Récupération du panier de l'utilisateur
    let cart = await Cart.findOne({ userId });

    if (cart) {
      //Enregistrement de la commande dans la bdd
      const order = await Order.create({
        userId,
        orderBill: cart.cartBill,
        products: cart.products,
        paymentMethod,
        orderNumber: Math.floor(Math.random() * 1000000000),
      });

      const deletedCart = await Cart.findByIdAndDelete({ _id: cart._id });
      return res.status(201).send(order);
    } else {
      res.status(500).send("The cart doesn't exist !");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
};

/*------------ AFFICHAGE ------------*/

//Affichage de toutes les commandes d'un utilisateur
exports.getAllByUser = async (req, res) => {
  const userId = req.params.userId;
  Order.find({ userId })
    .sort({ date: -1 })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err.message || 'Error while finding all orders ...');
    });
};

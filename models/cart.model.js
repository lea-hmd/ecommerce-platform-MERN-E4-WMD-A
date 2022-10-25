//Création du modèle et de son schéma de données
module.exports = (mongoose) => {
  const Cart = mongoose.model(
    'cart', //Nom de la collection
    mongoose.Schema(
      {
        products: [
          {
            productId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'product',
            },
            productName: String,
            quantity: {
              type: Number,
              required: true,
              min: 1,
            },
            price: Number,
          },
        ],
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
        },
        cartBill: {
          type: Number,
          required: true,
        },
      },
      { timestamps: true }
    )
  );
  return Cart;
};

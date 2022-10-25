//Création du modèle et de son schéma de données
module.exports = (mongoose) => {
  const Order = mongoose.model(
    'order', //Nom de la collection
    mongoose.Schema(
      {
        orderNumber: { type: Number, unique: true, required: true, min: 1 },
        paymentMethod: { type: String, required: true },
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
        orderBill: {
          type: Number,
          required: true,
        },
      },
      { timestamps: true }
    )
  );
  return Order;
};

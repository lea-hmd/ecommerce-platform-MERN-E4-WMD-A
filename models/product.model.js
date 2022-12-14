//Création du modèle et de son schéma de données
module.exports = (mongoose) => {
  const Product = mongoose.model(
    'product', //Nom de la collection
    mongoose.Schema(
      {
        productName: { type: String, unique: true, required: true },
        productDescription: { type: String, required: false },
        productPrice: { type: Number, required: true },
      },
      { timestamps: true }
    )
  );
  return Product;
};

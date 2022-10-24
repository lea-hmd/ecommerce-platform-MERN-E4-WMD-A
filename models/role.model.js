//Création du modèle et de son schéma de données
module.exports = (mongoose) => {
  const Role = mongoose.model(
    "role", //Nom de la collection
    mongoose.Schema({
      name: { type: String, required: true },
    })
  );
  return Role;
};

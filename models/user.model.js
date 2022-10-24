//Création du modèle et de son schéma de données
module.exports = (mongoose) => {
  const User = mongoose.model(
    'user', //Nom de la collection
    mongoose.Schema(
      {
        username: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        firstname: String,
        lastname: String,
        roles: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'role',
          },
        ],
      },
      { timestamps: true }
    )
  );
  return User;
};

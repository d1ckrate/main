const mongoose = require("mongoose");
mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI);
const User = require("../../models/User");

export async function updateUser(email, updateData) {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email }, // Criterio de búsqueda por un campo único
      { $set: updateData }, // Campos a actualizar
      {
        upsert: true,
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      } // Opciones
    );

    console.log("Usuario actualizado:", updatedUser);
    return updatedUser;
  } catch (err) {
    console.error("Error al actualizar el usuario:", err);
    throw err; // O manejar el error de manera más específica
  }
}

export async function findUserByEmail(email) {
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      console.log(user);
      return user;
    } else {
      console.log("No se encontró un usuario con ese email.");
      return null;
    }
  } catch (error) {
    console.error("Error al buscar el usuario:", error);
    throw error;
  }
}

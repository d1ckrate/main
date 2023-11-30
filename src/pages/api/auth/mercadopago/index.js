// pages/api/auth.js
import axios from "axios";
import jwt from "jsonwebtoken";
import { updateUser } from "../../mongoUtils.js";

// Aquí procesarías el código de autorización y obtendrías el token de acceso.
import { getUserData, getUserAccessToken } from "../../../../utils.js";
export default async function handler(req, res) {
  const { code } = req.query;
  var publickey;
  var token;
  try {
    const { access_token, user_id, refresh_token, public_key } =
      await getUserAccessToken(code);
    const {
      nickname,
      first_name,
      last_name,
      country_id,
      email,
      address,
      permalink,
    } = await getUserData(access_token);
    publickey = public_key;
    console.log(
      access_token,
      user_id,
      refresh_token,
      public_key,
      nickname,
      first_name,
      last_name,
      country_id,
      email,
      address,
      permalink
    );
    updateUser(email, {
      email: email,
      mercadopagoId: user_id,
      public_key: public_key,
      firstName: first_name,
      lastName: last_name,
      accessTokenMP: access_token,
      refreshTokenMP: refresh_token,
      nickname: nickname,
      country_id: country_id,
      permalink: permalink,
      address: {
        street: address.address,
        city: address.city,
        state: address.state,
        zip: address.zip_code,
      },
    })
      .then((user) => console.log("Usuario guardado:", user))
      .catch((err) => console.error(err));

    // Crear el token JWT para el usuario
    token = jwt.sign(
      { email: email },
      process.env.NEXT_PUBLIC_JWT_SECRET,
      { expiresIn: "24h" } // El token expira en 1 hora
    );

    res.setHeader(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24};`
    );
    return res.redirect("/success?public_key=" + public_key); // Redirigir a la ruta de éxito en tu aplicación
  } catch (error) {
    if (error.code === 11000) {
      // Manejar el error de duplicado aquí si es necesario
      res.setHeader(
        "Set-Cookie",
        `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60};`
      );
      return res.redirect("/success?public_key=" + publickey);
    } else {
      // Manejar otros errores
      res
        .status(500)
        .json({ message: "Error interno del servidor", error: error.message });
    }
  }
}

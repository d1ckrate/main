// pages/api/auth/paypal.js
import axios from "axios";
import qs from "qs";
import jwt from "jsonwebtoken";
import { updateUser } from "../../mongoUtils.js";

const mongoose = require("mongoose");

export default async function handler(req, res) {
  var token;
  console.log(req.query);
  const { code } = req.query;
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET;
  const email = req.query.email;
  console.log(email);

  try {
    const response = await axios.post(
      "https://www.sandbox.paypal.com/v1/oauth2/token",
      qs.stringify({
        grant_type: "authorization_code",
        code: code,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
        },
      }
    );
    console.log("esta o no esta", response.data);
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI);
    const { access_token, refresh_token, nonce } = response.data;

    updateUser(email, {
      accessTokenPP: access_token,
      refreshTokenPP: refresh_token,
      nonce: nonce,
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
    res.redirect("/Success");
  } catch (error) {
    console.error(
      "Error intercambiando el código de PayPal por un token de acceso",
      error
    );
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

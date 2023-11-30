import axios from "axios";

const mercadopagoApi = axios.create({
  baseURL: "https://api.mercadopago.com",
  headers: { "Content-Type": "application/json" },
});

export async function getUserData(accessToken) {
  try {
    const response = await mercadopagoApi.get("/users/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error obtaining user data:", error);
    throw error;
  }
}

export async function getUserAccessToken(code) {
  try {
    const response = await mercadopagoApi.post(
      "https://api.mercadopago.com/oauth/token",
      new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_MERCADOPAGO_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_MERCADOPAGO_CLIENT_SECRET,
        grant_type: "authorization_code",
        code: code,
        redirect_uri:
          process.env.NEXT_PUBLIC_NGROK_URI + "/api/auth/mercadopago/",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error obtaining access token data:", error);
    throw error;
  }
}

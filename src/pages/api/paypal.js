import axios from "axios";

async function createPaypalTransaction(accessToken, amount) {
  const url = "https://sandbox.paypal.com/v2/checkout/orders";
  const data = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: amount.toString(),
        },
      },
    ],
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.links.find((link) => link.rel === "approve").href;
  } catch (error) {
    console.error("Error creating PayPal transaction:", error);
    throw error;
  }
}

export default async function handler(req, res) {
  console.log("probanding");
  try {
    // Llama a tu API para crear la preferencia de pago
    // Uso de la función
    createPaypalTransaction(
      "A23AALQ_6uYiJQq34UaUhXSMf3CG0Dtpb4gVRxSFMhfwhjtsIhtXIsCj-V3hF9T_XTEs7fP8IEM-mJnCw44LjTtaPZfZIbejA",
      10.0
    )
      .then((link) => {
        // Redirige al usuario a este link para el pago
        console.log("Link de pago:", link);
        return link;
      })
      .catch((error) => res.send(error));
  } catch (error) {
    console.error("Error al procesar el pago Paypal", error);
  }
}

// Configura tus credenciales

export default async function hasdfndler(req, res) {
  if (req.method === "GET") {
    const mercadopago = require("mercadopago");

    const preference = {
      items: [
        {
          title: "Descarga individual - sdf",
          quantity: 1,
          unit_price: 213,
        },
      ],
      payment_methods: {
        excluded_payment_types: [
          {
            id: "ticket",
          },
        ],
      },
      external_reference: "ruletaHash",
      back_urls: {
        success: "https://putiruleta.com/descarga-individual/",
        failure: "https://putiruleta.com/failure",
        pending: "https://putiruleta.com/pending",
      },
      metadata: {
        hash: "metadataHash",
      },
      marketplace_fee: 213 * 0.15,
    };

    mercadopago.configure({
      access_token:
        "TEST-1817367863397264-112312-c9cbcbf365124883606f40547aa43b06-50310453",
    });
    let linkDePago;
    const daleputo = await mercadopago.preferences
      .create(preference)
      .then((response) => {
        console.log(JSON.stringify(response.body.init_point));
        return response.body.init_point;
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send("Error al generar el enlace de pago");
      });
    res.send({ link: daleputo });
    // Configura tus credenciales
  } else {
    // Método no soportado
    res.setHeader("Allow", "POST,GET");
    res.status(405).end("Método no permitido");
  }
}

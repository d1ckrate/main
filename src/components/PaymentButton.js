"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button, Box, Spinner, SimpleGrid } from "@chakra-ui/react";
import Image from "next/image";

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

function PaymentButton() {
  const [isLoadingPP, setIsLoadingPP] = useState(false);
  const [isLoadingMP, setIsLoadingMP] = useState(false);
  const handlePaymentMP = async () => {
    setIsLoadingMP(true);
    try {
      // Llama a tu API para crear la preferencia de pago
      const response = axios
        .get("/api/mercadopago")
        .then((res) => {
          window.location.href = res.data.link;
        })
        .catch(console.log);
    } catch (error) {
      console.error("Error al procesar el pago", error);
    }
  };
  const handlePaymentPP = async () => {
    setIsLoadingPP(true);
    axios.post("/api/paypal").then((res) => {
      setIsLoadingPP(false);
      console.log(res);
    });
  };

  return (
    <SimpleGrid columns={1}>
      <Button
        onClick={handlePaymentMP}
        w="200px"
        mb="7px"
        backgroundColor={"#008ad6"}
        borderColor={"pink.400"}
        borderWidth={"3px"}
        size="lg"
        color={"black"}
        px={6}
        _hover={{ bg: "pink.500", color: "white" }}
      >
        {isLoadingMP ? (
          <Spinner />
        ) : (
          <>
            <Image src="mpagos.svg" alt="Descripción" width={35} height={35} />
          </>
        )}
      </Button>
      <Button
        onClick={handlePaymentPP}
        w="200px"
        mb="7px"
        backgroundColor={"#ffc439"}
        borderColor={"pink.400"}
        borderWidth={"3px"}
        size="lg"
        color={"black"}
        px={6}
        _hover={{ bg: "pink.500", color: "white" }}
      >
        {isLoadingPP ? (
          <Spinner />
        ) : (
          <>
            <Image src="paypal.svg" alt="Descripción" width={75} height={75} />
          </>
        )}
      </Button>
    </SimpleGrid>
  );
}

export default PaymentButton;

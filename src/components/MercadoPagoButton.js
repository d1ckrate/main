// pages/login.js
import React, { useEffect } from "react";
import { Input, Button, Box } from "@chakra-ui/react";
import Image from "next/image";

function MercadoPagoButton(props) {
  const { tipo } = props;
  useEffect(() => {}, []);

  const handleMercadoPagoLogin = () => {
    // Aquí debes construir la URL de autenticación de MercadoPago y redirigir.
    const mercadoPagoURL = `https://auth.mercadopago.com.uy/authorization?client_id=${process.env.NEXT_PUBLIC_MERCADOPAGO_CLIENT_ID}&response_type=code&platform_id=mp&redirect_uri=${process.env.NEXT_PUBLIC_NGROK_URI}/api/auth/mercadopago/`;
    window.location.href = mercadoPagoURL;
  };

  return (
    <>
      <Button
        mb={4}
        bg="blue.500"
        color="white"
        size="lg"
        width={"100%"}
        _hover={{ bg: "blue.400" }}
        _active={{ bg: "blue.600" }}
        onClick={handleMercadoPagoLogin}
        leftIcon={<Image src="/mpagos.svg" width={20} height={20} />}
      >
        {tipo === "login" ? "Iniciar Sesion" : "Registrate"}
      </Button>
    </>
  );
}

export default MercadoPagoButton;

import React from "react";
import { Input, Button, Box } from "@chakra-ui/react";
import Image from "next/image";

// PaypalLoginButton.js
function PaypalLoginButton(props) {
  const { tipo } = props;
  const handleLogin = () => {
    const clientId =
      "AegHeTFdcGMw4ngeYbAz8LvRpUXVdHzrHsxjzWnR6GysqMJBhSlcAN6MxpC6t8BPFpg7BlNdzaod5R_Q";
    const redirectUri = encodeURIComponent(
      process.env.NEXT_PUBLIC_NGROK_URI + "/GetEmail/"
    );
    const paypalAuthUrl = `https://www.sandbox.paypal.com/signin/authorize?client_id=${clientId}&response_type=code&scope=openid&redirect_uri=${redirectUri}`;

    window.location.href = paypalAuthUrl;
  };

  return (
    <Button
      bg="gray.300"
      color="black"
      size="lg"
      width={"100%"}
      _hover={{ bg: "gray.200" }}
      _active={{ bg: "gray.400" }}
      onClick={handleLogin}
      leftIcon={<Image src="/paypal-p.svg" width={20} height={20} />}
    >
      {tipo === "login" ? "Iniciar Sesion" : "Registrate"}
    </Button>
  );
}

export default PaypalLoginButton;

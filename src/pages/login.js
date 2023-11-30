// pages/login.js
import React from "react";
import { Flex, Container } from "@chakra-ui/react";
import FormLogin from "../components/FormLogin";

function Login() {
  return (
    <Flex
      style={{
        minWidth: "100%",
      }}
      align="center" // Centrar verticalmente los elementos internos
      justify="center" // Centrar horizontalmente los elementos internos
      height="100vh" // Altura del viewport, para centrar verticalmente en la pantalla
    >
      <Container
        m={0}
        width="100vw"
        minWidth="100%"
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <FormLogin />
      </Container>
    </Flex>
  );
}

export default Login;

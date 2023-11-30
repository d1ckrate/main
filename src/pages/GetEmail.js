"use client";
import React, { useState, useEffect } from "react";
import {
  VStack,
  Input,
  Button,
  Box,
  Image,
  SimpleGrid,
  useToast,
  Flex,
  Container,
} from "@chakra-ui/react";
function GetEmail() {
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const queryString = window.location.search;
    localStorage.setItem("queryString", window.location.search);
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (isError) setIsError(false);
  };

  const validateEmail = () => {
    if (!email) {
      setIsError(true);
      toast({
        title: "Error",
        description: "Por favor ingresa un correo electrónico",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    sessionStorage.setItem("email", email);
    window.location.href =
      "/api/auth/paypal" + localStorage.queryString + "&email=" + email;
  };
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
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <SimpleGrid
          p={4}
          columns={1}
          width={["250px", "400px", "500px"]}
          style={{ background: "#b65796", borderRadius: "9px" }}
        >
          <Input
            placeholder="📧@email"
            mb={4}
            backgroundColor="#eed9f2"
            value={email}
            onChange={handleEmailChange}
            borderColor={isError ? "red.500" : "gray.200"}
            borderWidth={isError ? "2px" : "1px"}
          />
          <Button onClick={validateEmail}>Enviar</Button>
        </SimpleGrid>
      </Container>
    </Flex>
  );
}

export default GetEmail;

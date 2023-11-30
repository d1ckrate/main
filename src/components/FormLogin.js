import React, { useState } from "react";
import {
  VStack,
  Button,
  Image,
  SimpleGrid,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import PaypalLoginButton from "../components/PaypalLoginButton";
import MercadoPagoButton from "../components/MercadoPagoButton";

function FormLogin() {
  return (
    <SimpleGrid
      p={4}
      columns={1}
      width={["200px", "400px", "500px"]}
      bg={useColorModeValue("gray.200", "gray.700")}
    >
      <VStack>
        <MercadoPagoButton tipo="registro" />
        <PaypalLoginButton tipo="registro" />
      </VStack>
    </SimpleGrid>
  );
}

export default FormLogin;

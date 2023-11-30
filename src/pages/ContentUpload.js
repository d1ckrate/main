// pages/login.js
import React from "react";
import { Flex, Container } from "@chakra-ui/react";
import ContentUpload from "../components/ContentUpload";

function Login() {
  return (
    <Flex
      style={{
        minWidth: "100%",
      }}
    >
      <Container m={0} width="100vw" minWidth="100%">
        <ContentUpload />
      </Container>
    </Flex>
  );
}

export default Login;

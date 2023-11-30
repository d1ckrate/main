"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import Layout from "components/Layout";
import ImageGallery2 from "components/ImageGallery2";
import { AuthProvider } from "../AuthContext";
import {
  ChakraProvider,
  extendTheme,
  Container,
  Stack,
  Spinner,
  Center,
  Box,
  Checkbox,
  Flex,
  Divider,
  Heading,
} from "@chakra-ui/react";
const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        fontFamily: "'Poppins', sans-serif;",
      },
    }),
  },
});
export default function Home() {
  const [loading, setLoading] = useState(false);
  if (loading)
    return (
      <ChakraProvider theme={theme}>
        <Flex
          style={{
            minWidth: "100%",
          }}
        >
          <Container m={0} width="100vw" minWidth="100%">
            <Stack spacing={2} minHeight="20%">
              <Spinner
                thickness="24px"
                speed="0.65s"
                emptyColor="#a5e0cf"
                color="#f5a7d5"
                style={{
                  position: "relative",
                  zIndex: 7,
                  width: "151px",
                  height: "151px",
                  margin: "37% auto",
                  transform: "translate( -50%, -50% )",
                }}
              />
            </Stack>
          </Container>
        </Flex>
      </ChakraProvider>
    );

  return (
    <>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <Layout>
            <ImageGallery2 />
          </Layout>
        </ChakraProvider>
      </AuthProvider>
    </>
  );
}

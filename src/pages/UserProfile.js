// pages/profile.js
import { parseCookies } from "nookies";
import jwt from "jsonwebtoken";
import React, { useState } from "react";
import { Flex, Box, VStack, Text, Input, Button } from "@chakra-ui/react";
import ContentUpload from "components/ContentUpload";

export async function getServerSideProps(context) {
  const { updateUser, findUserByEmail } = require("./api/mongoUtils.js");
  const { req } = context;
  const cookies = parseCookies(context);
  const token = cookies.token; // Suponiendo que el token está guardado en una cookie llamada 'token'

  try {
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
    // obtengo usuario por email
    console.log(decoded);
    const user = await findUserByEmail(decoded.email);

    // Si todo es válido, devuelve los props para el perfil
    return { props: { user: JSON.stringify(user) } };
  } catch (error) {
    // Si la verificación falla, redirige al usuario al login
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}

export default function Profile({ user }) {
  // Renderiza la información del perfil aquí
  const [usuario, setUsuario] = useState(JSON.parse(user));
  return (
    <Flex align="center" justify="center" height="100vh">
      <VStack spacing={4} align="stretch" width="full" maxW="md">
        {/* Sección de detalles del usuario */}
        <Box p={5} shadow="md" borderWidth="1px">
          <Text fontSize="xl">
            Hola, {usuario.firstName} {usuario.lastName}
          </Text>
          <Text>
            <small>Email: {usuario.email}</small>
          </Text>
        </Box>

        {/* Sección de subida de imagen */}
        <Box p={5} shadow="md" borderWidth="1px">
          <Text fontSize="md">
            Sube una foto tuya para utilizar en tu perfil de venta
          </Text>
          <ContentUpload />
          <Button width="100%" mt={3}>
            Enviar
          </Button>
        </Box>
      </VStack>
    </Flex>
  );
}

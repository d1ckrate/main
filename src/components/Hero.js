import React from "react";
import ResponsiveCarousel from "components/ResponsiveCarousel";
import { Box, VStack, Heading, Text } from "@chakra-ui/react";
export default function Hero() {
  return (
    <>
      <Box padding="29px">
        <Heading>How DickRate🍆 works</Heading>
        <Text>Get your dick rated in 3 steps.</Text>
      </Box>
      <Box padding="29px">
        <ResponsiveCarousel />
      </Box>
    </>
  );
}

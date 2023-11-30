"use client";

import React, { useState, useEffect, useRef } from "react";
import { Wheel } from "react-custom-roulette";
import { Box, VStack } from "@chakra-ui/react";

import PaymentButton from "./PaymentButton";

const data = [
  {
    option: "Premio 1",
  },
  {
    option: "Premio 2",
  },
  {
    option: "Premio 1",
  },
  {
    option: "Premio 2",
  },
  {
    option: "Premio 1",
  },
  {
    option: "Premio 2",
  },
  // Agrega más opciones aquí
];
const backgroundColors = ["#EED9F2", "#343036", "#B65796"];
const textColors = ["#B65796", "#EDBD50", "#EED9F2"];
const outerBorderColor = "#eeeeee";
const outerBorderWidth = 15;
const innerBorderColor = "#30261a";
const innerBorderWidth = 5;
const innerRadius = 20;
const radiusLineColor = "#30261a";
const radiusLineWidth = 8;
const fontSize = 13;
const textDistance = 60;
const spinDuration = 1.0;

const Roulette = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleSpinStop = () => {
    setMustSpin(false);
    // Aquí puedes manejar el premio obtenido
    console.log(`Ganaste: ${data[prizeNumber].option}`);
  };

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={backgroundColors}
          textColors={textColors}
          fontSize={fontSize}
          outerBorderColor={outerBorderColor}
          outerBorderWidth={outerBorderWidth}
          innerRadius={innerRadius}
          innerBorderColor={innerBorderColor}
          innerBorderWidth={innerBorderWidth}
          radiusLineColor={radiusLineColor}
          radiusLineWidth={radiusLineWidth}
          spinDuration={spinDuration}
          onStopSpinning={handleSpinStop}
        />
        <PaymentButton />
      </VStack>
    </Box>
  );
};

export default Roulette;

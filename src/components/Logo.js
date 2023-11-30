import React from "react";
import { keyframes, usePrefersReducedMotion } from "@chakra-ui/react";
import Image from "next/image";
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Logo = (props) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { animado, src } = props;
  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite 20s linear`;

  return (
    <Image
      animation={animado === "true" ? animation : undefined}
      src={src}
      {...props}
    />
  );
};

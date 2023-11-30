import React from "react";
import Slider from "react-slick";
import { Box, Heading, Text, useMediaQuery, Icon } from "@chakra-ui/react";
import { Fa1, Fa2, Fa3 } from "react-icons/fa6";

const CarouselCard = ({ title, text, num }) => (
  <Box
    border="1px"
    borderColor="gray.200"
    p={4}
    borderRadius="md"
    display="flex"
    alignItems="center"
    minH="200px"
  >
    {num === 1 && <Fa1 w={6} h={6} mr={15} />}
    {num === 2 && <Fa2 w={6} h={6} mr={15} />}
    {num === 3 && <Fa3 w={6} h={6} mr={15} />}
    <Box ml={15}>
      <Heading size="sm">{title}</Heading>
      <Text mt={2}>{text}</Text>
    </Box>
  </Box>
);

const ResponsiveCarousel = () => {
  const [isMobile] = useMediaQuery("(max-width: 480px)");
  const [isTablet] = useMediaQuery("(min-width: 481px) and (max-width: 768px)");

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: isMobile,
    autoplaySpeed: 2000,
    vertical: isTablet,
    verticalSwiping: isTablet,
  };

  if (!isMobile && !isTablet) {
    settings = {
      ...settings,
      slidesToShow: 3,
      vertical: false,
      verticalSwiping: false,
    };
  }

  return (
    <Slider {...settings}>
      <CarouselCard
        num={1}
        title="Pick your Girl"
        text="Give our girls a glimpse into your privates"
      />
      <CarouselCard
        num={2}
        title="Pay & Send your pics."
        text="Make sure to show your best angle."
      />
      <CarouselCard
        num={3}
        title="Get your dick rated!"
        text="Will she like your dick? Find out!"
      />
    </Slider>
  );
};

export default ResponsiveCarousel;

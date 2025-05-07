import React from "react";
import { Box } from "@chakra-ui/react";
import NavBar from "./NavBar";
import Carousel from "./Carousel";
import Calendar from "./Calendar";
import { Flex } from "@chakra-ui/react";
import OptionsEvent from "./OptionsEvent";


const LandingPage = () => {
  return (
    <>
      <NavBar />
      <Carousel />
      <Flex p={5} gap={4} align="flex-start">
        <Box>
          <OptionsEvent />
        </Box>

        <Box flex="1">
          <Calendar />
        </Box>
      </Flex>
    </>
  );
};

export default LandingPage;

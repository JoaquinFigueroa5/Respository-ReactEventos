import React from "react";
import { Box } from "@chakra-ui/react";
import NavBar from "./NavBar";
import "../styles/landingPage.css";

const LandingPage = () => {
  return (
    <>
      <NavBar />
      <Box
        w="full"
        minHeight="100vh"
        backgroundImage="url('https://unreal-music.com/wp-content/uploads/2023/07/Comment-faire-de-la-SynthWave-2.jpg')"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundAttachment="fixed"
        position="relative"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0, 0, 0, 0.4)"
          backdropFilter="blur(5px)"
          zIndex="0"
        />
        
        <Box position="relative" zIndex="1" p="8" color="white">
          <h1>Bienvenido a la Landing Page</h1>
        </Box>
      </Box>
    </>
  );
};

export default LandingPage;

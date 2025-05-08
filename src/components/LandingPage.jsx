import {
  Flex,
  Box
} from "@chakra-ui/react";
import NavBar from "./NavBar";
import SidebarAlert from "./SideBar";
import Calendar from "./Calendar";
import OptionsEvent from "./OptionsEvent";
import Carousel from "./Carousel";
import Footer from "./Footer";
import { useEvents } from "../context/EventsContext";

const LandingPage = () => {
  const { events } = useEvents();
  return (
    <>
      <NavBar />
      <Box display='flex'>
        <SidebarAlert minW="250px" />
        <Box flex="1" minW="0">
          <Carousel />
          <Flex p={5} gap={4} align="flex-start">
            <Box>
              <OptionsEvent />
            </Box>
            <Box flex="1">
              <Calendar events={events} />
            </Box>
          </Flex>
        </Box>
      </Box>
      <Footer />

    </>
  );
};

export default LandingPage;

"use client";

import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Text,
  HStack,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useFormContext } from "../context/FormContext";

const NavLink = ({ children, to }) => (
  <Box
    as="div"
    px={3}
    py={2}
    rounded="md"
    position="relative"
    _after={{
      content: '""',
      position: "absolute",
      width: "0%",
      height: "2px",
      bottom: 0,
      left: 0,
      bg: "white",
      transition: "width 0.3s ease-in-out",
    }}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
      _after: {
        width: "100%",
      },
    }}
  >
    <Link to={to}>{children}</Link>
  </Box>
);

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { savedForm } = useFormContext();


  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} w="100%">
      <Flex
        maxW="1200px"
        mx="auto"
        px={6}
        h={16}
        alignItems="center"
        justifyContent="space-between"
      >
        <HStack spacing={8} alignItems="center">
          <Link to='/dashboard' >
            <Box fontWeight="bold" fontSize="xl">
              Eventos
            </Box>
          </Link>
          <HStack as="nav" spacing={8} display={{ base: "none", md: "flex" }}>
            <NavLink to="/events">General</NavLink>
            <NavLink to="/trabajo">Trabajo</NavLink>
            <NavLink to="/personales">Personal</NavLink>
            <NavLink to="/reuniones">Reuniones</NavLink>
          </HStack>
        </HStack>

        <Flex alignItems="center">
          <Stack direction="row" spacing={6}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>

            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    as={Button}
                    rounded="full"
                    variant="link"
                    cursor="pointer"
                    minW={0}
                  >
                    <Avatar
                      size="sm"
                      src="https://i.ytimg.com/vi/Dw9mEc7Eac0/sd2.jpg?sqp=-oaymwEoCIAFEOAD8quKqQMcGADwAQH4Ab4EgALABIoCDAgAEAEYWyBUKGUwDw==&rs=AOn4CLBpcG8SU7WtlCysJMLYePJPxcBMRw"
                    />
                  </MenuButton>
                  <MenuList alignItems="center">
                    <br />
                    <Center>
                      <Avatar
                        size="2xl"
                        src="https://i.ytimg.com/vi/Dw9mEc7Eac0/sd2.jpg?sqp=-oaymwEoCIAFEOAD8quKqQMcGADwAQH4Ab4EgALABIoCDAgAEAEYWyBUKGUwDw==&rs=AOn4CLBpcG8SU7WtlCysJMLYePJPxcBMRw"
                      />
                    </Center>
                    <br />
                    <Center flexDirection="column" w="100%" px={4}>
                      <Text fontWeight="bold" textAlign="center" py={6} >
                        {savedForm}
                      </Text>
                      <Box
                        height="2px"
                        width={isOpen ? "100%" : "0%"}
                        bg="white"
                        transition="width 0.4s ease-in-out"
                        transformOrigin="center"
                        mx="auto"
                      />
                    </Center>
                    <Link to="/">
                      <MenuItem
                        position="relative"
                        _after={{
                          content: '""',
                          position: "absolute",
                          width: "0%",
                          height: "2px",
                          bottom: 0,
                          left: 0,
                          bg: "white",
                          transition: "width 0.3s ease-in-out",
                        }}
                        _hover={{
                          bg: useColorModeValue("gray.200", "gray.700"),
                          _after: { width: "100%" },
                        }}
                      >
                        Logout
                      </MenuItem>
                    </Link>
                  </MenuList>
                </>
              )}
            </Menu>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  useColorModeValue,
  Stack,
  Heading,
  Text,
  Flex,
  Image,
} from "@chakra-ui/react";

export default function Auth() {
    const { setSavedForm } = useFormContext();

  const [formValidation, setFormValidation] = useState({
    email: undefined,
    name: undefined,
    age: undefined,
    password: undefined,
    rePassword: undefined,
    condition: undefined,
  });

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [condition, setCondition] = useState(false);

  const navigate = useNavigate();

  const onSubmit = (data) => {
    data.preventDefault();
    setSavedForm(`${name} | ${email}`);
    navigate('/dashboard')
    
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    const regex = /@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setFormValidation((prev) => ({
      ...prev,
      email:
        value.length === 0
          ? "Email is required"
          : !regex.test(value)
          ? "Email is invalid"
          : "",
    }));
    setEmail(value);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setFormValidation((prev) => ({
      ...prev,
      name: value.length === 0 ? "Name is required" : "",
    }));
    setName(value);
  };

  const handleAgeChange = (e) => {
    const value = e.target.value;
    setFormValidation((prev) => ({
      ...prev,
      age: value.length === 0 ? "Age is required" : "",
    }));
    setAge(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setFormValidation((prev) => ({
      ...prev,
      password:
        value.length === 0
          ? "Password is required"
          : value.length < 5
          ? "Password is too short"
          : "",
    }));
    setPassword(value);
  };

  const handleRePasswordChange = (e) => {
    const value = e.target.value;
    setFormValidation((prev) => ({
      ...prev,
      rePassword: value !== password ? "Passwords do not match" : "",
    }));
    setRePassword(value);
  };

  const handleConditionChange = (e) => {
    const checked = e.target.checked;
    setFormValidation((prev) => ({
      ...prev,
      condition: !checked ? "Please accept the terms" : "",
    }));
    setCondition(checked);
  };

  const isValidForm = Object.keys(formValidation).every(
    (key) => formValidation[key] === ""
  );

  const formBackground = useColorModeValue("white", "gray.700");
  const inputBackground = useColorModeValue("gray.50", "gray.600");
  const labelColor = useColorModeValue("gray.700", "gray.200");
  const buttonColor = useColorModeValue("red.500", "red.800");

  return (
    <Flex
      position="relative"
      minH="100vh"
      align="center"
      justify="center"
      p={8}
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        bgImage="url('https://images.unsplash.com/photo-1744646365388-5c889a2f69a9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPosition="center"
        opacity={0.4}
        zIndex={0}
      />

      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={8}
        align="center"
        position="relative"
        zIndex={1}
      >
        <Box flex="1" display={{ base: "none", md: "block" }}>
          <Image
            src="https://images.unsplash.com/photo-1612298948864-bb647fe8a241?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Login Image"
            borderRadius="md"
            objectFit="cover"
            h="full"
            w="full"
            maxH="500px"
            boxShadow="dark-lg"
          />
        </Box>

        <Box
          flex="1"
          bg={formBackground}
          p={8}
          borderRadius="md"
          boxShadow="dark-lg"
          maxW="md"
          w="full"
        >
          <Stack spacing={4}>
            <Stack align="center">
              <Heading fontSize="3xl" textAlign="center">
                Sign up
              </Heading>
              <Text fontSize="lg" color="white.600">
                All of your events in one place ✌️
              </Text>
            </Stack>
            <form onSubmit={onSubmit}>
              <VStack spacing={4}>
                <FormControl isInvalid={!!formValidation.name}>
                  <FormLabel color={labelColor}>Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Name"
                    bg={inputBackground}
                    value={name}
                    onChange={handleNameChange}
                  />
                  <FormErrorMessage>{formValidation.name}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!formValidation.age}>
                  <FormLabel color={labelColor}>Age</FormLabel>
                  <Input
                    type="number"
                    placeholder="Age"
                    bg={inputBackground}
                    value={age}
                    onChange={handleAgeChange}
                  />
                  <FormErrorMessage>{formValidation.age}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!formValidation.email}>
                  <FormLabel color={labelColor}>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="Email"
                    bg={inputBackground}
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <FormErrorMessage>{formValidation.email}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!formValidation.password}>
                  <FormLabel color={labelColor}>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Password"
                    bg={inputBackground}
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <FormErrorMessage>{formValidation.password}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!formValidation.rePassword}>
                  <FormLabel color={labelColor}>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    bg={inputBackground}
                    value={rePassword}
                    onChange={handleRePasswordChange}
                  />
                  <FormErrorMessage>
                    {formValidation.rePassword}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!formValidation.condition}>
                  <Checkbox
                    isChecked={condition}
                    onChange={handleConditionChange}
                    colorScheme="blue"
                  >
                    Accept terms & conditions
                  </Checkbox>
                  <FormErrorMessage>
                    {formValidation.condition}
                  </FormErrorMessage>
                </FormControl>

                {/* <Link to="/dashboard" style={{ width: "100%" }}>
                  
                </Link> */}
                <Button
                    bg={buttonColor}
                    color="white"
                    _hover={{ bg: 'red.700' }}
                    width="full"
                    type="submit"
                    isDisabled={!isValidForm}
                  >
                    Sign Up
                </Button>
              </VStack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

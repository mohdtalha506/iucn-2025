import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/PCAKnowledge Logo.png";
import Footer from "../components/NewComponents/Footer";

export default function SimpleCard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const defaultUsername = "pcaknowledgekit";
  const defaultPassword = "pca000";
  const toast = useToast();

  const handleLogin = () => {
    setLoading(true)
    if (!username.trim() || !password.trim()) {
      setLoading(false);
      toast({
        title: "Validation Error",
        description: "Please enter both username and password.",
        status: "warning",
        duration: 1500,
        isClosable: true,
      });
      return;
    }
  
    const loginPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === defaultUsername && password === defaultPassword) {
          setLoading(false);
          resolve()
        } else {
          setLoading(false)
          reject()
        }
      }, 1000);
    });
  
    loginPromise
      .then(() => {
        navigate("/home")
        toast({
          position: "top",
          title: "Login successful",
          description: "",
          status: "success",
          duration: 1500,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: "Invalid credentials",
          description: "Please try again with correct username and password.",
          status: "error",
          duration: 1500,
          isClosable: true,
        });
      });
  };
  
  
  return (
    <>
    <Flex minH={"76vh"} align={"center"} justify={"center"}>
      <Stack spacing={5} mx={"auto"} maxW={"lg"} px={6}>
        <Box rounded={"lg"} boxShadow="xl" border={"1px solid white"} p={9}>
          <img
            style={{
              width: "120px",
              height: "50px",
              margin: "auto",
              marginTop: "-1rem",
              marginBottom: "1rem",
            }}
            src={logo}
            alt=""
            srcset=""
          />
          <Stack spacing={8}>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="Enter username - pcaknowledgekit"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                _placeholder={{
                  color: "gray.500 !important",
                  fontSize: "sm",
                }}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter password - pca000"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                _placeholder={{
                  color: "gray.500 !important",
                  fontSize: "sm",
                }}
              />
            </FormControl>
            <Button
              isLoading = {loading}
              onClick={handleLogin}
              bg={"#198754"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Log in
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    <Footer/>
    </>
  );
}

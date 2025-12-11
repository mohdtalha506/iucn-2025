"use client";

import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import {
  FaEnvelope,
  FaFacebookMessenger,
  FaGlobe,
  FaInstagram,
  FaMailBulk,
  FaMobile,
  FaPhone,
  FaPhoneAlt,
  FaTwitter,
  FaVoicemail,
  FaYoutube,
} from "react-icons/fa";
import { ReactNode } from "react";
import logo from "../../assets/PCAKnowledge Logo.png";
const Logo = (props) => {
  return <img width="140px" src={logo} alt="footer logo" />;
};

const SocialButton = ({ children, label, href, type }) => {
  return (
    <chakra.button
      // bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      target="_blank"
      type={type}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={
        {
          // bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
        }
      }
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function SmallWithLogoLeft() {
  return (
    <Box
      borderTop="1px solid #ffff"
      // bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue("gray.400", "gray.200")}
      mt="3.67rem"
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Logo />
        <Text mt="1rem" fontSize="small" textAlign="center">
          © Copyright PCA Knowledge Kit - v.2.0.2025{" "} <br />
          {/* Powered By: AI Digital */}
          GIZ product developed in collaboration with : <br />
           The  IUCN-Asia Regional   Office (ARO),<br />  The Regional Office for West Asia (ROWA), <br /> The  Asia Protected Areas Partnership (APAP).
        </Text>
        <Stack direction={"row"} spacing={6} color="white">
          <SocialButton
            label={"Website"}
            href={" https://www.asiaprotectedareaspartnership.org"}
          >
            <FaGlobe />
          </SocialButton>
          <SocialButton
            label={"Mail"}
            href={"mailto: info@asiaprotectedareaspartnership.org"}
          >
            <FaEnvelope />
          </SocialButton>
          <SocialButton label={"Phone"} href={"tel:+6626624029"}>
            <FaPhoneAlt />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}

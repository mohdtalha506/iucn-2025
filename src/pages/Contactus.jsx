import {
  Heading,
  Text,
  Stack,
  chakra,
  VisuallyHidden,
  Tooltip,
} from "@chakra-ui/react";
import { FaEnvelope, FaGlobe, FaPhoneAlt } from "react-icons/fa";
import React from "react";
import logo from "../assets/PCAKnowledge Logo.png";
import { Link } from "react-router-dom";

const Contactus = () => {
  const SocialButton = ({ children, label, href, type, bgColor, target }) => {
    return (
      <Tooltip label={label} aria-label={label}>
        <chakra.button
          rounded={"full"}
          w={8}
          h={8}
          cursor={"pointer"}
          as={"a"}
          href={href}
          target={"_blank"}
          type={type}
          display={"inline-flex"}
          alignItems={"center"}
          justifyContent={"center"}
          transition={"background 0.3s ease"}
          _hover={{
            bg: bgColor,
          }}
          bg={bgColor}
        >
          {children}
        </chakra.button>
      </Tooltip>
    );
  };

  return (
    <>
      <div className="container my-5">
        <div className="row text-center">
          <div className="col ">
            <Heading>Get in Touch</Heading>
          </div>
        </div>

        <div style={{ margin: "auto" }} className="mt-5">
          <div className="row text-center ">
            <div className="col col-lg-7 ">
              <div className="row d-flex justify-content-center">
                <div className="col ">
                  <div className="row mt-3">
                    <div
                      className="col"
                      style={{ textAlign: "left", fontStyle: "italic" }}
                    >
                      <Text>
                        Asia Protected Areas Partnership (APAP) Secretariat{" "}
                        <br /> IUCN Asia Regional Office <br />
                        63 Sukhumvit Soi 39 <br /> Wattana, Bangkok 10110 <br />
                        Thailand <br />
                        E-mail: <a style={{color:"#03bfff"}} href="mailto:info@asiaprotectedareaspartnership.org " target="_blank">info@asiaprotectedareaspartnership.org</a><br />
                        Tel: <a style={{color:"#03bfff"}} href="tel:+662662 4029" target="_blank">+662662 4029</a> <br />
                        Website: <a style={{color:"#03bfff"}} href=" https://www.asiaprotectedareaspartnership.org" target="_blank"> https://www.asiaprotectedareaspartnership.org</a>
                      
                      </Text>
                    </div>
                  </div>
                  <Stack direction={"row"} spacing={6} color="white">
                    <SocialButton
                      label={"https://www.asiaprotectedareaspartnership.org"}
                      href={"https://www.asiaprotectedareaspartnership.org"}
                      bgColor={"#0BB3BF"}
                    >
                      <FaGlobe />
                    </SocialButton>
                    <SocialButton
                      label={"info@asiaprotectedareaspartnership.org"}
                      href={"mailto: info@asiaprotectedareaspartnership.org"}
                      bgColor={"#2CC27E"}
                    >
                      <FaEnvelope />
                    </SocialButton>
                    <SocialButton
                      label={"+6626624029"}
                      href={"tel:+6626624029"}
                      bgColor={"#2C6AC2"}
                    >
                      <FaPhoneAlt />
                    </SocialButton>
                  </Stack>
                </div>
              </div>
            </div>
            <div className="col col-lg-5  d-flex align-items-center">
              <div
                className="sidebar-header mx-auto d-flex justify-content-center"
                style={{ height: "300px", width: "300px" }}
              >
                <Link to="/home">
                  <img
                    src={logo}
                    className="bg-transparent"
                    alt="logo"
                    // style={logoStyle}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contactus;

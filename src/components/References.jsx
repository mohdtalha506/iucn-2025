import React from "react";
import data from "../assets/defaultToolData";
("use client");
import {
  Box,
  Container,
  Stack,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { SplitText } from "../components/NewComponents/SplitText";
export default function References() {

  const extractLinks = (reference) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const breakPoint = "ADDBREAK_HERE";

    return reference.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            style={{ color: "#03bfff" }}
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
          >
            {part}
          </a>
        );
      }
      // Break the line when "ADDBREAK_HERE" is found
      if (part.includes(breakPoint)) {
        const [beforeBreak, afterBreak] = part.split(breakPoint);
        return (
          <span key={index}>
            {beforeBreak}
            <br />
            {afterBreak}
          </span>
        );
      }
      return part;
    });
  };

  const defaultStyle = {
    fontFamily: "sans-serif",
    textAlign: "start",
    fontSize: "30px",
    fontWeight: "700",
    letterSpacing: "1px",
    lineHeight: "1.2",
    // margin: "auto",
    marginBottom: "12px",
    color: "#fff",
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Container maxW={"5xl"}>
              <Stack
                as={Box}
                // textAlign={"center"}
                spacing={{ md: 1 }}
              // py={{ base: 20 }}
              >
                <div style={defaultStyle}>
                  <AnimatePresence>

                    <motion.div
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <SplitText
                        initial={{ y: "100%" }}
                        animate="visible"
                        variants={{
                          visible: (i) => ({
                            color: "#5ae6b8",
                            y: 0,
                            transition: {
                              delay: i * 0.4,
                            },
                          }),
                        }}
                      >
                        References
                      </SplitText>
                    </motion.div>
                  </AnimatePresence>
                </div>
                {data.map((tool) => {
                  return (
                    <>
                      <h5 style={{ color: "#5ae6b8" }}>{tool.category}</h5>
                      <h6 style={{ color: "#FFFF69" }}>{tool.headingText}</h6>
                      <span>{extractLinks(tool.Reference)}</span>
                      <hr />
                    </>
                  );
                })}
              </Stack>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}

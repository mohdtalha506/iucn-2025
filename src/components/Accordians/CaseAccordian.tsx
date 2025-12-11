import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Text,
  Spinner,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Icon,
  Button,
  Link,
} from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";

const CaseAccordian = (props: any) => {
  return (
    <>
      <Accordion allowToggle style={{ backgroundColor: "#212529" }} mb="4">
        <AccordionItem
          style={{ borderRadius: "15px", border: "1px solid white" }}
          textAlign={"justify"}
        >
          <h1>
            <AccordionButton fontWeight={500} height={""}>
              <Box as="span" flex="1" textAlign="left">
                {" "}
                &nbsp;
                {props.projectTitle}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h1>
          <AccordionPanel pb={4}>
            {/* Type */}
            <Box
              as="span"
              flex="1"
              color="#44a48c"
              textAlign="left"
              fontWeight={700}
              mb={5}
            >
              Commissioned by : &nbsp;
            </Box>
            {props.commissionedBy} <br />
            {/* Purpose */}
            <Box
              as="span"
              flex="1"
              color="#44a48c"
              textAlign="left"
              fontWeight={700}
            >
              Countries : &nbsp;
            </Box>
            <Box ml={5} mb={5}>
              {props.countries}
            </Box>
            {/* Structure And Functions */}
            <Box
              as="span"
              flex="1"
              color="#44a48c"
              textAlign="left"
              fontWeight={700}
            >
              Overall Term :
            </Box>
            <Box ml={5} mb={5}>
              {props.overallTerm}
            </Box>
            {/*Typical use */}
            <Box
              as="span"
              flex="1"
              color="#44a48c"
              textAlign="left"
              fontWeight={700}
            >
              Executing Agencies :
            </Box>
            <Box ml={5} mb={5}>
              {props.executingAgencies}
            </Box>
            <Link
              onClick={() => {
                props.clicked(true);
              }}
              fontWeight={700}
              textDecoration="underline"
            >
              View more...
            </Link>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default CaseAccordian;

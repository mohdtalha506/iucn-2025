import React, { useState, useEffect } from "react";
import { Box, Text, Spinner } from "@chakra-ui/react";
import Accordian from "../Accordians/ToolsAccordian";
import Case4Content from "../../assets/defaultCaseData.json";
import CaseAccordian from "../Accordians/CaseAccordian";

const CaseComponent4 = ({ searchTerm, tNumber, cl }) => {
  useEffect(() => {
    searchText();
  }, [searchTerm]);

  const caseContent = Case4Content[3];
  const [searchResult, setSearchResult] = useState(null);
  const [isResultFound, setIsResultFound] = useState(false);
  const [isClicked, setClicked] = useState(false);
  useEffect(() => {
    if (typeof tNumber !== "undefined") {
      if (isClicked) {
        tNumber(caseContent.case);
        cl(true);
      }
    }
  }, [isClicked]);
  const searchText = () => {
    const searchTermLC = searchTerm.toLowerCase();
    const caseContentValues = Object.values(caseContent);
    const isMatched = caseContentValues.some((value) =>
      value.toLowerCase().includes(searchTermLC)
    );
    const result = isMatched ? caseContent : null;
    setSearchResult(result);
    // console.log(result);
    if (result === null) {
      setIsResultFound(false);
    }
  };
  //   if (searchTerm) {
  //     searchText(searchTerm);
  //   } else {
  //     setSearchResult(null);
  //   }
  const highlightSearchTerm = (text) => {
    const searchTermLC = searchTerm.toLowerCase();
    const index = text.toLowerCase().indexOf(searchTermLC);
    if (index === -1) return text;
    const before = text.slice(0, index);
    const match = text.slice(index, index + searchTerm.length);
    const after = text.slice(index + searchTerm.length);
    return (
      <>
        {before}
        <Text as="span" bg="yellow" fontWeight="bold" color="black">
          {match}
        </Text>
        {after}
      </>
    );
  };
  if (!searchResult) {
    return null;
  }

  return (
    <>
      <Box color={"black"}>
        {searchResult ? (
          <CaseAccordian
          clicked={setClicked}
          projectTitle={highlightSearchTerm(searchResult.projectTitle)}
          commissionedBy={searchResult.commissionedBy}
          countries={searchResult.countries}
          overallTerm={searchResult.overallTerm}
          executingAgencies={searchResult.executingAgencies}
          case={searchResult.case}/>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
};
export default CaseComponent4;

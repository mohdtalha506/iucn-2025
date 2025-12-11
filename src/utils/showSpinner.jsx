import React from "react";
import { Box } from "@chakra-ui/react";
import { Spinner } from "react-bootstrap";
import ToolCard from "../components/Tools/ToolCard";
import ToolDetail from "../components/Tools/ToolDetail";
import { filterTools, findToolById } from "./filteredComponents";
import CaseComponent1 from "../components/Cases/Case1";
import CaseComponent2 from "../components/Cases/Case2";
import CaseComponent3 from "../components/Cases/Case3";
import CaseComponent4 from "../components/Cases/Case4";
import CaseComponent5 from "../components/Cases/Case5";
import CaseComponent6 from "../components/Cases/Case6";

export const showSpinner = ({
  showLoader = false,
  searchTerm = "",
  toolNumber,
  setToolNumber,
  setClicked,
  isClicked = false,
}) => {
  if (showLoader) {
    return (
      <Box textAlign="center" mt="4" border="1px solid">
        <Spinner />
      </Box>
    );
  }

  const tools = filterTools({ searchTerm });
  const selectedTool = findToolById(toolNumber);

  const handleSelect = (id) => {
    setToolNumber(Number(id));
    setClicked(true);
  };

  const resultHeading = (
    <Box
      textAlign="start"
      mt="-3"
      mb="4"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <span>Showing results for </span> &nbsp;
        <span
          style={{
            fontWeight: "600",
            color: "#5ae6b8",
          }}
        >
          {`${searchTerm}`}
        </span>
      </div>
      {isClicked && (
        <button
          className="btn backBtn"
          style={{ textAlign: "end" }}
          onClick={() => {
            setToolNumber();
            setClicked(false);
          }}
        >
          Back
        </button>
      )}
    </Box>
  );

  const toolList = tools.map((tool) => (
    <ToolCard
      key={`spinner-tool-${tool.id}`}
      tool={tool}
      searchTerm={searchTerm}
      onSelect={handleSelect}
    />
  ));

  const caseList = [
    <CaseComponent1
      key="case-1"
      searchTerm={searchTerm}
      cl={setClicked}
      tNumber={setToolNumber}
    />,
    <CaseComponent2
      key="case-2"
      searchTerm={searchTerm}
      cl={setClicked}
      tNumber={setToolNumber}
    />,
    <CaseComponent3
      key="case-3"
      searchTerm={searchTerm}
      cl={setClicked}
      tNumber={setToolNumber}
    />,
    <CaseComponent4
      key="case-4"
      searchTerm={searchTerm}
      cl={setClicked}
      tNumber={setToolNumber}
    />,
    <CaseComponent5
      key="case-5"
      searchTerm={searchTerm}
      cl={setClicked}
      tNumber={setToolNumber}
    />,
    <CaseComponent6
      key="case-6"
      searchTerm={searchTerm}
      cl={setClicked}
      tNumber={setToolNumber}
    />,
  ];

  const SearchResults = () => (
    <>
      <h5>Tools result</h5>
      {toolList}
      <hr />
      <h5>Case studies result</h5>
      {caseList}
    </>
  );

  return (
    <>
      {resultHeading}
      {isClicked && selectedTool ? (
        <ToolDetail tool={selectedTool} />
      ) : (
        <SearchResults />
      )}
    </>
  );
};
import React, { useMemo } from "react";
import { Box, Text } from "@chakra-ui/react";
import Accordian from "../Accordians/ToolsAccordian";
import { matchesSearchTerm } from "../../utils/filteredComponents";

const highlightText = (value, searchTerm) => {
  if (!searchTerm || typeof value !== "string") return value;

  const lowerSearch = searchTerm.toLowerCase();
  const lowerValue = value.toLowerCase();
  const index = lowerValue.indexOf(lowerSearch);

  if (index === -1) return value;

  const before = value.slice(0, index);
  const match = value.slice(index, index + searchTerm.length);
  const after = value.slice(index + searchTerm.length);

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

const ToolCard = ({ tool, searchTerm = "", onSelect }) => {
  const shouldRender = useMemo(
    () => matchesSearchTerm(tool, searchTerm),
    [tool, searchTerm]
  );

  if (!shouldRender) return null;

  const handleClick = () => {
    if (onSelect) onSelect(tool.id);
  };

  return (
    <Box color="black">
      <Accordian
        clicked={handleClick}
        heading={highlightText(tool.headingText, searchTerm)}
        category={tool.categoryLabel || tool.category}
        type={highlightText(tool.type, searchTerm)}
        purpose={highlightText(tool.Purpose, searchTerm)}
        Structure_and_function={highlightText(
          tool.Structure_and_function,
          searchTerm
        )}
        typical_use={highlightText(tool.Typical_Use, searchTerm)}
        Additional_potential_uses={tool.Additional_Potential_Uses}
        level_of_appl={tool.Level_Of_Application}
        skill_and_resource={tool.Skill_And_Resources_Required}
        Strengths={tool.Strengths}
        Weaknesses={tool.Weaknesses}
        Reference={tool.Reference}
        Route={tool.route}
      />
    </Box>
  );
};

export default ToolCard;


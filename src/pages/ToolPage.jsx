import React from "react";
import { useParams } from "react-router-dom";
import "../tools.css"
import ToolDetail from "../components/Tools/ToolDetail";
import { findToolById } from "../utils/filteredComponents";

const ToolPage = ({ toolId, logoDisplay = true }) => {
  const params = useParams();
  const id = toolId || params.id;
  const tool = findToolById(id);

  return <ToolDetail tool={tool} logoDisplay={logoDisplay} />;
};

export default ToolPage;


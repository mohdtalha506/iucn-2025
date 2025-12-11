import React from "react";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../../assets/PCAKnowledge Logo.png";
import "../../tools.css"
const Section = ({ label, value }) => {
  if (!value) return null;

  return (
    <Box>
      <Text fontWeight="bold" color="#2d735c" textTransform="uppercase">
        {label}
      </Text>
      <Text mt={1} whiteSpace="pre-line">
        {value}
      </Text>
    </Box>
  );
};

// Utility function to convert newline-separated text into a list of strings
const parseMultiPointText = (text) => {
  if (!text) return [];
  // Split by newline and trim whitespace from each item
  return text.split('\n').map(item => item.trim()).filter(item => item.length > 0);
};

const ToolDetail = ({ tool, logoDisplay = false }) => {
  if (!tool) {
    return (
      <Box p={6}>
        <Text>Tool not found.</Text>
      </Box>
    );
  }

  // Parse multi-point fields into arrays
  const parsedStructure = parseMultiPointText(tool.Structure_and_function);
  const parsedSkills = parseMultiPointText(tool.Skill_And_Resources_Required);
  const parsedStrengths = parseMultiPointText(tool.Strengths);
  const parsedWeaknesses = parseMultiPointText(tool.Weaknesses);
  const parseTypicalUse = parseMultiPointText(tool.Typical_Use);
  const parsedAddUses = parseMultiPointText(tool.Additional_Potential_Uses);
  const parsedRelated = parseMultiPointText(tool['RELATED RESOURCES / FURTHER READING']);
  const headingText = tool.headingText.split(":");
  

  // Extract date and partners for the first block (assuming they are not consistently in the JSON keys, 
  // but are manually placed in your HTML sample. We will use the values from the JSON data you provided for Tool 1).
  return (
    <>
   <header className="container">
        <div className="row my-2">
          <div className="col mt-2 col-lg-2 d-flex justify-content-start">
            <div className="link-container" style={{ height: "80px", width: "150px" }}>
              {/* Note: The original HTML had the link-container inside the <Link>. Adjusted slightly. */}
              <Link to="/home">
                {!logoDisplay ? <></> : <img src={logo} alt="logo" />}
              </Link>
            </div>
          </div>
          <div className="col col-lg-10" style={{ marginLeft: "-50px" }}>
            <div
              className="d-flex justify-content-start"
              style={{ marginTop: "25px" }}
            >
              {/* Dynamically extract the category from the tool object */}
              <h3>{tool.category}</h3>
            </div>
            {/* Note: The specific sub-category header (h4) is missing from your Tool 1 JSON 
            but is in your original structure HTML. We skip it for now or rely on CSS/JS logic to derive it 
            from tool.category if available (e.g., splitting "3.1 POLICY AND LEGAL FRAMEWORK") */}
            {/* <h4>3.7.2 | COLLABORATIVE MANAGEMENT / SHARED GOVERNANCE</h4> */}
          </div>
        </div>
        <hr className="mt-0" />
      </header>
      <div
        className="container my-5"
        style={{ width: "800px", backgroundColor: "white", color: "black" }}
      >
        <div className="row fw-bold fs-5 height" style={{ height: "110px" }}>
          <div className="col col-md-2 col-sm-2 col-lg-2 border-color bg-fill d-flex align-items-center">
            {/* Dynamic Tool Route */}
            Tool {tool.route}
          </div>
          <div className="col col-md-10 col-sm-10 col-lg-10 heading-dark d-flex align-items-center">
            {/* Dynamic Heading Text */}
            {headingText[1] || ''}
          </div>
        </div>

        {/* --- Date and Partners Row --- */}
        <div className="row ">
          <div className="col col-md-6 col-sm-6 col-lg-6 border-color fs-10">
            {tool.date || ''} 
          </div>
          <div className="col col-md-6 col-sm-6 col-lg-6 border-color">
            {tool.partners || ''}
          </div>
        </div>

        {/* --- TYPE and PURPOSE Headers --- */}
        <div className="row fw-bold ">
          <div className="col col-md-6 col-sm-6 col-lg-6 border-color bg-fill">
            TYPE
          </div>
          <div className="col col-md-6 col-sm-6 col-lg-6 border-color bg-fill">
            PURPOSE
          </div>
        </div>

        {/* --- TYPE and PURPOSE Content --- */}
        <div className="row ">
          <div className="col col-md-6 col-sm-6 col-lg-6 border-color fs-10">
            {/* Dynamic Type */}
            {tool.type}
          </div>
          <div className="col col-md-6 col-sm-6 col-lg-6 border-color">
            {/* Dynamic Purpose */}
            {tool.Purpose}
          </div>
        </div>

        {/* --- STRUCTURE AND FUNCTION Header --- */}
        <div className="row border-color fw-bold bg-fill">
          <div className="col ">STRUCTURE AND FUNCTION</div>
        </div>

        {/* --- STRUCTURE AND FUNCTION Content --- */}
        <div className="row border-color">
          <div className="col">
            {/* Dynamic Structure as Unordered List (using parsedStructure) */}
            {parsedStructure.length > 0 ? (
              <ul>
                {parsedStructure.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>{tool.Structure_and_function || 'N/A'}</p>
            )}
          </div>
        </div>

        {/* --- TYPICAL USE Header --- */}
        <div className="row border-color fw-bold bg-fill">
          <div className="col">TYPICAL USE</div>
        </div>
        {/* --- TYPICAL USE Content --- */}
        <div className="row border-color ">
          <div className="col">
            {/* Dynamic Typical Use */}
            {parseTypicalUse.length > 0 ? (
              <ul>
                {parseTypicalUse.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <>
              {!tool.Typical_Use && 'N/A'}
              </>
              // <p>{tool.parseTypicalUse || 'N/A'}</p>
            )}
          </div>
        </div>

        {/* --- ADDITIONAL POTENTIAL USES Header --- */}
        <div className="row border-color fw-bold bg-fill">
          <div className="col">ADDITIONAL POTENTIAL USES</div>
        </div>
        {/* --- ADDITIONAL POTENTIAL USES Content --- */}
        <div className="row border-color ">
          <div className="col">
            {/* Dynamic Additional Potential Uses */}
            {parsedAddUses.length > 0 ? (
              <ul>
                {parsedAddUses.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>{tool.Additional_Potential_Uses || 'N/A'}</p>
            )}
          </div>
        </div>

        {/* --- LEVEL OF APPLICATION Header --- */}
        <div className="row border-color fw-bold bg-fill">
          <div className="col">LEVEL OF APPLICATION</div>
        </div>
        {/* --- LEVEL OF APPLICATION Content --- */}
        <div className="row border-color ">
          <div className="col">
            {/* Dynamic Level of Application */}
            {tool.Level_Of_Application || 'N/A'}
          </div>
        </div>

        {/* --- SKILLS AND RESOURCES REQUIRED Header --- */}
        <div className="row border-color fw-bold bg-fill">
          <div className="col">SKILLS AND RESOURCES REQUIRED</div>
        </div>
        {/* --- SKILLS AND RESOURCES REQUIRED Content --- */}
        <div className="row border-color ">
          <div className="col">
            {/* Dynamic Skills and Resources as Unordered List */}
            {parsedSkills.length > 0 ? (
              <ul>
                {parsedSkills.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>{tool.Skill_And_Resources_Required || 'N/A'}</p>
            )}
          </div>
        </div>

        {/* --- STRENGTHS / WEAKNESSES Headers --- */}
        <div className="row border-color fw-bold bg-fill">
          <div className="col col-md-6 col-sm-6 col-lg-6 border ">
            STRENGTHS
          </div>
          <div className="col col-md-6 col-sm-6 col-lg-6 border ">
            WEAKNESSES
          </div>
        </div>
        {/* --- STRENGTHS / WEAKNESSES Content --- */}
        <div className="row border-color">
          <div className="col col-md-6 col-sm-6 col-lg-6 border-color">
            {/* Dynamic Strengths as Unordered List */}
            {parsedStrengths.length > 0 ? (
              <ul>
                {parsedStrengths.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>{tool.Strengths || 'N/A'}</p>
            )}
          </div>
          <div className="col col-md-6 col-sm-6 col-lg-6 border-color">
            {/* Dynamic Weaknesses as Unordered List */}
            {parsedWeaknesses.length > 0 ? (
              <ul>
                {parsedWeaknesses.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>{tool.Weaknesses || 'N/A'}</p>
            )}
          </div>
        </div>

        {/* --- REFERENCE Header --- */}
        <div className="row border-color fw-bold bg-fill">
          <div className="col">REFERENCE</div>
        </div>
        {/* --- REFERENCE Content --- */}
        <div className="row border-color">
          <div className="col">
            {/* Dynamic Reference */}
            <p>{tool.Reference || 'N/A'}</p>
          </div>
        </div>

        {/* --- VERSIONS AND/OR MODIFICATIONS Header --- */}
        <div className="row border-color fw-bold bg-fill">
          <div className="col">VERSIONS AND/OR MODIFICATIONS</div>
        </div>
        {/* --- VERSIONS AND/OR MODIFICATIONS Content --- */}
        <div className="row border-color ">
          <div className="col">
            {/* Dynamic Versions/Modifications - treat as single point */}
            <p>{tool.Versions_and_modifications || 'N/A'}</p>
          </div>
        </div>
        
        {/* --- DOCUMENTED EXPERIENCE Header --- */}
        <div className="row border-color fw-bold bg-fill">
          <div className="col">DOCUMENTED EXPERIENCE</div>
        </div>
        {/* --- DOCUMENTED EXPERIENCE Content --- */}
        <div className="row border-color ">
          <div className="col">
            {/* Dynamic Documented Experience - treat as single point */}
            <p>{tool.Documented_Experience || 'N/A'}</p>
          </div>
        </div>

        {/* --- RELATED RESOURCES/FURTHER READING Header --- */}
        <div className="row border-color fw-bold bg-fill">
          <div className="col">RELATED RESOURCES/FURTHER READING</div>
        </div>
        {/* --- RELATED RESOURCES/FURTHER READING Content --- */}
        <div className="row border-color">
          <div className="col">
            {/* Dynamic Related Resources as Unordered List */}
            {parsedRelated.length > 0 ? (
              <ul>
                {parsedRelated.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>{tool['RELATED RESOURCES / FURTHER READING'] || 'N/A'}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ToolDetail;


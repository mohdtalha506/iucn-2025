import React, { useEffect, useState } from "react";
import logo from "../../assets/PCAKnowledge Logo.png";
import { Link, Navigate } from "react-router-dom";
import {
  Heading,
  Spinner,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Case1 from "./Case1";
import Case2 from "./Case2";
import Case3 from "./Case3";
import Case4 from "./Case4";
import Case5 from "./Case5";
import Case6 from "./Case6";
import Footer from "../../components/NewComponents/Footer";
import { AnimatePresence, motion } from "framer-motion";
import { SplitText } from "../../components/NewComponents/SplitText";
const CaseHome = () => {
  const [caseStudy, setCaseStudy] = useState(1);
  const [isSpinner, setSpinner] = useState(false);

  useEffect(() => {
    setSpinner(true);
    setTimeout(() => {
      setSpinner(false);
    }, 800);
  }, [caseStudy]);

  const returnCaseStudy = (caseNo) => {
    switch (caseNo) {
      case 1:
        return (
          <>
            <TabPanel>
              <Case1 />
            </TabPanel>
          </>
        );
      case 2:
        return (
          <>
            <TabPanel>
              <Case2 />
            </TabPanel>
          </>
        );
      case 3:
        return (
          <>
            <TabPanel>
              <Case3 />
            </TabPanel>
          </>
        );
      case 4:
        return (
          <>
            <TabPanel>
              <Case4 />
            </TabPanel>
          </>
        );
      case 5:
        return (
          <>
            <TabPanel>
              <Case5 />
            </TabPanel>
          </>
        );
      case 6:
        return (
          <>
            <TabPanel>
              <Case6 />
            </TabPanel>
          </>
        );

      default:
        return (
          <>
            <TabPanel>
              <Case1 />
            </TabPanel>
          </>
        );
    }
  };

  const logoStyle = {
    boxShadow:
      "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
    borderRadius: "100px",
    border: "3px solid #049ddb",
    cursor: "pointer",
  };

  const defaultStyle = {
    fontFamily: "sans-serif",
    textAlign: "center",
    fontSize: "30px",
    fontWeight: "700",
    letterSpacing: "1px",
    lineHeight: "1.2",
    margin: "auto",
    marginBottom: "-1.5rem",
    color: "#fff",
  };

  return (
    <>
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
              Case Studies
              </SplitText>
            </motion.div>
        </AnimatePresence>
      </div>
      {/* <div className="row" style={{ marginTop: "2em" }}>
        <div className="col-2">
          <button onClick={() => setCaseStudy(1)} className="caseButton">
            Case 1
          </button>
        </div>
        <div className="col-2">
          <button onClick={() => setCaseStudy(2)} className="caseButton">
            Case 2
          </button>
        </div>
        <div className="col-2">
          <button onClick={() => setCaseStudy(3)} className="caseButton">
            Case 3
          </button>
        </div>
        <div className="col-2">
          <button onClick={() => setCaseStudy(4)} className="caseButton">
            Case 4
          </button>
        </div>
        <div className="col-2">
          <button onClick={() => setCaseStudy(5)} className="caseButton">
            Case 5
          </button>
        </div>
        <div className="col-2">
          <button onClick={() => setCaseStudy(6)} className="caseButton">
            Case 6
          </button>
        </div>
        {/* <div className="col-lg-3 col-md-3"> */}
      {/* <div className="left-sidebar">
            <div className="sidebar-header d-flex align-items-center justify-content-between">
              <img
                src={logo}
                className="bg-transparent"
                alt="logo"
                style={logoStyle}
                onClick={() => (window.location.href = "/home")}
              />
            </div>
            <div className="all_menuHere">
              <ul className="MenuLinks_here align-items-center  justify-content-center">
                {/* <li>
                <Link href="/casestudies/Index">
                  Policy and Legal Framework
                </Link>
              </li> 
                <li onClick={() => setCaseStudy(1)}>Case Study 1</li>
                <li onClick={() => setCaseStudy(2)}>Case Study 2</li>
                <li onClick={() => setCaseStudy(3)}>Case Study 3</li>
                <li onClick={() => setCaseStudy(4)}>Case Study 4</li>
                <li onClick={() => setCaseStudy(5)}>Case Study 5</li>
                <li onClick={() => setCaseStudy(6)}>Case Study 6</li>
              </ul>
            </div>
          </div> 
      </div> */}

      <Tabs position="center" variant="unstyled" className="mt-4 mx-auto">
        <TabList>
          <Tab>Case 1</Tab>
          <Tab>Case 2</Tab>
          <Tab>Case 3</Tab>
          <Tab>Case 4</Tab>
          <Tab>Case 5</Tab>
          <Tab> Case 6</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel>
            <Case1 />
          </TabPanel>

          <TabPanel>
            <Case2 />
          </TabPanel>
          <TabPanel>
            <Case3 />
          </TabPanel>
          <TabPanel>
            <Case4 />
          </TabPanel>
          <TabPanel>
            <Case5 />
          </TabPanel>
          <TabPanel>
            <Case6 />
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* {isSpinner ? (
        <div className="col-lg-12">
          <div className="caseStudyDiv d-flex align-items-center justify-content-around">
            <div className="d-flex align-items-center justify-content-around text-center">
              <Spinner className="Spinner" style={{ marginTop: "4em" }} />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="col-lg-12">
            <div className="caseStudyDiv d-flex align-items-center justify-content-around">
              {/* <div className="row">{returnCaseStudy(caseStudy)}</div> 
            </div>
          </div>
        </>
      )} */}
      {/* <div className="col-lg-8 offset-lg-3">
          <Footer />
        </div> */}
      {/* </div> */}
    </>
  );
};

export default CaseHome;

import React, { useEffect, useState } from "react";
import logo from "../../assets/PCAKnowledge Logo.png";
import { Link, Navigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import Case1 from "./Case1";
import Case2 from "./Case2";
import Case3 from "./Case3";
import Case4 from "./Case4";
import Case5 from "./Case5";
import Case6 from "./Case6";
import Footer from "../../components/NewComponents/Footer";

const Index = () => {
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
        return <Case1 />;
      case 2:
        return <Case2 />;
      case 3:
        return <Case3 />;
      case 4:
        return <Case4 />;
      case 5:
        return <Case5 />;
      case 6:
        return <Case6 />;

      default:
        return <Case1 />;
    }
  };

  const logoStyle = {
    boxShadow:
      "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
    borderRadius: "100px",
    border: "3px solid #049ddb",
    cursor: "pointer",
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-3">
            <div className="left-sidebar">
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
              </li> */}
                  <li onClick={() => setCaseStudy(1)}>Case Study 1</li>
                  <li onClick={() => setCaseStudy(2)}>Case Study 2</li>
                  <li onClick={() => setCaseStudy(3)}>Case Study 3</li>
                  <li onClick={() => setCaseStudy(4)}>Case Study 4</li>
                  <li onClick={() => setCaseStudy(5)}>Case Study 5</li>
                  <li onClick={() => setCaseStudy(6)}>Case Study 6</li>
                </ul>
              </div>
            </div>
          </div>

          {isSpinner ? (
            <div className="col-lg-9">
              <div className="caseStudyDiv d-flex align-items-center justify-content-around">
                <div className="d-flex align-items-center justify-content-around text-center">
                  <Spinner className="Spinner" style={{ marginTop: "4em" }} />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="col-lg-9">
                <div className="caseStudyDiv d-flex align-items-center justify-content-around">
                  <div className="">
                    <>{returnCaseStudy(caseStudy)}</>
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="col-lg-8 offset-lg-3">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;

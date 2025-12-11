import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

const StickyNav = (props) => {
  const [stickyClass, setStickyClass] = useState("d-none");
  const controls = useAnimation();

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      if (windowHeight > 400) {
        setStickyClass("position-fixed");
        controls.start({ y: 0, opacity: 1, transition: { duration: 0.2 } });
      } else {
        setStickyClass("d-none");
        controls.start({ y: -50, opacity: 0, transition: { duration: 0.2 } });
      }
    }
  };

  const navVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <>
      <motion.div
        className={`col-xl-8 col-lg-8 col-md-12 col-12 col-sm-12 col-12 bg-dark sticky_menu ${stickyClass}`}
        variants={navVariants}
        initial="hidden"
        animate={controls}
        style={{ backgroundColor: "#ffffff" }} // Set a solid background color
      >
        <nav className="stickNav px-1">
          <ul>
            {Object.keys(props.children[0]).map((item) => (
              <Dropdown as={ButtonGroup} key={item} className="sticky_Dropdown">
                <Dropdown.Toggle split variant="success" />
                <Button
                  style={{ fontSize: "12.4px" }}
                  variant="success"
                  onClick={() => {
                    console.log(item,"item");
                    if(item==="Sound Design and Planning" || item === "Good Governance"){
                    props.setIsFromCategory(true);
                    props.setDisplay("results");
                    props.setIsSolutionsTabClicked(false);
                    props.setEcosystemFilters([]);
                    props.setThemeFilters([]);
                     props.setPanoramaEcosystemFilters([]);
            props.setPanoramaThemeFilters([]);
                    props.setSearchTerm("");
                    props.menuItem(props.children[0][item]);
                    props.setTitleHeading(item);
                    }
                  }}
                >
                  {item}
                </Button>


                <Dropdown.Menu className="menuItem">
                  {props.children[0][item].map((itemKey, idx) => (
                    <li className="d-flex"
                      key={itemKey}
                      onClick={(event) => {
                        props.setIsFromCategory(true);
                        props.setSearchTerm("");
                        props.setIsSolutionsTabClicked(false);
                    props.setEcosystemFilters([]);
                    props.setThemeFilters([]);
                     props.setPanoramaEcosystemFilters([]);
            props.setPanoramaThemeFilters([]);
                        props.menuItem(itemKey);
                        props.setTitleHeading("");
                      }}
                    >
                      {item === "Good Governance" ?
                        <b className="SetNumber">1.{idx + 1} </b>
                        : item === "Sound Design and Planning" ?
                          <b className="SetNumber">2.{idx + 1} </b>
                          : item === "Effective Management" ?
                            <b className="SetNumber">3.{idx + 1} </b>
                            : item === "Successful Conservation Outcomes" ?
                              <b className="SetNumber">4.{idx + 1} </b>
                              : ''
                      }
                      <span className="setTextAlignment"> {itemKey} </span>
                    </li>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            ))}
          </ul>
        </nav>
      </motion.div>
    </>
  );
};

export default StickyNav;

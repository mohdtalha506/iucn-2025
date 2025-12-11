import React, { useEffect, useRef, useState } from "react";
import {
  Drawer,
  DrawerBody,
  useDisclosure,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import StickyNav from "./StickyNav";

const RightMenu = ({ setDisplay }, props) => {
  const [stickyClass, setStickyClass] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = useRef();

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 400 ? setStickyClass("rtMenu") : setStickyClass("");
    }
  };

  return (
    <>

      <div className="col-lg-1">
        <div className={` ${stickyClass} right-menu `}>
          <i onClick={onOpen} className="fa fa-bars icon-menu text-light fixed" aria-hidden="true" ></i>
        </div>
        {/* <StickyNav/> */}
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
          bg="#000"
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <div className="right_sidebar_here">
                <nav>
                  <ul>
                    <li
                      onClick={() => {
                        setDisplay("home");
                        onClose();
                      }}
                    >
                      <Link to="/home">
                        <i className="fa fa-home"></i>&nbsp; Home
                      </Link>
                    </li>
                    <li
                      onClick={() => {
                        setDisplay("about");
                        onClose();
                      }}
                    >
                      <Link to="">
                        <i className="fa fa-info-circle"></i>&nbsp; About the Knowledge Kit
                      </Link>
                    </li>
                    <li
                      onClick={() => {
                        setDisplay("cs");
                        onClose();
                      }}
                    >
                      <Link>
                        <i className="fa fa-file-text"></i>&nbsp; Case Studies
                      </Link>
                    </li>

                    <li
                      onClick={() => {
                        setDisplay("reference");
                        onClose();

                      }}
                    >
                      <Link>
                        <i className="fa fa-retweet"></i>&nbsp; Further
                        Reference
                      </Link>
                    </li>
                    <li
                      onClick={() => {
                        // setDisplay("download");
                        onClose();
                      }}
                    >
                      <Link target="_blank" to="/download">
                        <i className="fa fa-download"></i> &nbsp; Download
                      </Link>
                    </li>
                    <li
                      onClick={() => {
                        setDisplay("contact");
                        onClose();
                      }}
                    >
                      <Link>
                        <i className="fa fa-user-circle"></i> &nbsp; Contact Us
                      </Link>
                    </li>
                    {/* <li>
                    <a href="#">
                      <i
                        className="fa-brands fa-windows"
                        aria-hidden="true"
                      ></i>{" "}
                      &nbsp; Download PCA KnowledgeKit
                    </a>
                  </li> */}
                  </ul>
                </nav>
              </div>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default RightMenu;

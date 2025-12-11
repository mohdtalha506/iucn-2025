import { Dropdown } from "react-bootstrap";
import { React, useState } from "react";
import Picture1 from "../../assets/Picture1.png";
const DropDownComponent = (props) => {
  let res = "";
  props.menuItems.map((item) => {
    res += item;
  });
  const [showDropdown, setShowDropdown] = useState(false);

   const handleCardClick = () => {
    setShowMenu(!showMenu);
  };

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };
  const handleMouseLeave = () => {
    setShowDropdown(false);
  };
  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-auto menuHovered"
        id="titleCard"
      >
        <Dropdown
          className="w-100"
          show={showDropdown}
          onClick={() => {
            props.setToolNumber();
            props.setClicked(false)
            props.setIsFromCategory(true);
            props.setDisplay("results");
            props.setIsSolutionsTabClicked(false);
            props.setEcosystemFilters([]);
            props.setThemeFilters([]);
            props.setPanoramaEcosystemFilters([]);
            props.setPanoramaThemeFilters([]);
            props.setSearchTerm("");
            if (Array.isArray(props.title.props.children)) {
              props.setTitleHeading(
                props.title.props.children
                  .filter((item) => typeof item === "string")
                  .join("")
              );
            } else {
              props.setTitleHeading(props.title.props.children);
            }
            // props.setTitleHeading
            props.menuItem(props.menuItems);
          }}
        >
          <div className="w-100" id="dropdown-basic">
            <div className="img_icon_here">
              <center>
                <img src={props.img} alt="" />
              </center>
            </div>
            <div className="title_here text-center ">
              <p>{props.title}</p>
            </div>
          </div>
          <Dropdown.Menu
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
            className="menuItem"
          >
            {props.menuItems.map((item, idx) => (
              <li
                className="d-flex align-content"
                onClick={(event) => {
                  props.setToolNumber();
                  props.setClicked(false)
                  props.setIsFromCategory(true);
                  props.setSearchTerm("");
                    props.setIsSolutionsTabClicked(false);
            props.setEcosystemFilters([]);
            props.setThemeFilters([]);
            props.setPanoramaEcosystemFilters([]);
            props.setPanoramaThemeFilters([]);
                  props.setTitleHeading("");
                  event.stopPropagation();
                  props.menuItem(item);
                  props.setDisplay("results");
                }}
              >
                <b className="SetNumber">{props.cardNum}.{idx + 1} </b>
                <span className="setTextAlignment">{item}</span>
              </li>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
};

export default DropDownComponent;

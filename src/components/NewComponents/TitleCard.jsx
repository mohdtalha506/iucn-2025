import React from "react";

const TitleCard = (props) => {
  let res = "";
  props.menuItems.map((item) => {
    res += item;
  });

  const handleCardClick = () => {
    props.setIsFromCategory(true);
    props.setDisplay("results");
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
  };
  return (
    <>
      <div
        className="col-lg-3 col-md-3 col-sm-6"
        onClick={props.onClick}
        menuItems={props.menuItems}
      >
        <div className="card" onClick={handleCardClick}>
          <div className="img_icon_here">
            <center>
              <img src={props.img} alt="" />
            </center>
          </div>
          <div className="title_here">
            <p>{props.title}</p>
            {props.menuItems?.length > 0 && (
              <div className="hover-menu">
                <ul>
                  {props.menuItems?.map((item, index) => (
                    <li
                      key={index}
                      className="menu-head"
                      onClick={(event) => {
                        props.setIsFromCategory(true);
                        props.setSearchTerm("");
                        props.setTitleHeading("");
                        event.stopPropagation();
                        console.log(item);
                        props.menuItem(item);

                        props.setDisplay("results");
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TitleCard;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { URLMENU } from "../utils/Url";

const MainNavBar = () => {
  const [ishover, setIshover] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);

  const [menus, setMenus] = useState([]);

  const handleMouseEnter = (menu) => {
    setIshover(true);
    setHoveredMenu(menu);
  };

  useEffect(() => {
    axios
    .get(`${URLMENU}`)
      .then((response) => setMenus(response.data["hydra:member"]))
      .catch((error) => console.error("Error fetching menus:", error));
  }, []);

  console.log("menu", menus);

  return (
    <>
      <div
        className="flex max-lg:hidden z-50 w-1/12  fixed"
        onMouseLeave={() => setIshover(false)}
      >
        <nav className="">
          <Link to={"/"}>
            <h3>Home</h3>
          </Link>
          {Array.isArray(menus) &&
            menus.map((menu) => (
              <div key={menu.id} className="">
                <div className="" onMouseEnter={handleMouseEnter}>
                  <h3
                    onMouseEnter={() => handleMouseEnter(menu)}
                    className="cursor-pointer"
                  >
                    {menu.name}
                  </h3>
                </div>
              </div>
            ))}
        </nav>
        {Array.isArray(menus) &&
          menus.map(
            (menu) =>
              hoveredMenu &&
              hoveredMenu.id === menu.id &&
              menu.submenus &&
              menu.submenus.length > 0 && (
                <div className={` min-h-96  ${ishover ? "visible   " : "hidden"}`}>
                  {menu.submenus.map(
                    (subMenu) =>
                      subMenu.children &&
                      subMenu.children.length > 0 && (
                        <div
                          key={subMenu.id}
                          className=" w-[50rem] bg-slate-100 shadow-lg"
                        >
                          <h4 className="border-b text-slate-950 font-bold bg-slate-300">
                            {subMenu.name}
                          </h4>
                          <div
                            style={{ paddingLeft: "20px" }}
                            className="flex-container"
                          >
                            {subMenu.children.map((child) =>
                              child.menuContents &&
                              child.menuContents.length > 0 ? (
                                <div key={child.id} className="flex-item">
                                  {menu.name === "Composants" ? (
                                    <Link
                                      to={`/codeMirror/${child.menuContents[0]
                                        .split("/")
                                        .pop()}`}
                                    >
                                      <h5>{child.name}</h5>
                                    </Link>
                                  ) : (
                                    <Link
                                      to={`/article/${child.menuContents[0]
                                        .split("/")
                                        .pop()}`}
                                    >
                                      <h5>{child.name}</h5>
                                    </Link>
                                  )}
                                </div>
                              ) : (
                                <h5> vide : {child.name}</h5>
                              )
                            )}
                          </div>
                        </div>
                      )
                  )}
                </div>
              )
          )}
      </div>
    </>
  );
};

export default MainNavBar;

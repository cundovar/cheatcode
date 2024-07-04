import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { URLMENU } from "../utils/Url";

const MainNavBar = () => {
  const [ishover, setIshover] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);

  const [menus, setMenus] = useState([]);
const onClickMenu=()=>{
  setIshover(false);


}
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
        className="flex max-lg:hidden z-50 w-2/12 h-full fixed"
        onMouseLeave={() => setIshover(false)}
      >
        <nav className=" h-full w-full     ">
          <div className=" pr-4 overflow-y-auto  h-full pb-52">
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


          </div>
        </nav>
        {Array.isArray(menus) &&
          menus.map(
            (menu) =>
              hoveredMenu &&
              hoveredMenu.id === menu.id &&
              menu.submenus &&
              menu.submenus.length > 0 && (
                <div className={` h-screen ${ishover ? "visible   " : "hidden"}`}>
                  <div className="overflow-y-auto  h-full pb-52">
                  {menu.submenus.map(
                    (subMenu) =>
                      subMenu.children &&
                      subMenu.children.length > 0 && (
                        <div
                          key={subMenu.id}
                          className=" w-[50rem] text-slate-500 bg-slate-100 shadow-lg"
                        >
                          <h4 className="border-b  font-bold bg-slate-300">
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
                                        onClick={onClickMenu}
                                    >
                                      <h5>{child.name}</h5>
                                    </Link>
                                  ) : (
                                    <Link
                                      to={`/article/${child.menuContents[0]
                                        .split("/")
                                        .pop()}`}
                                        onClick={onClickMenu}
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
              
                </div>
              )
          )}
      </div>
    </>
  );
};

export default MainNavBar;

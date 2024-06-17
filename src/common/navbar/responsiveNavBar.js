import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Assuming you're using react-router-dom for navigation
import { URLMENU } from "../utils/Url";

export default function Navbar({ fixed }) {
  const [menus, setMenus] = useState([]);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
 

  useEffect(() => {
    axios
      .get(URLMENU)
      .then((response) => {
        const menusData = response.data["hydra:member"];
       
        setMenus(menusData);
     

        
      })

      .catch((error) => console.error("Error fetching menus:", error));
  }, []);

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  console.log("mm",menus)

  return (
    <nav className="relative  flex flex-wrap items-center justify-between  mb-3">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <a
            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
            href="#pablo"
          ></a>
          <button
            className="text-white cursor-pointer p-1 w-10 h-10 mt-2 leading-none  border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            {navbarOpen ? (
              <p className="text-2xl">x</p>
            ) : (
              <p className="text-2xl">=</p>
            )}
          </button>
        </div>
        <div
          className={
            "lg:flex flex-grow " +
            (navbarOpen
              ? " flex flex-col justify-start items-start"
              : " hidden")
          }
          id="example-navbar-danger"
        >
          <div id="accordion-open" className="w-full " data-accordion="open">
            {Array.isArray(menus) &&
              menus.map((menu, index) => (
                <div key={menu.id}>
                  <h2 id={`accordion-open-heading-${index}`}>
                    <button
                      type="button"
                      className="flex items-center justify-between w-full font-medium rtl:text-right text-gray-500  dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 gap-3"
                      data-accordion-target={`#accordion-open-body-${index}`}
                      aria-expanded={openMenuIndex === index}
                      aria-controls={`accordion-open-body-${index}`}
                      onClick={() => toggleMenu(index)}
                    >
                      <span className="flex items-center">{menu.name}</span>
                      <svg
                        data-accordion-icon
                        className={`w-3 h-3 transition-transform ${
                          openMenuIndex === index ? "rotate-180" : ""
                        } shrink-0`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          strokeWidth="2"
                          d="M9 5 5 1 1 5"
                        />
                      </svg>
                    </button>
                  </h2>
                  <div
                    id={`accordion-open-body-${index}`}
                    className={`${
                      openMenuIndex === index ? "block" : "hidden"
                    }`}
                    aria-labelledby={`accordion-open-heading-${index}`}
                  >
                    <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                      {menu.submenus && menu.submenus.length > 0 && (
                        <ul>
                          {menu.submenus &&
                            menu.submenus.map((submenu) => (
                              submenu.children && submenu.children.length > 0 && (
                              <Link
                              to={`/tekno/${submenu.id}`}
                                key={submenu.id}
                                onClick={() => setNavbarOpen(!navbarOpen)}
                              >
                                <li>{submenu.name}</li>
                              </Link>

                              )
                            ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

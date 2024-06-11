import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Navbar({ fixed }) {
  const [menus, setMenus] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/menus")
      .then((response) => setMenus(response.data["hydra:member"]))
      .catch((error) => console.error("Error fetching menus:", error));
  }, []);

  console.log("menu", menus);
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="relative overflow-y-auto flex flex-wrap items-center justify-between px-2 py-3 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="#pablo"
            ></a>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow " +
              (navbarOpen ? " flex flex-col justify-start items-start" : " hidden")
            }
            id="example-navbar-danger"
          >
            
<div id="accordion-open" data-accordion="open">
{Array.isArray(menus) &&
              menus.map((menu) => (
    
                <>
  <h2 id="accordion-open-heading-1">
    <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-open-body-1" aria-expanded="true" aria-controls="accordion-open-body-1">
      <span class="flex items-center">{menu.name}</span>
      <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
      </svg>
    </button>
  </h2>
  <div id="accordion-open-body-1" class="hidden" aria-labelledby="accordion-open-heading-1">
    <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
      <p class="mb-2 text-gray-500 dark:text-gray-400">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
      <p class="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" class="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>
    </div>
  </div>

                </>
))}
</div>

            {Array.isArray(menus) &&
              menus.map((menu) => (
                <div key={menu.id} className="">
                  <div className="flex flex-col">
                    <h3 className="cursor-pointer">{menu.name}</h3>
                    
                  </div>
                </div>
              ))}
          </div>
        </div>
      </nav>
    </>
  );
}

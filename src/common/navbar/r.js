import React from 'react';

const MainNavBarr = () => {
  const menus = [
    { id: 1, name: 'Home' },
    { id: 2, name: 'About' },
    { id: 3, name: 'Contact' },
  ];

  return (
    <div className="flex z-50 w-full fixed bg-gray-800 p-4">
      <nav className="flex space-x-4">
        {menus.map((menu) => (
          <a key={menu.id} href={`/${menu.name.toLowerCase()}`} className="text-white hover:text-yellow-500">
            <h3>{menu.name}</h3>
          </a>
        ))}
      </nav>
    </div>
  );
};

export default MainNavBarr;

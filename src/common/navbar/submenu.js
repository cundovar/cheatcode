



import React from "react";
import { Link } from "react-router-dom";

const Submenu = ({ submenus }) => {
    return (
        <div style={{ paddingLeft: '20px' }}>
            {submenus.map(subMenu => (
                <div key={subMenu.id}>
                    <h4>{subMenu.name}</h4>
                    <p style={{color:"red"}}>
                    {subMenu.menuContents && subMenu.menuContents.length > 0 ? (
                    subMenu.children && subMenu.children.length > 0 && (
                        <Link to={`/article/${subMenu.menuContents[0].split('/').pop()}`}>
                        <Submenu submenus={subMenu.children} />
                        <p>gvhdgv</p>
                        </Link>

                    )
                ):("")}

                    </p>
                </div>
            ))}
        </div>
    );
};

export default Submenu;
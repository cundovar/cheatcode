import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { URLMENU, URLSUBMENU } from "../common/utils/Url";
import { Titles } from "../common/components";
import Result from "../common/utils/result";

const TeknoPage = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);

  useEffect(() => {
    axios
      .get(`${URLSUBMENU}/${id}`)
      .then((response) => setContent(response.data))
      .catch((error) => console.error("Error fetching menus:", error));
  }, [id]);
console.log("cont",content)
  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <main className="w-full h-full overflow-y-auto pb-96">
      
      <Titles title={content.name} className=" max-lg:text-4xl" />
      {content.children && content.children.map((sub)=>(
        <div key={sub.id} className="p-3">
            {sub.menuContents && sub.menuContents.length > 0 ?(

             <Link to={`/article/${sub.menuContents[0].id}`}>
             <h3 className=" bg-red-300">{sub.name}</h3>
             </Link>
            ):(
                <p>
                    {sub.name} 

                </p>
            )}
        </div>
      ))}
      {content.submenus && content.submenus.map((submenu) => (
        <div key={submenu.id}  className="p-3">
          <h3 className=" bg-red-300">{submenu.name}</h3>
          {submenu.children && submenu.children.map((child) => (
            <div key={child.id}>
                {child.menuContents && child.menuContents.length > 0 ? (
                <Link to={`/article/${child.menuContents[0].charAt(child.menuContents[0].length - 1)}`}
                                  >
                        <h6 className="text-lg">{child.name}</h6>
                        </Link>

                ):(

<h5>vide :{child.name}</h5>
                )}
            </div>
          ))}
        </div>
      ))}
    </main>
  );
}

export default TeknoPage;

import React, { useEffect, useState } from "react";
import { useSearchResult } from "../common/navbar/resultChearchContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { Titles } from "../common/components";
import { URLMENU } from "../common/utils/Url";




const Home=()=>{
  const [menus, setMenus]=useState([])
  useEffect(()=>{
    axios.get(URLMENU)
    .then(response => setMenus(response.data['hydra:member']))
    .catch(error => console.error('Error fetching menus:', error));
}, []);

// pour extraire le numéro de la chaine de caractère
// Cette fonction utilise une expression régulière pour extraire le premier groupe de chiffres dans une chaîne de caractères.
// La fonction renvoie l'identifiant extrait ou une chaîne vide si aucun identifiant n'est trouvé.
const extractIdFromMenuContent = (menuContent) => {
  const regex = /\d+/;
  const match = menuContent.match(regex);
  return match ? match[0] : "";
};


    const { results } = useSearchResult();
console.log("resultat",results)
    return(
        <main className="h-full w-full p-3 overflow-auto ">

    <Titles title="home" className=" max-lg:text-4xl" />
        <div className="flex flex-col items-center pb-96">
          <div>
      {menus.length > 0 ? (
        menus.map((menu) => (
          <div key={menu.id}>
            <h4 className="w-full bg-red-100 mb-3 mt-3 p-2">{menu.name} </h4>
          
            {menu.submenus && menu.submenus.length > 0 ? (
              menu.submenus.map((submenu) => (
                <div key={submenu.id} className="ml-4 flex flex-wrap">
             
                  {submenu.children && submenu.children.length > 0 ? (
                    submenu.children.map((child) => (
                      child.menuContents && child.menuContents.length > 0 ? (
                        <div className=" border p-2 bg-slate-200 m-3 cursor-pointer hover:bg-slate-300 ">

                      <Link
                                     to={`/article/${extractIdFromMenuContent(child.menuContents[0])}`}
                                     >
                                  
                        <h5>{child.name}</h5>
                        </Link>

                        </div>

                      ):("")

                     
                    ))
                  ) : (
                 ""
                
                  )}
                </div>
              ))
            ) : (
              
              <p>
                pas encore de contenu

              </p>
            
            )}
          </div>
        ))
      ) : (
        <p>Chargement des menus...</p>
      )}
    </div>
         
          </div>
  

       
      </main>
    )
}

export default Home
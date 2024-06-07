import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Prism from "prismjs";
import "prismjs/themes/prism.css"; // Ou un autre thème si vous préférez
import "prismjs/components/prism-javascript"; // Importez les langages que vous souhaitez utiliser
import SearchBar from "../common/navbar/chearchBar";
import { useSearchResult } from "../common/navbar/resultChearchContext";
// Ajoutez d'autres langages ici si nécessaire

const ArticleId = () => {
  const { results } = useSearchResult();
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/menu_contents/${id}`)
      .then((response) => setContent(response.data))
      .catch((error) => console.error("Error fetching menus:", error));
  }, [id]);
  useEffect(() => {
    if (content) {
      Prism.highlightAll(); // Met en évidence tous les éléments de code après le rendu du contenu
    }
  }, [content]);

  console.log("data", content);
  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {results.map((result, index) => (
        <div key={index}>
          <h2>{result.title}</h2>
          <p>{result.content}</p>
        </div>
      ))}

      <h2>{content.title} </h2>
      <div className="w-1/2 text-justify">
        <p className="text-xl">{content.para} </p>
      </div>
      <pre className="language-js">
        <code>{content.content}</code>
      </pre>
      <div className="w-1/2 text-justify">
        <p className="text-xl">{content.para1} </p>
      </div>
      <div className="flex w-full">
        <pre classname={` language-js ${content.image ? "col 6 language-js" : "language-js"}`}>
          <code className="language-js">{content.content1}</code>
        </pre>
        {content.image && (
          <div classname="col-6">
            {content.image ? (
              <img
                src={`http://localhost:8000/images/admin/${content.image}`}
                alt={content.title}
              />
            ) : (
              <p>loading...</p>
            )}
          </div>

          
        )}
      </div>
      
    </>
  );
};

export default ArticleId;

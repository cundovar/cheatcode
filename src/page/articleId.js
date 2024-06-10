import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Prism from "prismjs";
import "prismjs/themes/prism.css"; 
import "prismjs/components/prism-javascript"; 
import SearchBar from "../common/navbar/chearchBar";
import { useSearchResult } from "../common/navbar/resultChearchContext";
import Result from "../common/utils/result";


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
      Prism.highlightAll(); 
    }
  }, [content]);

  console.log("data", content);
  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <main className=" overflow-y-auto flex flex-col   items-center  bg-slate-50 ">
   <Result/>
      <h2>{content.title} </h2>
      <div className="w-1/2 text-justify">
        <div dangerouslySetInnerHTML={{ __html: content.para }} />
      </div>
      <pre className="language-js">
        <code>{content.content}</code>
      </pre>
      <div className="w-1/2 text-justify">
        <div dangerouslySetInnerHTML={{ __html: content.para1 }} />
      </div>
      <div className="flex  w-full">
        <div className={` border m-auto  ${content.image ? "col-6 " : "  "}`}>
          {content.content1 && (
            <pre classname="language-js">
              <code className=" border language-js">{content.content1}</code>
            </pre>
          )}
        </div>
        {content.image ? (
          <div classname="col-6 border">
            {content.image ? (
              <img
                src={`http://localhost:8000/images/admin/${content.image}`}
                alt={content.title}
              />
            ) : (
              <p>loading...</p>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </main>
  );
};

export default ArticleId;

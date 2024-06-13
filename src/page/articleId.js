import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Prism from "prismjs";
import "prismjs/themes/prism.css"; 
import "prismjs/components/prism-javascript"; 
import SearchBar from "../common/navbar/chearchBar";
import { useSearchResult } from "../common/navbar/resultChearchContext";
import Result from "../common/utils/result";
import parse from 'html-react-parser';
import { URLAPI } from "../common/utils/Url";
import { Titles } from "../common/components";

const ArticleId = () => {
  const { results } = useSearchResult();
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);


  const decodeHTMLEntities = (text) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  };
  useEffect(() => {
    axios
    .get(`${URLAPI}/${id}`)
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
    
    <main className=" overflow-y-auto  pb-40 w-full h-full bg-slate-50 ">
    
    <Titles title={content.title}/>
   <Result/>
   <div>
      <div className="lg:w-1/2 m-auto text-justify mb-3">
        <div dangerouslySetInnerHTML={{ __html: content.para }} />

      </div>
      <pre className="language-js lg:w-1/2 w-5/6 m-auto mb-3">
        <code className="">{content.content}</code>
      </pre>
      <div className="lg:w-1/2 m-auto text-justify mb-3">
      {content.para1}
      {parse(decodeHTMLEntities(content.para1))}
      </div>
      <div className="flex  w-full">
        <div className={`  m-auto  ${content.image ? "col-6 " : "  "}`}>
          {content.content1 && (
            <pre classname="language-js">
              <code className="  language-js">{content.content1}</code>
            </pre>
          )}
        </div>
        {content.image && (
            <div className="col-6 border">
              <img
                src={`http://localhost:8000/images/admin/${content.image}`}
                alt={content.title}
              />
            </div>
          )}
      </div>


   </div>
    </main>
    
    
    
    
  );
};

export default ArticleId;

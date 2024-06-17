import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-javascript";

import Result from "../common/utils/result";
import parse from "html-react-parser";
import { URLAPI, URLIMAGE } from "../common/utils/Url";
import { Titles } from "../common/components";

const ArticleId = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);

  const decodeHTMLEntities = (text) => {
    const textarea = document.createElement("textarea");
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
    <main className=" overflow-y-auto  pb-40 w-full h-full max-lg:pb-96 bg-slate-50 ">
      <Titles title={content.title} />
     
      <div className="max-lg:p-3 ">
        <div className="lg:w-1/2 m-auto text-justify mb-3">
          <div dangerouslySetInnerHTML={{ __html: content.para }} />
        </div>
        <pre className="language-js lg:w-1/2 w-full m-auto  mb-3">
          <code className="">{content.content}</code>
        </pre>
        {content.para1 && (
          <div className="lg:w-1/2 m-auto text-justify mb-3">
            <div dangerouslySetInnerHTML={{ __html: content.para1 }} />
          </div>
        )}
        <div className="flex max-lg:flex-col  w-full ">
          <div
            className={`  m-auto  ${
              content.image ? "w-1/2 max-lg:w-full " : "  "
            }`}
          >
            {content.content1 && (
              <pre classname="language-js">
                <code className="  language-js">{content.content1}</code>
              </pre>
            )}
          </div>
          {content.image && (
            <div className="w-1/2 max-lg:w-full flex items-start justify-center">
              <img
                src={`${URLIMAGE}/${content.image}`}
                alt={content.title}
                className=" object-contain "
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ArticleId;

import React, { useEffect, useState } from "react";
import { useSearchResult } from "../navbar/resultChearchContext";
import { Link } from "react-router-dom";




const Result=()=>{

  const [isVisible, setIsVisible]=useState()

    const { results } = useSearchResult();


    useEffect(() => {
      if (results.length > 0) {
        setIsVisible(true);
      }
    }, [results]);

const handleClick=()=>{

  setIsVisible(false)
}
    return(
        <div className={`lg:m-3 w-8/12 m-auto flex flex-col items-center max-lg:w-10/12   transition-all duration-300 bg-slate-200 fixed ${isVisible? 'opacity-100':'opacity-0 pointer-events-none' } `}  >
          <p className="absolute right-1 cursor-pointer  top-0 text-4xl"
          onClick={handleClick}
          
          >x</p>
          <div className="mt-2">

        {results.length >= 1 && (
          <h4>Page trouvées :</h4>
    
        )}
          {results.map((result, index) => (
            <>
            
          <div key={index} className="flex">
    <Link to={`/aricle/${result.content.id}`}>
    
            <h5 className="m-2">{result.title}</h5>
        
    
    </Link>
          </div>
            </>
        ))}

          </div>
    </div>
    )
}

export default Result
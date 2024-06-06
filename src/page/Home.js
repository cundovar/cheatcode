import React from "react";
import { useSearchResult } from "../common/navbar/resultChearchContext";




const Home=()=>{
    const { results } = useSearchResult();
console.log("resultat",results)
    return(
        <>
        <h1>home</h1>
        <div className="row col-12">
            <div className="col-6 h-20 bg-slate-700"></div>
            <div className="col-6  h-20 bg-slate-300"></div>
        </div>
        {results.length ===0 ? (
   
   <h1 >pas trouve</h1>
   
   ):(
      
      results.map((result, index) => (
       <div key={index}>
         <h2>{result.title}</h2>
         <p>{result.content}</p>
       </div>
     ))
   
   )}
      </>
    )
}

export default Home
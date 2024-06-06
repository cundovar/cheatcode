import React, { createContext, useContext, useState } from "react";


const SearchresultContext=createContext([])

export const useSearchResult=()=>useContext(SearchresultContext)


export const SearchresultProvider=({children})=>{
    const [results,setResults]=useState([])

    return(
        <SearchresultContext.Provider value={{ results, setResults }}>
        {children}
      </SearchresultContext.Provider>
    );
    
}
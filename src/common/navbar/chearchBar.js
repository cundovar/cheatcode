// src/components/SearchBar.js
import React, { useState } from 'react';
import axios from 'axios';
import { useSearchResult } from './resultChearchContext';

function SearchBar() {
  const [query, setQuery] = useState('');
  const { setResults } = useSearchResult();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8000/search?q=${query}`);
      setResults(response.data);

    } catch (error) {
        console.error("There was an error fetching the search results!", error);
    }
};

  return (
    <div className='row'>
    
 
     
      <form onSubmit={handleSearch} className=" row form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2"
       type="search"
        placeholder="recherche"
         aria-label="Search"
         value={query} 
         onChange={(e) => setQuery(e.target.value)} 
         />
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">recherchez</button>
    </form>
    
    </div>
      

      
     
  );
}

export default SearchBar;

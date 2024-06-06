import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainNavBar from './common/navbar/MainNavBae';
import Home from './page/Home';
import ArticleId from './page/articleId';


const Page=()=>{
    return (
        <div className='flex'>

         <Router> 
  



       <MainNavBar/>
       <div className='absolute w-11/12 z-40 right-0 flex flex-col justify-center border bg-slate-400 items-center '>

            <Routes> 
                 <Route path="/" element={<Home />}  /> 
                 <Route path="/article/:id" element={<ArticleId />}  /> 
            </Routes> 


       </div>
    
           
    </Router> 
    
        </div>
    
    )




    
}

export default Page
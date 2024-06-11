import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainNavBar from './common/navbar/MainNavBae';
import Home from './page/Home';
import ArticleId from './page/articleId';
import Navbar, { NavbarDark } from './common/navbar/responsiveNavBar';


const Page=()=>{
    return (
        <div className='flex '>

         <Router> 
  



       <MainNavBar/>
  
       <div className='absolute lg:w-10/12 h-screen w-full  z-40 right-0 flex flex-col justify-center border shadow-orange-300 xl:shadow-xl items-center '>

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
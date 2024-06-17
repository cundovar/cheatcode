import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Page from "./page";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBar from "./common/navbar/chearchBar";
import { SearchresultProvider } from "./common/navbar/resultChearchContext";
import Navbar from "./common/navbar/responsiveNavBar";
import Home from "./page/Home";
import ArticleId from "./page/articleId";
import CodeMirrorId from "./page/codeMirror";
import TeknoPage from "./page/teknoPage";
import MainNavBar from "./common/navbar/MainNavBae";
import Result from "./common/utils/result";

function App() {
  return (
    <Router>
      <div className="w-full h-full fixed bg-gray-800 p-3 text-slate-300">
        <SearchresultProvider>
          <div className="lg:hidden">
            <Navbar />
          </div>
          <div className="row col-12">
            <div className="col-6">
              <Link to={"/"}>
                <h1 className="xl:text-4xl max-md:text-lg  ml-2">CheatCode</h1>
              </Link>
            </div>
            <div className="col-6 flex justify-end ">
              <SearchBar />
            </div>
          </div>
          <div className="flex relative">
            <MainNavBar />
        
            <div className="absolute lg:w-10/12  h-screen w-full z-40 right-0 lg:flex flex-col justify-center border shadow-orange-300 xl:shadow-xl items-center ">
              <div className=" self-start">
              <Result/>

              </div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/article/:id" element={<ArticleId />} />
                <Route path="/codeMirror/:id" element={<CodeMirrorId />} />
                <Route path="/tekno/:id" element={<TeknoPage />} />
              </Routes>
            </div>
          </div>
        </SearchresultProvider>
      </div>
    </Router>
  );
}

export default App;

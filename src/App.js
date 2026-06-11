import "./App.css";
import NavBar from "./Components/NavBar.js";
import News from "./Components/News.js";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
const App = ()=>{

   const apiKey=process.env.REACT_APP_NEWS_API
  const [progress,setProgress]=useState(0);
   const pageSize=15;
   
    return (
      <div>
        <Router>
  <NavBar />
  <LoadingBar
        color="#f11946"
        progress={progress}
      />
  <Routes>
    
    <Route path="/" element={<News  setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="us" category="general" />} />

    <Route path="/business" element={<News setProgress={setProgress} apiKey={apiKey}  key="business" pageSize={pageSize} country="us" category="business" />} />

    <Route path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey}  key="entertainment" pageSize={pageSize} country="us" category="entertainment" />} />

    <Route path="/general" element={<News setProgress={setProgress} apiKey={apiKey}  key="general2" pageSize={pageSize} country="us" category="general" />} />

    <Route path="/health" element={<News setProgress={setProgress} apiKey={apiKey}  key="health" pageSize={pageSize} country="us" category="health" />} />

    <Route path="/science" element={<News setProgress={setProgress} apiKey={apiKey}  key="science" pageSize={pageSize} country="us" category="science" />} />

    <Route path="/technology" element={<News setProgress={setProgress} apiKey={apiKey}  key="technology" pageSize={pageSize} country="us" category="technology" />} />

    <Route path="/sports" element={<News setProgress={setProgress} apiKey={apiKey}  key="sports" pageSize={pageSize} country="us" category="sports" />} />

  </Routes>
</Router>
      </div>
    );
  
}
export default App; 
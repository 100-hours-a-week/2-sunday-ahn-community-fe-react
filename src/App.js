
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login.js";
import Regist from "./pages/auth/Regist.js";

function App() {
  return (
    <BrowserRouter>
    <div>
    <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/regist" element={<Regist />} />
        </Routes>
    </div>
    </BrowserRouter>
    
  );
}

export default App;


import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login.js";

function App() {
  return (
    <BrowserRouter>
    <div>
    <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
    </div>
    </BrowserRouter>
    
  );
}

export default App;

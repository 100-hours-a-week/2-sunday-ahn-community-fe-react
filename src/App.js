
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login.js";
import Regist from "./pages/auth/Regist.js";
import Posts from "./pages/Posts.js";
import EditUserInfo from "./pages/EditUserInfo.js";

function App() {
  return (
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/regist" element={<Regist />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/editUserInfo" element={<EditUserInfo />} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;


import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login.js";
import Regist from "./pages/auth/Regist.js";
import Posts from "./pages/Posts.js";
import EditUserInfo from "./pages/EditUserInfo.js";
import EditPassword from "./pages/EditPassword.js";
import WritePost from "./pages/WritePost.js";
import EditPost from "./pages/EditPost.js";
import ViewPost from "./pages/ViewPost.js";

function App() {
  return (
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/regist" element={<Regist />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/editUserInfo" element={<EditUserInfo />} />
          <Route path="/editPassword" element={<EditPassword />} />
          <Route path="/writePost" element={<WritePost />} />
          <Route path="/editPost" element={<EditPost />} />
          <Route path="/viewPost" element={<ViewPost />} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;

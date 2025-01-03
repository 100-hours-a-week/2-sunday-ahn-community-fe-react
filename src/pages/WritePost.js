import React, { useState } from "react";
import BackButton from "../components/BackButton";
import TitleHeader from "../components/TItleHeader";
import ToggleProfile from "../components/ToggleProfile";
import PostForm from "../components/PostForm";
import "../styles/WritePost.css";

const WritePost = () => {

    return (
        <div className="writePostbox">
            <div className="postsHeaders">
                <div className="postsHeader">
                    <BackButton />
                    <TitleHeader />
                    <ToggleProfile />
                </div>
            </div>
            <main>
                <h5><strong>게시글 작성</strong></h5>
                <div className="inputText">
                    <PostForm/>
                </div>
                <div className="writeBottom">
                    <input type="submit" className="submitButton" value="완료" />
                </div>
            </main>
        </div>
    );
};

export default WritePost;

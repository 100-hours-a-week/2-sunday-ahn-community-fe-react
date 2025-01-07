import React, { useState } from "react";
import BackButton from "../components/BackButton";
import TitleHeader from "../components/TItleHeader";
import ToggleProfile from "../components/ToggleProfile";
import "../styles/ViewPost.css";
import FullPost from "../components/FullPost";
import CommentInputBox from "../components/CommentInputBox";
import Comment from "../components/Comment";

const ViewPost = () => {

    return(
        <div className="viewPostBox">
            <div className="postsHeaders">
                <div className="postsHeader">
                    <BackButton />
                    <TitleHeader />
                    <ToggleProfile />
                </div>
            </div>
            <main>
                <FullPost/>
                <CommentInputBox/>
                <div className="comments" id="commentsContainer">
                    <Comment/>
                    <Comment/>
                    <Comment/>
                    <Comment/>
                </div>
            </main>
        </div>
    );
};

export default ViewPost;
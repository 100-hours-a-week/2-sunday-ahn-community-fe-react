import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import TitleHeader from "../components/TItleHeader";
import Post from "../components/Post";
import Lottie from "react-lottie";
import animationData from "../assets/headerBackgroundAnim.json"; // JSON 파일 경로
import ToggleProfile from "../components/ToggleProfile";
import "../styles/Posts.css"

const Posts = () => {
    const navigate = useNavigate();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return(
        <div className="postsBox">
                <Lottie
                    options={defaultOptions}
                    width={700}
                    height={104} // postsHeaders 높이와 맞춤
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: -1,
                    }} // 애니메이션 배경 설정
                />
            <div className="postsHeaders">
                <div className="postsHeader">
                    <BackButton/>
                    <TitleHeader/>
                    <ToggleProfile/>
                </div>
            </div>
            <main>
                <div class="mainTxt">
                    <p id="mainTxt">안녕하세요,</p>
                    <p id="mainTxt">아무 말 대잔치 <strong>게시판</strong> 입니다.</p>
                </div>
                <div class="bnt">
                    <div class="postBtn" id="postBtn" onClick={()=>navigate("/writePost")}>
                        <p><strong>게시물 작성</strong></p>
                    </div>
                </div>
                <div class="postList">
                    {/* <!--  게시물 리스트 ------> */}
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>

                </div>
            </main>
        </div>
    );
}

export default Posts;
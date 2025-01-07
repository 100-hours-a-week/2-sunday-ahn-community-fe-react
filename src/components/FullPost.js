import React, { useState } from "react";
import "../components/css/FullPost.css";
import Lottie from "react-lottie";
import animationData from "../assets/likesLottie.json"; // 좋아요 애니메이션 JSON
import imageUrl from "../assets/sample.png";

const FullPost = () => {
    // 샘플 데이터
    const [postData, setPostData] = useState({
        title: "게시물 제목 예시",
        author: {
            profileImage: "../assets/sample.png",
            nickname: "작성자닉네임이열글자",
        },
        postDate: "2024-01-01 00:00:00",
        content: "여기에 게시물의 내용이 들어갑니다. 이 게시물은 예시로 작성된 샘플 데이터입니다.",
        postImage: imageUrl,
        likesCount: 25,
        viewsCount: 102,
        commentsCount: 8,
    });

    const [showLikeAnimation, setShowLikeAnimation] = useState(false);

    const handleLikeClick = () => {
        setShowLikeAnimation(true); // 애니메이션 활성화
        setPostData((prev) => ({
            ...prev,
            likesCount: prev.likesCount + 1,
        })); // 좋아요 수 증가

        // 애니메이션 1초 후 종료
        setTimeout(() => {
            setShowLikeAnimation(false);
        }, 1000);
    };

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div className="onePost">
            <div className="titleTxt_detail">
                <p>
                    <strong id="postTitle">{postData.title}</strong>
                </p>
            </div>
            <div className="user_detail">
                <div className="profileContainer">
                    <div className="box" id="author">
                        <img
                            className="profile"
                            id="authorProfileImage"
                            src={postData.author.profileImage}
                            alt="작성자 프로필"
                        />
                    </div>
                </div>
                <div className="userInfo">
                    <div className="nickname">
                        <p id="userNickname">{postData.author.nickname}</p>
                        <br />
                        <p id="postDate">{postData.postDate}</p>
                    </div>
                    {/* 수정 / 삭제 버튼 */}
                    <div className="edit_postDetail">
                        <button className="bnt" id="editPostBtn">
                            <div className="postEditBtn">
                                <p>
                                    <strong>수정</strong>
                                </p>
                            </div>
                        </button>
                        <button className="bnt" id="deletePostBtn">
                            <div className="postEditBtn">
                                <p>
                                    <strong>삭제</strong>
                                </p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div className="content_detail">
                <div className="imgBox">
                    <img
                        className="postImg"
                        id="postImage"
                        src={postData.postImage}
                        alt="../assets/sample.png"
                    />
                </div>
                <div className="contentTxt" id="postContent">
                    {postData.content}
                </div>
                <div className="contentElement_detail">
                    <div className="elements" id="likesCount" onClick={handleLikeClick}>
                        <p id="likesCount">{postData.likesCount}</p>
                        <p>좋아요수</p>
                        {showLikeAnimation && (
                            <Lottie
                                options={defaultOptions}
                                height={200}
                                width={200}
                                style={{ position: "absolute", top: "480px" }}
                            />
                        )}
                    </div>
                    <div className="elements">
                        <p id="viewsCount">{postData.viewsCount}</p>
                        <p>조회수</p>
                    </div>
                    <div className="elements">
                        <p id="commentsCount">{postData.commentsCount}</p>
                        <p>댓글</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FullPost;

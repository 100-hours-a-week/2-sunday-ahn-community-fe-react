import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/css/FullPost.css";
import Lottie from "react-lottie";
import animationData from "../assets/likesLottie.json"; // 좋아요 애니메이션 JSON
import {formatDateToCustomFormat, formatNumber} from "../utils/formatDate";
import sampleProfile from "../assets/user.png";

const FullPost = ({ post, onDeletePost, userId }) => {
    const {
        postId,
        title,
        author,
        date,
        content,
        imageUrl,
        likes: initialLikesCount,
        views,
        commentsCnt,
    } = post;
    
    const navigate = useNavigate();

    const [likesCount, setLikesCount] = useState(initialLikesCount);
    const [showLikeAnimation, setShowLikeAnimation] = useState(false);
    const [isLiked, setIsLiked] = useState(false); // 좋아요 색상 상태 관리

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    
    const handleLikeClick = async () => {
        try {
            await toggleLikeAPI(postId); // 좋아요 API 호출
            setLikesCount((likesCount) => likesCount + 1); // 좋아요 수 증가
            setIsLiked(true); // 색상 변경
            setShowLikeAnimation(true); 
            setTimeout(() => {
                setShowLikeAnimation(false); // 1초 후 애니메이션 비활성화
                setIsLiked(false); // 색상 초기화
            }, 1000)
        } catch (error) {
            alert(`좋아요 처리 중 오류가 발생했습니다. ${error.message}`);
        }
    };

    const toggleLikeAPI = async (postId) => {
        try {
            const response = await fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/posts/${postId}/likes`, {
                method: "GET", // 좋아요 요청
                credentials: "include", // 세션 쿠키 포함
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "좋아요 처리 중 오류가 발생했습니다.");
            }
    
            return true; // 성공
        } catch (error) {
            console.error("좋아요 API 호출 오류:", error.message);
            throw error;
        }
    };

    return (
        <div className="onePost">
            <div className="titleTxt_detail">
                <p>
                    <strong id="postTitle">{title}</strong>
                </p>
            </div>
            <div className="user_detail">
                <div className="profileContainer">
                    <div className="box" id="author">
                        <img
                            className="profile"
                            id="authorProfileImage"
                            src={author.profileImg || sampleProfile}
                            alt="작성자 프로필"
                        />
                    </div>
                </div>
                <div className="userInfo">
                    <div className="nickname">
                        <p id="userNickname">{author.nickname}</p>
                        <br />
                        <p id="date">{formatDateToCustomFormat(date)}</p>
                    </div>
                    {author.userId === userId && (
                        <div className="edit_postDetail">
                            <button className="bnt" id="editPostBtn" onClick={() => navigate(`/editPost?postId=${postId}`)}>
                                <div className="postEditBtn">
                                    <p>
                                        <strong>수정</strong>
                                    </p>
                                </div>
                            </button>
                            <button className="bnt" id="deletePostBtn" onClick={onDeletePost}>
                                <div className="postEditBtn">
                                    <p>
                                        <strong>삭제</strong>
                                    </p>
                                </div>
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="content_detail">
                {imageUrl && (
                    <div className="imgBox">
                        <img
                            className="postImg"
                            id="postImage"
                            src={imageUrl}
                            alt="게시물 이미지"
                        />
                    </div>
                )}
                <div className="contentTxt" id="postContent">
                    {content}
                </div>
                <div className="contentElement_detail">
                    <div className={`elements ${isLiked ? "liked" : ""}`}
                        style={{ position: "relative"}}
                        id="likesCount" onClick={handleLikeClick}>
                        <p id="likesCount">{formatNumber(likesCount)||0}</p>
                        <p>좋아요수</p>
                        {showLikeAnimation && (
                            <Lottie
                                options={defaultOptions}
                                height={200}
                                width={200}
                                style={{ 
                                    position: "absolute",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                }}
                            />
                        )}
                    </div>
                    <div className="elements">
                        <p id="viewsCount">{formatNumber(views)||0}</p>
                        <p>조회수</p>
                    </div>
                    <div className="elements">
                        <p id="commentsCount">{formatNumber(commentsCnt)||0}</p>
                        <p>댓글</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FullPost;
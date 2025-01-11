import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackButton from "../components/BackButton";
import TitleHeader from "../components/TItleHeader";
import ToggleProfile from "../components/ToggleProfile";
import FullPost from "../components/FullPost";
import CommentInputBox from "../components/CommentInputBox";
import Comment from "../components/Comment";
import DeletePostModal from "../components/DeletePostModal";
import DeleteCommentModal from "../components/DeleteCommentModal";
import "../styles/ViewPost.css";
import { fetchUserSession } from "../utils/session";

const ViewPost = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const postId = new URLSearchParams(location.search).get("postId");
    console.log("포스트아이디", postId);

    const [user, setUser] = useState(null); // 현재 사용자 정보
    const [post, setPost] = useState(null); // 게시물 정보
    const [comments, setComments] = useState([]); // 댓글 목록

    const [isPostModalOpen, setIsPostModalOpen] = useState(false); // 게시물 삭제 모달
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false); // 댓글 삭제 모달
    const [selectedComment, setSelectedComment] = useState(null); // 선택된 댓글 ID

    // 스크롤바 너비 계산
    const getScrollbarWidth = () => {
        return window.innerWidth - document.documentElement.clientWidth;
    };

    // 모달 열릴 때 스크롤바 처리
    useEffect(() => {
        if (isPostModalOpen || isCommentModalOpen) {
            const scrollbarWidth = getScrollbarWidth();
            document.body.classList.add("modal-open");
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            document.body.classList.remove("modal-open");
            document.body.style.paddingRight = "";
        }

        return () => {
            document.body.classList.remove("modal-open");
            document.body.style.paddingRight = "";
        };
    }, [isPostModalOpen, isCommentModalOpen]);

    // 게시물 및 댓글 데이터 가져오기
    const fetchPostData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/posts/${postId}`, {
                method: "GET",
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("게시물을 불러오는 데 실패했습니다.");
            }

            const { data } = await response.json();
            setPost(data);
            setComments(data.comments || []);
        } catch (error) {
            console.error("게시물 데이터 로드 오류:", error);
            alert(error.message || "게시물을 불러오는 중 문제가 발생했습니다.");
        }
    };

    // 세션 정보와 게시물 데이터 로드
    useEffect(() => {
        const loadData = async () => {
            try {
                const userData = await fetchUserSession();
                setUser(userData);
                await fetchPostData();
            } catch (error) {
                console.error("세션 또는 게시물 데이터 로드 오류:", error.message);
                navigate("/login");
            }
        };

        loadData();
    }, [postId, navigate]);

    const openPostModal = () => setIsPostModalOpen(true);
    const closePostModal = () => setIsPostModalOpen(false);

    const openCommentModal = (commentId) => {
        setSelectedComment(commentId);
        setIsCommentModalOpen(true);
    };
    const closeCommentModal = () => {
        setSelectedComment(null);
        setIsCommentModalOpen(false);
    };

    return (
        <div className="viewPostBox">
            <div className="postsHeaders">
                <div className="postsHeader">
                    <BackButton />
                    <TitleHeader />
                    <ToggleProfile profileImage={user?.profileImage} />
                </div>
            </div>
            <main>
                {post && (
                    <FullPost
                        post={post}
                        onDeletePost={openPostModal}
                        userId={user?.userId}
                    />
                )}
                <CommentInputBox postId={postId} onCommentAdded={fetchPostData} />
                <div className="comments" id="commentsContainer">
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <Comment
                                key={comment.commentId}
                                comment={comment}
                                userId={user?.userId}
                                onDelete={() => openCommentModal(comment.commentId)}
                            />
                        ))
                    ) : (
                        <p>댓글이 없습니다.</p>
                    )}
                </div>
            </main>
            {isPostModalOpen && (
                <div className="modalPopup">
                    <DeletePostModal postId={postId} onClose={closePostModal} onDeleted={() => navigate("/posts")} />
                </div>
            )}
            {isCommentModalOpen && (
                <div className="modalPopup">
                    <DeleteCommentModal
                        commentId={selectedComment}
                        onClose={closeCommentModal}
                        onDeleted={fetchPostData}
                    />
                </div>
            )}
        </div>
    );
};

export default ViewPost;

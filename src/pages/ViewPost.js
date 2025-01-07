import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import TitleHeader from "../components/TItleHeader";
import ToggleProfile from "../components/ToggleProfile";
import "../styles/ViewPost.css";
import FullPost from "../components/FullPost";
import CommentInputBox from "../components/CommentInputBox";
import Comment from "../components/Comment";
import DeletePostModal from "../components/DeletePostModal";
import DeleteCommentModal from "../components/DeleteCommentModal";

const ViewPost = () => {
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);

    const getScrollbarWidth = () => {
        return window.innerWidth - document.documentElement.clientWidth;
    };

    useEffect(() => {
        if (isPostModalOpen || isCommentModalOpen) {
            const scrollbarWidth = getScrollbarWidth();
            document.body.classList.add("modal-open");
            document.body.style.paddingRight = `${scrollbarWidth}px`; // 스크롤바 너비만큼 패딩 추가
        } else {
            document.body.classList.remove("modal-open");
            document.body.style.paddingRight = ""; // 패딩 초기화
        }

        return () => {
            document.body.classList.remove("modal-open");
            document.body.style.paddingRight = ""; // 컴포넌트 언마운트 시 정리
        };
    }, [isPostModalOpen, isCommentModalOpen]);

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
                    <ToggleProfile />
                </div>
            </div>
            <main>
                <FullPost onDeletePost={openPostModal} />
                <CommentInputBox />
                <div className="comments" id="commentsContainer">
                    {[1, 2, 3, 4, 5].map((id) => (
                        <Comment key={id} onDelete={() => openCommentModal(id)} />
                    ))}
                </div>
            </main>
            {isPostModalOpen && (
                <div className="modalPopup">
                    <DeletePostModal onClose={closePostModal} />
                </div>
            )}
            {isCommentModalOpen && (
                <div className="modalPopup">
                    <DeleteCommentModal
                        onClose={closeCommentModal}
                        commentId={selectedComment}
                    />
                </div>
            )}
        </div>
    );
};

export default ViewPost;

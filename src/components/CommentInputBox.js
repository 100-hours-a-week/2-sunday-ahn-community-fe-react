import React, { useState, useEffect } from "react";

const MAX_COMMENT_LENGTH = 300; // 댓글 최대 글자 수

const CommentInputBox = ({ userId, postId, editingComment, onCommentAdded, onEditComplete  }) => {
    const [comment, setComment] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    // 수정 모드일 때 기존 댓글 내용 설정
    useEffect(() => {
        if (editingComment) {
            setComment(editingComment.content);
            setIsEditing(true);
        } else {
            setComment("");
            setIsEditing(false);
        }
    }, [editingComment]);

    // 댓글 내용 변경 핸들러
    const handleCommentChange = (e) => {
        if (e.target.value.length <= MAX_COMMENT_LENGTH) {
            setComment(e.target.value);
        }
    };

   // 댓글 등록 또는 수정 처리
    const handleSubmit = async () => {
    if (comment.trim() === "") return;

        try {
            const url = isEditing
                ? `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/comments/${editingComment.commentId}`
                : `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/comments`;

            const method = isEditing ? "PUT" : "POST";
            const body = isEditing
                ? { content: comment.trim() }
                : { userId, postId, content: comment.trim() };

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error(isEditing ? "댓글 수정 실패" : "댓글 등록 실패");
            }

            if (isEditing) {
                onEditComplete();
            } else {
                onCommentAdded();
            }

            setComment("");
        } catch (error) {
            console.error(error.message);
            alert(isEditing ? "댓글 수정 중 오류가 발생했습니다." : "댓글 등록 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="commentInputBox">
            <div className="inputComment">
                <textarea
                    id="inputComment"
                    placeholder="댓글을 남겨주세요!"
                    value={comment}
                    onChange={handleCommentChange} // 댓글 입력 이벤트 처리
                    maxLength={MAX_COMMENT_LENGTH}
                    required
                />
                <div className="commentCharCount">
                    {comment.length} / {MAX_COMMENT_LENGTH} 글자
                </div>
                <div className="inputComment2">
                    <button
                        className="commentBtn"
                        onClick={handleSubmit}
                        style={{
                            backgroundColor: comment.trim() ? "#79D7BE" : "#a9d8cc", // 버튼 색상 조건부 처리
                            cursor: comment.trim() ? "pointer" : "not-allowed", // 버튼 커서 스타일
                        }}
                        disabled={!comment.trim()} // 댓글 내용 없으면 버튼 비활성화
                    >
                        {isEditing ? "댓글 수정" : "댓글 등록"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentInputBox;

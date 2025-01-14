import React, { useState } from "react";

const MAX_COMMENT_LENGTH = 300; // 댓글 최대 글자 수

const CommentInputBox = ({ userId, postId, onCommentAdded }) => {
    const [comment, setComment] = useState("");

    // 댓글 내용 변경 핸들러
    const handleCommentChange = (e) => {
        if (e.target.value.length <= MAX_COMMENT_LENGTH) {
            setComment(e.target.value);
        }
    };

    // 댓글 등록 버튼 클릭
    const handleAddComment = async () => {
        if (comment.trim() === "") return;

        try {
            const response = await fetch("http://localhost:3000/comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    userId,
                    postId, 
                    content: comment.trim() 
                }),
                credentials: "include",
            });

            if (!response.ok) throw new Error("댓글 등록 실패");

            onCommentAdded(); // 부모 컴포넌트에 댓글 등록 후 작업 요청
            setComment(""); // 입력창 초기화
        } catch (error) {
            console.error("댓글 등록 오류:", error);
            alert("댓글 등록 중 문제가 발생했습니다.");
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
                        onClick={handleAddComment}
                        style={{
                            backgroundColor: comment.trim() ? "#79D7BE" : "#a9d8cc", // 버튼 색상 조건부 처리
                            cursor: comment.trim() ? "pointer" : "not-allowed", // 버튼 커서 스타일
                        }}
                        disabled={!comment.trim()} // 댓글 내용 없으면 버튼 비활성화
                    >
                        댓글 등록
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentInputBox;

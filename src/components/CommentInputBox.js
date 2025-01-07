import React, { useState } from "react";

const MAX_COMMENT_LENGTH = 300; // 댓글 최대 글자 수

const CommentInputBox = () => {
    const [comment, setComment] = useState("");

    // 댓글 내용 변경 핸들러
    const handleCommentChange = (e) => {
        if (e.target.value.length <= MAX_COMMENT_LENGTH) {
            setComment(e.target.value);
        }
    };

    // 댓글 등록 버튼 클릭 핸들러
    const handleAddComment = () => {
        if (comment.trim() !== "") {
            console.log("댓글 등록:", comment);
            setComment(""); // 댓글 입력창 초기화
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

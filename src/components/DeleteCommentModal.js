import React from "react";
import "../components/css/Modal.css";

const DeleteCommentModal = ({ onClose, commentId, onDeleted }) => {
    const confirmDelete = async () => {
        try {
            // 서버로 DELETE 요청 전송
            const response = await fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/comments/${commentId}`, {
                method: "DELETE",
                credentials: "include", // 인증 쿠키 포함
            });

            if (!response.ok) {
                throw new Error("댓글 삭제 실패");
            }

            onDeleted(); // 부모 컴포넌트에 삭제 완료 알림
            onClose(); // 모달 닫기
        } catch (error) {
            console.error("댓글 삭제 오류:", error.message);
            alert("댓글 삭제 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="modalDiv">
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <h2>댓글을 삭제하시겠습니까?</h2>
                    <p>삭제한 내용은 복구 할 수 없습니다.</p>
                    <div className="modal-buttons">
                        <button className="modal-button cancel" onClick={onClose}>
                            취소
                        </button>
                        <button className="modal-button confirm" onClick={confirmDelete}>
                            확인
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteCommentModal;
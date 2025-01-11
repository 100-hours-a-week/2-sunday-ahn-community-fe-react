import React from "react";
import "../components/css/Modal.css";

const DeleteCommentModal = ({ onClose, commentId }) => {
    
    const confirmDelete = () => {
        alert("댓글 삭제가 완료되었습니다.");
        onClose(); // 모달 닫기
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
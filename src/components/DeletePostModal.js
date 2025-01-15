import { useNavigate } from "react-router-dom";
import React from "react";
import "../components/css/Modal.css";

const DeletePostModal = ({ postId, onClose, onDeleted }) => {
    const navigate = useNavigate();

    // 게시물 삭제
    const deletePost = async () => {
        try {
            const response = await fetch(`http://localhost:3000/posts/${postId}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("게시글 삭제에 실패했습니다.");
            }

            onClose(); // 모달 닫기
            onDeleted(); // 게시물 삭제 후 추가 동작 실행
        } catch (error) {
            console.error("게시물 삭제 오류:", error.message);
            alert(`게시글을 삭제하는 중 오류가 발생했습니다: ${error.message}`);
        }
    };

    return (
        <div className="modalDiv">
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <h2>게시물을 삭제하시겠습니까?</h2>
                    <p>삭제한 내용은 복구할 수 없습니다.</p>
                    <div className="modal-buttons">
                        <button className="modal-button cancel" onClick={onClose}>
                            취소
                        </button>
                        <button className="modal-button confirm" onClick={deletePost}>
                            확인
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeletePostModal;

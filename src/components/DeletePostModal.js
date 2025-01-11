import { useNavigate } from "react-router-dom";
import React from "react";
import "../components/css/Modal.css";

const DeletePostModal = ({ onClose }) => {
    const navigate = useNavigate();
    
    const confirmDelete = () => {
        alert("게시물 삭제가 완료되었습니다.");
        onClose(); // 모달 닫기
        navigate("/posts");
    };

    return (
        <div className="modalDiv">
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <h2>게시물을 삭제하시겠습니까?</h2>
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

export default DeletePostModal;
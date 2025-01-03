import { useNavigate } from "react-router-dom";
import React from "react";
import "../components/css/Modal.css";

const WithdrawModal = ({ onClose }) => {
    const navigate = useNavigate();
    
    const confirmDelete = () => {
        alert("회원 탈퇴가 완료되었습니다.");
        onClose(); // 모달 닫기
        navigate("/login");
    };

    return (
        <div className="modalDiv">
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <h2>회원을 탈퇴하시겠습니까?</h2>
                    <p>작성된 게시글과 댓글이 삭제됩니다</p>
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

export default WithdrawModal;

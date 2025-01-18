import { useNavigate } from "react-router-dom";
import React from "react";
import "../components/css/Modal.css";

const WithdrawModal = ({ userId, onClose }) => {
    const navigate = useNavigate();
    const confirmDelete = async() => {
        // 회원 탈퇴 함수
        console.log("userId:", userId); // 전달된 userId 확인
        try {
            const response = await fetch(`http://localhost:3000/users/withdraw/${userId}`, {
                method: "DELETE",
                credentials: "include" // 세션 쿠키 포함
            });

            if (response.ok) {
                alert("회원 탈퇴가 완료되었습니다.");
                sessionStorage.removeItem("user"); // 클라이언트 세션 초기화
                alert("회원 탈퇴가 완료되었습니다.");
                onClose(); // 모달 닫기
                navigate("/login"); // 로그인 페이지로 이동
                
            } else {
                const error = await response.json();
                alert(`회원 탈퇴 실패: ${error.message}`);
            }
        } catch (error) {
            alert(`네트워크 오류 발생: ${error.message}`);
        }
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

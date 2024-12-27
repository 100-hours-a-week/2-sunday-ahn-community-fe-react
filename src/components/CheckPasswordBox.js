import React, { useState } from "react";
import "./css/InputBox.css";

const CheckPasswordBox = ({ onCheckPassword, isPasswordMatch }) => {
    const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태
    const [errorVisible, setErrorVisible] = useState(false);

    const handleInputChange = (e) => {
        const confirmPassword = e.target.value;
        onCheckPassword(confirmPassword); // 상위 컴포넌트로 입력값 전달
    };

    const handleValidation = (e) => {
        const confirmPassword = e.target.value; // 입력값 가져오기
        console.log("입력된 비밀번호 확인:", confirmPassword);
        console.log("isPasswordMatch 상태:", isPasswordMatch);

        // 조건별 에러 메시지 처리
        if (!confirmPassword.trim()) {
            setErrorVisible(true); // 에러 메시지 표시
            setErrorMessage("*비밀번호를 한번 더 입력해주세요.");
        } else if (!isPasswordMatch) {
            setErrorVisible(true); // 에러 메시지 표시
            setErrorMessage("*비밀번호가 일치하지 않습니다.");
        } else {
            setErrorVisible(false); // 에러 메시지 숨김
            setErrorMessage(""); // 에러 없음
        }

        console.log("에러 메시지 상태:", errorMessage);
    };

    return (
        <div className="inputField">
            <p>비밀번호 확인</p>
            <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="비밀번호를 한번 더 입력하세요"
                required
                onBlur={handleValidation} // 포커스 해제 시 검증
                onChange={handleInputChange} // 입력값 전달
            />
            <div className={`error ${errorVisible ? "visible" : ""}`}>
                {errorMessage}
            </div>
        </div>
    );
};

export default CheckPasswordBox;

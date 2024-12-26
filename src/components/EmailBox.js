import React, { useState } from "react";
import "./css/InputBox.css";

const EmailBox = () => {
    const [errorVisible, setErrorVisible] = useState(false);

    const handleValidation = () => {
        const emailInput = document.getElementById("emailInput").value;
        if (!emailInput) {
            setErrorVisible(true); // 에러 메시지 표시
        } else {
            setErrorVisible(false); // 에러 메시지 숨김
        }
    };

    return (
        <div className="inputField">
            <p>이메일</p>
            <input
                type="email"
                id="emailInput"
                name="email"
                placeholder="이메일을 입력하세요"
                required
                onBlur={handleValidation} // 입력 필드 포커스 해제 시 검증
            />
            <div className={`error ${errorVisible ? "visible" : ""}`}>
                *이메일을 입력해주세요.
            </div>
        </div>
    );
};

export default EmailBox;

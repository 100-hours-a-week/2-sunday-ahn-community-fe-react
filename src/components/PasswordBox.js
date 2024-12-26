import React, { useState } from "react";
import "./css/InputBox.css";

const PasswordBox = () => {
    const [errorVisible, setErrorVisible] = useState(false);

    const handleValidation = () => {
        const passwordInput = document.getElementById("passwordInput").value;
        if (!passwordInput) {
            setErrorVisible(true); // 에러 메시지 표시
        } else {
            setErrorVisible(false); // 에러 메시지 숨김
        }
    };

    return (
        <div className="inputField">
            <p>비밀번호</p>
            <input
                type="password"
                id="passwordInput"
                name="password"
                placeholder="비밀번호를 입력하세요"
                required
                onBlur={handleValidation} // 포커스 해제 시 검증
            />
            <div
                className={`error ${errorVisible ? "visible" : ""}`}
            >
                *비밀번호를 입력해주세요.
            </div>
        </div>
    );
};

export default PasswordBox;

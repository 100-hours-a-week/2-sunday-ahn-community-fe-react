import React, { useState } from "react";
import "./css/InputBox.css";

const PasswordBox = ({onPasswordChange}) => {
    const [errorVisible, setErrorVisible] = useState(false);

    const handleInputChange = (e) => {
        const password = e.target.value;
        onPasswordChange(password); // 상위 컴포넌트로 입력값 전달
        setErrorVisible(!password.trim()); // 입력값이 없으면 에러 표시
    };
    
    const handleValidation = (e) => {
        const passwordInput = e.target.value;
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
                onChange={handleInputChange} // 입력값 전달
            />
            <div className={`error ${errorVisible ? "visible" : ""}`}>
                *비밀번호를 입력해주세요.
            </div>
        </div>
    );
};

export default PasswordBox;

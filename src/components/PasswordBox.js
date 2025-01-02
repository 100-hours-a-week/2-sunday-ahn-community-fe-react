import React, { useState, useEffect } from "react";
import "./css/InputBox.css";
import { validatePassword } from "../utils/validation";

const PasswordBox = ({ value, onChange }) => {
    const [touched, setTouched] = useState(false); // 입력 필드가 터치되었는지 확인
    const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태
    
    const handleBlur = () => {
        setTouched(true);
        setErrorMessage(validatePassword(value));
    };
    
    useEffect(() => {
        if (touched) {
            setErrorMessage(validatePassword(value));
        }
    }, [value, touched]);

    return (
        <div className="inputField">
            <p>비밀번호</p>
            <input
                type="password"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                required
                onBlur={handleBlur}
            />
            <div className={`error ${errorMessage ? "visible" : ""}`}>
                {errorMessage}
            </div>
        </div>
    );
};

export default PasswordBox;

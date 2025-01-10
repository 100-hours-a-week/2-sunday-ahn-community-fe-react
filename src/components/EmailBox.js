import React, { useState, useEffect } from "react";
import "./css/InputBox.css";
import { validateEmail } from "../utils/validation";

const EmailBox = ({ value, onChange, onBlur, errorMessage }) => {
    const [touched, setTouched] = useState(false); // 입력 필드가 터치되었는지 확인
    const [localErrorMessage, setLocalErrorMessage] = useState(""); // 로컬 유효성 검사 메시지

    const handleBlur = () => {
        setTouched(true);

        // 이메일 형식 유효성 검사
        const validationError = validateEmail(value);
        setLocalErrorMessage(validationError);

        // 부모의 onBlur 호출
        if (onBlur && !validationError) {
            onBlur(); // 유효성 검사가 통과된 경우에만 호출
        }
    };

    // 표시할 메시지 결정 (형식검사가 우선)
    const displayErrorMessage = localErrorMessage || errorMessage;

    useEffect(() => {
        // 입력 값 변경 시 로컬 유효성 재검사
        if (touched) {
            setLocalErrorMessage(validateEmail(value));
        }
    }, [value, touched]);

    return (
        <div className="inputField">
            <p>이메일</p>
            <input
                type="email"
                value={value}
                onChange={(e) => onChange(e.target.value)} // 부모로 입력 값 전달
                placeholder="이메일을 입력하세요"
                required
                onBlur={handleBlur} // 포커스 아웃 시 유효성 검사 및 부모 호출
            />
            <div className={`error ${displayErrorMessage ? "visible" : ""}`}>
                {displayErrorMessage}
            </div>
        </div>
    );
};

export default EmailBox;

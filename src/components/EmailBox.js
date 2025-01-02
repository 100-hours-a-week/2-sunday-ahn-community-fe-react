import React, { useState, useEffect } from "react";
import "./css/InputBox.css";
import { validateEmail } from "../utils/validation";

const EmailBox = ({ value, onChange }) => {
    const [touched, setTouched] = useState(false); // 입력 필드가 터치되었는지 확인
    const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태

    const handleBlur = () => {
        setTouched(true);
        setErrorMessage(validateEmail(value)); // 유효성 검사
    };

    useEffect(() => {
        if (touched) {
            setErrorMessage(validateEmail(value)); // 입력 값 변경 시 유효성 재검사
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
                onBlur={handleBlur} // 포커스 아웃 시 유효성 검사 실행
            />
            <div className={`error ${errorMessage ? "visible" : ""}`}>{errorMessage}</div>
        </div>
    );
};

export default EmailBox;

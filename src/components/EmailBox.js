import React, { useState, useEffect } from "react";
import "./css/InputBox.css";
import { validateEmail } from "../utils/validation";

const EmailBox = ({ value, onChange }) => {
    const [touched, setTouched] = useState(false); // 입력 필드가 터치되었는지 확인
    const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태
    
    const handleBlur = async () => {
        setTouched(true);
        let error = validateEmail(value);

        if (!error) {
            // 중복 검사 요청
            try {
                const response = await fetch(`http://localhost:3000/auth/email`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: value }),
                });
                if (!response.ok) {
                    const result = await response.json();
                    error = result.message || "*중복된 이메일입니다.";
                }
            } catch (err) {
                error = "*서버와의 연결에 문제가 발생했습니다.";
                console.error("이메일 중복 검사 오류:", err);
            }
        }

        setErrorMessage(error);
    };
    
    useEffect(() => {
        if (touched) {
            setErrorMessage(validateEmail(value));
        }
    }, [value, touched]);
    
    return (
        <div className="inputField">
            <p>이메일</p>
            <input
                type="email"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="이메일을 입력하세요"
                required
                onBlur={handleBlur}
            />
            <div className={`error ${errorMessage ? "visible" : ""}`}>{errorMessage}</div>
        </div>
    );
};

export default EmailBox;

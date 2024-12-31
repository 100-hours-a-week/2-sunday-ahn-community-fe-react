import React, { useState, useEffect } from "react";
import "./css/InputBox.css";
import { validateNickname } from "../utils/validation";

const NicknameBox = ({ value, onChange }) => {
    const [touched, setTouched] = useState(false); // 입력 필드가 터치되었는지 확인
    const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태
    
    const handleBlur = async () => {
        setTouched(true);
        let error = validateNickname(value);

        if (!error) {
            // 중복 검사 요청
            try {
                const response = await fetch(`http://localhost:3000/auth/nickname`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nickname: value }),
                });
                if (!response.ok) {
                    const result = await response.json();
                    error = result.message || "*중복된 닉네임입니다.";
                }
            } catch (err) {
                error = "*서버와의 연결에 문제가 발생했습니다.";
                console.error("닉네임 중복 검사 오류:", err);
            }
        }

        setErrorMessage(error);
    };
    
    useEffect(() => {
        if (touched) {
            setErrorMessage(validateNickname(value));
        }
    }, [value, touched]);

    return (
        <div className="inputField">
            <p>닉네임</p>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="닉네임을 입력하세요"
                onBlur={handleBlur}
                required
                maxLength={10}
                />
            <div className={`error ${errorMessage ? "visible" : ""}`}>{errorMessage}</div>
        </div>
    );
};

export default NicknameBox;

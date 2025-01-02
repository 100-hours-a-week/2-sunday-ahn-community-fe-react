import React, { useState, useEffect } from "react";
import "./css/InputBox.css";

const CheckPasswordBox = ({ onCheckPassword, password, confirmPassword }) => {
    const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태
    const [touched, setTouched] = useState(false); // 입력 필드가 터치되었는지 확인

    // 유효성 검증 함수
    const validateConfirmPassword = () => {
        if (!confirmPassword?.trim()) {
            setErrorMessage("*비밀번호를 한번 더 입력해주세요.");
        } else if (confirmPassword !== password) {
            setErrorMessage("*비밀번호가 일치하지 않습니다.");
        } else {
            setErrorMessage(""); // 에러 없음
        }
    };

    const handleInputChange = (e) => {
        onCheckPassword(e.target.value);
    };

    // 포커스 해제 시 유효성 검증 
    const handleBlur = () => {
        setTouched(true);
        validateConfirmPassword();
    };

    useEffect(() => {
        if (touched) {
            validateConfirmPassword();
        }
    }, [password, confirmPassword, touched]);

    return (
        <div className="inputField">
            <p>비밀번호 확인</p>
            <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="비밀번호를 한번 더 입력하세요"
                required
                value={confirmPassword || ""}
                onChange={handleInputChange}
                onBlur={handleBlur}
            />
            <div className={`error ${errorMessage ? "visible" : ""}`}>
                {errorMessage}
            </div>
        </div>
    );
};

export default CheckPasswordBox;

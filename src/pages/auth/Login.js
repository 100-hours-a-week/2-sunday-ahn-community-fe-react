import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginHeader from "../../components/LoginHeader";
import EmailBox from "../../components/EmailBox";
import PasswordBox from "../../components/PasswordBox";
import "../../styles/Login.css";

const Login = () => {
    const navigate = useNavigate();

    // 상태 관리
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState(""); // 서버 응답 에러 메시지

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleLoginClick = async () => {
        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                alert("로그인 성공!");
                navigate("/"); // 로그인 성공 후 이동할 경로
            } else {
                const error = await response.json();
                setErrorMessage(error.message || "로그인 실패. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("로그인 요청 오류:", error);
            setErrorMessage("서버 요청에 실패했습니다.");
        }
    };

    const handleRegistClick = () => {
        navigate("/regist");
    };

    return (
        <div className="loginbox">
            <LoginHeader />
            <div className="inputFields">
                <EmailBox
                    value={formData.email}
                    onChange={(value) => handleInputChange("email", value)}
                />
                <PasswordBox
                    value={formData.password}
                    onChange={(value) => handleInputChange("password", value)}
                />
                {errorMessage && <div className="error">{errorMessage}</div>}
                <div>
                    <button className="submitButton" onClick={handleLoginClick}>
                        로그인
                    </button>
                    <button className="registButton" onClick={handleRegistClick}>
                        회원가입
                    </button>
                </div>
                
            </div>
        </div>
    );
};

export default Login;

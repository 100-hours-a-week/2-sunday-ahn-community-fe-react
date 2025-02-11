import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../../styles/Regist.css";
import BackButton from "../../components/BackButton";
import ProfileBox from "../../components/ProfileBox";
import EmailBox from "../../components/EmailBox";
import PasswordBox from "../../components/PasswordBox";
import CheckPasswordBox from "../../components/CheckPasswordBox";
import NicknameBox from "../../components/NicknameBox";
import { validateEmail, validatePassword, validateNickname } from "../../utils/validation";
import { uploadProfile } from "../../utils/imageManager";

const Regist = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        nickname: "",
    });
    const [isEmailDuplicate, setIsEmailDuplicate] = useState(false); // 이메일 중복 여부
    const [emailErrorMessage, setEmailErrorMessage] = useState(""); // 이메일 에러메세지

    const [isFormValid, setIsFormValid] = useState(false); // 폼 유효 상태

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (file) => {
        setFormData((prev) => ({ ...prev, profileImage: file }));
    };

    // 이메일 중복 검사 함수
    const checkEmailDuplicate = async (email) => {
        try {
            const response = await fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/auth/email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            if (!response.ok) {
                const result = await response.json();
                setIsEmailDuplicate(true);
                setEmailErrorMessage(result.message);
            }
            else{
                setIsEmailDuplicate(false);
                setEmailErrorMessage(""); // 중복아님
            }
        } catch (err) {
            console.error("이메일 중복 검사 오류:", err);
            setIsEmailDuplicate(true);
            setEmailErrorMessage("*서버와의 연결에 문제가 발생했습니다.");
        }
    };

    useEffect(() => {
        const isEmailValid = !validateEmail(formData.email);
        const isPasswordValid =
            !validatePassword(formData.password) &&
            formData.password === formData.confirmPassword;
        const isNicknameValid = !validateNickname(formData.nickname);

        setIsFormValid(
            isEmailValid &&
            isPasswordValid &&
            isNicknameValid &&
            !!formData.profileImage &&
            !isEmailDuplicate
        );
    }, [formData, isEmailDuplicate]);

    // 폼 제출
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        let profileImageUrl = "";
        if (formData.profileImage) {
            profileImageUrl = await uploadProfile(formData.profileImage);
        }
    
        try {
            const response = await fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/auth/regist`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    nickname: formData.nickname,
                    profileImage: profileImageUrl,
                }),
            });
    
            if (response.ok) {
                alert("회원가입 성공!");
                navigate("/login");
            } else {
                const error = await response.json();
                alert("회원가입 실패: " + error.message);
            }
        } catch (error) {
            console.error("회원가입 요청 오류:", error);
            alert("서버 요청에 실패했습니다.");
        }
    };

    return (
        <div>
            <div className="headerContent">
                <div className="box1">
                    <BackButton />
                    <h1>
                        SUN:DAILY <br /> 아무 말 대잔치
                    </h1>
                </div>
            </div>
            <main>
                <h2>회원가입</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="inputText">
                        <ProfileBox onFileChange={handleFileChange} />
                        <EmailBox
                            value={formData.email}
                            onChange={(value) => handleInputChange("email", value)}
                            onBlur={() => checkEmailDuplicate(formData.email)}
                            errorMessage={emailErrorMessage}
                        />
                        <PasswordBox
                            value={formData.password}
                            onChange={(value) => handleInputChange("password", value)}
                        />
                        <CheckPasswordBox
                            onCheckPassword={(value) => handleInputChange("confirmPassword", value)}
                            password={formData.password}
                            confirmPassword={formData.confirmPassword}
                        />
                        <NicknameBox
                            value={formData.nickname}
                            onChange={(value) => handleInputChange("nickname", value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="submitButton"
                        id="registButton"
                        disabled={!isFormValid}
                    >
                        회원가입
                    </button>
                </form>
                <div className="login" onClick={() => navigate("/")}>
                    로그인하러 가기
                </div>
            </main>
        </div>
    );
};

export default Regist;

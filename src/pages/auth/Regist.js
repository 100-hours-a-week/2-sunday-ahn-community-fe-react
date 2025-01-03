import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../../styles/Regist.css";
import TitleHeader from "../../components/TItleHeader";
import BackButton from "../../components/BackButton";
import ProfileBox from "../../components/ProfileBox";
import EmailBox from "../../components/EmailBox";
import PasswordBox from "../../components/PasswordBox";
import CheckPasswordBox from "../../components/CheckPasswordBox";
import NicknameBox from "../../components/NicknameBox";
import { validateEmail, validatePassword, validateNickname } from "../../utils/validation";

const Regist = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        nickname: "",
    });
    const [isEmailDuplicate, setIsEmailDuplicate] = useState(false); // 이메일 중복 여부
    const [isFormValid, setIsFormValid] = useState(false); // 폼 유효성 상태

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (file) => {
        setFormData((prev) => ({ ...prev, profileImage: file }));
    };

    // 이메일 중복 검사 함수
    const checkEmailDuplicate = async (email) => {
        try {
            const response = await fetch(`http://localhost:3000/auth/email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            if (!response.ok) {
                const result = await response.json();
                setIsEmailDuplicate(true);
                return result.message || "*중복된 이메일입니다.";
            }
            setIsEmailDuplicate(false);
            return ""; // 중복 아님
        } catch (err) {
            console.error("이메일 중복 검사 오류:", err);
            setIsEmailDuplicate(true);
            return "*서버와의 연결에 문제가 발생했습니다.";
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

        const emailError = await checkEmailDuplicate(formData.email);
        if (emailError) {
            alert(emailError);
            return;
        }

        const formDataObj = new FormData();
        formDataObj.append("email", formData.email);
        formDataObj.append("password", formData.password);
        formDataObj.append("nickname", formData.nickname);
        if (formData.profileImage) {
            formDataObj.append("profileImage", formData.profileImage);
        }

        try {
            const response = await fetch("http://localhost:3000/auth/regist", {
                method: "POST",
                body: formDataObj,
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
                    <TitleHeader />
                </div>
            </div>
            <main>
                <h2>회원가입</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="inputText">
                        <p>프로필 사진</p>
                        <ProfileBox onFileChange={handleFileChange} />
                        <EmailBox
                            value={formData.email}
                            onChange={(value) => handleInputChange("email", value)}
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

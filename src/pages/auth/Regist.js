import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../../styles/Regist.css";
import TitleHeader from "../../components/TItleHeader";
import BackButton from "../../components/BackButton";
import ProfileBox from "../../components/ProfileBox";
import EmailBox from "../../components/EmailBox";
import PasswordBox from "../../components/PasswordBox";
import CheckPasswordBox from "../../components/CheckPasswordBox";
import NicknameBox from "../../components/NicknameBox";

const Regist = () => {
    const navigate = useNavigate(); 

    const handleLoginClick = () => {
        navigate("/");
    };

    const [password, setPassword] = useState(""); // 비밀번호 상태
    const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인 상태
    const [isPasswordMatch, setIsPasswordMatch] = useState(false); // 비밀번호 일치 여부
    const [nickname, setNickname] = useState(""); // 닉네임 상태
    const [isFormValid, setIsFormValid] = useState(false); // 전체 폼 유효성 상태

    // 비밀번호 변경 핸들러
    const handlePasswordChange = (value) => {
        setPassword(value);
        setIsPasswordMatch(value === confirmPassword && confirmPassword.trim().length > 0);
    };

    // 비밀번호 확인 핸들러
    const handleCheckPassword = (value) => {
        setConfirmPassword(value);
        setIsPasswordMatch(value === password);
    };

    // 닉네임 변경 핸들러
    const handleNicknameChange = (value) => {
        setNickname(value);
    };

    // 회원가입 버튼 클릭
    const handleSubmit = () => {
        if (!nickname.trim()) {
            alert("닉네임을 입력해주세요.");
            return;
        }
        if (!isPasswordMatch) {
            alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            return;
        }
        // 서버 전송 또는 다음 단계로 이동
        console.log("회원가입 완료!");
        navigate("/welcome"); // 회원가입 완료 후 페이지 이동
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
                <div className="inputText">
                    <p>프로필 사진</p>
                    <ProfileBox />
                    <EmailBox />
                    <PasswordBox onPasswordChange={handlePasswordChange} />
                    <CheckPasswordBox
                        onCheckPassword={handleCheckPassword}
                        isPasswordMatch={isPasswordMatch}
                    />
                    <NicknameBox onNicknameChange={handleNicknameChange} />
                </div>
                <input
                    type="submit"
                    value="회원가입"
                    className="submitButton"
                    id="registButton"
                    onClick={handleSubmit}
                />
                <div className="login" onClick={handleLoginClick}>
                    로그인하러 가기
                </div>
            </main>
        </div>
    );
};

export default Regist;

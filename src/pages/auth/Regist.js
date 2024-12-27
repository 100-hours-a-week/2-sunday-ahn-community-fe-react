import React, { useState } from "react";
import TitleHeader from "../../components/TItleHeader";
import BackButton from "../../components/BackButton";
import ProfileBox from "../../components/ProfileBox";
import EmailBox from "../../components/EmailBox";
import PasswordBox from "../../components/PasswordBox";
import CheckPasswordBox from "../../components/CheckPasswordBox";
import "../../styles/Regist.css";

const Regist = () => {
    const [password, setPassword] = useState(""); // 비밀번호 상태
    const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인 상태
    const [isPasswordMatch, setIsPasswordMatch] = useState(false); // 비밀번호 일치 여부

    // 비밀번호 변경 핸들러
    const handlePasswordChange = (value) => {
        setPassword(value);
        // 비밀번호가 변경되었을 때 확인 필드 재검증
        setIsPasswordMatch(value === confirmPassword && confirmPassword.trim().length > 0);
    };

    // 비밀번호 확인 핸들러
    const handleCheckPassword = (value) => {
        setConfirmPassword(value);
        setIsPasswordMatch(value === password); // 입력값과 비밀번호 비교
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
                </div>
            </main>
        </div>
    );
};

export default Regist;

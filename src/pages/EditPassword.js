import { useNavigate } from "react-router-dom";
import { fetchUserSession } from "../utils/session";
import React, { useState, useEffect } from "react";
import PasswordBox from "../components/PasswordBox";
import TitleHeader from "../components/TItleHeader";
import CheckPasswordBox from "../components/CheckPasswordBox";
import ToggleProfile from "../components/ToggleProfile";
import "../styles/EditUserInfo.css";

const EditPassword = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null); // 현재 사용자 정보

    const [password, setPassword] = useState(""); // 새 비밀번호
    const [confirmPassword, setConfirmPassword] = useState(""); // 확인 비밀번호
    const [isPasswordValid, setIsPasswordValid] = useState(false); // 비밀번호 유효성 검사

    // 사용자 정보 로드
    useEffect(() => {
        const loadUserData = async () => {
            try {
                const userData = await fetchUserSession();
                setUser(userData);
            } catch (error) {
                console.error("사용자 정보 로드 오류:", error.message);
                navigate("/login");
            }
        };
        loadUserData();
    }, [navigate]);

    // 비밀번호 유효성 검사
    useEffect(() => {
        const isValid =
            password &&
            confirmPassword &&
            password === confirmPassword; // 비밀번호와 확인 비밀번호가 동일해야 함
        setIsPasswordValid(isValid);
    }, [password, confirmPassword]);

    // 비밀번호 변경 처리
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isPasswordValid) {
            alert("비밀번호를 확인해주세요.");
            return;
        }

        try {
            const response = await fetch(`http://${process.env.REACT_APP_API_URL}/api/users/password/${user?.userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ newPassword: password }),
                credentials: "include",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "비밀번호 변경 실패");
            }

            alert("비밀번호가 수정완료되었습니다.");
            navigate("/posts");
        } catch (error) {
            console.error("비밀번호 변경 오류:", error.message);
            alert("비밀번호 변경 중 문제가 발생했습니다.");
        }
    };

    return (
        <div className="editPasswordBox">
            <div className="editUserInfoHeaders">
                <div className="editUserInfoHeader">
                    <div className="tmp"></div>
                    <TitleHeader />
                    <ToggleProfile profileImage={user?.profileImage} />
                </div>
            </div>
            <h4><strong>비밀번호 수정</strong></h4>
            <div>
                <PasswordBox 
                    value={password} 
                    onChange={setPassword} 
                />
                <CheckPasswordBox
                    password={password}
                    confirmPassword={confirmPassword}
                    onCheckPassword={setConfirmPassword}
                />
            </div>
            <div className="bottom">
                    <input 
                        type="submit" 
                        className="submitButton" 
                        value="수정하기" 
                        onClick={handleSubmit}
                        disabled={!isPasswordValid}
                    />
            </div>
        </div>
    );
};

export default EditPassword;
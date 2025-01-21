import { useNavigate } from "react-router-dom";
import { fetchUserSession } from "../utils/session";
import React, { useState, useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "../assets/anim.json"; 
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

    const [isToastVisible, setIsToastVisible] = useState(false); // 토스트 메시지 상태

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
            const response = await fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/users/password/${user?.userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ newPassword: password }),
                credentials: "include",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "비밀번호 변경 실패");
            }

            // alert("비밀번호가 수정완료되었습니다.");
            showToast();
        } catch (error) {
            console.error("비밀번호 변경 오류:", error.message);
            alert("비밀번호 변경 중 문제가 발생했습니다.");
        }
    };
    const lottieContainer = useRef(null);
    useEffect(() => {
        if (lottieContainer.current) {
            const animation = lottie.loadAnimation({
                container: lottieContainer.current, // DOM 컨테이너
                renderer: "svg",
                loop: true,
                autoplay: true,
                animationData, // Lottie 애니메이션 데이터
            });
    
            return () => {
                animation.destroy(); // 컴포넌트 언마운트 시 정리
            };
        }
    }, []);
    // 토스트 메시지 표시
    const showToast = () => {
        setIsToastVisible(true);
        setTimeout(() => {
            setIsToastVisible(false);
        }, 1000); // 1초 뒤에 숨기기
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
            <div className={`finish ${isToastVisible ? "visible" : ""}`}>
                <div className="finish-background">
                    <p><strong>수정완료!</strong></p>
                </div> 
                <div id="lottie" ref={lottieContainer}></div>
            </div>
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
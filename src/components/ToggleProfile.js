import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/css/ToggleProfile.css";
import sampleProfile from "../assets/user.png";

const ToggleProfile = ({ profileImage }) => {
    const navigate = useNavigate();
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const handleToggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleLogout = async () => {
        try {
            const response = await fetch(`http://${process.env.REACT_APP_API_URL}/api/users/logout`, {
                method: "POST",
                credentials: "include", // 세션 쿠키 포함
            });

            if (response.ok) {
                // 클라이언트 세션 초기화
                sessionStorage.removeItem("user");
                navigate("/login");
            } else {
                const errorData = await response.json();
                alert(`로그아웃 실패: ${errorData.message}`);
            }
        } catch (error) {
            console.error("로그아웃 요청 오류:", error.message);
            alert("네트워크 오류 발생. 로그아웃에 실패했습니다.");
        }
    };

    return (
        <div className="normalProfile">
            <div className="profileHeaderBox" onClick={handleToggleDropdown}>
                <img
                    className="profileImage"
                    id="profileImage"
                    alt="프로필 사진"
                    src={profileImage || sampleProfile} // 프로필 이미지가 없으면 기본 이미지 사용
                />
            </div>
            {/* 드롭다운 메뉴 */}
            <div
                className="dropdown"
                id="dropdownMenu"
                style={{ display: isDropdownVisible ? "flex" : "none" }} // 상태에 따라 표시
            >
                <p id="editUserInfo" onClick={() => navigate("/editUserInfo")}>회원정보수정</p>
                <p id="editPassword" onClick={() => navigate("/editPassword")}>비밀번호수정</p>
                <p id="logout" onClick={handleLogout}>로그아웃</p>
            </div>
        </div>
    );
};

export default ToggleProfile;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/css/ToggleProfile.css";

const ToggleProfile = () => {
    const navigate = useNavigate(); // 네비게이트 훅 사용
    const [isDropdownVisible, setIsDropdownVisible] = useState(false); // 드롭다운 상태 관리

    const handleEditUserInfoClick = () => {
        navigate("/editUserInfo"); // /posts로 이동
    };

    const handleToggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible); // 드롭다운 상태 토글
    };

    return (
        <div className="normalProfile">
            <div className="profileHeaderBox" onClick={handleToggleDropdown}>
                <img className="profileImage" id="profileImage" alt="프로필 사진" />
            </div>
            {/* 드롭다운 메뉴 */}
            <div
                className="dropdown"
                id="dropdownMenu"
                style={{ display: isDropdownVisible ? "flex" : "none" }} // 상태에 따라 표시
            >
                <p id="editUserInfo" onClick={handleEditUserInfoClick}>회원정보수정</p>
                <p id="editPassword">비밀번호수정</p>
                <p id="logout" onClick={()=>navigate("/login")}>로그아웃</p>
            </div>
        </div>
    );
};

export default ToggleProfile;

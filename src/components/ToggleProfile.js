import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/css/ToggleProfile.css";
import sampleProfile from "../assets/user.png"

const ToggleProfile = () => {
    const navigate = useNavigate();
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const handleToggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible); 
    };

    return (
        <div className="normalProfile">
            <div className="profileHeaderBox" onClick={handleToggleDropdown}>
                <img className="profileImage" id="profileImage" alt="프로필 사진" src={sampleProfile} />
            </div>
            {/* 드롭다운 메뉴 */}
            <div
                className="dropdown"
                id="dropdownMenu"
                style={{ display: isDropdownVisible ? "flex" : "none" }} // 상태에 따라 표시
            >
                <p id="editUserInfo" onClick={()=>navigate("/editUserInfo")}>회원정보수정</p>
                <p id="editPassword" onClick={()=>navigate("/editPassword")}>비밀번호수정</p>
                <p id="logout" onClick={()=>navigate("/login")}>로그아웃</p>
            </div>
        </div>
    );
};

export default ToggleProfile;

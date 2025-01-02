import React from "react";
import { useNavigate } from "react-router-dom"; // 뒤로가기 구현을 위한 useNavigate
import "./css/BackButton.css";
import backButtonImage from "../assets/backButton.png"; // 이미지 경로

const BackButton = () => {
    const navigate = useNavigate(); // useNavigate 훅

    const handleBackClick = () => {
        navigate(-1); // 뒤로가기
    };

    return (
        <button className="backButton" onClick={handleBackClick}>
            <img src={backButtonImage} alt="뒤로가기" />
        </button>
    );
};

export default BackButton;

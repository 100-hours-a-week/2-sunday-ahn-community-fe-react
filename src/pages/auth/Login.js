import React from "react";
import { useNavigate } from "react-router-dom";
import LoginHeader from "../../components/LoginHeader";
import EmailBox from "../../components/EmailBox";
import PasswordBox from "../../components/PasswordBox";
import "../../styles/Login.css";

const Login = () => {
    const navigate = useNavigate(); 

    const handleRegistClick = () => {
        navigate("/regist");
    };
    
    return (
        <div className="loginbox">
            <LoginHeader />
            <div className="inputFields">
                <EmailBox />
                <PasswordBox />
                <button className="submitButton">로그인</button>
                <button className="registButton" onClick={handleRegistClick}>회원가입</button>
            </div>
        </div>
    );
};


export default Login;

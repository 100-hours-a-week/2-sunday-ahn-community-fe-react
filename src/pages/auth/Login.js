import LoginHeader from "../../components/LoginHeader";
import EmailBox from "../../components/EmailBox";
import PasswordBox from "../../components/PasswordBox";
import "../../styles/Login.css";

const Login = () => {
    return (
        <div className="loginbox">
            <LoginHeader />
            <div className="inputFields">
                <EmailBox />
                <PasswordBox />
                <button className="submitButton">로그인</button>
                <button className="registButton">회원가입</button>
            </div>
        </div>
    );
};


export default Login;

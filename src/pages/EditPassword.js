import CheckPasswordBox from "../components/CheckPasswordBox";
import PasswordBox from "../components/PasswordBox";
import TitleHeader from "../components/TItleHeader";
import ToggleProfile from "../components/ToggleProfile";
import "../styles/EditUserInfo.css";

const EditPassword = () => {

    return (
        <div className="editPasswordBox">
            <div className="editUserInfoHeaders">
                <div className="editUserInfoHeader">
                    <div className="tmp"></div>
                    <TitleHeader />
                    <ToggleProfile />
                </div>
            </div>
            <h4><strong>비밀번호 수정</strong></h4>
            <div>
                <PasswordBox/>
                <CheckPasswordBox/>
            </div>
            <div className="bottom">
                    <input type="submit" className="submitButton" value="수정하기" />
            </div>
        </div>
    );
};

export default EditPassword;
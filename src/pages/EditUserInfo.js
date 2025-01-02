import NicknameBox from "../components/NicknameBox";
import TitleHeader from "../components/TItleHeader";
import ToggleProfile from "../components/ToggleProfile";
import "../styles/EditUserInfo.css"

const EditUserInfo = () => {
    
    return(
        <div className="editUserInfobox">
            <div className="editUserInfoHeaders">
                <div className="editUserInfoHeader">
                    <div className="tmp"> </div>
                    <TitleHeader/>
                    <ToggleProfile/>
                </div>
            </div>
            <main>
                <div className="inputText">
                    <div className="editUserInfoContent">
                        <h4><strong>회원정보 수정</strong></h4>
                        <p>프로필 사진</p>
                        <div className="profileContainer">
                            <div className="box2" id="profileBox">
                                <img className="profile2" id="profileImagePreview" src="" alt=""/>
                                <button className="editProfile" id="editProfile">변경</button>
                            </div>
                            <input type="file" id="fileInput" accept="image/*" />
                        </div>
                    </div>
                    <div className="editUserInfoContent">
                        <p>이메일</p>
                        <div>
                            <p id="email">sample.123@sample.com</p>
                        </div>
                    </div>
                    <div className="editUserInfoContent">
                        <NicknameBox/>
                    </div>
                </div>
                <div className="bottom">
                    <input type="submit" className="submitButton" value="수정하기"/>
                    <button className="deleteMember" onclick="openModal()">회원 탈퇴</button>
                    <div className="finish">
                        <div className="finishBtn">수정완료</div>
                    </div>
                </div>
            </main>
            
        </div>
    );
};

export default EditUserInfo;
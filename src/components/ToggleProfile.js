import "../components/css/ToggleProfile.css"

const ToggleProfile = () => {

    return(
        <div className="normalProfile">
            <div className="profileHeaderBox">
                <img className="profileImage" id="profileImage" alt="프로필 사진"/>
            </div>
            {/* <!-- 드롭다운 메뉴 --> */}
            <div className="dropdown" id="dropdownMenu">
                <p id="editUserInfo">회원정보수정</p>
                <p id="editPassword">비밀번호수정</p>
                <p id="logout">로그아웃</p>
            </div>
        </div>
    );
};

export default ToggleProfile;
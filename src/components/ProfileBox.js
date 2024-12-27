import "./css/ProfileBox.css";
const ProfileBox = () => {
    return (
        <div>
            <div className="profileContainer">
                <div className="box" id="profileBox">
                    <img className="profile" id="profileImage" src="" alt=""/>
                </div>
            <input type="file" id="fileInput" accept="image/*" /> 
            </div>
        </div>
    );
}

export default ProfileBox;
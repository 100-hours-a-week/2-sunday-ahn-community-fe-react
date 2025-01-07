import React, { useState } from "react";
import "./css/ProfileBox.css";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const ProfileBox = ({ onFileChange }) => {
    const [preview, setPreview] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); 
    const [touched, setTouched] = useState(false); 

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                setErrorMessage("*파일 크기는 2MB 이하이어야 합니다.");
                setPreview(""); 
                onFileChange(null); 
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target.result); // 미리보기 이미지 설정
                setErrorMessage(""); 
            };
            reader.readAsDataURL(file);
            onFileChange(file); 
        } else {
            setPreview(""); 
            onFileChange(null);
            if (touched) {
                setErrorMessage("*프로필 사진을 추가해주세요.");
            }
        }
    };

    const handleBoxClick = () => {
        setTouched(true); // 클릭 상태로 설정
        document.getElementById("fileInput").click(); // 파일 입력 창 열기
    };

    const handleBlur = () => {
        // 클릭 후 파일이 없으면 에러 메시지 표시
        if (!preview && touched) {
            setErrorMessage("*프로필 사진을 추가해주세요.");
        }
    };

    return (
        <div className="profileContainer2">
            <p>프로필 사진</p>
            {errorMessage && <div className="error visible" id = "profileError">{errorMessage}</div>}
            <div
                className="box2"
                id="profileBox"
                onClick={handleBoxClick}
                onBlur={handleBlur}
                tabIndex={0} // 포커스 가능한 요소로 설정
            >
                {preview ? (
                    <img className="profile" id="profileImage" src={preview} alt="프로필 사진" />
                ) : (
                    <span className="placeholder">+</span>
                )}
            </div>
            <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleFileChange}
            />
        </div>
    );
};

export default ProfileBox;

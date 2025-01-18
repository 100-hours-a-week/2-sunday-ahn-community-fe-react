import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NicknameBox from "../components/NicknameBox";
import TitleHeader from "../components/TItleHeader";
import ToggleProfile from "../components/ToggleProfile";
import WithdrawModal from "../components/WithdrawModal";
import "../styles/EditUserInfo.css";
import { fetchUserSession } from "../utils/session";
import sampleProfile from "../assets/user.png";
import { uploadProfile, deleteProfile } from "../utils/imageManager";

const EditUserInfo = () => {
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [user, setUser] = useState(null); // 현재 사용자 정보

    const [profileImage, setProfileImage] = useState(""); // 현재 표시되는 프로필 이미지
    
    const [nickname, setNickname] = useState(""); // 닉네임
    const [newNickname, setNewNickname] = useState(""); // 바꾼 닉네임
    const [isNicknameValid, setIsNicknameValid] = useState(true); // 닉네임 유효성

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // 사용자 정보 로드
    useEffect(() => {
        const loadUserData = async () => {
            try {
                const userData = await fetchUserSession();
                setUser(userData);
                setNickname(userData?.nickname);
                setNewNickname(userData?.nickname);
                setProfileImage(userData?.profileImage || sampleProfile);
            } catch (error) {
                console.error("사용자 정보 로드 오류:", error.message);
                navigate("/login");
            }
        };
        loadUserData();
    }, [navigate]);

    // 닉네임 변경 및 중복 체크
    const handleNicknameChange = async (inputNickname) => {
        setNewNickname(inputNickname);
        if ((inputNickname !== nickname) && (inputNickname.trim() !== "")) {
            try {
                const response = await fetch("http://localhost:3000/auth/nickname", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nickname: inputNickname }),
                });

                if (response.ok) {
                    setIsNicknameValid(true);
                } else {
                    setIsNicknameValid(false);
                }
            } catch (error) {
                console.error("닉네임 중복 체크 오류:", error);
                setIsNicknameValid(false);
            }
        } else {
            setIsNicknameValid(true);
        }
    };
    // 회원정보 수정 처리
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isNicknameValid) {
            alert("유효하지 않은 닉네임입니다.");
            return;
        }
        try {
            // 닉네임 변경 처리
            if (nickname !== newNickname) {
                const response = await fetch(`http://localhost:3000/users/nickname/${user?.userId}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ newNickname: newNickname }),
                    credentials: "include",
                });

                if (!response.ok) throw new Error("닉네임 업데이트 실패");
            }

            alert("회원정보가 성공적으로 수정되었습니다.");
            // navigate("/posts");

        } catch (error) {
            console.error("회원정보 수정 오류:", error.message);
            alert("회원정보 수정 중 문제가 발생했습니다.");
        }
    };

    // 프로필 이미지 변경 처리
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        try {
            const fileUrl = await uploadProfile(file);
            if (fileUrl) {
                // 프로필 이미지 변경 처리
                if(profileImage!==sampleProfile){
                    await deleteProfile(profileImage);
                }
                // 새 이미지 URL 저장 요청
                const response = await fetch(`http://localhost:3000/users/profileImg/${user?.userId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ newProfileImg: fileUrl }),
                    credentials: "include",
                });

                if (!response.ok) throw new Error("프로필 이미지 업데이트 실패");

                const updatedUser = await response.json(); // 새 세션 정보 받기

                setUser(updatedUser.data); // 상태 동기화
                setProfileImage(fileUrl);
                alert("프로필 사진을 수정하였습니다.");
            }
        } catch (error) {
            console.error("프로필 이미지 업로드 오류:", error);
        }
    };

    // 프로필 이미지 삭제 처리 함수
    const handleImageDelete = async () => {
        try {
            if (profileImage && (profileImage !== sampleProfile)) {
                await deleteProfile(profileImage); // 기존 이미지 삭제
            }

        // 백엔드와 동기화
        const response = await fetch(`http://localhost:3000/users/profileImg/${user?.userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newProfileImg: "" }), // 기본 이미지로 설정
            credentials: "include",
        });

        if (!response.ok) throw new Error("프로필 이미지 삭제 설정 실패");

        const updatedUser = await response.json(); // 새 세션 정보 받기
        setUser(updatedUser.data); // 상태 동기화

        setProfileImage(sampleProfile); // 기본 이미지로

        alert("프로필 사진을 삭제하였습니다.");
        } catch (error) {
            console.error("프로필 이미지 삭제 오류:", error.message);
            alert("프로필 이미지 삭제 중 문제가 발생했습니다.");
        }
        return;
    };

    return (
        <div className="editUserInfobox">
            <div className="editUserInfoHeaders">
                <div className="editUserInfoHeader">
                    <div className="tmp"></div>
                    <TitleHeader />
                    <ToggleProfile profileImage={user?.profileImage} />
                </div>
            </div>
            <main>
                <div className="inputText">
                    <div className="editUserInfoContent">
                        <h4><strong>회원정보 수정</strong></h4>
                        <p>프로필 사진</p>
                        <div className="profileContainer">
                            <div className="box2" id="profileBox">
                                <img
                                    className="profile2"
                                    id="profileImagePreview"
                                    src={profileImage}
                                    alt="프로필 이미지"
                                />
                                <button
                                    className="editProfile"
                                    id="editProfile"
                                    onClick={() => document.getElementById("fileInput").click()}
                                >
                                    변경
                                </button>
                            </div>
                            <input
                                type="file"
                                id="fileInput"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />
                        </div>
                        <button
                            className="deleteProfile"
                            id="deleteProfile"
                            onClick={handleImageDelete}
                        >
                            사진 삭제
                        </button>
                    </div>
                    <div className="editUserInfoContent">
                        <p>이메일</p>
                        <div>
                            <p id="email">{user?.email}</p>
                        </div>
                    </div>
                    <div className="editUserInfoContent">
                        <NicknameBox
                            value={newNickname}
                            originalValue={nickname}
                            onChange={handleNicknameChange}
                        />
                    </div>
                </div>
                <div className="bottom">
                    <input
                        type="submit"
                        className="submitButton"
                        value="수정하기"
                        onClick={handleSubmit}
                        disabled={
                            !isNicknameValid || // 닉네임 유효성 검사 실패
                            !newNickname.trim() || // 닉네임이 비어 있음
                            nickname === newNickname // 닉네임 변경 사항 없음
                        }
                    />
                    <button className="deleteMember" onClick={openModal}>
                        회원 탈퇴
                    </button>
                </div>
            </main>
            {isModalOpen && (
                <div className="modalPopup">
                    <WithdrawModal 
                        userId={user?.userId} 
                        onClose={closeModal} 
                    />
                </div>
            )}
        </div>
    );
};

export default EditUserInfo;

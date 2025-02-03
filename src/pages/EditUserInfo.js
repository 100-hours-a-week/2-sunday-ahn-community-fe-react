import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import lottie from "lottie-web";
import animationData from "../assets/anim.json"; 
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

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [isToastVisible, setIsToastVisible] = useState(false); // 토스트 메시지 상태

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

    // 토스트 메시지 표시
    const showToast = () => {
        setIsToastVisible(true);
        setTimeout(() => {
            setIsToastVisible(false);
        }, 1000); // 1초 뒤에 숨기기
    };
    

    // 회원정보 수정 처리
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // 닉네임 변경 처리
            if (nickname !== newNickname) {
                const response = await fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/users/nickname/${user?.userId}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ newNickname: newNickname }),
                    credentials: "include",
                });

                if (!response.ok) throw new Error("닉네임 업데이트 실패");
            }
            showToast();
            setNickname(newNickname);
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
                const response = await fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/users/profileImg/${user?.userId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ newProfileImg: fileUrl }),
                    credentials: "include",
                });

                if (!response.ok) throw new Error("프로필 이미지 업데이트 실패");

                const updatedUser = await response.json(); // 새 세션 정보 받기

                setUser(updatedUser.data); // 상태 동기화
                setProfileImage(fileUrl);
                showToast();
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
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/users/profileImg/${user?.userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newProfileImg: "" }), // 기본 이미지로 설정
            credentials: "include",
        });

        if (!response.ok) throw new Error("프로필 이미지 삭제 설정 실패");

        const updatedUser = await response.json(); // 새 세션 정보 받기
        setUser(updatedUser.data); // 상태 동기화

        setProfileImage(sampleProfile); // 기본 이미지로

        showToast();
        } catch (error) {
            console.error("프로필 이미지 삭제 오류:", error.message);
            alert("프로필 이미지 삭제 중 문제가 발생했습니다.");
        }
        return;
    };

    const lottieContainer = useRef(null);

    useEffect(() => {
        if (lottieContainer.current) {
            const animation = lottie.loadAnimation({
                container: lottieContainer.current, // DOM 컨테이너
                renderer: "svg",
                loop: true,
                autoplay: true,
                animationData, // Lottie 애니메이션 데이터
            });
    
            return () => {
                animation.destroy(); // 컴포넌트 언마운트 시 정리
            };
        }
    }, []);
    

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
                        <div className={`finish ${isToastVisible ? "visible" : ""}`}>
                            <div className="finish-background">
                                <p><strong>수정완료!</strong></p>
                            </div> 
                            <div id="lottie" ref={lottieContainer}></div>
                        </div>
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
                        {(profileImage !== sampleProfile) && (
                        <button
                            className="deleteProfile"
                            id="deleteProfile"
                            onClick={handleImageDelete}
                        >
                            사진 삭제
                        </button>
                        )}
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
                            onChange={setNewNickname}
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

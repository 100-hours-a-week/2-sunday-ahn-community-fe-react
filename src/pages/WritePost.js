import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import TitleHeader from "../components/TItleHeader";
import ToggleProfile from "../components/ToggleProfile";
import PostForm from "../components/PostForm";
import "../styles/WritePost.css";
import { fetchUserSession } from "../utils/session";
import { uploadPostImage } from "../utils/imageManager";

const WritePost = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // 세션 정보 로드
    useEffect(() => {
        const loadData = async () => {
            try {
                const userData = await fetchUserSession();
                setUser(userData);
            } catch (error) {
                console.error(error.message);
                navigate("/login");
            }
        };
        loadData();
    }, [navigate]);

    // 게시글 작성 처리
    const handlePostSubmit = async ({ title, content, file }) => {
        let imageUrl = "";

        // 이미지 업로드 처리
        if (file) {
            imageUrl = await uploadPostImage(file);
        }

        // 게시글 작성 요청
        try {
            const postData = {
                userId: user.userId,
                title,
                content,
                imageUrl,
            };

            const response = await fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/posts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(postData),
                credentials: "include",
            });

            if (response.ok) {
                const responseData = await response.json(); // 응답 JSON 파싱
                alert("게시글 작성 완료!");
                navigate(`/viewPost?postId=${responseData.data}`);
            } else {
                const errorData = await response.json();
                console.error("게시글 작성 실패:", errorData.message);
                alert("게시글 작성에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("게시글 작성 오류:", error);
            alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="writePostbox">
            <div className="postsHeaders">
                <div className="postsHeader">
                    <BackButton />
                    <TitleHeader />
                    <ToggleProfile profileImage={user?.profileImage} />
                </div>
            </div>
            <main>
                <h5><strong>게시글 작성</strong></h5>
                <div className="inputText">
                    <PostForm onSubmit={handlePostSubmit} />
                </div>
            </main>
        </div>
    );
};

export default WritePost;

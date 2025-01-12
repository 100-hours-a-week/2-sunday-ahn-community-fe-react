import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import TitleHeader from "../components/TItleHeader";
import ToggleProfile from "../components/ToggleProfile";
import PostForm from "../components/PostForm";
import "../styles/WritePost.css";
import { fetchUserSession } from "../utils/session";

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
    }, []);

    // 게시글 작성 처리
    const handlePostSubmit = async ({ title, content, file }) => {
        let imageUrl = "";

        // 이미지 업로드 처리
        if (file) {
            const formData = new FormData();
            formData.append("image", file);

            try {
                const presignedUrlResponse = await fetch("http://localhost:3000/posts/uploadPostImage", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        filename: file.name,
                        contentType: file.type,
                    }),
                    credentials: "include",
                });

                if (!presignedUrlResponse.ok) throw new Error("Pre-signed URL 요청 실패");

                const { presignedUrl, fileUrl } = await presignedUrlResponse.json();

                // 2. Pre-signed URL로 이미지 업로드
                const uploadResponse = await fetch(presignedUrl, {
                    method: "PUT",
                    body: file,
                    headers: {
                        "Content-Type": file.type, // 반드시 파일 타입 설정
                    },
                });

                if (!uploadResponse.ok) throw new Error("이미지 업로드 실패");

                imageUrl = fileUrl; // 업로드된 파일의 URL 저장
            } catch (error) {
                console.error("이미지 업로드 오류:", error);
                alert("이미지 업로드에 실패했습니다.");
                return;
            }
        }

        // 게시글 작성 요청
        try {
            const postData = {
                userId: user.userId,
                title,
                content,
                imageUrl,
            };

            const response = await fetch("http://localhost:3000/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(postData),
                credentials: "include",
            });

            if (response.ok) {
                alert("게시글 작성 완료!");
                navigate("/posts");
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

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackButton from "../components/BackButton";
import TitleHeader from "../components/TItleHeader";
import ToggleProfile from "../components/ToggleProfile";
import PostForm from "../components/PostForm";
import "../styles/WritePost.css";
import { fetchUserSession } from "../utils/session";
import { uploadPostImage, deletePostImage } from "../utils/imageManager";

const EditPost = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const postId = new URLSearchParams(location.search).get("postId");

    const [user, setUser] = useState(null);
    const [post, setPost] = useState(null);

    // 사용자 세션 및 게시글 정보 로드
    useEffect(() => {
        const loadData = async () => {
            try {
                const userData = await fetchUserSession();
                setUser(userData);

                // 게시글 정보 가져오기
                const response = await fetch(`http://localhost:3000/posts/${postId}`, {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("게시글 정보를 가져오지 못했습니다.");
                }

                const { data } = await response.json();

                if (!(data.author.userId === userData.userId)) {
                    alert("자신이 작성한 게시글만 수정할 수 있습니다.");
                    navigate("/posts");
                    return;
                }

                setPost(data);
            } catch (error) {
                console.error("오류:", error.message);
                alert("로그인이 필요하거나 게시글 정보를 불러오는 중 오류가 발생했습니다.");
                navigate("/login");
            }
        };

        loadData();
    }, [postId, navigate]);

    // 게시글 수정 처리
    const handlePostSubmit = async ({ title, content, file, isImageDeleted }) => {
        let imageUrl = post.imageUrl;

        // 이미지를 지웠다면 삭제 처리
        if (isImageDeleted) {
            imageUrl = await deletePostImage(imageUrl)
        }
        // 이미지 업로드 처리
        if (file) {
            imageUrl = await uploadPostImage(file);
        }
        console.log("수정요청하는 imageUrl : ", imageUrl);

        // 게시글 수정 요청
        try {
            const postData = {
                title,
                content,
                imageUrl,
            };

            const response = await fetch(`http://localhost:3000/posts/${postId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(postData),
                credentials: "include",
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("게시글 수정 실패:", errorData.message);
                alert("게시글 수정에 실패했습니다.");
                return;
            }

            alert("게시글 수정 완료!");
            navigate(`/viewPost?postId=${postId}`);
        } catch (error) {
            console.error("게시글 수정 오류:", error);
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
                <h5><strong>게시글 수정</strong></h5>
                <div className="inputText">
                    {post ? (
                        <PostForm
                            onSubmit={handlePostSubmit}
                            initialData={{
                                title: post.title,
                                content: post.content,
                                imageUrl: post.imageUrl,
                            }}
                            buttonText="수정하기"
                            showDeleteButton={true}
                        />
                    ) : (
                        <p>게시글 정보를 불러오는 중입니다...</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EditPost;

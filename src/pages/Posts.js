import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import TitleHeader from "../components/TItleHeader";
import Post from "../components/Post";
import Lottie from "react-lottie";
import animationData from "../assets/headerBackgroundAnim.json"; // JSON 파일 경로
import ToggleProfile from "../components/ToggleProfile";
import {fetchUserSession} from "../utils/session";
import "../styles/Posts.css"

const Posts = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null); // 사용자 정보 상태
    const [posts, setPosts] = useState([]); // 게시물 리스트 상태
    

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    // 게시물 목록 로드
    const fetchPosts = async () => {
        try {
            const response = await fetch("http://localhost:3000/posts", {
                method: "GET",
                credentials: "include",
            });

            if (!response.ok) throw new Error("게시물을 가져오는 데 실패했습니다.");

            const { data } = await response.json();
            setPosts(data); // 게시물 상태 업데이트
        } catch (error) {
            console.error("게시물 로드 오류:", error);
        }
    };

    // 게시물 클릭 이벤트
    const handlePostClick = (postId) => {
        navigate(`/viewPost?postId=${postId}`);
    };

    // 세션 정보 및 게시물 로드
    useEffect(() => {
        const loadData = async () => {
            try {
                const userData = await fetchUserSession();
                setUser(userData);
                await fetchPosts();
            } catch (error) {
                console.error(error.message);
                navigate("/login"); // 세션 정보가 없으면 로그인 페이지로 이동
            }
        };

        loadData();
    }, []);

    return(
        <div className="postsBox">
                <Lottie
                    options={defaultOptions}
                    width={700}
                    height={104} // postsHeaders 높이와 맞춤
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: -1,
                    }} // 애니메이션 배경 설정
                />
            <div className="postsHeaders">
                <div className="postsHeader">
                    <BackButton/>
                    <TitleHeader/>
                    <ToggleProfile profileImage={user?.profileImage} />
                </div>
            </div>
            <main>
                <div className="mainTxt">
                    <p id="mainTxt"></p>
                    <p id="mainTxt">" 잡담은 <strong>경쟁력</strong>이다! "</p>
                </div>
                <div className="bnt">
                    <div className="postBtn" id="postBtn" onClick={()=>navigate("/writePost")}>
                        <p><strong>게시물 작성</strong></p>
                    </div>
                </div>
                <div className="postList">
                    {/* <!--  게시물 리스트 ------> */}
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <Post
                                key={post.postId}
                                post={post}
                                onClick={() => handlePostClick(post.postId)}
                            />
                        ))
                    ) : (
                        <p>게시물이 없습니다.</p>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Posts;
import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "../assets/anim.json"; 
import './css/LoginHeader.css';
import './css/Common.css';

const LoginHeader = () => {
    const lottieContainer = useRef(null);

    useEffect(() => {
        const animation = lottie.loadAnimation({
            container: lottieContainer.current, 
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData,
        });

        return () => {
            animation.destroy(); // 컴포넌트 언마운트 시 애니메이션 정리
        };
    }, []);

    return (
        <div className="loginbox">
            <div ref={lottieContainer} className="lottie"></div>
            <div className="headerbox">
                <h1>SUNDAY의</h1>
                <h1>아무 말 대잔치</h1>
            </div>
        </div>
    );
};

export default LoginHeader;

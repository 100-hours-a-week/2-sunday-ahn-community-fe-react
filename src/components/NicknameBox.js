import React, { useState } from "react";
import "./css/InputBox.css";

const NicknameBox = ({ checkNicknameDuplication }) => {
    const [nickname, setNickname] = useState(""); // 닉네임 상태
    const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태
    const [errorVisible, setErrorVisible] = useState(false);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setNickname(value);

        // 유효성 검사
        if (!value.trim()) {
            setErrorMessage("*닉네임을 입력해주세요.");
            setErrorVisible(true);
        } else if (/\s/.test(value)) {
            setErrorMessage("*띄어쓰기를 없애주세요.");
            setErrorVisible(true);
        } else if (value.length > 10) {
            setErrorMessage("*닉네임은 최대 10자 까지 작성 가능합니다.");
            setErrorVisible(true);
        } else {
            setErrorMessage("");
            setErrorVisible(false);
        }
    };

    const handleValidation = async () => {
        if (!errorVisible && nickname.trim()) {
            const isDuplicate = await checkNicknameDuplication(nickname); // 중복 검사 함수 호출
            if (isDuplicate) {
                setErrorMessage("*중복된 닉네임 입니다.");
                setErrorVisible(true);
            } else {
                setErrorMessage("");
                setErrorVisible(false);
            }
        }
        else{
            setErrorMessage("*닉네임을 입력해주세요.");
            setErrorVisible(true);
        }
    };

    return (
        <div className="inputField">
            <p>닉네임</p>
            <input
                type="text"
                id="nickname"
                className="nickname"
                placeholder="닉네임을 입력하세요"
                required
                value={nickname}
                onChange={handleInputChange} // 입력값 변경 시 유효성 검사
                onBlur={handleValidation} // 포커스 해제 시 중복 검사
            />
            <div className={`error ${errorVisible ? "visible" : ""}`}>
                {errorMessage}
            </div>
        </div>
    );
};

export default NicknameBox;

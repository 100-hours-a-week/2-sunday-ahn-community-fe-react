import React, { useState } from "react";
import "../components/css/PostForm.css";
const PostForm = () => {
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const maxLength = 2000; // 내용 글자수 최대 제한

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setErrorMessage(""); // 에러 메시지 초기화
        } else {
            setFile(null);
            setErrorMessage("*이미지를 선택해주세요.");
        }
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        if (event.target.value.length <= maxLength) {
            setContent(event.target.value);
        }
    };

    return (
        <div className="postFormBox">
            <div className="postFormContent">
                
                <div className="charCount">
                    <p>제목* ({title.length} / 26 글자)</p>
                    
                </div>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="제목을 입력해주세요.(최대 26글자)"
                    maxLength="26"
                    value={title}
                    onChange={handleTitleChange}
                    required
                />
                
            </div>
            <div className="postFormContent">
                <p>내용* ({content.length}/{maxLength} 글자)</p> {/* 글자수 표시 */}
                <textarea
                    id="content"
                    name="content"
                    placeholder="내용을 입력해주세요."
                    rows="10"
                    value={content}
                    onChange={handleContentChange} // 글자수 제한 처리
                    required
                ></textarea>
            </div>
            <div className="postFormContent">
                {errorMessage && <div id="errorMessage" className="error">{errorMessage}</div>}
                <p>이미지</p>
                <input
                    type="file"
                    id="file"
                    accept="image/*"
                    onChange={handleFileChange} // 파일 변경 시 처리
                />
            </div>
        </div>
    );
};

export default PostForm;

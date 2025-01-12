import React, { useState } from "react";
import "../components/css/PostForm.css";

const PostForm = ({ onSubmit }) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const maxLength = 2000; // 내용 글자수 최대 제한

    // 제목 변경 핸들러
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    // 내용 변경 핸들러
    const handleContentChange = (event) => {
        if (event.target.value.length <= maxLength) {
            setContent(event.target.value);
        }
    };

    // 파일 변경 핸들러
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setErrorMessage(""); // 에러 메시지 초기화
        } else {
            setFile(null);
        }
    };

    // 폼 제출 핸들러
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!title.trim() || !content.trim()) {
            setErrorMessage("*제목과 내용을 모두 입력해주세요.");
            return;
        }

        onSubmit({ title, content, file });
    };

    return (
        <form className="postFormBox" onSubmit={handleSubmit}>
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
                <p>내용* ({content.length} / {maxLength} 글자)</p>
                <textarea
                    id="content"
                    name="content"
                    placeholder="내용을 입력해주세요."
                    rows="10"
                    value={content}
                    onChange={handleContentChange}
                    required
                />
            </div>
            <div className="postFormContent">
                {errorMessage && <div id="errorMessage" className="error">{errorMessage}</div>}
                <p>이미지</p>
                <input
                    type="file"
                    id="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>
            <div className="postFormContent" id="submitBnt">
                <button type="submit" className="submitButton">완료</button>
            </div>
        </form>
    );
};

export default PostForm;

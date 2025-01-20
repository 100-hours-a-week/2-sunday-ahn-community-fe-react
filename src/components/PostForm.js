import React, { useState } from "react";
import "../components/css/PostForm.css";

const PostForm = ({ onSubmit, initialData = {}, buttonText = "완료", showDeleteButton = false }) => {
    const extractFileName = (url) => {
        if (!url) return "선택된 파일 없음"; // URL이 없을 경우 기본 메시지
        return url.split("/").pop(); // URL에서 파일 이름만 추출
    };

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(extractFileName(initialData.imageUrl));
    const [title, setTitle] = useState(initialData.title || "");
    const [content, setContent] = useState(initialData.content || "");
    const [errorMessage, setErrorMessage] = useState("");
    const [isImageDeleted, setIsImageDeleted] = useState(false); // 기존 이미지 삭제 여부
    const maxLength = 2000;

    // 제목 변경
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    // 내용 변경
    const handleContentChange = (event) => {
        if (event.target.value.length <= maxLength) {
            setContent(event.target.value);
        }
    };

    // 파일 변경
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name); // 선택된 파일 이름 업데이트
            setErrorMessage(""); // 에러 메시지 초기화
            setIsImageDeleted(false); // 기존 이미지 삭제 취소
        }
    };

    // 파일 삭제
    const handleFileDelete = () => {
        setFile(null);
        setFileName("선택된 파일 없음"); // 파일 이름 초기화
        setIsImageDeleted(true); // 기존 이미지 삭제로 설정
    };

    // 폼 제출
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!title.trim() || !content.trim()) {
            setErrorMessage("*제목과 내용을 모두 입력해주세요.");
            return;
        }

        // 부모 컴포넌트에 데이터 전달
        onSubmit({ title, content, file, isImageDeleted });
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
            <div className="postFormContent" >
                {errorMessage && <div id="errorMessage" className="error">{errorMessage}</div>}
                <p>이미지</p>
                <div className="labelBox" style={{ display: "flex", alignItems: "center" }}>
                    <label htmlFor="file" className="customFileButton">
                        파일 선택
                    </label>
                    <input
                        type="file"
                        id="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: "none" }} // 기본 파일 입력 숨기기
                    />
                    {(fileName !== "선택된 파일 없음") && (
                        <span className="fileName">
                            {fileName}
                            {showDeleteButton && (
                                <label
                                    type="button"
                                    className="customFileButton"
                                    id="deleteFile"
                                    onClick={handleFileDelete}
                                >
                                    X
                                </label>
                            )}
                        </span>
                    )}
                </div>
            </div>
            <div className="postFormContent" id="submitBnt">
                <button type="submit" className="submitButton">{buttonText}</button>
            </div>
        </form>
    );
};

export default PostForm;

// userProfile이미지 업로드
export const uploadProfile = async (file) => {
    try {
        // Pre-signed URL 요청
        const presignedResponse = await fetch("http://localhost:3000/auth/uploadProfile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                filename: file.name,
                contentType: file.type,
            }),
        });

        if (!presignedResponse.ok) throw new Error("Pre-signed URL 요청 실패");

        const { presignedUrl, fileUrl } = await presignedResponse.json();

        // S3에 파일 업로드
        const uploadResponse = await fetch(presignedUrl, {
            method: "PUT",
            headers: {
                "Content-Type": file.type,
            },
            body: file,
        });

        if (!uploadResponse.ok) throw new Error("이미지 업로드 실패");

        return fileUrl; // 업로드된 파일의 URL 반환
    } catch (error) {
        console.error("프로필 이미지 업로드 오류:", error);
        alert("프로필 이미지 업로드에 실패했습니다.");
        return null; // 오류 시 null 반환
    }
};

// userProfile이미지 삭제
export const deleteProfile = async (imageUrl) => {
    try {
        const encodedUrl = encodeURIComponent(imageUrl); // URL 인코딩
        const response = await fetch(`http://localhost:3000/auth/deleteProfile?imageUrl=${encodedUrl}`, {
            method: "DELETE",
        });

        if (!response.ok) throw new Error("프로필 이미지 삭제 실패");

        return "";
    } catch (error) {
        console.error("프로필 이미지 삭제 오류:", error);
        alert("프로필 이미지 삭제에 실패했습니다.");
        return null;
    }
};

// posts이미지 업로드
export const uploadPostImage = async (file) => {
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

        // Pre-signed URL로 이미지 업로드
        const uploadResponse = await fetch(presignedUrl, {
            method: "PUT",
            body: file,
            headers: {
                "Content-Type": file.type,
            },
        });

        if (!uploadResponse.ok) throw new Error("이미지 업로드 실패");

        return fileUrl; // 업로드된 파일의 URL
    } catch (error) {
        console.error("이미지 업로드 오류:", error);
        alert("이미지 업로드에 실패했습니다.");
        return null;
    }
};
// posts이미지 삭제
export const deletePostImage = async (imageUrl) => {
    try {
        // 서버에 삭제 요청 보내기
        const response = await fetch(`http://localhost:3000/posts/postImage/${encodeURIComponent(imageUrl)}`, {
            method: "DELETE",
            credentials: "include", // 인증 쿠키 포함
        });

        if (!response.ok) {
            throw new Error("이미지 삭제 실패");
        }
        // 요청 성공 시 url 업데이트
        return "";

    } catch (error) {
        console.error("이미지 삭제 오류:", error.message);
        return null;
    }
};
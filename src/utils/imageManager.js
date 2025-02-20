// userProfile이미지 업로드
export const uploadProfile = async (file) => {
    try {
        // Pre-signed URL 요청
        const presignedResponse = await fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/auth/uploadProfile`, {
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
        // URL 파싱: "profiles/" 이후의 경로만 추출
        const key = new URL(imageUrl).pathname.split("profiles/").pop();

        const response = await fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/users/profileImage/${key}`, {
            method: "DELETE",
            credentials: "include", // 인증 쿠키 포함
        });

        if (!response.ok) throw new Error("프로필 이미지 삭제 실패");

        console.log("이미지 삭제함");
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
        const presignedUrlResponse = await fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/posts/uploadPostImage`, {
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
        // URL 파싱: "postImages/" 이후의 경로만 추출
        const key = new URL(imageUrl).pathname.split("postImages/").pop();

        const response = await fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/posts/postImage/${key}`, {
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
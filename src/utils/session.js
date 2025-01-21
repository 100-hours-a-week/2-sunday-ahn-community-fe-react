export const fetchUserSession = async () => {
    try {
        // // 세션 스토리지에서 사용자 정보 확인
        // const cachedUser = sessionStorage.getItem("user");
        // if (cachedUser) {
        //     return JSON.parse(cachedUser);
        // }

        // 세션 스토리지에 정보가 없으면 서버에 요청
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_BACKEND_PORT}/api/auth/userInfo`, {
            method: "GET",
            credentials: "include", // 세션 쿠키 포함
        });

        if (response.status === 400) {
            throw new Error("로그인이 필요합니다.");
        }

        if (!response.ok) {
            throw new Error("세션 정보를 가져오는 데 실패했습니다.");
        }

        const data = await response.json();

        // 세션 스토리지에 사용자 정보 저장
        sessionStorage.setItem("user", JSON.stringify(data.data));
        return data.data; // 사용자 정보 반환
    } catch (error) {
        console.error("세션 정보 로드 오류:", error.message);
        throw error;
    }
};
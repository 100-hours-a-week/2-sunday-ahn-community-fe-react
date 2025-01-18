export const validateEmail = (email) => {
    if (!email.trim() || email == "") return "*이메일을 입력해주세요.";
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) return "*올바른 이메일 주소 형식을 입력해주세요.";
    return ""; // 유효
};

export const validatePassword = (password, confirmPassword = "") => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/;
    if (!password.trim()) return "*비밀번호를 입력해주세요.";
    if (!passwordPattern.test(password)) {
        return "*비밀번호는 8자 이상, 대문자, 소문자, 숫자, 특수문자를 각각 포함해야 합니다.";
    }
    return ""; // 유효
};

export const validateNickname = (nickname) => {
    if (!nickname.trim()) return "*닉네임을 입력해주세요.";
    if (nickname.length > 10) return "*닉네임은 최대 10자 까지 작성 가능합니다.";
    if (/\s/.test(nickname)) return "*띄어쓰기를 없애주세요.";
    return ""; // 유효
};

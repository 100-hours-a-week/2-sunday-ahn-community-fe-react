// 날짜 포맷
export const formatDateToCustomFormat = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// 숫자 포맷 함수
export const formatNumber = (number) => {
    if (number >= 100000) {
        return `${Math.floor(number / 1000)}k`;
    } else if (number >= 10000) {
        return `${(number / 1000).toFixed(1)}k`;
    } else if (number >= 1000) {
        return `${(number / 1000).toFixed(1)}k`;
    }
    return number;
};
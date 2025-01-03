import "./css/TitleHeader.css";
import { useNavigate } from "react-router-dom";

const TitleHeader = () => {
    const navigate = useNavigate(); // 네비게이트 훅 사용

    const handleHeaderClick = () => {
        navigate("/posts"); // /posts로 이동
    };

    return (
        <div>
            <div className="header" onClick={handleHeaderClick}>
                <h1>
                    SUNDAY의 <br /> 아무 말 대잔치
                </h1>
            </div>
        </div>
    );
};

export default TitleHeader;

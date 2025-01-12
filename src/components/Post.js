import "./css/Post.css";
import sampleImage from "../assets/user.png";
import {formatDateToCustomFormat} from "../utils/formatDate";


const Post = ({ post, onClick }) => {
    const { title, likes, commentsCnt, views, date, author } = post;

    return(
        <div className="post" onClick={onClick}>
            <div class="title">
                <div class="titleTxt">
                    <p><strong>{title}</strong></p>
                </div>
                <div class="postElement">
                    <div class="ele1">
                        <p id="likes">좋아요 {likes || 0}</p>
                        <p id="comments">댓글 {commentsCnt || 0}</p>
                        <p id="views">조회수 {views || 0}</p>
                    </div>
                    <p id="date">{formatDateToCustomFormat(date)}</p>
                </div>
            </div>
            <div class="user">
                <div class="profileContainer">
                    <div class="box" id="author" >
                        <img class="profile" src={author.profileImg || sampleImage} alt={`${author.nickname}의 프로필`}/>
                    </div>
                </div>
                <div class="nickname">
                    <p id="userTxt">{author.nickname}</p>
                </div>
            </div>
        </div>
    );
};

export default Post;
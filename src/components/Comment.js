import {formatDateToCustomFormat} from "../utils/formatDate";
import sampleProfile from "../assets/user.png";

const Comment = ({ comment, userId, onDelete }) => {
    const { author, date, content } = comment;

    return (
        <div className="comment">
            <div>
                <div className="commentAuthorInfoHeader">
                    <div className="profileSection">
                        <div className="normalProfile">
                            <div className="box" style={{ background: "#BDBDBD" }}>
                                <img
                                    className="authorProfile"
                                    src={author.profileImg || sampleProfile}
                                    alt={`${author.nickname}의 프로필`}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="userInfo2">
                        <div className="author">
                            <p>{author.nickname}</p>
                            <p>{formatDateToCustomFormat(date)}</p>
                        </div>
                    </div>

                    {/* 작성자만 수정/삭제 버튼 표시 */}
                    {author.userId === userId && (
                        <div className="edit_postDetail">
                            <button className="bnt" id="editCommentBtn">
                                <div className="postEditBtn">
                                    <p>
                                        <strong>수정</strong>
                                    </p>
                                </div>
                            </button>
                            <button
                                className="bnt"
                                id="deleteCommentBtn"
                                onClick={() => onDelete(comment.commentId)}
                            >
                                <div className="postEditBtn">
                                    <p>
                                        <strong>삭제</strong>
                                    </p>
                                </div>
                            </button>
                        </div>
                    )}
                </div>

                <div className="commentContents">
                    <p>{content}</p>
                </div>
            </div>
        </div>
    );
};

export default Comment;

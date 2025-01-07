
const Comment = ({ onDelete }) => {
    // 샘플 데이터
    const comment = {
        author: {
            profileImg: `../assets/sample.png`, // 임시 프로필 이미지
            nickname: "작성자닉네임도열글자",
        },
        date: "2024-01-01 12:34:56", // 작성 날짜
        content: "샘플 댓글 내용입니다. 300자까지 쓸 수 있으니까 많이 한번 써봐야겠는데 얼마나 써야하는지 모르겠네 하지만 일단 써볼게요 몇자 나올지는 모르겠는디",
    };

    return (
        <div className="comment">
            <div>
                <div className="commentAuthorInfoHeader">
                    <div className="profileSection">
                        <div className="normalProfile">
                            <div className="box" style={{ background: "#BDBDBD" }}>
                                <img
                                    className="authorProfile"
                                    src={comment.author.profileImg}
                                    alt="작성자 프로필"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="userInfo2">
                        <div className="author">
                            <p>{comment.author.nickname}</p>
                            <p>{comment.date}</p>
                        </div>
                    </div>

                    <div className="edit_postDetail">
                        <button className="bnt" id="editPostBtn">
                            <div className="postEditBtn">
                                <p>
                                    <strong>수정</strong>
                                </p>
                            </div>
                        </button>
                        <button className="bnt" id="deletePostBtn"onClick={onDelete}>
                            <div className="postEditBtn">
                                <p>
                                    <strong>삭제</strong>
                                </p>
                            </div>
                        </button>
                    </div>
                </div>

                <div className="commentContents">
                    <p>{comment.content}</p>
                </div>
            </div>
            
            
        </div>
    );
};

export default Comment;
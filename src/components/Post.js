import "./css/Post.css";


const Post = () => {

    return(
        <div className="post">
            <div class="title">
                <div class="titleTxt">
                    {/* <p><strong>${post.title}</strong></p> */}
                    <p><strong>SampleTitle</strong></p>
                </div>
                <div class="postElement">
                    <div class="ele1">
                        {/* <p id="likes">좋아요 ${post.likes || 0}</p>
                        <p id="comments">댓글 ${post.commentsCnt || 0}</p>
                        <p id="views">조회수 ${post.views || 0}</p> */}
                        <p id="likes">좋아요 0</p>
                        <p id="comments">댓글 0</p>
                        <p id="views">조회수 0</p>
                    </div>
                    {/* <p id="date">${formatDateToCustomFormat(post.date)}</p> */}
                    <p id="date">0000-00-00</p>
                </div>
            </div>
            <div class="user">
                <div class="profileContainer">
                    <div class="box" id="author" >
                        <img class="profile" src="../assets/sample.png" alt="sample의 프로필"/>
                    </div>
                </div>
                <div class="nickname">
                    {/* <p id="userTxt">${post.author.nickname}</p> */}
                    <p id="userTxt">tester</p>
                </div>
            </div>
        </div>
    );
};

export default Post;
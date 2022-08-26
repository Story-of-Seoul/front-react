import React, {useEffect, useState} from 'react';

import '../styles/Mypage.scss'
import authAPI from "../axios/authAxios";
import boardAPI from "../axios/boardAxios";

const Mypage = () => {

    const [id, setId] = useState();
    const [email, setEmail] = useState();
    const [nickname, setNickname] = useState();
    const [region, setRegion] = useState();

    const [token, setToken] = useState();

    const [comments, setComments] = useState([]);
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        const storedToken = JSON.parse(window.localStorage.getItem('token'));
        if (storedToken) {
            setToken(storedToken);
            authAPI.requestAuth(storedToken, (data) => {
                setId(data['id']);
                setEmail(data['email']);
                setNickname(data['nickname']);
                setRegion(data['region']);
            });

            boardAPI.findBoardById(id, (data) => {
                console.log(data)
                setBoards(data['results']);
            })

            boardAPI.requestCommentById(id, (data) => {
                console.log(data)
                setComments(data['results']);
            })

        }


    }, []);

    const onClick = (id) => {

        boardAPI.deleteComments(id, token,(data) => {
            console.log(data);
            window.location.reload();
        });
    };

    return (
        <div className='Mypage'>
            <div id='mypage_title'>마이페이지</div>
            <div className='MypageContentsWrapper'>
                <div className='MyInfoWrapper'>
                    <div id='my_info_title'>내정보</div>
                    <div className='MyInfoContents'>
                        <div className='NickNameWrapper'>
                            <div id='nickname_title'>닉네임</div>
                            <div id='nickname_text'>{nickname ? nickname : ''}</div>
                        </div>
                        <div className='EmailWrapper'>
                            <div id='Email_title'>이메일</div>
                            <div id='Email_text'>{email ? email : ''}</div>
                        </div>
                        <div className='CountyWrapper'>
                            <div id='county_title'>거주지역구</div>
                            <div id='county_text'>{region ? region : ''}</div>
                        </div>
                    </div>
                </div>
                <div className='PostAndComments'>
                    <div className='PostWrapper'>
                        <div id='post_title'>내가 쓴 글</div>
                        <div className='PostContentsWrapper'>
                            {boards ? boards.map((item, index) => {
                                return (
                                    <div className='dummy'>
                                        <div className='TextWrapper'>
                                            {item.title}
                                        </div>
                                    </div>
                                )

                            }) : 'dksehlsi'}
                        </div>
                    </div>
                    <div className='CommentWrapper'>
                        <div id='comment_title'>내가 쓴 댓글</div>
                        <div className='CommentContentsWrapper'>
                            {comments ? comments.map((item, index) => {
                                return (
                                    <div className='dummy'>
                                        <div className='TextWrapper'>
                                            {item.text}
                                        </div>
                                    </div>
                            );

                            }) : 'dssd.'}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
        ;
};

export default Mypage;
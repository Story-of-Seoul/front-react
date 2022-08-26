import React from 'react';

import '../styles/Mypage.scss'
const Mypage = () => {
    return (
        <div className='Mypage'>
            <div id='mypage_title'>마이페이지</div>
            <div className='MypageContentsWrapper'>
                <div className='MyInfoWrapper'>
                    <div id='my_info_title'>내정보</div>
                    <div className='MyInfoContents'>
                        <div className='NickNameWrapper'>
                            <div id='nickname_title'>닉네임</div>
                            <div id='nickname_text'>마포구 병아리</div>
                        </div>
                        <div className='EmailWrapper'>
                            <div id='Email_title'>이메일</div>
                            <div id='Email_text'>구름용@gmail.com</div>
                        </div>
                        <div className='CountyWrapper'>
                            <div id='county_title'>거주지역구</div>
                            <div id='county_text'>나 강서구 토박이</div>
                        </div>
                    </div>
                </div>
                <div className='PostAndComments'>
                    <div className='PostWrapper'>
                        <div id='post_title'>내가 쓴 글</div>
                        <div className='PostContentsWrapper'>
                            <div className='dummy'>
                                <div className='TextWrapper'>
                                    제목
                                </div>
                                <div className='ButtonWrapper'>
                                    <button>수정</button>
                                    <button>삭제</button>
                                </div>
                            </div>
                            <div className='dummy'>
                                <div className='TextWrapper'>
                                    제목
                                </div>
                                <div className='ButtonWrapper'>
                                    <button>수정</button>
                                    <button>삭제</button>
                                </div>
                            </div>
                            <div className='dummy'>
                                <div className='TextWrapper'>
                                    제목
                                </div>
                                <div className='ButtonWrapper'>
                                    <button>수정</button>
                                    <button>삭제</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='CommentWrapper'>
                        <div id='comment_title'>내가 쓴 댓글</div>
                        <div className='CommentContentsWrapper'>
                            <div className='dummy'>
                                <div className='TextWrapper'>
                                    제목
                                </div>
                                <div className='ButtonWrapper'>
                                    <button>수정</button>
                                    <button>삭제</button>
                                </div>
                            </div>
                            <div className='dummy'>
                                <div className='TextWrapper'>
                                    제목
                                </div>
                                <div className='ButtonWrapper'>
                                    <button>수정</button>
                                    <button>삭제</button>
                                </div>
                            </div>
                            <div className='dummy'>
                                <div className='TextWrapper'>
                                    제목
                                </div>
                                <div className='ButtonWrapper'>
                                    <button>수정</button>
                                    <button>삭제</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mypage;
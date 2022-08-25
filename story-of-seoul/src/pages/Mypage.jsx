import React from 'react';
import '../styles/Mypage.scss'
const Mypage = () => {
    return (
        <div className='Mypage'>
            <div className='MypageWrapper'>
                <div id='title'>
                    마이페이지
                </div>
                <div className='Contents'>
                    <div className='Info'>
                        <div id='title'>
                            내정보
                        </div>
                        <div>
                            <dl>
                            <dt>닉네임</dt>
                            <dd>마포구 병아리</dd>
                            <dt>이메일</dt>
                            <dd>th_gus4734@g.hongik.ac.kr</dd>
                            <dt>거주지역구</dt>
                            <dd>마포구</dd>
                            </dl>
                        </div>
                        
                    </div>

                    <div className='WriteList'>
                        <div id='title'>
                            내가 쓴 글
                        </div>
                        <div>
                            <ul>
                                <li>
                                <div id='title'>
                                    제목입니다
                                </div>
                                <div id='contents'>
                                    내용입니다
                                </div>
                                <button>수정</button>
                                <button>삭제</button>
                                </li>
                            </ul>
                        </div>
                        
                    </div>

                    <div className='CommentList'>
                        <div id='title'>
                            내가 쓴 댓글
                        </div>
                        <ul>
                            <li>
                                <div id='title'>
                                    제목입니다
                                </div>
                                <div id='contents'>
                                    내용입니다
                                </div>
                                <button>수정</button>
                                <button>삭제</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mypage;
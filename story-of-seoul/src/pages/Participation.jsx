import React from 'react';
import '../styles/Participation.scss'
const Participation = () => {
    return (
        <div className='Participation'>
            <div className='ParticipationWrapper'>
                <div id='title'>
                    시민참여게시판
                </div>
                <div className='Contents'>
                    <div className='SearchButtonWrapper'>
                        <input type="text" placeholder='검색어를 입력하세요'/>
                        <button>검색</button>
                    </div>

                    <div className='ListWrapper'>
                    <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th className='No'>번호</th>
                                    <th className='Title'>제목</th>
                                    <th className='Date'>작성일</th>
                                    <th className='Like'>추천수</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className='No1'>
                                <td>1</td>
                                <td>게시물제목</td>
                                <td>2022.08.20</td>
                                <td>123</td>
                                </tr>
                                
                                <tr className='No2'>
                                <td>2</td><td>게시글제목입니다긴것도테스트하자얼마나길게해야돼지아아아아아아아아아아아ㅏㅇ자고싶어요</td><td>2022.08.24</td><td>123123</td>
                                </tr>
                                
                                <tr>
                                <td>3</td><td></td><td></td><td></td>
                                </tr>
                                <tr>
                                <td>4</td><td></td><td></td><td></td>
                                </tr>
                                <tr>
                                <td>5</td><td></td><td></td><td></td>
                                </tr>
                                <tr>
                                <td>6</td><td></td><td></td><td></td>
                                </tr>
                                <tr>
                                <td>7</td><td></td><td></td><td></td>
                                </tr>
                                <tr>
                                <td>8</td><td></td><td></td><td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='WriteButtonWrapper'>
                        <button>글작성</button>
                    </div>
                    <div className='ButtonWrapper'>
                        <div className='PreviousButtonWrapper'>
                            <button>이전</button>
                        </div>
                    
                        <div className='NextButtonWrapper'>
                            <button>다음</button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Participation;
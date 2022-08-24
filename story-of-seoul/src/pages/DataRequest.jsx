import React from 'react';
import '../styles/DataRequest.scss';
const DataRequest = () => {
    return (
        <div className='DataRequest'>
            <div className='DataRequestWrapper'>
                <div id = 'title'>
                    데이터 요청
                </div>
                <div className='Contents'>
                    <div className='SearchButtonWrapper'>
                        <input type="text" placeholder='검색어를 입력하세요'/>
                        <button>검색</button>
                    </div>

                    <div className='TableWrapper'>
                        <table>
                            <thead>
                                <tr>
                                    <th className='No'>번호</th>
                                    <th className='Title'>제목</th>
                                    <th className='Date'>작성일</th>
                                    <th className='State'>현황</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>1</td><td>데이터 요청글 제목</td><td>2022.08.20</td><td>처리중</td>
                                </tr>
                                <tr>
                                <td>2</td><td>데이터 요청글 제목2</td><td>2022.08.24</td><td>완료</td>
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

                        <button>글 작성</button>                      
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

export default DataRequest;
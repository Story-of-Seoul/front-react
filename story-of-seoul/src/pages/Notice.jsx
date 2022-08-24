import React from 'react';
import '../styles/Notice.scss';
const Notice = () => {
    return (
        <div className='Notice'>
            <div className='NoticeWrapper'>
                <div id='title'>
                    공지사항
                </div>

                <div className='TableWrapper'>
                    <table>
                        <thead>
                            <tr>
                                <th className='No'>번호</th>
                                <th className='Title'>제목</th>
                                <th className='Date'>작성일</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>1</td><td>공지사항 제목</td><td>2022.08.20</td>
                             </tr>
                             <tr>
                             <td>2</td><td>공지사항 제목2</td><td>2022.08.24</td>
                              </tr>
                              <tr>
                              <td>3</td><td></td><td></td>
                              </tr>
                              <tr>
                              <td>4</td><td></td><td></td>
                              </tr>
                              <tr>
                              <td>5</td><td></td><td></td>
                              </tr>
                              <tr>
                              <td>6</td><td></td><td></td>
                              </tr>
                               <tr>
                              <td>7</td><td></td><td></td>
                              </tr>
                              <tr>
                              <td>8</td><td></td><td></td>
                              </tr>
                        </tbody>
                    </table>
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
    );
};

export default Notice;
import React, {useEffect, useState} from 'react';
import '../styles/Notice.scss';
import boardAPI from "../axios/boardAxios";

const Notice = () => {

    const [boards, setBoards] = useState([]);


    useEffect(() => {
        boardAPI.requestBoardByType('notice', (data) => {
            setBoards(data['results']);
        });
    }, []);


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
                        {boards ? boards.map((item, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{item.title}</td>
                                    <td>{new String(item.created_at).split('T')[0]}</td>
                                </tr>
                            )
                        }):''};
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
    )
        ;
                        };

                            export default Notice;
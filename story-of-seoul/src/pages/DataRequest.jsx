import React, {useEffect, useState} from 'react';
import '../styles/DataRequest.scss';
import boardAPI from "../axios/boardAxios";
import {Link, useNavigate} from "react-router-dom";

const DataRequest = () => {


    const [boards, setBoards] = useState([]);
    let navigate = useNavigate();
    const [isLogin,setIsLogin] = useState(false);
    const [token,setToken] = useState("");


    useEffect(() => {

        const storedToken = JSON.parse(window.localStorage.getItem('token'));
        if (storedToken != null) {
            setIsLogin(true);
            setToken(storedToken);
        }

        boardAPI.requestBoardByType('dataRequest', (data) => {
            setBoards(data['results']);
        });
    }, []);


    const onClcik = () => {
        if(isLogin){
            navigate('/dataRequestWrite')
        } else {
            alert('로그인을 해야합니다.');
            navigate('/signin');
        }
    }


    return (
        <div className='DataRequest'>
            <div className='DataRequestWrapper'>
                <div id='title'>
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
                            {boards ? boards.map((item, index) => {
                                return (
                                    <tbody>
                                    <tr>
                                        <td>{index+1}</td>
                                        <Link to={`/dataRequest/detail/${item.pk}`}><td>{item.title}</td></Link>
                                        <td>{new String(item.created_at).split('T')[0]}</td>
                                        <td>{item.processing_status}</td>
                                    </tr>
                                    </tbody>
                                )
                            }) : '없음'}
                        </table>

                    </div>
                    <div className='WriteButtonWrapper'>
                        <button onClick={onClcik}>글작성</button>
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
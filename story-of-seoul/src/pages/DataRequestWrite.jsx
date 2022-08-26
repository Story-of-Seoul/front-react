import React, {useEffect, useState} from 'react';
import '../styles/DataRequestWrite.scss';
import boardAPI from "../axios/boardAxios";
import {useNavigate} from "react-router-dom";

const DataRequestWrite = () => {

    const [token, setToken] = useState("");

    let navigate = useNavigate();
    const kinds = ['environment', 'traffic', 'safety', 'disabled'];

    const [requestBoard, setRequestBoard] = useState({
        "title": "",
        "contents": "",
        "request_data_type": "",
        "processing_status": "확인 전",
        "board_type": "dataRequest",
    });
    useEffect(() => {
        const storedToken = JSON.parse(window.localStorage.getItem('token'));
        if (storedToken != null) {
            setToken(storedToken);
        }
    });

    const onClick = () => {
        boardAPI.putBoards(requestBoard, token, (data) => {
            console.log(data);
            navigate('/dataRequest');
        });
    };

    const onChange = (e) => {
        const nextRequestBoard = {
            ...requestBoard,
            [e.target.name]: e.target.value,
        };
        setRequestBoard(nextRequestBoard);
    }

    const onRequestDataChange = (e => {
        const nextRequestBoard = {
            ...requestBoard,
            "request_data_type": e.target.value,
        };
        setRequestBoard(nextRequestBoard);
    })
    return (
        <div className='DataRequestWrite'>
            <div id='data_request_title'>데이터 요청</div>
            <div className='DataRequestContentsWrapper'>
                <div className='TitleWrapper'>
                    <div id='request_title'>제목</div>
                    <input name="title" value={requestBoard['title']} onChange={onChange}/>
                </div>
                <div className='EtcWrapper'>
                    <div id='kinds_title'>종류</div>
                    <select className="SelectKinds" onChange={onRequestDataChange}>
                        <option value="" selected disabled hidden>데이터 종류를 선택해주세요.< /option>
                        {kinds.map((kind, index) => (
                            <option key={index} name="request_data_type" value={kind}>{kind}</option>
                        ))}
                    </select>
                    <div id='author_title'>작성자</div>
                    <input name="author_text"/>
                </div>
                <div className='RequestContentsWrapper'>
                    <div id='content_title'>내용</div>
                    <textarea value={requestBoard['contents']} name="contents" onChange={onChange} rows={23}
                              id='request_content'/>
                </div>
            </div>
            <button onClick={onClick}>작성하기</button>
        </div>
    );
};

export default DataRequestWrite;
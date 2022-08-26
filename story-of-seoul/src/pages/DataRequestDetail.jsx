import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";

import boardAPI from "../axios/boardAxios";
import '../styles/DataRequestDetail.scss';

const DataRequestDetail = () => {
    const {id} = useParams();
    const kinds = ['environment', 'traffic', 'safety', 'disabled'];

    const [title, setTitle] = useState("");
    const [requestDataType, setRequestDataType] = useState("");
    const [answer, setAnswer] = useState("");
    const [contents, setContents] = useState("");
    const [nickname, setNickname] = useState("")

    const [boards, setBoards] = useState([]);
    useEffect(() => {
        boardAPI.requestBoardById(id, (data) => {
            setTitle(data['title']);
            setRequestDataType(data['request_data_type']);
            setAnswer(data['answer']);
            setContents(data['contents']);
            const profile = data['profile'];
            setNickname(profile['nickname']);
        });
    }, []);

    return (
        <div className='DataRequest'>
            <div className='DataRequestWrapper'>
                <div id='title'>
                    데이터 요청
                </div>
                <div className='DataRequestContentsWrapper'>
                    <div className='TitleWrapper'>
                        <div id='request_title'>제목</div>
                        <input name="title" value={title}/>
                    </div>
                    <div className='EtcWrapper'>
                        <div id='kinds_title'>종류</div>
                        <select className="SelectKinds" onChange={null}>
                            <option value="" selected disabled hidden>{requestDataType}< /option>
                            {kinds.map((kind, index) => (
                                <option key={index} name="request_data_type" value={kinds}>{requestDataType}</option>
                            ))}
                        </select>
                        <div id='author_title'>작성자</div>
                        <input name="author_text" value={nickname}/>
                    </div>
                    <div className='RequestContentsWrapper'>
                        <div id='content_title'>내용</div>
                        <textarea value={contents} name="contents" rows={23}
                                  id='request_content'/>
                    </div>
                </div>
                <div className='DataRequestContentsAnswerWrapper'>
                    <div id='answer_title'>답변</div>
                    <div id="answer_text">{answer}</div>
                </div>
            </div>
        </div>
    );
};


export default DataRequestDetail;


import React, {useEffect, useState} from 'react';
import '../styles/DataRequestWrite.scss';

const DataRequestWrite = () => {

    const [token, setToken] = useState("");

    const kinds = ['environment', 'traffic', 'safety', 'disabled'];

    const [requestBoard, setRequestBoard] = useState({
        "title": "",
        "contents": "",
        "board_type": "dataRequest",
    });
    useEffect(() => {
        const storedToken = JSON.parse(window.localStorage.getItem('token'));
        if (storedToken != null) {
            setToken(storedToken);
        }
    })
    return (
        <div className='DataRequestWrite'>

            <div id='data_request_title'>데이터 요청</div>
            <div className='DataRequestContentsWrapper'>
                <div className='TitleWrapper'>
                    <div id='request_title'>제목</div>
                    <input/>
                </div>
                <div className='EtcWrapper'>
                    <div id='kinds'>종류</div>
                    <select className="SelectKinds" onChange={null}>
                        <option value="" selected disabled hidden>데이터 종류를 선택해주세요.< /option>
                        {kinds.map((kind, index) => (
                            <option key={index} name="kind" value={kind}>{kind}</option>
                        ))}
                    </select>
                </div>
                <div className='RequestContentsWrapper'>
                    <div id='content_title'>내용</div>
                    <textarea id='request_content'/>
                </div>
            </div>
        </div>
    );
};

export default DataRequestWrite;
import React, {useState} from 'react';
import '../styles/BoardWrite.scss';
import {useSelector} from "react-redux";
import boardAPI from "../axios/boardAxios";
import {useNavigate} from "react-router-dom";
import nav from "./Nav";

const BoardWrite = (props) => {

    let navigate = useNavigate();
    const isLogin = useSelector(state => state.auth.isLogin);
    const token = useSelector(state => state.auth.token);
    const [requestBoard, setRequestBoard] = useState({
        "title": "",
        "contents": "",
        "board_type": props.boardType,
    });

    /** 회원가입 request 설정 **/
    const onChange = (e => {
        const nextBoard = {
            ...requestBoard,
            [e.target.name]: e.target.value,
        };
        setRequestBoard(nextBoard);
        console.log(requestBoard);
    })

    /** 게시글 작성 요청 **/
    const onClick = () => {

        if (isLogin) {
            boardAPI.requestPost(token, requestBoard, (data) => {
                console.log(data);
                alert('게시글 작성 완료');
                // 상세 페이지로 이동하게 하자
                navigate('/participation/' + data['pk']);
            });
        } else {
            alert('로그인이 필요합니다.');
            navigate('/signin')
        }



    }

    return (
        <div className='BoardWrite'>
            <hr/>
            <div className='BoardWriteInputWrapper'>
                <input id='title' value={requestBoard['title']} name='title' onChange={onChange}
                       placeholder='게시글 제목을 입력해주세요'/>
                <div className='HorizonalLine'/>
                <textarea id='contents' value={requestBoard['contents']} name='contents' onChange={onChange}
                          placeholder='게시글 내용을 작성해주세요'/>
            </div>
            <button onClick={onClick}>게시글 작성하기</button>
        </div>
    );
};

export default BoardWrite;
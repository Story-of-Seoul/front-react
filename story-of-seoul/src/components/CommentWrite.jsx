import React, {useEffect, useState} from 'react';
import '../styles/CommentWrite.scss';
import boardAPI from "../axios/boardAxios";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const CommentWrite = (props) => {

    const [isLogin,setIsLogin] = useState(false);
    const [token,setToken] = useState("");
    let navigate = useNavigate();

    useEffect(() => {
        const storedToken = JSON.parse(window.localStorage.getItem('token'));
        if (storedToken != null) {
            setIsLogin(true);
            setToken(storedToken);
        }
    }, []);

    const [comment, setComment] = useState({
        "board": props.id,
        "text": "",
    });

    const onclick = () => {
        console.log(token);
        if(isLogin){
            boardAPI.requestComment(token, comment, (data) => {
                console.log(data);
                window.location.reload();
            });
        } else {
            alert('로그인 해야합니다.');
            navigate('/signin');
        }
    }

    const onChange = e => {
        const nextComment = {
            ...comment,
            "text": e.target.value,
        };

        setComment(nextComment);
        console.log(comment);
    };


    return (
        <div className='CommentWrite'>
            <textarea onChange={onChange} placeholder='댓글 입력'/>
            <button onClick={onclick}>입력</button>
        </div>
    );
};

export default CommentWrite;
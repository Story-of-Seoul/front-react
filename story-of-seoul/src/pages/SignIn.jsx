
import React, {useState} from 'react';
import '../styles/SignIn.scss';
import banner from '../images/banner.png';
import authAPI from "../axios/authAxios";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {onSignIn} from "../modules/auth";

const SignIn = () => {

    /**
     * SignIn 관련 state
     *
     */

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [signInRequest, setSignInRequest] = useState({
        username: "",
        password: "",
    });

    const onChange = e => {
        const nextSignInRequest = {
            ...signInRequest,
            [e.target.name]: e.target.value,
        };


        setSignInRequest(nextSignInRequest);
    };

    const onSubmit = e => {
        e.preventDefault();
        console.log(signInRequest);
        authAPI.requestSignIn(signInRequest, (data) => {
            console.log('callback -- onSubmit data = ' + data['token']);
            dispatch(onSignIn(data['token']));
            window.localStorage.setItem('token', JSON.stringify(data['token']));
            navigate('/');
            console.log('local storage: ' + JSON.parse(window.localStorage.getItem('token')));
        });
    };

    const onKeyDown = e => {
        if (e.key === 'Enter') {
            onSubmit(e);
        }
    };





    return (
        <div className='SignIn'>
            <div className='SignInWrapper'>
                <img src={banner} alt="이미지 불러오기 오류"/>
                <div id='title'>
                    로그인
                </div>
                <div className='Contents'>
                    <form onSubmit={onSubmit}>
                        <div className='EmailRequestWrapper'>
                            <input name='username' value={signInRequest['username']} onChange={onChange} type="text" placeholder='아이디를 입력하세요'/>
                        </div>

                        <div className='PasswordRequestWrapper'>
                            <input name='password' value={signInRequest['password']} onChange={onChange} onKeyDown={onKeyDown} type="password" onSubmit={onSubmit} placeholder='비밀번호를 입력하세요'/>
                        </div>
                    </form>

                    <div className='SignUpWrapper'>
                        <button>회원가입</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
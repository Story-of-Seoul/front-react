
import React from 'react';
import '../styles/SignIn.scss';
import banner from '../images/banner.png';

const SignIn = () => {
    return (
        <div className='SignIn'>
            <div className='SignInWrapper'>
                <img src={banner} alt="이미지 불러오기 오류"/>
                <div id ='title'>
                    로그인
                </div>
                <div className='Contents'>
                    <div className='EmailRequestWrapper'>
                        <input type="text" placeholder='이메일을 입력하세요'/>
                    </div>
                    
                    <div className='PasswordRequestWrapper'>
                        <input type="text" placeholder='비밀번호를 입력하세요'/>
                    </div>

                    <div className='SignUpWrapper'>
                        <button>회원가입</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
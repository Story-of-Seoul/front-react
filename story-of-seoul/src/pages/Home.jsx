import React from 'react';
import { useNavigate } from 'react-router-dom';
import Introduction from '../components/Introduction';

import '../styles/Home.scss';



const Home = () => {
    
    let navigate = useNavigate();

    return (
        <div className='Home'>
            {/* todo : 로그인 했을 경우에는 로그아웃 버튼 띄우기 */}
            <div className="SignInOrSignUpWrapper">
                <div className="SignIn" onClick={() => navigate("/signin")}>로그인</div>
                <div>/</div>
                <div className="SignUp" onClick={() => navigate("/signup")}>회원가입</div>
            </div>
            <Introduction/>
        </div>
    );
};

export default Home;
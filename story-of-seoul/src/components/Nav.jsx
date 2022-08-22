import React, { useEffect, useState } from 'react';

import '../styles/Nav.scss';
import banner from '../images/banner.png';
import { useNavigate } from 'react-router-dom';

const Nav = () => {

    const [isLogin, setIsLogin] = useState(true);

    let navigate = useNavigate();
    
    const onClickMyPage = () => {
        isLogin ? navigate("/mypage") : navigate("/signin");
    }

    return (
        <div className="Nav">
            <div className="ImgaeWrapper">
                <img src={banner} alt="이미지 불러오기 오류" onClick={() => navigate("/")}/>
            </div>
            <div className="PageSelectorWrapper">
                <div id="notice" onClick={() => navigate("/notice")}>공지사항</div>
                <div id="analysis" onClick={() => navigate("/dataAnalysis")}>분석페이지</div>
                <div id="citizen-participation" onClick={() => navigate("/participation")}>시민참여게시판</div>
                <div id="data-request" onClick={() => navigate("/dataRequest")}>데이터요청</div>
                <div id="my-page" onClick={() => onClickMyPage()}>마이페이지</div>
            </div>
        </div>
    );
};

export default Nav;
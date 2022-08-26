import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Introduction from '../components/Introduction';
import SearchInsert from '../components/SearchInsert';
import AnalysisContainer from '../containers/AnalysisContainer';
import HotBoardContainer from '../containers/HotBoardContainer';
import NoticeBoardContainer from '../containers/NoticeBoardContainer';
import SearchResultContainer from '../containers/SearchResultContainer';

import '../styles/Home.scss';
import {useDispatch, useSelector} from "react-redux";
import {onLogout, onSignIn} from "../modules/auth";



const Home = () => {

    const [isLogin, setIsLogin] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        const loggedInfo = JSON.parse(window.localStorage.getItem('token'));
        if (loggedInfo != null) {
            dispatch(onSignIn(loggedInfo));
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    });

    
    let navigate = useNavigate();
    const HotAnalysis = "미세먼지 분석 데이터";

    const keywords = [
        '환경', '문화생활', '복지',
        '안전', '교통', '주정차'
    ];

    const onLogoutClick = () => {
        window.localStorage.clear();
        setIsLogin(false);
        dispatch(onLogout());
        window.location.reload();
    }

    return (
        <div className='Home'>
            {/* todo : 로그인 했을 경우에는 로그아웃 버튼 띄우기 */}
            {isLogin === false ? (<div className="SignInOrSignUpWrapper">
                <div className="SignInButton" onClick={() => navigate("/signin")}>로그인</div>
                <div>/</div>
                <div className="SignUpButton" onClick={() => navigate("/signup")}>회원가입</div>
            </div>) : <div className='SignInOrSignUpWrapper' onClick={onLogoutClick}>로그아웃</div>}



            <Introduction/>
            <div className="ContentsTitle">인기 데이터 분석</div>
            <div className="ContentsWrapper">
                <div className="AnalysisWrapper">
                    <div className="Title">{HotAnalysis}</div>
                    <AnalysisContainer/>
                </div>
                <div className="SearchWrapper">
                    
                    <SearchInsert/>
                    <SearchResultContainer/>
                    <div className="KeywordWrapper">
                        {keywords.map(keyword => (
                            <div className='Keyword'>#{keyword}</div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="BoardContentsWrapper">
                <div className="NoticeWrapper">
                    <div id="title">
                        공지사항
                    </div>

                </div>
                <div className="HotBoardWrapper">
                    <div id="title">
                        인기글
                    </div>

                </div>
            </div>
            
        </div>
    );
};

export default Home;
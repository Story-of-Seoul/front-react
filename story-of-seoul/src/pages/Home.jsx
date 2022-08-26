import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Introduction from '../components/Introduction';
import SearchInsert from '../components/SearchInsert';
import AnalysisContainer from '../containers/AnalysisContainer';
import HotBoardContainer from '../containers/HotBoardContainer';
import NoticeBoardContainer from '../containers/NoticeBoardContainer';
import SearchResultContainer from '../containers/SearchResultContainer';

import '../styles/Home.scss';
import {useDispatch, useSelector} from "react-redux";
import {onLogout, onSignIn} from "../modules/auth";
import SocialSafety from "../components/chart/SocialSafety";
import analysisAPI from "../axios/analysisAxios";
import ApexCharts from "apexcharts";
import boardAPI from "../axios/boardAxios";


const Home = () => {

    const [isLogin, setIsLogin] = useState(false);
    const dispatch = useDispatch();

    const [boards, setBoards] = useState([]);


    useEffect(() => {
        boardAPI.requestBoardByType('notice', (data) => {
            setBoards(data['results']);
        });
    }, []);


    useEffect(() => {
        const loggedInfo = JSON.parse(window.localStorage.getItem('token'));
        if (loggedInfo != null) {
            dispatch(onSignIn(loggedInfo));
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    });


    useEffect(() => {
        analysisAPI.requestSafetyData((data) => {
            /** 안전 인식 **/
            const awarenessData = data['awareness'];

            let awarenessDataArray = []
            for (const key in awarenessData) {
                awarenessDataArray.push(awarenessData[key]);
            }

            let socialSafetyChartOptions = {
                series: [{
                    data: awarenessDataArray
                }],
                title: {
                    text: '2020년 사회안전에 대한 인식도',
                    align: 'left',
                    style: {
                        fontSize: '16px',
                        color: '#263238'
                    }
                },
                chart: {
                    width: 1200,
                    height: 600,
                    type: 'bar',
                },
                colors: ['#81c285', '#b84938', '#5522cc', '#aa4f0d',
                    '#b47ee8', '#8cddf3', '#6570c7', '#19d904',
                    '#3a125d', '#513d63', '#f0fcce', '#c4d527'],
                plotOptions: {
                    bar: {
                        columnWidth: '45%',
                        distributed: true,
                    }
                },
                dataLabels: {
                    enabled: false
                },
                legend: {
                    show: false
                },
                xaxis: {
                    categories: [
                        ['전반적인', '사회안전'],
                        ['국가안보'],
                        ['지진 등', '자연재해'],
                        ['건축물', '시설물'],
                        ['교통사고'],
                        ['화재', '산불'],
                        ['먹거리'],
                        ['식량안보'],
                        ['정보보안'],
                        ['신종', '점염병'],
                        ['범죄위험'],
                        ['개인정보', '유출'],
                    ],
                },
                yaxis: {
                    title: {
                        text: '불안, 매우불안 합계'
                    }
                }
            }
            /** 안전 인식도 차트 랜더링 **/
            const socialSafetyChart = new ApexCharts(document.querySelector("#social_safety_chart"), socialSafetyChartOptions);
            socialSafetyChart.render();
        });


    }, []);


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

            {isLogin === false ? (<div className="SignInOrSignUpWrapper">
                <div className="SignInButton" onClick={() => navigate("/signin")}>로그인</div>
                <div>/</div>
                <div className="SignUpButton" onClick={() => navigate("/signup")}>회원가입</div>
            </div>) : <div className='SignInOrSignUpWrapper' onClick={onLogoutClick}>로그아웃</div>}


            <Introduction/>
            <div className="ContentsTitle">인기 데이터 분석</div>
            <div className="ContentsWrapper">
                <div className="AnalysisWrapper">
                    <div id='social_safety_chart'/>
                </div>
                <div className="SearchWrapper">

                    <SearchInsert/>
                    <SearchResultContainer/>
                    <div className="KeywordWrapper">
                        <button>#환경</button>
                        <button>#문화생활</button>
                        <button>#복지</button>
                        <button>#안전</button>
                        <button>#교통</button>
                        <button>#주정차</button>
                    </div>
                </div>
            </div>

            <div className="BoardContentsWrapper">
                <div className="NoticeWrapper">
                    <div id="title">
                        공지사항
                    </div>
                    <div className='TableWrapper'>
                    <table>
                        <thead>
                        <tr>
                            <th className='No'>번호</th>
                            <th className='Title'>제목</th>
                            <th className='Date'>작성일</th>
                        </tr>
                        </thead>
                        <tbody>
                        {boards ? boards.map((item, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{item.title}</td>
                                    <td>{new String(item.created_at).split('T')[0]}</td>
                                </tr>
                            )
                        }):''};
                        </tbody>
                    </table>
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
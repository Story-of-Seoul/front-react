import React, {useEffect, useState} from 'react';
import ApexCharts from "apexcharts";
import '../../styles/SafetyAnalysisDetailPage.scss';
import analysisAPI from "../../axios/analysisAxios";
import SocialSafety from "../../components/chart/SocialSafety";
import Resistance from "../../components/chart/Resistance";
import Shelter from "../../components/chart/Shelter";
import BoardWrite from "../../components/BoardWrite";


const SafetyAnalysisDetailPage = () => {

    const [earthquake, setEarthQuake] = useState();
    const [isBoardWriteClicked, setIsBoardWriteClicked] = useState(false);

    const [news, setNews] = useState([]);
    const [policies, setPolicies] = useState([]);
    useEffect(() => {

        analysisAPI.requestNewsPolicy('safe', (data) => {

            const newsData = data['news'];
            const policyData = data['policy'];
            setNews(newsData);
            setPolicies(policyData);

        });

        analysisAPI.requestSafetyData((data) => {
            /** 지진 횟수 **/
            setEarthQuake(data['earthquake']);
        });

    }, []);

    return (
        <div className='SafetyAnalysisDetailPage'>
            <div id='title'>안전 관련 데이터</div>
            <div className='SafetyWrapper'>
                <div className='AnalysisWrapper'>
                    <div className='AnalysisDataWrapper'>
                        <div className='Analysis'>
                            <div className='TextAnalysisWrapper'>
                                <div className='ContentWrapper'>
                                    <div className='EarthQuake'>
                                        <div id='title'>2020 ~ 2022<br/>서울시 감지 지진</div>
                                        <div id='content'>{earthquake}회</div>
                                    </div>
                                </div>
                            </div>

                            <div className='StickChartWrapper'>
                                <SocialSafety/>
                                <Resistance/>
                                <Shelter/>
                            </div>

                        </div>
                    </div>

                    <div className='Contents'>
                        여기에 분석 내용
                    </div>
                </div>
                <div className='NewsAndPolicyWrapper'>
                    <div className='PolicyWrapper'>
                        <div id='title'>관련정책</div>
                        {policies ? policies.map((item, index) => {
                            return (
                                <div key={index} className='Contents'>
                                    <div id='policy_title'>{item.title}</div>
                                    <div id='policy_content'>{item.content}</div>
                                    <a id='policy_link' href={item.url}>링크</a>
                                </div>
                            )
                        }) : ''}
                    </div>

                    <div className='NewsWrapper'>
                        <div id='title'>관련뉴스</div>
                        {news ? news.map((item, index) => {
                            return (
                                <div key={index} className='Contents'>
                                    <div id='news_title'>{item.title}</div>
                                    <div id='news_content'>{item.content}</div>
                                    <a id='news_link' href={item.url}>링크</a>
                                </div>
                            )
                        }) : ''}
                    </div>
                    {isBoardWriteClicked === false ?
                        <button onClick={() => setIsBoardWriteClicked(true)}>게시글 작성</button> : null}
                </div>

            </div>

            {isBoardWriteClicked === true ? <BoardWrite boardType={'safety'}/> : null}

        </div>
    );
};

export default SafetyAnalysisDetailPage;
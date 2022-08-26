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
                        <div className='AnalyContents'>2020년부터 2022년까지의 서울시에서 감지된 지진 횟수입니다. 서울시도 완전한 지진 안전지대가 아님을 시사합니다.</div>
                        <div className='AnalyContents'>2020년 사회안전에 대한 인식도 통계자료입니다. 12가지 항목 중 '지진 등 자연재해' 항목은 10위를 기록하였습니다. 지진위험에 대한 시민들의 낮은 인식을 확인할 수 있습니다. </div>
                        <div className='AnalyContents'>2022년 7월 기준 서울시 여러 건축물에 대한 내진설계미완료 건물 수 비율입니다. 대부분 종류의 건물들에서 상당히 높은 비율로 내진설계가 미완료 되어있음을 볼 수 있습니다.</div>
                        <div className='AnalyContents'>서울시에 존재하는 지진대피소의 구별 총 수용인원과 구별 거주인원을 비교해보았습니다. 해당 구의 모든 인원이 지진 발생 시 해당 대피소로 이동하는 것은 아니지만 그것을 감안해도 수용인원과 거주인원 사이에 큰 차이가 있음을 확인할 수 있습니다.</div>
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
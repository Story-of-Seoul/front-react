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

    useEffect(() => {

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
                        <div id='contents'></div>
                        <div id='contents'></div>
                    </div>

                    <div className='NewsWrapper'>
                        <div id='title'>관련뉴스</div>
                        <div id='contents'></div>
                        <div id='contents'></div>
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
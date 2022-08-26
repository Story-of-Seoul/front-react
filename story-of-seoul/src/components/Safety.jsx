import React, {useEffect, useState} from 'react';
import ApexCharts from "apexcharts";
import analysisAPI from "../axios/analysisAxios";

const Safety = (props) => {

    const [newsTotal, setNewsTotal] = useState();
    const [policyTotal, setPolicyTotal] = useState();

    useEffect(() => {

        analysisAPI.requestNewsPolicyTotal('safe', (data) => {
            setNewsTotal(data['news']);
            setPolicyTotal(data['policy']);
        })

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
                    width: 420,
                    height: 300,
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
            };

            /** 안전 인식도 차트 랜더링 **/
            const socialSafetyChart = new ApexCharts(document.querySelector("#social_safety_chart"), socialSafetyChartOptions);
            socialSafetyChart.render();
        });
    }, []);
    return (
        <div className='AnalysisContentsWrapper' onClick={() => {
            props.navigate('/dataAnalysis/safety')
        }}>
            <div id='title'>안전관련 데이터</div>
            <div id='social_safety_chart'></div>
            {/*<Safety/>*/}
            <div className='EtcWrapper'>
                <div id='news'>관련 뉴스<span>{newsTotal}</span></div>
                <div id='policy'>관련 정책<span>{policyTotal}</span></div>
            </div>
        </div>
    );
};

export default Safety;
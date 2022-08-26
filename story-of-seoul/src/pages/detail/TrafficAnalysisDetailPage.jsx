import React, {useEffect, useState} from 'react';
import '../../styles/TrafficAnalysisDetailPage.scss';
import ApexCharts from "apexcharts";
import analysisAPI from "../../axios/analysisAxios";
import BoardWrite from "../../components/BoardWrite";

const TrafficAnalysisDetailPage = () => {

    const [news, setNews] = useState([]);
    const [policies, setPolicies] = useState([]);
    const [isBoardWriteClicked, setIsBoardWriteClicked] = useState(false);
    useEffect(() => {

        analysisAPI.requestNewsPolicy('accident', (data) => {

            const newsData = data['news'];
            const policyData = data['policy'];
            setNews(newsData);
            setPolicies(policyData);

        });

        analysisAPI.requestTrafficData((data) => {


            const occurrence = data['occurrence'];
            const trafficAccChartOptions = {
                series: [
                    {
                        name: "스쿨존내어린이사고",
                        data: occurrence['스쿨존내어린이사고']
                    },
                    {
                        name: "어린이보행사고",
                        data: occurrence['어린이보행사고']
                    },
                    {
                        name: "고령운전사고",
                        data: occurrence['고령운전사고']
                    },
                    {
                        name: "고령보행사고",
                        data: occurrence['고령보행사고']
                    },
                ],
                chart: {
                    height: 350,
                    type: 'line',
                    dropShadow: {
                        enabled: true,
                        color: '#000',
                        top: 18,
                        left: 7,
                        blur: 10,
                        opacity: 0.2
                    },
                    toolbar: {
                        show: false
                    }
                },
                colors: ['#545454', '#BBACC1', '#909580', '#FF521B'],
                stroke: {
                    curve: 'smooth'
                },
                title: {
                    text: '2010 - 2021 서울시 교통사고 발생 현황',
                    align: 'left'
                },
                grid: {
                    borderColor: '#e7e7e7',
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },

                xaxis: {
                    categories: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
                    title: {
                        text: '연도'
                    }
                },
                yaxis: {
                    title: {
                        text: '발생건수'
                    },
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'right',
                    floating: true,
                    offsetY: -10,
                    offsetX: -5
                }
            };
            const trafficAccChart = new ApexCharts(document.querySelector("#traffic_acc_chart"), trafficAccChartOptions);
            trafficAccChart.render();


            const changeRate = data['ChangeRate'];
            const trafficAccRateChartOptions = {
                series: [
                    {
                        name: "스쿨존내어린이사고",
                        data: changeRate['스쿨존내어린이사고']
                    },
                    {
                        name: "어린이보행사고",
                        data: changeRate['어린이보행사고']
                    },
                    {
                        name: "고령운전사고",
                        data: changeRate['고령운전사고']
                    },
                    {
                        name: "고령보행사고",
                        data: changeRate['고령보행사고']
                    },
                ],
                chart: {
                    height: 350,
                    type: 'line',
                    dropShadow: {
                        enabled: true,
                        color: '#000',
                        top: 18,
                        left: 7,
                        blur: 10,
                        opacity: 0.2
                    },
                    toolbar: {
                        show: false
                    }
                },
                colors: ['#545454', '#BBACC1', '#909580', '#FF521B'],
                stroke: {
                    curve: 'smooth'
                },
                title: {
                    text: '2010 - 2021 서울시 교통사고 대상 비율 증가 현황',
                    align: 'left'
                },
                grid: {
                    borderColor: '#e7e7e7',
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },

                xaxis: {
                    categories: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
                    title: {
                        text: '연도'
                    }
                },
                yaxis: {
                    title: {
                        text: '발생비율'
                    },
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'right',
                    floating: true,
                    offsetY: -10,
                    offsetX: -5
                }
            };
            const trafficAccRateChart = new ApexCharts(document.querySelector("#traffic_acc_rate_chart"), trafficAccRateChartOptions);
            trafficAccRateChart.render();

            const cause = data['cause'];

            const speedingResult = cause['과속'].reduce(function add(sum, curValue) {
                return sum + curValue;
            }, 0);

            const centerResult = cause['중앙선침범'].reduce(function add(sum, curValue) {
                return sum + curValue;
            }, 0);

            const sigResult = cause['신호위반'].reduce(function add(sum, curValue) {
                return sum + curValue;
            }, 0);

            const distanceResult = cause['안전거리미확보'].reduce(function add(sum, curValue) {
                return sum + curValue;
            }, 0);

            const vioResult = cause['난폭운전'].reduce(function add(sum, curValue) {
                return sum + curValue;
            }, 0);

            const pedResult = cause['보행자보호의무위반'].reduce(function add(sum, curValue) {
                return sum + curValue;
            }, 0);

            const speedingAvr = speedingResult / 12;
            const centerAvr = centerResult / 12;
            const sigAvr = sigResult / 12;
            const distanceAvr = distanceResult / 12;
            const vioAvr = vioResult / 12;
            const pedAvr = pedResult / 12;

            const causeChartOptions = {
                series: [speedingAvr, centerAvr, sigAvr, distanceAvr, vioAvr, pedAvr],
                chart: {
                    width: 380,
                    type: 'pie',
                },
                title: {
                    text: '2010 - 2021 서울시 교통사고 원인 구성 비율',
                    align: 'left'
                },
                labels: ['과속', '증잉선침범', '신호위반', '안전거리미확보', '난폭운전', '보행자보호의무위반'],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            };

            const causeAccChart = new ApexCharts(document.querySelector("#traffic_acc_cause_chart"), causeChartOptions);
            causeAccChart.render();
        });


    }, []);

    return (
        <div className='TrafficAnalysisDetailPage'>
            <div id='title'>교통 관련 데이터</div>
            <div className='TrafficWrapper'>
                <div className='AnalysisWrapper'>
                    <div className='Analysis'>
                        <div className='LineChartWrapper'>
                            <div id='traffic_acc_chart'></div>
                            <div id='traffic_acc_rate_chart'></div>
                        </div>
                        <div className='BubbleChartWrapper'>
                            <div id='traffic_acc_cause_chart'></div>
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
            {isBoardWriteClicked === true ? <BoardWrite boardType={'traffic'}/> : null}
        </div>
    );
};

export default TrafficAnalysisDetailPage;
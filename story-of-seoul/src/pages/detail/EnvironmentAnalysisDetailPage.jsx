import React, {useEffect, useState} from 'react';
import ApexCharts from "apexcharts";
import '../../styles/EnvironmentAnalysisDetailPage.scss';
import analysisAPI from "../../axios/analysisAxios";
import BoardWrite from "../../components/BoardWrite";

const EnvironmentAnalysisDetailPage = () => {

    const [isBoardWriteClicked, setIsBoardWriteClicked] = useState(false);

    const [news, setNews] = useState([]);
    const [policies, setPolicies] = useState([]);

    const seoulRegion = [
        '종로구', '중구', '용산구', '성동구', '광진구', '동대문구', '중랑구',
        '성북구', '강북구', '도봉구', '노원구', '은평구', '서대문구', '마포구',
        '양천구', '강서구', '구로구', '금천구', '영등포구', '동작구', '관악구',
        '서초구', '강남구', '송파구', '강동구'
    ];

    useEffect(() => {

        analysisAPI.requestNewsPolicy('environment', (data) => {

            const newsData = data['news'];
            const policyData = data['policy'];
            setNews(newsData);
            setPolicies(policyData);

        });


        analysisAPI.requestEnvironmentData((data) => {

            const dust = data['Dust'];
            const fineDust2009_2021 = dust['2009/2021미세먼지'];

            const regions = Object.keys(fineDust2009_2021);

            let fineDust2009 = []
            let fineDust2021 = []
            for (let region of regions) {
                fineDust2009.push(fineDust2009_2021[region][0]);
                fineDust2021.push(fineDust2009_2021[region][1]);
            }

            const fineDustChartOptions = {
                series: [
                    {
                        name: "2009년 미세먼지",
                        data: fineDust2009
                    },
                    {
                        name: "2021년 미세먼지",
                        data: fineDust2021
                    }
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
                colors: ['#77B6EA', '#545454'],
                dataLabels: {
                    enabled: true,
                },
                stroke: {
                    curve: 'smooth'
                },
                title: {
                    text: '2009년/2021년 구별 미세먼지 현황 비교',
                    align: 'left'
                },
                grid: {
                    borderColor: '#e7e7e7',
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                markers: {
                    size: 1
                },
                xaxis: {
                    categories: seoulRegion,
                    title: {
                        text: '지역구'
                    }
                },
                yaxis: {
                    title: {
                        text: '㎍/㎥'
                    },
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'right',
                    floating: true,
                    offsetY: -25,
                    offsetX: -5
                }
            };

            const fineDustChart = new ApexCharts(document.querySelector("#fine_dust_line_chart"), fineDustChartOptions);
            fineDustChart.render();

            const ultraFineDust2014_2021 = dust['2014/2021초미세먼지'];

            let ultraFineDust2014 = []
            let ultraFineDust2021 = []
            for (let region of regions) {
                ultraFineDust2014.push(ultraFineDust2014_2021[region][0]);
                ultraFineDust2021.push(ultraFineDust2014_2021[region][1]);
            }

            const ultraFineDustChartOptions = {
                series: [
                    {
                        name: "2014년 초미세먼지",
                        data: ultraFineDust2014
                    },
                    {
                        name: "2021년 미세먼지",
                        data: ultraFineDust2021
                    }
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
                colors: ['#77B6EA', '#545454'],
                dataLabels: {
                    enabled: true,
                },
                stroke: {
                    curve: 'smooth'
                },
                title: {
                    text: '2014년/2021년 구별 초미세먼지 현황 비교',
                    align: 'left'
                },
                grid: {
                    borderColor: '#e7e7e7',
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                markers: {
                    size: 1
                },
                xaxis: {
                    categories: seoulRegion,
                    title: {
                        text: '지역구'
                    }
                },
                yaxis: {
                    title: {
                        text: '㎍/㎥'
                    },
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'right',
                    floating: true,
                    offsetY: -25,
                    offsetX: -5
                }
            };
            const ultraFineDustChart = new ApexCharts(document.querySelector("#ultra_fine_dust_line_chart"), ultraFineDustChartOptions);
            ultraFineDustChart.render();

            const fineDust = dust['미세먼지'];
            const ultraFineDust = dust['초미세먼지']

            const fineYear = fineDust['Year'];
            const ultraYear = ultraFineDust['Year'];

            let findAndUltraFineDustChartOptions = {
                series: [
                    {
                        name: "미세먼지",
                        data: fineYear
                    },
                    {
                        name: "초미세먼지",
                        data: ultraYear
                    }
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
                colors: ['#77B6EA', '#545454'],
                dataLabels: {
                    enabled: true,
                },
                stroke: {
                    curve: 'smooth'
                },
                title: {
                    text: '2009년 ~ 2021년 미세먼지, 초미세먼지 현황',
                    align: 'left'
                },
                grid: {
                    borderColor: '#e7e7e7',
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                markers: {
                    size: 1
                },
                xaxis: {
                    categories: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', ' 2021'],
                    title: {
                        text: '연도'
                    }
                },
                yaxis: {
                    title: {
                        text: '㎍/㎥'
                    },
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'right',
                    floating: true,
                    offsetY: -25,
                    offsetX: -5
                }
            };

            const fineAndUltraFineDustChart = new ApexCharts(document.querySelector("#find_and_ultra_dust_line_chart"), findAndUltraFineDustChartOptions);
            fineAndUltraFineDustChart.render();

            const fineMonth = fineDust['Month'];

            const fineDustMonthChartOptions = {
                series: [
                    {
                        name: '미세먼지',
                        data: fineMonth
                    },
                ],
                title: {
                    text: '2009 ~ 2021년 월별 미세먼지 평균',
                    align: 'left'
                },
                chart: {
                    type: 'bar',
                    height: 350
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                },
                yaxis: {
                    title: {
                        text: '㎍/㎥'
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return '㎍/㎥';
                        }
                    }
                }
            };
            const fineDustMonthChart = new ApexCharts(document.querySelector("#find_dust_month_stick_chart"), fineDustMonthChartOptions);
            fineDustMonthChart.render();

            const ultraMonth = ultraFineDust['Month'];
            const ultraFineDustMonthCharOptions = {
                series: [
                    {
                        name: '초미세먼지',
                        data: ultraMonth
                    },
                ],
                title: {
                    text: '2009 ~ 2021년 월별 초미세먼지 평균',
                    align: 'left'
                },
                chart: {
                    type: 'bar',
                    height: 350
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                },
                yaxis: {
                    title: {
                        text: '㎍/㎥'
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return '㎍/㎥';
                        }
                    }
                }
            };

            const ultraFineDustMonth = new ApexCharts(document.querySelector("#ultra_fine_dust_month_stick_chart"), ultraFineDustMonthCharOptions);
            ultraFineDustMonth.render();

            const temperature = data['Temperature'];
            const tmp2009 = temperature['2009'];
            const tmp2013 = temperature['2013'];
            const tmp2017 = temperature['2017'];
            const tmp2021 = temperature['2021'];

            const temp2009_2021ChartOptions = {
                series: [
                    {
                        name: '2009년 온도',
                        data: tmp2009
                    },
                    {
                        name: '2013년 온도',
                        data: tmp2013
                    },
                    {
                        name: '2017년 온도',
                        data: tmp2017
                    },
                    {
                        name: '2021년 온도',
                        data: tmp2021
                    }

                ],
                chart: {
                    type: 'bar',
                    height: 350
                },
                title: {
                    text: '2009 ~ 2021년 월별 온도 평균',
                    align: 'left'
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                },
                yaxis: {
                    title: {
                        text: '도'
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return "도"
                        }
                    }
                }
            };
            const temp2009_2021Chart = new ApexCharts(document.querySelector("#tmp_stick_chart"), temp2009_2021ChartOptions);
            temp2009_2021Chart.render();

        });
    }, []);

    return (
        <div className='EnvironmentAnalysisDetailPage'>
            <div id='title'>환경 관련 데이터</div>
            <div className='EnvironmentWrapper'>
                <div className='AnalysisWrapper'>
                    <div className='Analysis'>
                        <div className='LineChartWrapper'>
                            <div id='fine_dust_line_chart'></div>
                            <div id='ultra_fine_dust_line_chart'></div>
                            <div id='find_and_ultra_dust_line_chart'></div>
                            <div id='find_dust_month_stick_chart'></div>
                            <div id='ultra_fine_dust_month_stick_chart'></div>
                            <div id='tmp_stick_chart'></div>

                        </div>
                    </div>
                    <div className='Contents'>
                        <div className='AnalyContents'>2009과 2021년 사이 서울시의 각 구 별 미세먼지 현황을 비교하였습니다. 미세먼지가 감소 추이를 보이는데, 여러 정책들이 시행되고 기술 발전, 사회적 제도들이 이유로 추측됩니다.</div>
                        <div className='AnalyContents'>2009과 2021년 사이 서울시의 각 구 별 초미세먼지 현황을 비교하였습니다. 미세먼지만큼은 아니여도 초미세먼지도 감소 추이를 보이는데, 이 또한 여러 정책과 기술, 사회적 제도들이 이유로 추측됩니다.</div>
                        <div className='AnalyContents'>2009년부터 2021년까지의 연 평균 미세먼지와 초미세먼지 추이를 나타내었습니다.<br/> 사용한 데이터셋에서 2014년 초미세먼지 데이터가 부족한 것을 감안하고 비교해야 합니다. 미세먼지는 연도가 지나며 상당 수치 떨어졌지만 초미세먼지는 감소폭이 작은 것을 볼 수 있습니다. </div>
                        <div className='AnalyContents'>2009년부터 2021년까지의 월별 평균 미세먼지 그래프입니다. 주로 황사가 부는 봄에 수치가 높고 장마로 인해 여름에 수치가 낮음을 볼 수 있습니다.</div>
                        <div className='AnalyContents'>2009년부터 2021년까지의 월별 평균 초미세먼지 그래프입니다. 미세먼지와 비슷한 추이를 보입니다.</div>
                        <div className='AnalyContents'>2009년부터 2021년까지의 월별 평균 기온 그래프입니다. 전체적으로 연도가 지나며 여름엔 기온이 오르고 겨울엔 기온이 내려가는 것을 확인할 수 있습니다.</div>
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

            {isBoardWriteClicked === true ? <BoardWrite boardType={'environment'}/> : null}
        </div>
    );
};

export default EnvironmentAnalysisDetailPage;


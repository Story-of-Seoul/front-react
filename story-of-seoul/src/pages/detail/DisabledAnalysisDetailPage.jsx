import React, {useEffect, useState} from 'react';
import '../../styles/DisabledAnalysisDetailPage.scss'
import ApexCharts from "apexcharts";
import analysisAPI from "../../axios/analysisAxios";
import BoardWrite from "../../components/BoardWrite";


const DisabledAnalysisDetailPage = () => {

    const [callTotal, setCallTotal] = useState();
    const [waiting, setWaiting] = useState();

    const [news, setNews] = useState([]);
    const [policies, setPolicies] = useState([]);

    const [isBoardWriteClicked, setIsBoardWriteClicked] = useState(false);
    useEffect(() => {

        analysisAPI.requestNewsPolicy('disablecalltaxi', (data) => {

            const newsData = data['news'];
            const policyData = data['policy'];
            setNews(newsData);
            setPolicies(policyData);

        });

        analysisAPI.requestDisabledData((data) => {
            setCallTotal(data['calltotal']);
            setWaiting(data['waiting']);

            /** 7월 이용일시 → 일별(1일 간격), 요일별, 하루당 시간별 이용비율  **/
            const callFrequency = data['callfrequency'];


            let useDayChartOptions = {
                series: [
                    {
                        name: 'day',
                        data: callFrequency['day']
                    },
                ],
                title: {
                    text: '일별 이용량'
                },
                chart: {
                    height: 350,
                    type: 'bar',
                    events: {
                        click: function (chart, w, e) {
                            // console.log(chart, w, e)
                        }
                    }
                },
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
                    categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
                        '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
                        '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
                    labels: {
                        style: {
                            fontSize: '12px'
                        }
                    }
                }
            };

            var useDayChart = new ApexCharts(document.querySelector("#use_day_stick_chart"), useDayChartOptions);
            useDayChart.render();

            let useWeekChartOptions = {
                series: [
                    {
                        name: 'week',
                        data: callFrequency['week']
                    },
                ],
                title: {
                    text: '주간별 이용량'
                },
                chart: {
                    height: 350,
                    type: 'bar',
                    events: {
                        click: function (chart, w, e) {
                            // console.log(chart, w, e)
                        }
                    }
                },
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
                    categories: ['월', '화', '수', '목', '금', '토', '일'],
                    labels: {
                        style: {
                            fontSize: '12px'
                        }
                    }
                }
            };

            var useWeekChart = new ApexCharts(document.querySelector("#use_week_stick_chart"), useWeekChartOptions);
            useWeekChart.render();

            let useTimeChartOptions = {
                series: [
                    {
                        name: 'time',
                        data: callFrequency['time']
                    },
                ],
                title: {
                    text: '시간별 이용량'
                },
                chart: {
                    height: 350,
                    type: 'bar',
                    events: {
                        click: function (chart, w, e) {
                            // console.log(chart, w, e)
                        }
                    }
                },
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
                    categories: ['00시', '01시', '02시', '03시', '04시', '05시', '06시',
                        '07시', '08시', '09시', '10시', '11시', '12시', '13시',
                        '14시', '15시', '16시', '17시', '18시', '19시', '20시',
                        '21시', '22시', '23시'],
                    labels: {
                        style: {
                            fontSize: '12px'
                        }
                    }
                }
            };

            var useTimeChart = new ApexCharts(document.querySelector("#use_time_stick_chart"), useTimeChartOptions);
            useTimeChart.render();


            /** 배차/승차/대기시간 그래프 **/
            const receipt_set = data['calltime']['receipt_set'];
            const set_ride = data['calltime']['set_ride'];
            const receipt_ride = data['calltime']['receipt_ride'];
            console.log(receipt_ride);

            let dispatchChartOptions = {
                series: [{
                    name: '배차시간 - 콜 시간',
                    data: receipt_set
                }, {
                    name: '승차시간 - 배차시간',
                    data: set_ride
                }, {
                    name: '승차시간 - 콜 시간',
                    data: receipt_ride
                }],
                chart: {
                    type: 'bar',
                    height: 350
                },
                title: {
                    text: "배차/승차/대기시간"
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
                    categories: [
                        ['0~5분'],
                        ['5~10분'],
                        ['10~15분'],
                        ['15~20분'],
                        ['20~25분',],
                        ['25~30분'],
                        ['30~35분'],
                        ['35~40분'],
                        ['40분 이상']
                    ],
                },

                yaxis: {
                    title: {
                        text: '건수'
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return "건"
                        }
                    }
                }
            };


            var dispatchChart = new ApexCharts(document.querySelector("#dispatch_stick_chart"), dispatchChartOptions);
            dispatchChart.render();

            /** 지역구(startpos, endpos)별 건수 **/
            const startpos = data['callstartend']['startpos'];
            const endpos = data['callstartend']['endpos'];

            const startposData = Object.values(startpos);
            const endposData = Object.values((endpos));

            let startChart = {
                series: startposData,
                title: {
                    text: "택시 출발지"
                },
                chart: {
                    width: 380,
                    type: 'pie',
                },
                labels: ['종로구', '중구', '용산구', '성동구', '광진구', '동대문구',
                    '중랑구', '성북구', '강북구', '도봉구', '노원구', '은평구',
                    '서대문구', '마포구', '양천구', '강서구', '구로구', '금천구',
                    '영등포구', '동작구', '관악구', '서초구', '강남구', '송파구', '강동구'],
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

            let endChart = {
                series: endposData,
                chart: {
                    width: 380,
                    type: 'pie',
                },
                title: {
                    text: "택시 도착지"
                },
                labels: ['종로구', '중구', '용산구', '성동구', '광진구', '동대문구',
                    '중랑구', '성북구', '강북구', '도봉구', '노원구', '은평구',
                    '서대문구', '마포구', '양천구', '강서구', '구로구', '금천구',
                    '영등포구', '동작구', '관악구', '서초구', '강남구', '송파구', '강동구'],
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

            var startposChart = new ApexCharts(document.querySelector("#startpos_chart"), startChart);
            var endposChart = new ApexCharts(document.querySelector("#endpos_chart"), endChart);

            startposChart.render();
            endposChart.render();

            const callTaxiIot = data['calltaxi_iot'];
            const accel = callTaxiIot['acceleration'];
            const decel = callTaxiIot['deceleration'];
            const safe = callTaxiIot['safe_rate'];

            const disabledIotChartOptions = {
                series: [{
                    name: '급가속',
                    type: 'column',
                    data: accel
                }, {
                    name: '급감속',
                    type: 'column',
                    data: decel
                }, {
                    name: '안전 지수',
                    type: 'line',
                    data: safe
                }],
                chart: {
                    height: 350,
                    type: 'line',
                    stacked: false
                },

                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: [1, 1, 4]
                },
                title: {
                    text: '장애인 콜 택시 승객 안심 정도와 급가속 급감속 비율',
                    align: 'left',
                    offsetX: 110
                },
                xaxis: {
                    categories: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                },
                yaxis: [
                    {
                        axisTicks: {
                            show: true,
                        },
                        axisBorder: {
                            show: true,
                            color: '#008FFB'
                        },
                        labels: {
                            style: {
                                colors: '#008FFB',
                            }
                        },
                        title: {
                            text: "급가속",
                            style: {
                                color: '#008FFB',
                            }
                        },
                        tooltip: {
                            enabled: true
                        }
                    },
                    {
                        seriesName: '급가속',
                        opposite: true,
                        axisTicks: {
                            show: true,
                        },
                        axisBorder: {
                            show: true,
                            color: '#00E396'
                        },
                        labels: {
                            style: {
                                colors: '#00E396',
                            }
                        },
                        title: {
                            text: "급감속",
                            style: {
                                color: '#00E396',
                            }
                        },
                    },
                    {
                        seriesName: 'Revenue',
                        opposite: true,
                        axisTicks: {
                            show: true,
                        },
                        axisBorder: {
                            show: true,
                            color: '#FEB019'
                        },
                        labels: {
                            style: {
                                colors: '#FEB019',
                            },
                        },
                        title: {
                            text: "안전 지수",
                            style: {
                                color: '#FEB019',
                            }
                        }
                    },
                ],
                tooltip: {
                    fixed: {
                        enabled: true,
                        position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                        offsetY: 30,
                        offsetX: 60
                    },
                },
                legend: {
                    horizontalAlign: 'left',
                    offsetX: 40
                }
            };

            var disabledIotChart = new ApexCharts(document.querySelector("#iot_chart"), disabledIotChartOptions);
            disabledIotChart.render();

        });


    }, []);


    return (
        <div className='DisabledAnalysisDetailPage'>
            <div id='title'>장애인 관련 데이터</div>
            <div className='DisabledWrapper'>
                <div className='AnalysisWrapper'>
                    <div className='AnalysisDataWrapper'>
                        <div className='Analysis'>
                            <div className='TextAnalysisWrapper'>
                                <div id='title'>2022년 장애인 콜 택시</div>
                                <div className='ContentWrapper'>
                                    <div className='Total'>
                                        <div id='title'>총 접수건</div>
                                        <div id='content'>{callTotal}건</div>
                                    </div>
                                    <div className='Rate'>
                                        <div id='title'>평균 대기시간</div>
                                        <div id='content'>{waiting}분</div>
                                    </div>
                                </div>
                            </div>

                                <div className='StickChartWrapper'>
                                    <div id='use_time_stick_chart'></div>
                                    <div id='use_week_stick_chart'></div>
                                    <div id='use_day_stick_chart'></div>
                                    <div id='dispatch_stick_chart'></div>
                                </div>
                                <div className='BubbleChartWrapper'>
                                    <div id='startpos_chart'></div>
                                    <div id='endpos_chart'></div>
                                </div>

                            </div>
                        </div>

                    <div className='Contents'>
                        <div className='AnalyContents'>2022년 7월 장애인 콜택시 총 이용 건수와 평균 대기시간입니다.</div>
                        <div className='AnalyContents'>2022년 7월 한달 동안 시간대별 이용량을 시각화 했습니다. 특정 시간에 몰려있는 것을 확인할 수 있습니다.</div>
                        <div className='AnalyContents'>2022년 7월 한달 동안 요일별 이용량을 시각화 했습니다. 장애인 콜택시 운영시간을 감안해도 주말보다 평일에 이용량이 몰려있는 것을 확인할 수 있습니다.</div>
                        <div className='AnalyContents'>2022년 7월 한달 동안 일별 이용량을 시각화 했습니다. 위의 요일별 이용량과 연관해서 평일에 이용량이 많고 비교적 월초나 중반에 이용량이 많은 것을 확인할 수 있습니다.</div>
                        <div className='AnalyContents'>2022년 7월 한달 동안 호출/배차/탑승 세가지 시간들 사이 간격을 시각화 했습니다. 배차가 된 뒤 차에 탑승하기까지 시간이 많이 소요되고, 전체적으로 호출 이후 탑승까지 시간도 상당히 오래 걸리는 것을 확인할 수 있습니다.</div>
                        <div className='AnalyContents'>2022년 7월 한달 동안 택시 탑승지와 도착지의 비율을 시각화 했습니다. 특정 구에서 많이 탑승하고 하차하며, 대부분 탑승/하차 비율이 비슷하지만 차이가 있는 구도 살펴볼 수 있습니다.</div>
                        <div className='AnalyContents'>2021년 동안 장애인 콜택시의 iot 데이터를 활용하여 급가속, 급감속, 안전지수를 시각화 했습니다. 운전에 더욱 조심해야하는 장애인 콜택시임에도 불구하고 상당수의 급가속, 급감속 발생 수가 존재함을 볼 수 있습니다.</div>
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
            {isBoardWriteClicked === true ? <BoardWrite boardType={'disabled'}/> : null}
        </div>
    );
};

export default DisabledAnalysisDetailPage;
import React, {useEffect, useState} from 'react';
import '../../styles/DisabledAnalysisDetailPage.scss'
import ApexCharts from "apexcharts";
import analysisAPI from "../../axios/analysisAxios";
import BoardWrite from "../../components/BoardWrite";


const DisabledAnalysisDetailPage = () => {

        const [callTotal, setCallTotal] = useState();
        const [waiting, setWaiting] = useState();

        const [isBoardWriteClicked, setIsBoardWriteClicked] = useState(false);
        useEffect(() => {

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
                {isBoardWriteClicked === true ? <BoardWrite boardType={'disabled'}/> : null}
            </div>
        );
    }
;

export default DisabledAnalysisDetailPage;
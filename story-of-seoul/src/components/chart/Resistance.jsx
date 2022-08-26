import React, {useEffect} from 'react';
import ApexCharts from "apexcharts";
import analysisAPI from "../../axios/analysisAxios";

const Resistance = () => {

    useEffect(() => {
        analysisAPI.requestSafetyData((data) => {
            /** 내진 설계 **/
            const buildings = data['building'];

            let resistanceChartOptions = {
                series: [
                    {
                        name: '건물총계',
                        data: [
                            {
                                x: '단독주택',
                                y: buildings['단독주택'][0],
                                goals: [
                                    {
                                        name: '내진설계완료',
                                        value: buildings['단독주택'][1],
                                        strokeHeight: 5,
                                        strokeColor: '#775DD0'
                                    }
                                ]
                            },
                            {
                                x: '공동주택',
                                y: buildings['공동주택'][0],
                                goals: [
                                    {
                                        name: '내진설계완료',
                                        value: buildings['공동주택'][1],
                                        strokeHeight: 5,
                                        strokeColor: '#775DD0'
                                    }
                                ]
                            },
                            {
                                x: '업무시설',
                                y: buildings['업무시설'][0],
                                goals: [
                                    {
                                        name: '내진설계완료',
                                        value: buildings['업무시설'][1],
                                        strokeHeight: 5,
                                        strokeColor: '#775DD0'
                                    }
                                ]
                            },
                            {
                                x: '교육연구시설',
                                y: buildings['교육연구시설'][0],
                                goals: [
                                    {
                                        name: '내진설계완료',
                                        value: buildings['교육연구시설'][1],
                                        strokeHeight: 5,
                                        strokeColor: '#775DD0'
                                    }
                                ]
                            },
                            {
                                x: '문화 및 집회시설',
                                y: buildings['문화 및 집회시설'][0],
                                goals: [
                                    {
                                        name: '내진설계완료',
                                        value: buildings['문화 및 집회시설'][1],
                                        strokeHeight: 5,
                                        strokeColor: '#775DD0'
                                    }
                                ]
                            },
                            {
                                x: '의료시설',
                                y: buildings['의료시설'][0],
                                goals: [
                                    {
                                        name: '내진설계완료',
                                        value: buildings['의료시설'][1],
                                        strokeHeight: 5,
                                        strokeColor: '#775DD0'
                                    }
                                ]
                            },
                            {
                                x: '제1종 근린생활시설',
                                y: buildings['제1종 근린생활시설'][0],
                                goals: [
                                    {
                                        name: '내진설계완료',
                                        value: buildings['제1종 근린생활시설'][1],
                                        strokeHeight: 5,
                                        strokeColor: '#775DD0'
                                    }
                                ]
                            },
                            {
                                x: '제2종 근린생활시설',
                                y: buildings['제2종근린생활시설'][0],
                                goals: [
                                    {
                                        name: '내진설계완료',
                                        value: buildings['제2종근린생활시설'][1],
                                        strokeHeight: 5,
                                        strokeColor: '#775DD0'
                                    }
                                ]
                            },
                            {
                                x: '종교시설',
                                y: buildings['종교시설'][0],
                                goals: [
                                    {
                                        name: '내진설계완료',
                                        value: buildings['종교시설'][1],
                                        strokeHeight: 5,
                                        strokeColor: '#775DD0'
                                    }
                                ]
                            },
                            {
                                x: '기 타',
                                y: buildings['기 타'][0],
                                goals: [
                                    {
                                        name: '내진설계완료',
                                        value: buildings['기 타'][1],
                                        strokeHeight: 5,
                                        strokeColor: '#775DD0'
                                    }
                                ]
                            },
                        ],
                    }
                ],
                title: {
                    text: '서울시 건축물 내진율'
                },
                chart: {
                    height: 350,
                    type: 'bar'
                },
                plotOptions: {
                    bar: {
                        columnWidth: '60%'
                    }
                },
                colors: ['#00E396'],
                dataLabels: {
                    enabled: false
                },
                legend: {
                    show: true,
                    showForSingleSeries: true,
                    customLegendItems: ['건물 총계', '내진설계완료'],
                    markers: {
                        fillColors: ['#00E396', '#775DD0']
                    }
                }
            };

            const resistanceChart = new ApexCharts(document.querySelector("#resistance_chart"), resistanceChartOptions);
            resistanceChart.render();
        });
    },[]);

    return (
        <div>
            <div id='resistance_chart'></div>
        </div>
    );
};

export default Resistance;
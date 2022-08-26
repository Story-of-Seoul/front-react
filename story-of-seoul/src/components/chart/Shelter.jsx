import React, {useEffect} from 'react';
import ApexCharts from "apexcharts";
import analysisAPI from "../../axios/analysisAxios";

const Shelter = () => {
    useEffect(() => {
        /** 지진 대피 수용소 **/
        analysisAPI.requestSafetyData((data) => {
            const shelter = data['shelter'];
            const capacity = Object.values(shelter['capacity']);
            const population = Object.values(shelter['population']);
            const shelterOptions = {
                series: [
                    {
                        name: '수용량',
                        data: capacity,
                    },
                    {
                        name: '거주 인구수',
                        data: population
                    },
                ],
                chart: {
                    type: 'bar',
                    height: 350
                },
                colors: ['#0000CD', '#ff4040'],
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
                title: {
                    text: '서울시 거주인원 및 지진 대피소 수용인원'
                },
                xaxis: {
                    categories: ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구',
                        '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구',
                        '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구',
                        '은평구', '종로구', '중구', '중랑구'],
                },
                yaxis: {
                    title: {
                        text: '명'
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return "$ " + val + " thousands"
                        }
                    }
                }
            };

            const shelterChart = new ApexCharts(document.querySelector("#shelter_chart"), shelterOptions);
            shelterChart.render();
        });
    }, []);


    return (
        <div>
            <div id='shelter_chart'></div>
        </div>
    );
};

export default Shelter;
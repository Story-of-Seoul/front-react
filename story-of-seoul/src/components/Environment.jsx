import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import ApexCharts from 'apexcharts';
import analysisAPI from "../axios/analysisAxios";

const Environment = (props) => {

    const [newsTotal, setNewsTotal] = useState();
    const [policyTotal, setPolicyTotal] = useState();

    useEffect(() => {

        analysisAPI.requestNewsPolicyTotal('environment', (data) => {
            setNewsTotal(data['news']);
            setPolicyTotal(data['policy']);
        })

        analysisAPI.requestEnvironmentData((data) => {
            const seoulRegion = [
                '종로구', '중구', '용산구', '성동구', '광진구', '동대문구', '중랑구',
                '성북구', '강북구', '도봉구', '노원구', '은평구', '서대문구', '마포구',
                '양천구', '강서구', '구로구', '금천구', '영등포구', '동작구', '관악구',
                '서초구', '강남구', '송파구', '강동구'
            ];
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
                    offsetY: -15,
                    offsetX: -5
                }
            };

            const fineDustChart = new ApexCharts(document.querySelector("#environment_chart"), fineDustChartOptions);
            fineDustChart.render();
        });
    }, []);


    return (
        <div className='AnalysisContentsWrapper' onClick={() => {
            props.navigate('/dataAnalysis/environment')
        }}>
            <div id='title'>미세먼지관련 데이터</div>
            <div id='environment_chart'></div>
            <div className='EtcWrapper'>
                <div id='news'>관련 뉴스<span>{newsTotal}</span></div>
                <div id='policy'>관련 정책<span>{policyTotal}</span></div>
            </div>
        </div>
    );
};

export default Environment;
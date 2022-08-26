import React, {useEffect, useState} from 'react';
import ApexCharts from "apexcharts";
import analysisAPI from "../axios/analysisAxios";

const Traffic = (props) => {

    const [newsTotal, setNewsTotal] = useState();
    const [policyTotal, setPolicyTotal] = useState();

    useEffect(() => {
        analysisAPI.requestNewsPolicyTotal('accident', (data) => {
            setNewsTotal(data['news']);
            setPolicyTotal(data['policy']);
        })

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
        });

    }, []);

    return (
        <div className='AnalysisContentsWrapper' onClick={() => {
            props.navigate('/dataAnalysis/traffic')
        }}>
            <div id='title'>교통관련 데이터</div>
            <div id='traffic_acc_chart'></div>
            <div className='EtcWrapper'>
                <div id='news'>관련 뉴스<span>{newsTotal}</span></div>
                <div id='policy'>관련 정책<span>{policyTotal}</span></div>
            </div>
        </div>
    );
};

export default Traffic;
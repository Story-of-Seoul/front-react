import React, {useEffect} from 'react';
import ApexCharts from "apexcharts";
import analysisAPI from "../axios/analysisAxios";

const Disabled = (props) => {


    useEffect(() => {
        analysisAPI.requestDisabledData((data) => {

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
        });
    }, []);
    return (
        <div className='AnalysisContentsWrapper' onClick={() => {
            props.navigate('/dataAnalysis/disabled')
        }}>
            <div id='title'>장애인 데이터</div>
            <div id='use_day_stick_chart'>

            </div>
            <div className='EtcWrapper'>
                <div id='news'>관련 뉴스<span>{5}</span></div>
                <div id='policy'>관련 정책<span>{2}</span></div>
            </div>
        </div>
    );
};

export default Disabled;
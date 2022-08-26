import React, {useEffect, useState} from 'react';
import ApexCharts from "apexcharts";
import '../../styles/EnvironmentAnalysisDetailPage.scss';
import analysisAPI from "../../axios/analysisAxios";
import BoardWrite from "../../components/BoardWrite";

const EnvironmentAnalysisDetailPage = () => {

    const [isBoardWriteClicked, setIsBoardWriteClicked] = useState(false);

    const seoulRegion = [
        '강서구', '양천구', '구로구', '영등포구', '금천구', '동작구', '관악구',
        '서초구', '강남구', '송파구', '강동구', '마포구', '용산구', '성동구',
        '광진구', '은평구', '서대문구', '종로구', '중구', '동대문구', '중랑구',
        '성북구', '강북구', '도봉구', '노원구'
    ];

    /** 지역 state 설정**/
    const onRegionChange = (e => {

    });

    const [temperatureData, setTemperatureData] = useState({});
    const [fineDustData, setFineDustData] = useState({});

    const [temperatureChartOptions, setTemperatureChartOptions] = useState({
        series: [
            {
                name: "High - 2013",
                data: [28, 29, 33, 36, 32, 32, 33]
            },
            {
                name: "Low - 2013",
                data: [12, 11, 14, 18, 17, 13, 13]
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
            text: 'Average High & Low Temperature',
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
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            title: {
                text: 'Month'
            }
        },
        yaxis: {
            title: {
                text: 'Temperature'
            },
            min: 5,
            max: 40
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
        }
    });


    useEffect(() => {

        analysisAPI.requestEnvironmentData((data) => {
            const nextTemperatureData = {
                ...temperatureData,
                data
            };
            setTemperatureData(nextTemperatureData);

        });


        const temperatureChart = new ApexCharts(document.querySelector("#temperature_line_chart"), temperatureChartOptions);
        temperatureChart.render();
    }, []);

    return (
        <div className='EnvironmentAnalysisDetailPage'>
            <div id='title'>환경 관련 데이터</div>
            <div className='EnvironmentWrapper'>
                <div className='AnalysisWrapper'>
                    <div className='Analysis'>
                        <div className='LineChartWrapper'>
                            <div id='temperature_line_chart'></div>
                            <div className='SelectRegionWrapper'>
                                <select className="SelectRegion" onChange={onRegionChange}>
                                    < option value="" selected disabled hidden>지역구를 선택해주세요.< /option>
                                    {seoulRegion.map((region, index) => (
                                        <option key={index} name="region" value={region}>{region}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='FineDustTableWrapper'>
                            여기에 미세먼지 표
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

            {isBoardWriteClicked === true ? <BoardWrite boardType={'environment'}/> : null}
        </div>
    );
};

export default EnvironmentAnalysisDetailPage;


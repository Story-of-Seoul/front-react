import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import ApexCharts from "apexcharts";

const Traffic = (props) => {

    let options = {
        series: [
            {
                name: "테스트1",
                data: [8, 10, 11]
            },
            {
                name: "테스트2",
                data: [1, 2, 3]
            },
            {
                name: "테스트3",
                data: [13, 17, 19]
            },
        ],
        chart: {
            height: 240,
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
            text: '미세먼지 차트',
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
            categories: ['2010', '2011', '2012'],
            title: {
                text: 'Year'
            }
        },
        yaxis: {
            title: {
                text: '미세먼지 정도'
            },
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
        },

    };

    useEffect(() => {
        const chart = new ApexCharts(document.querySelector('#traffic_chart'), options);
        chart.render();

    }, []);

    return (
        <div className='AnalysisContentsWrapper' onClick={() => {props.navigate('/dataAnalysis/traffic')}}>
            <div id='title'>교통관련 데이터</div>
            <div id='traffic_chart'></div>
            <div className='EtcWrapper'>
                <div id='news'>관련 뉴스<span>{2}</span></div>
                <div id='policy'>관련 정책<span>{4}</span></div>
            </div>
        </div>
    );
};

export default Traffic;
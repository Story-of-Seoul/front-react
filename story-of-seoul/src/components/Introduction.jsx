
import banner from '../images/banner.png';

import React from 'react';
import '../styles/Introduction.scss'

const Introduction = () => {
    return (
        <div className="Introduction">
            <div className="InfoText">
                서울의 이야기는<br/>
                서울에서 함께하는 모두의 이야기를 담는 웹서비스입니다.<br/>
                다양한 분석 데이터, 관련 정책, 뉴스를 함께 보면서<br/>
                여러분의 이야기를 적어주세요<br/>
                작은 이야기들이 모여 세상을 바꿀 수 있습니다.
            </div>
            <img src={banner} alt="이미지 불러오기 실패"/>
        </div>
    );
};

export default Introduction;
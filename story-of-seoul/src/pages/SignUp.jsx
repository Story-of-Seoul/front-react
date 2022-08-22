import React from 'react';
import '../styles/SignUp.scss'

const SignUp = () => {


    const seoulRegion = [
        '강서구', '양천구', '구로구', '영등포구', '금천구', '동작구', '관악구',
        '서초구', '강남구', '송파구', '강동구', '마포구', '용산구', '성동구',
        '광진구', '은평구', '서대문구', '종로구', '중구', '동대문구', '중랑구',
        '성북구', '강북구', '도봉구', '노원구'
    ];


    return (
        <div className='SignUp'>
            <div className="SignUpWrapper">
                <div id="title">
                    회원가입
                </div>
                <div className="Contents">
                    <div className="EmailRequestWrapper">
                        <input type="text" placeholder='이메일을 입력하세요'/>
                        <button>인증번호 요청</button>
                    </div>
                    <div className="EmailConfirmWrapper">
                        <input type="text" placeholder='인증번호를 입력하세요'/>
                        <button>인증번호 확인</button>
                    </div>
                    <div className="NickNameAndRegionWrapper">
                        <input id="nickname" type="text" placeholder='닉네임을 입력하세요'/>
                        <div class="dropdown">
                            <button class="dropbtn">거주중인 지역구를 선택하세요.</button>
                            <div class="dropdown-content">
                                {seoulRegion.map(region => (
                                    <div id="region">{region}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <input type="text" placeholder='비밀번호를 입력하세요'/>
                    <div class="dropdown">
                        <button class="dropbtn">성별을 선택하세요.</button>
                        <div class="dropdown-content">
                            <div id="male">남</div>
                            <div id="female">여</div>
                        </div>
                    </div>
                    <input type="text" placeholder='나이를 선택하세요'/>
                </div>
                <button>회원가입</button>
            </div>
        </div>
    );
};

export default SignUp;
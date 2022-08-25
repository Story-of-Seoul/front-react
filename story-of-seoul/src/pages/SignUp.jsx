import React, {useState} from 'react';
import '../styles/SignUp.scss'
import authAPI from "../axios/authAxios";
import {type} from "@testing-library/user-event/dist/type";
import auth from "../modules/auth";
import {useNavigate} from "react-router-dom";

const SignUp = () => {

    let navigate = useNavigate();

    /**
     * Email 인증 관련 state
     * emailConfirm: 인증번호 요청에 대한 request
     * authNumberResponse: 서버로 부터 전달 받은 인증번호
     * authNumberInput: Client가 입력한 인증번호
     * isEmailConfirmed: 이메일 인증 실행 유무
     */
    const [emailConfirm, setEmailConfirm] = useState({email: ""});
    const [authNumberResponse, setAuthNumberResponse] = useState();
    const [authNumberInput, setAuthNumberInput] = useState();
    const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);


    /**
     * signUpRequest: 회원가입 전체에 대한 request
     */
    const [signUpRequest, setSignUpRequest] = useState({
        email: "",
        password: "",
        nickname: "",
        region: "",
        gender: "",
        age: "",
    });

    const seoulRegion = [
        '강서구', '양천구', '구로구', '영등포구', '금천구', '동작구', '관악구',
        '서초구', '강남구', '송파구', '강동구', '마포구', '용산구', '성동구',
        '광진구', '은평구', '서대문구', '종로구', '중구', '동대문구', '중랑구',
        '성북구', '강북구', '도봉구', '노원구'
    ];

    /** 이메일 입력시 emailConfirm state에 저장 **/
    const onEmailChange = (e => {

        const nextEmailConfirm = {
            ...emailConfirm,
            "email": e.target.value,
        };

        setEmailConfirm(nextEmailConfirm);
    });

    /** 인증 번호 입력시 authNumber state에 저장 **/
    const onAuthNumberChange = (e => {
        setAuthNumberInput(e.target.value);
        console.log(authNumberInput);
    })

    /** 회원가입 request 설정 **/
    const onSignUpRequestChange = (e => {
        const nextSignUpRequest = {
            ...signUpRequest,
            [e.target.name]: e.target.value,
        };
        setSignUpRequest(nextSignUpRequest);
        console.log(signUpRequest);
    })

    /** 지역 state 설정**/
    const onRegionChange = (e => {
        const nextSignUpRequest = {
            ...signUpRequest,
            "region": e.target.value,
        };

        setSignUpRequest(nextSignUpRequest);
    });

    /** 성별 state 설정**/
    const onGenderChange = (e => {
        const nextSignUpRequest = {
            ...signUpRequest,
            "gender": e.target.value,
        };

        setSignUpRequest(nextSignUpRequest);
    });


    /** 인증 번호 요청 API call,
     *  서버로 부터 전달 받은 authNumber authNumberResponse state에 저장
     **/
    const onAuthNumberRequestClick = () => {
        authAPI.requestEmailAuthNumber(emailConfirm, (data) => {
            console.log('callback -- onAuthNumberRequestClick data = ' + data['authNumber']);
            setAuthNumberResponse(data['authNumber']);
            console.log('authNumber: ' + authNumberResponse);
        })
    };

    /** 입력한 인증 번호의 일치 유무 판단, 인증 성공 했을 경우 isEmailConfirmed state true로 변경  **/
    const onAuthNumberConfirmClick = () => {
        console.log('responded authNumber = ' + authNumberResponse);
        console.log('input authNumber = ' + authNumberInput);

        if (Number(authNumberInput) === authNumberResponse) {

            setIsEmailConfirmed(true);
            console.log('인증 성공' + isEmailConfirmed);

            const nextSignUpRequest = {
                ...signUpRequest,
                email: emailConfirm['email'],

            };
            setSignUpRequest(nextSignUpRequest);
            console.log(signUpRequest);

        } else {
            console.log('인증번호 틀림');
            setAuthNumberInput("");
        }
    };

    /** 회원가입 최종 요청 버튼 이메일 검증 했는지 여부 확인 및 모든 데이터가 다 입력되었는지 체크**/
    const onSignUpRequestClick = () => {

        if (isEmailConfirmed === false) {
            alert('이메일 인증을 진행해 주세요');
        } else {
            let isAllInfoNotEmpty = false;
            for (const value in Object.values(signUpRequest)) {
                if (value === '') {
                    isAllInfoNotEmpty = true;
                }
            }

            isAllInfoNotEmpty === true ? alert('모든 정보를 입력해 주세요') : (authAPI.requestSignUp(signUpRequest, (data) => {
                console.log('callback -- onSignUpRequestClick data = ' + data);
                alert('회원가입 완료!');
                navigate("/");
            }));
        }


    }


    return (
        <div className='SignUp'>
            <div className="SignUpWrapper">
                <div id="title">
                    회원가입
                </div>
                <div className="Contents">
                    <div className="EmailRequestWrapper">
                        <input onChange={onEmailChange} value={emailConfirm['email']} type="text"
                               placeholder='이메일을 입력하세요'/>
                        <button onClick={onAuthNumberRequestClick}>인증번호 요청</button>
                    </div>
                    <div className="EmailConfirmWrapper">
                        <input onChange={onAuthNumberChange} value={authNumberInput} type="text"
                               placeholder='인증번호를 입력하세요'/>
                        <button onClick={onAuthNumberConfirmClick}>인증번호 확인</button>
                    </div>
                    <div className="NickNameAndRegionWrapper">
                        <input name="nickname" id="nickname" onChange={onSignUpRequestChange} type="text"
                               placeholder='닉네임을 입력하세요'/>

                        <select className="SelectRegion" onChange={onRegionChange}>
                            < option value="" selected disabled hidden >지역구를 선택해주세요.< /option>
                            {seoulRegion.map((region, index) => (
                                <option key={index} name="region" value={region}>{region}</option>
                            ))}
                        </select>

                    </div>
                    <input name="username" onChange={onSignUpRequestChange} type="text" placeholder='아이디를 입력하세요'/>
                    <input name="password" onChange={onSignUpRequestChange} type="password" placeholder='비밀번호를 입력하세요'/>
                    <select className="SelectGender" onChange={onGenderChange}>
                        < option value="" selected disabled hidden >성별을 선택해주세요.< /option>
                        <option name="gender" value="남">남</option>
                        <option name="gender" value="여">여</option>
                    </select>
                    <input name="age" onChange={onSignUpRequestChange} type="text" placeholder='나이를 입력하세요'/>
                </div>
                <button onClick={onSignUpRequestClick}>회원가입</button>
            </div>
        </div>
    );
};

export default SignUp;
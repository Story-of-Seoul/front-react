import React, {useEffect, useState} from 'react';
import '../../styles/SafetyBoardPage.scss';
import SocialSafety from "../../components/chart/SocialSafety";
import Resistance from "../../components/chart/Resistance";
import Shelter from "../../components/chart/Shelter";
import {useParams} from "react-router";
import BoardView from "../../components/BoardView";
import analysisAPI from "../../axios/analysisAxios";
import boardAPI from "../../axios/boardAxios";
import CommentWrite from "../../components/CommentWrite";
import CommentList from "../../components/CommentList";

const SafetyBoardPage = () => {
    const {id} = useParams();

    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);
    const [earthquake, setEarthQuake] = useState();

    useEffect(() => {

        analysisAPI.requestSafetyData((data) => {
            /** 지진 횟수 **/
            setEarthQuake(data['earthquake']);
        });

        boardAPI.requestBoardById(id, (data) => {

            setTitle(data['title']);
            setContents(data['contents']);
            setLikes(data['likes']);
            setComments(data['comments']);

        });

    }, []);
    return (
        <div className='SafetyBoardPage'>
            <div id='title'>안전 관련 데이터</div>
            <div className='SafetyWrapper'>
                <div className='AnalysisWrapper'>
                    <div className='AnalysisDataWrapper'>
                        <div className='Analysis'>
                            <div className='TextAnalysisWrapper'>
                                <div className='ContentWrapper'>
                                    <div className='EarthQuake'>
                                        <div id='title'>2020 ~ 2022<br/>서울시 감지 지진</div>
                                        <div id='content'>{earthquake}회</div>
                                    </div>
                                </div>
                            </div>

                            <div className='StickChartWrapper'>
                                <SocialSafety/>
                                <Resistance/>
                                <Shelter/>
                            </div>
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
                </div>

            </div>
            <BoardView title={title} contents={contents} likes={likes} comments={comments}/>
            <CommentList comments={comments}/>
            <CommentWrite id={id}/>
        </div>
    );
};

export default SafetyBoardPage;
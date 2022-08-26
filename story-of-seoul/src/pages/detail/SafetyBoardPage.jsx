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
import SafetyAnalysisDetailPage from "./SafetyAnalysisDetailPage";

const SafetyBoardPage = () => {
    const {id} = useParams();

    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {

        boardAPI.requestBoardById(id, (data) => {

            setTitle(data['title']);
            setContents(data['contents']);
            setLikes(data['likes']);
            setComments(data['comments']);

        });

    }, []);
    return (
        <div className='SafetyBoardPage'>
            <SafetyAnalysisDetailPage/>
            <BoardView title={title} contents={contents} likes={likes} comments={comments}/>
            <CommentList comments={comments}/>
            <CommentWrite id={id}/>
        </div>
    );
};

export default SafetyBoardPage;
import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import boardAPI from "../../axios/boardAxios";
import BoardView from "../../components/BoardView";
import CommentList from "../../components/CommentList";
import CommentWrite from "../../components/CommentWrite";
import EnvironmentAnalysisDetailPage from "./EnvironmentAnalysisDetailPage";

const EnvironmentBoardPage = () => {
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

        boardAPI.requestBoardById(id, (data) => {

            setTitle(data['title']);
            setContents(data['contents']);
            setLikes(data['likes']);
            setComments(data['comments']);

        });
    }, []);
    return (
        <div className='EnviromentBoardPage'>

            <EnvironmentAnalysisDetailPage/>
            <BoardView title={title} contents={contents} likes={likes} comments={comments}/>
            <CommentList comments={comments}/>
            <CommentWrite id={id}/>
        </div>
    );
};

export default EnvironmentBoardPage;
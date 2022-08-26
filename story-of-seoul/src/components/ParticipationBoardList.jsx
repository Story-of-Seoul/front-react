import React, {useEffect, useState} from 'react';
import boardAPI from "../axios/boardAxios";
import BoardView from "./BoardView";
import board from "./BoardView";
import {type} from "@testing-library/user-event/dist/type";
import {Link} from "react-router-dom";

const ParticipationBoardList = () => {

    const [boards, setBoards] = useState([]);

    useEffect(() => {

        boardAPI.requestBoard((data) => {
            const response = data['results']

            const filteredNotice = response.filter(function (elem, index, arr) {
                return elem.board_type !== "notice";
            });

            setBoards(filteredNotice.filter(function (elem, index, arr) {
                return elem.board_type !== "dataRequest";
            }));
        });

    }, [])


    return (
        <div className='ParticipationBoardList'>
            {
                boards ? boards.map((item, index) => {
                    return (
                        <div key={index} className='BoardWrapper'>

                            <div id='number'>{item.pk}</div>
                            <div className='TitleAndContents'>
                                <Link to={`/participation/${item.board_type}/${item.pk}`}>
                                    <div id='board_title'>{item.title}</div>
                                </Link>
                                <div id='board_contents'>{item.contents}</div>
                            </div>
                            <div className='Etc'>
                                <div id='created_at'>작성일{new String(item.created_at).split('T')[0]}</div>
                                <div className='LikeAndComments'>
                                    <div id='likesR'>추천</div>
                                    <div id='likes'>{item.likes.length}</div>
                                    <div id='commentsR'>댓글</div>
                                    <div id='comments'>{item.comments.length}</div>
                                </div>
                            </div>

                        </div>
                    )
                }) : ''}
        </div>
    );
};

export default ParticipationBoardList;
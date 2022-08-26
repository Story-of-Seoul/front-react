

import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import boardAPI from "../axios/boardAxios";

const BoardView = (props) => {

    const [board, setBoard] = useState({});

    useEffect(() => {
        boardAPI.requestBoardById(props.id, (data) => {
            const nextBoard = {
                ...board,
                data
            };
            setBoard(nextBoard);
        });
    }, []);
    return (
        <div className="BoardView">

        </div>
    );
};

export default BoardView;
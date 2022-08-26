import React from 'react';
import BoardView from "../components/BoardView";

const ParticipationBoardContainer = () => {

    return (
        <div className='ParticipationBoardContainer'>
            <BoardView/>
            <BoardView/>
            <BoardView/>
        </div>
    );
};

export default ParticipationBoardContainer;
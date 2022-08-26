import React from 'react';
import BoardView from '../components/BoardView';

const HotBoardContainer = () => {
    return (
        <div className="HotBoardContainer">
            <BoardView/>
            <BoardView/>
            <BoardView/>
            <BoardView/>
        </div>
    );
};

export default HotBoardContainer;
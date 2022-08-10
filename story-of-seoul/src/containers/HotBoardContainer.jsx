import React from 'react';
import Board from '../components/Board';

const HotBoardContainer = () => {
    return (
        <div className="HotBoardContainer">
            <Board/>
            <Board/>
            <Board/>
            <Board/>
        </div>
    );
};

export default HotBoardContainer;
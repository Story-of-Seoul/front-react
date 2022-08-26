import React from 'react';
import BoardView from '../components/BoardView';

const NoticeBoardContainer = () => {
    return(
        <div className="NoticeBoardContainer">
            <BoardView/>
            <BoardView/>
            <BoardView/>
            <BoardView/>
        </div>
    )
};

export default NoticeBoardContainer;
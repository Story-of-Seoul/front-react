import React, {useEffect, useState} from 'react';
import '../styles/BoardView.scss';

const BoardView = (props) => {

    return (
        <div className="BoardView">
            <hr/>
            <div className='BoardViewWrapper'>
                <div id='board_title'>{props.title}</div>
                <div className='HorizonalLine'/>
                <div id='board_contents'>{props.contents}</div>
            </div>
            <button onClick={null}>종하요<span>{props.likes.length}</span></button>
            <button onClick={null}>댓글<span>{props.comments.length}</span></button>
        </div>
    );
};

export default BoardView;
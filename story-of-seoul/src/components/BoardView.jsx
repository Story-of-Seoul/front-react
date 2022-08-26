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
            <div className='LikeCommentWrapper'>
                <button onClick={null}>좋아요<span>{props.likes ? props.likes.length : ''}</span></button>
                <button onClick={null}>댓글<span>{props.comments ? props.comments.length : ''}</span></button>
            </div>

        </div>
    );
};


export default BoardView;
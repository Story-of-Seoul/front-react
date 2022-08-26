import React from 'react';
import '../styles/CommentList.scss';

const CommentList = (props) => {


    return (
        <div >
            {props.comments ?
                props.comments.map((commentInfo, index) => {
                    return(
                        <div className='CommentList'>
                            <div key={index} id='comment_nick'>{commentInfo['profile']['nickname']}</div>
                            <div key={index} id='comment_text'>{commentInfo['text']}</div>
                        </div>
                    )

                })
             : '아무것도없음'}
        </div>
    );
};

export default CommentList;
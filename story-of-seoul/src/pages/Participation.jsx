import React from 'react';
import '../styles/Participation.scss'
import ParticipationBoardContainer from "../containers/ParticipationBoardContainer";
import ParticipationBoardList from "../components/ParticipationBoardList";

const Participation = () => {
    return (
        <div className='Participation'>
            <div className='ParticipationWrapper'>
                <div id='title'>
                    시민참여게시판
                </div>
                <div className='Contents'>
                    <div className='SearchButtonWrapper'>
                        <input type="text" placeholder='검색어를 입력하세요'/>
                        <button>검색</button>
                    </div>

                    <div className='ListWrapper'>
                        <ParticipationBoardList/>

                    </div>
                    <div className='WriteButtonWrapper'>
                        <button>글작성</button>
                    </div>
                    <div className='ButtonWrapper'>
                        <div className='PreviousButtonWrapper'>
                            <button>이전</button>
                        </div>

                        <div className='NextButtonWrapper'>
                            <button>다음</button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
);
};

export default Participation;
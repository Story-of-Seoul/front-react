
import React from 'react';
import Environment from "../components/Environment";
import '../styles/DataAnalysis.scss';
import Traffic from "../components/Traffic";
import Disabled from "../components/Disabled";
import Safety from "../components/Safety";
import {useNavigate} from "react-router-dom";
const DataAnalysis = () => {

    let navigate = useNavigate();

    return (
        <div className='DataAnalysis'>
            <div className='DataAnalysisWrapper'>
                <Environment navigate={navigate}/>
                <Traffic navigate={navigate}/>
                <Disabled navigate={navigate}/>
                <Safety navigate={navigate}/>
            </div>

        </div>
    );
};

export default DataAnalysis;
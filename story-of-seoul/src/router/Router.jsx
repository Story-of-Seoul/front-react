import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import DataAnalysis from '../pages/DataAnalysis';
import DataRequest from '../pages/DataRequest';
import Home from '../pages/Home';
import Mypage from '../pages/Mypage';
import Notice from '../pages/Notice';
import Participation from '../pages/Participation';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import EnvironmentAnalysisDetailPage from "../pages/detail/EnvironmentAnalysisDetailPage";
import SafetyAnalysisDetailPage from "../pages/detail/SafetyAnalysisDetailPage";
import TrafficAnalysisDetailPage from "../pages/detail/TrafficAnalysisDetailPage";
import DisabledAnalysisDetailPage from "../pages/detail/DisabledAnalysisDetailPage";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/notice" element={<Notice/>}/>
            <Route path="/dataAnalysis" element={<DataAnalysis/>}/>
            <Route path="/dataAnalysis/environment" element={<EnvironmentAnalysisDetailPage/>}/>
            <Route path="/dataAnalysis/safety" element={<SafetyAnalysisDetailPage/>}/>
            <Route path="/dataAnalysis/traffic" element={<TrafficAnalysisDetailPage/>}/>
            <Route path="/dataAnalysis/disabled" element={<DisabledAnalysisDetailPage/>}/>
            <Route path="/participation" element={<Participation/>}/>
            <Route path="/dataRequest" element={<DataRequest/>}/>

            <Route path="/mypage" element={<Mypage/>}/>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
        </Routes>
    );
};

export default Router;

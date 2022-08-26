import axios from "axios";


const analysisAPI = {
    requestEnvironmentData: (callback) => {
        console.log('calling requestEnvironmentData from API');
        axios(
            {
                url: 'analysis/environment',
                method: 'get',
                baseURL: 'http://' + 'localhost' + ':8000',
            }
        ).then(response => {
            console.log("response data: " + response.data);
            callback(response.data);
        }).catch((e) => console.log(e));
    },

    requestTrafficData: (callback) => {
        console.log('calling requestTrafficData from API');
        axios(
            {
                url: 'analysis/accident',
                method: 'get',
                baseURL: 'http://' + 'localhost' + ':8000',
            }
        ).then(response => {
            console.log("response data: " + response.data);
            callback(response.data);
        }).catch((e) => console.log(e));
    },

    requestDisabledData: (callback) => {
        console.log('calling requestDisabledData from API');
        axios(
            {
                url: 'analysis/disablecalltaxi',
                method: 'get',
                baseURL: 'http://' + 'localhost' + ':8000',
            }
        ).then(response => {
            console.log("response data: " + response.data);
            callback(response.data);
        }).catch((e) => console.log(e));
    },

    requestSafetyData: (callback) => {
        console.log('calling requestSafetyData from API');
        axios(
            {
                url: 'analysis/safe',
                method: 'get',
                baseURL: 'http://' + 'localhost' + ':8000',
            }
        ).then(response => {
            console.log("response data: " + response.data);
            callback(response.data);
        }).catch((e) => console.log(e));
    },

    requestNewsPolicyTotal: (type, callback) => {
        console.log('calling requestSafetyData from API');
        axios(
            {
                url: 'news/newspolicytotal',
                params: {
                    type: type
                },
                method: 'get',
                baseURL: 'http://' + 'localhost' + ':8000',
            }
        ).then(response => {
            console.log("response data: " + response.data);
            callback(response.data);
        }).catch((e) => console.log(e));
    },

    requestNewsPolicy: (type, callback) => {
        console.log('calling requestSafetyData from API');
        axios(
            {
                url: 'news/newspolicy',
                params: {
                    type: type
                },
                method: 'get',
                baseURL: 'http://' + 'localhost' + ':8000',
            }
        ).then(response => {
            console.log("response data: " + response.data);
            callback(response.data);
        }).catch((e) => console.log(e));
    },



};

export default analysisAPI;
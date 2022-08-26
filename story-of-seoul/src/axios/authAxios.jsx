import axios from "axios";

const authAPI = {
    requestEmailAuthNumber: (email, callback) => {
        axios(
            {
                url: 'account/signup/email',
                method: 'post',
                data: email,
                baseURL: 'http://' + 'localhost' + ':8000',
            }
        ).then(response => {
            callback(response.data);
        }).catch((e) => console.log(e));
    },

    requestSignUp: (request, callback) => {
        axios(
            {
                url: 'account/signup/',
                method: 'post',
                data: request,
                baseURL: 'http://' + 'localhost' + ':8000',
            }
        ).then(response => {
            callback(response.data);
        }).catch(e => {
            console.log(e);
        });
    },

    requestSignIn: (request, callback) => {
        axios(
            {
                url: 'account/signin/',
                method: 'post',
                data: request,
                baseURL: 'http://' + 'localhost' + ':8000',
            }
        ).then(response => {
            console.log('sigin response data:' + response.data);
            callback(response.data);
        }).catch(e => {
            console.log(e);
        });
    },
    requestAuth: (token, callback) => {
        axios(
            {
                url: 'account/mypage/',
                method: 'get',
                headers: {
                    Authorization: 'Token ' + token,
                },
                baseURL: 'http://' + 'localhost' + ':8000',
            }
        ).then(response => {
            callback(response.data);
        }).catch(e => {
            console.log(e);
        });
    },



}


export default authAPI;
import axios from "axios";



const boardAPI = {
    requestPost: (token, board, callback) => {
        console.log('calling requestPost from API');
        console.log(token);
        axios(
            {
                url: '/board/',
                method: 'post',
                headers: {
                    Authorization: 'Token ' + token,
                },
                data: board,
                baseURL: 'http://' + 'localhost' + ':8000',
            }
        ).then(response => {
            console.log("response data: " + response.data);
            callback(response.data);
        }).catch((e) => console.log(e));
    },

    requestComment: (comment, callback) => {
        console.log('calling requestPost from API');
        axios(
            {
                url: '/board/comments',
                method: 'post',
                data: comment,
                baseURL: 'http://' + 'localhost' + ':8000',
            }
        ).then(response => {
            console.log("response data: " + response.data);
            callback(response.data);
        }).catch((e) => console.log(e));
    },

    requestBoard: (callback) => {
        console.log('calling requestPost from API');
        axios(
            {
                url: '/board',
                method: 'get',
                baseURL: 'http://' + 'localhost' + ':8000',
            }
        ).then(response => {
            console.log("response data: " + response.data);
            callback(response.data);
        }).catch((e) => console.log(e));
    },

    requestBoardById: (id, callback) => {
        console.log('calling requestPost from API');
        axios(
            {
                url: '/board/' + id,
                method: 'get',
                baseURL: 'http://' + 'localhost' + ':8000',
            }
        ).then(response => {
            console.log("response data: " + response.data);
            callback(response.data);
        }).catch((e) => console.log(e));
    }






}


export default boardAPI;
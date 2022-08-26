import axios from "axios";


const boardAPI = {
    requestPost: (token, board, callback) => {
        console.log('calling requestPost from API');
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
            callback(response.data);
        }).catch((e) => console.log(e));
    },

    requestComment: (token, comment, callback) => {
        console.log('calling requestPost from API');
        axios(
            {
                url: '/comments/',
                method: 'post',
                headers: {
                    Authorization: 'Token ' + token,
                },
                data: comment,
                baseURL: 'http://' + 'localhost' + ':8000',
            }
        ).then(response => {
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
            callback(response.data);
        }).catch((e) => console.log(e));
    },

    requestBoardByType: (type, callback) => {
        console.log('calling requestPost from API');
        axios(
            {
                url: '/board',
                method: 'get',
                params: {
                    board_type: type
                },
                baseURL: 'http://' + 'localhost' + ':8000',
            }
        ).then(response => {
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

            callback(response.data);
        }).catch((e) => console.log(e));
    },


}


export default boardAPI;
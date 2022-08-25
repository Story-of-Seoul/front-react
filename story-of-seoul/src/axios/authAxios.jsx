import axios from "axios";
import {logout} from "../modules/auth";


const authAPI = {
    requestEmailAuthNumber: (email, callback) => {
        console.log('calling requestAuthNumber from API');
        console.log('request data = ' + email['email']);
        axios(
            {
                url: 'account/signup/email',
                method: 'post',
                data: email,
                baseURL: 'http://' + 'localhost' + ':8000',
            }
        ).then(response => {
            console.log("response data: " + response.data);
            callback(response.data);
        }).catch((e) => logout(e));
    },

    requestSignUp: (request, callback) => {
        console.log('calling requestSignUp API');
        console.log('request data = ' + request);
        axios(
            {
                url: 'account/signup/',
                method: 'post',
                data: request,
                baseURL: 'http://' + 'localhost' + ':8000',
            }
        ).then(response => {
            console.log('response data: ' + response.data);
            callback(response.data);
        }).catch(e => {
            console.log(e);
        });
    },

    requestSignIn: (request, callback) => {
        console.log('calling requestSignIn API');
        console.log('request username = ' + request['username']);
        console.log('request username = ' + request['password']);
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
    }

}


export default authAPI;
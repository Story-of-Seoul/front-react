import axios from "axios";
import {logout} from "../modules/auth";


const authAPI = {
    requestAuthNumber: (email, callback) => {
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
    }

}


export default authAPI;
const SIGN_IN = 'auth/SIGN_IN';
const SIGN_UP = 'auth/SIGN_UP';
const LOGOUT = 'auth/LOGOUT';

export const signin = () => ({type: SIGN_IN});
export const logout = () => ({type: LOGOUT});


const initialState = {
    isLogin: false,

};

function auth(state = initialState, action) {
    switch (action.type) {
        case SIGN_IN:
            return {
                isLogin: true,
            };
        case LOGOUT:
            return {
                isLogin: false,
            };
        default:
            return state;
    }
}

export default auth;
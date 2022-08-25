const SIGN_IN = 'auth/SIGN_IN';
const LOGOUT = 'auth/LOGOUT';


export const signin = () => ({type: SIGN_IN});
export const logout = () => ({type: LOGOUT});


export const onSignIn = token => ({
    type: SIGN_IN,
    token,
});

export const onLogout = () => ({
    type: LOGOUT,
})

const initialState = {
    isLogin: false,
    token: null,
};

function auth(state = initialState, action) {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                isLogin: true,
                token: action.token,
            };
        case LOGOUT:
            return {
                ...state,
                isLogin: false,
                token: null,
            };
        default:
            return state;
    }
}

export default auth;
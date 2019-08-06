const initialState = { 
    user: null
}

export default (state = initialState, action) => {

    switch (action.type) {
        case 'LOGIN_USER' :
            return {
                user: action.user
            };
        case 'LOGOUT_USER' :
            return {
                user: null
            };
        default : 
            return state;
    }
}

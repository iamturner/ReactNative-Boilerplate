const initialState = { 
    profile: {
        location: "Belfast", 
        name: "Ian Turner", 
        photo: null
    }
}

export default (state = initialState, action) => {
    
    switch (action.type) {
        case 'UPDATE_PROFILE' :
            return {
                profile: action.profile
            }
        default : 
            return state;
    }
}

import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggingIn: false,
    isLoggedIn: false,
    userInfo: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_START:
            state.isLoggingIn = true
            return {
                ...state
            }
        case actionTypes.LOGIN_SUCCESS:
            state.isLoggingIn = false
            state.isLoggedIn = true
            state.userInfo = action.data
            return {
                ...state
            }
        case actionTypes.LOGIN_FAILED:
            state.isLoggingIn = false
            state.isLoggedIn = false
            state.userInfo = {}
            return {
                ...state
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        default:
            return state;
    }
}

export default userReducer;
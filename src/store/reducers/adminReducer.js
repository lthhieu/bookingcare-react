import { flatMap } from 'lodash';
import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    isLoadingRole: false,
    isLoadingPosition: false,
    isCreatingNewUserRedux: false,
    isFetchingUsers: false,
    isDeletingUserRedux: false,
    isUpdatingUserRedux: false,
    genders: [],
    roles: [],
    positions: [],
    users: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data
            state.isLoadingGender = false
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.genders = []
            state.isLoadingGender = false
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_START:
            state.isLoadingRole = true
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data
            state.isLoadingRole = false
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = []
            state.isLoadingRole = false
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_START:
            state.isLoadingPosition = true
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data
            state.isLoadingPosition = false
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = []
            state.isLoadingPosition = false
            return {
                ...state
            }
        case actionTypes.ADD_NEW_USER_REDUX_START:
            state.isCreatingNewUserRedux = true
            return {
                ...state
            }
        case actionTypes.ADD_NEW_USER_REDUX_SUCCESS:
            state.isCreatingNewUserRedux = false
            state.emailExist = false
            return {
                ...state
            }
        case actionTypes.ADD_NEW_USER_REDUX_FAILED:
            state.isCreatingNewUserRedux = false
            return {
                ...state
            }
        case actionTypes.FETCH_USERS_START:
            state.isFetchingUsers = true
            return {
                ...state
            }
        case actionTypes.FETCH_USERS_SUCCESS:
            state.users = action.data
            state.isFetchingUsers = false
            return {
                ...state
            }
        case actionTypes.FETCH_USERS_FAILED:
            state.users = []
            state.isFetchingUsers = false
            return {
                ...state
            }
        case actionTypes.DELETE_USERS_START:
            state.isDeletingUserRedux = true
            return {
                ...state
            }
        case actionTypes.DELETE_USERS_SUCCESS:

            state.isDeletingUserRedux = false
            return {
                ...state
            }
        case actionTypes.DELETE_USERS_FAILED:
            state.isDeletingUserRedux = false
            return {
                ...state
            }
        case actionTypes.UPDATE_USERS_START:
            state.isUpdatingUserRedux = true
            return {
                ...state
            }
        case actionTypes.UPDATE_USERS_SUCCESS:
            state.isUpdatingUserRedux = false
            return {
                ...state
            }
        case actionTypes.UPDATE_USERS_FAILED:
            state.isUpdatingUserRedux = false
            return {
                ...state
            }
        default:
            return state;
    }
}

export default adminReducer;
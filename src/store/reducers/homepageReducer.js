import { flatMap } from 'lodash';
import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingDoctors: false,
    doctors: []
}

const homepageReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_DOCTORS_START:
            state.isLoadingDoctors = true
            return {
                ...state
            }
        case actionTypes.LOAD_DOCTORS_SUCCESS:
            state.doctors = action.data
            state.isLoadingDoctors = false
            return {
                ...state
            }
        case actionTypes.LOAD_DOCTORS_FAILED:
            state.doctors = []
            state.isLoadingDoctors = false
            return {
                ...state
            }
        default:
            return state;
    }
}

export default homepageReducer;
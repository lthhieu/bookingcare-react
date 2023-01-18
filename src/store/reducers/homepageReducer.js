import { flatMap } from 'lodash';
import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingDoctors: false,
    doctors: [],
    isLoadingDoctorDetailInfo: false,
    doctorDetailInfo: []
}

const homepageReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_DOCTOR_HOME_START:
            state.isLoadingDoctors = true
            return {
                ...state
            }
        case actionTypes.FETCH_DOCTOR_HOME_SUCCESS:
            state.doctors = action.data
            state.isLoadingDoctors = false
            return {
                ...state
            }
        case actionTypes.FETCH_DOCTOR_HOME_FAILED:
            state.doctors = []
            state.isLoadingDoctors = false
            return {
                ...state
            }
        case actionTypes.FETCH_DOCTOR_DETAIL_INFO_BY_ID_START:
            state.isLoadingDoctorDetailInfo = true
            return {
                ...state
            }
        case actionTypes.FETCH_DOCTOR_DETAIL_INFO_BY_ID_SUCCESS:
            state.doctorDetailInfo = action.data
            state.isLoadingDoctorDetailInfo = false
            return {
                ...state
            }
        case actionTypes.FETCH_DOCTOR_DETAIL_INFO_BY_ID_FAILED:
            state.doctorDetailInfo = []
            state.isLoadingDoctorDetailInfo = false
            return {
                ...state
            }
        default:
            return state;
    }
}

export default homepageReducer;
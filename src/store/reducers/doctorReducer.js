import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingNameDoctors: false,
    nameDoctors: [],
    isCreatingOrUpdatingDoctorInfo: false,
    isLoadingTime: false,
    times: [],
    isCreatingBulkSchedule: false,
    success: false
}

const doctorReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_DOCTOR_NAME_START:
            state.isLoadingNameDoctors = true
            return {
                ...state
            }
        case actionTypes.GET_DOCTOR_NAME_SUCCESS:
            state.nameDoctors = action.data
            state.isLoadingNameDoctors = false
            return {
                ...state
            }
        case actionTypes.GET_DOCTOR_NAME_FAILED:
            state.nameDoctors = []
            state.isLoadingNameDoctors = false
            return {
                ...state
            }
        case actionTypes.CREATE_OR_UPDATE_DOCTOR_INFO_START:
            state.isCreatingOrUpdatingDoctorInfo = true
            return {
                ...state
            }
        case actionTypes.CREATE_OR_UPDATE_DOCTOR_INFO_SUCCESS:
            state.isCreatingOrUpdatingDoctorInfo = false
            return {
                ...state
            }
        case actionTypes.CREATE_OR_UPDATE_DOCTOR_INFO_FAILED:
            state.isCreatingOrUpdatingDoctorInfo = false
            return {
                ...state
            }
        case actionTypes.FETCH_TIME_START:
            state.isLoadingTime = true
            return {
                ...state
            }
        case actionTypes.FETCH_TIME_SUCCESS:
            state.times = action.data
            state.isLoadingTime = false
            return {
                ...state
            }
        case actionTypes.FETCH_TIME_FAILED:
            state.times = []
            state.isLoadingTime = false
            return {
                ...state
            }
        case actionTypes.CREATE_BULK_SCHEDULE_START:
            state.isCreatingBulkSchedule = true
            state.success = false
            return {
                ...state
            }
        case actionTypes.CREATE_BULK_SCHEDULE_SUCCESS:
            state.isCreatingBulkSchedule = false
            state.success = true
            return {
                ...state
            }
        case actionTypes.CREATE_BULK_SCHEDULE_FAILED:
            state.isCreatingBulkSchedule = false
            state.success = false
            return {
                ...state
            }
        default:
            return state;
    }
}

export default doctorReducer;
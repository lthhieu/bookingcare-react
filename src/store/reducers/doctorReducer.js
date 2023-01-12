import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingNameDoctors: false,
    nameDoctors: [],
    isCreatingDoctorInfo: false
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
        case actionTypes.CREATE_DOCTOR_INFO_START:
            state.isCreatingDoctorInfo = true
            return {
                ...state
            }
        case actionTypes.CREATE_DOCTOR_INFO_SUCCESS:
            state.isCreatingDoctorInfo = false
            return {
                ...state
            }
        case actionTypes.CREATE_DOCTOR_INFO_FAILED:
            state.isCreatingDoctorInfo = false
            return {
                ...state
            }
        default:
            return state;
    }
}

export default doctorReducer;
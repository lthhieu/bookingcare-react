import actionTypes from '../actions/actionTypes';

const initialState = {
    isFetchingGender: false,
    genders: [],
    isCreatingAppointment: false,
    isVerifyBookingAppointment: false
}

const patientReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isFetchingGender = true
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data
            state.isFetchingGender = false
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.genders = []
            state.isFetchingGender = false
            return {
                ...state
            }

        case actionTypes.CREATE_APPOINTMENT_START:
            state.isCreatingAppointment = true
            return {
                ...state
            }
        case actionTypes.CREATE_APPOINTMENT_SUCCESS:
            state.isCreatingAppointment = false
            return {
                ...state
            }
        case actionTypes.CREATE_APPOINTMENT_FAILED:
            state.isCreatingAppointment = false
            return {
                ...state
            }
        case actionTypes.VERIFY_BOOKING_APPOINTMENT_START:
            state.isVerifyBookingAppointment = true
            return {
                ...state
            }
        case actionTypes.VERIFY_BOOKING_APPOINTMENT_SUCCESS:
            state.isVerifyBookingAppointment = false
            return {
                ...state
            }
        case actionTypes.VERIFY_BOOKING_APPOINTMENT_FAILED:
            state.isVerifyBookingAppointment = false
            return {
                ...state
            }
        default:
            return state;
    }
}

export default patientReducer
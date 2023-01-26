import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingNameDoctors: false,
    nameDoctors: [],
    isCreatingOrUpdatingDoctorInfo: false,
    isLoadingTime: false,
    times: [],
    isCreatingBulkSchedule: false,
    success: false,
    isFetchingScheduleDoctor: false,
    doctorSchedule: [],
    isFetchingDoctorInfoFromDoctorInfosTable: false,
    doctorInfoFromDoctorInfosTable: [],
    isFetchingDoctorInfo: false,
    doctorInfo: [],
    isFetchingDoctorDetail: false,
    doctorDetail: [],
    isfetchingDoctorProfile: false,
    doctorProfile: []
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
        case actionTypes.FETCH_SCHEDULE_DOCTOR_START:
            state.isFetchingScheduleDoctor = true
            return {
                ...state
            }
        case actionTypes.FETCH_SCHEDULE_DOCTOR_SUCCESS:
            state.doctorSchedule = action.data
            state.isFetchingScheduleDoctor = false
            return {
                ...state
            }
        case actionTypes.FETCH_SCHEDULE_DOCTOR_FAILED:
            state.doctorSchedule = []
            state.isFetchingScheduleDoctor = false
            return {
                ...state
            }

        case actionTypes.FETCH_DOCTOR_INFO_FROM_DOCTOR_INFOS_TABLE_START:
            state.isFetchingDoctorInfoFromDoctorInfosTable = true
            return {
                ...state
            }
        case actionTypes.FETCH_DOCTOR_INFO_FROM_DOCTOR_INFOS_TABLE_SUCCESS:
            state.doctorInfoFromDoctorInfosTable = action.data
            state.isFetchingDoctorInfoFromDoctorInfosTable = false
            return {
                ...state
            }
        case actionTypes.FETCH_DOCTOR_INFO_FROM_DOCTOR_INFOS_TABLE_FAILED:
            state.doctorInfoFromDoctorInfosTable = []
            state.isFetchingDoctorInfoFromDoctorInfosTable = false
            return {
                ...state
            }

        case actionTypes.FETCH_DOCTOR_INFO_START:
            state.isFetchingDoctorInfo = true
            return {
                ...state
            }
        case actionTypes.FETCH_DOCTOR_INFO_SUCCESS:
            state.doctorInfo = action.data
            state.isFetchingDoctorInfo = false
            return {
                ...state
            }
        case actionTypes.FETCH_DOCTOR_INFO_FAILED:
            state.doctorInfo = []
            state.isFetchingDoctorInfo = false
            return {
                ...state
            }

        case actionTypes.FETCH_DOCTOR_DETAIL_START:
            state.isFetchingDoctorDetail = true
            return {
                ...state
            }
        case actionTypes.FETCH_DOCTOR_DETAIL_SUCCESS:
            state.doctorDetail = action.data
            state.isFetchingDoctorDetail = false
            return {
                ...state
            }
        case actionTypes.FETCH_DOCTOR_DETAIL_FAILED:
            state.doctorDetail = []
            state.isFetchingDoctorDetail = false
            return {
                ...state
            }

        case actionTypes.FETCH_DOCTOR_PROFILE_START:
            state.isfetchingDoctorProfile = true
            return {
                ...state
            }
        case actionTypes.FETCH_DOCTOR_PROFILE_SUCCESS:
            state.doctorProfile = action.data
            state.isfetchingDoctorProfile = false
            return {
                ...state
            }
        case actionTypes.FETCH_DOCTOR_PROFILE_FAILED:
            state.doctorProfile = []
            state.isfetchingDoctorProfile = false
            return {
                ...state
            }
        default:
            return state;
    }
}

export default doctorReducer;
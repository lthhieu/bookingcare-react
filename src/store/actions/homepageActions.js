import actionTypes from './actionTypes';
import * as services from '../../services'

export const fetchDoctorHomeStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_DOCTOR_HOME_START
            })
            let res = await services.fetchDoctorHomeService('')
            if (res && res.errCode === '0') {
                dispatch(fetchDoctorHomeSuccess(res.data))
            } else {
                dispatch(fetchDoctorHomeFailed())
            }
        } catch (e) {
            console.log('fetchDoctorHomeStart error:', e)
        }
    }
}
export const fetchDoctorHomeSuccess = (data) => ({
    type: actionTypes.FETCH_DOCTOR_HOME_SUCCESS,
    data
})
export const fetchDoctorHomeFailed = () => ({
    type: actionTypes.FETCH_DOCTOR_HOME_FAILED
})

export const fetchDoctorDetailInfoByIDStart = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_DOCTOR_DETAIL_INFO_BY_ID_START
            })
            let res = await services.fetchDoctorDetailInfoByIDService(id)
            if (res && res.errCode === '0') {
                dispatch(fetchDoctorDetailInfoByIDSuccess(res.data))
            } else {
                dispatch(fetchDoctorDetailInfoByIDFailed())
            }
        } catch (e) {
            console.log('fetchDoctorDetailInfoByIDStart error:', e)
        }
    }
}
export const fetchDoctorDetailInfoByIDSuccess = (data) => ({
    type: actionTypes.FETCH_DOCTOR_DETAIL_INFO_BY_ID_SUCCESS,
    data
})
export const fetchDoctorDetailInfoByIDFailed = () => ({
    type: actionTypes.FETCH_DOCTOR_DETAIL_INFO_BY_ID_FAILED
})



import actionTypes from './actionTypes';
import * as services from '../../services'

export const loadDoctorsStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.LOAD_DOCTORS_START
            })
            let res = await services.loadDoctorsService('')
            if (res && res.errCode === '0') {
                dispatch(loadDoctorsSuccess(res.data))
            } else {
                dispatch(loadDoctorsFailed())
            }
        } catch (e) {
            console.log('loadDoctorsStart error:', e)
        }
    }
}
export const loadDoctorsSuccess = (data) => ({
    type: actionTypes.LOAD_DOCTORS_SUCCESS,
    data
})
export const loadDoctorsFailed = () => ({
    type: actionTypes.LOAD_DOCTORS_FAILED
})



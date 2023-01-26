import actionTypes from './actionTypes';
import * as services from '../../services'
import { toast } from 'react-toastify';
import * as utils from '../../utils'
import { FormattedMessage } from 'react-intl'

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await services.getAllCodeService('gender')
            if (res && res.errCode === '0') {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed())
            }
        } catch (e) {
            console.log('fetchGenderStart error:', e)
        }
    }
}
export const fetchGenderSuccess = (data) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const createAppointmentStart = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.CREATE_APPOINTMENT_START
            })
            let res = await services.createAppointmentService(data)
            if (res && res.errCode === '0') {
                dispatch(createAppointmentSuccess())
                toast.success(<FormattedMessage id='modal-booking.toast1' />)
                utils.emitter.emit('CLOSE MODAL')

            } else {
                if (res.msg === 'This appointment is existed') {
                    toast.error(<FormattedMessage id='modal-booking.toast3' />)
                } else {
                    toast.error(<FormattedMessage id='modal-booking.toast2' />)
                }
                dispatch(createAppointmentFailed())
            }
        } catch (e) {
            console.log('createAppointmentStart error:', e)
        }
    }
}
export const createAppointmentSuccess = () => ({
    type: actionTypes.CREATE_APPOINTMENT_SUCCESS
})
export const createAppointmentFailed = () => ({
    type: actionTypes.CREATE_APPOINTMENT_FAILED
})

export const verifyBookingAppointmentStart = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.VERIFY_BOOKING_APPOINTMENT_START
            })
            let res = await services.verifyBookingService(data)
            if (res && res.errCode === '0') {
                dispatch(verifyBookingAppointmentSuccess())
                utils.emitter.emit('VERIFIED SUCCESSFULLY')
            } else {
                if (res.msg === 'This appointment is confirmed or is not existed') {
                    utils.emitter.emit('THE APPOINTMENT IS NOT EXISTED')
                }
                dispatch(verifyBookingAppointmentFailed())
            }
        } catch (e) {
            console.log('verifyBookingAppointmentStart error:', e)
        }
    }
}
export const verifyBookingAppointmentSuccess = () => ({
    type: actionTypes.VERIFY_BOOKING_APPOINTMENT_SUCCESS
})
export const verifyBookingAppointmentFailed = () => ({
    type: actionTypes.VERIFY_BOOKING_APPOINTMENT_FAILED
})
import axios from '../axios';

export const createAppointmentService = (data) => {
    return axios.post('api/create-appointment', data)
}
export const verifyBookingService = (data) => {
    return axios.post('api/verify-booking', data)
}
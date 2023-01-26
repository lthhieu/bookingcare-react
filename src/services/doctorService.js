import axios from '../axios';

export const getNameAllDoctorsService = (id) => {
    return axios.get('api/get-name-all-doctors', { params: { id } })
}
export const createOrUpdateDoctorInfoService = (data) => {
    return axios.post('api/create-or-update-doctor-info', data)
}

export const bulkCreateScheduleService = (data) => {
    return axios.post('api/bulk-create-schedule', data)
}

export const fetchDoctorScheduleService = (doctorId, date) => {
    return axios.get('api/fetch-doctor-schedule', { params: { doctorId, date } })
}
export const fetchDoctorInfoService = (doctorId) => {
    return axios.get('api/fetch-doctor-info', { params: { doctorId } })
}

export const fetchDoctorDetailService = (doctorId) => {
    return axios.get('api/fetch-doctor-detail', { params: { doctorId } })
}
export const fetchDoctorProfileService = (id) => {
    return axios.get('api/fetch-doctor-profile', { params: { id } })
}
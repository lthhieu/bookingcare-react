import axios from '../axios';

export const fetchSpecialtyHomeService = (limit) => {
    return axios.get('api/fetch-specialty-home', { params: { limit } })
}
export const fetchDoctorHomeService = (limit) => {
    return axios.get('api/fetch-doctor-home', { params: { limit } })
}
export const fetchDoctorDetailInfoByIDService = (id) => {
    return axios.get('api/fetch-doctor-detail-info-by-id', { params: { id } })
}
import axios from '../axios';

export const createSpecialtyService = (data) => {
    return axios.post('api/create-specialty', data)
}
export const fetchAllNameSpecialtiesService = (id) => {
    return axios.get('api/fetch-all-name-specialties', { params: { id } })
}
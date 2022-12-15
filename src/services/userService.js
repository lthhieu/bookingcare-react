import axios from '../axios';

export const handleLoginApi = (email, password) => {
    return axios.post('api/login', { email, password })
}

export const getAllUsers = (id) => {
    return axios.get('api/get-all-users', { params: { id } })
}
export const createNewUser = (data) => {
    return axios.post('api/create-new-users', data)
}
export const deleteUser = (id) => {
    return axios.delete('api/delete-users', { data: { id } })
}
export const updateUser = (data) => {
    return axios.put('api/update-users', data)
}
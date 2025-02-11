import axios from './axios'

export const registerRequest = user => axios.post(`/registro`, user)

export const loginRequest = user => axios.post(`/inicio`, user)
// export const logoutRequest = () => axios.post(`/logout`)

export const verifyTokenRequest = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return Promise.reject(new Error('No token found'));
    }

    return axios.get('/verify', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
import axios from './axios'

export const registerRequest = user => axios.post(`/registro`, user)

export const loginRequest = user => axios.post(`/inicio`, user)

export const verifyTokenRequest = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    return axios.get('/verify', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
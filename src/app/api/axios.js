import axios from "axios";

const instance = axios.create({
    baseURL:'http://localhost:3000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    }
})

export default instance;
import axios from 'axios';

const BASE_URL = import.meta.env.DEV === "development" ? 'http://localhost:3000/api' : "/api"


export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Include credentials for CORS requests. Cookies will be sent with requests.
})
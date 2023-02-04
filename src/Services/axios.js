import axios from 'axios';

// const BASE_URL = 'https://api.ayawma.com'
const BASE_URL = 'http://localhost:3001'

export default axios.create({
    baseURL: BASE_URL,
    origin: true,
    headers: {'Content-Type': 'application/json' }, 
    withCredentials: true
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true
})

export const prueba = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'multipart/form-data'},
    withCredentials: true
});
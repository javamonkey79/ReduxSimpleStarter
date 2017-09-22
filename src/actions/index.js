import axios from 'axios';
import {SubmissionError} from 'redux-form';

export const FETCH_STOCK = 'FETCH_STOCK';

const API_KEY = 'SMOFPFR1SLKY3BXH'
// const API_KEY = '9ECHBXC1QW0LW4SF';
const ROOT_URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY';
// const ROOT_URL = 'https://qjml60b3v4.execute-api.us-east-1.amazonaws.com/prod/stock?foo=bar'

axios.interceptors.request.use(request => {
    console.time("fetchStock");
    console.log('Request:', request)
    return request
});

axios.interceptors.response.use(response => {
    console.timeEnd("fetchStock");
    console.log('Response:', response)
    return response
});

export function fetchStock(symbol) {
    let request = axios.get(`${ROOT_URL}&symbol=${symbol}&apikey=${API_KEY}`)

    return {
        type: FETCH_STOCK,
        payload: request
    }
}
import axios from 'axios';
const API_KEY = 'c3a0230a29573eb04da99d723ab7aac5';

export const FETCH_WEATHER = 'FETCH_WEATHER';

const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export function fetchWeather(city){
    const url = `${ROOT_URL}&q=${city},US`
    const request = axios.get(url);

    return {
        type: FETCH_WEATHER,
        payload: request
    };
}
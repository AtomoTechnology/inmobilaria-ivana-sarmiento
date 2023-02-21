import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;
// const baseURL = 'https://bio.hilairemesseroux.com/api/v1';
// const baseURL = 'https://vps-1387733-x.dattaweb.com:3003/api/v1';
console.log(localStorage.getItem(import.meta.env.VITE_HASH_USER_LOCAL_HOST));
const http = axios.create({
  baseURL,
  headers: {
    'Content-type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem(import.meta.env.VITE_HASH_USER_LOCAL_HOST) || '',
    // sometimes thr token come null TODO::
  },
});

export default http;

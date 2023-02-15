import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;
// const baseURL = 'https://bio.hilairemesseroux.com/api/v1';
// const baseURL = 'https://vps-1387733-x.dattaweb.com:3003/api/v1';

const http = axios.create({
  baseURL,
  headers: {
    'Content-type': 'application/json',
  },
});

export default http;

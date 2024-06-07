import axios from 'axios';

function getCookie(name: string) {
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith(name));

  if(!cookie) {
    return null
  }

  return cookie.split('=')[1];
}

const $api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
  withCredentials: true,
});

$api.interceptors.request.use(
  (config) => {
    // This header is not used for backend but CORS requires it
    const csrfToken = getCookie('XSRF-TOKEN');

    if (csrfToken) {
      config.headers['X-XSRF-TOKEN'] = csrfToken;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default $api;

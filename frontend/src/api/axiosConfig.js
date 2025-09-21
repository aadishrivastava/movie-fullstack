import axios from 'axios';

// Detect environment
const isLocal = window.location.hostname === 'localhost';

const baseURL = isLocal 
  ? 'http://localhost:8080'  // your local backend
  : 'https://9c96-103-106-239-104.ap.ngrok.io'; // ngrok URL

const headers = isLocal
  ? {}  // no extra headers needed locally
  : { "ngrok-skip-browser-warning": "true" }; // only for ngrok

export default axios.create({
  baseURL,
  headers
});

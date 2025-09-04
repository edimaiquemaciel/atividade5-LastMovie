import axios from "axios";

const moviesUrl = import.meta.env.VITE_TMDB_BASE_URL;
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const api = axios.create({
    baseURL: moviesUrl,
    params: {
        api_key: apiKey,
    }
})

export default api
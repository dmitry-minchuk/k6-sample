import http from 'k6/http';
import { BASE_URL, ENDPOINTS, TAGS, HEADERS } from '../config.js';

export function loginUser(username, password) {
    const body = {
        username,
        password
    };

    const params = {
        headers: HEADERS.json,
        tags: TAGS.login
    };

    return http.post(`${BASE_URL}${ENDPOINTS.login}`, JSON.stringify(body), params);
}

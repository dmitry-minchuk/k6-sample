import http from 'k6/http';
import { BASE_URL, ENDPOINTS, TAGS, HEADERS } from '../config.js';

export function registerUser(username, email, password, firstName = "John", lastName = "Doe") {
    const body = {
        username,
        first_name: firstName,
        last_name: lastName,
        email,
        password
    };

    const params = {
        headers: HEADERS.json,
        tags: TAGS.register
    };

    return http.post(`${BASE_URL}${ENDPOINTS.register}`, JSON.stringify(body), params);
}

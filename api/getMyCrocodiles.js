import http from 'k6/http';
import { BASE_URL, ENDPOINTS, TAGS } from '../config.js';

export function getMyCrocodiles(token) {
    const params = {
        headers: {
            Authorization: "Bearer " + token
        },
        tags: TAGS.myCrocodiles
    };

    return http.get(`${BASE_URL}${ENDPOINTS.myCrocodiles}`, params);
}

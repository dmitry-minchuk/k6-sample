import http from 'k6/http';
import { BASE_URL, ENDPOINTS, TAGS } from '../config.js';

export function getSingleCrocodile(token, crocodileId) {
    const params = {
        headers: {
            Authorization: "Bearer " + token
        },
        tags: TAGS.singleCrocodile
    };

    return http.get(`${BASE_URL}${ENDPOINTS.myCrocodiles}${crocodileId}`, params);
}

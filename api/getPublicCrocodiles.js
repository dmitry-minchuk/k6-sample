import http from 'k6/http';
import { BASE_URL, ENDPOINTS, TAGS } from '../config.js';

export function getPublicCrocodiles() {
    return http.get(`${BASE_URL}${ENDPOINTS.crocodiles}`, {
        tags: TAGS.crocodiles
    });
}

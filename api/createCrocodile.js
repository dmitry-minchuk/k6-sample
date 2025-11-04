import http from 'k6/http';
import { randomString, randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { BASE_URL, ENDPOINTS, TAGS } from '../config.js';

export function createCrocodile(token) {
    const name = "Croc_" + randomString(8);
    const year = randomIntBetween(2000, 2020);
    const month = String(randomIntBetween(1, 12)).padStart(2, '0');
    const day = String(randomIntBetween(1, 28)).padStart(2, '0');
    const dateOfBirth = `${year}-${month}-${day}`;

    const body = {
        name,
        sex: "M",
        date_of_birth: dateOfBirth
    };

    const params = {
        headers: {
            Authorization: "Bearer " + token
        },
        tags: TAGS.createCrocodile
    };

    return http.post(`${BASE_URL}${ENDPOINTS.myCrocodiles}`, body, params);
}

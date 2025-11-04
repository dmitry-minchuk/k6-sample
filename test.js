import { group } from 'k6';
import {
    PROFILE_NORMAL,
    PROFILE_SPIKE,
    PROFILE_STRESS,
    PROFILE_SMOKE,
    PROFILE_ENDURANCE
} from './config-profiles.js';
import { getPublicCrocodiles } from './api/getPublicCrocodiles.js';
import { registerUser } from './api/registerUser.js';
import { loginUser } from './api/loginUser.js';
import { getMyCrocodiles } from './api/getMyCrocodiles.js';
import { createCrocodile } from './api/createCrocodile.js';
import { getSingleCrocodile } from './api/getSingleCrocodile.js';
import { UserGenerator } from './helpers/UserGenerator.js';
import { WaitUtil } from './helpers/WaitUtil.js';
import { ResponseValidator } from './helpers/ResponseValidator.js';

const profile = __ENV.PROFILE || 'normal';
const profileMap = {
    'normal': PROFILE_NORMAL,
    'spike': PROFILE_SPIKE,
    'stress': PROFILE_STRESS,
    'smoke': PROFILE_SMOKE,
    'endurance': PROFILE_ENDURANCE
};

export const options = profileMap[profile] || PROFILE_NORMAL;

export function setup() {
    // Pre-test initialization
    // Can be used to create pre-defined users or warm up the API
    return {
        timestamp: new Date().toISOString(),
    };
}

export function teardown(data) {
    // Post-test cleanup
    // In a real scenario, you might delete created test data here
}

export default function(data) {
    group('Public Data', () => {
        const publicCrocsRes = getPublicCrocodiles();
        ResponseValidator.validateCrocodileListResponse(publicCrocsRes, 'get public crocodiles');
        WaitUtil.randomWaitDefault();
    });

    group('Authentication', () => {
        const user = UserGenerator.generateUser();
        const registerRes = registerUser(user.username, user.email, user.password, user.firstName, user.lastName);
        ResponseValidator.validateRegisterResponse(registerRes);
        WaitUtil.randomWaitDefault();

        const loginRes = loginUser(user.username, user.password);
        ResponseValidator.validateLoginResponse(loginRes);

        if (loginRes.status !== 200) {
            throw new Error('Login failed');
        }

        const token = loginRes.json().access;
        if (!token) {
            throw new Error('No token received');
        }
        WaitUtil.randomWaitDefault();

        group('User Crocodiles', () => {
            const myCrocsRes = getMyCrocodiles(token);
            ResponseValidator.validateCrocodileListResponse(myCrocsRes, 'get my crocodiles');
            WaitUtil.randomWaitDefault();

            const createRes = createCrocodile(token);
            ResponseValidator.validateCrocodileCreateResponse(createRes);

            if (createRes.status !== 201) {
                throw new Error('Crocodile creation failed');
            }

            const crocodileId = createRes.json().id;
            if (!crocodileId) {
                throw new Error('No crocodile ID');
            }
            WaitUtil.randomWaitDefault();

            const singleCrocRes = getSingleCrocodile(token, crocodileId);
            ResponseValidator.validateCrocodileSingleResponse(singleCrocRes);

            if (singleCrocRes.status !== 200) {
                throw new Error('Get single crocodile failed');
            }
            WaitUtil.randomWaitDefault();
        });
    });
}
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

export default function() {
    // Get public crocodiles
    const publicCrocsRes = getPublicCrocodiles();
    ResponseValidator.validateCrocodileListResponse(publicCrocsRes, 'get public crocodiles');
    WaitUtil.randomWaitDefault();

    // Register new user
    const user = UserGenerator.generateUser();
    const registerRes = registerUser(user.username, user.email, user.password, user.firstName, user.lastName);
    ResponseValidator.validateRegisterResponse(registerRes);

    if (registerRes.status !== 201) {
        throw new Error(`User registration failed with status ${registerRes.status}: ${registerRes.body}`);
    }
    WaitUtil.randomWaitDefault();

    // Login user
    const loginRes = loginUser(user.username, user.password);
    ResponseValidator.validateLoginResponse(loginRes);

    if (loginRes.status !== 200) {
        throw new Error(`Login failed with status ${loginRes.status}: ${loginRes.body}`);
    }

    const token = loginRes.json().access;
    if (!token) {
        throw new Error('Login successful but no token received');
    }
    WaitUtil.randomWaitDefault();

    // Get user's crocodiles
    const myCrocsRes = getMyCrocodiles(token);
    ResponseValidator.validateCrocodileListResponse(myCrocsRes, 'get my crocodiles');
    WaitUtil.randomWaitDefault();

    // Create new crocodile
    const createRes = createCrocodile(token);
    ResponseValidator.validateCrocodileCreateResponse(createRes);

    if (createRes.status !== 201) {
        throw new Error(`Crocodile creation failed with status ${createRes.status}: ${createRes.body}`);
    }

    const crocodileId = createRes.json().id;
    if (!crocodileId) {
        throw new Error('Crocodile created but no ID received');
    }
    WaitUtil.randomWaitDefault();

    // Get single crocodile by ID
    const singleCrocRes = getSingleCrocodile(token, crocodileId);
    ResponseValidator.validateCrocodileSingleResponse(singleCrocRes);

    if (singleCrocRes.status !== 200) {
        throw new Error(`Get single crocodile failed with status ${singleCrocRes.status}: ${singleCrocRes.body}`);
    }
    WaitUtil.randomWaitDefault();
}
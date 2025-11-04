import { OPTIONS } from './config.js';
import { getPublicCrocodiles } from './api/getPublicCrocodiles.js';
import { registerUser } from './api/registerUser.js';
import { loginUser } from './api/loginUser.js';
import { getMyCrocodiles } from './api/getMyCrocodiles.js';
import { createCrocodile } from './api/createCrocodile.js';
import { getSingleCrocodile } from './api/getSingleCrocodile.js';
import { UserGenerator } from './helpers/UserGenerator.js';
import { WaitUtil } from './helpers/WaitUtil.js';

export const options = OPTIONS;

export default function() {
    // Just test /get
    getPublicCrocodiles();
    WaitUtil.randomWaitDefault();

    // Testing user registration endpoint
    const user = UserGenerator.generateUser();
    registerUser(user.username, user.email, user.password, user.firstName, user.lastName);
    WaitUtil.randomWaitDefault();

    // Testing login
    const loginRes = loginUser(user.username, user.password);
    const token = loginRes.json().access;

    // Getting authorised crocodiles
    getMyCrocodiles(token);
    WaitUtil.randomWaitDefault();

    // Creating crocodile
    const createRes = createCrocodile(token);
    const crocodileId = createRes.json().id;
    WaitUtil.randomWaitDefault();

    // Get croc by Id
    getSingleCrocodile(token, crocodileId);
    WaitUtil.randomWaitDefault();
}
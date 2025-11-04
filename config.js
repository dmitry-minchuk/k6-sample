export const BASE_URL = 'http://localhost:8000';

// Пути API
const PATHS = {
    publicCrocodiles: 'GET_/public/crocodiles/',
    register: 'POST_/user/register/',
    login: 'POST_/auth/token/login/',
    getMyCrocodiles: 'GET_/my/crocodiles/',
    createCrocodile: 'POST_/my/crocodiles/',
    singleCrocodile: 'GET_/my/crocodiles/id',
};

export const ENDPOINTS = {
    crocodiles: '/public/crocodiles/',
    register: '/user/register/',
    login: '/auth/token/login/',
    myCrocodiles: '/my/crocodiles/',
};

export const TAGS = {
    crocodiles: { page: PATHS.publicCrocodiles },
    register: { page: PATHS.register },
    login: { page: PATHS.login },
    getMyCrocodiles: { page: PATHS.getMyCrocodiles },
    createCrocodile: { page: PATHS.createCrocodile },
    singleCrocodile: { page: PATHS.singleCrocodile },
};

export const OPTIONS = {
    stages: [
        {
            duration: '10s',
            target: 10
        },
        {
            duration: '30s',
            target: 10,
        },
        {
            duration: '15s',
            target: 0
        }
    ],
    thresholds: {
        http_req_duration: ['p(95)<200'],
        'http_req_duration{status:200}': ['p(95)<200'],
        http_req_failed: ['rate<0.01'],
        http_reqs: ['count>10', 'rate>1'],
        checks: ['rate===1.00'],
        [`http_req_duration{page:${PATHS.publicCrocodiles}}`]: ['p(95)<300'],
        [`http_req_duration{page:${PATHS.register}}`]: ['p(95)<250'],
        [`http_req_duration{page:${PATHS.login}}`]: ['p(95)<200'],
        [`http_req_duration{page:${PATHS.getMyCrocodiles}}`]: ['p(95)<200'],
        [`http_req_duration{page:${PATHS.createCrocodile}}`]: ['p(95)<200'],
        [`http_req_duration{page:${PATHS.singleCrocodile}}`]: ['p(95)<200'],
    }
};

export const HEADERS = {
    json: { 'Content-Type': 'application/json' },
};

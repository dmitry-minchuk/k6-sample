export const BASE_URL = 'http://localhost:8000';

// Пути API
const PATHS = {
    publicCrocodiles: '/public/crocodiles/',
    register: '/user/register/',
    login: '/auth/token/login/',
    myCrocodiles: '/my/crocodiles/',
    singleCrocodile: '/my/crocodiles/id',
};

export const ENDPOINTS = {
    crocodiles: PATHS.publicCrocodiles,
    register: PATHS.register,
    login: PATHS.login,
    myCrocodiles: PATHS.myCrocodiles,
};

export const TAGS = {
    crocodiles: { page: PATHS.publicCrocodiles },
    register: { page: PATHS.register },
    login: { page: PATHS.login },
    myCrocodiles: { page: PATHS.myCrocodiles },
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
        [`http_req_duration{page:${PATHS.singleCrocodile}}`]: ['p(95)<200'],
    }
};

export const HEADERS = {
    json: { 'Content-Type': 'application/json' },
};

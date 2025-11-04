export const BASE_URL = __ENV.BASE_URL || 'http://localhost:8000';

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
    thresholds: {
        // Global thresholds
        http_req_duration: ['p(95)<500'],                          // 500ms for all requests
        'http_req_duration{status:200}': ['p(95)<300'],           // 300ms for successful responses
        'http_req_duration{status:201}': ['p(95)<300'],           // 300ms for creation responses
        http_req_failed: ['rate<0.05'],                             // Less than 5% failure rate
        http_reqs: ['count>100'],                                   // At least 100 requests total
        checks: ['rate>0.95'],                                      // 95% of checks should pass

        // Endpoint-specific thresholds (more realistic)
        [`http_req_duration{page:${PATHS.publicCrocodiles}}`]: ['p(95)<300'],  // GET - fast read
        [`http_req_duration{page:${PATHS.register}}`]: ['p(95)<500'],          // POST - slower due to validation
        [`http_req_duration{page:${PATHS.login}}`]: ['p(95)<400'],             // POST - auth operations slower
        [`http_req_duration{page:${PATHS.getMyCrocodiles}}`]: ['p(95)<300'],   // GET - fast read
        [`http_req_duration{page:${PATHS.createCrocodile}}`]: ['p(95)<500'],   // POST - slower, creates data
        [`http_req_duration{page:${PATHS.singleCrocodile}}`]: ['p(95)<300'],   // GET - fast read
    }
};

export const HEADERS = {
    json: { 'Content-Type': 'application/json' },
};

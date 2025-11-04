import { check } from 'k6';

export class ResponseValidator {
    static validateStatus(response, expectedStatus, testName) {
        return check(response, {
            [`${testName} - status is ${expectedStatus}`]: r => r.status === expectedStatus,
        });
    }

    static validateJSON(response, testName) {
        return check(response, {
            [`${testName} - response is valid JSON`]: r => {
                try {
                    r.json();
                    return true;
                } catch {
                    return false;
                }
            },
        });
    }

    static validateFieldExists(response, field, testName) {
        return check(response, {
            [`${testName} - ${field} exists`]: r => {
                try {
                    return r.json(field) !== null && r.json(field) !== undefined;
                } catch {
                    return false;
                }
            },
        });
    }

    static validateFieldNotEmpty(response, field, testName) {
        return check(response, {
            [`${testName} - ${field} is not empty`]: r => {
                try {
                    const value = r.json(field);
                    return value !== null && value !== undefined && value !== '';
                } catch {
                    return false;
                }
            },
        });
    }

    static validateStatusAndJSON(response, expectedStatus, testName) {
        const statusCheck = this.validateStatus(response, expectedStatus, testName);
        const jsonCheck = this.validateJSON(response, testName);
        return statusCheck && jsonCheck;
    }

    static validateLoginResponse(response) {
        return check(response, {
            'login - status is 200': r => r.status === 200,
            'login - response is valid JSON': r => {
                try {
                    r.json();
                    return true;
                } catch {
                    return false;
                }
            },
            'login - access token exists': r => r.json('access') !== null && r.json('access') !== undefined,
            'login - access token is not empty': r => r.json('access') !== '',
        });
    }

    static validateRegisterResponse(response) {
        // Handle specific error cases
        if (response.status === 409) {
            throw new Error('User already exists');
        }
        if (response.status === 404) {
            throw new Error('Register endpoint not found');
        }
        if (response.status !== 201) {
            throw new Error(`Register failed with status ${response.status}`);
        }

        return check(response, {
            'register - status is 201': r => r.status === 201,
            'register - response is valid JSON': r => {
                try {
                    r.json();
                    return true;
                } catch {
                    return false;
                }
            },
            'register - username exists': r => r.json('username') !== null && r.json('username') !== undefined,
        });
    }

    static validateCrocodileListResponse(response, testName) {
        return check(response, {
            [`${testName} - status is 200`]: r => r.status === 200,
            [`${testName} - response is valid JSON`]: r => {
                try {
                    r.json();
                    return true;
                } catch {
                    return false;
                }
            },
        });
    }

    static validateCrocodileCreateResponse(response) {
        return check(response, {
            'create crocodile - status is 201': r => r.status === 201,
            'create crocodile - response is valid JSON': r => {
                try {
                    r.json();
                    return true;
                } catch {
                    return false;
                }
            },
            'create crocodile - id exists': r => r.json('id') !== null && r.json('id') !== undefined,
            'create crocodile - name exists': r => r.json('name') !== null && r.json('name') !== undefined,
        });
    }

    static validateCrocodileSingleResponse(response) {
        return check(response, {
            'get crocodile - status is 200': r => r.status === 200,
            'get crocodile - response is valid JSON': r => {
                try {
                    r.json();
                    return true;
                } catch {
                    return false;
                }
            },
            'get crocodile - id exists': r => r.json('id') !== null && r.json('id') !== undefined,
            'get crocodile - name exists': r => r.json('name') !== null && r.json('name') !== undefined,
        });
    }
}

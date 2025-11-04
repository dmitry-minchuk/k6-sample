import { OPTIONS as BASE_OPTIONS } from './config.js';

/**
 * Normal load profile: gradual ramp-up
 */
export const PROFILE_NORMAL = {
    ...BASE_OPTIONS,
    stages: [
        { duration: '10s', target: 10 },
        { duration: '30s', target: 10 },
        { duration: '15s', target: 0 }
    ]
};

/**
 * Spike test: sudden spike in traffic
 */
export const PROFILE_SPIKE = {
    ...BASE_OPTIONS,
    stages: [
        { duration: '5s', target: 10 },
        { duration: '5s', target: 50 },  // Sudden spike
        { duration: '20s', target: 50 },
        { duration: '5s', target: 0 }
    ]
};

/**
 * Stress test: high constant load
 */
export const PROFILE_STRESS = {
    ...BASE_OPTIONS,
    stages: [
        { duration: '10s', target: 50 },
        { duration: '30s', target: 100 },  // High load
        { duration: '10s', target: 0 }
    ]
};

/**
 * Smoke test: minimal load, quick check
 */
export const PROFILE_SMOKE = {
    ...BASE_OPTIONS,
    stages: [
        { duration: '30s', target: 2 }
    ]
};

/**
 * Endurance test: moderate load for long time
 */
export const PROFILE_ENDURANCE = {
    ...BASE_OPTIONS,
    stages: [
        { duration: '30s', target: 20 },
        { duration: '300s', target: 20 },  // 5 minutes
        { duration: '30s', target: 0 }
    ]
};

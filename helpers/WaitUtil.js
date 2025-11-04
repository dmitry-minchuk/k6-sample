import { sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export class WaitUtil {
    // Predefined wait profiles for different scenarios
    static WAIT_PROFILES = {
        SHORT: { min: 100, max: 300 },        // Very fast user interactions
        NORMAL: { min: 500, max: 1500 },     // Default user thinking time
        MEDIUM: { min: 1000, max: 2000 },    // Moderate user thinking time
        LONG: { min: 2000, max: 5000 },      // Long user thinking time
        MINIMAL: { min: 0, max: 100 },       // Stress test - minimal wait
    };

    static randomWait(minMs, maxMs) {
        if (minMs < 0 || maxMs < 0) {
            throw new Error('Wait times must be non-negative');
        }
        if (minMs > maxMs) {
            throw new Error('minMs cannot be greater than maxMs');
        }

        const randomMs = randomIntBetween(minMs, maxMs);
        const randomSeconds = randomMs / 1000;
        sleep(randomSeconds);
    }

    static randomWaitByProfile(profile) {
        if (!this.WAIT_PROFILES[profile]) {
            throw new Error(`Unknown wait profile: ${profile}`);
        }
        const { min, max } = this.WAIT_PROFILES[profile];
        this.randomWait(min, max);
    }

    static randomWaitDefault() {
        this.randomWaitByProfile('NORMAL');
    }

    static randomWaitShort() {
        this.randomWaitByProfile('SHORT');
    }

    static randomWaitLong() {
        this.randomWaitByProfile('LONG');
    }

    static randomWaitMinimal() {
        this.randomWaitByProfile('MINIMAL');
    }
}

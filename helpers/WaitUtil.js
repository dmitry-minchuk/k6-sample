import { sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export class WaitUtil {
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

    static randomWaitDefault() {
        this.randomWait(500, 1500);
    }
}

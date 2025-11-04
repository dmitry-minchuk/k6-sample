export class Logger {
    static log(message) {
        console.log(`[INFO] ${message}`);
    }

    static error(message) {
        console.error(`[ERROR] ${message}`);
    }

    static warn(message) {
        console.warn(`[WARN] ${message}`);
    }

    static debug(message) {
        console.debug(`[DEBUG] ${message}`);
    }

    static logResponse(testName, response) {
        if (response.status >= 400) {
            this.error(`${testName}: Status ${response.status}`);
            this.debug(`${testName} Response Body: ${response.body}`);
        } else {
            this.log(`${testName}: Status ${response.status} OK`);
        }
    }

    static logRequest(method, url, testName) {
        this.debug(`${testName}: ${method} ${url}`);
    }

    static logScenarioStart(scenarioName) {
        this.log(`========== Starting scenario: ${scenarioName} ==========`);
    }

    static logScenarioEnd(scenarioName) {
        this.log(`========== Completed scenario: ${scenarioName} ==========`);
    }

    static logError(testName, status, body) {
        this.error(`${testName} failed with status ${status}`);
        this.debug(`Response: ${body}`);
    }
}

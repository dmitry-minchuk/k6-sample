# K6 Load Testing Sample

A sample project demonstrating load testing with k6, featuring API tests for a crocodile management system.

## Project Structure

- `api/` - API request modules
  - `loginUser.js` - User login endpoint
  - `registerUser.js` - User registration endpoint
  - `createCrocodile.js` - Create crocodile endpoint
  - `getPublicCrocodiles.js` - Get public crocodiles endpoint
  - `getMyCrocodiles.js` - Get user's crocodiles endpoint
  - `getSingleCrocodile.js` - Get single crocodile endpoint

- `helpers/` - Utility modules
  - `UserGenerator.js` - Generate test users
  - `WaitUtil.js` - Utility functions for waiting

- `csv-user-generator/` - CSV data generation
  - `generate-credentials.js` - Generate user credentials

- `grafana/` - Grafana dashboards configuration
  - `provisioning/dashboards/` - Dashboard definitions

- `config.js` - Configuration file
- `test.js` - Main test file

## Setup

Install dependencies:
```bash
npm install
```

Configure your settings in `config.js`.

### Local Test API Setup

The k6 public test API (test-api.k6.io) has been retired. To run this project, you need to set up the test API locally using Docker:

1. Download and install Docker Desktop.

2. Extract the `k6-test-api.zip` file included in this project.

3. Open a terminal inside the extracted directory.

4. Start the API (may take 5 minutes on first run):
```bash
docker compose up -d
```

5. Verify the API is running at `http://localhost:8000/`

6. Update `config.js` to use `http://localhost:8000/` instead of `https://test-api.k6.io/`

7. To stop the API:
```bash
docker compose down
```

## Running Tests

### Smoke test (quick check):
```bash
k6 run --out influxdb=http://localhost:8086/k6 -e PROFILE=smoke test.js
```

### Normal load test:
```bash
k6 run --out influxdb=http://localhost:8086/k6 -e PROFILE=normal test.js
```

### Spike test (sudden traffic spike):
```bash
k6 run --out influxdb=http://localhost:8086/k6 -e PROFILE=spike test.js
```

### Stress test (high constant load):
```bash
k6 run --out influxdb=http://localhost:8086/k6 -e PROFILE=stress test.js
```

### Endurance test (moderate load for extended period):
```bash
k6 run --out influxdb=http://localhost:8086/k6 -e PROFILE=endurance test.js
```

### Available load profiles:
- `smoke` - 2 VUs for 30s (quick sanity check)
- `normal` - 10 VUs with ramp-up/ramp-down (default)
- `spike` - 10→50 VUs spike (test traffic spikes)
- `stress` - 50→100 VUs (high load testing)
- `endurance` - 20 VUs for 5 minutes (soak testing)

### HTML Report Generation

Generate an interactive HTML report of your test results:

```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=k6-report.html k6 run --out influxdb=http://localhost:8086/k6 -e PROFILE=normal test.js
```

This will create a `k6-report.html` file with detailed test metrics and visualizations that you can open in any web browser.

## Grafana Setup

Start InfluxDB and Grafana using Docker Compose:
```bash
cd grafana
docker-compose up -d
```

Access Grafana at `http://localhost:3000`

Login credentials:
- Username: `admin`
- Password: `admin`

The dashboard will be automatically provisioned and available immediately after startup.

## Jenkins CI/CD Pipeline

A sample `Jenkinsfile` is included for distributed load testing across multiple Jenkins slave nodes.

### Features:
- Runs load tests in parallel on up to 5 slave nodes
- Configurable load profile (smoke, normal, spike, stress, endurance)
- Metrics aggregation to single InfluxDB instance
- Parameterized Jenkins job

### Usage:
1. Update slave node labels and IPs in Jenkinsfile (`slave-1` through `slave-5`)
2. Update InfluxDB URL (currently `http://100.200.100.200:8086/k6`)
3. Create Jenkins job from this repository
4. Run with desired profile parameter

Note: This is a template example. Adjust node labels, IPs, and InfluxDB endpoint for your environment.

## Configuration

Update `config.js` with your API endpoint and test parameters.

## Requirements

- k6
- Node.js
- npm
- Docker and Docker Compose (for Grafana and InfluxDB)

## License

MIT

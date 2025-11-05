# K6 Load Testing Sample

A sample project demonstrating load testing with k6, featuring API tests for a crocodile management system.

---

## Project Structure

```
├── api/                          # API request modules
│   ├── loginUser.js
│   ├── registerUser.js
│   ├── createCrocodile.js
│   ├── getPublicCrocodiles.js
│   ├── getMyCrocodiles.js
│   └── getSingleCrocodile.js
├── helpers/                      # Utility modules
│   ├── UserGenerator.js
│   └── WaitUtil.js
├── csv-user-generator/           # CSV data generation
│   └── generate-credentials.js
├── grafana/                      # Grafana configuration
│   ├── docker-compose.yml
│   └── provisioning/dashboards/
├── jenkins/                      # Jenkins pipeline
│   └── Jenkinsfile
├── test-app/                     # Local test API
│   └── test-api.k6.io-0.0.5.zip
├── config.js                     # Configuration file
└── test.js                       # Main test file
```

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Local Test API

The k6 public test API (test-api.k6.io) has been retired. You need to run the test API locally using Docker.

**Steps:**

1. Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop)

2. Extract the `test-app/test-api.k6.io-0.0.5.zip` file:
```bash
cd test-app
unzip test-api.k6.io-0.0.5.zip
```

3. Start the API (may take 5 minutes on first run):
```bash
docker compose up -d
```

4. Verify the API is running at `http://localhost:8000/`

5. Update `config.js` to use `http://localhost:8000/` instead of `https://test-api.k6.io/`

6. To stop the API:
```bash
docker compose down
```

### 3. Configure Settings
Update `config.js` with your API endpoint and test parameters.

---

## Load Testing Profiles

Choose a profile based on your testing needs:

| Profile | VUs | Duration | Purpose |
|---------|-----|----------|---------|
| **smoke** | 2 | 30s | Quick sanity check |
| **normal** | 10 | Ramp-up/down | Standard load test |
| **spike** | 10→50 | Gradual spike | Test traffic spikes |
| **stress** | 50→100 | High constant | High load testing |
| **endurance** | 20 | 5 minutes | Soak testing |

---

## Running Tests

### Basic Test Run
```bash
k6 run test.js
```

### With Specific Profile
```bash
k6 run -e PROFILE=normal test.js
```

### With InfluxDB Output (required for Grafana)
```bash
k6 run --out influxdb=http://localhost:8086/k6 -e PROFILE=normal test.js
```

---

## Reporting & Monitoring

This project supports three different approaches to track and visualize test results:

### Option 1: Grafana (Real-time Monitoring)

**Best for:** Continuous monitoring, historical data, team dashboards

**Setup:**

1. Start InfluxDB and Grafana:
```bash
cd grafana
docker-compose up -d
```

2. Access Grafana at `http://localhost:3000`

3. Login with default credentials:
   - Username: `admin`
   - Password: `admin`

4. Run tests with InfluxDB output:
```bash
k6 run --out influxdb=http://localhost:8086/k6 -e PROFILE=normal test.js
```

5. Grafana dashboard is automatically provisioned and available immediately after startup

**Pros & Cons:**

| Aspect | Local | Jenkins | Kubernetes |
|--------|-------|---------|------------|
| **Setup** | Easy (Docker Compose) | Medium (need shared InfluxDB) | Medium (need persistent storage) |
| **Real-time monitoring** | Yes | Yes | Yes |
| **Historical data** | Yes | Yes | Yes (with persistent volumes) |
| **Tags & Checks support** | Yes | Yes | Yes |
| **Resource overhead** | Moderate (Docker) | Low (just k6) | Medium (requires infrastructure) |

---

### Option 2: Web Dashboard (HTML Export)

**Best for:** Quick local testing, sharing single test results

**Setup:**

1. Run test with web dashboard export:
```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=k6-report.html k6 run -e PROFILE=normal test.js
```

2. Open generated `k6-report.html` in your browser

**Note:** This dashboard shows basic metrics but does not include custom tags and checks.

**Pros & Cons:**

| Aspect | Local | Jenkins | Kubernetes |
|--------|-------|---------|------------|
| **Setup** | Very easy | Very easy | Very easy |
| **Setup time** | Instant | Instant | Instant |
| **File storage** | Local file | Jenkins artifacts | Requires manual export |
| **Tags & Checks** | Not included | Not included | Not included |
| **Suitable for** | Quick checks | Build artifacts | Less ideal |
| **Comparison** | Can compare runs | Can compare builds | Difficult |

**Command with all options:**
```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=k6-report.html k6 run --out influxdb=http://localhost:8086/k6 -e PROFILE=normal test.js
```

---

### Option 3: k6-Reporter (Detailed HTML Reports)

**Best for:** Detailed analysis, custom tags & checks, standalone reports

**Setup:**

1. Install k6-reporter:
```bash
npm install k6-reporter --save-dev
```

2. Run test with JSON output:
```bash
k6 run --out json=results.json -e PROFILE=normal test.js
```

3. Generate HTML report:
```bash
npx k6-reporter results.json
```

4. Open generated `summary.html` in your browser

**Pros & Cons:**

| Aspect | Local | Jenkins | Kubernetes |
|--------|-------|---------|------------|
| **Setup** | Easy (npm install) | Medium (npm dependency) | Medium (requires npm) |
| **Tags & Checks** | Yes, all included | Yes, all included | Yes, all included |
| **Detailed metrics** | Comprehensive | Comprehensive | Comprehensive |
| **File size** | Medium | Medium | Medium |
| **Standalone** | Fully standalone | Works as artifact | Must extract from pod |
| **Dependencies** | Node.js/npm | Node.js/npm | Node.js/npm in image |
| **Automation** | Manual or scripted | Easy to script | Requires post-processing |

---

## Jenkins CI/CD Pipeline

A sample `Jenkinsfile` is included for distributed load testing across multiple Jenkins slave nodes.

**Location:** `jenkins/Jenkinsfile`

### Features:
- Runs load tests in parallel on up to 5 slave nodes
- Configurable load profile (smoke, normal, spike, stress, endurance)
- Metrics aggregation to single InfluxDB instance
- Parameterized Jenkins job

### Setup:
1. Update slave node labels and IPs in Jenkinsfile (`slave-1` through `slave-5`)
2. Update InfluxDB URL (currently `http://100.200.100.200:8086/k6`)
3. Create Jenkins job from this repository
4. Run with desired profile parameter

**Note:** This is a template example. Adjust node labels, IPs, and InfluxDB endpoint for your environment.

---

## Configuration

Edit `config.js` to customize:
- API endpoint URL
- Test parameters
- User credentials
- Custom options

---

## Requirements

- **k6** - Load testing tool
- **Node.js** & **npm** - JavaScript runtime and package manager
- **Docker & Docker Compose** - For running test API, InfluxDB, and Grafana
- **k6-reporter** (optional) - For detailed HTML reports

---

## Project Structure Details

### API Modules (`api/`)
Modular API request functions for easier test organization and reusability.

### Helpers (`helpers/`)
Utility functions for user generation, waiting, and common test operations.

### Data Generation (`csv-user-generator/`)
Script to generate test user credentials for load testing.

### Grafana Configuration (`grafana/`)
Pre-configured Grafana dashboards and InfluxDB setup using Docker Compose.

### Jenkins Pipeline (`jenkins/`)
Template Jenkinsfile for distributed load testing across multiple nodes.

### Test API (`test-app/`)
Packaged local version of the k6 test API for offline testing.

---

## License

MIT

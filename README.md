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

## Running Tests

Execute the load tests:
```bash
k6 run test.js
```

## Configuration

Update `config.js` with your API endpoint and test parameters.

## Requirements

- k6
- Node.js
- npm

## License

MIT

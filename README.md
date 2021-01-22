# Load Testing with K6

Introduction to load testing with K6

## How to Run:
- `docker-compose up -d influxdb grafana`
- Load http://localhost:3000, and import the `grafana_dashboard.json` config to a new dashboard.
- `docker-compose run k6 run /tests/1-simple.js`

## Credits

Source: [@cajames](https://github.com/cajames/performance-testing-with-k6)

K6 documentation: https://k6.io/docs/
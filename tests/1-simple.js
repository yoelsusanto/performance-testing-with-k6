import http from "k6/http";
import { check, sleep } from "k6";
import { Counter } from "k6/metrics";

let ErrorCount = new Counter("errors");

export const options = {
  vus: 10,
  duration: "15s",
  thresholds: {
    errors: ["count<10"] // Threshold
  }
};

export default function() {
  const simulationStatus = Math.random() < 0.9 ? "200" : "500";

  let resp = http.get(`https://httpbin.org/status/${simulationStatus}`);
  let success = check(resp, {
    "status is 200": resp => resp.status === 200 // Check
  });

  if (!success) {
    ErrorCount.add(1);
  }

  sleep(2);
}

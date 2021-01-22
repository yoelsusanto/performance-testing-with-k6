import http from "k6/http";
import { check, sleep } from "k6";
import { Rate } from "k6/metrics";

let ErrorRate = new Rate("error_rate"); // Custom metric

export let options = {
  stages: [
    { duration: "5s", target: 10 },
    { duration: "2s", target: 50 },
    { duration: "6s", target: 50 },
    { duration: "5s", target: 0 }
  ],
};

export default function() {
  const simulationStatus = Math.random() < 0.9 ? "200" : "500";
  let resp = http.get(`http://httpbin.org/status/${simulationStatus}`);
  let success = check(resp, {
    "status is 200": resp => resp.status === 200
  });

  let isError = !success;
  ErrorRate.add(isError)

  sleep(0.5);
}

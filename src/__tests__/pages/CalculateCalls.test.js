import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, waitForElement } from "@testing-library/react";
import "jest-canvas-mock";
import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import CalculateCalls from "../../pages/CalculateCalls";
import codes from "../../utils/codes.json";
import data from "../../utils/data.json";
import plans from "../../utils/plans.json";

function getValuePerMinute(origin, destination) {
  let minute = data.find(
    (item) =>
      item.origin === origin.value && item.destination === destination.value
  );
  return minute;
}

function calculateRate(minute) {
  let minuteRate = (minute * 10) / 100 + minute;
  return minuteRate;
}

function getLimitPlan(plan) {
  let valueCallTime = plans.find((item) => item.label === plan);
  return valueCallTime;
}

function calculateWithPlan(callTime, valueCallTime, minuteRate) {
  return callTime > valueCallTime.value
    ? (callTime - valueCallTime.value) * minuteRate
    : 0;
}

function calculateWithoutPlan(callTime, minute) {
  return callTime * minute;
}

test("calculate a call", async () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Switch>
        <CalculateCalls />
      </Switch>
    </BrowserRouter>
  );

  const origin = await waitForElement(() => getByTestId("origin"));
  origin.value = codes[3].label;

  const destination = await waitForElement(() => getByTestId("destination"));
  destination.value = codes[0].label;

  const plan = await waitForElement(() => getByTestId("plan"));
  plan.value = plans[2].label;

  const callTime = await waitForElement(() => getByTestId("callTime"));
  callTime.value = 200;

  let { minute } = getValuePerMinute(origin, destination);
  let minuteRate = calculateRate(minute);
  let valueCallTime = getLimitPlan(plan.value);

  const withPlan = calculateWithPlan(callTime.value, valueCallTime, minuteRate);
  const withoutPlan = calculateWithoutPlan(callTime.value, minute);

  expect(withPlan).toEqual(167.2);
  expect(withoutPlan).toEqual(380);
});

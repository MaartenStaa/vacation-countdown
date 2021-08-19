import "./App.css";
import { useEffect, useMemo, useState } from "react";

const SECONDS = 1;
const MINUTES = 60;
const HOURS = MINUTES * 60;
const DAYS = HOURS * 24;
const WEEKS = DAYS * 7;

const FACTORS = [WEEKS, DAYS, HOURS, MINUTES, SECONDS];
const FACTOR_LABELS = [
  ["week", "weeks"],
  ["day", "days"],
  ["hour", "hours"],
  ["minute", "minutes"],
  ["second", "seconds"],
];

const MAX_FACTORS = 3;

function timeDiff(now, target) {
  const totalSeconds = Math.floor((target - now) / 1000);

  const parts = [];
  let remaining = totalSeconds;
  for (let i = 0; i < FACTORS.length; ++i) {
    const factor = FACTORS[i];
    const n = Math.floor(remaining / factor);
    remaining = remaining % factor;

    if (n === 0) {
      continue;
    }

    parts.push(`${n} ${FACTOR_LABELS[i][n === 1 ? 0 : 1]}`);
  }

  return (
    parts.slice(0, MAX_FACTORS - 1).join(", ") +
    (parts.length >= MAX_FACTORS
      ? `${MAX_FACTORS > 2 ? "," : ""} and ${parts[MAX_FACTORS - 1]}`
      : "")
  );
}

function App() {
  const targetDate = useMemo(() => new Date(2021, 8, 18, 10, 20), []);
  const [timeLeft, setTimeLeft] = useState(() =>
    timeDiff(new Date(), targetDate)
  );

  useEffect(() => {
    const interval = setInterval(
      () => setTimeLeft(timeDiff(new Date(), targetDate)),
      1000
    );

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="App">
      <div className="App-background" />

      <header className="App-header">
        <h1>Vacation countdown</h1>
      </header>

      <p className="App-countdown"> Only {timeLeft} left!</p>
    </div>
  );
}

export default App;

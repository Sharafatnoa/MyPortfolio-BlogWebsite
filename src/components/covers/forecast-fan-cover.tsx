const W = 1600;
const X0 = 90;
const X_NOW = 790;
const X1 = 1510;
const BASE_Y = 640;
const HISTORY_POINTS = 56;
const FORECAST_POINTS = 48;

// Trend plus a yearly wobble: the shape a quarterly sales series tends to have.
function level(t: number) {
  return BASE_Y - t * 210 - Math.sin(t * Math.PI * 7) * 34;
}

function buildHistory() {
  return Array.from({ length: HISTORY_POINTS + 1 }, (_, i) => {
    const t = (i / HISTORY_POINTS) * 0.55;
    const x = X0 + (i / HISTORY_POINTS) * (X_NOW - X0);
    // Deterministic jitter so the line looks real without randomness at render time.
    const noise = Math.sin(i * 12.9898) * 11 + Math.sin(i * 4.1414) * 7;
    return [x, level(t) + noise] as const;
  });
}

function buildForecast() {
  return Array.from({ length: FORECAST_POINTS + 1 }, (_, i) => {
    const f = i / FORECAST_POINTS;
    const t = 0.55 + f * 0.45;
    const x = X_NOW + f * (X1 - X_NOW);
    const mid = level(t);
    const spread = 6 + f ** 1.15 * 210;
    return { x, mid, spread };
  });
}

const pts = (a: readonly (readonly [number, number])[]) =>
  a.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

export function ForecastFanCover({ label }: { label: string }) {
  const history = buildHistory();
  const forecast = buildForecast();
  const [lastX, lastY] = history[history.length - 1];

  const band = (k: number) => {
    const upper = forecast.map((p) => [p.x, p.mid - p.spread * k] as const);
    const lower = forecast.map((p) => [p.x, p.mid + p.spread * k] as const).reverse();
    return pts([[lastX, lastY], ...upper, ...lower]);
  };

  return (
    <svg
      viewBox={`0 0 ${W} 1000`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label}
      className="block h-full w-full bg-sb"
    >
      <g stroke="var(--ink)" strokeWidth="1" opacity="0.1" vectorEffect="non-scaling-stroke">
        {[200, 330, 460, 590, 720, 850].map((y) => (
          <line key={y} x1="0" x2={W} y1={y} y2={y} vectorEffect="non-scaling-stroke" />
        ))}
      </g>

      <polygon points={band(1)} fill="var(--journal)" opacity="0.14" />
      <polygon points={band(0.6)} fill="var(--journal)" opacity="0.22" />

      <line
        x1={X_NOW}
        x2={X_NOW}
        y1="130"
        y2="870"
        stroke="var(--ink2)"
        strokeWidth="1"
        strokeDasharray="6 7"
        opacity="0.7"
        vectorEffect="non-scaling-stroke"
      />

      <polyline
        points={pts(history)}
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.75"
        vectorEffect="non-scaling-stroke"
      />
      <polyline
        points={pts([[lastX, lastY], ...forecast.map((p) => [p.x, p.mid] as const)])}
        fill="none"
        stroke="var(--journal)"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />

      <circle cx={lastX} cy={lastY} r="22" fill="none" stroke="var(--journal)" strokeWidth="1" opacity="0.6" vectorEffect="non-scaling-stroke" />
      <circle cx={lastX} cy={lastY} r="9" fill="var(--journal)" />
    </svg>
  );
}

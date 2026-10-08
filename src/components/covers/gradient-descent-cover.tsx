import { useId } from "react";

const LR = 0.23;
const STEPS = 40;
// The last steps pile up on the minimum, so only the early ones get a dot.
const DOTS = 11;
const SC = 150;
const CX = 800;
const CY = 500;
const LEVELS = [0.3, 1, 2.2, 4, 6.5, 9.5, 13, 17];

// Same bowl and starting point as the live demo in the post: f(x, y) = ½(x² + 8y²).
function buildPath() {
  const path: [number, number][] = [[-4.4, 1.55]];
  for (let i = 0; i < STEPS; i++) {
    const [x, y] = path[path.length - 1];
    path.push([x - LR * x, y - LR * 8 * y]);
  }
  return path.map(([x, y]) => [CX + x * SC, CY - y * SC] as const);
}

export function GradientDescentCover({ label }: { label: string }) {
  const glowId = useId();
  const points = buildPath();
  const [startX, startY] = points[0];

  return (
    <svg
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label}
      className="block h-full w-full bg-sb"
    >
      <defs>
        <radialGradient id={glowId}>
          <stop offset="0" style={{ stopColor: "var(--tech)" }} stopOpacity="0.55" />
          <stop offset="1" style={{ stopColor: "var(--tech)" }} stopOpacity="0" />
        </radialGradient>
      </defs>

      <g fill="none" stroke="var(--ink)" strokeWidth="1" vectorEffect="non-scaling-stroke">
        {LEVELS.map((c, i) => (
          <ellipse
            key={c}
            cx={CX}
            cy={CY}
            rx={Math.sqrt(2 * c) * SC}
            ry={Math.sqrt((2 * c) / 8) * SC}
            opacity={0.3 - i * 0.022}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>

      <circle cx={CX} cy={CY} r="70" fill={`url(#${glowId})`} />
      <path
        d={`M${CX - 30} ${CY}H${CX + 30}M${CX} ${CY - 30}V${CY + 30}`}
        stroke="var(--tech)"
        strokeWidth="1"
        opacity="0.6"
        vectorEffect="non-scaling-stroke"
      />

      <polyline
        points={points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ")}
        fill="none"
        stroke="var(--tech)"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.7"
        vectorEffect="non-scaling-stroke"
      />
      <g fill="var(--tech)">
        {points.slice(0, DOTS).map(([x, y], i) => (
          <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r={(7 - i * 0.35).toFixed(1)} opacity="0.85" />
        ))}
      </g>
      <circle
        cx={startX}
        cy={startY}
        r="20"
        fill="none"
        stroke="var(--tech)"
        strokeWidth="1"
        opacity="0.6"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx={CX} cy={CY} r="9" fill="var(--tech)" />
    </svg>
  );
}

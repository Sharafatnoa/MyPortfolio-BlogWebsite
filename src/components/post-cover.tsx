import type { ComponentType } from "react";
import { CoverPlaceholder } from "./cover-placeholder";
import { ForecastFanCover } from "./covers/forecast-fan-cover";
import { GradientDescentCover } from "./covers/gradient-descent-cover";

const COVER_ART: Record<string, ComponentType<{ label: string }>> = {
  "forecast-fan": ForecastFanCover,
  "gradient-descent": GradientDescentCover,
};

interface PostCoverProps {
  label: string;
  art?: string;
  aspect?: string;
}

export function PostCover({ label, art, aspect = "16/10" }: PostCoverProps) {
  const Art = art ? COVER_ART[art] : undefined;
  if (!Art) return <CoverPlaceholder label={label} aspect={aspect} />;
  return (
    <div style={{ aspectRatio: aspect }}>
      <Art label={label} />
    </div>
  );
}

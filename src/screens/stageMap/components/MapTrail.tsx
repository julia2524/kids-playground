import React from "react";
import Svg, { Path as SvgPath } from "react-native-svg";

export interface TrailPoint {
  x: number;
  y: number;
  completed: boolean;
}

interface MapTrailProps {
  width: number;
  height: number;
  points: TrailPoint[];
}

function buildSegmentPath(p1: TrailPoint, p2: TrailPoint) {
  const midY = (p1.y + p2.y) / 2;
  return `M ${p1.x} ${p1.y} C ${p1.x} ${midY}, ${p2.x} ${midY}, ${p2.x} ${p2.y}`;
}

export default function MapTrail({ width, height, points }: MapTrailProps) {
  if (points.length < 2 || width === 0 || height === 0) return null;

  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ position: "absolute", top: 0, left: 0 }}
      pointerEvents="none"
    >
      {points.slice(0, -1).map((point, index) => {
        const next = points[index + 1];
        const d = buildSegmentPath(point, next);
        const isWalked = point.completed;

        return (
          <React.Fragment key={`segment-${index}`}>
            {/* 배경 두꺼운 경로 선 */}
            <SvgPath
              d={d}
              fill="none"
              stroke={isWalked ? "#9ADFC8" : "#CFC8F8"}
              strokeWidth={14}
              strokeLinecap="round"
            />
            {/* 안쪽 점선 패스 */}
            <SvgPath
              d={d}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth={4}
              strokeLinecap="round"
              strokeDasharray="4 10"
              opacity={0.9}
            />
          </React.Fragment>
        );
      })}
    </Svg>
  );
}

import React from "react";
import Svg, { Circle, G, Path, Polygon } from "react-native-svg";

interface SunBadgeProps {
  type?: "full" | "half" | "empty";
  size?: number;
}

const OUTLINE = "#5B4B4B";
const SUN_YELLOW = "#FFD85C";
const EMPTY_COLOR = "#E2E8F0";

export default function SunBadge({ type = "empty", size = 30 }: SunBadgeProps) {
  const center = size / 2;
  const sunRadius = size * 0.28;
  const innerRadius = size * 0.34;
  const outerRadius = size * 0.48;

  // 햇살 8개 조각 (왼쪽(180도)을 기준으로 배치)
  const TOTAL_RAYS = 8;
  const rays = Array.from({ length: TOTAL_RAYS }, (_, index) => {
    // 180도(정왼쪽)에서 시작해 시계방향으로 45도씩 회전
    const angle = index * 45 + 180;
    const radian = (angle * Math.PI) / 180;
    const sideAngle = 16;

    const leftRadian = ((angle - sideAngle) * Math.PI) / 180;
    const rightRadian = ((angle + sideAngle) * Math.PI) / 180;

    const leftX = center + Math.cos(leftRadian) * innerRadius;
    const leftY = center + Math.sin(leftRadian) * innerRadius;
    const rightX = center + Math.cos(rightRadian) * innerRadius;
    const rightY = center + Math.sin(rightRadian) * innerRadius;
    const tipX = center + Math.cos(radian) * outerRadius;
    const tipY = center + Math.sin(radian) * outerRadius;

    let isFilled = false;
    if (type === "full") {
      isFilled = true;
    } else if (type === "half") {
      // 반별일 때 왼쪽 절반(정확히 90도~270도 영역, 화면 기준 왼쪽 반쪽)만 채우기
      const normalizedAngle = (angle + 360) % 360;
      isFilled = normalizedAngle > 90 && normalizedAngle < 270;
    }

    return {
      points: `${leftX},${leftY} ${tipX},${tipY} ${rightX},${rightY}`,
      isFilled,
    };
  });

  // 해 가운데 부채꼴 조각 (총 4조각)
  const TOTAL_SLICES = 4;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* 햇살 */}
      <G>
        {rays.map((ray, index) => (
          <Polygon
            key={index}
            points={ray.points}
            fill={ray.isFilled ? SUN_YELLOW : EMPTY_COLOR}
            // stroke={OUTLINE}
            // strokeWidth={1.5}
            strokeLinejoin="round"
          />
        ))}
      </G>

      {/* 해 가운데 원 (파이 조각들) */}
      <G>
        {Array.from({ length: TOTAL_SLICES }, (_, index) => {
          // 정왼쪽(180도)부터 시작해 시계방향으로 90도씩 4조각
          const startAngle = index * 90 + 180;
          const endAngle = startAngle + 90;

          const startRadian = (startAngle * Math.PI) / 180;
          const endRadian = (endAngle * Math.PI) / 180;

          const x1 = center + Math.cos(startRadian) * sunRadius;
          const y1 = center + Math.sin(startRadian) * sunRadius;
          const x2 = center + Math.cos(endRadian) * sunRadius;
          const y2 = center + Math.sin(endRadian) * sunRadius;

          let isFilled = false;
          if (type === "full") {
            isFilled = true;
          } else if (type === "half") {
            // 왼쪽 절반에 해당하는 조각들만 채우기
            const midAngle = startAngle + 45;
            const normalizedMidAngle = (midAngle + 360) % 360;
            isFilled = normalizedMidAngle > 90 && normalizedMidAngle < 270;
          }

          return (
            <Path
              key={index}
              d={`
                M ${center} ${center}
                L ${x1} ${y1}
                A ${sunRadius} ${sunRadius} 0 0 1 ${x2} ${y2}
                Z
              `}
              fill={isFilled ? SUN_YELLOW : EMPTY_COLOR}
              stroke="none"
            />
          );
        })}
      </G>

      {/* 해 전체 테두리 */}
      <Circle
        cx={center}
        cy={center}
        r={sunRadius}
        fill="none"
        // stroke={OUTLINE}
        // strokeWidth={1.5}
      />
    </Svg>
  );
}

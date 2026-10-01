import React from "react";
import Svg, { Circle, G, Path, Polygon } from "react-native-svg";

interface ProgressSunProps {
  progress: number; // 0 ~ 10
  size?: number;
}

const TOTAL_PARTS = 10;

export default function ProgressSun({ progress, size = 80 }: ProgressSunProps) {
  const safeProgress = Math.max(0, Math.min(progress, TOTAL_PARTS));

  const center = size / 2;

  // 해의 가운데 원 크기
  const sunRadius = size * 0.25;

  // 햇살 삼각형의 시작 위치
  const innerRadius = size * 0.31;

  // 햇살 끝부분
  const outerRadius = size * 0.46;

  const rays = Array.from({ length: TOTAL_PARTS }, (_, index) => {
    const angle = index * 36 - 90;

    const radian = (angle * Math.PI) / 180;

    // 햇살의 중심점
    const centerX = center + Math.cos(radian) * innerRadius;

    const centerY = center + Math.sin(radian) * innerRadius;

    // 삼각형의 양쪽 각도
    const sideAngle = 11;

    const leftRadian = ((angle - sideAngle) * Math.PI) / 180;

    const rightRadian = ((angle + sideAngle) * Math.PI) / 180;

    // 삼각형 밑변 왼쪽
    const leftX = center + Math.cos(leftRadian) * innerRadius;

    const leftY = center + Math.sin(leftRadian) * innerRadius;

    // 삼각형 밑변 오른쪽
    const rightX = center + Math.cos(rightRadian) * innerRadius;

    const rightY = center + Math.sin(rightRadian) * innerRadius;

    // 삼각형 꼭짓점
    const tipX = center + Math.cos(radian) * outerRadius;

    const tipY = center + Math.sin(radian) * outerRadius;

    const isFilled = index < safeProgress;

    return {
      points: `
          ${leftX},${leftY}
          ${tipX},${tipY}
          ${rightX},${rightY}
        `,
      isFilled,
    };
  });

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* 햇살 */}
      <G>
        {rays.map((ray, index) => (
          <Polygon
            key={index}
            points={ray.points}
            fill={ray.isFilled ? "#FFD85C" : "#F3F4F8"}
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ))}
      </G>
      {/* 해 가운데 - 10조각 */}
      <G>
        {Array.from({ length: TOTAL_PARTS }, (_, index) => {
          const startAngle = index * 36 - 90;
          const endAngle = startAngle + 36;

          const startRadian = (startAngle * Math.PI) / 180;
          const endRadian = (endAngle * Math.PI) / 180;

          const x1 = center + Math.cos(startRadian) * sunRadius;

          const y1 = center + Math.sin(startRadian) * sunRadius;

          const x2 = center + Math.cos(endRadian) * sunRadius;

          const y2 = center + Math.sin(endRadian) * sunRadius;

          const isFilled = index < safeProgress;

          return (
            <Path
              key={index}
              d={`
          M ${center} ${center}
          L ${x1} ${y1}
          A ${sunRadius} ${sunRadius}
            0 0 1
            ${x2} ${y2}
          Z
        `}
              fill={isFilled ? "#FFD85C" : "#F3F4F8"}
              stroke="none"
            />
          );
        })}

        {/* 가운데 원의 외곽선 */}
        <Circle
          cx={center}
          cy={center}
          r={sunRadius}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </G>

      {/* 해 가운데 */}
      {/* <Circle
        cx={center}
        cy={center}
        r={sunRadius}
        fill="#FFD85C"
        stroke="#E8C94F"
        strokeWidth={1.5} 
      />*/}
    </Svg>
  );
}

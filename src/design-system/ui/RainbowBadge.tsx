import React from "react";
import Svg, { G, LinearGradient, Path, Stop } from "react-native-svg";

interface RainbowBadgeProps {
  type?: "full" | "half" | "empty";
  size?: number;
}

const RAINBOW_COLORS = [
  "#F44336", // 빨강
  "#FF9800", // 주황
  "#FFD85C", // 노랑
  "#4CAF50", // 초록
  "#42A5F5", // 파랑
  "#5C6BC0", // 남색
  "#AB47BC", // 보라
];

const EMPTY_GRADIENT_ID = "rainbowEmptyGrad";

export default function RainbowBadge({
  type = "empty",
  size = 30,
}: RainbowBadgeProps) {
  const center = size / 2;

  // ============================================================
  // 🌈 무지개 크기
  // ============================================================

  const outerRadius = size * 0.47;
  const innerRadius = size * 0.16;

  const bandWidth = (outerRadius - innerRadius) / RAINBOW_COLORS.length;

  // 왼쪽 아래 → 오른쪽 아래
  const startAngle = 180;
  const endAngle = 360;

  // ============================================================
  // 🌈 Arc Path
  // ============================================================

  const createArcPath = (
    innerR: number,
    outerR: number,
    startDeg: number,
    endDeg: number,
  ) => {
    const startRadian = (startDeg * Math.PI) / 180;

    const endRadian = (endDeg * Math.PI) / 180;

    const outerStartX = center + Math.cos(startRadian) * outerR;

    const outerStartY = center + Math.sin(startRadian) * outerR;

    const outerEndX = center + Math.cos(endRadian) * outerR;

    const outerEndY = center + Math.sin(endRadian) * outerR;

    const innerEndX = center + Math.cos(endRadian) * innerR;

    const innerEndY = center + Math.sin(endRadian) * innerR;

    const innerStartX = center + Math.cos(startRadian) * innerR;

    const innerStartY = center + Math.sin(startRadian) * innerR;

    return `
      M ${outerStartX} ${outerStartY}

      A ${outerR} ${outerR}
        0 0 1
        ${outerEndX} ${outerEndY}

      L ${innerEndX} ${innerEndY}

      A ${innerR} ${innerR}
        0 0 0
        ${innerStartX} ${innerStartY}

      Z
    `;
  };

  return (
    <Svg width={size} height={size * 0.6} viewBox={`0 0 ${size} ${size * 0.6}`}>
      {/* ================================================== */}
      {/* 🌫️ 빈 무지개 그라데이션 */}
      {/* ================================================== */}

      {/* <LinearGradient id={EMPTY_GRADIENT_ID} x1="0%" y1="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor={EMPTY_TOP} />
        <Stop offset="100%" stopColor={EMPTY_BOTTOM} />
      </LinearGradient> */}
      <LinearGradient id={EMPTY_GRADIENT_ID} x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#E2E8F0" />
        <Stop offset="100%" stopColor="#CBD5E1" />
      </LinearGradient>

      {/* ================================================== */}
      {/* 🌈 무지개 */}
      {/* ================================================== */}

      <G>
        {RAINBOW_COLORS.map((color, index) => {
          const outerR = outerRadius - index * bandWidth;

          const innerR = outerR - bandWidth;

          /*
           * empty
           * → 전체 회색 그라데이션
           *
           * half
           * → 왼쪽 절반만 컬러
           *
           * full
           * → 전체 컬러
           */

          const filledStart = startAngle;

          const filledEnd = type === "half" ? 270 : endAngle;

          return (
            <G key={color}>
              {/* -------------------------------------- */}
              {/* 🌫️ 전체 빈 무지개 */}
              {/* -------------------------------------- */}

              <Path
                d={createArcPath(innerR, outerR, startAngle, endAngle)}
                fill={`url(#${EMPTY_GRADIENT_ID})`}
                stroke="none"
              />

              {/* -------------------------------------- */}
              {/* 🌈 채워진 부분 */}
              {/* -------------------------------------- */}

              {type !== "empty" && (
                <Path
                  d={createArcPath(innerR, outerR, filledStart, filledEnd)}
                  fill={color}
                  stroke="none"
                />
              )}
            </G>
          );
        })}
      </G>

      {/* ================================================== */}
      {/* 🌈 바깥쪽 테두리 */}
      {/* ================================================== */}

      <Path
        d={createArcPath(innerRadius, outerRadius, startAngle, endAngle)}
        fill="none"
        stroke="none"
      />
    </Svg>
  );
}

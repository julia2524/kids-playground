import React from "react";

import { I18nManager } from "react-native";

import Svg, { Circle, Path, G, LinearGradient, Stop } from "react-native-svg";

interface MoonBadgeProps {
  type?: "full" | "half" | "empty";
  size?: number;
}

const MOON_GRADIENT_ID = "moonFillGradient";
const EMPTY_GRADIENT_ID = "moonEmptyGradient";

export default function MoonBadge({
  type = "empty",
  size = 30,
}: MoonBadgeProps) {
  const isRTL = I18nManager.isRTL;

  const center = size / 2;
  const radius = size * 0.45;

  let ratio = 0;

  if (type === "half") ratio = 0.5;
  if (type === "full") ratio = 1;

  // 반달의 좌우 방향 결정
  const direction = isRTL ? 1 : -1;

  const mappedRatio = direction * (1 - ratio * 2);

  const rx = Math.abs(mappedRatio) * radius;

  const sweepFlag = mappedRatio < 0 ? 0 : 1;

  let moonPath = "";

  if (ratio === 0) {
    moonPath = "";
  } else if (ratio === 1) {
    // 보름달
    moonPath = `
      M ${center} ${center - radius}
      A ${radius} ${radius} 0 1 1
        ${center} ${center + radius}
      A ${radius} ${radius} 0 1 1
        ${center} ${center - radius}
      Z
    `;
  } else {
    // 반달
    moonPath = `
      M ${center} ${center - radius}

      A ${radius} ${radius}
        0 0 ${isRTL ? 1 : 0}
        ${center} ${center + radius}

      A ${rx} ${radius}
        0 0 ${sweepFlag}
        ${center} ${center - radius}

      Z
    `;
  }

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* 그라데이션 */}
      <LinearGradient
        id={EMPTY_GRADIENT_ID}
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <Stop offset="0%" stopColor="#E2E8F0" />
        <Stop offset="100%" stopColor="#CBD5E1" />
      </LinearGradient>

      <LinearGradient id={MOON_GRADIENT_ID} x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#FFEE88" />
        <Stop offset="50%" stopColor="#FFD85C" />
        <Stop offset="100%" stopColor="#F6B93B" />
      </LinearGradient>

      <G>
        {/* 빈 달 */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill={`url(#${EMPTY_GRADIENT_ID})`}
          stroke="none"
        />

        {/* 채워진 달 */}
        {moonPath !== "" && (
          <Path d={moonPath} fill={`url(#${MOON_GRADIENT_ID})`} stroke="none" />
        )}
      </G>
    </Svg>
  );
}

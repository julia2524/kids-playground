import React from "react";
import Svg, {
  Circle,
  Path,
  G,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

interface ProgressMoonProps {
  progress: number; // 0 ~ 10
  size?: number;
}

const TOTAL_PARTS = 10;
const MOON_GRADIENT_ID = "progressMoonFillGradient";
const EMPTY_GRADIENT_ID = "progressMoonEmptyGradient";

export default function ProgressMoon({
  progress,
  size = 80,
}: ProgressMoonProps) {
  const safeProgress = Math.max(0, Math.min(TOTAL_PARTS, progress));

  const ratio = safeProgress / TOTAL_PARTS;
  const center = size / 2;
  const radius = size * 0.4;

  // 핵심: 밝은 영역의 실제 면적 비율에 맞춰
  // 안쪽 타원 곡선의 가로 반지름을 계산한다.
  const curveRadius = radius * Math.abs(1 - 2 * ratio);

  let moonPath = "";

  if (safeProgress >= TOTAL_PARTS) {
    // 10/10: 완전한 보름달
    moonPath = `
      M ${center} ${center - radius}
      A ${radius} ${radius} 0 1 1
        ${center} ${center + radius}
      A ${radius} ${radius} 0 1 1
        ${center} ${center - radius}
      Z
    `;
  } else if (safeProgress === 5) {
    // 5/10: 정확히 왼쪽 절반
    moonPath = `
      M ${center} ${center - radius}
      A ${radius} ${radius} 0 0 0
        ${center} ${center + radius}
      L ${center} ${center - radius}
      Z
    `;
  } else if (safeProgress > 0) {
    // 1~4: 왼쪽 초승달에서 반달로
    // 6~9: 반달에서 볼록달로
    //
    // 바깥쪽은 원호, 안쪽은 타원호로 연결한다.
    // 5 미만은 왼쪽으로 오목하게,
    // 5 초과는 오른쪽으로 볼록하게 차오른다.
    const innerSweep = safeProgress < 5 ? 1 : 0;

    moonPath = `
      M ${center} ${center - radius}
      A ${radius} ${radius} 0 0 0
        ${center} ${center + radius}
      A ${Math.max(curveRadius, 0.001)} ${radius}
        0 0 ${innerSweep}
        ${center} ${center - radius}
      Z
    `;
  }

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Defs>
        {/* 꺼진 달 */}
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

        {/* 차오르는 달 */}
        <LinearGradient
          id={MOON_GRADIENT_ID}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <Stop offset="0%" stopColor="#FFEE88" />
          <Stop offset="50%" stopColor="#FFD85C" />
          <Stop offset="100%" stopColor="#F6B93B" />
        </LinearGradient>
      </Defs>

      <G>
        {/* 1. 회색 달 배경 */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill={`url(#${EMPTY_GRADIENT_ID})`}
        />

        {/* 2. 면적 비율에 맞춰 곡선으로 차오르는 노란 달 */}
        {moonPath !== "" && (
          <Path d={moonPath} fill={`url(#${MOON_GRADIENT_ID})`} />
        )}

        {/* 3. 보름달일 때 은은한 크레이터 디테일 */}
        {/* {safeProgress === TOTAL_PARTS && (
          <G
            opacity={0.2}
            fill="#C58B28"
            stroke="#C58B28"
            strokeWidth={size * 0.008}
          >
            <Circle
              cx={center - radius * 0.3}
              cy={center - radius * 0.35}
              r={radius * 0.13}
              fill="none"
            />
            <Circle
              cx={center + radius * 0.32}
              cy={center - radius * 0.12}
              r={radius * 0.19}
              fill="none"
            />
            <Circle
              cx={center - radius * 0.12}
              cy={center + radius * 0.28}
              r={radius * 0.22}
              fill="none"
            />
            <Circle
              cx={center + radius * 0.35}
              cy={center + radius * 0.4}
              r={radius * 0.09}
            />
            <Circle
              cx={center - radius * 0.48}
              cy={center + radius * 0.12}
              r={radius * 0.07}
            />
          </G>
        )} */}

        {/* 4. 달 외곽선 */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={2}
        />
      </G>
    </Svg>
  );
}

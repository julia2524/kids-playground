import React from "react";
import {
  Rect,
  Path,
  Circle,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
} from "react-native-svg";

export default function SunnySavannaBackground() {
  return (
    <>
      <Defs>
        {/* 따스한 골든 아워 낮 하늘 그라데이션 */}
        <LinearGradient id="goldenSky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FEF08A" stopOpacity="0.8" />
          <Stop offset="0.5" stopColor="#FDE047" stopOpacity="0.4" />
          <Stop offset="1" stopColor="#FED7AA" />
        </LinearGradient>

        {/* 원거리 사바나 언덕 */}
        <LinearGradient id="goldenHillDistant" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FCD34D" />
          <Stop offset="1" stopColor="#F59E0B" />
        </LinearGradient>

        {/* 근거리 초원 */}
        <LinearGradient id="goldenMeadow" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FBBF24" />
          <Stop offset="0.5" stopColor="#D97706" />
          <Stop offset="1" stopColor="#B45309" />
        </LinearGradient>

        {/* 따스한 태양 광채 */}
        <RadialGradient id="goldenSunGlow" cx="20%" cy="10%" r="80%">
          <Stop offset="0" stopColor="#FEF08A" stopOpacity="0.9" />
          <Stop offset="1" stopColor="#FDE047" stopOpacity="0" />
        </RadialGradient>
      </Defs>

      {/* 배경 하늘 */}
      <Rect width={240} height={180} fill="url(#goldenSky)" />

      {/* 좌상단 따스한 태양 광채 */}
      <Circle cx={40} cy={20} r={65} fill="url(#goldenSunGlow)" />

      {/* 몽실몽실한 낮 구름들 */}
      <Path
        d="M150 25 Q158 15 170 18 Q180 8 192 18 Q204 15 212 25 Q220 35 208 42 L154 42 Q145 35 150 25 Z"
        fill="#FFFFFF"
        opacity={0.85}
      />

      {/* 반짝이는 햇살 입자들 */}
      {[
        [45, 25, 1.4],
        [95, 18, 1.1],
        [135, 28, 1.3],
        [205, 52, 1.2],
        [25, 65, 0.9],
        [115, 62, 1],
      ].map(([cx, cy, r], index) => (
        <Circle
          key={index}
          cx={cx}
          cy={cy}
          r={r}
          fill="#FEF08A"
          opacity={0.95}
        />
      ))}

      {/* 원거리 언덕 */}
      <Path
        d="M-10 106 Q60 82 130 100 T250 96 L250 180 L-10 180 Z"
        fill="url(#goldenHillDistant)"
        opacity={0.85}
      />

      {/* 근거리 초원(지면) */}
      <Path
        d="M0 104
           Q60 90 120 105
           T240 98
           L240 180 L0 180 Z"
        fill="url(#goldenMeadow)"
      />

      {/* 풀밭 위 아기자기한 풀잎 디테일 */}
      <Path
        d="M32 112 Q35 104 39 112 M37 114 Q41 106 44 114 M190 116 Q193 108 197 116 M195 118 Q199 110 202 118"
        stroke="#92400E"
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
        opacity={0.65}
      />
    </>
  );
}

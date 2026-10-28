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

export default function StarlitSavannaBackground() {
  return (
    <>
      <Defs>
        {/* 신비로운 밤하늘 그라데이션 */}
        <LinearGradient id="savannaNightSky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#1B1E36" />
          <Stop offset="0.5" stopColor="#2B3252" />
          <Stop offset="1" stopColor="#434970" />
        </LinearGradient>

        {/* 원거리 언덕 */}
        <LinearGradient id="savannaDistantHill" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#8A94B8" />
          <Stop offset="1" stopColor="#555D7C" />
        </LinearGradient>

        {/* 근거리 초원 */}
        <LinearGradient id="savannaMeadow" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#5D6D8E" />
          <Stop offset="0.5" stopColor="#455373" />
          <Stop offset="1" stopColor="#2F3A56" />
        </LinearGradient>

        {/* 달빛 광채 반사 */}
        <RadialGradient id="savannaMoonGlow" cx="50%" cy="0%" r="90%">
          <Stop offset="0" stopColor="#FFEFB5" stopOpacity="0.45" />
          <Stop offset="1" stopColor="#455373" stopOpacity="0" />
        </RadialGradient>
      </Defs>

      {/* 밤하늘 */}
      <Rect width={240} height={180} fill="url(#savannaNightSky)" />

      {/* 반짝이는 별과 밤하늘 입자들 */}
      {[
        [25, 20, 1.3],
        [70, 15, 1],
        [115, 28, 1.5],
        [165, 18, 1.2],
        [210, 32, 1.4],
        [45, 60, 0.9],
        [135, 55, 1.1],
        [195, 65, 0.8],
      ].map(([cx, cy, r], index) => (
        <Circle
          key={index}
          cx={cx}
          cy={cy}
          r={r}
          fill="#FFF9D6"
          opacity={0.9}
        />
      ))}

      {/* 아기자기한 초승달 모양 */}
      <Path
        d="M185 30 A12 12 0 1 1 175 42 A14 14 0 1 0 185 30 Z"
        fill="#FFEFB5"
        opacity={0.85}
      />

      {/* 원거리 언덕 실루엣 */}
      <Path
        d="M-10 106 Q60 82 130 100 T250 96 L250 180 L-10 180 Z"
        fill="url(#savannaDistantHill)"
        opacity={0.85}
      />

      {/* 근거리 초원(지면) */}
      <Path
        d="M0 104
           Q60 90 120 105
           T240 98
           L240 180 L0 180 Z"
        fill="url(#savannaMeadow)"
      />

      {/* 초원 위 달빛 광채 */}
      <Path
        d="M35 105
           C75 97 145 99 185 108
           C205 113 212 120 198 126
           C150 136 90 130 50 122
           C38 118 30 110 35 105 Z"
        fill="url(#savannaMoonGlow)"
        opacity={0.55}
      />

      {/* 아기자기한 풀잎 디테일 */}
      <Path
        d="M32 112 Q35 104 39 112 M37 114 Q41 106 44 114 M190 116 Q193 108 197 116 M195 118 Q199 110 202 118"
        stroke="#7A8BAE"
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
        opacity={0.7}
      />
    </>
  );
}

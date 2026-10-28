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

export default function PochiGlacialBackground() {
  return (
    <>
      <Defs>
        {/* 시원하고 깊은 극지방 밤하늘 */}
        <LinearGradient id="glacialNight" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#0B132B" />
          <Stop offset="0.55" stopColor="#1C2D5A" />
          <Stop offset="1" stopColor="#2E4F88" />
        </LinearGradient>

        {/* 아이스 블루 오로라 커튼 */}
        <LinearGradient id="glacialAurora" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#4EE2EC" stopOpacity="0" />
          <Stop offset="0.4" stopColor="#4EE2EC" stopOpacity="0.6" />
          <Stop offset="0.7" stopColor="#A5F3FC" stopOpacity="0.45" />
          <Stop offset="1" stopColor="#4EE2EC" stopOpacity="0" />
        </LinearGradient>

        {/* 원거리 빙산 산맥 */}
        <LinearGradient id="glacialMountain" x1="0" y1="0" x2="0.8" y2="1">
          <Stop offset="0" stopColor="#E2F5FE" />
          <Stop offset="1" stopColor="#81C4E8" />
        </LinearGradient>

        {/* 남극 바다 그라데이션 */}
        <LinearGradient id="glacialSea" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#1B4965" />
          <Stop offset="0.45" stopColor="#12354A" />
          <Stop offset="1" stopColor="#081C29" />
        </LinearGradient>

        {/* 수면 위 은은한 오로라 반사광 */}
        <RadialGradient id="glacialReflection" cx="50%" cy="0%" r="100%">
          <Stop offset="0" stopColor="#7DD3FC" stopOpacity="0.6" />
          <Stop offset="1" stopColor="#38BDF8" stopOpacity="0" />
        </RadialGradient>
      </Defs>

      {/* 밤하늘 */}
      <Rect width={240} height={180} fill="url(#glacialNight)" />

      {/* 오로라 커튼 */}
      <Path
        d="M-10 0
           C30 20 50 10 70 35
           C90 60 70 80 90 95
           L110 95
           C90 75 110 55 90 30
           C70 5 40 15 -10 5 Z"
        fill="url(#glacialAurora)"
        opacity={0.85}
      />
      <Path
        d="M130 -5
           C160 15 175 35 160 55
           C145 75 170 90 155 105
           L135 105
           C150 90 125 75 140 50
           C155 25 140 10 130 -5 Z"
        fill="url(#glacialAurora)"
        opacity={0.7}
      />

      {/* 별과 눈송이 입자들 */}
      {[
        [18, 22, 1.3],
        [62, 15, 1],
        [95, 28, 1.5],
        [145, 18, 1.2],
        [185, 30, 1.4],
        [222, 16, 1],
        [32, 65, 0.8],
        [112, 58, 1.1],
        [205, 62, 0.9],
      ].map(([cx, cy, r], index) => (
        <Circle
          key={index}
          cx={cx}
          cy={cy}
          r={r}
          fill="#E0F2FE"
          opacity={0.9}
        />
      ))}

      {/* 원거리 눈덮인 빙산 산맥 */}
      <Path
        d="M0 102 L22 82 L35 90 L58 68 L82 100 L104 85 L124 102 Z"
        fill="url(#glacialMountain)"
        opacity={0.9}
      />
      <Path
        d="M132 102 L155 78 L170 88 L196 64 L220 92 L232 82 L240 92 L240 105 L0 105 Z"
        fill="url(#glacialMountain)"
        opacity={0.9}
      />

      {/* 남극 바다 */}
      <Path
        d="M0 100
           Q60 94 120 101
           T240 100
           L240 180 L0 180 Z"
        fill="url(#glacialSea)"
      />

      {/* 바다 위 오로라 광채 반사 */}
      <Path
        d="M40 101
           C70 97 100 103 125 108
           C140 112 155 116 145 119
           C120 114 90 108 60 107
           C48 107 42 104 40 101 Z"
        fill="url(#glacialReflection)"
      />

      {/* 수면 물결 글린트(빛 반사선) */}
      <Path
        d="M15 118 Q35 114 55 118
           M165 122 Q185 118 205 122
           M75 134 Q92 130 110 134
           M145 145 Q165 141 185 145"
        stroke="#7DD3FC"
        strokeWidth={1.5}
        strokeLinecap="round"
        opacity={0.6}
        fill="none"
      />
    </>
  );
}

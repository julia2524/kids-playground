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

export default function SunnyHoneyBackground() {
  return (
    <>
      <Defs>
        {/* 상큼하고 따스한 낮 하늘 그라데이션 */}
        <LinearGradient id="honeySky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#E0F2FE" />
          <Stop offset="0.5" stopColor="#FEF08A" stopOpacity="0.45" />
          <Stop offset="1" stopColor="#BAE6FD" />
        </LinearGradient>

        {/* 숲속 원거리 초록 언덕 */}
        <LinearGradient id="honeyHillDistant" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#86EFAC" />
          <Stop offset="1" stopColor="#4ADE80" />
        </LinearGradient>

        {/* 근거리 상큼한 초원 */}
        <LinearGradient id="honeyMeadow" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#4ADE80" />
          <Stop offset="0.5" stopColor="#22C55E" />
          <Stop offset="1" stopColor="#16A34A" />
        </LinearGradient>

        {/* 따스한 햇살 광채 */}
        <RadialGradient id="honeySunGlow" cx="80%" cy="0%" r="80%">
          <Stop offset="0" stopColor="#FEF08A" stopOpacity="0.8" />
          <Stop offset="1" stopColor="#FEF08A" stopOpacity="0" />
        </RadialGradient>
      </Defs>

      {/* 배경 하늘 */}
      <Rect width={240} height={180} fill="url(#honeySky)" />

      {/* 우측 상단 따스한 햇살 광채 */}
      <Circle cx={210} cy={10} r={70} fill="url(#honeySunGlow)" />

      {/* 몽실몽실한 낮 구름들 */}
      <Path
        d="M20 35 Q28 25 40 28 Q50 18 62 28 Q74 25 82 35 Q90 45 78 52 L24 52 Q15 45 20 35 Z"
        fill="#FFFFFF"
        opacity={0.85}
      />
      <Path
        d="M140 20 Q148 12 158 15 Q168 8 178 16 Q188 14 194 22 Q200 30 192 36 L144 36 Q136 28 140 20 Z"
        fill="#FFFFFF"
        opacity={0.7}
      />

      {/* 반짝이는 햇살 입자 및 꿀방울 무늬 */}
      {[
        [35, 18, 1.3],
        [95, 16, 1.1],
        [125, 26, 1.4],
        [215, 45, 1.2],
        [15, 62, 0.9],
        [110, 65, 1],
      ].map(([cx, cy, r], index) => (
        <Circle
          key={index}
          cx={cx}
          cy={cy}
          r={r}
          fill="#FEF08A"
          opacity={0.9}
        />
      ))}

      {/* 원거리 언덕 */}
      <Path
        d="M-10 108 Q50 82 120 102 T250 96 L250 180 L-10 180 Z"
        fill="url(#honeyHillDistant)"
        opacity={0.85}
      />

      {/* 근거리 초원(지면) */}
      <Path
        d="M0 105
           Q60 92 120 106
           T240 100
           L240 180 L0 180 Z"
        fill="url(#honeyMeadow)"
      />

      {/* 풀밭 위 아기자기한 꽃과 풀잎 디테일 */}
      <Path
        d="M32 114 Q35 106 39 114 M37 116 Q41 108 44 116 M185 118 Q188 110 192 118 M190 120 Q194 112 197 120"
        stroke="#15803D"
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
        opacity={0.65}
      />
      {/* 앙증맞은 작은 꽃들 */}
      <Circle cx={65} cy={112} r={2.5} fill="#FFFFFF" opacity={0.9} />
      <Circle cx={155} cy={115} r={2.5} fill="#FFFFFF" opacity={0.9} />
    </>
  );
}

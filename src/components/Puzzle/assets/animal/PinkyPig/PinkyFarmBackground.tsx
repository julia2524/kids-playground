import React from "react";
import {
  Rect,
  Path,
  Circle,
  Ellipse,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
} from "react-native-svg";

export default function PinkyFarmBackground() {
  return (
    <>
      <Defs>
        {/* 따뜻하고 포근한 하늘 그라데이션 */}
        <LinearGradient id="farmSky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFD1DC" />
          <Stop offset="0.5" stopColor="#FFE5ED" />
          <Stop offset="1" stopColor="#FFF4F7" />
        </LinearGradient>

        {/* 원거리 언덕 그라데이션 */}
        <LinearGradient id="farmHillDistant" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#C2E8D8" />
          <Stop offset="1" stopColor="#96D4BC" />
        </LinearGradient>

        {/* 근거리 초원 그라데이션 */}
        <LinearGradient id="farmMeadow" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#A8E6CF" />
          <Stop offset="0.5" stopColor="#81D8B4" />
          <Stop offset="1" stopColor="#5EC399" />
        </LinearGradient>

        {/* 풀밭 위 은은한 햇살 반사광 */}
        <RadialGradient id="farmSunGlow" cx="50%" cy="0%" r="90%">
          <Stop offset="0" stopColor="#FFF9E6" stopOpacity="0.7" />
          <Stop offset="1" stopColor="#A8E6CF" stopOpacity="0" />
        </RadialGradient>
      </Defs>

      {/* 배경 하늘 */}
      <Rect width={240} height={180} fill="url(#farmSky)" />

      {/* 몽실몽실한 구름들 */}
      <Path
        d="M25 35 Q32 25 45 28 Q55 18 68 28 Q80 25 88 35 Q95 45 85 52 L30 52 Q20 45 25 35 Z"
        fill="#FFFFFF"
        opacity={0.8}
      />
      <Path
        d="M155 20 Q162 12 172 15 Q182 8 192 16 Q202 14 208 22 Q215 30 205 36 L158 36 Q150 28 155 20 Z"
        fill="#FFFFFF"
        opacity={0.65}
      />

      {/* 반짝이는 별과 하트/꽃 모티브 입자 */}
      {[
        [28, 18, 1.2],
        [75, 12, 1.5],
        [122, 22, 1],
        [198, 14, 1.3],
        [225, 42, 1.1],
        [14, 62, 0.9],
        [215, 68, 1],
      ].map(([cx, cy, r], index) => (
        <Circle
          key={index}
          cx={cx}
          cy={cy}
          r={r}
          fill="#FFF9C4"
          opacity={0.9}
        />
      ))}

      {/* 원거리 언덕 */}
      <Path
        d="M-10 110 Q50 80 120 102 T250 95 L250 180 L-10 180 Z"
        fill="url(#farmHillDistant)"
        opacity={0.85}
      />

      {/* 근거리 초원(지면) */}
      <Path
        d="M0 108
           Q60 95 120 110
           T240 105
           L240 180 L0 180 Z"
        fill="url(#farmMeadow)"
      />

      {/* 초원 위 부드러운 햇살 광채 */}
      <Path
        d="M30 110
           C70 100 140 102 180 112
           C200 117 210 125 195 130
           C150 140 70 135 45 125
           C30 120 20 115 30 110 Z"
        fill="url(#farmSunGlow)"
        opacity={0.5}
      />

      {/* 아기자기한 풀잎 장식들 */}
      <Path
        d="M35 116 Q38 108 42 116 M40 118 Q44 110 47 118 M180 122 Q183 114 187 122 M185 124 Q189 116 192 124"
        stroke="#67C69F"
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
        opacity={0.7}
      />
    </>
  );
}

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

export default function MoonlitMeadowBackground() {
  return (
    <>
      <Defs>
        {/* 달빛이 감도는 포근한 밤하늘 */}
        <LinearGradient id="bunnyNightSky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#1E2238" />
          <Stop offset="0.5" stopColor="#2E3352" />
          <Stop offset="1" stopColor="#4A4568" />
        </LinearGradient>

        {/* 보름달 빛 퍼짐 */}
        <RadialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <Stop offset="0" stopColor="#FFF9E6" stopOpacity="0.8" />
          <Stop offset="0.5" stopColor="#FFE599" stopOpacity="0.25" />
          <Stop offset="1" stopColor="#FFE599" stopOpacity="0" />
        </RadialGradient>

        {/* 원거리 언덕 */}
        <LinearGradient id="bunnyDistantHill" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#B4A7C5" />
          <Stop offset="1" stopColor="#7F7396" />
        </LinearGradient>

        {/* 근거리 초원 */}
        <LinearGradient id="bunnyMeadow" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#7882A4" />
          <Stop offset="0.5" stopColor="#5B6484" />
          <Stop offset="1" stopColor="#3F4764" />
        </LinearGradient>

        {/* 달빛 바닥 반사광 */}
        <RadialGradient id="bunnyMoonReflection" cx="50%" cy="0%" r="90%">
          <Stop offset="0" stopColor="#FFF1B0" stopOpacity="0.5" />
          <Stop offset="1" stopColor="#5B6484" stopOpacity="0" />
        </RadialGradient>
      </Defs>

      {/* 밤하늘 */}
      <Rect width={240} height={180} fill="url(#bunnyNightSky)" />

      {/* 커다란 보름달과 은은한 빛 무리 */}
      <Circle cx={185} cy={45} r={32} fill="url(#moonGlow)" />
      <Circle cx={185} cy={45} r={16} fill="#FFFDF0" />

      {/* 반짝이는 별과 밤하늘 입자들 */}
      {[
        [32, 22, 1.2],
        [75, 18, 1.5],
        [122, 30, 1],
        [15, 68, 1.1],
        [105, 52, 1.3],
        [220, 75, 0.9],
        [60, 85, 0.8],
      ].map(([cx, cy, r], index) => (
        <Circle
          key={index}
          cx={cx}
          cy={cy}
          r={r}
          fill="#FFF3B0"
          opacity={0.85}
        />
      ))}

      {/* 몽실몽실한 밤구름 */}
      <Path
        d="M-10 45 Q15 35 35 42 Q50 30 70 40 Q85 36 95 48 L-10 48 Z"
        fill="#FFFFFF"
        opacity={0.2}
      />
      <Path
        d="M130 25 Q145 15 160 22 Q175 12 195 20 Q210 18 220 28 L130 28 Z"
        fill="#FFFFFF"
        opacity={0.15}
      />

      {/* 원거리 언덕 */}
      <Path
        d="M-10 108 Q60 85 130 102 T250 98 L250 180 L-10 180 Z"
        fill="url(#bunnyDistantHill)"
        opacity={0.8}
      />

      {/* 근거리 들판(지면) */}
      <Path
        d="M0 105
           Q55 92 120 106
           T240 100
           L240 180 L0 180 Z"
        fill="url(#bunnyMeadow)"
      />

      {/* 달빛이 비치는 들판 광채 */}
      <Path
        d="M40 106
           C80 98 150 100 190 110
           C210 115 215 122 200 128
           C150 138 90 132 55 124
           C42 120 35 112 40 106 Z"
        fill="url(#bunnyMoonReflection)"
        opacity={0.6}
      />

      {/* 아기자기한 풀잎 디테일 */}
      <Path
        d="M30 114 Q33 106 37 114 M35 116 Q39 108 42 116 M195 118 Q198 110 202 118 M200 120 Q204 112 207 120"
        stroke="#8B95B8"
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
        opacity={0.7}
      />
    </>
  );
}

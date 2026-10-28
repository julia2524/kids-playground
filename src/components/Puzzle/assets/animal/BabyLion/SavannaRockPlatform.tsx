import React from "react";
import { Path, Ellipse, Defs, LinearGradient, Stop } from "react-native-svg";

export default function SavannaRockPlatform() {
  return (
    <>
      <Defs>
        <LinearGradient id="rockPlatformSide" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#D97706" />
          <Stop offset="1" stopColor="#92400E" />
        </LinearGradient>
        <LinearGradient id="rockPlatformTop" x1="0" y1="0" x2="0.8" y2="1">
          <Stop offset="0" stopColor="#FDE68A" />
          <Stop offset="0.5" stopColor="#FBBF24" />
          <Stop offset="1" stopColor="#D97706" />
        </LinearGradient>
      </Defs>

      {/* 바위 발판 측면 두께 */}
      <Path
        d="M32 130
           C38 120 88 116 120 116
           C172 116 204 121 210 130
           L214 144
           C214 154 172 162 120 162
           C68 162 30 154 28 144 Z"
        fill="url(#rockPlatformSide)"
        stroke="#78350F"
        strokeWidth={1.2}
        strokeLinejoin="round"
      />

      {/* 바위 발판 윗면 (햇살 받은 표면) */}
      <Path
        d="M30 130
           C31 120 88 116 120 116
           C173 116 208 120 212 130
           C215 140 172 148 120 148
           C68 148 31 140 30 130 Z"
        fill="url(#rockPlatformTop)"
        stroke="#FEF3C7"
        strokeWidth={1.5}
      />

      {/* 윗면 하이라이트 및 포인트 */}
      <Path
        d="M50 124 Q85 118 125 123"
        stroke="#FFFFFF"
        strokeWidth={2.2}
        strokeLinecap="round"
        opacity={0.85}
        fill="none"
      />
      <Ellipse cx={68} cy={134} rx={7} ry={2} fill="#B45309" opacity={0.5} />
      <Ellipse cx={172} cy={135} rx={9} ry={2.2} fill="#B45309" opacity={0.5} />
    </>
  );
}

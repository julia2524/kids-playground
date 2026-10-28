import React from "react";
import { Path, Ellipse, Defs, LinearGradient, Stop } from "react-native-svg";

export default function HoneyLogPlatform() {
  return (
    <>
      <Defs>
        <LinearGradient id="logPlatformSide" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#B45309" />
          <Stop offset="1" stopColor="#78350F" />
        </LinearGradient>
        <LinearGradient id="logPlatformTop" x1="0" y1="0" x2="0.8" y2="1">
          <Stop offset="0" stopColor="#FDE047" />
          <Stop offset="0.5" stopColor="#EAB308" />
          <Stop offset="1" stopColor="#CA8A04" />
        </LinearGradient>
      </Defs>

      {/* 통나무 발판 측면 두께 */}
      <Path
        d="M34 130
           C40 120 90 116 120 116
           C170 116 202 121 208 130
           L212 144
           C212 154 172 162 120 162
           C68 162 32 154 30 144 Z"
        fill="url(#logPlatformSide)"
        stroke="#451A03"
        strokeWidth={1.2}
        strokeLinejoin="round"
      />

      {/* 통나무 발판 윗면 (꿀빛 단면 표면) */}
      <Path
        d="M32 130
           C33 120 90 116 120 116
           C172 116 207 120 210 130
           C213 140 172 148 120 148
           C68 148 33 140 32 130 Z"
        fill="url(#logPlatformTop)"
        stroke="#FEF08A"
        strokeWidth={1.5}
      />

      {/* 윗면 하이라이트 및 나이테/꿀 포인트 */}
      <Path
        d="M52 124 Q88 118 128 123"
        stroke="#FFFFFF"
        strokeWidth={2.2}
        strokeLinecap="round"
        opacity={0.85}
        fill="none"
      />
      <Ellipse cx={72} cy={134} rx={7} ry={2} fill="#CA8A04" opacity={0.5} />
      <Ellipse cx={172} cy={135} rx={9} ry={2.2} fill="#CA8A04" opacity={0.5} />
    </>
  );
}

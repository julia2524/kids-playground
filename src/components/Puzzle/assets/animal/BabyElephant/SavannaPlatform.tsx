import React from "react";
import { Path, Ellipse, Defs, LinearGradient, Stop } from "react-native-svg";

export default function SavannaPlatform() {
  return (
    <>
      <Defs>
        <LinearGradient id="savannaPlatformSide" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#7E8DAE" />
          <Stop offset="1" stopColor="#424D68" />
        </LinearGradient>
        <LinearGradient id="savannaPlatformTop" x1="0" y1="0" x2="0.8" y2="1">
          <Stop offset="0" stopColor="#B3C3E6" />
          <Stop offset="0.6" stopColor="#8596BD" />
          <Stop offset="1" stopColor="#5D6C91" />
        </LinearGradient>
      </Defs>

      {/* 발판 측면 두께 */}
      <Path
        d="M32 130
           C38 120 88 116 120 116
           C172 116 204 121 210 130
           L214 144
           C214 154 172 162 120 162
           C68 162 30 154 28 144 Z"
        fill="url(#savannaPlatformSide)"
        stroke="#333D56"
        strokeWidth={1.2}
        strokeLinejoin="round"
      />

      {/* 발판 윗면 (잔디/흙 표면) */}
      <Path
        d="M30 130
           C31 120 88 116 120 116
           C173 116 208 120 212 130
           C215 140 172 148 120 148
           C68 148 31 140 30 130 Z"
        fill="url(#savannaPlatformTop)"
        stroke="#D2E1FF"
        strokeWidth={1.5}
      />

      {/* 윗면 하이라이트 및 포인트 */}
      <Path
        d="M50 124 Q85 118 125 123"
        stroke="#FFFFFF"
        strokeWidth={2.2}
        strokeLinecap="round"
        opacity={0.8}
        fill="none"
      />
      <Ellipse cx={68} cy={134} rx={7} ry={2} fill="#A3B4D8" opacity={0.6} />
      <Ellipse cx={172} cy={135} rx={9} ry={2.2} fill="#A3B4D8" opacity={0.6} />
    </>
  );
}

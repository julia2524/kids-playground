import React from "react";
import { Path, Ellipse, Defs, LinearGradient, Stop } from "react-native-svg";

export default function FarmPlatform() {
  return (
    <>
      <Defs>
        <LinearGradient id="farmPlatformSide" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#7CD0A8" />
          <Stop offset="1" stopColor="#439A74" />
        </LinearGradient>
        <LinearGradient id="farmPlatformTop" x1="0" y1="0" x2="0.8" y2="1">
          <Stop offset="0" stopColor="#B4F2D4" />
          <Stop offset="1" stopColor="#72D4A4" />
        </LinearGradient>
      </Defs>

      {/* 발판 측면 두께 */}
      <Path
        d="M36 138
           C42 128 92 124 120 124
           C168 124 202 129 208 138
           L210 152
           C210 162 170 170 120 170
           C70 170 34 162 32 152 Z"
        fill="url(#farmPlatformSide)"
        stroke="#367C5D"
        strokeWidth={1.2}
        strokeLinejoin="round"
      />

      {/* 발판 윗면 (초록 잔디 표면) */}
      <Path
        d="M34 138
           C35 128 92 124 120 124
           C168 124 205 128 206 138
           C208 148 168 156 120 156
           C72 156 35 148 34 138 Z"
        fill="url(#farmPlatformTop)"
        stroke="#D9FBEB"
        strokeWidth={1.3}
      />

      {/* 잔디 위 반짝 하이라이트 및 꽃 무늬 포인트 */}
      <Path
        d="M55 137 Q85 131 115 135"
        stroke="#FFFFFF"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.7}
        fill="none"
      />
      <Ellipse cx={65} cy={142} rx={6} ry={2} fill="#A2EED1" opacity={0.6} />
      <Ellipse cx={170} cy={143} rx={8} ry={2.2} fill="#A2EED1" opacity={0.6} />
    </>
  );
}

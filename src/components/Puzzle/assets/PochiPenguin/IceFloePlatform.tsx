import React from "react";
import { Path, Ellipse, Defs, LinearGradient, Stop } from "react-native-svg";

export default function IceFloePlatform() {
  return (
    <>
      <Defs>
        <LinearGradient id="iceFloeSide" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#BAE6FD" />
          <Stop offset="0.5" stopColor="#38BDF8" />
          <Stop offset="1" stopColor="#0369A1" />
        </LinearGradient>
        <LinearGradient id="iceFloeTop" x1="0" y1="0" x2="0.8" y2="1">
          <Stop offset="0" stopColor="#FFFFFF" />
          <Stop offset="0.6" stopColor="#E0F2FE" />
          <Stop offset="1" stopColor="#BAE6FD" />
        </LinearGradient>
      </Defs>

      {/* 유빙 측면 두께 */}
      <Path
        d="M32 130
           C38 120 88 116 120 116
           C172 116 204 121 210 130
           L214 144
           C214 154 172 162 120 162
           C68 162 30 154 28 144 Z"
        fill="url(#iceFloeSide)"
        stroke="#0284C7"
        strokeWidth={1.2}
        strokeLinejoin="round"
      />

      {/* 유빙 윗면 (반짝이는 눈 표면) */}
      <Path
        d="M30 130
           C31 120 88 116 120 116
           C173 116 208 120 212 130
           C215 140 172 148 120 148
           C68 148 31 140 30 130 Z"
        fill="url(#iceFloeTop)"
        stroke="#FFFFFF"
        strokeWidth={1.5}
      />

      {/* 윗면 하이라이트 및 크리스탈 포인트 */}
      <Path
        d="M50 124 Q85 118 125 123"
        stroke="#FFFFFF"
        strokeWidth={2.2}
        strokeLinecap="round"
        opacity={0.9}
        fill="none"
      />
      <Ellipse cx={72} cy={134} rx={7} ry={2} fill="#93C5FD" opacity={0.5} />
      <Ellipse cx={172} cy={135} rx={9} ry={2.2} fill="#93C5FD" opacity={0.5} />
    </>
  );
}

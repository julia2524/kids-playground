import React from "react";
import { Path, Ellipse, Defs, LinearGradient, Stop } from "react-native-svg";

export default function CloudPlatform() {
  return (
    <>
      <Defs>
        <LinearGradient id="cloudPlatformSide" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#E2D9EC" />
          <Stop offset="1" stopColor="#9A8CAE" />
        </LinearGradient>
        <LinearGradient id="cloudPlatformTop" x1="0" y1="0" x2="0.8" y2="1">
          <Stop offset="0" stopColor="#FFFFFF" />
          <Stop offset="0.6" stopColor="#F4EFEA" />
          <Stop offset="1" stopColor="#D9CCE8" />
        </LinearGradient>
      </Defs>

      {/* 구름 발판 측면 두께 */}
      <Path
        d="M34 132
           C40 122 90 118 120 118
           C170 118 202 123 208 132
           L212 146
           C212 156 172 164 120 164
           C68 164 32 156 30 146 Z"
        fill="url(#cloudPlatformSide)"
        stroke="#7A6D8E"
        strokeWidth={1.2}
        strokeLinejoin="round"
      />

      {/* 구름 발판 윗면 (폭신한 구름 표면) */}
      <Path
        d="M32 132
           C33 122 90 118 120 118
           C172 118 207 122 210 132
           C213 142 172 150 120 150
           C68 150 33 142 32 132 Z"
        fill="url(#cloudPlatformTop)"
        stroke="#FFFFFF"
        strokeWidth={1.5}
      />

      {/* 윗면 하이라이트 및 별 가루 장식 */}
      <Path
        d="M52 126 Q88 120 128 125"
        stroke="#FFFFFF"
        strokeWidth={2.2}
        strokeLinecap="round"
        opacity={0.9}
        fill="none"
      />
      <Ellipse cx={70} cy={136} rx={7} ry={2} fill="#C5B8D8" opacity={0.5} />
      <Ellipse cx={170} cy={137} rx={9} ry={2.2} fill="#C5B8D8" opacity={0.5} />
    </>
  );
}

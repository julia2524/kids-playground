import React from "react";
import Svg, {
  Defs,
  RadialGradient,
  Stop,
  Circle,
  Path,
} from "react-native-svg";

export default function MiniSatellite({ size = 24 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 30 30" fill="none">
      <Defs>
        <RadialGradient id="moonGrad" cx="30%" cy="30%" r="70%">
          <Stop offset="0%" stopColor="#FFF9E6" />
          <Stop offset="60%" stopColor="#FFD95A" />
          <Stop offset="100%" stopColor="#E6B422" />
        </RadialGradient>
      </Defs>

      {/* 위성/달 본체 */}
      <Circle cx="15" cy="15" r="10" fill="url(#moonGrad)" />

      {/* 안테나 빛 반사 */}
      <Path
        d="M 12,8 A 6,6 0 0,1 18,8"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.8}
      />
    </Svg>
  );
}

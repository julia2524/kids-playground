import React from "react";
import Svg, { Defs, LinearGradient, Stop, Path, Rect } from "react-native-svg";

interface Props {
  size?: number;
  color?: string;
}

export default function ShootingStar({ size = 36, color = "#FFD95A" }: Props) {
  return (
    <Svg width={size} height={size * 0.6} viewBox="0 0 60 36" fill="none">
      <Defs>
        <LinearGradient id="tailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={color} stopOpacity={0} />
          <Stop offset="70%" stopColor={color} stopOpacity={0.6} />
          <Stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.9} />
        </LinearGradient>
      </Defs>

      {/* 꼬리 라인 */}
      <Path
        d="M 4,6 Q 25,18 48,26"
        stroke="url(#tailGradient)"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* 반짝이는 별 머리 */}
      <Path
        d="M 48,26 Q 52,26 52,22 Q 52,26 56,26 Q 52,26 52,30 Q 52,26 48,26 Z"
        fill="#FFFFFF"
      />
    </Svg>
  );
}

import React from "react";
import Svg, {
  Circle,
  Defs,
  Ellipse,
  LinearGradient,
  Path,
  RadialGradient,
  Stop,
} from "react-native-svg";

type SpaceUFOProps = {
  size?: number;
};

export default function SpaceUFO({ size = 52 }: SpaceUFOProps) {
  return (
    <Svg width={size} height={size * 0.72} viewBox="0 0 160 115">
      <Defs>
        {/* 돔 */}
        <LinearGradient id="ufoDome" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#DDF5FF" />
          <Stop offset="0.45" stopColor="#CFC9FF" />
          <Stop offset="1" stopColor="#AAA0E9" />
        </LinearGradient>

        {/* UFO 본체 */}
        <LinearGradient id="ufoBody" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFD7F0" />
          <Stop offset="0.48" stopColor="#FFB9E5" />
          <Stop offset="1" stopColor="#9D70E8" />
        </LinearGradient>

        {/* 하부 */}
        <LinearGradient id="ufoBottom" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#B98AF2" />
          <Stop offset="1" stopColor="#7C5CDB" />
        </LinearGradient>

        {/* 빛 */}
        <RadialGradient id="ufoGlow" cx="0.5" cy="0.5" r="0.5">
          <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.8" />
          <Stop offset="1" stopColor="#DCCFFF" stopOpacity="0" />
        </RadialGradient>
      </Defs>

      {/* 아래쪽 은은한 후광 */}
      <Ellipse cx="80" cy="101" rx="48" ry="10" fill="url(#ufoGlow)" />

      {/* 빛줄기 */}
      <Path
        d="M55 72 L68 102 L92 102 L105 72 Z"
        fill="#FFF4A8"
        opacity={0.22}
      />

      {/* 돔 */}
      <Ellipse cx="80" cy="43" rx="34" ry="25" fill="url(#ufoDome)" />

      {/* 돔 유리 반사광 */}
      <Ellipse
        cx="67"
        cy="31"
        rx="13"
        ry="6"
        fill="#FFFFFF"
        opacity={0.52}
        transform="rotate(-20 67 31)"
      />

      <Ellipse cx="60" cy="40" rx="5" ry="3" fill="#FFFFFF" opacity={0.28} />

      {/* 외계인 */}
      <Circle cx="80" cy="47" r="13" fill="#B8EFA4" />

      {/* 외계인 얼굴 */}
      <Ellipse cx="75" cy="46" rx="2.8" ry="4" fill="#FFFFFF" />

      <Ellipse cx="85" cy="46" rx="2.8" ry="4" fill="#FFFFFF" />

      <Circle cx="75" cy="47" r="1.4" fill="#5B4D79" />

      <Circle cx="85" cy="47" r="1.4" fill="#5B4D79" />

      {/* 볼 */}
      <Circle cx="70" cy="53" r="3" fill="#FF9FC3" opacity={0.65} />

      <Circle cx="90" cy="53" r="3" fill="#FF9FC3" opacity={0.65} />

      {/* 미소 */}
      <Path
        d="M76 54 Q80 58 84 54"
        fill="none"
        stroke="#6E5889"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* UFO 본체 */}
      <Ellipse cx="80" cy="68" rx="67" ry="25" fill="url(#ufoBody)" />

      {/* 가운데 부드러운 하이라이트 */}
      <Ellipse cx="80" cy="62" rx="45" ry="12" fill="#FFFFFF" opacity={0.18} />

      {/* 하부 */}
      <Path
        d="M20 69 Q80 104 140 69 Q132 94 80 98 Q28 94 20 69Z"
        fill="url(#ufoBottom)"
      />

      {/* 조명 3개 */}
      <Circle cx="45" cy="77" r="5" fill="#FFE66D" />

      <Circle cx="80" cy="84" r="5" fill="#FFF0A2" />

      <Circle cx="115" cy="77" r="5" fill="#FFE66D" />

      {/* 조명 반사 */}
      <Circle cx="43" cy="75" r="1.8" fill="#FFFFFF" opacity={0.7} />

      <Circle cx="78" cy="82" r="1.8" fill="#FFFFFF" opacity={0.7} />

      <Circle cx="113" cy="75" r="1.8" fill="#FFFFFF" opacity={0.7} />
    </Svg>
  );
}

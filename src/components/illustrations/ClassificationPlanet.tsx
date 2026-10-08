import React from "react";
import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  RadialGradient,
  Stop,
} from "react-native-svg";

import { ClassificationGameType } from "../../types/game";

type Props = {
  type: ClassificationGameType;
  size?: number;
};

const PLANET = {
  color: {
    light: "#FFB8D4",
    main: "#F78FB9",
    dark: "#D96C9C",
    ringLight: "#FFE59A",
    ringDark: "#F4B95F",
  },

  shape: {
    light: "#BFD4FF",
    main: "#8FAEFF",
    dark: "#6884E5",
    ringLight: "#C8B9FF",
    ringDark: "#9275E8",
  },

  size: {
    light: "#C9F5D5",
    main: "#88D7A4",
    dark: "#5EBA83",
    ringLight: "#B9F0E4",
    ringDark: "#67CFC0",
  },

  category: {
    light: "#FFE9A8",
    main: "#FFD36F",
    dark: "#EFAF45",
    ringLight: "#FFF0B8",
    ringDark: "#F3C55B",
  },
} as const;

export default function ClassificationPlanet({ type, size = 145 }: Props) {
  const colors = PLANET[type];

  return (
    <Svg width={size} height={size} viewBox="0 0 180 180">
      <Defs>
        {/* 행성 본체 */}
        <RadialGradient id={`planet-${type}`} cx="34%" cy="27%" r="72%">
          <Stop offset="0" stopColor={colors.light} />

          <Stop offset="0.48" stopColor={colors.main} />

          <Stop offset="1" stopColor={colors.dark} />
        </RadialGradient>

        {/* 행성 링 */}
        <LinearGradient id={`ring-${type}`} x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={colors.ringLight} />

          <Stop offset="1" stopColor={colors.ringDark} />
        </LinearGradient>

        {/* 크레이터 */}
        <RadialGradient id={`crater-${type}`} cx="35%" cy="30%" r="70%">
          <Stop offset="0" stopColor="#FFFFFF" stopOpacity={0.15} />

          <Stop offset="0.65" stopColor={colors.dark} stopOpacity={0.22} />

          <Stop offset="1" stopColor={colors.dark} stopOpacity={0.38} />
        </RadialGradient>
      </Defs>

      {/* 뒤쪽 링 */}
      <Ellipse
        cx="90"
        cy="92"
        rx="82"
        ry="30"
        fill="none"
        stroke={`url(#ring-${type})`}
        strokeWidth="11"
        opacity={0.8}
        transform="rotate(-18 90 92)"
      />

      {/* 행성 */}
      <Circle cx="90" cy="90" r="57" fill={`url(#planet-${type})`} />

      {/* 표면 크레이터 */}
      <Circle cx="54" cy="99" r="13" fill={`url(#crater-${type})`} />

      <Circle cx="121" cy="68" r="10" fill={`url(#crater-${type})`} />

      <Circle cx="111" cy="117" r="7" fill={`url(#crater-${type})`} />

      {/* 타입별 표면 요소 */}
      {type === "color" && <ColorDetails />}

      {type === "shape" && <ShapeDetails />}

      {type === "size" && <SizeDetails />}

      {type === "category" && <CategoryDetails />}

      {/* 행성 하이라이트 */}
      <Ellipse
        cx="61"
        cy="51"
        rx="22"
        ry="9"
        fill="#FFFFFF"
        opacity={0.34}
        transform="rotate(-28 61 51)"
      />

      <Ellipse
        cx="48"
        cy="65"
        rx="8"
        ry="4"
        fill="#FFFFFF"
        opacity={0.18}
        transform="rotate(-28 48 65)"
      />

      {/* 앞쪽 링 */}

      <Path
        d="M12 118 Q90 149 164 82"
        fill="none"
        stroke={`url(#ring-${type})`}
        strokeWidth="11"
        strokeLinecap="round"
        opacity={0.9}
      />
    </Svg>
  );
}
function ColorDetails() {
  return (
    <G>
      <Circle cx="70" cy="87" r="7" fill="#FF6FAE" opacity={0.65} />

      <Circle cx="91" cy="108" r="6" fill="#55D6BE" opacity={0.65} />

      <Circle cx="107" cy="82" r="7" fill="#FFD95A" opacity={0.65} />

      <Circle cx="79" cy="70" r="5" fill="#4D8DFF" opacity={0.65} />
    </G>
  );
}
function ShapeDetails() {
  return (
    <G opacity={0.58}>
      <Path d="M72 93 L81 78 L90 93 Z" fill="#FFFFFF" />

      <Path d="M101 101 L110 101 L110 110 L101 110 Z" fill="#C8B9FF" />

      <Circle cx="57" cy="76" r="6" fill="#FFFFFF" />
    </G>
  );
}
function SizeDetails() {
  return (
    <G>
      <Circle cx="65" cy="83" r="11" fill="#B9F0E4" opacity={0.7} />

      <Circle cx="90" cy="78" r="7" fill="#67CFC0" opacity={0.55} />

      <Circle cx="110" cy="92" r="4" fill="#FFFFFF" opacity={0.7} />
    </G>
  );
}
function CategoryDetails() {
  return (
    <G>
      {/* 발자국 느낌 */}
      <Circle cx="67" cy="92" r="6" fill="#F1B653" opacity={0.45} />

      <Circle cx="58" cy="84" r="3" fill="#F1B653" opacity={0.4} />

      <Circle cx="68" cy="81" r="3" fill="#F1B653" opacity={0.4} />

      <Circle cx="78" cy="84" r="3" fill="#F1B653" opacity={0.4} />
    </G>
  );
}

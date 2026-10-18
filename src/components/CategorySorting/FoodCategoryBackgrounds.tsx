import React from "react";
import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from "react-native-svg";

export type FoodBackgroundKind =
  | "food"
  | "fruit"
  | "vegetable"
  | "meal"
  | "snack"
  | "drink";
type Props = { width?: number | string; height?: number | string };

const Sky = ({ top, bottom }: { top: string; bottom: string }) => (
  <>
    <Defs>
      <LinearGradient
        id={`foodSky${top.replace("#", "")}`}
        x1="0"
        y1="0"
        x2="0"
        y2="1"
      >
        <Stop offset="0" stopColor={top} />
        <Stop offset="1" stopColor={bottom} />
      </LinearGradient>
    </Defs>
    <Rect
      width="240"
      height="180"
      fill={`url(#foodSky${top.replace("#", "")})`}
    />
  </>
);
const Cloud = ({
  x,
  y,
  scale = 1,
}: {
  x: number;
  y: number;
  scale?: number;
}) => (
  <G transform={`translate(${x} ${y}) scale(${scale})`} opacity={0.75}>
    <Circle cx="0" cy="8" r="8" fill="#FFFFFF" />
    <Circle cx="10" cy="3" r="11" fill="#FFFFFF" />
    <Circle cx="22" cy="8" r="8" fill="#FFFFFF" />
    <Rect x="-2" y="7" width="26" height="9" rx="4" fill="#FFFFFF" />
  </G>
);
const LeafTuft = ({
  x,
  y,
  color = "#77B96B",
}: {
  x: number;
  y: number;
  color?: string;
}) => (
  <G>
    <Path
      d={`M${x} ${y} Q${x - 12} ${y - 13} ${x - 7} ${y - 20} Q${x + 4} ${y - 13} ${x} ${y}Z`}
      fill={color}
    />
    <Path
      d={`M${x} ${y} Q${x + 1} ${y - 17} ${x + 13} ${y - 19} Q${x + 14} ${y - 7} ${x} ${y}Z`}
      fill={color}
    />
  </G>
);

export function FoodBackground({ width = "240", height = "180" }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 240 180">
      <Sky top="#D9F3FB" bottom="#F6FBEF" />
      <Path
        d="M0 94 Q43 72 83 91 T163 85 T240 91 L240 180 L0 180Z"
        fill="#B9E3A2"
      />
      <Path
        d="M0 126 Q53 110 111 127 T240 119 L240 180 L0 180Z"
        fill="#D8EFB0"
      />
      <Path
        d="M0 151 Q67 137 126 151 T240 145 L240 180 L0 180Z"
        fill="#A8D77D"
      />
      <Cloud x={18} y={23} scale={0.7} />
      <Cloud x={176} y={31} scale={0.65} />
      <LeafTuft x={23} y={165} />
      <LeafTuft x={56} y={151} color="#8ACB76" />
      <LeafTuft x={190} y={161} />
      <LeafTuft x={219} y={146} color="#8ACB76" />
      <Ellipse cx="120" cy="171" rx="65" ry="5" fill="#91C96D" opacity="0.25" />
    </Svg>
  );
}

export function FruitBackground({ width = "240", height = "180" }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 240 180">
      <Sky top="#E5F6D9" bottom="#FFF8E8" />
      <Path
        d="M0 109 Q48 90 95 108 T184 102 T240 107 L240 180 L0 180Z"
        fill="#BFE3A0"
      />
      <Path
        d="M0 135 Q54 119 111 137 T240 128 L240 180 L0 180Z"
        fill="#D9EBA8"
      />
      <G>
        <Path
          d="M22 28 Q16 52 23 83 L18 132 L32 132 L31 82 Q38 51 33 28Z"
          fill="#A87950"
        />
        <Circle cx="25" cy="30" r="24" fill="#7ABF70" />
        <Circle cx="46" cy="37" r="19" fill="#8DCC7A" />
        <Path
          d="M26 55 L48 43"
          stroke="#A87950"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </G>
      <G>
        <Path
          d="M202 30 Q196 55 203 82 L198 132 L212 132 L211 82 Q218 54 213 30Z"
          fill="#A87950"
        />
        <Circle cx="202" cy="32" r="24" fill="#7ABF70" />
        <Circle cx="221" cy="39" r="19" fill="#8DCC7A" />
      </G>
      <Path
        d="M0 151 Q58 139 120 151 T240 146 L240 180 L0 180Z"
        fill="#A6D47D"
      />
      <LeafTuft x={53} y={164} />
      <LeafTuft x={93} y={157} color="#8BCB77" />
      <LeafTuft x={160} y={165} />
      <LeafTuft x={188} y={153} color="#8BCB77" />
      <Path
        d="M54 115 Q120 106 186 115"
        stroke="#9ACB7C"
        strokeWidth="2"
        strokeDasharray="4 5"
        fill="none"
        opacity="0.65"
      />
    </Svg>
  );
}

export function VegetableBackground({ width = "240", height = "180" }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 240 180">
      <Sky top="#D8F1DB" bottom="#F4F9D9" />
      <Path
        d="M0 76 Q42 61 80 78 T159 75 T240 76 L240 180 L0 180Z"
        fill="#B7DDA0"
      />
      <Path
        d="M0 111 Q60 88 120 111 T240 105 L240 144 Q180 132 120 146 T0 145Z"
        fill="#B77D59"
      />
      <Path
        d="M0 122 Q60 102 120 122 T240 116"
        stroke="#D49A70"
        strokeWidth="4"
        fill="none"
      />
      <Path
        d="M0 145 Q60 126 120 145 T240 139 L240 180 L0 180Z"
        fill="#D8ECA0"
      />
      <Path
        d="M20 111 Q29 99 36 112 M52 103 Q61 91 68 104 M177 108 Q186 96 193 109 M208 104 Q217 92 224 105"
        stroke="#78B66B"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M32 151 L42 180 M87 145 L92 180 M150 148 L145 180 M208 145 L217 180"
        stroke="#B6D889"
        strokeWidth="2"
        opacity="0.75"
      />
      <Cloud x={18} y={24} scale={0.7} />
      <Cloud x={171} y={28} scale={0.65} />
      <LeafTuft x={10} y={165} color="#78B66B" />
      <LeafTuft x={226} y={166} color="#78B66B" />
    </Svg>
  );
}

export function MealBackground({ width = "240", height = "180" }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 240 180">
      <Sky top="#FBE8D8" bottom="#FFF8EE" />
      <Rect x="0" y="26" width="240" height="128" rx="8" fill="#F3D2AD" />
      <Path
        d="M0 47 H240 M0 78 H240 M0 109 H240 M0 140 H240"
        stroke="#E7BC8F"
        strokeWidth="2"
        opacity="0.65"
      />
      <Path
        d="M0 154 Q60 147 120 154 T240 151 L240 180 L0 180Z"
        fill="#D9A878"
      />
      <Path
        d="M16 35 Q38 30 60 35 M180 35 Q202 30 224 35"
        stroke="#FFF1DA"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.8"
      />
      <Circle cx="18" cy="62" r="3" fill="#E9B989" />
      <Circle cx="222" cy="93" r="3" fill="#E9B989" />
      <Path
        d="M24 164 L24 180 M216 164 L216 180"
        stroke="#C78F60"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function SnackBackground({ width = "240", height = "180" }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 240 180">
      <Sky top="#FCE7EF" bottom="#FFF7F0" />
      <Path d="M0 66 L240 66 L240 180 L0 180Z" fill="#F7D6C7" />
      <Path d="M0 65 L240 65 L224 42 L16 42Z" fill="#FFF2E6" />
      <Path d="M16 42 L48 42 L42 65 L10 65Z" fill="#E98F9E" />
      <Path d="M48 42 L80 42 L74 65 L42 65Z" fill="#FFF8EE" />
      <Path d="M80 42 L112 42 L106 65 L74 65Z" fill="#E98F9E" />
      <Path d="M112 42 L144 42 L138 65 L106 65Z" fill="#FFF8EE" />
      <Path d="M144 42 L176 42 L170 65 L138 65Z" fill="#E98F9E" />
      <Path d="M176 42 L208 42 L202 65 L170 65Z" fill="#FFF8EE" />
      <Path d="M208 42 L230 42 L240 65 L202 65Z" fill="#E98F9E" />
      <Rect x="0" y="112" width="240" height="14" fill="#D99B85" />
      <Rect x="0" y="126" width="240" height="8" fill="#FCEBDD" />
      <Rect x="0" y="134" width="240" height="46" fill="#E8B6A4" />
      <Path
        d="M0 150 H240 M0 166 H240"
        stroke="#DDA392"
        strokeWidth="2"
        opacity="0.75"
      />
      <Rect
        x="18"
        y="78"
        width="204"
        height="28"
        rx="7"
        fill="#FCE9DF"
        opacity="0.72"
      />
    </Svg>
  );
}

export function DrinkBackground({ width = "240", height = "180" }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 240 180">
      <Sky top="#D9F3FB" bottom="#F4FCFF" />
      <Path
        d="M78 56 L162 56 L151 136 Q120 150 89 136Z"
        fill="#FFFFFF"
        fillOpacity="0.42"
        stroke="#79C7E0"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <Path
        d="M83 67 L157 67 L150 127 Q120 139 92 127Z"
        fill="#A7E6F3"
        fillOpacity="0.55"
      />
      <Path
        d="M139 54 L154 23"
        stroke="#E98C9A"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <Path
        d="M139 54 L154 23"
        stroke="#FFF5F1"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Ellipse
        cx="120"
        cy="56"
        rx="43"
        ry="7"
        fill="#FFFFFF"
        fillOpacity="0.55"
        stroke="#79C7E0"
        strokeWidth="2"
      />
      <Path
        d="M98 80 Q103 76 108 80 M98 91 Q103 87 108 91"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.85"
      />
      <Circle cx="38" cy="49" r="5" fill="#A9E4F1" />
      <Circle cx="196" cy="84" r="4" fill="#A9E4F1" />
      <Path
        d="M0 150 Q56 140 112 150 T240 147 L240 180 L0 180Z"
        fill="#D9F0F5"
      />
      <Path
        d="M28 163 Q40 155 52 163 M187 161 Q199 153 211 161"
        stroke="#A9DDEB"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}

const COMPONENTS: Record<FoodBackgroundKind, React.ComponentType<Props>> = {
  food: FoodBackground,
  fruit: FruitBackground,
  vegetable: VegetableBackground,
  meal: MealBackground,
  snack: SnackBackground,
  drink: DrinkBackground,
};

export default function FoodCategoryBackground({
  category,
  width = "240",
  height = "180",
}: Props & { category: FoodBackgroundKind }) {
  const Component = COMPONENTS[category];
  return <Component width={width} height={height} />;
}

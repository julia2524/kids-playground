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

export type AnimalBackgroundKind =
  | "animal"
  | "pet"
  | "farm_animal"
  | "wild_animal"
  | "sea_animal"
  | "bird"
  | "insect";

type Props = {
  width?: string | number;
  height?: string | number;
};

const Sky = () => (
  <>
    <Defs>
      <LinearGradient id="animalLandSky" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0" stopColor="#C9F0FB" />
        <Stop offset="1" stopColor="#F2FBFD" />
      </LinearGradient>
    </Defs>
    <Rect width="240" height="180" fill="url(#animalLandSky)" />
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
  <G transform={`translate(${x} ${y}) scale(${scale})`} opacity={0.86}>
    <Circle cx="0" cy="8" r="10" fill="#FFFFFF" />
    <Circle cx="12" cy="1" r="14" fill="#FFFFFF" />
    <Circle cx="27" cy="8" r="10" fill="#FFFFFF" />
    <Rect x="-2" y="7" width="32" height="11" rx="5" fill="#FFFFFF" />
  </G>
);

const Grass = ({
  x,
  y,
  color = "#79BE69",
}: {
  x: number;
  y: number;
  color?: string;
}) => (
  <G>
    <Path d={`M${x} ${y} q-8 -12 -2 -18 q8 7 2 18`} fill={color} />
    <Path d={`M${x} ${y} q2 -16 12 -19 q2 12 -12 19`} fill={color} />
    <Path d={`M${x} ${y} q9 -8 16 -5 q-4 9 -16 5`} fill={color} />
  </G>
);

const Fence = ({
  x = 0,
  y = 105,
  width = 84,
}: {
  x?: number;
  y?: number;
  width?: number;
}) => {
  const posts = Math.max(2, Math.floor(width / 18));
  return (
    <G transform={`translate(${x} ${y})`}>
      <Rect x="0" y="8" width={width} height="5" rx="2" fill="#FFF8E9" />
      <Rect x="0" y="22" width={width} height="5" rx="2" fill="#FFF8E9" />
      {Array.from({ length: posts + 1 }, (_, i) => (
        <G key={i} transform={`translate(${i * (width / posts)} 0)`}>
          <Rect x="-3" y="0" width="6" height="31" rx="2" fill="#FFF8E9" />
          <Path d="M-3 2 L0 -3 L3 2 Z" fill="#FFF8E9" />
        </G>
      ))}
    </G>
  );
};

/** Broad meadow background for the top-level animal target. */
export function AnimalBackground({ width = "240", height = "180" }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 240 180">
      <Sky />
      <Cloud x={22} y={22} scale={0.8} />
      <Cloud x={163} y={30} scale={0.72} />
      <Path
        d="M0 88 Q40 54 82 76 T160 70 T240 64 L240 180 L0 180Z"
        fill="#A9DDBA"
      />
      <Path d="M0 112 Q55 86 112 108 T240 94 L240 180 L0 180Z" fill="#C8ECA0" />
      <Path
        d="M0 130 Q60 114 120 130 T240 122 L240 180 L0 180Z"
        fill="#B5E37D"
      />
      <Fence x={0} y={104} width={58} />
      <Fence x={181} y={105} width={59} />
      <Grass x={42} y={153} />
      <Grass x={88} y={143} color="#8BCB73" />
      <Grass x={178} y={157} />
      <Grass x={215} y={137} color="#8BCB73" />
      <Ellipse cx="116" cy="171" rx="78" ry="7" fill="#A2D66F" opacity="0.35" />
    </Svg>
  );
}

/** Pet yard: doghouse and fence are environmental structures, not animal stickers. */
export function PetBackground({ width = "240", height = "180" }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 240 180">
      <Sky />
      <Cloud x={16} y={25} scale={0.65} />
      <Path
        d="M0 83 Q38 54 72 75 T145 70 T240 66 L240 180 L0 180Z"
        fill="#B5E3A6"
      />
      <Path
        d="M0 115 Q70 96 122 113 T240 105 L240 180 L0 180Z"
        fill="#D3EFA8"
      />
      <Path
        d="M69 85 L111 48 L153 85 L153 132 L69 132Z"
        fill="#F8DFA3"
        stroke="#D9B878"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <Path
        d="M59 86 L111 39 L164 86 L155 92 L111 53 L68 92Z"
        fill="#76B96D"
        stroke="#5D9E5B"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <Path
        d="M94 132 L94 105 Q94 88 111 88 Q128 88 128 105 L128 132Z"
        fill="#9D805E"
      />
      <Path
        d="M0 104 L65 104 M0 118 L65 118"
        stroke="#FFF9EA"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {[10, 30, 50].map((x) => (
        <Rect
          key={x}
          x={x}
          y="96"
          width="5"
          height="29"
          rx="2"
          fill="#FFF9EA"
        />
      ))}
      <Grass x={25} y={154} />
      <Grass x={182} y={152} />
      <Grass x={211} y={135} color="#8CCB78" />
      <Ellipse cx="118" cy="164" rx="77" ry="7" fill="#9CCF72" opacity="0.3" />
    </Svg>
  );
}

/** Farmyard: barn, open field, and fence; no farm animals or loose props. */
export function FarmAnimalBackground({ width = "240", height = "180" }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 240 180">
      <Sky />
      <Cloud x={18} y={20} scale={0.7} />
      <Cloud x={170} y={27} scale={0.62} />
      <Path
        d="M0 82 Q46 55 93 75 T178 68 T240 72 L240 180 L0 180Z"
        fill="#A6D9A1"
      />
      <Path d="M0 108 Q60 92 120 108 T240 96 L240 180 L0 180Z" fill="#D8E9A0" />
      <Path d="M0 123 L240 108 L240 180 L0 180Z" fill="#EFD89C" />
      <Path
        d="M21 82 L56 54 L92 82 L92 119 L21 119Z"
        fill="#F28A72"
        stroke="#D96D5A"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <Path
        d="M14 82 L56 48 L99 82 L91 87 L56 60 L22 87Z"
        fill="#B96D58"
        stroke="#A75D4C"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <Rect x="42" y="89" width="28" height="30" rx="2" fill="#FFE6C9" />
      <Path
        d="M42 89 L70 119 M70 89 L42 119"
        stroke="#D96D5A"
        strokeWidth="3"
      />
      <Fence x={106} y={103} width={134} />
      <Path
        d="M0 150 Q70 139 124 151 T240 144"
        stroke="#D7C27F"
        strokeWidth="2"
        fill="none"
        opacity="0.65"
      />
      <Grass x={20} y={162} color="#8BC56D" />
      <Grass x={139} y={160} color="#8BC56D" />
      <Grass x={218} y={164} color="#8BC56D" />
    </Svg>
  );
}

/** Woodland clearing: layered trees and hills, with the center kept open. */
export function WildAnimalBackground({ width = "240", height = "180" }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 240 180">
      <Sky />
      <Path
        d="M0 78 L37 39 L68 72 L105 31 L151 76 L190 40 L240 79 L240 180 L0 180Z"
        fill="#9BCDBB"
      />
      <Path
        d="M0 95 Q35 69 69 92 T139 88 T240 84 L240 180 L0 180Z"
        fill="#76B98C"
      />
      <Path
        d="M8 20 Q3 44 12 70 L5 122 L26 122 L24 70 Q31 42 28 20Z"
        fill="#A8754F"
      />
      <Path
        d="M14 55 L1 39 M22 49 L39 31"
        stroke="#A8754F"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <Path
        d="M190 13 Q184 44 195 73 L189 120 L210 120 L207 72 Q217 42 210 13Z"
        fill="#A8754F"
      />
      <Path
        d="M197 48 L179 29 M205 42 L225 25"
        stroke="#A8754F"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <Circle cx="13" cy="25" r="29" fill="#62B77A" />
      <Circle cx="38" cy="27" r="24" fill="#78C687" />
      <Circle cx="197" cy="22" r="30" fill="#62B77A" />
      <Circle cx="222" cy="31" r="25" fill="#78C687" />
      <Path
        d="M0 121 Q54 98 108 119 T240 112 L240 180 L0 180Z"
        fill="#A9D982"
      />
      <Path
        d="M0 145 Q58 127 120 145 T240 137 L240 180 L0 180Z"
        fill="#91CF75"
      />
      <Grass x={36} y={164} />
      <Grass x={78} y={153} color="#70B96A" />
      <Grass x={164} y={160} />
      <Grass x={220} y={150} color="#70B96A" />
      <Ellipse cx="118" cy="171" rx="54" ry="6" fill="#7EBD69" opacity="0.35" />
    </Svg>
  );
}

/** Underwater scene: water, light rays and sea plants only. */
export function SeaAnimalBackground({ width = "240", height = "180" }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 240 180">
      <Defs>
        <LinearGradient id="animalUnderwater" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#76D8F0" />
          <Stop offset="1" stopColor="#168FC8" />
        </LinearGradient>
      </Defs>
      <Rect width="240" height="180" fill="url(#animalUnderwater)" />
      <Path
        d="M0 28 Q32 17 60 29 T120 28 T180 28 T240 24"
        stroke="#B8F0F8"
        strokeWidth="3"
        opacity="0.7"
        fill="none"
      />
      <Path d="M24 0 L67 0 L112 138 L76 138Z" fill="#C5F6FC" opacity="0.13" />
      <Path
        d="M124 0 L158 0 L193 128 L165 128Z"
        fill="#C5F6FC"
        opacity="0.13"
      />
      {[
        { x: 26, y: 54, r: 4 },
        { x: 48, y: 79, r: 3 },
        { x: 199, y: 48, r: 5 },
        { x: 215, y: 86, r: 3 },
        { x: 151, y: 62, r: 3 },
      ].map((b, i) => (
        <Circle
          key={i}
          cx={b.x}
          cy={b.y}
          r={b.r}
          fill="#D8FAFF"
          opacity="0.75"
        />
      ))}
      <Path
        d="M0 143 Q42 135 82 145 T160 143 T240 140 L240 180 L0 180Z"
        fill="#F5DDA5"
      />
      <Path d="M18 151 Q7 127 18 111 Q31 130 18 151Z" fill="#278FB0" />
      <Path d="M29 153 Q22 126 42 116 Q47 139 29 153Z" fill="#36A8BD" />
      <Path d="M218 151 Q207 126 219 107 Q231 128 218 151Z" fill="#278FB0" />
      <Path d="M229 154 Q222 131 237 119 L240 144Z" fill="#36A8BD" />
      <Path d="M10 151 Q17 138 29 145 Q24 158 10 151Z" fill="#7DCFC5" />
      <Path d="M205 153 Q216 139 229 147 Q220 161 205 153Z" fill="#7DCFC5" />
      <Ellipse cx="120" cy="170" rx="82" ry="5" fill="#E8C987" opacity="0.45" />
    </Svg>
  );
}

/** Bird habitat: branch and empty nest, without birds or eggs. */
export function BirdBackground({ width = "240", height = "180 " }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 240 180">
      <Sky />
      <Cloud x={145} y={32} scale={0.9} />
      <Circle cx="23" cy="28" r="29" fill="#7AC78B" />
      <Circle cx="48" cy="24" r="25" fill="#91D39A" />
      <Path
        d="M10 0 Q6 35 17 61 L12 126 L29 126 L27 60 Q37 32 31 0Z"
        fill="#A9774D"
      />
      <Path
        d="M20 49 L49 29 M19 65 L1 48"
        stroke="#A9774D"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <Path
        d="M17 120 Q65 103 102 121 T240 116 L240 180 L0 180 L0 140Z"
        fill="#A9DDA0"
      />
      <Path
        d="M0 150 Q68 132 126 151 T240 145 L240 180 L0 180Z"
        fill="#C9EAA0"
      />

      <G transform="translate(-20,-5)">
        {/* 둥지 받치는 가지 */}
        <Path
          d="M15 82 Q48 75 78 77 Q108 79 130 72"
          stroke="#A9774D"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* 둥지 */}
        <Path
          d="M68 67 Q78 49 102 57 Q126 50 139 68 L133 84 Q101 98 74 83Z"
          fill="#B98652"
        />

        <Path
          d="M73 66 Q100 75 135 65
     M75 74 Q102 84 133 74
     M81 82 Q104 90 129 81"
          stroke="#D7AD70"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />

        <Path
          d="M66 66 Q98 47 140 66"
          stroke="#E0BD80"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      </G>
      {/* <Path d="M38 72 Q53 60 64 74 Q52 84 38 72Z" fill="#79C77D" />
      <Path d="M151 98 Q164 80 177 92 Q166 106 151 98Z" fill="#79C77D" /> */}
      <Grass x={180} y={162} color="#78C575" />
      <Grass x={211} y={155} color="#8ACD7B" />
    </Svg>
  );
}

/** Flower meadow for insects: no butterflies, ladybugs, or other insect-like decorations. */
export function InsectBackground({ width = "240", height = "180" }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 240 180">
      <Sky />
      <Cloud x={18} y={25} scale={0.75} />
      <Cloud x={164} y={22} scale={0.8} />
      <Path
        d="M0 94 Q44 71 87 91 T166 85 T240 92 L240 180 L0 180Z"
        fill="#A9DCA0"
      />
      <Path
        d="M0 120 Q47 102 100 120 T190 113 T240 119 L240 180 L0 180Z"
        fill="#C6E99B"
      />
      <Path
        d="M0 145 Q65 130 124 145 T240 138 L240 180 L0 180Z"
        fill="#A5D97D"
      />
      <G transform="translate(26 116)">
        {[0, 72, 144, 216, 288].map((a) => (
          <Ellipse
            key={a}
            cx="0"
            cy="-8"
            rx="4.5"
            ry="7"
            fill="#F7A7C3"
            transform={`rotate(${a})`}
          />
        ))}
        <Circle r="5" fill="#F7D76A" />
        <Path
          d="M0 6 L-2 34"
          stroke="#65AF6C"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <Path d="M-2 22 Q-14 12 -16 23 Q-9 29 -2 22Z" fill="#79C77B" />
      </G>
      <G transform="translate(209 129)">
        {[0, 72, 144, 216, 288].map((a) => (
          <Ellipse
            key={a}
            cx="0"
            cy="-7"
            rx="4"
            ry="6"
            fill="#FFF6E5"
            transform={`rotate(${a})`}
          />
        ))}
        <Circle r="4.5" fill="#F6D35E" />
        <Path
          d="M0 5 L-2 27"
          stroke="#65AF6C"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </G>
      <G transform="translate(68 145)">
        {[0, 72, 144, 216, 288].map((a) => (
          <Ellipse
            key={a}
            cx="0"
            cy="-6"
            rx="4"
            ry="5.5"
            fill="#F7D76A"
            transform={`rotate(${a})`}
          />
        ))}
        <Circle r="4" fill="#FFF0B2" />
        <Path
          d="M0 5 L2 21"
          stroke="#65AF6C"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </G>
      <Grass x={7} y={169} color="#6DBB69" />
      <Grass x={125} y={163} color="#7FC774" />
      <Grass x={230} y={167} color="#6DBB69" />
    </Svg>
  );
}

const BACKGROUNDS: Record<AnimalBackgroundKind, React.ComponentType<Props>> = {
  animal: AnimalBackground,
  pet: PetBackground,
  farm_animal: FarmAnimalBackground,
  wild_animal: WildAnimalBackground,
  sea_animal: SeaAnimalBackground,
  bird: BirdBackground,
  insect: InsectBackground,
};

/** Use this when the target category is dynamic. */
export default function AnimalCategoryBackground({
  category,
  width = "240",
  height = "180",
}: Props & { category: AnimalBackgroundKind }) {
  const Background = BACKGROUNDS[category];
  return <Background width={width} height={height} />;
}

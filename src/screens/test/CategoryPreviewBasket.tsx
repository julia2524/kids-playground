import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, {
  Circle,
  Ellipse,
  G,
  Line,
  Path,
  Polygon,
  Rect,
} from "react-native-svg";

type CategoryBasketProps = {
  topCategory?: string;
  subCategory?: string;
  size?: number;
};

/**
 * Generator target를 시각적으로 표현하는 테스트용 바구니.
 * 텍스트나 이모지 없이 SVG 도형만으로 대분류/중분류를 구분한다.
 *
 * 사용 예:
 * <CategoryBasket topCategory={target.topCategory}
 *                 subCategory={target.subCategory} size={118} />
 */
const PALETTE = {
  ink: "#51443D",
  basket: "#DCA66B",
  basketLight: "#F3D4A4",
  basketDark: "#B97843",
  cream: "#FFF8E9",
  sky: "#A8DDF4",
  blue: "#63B8E6",
  green: "#77B96A",
  greenDark: "#43865B",
  yellow: "#FFD45E",
  orange: "#F5A04C",
  red: "#F17869",
  pink: "#F4A8C3",
  purple: "#B6A0E8",
  brown: "#9B674B",
  white: "#FFFFFF",
};

const TOP_STYLE: Record<string, { body: string; rim: string; accent: string }> =
  {
    animal: { body: "#E7B77B", rim: "#F5D4A4", accent: "#8A654A" },
    food: { body: "#EFAE85", rim: "#FFD5B5", accent: "#C96D51" },
    clothing: { body: "#B7A5E8", rim: "#D9CDF7", accent: "#7766B1" },
    living: { body: "#8FBF9A", rim: "#C6E3C8", accent: "#4E8660" },
    things: { body: "#8FBF9A", rim: "#C6E3C8", accent: "#4E8660" },
    vehicle: { body: "#83B8D8", rim: "#C2E4F4", accent: "#477E9D" },
    nature: { body: "#91C987", rim: "#C8E9B9", accent: "#4F9155" },
    unknown: { body: "#C3B8A9", rim: "#E7DED0", accent: "#817567" },
  };

function Leaf({
  x,
  y,
  scale = 1,
  color = PALETTE.green,
}: {
  x: number;
  y: number;
  scale?: number;
  color?: string;
}) {
  return (
    <G transform={`translate(${x} ${y}) scale(${scale})`}>
      <Path
        d="M0 9 C-13 0 -10 -12 2 -12 C12 -10 12 1 0 9Z"
        fill={color}
        stroke={PALETTE.ink}
        strokeWidth={1.1}
      />
      <Path d="M0 8 L2 -8" stroke="#E7F2C8" strokeWidth={1.2} />
    </G>
  );
}

function Flower({
  x,
  y,
  color = PALETTE.pink,
  scale = 1,
}: {
  x: number;
  y: number;
  color?: string;
  scale?: number;
}) {
  return (
    <G transform={`translate(${x} ${y}) scale(${scale})`}>
      <Path
        d="M0 8 L0 22"
        stroke={PALETTE.greenDark}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
      <Ellipse cx="0" cy="-5" rx="4.5" ry="7" fill={color} />
      <Ellipse
        cx="0"
        cy="-5"
        rx="4.5"
        ry="7"
        fill={color}
        transform="rotate(72)"
      />
      <Ellipse
        cx="0"
        cy="-5"
        rx="4.5"
        ry="7"
        fill={color}
        transform="rotate(144)"
      />
      <Ellipse
        cx="0"
        cy="-5"
        rx="4.5"
        ry="7"
        fill={color}
        transform="rotate(216)"
      />
      <Ellipse
        cx="0"
        cy="-5"
        rx="4.5"
        ry="7"
        fill={color}
        transform="rotate(288)"
      />
      <Circle cx="0" cy="-5" r="3.5" fill={PALETTE.yellow} />
    </G>
  );
}

function Bird({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <G transform={`translate(${x} ${y}) scale(${scale})`}>
      <Ellipse
        cx="0"
        cy="0"
        rx="11"
        ry="8"
        fill="#79BDE5"
        stroke={PALETTE.ink}
        strokeWidth={1.1}
      />
      <Ellipse cx="-2" cy="2" rx="6" ry="4.5" fill="#D7F0FA" />
      <Circle
        cx="7"
        cy="-7"
        r="6"
        fill="#79BDE5"
        stroke={PALETTE.ink}
        strokeWidth={1.1}
      />
      <Circle cx="9" cy="-8" r="1.1" fill={PALETTE.ink} />
      <Polygon
        points="13,-7 19,-5 13,-3"
        fill={PALETTE.orange}
        stroke={PALETTE.ink}
        strokeWidth={0.7}
      />
      <Path
        d="M-9 -1 L-16 -7 L-14 2Z"
        fill="#579DC9"
        stroke={PALETTE.ink}
        strokeWidth={0.8}
      />
      <Path
        d="M-2 7 L-4 12 M5 7 L6 12"
        stroke={PALETTE.ink}
        strokeWidth={1.1}
        strokeLinecap="round"
      />
    </G>
  );
}

function Bug({
  x,
  y,
  scale = 1,
  kind = "ladybug",
}: {
  x: number;
  y: number;
  scale?: number;
  kind?: "ladybug" | "butterfly" | "bee";
}) {
  return (
    <G transform={`translate(${x} ${y}) scale(${scale})`}>
      {kind === "butterfly" ? (
        <>
          <Ellipse
            cx="-7"
            cy="-4"
            rx="7"
            ry="9"
            fill={PALETTE.purple}
            stroke={PALETTE.ink}
            strokeWidth={1}
          />
          <Ellipse
            cx="7"
            cy="-4"
            rx="7"
            ry="9"
            fill={PALETTE.pink}
            stroke={PALETTE.ink}
            strokeWidth={1}
          />
          <Ellipse
            cx="-6"
            cy="6"
            rx="5"
            ry="6"
            fill={PALETTE.blue}
            stroke={PALETTE.ink}
            strokeWidth={1}
          />
          <Ellipse
            cx="6"
            cy="6"
            rx="5"
            ry="6"
            fill={PALETTE.yellow}
            stroke={PALETTE.ink}
            strokeWidth={1}
          />
          <Line
            x1="0"
            y1="-7"
            x2="0"
            y2="8"
            stroke={PALETTE.ink}
            strokeWidth={2}
          />
          <Path
            d="M0 -7 Q-5 -14 -7 -11 M0 -7 Q5 -14 7 -11"
            stroke={PALETTE.ink}
            strokeWidth={1}
            fill="none"
          />
        </>
      ) : kind === "bee" ? (
        <>
          <Ellipse
            cx="-3"
            cy="0"
            rx="11"
            ry="7"
            fill={PALETTE.yellow}
            stroke={PALETTE.ink}
            strokeWidth={1.1}
          />
          <Path
            d="M-6 -6 L-6 6 M0 -7 L0 7 M6 -5 L6 5"
            stroke={PALETTE.ink}
            strokeWidth={2}
          />
          <Ellipse
            cx="-4"
            cy="-8"
            rx="5"
            ry="4"
            fill="#E7F5FA"
            stroke={PALETTE.ink}
            strokeWidth={0.8}
          />
          <Ellipse
            cx="4"
            cy="-8"
            rx="5"
            ry="4"
            fill="#E7F5FA"
            stroke={PALETTE.ink}
            strokeWidth={0.8}
          />
          <Circle
            cx="8"
            cy="-1"
            r="5"
            fill={PALETTE.yellow}
            stroke={PALETTE.ink}
            strokeWidth={1}
          />
          <Circle cx="9" cy="-2" r="0.9" fill={PALETTE.ink} />
        </>
      ) : (
        <>
          <Ellipse
            cx="0"
            cy="0"
            rx="10"
            ry="8"
            fill={PALETTE.red}
            stroke={PALETTE.ink}
            strokeWidth={1.1}
          />
          <Path d="M0 -7 L0 7" stroke={PALETTE.ink} strokeWidth={1.2} />
          <Circle cx="-4" cy="-2" r="1.7" fill={PALETTE.ink} />
          <Circle cx="4" cy="2" r="1.7" fill={PALETTE.ink} />
          <Circle cx="7" cy="-3" r="1.4" fill={PALETTE.ink} />
          <Circle cx="0" cy="-8" r="4" fill={PALETTE.ink} />
          <Path
            d="M-2 -10 Q-6 -15 -7 -12 M2 -10 Q6 -15 7 -12"
            stroke={PALETTE.ink}
            strokeWidth={1}
            fill="none"
          />
        </>
      )}
    </G>
  );
}

function Cloud({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <G transform={`translate(${x} ${y}) scale(${scale})`}>
      <Path
        d="M-17 5 C-24 5 -24 -5 -16 -7 C-14 -18 -1 -18 3 -9 C12 -14 21 -7 19 1 C27 4 22 10 15 10 L-14 10 C-20 10 -22 7 -17 5Z"
        fill={PALETTE.white}
        stroke="#83C7E9"
        strokeWidth={1.2}
      />
    </G>
  );
}

function Motif({
  subCategory,
  topCategory,
}: {
  subCategory?: string;
  topCategory?: string;
}) {
  const s = subCategory ?? "";
  // Each subcategory has its own visual cue. Keep sky motifs exclusive to "sky";
  // bird and insect baskets use branches/nests or plants/flowers instead.
  switch (s) {
    case "sky":
      return (
        <G>
          <Circle
            cx="73"
            cy="31"
            r="15"
            fill={PALETTE.yellow}
            stroke="#E7A83C"
            strokeWidth={1.3}
          />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i * Math.PI) / 4;
            return (
              <Line
                key={i}
                x1={73 + Math.cos(a) * 19}
                y1={31 + Math.sin(a) * 19}
                x2={73 + Math.cos(a) * 23}
                y2={31 + Math.sin(a) * 23}
                stroke="#E7A83C"
                strokeWidth={2}
                strokeLinecap="round"
              />
            );
          })}
          <Cloud x={37} y={49} scale={0.75} />
          <Cloud x={91} y={55} scale={0.65} />
          <Path
            d="M27 70 Q50 61 72 70 T117 70"
            fill="none"
            stroke="#78C6E8"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        </G>
      );
    case "bird":
      return (
        <G>
          <Path
            d="M25 42 Q50 28 79 43 T119 39"
            fill="none"
            stroke="#8C6546"
            strokeWidth={5}
            strokeLinecap="round"
          />
          <Path
            d="M49 38 Q42 24 32 27 M85 41 Q95 25 105 29"
            fill="none"
            stroke={PALETTE.greenDark}
            strokeWidth={3}
            strokeLinecap="round"
          />
          <Path
            d="M43 52 Q72 68 100 51 Q94 73 71 73 Q51 70 43 52Z"
            fill="#C58B55"
            stroke="#8A5B38"
            strokeWidth={1.5}
          />
          <Path
            d="M47 55 Q72 65 96 55"
            fill="none"
            stroke="#E9BD83"
            strokeWidth={2}
          />
          <Ellipse
            cx="65"
            cy="49"
            rx="7"
            ry="10"
            fill="#FFF2D6"
            stroke="#D7B77C"
            strokeWidth={1}
          />
          <Ellipse
            cx="81"
            cy="49"
            rx="7"
            ry="10"
            fill="#FFF2D6"
            stroke="#D7B77C"
            strokeWidth={1}
          />
        </G>
      );
    case "insect":
      return (
        <G>
          <Leaf x={34} y={48} scale={0.8} />
          <Leaf x={104} y={43} scale={0.9} color="#6EAD60" />
          <Flower x={49} y={50} scale={0.7} color={PALETTE.pink} />
          <Flower x={94} y={52} scale={0.65} color={PALETTE.purple} />
          <Bug x={73} y={40} scale={0.85} kind="ladybug" />
          <Bug x={104} y={67} scale={0.55} kind="butterfly" />
        </G>
      );
    case "plant":
      return (
        <G>
          <Path
            d="M72 28 L72 65"
            stroke={PALETTE.greenDark}
            strokeWidth={4}
            strokeLinecap="round"
          />
          <Leaf x={61} y={42} scale={0.9} />
          <Leaf x={82} y={34} scale={0.8} color="#5FA85F" />
          <Leaf x={59} y={58} scale={0.7} color="#92CD79" />
          <Path
            d="M52 65 L92 65 L86 84 Q72 91 58 84Z"
            fill="#E88E70"
            stroke="#B9664E"
            strokeWidth={1.5}
          />
          <Path
            d="M51 65 Q72 71 93 65"
            fill="none"
            stroke="#B9664E"
            strokeWidth={2}
          />
        </G>
      );
    case "fruit":
      return (
        <G>
          <Circle
            cx="53"
            cy="49"
            r="13"
            fill="#F17869"
            stroke="#A94E48"
            strokeWidth={1.2}
          />
          <Path
            d="M53 36 Q52 29 58 27"
            stroke="#6E8B4B"
            strokeWidth={2.5}
            fill="none"
          />
          <Ellipse
            cx="61"
            cy="31"
            rx="6"
            ry="3.5"
            fill="#7EBB69"
            transform="rotate(-22 61 31)"
          />
          <Circle
            cx="83"
            cy="50"
            r="12"
            fill="#FFD45E"
            stroke="#D8A63F"
            strokeWidth={1.2}
          />
          <Path
            d="M82 39 Q84 33 89 32"
            stroke="#6E8B4B"
            strokeWidth={2.5}
            fill="none"
          />
          <Circle
            cx="71"
            cy="63"
            r="10"
            fill="#F49BB7"
            stroke="#C96C88"
            strokeWidth={1.2}
          />
        </G>
      );
    case "vegetable":
      return (
        <G>
          <Path
            d="M51 39 Q34 27 30 38 Q38 49 51 44Z"
            fill="#6DBB68"
            stroke="#43865B"
            strokeWidth={1}
          />
          <Path
            d="M54 42 Q67 23 77 34 Q72 45 54 47Z"
            fill="#8BCF76"
            stroke="#43865B"
            strokeWidth={1}
          />
          <Path
            d="M47 45 Q52 34 60 45 L56 68 Q51 75 46 67Z"
            fill="#F5A04C"
            stroke="#C77832"
            strokeWidth={1.2}
          />
          <Path
            d="M83 42 Q98 31 106 44 L101 65 Q94 72 87 63Z"
            fill="#A9CF63"
            stroke="#6E9B44"
            strokeWidth={1.2}
          />
        </G>
      );
    case "meal":
      return (
        <G>
          <Ellipse
            cx="72"
            cy="56"
            rx="29"
            ry="18"
            fill="#FFFDF5"
            stroke="#D9BBA0"
            strokeWidth={2}
          />
          <Ellipse cx="72" cy="54" rx="21" ry="12" fill="#F5B45E" />
          <Circle cx="63" cy="51" r="4" fill="#77B96A" />
          <Circle cx="78" cy="57" r="4" fill="#F17869" />
          <Circle cx="84" cy="49" r="3" fill="#F8E5A2" />
          <Path
            d="M35 40 L35 69 M31 40 L31 48 M39 40 L39 48 M109 40 L109 69"
            stroke="#8A7A6B"
            strokeWidth={2.3}
            strokeLinecap="round"
          />
        </G>
      );
    case "snack":
      return (
        <G>
          <Path
            d="M42 44 Q42 36 51 36 L89 36 Q98 36 98 44 L94 68 Q72 76 46 68Z"
            fill="#E8B06E"
            stroke="#B87943"
            strokeWidth={1.4}
          />
          <Circle cx="56" cy="49" r="3" fill="#9B674B" />
          <Circle cx="71" cy="45" r="3" fill="#9B674B" />
          <Circle cx="83" cy="54" r="3" fill="#9B674B" />
          <Circle cx="65" cy="62" r="3" fill="#9B674B" />
          <Path
            d="M42 42 Q69 47 98 42"
            fill="none"
            stroke="#F8D9A6"
            strokeWidth={2}
          />
        </G>
      );
    case "drink":
      return (
        <G>
          <Path
            d="M49 43 L95 43 L90 75 Q72 83 54 75Z"
            fill="#A9DFF4"
            stroke="#4F9EC4"
            strokeWidth={1.5}
          />
          <Path
            d="M52 51 Q72 56 92 51"
            fill="none"
            stroke="#E8FAFF"
            strokeWidth={2}
          />
          <Path
            d="M77 42 L88 24"
            stroke="#F17869"
            strokeWidth={4}
            strokeLinecap="round"
          />
          <Circle cx="59" cy="57" r="3" fill="#FFFFFF" opacity={0.8} />
          <Circle cx="76" cy="66" r="2.5" fill="#FFFFFF" opacity={0.8} />
        </G>
      );
    case "clothes":
      return (
        <G>
          <Path
            d="M72 31 L72 39 M58 35 L72 44 L86 35"
            fill="none"
            stroke="#9B674B"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
          <Path
            d="M58 42 L44 50 L51 61 L58 57 L58 77 L86 77 L86 57 L93 61 L100 50 L86 42 L79 47 L65 47Z"
            fill="#F17869"
            stroke="#B9504D"
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
          <Circle cx="72" cy="57" r="2" fill="#FFE7A6" />
        </G>
      );
    case "hat":
      return (
        <G>
          <Ellipse
            cx="72"
            cy="65"
            rx="31"
            ry="8"
            fill="#6DB6D7"
            stroke="#477E9D"
            strokeWidth={1.4}
          />
          <Path
            d="M49 62 Q48 34 72 31 Q96 34 95 62Z"
            fill="#86C9E8"
            stroke="#477E9D"
            strokeWidth={1.4}
          />
          <Path
            d="M50 52 Q72 58 94 52"
            fill="none"
            stroke="#F5A04C"
            strokeWidth={6}
          />
        </G>
      );
    case "shoes":
      return (
        <G>
          <Path
            d="M39 56 Q54 55 60 43 L70 49 Q77 63 96 64 Q104 65 103 73 L42 73 Q34 70 39 56Z"
            fill="#F17869"
            stroke="#B9504D"
            strokeWidth={1.5}
          />
          <Path d="M40 68 Q69 72 102 68" stroke="#FFF3E9" strokeWidth={3} />
          <Path
            d="M62 52 L70 56 M58 57 L67 60"
            stroke="#FFF3E9"
            strokeWidth={2}
          />
        </G>
      );
    case "hairpin":
      return (
        <G>
          <Path
            d="M47 43 Q72 25 97 43 L93 69 Q72 83 51 69Z"
            fill="#F7C8D7"
            stroke="#C87C9B"
            strokeWidth={1.3}
          />
          <Path
            d="M72 42 L72 70 M61 50 L83 62 M83 50 L61 62"
            stroke="#FFFFFF"
            strokeWidth={2.4}
            strokeLinecap="round"
          />
          <Circle cx="72" cy="56" r="5" fill="#F5A04C" />
        </G>
      );
    case "necklace":
      return (
        <G>
          <Path
            d="M44 35 Q72 84 100 35"
            fill="none"
            stroke="#E1B64C"
            strokeWidth={3}
          />
          <Circle cx="50" cy="46" r="3" fill="#F4A8C3" />
          <Circle cx="58" cy="57" r="3" fill="#B6A0E8" />
          <Circle
            cx="72"
            cy="67"
            r="5"
            fill="#63B8E6"
            stroke="#FFFFFF"
            strokeWidth={1}
          />
          <Circle cx="86" cy="57" r="3" fill="#F4A8C3" />
          <Circle cx="94" cy="46" r="3" fill="#B6A0E8" />
        </G>
      );
    case "glasses":
      return (
        <G>
          <Circle
            cx="57"
            cy="52"
            r="14"
            fill="#DFF5FC"
            fillOpacity={0.75}
            stroke="#5E758A"
            strokeWidth={4}
          />
          <Circle
            cx="88"
            cy="52"
            r="14"
            fill="#DFF5FC"
            fillOpacity={0.75}
            stroke="#5E758A"
            strokeWidth={4}
          />
          <Path
            d="M71 50 Q72 46 74 50 M43 48 L34 44 M102 48 L111 44"
            fill="none"
            stroke="#5E758A"
            strokeWidth={3}
            strokeLinecap="round"
          />
        </G>
      );
    case "button":
      return (
        <G>
          {[0, 1, 2].map((i) => (
            <G key={i} transform={`translate(${48 + i * 24} 54)`}>
              <Circle
                r="10"
                fill={[PALETTE.red, PALETTE.yellow, PALETTE.blue][i]}
                stroke="#A16D4A"
                strokeWidth={1.3}
              />
              <Circle cx="-3" cy="-2" r="1.5" fill="#FFFFFF" />
              <Circle cx="3" cy="2" r="1.5" fill="#FFFFFF" />
            </G>
          ))}
        </G>
      );
    case "pet":
      return (
        <G>
          <Path
            d="M46 43 L46 70 Q72 82 98 70 L98 43"
            fill="#E6B67E"
            stroke="#9B674B"
            strokeWidth={1.4}
          />
          <Path
            d="M42 43 Q72 51 102 43"
            fill="none"
            stroke="#9B674B"
            strokeWidth={4}
          />
          <Circle cx="72" cy="55" r="8" fill="#FFF0D8" />
          <Ellipse cx="72" cy="59" rx="4" ry="3" fill="#9B674B" />
          <Circle cx="66" cy="53" r="2" fill="#9B674B" />
          <Circle cx="78" cy="53" r="2" fill="#9B674B" />
        </G>
      );
    case "farm_animal":
      return (
        <G>
          <Path
            d="M37 43 L107 43 M37 56 L107 56 M43 35 L43 68 M64 35 L64 68 M85 35 L85 68 M104 35 L104 68"
            stroke="#C58B55"
            strokeWidth={3}
            strokeLinecap="round"
          />
          <Path
            d="M50 70 L60 61 L69 70 L79 61 L89 70"
            fill="none"
            stroke="#E6C18B"
            strokeWidth={3}
          />
        </G>
      );
    case "wild_animal":
      return (
        <G>
          <Leaf x={42} y={46} scale={1.1} />
          <Leaf x={101} y={45} scale={1} color="#5B9B59" />
          <Path
            d="M57 38 L62 47 L57 56 L62 65 M82 38 L87 47 L82 56 L87 65"
            stroke="#D6A15E"
            strokeWidth={4}
            strokeLinecap="round"
            fill="none"
          />
        </G>
      );
    case "sea_animal":
      return (
        <G>
          <Path
            d="M28 57 Q40 47 52 57 T76 57 T100 57 T122 57 M28 68 Q40 58 52 68 T76 68 T100 68 T122 68"
            fill="none"
            stroke="#62B9DC"
            strokeWidth={3}
            strokeLinecap="round"
          />
          <Path
            d="M49 42 Q58 31 67 42 Q75 32 84 42"
            fill="none"
            stroke="#E5A1A6"
            strokeWidth={3}
            strokeLinecap="round"
          />
          <Circle
            cx="100"
            cy="41"
            r="6"
            fill="#F7D9A8"
            stroke="#C99C62"
            strokeWidth={1}
          />
        </G>
      );
    case "small_animal":
      return (
        <G>
          <Path
            d="M49 45 L44 32 L58 39 Q72 31 86 39 L100 32 L95 46 Q103 59 90 69 Q72 78 54 69 Q41 59 49 45Z"
            fill="#D7B7A1"
            stroke="#9B674B"
            strokeWidth={1.3}
          />
          <Circle cx="62" cy="51" r="2" fill={PALETTE.ink} />
          <Circle cx="82" cy="51" r="2" fill={PALETTE.ink} />
          <Path
            d="M69 58 Q72 61 75 58"
            fill="none"
            stroke={PALETTE.ink}
            strokeWidth={1.5}
          />
        </G>
      );
    case "road_vehicle":
      return (
        <G>
          <Path
            d="M30 68 L114 68"
            stroke="#66727D"
            strokeWidth={7}
            strokeLinecap="round"
          />
          <Path
            d="M37 68 L50 68 M63 68 L76 68 M89 68 L102 68"
            stroke="#FFF3C9"
            strokeWidth={2}
          />
          <Path
            d="M48 46 L90 46 L102 59 L102 67 L41 67 L41 56Z"
            fill="#F17869"
            stroke="#A94E48"
            strokeWidth={1.5}
          />
          <Circle cx="53" cy="67" r="6" fill="#51443D" />
          <Circle cx="90" cy="67" r="6" fill="#51443D" />
          <Rect x="56" y="49" width="16" height="9" rx="2" fill="#D8F3FC" />
          <Rect x="75" y="49" width="12" height="9" rx="2" fill="#D8F3FC" />
        </G>
      );
    case "rail_vehicle":
      return (
        <G>
          <Path
            d="M38 66 L107 66 M38 73 L107 73"
            stroke="#777D83"
            strokeWidth={3}
          />
          <Path
            d="M45 61 L45 77 M58 61 L58 77 M71 61 L71 77 M84 61 L84 77 M97 61 L97 77"
            stroke="#A5A8AB"
            strokeWidth={2}
          />
          <Rect
            x="47"
            y="37"
            width="50"
            height="28"
            rx="6"
            fill="#78BFE2"
            stroke="#477E9D"
            strokeWidth={1.5}
          />
          <Rect x="54" y="43" width="10" height="8" rx="1.5" fill="#E9F8FC" />
          <Rect x="68" y="43" width="10" height="8" rx="1.5" fill="#E9F8FC" />
          <Rect x="82" y="43" width="9" height="8" rx="1.5" fill="#E9F8FC" />
          <Circle cx="58" cy="65" r="3" fill="#51443D" />
          <Circle cx="86" cy="65" r="3" fill="#51443D" />
        </G>
      );
    case "air_vehicle":
      return (
        <G>
          <Path
            d="M72 27 L80 50 L109 61 L109 67 L80 62 L79 77 L90 83 L90 87 L72 81 L54 87 L54 83 L65 77 L64 62 L35 67 L35 61 L64 50Z"
            fill="#F4F7FA"
            stroke="#6999B5"
            strokeWidth={1.5}
          />
          <Circle cx="72" cy="47" r="2" fill="#8AC5E3" />
        </G>
      );
    case "water_vehicle":
      return (
        <G>
          <Path
            d="M40 55 L104 55 L92 70 Q72 78 52 70Z"
            fill="#DDA66A"
            stroke="#9B674B"
            strokeWidth={1.5}
          />
          <Path
            d="M72 31 L72 54 L97 54Z"
            fill="#FFF5D8"
            stroke="#9B674B"
            strokeWidth={1.2}
          />
          <Path
            d="M30 75 Q42 68 54 75 T78 75 T102 75 T122 75"
            fill="none"
            stroke="#5FB9DD"
            strokeWidth={3}
            strokeLinecap="round"
          />
        </G>
      );
    case "construction_vehicle":
      return (
        <G>
          <Rect
            x="42"
            y="50"
            width="47"
            height="20"
            rx="3"
            fill="#F5B642"
            stroke="#A97827"
            strokeWidth={1.4}
          />
          <Rect
            x="67"
            y="39"
            width="22"
            height="17"
            rx="2"
            fill="#F5B642"
            stroke="#A97827"
            strokeWidth={1.4}
          />
          <Rect x="72" y="42" width="12" height="8" rx="1" fill="#D9F1FA" />
          <Circle cx="53" cy="71" r="6" fill="#51443D" />
          <Circle cx="81" cy="71" r="6" fill="#51443D" />
          <Path
            d="M90 43 L104 31 L111 36 L100 49"
            fill="none"
            stroke="#A97827"
            strokeWidth={5}
            strokeLinecap="round"
          />
          <Path
            d="M103 34 L114 25"
            stroke="#A97827"
            strokeWidth={5}
            strokeLinecap="round"
          />
        </G>
      );
    case "musical_instrument":
      return (
        <G>
          <Path
            d="M57 38 L57 65 Q57 75 47 75 Q38 75 40 67 Q42 60 51 63 L51 38Z"
            fill="#D8A35F"
            stroke="#8B5C38"
            strokeWidth={1.3}
          />
          <Path
            d="M83 34 L83 62 Q83 72 74 72 Q65 72 67 64 Q69 57 78 60 L78 34Z"
            fill="#E8C66E"
            stroke="#8B5C38"
            strokeWidth={1.3}
          />
          <Path d="M51 38 L83 34" stroke="#8B5C38" strokeWidth={2} />
          <Path
            d="M95 39 Q104 31 108 39 Q110 46 101 50"
            fill="none"
            stroke="#B6A0E8"
            strokeWidth={3}
          />
        </G>
      );
    case "clock":
      return (
        <G>
          <Circle
            cx="72"
            cy="51"
            r="25"
            fill="#FFF9E8"
            stroke="#8C9AA4"
            strokeWidth={4}
          />
          <Circle cx="72" cy="51" r="2.5" fill={PALETTE.ink} />
          <Path
            d="M72 51 L72 35 M72 51 L84 58"
            stroke={PALETTE.ink}
            strokeWidth={3}
            strokeLinecap="round"
          />
          {Array.from({ length: 12 }, (_, i) => (
            <Line
              key={i}
              x1={72 + Math.cos((i * Math.PI) / 6) * 18}
              y1={51 + Math.sin((i * Math.PI) / 6) * 18}
              x2={72 + Math.cos((i * Math.PI) / 6) * 21}
              y2={51 + Math.sin((i * Math.PI) / 6) * 21}
              stroke="#8C9AA4"
              strokeWidth={1.5}
            />
          ))}
        </G>
      );
    case "stationery":
      return (
        <G>
          <Path
            d="M47 36 L59 31 L81 68 L69 74Z"
            fill="#FFD45E"
            stroke="#B68C35"
            strokeWidth={1.3}
          />
          <Path
            d="M47 36 L42 27 L53 32Z"
            fill="#E7C7A4"
            stroke="#9B674B"
            strokeWidth={1}
          />
          <Path
            d="M83 35 L96 35 L96 73 L83 73Z"
            fill="#F17869"
            stroke="#B9504D"
            strokeWidth={1.3}
          />
          <Path d="M84 42 L95 42" stroke="#FFE9E2" strokeWidth={2} />
          <Path d="M60 42 L76 68" stroke="#FFF0B0" strokeWidth={2} />
        </G>
      );
    case "electronics":
      return (
        <G>
          <Rect
            x="45"
            y="33"
            width="54"
            height="39"
            rx="5"
            fill="#596C82"
            stroke="#394B5C"
            strokeWidth={1.5}
          />
          <Rect x="50" y="38" width="44" height="28" rx="2" fill="#A8DDF4" />
          <Path
            d="M57 58 L65 49 L73 55 L82 43 L89 52"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M65 74 L79 74 M72 72 L72 78"
            stroke="#596C82"
            strokeWidth={3}
            strokeLinecap="round"
          />
        </G>
      );
    case "furniture":
      return (
        <G>
          <Path
            d="M44 48 L100 48 L100 60 L44 60Z"
            fill="#D7A16E"
            stroke="#93613E"
            strokeWidth={1.5}
          />
          <Path
            d="M49 60 L49 77 M95 60 L95 77"
            stroke="#93613E"
            strokeWidth={4}
            strokeLinecap="round"
          />
          <Path
            d="M50 47 L50 37 Q50 32 56 32 L88 32 Q94 32 94 38 L94 47"
            fill="#E9BD91"
            stroke="#93613E"
            strokeWidth={1.5}
          />
        </G>
      );
    case "ball":
      return (
        <G>
          <Circle
            cx="72"
            cy="53"
            r="25"
            fill="#F5A04C"
            stroke="#B96E32"
            strokeWidth={1.5}
          />
          <Path
            d="M53 34 Q72 53 91 34 M47 53 Q72 44 97 53 M53 72 Q72 53 91 72"
            fill="none"
            stroke="#FFF1D5"
            strokeWidth={3}
          />
        </G>
      );
    case "balloon":
      return (
        <G>
          <Ellipse
            cx="58"
            cy="44"
            rx="16"
            ry="20"
            fill="#F17869"
            stroke="#B9504D"
            strokeWidth={1.2}
          />
          <Path d="M58 64 L61 72" stroke="#B9504D" strokeWidth={1.2} />
          <Ellipse
            cx="85"
            cy="40"
            rx="15"
            ry="19"
            fill="#78BFE2"
            stroke="#477E9D"
            strokeWidth={1.2}
          />
          <Path d="M85 59 L81 72" stroke="#477E9D" strokeWidth={1.2} />
          <Path
            d="M61 72 Q70 78 81 72"
            fill="none"
            stroke="#A67B58"
            strokeWidth={1.3}
          />
          <Ellipse
            cx="52"
            cy="36"
            rx="3"
            ry="5"
            fill="#FFFFFF"
            opacity={0.65}
          />
        </G>
      );
    case "toys_sports":
      return (
        <G>
          <Rect
            x="43"
            y="47"
            width="58"
            height="28"
            rx="5"
            fill="#E9B36F"
            stroke="#A87643"
            strokeWidth={1.4}
          />
          <Path d="M43 55 L101 55" stroke="#A87643" strokeWidth={2} />
          <Circle
            cx="58"
            cy="44"
            r="8"
            fill="#F17869"
            stroke="#A94E48"
            strokeWidth={1}
          />
          <Circle
            cx="77"
            cy="41"
            r="7"
            fill="#78BFE2"
            stroke="#477E9D"
            strokeWidth={1}
          />
          <Polygon
            points="91,32 99,39 96,49 86,49 83,39"
            fill="#B6A0E8"
            stroke="#7766B1"
            strokeWidth={1}
          />
        </G>
      );
    case "daily":
      return (
        <G>
          <Rect
            x="47"
            y="39"
            width="50"
            height="34"
            rx="5"
            fill="#E5C79D"
            stroke="#A47B50"
            strokeWidth={1.4}
          />
          <Path
            d="M61 39 L61 33 Q61 28 67 28 L77 28 Q83 28 83 33 L83 39"
            fill="none"
            stroke="#A47B50"
            strokeWidth={3}
          />
          <Path d="M47 51 L97 51" stroke="#A47B50" strokeWidth={1.5} />
          <Circle cx="72" cy="56" r="2" fill="#A47B50" />
        </G>
      );
    default:
      // Fallback motifs use the top category, but never display an emoji or label.
      if (topCategory === "nature")
        return (
          <G>
            <Leaf x={57} y={48} scale={1.1} />
            <Flower x={85} y={48} scale={0.8} />
          </G>
        );
      if (topCategory === "animal")
        return (
          <G>
            <Path
              d="M50 47 Q72 34 94 47 L89 66 Q72 76 55 66Z"
              fill="#E7C39A"
              stroke="#9B674B"
              strokeWidth={1.5}
            />
            <Circle cx="64" cy="53" r="2" fill="#9B674B" />
            <Circle cx="80" cy="53" r="2" fill="#9B674B" />
          </G>
        );
      return (
        <G>
          <Circle
            cx="72"
            cy="51"
            r="18"
            fill={PALETTE.yellow}
            stroke="#D6A13F"
            strokeWidth={1.3}
          />
          <Path
            d="M61 51 L69 59 L84 42"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
      );
  }
}

export default function CategoryBasket({
  topCategory,
  subCategory,
  size = 118,
}: CategoryBasketProps) {
  const style = TOP_STYLE[topCategory ?? "unknown"] ?? TOP_STYLE.unknown;

  return (
    <View style={[styles.wrap, { width: size, height: size * 0.98 }]}>
      <Svg width={size} height={size * 0.98} viewBox="0 0 144 140">
        {/* Soft shadow */}
        <Ellipse
          cx="72"
          cy="125"
          rx="48"
          ry="7"
          fill="#5B5149"
          opacity={0.12}
        />
        {/* Back handle */}
        <Path
          d="M39 91 L39 52 Q39 20 72 20 Q105 20 105 52 L105 91"
          fill="none"
          stroke={style.accent}
          strokeWidth="8"
          strokeLinecap="round"
          opacity={0.78}
        />
        <Path
          d="M42 88 L42 53 Q42 24 72 24 Q102 24 102 53 L102 88"
          fill="none"
          stroke={style.rim}
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Motif area */}
        <Motif topCategory={topCategory} subCategory={subCategory} />
        {/* Basket body */}
        <Path
          d="M22 76 Q72 87 122 76 L112 119 Q109 126 101 126 L43 126 Q35 126 32 119Z"
          fill={style.body}
          stroke={style.accent}
          strokeWidth="1.7"
        />
        <Path
          d="M27 84 Q72 94 117 84"
          fill="none"
          stroke={style.rim}
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Woven bands */}
        <Path
          d="M31 96 Q72 105 113 96 M34 108 Q72 117 110 108 M39 119 Q72 126 105 119"
          fill="none"
          stroke={style.accent}
          strokeWidth="2"
          opacity={0.36}
        />
        <Path
          d="M45 91 L48 123 M61 94 L62 125 M78 94 L78 125 M95 91 L92 123"
          fill="none"
          stroke={style.rim}
          strokeWidth="2.3"
          opacity={0.75}
        />
        {/* Front rim, with gentle highlight */}
        <Path
          d="M22 77 Q72 89 122 77 Q126 84 119 89 Q72 102 25 89 Q18 84 22 77Z"
          fill={style.rim}
          stroke={style.accent}
          strokeWidth="1.5"
        />
        <Path
          d="M29 81 Q72 91 115 81"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          opacity={0.65}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
  },
});

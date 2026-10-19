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
export type ClothingBackgroundKind =
  | "hat"
  | "clothes"
  | "shoes"
  | "hairpin"
  | "necklace"
  | "glasses"
  | "button";

type Props = {
  category: ClothingBackgroundKind;
  width?: number | string;
  height?: number | string;
};

const PALETTE: Record<ClothingBackgroundKind, { main: string; pale: string }> =
  {
    hat: { main: "#D99A48", pale: "#FFF0CF" },
    clothes: { main: "#E8759B", pale: "#FFE5ED" },
    shoes: { main: "#6A9EDB", pale: "#E5F0FF" },
    hairpin: { main: "#A77BE0", pale: "#F0E6FF" },
    necklace: { main: "#D9A53F", pale: "#FFF4CC" },
    glasses: { main: "#53A9B6", pale: "#DFF7F7" },
    button: { main: "#E87979", pale: "#FFE8E5" },
  };

function Wall({ warm = false }: { warm?: boolean }) {
  return (
    <>
      <Defs>
        <LinearGradient
          id={warm ? "clothingWarm" : "clothingCool"}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <Stop offset="0" stopColor={warm ? "#FFF9ED" : "#F5FBFF"} />
          <Stop offset="1" stopColor={warm ? "#F4DDBB" : "#DDEFFA"} />
        </LinearGradient>
      </Defs>
      <Rect
        width="320"
        height="240"
        fill={`url(#${warm ? "clothingWarm" : "clothingCool"})`}
      />
    </>
  );
}
function Plant({ x, y }: { x: number; y: number }) {
  return (
    <G transform={`translate(${x} ${y})`}>
      <Path
        d="M0 40V0 M0 24Q-23 6-27 19Q-18 33 0 24 M0 17Q17-4 27 7Q24 22 0 17 M0 36Q-17 23-21 33Q-12 44 0 36"
        fill="#78B96D"
        stroke="#5A9A5E"
        strokeWidth="1.5"
      />
    </G>
  );
}
function HatScene() {
  return (
    <>
      <Wall warm />
      <Rect
        x="17"
        y="15"
        width="286"
        height="210"
        rx="12"
        fill="#FFFAEF"
        stroke="#E8D3B0"
        strokeWidth="2"
      />
      <Path d="M30 37H290" stroke="#E5C89D" strokeWidth="3" />
      <Rect x="38" y="53" width="244" height="8" rx="4" fill="#B88756" />
      {[51, 157, 263].map((x) => (
        <Rect
          key={x}
          x={x}
          y="60"
          width="6"
          height="30"
          rx="3"
          fill="#C99B68"
        />
      ))}
      <G transform="translate(88 101)">
        <Path
          d="M-29 0Q-23-9-8-10L-3-27Q1-35 9-27L16-9Q26-6 30 1Q0 8-29 0Z"
          fill="#E8C27E"
          stroke="#B9894B"
          strokeWidth="2"
        />
        <Path d="M-8-10H17" stroke="#C8944F" strokeWidth="5" />
      </G>
      <G transform="translate(199 101)">
        <Path
          d="M-28 0Q-24-18-4-19Q15-19 22-2L29 1Q0 9-28 0Z"
          fill="#6A9EDB"
          stroke="#477CB8"
          strokeWidth="2"
        />
        <Path d="M-4-18Q1-4 2 0" stroke="#477CB8" strokeWidth="2" fill="none" />
      </G>
      <Path d="M29 133H291" stroke="#E9D5B7" strokeWidth="2" />
      <Rect x="41" y="146" width="238" height="57" rx="9" fill="#F3E3C7" />
      {[158, 170, 182].map((y) => (
        <Path key={y} d={`M54 ${y}H266`} stroke="#E2C79F" strokeWidth="1.5" />
      ))}
      <Plant x={42} y={162} />
      <Plant x={278} y={162} />
      <Circle cx="160" cy="174" r="17" fill="#F8DDA3" opacity=".7" />
      <Path d="M150 174Q160 160 170 174Q160 188 150 174Z" fill="#E8B75E" />
    </>
  );
}
function ClothesScene() {
  return (
    <>
      <Wall />
      <Rect
        x="18"
        y="15"
        width="284"
        height="210"
        rx="12"
        fill="#FFFCFE"
        stroke="#E9C7D3"
        strokeWidth="2"
      />
      <Rect x="30" y="28" width="260" height="18" rx="5" fill="#F4DCE5" />
      <Path d="M40 37H280" stroke="#D9A8BB" strokeWidth="3" />
      <Path
        d="M42 49V69M121 49V69M200 49V69M278 49V69"
        stroke="#D5A8BA"
        strokeWidth="2"
      />
      {[48, 112, 176, 240].map((x, i) => (
        <G key={x} transform={`translate(${x} 72)`}>
          <Path
            d="M0-6Q-5-12 0-15Q5-14 2-9L16 0L-16 0Z"
            fill="none"
            stroke="#B78A9A"
            strokeWidth="2"
          />
          <Path
            d="M-15 3L-7 0L-3 6H3L7 0L15 3L12 30H-12Z"
            fill={["#F4A9BE", "#8EC9E8", "#B9A4E8", "#F3D18C"][i]}
            stroke={["#D97D9C", "#579FC6", "#9177C6", "#D2A953"][i]}
            strokeWidth="1.5"
          />
        </G>
      ))}
      <Rect x="35" y="120" width="250" height="83" rx="8" fill="#F7E9ED" />
      <G transform="translate(160 151)">
        <Circle cy="-26" r="13" fill="#E8C5A8" />
        <Path
          d="M-9-13L-23-6L-38 22Q-40 27-34 30Q-29 32-26 26L-13 6L-14 40H14L13 6L26 26Q30 32 35 29Q40 26 37 21L23-6L9-13Z"
          fill="#D9B99E"
          stroke="#C49D7E"
          strokeWidth="2"
        />
        <Path d="M-10 40L-13 65H-3L0 43L3 65H13L10 40" fill="#C9A384" />
      </G>
      <Path
        d="M48 207H272"
        stroke="#D7B6C2"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </>
  );
}
function ShoesScene() {
  return (
    <>
      <Wall warm />
      <Rect
        x="18"
        y="15"
        width="284"
        height="210"
        rx="12"
        fill="#FFFDF8"
        stroke="#D8C6AB"
        strokeWidth="2"
      />
      <Rect x="31" y="29" width="258" height="27" rx="6" fill="#E5D7C3" />
      <Path d="M43 42H277" stroke="#C9B294" strokeWidth="2" />
      {[92, 151, 210].map((y) => (
        <G key={y}>
          <Rect x="32" y={y} width="256" height="7" rx="3.5" fill="#B98C60" />
          <Rect x="37" y={y + 7} width="246" height="4" rx="2" fill="#E5C49B" />
        </G>
      ))}
      {[
        ["#7AB9E5", 68, 78],
        ["#E8A2B4", 159, 78],
        ["#A7CDA3", 108, 138],
        ["#B9A9E8", 211, 138],
      ].map(([c, x, y], i) => (
        <G key={i} transform={`translate(${Number(x)} ${Number(y)})`}>
          <Path
            d="M-23 3Q-12 0-5-11L4-8L10 1Q20 4 25 8Q26 14 18 15H-18Q-29 14-23 3Z"
            fill={String(c)}
            stroke="#648BA7"
            strokeWidth="2"
          />
          <Path d="M-22 10H22" stroke="#FFFFFF" strokeWidth="3" />
          <Path d="M-7-6L4 3M-12-3L0 6" stroke="#F7FCFF" strokeWidth="2" />
        </G>
      ))}
      <Rect x="40" y="178" width="240" height="25" rx="6" fill="#F2E6D4" />
      <Plant x={45} y={163} />
      <Plant x={277} y={163} />
    </>
  );
}
function HairpinScene() {
  return (
    <>
      <Wall />
      <Rect
        x="18"
        y="15"
        width="284"
        height="210"
        rx="12"
        fill="#FFFCFF"
        stroke="#D8C7EE"
        strokeWidth="2"
      />
      <Rect x="30" y="29" width="260" height="27" rx="7" fill="#E9DDF9" />
      <Rect x="99" y="64" width="122" height="112" rx="54" fill="#C5B2E8" />
      <Rect
        x="105"
        y="69"
        width="110"
        height="101"
        rx="50"
        fill="#DFF4FC"
        stroke="#FFF"
        strokeWidth="4"
      />
      <Path
        d="M120 95Q145 70 175 83"
        stroke="#FFF"
        strokeWidth="5"
        opacity=".8"
        strokeLinecap="round"
        fill="none"
      />
      <Rect x="146" y="170" width="28" height="20" rx="4" fill="#D2B3A0" />
      <Rect x="121" y="188" width="78" height="8" rx="4" fill="#B993D5" />
      {[35, 225].map((x) => (
        <Rect
          key={x}
          x={x}
          y="144"
          width="60"
          height="58"
          rx="8"
          fill="#F0E6FC"
          stroke="#D4B9EF"
          strokeWidth="2"
        />
      ))}
      <G transform="translate(65 168)">
        <Path
          d="M0-13C-17-26-24-5 0 12C24-5 17-26 0-13Z"
          fill="#E98FB6"
          stroke="#C86B94"
          strokeWidth="2"
        />
        <Path d="M-8-8L8 6" stroke="#FFDCE9" strokeWidth="2" />
      </G>
      <G transform="translate(255 168)">
        <Path
          d="M0-16L4-5H16L7 3L10 15L0 8L-10 15L-7 3L-16-5H-4Z"
          fill="#F4C95F"
          stroke="#D6A33D"
          strokeWidth="2"
        />
      </G>
      <Path d="M42 211H278" stroke="#D6C2E7" strokeWidth="3" />
    </>
  );
}
function NecklaceScene() {
  return (
    <>
      <Wall warm />
      <Rect
        x="18"
        y="15"
        width="284"
        height="210"
        rx="12"
        fill="#FFFCF4"
        stroke="#E7D2A2"
        strokeWidth="2"
      />
      <Path
        d="M134 58V92Q130 101 111 108L76 124Q64 130 69 145L80 176H240L251 145Q256 130 244 124L209 108Q190 101 186 92V58Z"
        fill="#F0DCC1"
        stroke="#D5B894"
        strokeWidth="2"
      />
      <Path
        d="M134 58Q160 69 186 58M132 93Q160 119 188 93"
        stroke="#C7A16C"
        strokeWidth="2"
        fill="none"
      />
      <Path
        d="M124 88Q117 135 160 153Q203 135 196 88"
        stroke="#D4A53E"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M124 88Q117 135 160 153Q203 135 196 88"
        stroke="#FFE9A1"
        strokeWidth="1.4"
        fill="none"
      />
      <Circle
        cx="160"
        cy="153"
        r="10"
        fill="#F6D36F"
        stroke="#C9952E"
        strokeWidth="2"
      />
      <Path
        d="M160 145C150 137 145 148 160 160C175 148 170 137 160 145Z"
        fill="#E985A9"
        stroke="#C96187"
        strokeWidth="1.5"
      />
      <Rect x="35" y="187" width="250" height="18" rx="5" fill="#EAD8B9" />
      <Path
        d="M51 72L55 82L65 86L55 90L51 100L47 90L37 86L47 82Z M264 69L267 76L274 79L267 82L264 89L261 82L254 79L261 76Z"
        fill="#F4D36C"
      />
    </>
  );
}
function GlassesScene() {
  return (
    <>
      <Wall />
      <Rect
        x="18"
        y="15"
        width="284"
        height="210"
        rx="12"
        fill="#FDFEFF"
        stroke="#A8DDE0"
        strokeWidth="2"
      />
      <Rect x="30" y="28" width="260" height="24" rx="6" fill="#D8F1F1" />
      <Rect
        x="34"
        y="66"
        width="252"
        height="135"
        rx="8"
        fill="#EAF8F9"
        stroke="#C4E8E9"
        strokeWidth="2"
      />
      {[75, 119, 163].map((y) => (
        <Path key={y} d={`M45 ${y}H275`} stroke="#C3E4E5" strokeWidth="2" />
      ))}
      <G transform="translate(95 88)">
        <Rect
          x="-31"
          y="-12"
          width="26"
          height="24"
          rx="8"
          fill="#76C9D2"
          stroke="#3D9EA9"
          strokeWidth="3"
        />
        <Rect
          x="5"
          y="-12"
          width="26"
          height="24"
          rx="8"
          fill="#76C9D2"
          stroke="#3D9EA9"
          strokeWidth="3"
        />
        <Path
          d="M-5 0Q0-5 5 0M-31-6L-40-10M31-6L40-10"
          stroke="#3D9EA9"
          strokeWidth="3"
          fill="none"
        />
      </G>
      <G transform="translate(220 88)">
        <Path
          d="M-30-12Q-43-19-43-3Q-42 12-29 12Q-16 12-15-1H-5Q-4 12 9 12Q22 12 23-3Q23-19 9-12Z"
          fill="#F2B5C7"
          stroke="#CB7894"
          strokeWidth="3"
        />
      </G>
      <G transform="translate(95 145)">
        <Path
          d="M-30-12H-10L-7 9Q-19 17-28 8Z M8-12H28L26 8Q17 17 9 9Z"
          fill="#B7A5E8"
          stroke="#8874C4"
          strokeWidth="3"
        />
        <Path
          d="M-7-2Q0-7 8-2M-30-8L-40-11M28-8L38-11"
          stroke="#8874C4"
          strokeWidth="3"
          fill="none"
        />
      </G>
      <G transform="translate(220 145)">
        <Circle
          cx="-17"
          r="13"
          fill="#F4D27A"
          stroke="#C79C3B"
          strokeWidth="3"
        />
        <Circle
          cx="17"
          r="13"
          fill="#F4D27A"
          stroke="#C79C3B"
          strokeWidth="3"
        />
        <Path
          d="M-4 0H4M-30-5L-40-9M30-5L40-9"
          stroke="#C79C3B"
          strokeWidth="3"
          fill="none"
        />
      </G>
      <Rect x="40" y="184" width="240" height="12" rx="6" fill="#B9DDE0" />
    </>
  );
}
function ButtonScene() {
  return (
    <>
      <Wall warm />
      <Rect
        x="18"
        y="15"
        width="284"
        height="210"
        rx="12"
        fill="#FFFCF7"
        stroke="#E9C9C3"
        strokeWidth="2"
      />
      <Rect x="31" y="28" width="258" height="25" rx="6" fill="#F7E2DB" />
      <Rect x="34" y="67" width="252" height="7" rx="3" fill="#C79A76" />
      <Rect x="34" y="126" width="252" height="7" rx="3" fill="#C79A76" />
      {[
        ["#EFA7B6", 45],
        ["#8EC9E8", 104],
        ["#B5D5A4", 163],
        ["#D3B9ED", 222],
      ].map(([c, x], i) => (
        <G key={i}>
          <Rect
            x={Number(x)}
            y="80"
            width="49"
            height="42"
            rx="4"
            fill={String(c)}
          />
          {[89, 101, 113].map((y) => (
            <Path
              key={y}
              d={`M${Number(x)} ${y}H${Number(x) + 49}`}
              stroke="#FFFFFF"
              strokeWidth="3"
              opacity=".65"
            />
          ))}
        </G>
      ))}
      {[
        ["#E98DA7", 63],
        ["#77B9E0", 112],
        ["#83B875", 161],
        ["#B39BE2", 210],
        ["#E8BD5D", 259],
      ].map(([c, x], i) => (
        <G key={i} transform={`translate(${Number(x)} 148)`}>
          <Path
            d="M-9-15H9L6 15H-6Z"
            fill={String(c)}
            stroke="#B58B78"
            strokeWidth="1.5"
          />
          <Rect
            x="-11"
            y="-17"
            width="22"
            height="5"
            rx="2"
            fill="#FFF8EF"
            stroke="#D4B7A3"
            strokeWidth="1.2"
          />
          <Rect
            x="-8"
            y="12"
            width="16"
            height="5"
            rx="2"
            fill="#FFF8EF"
            stroke="#D4B7A3"
            strokeWidth="1.2"
          />
          {[-5, 0, 5].map((dx) => (
            <Path
              key={dx}
              d={`M${dx}-10V10`}
              stroke="#FFFFFF"
              strokeWidth="1"
              opacity=".5"
            />
          ))}
        </G>
      ))}
      <Rect x="35" y="181" width="250" height="24" rx="6" fill="#F2E1D6" />
      <Path d="M45 193H275" stroke="#D8B6A4" strokeWidth="2" />
      <Path
        d="M53 178L80 158"
        stroke="#B8A6A0"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Circle cx="52" cy="178" r="3" fill="#D6B8AC" />
    </>
  );
}
const SCENES: Record<ClothingBackgroundKind, React.FC> = {
  hat: HatScene,
  clothes: ClothesScene,
  shoes: ShoesScene,
  hairpin: HairpinScene,
  necklace: NecklaceScene,
  glasses: GlassesScene,
  button: ButtonScene,
};

export default function ClothingCategoryBackground({
  category,
  width = "100%",
  height = "100%",
}: Props) {
  const Scene = SCENES[category];
  const colors = PALETTE[category];
  return (
    <Svg width={width} height={height} viewBox="0 0 320 240">
      <Rect width="320" height="240" rx="14" fill={colors.pale} />
      <Scene />
      <Rect
        x="2.5"
        y="2.5"
        width="315"
        height="235"
        rx="13"
        fill="none"
        stroke={colors.main}
        strokeWidth="3"
      />
      <Rect
        x="7"
        y="7"
        width="306"
        height="226"
        rx="10"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        opacity=".9"
      />
    </Svg>
  );
}
export { PALETTE as CLOTHING_SCENE_COLORS };

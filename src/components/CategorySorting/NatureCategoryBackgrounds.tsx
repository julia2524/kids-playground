import React from "react";
import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  Polygon,
  Rect,
  Stop,
} from "react-native-svg";

/**
 * Decorative category backgrounds for a preschool sorting game.
 * Backgrounds intentionally avoid large, recognizable draggable objects.
 * Use them behind the category title and target area; render actual item
 * stickers separately in the foreground.
 */
export type FoodBackgroundKind =
  | "food"
  | "fruit"
  | "vegetable"
  | "meal"
  | "snack"
  | "drink";
export type ClothingBackgroundKind =
  | "clothing"
  | "hat"
  | "clothes"
  | "shoes"
  | "hairpin"
  | "necklace"
  | "glasses"
  | "button";
export type NatureBackgroundKind = "nature" | "sky" | "plant";

type Props<K extends string> = {
  category: K;
  width?: number | string;
  height?: number | string;
};

const PALETTES = {
  food: { edge: "#E7A9B8", pale: "#FFF1E8" },
  clothing: { edge: "#A58AD6", pale: "#F5EEFF" },
  nature: { edge: "#70B78C", pale: "#EAF8E9" },
  sky: { edge: "#6AB6E8", pale: "#E9F7FF" },
  plant: { edge: "#65AE70", pale: "#EFF9E8" },
};

function Frame({
  edge,
  pale,
  children,
}: {
  edge: string;
  pale: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <Rect width="320" height="240" rx="18" fill={pale} />
      {children}
      <Rect
        x="3"
        y="3"
        width="314"
        height="234"
        rx="16"
        fill="none"
        stroke={edge}
        strokeWidth="4"
      />
      <Rect
        x="9"
        y="9"
        width="302"
        height="222"
        rx="12"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2"
        opacity=".9"
      />
    </>
  );
}

function FoodScene({ category }: Props<FoodBackgroundKind>) {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 320 240">
      <Defs>
        <LinearGradient id="foodWall" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFF9E9" />
          <Stop offset="1" stopColor="#F4D9AD" />
        </LinearGradient>
        <LinearGradient id="foodSky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#8ED5F5" />
          <Stop offset="1" stopColor="#E7F8FF" />
        </LinearGradient>
      </Defs>
      <Frame edge={PALETTES.food.edge} pale={PALETTES.food.pale}>
        {category === "fruit" ? (
          <>
            <Rect
              x="7"
              y="7"
              width="306"
              height="226"
              rx="12"
              fill="url(#foodSky)"
            />
            <Circle cx="258" cy="38" r="19" fill="#FFE58A" />
            <Path
              d="M8 132 Q48 102 86 128 T165 119 T244 123 T312 105 V233 H8Z"
              fill="#A5D58C"
            />
            <Path
              d="M8 163 Q70 133 125 159 T235 151 T312 145 V233 H8Z"
              fill="#75BE73"
            />
            <Path d="M8 190 Q88 168 155 190 T312 178 V233 H8Z" fill="#B6D98D" />
            {[42, 278].map((x) => (
              <G key={x}>
                <Path
                  d={`M${x} 130 V58`}
                  stroke="#91613B"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {[-22, 0, 22].map((dx, i) => (
                  <Circle
                    key={i}
                    cx={x + dx}
                    cy={58 + (i % 2) * 9}
                    r="23"
                    fill={["#75B85B", "#8BCB67", "#64A94F"][i]}
                  />
                ))}
                <Path
                  d={`M${x - 13} 86 Q${x - 30} 65 ${x - 22} 52 M${x + 8} 83 Q${x + 28} 64 ${x + 24} 50`}
                  fill="none"
                  stroke="#5A9E4B"
                  strokeWidth="4"
                />
              </G>
            ))}
            <Path
              d="M112 166 L132 147 L151 166"
              stroke="#F1D8A4"
              strokeWidth="4"
              fill="none"
            />
            <Path
              d="M160 168 L181 147 L201 168"
              stroke="#F1D8A4"
              strokeWidth="4"
              fill="none"
            />
            <Path
              d="M12 205 Q90 188 160 205 T308 200"
              fill="none"
              stroke="#E9D69B"
              strokeWidth="17"
            />
            <Path
              d="M12 205 Q90 188 160 205 T308 200"
              fill="none"
              stroke="#F9E9B8"
              strokeWidth="10"
            />
          </>
        ) : category === "vegetable" ? (
          <>
            <Rect
              x="7"
              y="7"
              width="306"
              height="226"
              rx="12"
              fill="url(#foodSky)"
            />
            <Path d="M8 105 Q75 80 144 108 T312 96 V233 H8Z" fill="#8EC982" />
            <Path d="M8 144 H312 V233 H8Z" fill="#B5D77E" />
            {[0, 1, 2].map((i) => (
              <G
                key={i}
                transform={`translate(${25 + i * 95} ${125 + i * 12})`}
              >
                <Path
                  d="M0 0 L64 0 L78 78 L-14 78Z"
                  fill="#B98256"
                  stroke="#95613F"
                  strokeWidth="3"
                />
                <Path
                  d="M-7 10 L70 10 M-10 32 L74 32 M-12 54 L76 54"
                  stroke="#E4BB83"
                  strokeWidth="5"
                />
                {[0, 1, 2, 3].map((j) => (
                  <G
                    key={j}
                    transform={`translate(${j * 17 - 3} ${14 + (j % 2) * 18})`}
                  >
                    <Path
                      d="M0 14 Q-17 1 -10-7 Q1-9 2 9 Q9-10 18-4 Q20 7 0 14Z"
                      fill={j % 2 ? "#4F9C54" : "#67B75C"}
                    />
                  </G>
                ))}
              </G>
            ))}
            <Path
              d="M196 91 Q217 61 249 78 Q270 91 269 121 L192 121Z"
              fill="#C9EAF4"
              stroke="#6EAFC7"
              strokeWidth="4"
            />
            <Path
              d="M200 91 Q231 69 263 85 M222 79 V120 M246 79 V120"
              stroke="#FFFFFF"
              strokeWidth="3"
              fill="none"
              opacity=".9"
            />
            <Path d="M202 123 H270" stroke="#6EAFC7" strokeWidth="5" />
          </>
        ) : category === "meal" ? (
          <>
            <Rect
              x="7"
              y="7"
              width="306"
              height="226"
              rx="12"
              fill="url(#foodWall)"
            />
            <Rect
              x="18"
              y="18"
              width="284"
              height="100"
              rx="8"
              fill="#CDEAF3"
              stroke="#E6CBA3"
              strokeWidth="8"
            />
            <Path
              d="M24 86 Q64 44 104 81 T184 76 T296 68 V112 H24Z"
              fill="#A8D18A"
            />
            <Path d="M8 126 H312 V233 H8Z" fill="#D89C5C" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <Path
                key={i}
                d={`M${12 + i * 42} 126 L${36 + i * 42} 233`}
                stroke="#E8B879"
                strokeWidth="2"
                opacity=".7"
              />
            ))}
            <Rect
              x="28"
              y="145"
              width="264"
              height="70"
              rx="7"
              fill="#F8E2B4"
            />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <Path
                key={i}
                d={`M${32 + i * 34} 145 V215`}
                stroke="#FFF4D9"
                strokeWidth="7"
                opacity=".9"
              />
            ))}
            <Ellipse
              cx="160"
              cy="181"
              rx="48"
              ry="24"
              fill="#FFFFFF"
              stroke="#E8D9C9"
              strokeWidth="4"
            />
            <Ellipse
              cx="160"
              cy="181"
              rx="35"
              ry="15"
              fill="#FFF8EF"
              stroke="#F0E6D9"
              strokeWidth="2"
            />
            <Path
              d="M96 160 V203 M89 160 V173 M96 160 V173 M103 160 V173 M96 173 V181 M226 160 L218 181 Q218 188 226 188 V203"
              fill="none"
              stroke="#9AB7C5"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <Ellipse
              cx="252"
              cy="181"
              rx="9"
              ry="13"
              fill="#C7D7E0"
              stroke="#8EA7B5"
              strokeWidth="2"
            />
          </>
        ) : category === "snack" ? (
          <>
            <Rect x="7" y="7" width="306" height="226" rx="12" fill="#FFF1F4" />
            <Rect x="7" y="24" width="306" height="43" fill="#F6A4BE" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <Path
                key={i}
                d={`M${i * 40 + 7} 24 L${i * 40 + 27} 24 L${i * 40 + 47} 67 L${i * 40 + 27} 67Z`}
                fill="#FFF7F5"
              />
            ))}
            <Rect
              x="20"
              y="75"
              width="280"
              height="129"
              rx="7"
              fill="#D6F0F8"
              stroke="#B7D7E5"
              strokeWidth="4"
            />
            {[0, 1, 2, 3, 4].map((i) => (
              <G key={i}>
                <Rect
                  x="29"
                  y={88 + i * 22}
                  width="262"
                  height="4"
                  rx="2"
                  fill="#FFFFFF"
                />
                {[0, 1, 2, 3, 4, 5, 6].map((j) => (
                  <Rect
                    key={j}
                    x={36 + j * 36}
                    y={96 + i * 22}
                    width="22"
                    height="13"
                    rx="3"
                    fill={
                      ["#F3C66E", "#E99CB1", "#A5CFA0", "#A9CDEB"][(i + j) % 4]
                    }
                    opacity=".9"
                  />
                ))}
              </G>
            ))}
            <Rect
              x="30"
              y="172"
              width="260"
              height="35"
              rx="6"
              fill="#F08EAE"
              stroke="#D96E93"
              strokeWidth="3"
            />
            <Rect
              x="40"
              y="180"
              width="240"
              height="19"
              rx="4"
              fill="#FFF0F4"
            />
          </>
        ) : (
          <>
            <Rect
              x="7"
              y="7"
              width="306"
              height="226"
              rx="12"
              fill="url(#foodSky)"
            />
            <Circle cx="260" cy="40" r="20" fill="#FFE18A" />
            <Path d="M8 133 Q72 105 135 131 T312 124 V233 H8Z" fill="#B5DE91" />
            <Path d="M8 171 Q85 148 160 174 T312 163 V233 H8Z" fill="#80C6A0" />
            <Path d="M8 200 H312 V233 H8Z" fill="#D8E9C9" />
            <Path
              d="M7 76 Q25 60 43 76 Q55 52 78 70 Q98 74 98 92 H7Z"
              fill="#FFFFFF"
              opacity=".9"
            />
            <Path
              d="M206 83 Q224 65 242 81 Q255 60 275 78 Q296 80 296 96 H206Z"
              fill="#FFFFFF"
              opacity=".9"
            />
            <Path
              d="M42 149 Q55 126 69 149 Q83 127 97 150"
              stroke="#4EAA9B"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            <Path
              d="M204 151 Q217 128 230 151 Q244 129 257 151"
              stroke="#4EAA9B"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
          </>
        )}
      </Frame>
    </Svg>
  );
}

function ClothingScene({ category }: Props<ClothingBackgroundKind>) {
  const pale = PALETTES.clothing.pale;
  return (
    <Svg width="100%" height="100%" viewBox="0 0 320 240">
      <Frame edge={PALETTES.clothing.edge} pale={pale}>
        <Rect x="7" y="7" width="306" height="226" rx="12" fill="#FCF9FF" />
        {category === "clothing" || category === "clothes" ? (
          <>
            <Rect x="25" y="23" width="270" height="20" rx="6" fill="#E7D8F5" />
            <Path d="M35 34 H285" stroke="#B99CD8" strokeWidth="4" />
            {[60, 126, 192, 258].map((x, i) => (
              <G key={x}>
                <Path d={`M${x} 43 V65`} stroke="#A88BC8" strokeWidth="3" />
                <Path
                  d={`M${x - 14} 65 L${x} 59 L${x + 14} 65`}
                  stroke="#A88BC8"
                  strokeWidth="3"
                  fill="none"
                />
                <Path
                  d={`M${x - 18} 72 L${x - 9} 67 L${x} 73 L${x + 9} 67 L${x + 18} 72 L${x + 14} 112 H${x - 14}Z`}
                  fill={["#E9A5BC", "#8FC9E7", "#B8D7A0", "#F0D184"][i]}
                  stroke="#A88BC8"
                  strokeWidth="1.5"
                />
              </G>
            ))}
            <Rect
              x="30"
              y="133"
              width="260"
              height="72"
              rx="9"
              fill="#EFE4F9"
            />
            <Path
              d="M43 150 H277 M43 174 H277 M43 198 H277"
              stroke="#D1BCE8"
              strokeWidth="3"
            />
          </>
        ) : category === "hat" ? (
          <>
            <Path
              d="M28 64 H292"
              stroke="#B69A81"
              strokeWidth="7"
              strokeLinecap="round"
            />
            {[70, 160, 250].map((x, i) => (
              <G key={x} transform={`translate(${x} 88)`}>
                <Path
                  d="M-28 0 Q-24-8-8-10 L-3-26 Q0-32 7-26 L15-10 Q25-7 29 0 Q0 7-28 0Z"
                  fill={["#E8C47E", "#80B9E5", "#E7A6BC"][i]}
                  stroke="#B78D5B"
                  strokeWidth="2"
                />
                <Path d="M-8-10 H16" stroke="#D59C61" strokeWidth="4" />
              </G>
            ))}
            <Rect
              x="29"
              y="126"
              width="262"
              height="76"
              rx="8"
              fill="#F1E7F9"
            />
            <Path
              d="M44 145 H276 M44 170 H276 M44 193 H276"
              stroke="#D8C5E8"
              strokeWidth="3"
            />
          </>
        ) : category === "shoes" ? (
          <>
            {[0, 1, 2].map((i) => (
              <G key={i}>
                <Path
                  d={`M28 ${70 + i * 47} H292`}
                  stroke="#B69A81"
                  strokeWidth="7"
                />
                <Path
                  d={`M58 ${57 + i * 47} Q77 ${54 + i * 47} 88 ${43 + i * 47} L105 ${52 + i * 47} Q121 ${56 + i * 47} 130 ${64 + i * 47} Q133 ${72 + i * 47} 120 ${73 + i * 47} H64 Q53 ${71 + i * 47} 58 ${57 + i * 47}Z`}
                  fill={["#80B9E5", "#E7A6BC", "#B7D7A0"][i]}
                  stroke="#8C8BB1"
                  strokeWidth="2"
                />
                <Path
                  d={`M60 ${68 + i * 47} H124`}
                  stroke="#FFFFFF"
                  strokeWidth="3"
                />
              </G>
            ))}
          </>
        ) : category === "hairpin" ? (
          <>
            <Rect
              x="70"
              y="26"
              width="180"
              height="146"
              rx="70"
              fill="#D8C8F0"
            />
            <Rect
              x="80"
              y="35"
              width="160"
              height="127"
              rx="62"
              fill="#D9F1F8"
              stroke="#FFFFFF"
              strokeWidth="5"
            />
            <Rect
              x="35"
              y="181"
              width="250"
              height="24"
              rx="8"
              fill="#E9DDF8"
            />
            <Path
              d="M75 119 C54 101 48 123 75 143 C102 123 96 101 75 119Z"
              fill="#E98FB6"
              stroke="#C86B94"
              strokeWidth="2"
            />
            <Path
              d="M245 112 L250 125 L264 125 L253 134 L257 148 L245 140 L233 148 L237 134 L226 125 L240 125Z"
              fill="#F4C95F"
              stroke="#D6A33D"
              strokeWidth="2"
            />
          </>
        ) : category === "necklace" ? (
          <>
            <Path
              d="M100 42 Q160 95 220 42 L246 126 Q160 182 74 126Z"
              fill="#F0DCC1"
              stroke="#D5B894"
              strokeWidth="2"
            />
            <Path
              d="M112 48 Q115 117 160 145 Q205 117 208 48"
              stroke="#D4A53E"
              strokeWidth="4"
              fill="none"
            />
            <Circle
              cx="160"
              cy="147"
              r="10"
              fill="#F6D36F"
              stroke="#C9952E"
              strokeWidth="2"
            />
            <Path
              d="M160 139 C150 131 145 142 160 154 C175 142 170 131 160 139Z"
              fill="#E985A9"
            />
          </>
        ) : category === "glasses" ? (
          <>
            {[0, 1, 2].map((i) => (
              <G key={i} transform={`translate(160 ${64 + i * 51})`}>
                <Rect
                  x="-61"
                  y="-14"
                  width="48"
                  height="30"
                  rx={category === "glasses" ? 10 : 4}
                  fill={["#7BC8D1", "#B9A5E7", "#F2B4C7"][i]}
                  stroke="#6C92A8"
                  strokeWidth="3"
                />
                <Rect
                  x="13"
                  y="-14"
                  width="48"
                  height="30"
                  rx={10}
                  fill={["#7BC8D1", "#B9A5E7", "#F2B4C7"][i]}
                  stroke="#6C92A8"
                  strokeWidth="3"
                />
                <Path
                  d="M-13 0 Q0-7 13 0 M-61-6 L-73-12 M61-6 L73-12"
                  stroke="#6C92A8"
                  strokeWidth="3"
                  fill="none"
                />
              </G>
            ))}
          </>
        ) : (
          <>
            <Rect x="27" y="32" width="266" height="13" rx="6" fill="#D4B9A4" />
            {[0, 1, 2, 3, 4].map((i) => (
              <G key={i} transform={`translate(${55 + i * 52} 91)`}>
                <Rect
                  x="-13"
                  y="-20"
                  width="26"
                  height="43"
                  rx="5"
                  fill={
                    ["#E98DA7", "#77B9E0", "#83B875", "#B39BE2", "#E8BD5D"][i]
                  }
                  stroke="#B58B78"
                  strokeWidth="2"
                />
                <Circle cx="-4" cy="-7" r="2.3" fill="#FFF8EF" />
                <Circle cx="4" cy="-7" r="2.3" fill="#FFF8EF" />
                <Path d="M-5 10 H5" stroke="#FFF8EF" strokeWidth="2" />
              </G>
            ))}
            <Rect
              x="28"
              y="139"
              width="264"
              height="64"
              rx="8"
              fill="#F2E1D6"
            />
            <Path
              d="M42 158 H278 M42 181 H278"
              stroke="#D8B6A4"
              strokeWidth="3"
            />
          </>
        )}
      </Frame>
    </Svg>
  );
}

function NatureScene({ category }: Props<NatureBackgroundKind>) {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 320 240">
      <Defs>
        <LinearGradient id="natureSky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#77D0F4" />
          <Stop offset="1" stopColor="#DFF8FF" />
        </LinearGradient>
      </Defs>
      <Frame
        edge={category === "sky" ? PALETTES.sky.edge : PALETTES.nature.edge}
        pale={category === "sky" ? PALETTES.sky.pale : PALETTES.nature.pale}
      >
        {category === "sky" ? (
          <>
            <Rect
              x="7"
              y="7"
              width="306"
              height="226"
              rx="12"
              fill="url(#natureSky)"
            />
            <Circle cx="255" cy="43" r="23" fill="#FFE58A" />
            <Path
              d="M8 165 Q58 148 104 164 T203 160 T312 151 V233 H8Z"
              fill="#B5E2B0"
            />
            <Path d="M8 189 Q70 174 140 191 T312 180 V233 H8Z" fill="#8CCB9B" />
            <G fill="#FFFFFF" opacity=".94">
              <Circle cx="54" cy="65" r="15" />
              <Circle cx="72" cy="58" r="21" />
              <Circle cx="94" cy="67" r="15" />
              <Rect x="48" y="65" width="53" height="17" rx="8" />
              <Circle cx="176" cy="93" r="12" />
              <Circle cx="191" cy="86" r="17" />
              <Circle cx="210" cy="95" r="12" />
              <Rect x="170" y="93" width="47" height="13" rx="6" />
            </G>
            <Path
              d="M37 129 Q58 115 80 129 M231 128 Q252 113 274 128"
              stroke="#6BAF9B"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <Path
              d="M137 33 L141 42 L151 45 L141 48 L137 58 L133 48 L123 45 L133 42Z"
              fill="#FFFFFF"
              opacity=".85"
            />
          </>
        ) : (
          <>
            <Rect
              x="7"
              y="7"
              width="306"
              height="226"
              rx="12"
              fill="url(#natureSky)"
            />
            <Circle cx="260" cy="37" r="20" fill="#FFE58A" />
            <Path
              d="M8 119 Q55 78 105 119 T205 113 T312 109 V233 H8Z"
              fill="#9BCF85"
            />
            <Path
              d="M8 147 Q73 111 135 151 T255 143 T312 138 V233 H8Z"
              fill="#73BC78"
            />
            <Path d="M8 181 Q80 157 158 181 T312 172 V233 H8Z" fill="#4FA66D" />
            <Path d="M8 207 Q75 190 140 207 T312 200 V233 H8Z" fill="#B5D98D" />
            {[34, 73, 247, 286].map((x, i) => (
              <G key={x} transform={`translate(${x} ${168 + (i % 2) * 12})`}>
                <Path d="M0 35 V0" stroke="#6D9D58" strokeWidth="4" />
                <Ellipse
                  cx="-8"
                  cy="7"
                  rx="12"
                  ry="6"
                  fill="#3F965B"
                  transform="rotate(-30 -8 7)"
                />
                <Ellipse
                  cx="9"
                  cy="17"
                  rx="12"
                  ry="6"
                  fill="#58AC65"
                  transform="rotate(30 9 17)"
                />
              </G>
            ))}
            <Path
              d="M120 233 Q137 201 160 183 Q181 202 199 233Z"
              fill="#DCC68B"
              opacity=".8"
            />
            <Path
              d="M120 233 Q137 201 160 183 Q181 202 199 233"
              fill="none"
              stroke="#F2E1AD"
              strokeWidth="3"
            />
            <G transform="translate(57 153)">
              <Circle cx="0" cy="0" r="5" fill="#FFF9F1" />
              <Circle cx="-7" cy="3" r="5" fill="#FFF9F1" />
              <Circle cx="7" cy="3" r="5" fill="#FFF9F1" />
              <Circle cy="7" r="5" fill="#FFF9F1" />
              <Circle r="3" fill="#F4CF60" />
            </G>
          </>
        )}
      </Frame>
    </Svg>
  );
}

export function FoodCategoryBackground(props: Props<FoodBackgroundKind>) {
  return <FoodScene {...props} />;
}
export function ClothingCategoryBackground(
  props: Props<ClothingBackgroundKind>,
) {
  return <ClothingScene {...props} />;
}
export function NatureCategoryBackground(props: Props<NatureBackgroundKind>) {
  return <NatureScene {...props} category="nature" />;
}
export function SkyCategoryBackground(
  props: Omit<Props<NatureBackgroundKind>, "category">,
) {
  return <NatureScene {...props} category="sky" />;
}
export function PlantCategoryBackground(
  props: Omit<Props<NatureBackgroundKind>, "category">,
) {
  return <NatureScene {...props} category="plant" />;
}

export default function RemainCategoryBackground({
  category,
  ...props
}: {
  category: FoodBackgroundKind | ClothingBackgroundKind | NatureBackgroundKind;
  width?: number | string;
  height?: number | string;
}) {
  if (
    ["food", "fruit", "vegetable", "meal", "snack", "drink"].includes(category)
  )
    return <FoodScene category={category as FoodBackgroundKind} {...props} />;
  if (
    [
      "clothing",
      "hat",
      "clothes",
      "shoes",
      "hairpin",
      "necklace",
      "glasses",
      "button",
    ].includes(category)
  )
    return (
      <ClothingScene category={category as ClothingBackgroundKind} {...props} />
    );
  return <NatureScene category={category as NatureBackgroundKind} {...props} />;
}

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

const Sky = ({
  id,
  top,
  bottom,
}: {
  id: string;
  top: string;
  bottom: string;
}) => (
  <>
    <Defs>
      <LinearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0" stopColor={top} />
        <Stop offset="1" stopColor={bottom} />
      </LinearGradient>
    </Defs>
    <Rect width="320" height="240" fill={`url(#${id})`} />
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
  <G transform={`translate(${x} ${y}) scale(${scale})`} opacity=".9">
    <Circle cx="0" cy="10" r="10" fill="#fff" />
    <Circle cx="14" cy="3" r="14" fill="#fff" />
    <Circle cx="30" cy="10" r="10" fill="#fff" />
    <Rect x="-5" y="8" width="40" height="14" rx="7" fill="#fff" />
  </G>
);
function Flower({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <G transform={`translate(${x} ${y}) scale(${s})`}>
      <Path d="M0 3 L-2 19" stroke="#478F4B" strokeWidth="2.5" />
      <Path d="M-2 12 Q-11 5 -12 12 Q-8 18 -2 12" fill="#65B765" />
      {[
        [0, -4],
        [-5, 0],
        [5, 0],
        [-3, 5],
        [3, 5],
      ].map(([cx, cy], i) => (
        <Circle key={i} cx={cx} cy={cy} r="4" fill="#FFFDF2" />
      ))}
      <Circle cy="1" r="3" fill="#F5C94F" />
    </G>
  );
}
function Tree({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <G transform={`translate(${x} ${y}) scale(${s})`}>
      <Path d="M-8 18 Q-14 48 -8 78 H9 Q13 46 5 18Z" fill="#95603C" />
      <Path
        d="M0 42 L-23 22 M2 38 L23 17"
        stroke="#95603C"
        strokeWidth="7"
        strokeLinecap="round"
      />
      {(
        [
          [0, 0, 25, "#6AC34E"],
          [-20, 10, 21, "#55B64A"],
          [21, 13, 22, "#78CD53"],
          [-4, 24, 22, "#83D45A"],
        ] as [number, number, number, string][]
      ).map(([cx, cy, r, c], i) => (
        <Circle key={i} cx={cx} cy={cy} r={r} fill={c} />
      ))}
      {[
        [-16, 4],
        [-2, -11],
        [17, 7],
        [5, 23],
        [-19, 21],
      ].map(([cx, cy], i) => (
        <G key={i} transform={`translate(${cx} ${cy})`}>
          <Path
            d="M0 -4 Q-2 -12 4 -13"
            stroke="#477F39"
            strokeWidth="2"
            fill="none"
          />
          <Path
            d="M-7 -2 Q-8 -9 -1 -10 Q4 -13 8 -7 Q11 0 4 5 Q-2 9 -7 3Z"
            fill={i % 2 ? "#F15B3F" : "#F77B43"}
          />
          <Ellipse cx="-3" cy="-4" rx="2" ry="3" fill="#FFC39C" opacity=".8" />
        </G>
      ))}
    </G>
  );
}
function Windmill({ x, y }: { x: number; y: number }) {
  return (
    <G transform={`translate(${x} ${y})`}>
      <Path
        d="M-12 12 L-8 67 H8 L12 12Z"
        fill="#FFF1D5"
        stroke="#D3B58A"
        strokeWidth="2"
      />
      <Path d="M-8 36 H8 M-9 50 H9" stroke="#E5C99D" strokeWidth="2" />
      <G transform="translate(0 12)">
        {[0, 90, 180, 270].map((a) => (
          <G key={a} transform={`rotate(${a})`}>
            <Path
              d="M0 -2 L-4 -30 L0 -38 L4 -30 L2 0Z"
              fill="#F4D5A6"
              stroke="#B98754"
              strokeWidth="1.5"
            />
            <Path d="M0 -7 V-30" stroke="#D9AC78" strokeWidth="1.3" />
          </G>
        ))}
        <Circle r="5" fill="#B77C4C" stroke="#FCE5BE" strokeWidth="2" />
      </G>
    </G>
  );
}
function FruitScene() {
  return (
    <>
      <Sky id="fruitSky" top="#62C7F5" bottom="#E4FAFF" />
      <Circle cx="274" cy="31" r="16" fill="#FFE58C" />
      <Cloud x={150} y={40} scale={0.9} />
      <Cloud x={214} y={57} scale={0.55} />
      <Path
        d="M0 110 L35 78 69 103 112 70 151 101 194 75 235 101 281 72 320 100 V240 H0Z"
        fill="#77C8C2"
      />
      <Path
        d="M0 130 L42 99 80 122 125 91 167 122 211 96 255 124 291 100 320 117 V240 H0Z"
        fill="#4FB2A6"
      />
      <Path d="M0 145 Q80 118 160 145 T320 139 V240 H0Z" fill="#B9E66F" />
      <Path d="M0 173 Q80 151 160 173 T320 165 V240 H0Z" fill="#8ED44F" />
      <Tree x={27} y={55} s={1.12} />
      <Tree x={292} y={48} s={1.1} />
      <Windmill x={116} y={65} />
      <Path
        d="M20 143 Q85 137 160 144 T300 142"
        stroke="#9A6B40"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M20 159 Q85 153 160 160 T300 158"
        stroke="#C48D50"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      {Array.from({ length: 8 }, (_, i) => (
        <G key={i} transform={`translate(${25 + i * 39} 142)`}>
          <Rect
            x="-4"
            y="0"
            width="8"
            height="25"
            rx="2"
            fill="#D8A15C"
            stroke="#A9753D"
            strokeWidth="1.5"
          />
          <Path d="M-2 7 H2 M-2 16 H2" stroke="#F2D29A" strokeWidth="1.3" />
        </G>
      ))}
      <Path
        d="M0 207 Q40 180 80 207 T160 204 T240 207 T320 200 V240 H0Z"
        fill="#4CA45A"
      />
      {[15, 47, 76, 245, 278, 305].map((x, i) => (
        <Flower key={i} x={x} y={213 + (i % 2) * 10} s={0.85} />
      ))}
    </>
  );
}

function VegetableScene() {
  return (
    <>
      <Sky id="vegSky" top="#5FC4F2" bottom="#E5FAFF" />
      <Circle cx="45" cy="28" r="13" fill="#FFE58C" />
      <Cloud x={72} y={38} scale={0.65} />
      <Cloud x={177} y={30} scale={0.6} />
      <Path
        d="M0 110 L42 77 82 106 126 72 166 105 210 76 253 104 290 78 320 99 V240 H0Z"
        fill="#77C8C2"
      />
      <Path
        d="M0 129 Q60 104 120 128 T240 123 T320 127 V240 H0Z"
        fill="#59AD75"
      />
      <Path d="M0 153 Q70 132 140 153 T320 148 V240 H0Z" fill="#B8DE75" />
      <Path d="M0 174 L118 151 148 240 H0Z" fill="#EBD394" />
      <Path d="M320 174 L204 151 174 240 H320Z" fill="#EBD394" />
      <Path
        d="M0 151 L118 134 134 148 0 169Z M320 151 L204 134 188 148 320 169Z"
        fill="#A96F4B"
      />
      {Array.from({ length: 4 }, (_, i) => (
        <G key={i}>
          <Path
            d={`M0 ${158 + i * 18} L${116 + i * 3} ${143 + i * 18} L${121 + i * 4} ${151 + i * 18} L0 ${177 + i * 18}Z`}
            fill="#B77D58"
          />
          <Path
            d={`M320 ${158 + i * 18} L${204 - i * 3} ${143 + i * 18} L${199 - i * 4} ${151 + i * 18} L320 ${177 + i * 18}Z`}
            fill="#B77D58"
          />
        </G>
      ))}
      {[
        [20, 151],
        [49, 156],
        [80, 151],
        [104, 163],
        [219, 151],
        [249, 156],
        [279, 151],
        [302, 162],
      ].map(([x, y], i) => (
        <G key={i} transform={`translate(${x} ${y})`}>
          <Path d="M0 10 Q-13 -4 -7 -11 Q3 -7 0 10Z" fill="#4FAF5B" />
          <Path d="M0 10 Q4 -10 14 -7 Q15 3 0 10Z" fill="#82D16D" />
        </G>
      ))}
      <G>
        <Path
          d="M210 94 L255 60 Q264 55 274 61 L319 83 V152 H210Z"
          fill="#BFEAF2"
          fillOpacity=".72"
          stroke="#7BBCCB"
          strokeWidth="3"
        />
        <Path
          d="M210 94 L255 60 Q264 55 274 61 L319 83"
          fill="none"
          stroke="#F7FFFF"
          strokeWidth="4"
        />
        <Path
          d="M232 79 V152 M259 63 V152 M288 68 V152 M211 113 H319 M211 134 H319"
          stroke="#7BBCCB"
          strokeWidth="2"
        />
        <Path
          d="M219 89 L255 66 M267 67 L307 88"
          stroke="#FFFFFF"
          strokeWidth="2"
          opacity=".8"
        />
        <Rect
          x="225"
          y="139"
          width="18"
          height="13"
          rx="2"
          fill="#C6B38B"
          stroke="#A18A68"
          strokeWidth="1.5"
        />
      </G>
      <Path
        d="M0 216 Q45 190 90 216 T180 213 T320 207 V240 H0Z"
        fill="#72C45C"
      />
      {[17, 47, 78, 101, 214, 242, 273, 300].map((x, i) => (
        <Flower key={i} x={x} y={220 + (i % 2) * 7} s={0.65} />
      ))}
    </>
  );
}
function MealScene() {
  return (
    <>
      <Sky id="mealWall" top="#FFF0D5" bottom="#EED0A5" />
      <Rect
        x="12"
        y="12"
        width="125"
        height="77"
        rx="3"
        fill="#FFFDF3"
        stroke="#D7B88F"
        strokeWidth="4"
      />
      <Rect x="19" y="19" width="111" height="63" fill="#A9E4F5" />
      <Path d="M19 66 Q43 43 67 65 T130 57 V82 H19Z" fill="#8ACF80" />
      <Circle cx="105" cy="32" r="8" fill="#FFE78C" />
      <Path d="M74 19 V82 M19 51 H130" stroke="#FFF8E8" strokeWidth="4" />
      <Rect
        x="151"
        y="13"
        width="88"
        height="79"
        rx="3"
        fill="#B7DDE5"
        stroke="#D7B88F"
        strokeWidth="4"
      />
      <Path d="M195 13 V92 M151 52 H239" stroke="#FFF8E8" strokeWidth="4" />
      <Rect x="0" y="100" width="320" height="140" fill="#D9A36A" />
      {Array.from({ length: 6 }, (_, i) => (
        <Path
          key={i}
          d={`M0 ${118 + i * 23} H320`}
          stroke="#F0C58B"
          strokeWidth="2"
          opacity=".8"
        />
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <Path
          key={i}
          d={`M${i * 50} 100 V240`}
          stroke="#C68E57"
          strokeWidth="1.5"
          opacity=".5"
        />
      ))}
      <Path d="M0 104 H320 V116 H0Z" fill="#B77E4F" opacity=".45" />
      <G>
        <Path
          d="M25 148 Q25 141 35 141 H285 Q295 141 295 151 L309 226 Q310 233 301 233 H18 Q10 233 12 226Z"
          fill="#FFF3D6"
          stroke="#D7B37A"
          strokeWidth="2"
        />
        {Array.from({ length: 9 }, (_, i) => (
          <Path
            key={`v${i}`}
            d={`M${37 + i * 29} 144 L${22 + i * 31} 231`}
            stroke="#F1D19A"
            strokeWidth="8"
            opacity=".95"
          />
        ))}
        {Array.from({ length: 4 }, (_, i) => (
          <Path
            key={`h${i}`}
            d={`M17 ${160 + i * 20} H305`}
            stroke="#F1D19A"
            strokeWidth="8"
            opacity=".95"
          />
        ))}
        <Ellipse
          cx="160"
          cy="192"
          rx="57"
          ry="32"
          fill="#C08A57"
          opacity=".22"
        />
        <Ellipse
          cx="160"
          cy="187"
          rx="53"
          ry="31"
          fill="#FFFFFF"
          stroke="#E7DED2"
          strokeWidth="3"
        />
        <Ellipse
          cx="160"
          cy="187"
          rx="43"
          ry="23"
          fill="#FFFCF8"
          stroke="#F0E8DE"
          strokeWidth="2"
        />
        <G transform="translate(55 190) rotate(8)">
          <Rect
            x="-5"
            y="-1"
            width="10"
            height="34"
            rx="5"
            fill="#70B8E2"
            stroke="#4D97C5"
            strokeWidth="1.5"
          />
          <Rect
            x="-6"
            y="-23"
            width="12"
            height="22"
            rx="4"
            fill="#DCE8EC"
            stroke="#9DADB5"
            strokeWidth="1.5"
          />
          {[-5, -2, 1, 4].map((x) => (
            <Path
              key={x}
              d={`M${x} -22 V-31`}
              stroke="#9DADB5"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ))}
        </G>
        <G transform="translate(255 190) rotate(-8)">
          <Path
            d="M-4 -29 Q-10 -13 -4 -1 H5 V-25 Q2 -35 -4 -29Z"
            fill="#DCE8EC"
            stroke="#9DADB5"
            strokeWidth="1.5"
          />
          <Rect
            x="-5"
            y="-1"
            width="10"
            height="34"
            rx="5"
            fill="#70B8E2"
            stroke="#4D97C5"
            strokeWidth="1.5"
          />
        </G>
        <G transform="translate(279 190) rotate(-12)">
          <Ellipse
            cy="-18"
            rx="9"
            ry="12"
            fill="#DCE8EC"
            stroke="#9DADB5"
            strokeWidth="1.5"
          />
          <Rect
            x="-5"
            y="-7"
            width="10"
            height="40"
            rx="5"
            fill="#70B8E2"
            stroke="#4D97C5"
            strokeWidth="1.5"
          />
        </G>
      </G>
      <G transform="translate(18 107)">
        <Path
          d="M0 20 Q-5 2 6 0 Q15 12 0 20 M5 20 Q15 3 23 10 Q20 20 5 20"
          fill="#67B768"
        />
        <Path
          d="M-2 20 H24 L21 38 H2Z"
          fill="#E8D2B0"
          stroke="#C2A783"
          strokeWidth="2"
        />
      </G>
      <Path d="M0 96 H320" stroke="#C8915A" strokeWidth="5" />
    </>
  );
}
function SnackScene() {
  return (
    <>
      <Sky id="snackSky" top="#9ADFF7" bottom="#FFF5F5" />
      <Path
        d="M0 142 L35 125 73 143 108 122 152 144 198 126 240 143 284 126 320 142 V240 H0Z"
        fill="#C6EBF5"
      />
      <Path d="M0 185 H320 V240 H0Z" fill="#F6E4DA" />
      {Array.from({ length: 6 }, (_, i) => (
        <Path
          key={i}
          d={`M0 ${193 + i * 9} H320`}
          stroke="#E7C7B9"
          strokeWidth="1.5"
        />
      ))}
      <Rect
        x="18"
        y="46"
        width="284"
        height="146"
        fill="#FFF9F5"
        stroke="#E8B4C3"
        strokeWidth="4"
      />
      <Rect
        x="30"
        y="65"
        width="260"
        height="111"
        fill="#B6E9F6"
        stroke="#DFA6B9"
        strokeWidth="2"
      />
      {Array.from({ length: 3 }, (_, c) =>
        Array.from({ length: 3 }, (_, r) => (
          <G key={`${c}-${r}`}>
            <Rect
              x={39 + c * 83}
              y={76 + r * 29}
              width="29"
              height="18"
              rx="3"
              fill={["#F4C66E", "#90D1A3", "#F1A6BC"][(c + r) % 3]}
            />
            <Rect
              x={72 + c * 83}
              y={79 + r * 29}
              width="25"
              height="15"
              rx="3"
              fill={["#A5D8EF", "#F5D28D", "#B6DDAA"][(c + r) % 3]}
            />
          </G>
        )),
      )}
      <Rect x="12" y="40" width="296" height="27" fill="#F5B0C5" />
      {Array.from({ length: 12 }, (_, i) => (
        <G key={i}>
          <Rect
            x={14 + i * 24}
            y="40"
            width="12"
            height="29"
            fill={i % 2 === 0 ? "#FFF8F2" : "#F3A0B9"}
          />
          <Path
            d={`M${14 + i * 24} 66 Q${20 + i * 24} 78 ${26 + i * 24} 66`}
            fill={i % 2 === 0 ? "#FFF8F2" : "#F3A0B9"}
          />
        </G>
      ))}
      <Rect
        x="112"
        y="19"
        width="96"
        height="25"
        rx="6"
        fill="#F05F84"
        stroke="#FFF5F4"
        strokeWidth="3"
      />
      <Rect x="123" y="24" width="74" height="14" rx="3" fill="#FFF6F7" />
      <Path
        d="M135 26 V36 M142 26 V36 M149 26 V36 M174 26 V36 M181 26 V36"
        stroke="#F05F84"
        strokeWidth="2"
      />
      <Rect
        x="222"
        y="69"
        width="65"
        height="105"
        rx="4"
        fill="#7CCDE5"
        stroke="#4C9FC6"
        strokeWidth="3"
      />
      <Path d="M254 70 V174" stroke="#E9FBFF" strokeWidth="3" />
      {(
        [
          [229, 80, "#F6C96F"],
          [259, 80, "#9DD6A8"],
          [229, 112, "#EFA5B9"],
          [259, 112, "#D6C7F1"],
          [229, 144, "#B2D9EF"],
          [259, 144, "#F4D18D"],
        ] as [number, number, string][]
      ).map(([x, y, c], i) => (
        <Rect key={i} x={x} y={y} width="22" height="24" rx="3" fill={c} />
      ))}
      <Path d="M0 179 H320 V192 H0Z" fill="#E4A2B6" />
      <Path
        d="M30 171 H290 Q299 171 299 180 V222 H21 V180 Q21 171 30 171Z"
        fill="#F37E9E"
        stroke="#D95C7F"
        strokeWidth="2"
      />
      <Path
        d="M37 179 H283 L272 212 H48Z"
        fill="#F4F2F6"
        stroke="#D9B9C7"
        strokeWidth="2"
      />
      <Path d="M47 187 H273 L269 195 H43Z" fill="#C8DCE4" />
      <G transform="translate(15 178)">
        <Rect width="25" height="43" rx="3" fill="#B98552" />
        <Rect x="4" y="4" width="17" height="32" fill="#3F4548" />
        <Path
          d="M8 14 Q12 7 17 14 M8 22 Q12 27 17 22"
          stroke="#FFF5E5"
          strokeWidth="1.5"
          fill="none"
        />
      </G>
      <G transform="translate(300 181)">
        <Path d="M0 34 V0" stroke="#A8754E" strokeWidth="3" />
        <Path
          d="M0 18 Q-18 1 -13 -7 Q2 -5 0 18 M0 15 Q7 -7 20 -2 Q18 12 0 15"
          fill="#62B56A"
        />
        <Path d="M-9 34 H9 L7 51 H-7Z" fill="#C58C5A" />
      </G>
    </>
  );
}
function DrinkScene() {
  return (
    <>
      <Sky id="drinkSky" top="#56C1F2" bottom="#DDF7FF" />
      <Circle cx="275" cy="29" r="16" fill="#FFE68A" />
      <Cloud x={15} y={61} scale={1.0} />
      <Cloud x={104} y={82} scale={0.8} />
      <Cloud x={242} y={63} scale={1.0} />
      <Path
        d="M0 132 Q50 119 100 132 T200 130 T320 128 V178 H0Z"
        fill="#67C6E9"
      />
      <Path d="M0 151 Q80 139 160 151 T320 146 V178 H0Z" fill="#39ADDC" />
      <Path d="M0 164 Q80 156 160 164 T320 160 V179 H0Z" fill="#F8FEFF" />
      <Path d="M0 178 H320 V240 H0Z" fill="#DDEFF4" />
      {Array.from({ length: 8 }, (_, i) =>
        Array.from({ length: 3 }, (_, j) => (
          <Rect
            key={`${i}-${j}`}
            x={i * 40}
            y={180 + j * 20}
            width="40"
            height="20"
            fill={(i + j) % 2 === 0 ? "#FFFFFF" : "#8BCBF0"}
          />
        )),
      )}
      <Path
        d="M0 0 H320 V22 Q300 47 280 22 Q260 47 240 22 Q220 47 200 22 Q180 47 160 22 Q140 47 120 22 Q100 47 80 22 Q60 47 40 22 Q20 47 0 22Z"
        fill="#4CA7E1"
      />
      {Array.from({ length: 8 }, (_, i) => (
        <Path
          key={i}
          d={`M${i * 40} 1 H${i * 40 + 20} V29 Q${i * 40 + 20} 39 ${i * 40 + 40} 29 V1Z`}
          fill={i % 2 === 0 ? "#F7FCFF" : "#4CA7E1"}
        />
      ))}
      <Path d="M0 0 H320 V8 H0Z" fill="#FFFFFF" opacity=".7" />
      <Path
        d="M220 23 Q252 43 282 25 T320 34"
        stroke="#839BA8"
        strokeWidth="2"
        fill="none"
      />
      {[238, 267, 296, 317].map((x, i) => (
        <G key={i}>
          <Path
            d={`M${x} ${27 + (i % 2) * 5} v8`}
            stroke="#839BA8"
            strokeWidth="2"
          />
          <Circle
            cx={x}
            cy={40 + (i % 2) * 5}
            r="6"
            fill="#FFF0A6"
            stroke="#F2D278"
            strokeWidth="1.5"
          />
        </G>
      ))}
      <G transform="translate(18 106)">
        <Path
          d="M0 35 Q-8 7 8 0 Q17 18 0 35 M3 35 Q16 8 28 17 Q24 31 3 35"
          fill="#63B76B"
        />
        <Path
          d="M-4 34 H28 L24 55 H1Z"
          fill="#F0D7B8"
          stroke="#C7A987"
          strokeWidth="2"
        />
        <Path d="M0 40 H26" stroke="#FFFFFF" strokeWidth="3" />
      </G>
      <Path
        d="M284 117 L290 78 L301 78 L307 117Z"
        fill="#FFF8E8"
        stroke="#D6C4A4"
        strokeWidth="1.5"
      />
      <Path d="M288 96 H303 L301 104 H287Z" fill="#E77872" />
      <Path d="M290 82 L295 68 L301 82Z" fill="#E77872" />
      <Rect x="291" y="82" width="8" height="7" fill="#F3D7A7" />
      <Path d="M255 126 Q281 115 320 124 V153 H248Z" fill="#A2D78D" />
      <G transform="translate(280 135) rotate(8)">
        <Path
          d="M-19 0 H19 V42 H-19Z"
          fill="#A9794D"
          stroke="#E8C49B"
          strokeWidth="2"
        />
        <Rect x="-15" y="4" width="30" height="33" rx="1" fill="#344A50" />
        <Path
          d="M-10 12 H9 M-10 18 H7 M-10 24 H3"
          stroke="#FFF5E0"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <Path d="M-10 42 V48 M10 42 V48" stroke="#A9794D" strokeWidth="3" />
      </G>
      <Path
        d="M0 208 Q42 191 84 208 T168 207 T252 206 T320 203 V240 H0Z"
        fill="#FFFFFF"
        opacity=".22"
      />
    </>
  );
}

const SCENES: Record<FoodBackgroundKind, React.FC> = {
  food: FruitScene,
  fruit: FruitScene,
  vegetable: VegetableScene,
  meal: MealScene,
  snack: SnackScene,
  drink: DrinkScene,
};
const BORDER: Record<FoodBackgroundKind, string> = {
  food: "#56B67C",
  fruit: "#56B67C",
  vegetable: "#56B67C",
  meal: "#F7BA45",
  snack: "#F4769B",
  drink: "#4DADE8",
};
export default function FoodCategoryBackground({
  category,
  width = "100%",
  height = "100%",
}: Props & { category: FoodBackgroundKind }) {
  const Scene = SCENES[category];
  const border = BORDER[category];
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 320 240"
      preserveAspectRatio="xMidYMid meet"
    >
      <Rect width="320" height="240" rx="16" fill="#FFFFFF" />
      <Scene />
      <Rect
        x="3"
        y="3"
        width="314"
        height="234"
        rx="14"
        fill="none"
        stroke={border}
        strokeWidth="4"
        opacity=".95"
      />
      <Rect
        x="8"
        y="8"
        width="304"
        height="224"
        rx="10"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2"
        opacity=".9"
      />
    </Svg>
  );
}

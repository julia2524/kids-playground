// import React from "react";
// import Svg, {
//   Circle,
//   Defs,
//   Ellipse,
//   G,
//   LinearGradient,
//   Path,
//   Rect,
//   Stop,
// } from "react-native-svg";

// type Props = { width?: number | string; height?: number | string };

// const Sky = ({
//   id,
//   top,
//   bottom,
// }: {
//   id: string;
//   top: string;
//   bottom: string;
// }) => (
//   <>
//     <Defs>
//       <LinearGradient id={id} x1="0" y1="0" x2="0" y2="1">
//         <Stop offset="0" stopColor={top} />
//         <Stop offset="1" stopColor={bottom} />
//       </LinearGradient>
//     </Defs>
//     <Rect width="320" height="240" fill={`url(#${id})`} />
//   </>
// );
// const Cloud = ({
//   x,
//   y,
//   scale = 1,
// }: {
//   x: number;
//   y: number;
//   scale?: number;
// }) => (
//   <G transform={`translate(${x} ${y}) scale(${scale})`} opacity=".9">
//     <Circle cx="0" cy="10" r="10" fill="#fff" />
//     <Circle cx="14" cy="3" r="14" fill="#fff" />
//     <Circle cx="30" cy="10" r="10" fill="#fff" />
//     <Rect x="-5" y="8" width="40" height="14" rx="7" fill="#fff" />
//   </G>
// );
// function Flower({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
//   return (
//     <G transform={`translate(${x} ${y}) scale(${s})`}>
//       <Path d="M0 3 L-2 19" stroke="#478F4B" strokeWidth="2.5" />
//       <Path d="M-2 12 Q-11 5 -12 12 Q-8 18 -2 12" fill="#65B765" />
//       {[
//         [0, -4],
//         [-5, 0],
//         [5, 0],
//         [-3, 5],
//         [3, 5],
//       ].map(([cx, cy], i) => (
//         <Circle key={i} cx={cx} cy={cy} r="4" fill="#FFFDF2" />
//       ))}
//       <Circle cy="1" r="3" fill="#F5C94F" />
//     </G>
//   );
// }
// function Tree({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
//   return (
//     <G transform={`translate(${x} ${y}) scale(${s})`}>
//       <Path d="M-8 18 Q-14 48 -8 78 H9 Q13 46 5 18Z" fill="#95603C" />
//       <Path
//         d="M0 42 L-23 22 M2 38 L23 17"
//         stroke="#95603C"
//         strokeWidth="7"
//         strokeLinecap="round"
//       />
//       {(
//         [
//           [0, 0, 25, "#6AC34E"],
//           [-20, 10, 21, "#55B64A"],
//           [21, 13, 22, "#78CD53"],
//           [-4, 24, 22, "#83D45A"],
//         ] as [number, number, number, string][]
//       ).map(([cx, cy, r, c], i) => (
//         <Circle key={i} cx={cx} cy={cy} r={r} fill={c} />
//       ))}
//       {[
//         [-16, 4],
//         [-2, -11],
//         [17, 7],
//         [5, 23],
//         [-19, 21],
//       ].map(([cx, cy], i) => (
//         <G key={i} transform={`translate(${cx} ${cy})`}>
//           <Path
//             d="M0 -4 Q-2 -12 4 -13"
//             stroke="#477F39"
//             strokeWidth="2"
//             fill="none"
//           />
//           <Path
//             d="M-7 -2 Q-8 -9 -1 -10 Q4 -13 8 -7 Q11 0 4 5 Q-2 9 -7 3Z"
//             fill={i % 2 ? "#F15B3F" : "#F77B43"}
//           />
//           <Ellipse cx="-3" cy="-4" rx="2" ry="3" fill="#FFC39C" opacity=".8" />
//         </G>
//       ))}
//     </G>
//   );
// }
// function Windmill({ x, y }: { x: number; y: number }) {
//   return (
//     <G transform={`translate(${x} ${y})`}>
//       <Path
//         d="M-12 12 L-8 67 H8 L12 12Z"
//         fill="#FFF1D5"
//         stroke="#D3B58A"
//         strokeWidth="2"
//       />
//       <Path d="M-8 36 H8 M-9 50 H9" stroke="#E5C99D" strokeWidth="2" />
//       <G transform="translate(0 12)">
//         {[0, 90, 180, 270].map((a) => (
//           <G key={a} transform={`rotate(${a})`}>
//             <Path
//               d="M0 -2 L-4 -30 L0 -38 L4 -30 L2 0Z"
//               fill="#F4D5A6"
//               stroke="#B98754"
//               strokeWidth="1.5"
//             />
//             <Path d="M0 -7 V-30" stroke="#D9AC78" strokeWidth="1.3" />
//           </G>
//         ))}
//         <Circle r="5" fill="#B77C4C" stroke="#FCE5BE" strokeWidth="2" />
//       </G>
//     </G>
//   );
// }

// function FoodTableScene() {
//   return (
//     <>
//       <Defs>
//         {/* 파스텔 바닐라 & 웜 버터 벽면 그라데이션 */}
//         <LinearGradient id="foodWall" x1="0" x2="0" y1="0" y2="1">
//           <Stop offset="0" stopColor="#FFFBF3" />
//           <Stop offset="1" stopColor="#F5E8D3" />
//         </LinearGradient>

//         {/* 부드러운 밀크티 원목 식탁 그라데이션 */}
//         <LinearGradient id="foodTable" x1="0" x2="0" y1="0" y2="1">
//           <Stop offset="0" stopColor="#E2B888" />
//           <Stop offset="1" stopColor="#C79A6B" />
//         </LinearGradient>

//         {/* 따뜻한 스노우 크림 접시 그라데이션 */}
//         <LinearGradient id="foodPlate" x1="0" x2="0" y1="0" y2="1">
//           <Stop offset="0" stopColor="#FFFFFF" />
//           <Stop offset="1" stopColor="#F0ECE1" />
//         </LinearGradient>

//         {/* 차분하고 은은한 파스텔 실버 커트러리 */}
//         <LinearGradient id="foodMetal" x1="0" x2="1" y1="0" y2="0">
//           <Stop offset="0" stopColor="#CCD8DF" />
//           <Stop offset="0.35" stopColor="#FFFFFF" />
//           <Stop offset="0.7" stopColor="#E0E8EC" />
//           <Stop offset="1" stopColor="#B2C2CC" />
//         </LinearGradient>

//         {/* 몽환적이고 맑은 민트블루 유리컵 */}
//         <LinearGradient id="foodGlass" x1="0" x2="1" y1="0" y2="0">
//           <Stop offset="0" stopColor="#D2F3F7" />
//           <Stop offset="0.35" stopColor="#FFFFFF" />
//           <Stop offset="0.7" stopColor="#C3EEF5" />
//           <Stop offset="1" stopColor="#A5E2ED" />
//         </LinearGradient>
//       </Defs>

//       {/* 따뜻하고 단정한 실내 배경 */}
//       <Rect fill="url(#foodWall)" height="240" width="320" />

//       {/* 벽의 은은한 액자 장식 */}
//       <Rect
//         fill="#FFFFFF"
//         height="45"
//         opacity=".65"
//         rx="8"
//         width="284"
//         x="18"
//         y="12"
//       />
//       <Path
//         d="M0 65 Q80 62 160 65 T320 65"
//         fill="none"
//         stroke="#E8D5BC"
//         strokeWidth="1.5"
//       />

//       {/* 식탁 영역 */}
//       <Path d="M0 68 Q80 63 160 68 T320 68 V240 H0Z" fill="url(#foodTable)" />

//       {/* 부드러운 식탁 나무결 */}
//       <Path
//         d="M0 95 Q82 90 160 95 T320 93"
//         fill="none"
//         opacity=".6"
//         stroke="#D8A572"
//         strokeWidth="2"
//       />
//       <Path
//         d="M0 165 Q85 160 170 165 T320 162"
//         fill="none"
//         opacity=".35"
//         stroke="#B88756"
//         strokeWidth="2"
//       />

//       {/* 물컵 & 그림자 그룹 */}
//       <G transform="translate(-50,-20)">
//         {/* 컵 아래의 부드러운 그림자 */}
//         <Ellipse
//           cx="160"
//           cy="116"
//           fill="#A07E5B"
//           opacity=".15"
//           rx="22"
//           ry="5"
//         />

//         {/* 물컵 */}
//         <Path
//           d="M145 74
//             Q145 71 149 71
//             H171
//             Q175 71 175 74
//             L172 112
//             Q171 119 165 120
//             H155
//             Q149 119 148 112Z"
//           fill="url(#foodGlass)"
//           stroke="#94D5E0"
//           strokeWidth="1.8"
//         />

//         {/* 물의 높이 (맑은 파스텔 하늘빛) */}
//         <Path
//           d="M149 90 Q160 87 171 90 L169 108
//             Q168 114 164 115 H156
//             Q151 114 151 108Z"
//           fill="#B1EBF5"
//           opacity=".75"
//         />

//         {/* 컵의 반사광 */}
//         <Path
//           d="M151 77 L153 104"
//           opacity=".9"
//           stroke="#FFFFFF"
//           strokeLinecap="round"
//           strokeWidth="3"
//         />
//         <Path
//           d="M169 78 L168 88"
//           stroke="#FFFFFF"
//           strokeLinecap="round"
//           strokeWidth="1.5"
//         />
//         <Ellipse
//           cx="160"
//           cy="74"
//           fill="#FCFFFF"
//           rx="11"
//           ry="2.8"
//           stroke="#94D5E0"
//           strokeWidth="1.5"
//         />
//       </G>

//       {/* 접시 & 커트러리 그룹 */}
//       <G transform="translate(0, -25)">
//         {/* 접시의 그림자 */}
//         <Ellipse
//           cx="160"
//           cy="182"
//           fill="#8B6243"
//           opacity=".15"
//           rx="74"
//           ry="44"
//         />

//         {/* 접시 바깥 테두리 */}
//         <Ellipse
//           cx="160"
//           cy="175"
//           fill="url(#foodPlate)"
//           rx="73"
//           ry="43"
//           stroke="#E0D6C8"
//           strokeWidth="2"
//         />

//         {/* 접시의 안쪽 오목한 면 */}
//         <Ellipse
//           cx="160"
//           cy="172"
//           fill="#FFFFFF"
//           rx="58"
//           ry="32"
//           stroke="#EAE3D8"
//           strokeWidth="2"
//         />

//         {/* 접시 가장자리의 은은한 하이라이트 */}
//         <Path
//           d="M103 168 Q110 142 153 137"
//           fill="none"
//           opacity=".95"
//           stroke="#FFFFFF"
//           strokeLinecap="round"
//           strokeWidth="3"
//         />

//         {/* 왼쪽 포크 */}
//         <G transform="translate(60 169) rotate(-9)">
//           <Rect
//             fill="url(#foodMetal)"
//             height="45"
//             rx="4"
//             stroke="#B0C1CC"
//             strokeWidth="1.2"
//             width="10"
//             x="-5"
//             y="-1"
//           />
//           <Path
//             d="M-7 -22
//               Q-7 -26 -4 -26
//               V-11
//               Q-2 -8 0 -11
//               V-27
//               Q3 -27 3 -23
//               V-11
//               Q5 -8 7 -11
//               V-23
//               Q7 -26 9 -24
//               V-8
//               Q9 -2 2 1
//               L2 5 H-2 L-2 1
//               Q-9 -2 -9 -8
//               V-24
//               Q-9 -26 -7 -22Z"
//             fill="url(#foodMetal)"
//             stroke="#B0C1CC"
//             strokeLinejoin="round"
//             strokeWidth="1.2"
//           />
//           <Path
//             d="M-2 7 V38"
//             opacity=".9"
//             stroke="#FFFFFF"
//             strokeLinecap="round"
//             strokeWidth="1.5"
//           />
//         </G>

//         {/* 오른쪽 숟가락 */}
//         <G transform="translate(260 169) rotate(9)">
//           <Rect
//             fill="url(#foodMetal)"
//             height="44"
//             rx="4"
//             stroke="#B0C1CC"
//             strokeWidth="1.2"
//             width="10"
//             x="-5"
//             y="1"
//           />
//           <Ellipse
//             cx="0"
//             cy="-13"
//             fill="url(#foodMetal)"
//             rx="9"
//             ry="13"
//             stroke="#B0C1CC"
//             strokeWidth="1.2"
//           />
//           <Ellipse
//             cx="-2"
//             cy="-15"
//             fill="#FFFFFF"
//             opacity=".7"
//             rx="3.5"
//             ry="7"
//           />
//           <Path
//             d="M-2 6 V38"
//             opacity=".9"
//             stroke="#FFFFFF"
//             strokeLinecap="round"
//             strokeWidth="1.5"
//           />
//         </G>
//       </G>

//       {/* 식탁 앞쪽 가장자리 입체감 */}
//       <Path d="M0 224 Q80 219 160 224 T320 221 V240 H0Z" fill="#B5895B" />
//       <Path
//         d="M0 225 Q80 220 160 225 T320 222"
//         fill="none"
//         stroke="#F0D5B5"
//         strokeWidth="2"
//       />
//     </>
//   );
// }
// function FruitScene() {
//   return (
//     <>
//       <Sky id="fruitSky" top="#62C7F5" bottom="#E4FAFF" />
//       <Circle cx="274" cy="31" r="16" fill="#FFE58C" />
//       <Cloud x={150} y={40} scale={0.9} />
//       <Cloud x={214} y={57} scale={0.55} />
//       <Path
//         d="M0 110 L35 78 69 103 112 70 151 101 194 75 235 101 281 72 320 100 V240 H0Z"
//         fill="#77C8C2"
//       />
//       <Path
//         d="M0 130 L42 99 80 122 125 91 167 122 211 96 255 124 291 100 320 117 V240 H0Z"
//         fill="#4FB2A6"
//       />
//       <Path d="M0 145 Q80 118 160 145 T320 139 V240 H0Z" fill="#B9E66F" />
//       <Path d="M0 173 Q80 151 160 173 T320 165 V240 H0Z" fill="#8ED44F" />
//       <Tree x={27} y={55} s={1.12} />
//       <Tree x={292} y={48} s={1.1} />
//       <Windmill x={116} y={65} />
//       <Path
//         d="M20 143 Q85 137 160 144 T300 142"
//         stroke="#9A6B40"
//         strokeWidth="7"
//         fill="none"
//         strokeLinecap="round"
//       />
//       <Path
//         d="M20 159 Q85 153 160 160 T300 158"
//         stroke="#C48D50"
//         strokeWidth="6"
//         fill="none"
//         strokeLinecap="round"
//       />
//       {Array.from({ length: 8 }, (_, i) => (
//         <G key={i} transform={`translate(${25 + i * 39} 142)`}>
//           <Rect
//             x="-4"
//             y="0"
//             width="8"
//             height="25"
//             rx="2"
//             fill="#D8A15C"
//             stroke="#A9753D"
//             strokeWidth="1.5"
//           />
//           <Path d="M-2 7 H2 M-2 16 H2" stroke="#F2D29A" strokeWidth="1.3" />
//         </G>
//       ))}
//       <Path
//         d="M0 207 Q40 180 80 207 T160 204 T240 207 T320 200 V240 H0Z"
//         fill="#4CA45A"
//       />
//       {[15, 47, 76, 245, 278, 305].map((x, i) => (
//         <Flower key={i} x={x} y={213 + (i % 2) * 10} s={0.85} />
//       ))}
//     </>
//   );
// }

// function VegetableScene() {
//   return (
//     <>
//       <Sky id="vegSky" top="#5FC4F2" bottom="#E5FAFF" />
//       <Circle cx="45" cy="28" r="13" fill="#FFE58C" />
//       <Cloud x={72} y={38} scale={0.65} />
//       <Cloud x={177} y={30} scale={0.6} />
//       <Path
//         d="M0 110 L42 77 82 106 126 72 166 105 210 76 253 104 290 78 320 99 V240 H0Z"
//         fill="#77C8C2"
//       />
//       <Path
//         d="M0 129 Q60 104 120 128 T240 123 T320 127 V240 H0Z"
//         fill="#59AD75"
//       />
//       <Path d="M0 153 Q70 132 140 153 T320 148 V240 H0Z" fill="#B8DE75" />
//       <Path d="M0 174 L118 151 148 240 H0Z" fill="#EBD394" />
//       <Path d="M320 174 L204 151 174 240 H320Z" fill="#EBD394" />
//       <Path
//         d="M0 151 L118 134 134 148 0 169Z M320 151 L204 134 188 148 320 169Z"
//         fill="#A96F4B"
//       />
//       {Array.from({ length: 4 }, (_, i) => (
//         <G key={i}>
//           <Path
//             d={`M0 ${158 + i * 18} L${116 + i * 3} ${143 + i * 18} L${121 + i * 4} ${151 + i * 18} L0 ${177 + i * 18}Z`}
//             fill="#B77D58"
//           />
//           <Path
//             d={`M320 ${158 + i * 18} L${204 - i * 3} ${143 + i * 18} L${199 - i * 4} ${151 + i * 18} L320 ${177 + i * 18}Z`}
//             fill="#B77D58"
//           />
//         </G>
//       ))}
//       {[
//         [20, 151],
//         [49, 156],
//         [80, 151],
//         [104, 163],
//         [219, 151],
//         [249, 156],
//         [279, 151],
//         [302, 162],
//       ].map(([x, y], i) => (
//         <G key={i} transform={`translate(${x} ${y})`}>
//           <Path d="M0 10 Q-13 -4 -7 -11 Q3 -7 0 10Z" fill="#4FAF5B" />
//           <Path d="M0 10 Q4 -10 14 -7 Q15 3 0 10Z" fill="#82D16D" />
//         </G>
//       ))}
//       <G>
//         <Path
//           d="M210 94 L255 60 Q264 55 274 61 L319 83 V152 H210Z"
//           fill="#BFEAF2"
//           fillOpacity=".72"
//           stroke="#7BBCCB"
//           strokeWidth="3"
//         />
//         <Path
//           d="M210 94 L255 60 Q264 55 274 61 L319 83"
//           fill="none"
//           stroke="#F7FFFF"
//           strokeWidth="4"
//         />
//         <Path
//           d="M232 79 V152 M259 63 V152 M288 68 V152 M211 113 H319 M211 134 H319"
//           stroke="#7BBCCB"
//           strokeWidth="2"
//         />
//         <Path
//           d="M219 89 L255 66 M267 67 L307 88"
//           stroke="#FFFFFF"
//           strokeWidth="2"
//           opacity=".8"
//         />
//         <Rect
//           x="225"
//           y="139"
//           width="18"
//           height="13"
//           rx="2"
//           fill="#C6B38B"
//           stroke="#A18A68"
//           strokeWidth="1.5"
//         />
//       </G>
//       <Path
//         d="M0 216 Q45 190 90 216 T180 213 T320 207 V240 H0Z"
//         fill="#72C45C"
//       />
//       {[17, 47, 78, 101, 214, 242, 273, 300].map((x, i) => (
//         <Flower key={i} x={x} y={220 + (i % 2) * 7} s={0.65} />
//       ))}
//     </>
//   );
// }
// function MealScene() {
//   return (
//     <>
//       <Sky id="mealWall" top="#FFF0D5" bottom="#EED0A5" />
//       <Rect
//         x="12"
//         y="12"
//         width="125"
//         height="77"
//         rx="3"
//         fill="#FFFDF3"
//         stroke="#D7B88F"
//         strokeWidth="4"
//       />
//       <Rect x="19" y="19" width="111" height="63" fill="#A9E4F5" />
//       <Path d="M19 66 Q43 43 67 65 T130 57 V82 H19Z" fill="#8ACF80" />
//       <Circle cx="105" cy="32" r="8" fill="#FFE78C" />
//       <Path d="M74 19 V82 M19 51 H130" stroke="#FFF8E8" strokeWidth="4" />
//       <Rect
//         x="151"
//         y="13"
//         width="88"
//         height="79"
//         rx="3"
//         fill="#B7DDE5"
//         stroke="#D7B88F"
//         strokeWidth="4"
//       />
//       <Path d="M195 13 V92 M151 52 H239" stroke="#FFF8E8" strokeWidth="4" />
//       <Rect x="0" y="100" width="320" height="140" fill="#D9A36A" />
//       {Array.from({ length: 6 }, (_, i) => (
//         <Path
//           key={i}
//           d={`M0 ${118 + i * 23} H320`}
//           stroke="#F0C58B"
//           strokeWidth="2"
//           opacity=".8"
//         />
//       ))}
//       {Array.from({ length: 7 }, (_, i) => (
//         <Path
//           key={i}
//           d={`M${i * 50} 100 V240`}
//           stroke="#C68E57"
//           strokeWidth="1.5"
//           opacity=".5"
//         />
//       ))}
//       <Path d="M0 104 H320 V116 H0Z" fill="#B77E4F" opacity=".45" />
//       <G>
//         <Path
//           d="M25 148 Q25 141 35 141 H285 Q295 141 295 151 L309 226 Q310 233 301 233 H18 Q10 233 12 226Z"
//           fill="#FFF3D6"
//           stroke="#D7B37A"
//           strokeWidth="2"
//         />
//         {Array.from({ length: 9 }, (_, i) => (
//           <Path
//             key={`v${i}`}
//             d={`M${37 + i * 29} 144 L${22 + i * 31} 231`}
//             stroke="#F1D19A"
//             strokeWidth="8"
//             opacity=".95"
//           />
//         ))}
//         {Array.from({ length: 4 }, (_, i) => (
//           <Path
//             key={`h${i}`}
//             d={`M17 ${160 + i * 20} H305`}
//             stroke="#F1D19A"
//             strokeWidth="8"
//             opacity=".95"
//           />
//         ))}
//         <Ellipse
//           cx="160"
//           cy="192"
//           rx="57"
//           ry="32"
//           fill="#C08A57"
//           opacity=".22"
//         />
//         <Ellipse
//           cx="160"
//           cy="187"
//           rx="53"
//           ry="31"
//           fill="#FFFFFF"
//           stroke="#E7DED2"
//           strokeWidth="3"
//         />
//         <Ellipse
//           cx="160"
//           cy="187"
//           rx="43"
//           ry="23"
//           fill="#FFFCF8"
//           stroke="#F0E8DE"
//           strokeWidth="2"
//         />
//         <G transform="translate(55 190) rotate(8)">
//           <Rect
//             x="-5"
//             y="-1"
//             width="10"
//             height="34"
//             rx="5"
//             fill="#70B8E2"
//             stroke="#4D97C5"
//             strokeWidth="1.5"
//           />
//           <Rect
//             x="-6"
//             y="-23"
//             width="12"
//             height="22"
//             rx="4"
//             fill="#DCE8EC"
//             stroke="#9DADB5"
//             strokeWidth="1.5"
//           />
//           {[-5, -2, 1, 4].map((x) => (
//             <Path
//               key={x}
//               d={`M${x} -22 V-31`}
//               stroke="#9DADB5"
//               strokeWidth="2"
//               strokeLinecap="round"
//             />
//           ))}
//         </G>
//         <G transform="translate(255 190) rotate(-8)">
//           <Path
//             d="M-4 -29 Q-10 -13 -4 -1 H5 V-25 Q2 -35 -4 -29Z"
//             fill="#DCE8EC"
//             stroke="#9DADB5"
//             strokeWidth="1.5"
//           />
//           <Rect
//             x="-5"
//             y="-1"
//             width="10"
//             height="34"
//             rx="5"
//             fill="#70B8E2"
//             stroke="#4D97C5"
//             strokeWidth="1.5"
//           />
//         </G>
//         <G transform="translate(279 190) rotate(-12)">
//           <Ellipse
//             cy="-18"
//             rx="9"
//             ry="12"
//             fill="#DCE8EC"
//             stroke="#9DADB5"
//             strokeWidth="1.5"
//           />
//           <Rect
//             x="-5"
//             y="-7"
//             width="10"
//             height="40"
//             rx="5"
//             fill="#70B8E2"
//             stroke="#4D97C5"
//             strokeWidth="1.5"
//           />
//         </G>
//       </G>
//       <G transform="translate(18 107)">
//         <Path
//           d="M0 20 Q-5 2 6 0 Q15 12 0 20 M5 20 Q15 3 23 10 Q20 20 5 20"
//           fill="#67B768"
//         />
//         <Path
//           d="M-2 20 H24 L21 38 H2Z"
//           fill="#E8D2B0"
//           stroke="#C2A783"
//           strokeWidth="2"
//         />
//       </G>
//       <Path d="M0 96 H320" stroke="#C8915A" strokeWidth="5" />
//     </>
//   );
// }
// function SnackScene() {
//   return (
//     <>
//       <Sky id="snackSky" top="#9ADFF7" bottom="#FFF5F5" />
//       <Path
//         d="M0 142 L35 125 73 143 108 122 152 144 198 126 240 143 284 126 320 142 V240 H0Z"
//         fill="#C6EBF5"
//       />
//       <Path d="M0 185 H320 V240 H0Z" fill="#F6E4DA" />
//       {Array.from({ length: 6 }, (_, i) => (
//         <Path
//           key={i}
//           d={`M0 ${193 + i * 9} H320`}
//           stroke="#E7C7B9"
//           strokeWidth="1.5"
//         />
//       ))}
//       <Rect
//         x="18"
//         y="46"
//         width="284"
//         height="146"
//         fill="#FFF9F5"
//         stroke="#E8B4C3"
//         strokeWidth="4"
//       />
//       <Rect
//         x="30"
//         y="65"
//         width="260"
//         height="111"
//         fill="#B6E9F6"
//         stroke="#DFA6B9"
//         strokeWidth="2"
//       />
//       {Array.from({ length: 3 }, (_, c) =>
//         Array.from({ length: 3 }, (_, r) => (
//           <G key={`${c}-${r}`}>
//             <Rect
//               x={39 + c * 83}
//               y={76 + r * 29}
//               width="29"
//               height="18"
//               rx="3"
//               fill={["#F4C66E", "#90D1A3", "#F1A6BC"][(c + r) % 3]}
//             />
//             <Rect
//               x={72 + c * 83}
//               y={79 + r * 29}
//               width="25"
//               height="15"
//               rx="3"
//               fill={["#A5D8EF", "#F5D28D", "#B6DDAA"][(c + r) % 3]}
//             />
//           </G>
//         )),
//       )}
//       <Rect x="12" y="40" width="296" height="27" fill="#F5B0C5" />
//       {Array.from({ length: 12 }, (_, i) => (
//         <G key={i}>
//           <Rect
//             x={14 + i * 24}
//             y="40"
//             width="12"
//             height="29"
//             fill={i % 2 === 0 ? "#FFF8F2" : "#F3A0B9"}
//           />
//           <Path
//             d={`M${14 + i * 24} 66 Q${20 + i * 24} 78 ${26 + i * 24} 66`}
//             fill={i % 2 === 0 ? "#FFF8F2" : "#F3A0B9"}
//           />
//         </G>
//       ))}
//       <Rect
//         x="112"
//         y="19"
//         width="96"
//         height="25"
//         rx="6"
//         fill="#F05F84"
//         stroke="#FFF5F4"
//         strokeWidth="3"
//       />
//       <Rect x="123" y="24" width="74" height="14" rx="3" fill="#FFF6F7" />
//       <Path
//         d="M135 26 V36 M142 26 V36 M149 26 V36 M174 26 V36 M181 26 V36"
//         stroke="#F05F84"
//         strokeWidth="2"
//       />
//       <Rect
//         x="222"
//         y="69"
//         width="65"
//         height="105"
//         rx="4"
//         fill="#7CCDE5"
//         stroke="#4C9FC6"
//         strokeWidth="3"
//       />
//       <Path d="M254 70 V174" stroke="#E9FBFF" strokeWidth="3" />
//       {(
//         [
//           [229, 80, "#F6C96F"],
//           [259, 80, "#9DD6A8"],
//           [229, 112, "#EFA5B9"],
//           [259, 112, "#D6C7F1"],
//           [229, 144, "#B2D9EF"],
//           [259, 144, "#F4D18D"],
//         ] as [number, number, string][]
//       ).map(([x, y, c], i) => (
//         <Rect key={i} x={x} y={y} width="22" height="24" rx="3" fill={c} />
//       ))}
//       <Path d="M0 179 H320 V192 H0Z" fill="#E4A2B6" />
//       <Path
//         d="M30 171 H290 Q299 171 299 180 V222 H21 V180 Q21 171 30 171Z"
//         fill="#F37E9E"
//         stroke="#D95C7F"
//         strokeWidth="2"
//       />
//       <Path
//         d="M37 179 H283 L272 212 H48Z"
//         fill="#F4F2F6"
//         stroke="#D9B9C7"
//         strokeWidth="2"
//       />
//       <Path d="M47 187 H273 L269 195 H43Z" fill="#C8DCE4" />
//       <G transform="translate(15 178)">
//         <Rect width="25" height="43" rx="3" fill="#B98552" />
//         <Rect x="4" y="4" width="17" height="32" fill="#3F4548" />
//         <Path
//           d="M8 14 Q12 7 17 14 M8 22 Q12 27 17 22"
//           stroke="#FFF5E5"
//           strokeWidth="1.5"
//           fill="none"
//         />
//       </G>
//       <G transform="translate(300 181)">
//         <Path d="M0 34 V0" stroke="#A8754E" strokeWidth="3" />
//         <Path
//           d="M0 18 Q-18 1 -13 -7 Q2 -5 0 18 M0 15 Q7 -7 20 -2 Q18 12 0 15"
//           fill="#62B56A"
//         />
//         <Path d="M-9 34 H9 L7 51 H-7Z" fill="#C58C5A" />
//       </G>
//     </>
//   );
// }
// function DrinkScene() {
//   return (
//     <>
//       <Sky id="drinkSky" top="#56C1F2" bottom="#DDF7FF" />
//       <Circle cx="275" cy="29" r="16" fill="#FFE68A" />
//       <Cloud x={15} y={61} scale={1.0} />
//       <Cloud x={104} y={82} scale={0.8} />
//       <Cloud x={242} y={63} scale={1.0} />
//       <Path
//         d="M0 132 Q50 119 100 132 T200 130 T320 128 V178 H0Z"
//         fill="#67C6E9"
//       />
//       <Path d="M0 151 Q80 139 160 151 T320 146 V178 H0Z" fill="#39ADDC" />
//       <Path d="M0 164 Q80 156 160 164 T320 160 V179 H0Z" fill="#F8FEFF" />
//       <Path d="M0 178 H320 V240 H0Z" fill="#DDEFF4" />
//       {Array.from({ length: 8 }, (_, i) =>
//         Array.from({ length: 3 }, (_, j) => (
//           <Rect
//             key={`${i}-${j}`}
//             x={i * 40}
//             y={180 + j * 20}
//             width="40"
//             height="20"
//             fill={(i + j) % 2 === 0 ? "#FFFFFF" : "#8BCBF0"}
//           />
//         )),
//       )}
//       <Path
//         d="M0 0 H320 V22 Q300 47 280 22 Q260 47 240 22 Q220 47 200 22 Q180 47 160 22 Q140 47 120 22 Q100 47 80 22 Q60 47 40 22 Q20 47 0 22Z"
//         fill="#4CA7E1"
//       />
//       {Array.from({ length: 8 }, (_, i) => (
//         <Path
//           key={i}
//           d={`M${i * 40} 1 H${i * 40 + 20} V29 Q${i * 40 + 20} 39 ${i * 40 + 40} 29 V1Z`}
//           fill={i % 2 === 0 ? "#F7FCFF" : "#4CA7E1"}
//         />
//       ))}
//       <Path d="M0 0 H320 V8 H0Z" fill="#FFFFFF" opacity=".7" />
//       <Path
//         d="M220 23 Q252 43 282 25 T320 34"
//         stroke="#839BA8"
//         strokeWidth="2"
//         fill="none"
//       />
//       {[238, 267, 296, 317].map((x, i) => (
//         <G key={i}>
//           <Path
//             d={`M${x} ${27 + (i % 2) * 5} v8`}
//             stroke="#839BA8"
//             strokeWidth="2"
//           />
//           <Circle
//             cx={x}
//             cy={40 + (i % 2) * 5}
//             r="6"
//             fill="#FFF0A6"
//             stroke="#F2D278"
//             strokeWidth="1.5"
//           />
//         </G>
//       ))}
//       <G transform="translate(18 106)">
//         <Path
//           d="M0 35 Q-8 7 8 0 Q17 18 0 35 M3 35 Q16 8 28 17 Q24 31 3 35"
//           fill="#63B76B"
//         />
//         <Path
//           d="M-4 34 H28 L24 55 H1Z"
//           fill="#F0D7B8"
//           stroke="#C7A987"
//           strokeWidth="2"
//         />
//         <Path d="M0 40 H26" stroke="#FFFFFF" strokeWidth="3" />
//       </G>
//       <Path
//         d="M284 117 L290 78 L301 78 L307 117Z"
//         fill="#FFF8E8"
//         stroke="#D6C4A4"
//         strokeWidth="1.5"
//       />
//       <Path d="M288 96 H303 L301 104 H287Z" fill="#E77872" />
//       <Path d="M290 82 L295 68 L301 82Z" fill="#E77872" />
//       <Rect x="291" y="82" width="8" height="7" fill="#F3D7A7" />
//       <Path d="M255 126 Q281 115 320 124 V153 H248Z" fill="#A2D78D" />
//       <G transform="translate(280 135) rotate(8)">
//         <Path
//           d="M-19 0 H19 V42 H-19Z"
//           fill="#A9794D"
//           stroke="#E8C49B"
//           strokeWidth="2"
//         />
//         <Rect x="-15" y="4" width="30" height="33" rx="1" fill="#344A50" />
//         <Path
//           d="M-10 12 H9 M-10 18 H7 M-10 24 H3"
//           stroke="#FFF5E0"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//         />
//         <Path d="M-10 42 V48 M10 42 V48" stroke="#A9794D" strokeWidth="3" />
//       </G>
//       <Path
//         d="M0 208 Q42 191 84 208 T168 207 T252 206 T320 203 V240 H0Z"
//         fill="#FFFFFF"
//         opacity=".22"
//       />
//     </>
//   );
// }

// const SCENES: Record<FoodBackgroundKind, React.FC> = {
//   food: FoodTableScene,
//   fruit: FruitScene,
//   vegetable: VegetableScene,
//   meal: MealScene,
//   snack: SnackScene,
//   drink: DrinkScene,
// };
// const BORDER: Record<FoodBackgroundKind, string> = {
//   food: "#56B67C",
//   fruit: "#56B67C",
//   vegetable: "#56B67C",
//   meal: "#F7BA45",
//   snack: "#F4769B",
//   drink: "#4DADE8",
// };
// export default function FoodCategoryBackground({
//   category,
//   width = "100%",
//   height = "100%",
// }: Props & { category: FoodBackgroundKind }) {
//   const Scene = SCENES[category];
//   const border = BORDER[category];
//   return (
//     <Svg
//       width={width}
//       height={height}
//       viewBox="0 0 240 180"
//       preserveAspectRatio="none"
//       style={{ width: "100%", height: "100%" }}
//     >
//       <Rect width="320" height="240" rx="16" fill="#FFFFFF" />
//       <Scene />
//       <Rect
//         x="3"
//         y="3"
//         width="314"
//         height="234"
//         rx="14"
//         fill="none"
//         stroke={border}
//         strokeWidth="4"
//         opacity=".95"
//       />
//       <Rect
//         x="8"
//         y="8"
//         width="304"
//         height="224"
//         rx="10"
//         fill="none"
//         stroke="#FFFFFF"
//         strokeWidth="2"
//         opacity=".9"
//       />
//     </Svg>
//   );
// }

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

function FoodTableScene() {
  return (
    <>
      <Defs>
        {/* 더 환하고 화사한 크림 버터빛 벽면 그라데이션 */}
        <LinearGradient id="foodWall" x1="0" x2="0" y1="0" y2="1">
          <Stop offset="0" stopColor="#FFFCF4" />
          <Stop offset="1" stopColor="#FFEECE" />
        </LinearGradient>

        {/* 맑고 화사한 밝은 우드 식탁 그라데이션 */}
        <LinearGradient id="foodTable" x1="0" x2="0" y1="0" y2="1">
          <Stop offset="0" stopColor="#F5D0A1" />
          <Stop offset="1" stopColor="#DEAB72" />
        </LinearGradient>

        {/* 뽀얗고 환한 스노우 도자기 접시 */}
        <LinearGradient id="foodPlate" x1="0" x2="0" y1="0" y2="1">
          <Stop offset="0" stopColor="#FFFFFF" />
          <Stop offset="1" stopColor="#F5F3EC" />
        </LinearGradient>

        {/* 맑고 깨끗한 실버 커트러리 */}
        <LinearGradient id="foodMetal" x1="0" x2="1" y1="0" y2="0">
          <Stop offset="0" stopColor="#E2ECEF" />
          <Stop offset="0.35" stopColor="#FFFFFF" />
          <Stop offset="0.7" stopColor="#EEF4F6" />
          <Stop offset="1" stopColor="#C9D6DD" />
        </LinearGradient>

        {/* 맑고 청량한 투명 유리잔 */}
        <LinearGradient id="foodGlass" x1="0" x2="1" y1="0" y2="0">
          <Stop offset="0" stopColor="#E2F8FC" />
          <Stop offset="0.35" stopColor="#FFFFFF" />
          <Stop offset="0.7" stopColor="#D5F4FA" />
          <Stop offset="1" stopColor="#B3E9F2" />
        </LinearGradient>
      </Defs>

      {/* 화사한 실내 배경 */}
      <Rect fill="url(#foodWall)" height="240" width="320" />

      {/* 동화책 느낌의 은은한 햇살 빛무리 효과 (환한 느낌 극대화) */}
      <Circle cx="70" cy="45" r="60" fill="#FFFFFF" opacity=".6" />
      <Circle cx="260" cy="40" r="80" fill="#FFFBE6" opacity=".5" />

      {/* 식탁 영역 */}
      <Path d="M0 68 Q80 63 160 68 T320 68 V240 H0Z" fill="url(#foodTable)" />

      {/* 부드럽고 환한 식탁 나뭇결 */}
      <Path
        d="M0 95 Q82 90 160 95 T320 93"
        fill="none"
        opacity=".7"
        stroke="#F0C79A"
        strokeWidth="2"
      />
      <Path
        d="M0 165 Q85 160 170 165 T320 162"
        fill="none"
        opacity=".45"
        stroke="#CC9B6A"
        strokeWidth="2"
      />

      {/* 물컵 & 그림자 그룹 */}
      <G transform="translate(-45,-15)">
        <Ellipse
          cx="160"
          cy="116"
          fill="#B58D5F"
          opacity=".15"
          rx="22"
          ry="5"
        />

        <Path
          d="M145 74
            Q145 71 149 71
            H171
            Q175 71 175 74
            L172 112
            Q171 119 165 120
            H155
            Q149 119 148 112Z"
          fill="url(#foodGlass)"
          stroke="#A6E2EC"
          strokeWidth="1.8"
        />

        <Path
          d="M149 90 Q160 87 171 90 L169 108
            Q168 114 164 115 H156
            Q151 114 151 108Z"
          fill="#CBEFF7"
          opacity=".75"
        />

        <Path
          d="M151 77 L153 104"
          opacity=".95"
          stroke="#FFFFFF"
          strokeLinecap="round"
          strokeWidth="3"
        />
        <Path
          d="M169 78 L168 88"
          stroke="#FFFFFF"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <Ellipse
          cx="160"
          cy="74"
          fill="#FFFFFF"
          rx="11"
          ry="2.8"
          stroke="#A6E2EC"
          strokeWidth="1.5"
        />
      </G>

      {/* 접시 & 커트러리 그룹 */}
      <G transform="translate(0, -25)">
        <Ellipse
          cx="160"
          cy="182"
          fill="#9E7048"
          opacity=".15"
          rx="74"
          ry="44"
        />

        <Ellipse
          cx="160"
          cy="175"
          fill="url(#foodPlate)"
          rx="73"
          ry="43"
          stroke="#EAE4D9"
          strokeWidth="2"
        />

        <Ellipse
          cx="160"
          cy="172"
          fill="#FFFFFF"
          rx="58"
          ry="32"
          stroke="#F1ECE4"
          strokeWidth="2"
        />

        <Path
          d="M103 168 Q110 142 153 137"
          fill="none"
          opacity=".95"
          stroke="#FFFFFF"
          strokeLinecap="round"
          strokeWidth="3"
        />

        {/* 왼쪽 포크 */}
        <G transform="translate(60 169) rotate(-9)">
          <Rect
            fill="url(#foodMetal)"
            height="45"
            rx="4"
            stroke="#C9D6DD"
            strokeWidth="1.2"
            width="10"
            x="-5"
            y="-1"
          />
          <Path
            d="M-7 -22
              Q-7 -26 -4 -26
              V-11
              Q-2 -8 0 -11
              V-27
              Q3 -27 3 -23
              V-11
              Q5 -8 7 -11
              V-23
              Q7 -26 9 -24
              V-8
              Q9 -2 2 1
              L2 5 H-2 L-2 1
              Q-9 -2 -9 -8
              V-24
              Q-9 -26 -7 -22Z"
            fill="url(#foodMetal)"
            stroke="#C9D6DD"
            strokeLinejoin="round"
            strokeWidth="1.2"
          />
          <Path
            d="M-2 7 V38"
            opacity=".95"
            stroke="#FFFFFF"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
        </G>

        {/* 오른쪽 숟가락 */}
        <G transform="translate(260 169) rotate(9)">
          <Rect
            fill="url(#foodMetal)"
            height="44"
            rx="4"
            stroke="#C9D6DD"
            strokeWidth="1.2"
            width="10"
            x="-5"
            y="1"
          />
          <Ellipse
            cx="0"
            cy="-13"
            fill="url(#foodMetal)"
            rx="9"
            ry="13"
            stroke="#C9D6DD"
            strokeWidth="1.2"
          />
          <Ellipse
            cx="-2"
            cy="-15"
            fill="#FFFFFF"
            opacity=".8"
            rx="3.5"
            ry="7"
          />
          <Path
            d="M-2 6 V38"
            opacity=".95"
            stroke="#FFFFFF"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
        </G>
      </G>

      {/* 식탁 앞쪽 가장자리 입체감 */}
      <Path d="M0 224 Q80 219 160 224 T320 221 V240 H0Z" fill="#CCA071" />
      <Path
        d="M0 225 Q80 220 160 225 T320 222"
        fill="none"
        stroke="#FFE3C2"
        strokeWidth="2"
      />
    </>
  );
}

function FruitScene() {
  return (
    <>
      <Defs>
        {/* 아주 부드럽고 차분한 밀크 크림 벽면 */}
        <LinearGradient id="fruitWall" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFFDF9" />
          <Stop offset="1" stopColor="#F9F3EA" />
        </LinearGradient>

        {/* 채도를 뺀 은은한 연아이보리 우드 식탁 */}
        <LinearGradient id="fruitTable" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FAF1E6" />
          <Stop offset="1" stopColor="#EFE3D3" />
        </LinearGradient>

        {/*Soft 베이지 등나무 바구니 */}
        <LinearGradient id="fruitBasket" x1="0" y1="0" x2="0.8" y2="1">
          <Stop offset="0" stopColor="#EBDCC8" />
          <Stop offset="0.55" stopColor="#DBC6AC" />
          <Stop offset="1" stopColor="#C9B397" />
        </LinearGradient>

        {/* 연한 파스텔 피치 사과 */}
        <LinearGradient id="appleRed" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FFC2B8" />
          <Stop offset="1" stopColor="#F29E94" />
        </LinearGradient>

        {/* 연한 크림버터 배 */}
        <LinearGradient id="pearYellow" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FFF8D6" />
          <Stop offset="1" stopColor="#EFE0A3" />
        </LinearGradient>

        {/* 은은한 파스텔 올리브 배 */}
        <LinearGradient id="pearGreen" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#E2F0C8" />
          <Stop offset="1" stopColor="#B3D194" />
        </LinearGradient>
      </Defs>

      {/* 포근한 배경 */}
      <Rect width="320" height="240" fill="url(#fruitWall)" />

      {/* 은은한 햇살 (투명하게) */}
      <Circle cx="80" cy="40" r="70" fill="#FFFFFF" opacity=".45" />
      <Circle cx="250" cy="50" r="90" fill="#FFFDF5" opacity=".4" />

      {/* 경계선 및 식탁 */}
      <Path
        d="M0 100 Q80 94 160 100 T320 98 V240 H0Z"
        fill="url(#fruitTable)"
      />

      {/* 식탁 나뭇결 (매우 옅게) */}
      <Path
        d="M0 126 Q75 120 145 126 T320 124"
        fill="none"
        stroke="#E2D4C3"
        strokeWidth="1.5"
        opacity=".5"
      />
      <Path
        d="M0 211 Q80 205 160 211 T320 209"
        fill="none"
        stroke="#D8C8B5"
        strokeWidth="1.5"
        opacity=".35"
      />

      {/* 아주 연한 바구니 그림자 */}
      <Ellipse cx="160" cy="183" rx="90" ry="18" fill="#B39F8A" opacity=".12" />

      {/* 바구니 손잡이 */}
      <Path
        d="M91 154 C89 113 111 86 160 85 C209 86 231 113 229 154"
        fill="none"
        stroke="#D5BF9F"
        strokeWidth="10"
        strokeLinecap="round"
        opacity=".8"
      />
      <Path
        d="M93 151 C93 117 116 94 160 93 C204 94 227 117 227 151"
        fill="none"
        stroke="#FAF1E0"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* 과일 요소들 (채소/과일이 배경에 묻히지 않도록 투명도 및 파스텔톤 적용) */}
      <G opacity=".82">
        {/* 사과 */}
        <G transform="translate(-5,20)">
          <Path
            d="M111 137 C96 126 98 105 111 98 C120 93 129 99 135 104 C144 98 153 97 160 105 C172 119 163 139 151 147 C140 155 121 151 111 137Z"
            fill="url(#appleRed)"
            stroke="#E28B82"
            strokeWidth="1.2"
          />
          <Path
            d="M135 104 Q135 98 140 94"
            fill="none"
            stroke="#A89280"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <Path d="M139 98 Q147 89 155 94 Q149 102 139 98Z" fill="#A8CD8C" />
        </G>

        {/* 배 */}
        <G transform="translate(-15, 10)">
          <Path
            d="M177 105 C174 117 164 126 165 137 C166 151 179 158 193 153 C208 148 212 136 203 124 C196 115 192 108 193 99 Q186 105 177 105Z"
            fill="url(#pearYellow)"
            stroke="#D8CA8D"
            strokeWidth="1.2"
          />
          <Path
            d="M190 103 Q190 96 195 91"
            fill="none"
            stroke="#A89280"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <Path d="M194 97 Q204 90 210 96 Q204 104 194 97Z" fill="#A8CD8C" />
        </G>

        {/* 초록 배 */}
        <G transform="translate(-15,5)">
          <Path
            d="M218 121 C214 131 207 139 209 148 C212 161 227 166 240 158 C251 151 252 140 242 131 C236 125 233 117 235 111 Q228 119 218 121Z"
            fill="url(#pearGreen)"
            stroke="#9DC07A"
            strokeWidth="1.2"
          />
          <Path
            d="M234 115 Q234 109 239 105"
            fill="none"
            stroke="#A89280"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </G>
      </G>

      {/* 바구니 몸체 (부드러운 베이지/크림 톤) */}
      <Path
        d="M75 145 Q160 158 245 145 L226 194 Q222 204 211 207 Q160 218 109 207 Q98 204 94 194Z"
        fill="url(#fruitBasket)"
        stroke="#C2AB8E"
        strokeWidth="1.5"
      />

      {/* 세로/가로 결 (은은한 콘트라스트) */}
      <G fill="none" strokeLinecap="round" strokeWidth="4" opacity=".8">
        <Path d="M99 154 Q104 179 112 201" stroke="#F5E8D3" />
        <Path d="M121 157 Q125 183 128 208" stroke="#F5E8D3" />
        <Path d="M144 159 Q145 187 145 212" stroke="#F5E8D3" />
        <Path d="M166 159 Q166 187 166 212" stroke="#F5E8D3" />
        <Path d="M188 157 Q184 184 183 209" stroke="#F5E8D3" />
        <Path d="M210 153 Q204 181 200 203" stroke="#F5E8D3" />
        <Path d="M230 150 Q222 177 217 197" stroke="#F5E8D3" />
      </G>

      <Path
        d="M87 164 Q160 177 233 163 M92 179 Q160 192 228 178 M98 194 Q160 207 221 193"
        fill="none"
        stroke="#BCA68C"
        strokeWidth="3"
        opacity=".4"
      />

      {/* 바구니 윗단 */}
      <Path
        d="M76 144 Q160 158 244 144 L241 154 Q160 169 79 154Z"
        fill="#DFCAB1"
        stroke="#C0A98E"
        strokeWidth="1.5"
      />
    </>
  );
}

function VegetableScene() {
  return (
    <>
      <Defs>
        <LinearGradient id="vegWall" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFFDF9" />
          <Stop offset="1" stopColor="#F9F3EA" />
        </LinearGradient>

        <LinearGradient id="vegTable" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FAF1E6" />
          <Stop offset="1" stopColor="#EFE3D3" />
        </LinearGradient>

        <LinearGradient id="vegBasket" x1="0" y1="0" x2="0.8" y2="1">
          <Stop offset="0" stopColor="#EBDCC8" />
          <Stop offset="0.55" stopColor="#DBC6AC" />
          <Stop offset="1" stopColor="#C9B397" />
        </LinearGradient>

        <LinearGradient id="carrotOrange" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FFD3A3" />
          <Stop offset="1" stopColor="#F0A66C" />
        </LinearGradient>

        <LinearGradient id="cabbageGreen" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#E2F0CE" />
          <Stop offset="1" stopColor="#A2CD93" />
        </LinearGradient>

        <LinearGradient id="eggplantPurple" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#DBCDF5" />
          <Stop offset="1" stopColor="#A793CE" />
        </LinearGradient>

        <LinearGradient id="radishWhite" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FFFFFF" />
          <Stop offset="1" stopColor="#EFEADF" />
        </LinearGradient>
      </Defs>

      {/* 배경 */}
      <Rect width="320" height="240" fill="url(#vegWall)" />

      <Circle cx="80" cy="40" r="70" fill="#FFFFFF" opacity=".45" />
      <Circle cx="250" cy="50" r="90" fill="#FFFDF5" opacity=".4" />

      {/* 식탁 */}
      <Path d="M0 100 Q80 94 160 100 T320 98 V240 H0Z" fill="url(#vegTable)" />

      <Path
        d="M0 126 Q75 120 145 126 T320 124"
        fill="none"
        stroke="#E2D4C3"
        strokeWidth="1.5"
        opacity=".5"
      />
      <Path
        d="M0 211 Q80 205 160 211 T320 209"
        fill="none"
        stroke="#D8C8B5"
        strokeWidth="1.5"
        opacity=".35"
      />

      {/* 바구니 그림자 */}
      <Ellipse cx="160" cy="183" rx="90" ry="18" fill="#B39F8A" opacity=".12" />

      {/* 손잡이 */}
      <Path
        d="M91 154 C89 113 111 86 160 85 C209 86 231 113 229 154"
        fill="none"
        stroke="#D5BF9F"
        strokeWidth="10"
        strokeLinecap="round"
        opacity=".8"
      />
      <Path
        d="M93 151 C93 117 116 94 160 93 C204 94 227 117 227 151"
        fill="none"
        stroke="#FAF1E0"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* 채소 요소 (소프트 파스텔 투명도 적용) */}
      <G opacity=".82">
        {/* 양배추 */}
        <G transform="translate(0, 25)">
          <Path
            d="M103 126 C91 118 91 105 102 99 C110 88 126 94 132 104 C145 103 150 117 141 127 C134 139 113 140 103 126Z"
            fill="url(#cabbageGreen)"
            stroke="#91B881"
            strokeWidth="1.2"
          />
        </G>

        {/* 무 */}
        <G transform="translate(-15, 10)">
          <Path
            d="M155 111 C146 118 145 131 154 141 C160 149 169 148 174 139 C180 128 173 116 166 111Z"
            fill="url(#radishWhite)"
            stroke="#D3C7B5"
            strokeWidth="1.2"
          />
          <Path
            d="M160 113 Q156 104 152 99 M163 113 Q170 104 177 103 M161 111 Q160 101 163 96"
            fill="none"
            stroke="#8FBE84"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </G>

        {/* 가지 */}
        <G transform="translate(-20, 5) rotate(13 199 129)">
          <Path
            d="M184 118 C179 126 181 143 194 150 C206 157 220 146 220 134 C220 124 211 118 201 119 Q192 117 184 118Z"
            fill="url(#eggplantPurple)"
            stroke="#9E8CBF"
            strokeWidth="1.2"
          />
          <Path
            d="M184 119 Q177 112 180 105 L190 113 L198 108 L199 118"
            fill="#88B174"
            stroke="#739A60"
            strokeWidth="1"
          />
        </G>

        {/* 당근 */}
        <G transform="translate(5, 0) rotate(12 214 145)">
          <Path
            d="M195 119 Q209 122 222 130 L207 169 Q204 174 201 168 L191 131Z"
            fill="url(#carrotOrange)"
            stroke="#E0985F"
            strokeWidth="1.2"
          />
          <Path
            d="M201 124 Q195 111 200 104 Q206 112 204 125 M204 125 Q211 111 219 113 Q215 124 204 128"
            fill="#8FBE84"
            stroke="#72A167"
            strokeWidth="1"
          />
        </G>
      </G>

      {/* 바구니 몸체 */}
      <Path
        d="M75 145 Q160 158 245 145 L226 194 Q222 204 211 207 Q160 218 109 207 Q98 204 94 194Z"
        fill="url(#vegBasket)"
        stroke="#C2AB8E"
        strokeWidth="1.5"
      />

      {/* 세로/가로 엮임결 */}
      <G fill="none" strokeLinecap="round" strokeWidth="4" opacity=".8">
        <Path d="M99 154 Q104 179 112 201" stroke="#F5E8D3" />
        <Path d="M121 157 Q125 183 128 208" stroke="#F5E8D3" />
        <Path d="M144 159 Q145 187 145 212" stroke="#F5E8D3" />
        <Path d="M166 159 Q166 187 166 212" stroke="#F5E8D3" />
        <Path d="M188 157 Q184 184 183 209" stroke="#F5E8D3" />
        <Path d="M210 153 Q204 181 200 203" stroke="#F5E8D3" />
        <Path d="M230 150 Q222 177 217 197" stroke="#F5E8D3" />
      </G>

      <Path
        d="M87 164 Q160 177 233 163 M92 179 Q160 192 228 178 M98 194 Q160 207 221 193"
        fill="none"
        stroke="#BCA68C"
        strokeWidth="3"
        opacity=".4"
      />

      {/* 바구니 윗단 */}
      <Path
        d="M76 144 Q160 158 244 144 L241 154 Q160 169 79 154Z"
        fill="#DFCAB1"
        stroke="#C0A98E"
        strokeWidth="1.5"
      />
    </>
  );
}
function MealScene() {
  return (
    <>
      <Defs>
        {/* 더 환하고 화사한 크림 버터빛 벽면 그라데이션 */}
        <LinearGradient id="foodWall" x1="0" x2="0" y1="0" y2="1">
          <Stop offset="0" stopColor="#FFFCF4" />
          <Stop offset="1" stopColor="#FFEECE" />
        </LinearGradient>

        {/* 맑고 화사한 밝은 우드 식탁 그라데이션 */}
        <LinearGradient id="foodTable" x1="0" x2="0" y1="0" y2="1">
          <Stop offset="0" stopColor="#F5D0A1" />
          <Stop offset="1" stopColor="#DEAB72" />
        </LinearGradient>

        {/* 뽀얗고 환한 스노우 도자기 접시 */}
        <LinearGradient id="foodPlate" x1="0" x2="0" y1="0" y2="1">
          <Stop offset="0" stopColor="#FFFFFF" />
          <Stop offset="1" stopColor="#F5F3EC" />
        </LinearGradient>

        {/* 맑고 깨끗한 실버 커트러리 */}
        <LinearGradient id="foodMetal" x1="0" x2="1" y1="0" y2="0">
          <Stop offset="0" stopColor="#E2ECEF" />
          <Stop offset="0.35" stopColor="#FFFFFF" />
          <Stop offset="0.7" stopColor="#EEF4F6" />
          <Stop offset="1" stopColor="#C9D6DD" />
        </LinearGradient>

        {/* 맑고 청량한 투명 유리잔 */}
        <LinearGradient id="foodGlass" x1="0" x2="1" y1="0" y2="0">
          <Stop offset="0" stopColor="#E2F8FC" />
          <Stop offset="0.35" stopColor="#FFFFFF" />
          <Stop offset="0.7" stopColor="#D5F4FA" />
          <Stop offset="1" stopColor="#B3E9F2" />
        </LinearGradient>
      </Defs>

      {/* 화사한 실내 배경 */}
      <Rect fill="url(#foodWall)" height="240" width="320" />

      {/* 동화책 느낌의 은은한 햇살 빛무리 효과 (환한 느낌 극대화) */}
      <Circle cx="70" cy="45" r="60" fill="#FFFFFF" opacity=".6" />
      <Circle cx="260" cy="40" r="80" fill="#FFFBE6" opacity=".5" />

      {/* 식탁 영역 */}
      <Path d="M0 68 Q80 63 160 68 T320 68 V240 H0Z" fill="url(#foodTable)" />

      {/* 부드럽고 환한 식탁 나뭇결 */}
      <Path
        d="M0 95 Q82 90 160 95 T320 93"
        fill="none"
        opacity=".7"
        stroke="#F0C79A"
        strokeWidth="2"
      />
      <Path
        d="M0 165 Q85 160 170 165 T320 162"
        fill="none"
        opacity=".45"
        stroke="#CC9B6A"
        strokeWidth="2"
      />

      {/* 접시 & 커트러리 그룹 */}
      <G transform="translate(0, -25)">
        <Ellipse
          cx="160"
          cy="182"
          fill="#9E7048"
          opacity=".15"
          rx="74"
          ry="44"
        />

        <Ellipse
          cx="160"
          cy="175"
          fill="url(#foodPlate)"
          rx="73"
          ry="43"
          stroke="#EAE4D9"
          strokeWidth="2"
        />

        <Ellipse
          cx="160"
          cy="172"
          fill="#FFFFFF"
          rx="58"
          ry="32"
          stroke="#F1ECE4"
          strokeWidth="2"
        />

        <Path
          d="M103 168 Q110 142 153 137"
          fill="none"
          opacity=".95"
          stroke="#FFFFFF"
          strokeLinecap="round"
          strokeWidth="3"
        />

        {/* 왼쪽 포크 */}
        <G transform="translate(60 169) rotate(-9)">
          <Rect
            fill="url(#foodMetal)"
            height="45"
            rx="4"
            stroke="#C9D6DD"
            strokeWidth="1.2"
            width="10"
            x="-5"
            y="-1"
          />
          <Path
            d="M-7 -22
              Q-7 -26 -4 -26
              V-11
              Q-2 -8 0 -11
              V-27
              Q3 -27 3 -23
              V-11
              Q5 -8 7 -11
              V-23
              Q7 -26 9 -24
              V-8
              Q9 -2 2 1
              L2 5 H-2 L-2 1
              Q-9 -2 -9 -8
              V-24
              Q-9 -26 -7 -22Z"
            fill="url(#foodMetal)"
            stroke="#C9D6DD"
            strokeLinejoin="round"
            strokeWidth="1.2"
          />
          <Path
            d="M-2 7 V38"
            opacity=".95"
            stroke="#FFFFFF"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
        </G>

        {/* 오른쪽 숟가락 */}
        <G transform="translate(260 169) rotate(9)">
          <Rect
            fill="url(#foodMetal)"
            height="44"
            rx="4"
            stroke="#C9D6DD"
            strokeWidth="1.2"
            width="10"
            x="-5"
            y="1"
          />
          <Ellipse
            cx="0"
            cy="-13"
            fill="url(#foodMetal)"
            rx="9"
            ry="13"
            stroke="#C9D6DD"
            strokeWidth="1.2"
          />
          <Ellipse
            cx="-2"
            cy="-15"
            fill="#FFFFFF"
            opacity=".8"
            rx="3.5"
            ry="7"
          />
          <Path
            d="M-2 6 V38"
            opacity=".95"
            stroke="#FFFFFF"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
        </G>
      </G>

      {/* 식탁 앞쪽 가장자리 입체감 */}
      <Path d="M0 224 Q80 219 160 224 T320 221 V240 H0Z" fill="#CCA071" />
      <Path
        d="M0 225 Q80 220 160 225 T320 222"
        fill="none"
        stroke="#FFE3C2"
        strokeWidth="2"
      />
    </>
  );
}
// function DrinkScene() {
//   return (
//     <>
//       <Defs>
//         {/* 따뜻한 크림빛 벽면 */}
//         <LinearGradient id="drinkWall" x1="0" x2="0" y1="0" y2="1">
//           <Stop offset="0" stopColor="#FFFCF4" />
//           <Stop offset="1" stopColor="#FFEECE" />
//         </LinearGradient>

//         {/* 밝은 꿀빛 원목 식탁 */}
//         <LinearGradient id="drinkTable" x1="0" x2="0" y1="0" y2="1">
//           <Stop offset="0" stopColor="#F5D0A1" />
//           <Stop offset="1" stopColor="#DEAB72" />
//         </LinearGradient>

//         {/* 아이보리 도자기 찻잔 */}
//         <LinearGradient id="drinkCup" x1="0" x2="1" y1="0" y2="0">
//           <Stop offset="0" stopColor="#E9D9BD" />
//           <Stop offset="0.25" stopColor="#FFFFFF" />
//           <Stop offset="0.7" stopColor="#FFFDF7" />
//           <Stop offset="1" stopColor="#E7D4B6" />
//         </LinearGradient>

//         {/* 찻잔 안쪽의 따뜻한 차 */}
//         <LinearGradient id="drinkTea" x1="0" x2="0" y1="0" y2="1">
//           <Stop offset="0" stopColor="#DDA65F" />
//           <Stop offset="1" stopColor="#B97538" />
//         </LinearGradient>

//         {/* 도자기 받침 */}
//         <LinearGradient id="drinkSaucer" x1="0" x2="0" y1="0" y2="1">
//           <Stop offset="0" stopColor="#FFFFFF" />
//           <Stop offset="1" stopColor="#E8DCC8" />
//         </LinearGradient>
//       </Defs>

//       {/* 따뜻한 실내 벽면 */}
//       <Rect width="320" height="240" fill="url(#drinkWall)" />

//       {/* 은은한 햇살 */}
//       <Circle cx="65" cy="38" r="57" fill="#FFFFFF" opacity=".48" />
//       <Circle cx="265" cy="45" r="72" fill="#FFFBE8" opacity=".38" />

//       {/* 식탁 */}
//       <Path d="M0 68 Q80 63 160 68 T320 68 V240 H0Z" fill="url(#drinkTable)" />

//       {/* 부드러운 나뭇결 */}
//       <Path
//         d="M0 105 Q82 100 160 105 T320 103"
//         fill="none"
//         stroke="#F0C79A"
//         strokeWidth="2"
//         opacity=".65"
//       />
//       <Path
//         d="M0 207 Q80 202 160 207 T320 205"
//         fill="none"
//         stroke="#CC9B6A"
//         strokeWidth="1.8"
//         opacity=".35"
//       />

//       {/* 찻잔 아래 그림자 */}
//       <Ellipse cx="160" cy="177" rx="57" ry="11" fill="#98683F" opacity=".18" />

//       {/* 찻잔 손잡이: 컵 뒤쪽에 먼저 배치 */}
//       <Path
//         d="M193 116
//            C218 111 231 122 228 139
//            C226 154 212 161 193 153"
//         fill="none"
//         stroke="#D8C3A2"
//         strokeWidth="13"
//         strokeLinecap="round"
//       />
//       <Path
//         d="M195 120
//            C213 117 222 125 219 138
//            C217 148 208 153 195 149"
//         fill="none"
//         stroke="#FFF9ED"
//         strokeWidth="6"
//         strokeLinecap="round"
//       />

//       {/* 받침 접시 */}
//       <Ellipse cx="158" cy="166" rx="65" ry="15" fill="#B98B59" opacity=".16" />
//       <Ellipse
//         cx="158"
//         cy="162"
//         rx="64"
//         ry="15"
//         fill="url(#drinkSaucer)"
//         stroke="#D8C7AD"
//         strokeWidth="1.8"
//       />
//       <Ellipse
//         cx="158"
//         cy="160"
//         rx="47"
//         ry="8"
//         fill="#FFFDF8"
//         stroke="#EFE5D5"
//         strokeWidth="1.5"
//       />
//       <Path
//         d="M111 160 Q130 168 157 168"
//         fill="none"
//         stroke="#FFFFFF"
//         strokeWidth="2"
//         strokeLinecap="round"
//         opacity=".9"
//       />

//       {/* 찻잔 본체 */}
//       <Path
//         d="M111 112
//            Q158 120 198 112
//            L190 151
//            Q188 163 175 166
//            Q157 170 138 165
//            Q125 162 122 151Z"
//         fill="url(#drinkCup)"
//         stroke="#D8C5A7"
//         strokeWidth="1.8"
//       />

//       {/* 컵의 부드러운 빛 반사 */}
//       <Path
//         d="M124 122 Q128 143 135 153"
//         fill="none"
//         stroke="#FFFFFF"
//         strokeWidth="4"
//         strokeLinecap="round"
//         opacity=".9"
//       />
//       <Path
//         d="M184 123 Q182 139 178 148"
//         fill="none"
//         stroke="#E5D3B7"
//         strokeWidth="2"
//         strokeLinecap="round"
//         opacity=".8"
//       />

//       {/* 컵 윗면과 차 */}
//       <Ellipse
//         cx="155"
//         cy="113"
//         rx="44"
//         ry="10"
//         fill="#D9C4A4"
//         stroke="#CDB797"
//         strokeWidth="1.5"
//       />
//       <Ellipse cx="155" cy="112" rx="39" ry="7" fill="#FFFDF6" />
//       <Ellipse cx="155" cy="113" rx="34" ry="5.5" fill="url(#drinkTea)" />

//       {/* 차 표면의 은은한 빛 */}
//       <Path
//         d="M133 112 Q145 108 157 112"
//         fill="none"
//         stroke="#F6D49B"
//         strokeWidth="2"
//         strokeLinecap="round"
//         opacity=".85"
//       />

//       {/* 컵 앞면의 작은 장식: 따뜻한 꽃잎 문양 */}
//       <G transform="translate(157 141)">
//         <Ellipse cx="0" cy="-4" rx="3" ry="5" fill="#E9B8A1" />
//         <Ellipse
//           cx="-4"
//           cy="0"
//           rx="3"
//           ry="5"
//           fill="#E9B8A1"
//           transform="rotate(-45 -4 0)"
//         />
//         <Ellipse
//           cx="4"
//           cy="0"
//           rx="3"
//           ry="5"
//           fill="#E9B8A1"
//           transform="rotate(45 4 0)"
//         />
//         <Circle cx="0" cy="0" r="2" fill="#D7A85E" />
//       </G>

//       {/* 식탁 앞쪽 가장자리 */}
//       <Path d="M0 224 Q80 219 160 224 T320 221 V240 H0Z" fill="#CCA071" />
//       <Path
//         d="M0 225 Q80 220 160 225 T320 222"
//         fill="none"
//         stroke="#FFE3C2"
//         strokeWidth="2"
//       />
//     </>
//   );
// }
function DrinkScene() {
  return (
    <>
      <Defs>
        {/* 따뜻하고 은은한 크림빛 벽면 */}
        <LinearGradient id="drinkWall" x1="0" x2="0" y1="0" y2="1">
          <Stop offset="0" stopColor="#FFFCF4" />
          <Stop offset="1" stopColor="#FFEECE" />
        </LinearGradient>

        {/* 기존에 마음에 드셨던 밝은 꿀빛 원목 식탁 유지 */}
        <LinearGradient id="drinkTable" x1="0" x2="0" y1="0" y2="1">
          <Stop offset="0" stopColor="#F5D0A1" />
          <Stop offset="1" stopColor="#DEAB72" />
        </LinearGradient>

        {/* 채도를 쫙 빼서 배경처럼 부드러운 소프트 아이보리 찻잔 */}
        <LinearGradient id="drinkCup" x1="0" x2="1" y1="0" y2="0">
          <Stop offset="0" stopColor="#F4EDE0" />
          <Stop offset="0.3" stopColor="#FFFFFF" />
          <Stop offset="0.8" stopColor="#FCF9F3" />
          <Stop offset="1" stopColor="#EFE5D5" />
        </LinearGradient>

        {/* 채도가 낮고 편안한 연한 밀크티 차 */}
        <LinearGradient id="drinkTea" x1="0" x2="0" y1="0" y2="1">
          <Stop offset="0" stopColor="#EED9B9" />
          <Stop offset="1" stopColor="#D2B58A" />
        </LinearGradient>

        {/* 은은한 도자기 받침 */}
        <LinearGradient id="drinkSaucer" x1="0" x2="0" y1="0" y2="1">
          <Stop offset="0" stopColor="#FFFFFF" />
          <Stop offset="1" stopColor="#F2ECE1" />
        </LinearGradient>
      </Defs>

      {/* 따뜻한 실내 벽면 */}
      <Rect width="320" height="240" fill="url(#drinkWall)" />

      {/* 은은한 햇살 */}
      <Circle cx="65" cy="38" r="57" fill="#FFFFFF" opacity=".48" />
      <Circle cx="265" cy="45" r="72" fill="#FFFBE8" opacity=".38" />

      {/* 식탁 */}
      <Path d="M0 68 Q80 63 160 68 T320 68 V240 H0Z" fill="url(#drinkTable)" />

      {/* 부드러운 나뭇결 */}
      <Path
        d="M0 105 Q82 100 160 105 T320 103"
        fill="none"
        stroke="#F0C79A"
        strokeWidth="2"
        opacity=".65"
      />
      <Path
        d="M0 207 Q80 202 160 207 T320 205"
        fill="none"
        stroke="#CC9B6A"
        strokeWidth="1.8"
        opacity=".35"
      />

      {/* 찻잔 아래 그림자 (투명도 조절로 은은하게) */}
      <Ellipse cx="160" cy="177" rx="57" ry="11" fill="#98683F" opacity=".12" />

      {/* 찻잔 손잡이: 뒤쪽에 먼저 배치 (선을 연하게 수정) */}
      {/* <Path
        d="M193 116
            C218 111 231 122 228 139
            C226 154 212 161 193 153"
        fill="none"
        stroke="#E8DFD0"
        strokeWidth="12"
        strokeLinecap="round"
      /> */}
      <Path
        d="M195 120
            C213 117 222 125 219 138
            C217 148 208 153 195 149"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* 받침 접시 (배경에 녹아들도록 부드러운 라인) */}
      <Ellipse cx="158" cy="166" rx="65" ry="15" fill="#B98B59" opacity=".1" />
      <Ellipse
        cx="158"
        cy="162"
        rx="64"
        ry="15"
        fill="url(#drinkSaucer)"
        stroke="#EAE2D5"
        strokeWidth="1.5"
      />
      <Ellipse
        cx="158"
        cy="160"
        rx="47"
        ry="8"
        fill="#FFFEFA"
        stroke="#F5EFE6"
        strokeWidth="1.2"
      />
      <Path
        d="M111 160 Q130 168 157 168"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".8"
      />

      {/* 찻잔 본체 (콘트라스트를 낮춰 포근하게 안착) */}
      <Path
        d="M111 112
            Q158 120 198 112
            L190 151
            Q188 163 175 166
            Q157 170 138 165
            Q125 162 122 151Z"
        fill="url(#drinkCup)"
        stroke="#E2D6C5"
        strokeWidth="1.5"
      />

      {/* 컵의 부드러운 빛 반사 */}
      <Path
        d="M124 122 Q128 143 135 153"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity=".8"
      />
      <Path
        d="M184 123 Q182 139 178 148"
        fill="none"
        stroke="#F5EFE6"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity=".7"
      />

      {/* 컵 윗면과 차 */}
      <Ellipse
        cx="155"
        cy="113"
        rx="44"
        ry="10"
        fill="#EADFCF"
        stroke="#D9CEBD"
        strokeWidth="1.2"
      />
      <Ellipse cx="155" cy="112" rx="39" ry="7" fill="#FFFEFA" />
      <Ellipse cx="155" cy="113" rx="34" ry="5.5" fill="url(#drinkTea)" />

      {/* 차 표면의 은은한 빛 */}
      <Path
        d="M133 112 Q145 108 157 112"
        fill="none"
        stroke="#FBF0DF"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity=".75"
      />

      {/* 컵 앞면의 작은 장식: 아주 은은하고 연한 톤의 꽃잎 */}
      <G transform="translate(157 141)" opacity=".7">
        <Ellipse cx="0" cy="-4" rx="3" ry="5" fill="#F0D5C9" />
        <Ellipse
          cx="-4"
          cy="0"
          rx="3"
          ry="5"
          fill="#F0D5C9"
          transform="rotate(-45 -4 0)"
        />
        <Ellipse
          cx="4"
          cy="0"
          rx="3"
          ry="5"
          fill="#F0D5C9"
          transform="rotate(45 4 0)"
        />
        <Circle cx="0" cy="0" r="2" fill="#E6C89C" />
      </G>

      {/* 식탁 앞쪽 가장자리 */}
      <Path d="M0 224 Q80 219 160 224 T320 221 V240 H0Z" fill="#CCA071" />
      <Path
        d="M0 225 Q80 220 160 225 T320 222"
        fill="none"
        stroke="#FFE3C2"
        strokeWidth="2"
      />
    </>
  );
}

// function SnackScene() {
//   return (
//     <>
//       <Defs>
//         {/* 벽 */}
//         <LinearGradient id="snackWall" x1="0" y1="0" x2="0" y2="1">
//           <Stop offset="0" stopColor="#FFFDF9" />
//           <Stop offset="1" stopColor="#F9F3EA" />
//         </LinearGradient>

//         {/* 식탁 */}
//         <LinearGradient id="snackTable" x1="0" y1="0" x2="0" y2="1">
//           <Stop offset="0" stopColor="#FAF1E6" />
//           <Stop offset="1" stopColor="#EFE3D3" />
//         </LinearGradient>

//         {/* 바구니 */}
//         <LinearGradient id="snackBasket" x1="0" y1="0" x2="0.8" y2="1">
//           <Stop offset="0" stopColor="#EBDCC8" />
//           <Stop offset="0.55" stopColor="#DBC6AC" />
//           <Stop offset="1" stopColor="#C9B397" />
//         </LinearGradient>

//         {/* 쿠키 */}
//         <LinearGradient id="snackCookie" x1="0" y1="0" x2="1" y2="1">
//           <Stop offset="0" stopColor="#FFE2A8" />
//           <Stop offset="1" stopColor="#DCA45E" />
//         </LinearGradient>

//         {/* 도넛 */}
//         <LinearGradient id="snackDonut" x1="0" y1="0" x2="1" y2="1">
//           <Stop offset="0" stopColor="#F8C7D7" />
//           <Stop offset="1" stopColor="#E98EAE" />
//         </LinearGradient>

//         {/* 과자 포장지 */}
//         <LinearGradient id="snackWrapper" x1="0" y1="0" x2="0" y2="1">
//           <Stop offset="0" stopColor="#FFE8A6" />
//           <Stop offset="1" stopColor="#F6C96D" />
//         </LinearGradient>

//         {/* 아이스크림 */}
//         <LinearGradient id="snackIceCream" x1="0" y1="0" x2="1" y2="1">
//           <Stop offset="0" stopColor="#FFE7C9" />
//           <Stop offset="1" stopColor="#F3B5A8" />
//         </LinearGradient>
//       </Defs>

//       {/* 배경 */}
//       <Rect width="320" height="240" fill="url(#snackWall)" />
//       <Circle cx="80" cy="40" r="70" fill="#FFFFFF" opacity=".45" />
//       <Circle cx="250" cy="50" r="90" fill="#FFFDF5" opacity=".4" />

//       {/* 식탁 */}
//       <Path
//         d="M0 100 Q80 94 160 100 T320 98 V240 H0Z"
//         fill="url(#snackTable)"
//       />
//       <Path
//         d="M0 126 Q75 120 145 126 T320 124"
//         fill="none"
//         stroke="#E2D4C3"
//         strokeWidth="1.5"
//         opacity=".5"
//       />
//       <Path
//         d="M0 211 Q80 205 160 211 T320 209"
//         fill="none"
//         stroke="#D8C8B5"
//         strokeWidth="1.5"
//         opacity=".35"
//       />

//       {/* 바구니 그림자 */}
//       <Ellipse cx="160" cy="185" rx="91" ry="17" fill="#B39F8A" opacity=".15" />

//       {/* 바구니 손잡이 - 간식 뒤쪽 */}
//       <Path
//         d="M91 157 C89 113 111 86 160 85 C209 86 231 113 229 157"
//         fill="none"
//         stroke="#D5BF9F"
//         strokeWidth="10"
//         strokeLinecap="round"
//         opacity=".8"
//       />
//       <Path
//         d="M93 154 C93 117 116 94 160 93 C204 94 227 117 227 154"
//         fill="none"
//         stroke="#FAF1E0"
//         strokeWidth="3"
//         strokeLinecap="round"
//       />

//       {/* ================================================== */}
//       {/* 간식들: 바구니 안에 풍성하게 겹쳐 담기 */}
//       {/* ================================================== */}

//       {/* 왼쪽 뒤쪽 - 길쭉한 웨이퍼 과자 */}
//       <G transform="rotate(-15 104 130)">
//         <Rect
//           x="83"
//           y="104"
//           width="31"
//           height="53"
//           rx="5"
//           fill="#DDA66D"
//           stroke="#BF8955"
//           strokeWidth="1.2"
//         />
//         <Rect x="87" y="108" width="23" height="45" rx="3" fill="#F4D3A0" />
//         <Path
//           d="M89 114 L108 114 M89 121 L108 121 M89 128 L108 128 M89 135 L108 135 M89 142 L108 142"
//           stroke="#D7AB76"
//           strokeWidth="2"
//           strokeLinecap="round"
//         />
//         <Path
//           d="M91 109 L91 152 M99 109 L99 152 M106 109 L106 152"
//           stroke="#E7BE8A"
//           strokeWidth="1.2"
//           opacity=".8"
//         />
//       </G>

//       {/* 왼쪽 위 - 쿠키 */}
//       <G>
//         <Circle cx="119" cy="119" r="19" fill="#BD8B51" opacity=".2" />
//         <Circle
//           cx="116"
//           cy="115"
//           r="17"
//           fill="url(#snackCookie)"
//           stroke="#C89554"
//           strokeWidth="1.4"
//         />
//         <Circle cx="108" cy="109" r="2.5" fill="#8D5937" />
//         <Circle cx="120" cy="107" r="2.8" fill="#8D5937" />
//         <Circle cx="125" cy="117" r="2.5" fill="#8D5937" />
//         <Circle cx="113" cy="121" r="2.8" fill="#8D5937" />
//         <Circle cx="122" cy="126" r="2" fill="#8D5937" />
//         <Circle cx="106" cy="116" r="1.8" fill="#8D5937" />
//         <Path
//           d="M105 103 Q113 98 121 103"
//           fill="none"
//           stroke="#FFF0CC"
//           strokeWidth="2"
//           strokeLinecap="round"
//           opacity=".8"
//         />
//       </G>

//       {/* 가운데 뒤쪽 - 과자 봉지 */}
//       <G transform="rotate(7 158 125)">
//         <Path
//           d="M138 103 L179 103 L183 113 L180 148 L137 148 L134 113Z"
//           fill="url(#snackWrapper)"
//           stroke="#E1B45A"
//           strokeWidth="1.4"
//         />
//         <Path d="M138 103 L179 103 L181 111 L136 111Z" fill="#FFF0C5" />
//         <Path d="M137 141 L181 141 L180 148 L137 148Z" fill="#F1B956" />
//         <Path
//           d="M145 119 Q158 112 172 119 L169 132 Q158 138 147 132Z"
//           fill="#F5A46E"
//         />
//         <Circle cx="154" cy="123" r="2" fill="#FFF2D5" />
//         <Circle cx="162" cy="127" r="2" fill="#FFF2D5" />
//         <Path
//           d="M143 114 Q158 117 174 114"
//           fill="none"
//           stroke="#E8B34F"
//           strokeWidth="1.5"
//         />
//       </G>

//       {/* 오른쪽 뒤쪽 - 초콜릿 */}
//       <G transform="rotate(15 204 126)">
//         <Rect
//           x="185"
//           y="104"
//           width="37"
//           height="42"
//           rx="5"
//           fill="#B97759"
//           stroke="#96543D"
//           strokeWidth="1.3"
//         />
//         <Rect x="189" y="108" width="29" height="34" rx="3" fill="#7B4939" />
//         <Path
//           d="M189 119 H218 M189 130 H218 M199 108 V142 M209 108 V142"
//           stroke="#A96A50"
//           strokeWidth="1.6"
//         />
//         <Path
//           d="M192 111 L198 111"
//           stroke="#E4B19A"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//         />
//       </G>

//       {/* 오른쪽 위 - 도넛 */}
//       <G transform="rotate(13 216 112)">
//         <Ellipse
//           cx="215"
//           cy="117"
//           rx="20"
//           ry="17"
//           fill="#C98A6B"
//           opacity=".22"
//         />
//         <Path
//           d="M197 116
//              C194 106 202 97 213 97
//              C225 96 235 105 233 116
//              C232 127 222 134 211 132
//              C201 131 196 125 197 116Z"
//           fill="#C78B5A"
//           stroke="#B77849"
//           strokeWidth="1.2"
//         />
//         <Path
//           d="M199 112
//              C200 104 207 100 214 101
//              C222 100 229 106 229 114
//              C227 122 222 128 213 127
//              C205 127 200 122 199 112Z"
//           fill="url(#snackDonut)"
//           stroke="#E58DAB"
//           strokeWidth="1"
//         />
//         <Ellipse
//           cx="214"
//           cy="114"
//           rx="5.5"
//           ry="5"
//           fill="#C78B5A"
//           stroke="#B77849"
//           strokeWidth="1"
//         />
//         {/* 도넛 위의 알록달록 스프링클 */}
//         <Path
//           d="M207 105 l4 2 M218 105 l3 3 M224 113 l-4 2 M204 116 l3 2 M214 122 l4 -2"
//           stroke="#FFF6D8"
//           strokeWidth="2"
//           strokeLinecap="round"
//         />
//         <Path
//           d="M207 111 l3 -2 M221 119 l3 1"
//           stroke="#8EB7D2"
//           strokeWidth="2"
//           strokeLinecap="round"
//         />
//       </G>

//       {/* 가운데 왼쪽 - 작은 컵케이크 */}
//       <G>
//         {/* 크림 */}
//         <Path
//           d="M130 132
//              C123 128 126 121 132 120
//              C129 113 138 109 143 115
//              C148 110 157 116 155 122
//              C162 125 158 132 152 133Z"
//           fill="#FFF0D8"
//           stroke="#E9D0B4"
//           strokeWidth="1"
//         />
//         {/* 컵 */}
//         <Path
//           d="M131 131 L154 131 L150 151 Q143 156 136 151Z"
//           fill="#E9A8B8"
//           stroke="#D7879E"
//           strokeWidth="1.2"
//         />
//         <Path
//           d="M134 135 L152 135 M135 141 L151 141 M136 147 L150 147"
//           stroke="#F8D4DE"
//           strokeWidth="1.6"
//         />
//         <Circle cx="142" cy="122" r="2" fill="#F1A1B7" />
//       </G>

//       {/* 가운데 오른쪽 - 아이스크림 콘 */}
//       <G transform="rotate(9 181 132)">
//         {/* 콘 */}
//         <Path
//           d="M167 127 L194 127 L182 160 Q181 163 179 159Z"
//           fill="#E6B77A"
//           stroke="#C9995D"
//           strokeWidth="1.2"
//         />
//         <Path
//           d="M169 132 L190 132 M171 138 L188 138 M173 144 L186 144 M176 150 L184 150"
//           stroke="#C9985D"
//           strokeWidth="1.3"
//           opacity=".85"
//         />
//         <Path
//           d="M172 131 L185 147 M184 131 L175 151"
//           stroke="#C9985D"
//           strokeWidth="1.1"
//           opacity=".8"
//         />
//         {/* 아이스크림 */}
//         <Path
//           d="M165 128
//              C159 122 163 114 170 113
//              C168 104 178 100 184 106
//              C193 104 198 112 194 119
//              C200 125 193 131 187 131 L170 131Z"
//           fill="url(#snackIceCream)"
//           stroke="#E5A89B"
//           strokeWidth="1.2"
//         />
//         <Path
//           d="M170 116 Q175 112 180 116 M184 111 Q190 113 190 118"
//           fill="none"
//           stroke="#FFF3E6"
//           strokeWidth="2"
//           strokeLinecap="round"
//         />
//       </G>

//       {/* 앞쪽 왼쪽 - 사탕 */}
//       <G transform="rotate(-18 101 145)">
//         <Path
//           d="M89 139 L95 134 L95 156 L89 151Z"
//           fill="#ECA3B6"
//           stroke="#D887A0"
//           strokeWidth="1"
//         />
//         <Rect
//           x="94"
//           y="135"
//           width="18"
//           height="20"
//           rx="7"
//           fill="#F5C3D0"
//           stroke="#D887A0"
//           strokeWidth="1.2"
//         />
//         <Path
//           d="M111 139 L117 134 L117 151 L111 156Z"
//           fill="#ECA3B6"
//           stroke="#D887A0"
//           strokeWidth="1"
//         />
//         <Path
//           d="M98 140 Q103 137 107 141"
//           fill="none"
//           stroke="#FFF2F5"
//           strokeWidth="2"
//           strokeLinecap="round"
//         />
//       </G>

//       {/* 앞쪽 가운데 - 샌드 쿠키 */}
//       <G transform="rotate(-8 151 145)">
//         <Rect
//           x="132"
//           y="135"
//           width="39"
//           height="22"
//           rx="5"
//           fill="#D9A15F"
//           stroke="#B98042"
//           strokeWidth="1.2"
//         />
//         <Rect x="135" y="137" width="33" height="7" rx="3" fill="#FFE0A2" />
//         <Rect x="135" y="146" width="33" height="8" rx="3" fill="#F0C27F" />
//         <Path
//           d="M137 145 H166"
//           stroke="#B98042"
//           strokeWidth="1.5"
//           strokeDasharray="2 3"
//         />
//         <Circle cx="142" cy="141" r="1.5" fill="#8D5937" />
//         <Circle cx="160" cy="150" r="1.5" fill="#8D5937" />
//       </G>

//       {/* 앞쪽 오른쪽 - 크래커 */}
//       <G transform="rotate(9 205 148)">
//         <Rect
//           x="184"
//           y="136"
//           width="35"
//           height="22"
//           rx="4"
//           fill="#F1D49B"
//           stroke="#D0AD72"
//           strokeWidth="1.2"
//         />
//         <Path
//           d="M190 141 H213 M190 147 H213 M190 153 H213"
//           stroke="#D7B77F"
//           strokeWidth="1.3"
//           strokeLinecap="round"
//         />
//         <Circle cx="191" cy="140" r="1.2" fill="#C49B60" />
//         <Circle cx="211" cy="154" r="1.2" fill="#C49B60" />
//       </G>

//       {/* 바구니 몸체 */}
//       <Path
//         d="M75 145 Q160 158 245 145
//            L226 194
//            Q222 204 211 207
//            Q160 218 109 207
//            Q98 204 94 194Z"
//         fill="url(#snackBasket)"
//         stroke="#C2AB8E"
//         strokeWidth="1.5"
//       />

//       {/* 바구니의 세로 엮임결 */}
//       <G fill="none" strokeLinecap="round" strokeWidth="4" opacity=".8">
//         <Path d="M99 154 Q104 179 112 201" stroke="#F5E8D3" />
//         <Path d="M121 157 Q125 183 128 208" stroke="#F5E8D3" />
//         <Path d="M144 159 Q145 187 145 212" stroke="#F5E8D3" />
//         <Path d="M166 159 Q166 187 166 212" stroke="#F5E8D3" />
//         <Path d="M188 157 Q184 184 183 209" stroke="#F5E8D3" />
//         <Path d="M210 153 Q204 181 200 203" stroke="#F5E8D3" />
//         <Path d="M230 150 Q222 177 217 197" stroke="#F5E8D3" />
//       </G>

//       {/* 가로 엮임결 */}
//       <Path
//         d="M87 164 Q160 177 233 163
//            M92 179 Q160 192 228 178
//            M98 194 Q160 207 221 193"
//         fill="none"
//         stroke="#BCA68C"
//         strokeWidth="3"
//         opacity=".4"
//       />

//       {/* 바구니 윗단 */}
//       <Path
//         d="M76 144 Q160 158 244 144 L241 154 Q160 169 79 154Z"
//         fill="#DFCAB1"
//         stroke="#C0A98E"
//         strokeWidth="1.5"
//       />
//     </>
//   );
// }

function SnackScene() {
  return (
    <>
      <Defs>
        {/* 벽 */}
        <LinearGradient id="snackWall" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFFDF9" />
          <Stop offset="1" stopColor="#F9F3EA" />
        </LinearGradient>

        {/* 식탁 */}
        <LinearGradient id="snackTable" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FAF1E6" />
          <Stop offset="1" stopColor="#EFE3D3" />
        </LinearGradient>

        {/* 바구니 */}
        <LinearGradient id="snackBasket" x1="0" y1="0" x2="0.8" y2="1">
          <Stop offset="0" stopColor="#EBDCC8" />
          <Stop offset="0.55" stopColor="#DBC6AC" />
          <Stop offset="1" stopColor="#C9B397" />
        </LinearGradient>

        {/* 채도 낮춘 소프트 쿠키 */}
        <LinearGradient id="snackCookie" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#F5E4C3" />
          <Stop offset="1" stopColor="#D6B68C" />
        </LinearGradient>

        {/* 은은한 파스텔 핑크 도넛 */}
        <LinearGradient id="snackDonut" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FCE4EC" />
          <Stop offset="1" stopColor="#F2B8C8" />
        </LinearGradient>

        {/* 연한 크림버터 과자 포장지 */}
        <LinearGradient id="snackWrapper" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFF3D6" />
          <Stop offset="1" stopColor="#EAD89C" />
        </LinearGradient>

        {/* 부드러운 소프트 아이스크림 */}
        <LinearGradient id="snackIceCream" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FFF3E8" />
          <Stop offset="1" stopColor="#E6C2B8" />
        </LinearGradient>
      </Defs>

      {/* 배경 */}
      <Rect width="320" height="240" fill="url(#snackWall)" />
      <Circle cx="80" cy="40" r="70" fill="#FFFFFF" opacity=".45" />
      <Circle cx="250" cy="50" r="90" fill="#FFFDF5" opacity=".4" />

      {/* 식탁 */}
      <Path
        d="M0 100 Q80 94 160 100 T320 98 V240 H0Z"
        fill="url(#snackTable)"
      />
      <Path
        d="M0 126 Q75 120 145 126 T320 124"
        fill="none"
        stroke="#E2D4C3"
        strokeWidth="1.5"
        opacity=".5"
      />
      <Path
        d="M0 211 Q80 205 160 211 T320 209"
        fill="none"
        stroke="#D8C8B5"
        strokeWidth="1.5"
        opacity=".35"
      />

      {/* 바구니 그림자 */}
      <Ellipse cx="160" cy="185" rx="91" ry="17" fill="#B39F8A" opacity=".12" />

      {/* 바구니 손잡이 - 간식 뒤쪽 */}
      <Path
        d="M91 157 C89 113 111 86 160 85 C209 86 231 113 229 157"
        fill="none"
        stroke="#D5BF9F"
        strokeWidth="10"
        strokeLinecap="round"
        opacity=".8"
      />
      <Path
        d="M93 154 C93 117 116 94 160 93 C204 94 227 117 227 154"
        fill="none"
        stroke="#FAF1E0"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* ================================================== */}
      {/* 간식들: 투명도(.82)를 주어 배경처럼 은은하게 스며들도록 조정 */}
      {/* ================================================== */}
      <G opacity=".82">
        {/* 왼쪽 뒤쪽 - 길쭉한 웨이퍼 과자 */}
        <G transform="rotate(-15 104 130)">
          <Rect
            x="83"
            y="104"
            width="31"
            height="53"
            rx="5"
            fill="#EAD2B2"
            stroke="#CCA988"
            strokeWidth="1.2"
          />
          <Rect x="87" y="108" width="23" height="45" rx="3" fill="#F7E6CC" />
          <Path
            d="M89 114 L108 114 M89 121 L108 121 M89 128 L108 128 M89 135 L108 135 M89 142 L108 142"
            stroke="#E2CCA8"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </G>

        {/* 왼쪽 위 - 쿠키 */}
        <G>
          <Circle
            cx="116"
            cy="115"
            r="17"
            fill="url(#snackCookie)"
            stroke="#D6BD9B"
            strokeWidth="1.4"
          />
          <Circle cx="108" cy="109" r="2.5" fill="#A88768" />
          <Circle cx="120" cy="107" r="2.8" fill="#A88768" />
          <Circle cx="125" cy="117" r="2.5" fill="#A88768" />
          <Circle cx="113" cy="121" r="2.8" fill="#A88768" />
          <Circle cx="122" cy="126" r="2" fill="#A88768" />
          <Circle cx="106" cy="116" r="1.8" fill="#A88768" />
        </G>

        {/* 가운데 뒤쪽 - 과자 봉지 */}
        <G transform="rotate(7 158 125)">
          <Path
            d="M138 103 L179 103 L183 113 L180 148 L137 148 L134 113Z"
            fill="url(#snackWrapper)"
            stroke="#E4D1A0"
            strokeWidth="1.4"
          />
          <Path d="M138 103 L179 103 L181 111 L136 111Z" fill="#FFF8E4" />
          <Path d="M137 141 L181 141 L180 148 L137 148Z" fill="#E6CA87" />
          <Path
            d="M145 119 Q158 112 172 119 L169 132 Q158 138 147 132Z"
            fill="#F7C4A5"
          />
        </G>

        {/* 오른쪽 뒤쪽 - 초콜릿 */}
        <G transform="rotate(15 204 126)">
          <Rect
            x="185"
            y="104"
            width="37"
            height="42"
            rx="5"
            fill="#C79D89"
            stroke="#AA7A66"
            strokeWidth="1.3"
          />
          <Rect x="189" y="108" width="29" height="34" rx="3" fill="#9E7362" />
          <Path
            d="M189 119 H218 M189 130 H218 M199 108 V142 M209 108 V142"
            stroke="#B98E7B"
            strokeWidth="1.6"
          />
        </G>

        {/* 오른쪽 위 - 도넛 */}
        <G transform="rotate(13 216 112)">
          <Path
            d="M197 116
              C194 106 202 97 213 97
              C225 96 235 105 233 116
              C232 127 222 134 211 132
              C201 131 196 125 197 116Z"
            fill="#DCA992"
            stroke="#C49179"
            strokeWidth="1.2"
          />
          <Path
            d="M199 112
              C200 104 207 100 214 101
              C222 100 229 106 229 114
              C227 122 222 128 213 127
              C205 127 200 122 199 112Z"
            fill="url(#snackDonut)"
            stroke="#E8C5CE"
            strokeWidth="1"
          />
          <Ellipse
            cx="214"
            cy="114"
            rx="5.5"
            ry="5"
            fill="#DCA992"
            stroke="#C49179"
            strokeWidth="1"
          />
        </G>

        {/* 가운데 왼쪽 - 작은 컵케이크 */}
        <G>
          <Path
            d="M130 132
              C123 128 126 121 132 120
              C129 113 138 109 143 115
              C148 110 157 116 155 122
              C162 125 158 132 152 133Z"
            fill="#FFF5EC"
            stroke="#EAD9CB"
            strokeWidth="1"
          />
          <Path
            d="M131 131 L154 131 L150 151 Q143 156 136 151Z"
            fill="#F2C4CE"
            stroke="#E2A6B4"
            strokeWidth="1.2"
          />
        </G>

        {/* 가운데 오른쪽 - 아이스크림 콘 */}
        <G transform="rotate(9 181 132)">
          <Path
            d="M167 127 L194 127 L182 160 Q181 163 179 159Z"
            fill="#EAD0AE"
            stroke="#D0B28C"
            strokeWidth="1.2"
          />
          <Path
            d="M165 128
              C159 122 163 114 170 113
              C168 104 178 100 184 106
              C193 104 198 112 194 119
              C200 125 193 131 187 131 L170 131Z"
            fill="url(#snackIceCream)"
            stroke="#E0C6BC"
            strokeWidth="1.2"
          />
        </G>

        {/* 앞쪽 왼쪽 - 사탕 */}
        <G transform="rotate(-18 101 145)">
          <Rect
            x="94"
            y="135"
            width="18"
            height="20"
            rx="7"
            fill="#F9D6DF"
            stroke="#E2AAB7"
            strokeWidth="1.2"
          />
        </G>

        {/* 앞쪽 가운데 - 샌드 쿠키 */}
        <G transform="rotate(-8 151 145)">
          <Rect
            x="132"
            y="135"
            width="39"
            height="22"
            rx="5"
            fill="#E5C198"
            stroke="#CCA475"
            strokeWidth="1.2"
          />
          <Rect x="135" y="137" width="33" height="7" rx="3" fill="#F4E3C9" />
          <Rect x="135" y="146" width="33" height="8" rx="3" fill="#EAD2B0" />
        </G>

        {/* 앞쪽 오른쪽 - 크래커 */}
        <G transform="rotate(9 205 148)">
          <Rect
            x="184"
            y="136"
            width="35"
            height="22"
            rx="4"
            fill="#F4E2BF"
            stroke="#DEC59B"
            strokeWidth="1.2"
          />
        </G>
      </G>

      {/* 바구니 몸체 */}
      <Path
        d="M75 145 Q160 158 245 145
          L226 194
          Q222 204 211 207
          Q160 218 109 207
          Q98 204 94 194Z"
        fill="url(#snackBasket)"
        stroke="#C2AB8E"
        strokeWidth="1.5"
      />

      {/* 바구니의 세로 엮임결 */}
      <G fill="none" strokeLinecap="round" strokeWidth="4" opacity=".8">
        <Path d="M99 154 Q104 179 112 201" stroke="#F5E8D3" />
        <Path d="M121 157 Q125 183 128 208" stroke="#F5E8D3" />
        <Path d="M144 159 Q145 187 145 212" stroke="#F5E8D3" />
        <Path d="M166 159 Q166 187 166 212" stroke="#F5E8D3" />
        <Path d="M188 157 Q184 184 183 209" stroke="#F5E8D3" />
        <Path d="M210 153 Q204 181 200 203" stroke="#F5E8D3" />
        <Path d="M230 150 Q222 177 217 197" stroke="#F5E8D3" />
      </G>

      {/* 가로 엮임결 */}
      <Path
        d="M87 164 Q160 177 233 163
          M92 179 Q160 192 228 178
          M98 194 Q160 207 221 193"
        fill="none"
        stroke="#BCA68C"
        strokeWidth="3"
        opacity=".4"
      />

      {/* 바구니 윗단 */}
      <Path
        d="M76 144 Q160 158 244 144 L241 154 Q160 169 79 154Z"
        fill="#DFCAB1"
        stroke="#C0A98E"
        strokeWidth="1.5"
      />
    </>
  );
}

const SCENES: Record<FoodBackgroundKind, React.FC> = {
  food: FoodTableScene,
  fruit: FruitScene, // 남은 Scene 파일들도 필요시 추가/매칭
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

// 🌟 Animal과 완전 동일한 240x180 규격 스케일 적용
export default function FoodCategoryBackground({
  category,
  width = "100%",
  height = "100%",
}: Props & { category: FoodBackgroundKind }) {
  const Scene = SCENES[category] || FoodTableScene;
  const border = BORDER[category] || "#56B67C";

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 240 180"
      preserveAspectRatio="none"
      style={{ width: "100%", height: "100%" }}
    >
      {/* 240x180 바깥 배경과 테두리 */}
      <Rect width="240" height="180" rx="12" fill="#FFFFFF" />

      {/* 320x240으로 제작되었던 Scene들을 240x180 (scale 0.75)에 딱 맞춰 감싸기 */}
      <G transform="scale(0.75)">
        <Scene />
      </G>
    </Svg>
  );
}

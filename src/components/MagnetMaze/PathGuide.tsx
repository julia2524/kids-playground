// import React from "react";
// import { StyleSheet, View } from "react-native";
// import Svg, { Circle, G, Line, Path, Polygon } from "react-native-svg";

// import type { GeneratedRound } from "../../games/magnetMaze/levels/levelTypes";
// import { toBoardPoint } from "../../games/magnetMaze/levels/levelGenerator";
// import { goalRadiusFor } from "../../games/magnetMaze/game/arrival";

// type Props = {
//   round: GeneratedRound;
//   width: number;
//   height: number;
//   corridorWidth?: number;
//   ballRadius?: number;
// };

// function starPoints(cx: number, cy: number, outer: number, inner: number) {
//   const points: string[] = [];

//   for (let i = 0; i < 10; i++) {
//     const angle = (Math.PI * i) / 5 - Math.PI / 2;
//     const radius = i % 2 === 0 ? outer : inner;

//     points.push(
//       `${cx + Math.cos(angle) * radius},${cy + Math.sin(angle) * radius}`,
//     );
//   }

//   return points.join(" ");
// }

// /** 이전 버전의 도착 깃발 디자인 */
// function GoalFlag({ x, y, size }: { x: number; y: number; size: number }) {
//   const poleHeight = size * 1.65;
//   const flagWidth = size * 1.35;
//   const flagHeight = size * 0.85;

//   const poleTop = y - poleHeight;

//   return (
//     <G transform="translate(0,-10)">
//       {/* 깃대 그림자 */}
//       <Line
//         x1={x + 1.5}
//         y1={poleTop + 2}
//         x2={x + 1.5}
//         y2={y + 1}
//         stroke="#B9A8E8"
//         strokeWidth={size * 0.15}
//         strokeLinecap="round"
//       />

//       {/* 깃대 */}
//       <Line
//         x1={x}
//         y1={poleTop}
//         x2={x}
//         y2={y}
//         stroke="#7652D8"
//         strokeWidth={size * 0.14}
//         strokeLinecap="round"
//       />

//       {/* 깃대 꼭대기 */}
//       <Circle cx={x} cy={poleTop} r={size * 0.13} fill="#FFE600" />

//       {/* 노란 별 깃발 */}
//       <Path
//         d={`
//           M ${x} ${poleTop + size * 0.08}
//           L ${x + flagWidth} ${poleTop + size * 0.18}
//           L ${x + flagWidth * 0.78} ${poleTop + flagHeight}
//           L ${x} ${poleTop + flagHeight * 0.78}
//           Z
//         `}
//         fill="#FFE600"
//         stroke="#FFB800"
//         strokeWidth={size * 0.055}
//         strokeLinejoin="round"
//       />

//       {/* 깃발 속 작은 별 */}
//       <Polygon
//         points={starPoints(
//           x + flagWidth * 0.49,
//           poleTop + flagHeight * 0.48,
//           size * 0.22,
//           size * 0.1,
//         )}
//         fill="#FFFFFF"
//       />
//     </G>
//   );
// }

// export function PathGuide({ round, width, height, corridorWidth }: Props) {
//   const goal = toBoardPoint(round.goalPosition, width, height);

//   const G = goalRadiusFor(corridorWidth);

//   const starRadius = Math.max(12, Math.min(34, G * 1.0));

//   const flagSize = Math.max(10, Math.min(17, G * 0.48));
//   // const starRadius = Math.max(12, Math.min(27, G * 0.9));

//   // const flagSize = Math.max(10, Math.min(15, G * 0.42));

//   return (
//     <View pointerEvents="none" style={StyleSheet.absoluteFill}>
//       <Svg width={width} height={height}>
//         {/* 화사한 형광 노란색 도착 별 (연두빛 제거) */}
//         <Polygon
//           points={starPoints(goal.x, goal.y, starRadius, starRadius * 0.52)}
//           fill="#FFFFFF"
//           stroke="#FFD200"
//           strokeWidth={2.5}
//           strokeLinejoin="round"
//         />

//         {/* 별의 밝은 하이라이트 */}
//         <Polygon
//           points={starPoints(
//             goal.x,
//             goal.y,
//             starRadius * 0.72,
//             starRadius * 0.52 * 0.72,
//           )}
//           fill="#FFFF85"
//           opacity={0.8}
//         />

//         {/* 이전 디자인의 깃발을 중앙에 배치 */}
//         <GoalFlag x={goal.x} y={goal.y + flagSize * 0.45} size={flagSize} />
//       </Svg>
//     </View>
//   );
// }

import React from "react";

import { StyleSheet, View } from "react-native";

import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  Polygon,
  RadialGradient,
  Stop,
} from "react-native-svg";

import type { GeneratedRound } from "../../games/magnetMaze/levels/levelTypes";

import { toBoardPoint } from "../../games/magnetMaze/levels/levelGenerator";

import { goalRadiusFor } from "../../games/magnetMaze/game/arrival";

type Props = {
  round: GeneratedRound;
  width: number;
  height: number;
  corridorWidth?: number;
  ballRadius?: number;
};

function starPoints(cx: number, cy: number, outer: number, inner: number) {
  const points: string[] = [];

  for (let i = 0; i < 10; i++) {
    const angle = (Math.PI * i) / 5 - Math.PI / 2;
    const radius = i % 2 === 0 ? outer : inner;

    points.push(
      `${cx + Math.cos(angle) * radius},${cy + Math.sin(angle) * radius}`,
    );
  }

  return points.join(" ");
}

/**
 * 우주 도착지 표시물.
 *
 * - 노란색 발광 별을 중심으로 구성
 * - 보라색과 시안색의 은은한 우주 광채
 * - 깃발은 별 중앙에 작게 배치
 * - 검은색 외곽선 및 별도 점선 테두리 없음
 * - 물리 좌표 및 도착 판정은 변경하지 않음
 */

function GoalMarker({
  x,
  y,
  starRadius,
}: {
  x: number;
  y: number;
  starRadius: number;
}) {
  const poleHeight = starRadius * 0.85;
  const flagWidth = starRadius * 0.75;
  const flagHeight = starRadius * 0.48;

  const poleTop = y - poleHeight * 0.48;
  const poleBottom = y + poleHeight * 0.48;

  return (
    <G>
      {/* 별 뒤의 은은한 우주 광채 */}
      <Circle
        cx={x}
        cy={y}
        r={starRadius * 1.5}
        fill="#A78BFA"
        opacity={0.12}
      />

      <Circle
        cx={x}
        cy={y}
        r={starRadius * 1.2}
        fill="#FDE68A"
        opacity={0.13}
      />

      {/* 별의 부드러운 발광 */}
      <Circle cx={x} cy={y} r={starRadius * 0.95} fill="url(#goalGlow)" />

      {/* 메인 별 */}
      <Polygon
        points={starPoints(x, y, starRadius, starRadius * 0.49)}
        fill="url(#goalStarGrad)"
        stroke="#FFF0A6"
        strokeWidth={1}
        strokeLinejoin="round"
      />

      {/* 별 표면의 빛 */}
      <Polygon
        points={starPoints(x, y, starRadius * 0.7, starRadius * 0.49 * 0.7)}
        fill="#FFFFB8"
        opacity={0.3}
      />

      {/* 중앙 깃대 */}
      <G transform="translate(0,-10)">
        <Path
          d={`M ${x} ${poleTop} L ${x} ${poleBottom}`}
          stroke="#6542B9"
          strokeWidth={starRadius * 0.075}
          strokeLinecap="round"
        />

        {/* 깃대의 시안색 반사광 */}
        <Path
          d={`M ${x - starRadius * 0.025} ${poleTop + 2}
            L ${x - starRadius * 0.025} ${poleBottom - 2}`}
          stroke="#A5F3FC"
          strokeWidth={starRadius * 0.025}
          strokeLinecap="round"
          opacity={0.8}
        />

        {/* 중앙의 작은 우주 깃발 */}
        <Path
          d={`
          M ${x + starRadius * 0.025} ${y - flagHeight * 0.48}
          Q ${x + flagWidth * 0.5} ${y - flagHeight * 0.62}
            ${x + flagWidth * 0.88} ${y - flagHeight * 0.35}
          L ${x + flagWidth * 0.7} ${y + flagHeight * 0.1}
          Q ${x + flagWidth * 0.38} ${y + flagHeight * 0.28}
            ${x + starRadius * 0.025} ${y + flagHeight * 0.15}
          Z
        `}
          fill="url(#goalFlagGrad)"
          stroke="#A78BFA"
          strokeWidth={0.55}
          strokeLinejoin="round"
        />

        {/* 깃발의 작은 별빛 장식 */}
        {/* <Circle
          cx={x + flagWidth * 0.38}
          cy={y - flagHeight * 0.12}
          r={starRadius * 0.07}
          fill="#FFF4B0"
        /> */}
      </G>

      {/* 상단 반짝임 */}
      <Ellipse
        cx={x - starRadius * 0.3}
        cy={y - starRadius * 0.35}
        rx={starRadius * 0.13}
        ry={starRadius * 0.07}
        fill="#FFFFFF"
        opacity={0.8}
        transform={`rotate(-35 ${x - starRadius * 0.3} ${y - starRadius * 0.35})`}
      />
    </G>
  );
}

export function PathGuide({ round, width, height, corridorWidth }: Props) {
  const goal = toBoardPoint(round.goalPosition, width, height);

  const G = goalRadiusFor(corridorWidth);

  const starRadius = Math.max(12, Math.min(34, G * 0.95));

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Svg width={width} height={height}>
        <Defs>
          {/* 노란색 별의 입체적인 빛 */}
          <RadialGradient id="goalStarGrad" cx="32%" cy="22%" rx="75%" ry="75%">
            <Stop offset="0" stopColor="#FFFFD6" />
            <Stop offset="0.3" stopColor="#FFFF80" />
            <Stop offset="0.68" stopColor="#FFE342" />
            <Stop offset="1" stopColor="#FFB800" />
          </RadialGradient>

          {/* 별 주변의 빛 */}
          <RadialGradient id="goalGlow" cx="50%" cy="50%" rx="50%" ry="50%">
            <Stop offset="0" stopColor="#FFF7AE" stopOpacity={0.5} />
            <Stop offset="0.55" stopColor="#FDE68A" stopOpacity={0.18} />
            <Stop offset="1" stopColor="#FDE68A" stopOpacity={0} />
          </RadialGradient>

          {/* 보라색 우주 깃발 */}
          <LinearGradient id="goalFlagGrad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#C4B5FD" />
            <Stop offset="0.5" stopColor="#9065E8" />
            <Stop offset="1" stopColor="#6741B8" />
          </LinearGradient>
        </Defs>

        <GoalMarker x={goal.x} y={goal.y} starRadius={starRadius} />
      </Svg>
    </View>
  );
}

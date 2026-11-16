// import { StyleSheet, View } from "react-native";
// import Svg, { Circle, Polygon } from "react-native-svg";
// import type { GeneratedRound } from "../../games/magnetMaze/levels/levelTypes";
// import { toBoardPoint } from "../../games/magnetMaze/levels/levelGenerator";
// import { GAME_CONFIG } from "../../constants/magnetMaze/gameConfig";
// import { goalRadiusFor } from "../../games/magnetMaze/game/arrival";

// type Props = {
//   round: GeneratedRound;
//   width: number;
//   height: number;
//   /** 통로 폭(px). 있으면 출발/도착 표시를 통로 안에 들어가도록 줄인다 */
//   corridorWidth?: number;
//   /** 쇠구슬 반지름(px). 출발 표시 크기 기준 */
//   ballRadius?: number;
// };

// /** 별 모양 꼭짓점 */
// function starPoints(cx: number, cy: number, outer: number, inner: number) {
//   const pts: string[] = [];
//   for (let i = 0; i < 10; i++) {
//     const r = i % 2 === 0 ? outer : inner;
//     const ang = ((-90 + i * 36) * Math.PI) / 180;
//     pts.push(`${cx + Math.cos(ang) * r},${cy + Math.sin(ang) * r}`);
//   }
//   return pts.join(" ");
// }

// /**
//  * 시작점 + 목적지 표시.
//  * 기존 점선 경로는 최종 게임 화면에서 제거 (벽이 통로를 보여 주므로 불필요).
//  */
// export function PathGuide({
//   round,
//   width,
//   height,
//   corridorWidth,
//   ballRadius,
// }: Props) {
//   const start = toBoardPoint(round.startPosition, width, height);
//   const goal = toBoardPoint(round.goalPosition, width, height);
//   // 도착 판정 반지름과 같은 값. 통로 끝(반원) 안에 들어가도록 제한됨
//   const G = goalRadiusFor(corridorWidth);
//   const fit = corridorWidth ? corridorWidth / 2 - 3 : Infinity;
//   const startR = Math.min((ballRadius ?? GAME_CONFIG.BALL_RADIUS) + 8, fit);

//   return (
//     <View pointerEvents="none" style={StyleSheet.absoluteFill}>
//       <Svg width={width} height={height}>
//         {/* 시작점 — 입구가 명확히 보이도록 */}
//         <Circle
//           cx={start.x}
//           cy={start.y}
//           r={startR}
//           fill="#C8F0C8"
//           opacity={0.85}
//         />
//         <Circle
//           cx={start.x}
//           cy={start.y}
//           r={startR}
//           fill="none"
//           stroke="#43A047"
//           strokeWidth={3}
//           strokeDasharray="6 6"
//         />
//         {/* 목적지 */}
//         <Circle cx={goal.x} cy={goal.y} r={G} fill="#FFE08A" opacity={0.85} />
//         <Circle
//           cx={goal.x}
//           cy={goal.y}
//           r={G}
//           fill="none"
//           stroke="#F59E0B"
//           strokeWidth={3}
//           strokeDasharray="8 6"
//         />
//         <Polygon
//           points={starPoints(goal.x, goal.y, G * 0.55, G * 0.25)}
//           fill="#F59E0B"
//         />
//       </Svg>
//     </View>
//   );
// }
import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Circle, G, Line, Path, Polygon } from "react-native-svg";

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

/** 이전 버전의 도착 깃발 디자인 */
function GoalFlag({ x, y, size }: { x: number; y: number; size: number }) {
  const poleHeight = size * 1.65;
  const flagWidth = size * 1.35;
  const flagHeight = size * 0.85;

  const poleTop = y - poleHeight;

  return (
    <G transform="translate(0,-10)">
      {/* 깃대 그림자 */}
      <Line
        x1={x + 1.5}
        y1={poleTop + 2}
        x2={x + 1.5}
        y2={y + 1}
        stroke="#B9A8E8"
        strokeWidth={size * 0.15}
        strokeLinecap="round"
      />

      {/* 깃대 */}
      <Line
        x1={x}
        y1={poleTop}
        x2={x}
        y2={y}
        stroke="#7652D8"
        strokeWidth={size * 0.14}
        strokeLinecap="round"
      />

      {/* 깃대 꼭대기 */}
      <Circle cx={x} cy={poleTop} r={size * 0.13} fill="#FFE600" />

      {/* 노란 별 깃발 */}
      <Path
        d={`
          M ${x} ${poleTop + size * 0.08}
          L ${x + flagWidth} ${poleTop + size * 0.18}
          L ${x + flagWidth * 0.78} ${poleTop + flagHeight}
          L ${x} ${poleTop + flagHeight * 0.78}
          Z
        `}
        fill="#FFE600"
        stroke="#FFB800"
        strokeWidth={size * 0.055}
        strokeLinejoin="round"
      />

      {/* 깃발 속 작은 별 */}
      <Polygon
        points={starPoints(
          x + flagWidth * 0.49,
          poleTop + flagHeight * 0.48,
          size * 0.22,
          size * 0.1,
        )}
        fill="#FFFFFF"
      />
    </G>
  );
}

export function PathGuide({ round, width, height, corridorWidth }: Props) {
  const goal = toBoardPoint(round.goalPosition, width, height);

  const G = goalRadiusFor(corridorWidth);

  const starRadius = Math.max(12, Math.min(34, G * 1.0));

  const flagSize = Math.max(10, Math.min(17, G * 0.48));
  // const starRadius = Math.max(12, Math.min(27, G * 0.9));

  // const flagSize = Math.max(10, Math.min(15, G * 0.42));

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Svg width={width} height={height}>
        {/* 화사한 형광 노란색 도착 별 (연두빛 제거) */}
        <Polygon
          points={starPoints(goal.x, goal.y, starRadius, starRadius * 0.52)}
          fill="#FFFFFF"
          stroke="#FFD200"
          strokeWidth={2.5}
          strokeLinejoin="round"
        />

        {/* 별의 밝은 하이라이트 */}
        <Polygon
          points={starPoints(
            goal.x,
            goal.y,
            starRadius * 0.72,
            starRadius * 0.52 * 0.72,
          )}
          fill="#FFFF85"
          opacity={0.8}
        />

        {/* 이전 디자인의 깃발을 중앙에 배치 */}
        <GoalFlag x={goal.x} y={goal.y + flagSize * 0.45} size={flagSize} />
      </Svg>
    </View>
  );
}

//별 + 가운데 깃발

// import React from "react";
// import { StyleSheet, View } from "react-native";
// import Svg, { Circle, Line, Path, Polygon } from "react-native-svg";

// import type { GeneratedRound } from "../../games/magnetMaze/levels/levelTypes";
// import { toBoardPoint } from "../../games/magnetMaze/levels/levelGenerator";
// import { GAME_CONFIG } from "../../constants/magnetMaze/gameConfig";
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

// /** 중앙 도착 깃발 */
// function GoalFlag({ x, y, size }: { x: number; y: number; size: number }) {
//   const poleHeight = size * 1.45;
//   const flagWidth = size * 1.15;
//   const flagHeight = size * 0.72;

//   const poleTop = y - poleHeight;

//   return (
//     <>
//       {/* 깃대 */}
//       <Line
//         x1={x}
//         y1={poleTop}
//         x2={x}
//         y2={y + size * 0.65}
//         stroke="#7652D8"
//         strokeWidth={size * 0.13}
//         strokeLinecap="round"
//       />

//       {/* 깃대 꼭대기 */}
//       <Circle cx={x} cy={poleTop} r={size * 0.12} fill="#FFD95A" />

//       {/* 별 깃발 */}
//       <Path
//         d={`
//           M ${x} ${poleTop + size * 0.08}
//           L ${x + flagWidth} ${poleTop + size * 0.15}
//           L ${x + flagWidth * 0.78} ${poleTop + flagHeight}
//           L ${x} ${poleTop + flagHeight * 0.78}
//           Z
//         `}
//         fill="#FFD95A"
//         stroke="#E8AD32"
//         strokeWidth={size * 0.05}
//         strokeLinejoin="round"
//       />

//       {/* 깃발 속 별 */}
//       <Polygon
//         points={starPoints(
//           x + flagWidth * 0.48,
//           poleTop + flagHeight * 0.47,
//           size * 0.19,
//           size * 0.09,
//         )}
//         fill="#FFFFFF"
//       />
//     </>
//   );
// }

// export function PathGuide({
//   round,
//   width,
//   height,
//   corridorWidth,
//   ballRadius,
// }: Props) {
//   const goal = toBoardPoint(round.goalPosition, width, height);

//   const G = goalRadiusFor(corridorWidth);

//   // 별은 기존 도착 판정 영역에 맞춰 크기 조절
//   const starRadius = Math.max(12, Math.min(27, G * 0.9));

//   // 깃발은 별 중앙에 배치하되 너무 커지지 않도록 제한
//   const flagSize = Math.max(10, Math.min(15, G * 0.42));

//   return (
//     <View pointerEvents="none" style={StyleSheet.absoluteFill}>
//       <Svg width={width} height={height}>
//         {/* 도착지를 나타내는 큼직한 별 */}
//         <Polygon
//           points={starPoints(goal.x, goal.y, starRadius, starRadius * 0.52)}
//           fill="#FFE27A"
//           stroke="#E8AD32"
//           strokeWidth={2.5}
//           strokeLinejoin="round"
//         />

//         {/* 별 안쪽 하이라이트 */}
//         <Polygon
//           points={starPoints(
//             goal.x,
//             goal.y,
//             starRadius * 0.72,
//             starRadius * 0.52 * 0.72,
//           )}
//           fill="#FFF0B8"
//           opacity={0.75}
//         />

//         {/* 중앙 깃발 */}
//         <GoalFlag x={goal.x} y={goal.y + flagSize * 0.45} size={flagSize} />
//       </Svg>
//     </View>
//   );
// }

///둥근원+빗겨난깃발
// import React from "react";
// import { StyleSheet, View } from "react-native";
// import Svg, { Circle, Line, Path, Polygon } from "react-native-svg";

// import type { GeneratedRound } from "../../games/magnetMaze/levels/levelTypes";
// import { toBoardPoint } from "../../games/magnetMaze/levels/levelGenerator";
// import { GAME_CONFIG } from "../../constants/magnetMaze/gameConfig";
// import { goalRadiusFor } from "../../games/magnetMaze/game/arrival";

// type Props = {
//   round: GeneratedRound;
//   width: number;
//   height: number;
//   corridorWidth?: number;
//   ballRadius?: number;
// };

// /** 별 모양 좌표 생성 */
// function starPoints(cx: number, cy: number, outer: number, inner: number) {
//   const points: string[] = [];

//   for (let i = 0; i < 10; i++) {
//     const angle = (Math.PI * i) / 5 - Math.PI / 2;
//     const radius = i % 2 === 0 ? outer : inner;

//     const x = cx + Math.cos(angle) * radius;
//     const y = cy + Math.sin(angle) * radius;

//     points.push(`${x},${y}`);
//   }

//   return points.join(" ");
// }

// /** 도착 깃발 */
// function GoalFlag({ x, y, size }: { x: number; y: number; size: number }) {
//   const poleHeight = size * 1.65;
//   const flagWidth = size * 1.35;
//   const flagHeight = size * 0.85;

//   const poleX = x;
//   const poleTop = y - poleHeight;

//   return (
//     <>
//       {/* 깃대 그림자 */}
//       <Line
//         x1={poleX + 1.5}
//         y1={poleTop + 2}
//         x2={poleX + 1.5}
//         y2={y + 1}
//         stroke="#B9A8E8"
//         strokeWidth={size * 0.15}
//         strokeLinecap="round"
//       />

//       {/* 깃대 */}
//       <Line
//         x1={poleX}
//         y1={poleTop}
//         x2={poleX}
//         y2={y}
//         stroke="#7652D8"
//         strokeWidth={size * 0.14}
//         strokeLinecap="round"
//       />

//       {/* 깃대 꼭대기 */}
//       <Circle cx={poleX} cy={poleTop} r={size * 0.13} fill="#FFD95A" />

//       {/* 별 깃발 */}
//       <Path
//         d={`
//           M ${poleX} ${poleTop + size * 0.08}
//           L ${poleX + flagWidth} ${poleTop + size * 0.18}
//           L ${poleX + flagWidth * 0.78} ${poleTop + flagHeight}
//           L ${poleX} ${poleTop + flagHeight * 0.78}
//           Z
//         `}
//         fill="#FFD95A"
//         stroke="#E8AD32"
//         strokeWidth={size * 0.055}
//         strokeLinejoin="round"
//       />

//       {/* 깃발 속 작은 별 */}
//       <Polygon
//         points={starPoints(
//           poleX + flagWidth * 0.49,
//           poleTop + flagHeight * 0.48,
//           size * 0.22,
//           size * 0.1,
//         )}
//         fill="#FFFFFF"
//       />
//     </>
//   );
// }

// export function PathGuide({
//   round,
//   width,
//   height,
//   corridorWidth,
//   ballRadius,
// }: Props) {
//   const goal = toBoardPoint(round.goalPosition, width, height);

//   const G = goalRadiusFor(corridorWidth);

//   // 기존 도착 판정 반경을 기준으로 표시 크기 결정
//   const flagSize = Math.max(12, Math.min(22, G * 0.48));

//   // 깃발을 도착 지점 오른쪽 위에 배치
//   // 쇠구슬이 들어올 중앙 공간은 가리지 않음
//   const flagX = goal.x + G * 0.42;
//   const flagY = goal.y - G * 0.15;

//   return (
//     <View pointerEvents="none" style={StyleSheet.absoluteFill}>
//       <Svg width={width} height={height}>
//         {/* 도착 영역의 은은한 배경 */}
//         <Circle cx={goal.x} cy={goal.y} r={G} fill="#FFF0B8" opacity={0.32} />

//         {/* 도착 영역 외곽 */}
//         <Circle
//           cx={goal.x}
//           cy={goal.y}
//           r={G}
//           fill="none"
//           stroke="#EAB94D"
//           strokeWidth={2.5}
//           strokeDasharray="5 5"
//           opacity={0.9}
//         />

//         {/* 도착 지점 안쪽의 부드러운 링 */}
//         <Circle
//           cx={goal.x}
//           cy={goal.y}
//           r={G * 0.72}
//           fill="none"
//           stroke="#FFD95A"
//           strokeWidth={1.5}
//           opacity={0.65}
//         />

//         {/* 도착 깃발 */}
//         <GoalFlag x={flagX} y={flagY} size={flagSize} />

//         {/* 도착 지점의 작은 반짝임 */}
//         <Path
//           d={`
//             M ${goal.x - G * 0.72} ${goal.y - G * 0.9}
//             L ${goal.x - G * 0.72} ${goal.y - G * 0.68}
//             M ${goal.x - G * 0.83} ${goal.y - G * 0.79}
//             L ${goal.x - G * 0.61} ${goal.y - G * 0.79}
//           `}
//           stroke="#FFD95A"
//           strokeWidth={2}
//           strokeLinecap="round"
//           opacity={0.9}
//         />
//       </Svg>
//     </View>
//   );
// }

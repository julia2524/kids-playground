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

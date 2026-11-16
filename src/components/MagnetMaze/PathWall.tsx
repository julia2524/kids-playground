import { StyleSheet, View } from "react-native";

import Svg, { Defs, Mask, Path, Rect } from "react-native-svg";

import type { WallGeometry } from "../../games/magnetMaze/physics/collisionGeometry";

type Props = {
  geometry: WallGeometry;
  width: number;
  height: number;
};

// Kids Playground Brand Colors
const WALL = "#7C5CFF";
const WALL_SHADOW = "#6044D6";
const WALL_HIGHLIGHT = "#A995FF";

const FLOOR = "#FFFFFF";

export function PathWall({ geometry, width, height }: Props) {
  if (!geometry.hasWalls) return null;

  const d = geometry.pathD;
  const corridor = geometry.corridorWidth;

  const common = {
    d,
    fill: "none" as const,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Svg width={width} height={height}>
        <Defs>
          <Mask
            id="corridorHole"
            maskUnits="userSpaceOnUse"
            x={0}
            y={0}
            width={width}
            height={height}
          >
            <Rect x={0} y={0} width={width} height={height} fill="white" />

            <Path {...common} stroke="black" strokeWidth={corridor} />
          </Mask>
        </Defs>

        {/* 통로: 보드와 동일한 흰색 */}
        <Path {...common} stroke={FLOOR} strokeWidth={corridor} />

        {/* 벽의 은은한 그림자 */}
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={WALL_SHADOW}
          mask="url(#corridorHole)"
        />

        {/* 메인 보라색 벽 */}
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={WALL}
          mask="url(#corridorHole)"
          opacity={0.96}
        />

        {/* 벽의 밝은 하이라이트 */}
        {/* <Path
          {...common}
          stroke={WALL_HIGHLIGHT}
          strokeWidth={Math.max(2, corridor * 0.08)}
          opacity={0.65}
        /> */}
      </Svg>
    </View>
  );
}

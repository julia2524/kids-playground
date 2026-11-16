// import { StyleSheet, View } from "react-native";

// import Svg, {
//   Defs,
//   LinearGradient,
//   Mask,
//   Path,
//   Rect,
//   Stop,
// } from "react-native-svg";

// import type { WallGeometry } from "../../games/magnetMaze/physics/collisionGeometry";

// type Props = {
//   geometry: WallGeometry;
//   width: number;
//   height: number;
// };

// export function PathWall({ geometry, width, height }: Props) {
//   if (!geometry.hasWalls) return null;

//   const d = geometry.pathD;
//   const corridor = geometry.corridorWidth;

//   const common = {
//     d,
//     fill: "none" as const,
//     strokeLinecap: "round" as const,
//     strokeLinejoin: "round" as const,
//   };

//   return (
//     <View pointerEvents="none" style={StyleSheet.absoluteFill}>
//       <Svg width={width} height={height}>
//         <Defs>
//           <Mask
//             id="corridorHole"
//             maskUnits="userSpaceOnUse"
//             x={0}
//             y={0}
//             width={width}
//             height={height}
//           >
//             <Rect x={0} y={0} width={width} height={height} fill="white" />
//             <Path {...common} stroke="black" strokeWidth={corridor} />
//           </Mask>

//           {/* 우주색 벽 그라데이션 */}
//           <LinearGradient id="wallGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//             <Stop offset="0%" stopColor="#39236F" />
//             <Stop offset="50%" stopColor="#6040B5" />
//             <Stop offset="100%" stopColor="#493080" />
//           </LinearGradient>
//         </Defs>

//         {/* 1. 흰색 미로 통로 */}
//         <Path {...common} stroke="#ffffff" strokeWidth={corridor} />

//         {/* 2. 통로를 제외한 벽에만 우주 그라데이션 */}
//         <Rect
//           x={0}
//           y={0}
//           width={width}
//           height={height}
//           fill="url(#wallGradient)"
//           mask="url(#corridorHole)"
//         />
//       </Svg>
//     </View>
//   );
// }

import { StyleSheet, View } from "react-native";

import Svg, {
  Defs,
  LinearGradient,
  Mask,
  Path,
  Rect,
  Stop,
} from "react-native-svg";

import type { WallGeometry } from "../../games/magnetMaze/physics/collisionGeometry";

type Props = {
  geometry: WallGeometry;
  width: number;
  height: number;
};

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
          {/* 흰색 통로 영역을 제외하는 마스크 */}
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

          {/* 클레이 벽 기본 색상 */}
          <LinearGradient id="clayWall" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#A98AFF" />
            <Stop offset="28%" stopColor="#8965E8" />
            <Stop offset="65%" stopColor="#6947C2" />
            <Stop offset="100%" stopColor="#493080" />
          </LinearGradient>

          {/* 벽 표면의 부드러운 광택 */}
          <LinearGradient id="clayHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.34" />
            <Stop offset="38%" stopColor="#E5D9FF" stopOpacity="0.12" />
            <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </LinearGradient>
        </Defs>

        {/* 1. 벽의 어두운 밑면: 입체적인 두께감 */}
        <Path {...common} stroke="#302052" strokeWidth={corridor + 13} />

        {/* 2. 벽 본체 */}
        <Path {...common} stroke="url(#clayWall)" strokeWidth={corridor + 9} />

        {/* 3. 벽 표면의 은은한 라벤더 광택 */}
        <Path
          {...common}
          stroke="url(#clayHighlight)"
          strokeWidth={corridor + 5}
          opacity={0.85}
        />

        {/* 4. 통로는 언제나 순백색 */}
        <Path {...common} stroke="#FFFFFF" strokeWidth={corridor} />

        {/* 5. 벽 영역에도 그라데이션을 입혀 마감 */}
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="url(#clayWall)"
          mask="url(#corridorHole)"
          opacity={0}
        />
      </Svg>
    </View>
  );
}

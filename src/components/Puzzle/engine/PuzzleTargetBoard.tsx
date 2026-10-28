// import React from "react";
// import Svg, { Rect } from "react-native-svg";
// import styled from "styled-components/native";
// import type { PuzzleArtworkComponent, PuzzlePieceData } from "./puzzleTypes";

// interface Props {
//   Artwork: PuzzleArtworkComponent;
//   viewBoxWidth: number;
//   viewBoxHeight: number;
//   pieces: PuzzlePieceData[];
//   rows: number;
//   columns: number;
//   width: number;
//   height: number;
// }

// export default function PuzzleTargetBoard({
//   Artwork,
//   viewBoxWidth,
//   viewBoxHeight,
//   pieces,
//   rows,
//   columns,
//   width,
//   height,
// }: Props) {
//   return (
//     <Board boardWidth={width} boardHeight={height}>
//       {/* 흐린 원본 그림 */}
//       <FaintArtwork pointerEvents="none">
//         <Svg
//           width={width}
//           height={height}
//           viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
//           preserveAspectRatio="none"
//         >
//           <Artwork width={viewBoxWidth} height={viewBoxHeight} />
//         </Svg>
//       </FaintArtwork>

//       {/* 점선 격자 + 테두리 */}
//       <GridLayer pointerEvents="none">
//         <Svg
//           width={width}
//           height={height}
//           viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
//           preserveAspectRatio="none"
//         >
//           {pieces.map((piece) => (
//             <Rect
//               key={piece.id}
//               x={piece.sourceX}
//               y={piece.sourceY}
//               width={piece.sourceWidth}
//               height={piece.sourceHeight}
//               fill="none"
//               stroke="#52647A"
//               strokeWidth={0.8}
//               strokeDasharray="3 2"
//               opacity={0.72}
//             />
//           ))}
//           <Rect
//             x={0.5}
//             y={0.5}
//             width={viewBoxWidth - 1}
//             height={viewBoxHeight - 1}
//             fill="none"
//             stroke="#39465D"
//             strokeWidth={1}
//             rx={2}
//           />
//         </Svg>
//       </GridLayer>
//     </Board>
//   );
// }

// // ============================================================
// // Styled Components
// // ============================================================

// const Board = styled.View<{
//   boardWidth: number;
//   boardHeight: number;
// }>`
//   position: relative;
//   overflow: hidden;
//   width: ${(p) => p.boardWidth}px;
//   height: ${(p) => p.boardHeight}px;
//   border-radius: 16px;
//   background-color: #ffffff;
// `;

// const FaintArtwork = styled.View`
//   position: absolute;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
//   opacity: 0.22;
// `;

// const GridLayer = styled.View`
//   position: absolute;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
// `;

import React from "react";
import Svg, { Path, Rect } from "react-native-svg";
import styled from "styled-components/native";
import type { PuzzleArtworkComponent, PuzzlePieceData } from "./puzzleTypes";

interface Props {
  Artwork: PuzzleArtworkComponent;
  viewBoxWidth: number;
  viewBoxHeight: number;
  pieces: PuzzlePieceData[];
  rows: number;
  columns: number;
  width: number;
  height: number;
}

export default function PuzzleTargetBoard({
  Artwork,
  viewBoxWidth,
  viewBoxHeight,
  pieces,
  width,
  height,
}: Props) {
  return (
    <Board boardWidth={width} boardHeight={height}>
      {/* 흐린 원본 그림 */}
      <FaintArtwork pointerEvents="none">
        <Svg
          width={width}
          height={height}
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          preserveAspectRatio="none"
        >
          <Artwork width={viewBoxWidth} height={viewBoxHeight} />
        </Svg>
      </FaintArtwork>

      {/* 점선 지그소 경계선 + 테두리 */}
      <GridLayer pointerEvents="none">
        <Svg
          width={width}
          height={height}
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          preserveAspectRatio="none"
        >
          {pieces.map((piece) =>
            piece.guidePath ? (
              <Path
                key={piece.id}
                d={piece.guidePath}
                fill="none"
                stroke="#52647A"
                strokeWidth={0.8}
                strokeDasharray="3 2"
                strokeLinejoin="round"
                opacity={0.72}
              />
            ) : null,
          )}
          <Rect
            x={0.5}
            y={0.5}
            width={viewBoxWidth - 1}
            height={viewBoxHeight - 1}
            fill="none"
            stroke="#39465D"
            strokeWidth={1}
            rx={2}
          />
        </Svg>
      </GridLayer>
    </Board>
  );
}

// ============================================================
// Styled Components
// ============================================================

const Board = styled.View<{
  boardWidth: number;
  boardHeight: number;
}>`
  position: relative;
  overflow: hidden;
  width: ${(p) => p.boardWidth}px;
  height: ${(p) => p.boardHeight}px;
  border-radius: 16px;
  background-color: #ffffff;
`;

const FaintArtwork = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0.22;
`;

const GridLayer = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

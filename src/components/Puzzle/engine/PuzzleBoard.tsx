// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { LayoutChangeEvent } from "react-native";
// import styled from "styled-components/native";
// import PuzzlePiece from "./PuzzlePiece";
// import PuzzleTargetBoard from "./PuzzleTargetBoard";
// import { createPuzzlePieces, shuffleArray } from "./puzzleGenerator";
// import type {
//   PuzzleBoardProps,
//   PuzzlePieceData,
//   PuzzlePiecePosition,
// } from "./puzzleTypes";
// import i18n from "../../../i18n";
// import { useLanguage } from "../../../context/LangaugeContext";

// // ============================================================
// // Constants
// // ============================================================

// const DEFAULT_VIEWBOX_WIDTH = 240;
// const DEFAULT_VIEWBOX_HEIGHT = 180;

// // 퍼즐판 크기를 정할 때 "트레이가 최소 이만큼은 필요하다"고 잡아두는 높이
// const MIN_TRAY_HEIGHT = 172;

// // 퍼즐판 위쪽 여백 / 퍼즐판과 트레이 사이 간격
// const BOARD_STAGE_PADDING_TOP = 16;
// const BOARD_TRAY_GAP = 12;

// // 트레이 안쪽 레이아웃
// const TRAY_TITLE_AREA = 40; // 안내 문구가 차지하는 위쪽 영역
// const TRAY_INNER_PADDING = 12; // 좌우/하단 안쪽 여백
// const PIECE_GAP = 10; // 조각 사이 간격

// // ============================================================
// // Component
// // ============================================================

// export default function PuzzleBoard({
//   Artwork,
//   viewBoxWidth = DEFAULT_VIEWBOX_WIDTH,
//   viewBoxHeight = DEFAULT_VIEWBOX_HEIGHT,
//   rows = 2,
//   columns = 2,
//   boardAspectRatio = viewBoxWidth / viewBoxHeight,
//   onComplete,
//   title = "그림 퍼즐 맞추기",
// }: PuzzleBoardProps) {
//   console.count("[Render] PuzzleBoard");
//   useLanguage();
//   const [layoutWidth, setLayoutWidth] = useState(0);
//   const [layoutHeight, setLayoutHeight] = useState(0);
//   const [pieces, setPieces] = useState<PuzzlePieceData[]>([]);
//   const [positions, setPositions] = useState<
//     Record<string, PuzzlePiecePosition>
//   >({});
//   const [placedCount, setPlacedCount] = useState(0);
//   const [completeSent, setCompleteSent] = useState(false);

//   const [wrongDropCount, setWrongDropCount] = useState(0);

//   // ==========================================================
//   // 퍼즐판 크기
//   // 가로 기준 / 520 / (남은 세로 - 최소 트레이 높이) 기준 중 최솟값
//   // ==========================================================

//   const availableBoardHeight = Math.max(
//     0,
//     layoutHeight - MIN_TRAY_HEIGHT - BOARD_STAGE_PADDING_TOP - BOARD_TRAY_GAP,
//   );

//   const boardWidth = Math.max(
//     0,
//     Math.min(layoutWidth - 32, 520, availableBoardHeight * boardAspectRatio),
//   );
//   const calculatedBoardHeight =
//     boardWidth > 0 ? boardWidth / boardAspectRatio : 0;
//   const cellWidth = columns > 0 ? boardWidth / columns : 0;
//   const cellHeight = rows > 0 ? calculatedBoardHeight / rows : 0;

//   // ✅ 퍼즐판 위치는 onLayout 으로 "나중에" 측정하지 않고 계산으로 바로 구한다.
//   //    (측정값은 한 박자 늦게 들어와서, 화면 진입 순간 테두리/조각이 엉뚱한 위치에 보였음)
//   const boardLeft = (layoutWidth - boardWidth) / 2;
//   const boardTop = BOARD_STAGE_PADDING_TOP;

//   // ✅ 화면 크기 측정이 끝나기 전에는 아무것도 그리지 않는다 (진입 시 깜빡임 방지)
//   const isReady = layoutWidth > 0 && layoutHeight > 0 && boardWidth > 0;

//   // ==========================================================
//   // 트레이 영역
//   // - 가로: 퍼즐판과 동일한 폭, 가운데 정렬
//   // - 세로: 퍼즐판 바로 아래(간격 BOARD_TRAY_GAP)에서 화면 하단까지
//   // ==========================================================

//   const trayWidth = boardWidth;
//   const trayX = (layoutWidth - boardWidth) / 2;
//   const trayY =
//     BOARD_STAGE_PADDING_TOP + calculatedBoardHeight + BOARD_TRAY_GAP;
//   const trayHeight = Math.max(0, layoutHeight - trayY);

//   const generatedPieces = useMemo(
//     () => createPuzzlePieces(viewBoxWidth, viewBoxHeight, rows, columns),
//     [viewBoxWidth, viewBoxHeight, rows, columns],
//   );

//   // ==========================================================
//   // 조각 크기 + 트레이 안 배치 (모든 조각이 트레이 안에 들어오도록 자동 축소)
//   // ==========================================================

//   const pieceLayout = useMemo(() => {
//     const count = generatedPieces.length;
//     const basePieceWidth = Math.max(34, cellWidth * 0.9);
//     const basePieceHeight = Math.max(28, cellHeight * 0.9);

//     const innerWidth = Math.max(0, trayWidth - TRAY_INNER_PADDING * 2);
//     const innerHeight = Math.max(
//       0,
//       trayHeight - TRAY_TITLE_AREA - TRAY_INNER_PADDING,
//     );

//     let pieceWidth = basePieceWidth;
//     let pieceHeight = basePieceHeight;
//     let cols = 1;
//     let rowCount = count;

//     for (let scale = 1; scale >= 0.3; scale -= 0.05) {
//       pieceWidth = basePieceWidth * scale;
//       pieceHeight = basePieceHeight * scale;
//       cols = Math.max(
//         1,
//         Math.floor((innerWidth + PIECE_GAP) / (pieceWidth + PIECE_GAP)),
//       );
//       rowCount = Math.ceil(count / cols);
//       const neededHeight = rowCount * pieceHeight + (rowCount - 1) * PIECE_GAP;
//       if (neededHeight <= innerHeight) break;
//     }

//     return { pieceWidth, pieceHeight, cols, rowCount, innerHeight };
//   }, [generatedPieces.length, cellWidth, cellHeight, trayWidth, trayHeight]);

//   const { pieceWidth, pieceHeight } = pieceLayout;

//   const makePositions = useCallback(() => {
//     if (!layoutWidth || !layoutHeight || !boardWidth || !trayHeight) return;

//     const { cols, rowCount, innerHeight } = pieceLayout;
//     const count = generatedPieces.length;
//     const shuffled = shuffleArray(generatedPieces);

//     const totalHeight = rowCount * pieceHeight + (rowCount - 1) * PIECE_GAP;

//     // 트레이 안쪽 영역(제목 아래)에서 세로 가운데
//     const startY =
//       trayY + TRAY_TITLE_AREA + Math.max(0, (innerHeight - totalHeight) / 2);

//     const next: Record<string, PuzzlePiecePosition> = {};

//     shuffled.forEach((piece, index) => {
//       const row = Math.floor(index / cols);
//       const col = index % cols;

//       // 이 줄에 들어 있는 조각 수 (마지막 줄은 더 적을 수 있음)
//       const itemsInRow = row === rowCount - 1 ? count - row * cols : cols;
//       const rowWidth = itemsInRow * pieceWidth + (itemsInRow - 1) * PIECE_GAP;

//       // 각 줄을 트레이 가로 가운데로 정렬
//       const startX = trayX + (trayWidth - rowWidth) / 2;

//       next[piece.id] = {
//         x: startX + col * (pieceWidth + PIECE_GAP),
//         y: startY + row * (pieceHeight + PIECE_GAP),
//         placed: false,
//       };
//     });

//     setPieces(generatedPieces);
//     setPositions(next);
//     setPlacedCount(0);
//     setCompleteSent(false);
//   }, [
//     layoutWidth,
//     layoutHeight,
//     boardWidth,
//     trayHeight,
//     trayX,
//     trayY,
//     trayWidth,
//     generatedPieces,
//     pieceLayout,
//     pieceWidth,
//     pieceHeight,
//   ]);

//   useEffect(() => {
//     makePositions();
//   }, [makePositions]);

//   // ==========================================================
//   // Layout
//   // ==========================================================

//   const onRootLayout = (event: LayoutChangeEvent) => {
//     const { width, height } = event.nativeEvent.layout;
//     setLayoutWidth(width);
//     setLayoutHeight(height);
//   };

//   // ==========================================================
//   // Drag
//   // ==========================================================

//   const movePiece = useCallback((id: string, x: number, y: number) => {
//     setPositions((current) => {
//       const item = current[id];
//       if (!item || item.placed) return current;
//       return { ...current, [id]: { ...item, x, y } };
//     });
//   }, []);

//   const dropPiece = useCallback(
//     (id: string, x: number, y: number) => {
//       const piece = generatedPieces.find((item) => item.id === id);
//       if (!piece) return;

//       const targetX = boardLeft + piece.column * cellWidth;
//       const targetY = boardTop + piece.row * cellHeight;
//       const targetCenterX = targetX + cellWidth / 2;
//       const targetCenterY = targetY + cellHeight / 2;
//       const pieceCenterX = x + pieceWidth / 2;
//       const pieceCenterY = y + pieceHeight / 2;
//       const snapDistanceX = Math.max(26, cellWidth * 0.34);
//       const snapDistanceY = Math.max(26, cellHeight * 0.34);
//       const isNearTarget =
//         Math.abs(pieceCenterX - targetCenterX) < snapDistanceX &&
//         Math.abs(pieceCenterY - targetCenterY) < snapDistanceY;

//       if (isNearTarget) {
//         setPositions((current) => {
//           const item = current[id];
//           if (!item || item.placed) return current;
//           return {
//             ...current,
//             [id]: { x: targetX, y: targetY, placed: true },
//           };
//         });
//         setPlacedCount((count) => {
//           const next = count + 1;
//           if (next === generatedPieces.length && !completeSent) {
//             setCompleteSent(true);
//             onComplete?.();
//           }
//           return next;
//         });
//       } else {
//         movePiece(id, x, y);
//       }
//     },
//     [
//       generatedPieces,
//       boardLeft,
//       boardTop,
//       cellWidth,
//       cellHeight,
//       pieceWidth,
//       pieceHeight,
//       movePiece,
//       completeSent,
//       onComplete,
//     ],
//   );

//   // ==========================================================
//   // Render
//   // ==========================================================

//   return (
//     <Root>
//       <PlayArea onLayout={onRootLayout}>
//         {isReady && (
//           <>
//             <BoardStage>
//               <BoardCard
//                 boardWidth={boardWidth}
//                 boardHeight={calculatedBoardHeight}
//               >
//                 <PuzzleTargetBoard
//                   Artwork={Artwork}
//                   viewBoxWidth={viewBoxWidth}
//                   viewBoxHeight={viewBoxHeight}
//                   pieces={generatedPieces}
//                   rows={rows}
//                   columns={columns}
//                   width={boardWidth}
//                   height={calculatedBoardHeight}
//                 />
//               </BoardCard>
//             </BoardStage>

//             {/* 퍼즐판과 같은 가로폭, 퍼즐판 아래부터 화면 하단까지 */}
//             <Tray
//               style={{
//                 left: trayX,
//                 top: trayY,
//                 width: trayWidth,
//                 height: trayHeight,
//               }}
//             >
//               {/* <TrayTitle>
//                 {placedCount === generatedPieces.length
//                   ? "완성했어요! 정말 잘했어!"
//                   : "조각을 끌어다가 그림에 맞춰보세요"}
//               </TrayTitle> */}
//               <TrayTitle>
//                 {placedCount === generatedPieces.length
//                   ? i18n.t("puzzle_tray_complete") || "완성했어요! 정말 잘했어!"
//                   : i18n.t("puzzle_tray_guide") ||
//                     "조각을 끌어다가 그림에 맞춰보세요"}
//               </TrayTitle>
//             </Tray>

//             {/* ✅ 퍼즐판에 맞춰진 조각: 퍼즐판 모양(둥근 모서리)으로 잘라서(overflow hidden) 표시 */}
//             <PlacedLayer
//               pointerEvents="none"
//               style={{
//                 left: boardLeft,
//                 top: boardTop,
//                 width: boardWidth,
//                 height: calculatedBoardHeight,
//               }}
//             >
//               {pieces.map((piece) => {
//                 const position = positions[piece.id];
//                 if (!position || !position.placed) return null;
//                 return (
//                   <PuzzlePiece
//                     key={piece.id}
//                     piece={piece}
//                     Artwork={Artwork}
//                     viewBoxWidth={viewBoxWidth}
//                     viewBoxHeight={viewBoxHeight}
//                     x={0}
//                     y={0}
//                     width={pieceWidth}
//                     height={pieceHeight}
//                     // PlacedLayer 안쪽 기준 좌표 (퍼즐판 왼쪽 위가 0,0)
//                     targetX={piece.column * cellWidth}
//                     targetY={piece.row * cellHeight}
//                     targetWidth={cellWidth}
//                     targetHeight={cellHeight}
//                     placed
//                     onMove={movePiece}
//                     onDrop={dropPiece}
//                   />
//                 );
//               })}
//             </PlacedLayer>

//             {/* 조각 위로 퍼즐판 테두리를 다시 그려서 테두리가 가려지지 않게 한다 */}
//             <BoardFrame
//               pointerEvents="none"
//               style={{
//                 left: boardLeft,
//                 top: boardTop,
//                 width: boardWidth,
//                 height: calculatedBoardHeight,
//               }}
//             />

//             {/* 아직 트레이에 있거나 드래그 중인 조각 (퍼즐판 밖으로도 움직일 수 있다) */}
//             {pieces.map((piece) => {
//               const position = positions[piece.id];
//               if (!position || position.placed) return null;
//               return (
//                 <PuzzlePiece
//                   key={piece.id}
//                   piece={piece}
//                   Artwork={Artwork}
//                   viewBoxWidth={viewBoxWidth}
//                   viewBoxHeight={viewBoxHeight}
//                   x={position.x}
//                   y={position.y}
//                   width={pieceWidth}
//                   height={pieceHeight}
//                   targetX={boardLeft + piece.column * cellWidth}
//                   targetY={boardTop + piece.row * cellHeight}
//                   targetWidth={cellWidth}
//                   targetHeight={cellHeight}
//                   placed={false}
//                   onMove={movePiece}
//                   onDrop={dropPiece}
//                 />
//               );
//             })}
//           </>
//         )}
//       </PlayArea>
//     </Root>
//   );
// }

// // ============================================================
// // Styled Components
// // ============================================================

// // SafeArea 는 바깥 화면(PuzzlePlayScreen)에서 처리하므로 일반 View 사용
// const Root = styled.View`
//   flex: 1;
//   align-self: stretch;
//   background-color: transparent;
// `;

// const PlayArea = styled.View`
//   flex: 1;
//   position: relative;
//   overflow: hidden;
// `;

// const BoardStage = styled.View`
//   padding-left: 16px;
//   padding-right: 16px;
//   padding-top: ${BOARD_STAGE_PADDING_TOP}px;
//   align-items: center;
// `;

// const BoardCard = styled.View<{
//   boardWidth: number;
//   boardHeight: number;
// }>`
//   width: ${(p) => p.boardWidth}px;
//   height: ${(p) => p.boardHeight}px;

//   overflow: hidden;
//   border-width: 3px;
//   border-color: #39465d;
//   border-radius: 20px;
//   background-color: #ffffff;

//   shadow-color: #39465d;
//   shadow-offset: 0px 4px;
//   shadow-opacity: 0.16;
//   shadow-radius: 7px;
//   elevation: 4;
// `;

// // 위치/크기(left, top, width, height)는 위 JSX 에서 style 로 직접 지정한다.
// const Tray = styled.View`
//   position: absolute;

//   border-radius: 26px;
//   border-width: 3px;
//   border-color: #39465d;
//   background-color: #8ed6f2;

//   padding-top: 12px;
//   align-items: center;
// `;

// // 맞춰진 조각을 퍼즐판 모양으로 잘라내는 레이어 (위치/크기는 JSX 에서 style 로 지정)
// const PlacedLayer = styled.View`
//   position: absolute;
//   overflow: hidden;
//   border-radius: 20px;
// `;

// // 맞춰진 조각 위에 덧그리는 테두리 (BoardCard 의 border 와 동일한 모양)
// const BoardFrame = styled.View`
//   position: absolute;
//   border-width: 3px;
//   border-color: #39465d;
//   border-radius: 20px;
// `;

// const TrayTitle = styled.Text`
//   color: #39465d;
//   font-size: 14px;
//   font-weight: 800;
// `;

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { LayoutChangeEvent } from "react-native";
import styled from "styled-components/native";

import PuzzlePiece from "./PuzzlePiece";
import PuzzleTargetBoard from "./PuzzleTargetBoard";
import { createPuzzlePieces, shuffleArray } from "./puzzleGenerator";
import type {
  PuzzleBoardProps,
  PuzzlePieceData,
  PuzzlePiecePosition,
} from "./puzzleTypes";
import i18n from "../../../i18n";
import { useLanguage } from "../../../context/LangaugeContext";

const DEFAULT_VIEWBOX_WIDTH = 240;
const DEFAULT_VIEWBOX_HEIGHT = 180;

const MIN_TRAY_HEIGHT = 172;
const BOARD_STAGE_PADDING_TOP = 16;
const BOARD_TRAY_GAP = 12;

const TRAY_TITLE_AREA = 40;
const TRAY_INNER_PADDING = 12;
const PIECE_GAP = 10;

export default function PuzzleBoard({
  Artwork,
  viewBoxWidth = DEFAULT_VIEWBOX_WIDTH,
  viewBoxHeight = DEFAULT_VIEWBOX_HEIGHT,
  rows = 2,
  columns = 2,
  boardAspectRatio = viewBoxWidth / viewBoxHeight,
  onComplete,
  title = "그림 퍼즐 맞추기",
}: PuzzleBoardProps) {
  useLanguage();

  const [layoutWidth, setLayoutWidth] = useState(0);
  const [layoutHeight, setLayoutHeight] = useState(0);

  const [pieces, setPieces] = useState<PuzzlePieceData[]>([]);
  const [positions, setPositions] = useState<
    Record<string, PuzzlePiecePosition>
  >({});

  const [placedCount, setPlacedCount] = useState(0);
  const [wrongDropCount, setWrongDropCount] = useState(0);
  const [completeSent, setCompleteSent] = useState(false);

  const availableBoardHeight = Math.max(
    0,
    layoutHeight - MIN_TRAY_HEIGHT - BOARD_STAGE_PADDING_TOP - BOARD_TRAY_GAP,
  );

  const boardWidth = Math.max(
    0,
    Math.min(layoutWidth - 32, 520, availableBoardHeight * boardAspectRatio),
  );

  const calculatedBoardHeight =
    boardWidth > 0 ? boardWidth / boardAspectRatio : 0;

  const cellWidth = columns > 0 ? boardWidth / columns : 0;
  const cellHeight = rows > 0 ? calculatedBoardHeight / rows : 0;

  const boardLeft = (layoutWidth - boardWidth) / 2;
  const boardTop = BOARD_STAGE_PADDING_TOP;

  const isReady = layoutWidth > 0 && layoutHeight > 0 && boardWidth > 0;

  const trayWidth = boardWidth;
  const trayX = (layoutWidth - boardWidth) / 2;

  const trayY =
    BOARD_STAGE_PADDING_TOP + calculatedBoardHeight + BOARD_TRAY_GAP;

  const trayHeight = Math.max(0, layoutHeight - trayY);

  const generatedPieces = useMemo(
    () => createPuzzlePieces(viewBoxWidth, viewBoxHeight, rows, columns),
    [viewBoxWidth, viewBoxHeight, rows, columns],
  );

  const pieceLayout = useMemo(() => {
    const count = generatedPieces.length;

    const basePieceWidth = Math.max(34, cellWidth * 0.66);
    const basePieceHeight = Math.max(28, cellHeight * 0.66);

    const innerWidth = Math.max(0, trayWidth - TRAY_INNER_PADDING * 2);

    const innerHeight = Math.max(
      0,
      trayHeight - TRAY_TITLE_AREA - TRAY_INNER_PADDING,
    );

    let pieceWidth = basePieceWidth;
    let pieceHeight = basePieceHeight;
    let cols = 1;
    let rowCount = count;

    for (let scale = 1; scale >= 0.3; scale -= 0.05) {
      pieceWidth = basePieceWidth * scale;
      pieceHeight = basePieceHeight * scale;

      cols = Math.max(
        1,
        Math.floor((innerWidth + PIECE_GAP) / (pieceWidth + PIECE_GAP)),
      );

      rowCount = Math.ceil(count / cols);

      const neededHeight = rowCount * pieceHeight + (rowCount - 1) * PIECE_GAP;

      if (neededHeight <= innerHeight) break;
    }

    return {
      pieceWidth,
      pieceHeight,
      cols,
      rowCount,
      innerHeight,
    };
  }, [generatedPieces.length, cellWidth, cellHeight, trayWidth, trayHeight]);

  const { pieceWidth, pieceHeight } = pieceLayout;

  const makePositions = useCallback(() => {
    if (!layoutWidth || !layoutHeight || !boardWidth || !trayHeight) {
      return;
    }

    const { cols, rowCount, innerHeight } = pieceLayout;
    const count = generatedPieces.length;
    const shuffled = shuffleArray(generatedPieces);

    const totalHeight = rowCount * pieceHeight + (rowCount - 1) * PIECE_GAP;

    const startY =
      trayY + TRAY_TITLE_AREA + Math.max(0, (innerHeight - totalHeight) / 2);

    const next: Record<string, PuzzlePiecePosition> = {};

    shuffled.forEach((piece, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;

      const itemsInRow = row === rowCount - 1 ? count - row * cols : cols;

      const rowWidth = itemsInRow * pieceWidth + (itemsInRow - 1) * PIECE_GAP;

      const startX = trayX + (trayWidth - rowWidth) / 2;

      next[piece.id] = {
        x: startX + col * (pieceWidth + PIECE_GAP),
        y: startY + row * (pieceHeight + PIECE_GAP),
        placed: false,
      };
    });

    setPieces(generatedPieces);
    setPositions(next);
    setPlacedCount(0);
    setWrongDropCount(0);
    setCompleteSent(false);
  }, [
    layoutWidth,
    layoutHeight,
    boardWidth,
    trayHeight,
    trayX,
    trayY,
    trayWidth,
    generatedPieces,
    pieceLayout,
    pieceWidth,
    pieceHeight,
  ]);

  useEffect(() => {
    makePositions();
  }, [makePositions]);

  const onRootLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setLayoutWidth(width);
    setLayoutHeight(height);
  };

  const movePiece = useCallback((id: string, x: number, y: number) => {
    setPositions((current) => {
      const item = current[id];

      if (!item || item.placed) return current;

      return {
        ...current,
        [id]: { ...item, x, y },
      };
    });
  }, []);

  const dropPiece = useCallback(
    (id: string, x: number, y: number) => {
      const piece = generatedPieces.find((item) => item.id === id);

      if (!piece) return;

      const currentPosition = positions[id];

      // 이미 맞춰진 조각은 다시 처리하지 않는다.
      if (!currentPosition || currentPosition.placed) return;

      const targetX = boardLeft + piece.column * cellWidth;
      const targetY = boardTop + piece.row * cellHeight;

      const targetCenterX = targetX + cellWidth / 2;
      const targetCenterY = targetY + cellHeight / 2;

      const pieceCenterX = x + pieceWidth / 2;
      const pieceCenterY = y + pieceHeight / 2;

      const snapDistanceX = Math.max(26, cellWidth * 0.34);
      const snapDistanceY = Math.max(26, cellHeight * 0.34);

      const isNearTarget =
        Math.abs(pieceCenterX - targetCenterX) < snapDistanceX &&
        Math.abs(pieceCenterY - targetCenterY) < snapDistanceY;

      if (isNearTarget) {
        setPositions((current) => {
          const item = current[id];

          if (!item || item.placed) return current;

          return {
            ...current,
            [id]: {
              x: targetX,
              y: targetY,
              placed: true,
            },
          };
        });

        setPlacedCount((count) => count + 1);
      } else {
        // 틀린 드롭 한 번마다 1회 추가한다.
        setWrongDropCount((count) => count + 1);
        movePiece(id, x, y);
      }
    },
    [
      generatedPieces,
      positions,
      boardLeft,
      boardTop,
      cellWidth,
      cellHeight,
      pieceWidth,
      pieceHeight,
      movePiece,
    ],
  );

  // 모든 조각을 맞춘 다음 한 번만 완료 콜백을 호출한다.
  // 드롭 처리 중 상태 변경과 완료 처리를 한꺼번에 실행하지 않는다.
  useEffect(() => {
    if (
      generatedPieces.length === 0 ||
      placedCount !== generatedPieces.length ||
      completeSent
    ) {
      return;
    }

    setCompleteSent(true);
    onComplete?.(wrongDropCount);
  }, [
    placedCount,
    generatedPieces.length,
    completeSent,
    wrongDropCount,
    onComplete,
  ]);

  return (
    <Root>
      <PlayArea onLayout={onRootLayout}>
        {isReady && (
          <>
            <BoardStage>
              <BoardCard
                boardWidth={boardWidth}
                boardHeight={calculatedBoardHeight}
              >
                <PuzzleTargetBoard
                  Artwork={Artwork}
                  viewBoxWidth={viewBoxWidth}
                  viewBoxHeight={viewBoxHeight}
                  pieces={generatedPieces}
                  rows={rows}
                  columns={columns}
                  width={boardWidth}
                  height={calculatedBoardHeight}
                />
              </BoardCard>
            </BoardStage>

            <Tray
              style={{
                left: trayX,
                top: trayY,
                width: trayWidth,
                height: trayHeight,
              }}
            >
              <TrayTitle>
                {placedCount === generatedPieces.length
                  ? i18n.t("puzzle_tray_complete") || "완성했어요! 정말 잘했어!"
                  : i18n.t("puzzle_tray_guide") ||
                    "조각을 끌어다가 그림에 맞춰보세요"}
              </TrayTitle>
            </Tray>

            <PlacedLayer
              pointerEvents="none"
              style={{
                left: boardLeft,
                top: boardTop,
                width: boardWidth,
                height: calculatedBoardHeight,
              }}
            >
              {pieces.map((piece) => {
                const position = positions[piece.id];

                if (!position || !position.placed) return null;

                return (
                  <PuzzlePiece
                    key={piece.id}
                    piece={piece}
                    Artwork={Artwork}
                    viewBoxWidth={viewBoxWidth}
                    viewBoxHeight={viewBoxHeight}
                    x={0}
                    y={0}
                    width={pieceWidth}
                    height={pieceHeight}
                    targetX={piece.column * cellWidth}
                    targetY={piece.row * cellHeight}
                    targetWidth={cellWidth}
                    targetHeight={cellHeight}
                    placed
                    onMove={movePiece}
                    onDrop={dropPiece}
                  />
                );
              })}
            </PlacedLayer>

            <BoardFrame
              pointerEvents="none"
              style={{
                left: boardLeft,
                top: boardTop,
                width: boardWidth,
                height: calculatedBoardHeight,
              }}
            />

            {pieces.map((piece) => {
              const position = positions[piece.id];

              if (!position || position.placed) return null;

              return (
                <PuzzlePiece
                  key={piece.id}
                  piece={piece}
                  Artwork={Artwork}
                  viewBoxWidth={viewBoxWidth}
                  viewBoxHeight={viewBoxHeight}
                  x={position.x}
                  y={position.y}
                  width={pieceWidth}
                  height={pieceHeight}
                  targetX={boardLeft + piece.column * cellWidth}
                  targetY={boardTop + piece.row * cellHeight}
                  targetWidth={cellWidth}
                  targetHeight={cellHeight}
                  placed={false}
                  onMove={movePiece}
                  onDrop={dropPiece}
                />
              );
            })}
          </>
        )}
      </PlayArea>
    </Root>
  );
}

const Root = styled.View`
  flex: 1;
  align-self: stretch;
  background-color: transparent;
`;

const PlayArea = styled.View`
  flex: 1;
  position: relative;
  overflow: hidden;
`;

const BoardStage = styled.View`
  padding-left: 16px;
  padding-right: 16px;
  padding-top: ${BOARD_STAGE_PADDING_TOP}px;
  align-items: center;
`;

const BoardCard = styled.View<{
  boardWidth: number;
  boardHeight: number;
}>`
  width: ${(p) => p.boardWidth}px;
  height: ${(p) => p.boardHeight}px;
  overflow: hidden;
  border-width: 3px;
  border-color: #39465d;
  border-radius: 20px;
  background-color: #ffffff;
  shadow-color: #39465d;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.16;
  shadow-radius: 7px;
  elevation: 4;
`;

const Tray = styled.View`
  position: absolute;
  border-radius: 26px;
  border-width: 3px;
  border-color: #39465d;
  background-color: #8ed6f2;
  padding-top: 12px;
  align-items: center;
`;

const PlacedLayer = styled.View`
  position: absolute;
  overflow: hidden;
  border-radius: 20px;
`;

const BoardFrame = styled.View`
  position: absolute;
  border-width: 3px;
  border-color: #39465d;
  border-radius: 20px;
`;

const TrayTitle = styled.Text`
  color: #39465d;
  font-size: 14px;
  font-weight: 800;
`;

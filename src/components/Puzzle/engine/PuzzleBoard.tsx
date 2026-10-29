///직선 퍼즐
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

// const DEFAULT_VIEWBOX_WIDTH = 240;
// const DEFAULT_VIEWBOX_HEIGHT = 180;

// const MIN_TRAY_HEIGHT = 172;
// const BOARD_STAGE_PADDING_TOP = 16;
// const BOARD_TRAY_GAP = 12;

// const TRAY_TITLE_AREA = 40;
// const TRAY_INNER_PADDING = 12;
// const PIECE_GAP = 10;

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
//   useLanguage();

//   const [layoutWidth, setLayoutWidth] = useState(0);
//   const [layoutHeight, setLayoutHeight] = useState(0);

//   const [pieces, setPieces] = useState<PuzzlePieceData[]>([]);
//   const [positions, setPositions] = useState<
//     Record<string, PuzzlePiecePosition>
//   >({});

//   const [placedCount, setPlacedCount] = useState(0);
//   const [zOrder, setZOrder] = useState<string[]>([]);
//   const [wrongDropCount, setWrongDropCount] = useState(0);
//   const [completeSent, setCompleteSent] = useState(false);

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

//   const boardLeft = (layoutWidth - boardWidth) / 2;
//   const boardTop = BOARD_STAGE_PADDING_TOP;

//   const isReady = layoutWidth > 0 && layoutHeight > 0 && boardWidth > 0;

//   const trayWidth = boardWidth;
//   const trayX = (layoutWidth - boardWidth) / 2;

//   const trayY =
//     BOARD_STAGE_PADDING_TOP + calculatedBoardHeight + BOARD_TRAY_GAP;

//   const trayHeight = Math.max(0, layoutHeight - trayY);

//   const generatedPieces = useMemo(
//     () => createPuzzlePieces(viewBoxWidth, viewBoxHeight, rows, columns),
//     [viewBoxWidth, viewBoxHeight, rows, columns],
//   );

//   const pieceLayout = useMemo(() => {
//     const count = generatedPieces.length;

//     const basePieceWidth = Math.max(34, cellWidth * 0.66);
//     const basePieceHeight = Math.max(28, cellHeight * 0.66);

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

//     return {
//       pieceWidth,
//       pieceHeight,
//       cols,
//       rowCount,
//       innerHeight,
//     };
//   }, [generatedPieces.length, cellWidth, cellHeight, trayWidth, trayHeight]);

//   const { pieceWidth, pieceHeight } = pieceLayout;

//   const makePositions = useCallback(() => {
//     if (!layoutWidth || !layoutHeight || !boardWidth || !trayHeight) {
//       return;
//     }

//     const { cols, rowCount, innerHeight } = pieceLayout;
//     const count = generatedPieces.length;
//     const shuffled = shuffleArray(generatedPieces);

//     const totalHeight = rowCount * pieceHeight + (rowCount - 1) * PIECE_GAP;

//     const startY =
//       trayY + TRAY_TITLE_AREA + Math.max(0, (innerHeight - totalHeight) / 2);

//     const next: Record<string, PuzzlePiecePosition> = {};

//     shuffled.forEach((piece, index) => {
//       const row = Math.floor(index / cols);
//       const col = index % cols;

//       const itemsInRow = row === rowCount - 1 ? count - row * cols : cols;

//       const rowWidth = itemsInRow * pieceWidth + (itemsInRow - 1) * PIECE_GAP;

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
//     setWrongDropCount(0);
//     setCompleteSent(false);

//     // 배열 뒤쪽에 있을수록 위에 렌더링한다.
//     setZOrder(shuffled.map((piece) => piece.id));
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

//   const onRootLayout = (event: LayoutChangeEvent) => {
//     const { width, height } = event.nativeEvent.layout;
//     setLayoutWidth(width);
//     setLayoutHeight(height);
//   };

//   const movePiece = useCallback((id: string, x: number, y: number) => {
//     setPositions((current) => {
//       const item = current[id];

//       if (!item || item.placed) return current;

//       return {
//         ...current,
//         [id]: { ...item, x, y },
//       };
//     });
//   }, []);

//   const bringToFront = useCallback((id: string) => {
//     setZOrder((current) => [
//       ...current.filter((pieceId) => pieceId !== id),
//       id,
//     ]);
//   }, []);

//   const dropPiece = useCallback(
//     (id: string, x: number, y: number): boolean => {
//       const piece = generatedPieces.find((item) => item.id === id);

//       if (!piece) return false;

//       const currentPosition = positions[id];

//       // 이미 정답을 맞춘 조각은 다시 처리하지 않는다.
//       if (!currentPosition || currentPosition.placed) return false;

//       // 마지막으로 드롭한 조각을 최상단으로 이동한다.
//       bringToFront(id);

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
//             [id]: {
//               x: targetX,
//               y: targetY,
//               placed: true,
//             },
//           };
//         });

//         setPlacedCount((count) => count + 1);

//         return true;
//       }

//       setWrongDropCount((count) => count + 1);
//       movePiece(id, x, y);

//       return false;
//     },
//     [
//       generatedPieces,
//       positions,
//       boardLeft,
//       boardTop,
//       cellWidth,
//       cellHeight,
//       pieceWidth,
//       pieceHeight,
//       movePiece,
//       bringToFront,
//     ],
//   );

//   useEffect(() => {
//     if (
//       generatedPieces.length === 0 ||
//       placedCount !== generatedPieces.length ||
//       completeSent
//     ) {
//       return;
//     }

//     setCompleteSent(true);
//     onComplete?.(wrongDropCount);
//   }, [
//     placedCount,
//     generatedPieces.length,
//     completeSent,
//     wrongDropCount,
//     onComplete,
//   ]);

//   // 드래그 가능한 조각은 이 배열에서만 렌더링한다.
//   const movablePieces = useMemo(
//     () =>
//       [...pieces]
//         .filter((piece) => {
//           const position = positions[piece.id];
//           return position && !position.placed;
//         })
//         .sort((a, b) => {
//           const aIndex = zOrder.indexOf(a.id);
//           const bIndex = zOrder.indexOf(b.id);
//           return aIndex - bIndex;
//         }),
//     [pieces, positions, zOrder],
//   );

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

//             <Tray
//               style={{
//                 left: trayX,
//                 top: trayY,
//                 width: trayWidth,
//                 height: trayHeight,
//               }}
//             >
//               <TrayTitle>
//                 {placedCount === generatedPieces.length
//                   ? i18n.t("puzzle_tray_complete") || "완성했어요! 정말 잘했어!"
//                   : i18n.t("puzzle_tray_guide") ||
//                     "조각을 끌어다가 그림에 맞춰보세요"}
//               </TrayTitle>
//             </Tray>

//             {/* 정답 조각 전용 레이어: 맞춘 조각만 표시한다. */}
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
//                     width={cellWidth}
//                     height={cellHeight}
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

//             {/* 보드 테두리 */}
//             <BoardFrame
//               pointerEvents="none"
//               style={{
//                 left: boardLeft,
//                 top: boardTop,
//                 width: boardWidth,
//                 height: calculatedBoardHeight,
//               }}
//             />

//             {/* 모든 미완성 조각은 같은 부모 안에서 렌더링한다.
//                 따라서 zOrder에 따라 드롭 후 앞뒤 순서가 유지된다. */}
//             <PieceLayer pointerEvents="box-none">
//               {movablePieces.map((piece) => {
//                 const position = positions[piece.id];

//                 if (!position) return null;

//                 return (
//                   <PuzzlePiece
//                     key={piece.id}
//                     piece={piece}
//                     Artwork={Artwork}
//                     viewBoxWidth={viewBoxWidth}
//                     viewBoxHeight={viewBoxHeight}
//                     x={position.x}
//                     y={position.y}
//                     width={pieceWidth}
//                     height={pieceHeight}
//                     targetX={boardLeft + piece.column * cellWidth}
//                     targetY={boardTop + piece.row * cellHeight}
//                     targetWidth={cellWidth}
//                     targetHeight={cellHeight}
//                     placed={false}
//                     onMove={movePiece}
//                     onDrop={dropPiece}
//                   />
//                 );
//               })}
//             </PieceLayer>
//           </>
//         )}
//       </PlayArea>
//     </Root>
//   );
// }

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

// const Tray = styled.View`
//   position: absolute;
//   border-radius: 26px;
//   border-width: 3px;
//   border-color: #39465d;
//   background-color: #8ed6f2;
//   padding-top: 12px;
//   align-items: center;
// `;

// const PlacedLayer = styled.View`
//   position: absolute;
//   overflow: hidden;
//   border-radius: 20px;
// `;

// const BoardFrame = styled.View`
//   position: absolute;
//   border-width: 3px;
//   border-color: #39465d;
//   border-radius: 20px;
// `;

// const PieceLayer = styled.View`
//   position: absolute;
//   left: 0px;
//   top: 0px;
//   right: 0px;
//   bottom: 0px;
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

const PIECE_GAP = 6;

export default function PuzzleBoard({
  Artwork,

  viewBoxWidth = DEFAULT_VIEWBOX_WIDTH,

  viewBoxHeight = DEFAULT_VIEWBOX_HEIGHT,

  rows = 2,

  columns = 2,

  boardAspectRatio = viewBoxWidth / viewBoxHeight,

  onComplete,

  title = "그림 퍼즐 맞추기",

  onWrongDropCountChange,
}: PuzzleBoardProps) {
  useLanguage();

  const [layoutWidth, setLayoutWidth] = useState(0);

  const [layoutHeight, setLayoutHeight] = useState(0);

  const [pieces, setPieces] = useState<PuzzlePieceData[]>([]);

  const [positions, setPositions] = useState<
    Record<string, PuzzlePiecePosition>
  >({});

  const [placedCount, setPlacedCount] = useState(0);

  const [zOrder, setZOrder] = useState<string[]>([]);

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

    const first = generatedPieces[0];

    const marginRatioX = first ? first.margin / first.sourceWidth : 0;

    const marginRatioY = first ? first.margin / first.sourceHeight : 0;

    const basePieceWidth = Math.max(34, cellWidth * 0.66);

    const basePieceHeight = Math.max(28, cellHeight * 0.66);

    const innerWidth = Math.max(0, trayWidth - TRAY_INNER_PADDING * 2);

    const innerHeight = Math.max(
      0,

      trayHeight - TRAY_TITLE_AREA - TRAY_INNER_PADDING,
    );

    let pieceWidth = basePieceWidth;

    let pieceHeight = basePieceHeight;

    let marginX = pieceWidth * marginRatioX;

    let marginY = pieceHeight * marginRatioY;

    let footW = pieceWidth + marginX * 2;

    let footH = pieceHeight + marginY * 2;

    let cols = 1;

    let rowCount = count;

    for (let scale = 1; scale >= 0.3; scale -= 0.05) {
      pieceWidth = basePieceWidth * scale;

      pieceHeight = basePieceHeight * scale;

      marginX = pieceWidth * marginRatioX;

      marginY = pieceHeight * marginRatioY;

      footW = pieceWidth + marginX * 2;

      footH = pieceHeight + marginY * 2;

      cols = Math.max(
        1,

        Math.floor((innerWidth + PIECE_GAP) / (footW + PIECE_GAP)),
      );

      rowCount = Math.ceil(count / cols);

      const neededHeight = rowCount * footH + (rowCount - 1) * PIECE_GAP;

      if (neededHeight <= innerHeight) break;
    }

    return {
      pieceWidth,

      pieceHeight,

      marginX,

      marginY,

      footW,

      footH,

      cols,

      rowCount,

      innerHeight,
    };
  }, [generatedPieces, cellWidth, cellHeight, trayWidth, trayHeight]);

  const { pieceWidth, pieceHeight } = pieceLayout;

  const makePositions = useCallback(() => {
    if (!layoutWidth || !layoutHeight || !boardWidth || !trayHeight) {
      return;
    }

    const { cols, rowCount, innerHeight, footW, footH, marginX, marginY } =
      pieceLayout;

    const count = generatedPieces.length;

    const shuffled = shuffleArray(generatedPieces);

    const totalHeight = rowCount * footH + (rowCount - 1) * PIECE_GAP;

    const startY =
      trayY + TRAY_TITLE_AREA + Math.max(0, (innerHeight - totalHeight) / 2);

    const next: Record<string, PuzzlePiecePosition> = {};

    shuffled.forEach((piece, index) => {
      const row = Math.floor(index / cols);

      const col = index % cols;

      const itemsInRow = row === rowCount - 1 ? count - row * cols : cols;

      const rowWidth = itemsInRow * footW + (itemsInRow - 1) * PIECE_GAP;

      const startX = trayX + (trayWidth - rowWidth) / 2;

      next[piece.id] = {
        x: startX + col * (footW + PIECE_GAP) + marginX,

        y: startY + row * (footH + PIECE_GAP) + marginY,

        placed: false,
      };
    });

    setPieces(generatedPieces);

    setPositions(next);

    setPlacedCount(0);

    setWrongDropCount(0);

    setCompleteSent(false);

    setZOrder(shuffled.map((piece) => piece.id));
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
  ]);

  useEffect(() => {
    makePositions();
  }, [makePositions]);

  // wrongDropCount 변경 시 부모 컴포넌트에 안전하게 알림 (렌더 사이클 분리)

  useEffect(() => {
    if (wrongDropCount >= 0 && onWrongDropCountChange) {
      onWrongDropCountChange(wrongDropCount);
    }
  }, [wrongDropCount, onWrongDropCountChange]);

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

  const bringToFront = useCallback((id: string) => {
    setZOrder((current) => [
      ...current.filter((pieceId) => pieceId !== id),

      id,
    ]);
  }, []);

  const dropPiece = useCallback(
    (id: string, x: number, y: number): boolean => {
      const piece = generatedPieces.find((item) => item.id === id);

      if (!piece) return false;

      const currentPosition = positions[id];

      if (!currentPosition || currentPosition.placed) return false;

      bringToFront(id);

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

        return true;
      }

      // 틀렸을 때 내부 상태만 업데이트 (부모 setState 호출은 useEffect로 위임)

      setWrongDropCount((prev) => prev + 1);

      movePiece(id, x, y);

      return false;
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

      bringToFront,
    ],
  );

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

  const movablePieces = useMemo(
    () =>
      [...pieces]

        .filter((piece) => {
          const position = positions[piece.id];

          return position && !position.placed;
        })

        .sort((a, b) => {
          const aIndex = zOrder.indexOf(a.id);

          const bIndex = zOrder.indexOf(b.id);

          return aIndex - bIndex;
        }),

    [pieces, positions, zOrder],
  );

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
                    width={cellWidth}
                    height={cellHeight}
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

            <PieceLayer pointerEvents="box-none">
              {movablePieces.map((piece) => {
                const position = positions[piece.id];

                if (!position) return null;

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
            </PieceLayer>
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

// 테두리는 별도의 BoardFrame이 그리므로, 이 카드에는 테두리 공간을 만들지 않는다.
// Visible outline is drawn by the absolute BoardFrame overlay.
const BoardCard = styled.View<{
  boardWidth: number;

  boardHeight: number;
}>`
  width: ${(p) => p.boardWidth}px;

  height: ${(p) => p.boardHeight}px;

  overflow: hidden;

  border-width: 0px;

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

const PieceLayer = styled.View`
  position: absolute;

  left: 0px;

  top: 0px;

  right: 0px;

  bottom: 0px;
`;

const TrayTitle = styled.Text`
  color: #39465d;

  font-size: 14px;

  font-weight: 800;
`;

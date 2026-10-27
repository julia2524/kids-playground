import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  LayoutChangeEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PuzzlePiece from "./PuzzlePiece";
import PuzzleTargetBoard from "./PuzzleTargetBoard";
import { createPuzzlePieces, shuffleArray } from "./puzzleGenerator";
import type {
  PuzzleBoardProps,
  PuzzlePieceData,
  PuzzlePiecePosition,
} from "./puzzleTypes";

const DEFAULT_VIEWBOX_WIDTH = 240;
const DEFAULT_VIEWBOX_HEIGHT = 180;
const TRAY_HEIGHT = 172;

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
  const [layoutWidth, setLayoutWidth] = useState(0);
  const [boardTop, setBoardTop] = useState(0);
  const [trayTop, setTrayTop] = useState(0);
  const [boardLeft, setBoardLeft] = useState(0);
  const [pieces, setPieces] = useState<PuzzlePieceData[]>([]);
  const [positions, setPositions] = useState<
    Record<string, PuzzlePiecePosition>
  >({});
  const [placedCount, setPlacedCount] = useState(0);
  const [completeSent, setCompleteSent] = useState(false);

  const boardWidth = Math.max(0, Math.min(layoutWidth - 32, 520));
  const calculatedBoardHeight =
    boardWidth > 0 ? boardWidth / boardAspectRatio : 0;
  const cellWidth = columns > 0 ? boardWidth / columns : 0;
  const cellHeight = rows > 0 ? calculatedBoardHeight / rows : 0;
  const pieceWidth = Math.max(34, cellWidth * 0.66);
  const pieceHeight = Math.max(28, cellHeight * 0.66);

  const generatedPieces = useMemo(
    () => createPuzzlePieces(viewBoxWidth, viewBoxHeight, rows, columns),
    [viewBoxWidth, viewBoxHeight, rows, columns],
  );
  const makePositions = useCallback(() => {
    if (!layoutWidth || !boardWidth || !calculatedBoardHeight) return;

    const shuffled = shuffleArray(generatedPieces);

    const horizontalPadding = 12;
    const horizontalGap = 12;
    const verticalGap = 12;

    const usableWidth = layoutWidth - horizontalPadding * 2;

    // 조각이 서로 겹치지 않도록 한 줄에 들어갈 수 있는 개수 계산
    const colCount = Math.max(
      1,
      Math.floor((usableWidth + horizontalGap) / (pieceWidth + horizontalGap)),
    );

    const next: Record<string, PuzzlePiecePosition> = {};

    // 트레이의 제목 아래부터 조각 배치
    const trayContentTop = trayTop + 42;

    shuffled.forEach((piece, index) => {
      const row = Math.floor(index / colCount);
      const col = index % colCount;

      const x = horizontalPadding + col * (pieceWidth + horizontalGap);

      const y = trayContentTop + row * (pieceHeight + verticalGap);

      next[piece.id] = {
        x: Math.max(0, Math.min(layoutWidth - pieceWidth, x)),
        y,
        placed: false,
      };
    });

    setPieces(generatedPieces);
    setPositions(next);
    setPlacedCount(0);
    setCompleteSent(false);
  }, [
    layoutWidth,
    boardWidth,
    calculatedBoardHeight,
    generatedPieces,
    pieceWidth,
    pieceHeight,
    trayTop,
  ]);
  useEffect(() => {
    makePositions();
  }, [makePositions]);

  const onRootLayout = (event: LayoutChangeEvent) => {
    setLayoutWidth(event.nativeEvent.layout.width);
  };

  const onBoardLayout = (event: LayoutChangeEvent) => {
    setBoardTop(event.nativeEvent.layout.y);
    setBoardLeft(event.nativeEvent.layout.x);
  };

  const onTrayLayout = (event: LayoutChangeEvent) => {
    setTrayTop(event.nativeEvent.layout.y);
  };

  const movePiece = useCallback((id: string, x: number, y: number) => {
    setPositions((current) => {
      const item = current[id];
      if (!item || item.placed) return current;
      return { ...current, [id]: { ...item, x, y } };
    });
  }, []);

  const dropPiece = useCallback(
    (id: string, x: number, y: number) => {
      const piece = generatedPieces.find((item) => item.id === id);
      if (!piece) return;

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
            [id]: { x: targetX, y: targetY, placed: true },
          };
        });
        setPlacedCount((count) => {
          const next = count + 1;
          if (next === generatedPieces.length && !completeSent) {
            setCompleteSent(true);
            onComplete?.();
          }
          return next;
        });
      } else {
        movePiece(id, x, y);
      }
    },
    [
      generatedPieces,
      boardLeft,
      boardTop,
      cellWidth,
      cellHeight,
      pieceWidth,
      pieceHeight,
      movePiece,
      completeSent,
      onComplete,
    ],
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* <View style={styles.header}>
        <View style={styles.headerSpacer} />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.headerSpacer} />
      </View> */}

      <View style={styles.playArea} onLayout={onRootLayout}>
        <View style={styles.boardStage}>
          <View
            onLayout={onBoardLayout}
            style={[
              styles.boardCard,
              {
                width: boardWidth || "92%",
                aspectRatio: boardAspectRatio,
                opacity: 1,
              },
            ]}
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
          </View>
        </View>

        <View onLayout={onTrayLayout} style={styles.tray}>
          <Text style={styles.trayTitle}>
            {placedCount === generatedPieces.length
              ? "완성했어요! 정말 잘했어!"
              : "조각을 끌어다가 그림에 맞춰보세요"}
          </Text>
        </View>

        {pieces.map((piece) => {
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
              placed={position.placed}
              onMove={movePiece}
              onDrop={dropPiece}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFF9F0",
  },
  header: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  headerSpacer: { width: 30 },
  title: {
    color: "#39465D",
    fontSize: 19,
    fontWeight: "800",
  },
  playArea: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
  },
  boardStage: {
    paddingHorizontal: 16,
    paddingTop: 16,
    alignItems: "center",
  },
  boardCard: {
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#39465D",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#39465D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 7,
    elevation: 4,
  },
  tray: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: TRAY_HEIGHT,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderColor: "#39465D",
    backgroundColor: "#8ED6F2",
    paddingTop: 12,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  trayTitle: {
    color: "#39465D",
    fontSize: 14,
    fontWeight: "800",
  },
});

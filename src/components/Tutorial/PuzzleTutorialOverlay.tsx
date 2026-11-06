import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import styled from "styled-components/native";
import {
  PuzzleArtworkComponent,
  PuzzlePieceData,
} from "../Puzzle/engine/puzzleTypes";
import HandPointer from "../../design-system/ui/HandPointer";
import { PieceArtwork } from "../Puzzle/engine/PuzzlePiece";

type Point = { x: number; y: number };

interface Props {
  visible: boolean;
  piece: PuzzlePieceData;
  Artwork: PuzzleArtworkComponent;
  viewBoxWidth: number;
  viewBoxHeight: number;
  from: Point; // 조각 기본 칸의 좌상단 (돌기 제외)
  to: Point; // 목표 지점에서 같은 기준의 좌상단
  width: number; // 조각 기본 칸 크기
  height: number;
}

export default function PuzzleTutorialOverlay({
  visible,
  piece,
  Artwork,
  viewBoxWidth,
  viewBoxHeight,
  from,
  to,
  width,
  height,
}: Props) {
  const progress = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  //무한 재생
  // useEffect(() => {
  //   progress.setValue(0);
  //   opacity.setValue(0);
  //   if (!visible) return;

  //   const loop = Animated.loop(
  //     Animated.sequence([
  //       Animated.timing(opacity, {
  //         toValue: 1,
  //         duration: 250,
  //         useNativeDriver: true,
  //       }),
  //       Animated.delay(350),
  //       Animated.timing(progress, {
  //         toValue: 1,
  //         duration: 1300,
  //         easing: Easing.inOut(Easing.ease),
  //         useNativeDriver: true,
  //       }),
  //       Animated.delay(300),
  //       Animated.timing(opacity, {
  //         toValue: 0,
  //         duration: 250,
  //         useNativeDriver: true,
  //       }),
  //       Animated.delay(600),
  //       // 다음 반복을 위해 처음 위치로 되돌림
  //       Animated.timing(progress, {
  //         toValue: 0,
  //         duration: 0,
  //         useNativeDriver: true,
  //       }),
  //     ]),
  //   );

  //   loop.start();
  //   return () => {
  //     loop.stop();
  //     progress.setValue(0);
  //     opacity.setValue(0);
  //   };
  // }, [visible, from.x, from.y, to.x, to.y, progress, opacity]);

  useEffect(() => {
    progress.setValue(0);
    opacity.setValue(0);
    if (!visible) return;

    // 한 번만 실행되는 애니메이션 시퀀스
    const tutorialAnimation = Animated.sequence([
      // 1. 페이드 인
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.delay(350),
      // 2. 출발지 -> 목적지로 이동
      Animated.timing(progress, {
        toValue: 1,
        duration: 1300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.delay(300),
      // 3. 페이드 아웃
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]);

    tutorialAnimation.start();

    return () => {
      tutorialAnimation.stop();
      progress.setValue(0);
      opacity.setValue(0);
    };
  }, [visible, from.x, from.y, to.x, to.y, progress, opacity]);
  if (!visible || width <= 0 || height <= 0) return null;

  // PuzzlePiece 와 동일한 방식으로 돌기 여유 공간 계산
  const marginX = (piece.margin * width) / piece.sourceWidth;
  const marginY = (piece.margin * height) / piece.sourceHeight;
  const pxToSrc = piece.sourceWidth / Math.max(1, width);
  const viewBox = `${piece.sourceX - piece.margin} ${piece.sourceY - piece.margin} ${
    piece.sourceWidth + piece.margin * 2
  } ${piece.sourceHeight + piece.margin * 2}`;

  const groupW = width + marginX * 2;
  const groupH = height + marginY * 2;

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [from.x, to.x],
  });
  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [from.y, to.y],
  });

  return (
    <Overlay pointerEvents="none">
      <Moving
        style={{
          left: -marginX,
          top: -marginY,
          width: groupW,
          height: groupH,
          opacity,
          transform: [{ translateX }, { translateY }],
        }}
      >
        <PieceArtwork
          piece={piece}
          Artwork={Artwork}
          viewBoxWidth={viewBoxWidth}
          viewBoxHeight={viewBoxHeight}
          viewBox={viewBox}
          clipId={`tutorial-clip-${piece.id}`}
          placed={false}
          pxToSrc={pxToSrc}
        />
        <HandContainer style={{ left: groupW / 2 - 14, top: groupH / 2 - 6 }}>
          <HandPointer size={54} tapping={false} />
        </HandContainer>
      </Moving>
    </Overlay>
  );
}

const Overlay = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  elevation: 2000;
`;

const Moving = styled(Animated.View)`
  position: absolute;
`;

const HandContainer = styled.View`
  position: absolute;
`;

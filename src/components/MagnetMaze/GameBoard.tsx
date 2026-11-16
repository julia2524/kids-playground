import React from "react";
import { type LayoutChangeEvent } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import styled from "styled-components/native";

import type { PhysicsShared } from "../../games/magnetMaze/physics/physicsTypes";
import { movePen } from "../../games/magnetMaze/physics/physicsEngine";

type Props = {
  s: PhysicsShared;
  margin: number;
  mazeW: number;
  mazeH: number;
  onBoardLayout: (width: number, height: number) => void;
  children: React.ReactNode;
};

export function GameBoard({
  s,
  margin,
  mazeW,
  mazeH,
  onBoardLayout,
  children,
}: Props) {
  const pan = Gesture.Pan()
    .minDistance(0)

    // 손가락이 처음 닿는 순간 펜 생성
    .onTouchesDown((e) => {
      "worklet";

      const touch = e.changedTouches[0];

      if (!touch) return;

      movePen(s, touch.x - margin, touch.y - margin, true);
    })

    // 손가락을 움직이는 동안 펜 이동
    .onUpdate((e) => {
      "worklet";

      movePen(s, e.x - margin, e.y - margin, false);
    })

    // 손가락을 떼면 펜 비활성화
    .onFinalize(() => {
      "worklet";
      s.penActive.value = 0;
    });

  const onLayout = (ev: LayoutChangeEvent) => {
    const { width, height } = ev.nativeEvent.layout;
    onBoardLayout(width, height);
  };

  return (
    <StyledFrame>
      <GestureDetector gesture={pan}>
        <StyledBoard onLayout={onLayout}>
          <MazeLayer
            style={{
              left: margin,
              top: margin,
              width: mazeW,
              height: mazeH,
            }}
          >
            {children}
          </MazeLayer>
        </StyledBoard>
      </GestureDetector>
    </StyledFrame>
  );
}

const StyledFrame = styled.View`
  flex: 1;
  border-radius: 24px;
  border-width: 4px;
  border-color: #d8d2f1;
  background-color: #ffffff;
  overflow: hidden;
  elevation: 2;
  shadow-color: #7c5cff;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 6px;
`;

const StyledBoard = styled.View`
  flex: 1;
`;

const MazeLayer = styled.View`
  position: absolute;
`;

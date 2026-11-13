import React from "react";
import { type LayoutChangeEvent } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import styled from "styled-components/native";

import type { PhysicsShared } from "../../games/magnetMaze/physics/physicsTypes";
import { movePen } from "../../games/magnetMaze/physics/physicsEngine";

type Props = {
  s: PhysicsShared;
  /** 투명 여유 공간 두께(px). 미로는 보드 안쪽으로 이만큼 들어가 있다 */
  margin: number;
  /** 실제 미로 크기(px). 0 이면 아직 측정 전 */
  mazeW: number;
  mazeH: number;
  /** 눈에 보이는 게임판(터치를 받는 영역) 크기 */
  onBoardLayout: (width: number, height: number) => void;
  children: React.ReactNode;
};

/**
 * 게임판.
 *  - 터치는 "눈에 보이는 게임판 전체"(투명 여유 공간 포함)에서 받는다.
 *  - Gesture Handler 의 e.x / e.y 는 이 View 기준이므로, 미로 기준 좌표로 쓰려면 margin 만 빼면 된다.
 *  - children(벽/구슬/펜)은 미로 사각형 레이어 안에 그려서 물리 좌표와 그림 좌표를 일치시킨다.
 *    (레이어는 overflow 를 자르지 않아서 펜이 여유 공간까지 그려진다. 바깥은 프레임이 자른다)
 *
 * 테두리는 바깥 View(Frame)가 가지고, 입력/좌표 기준은 안쪽 View 가 가진다.
 */
export function GameBoard({
  s,
  margin,
  mazeW,
  mazeH,
  onBoardLayout,
  children,
}: Props) {
  const pan = Gesture.Pan()
    .minDistance(0) // 터치하자마자 반응
    .onBegin((e) => {
      "worklet";
      movePen(s, e.x - margin, e.y - margin, true);
    })
    .onUpdate((e) => {
      "worklet";
      movePen(s, e.x - margin, e.y - margin, false);
    })
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

// 외곽 테두리/배경은 추후 디자인 개선 예정. 우선 Kids Playground 보라 계열 토큰으로 맞춤.
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

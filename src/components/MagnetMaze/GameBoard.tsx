// import React from "react";
// import { type LayoutChangeEvent } from "react-native";
// import { Gesture, GestureDetector } from "react-native-gesture-handler";
// import styled from "styled-components/native";

// import type { PhysicsShared } from "../../games/magnetMaze/physics/physicsTypes";
// import { movePen } from "../../games/magnetMaze/physics/physicsEngine";

// type Props = {
//   s: PhysicsShared;
//   margin: number;
//   mazeW: number;
//   mazeH: number;
//   onBoardLayout: (width: number, height: number) => void;
//   children: React.ReactNode;
// };

// export function GameBoard({
//   s,
//   margin,
//   mazeW,
//   mazeH,
//   onBoardLayout,
//   children,
// }: Props) {
//   const pan = Gesture.Pan()
//     .minDistance(0)

//     // 손가락이 처음 닿는 순간 펜 생성
//     .onTouchesDown((e) => {
//       "worklet";

//       const touch = e.changedTouches[0];

//       if (!touch) return;

//       movePen(s, touch.x - margin, touch.y - margin, true);
//     })

//     // 손가락을 움직이는 동안 펜 이동
//     .onUpdate((e) => {
//       "worklet";

//       movePen(s, e.x - margin, e.y - margin, false);
//     })

//     // 손가락을 떼면 펜 비활성화
//     .onFinalize(() => {
//       "worklet";
//       s.penActive.value = 0;
//     });

//   const onLayout = (ev: LayoutChangeEvent) => {
//     const { width, height } = ev.nativeEvent.layout;
//     onBoardLayout(width, height);
//   };

//   return (
//     <StyledFrame>
//       <GestureDetector gesture={pan}>
//         <StyledBoard onLayout={onLayout}>
//           <MazeLayer
//             style={{
//               left: margin,
//               top: margin,
//               width: mazeW,
//               height: mazeH,
//             }}
//           >
//             {children}
//           </MazeLayer>
//         </StyledBoard>
//       </GestureDetector>
//     </StyledFrame>
//   );
// }

// const StyledFrame = styled.View`
//   flex: 1;
//   border-radius: 24px;
//   border-width: 4px;
//   border-color: #d8d2f1;
//   background-color: #ffffff;
//   overflow: hidden;
//   elevation: 2;
//   shadow-color: #7c5cff;
//   shadow-offset: 0px 2px;
//   shadow-opacity: 0.08;
//   shadow-radius: 6px;
// `;

// const StyledBoard = styled.View`
//   flex: 1;
// `;

// const MazeLayer = styled.View`
//   position: absolute;
// `;

import React from "react";

import { StyleSheet, type LayoutChangeEvent } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import Svg, {
  Circle,
  Defs,
  Ellipse,
  Path,
  RadialGradient,
  Stop,
} from "react-native-svg";

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

function CosmicBackground() {
  return (
    <>
      {/* 기본 우주 그라데이션 */}
      <LinearGradient
        colors={["#211342", "#493080", "#7655D8", "#35205F"]}
        locations={[0, 0.35, 0.7, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* 성운과 별빛 */}
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      >
        <Defs>
          {/* 푸른빛 성운 */}
          <RadialGradient id="blueNebula" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#70B9FF" stopOpacity="0.55" />
            <Stop offset="45%" stopColor="#6788FF" stopOpacity="0.25" />
            <Stop offset="100%" stopColor="#6788FF" stopOpacity="0" />
          </RadialGradient>

          {/* 핑크빛 성운 */}
          <RadialGradient id="pinkNebula" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#FF9DE2" stopOpacity="0.48" />
            <Stop offset="50%" stopColor="#D77BFF" stopOpacity="0.2" />
            <Stop offset="100%" stopColor="#D77BFF" stopOpacity="0" />
          </RadialGradient>

          {/* 보랏빛 성운 */}
          <RadialGradient id="purpleNebula" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#B69AFF" stopOpacity="0.5" />
            <Stop offset="55%" stopColor="#916BFF" stopOpacity="0.2" />
            <Stop offset="100%" stopColor="#916BFF" stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* 성운 레이어 */}
        <Ellipse cx="170" cy="180" rx="270" ry="190" fill="url(#blueNebula)" />

        <Ellipse cx="820" cy="300" rx="280" ry="210" fill="url(#pinkNebula)" />

        <Ellipse
          cx="500"
          cy="850"
          rx="350"
          ry="220"
          fill="url(#purpleNebula)"
        />

        <Ellipse
          cx="100"
          cy="720"
          rx="220"
          ry="280"
          fill="url(#pinkNebula)"
          opacity="0.55"
        />

        {/* 작은 별들 */}
        {[
          [75, 90, 2.2],
          [180, 310, 1.8],
          [290, 120, 1.5],
          [390, 260, 2],
          [520, 100, 1.7],
          [660, 210, 2.2],
          [820, 110, 1.8],
          [920, 250, 2],
          [120, 480, 1.7],
          [270, 590, 2.1],
          [440, 450, 1.5],
          [580, 580, 2],
          [760, 470, 1.7],
          [910, 620, 2.2],
          [150, 850, 2],
          [350, 900, 1.6],
          [620, 820, 2.1],
          [850, 900, 1.8],
        ].map(([cx, cy, r], index) => (
          <Circle
            key={index}
            cx={cx}
            cy={cy}
            r={r}
            fill="#FFFFFF"
            opacity={index % 3 === 0 ? 0.95 : 0.6}
          />
        ))}

        {/* 크게 반짝이는 별 */}
        {/* <Path
          d="M 740 140 Q 745 170 770 175 Q 745 180 740 210 Q 735 180 710 175 Q 735 170 740 140 Z"
          fill="#FFFFFF"
          opacity="0.9"
        />

        <Path
          d="M 250 760 Q 254 780 270 784 Q 254 788 250 808 Q 246 788 230 784 Q 246 780 250 760 Z"
          fill="#DCCBFF"
          opacity="0.85"
        />

        <Path
          d="M 880 760 Q 883 774 895 777 Q 883 780 880 794 Q 877 780 865 777 Q 877 774 880 760 Z"
          fill="#FFFFFF"
          opacity="0.8"
        /> */}

        {/* 작은 빛 점 */}
        <Circle cx="740" cy="175" r="2.5" fill="#FFFFFF" />
        <Circle cx="250" cy="784" r="2" fill="#FFFFFF" />
        <Circle cx="880" cy="777" r="1.8" fill="#FFFFFF" />
      </Svg>
    </>
  );
}

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
    .onTouchesDown((e) => {
      "worklet";
      const touch = e.changedTouches[0];
      if (!touch) return;
      movePen(s, touch.x - margin, touch.y - margin, true);
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
      <CosmicBackground />

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
  background-color: #493080;
  overflow: hidden;
  elevation: 2;
  shadow-color: #7c5cff;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 6px;
`;

const StyledBoard = styled.View`
  flex: 1;
  background-color: transparent;
`;

const MazeLayer = styled.View`
  position: absolute;
`;

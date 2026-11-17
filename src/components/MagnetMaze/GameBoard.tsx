// import React from "react";

// import { StyleSheet, type LayoutChangeEvent } from "react-native";

// import { LinearGradient } from "expo-linear-gradient";

// import Svg, {
//   Circle,
//   Defs,
//   Ellipse,
//   Path,
//   RadialGradient,
//   Stop,
// } from "react-native-svg";

// import { Gesture, GestureDetector } from "react-native-gesture-handler";

// import { runOnJS, type SharedValue } from "react-native-reanimated";

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
//   /** 1 = Level 1 자동 시연 중. 터치 시 즉시 0 으로 내리고 실제 조작으로 전환 */
//   tutorialActive?: SharedValue<number>;
//   /** 시연이 사용자 터치로 끊겼을 때 JS 쪽 타이머 등 동기화 */
//   onTutorialInterrupted?: () => void;
// };

// function CosmicBackground() {
//   return (
//     <>
//       {/* 기본 우주 그라데이션 */}
//       <LinearGradient
//         colors={["#211342", "#493080", "#7655D8", "#35205F"]}
//         locations={[0, 0.35, 0.7, 1]}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={StyleSheet.absoluteFill}
//       />

//       {/* 성운과 별빛 */}
//       <Svg
//         width="100%"
//         height="100%"
//         viewBox="0 0 1000 1000"
//         preserveAspectRatio="xMidYMid slice"
//         style={StyleSheet.absoluteFill}
//         pointerEvents="none"
//       >
//         <Defs>
//           {/* 푸른빛 성운 */}
//           <RadialGradient id="blueNebula" cx="50%" cy="50%" r="50%">
//             <Stop offset="0%" stopColor="#70B9FF" stopOpacity="0.55" />
//             <Stop offset="45%" stopColor="#6788FF" stopOpacity="0.25" />
//             <Stop offset="100%" stopColor="#6788FF" stopOpacity="0" />
//           </RadialGradient>

//           {/* 핑크빛 성운 */}
//           <RadialGradient id="pinkNebula" cx="50%" cy="50%" r="50%">
//             <Stop offset="0%" stopColor="#FF9DE2" stopOpacity="0.48" />
//             <Stop offset="50%" stopColor="#D77BFF" stopOpacity="0.2" />
//             <Stop offset="100%" stopColor="#D77BFF" stopOpacity="0" />
//           </RadialGradient>

//           {/* 보랏빛 성운 */}
//           <RadialGradient id="purpleNebula" cx="50%" cy="50%" r="50%">
//             <Stop offset="0%" stopColor="#B69AFF" stopOpacity="0.5" />
//             <Stop offset="55%" stopColor="#916BFF" stopOpacity="0.2" />
//             <Stop offset="100%" stopColor="#916BFF" stopOpacity="0" />
//           </RadialGradient>
//         </Defs>

//         {/* 성운 레이어 */}
//         <Ellipse cx="170" cy="180" rx="270" ry="190" fill="url(#blueNebula)" />

//         <Ellipse cx="820" cy="300" rx="280" ry="210" fill="url(#pinkNebula)" />

//         <Ellipse
//           cx="500"
//           cy="850"
//           rx="350"
//           ry="220"
//           fill="url(#purpleNebula)"
//         />

//         <Ellipse
//           cx="100"
//           cy="720"
//           rx="220"
//           ry="280"
//           fill="url(#pinkNebula)"
//           opacity="0.55"
//         />

//         {/* 작은 별들 */}
//         {[
//           [75, 90, 2.2],
//           [180, 310, 1.8],
//           [290, 120, 1.5],
//           [390, 260, 2],
//           [520, 100, 1.7],
//           [660, 210, 2.2],
//           [820, 110, 1.8],
//           [920, 250, 2],
//           [120, 480, 1.7],
//           [270, 590, 2.1],
//           [440, 450, 1.5],
//           [580, 580, 2],
//           [760, 470, 1.7],
//           [910, 620, 2.2],
//           [150, 850, 2],
//           [350, 900, 1.6],
//           [620, 820, 2.1],
//           [850, 900, 1.8],
//         ].map(([cx, cy, r], index) => (
//           <Circle
//             key={index}
//             cx={cx}
//             cy={cy}
//             r={r}
//             fill="#FFFFFF"
//             opacity={index % 3 === 0 ? 0.95 : 0.6}
//           />
//         ))}

//         {/* 작은 빛 점 */}
//         <Circle cx="740" cy="175" r="2.5" fill="#FFFFFF" />
//         <Circle cx="250" cy="784" r="2" fill="#FFFFFF" />
//         <Circle cx="880" cy="777" r="1.8" fill="#FFFFFF" />
//       </Svg>
//     </>
//   );
// }

// export function GameBoard({
//   s,
//   margin,
//   mazeW,
//   mazeH,
//   onBoardLayout,
//   children,
//   tutorialActive,
//   onTutorialInterrupted,
// }: Props) {
//   const pan = Gesture.Pan()
//     .minDistance(0)
//     .onTouchesDown((e) => {
//       "worklet";
//       const touch = e.changedTouches[0];
//       if (!touch) return;

//       // 아이의 터치가 자동 시연보다 항상 우선
//       if (tutorialActive && tutorialActive.value === 1) {
//         tutorialActive.value = 0;
//         if (onTutorialInterrupted) {
//           runOnJS(onTutorialInterrupted)();
//         }
//       }

//       movePen(s, touch.x - margin, touch.y - margin, true);
//     })
//     .onUpdate((e) => {
//       "worklet";
//       // 시연이 이미 끊긴 뒤에도 드래그는 그대로 실제 조작
//       if (tutorialActive && tutorialActive.value === 1) {
//         tutorialActive.value = 0;
//         if (onTutorialInterrupted) {
//           runOnJS(onTutorialInterrupted)();
//         }
//       }
//       movePen(s, e.x - margin, e.y - margin, false);
//     })
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
//       <CosmicBackground />

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
//   background-color: #493080;
//   overflow: hidden;
//   elevation: 2;
//   shadow-color: #7c5cff;
//   shadow-offset: 0px 2px;
//   shadow-opacity: 0.08;
//   shadow-radius: 6px;
// `;

// const StyledBoard = styled.View`
//   flex: 1;
//   background-color: transparent;
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

import { runOnJS, type SharedValue } from "react-native-reanimated";

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
  /** 1 = Level 1 자동 시연 중. 터치 시 즉시 0 으로 내리고 실제 조작으로 전환 */
  tutorialActive?: SharedValue<number>;
  /** 시연이 사용자 터치로 끊겼을 때 JS 쪽 타이머 등 동기화 */
  onTutorialInterrupted?: () => void;
  /** 자석펜을 처음 잡는 순간 (grab 효과음 + 햅틱용). 라운드 확정 후 터치나 멀티터치는 호출하지 않는다 */
  onGrab?: () => void;
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
  tutorialActive,
  onTutorialInterrupted,
  onGrab,
}: Props) {
  const pan = Gesture.Pan()
    .minDistance(0)
    .onTouchesDown((e) => {
      "worklet";
      const touch = e.changedTouches[0];
      if (!touch) return;

      // 시연 중에는 시연 코드가 penActive 를 1로 켜 두므로, 시연을 끊는 터치도 "새로 잡음"으로 본다
      const wasTutorial = !!tutorialActive && tutorialActive.value === 1;

      // 아이의 터치가 자동 시연보다 항상 우선
      if (tutorialActive && tutorialActive.value === 1) {
        tutorialActive.value = 0;
        if (onTutorialInterrupted) {
          runOnJS(onTutorialInterrupted)();
        }
      }

      // 새로 잡는 순간에만 (이미 잡고 있거나 입력 차단 중이면 제외)
      const isNewGrab =
        (s.penActive.value === 0 || wasTutorial) && s.locked.value !== 1;

      movePen(s, touch.x - margin, touch.y - margin, true);

      if (isNewGrab && onGrab) {
        runOnJS(onGrab)();
      }
    })
    .onUpdate((e) => {
      "worklet";
      // 시연이 이미 끊긴 뒤에도 드래그는 그대로 실제 조작
      if (tutorialActive && tutorialActive.value === 1) {
        tutorialActive.value = 0;
        if (onTutorialInterrupted) {
          runOnJS(onTutorialInterrupted)();
        }
      }
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

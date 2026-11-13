// import Animated, {
//   useAnimatedStyle,
//   withTiming,
// } from "react-native-reanimated";
// import Svg, { Path, Rect } from "react-native-svg";
// import styled from "styled-components/native";
// import { GAME_CONFIG } from "../../constants/magnetMaze/gameConfig";
// import type { PhysicsShared } from "../../games/magnetMaze/physics/physicsTypes";

// const W = GAME_CONFIG.PEN_WIDTH;
// const H = GAME_CONFIG.PEN_HEIGHT;

// /**
//  * 그림 좌표(56x170) 기준으로 자석 끝(구슬이 붙는 점)은 (28, 15).
//  * 박스 중심 (28, 85)이 손가락 위치이므로 TIP_OFFSET = (0, -70).
//  * 그림을 바꾸면 gameConfig의 TIP_OFFSET만 같이 맞추면 된다.
//  */
// export function MagnetPen({ s }: { s: PhysicsShared }) {
//   const style = useAnimatedStyle(() => ({
//     opacity: withTiming(s.penActive.value === 1 ? 1 : 0.35, { duration: 120 }),
//     transform: [
//       { translateX: s.penX.value - W / 2 },
//       { translateY: s.penY.value - H / 2 },
//     ],
//     zIndex: 25,
//   }));

//   return (
//     <AnimatedContainer
//       pointerEvents="none"
//       style={[style, { width: W, height: H }]}
//     >
//       <Svg width={W} height={H} viewBox="0 0 56 170">
//         {/* 손잡이 */}
//         <Rect
//           x="21"
//           y="82"
//           width="14"
//           height="80"
//           rx="7"
//           fill="#FFC93C"
//           stroke="#B7791F"
//           strokeWidth="1.5"
//         />
//         {/* 말굽자석 몸통 */}
//         <Path
//           d="M10 32 V68 a18 18 0 0 0 36 0 V32 H32 V68 a4 4 0 0 1 -8 0 V32 Z"
//           fill="#9AA3B2"
//           stroke="#4B5563"
//           strokeWidth="1.5"
//         />
//         {/* 자석 끝(N극 빨강 / S극 파랑) */}
//         <Rect
//           x="10"
//           y="32"
//           width="14"
//           height="16"
//           fill="#EF4444"
//           stroke="#991B1B"
//           strokeWidth="1.5"
//         />
//         <Rect
//           x="32"
//           y="32"
//           width="14"
//           height="16"
//           fill="#3B82F6"
//           stroke="#1E3A8A"
//           strokeWidth="1.5"
//         />
//       </Svg>
//     </AnimatedContainer>
//   );
// }

// // Styled Components 정의
// const AnimatedContainer = styled(Animated.View)`
//   position: absolute;
//   left: 0;
//   top: 0;
// `;

import React from "react";

import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import Svg, {
  Circle,
  Defs,
  Ellipse,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from "react-native-svg";

import styled from "styled-components/native";

import { GAME_CONFIG } from "../../constants/magnetMaze/gameConfig";

import type { PhysicsShared } from "../../games/magnetMaze/physics/physicsTypes";

const W = GAME_CONFIG.PEN_WIDTH;
const H = GAME_CONFIG.PEN_HEIGHT;

// 아이가 실제로 펜을 잡는 위치
const FINGER_X = 28;
const FINGER_Y = 110;

/**
 * SVG 기준 좌표
 *
 * 전체 크기: 56 x 175
 * 자석 팁 중심: (28, 12)
 * 손가락 기준점: (28, 110)
 *
 * TIP_OFFSET = (0, -98)
 */

export function MagnetPen({ s }: { s: PhysicsShared }) {
  const style = useAnimatedStyle(() => ({
    opacity: withTiming(s.penActive.value === 1 ? 1 : 0.35, { duration: 120 }),
    transform: [
      { translateX: s.penX.value - FINGER_X },
      { translateY: s.penY.value - FINGER_Y },
    ],
    zIndex: 25,
  }));

  return (
    <AnimatedContainer
      pointerEvents="none"
      style={[style, { width: W, height: H }]}
    >
      <Svg width={W} height={H} viewBox="0 0 56 175">
        <Defs>
          {/* 플라스틱 몸통 */}
          <LinearGradient id="wandBody" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#8271BD" />
            <Stop offset="25%" stopColor="#B9A9ED" />
            <Stop offset="55%" stopColor="#D5C9F5" />
            <Stop offset="100%" stopColor="#8E7AC9" />
          </LinearGradient>

          {/* 손잡이 그립 */}
          <LinearGradient id="wandGrip" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#7563AD" />
            <Stop offset="28%" stopColor="#9D8AD7" />
            <Stop offset="55%" stopColor="#B5A4E8" />
            <Stop offset="100%" stopColor="#7966B6" />
          </LinearGradient>

          {/* 금속 팁 */}
          <LinearGradient id="wandMetal" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#8793A1" />
            <Stop offset="35%" stopColor="#E5EAF0" />
            <Stop offset="60%" stopColor="#FFFFFF" />
            <Stop offset="100%" stopColor="#8996A5" />
          </LinearGradient>
        </Defs>

        {/* 전체 그림자 */}
        <Ellipse
          cx="29"
          cy="148"
          rx="10"
          ry="2.5"
          fill="#42345F"
          opacity="0.16"
        />

        {/* ── 작은 금속 자석 팁 ── */}

        <Circle
          cx="28"
          cy="12"
          r="6"
          fill="url(#wandMetal)"
          stroke="#8995A3"
          strokeWidth="1"
        />

        <Ellipse
          cx="26"
          cy="9.5"
          rx="2"
          ry="1.3"
          fill="#FFFFFF"
          opacity="0.9"
        />

        {/* 팁과 몸통 사이의 짧은 금속 연결부 */}
        <Path
          d="M24 17 Q28 20 32 17 L32 25 H24 Z"
          fill="url(#wandMetal)"
          stroke="#8995A3"
          strokeWidth="0.7"
        />

        {/* ── 짧은 펜 몸통 ── */}

        <Path
          d="
            M23 23
            Q23 21 26 21
            H30
            Q33 21 33 24
            V87
            Q33 92 29 95
            H27
            Q23 92 23 87
            Z
          "
          fill="url(#wandBody)"
          stroke="#8170B9"
          strokeWidth="1"
        />

        {/* 몸통 반사광 */}
        <Path
          d="M25.5 28 V83 Q25.5 88 27 90"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.55"
        />

        {/* 몸통과 그립 사이의 연결 링 */}
        <Rect x="22.5" y="91" width="11" height="5" rx="2.5" fill="#7966B3" />

        {/* ── 손으로 잡는 작은 그립 ── */}
        <Rect
          x="21.5"
          y="94"
          width="13"
          height="32"
          rx="6"
          fill="#514477"
          opacity="0.18"
          transform="translate(1 1)"
        />

        <Rect
          x="21.5"
          y="94"
          width="13"
          height="32"
          rx="6"
          fill="url(#wandGrip)"
          stroke="#7765B1"
          strokeWidth="1"
        />

        {/* 왼쪽 하이라이트 */}
        <Path
          d="M24 99 Q23 101 23 105 V117 Q23 120 25 122"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.3"
          strokeLinecap="round"
          opacity="0.48"
        />

        {/* 미끄럼 방지 홈 */}
        <Path
          d="M23 108 H33 M23 112 H33 M23 116 H33"
          fill="none"
          stroke="#715EA9"
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.4"
        />

        {/* 오른쪽 음영 */}
        <Path
          d="M32 100 V118"
          fill="none"
          stroke="#69559F"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.3"
        />

        {/* ── 둥근 하단 마감 ── */}
        <Path
          d="
    M21.5 124
    Q21.5 130 25 133
    Q28 135 31 133
    Q34.5 130 34.5 124
    Z
  "
          fill="url(#wandBody)"
          stroke="#7966B5"
          strokeWidth="1"
        />

        <Path
          d="M24 132 Q28 134 32 132"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.45"
        />
      </Svg>
    </AnimatedContainer>
  );
}

const AnimatedContainer = styled(Animated.View)`
  position: absolute;
  left: 0;
  top: 0;
`;

// import React from "react";

// import Animated, {
//   useAnimatedStyle,
//   withTiming,
// } from "react-native-reanimated";

// import Svg, {
//   Circle,
//   Defs,
//   Ellipse,
//   LinearGradient,
//   Path,
//   Rect,
//   Stop,
// } from "react-native-svg";

// import styled from "styled-components/native";

// import { GAME_CONFIG } from "../../constants/magnetMaze/gameConfig";

// import type { PhysicsShared } from "../../games/magnetMaze/physics/physicsTypes";

// const W = GAME_CONFIG.PEN_WIDTH;
// const H = GAME_CONFIG.PEN_HEIGHT;

// // 아이가 실제로 펜을 잡는 위치
// // 기존 110 → 80으로 변경
// const FINGER_X = 28;
// const FINGER_Y = 80;

// /**
//  * SVG 기준 좌표
//  *
//  * 전체 크기: 56 x 175
//  * 자석 팁 중심: (28, 12)
//  * 손가락 기준점: (28, 80)
//  *
//  * TIP_OFFSET = (0, -68)
//  */

// export function MagnetPen({ s }: { s: PhysicsShared }) {
//   const style = useAnimatedStyle(() => ({
//     opacity: withTiming(s.penActive.value === 1 ? 1 : 0.35, { duration: 120 }),
//     transform: [
//       { translateX: s.penX.value - FINGER_X },
//       { translateY: s.penY.value - FINGER_Y },
//     ],
//     zIndex: 25,
//   }));

//   return (
//     <AnimatedContainer
//       pointerEvents="none"
//       style={[style, { width: W, height: H }]}
//     >
//       <Svg
//         width={W}
//         height={H}
//         viewBox="0 0 56 175"
//         preserveAspectRatio="xMidYMid meet"
//       >
//         <Defs>
//           {/* 플라스틱 몸통 */}
//           <LinearGradient id="wandBody" x1="0%" y1="0%" x2="100%" y2="0%">
//             <Stop offset="0%" stopColor="#8271BD" />
//             <Stop offset="25%" stopColor="#B9A9ED" />
//             <Stop offset="55%" stopColor="#D5C9F5" />
//             <Stop offset="100%" stopColor="#8E7AC9" />
//           </LinearGradient>

//           {/* 손잡이 그립 */}
//           <LinearGradient id="wandGrip" x1="0%" y1="0%" x2="100%" y2="0%">
//             <Stop offset="0%" stopColor="#7563AD" />
//             <Stop offset="28%" stopColor="#9D8AD7" />
//             <Stop offset="55%" stopColor="#B5A4E8" />
//             <Stop offset="100%" stopColor="#7966B6" />
//           </LinearGradient>

//           {/* 금속 팁 */}
//           <LinearGradient id="wandMetal" x1="0%" y1="0%" x2="100%" y2="0%">
//             <Stop offset="0%" stopColor="#8793A1" />
//             <Stop offset="35%" stopColor="#E5EAF0" />
//             <Stop offset="60%" stopColor="#FFFFFF" />
//             <Stop offset="100%" stopColor="#8996A5" />
//           </LinearGradient>
//         </Defs>

//         {/* 전체 그림자 */}
//         <Ellipse
//           cx="29"
//           cy="148"
//           rx="10"
//           ry="2.5"
//           fill="#42345F"
//           opacity="0.16"
//         />

//         {/* 작은 금속 자석 팁 */}
//         <Circle
//           cx="28"
//           cy="12"
//           r="6"
//           fill="url(#wandMetal)"
//           stroke="#8995A3"
//           strokeWidth="1"
//         />

//         <Ellipse
//           cx="26"
//           cy="9.5"
//           rx="2"
//           ry="1.3"
//           fill="#FFFFFF"
//           opacity="0.9"
//         />

//         {/* 팁과 몸통 사이의 금속 연결부 */}
//         <Path
//           d="M24 17 Q28 20 32 17 L32 25 H24 Z"
//           fill="url(#wandMetal)"
//           stroke="#8995A3"
//           strokeWidth="0.7"
//         />

//         {/* 펜 몸통 */}
//         <Path
//           d="
//             M23 23
//             Q23 21 26 21
//             H30
//             Q33 21 33 24
//             V87
//             Q33 92 29 95
//             H27
//             Q23 92 23 87
//             Z
//           "
//           fill="url(#wandBody)"
//           stroke="#8170B9"
//           strokeWidth="1"
//         />

//         {/* 몸통 반사광 */}
//         <Path
//           d="M25.5 28 V83 Q25.5 88 27 90"
//           fill="none"
//           stroke="#FFFFFF"
//           strokeWidth="1.8"
//           strokeLinecap="round"
//           opacity="0.55"
//         />

//         {/* 몸통과 그립 사이의 연결 링 */}
//         <Rect x="22.5" y="91" width="11" height="5" rx="2.5" fill="#7966B3" />

//         {/* 손으로 잡는 그립 그림자 */}
//         <Rect
//           x="21.5"
//           y="94"
//           width="13"
//           height="32"
//           rx="6"
//           fill="#514477"
//           opacity="0.18"
//           transform="translate(1 1)"
//         />

//         {/* 손잡이 그립 */}
//         <Rect
//           x="21.5"
//           y="94"
//           width="13"
//           height="32"
//           rx="6"
//           fill="url(#wandGrip)"
//           stroke="#7765B1"
//           strokeWidth="1"
//         />

//         {/* 왼쪽 하이라이트 */}
//         <Path
//           d="M24 99 Q23 101 23 105 V117 Q23 120 25 122"
//           fill="none"
//           stroke="#FFFFFF"
//           strokeWidth="1.3"
//           strokeLinecap="round"
//           opacity="0.48"
//         />

//         {/* 미끄럼 방지 홈 */}
//         <Path
//           d="M23 108 H33 M23 112 H33 M23 116 H33"
//           fill="none"
//           stroke="#715EA9"
//           strokeWidth="0.8"
//           strokeLinecap="round"
//           opacity="0.4"
//         />

//         {/* 오른쪽 음영 */}
//         <Path
//           d="M32 100 V118"
//           fill="none"
//           stroke="#69559F"
//           strokeWidth="1"
//           strokeLinecap="round"
//           opacity="0.3"
//         />

//         {/* 둥근 하단 마감 */}
//         <Path
//           d="
//             M21.5 124
//             Q21.5 130 25 133
//             Q28 135 31 133
//             Q34.5 130 34.5 124
//             Z
//           "
//           fill="url(#wandBody)"
//           stroke="#7966B5"
//           strokeWidth="1"
//         />

//         <Path
//           d="M24 132 Q28 134 32 132"
//           fill="none"
//           stroke="#FFFFFF"
//           strokeWidth="1"
//           strokeLinecap="round"
//           opacity="0.45"
//         />
//       </Svg>
//     </AnimatedContainer>
//   );
// }

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

// 물리 기준점은 기존 값 그대로 유지
const FINGER_X = 28;
const FINGER_Y = 80;

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
      collapsable={false}
      style={[style, { width: W, height: H }]}
    >
      <Svg
        width={W}
        height={H}
        viewBox="0 0 56 175"
        preserveAspectRatio="xMidYMid meet"
      >
        <Defs>
          {/* 라벤더 본체 */}
          <LinearGradient id="wandBody" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#7863B5" />
            <Stop offset="22%" stopColor="#A994E3" />
            <Stop offset="48%" stopColor="#E0D5FF" />
            <Stop offset="72%" stopColor="#B6A3ED" />
            <Stop offset="100%" stopColor="#7560B5" />
          </LinearGradient>

          {/* 손잡이 */}
          <LinearGradient id="wandGrip" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#65519E" />
            <Stop offset="30%" stopColor="#9079CC" />
            <Stop offset="55%" stopColor="#B8A5E9" />
            <Stop offset="100%" stopColor="#6955A6" />
          </LinearGradient>

          {/* 크롬 자석 팁 */}
          <LinearGradient id="wandMetal" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#66758A" />
            <Stop offset="25%" stopColor="#C6D2E2" />
            <Stop offset="48%" stopColor="#FFFFFF" />
            <Stop offset="72%" stopColor="#D5E0ED" />
            <Stop offset="100%" stopColor="#65758D" />
          </LinearGradient>

          {/* 시안색 에너지 링 */}
          <LinearGradient id="wandEnergy" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#22B8D2" />
            <Stop offset="45%" stopColor="#C4FBFF" />
            <Stop offset="100%" stopColor="#36C9E5" />
          </LinearGradient>

          {/* 손잡이 끝 장식 */}
          <LinearGradient id="wandEnd" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#7561B2" />
            <Stop offset="50%" stopColor="#C7B6F5" />
            <Stop offset="100%" stopColor="#705BAA" />
          </LinearGradient>
        </Defs>

        {/* 자석 팁 주변의 은은한 에너지 광채 */}
        <Circle cx="28" cy="12" r="10" fill="#67E8F9" opacity={0.12} />

        {/* 자석 팁 */}
        <Circle
          cx="28"
          cy="12"
          r="6.5"
          fill="url(#wandMetal)"
          stroke="#8999AD"
          strokeWidth={0.65}
        />

        {/* 팁 표면 하이라이트 */}
        <Ellipse
          cx="26"
          cy="9.5"
          rx="2.4"
          ry="1.35"
          fill="#FFFFFF"
          opacity={0.95}
        />

        {/* 자석 팁 아래 에너지 링 */}
        <Rect
          x="22.5"
          y="19"
          width="11"
          height="3"
          rx="1.5"
          fill="url(#wandEnergy)"
        />

        <Rect
          x="24"
          y="19.4"
          width="8"
          height="0.7"
          rx="0.35"
          fill="#FFFFFF"
          opacity={0.8}
        />

        {/* 금속 연결부 */}
        <Path
          d="M24 22 Q28 20 32 22 L32 27 Q28 29 24 27 Z"
          fill="url(#wandMetal)"
          stroke="#8795A9"
          strokeWidth={0.55}
        />

        {/* 메인 몸통 */}
        <Path
          d="
            M23 26
            Q23 23 26 23
            H30
            Q33 23 33 26
            V83
            Q33 88 29 91
            H27
            Q23 88 23 83
            Z
          "
          fill="url(#wandBody)"
          stroke="#8270BC"
          strokeWidth={0.75}
        />

        {/* 몸통의 긴 표면 반사광 */}
        <Path
          d="M25.5 30 V78 Q25.5 84 27 87"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={1.8}
          strokeLinecap="round"
          opacity={0.55}
        />

        {/* 반대편의 부드러운 음영 */}
        <Path
          d="M31.5 30 V81"
          fill="none"
          stroke="#65529D"
          strokeWidth={1}
          strokeLinecap="round"
          opacity={0.28}
        />

        {/* 손잡이와 몸통 사이의 금속 링 */}
        <Rect
          x="22"
          y="68"
          width="12"
          height="3.5"
          rx="1.7"
          fill="url(#wandMetal)"
        />

        {/* 손잡이 그림자 */}
        <Rect
          x="21"
          y="72"
          width="14"
          height="19"
          rx="6.5"
          fill="#45366F"
          opacity={0.18}
          transform="translate(0.8 1)"
        />

        {/* 손가락이 잡는 그립 */}
        <Rect
          x="21"
          y="72"
          width="14"
          height="19"
          rx="6.5"
          fill="url(#wandGrip)"
          stroke="#7763B2"
          strokeWidth={0.8}
        />

        {/* 그립 상단 광택 */}
        <Path
          d="M24 76 Q23 79 23 84"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={1.25}
          strokeLinecap="round"
          opacity={0.5}
        />

        {/* 그립 미끄럼 방지 홈 */}
        <Path
          d="M22.8 80 H33.2 M22.8 84 H33.2"
          fill="none"
          stroke="#66529D"
          strokeWidth={0.65}
          strokeLinecap="round"
          opacity={0.38}
        />

        {/* 그립 하단 장식 링 */}
        <Rect
          x="22.5"
          y="90"
          width="11"
          height="2.5"
          rx="1.2"
          fill="url(#wandEnd)"
        />

        {/* 하단 마감 */}
        <Path
          d="
            M23 92
            Q23 97 28 99
            Q33 97 33 92
            Z
          "
          fill="url(#wandBody)"
          stroke="#8270BC"
          strokeWidth={0.65}
        />

        {/* 마감 하이라이트 */}
        <Path
          d="M25 96 Q28 98 31 96"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={0.9}
          strokeLinecap="round"
          opacity={0.55}
        />

        {/* 작은 상태 표시등 */}
        <Circle cx="28" cy="59" r="1.7" fill="#67E8F9" opacity={0.95} />

        <Circle cx="28" cy="59" r="3" fill="#67E8F9" opacity={0.12} />
      </Svg>
    </AnimatedContainer>
  );
}

const AnimatedContainer = styled(Animated.View)`
  position: absolute;
  left: 0;
  top: 0;
`;

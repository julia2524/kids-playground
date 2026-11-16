// import Animated, { useAnimatedStyle } from "react-native-reanimated";
// import Svg, {
//   Circle,
//   Defs,
//   Ellipse,
//   RadialGradient,
//   Stop,
// } from "react-native-svg";
// import styled from "styled-components/native";
// import { GAME_CONFIG } from "../../constants/magnetMaze/gameConfig";
// import type { PhysicsShared } from "../../games/magnetMaze/physics/physicsTypes";

// /**
//  * 쇠구슬.
//  *
//  * 중요:
//  * - RN SVG 에서 width/height="100%" 는 자주 0 으로 잡혀 구슬이 안 보인다.
//  * → 고정 px 크기 + scale 로 레벨별 반지름 반영.
//  * - React Native 에서 transform(scale) 의 기준점은 뷰의 "중심"이다 (왼쪽 위가 아니다).
//  *   그래서 scale 이 얼마든 뷰 중심 = 구슬 중심이 되도록 translate 는 (center - BASE_R) 로 둔다.
//  *   (예전에는 center - BASE_R * scale 로 잡아서, 반지름이 22 가 아닌 레벨(Level 7~ 은 16)에서
//  *    구슬이 물리 위치보다 오른쪽/아래로 (22 - r) px 어긋나게 그려져 벽을 침범해 보였다.)
//  * - 그려지는 구슬의 바깥 경계(본체 + 테두리)는 정확히 물리 반지름과 같게 맞춘다.
//  *   viewBox 44 에서 바깥 경계 = 22 → scale = r / 22 이면 화면 반지름 = r.
//  */
// const BASE_R = GAME_CONFIG.BALL_RADIUS; // 22
// const BASE_SIZE = BASE_R * 2; // 44

// export function IronBall({ s }: { s: PhysicsShared }) {
//   const style = useAnimatedStyle(() => {
//     const r = s.ballRadius.value > 1 ? s.ballRadius.value : BASE_R;
//     const scale = r / BASE_R;
//     return {
//       width: BASE_SIZE,
//       height: BASE_SIZE,
//       opacity: 1,
//       zIndex: 100,
//       elevation: 8, // Android 에서 위에 그리기
//       transform: [
//         { translateX: s.ballX.value - BASE_R },
//         { translateY: s.ballY.value - BASE_R },
//         { scale },
//       ],
//     };
//   });

//   return (
//     <AnimatedContainer pointerEvents="none" collapsable={false} style={style}>
//       <Svg width={BASE_SIZE} height={BASE_SIZE} viewBox="0 0 44 44">
//         <Defs>
//           <RadialGradient id="steelBallGrad" cx="35%" cy="30%" r="75%">
//             <Stop offset="0" stopColor="#FFFFFF" />
//             <Stop offset="0.35" stopColor="#C5CDD8" />
//             <Stop offset="0.75" stopColor="#6B7280" />
//             <Stop offset="1" stopColor="#374151" />
//           </RadialGradient>
//         </Defs>
//         {/* 그림자 느낌 바깥 링 */}
//         {/* (중심에서 가장 먼 점 = 1.5 + 20.5 = 22 → 물리 반지름 밖으로 나가지 않는다) */}
//         <Circle cx="22" cy="23.5" r="20.5" fill="#000000" opacity={0.18} />
//         {/* 본체: 반지름 21.25 + 테두리 폭 1.5 의 절반(0.75) = 바깥 경계 22 */}
//         <Circle
//           cx="22"
//           cy="22"
//           r="21.25"
//           fill="url(#steelBallGrad)"
//           stroke="#111827"
//           strokeWidth="1.5"
//         />
//         {/* 하이라이트 */}
//         <Ellipse cx="15" cy="13" rx="7" ry="4" fill="#FFFFFF" opacity={0.85} />
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

import Animated, { useAnimatedStyle } from "react-native-reanimated";

import Svg, {
  Circle,
  Defs,
  Ellipse,
  RadialGradient,
  Stop,
} from "react-native-svg";

import styled from "styled-components/native";

import { GAME_CONFIG } from "../../constants/magnetMaze/gameConfig";

import type { PhysicsShared } from "../../games/magnetMaze/physics/physicsTypes";

/**
 * 쇠구슬.
 *
 * 디자인:
 * - 검은색 외곽선 없이 금속 표면의 명암으로 입체감 표현
 * - 실버 크롬 기본 재질
 * - 보라색과 시안색 우주 환경광 반사
 * - 부드러운 상단 하이라이트
 *
 * 물리:
 * - SVG 바깥 경계는 정확히 물리 반지름과 일치
 * - 기존 Animated 위치 및 scale 구조 유지
 */

const BASE_R = GAME_CONFIG.BALL_RADIUS;
const BASE_SIZE = BASE_R * 2;

export function IronBall({ s }: { s: PhysicsShared }) {
  const style = useAnimatedStyle(() => {
    const r = s.ballRadius.value > 1 ? s.ballRadius.value : BASE_R;
    const scale = r / BASE_R;

    return {
      width: BASE_SIZE,
      height: BASE_SIZE,
      opacity: 1,
      zIndex: 100,
      elevation: 8,
      transform: [
        { translateX: s.ballX.value - BASE_R },
        { translateY: s.ballY.value - BASE_R },
        { scale },
      ],
    };
  });

  return (
    <AnimatedContainer pointerEvents="none" collapsable={false} style={style}>
      <Svg width={BASE_SIZE} height={BASE_SIZE} viewBox="0 0 44 44">
        <Defs>
          {/* 기본 실버 크롬 재질 */}
          <RadialGradient id="steelBallGrad" cx="32%" cy="25%" r="78%">
            <Stop offset="0" stopColor="#FFFFFF" />
            <Stop offset="0.18" stopColor="#F5F7FC" />
            <Stop offset="0.38" stopColor="#D5DCE8" />
            <Stop offset="0.58" stopColor="#A0ADC2" />
            <Stop offset="0.76" stopColor="#68758D" />
            <Stop offset="0.9" stopColor="#4B5873" />
            <Stop offset="1" stopColor="#35415B" />
          </RadialGradient>

          {/* 왼쪽 아래 보라색 우주 반사광 */}
          <RadialGradient id="purpleReflection" cx="15%" cy="85%" r="75%">
            <Stop offset="0" stopColor="#B58AFF" stopOpacity="0.65" />
            <Stop offset="0.45" stopColor="#8B5CF6" stopOpacity="0.28" />
            <Stop offset="1" stopColor="#8B5CF6" stopOpacity="0" />
          </RadialGradient>

          {/* 오른쪽 아래 시안색 우주 반사광 */}
          <RadialGradient id="cyanReflection" cx="90%" cy="78%" r="65%">
            <Stop offset="0" stopColor="#67E8F9" stopOpacity="0.55" />
            <Stop offset="0.45" stopColor="#22D3EE" stopOpacity="0.2" />
            <Stop offset="1" stopColor="#22D3EE" stopOpacity="0" />
          </RadialGradient>

          {/* 표면에 퍼지는 부드러운 흰색 반사광 */}
          <RadialGradient id="steelHighlight" cx="32%" cy="18%" r="65%">
            <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.55" />
            <Stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.12" />
            <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* 금속 본체: 외곽선 없이 명암으로 입체감 표현 */}
        <Circle cx="22" cy="22" r="22" fill="url(#steelBallGrad)" />

        {/* 우주 환경광 */}
        <Circle cx="22" cy="22" r="22" fill="url(#purpleReflection)" />

        <Circle cx="22" cy="22" r="22" fill="url(#cyanReflection)" />

        {/* 표면의 은은한 광택 */}
        <Circle cx="22" cy="22" r="22" fill="url(#steelHighlight)" />

        {/* 상단의 선명한 금속 하이라이트 */}
        <Ellipse
          cx="15"
          cy="12.5"
          rx="6"
          ry="3"
          fill="#FFFFFF"
          opacity={0.78}
        />

        {/* 작은 반사광 */}
        <Circle cx="10.5" cy="16.5" r="1" fill="#FFFFFF" opacity={0.65} />
      </Svg>
    </AnimatedContainer>
  );
}

const AnimatedContainer = styled(Animated.View)`
  position: absolute;
  left: 0;
  top: 0;
`;

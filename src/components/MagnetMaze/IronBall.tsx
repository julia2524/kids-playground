// import Animated, {
//   useAnimatedStyle,
//   type SharedValue,
// } from "react-native-reanimated";

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

// const BASE_R = GAME_CONFIG.BALL_RADIUS;
// const BASE_SIZE = BASE_R * 2;

// type Props = {
//   s: PhysicsShared;
//   visibility?: SharedValue<number>;
//   /** 0 = 평상시, 1 = 블랙홀에 완전히 흡수 */
//   absorbProgress?: SharedValue<number>;
// };

// export function IronBall({ s, visibility, absorbProgress }: Props) {
//   const style = useAnimatedStyle(() => {
//     const r = s.ballRadius.value > 1 ? s.ballRadius.value : BASE_R;

//     const physicsScale = r / BASE_R;
//     const progress = absorbProgress
//       ? Math.max(0, Math.min(1, absorbProgress.value))
//       : 0;

//     // 흡수 애니메이션은 전체 진행률 중 앞쪽 62%에서 완료
//     const absorbT = Math.min(1, progress / 0.62);

//     // 구슬의 중심이 목적지 중심으로 이동
//     const x = s.ballX.value + (s.goalX.value - s.ballX.value) * absorbT;

//     const y = s.ballY.value + (s.goalY.value - s.ballY.value) * absorbT;

//     // 처음에는 빠르게 줄어들고 마지막에는 완전히 사라짐
//     const scale = physicsScale * (1 - absorbT);

//     // 기존 튜토리얼 visibility와 흡수 opacity 결합
//     const baseOpacity = visibility ? visibility.value : 1;
//     const opacity = baseOpacity * (1 - absorbT);

//     return {
//       width: BASE_SIZE,
//       height: BASE_SIZE,
//       opacity,
//       zIndex: 100,
//       elevation: 8,
//       transform: [
//         { translateX: x - BASE_R },
//         { translateY: y - BASE_R },
//         { rotate: `${absorbT * 900}deg` },
//         { scale },
//       ],
//     };
//   });

//   return (
//     <AnimatedContainer pointerEvents="none" collapsable={false} style={style}>
//       <Svg width={BASE_SIZE} height={BASE_SIZE} viewBox="0 0 44 44">
//         <Defs>
//           <RadialGradient id="steelBallGrad" cx="32%" cy="25%" r="78%">
//             <Stop offset="0" stopColor="#FFFFFF" />
//             <Stop offset="0.18" stopColor="#F5F7FC" />
//             <Stop offset="0.38" stopColor="#D5DCE8" />
//             <Stop offset="0.58" stopColor="#A0ADC2" />
//             <Stop offset="0.76" stopColor="#68758D" />
//             <Stop offset="0.9" stopColor="#4B5873" />
//             <Stop offset="1" stopColor="#35415B" />
//           </RadialGradient>

//           <RadialGradient id="purpleReflection" cx="15%" cy="85%" r="75%">
//             <Stop offset="0" stopColor="#B58AFF" stopOpacity="0.65" />
//             <Stop offset="0.45" stopColor="#8B5CF6" stopOpacity="0.28" />
//             <Stop offset="1" stopColor="#8B5CF6" stopOpacity="0" />
//           </RadialGradient>

//           <RadialGradient id="cyanReflection" cx="90%" cy="78%" r="65%">
//             <Stop offset="0" stopColor="#67E8F9" stopOpacity="0.55" />
//             <Stop offset="0.45" stopColor="#22D3EE" stopOpacity="0.2" />
//             <Stop offset="1" stopColor="#22D3EE" stopOpacity="0" />
//           </RadialGradient>

//           <RadialGradient id="steelHighlight" cx="32%" cy="18%" r="65%">
//             <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.55" />
//             <Stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.12" />
//             <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
//           </RadialGradient>
//         </Defs>

//         <Circle cx="22" cy="22" r="22" fill="url(#steelBallGrad)" />

//         <Circle cx="22" cy="22" r="22" fill="url(#purpleReflection)" />

//         <Circle cx="22" cy="22" r="22" fill="url(#cyanReflection)" />

//         <Circle cx="22" cy="22" r="22" fill="url(#steelHighlight)" />

//         <Ellipse
//           cx="15"
//           cy="12.5"
//           rx="6"
//           ry="3"
//           fill="#FFFFFF"
//           opacity={0.78}
//         />

//         <Circle cx="10.5" cy="16.5" r="1" fill="#FFFFFF" opacity={0.65} />
//       </Svg>
//     </AnimatedContainer>
//   );
// }

// const AnimatedContainer = styled(Animated.View)`
//   position: absolute;
//   left: 0;
//   top: 0;
// `;

import Animated, {
  useAnimatedStyle,
  type SharedValue,
} from "react-native-reanimated";

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

const BASE_R = GAME_CONFIG.BALL_RADIUS;
const BASE_SIZE = BASE_R * 2;

type Props = {
  s: PhysicsShared;
  visibility?: SharedValue<number>;
  absorbProgress?: SharedValue<number>;

  /** 시간 경과에 따른 시각적 축소 진행률 (0~1) */
  timeProgress?: SharedValue<number>;
  /** 시간 초과 시 구슬 소멸 진행률 */
  timeoutProgress?: SharedValue<number>;
};
export function IronBall({
  s,
  visibility,
  absorbProgress,
  timeProgress,
  timeoutProgress,
}: Props) {
  const style = useAnimatedStyle(() => {
    const r = s.ballRadius.value > 1 ? s.ballRadius.value : BASE_R;

    const physicsScale = r / BASE_R;
    const progress = absorbProgress
      ? Math.max(0, Math.min(1, absorbProgress.value))
      : 0;

    // 흡수 애니메이션은 전체 진행률 중 앞쪽 62%에서 완료
    const absorbT = Math.min(1, progress / 0.62);

    // 구슬의 중심이 목적지 중심으로 이동
    const x = s.ballX.value + (s.goalX.value - s.ballX.value) * absorbT;

    const y = s.ballY.value + (s.goalY.value - s.ballY.value) * absorbT;

    // 시간 경과에 따른 축소 (최대 25%)
    const timeT = timeProgress
      ? Math.max(0, Math.min(1, timeProgress.value))
      : 0;

    const timeScale = 1 - timeT * 0.25;

    // 시간 초과 소멸 진행률
    const timeoutT = timeoutProgress
      ? Math.max(0, Math.min(1, timeoutProgress.value))
      : 0;

    // 흡수 / 시간 경과 / 시간 초과 축소 결합
    const scale = physicsScale * timeScale * (1 - absorbT) * (1 - timeoutT);

    // opacity 결합
    const baseOpacity = visibility ? visibility.value : 1;

    const opacity = baseOpacity * (1 - absorbT) * (1 - timeoutT);

    return {
      width: BASE_SIZE,
      height: BASE_SIZE,
      opacity,
      zIndex: 100,
      elevation: 8,
      transform: [
        { translateX: x - BASE_R },
        { translateY: y - BASE_R },
        { rotate: `${absorbT * 900}deg` },
        { scale },
      ],
    };
  });

  return (
    <AnimatedContainer pointerEvents="none" collapsable={false} style={style}>
      <Svg width={BASE_SIZE} height={BASE_SIZE} viewBox="0 0 44 44">
        <Defs>
          <RadialGradient id="steelBallGrad" cx="32%" cy="25%" r="78%">
            <Stop offset="0" stopColor="#FFFFFF" />
            <Stop offset="0.18" stopColor="#F5F7FC" />
            <Stop offset="0.38" stopColor="#D5DCE8" />
            <Stop offset="0.58" stopColor="#A0ADC2" />
            <Stop offset="0.76" stopColor="#68758D" />
            <Stop offset="0.9" stopColor="#4B5873" />
            <Stop offset="1" stopColor="#35415B" />
          </RadialGradient>

          <RadialGradient id="purpleReflection" cx="15%" cy="85%" r="75%">
            <Stop offset="0" stopColor="#B58AFF" stopOpacity="0.65" />
            <Stop offset="0.45" stopColor="#8B5CF6" stopOpacity="0.28" />
            <Stop offset="1" stopColor="#8B5CF6" stopOpacity="0" />
          </RadialGradient>

          <RadialGradient id="cyanReflection" cx="90%" cy="78%" r="65%">
            <Stop offset="0" stopColor="#67E8F9" stopOpacity="0.55" />
            <Stop offset="0.45" stopColor="#22D3EE" stopOpacity="0.2" />
            <Stop offset="1" stopColor="#22D3EE" stopOpacity="0" />
          </RadialGradient>

          <RadialGradient id="steelHighlight" cx="32%" cy="18%" r="65%">
            <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.55" />
            <Stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.12" />
            <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </RadialGradient>
        </Defs>

        <Circle cx="22" cy="22" r="22" fill="url(#steelBallGrad)" />

        <Circle cx="22" cy="22" r="22" fill="url(#purpleReflection)" />

        <Circle cx="22" cy="22" r="22" fill="url(#cyanReflection)" />

        <Circle cx="22" cy="22" r="22" fill="url(#steelHighlight)" />

        <Ellipse
          cx="15"
          cy="12.5"
          rx="6"
          ry="3"
          fill="#FFFFFF"
          opacity={0.78}
        />

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

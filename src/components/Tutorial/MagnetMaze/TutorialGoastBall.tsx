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
import { GAME_CONFIG } from "../../../constants/magnetMaze/gameConfig";

/**
 * 튜토리얼 전용 시연 구슬 (물리 없음).
 * 실제 IronBall 과 같은 비주얼로, 별(목적지) 한가운데까지 가져가는 모습을 보여 준다.
 */

const BASE_R = GAME_CONFIG.BALL_RADIUS;
const BASE_SIZE = BASE_R * 2;

type Props = {
  x: SharedValue<number>;
  y: SharedValue<number>;
  opacity: SharedValue<number>;
  radius: SharedValue<number>;
};

export function TutorialGhostBall({ x, y, opacity, radius }: Props) {
  const style = useAnimatedStyle(() => {
    const r = radius.value > 1 ? radius.value : BASE_R;
    const scale = r / BASE_R;
    const op = opacity.value;

    return {
      width: BASE_SIZE,
      height: BASE_SIZE,
      opacity: op,
      zIndex: 110,
      elevation: 10,
      transform: [
        { translateX: x.value - BASE_R },
        { translateY: y.value - BASE_R },
        { scale },
      ],
    };
  });

  return (
    <AnimatedContainer pointerEvents="none" collapsable={false} style={style}>
      <Svg width={BASE_SIZE} height={BASE_SIZE} viewBox="0 0 44 44">
        <Defs>
          <RadialGradient id="tutSteelBallGrad" cx="32%" cy="25%" r="78%">
            <Stop offset="0" stopColor="#FFFFFF" />
            <Stop offset="0.18" stopColor="#F5F7FC" />
            <Stop offset="0.38" stopColor="#D5DCE8" />
            <Stop offset="0.58" stopColor="#A0ADC2" />
            <Stop offset="0.76" stopColor="#68758D" />
            <Stop offset="0.9" stopColor="#4B5873" />
            <Stop offset="1" stopColor="#35415B" />
          </RadialGradient>

          <RadialGradient id="tutPurpleReflection" cx="15%" cy="85%" r="75%">
            <Stop offset="0" stopColor="#B58AFF" stopOpacity="0.65" />
            <Stop offset="0.45" stopColor="#8B5CF6" stopOpacity="0.28" />
            <Stop offset="1" stopColor="#8B5CF6" stopOpacity="0" />
          </RadialGradient>

          <RadialGradient id="tutCyanReflection" cx="90%" cy="78%" r="65%">
            <Stop offset="0" stopColor="#67E8F9" stopOpacity="0.55" />
            <Stop offset="0.45" stopColor="#22D3EE" stopOpacity="0.2" />
            <Stop offset="1" stopColor="#22D3EE" stopOpacity="0" />
          </RadialGradient>

          <RadialGradient id="tutSteelHighlight" cx="32%" cy="18%" r="65%">
            <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.55" />
            <Stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.12" />
            <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </RadialGradient>
        </Defs>

        <Circle cx="22" cy="22" r="22" fill="url(#tutSteelBallGrad)" />
        <Circle cx="22" cy="22" r="22" fill="url(#tutPurpleReflection)" />
        <Circle cx="22" cy="22" r="22" fill="url(#tutCyanReflection)" />
        <Circle cx="22" cy="22" r="22" fill="url(#tutSteelHighlight)" />

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

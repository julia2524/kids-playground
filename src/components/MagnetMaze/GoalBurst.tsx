import React from "react";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  type SharedValue,
} from "react-native-reanimated";
import styled from "styled-components/native";

import type { PhysicsShared } from "../../games/magnetMaze/physics/physicsTypes";

const PARTICLE_COUNT = 12;
const BURST_SIZE = 120;
const CENTER = BURST_SIZE / 2;

const PARTICLE_COLORS = ["#7C5CFF", "#67E8F9", "#FFC93C", "#A78BFA"];

type Props = {
  s: PhysicsShared;
  progress: SharedValue<number>;
};

export function GoalBurst({ s, progress }: Props) {
  const particles = Array.from({ length: PARTICLE_COUNT }, (_, index) => {
    const angle = (index / PARTICLE_COUNT) * Math.PI * 2;

    const distance = index % 2 === 0 ? 48 : 34;
    const size = index % 3 === 0 ? 7 : 5;
    const color = PARTICLE_COLORS[index % PARTICLE_COLORS.length];

    const style = useAnimatedStyle(() => {
      const t = interpolate(
        progress.value,
        [0.58, 0.68, 1],
        [0, 0.15, 1],
        Extrapolation.CLAMP,
      );

      const opacity = interpolate(
        t,
        [0, 0.12, 0.65, 1],
        [0, 1, 0.8, 0],
        Extrapolation.CLAMP,
      );

      const travel = interpolate(t, [0, 1], [0, distance], Extrapolation.CLAMP);

      const scale = interpolate(
        t,
        [0, 0.15, 1],
        [0.4, 1.2, 0.35],
        Extrapolation.CLAMP,
      );

      return {
        opacity,
        transform: [
          { translateX: Math.cos(angle) * travel },
          { translateY: Math.sin(angle) * travel },
          { scale },
        ],
      };
    });

    return (
      <Particle
        key={index}
        style={[
          style,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
            left: CENTER - size / 2,
            top: CENTER - size / 2,
          },
        ]}
      />
    );
  });

  const ringStyle = useAnimatedStyle(() => {
    const t = interpolate(
      progress.value,
      [0.58, 0.7, 1],
      [0, 0.15, 1],
      Extrapolation.CLAMP,
    );

    return {
      opacity: interpolate(t, [0, 0.15, 1], [0, 0.65, 0], Extrapolation.CLAMP),
      transform: [
        {
          scale: interpolate(t, [0, 1], [0.55, 1.7], Extrapolation.CLAMP),
        },
      ],
    };
  });

  const containerStyle = useAnimatedStyle(() => ({
    left: s.goalX.value - CENTER,
    top: s.goalY.value - CENTER,
  }));

  return (
    <BurstContainer pointerEvents="none" style={containerStyle}>
      <Ring style={ringStyle} />
      {particles}
    </BurstContainer>
  );
}

const BurstContainer = styled(Animated.View)`
  position: absolute;
  width: ${BURST_SIZE}px;
  height: ${BURST_SIZE}px;
  z-index: 110;
`;

const Ring = styled(Animated.View)`
  position: absolute;
  left: ${CENTER - 24}px;
  top: ${CENTER - 24}px;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  border-width: 2px;
  border-color: #a78bfa;
`;

const Particle = styled(Animated.View)`
  position: absolute;
`;

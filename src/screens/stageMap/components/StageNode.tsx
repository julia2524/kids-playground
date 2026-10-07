import React, { useEffect, useRef } from "react";
import { Animated, TouchableOpacity, ViewStyle } from "react-native";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import ProgressStar from "../../../components/stageMap/ProgressStar";
import ProgressSun from "../../../components/stageMap/ProgressSun";
import ProgressRainbow from "../../../components/stageMap/ProgressRainbow";
import { AppText } from "../../../utils/AppText";

interface StageNodeProps {
  gameType: string;
  level: number;
  name?: string;
  unlocked: boolean;
  completed: boolean;
  isCurrent?: boolean;
  stars: number;
  maxStars: number;
  onPress: () => void;
  style?: ViewStyle;
}

export default function StageNode({
  gameType,
  level,
  unlocked,
  stars,
  maxStars,
  isCurrent = false,
  onPress,
  style,
}: StageNodeProps) {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isCurrent) {
      pulse.setValue(0);
      return;
    }

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    );

    loop.start();
    return () => loop.stop();
  }, [isCurrent, pulse]);

  const glowScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.35],
  });

  const glowOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 0],
  });

  const progress =
    unlocked && maxStars > 0 ? Math.round((stars / maxStars) * 10) : 0;

  return (
    <NodeWrapper style={style}>
      {/* 현재 레벨 펄스 ring */}
      {isCurrent && (
        <GlowRing
          style={{
            transform: [{ scale: glowScale }],
            opacity: glowOpacity,
          }}
        />
      )}

      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        disabled={!unlocked}
        style={{
          width: 120,
          height: 120,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* gameType별 아이콘 분기 */}
        {gameType === "shape" ? (
          <ProgressSun size={120} progress={progress} />
        ) : gameType === "category" ? (
          <ProgressRainbow size={120} progress={progress} />
        ) : (
          <ProgressStar size={120} progress={progress} />
        )}

        {/* 잠금 또는 레벨 번호 표시 */}
        {!unlocked ? (
          <LockOverlay>
            <Ionicons name="lock-closed" size={26} color="#7D7A8C" />
          </LockOverlay>
        ) : (
          <StageNumber>{level}</StageNumber>
        )}
      </TouchableOpacity>
    </NodeWrapper>
  );
}

const NodeWrapper = styled.View`
  position: absolute;
  width: 120px;
  height: 120px;
  align-items: center;
  justify-content: center;
`;

const GlowRing = styled(Animated.View)`
  position: absolute;
  width: 110px;
  height: 110px;
  border-radius: 55px;
  background-color: #ffffff;
`;

const LockOverlay = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center;
`;

const StageNumber = styled(AppText)`
  position: absolute;
  font-size: 28px;
  font-weight: 900;
  color: #ffffff;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;

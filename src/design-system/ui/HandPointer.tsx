import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import Svg, { Path, G, Defs, ClipPath, Use } from "react-native-svg";

interface HandPointerProps {
  size?: number;
  skinColor?: string;
  tapping?: boolean;
}

export default function HandPointer({
  size = 60,
  skinColor = "#FFD9A8",
  tapping = true,
}: HandPointerProps) {
  const press = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!tapping) return;

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(press, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(press, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(500),
      ]),
    );

    loop.start();
    return () => loop.stop();
  }, [tapping]);

  const scale = press.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.88],
  });

  const translateY = press.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 4],
  });

  return (
    <Animated.View style={{ transform: [{ scale }, { translateY }] }}>
      <Svg width={size} height={size} viewBox="0 0 128 128">
        {/* 메인 손 실루엣 */}
        <Path
          d="M42.8 71c0.1-10.8 0.4-53.3 0.4-54.9c0.3-12.8 16.8-12.7 17-0.7c0 1.5 1.1 25 1.3 32.2c2-5.2 11.9-7.5 14.9 3.1c2.6-5 12.9-6.4 14.7 4.2c2.5-3.8 10.9-4.3 14.2 6c2.7 8.4 2 28.2-2.3 40.3c-3.3 9.1-5.8 8.4-5.6 16.7c0 1.4-1.1 2.1-2.4 2.4c-5.9 1.3-26.3 1.9-33.8 0.3c-1.6-0.4-1.8-1.7-1.9-2.2c-0.4-2.1-2.5-4.2-4.3-5c-6.4-3.2-12.8-12.8-18.2-23.4C34 84.5 28 80.8 18.5 79.6c-6.3-0.8-7.7-8.6-2.5-11.8c3.6-2.2 7-2.9 10.4-2.9C32.5 64.7 36.4 66.6 42.8 71z"
          fill={skinColor}
        />
      </Svg>
    </Animated.View>
  );
}

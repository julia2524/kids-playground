import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import Svg, {
  Circle,
  Defs,
  Ellipse,
  LinearGradient,
  Polygon,
  RadialGradient,
  Stop,
} from "react-native-svg";

interface UfoLevelBadgeProps {
  size?: number;
  floating?: boolean;
}

export default function UfoLevelBadge({
  size = 300,
  floating = true,
}: UfoLevelBadgeProps) {
  const bob = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!floating) return;

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bob, {
          toValue: 1,
          duration: 1400,
          useNativeDriver: true,
        }),
        Animated.timing(bob, {
          toValue: 0,
          duration: 1400,
          useNativeDriver: true,
        }),
      ]),
    );

    loop.start();

    return () => loop.stop();
  }, [floating, bob]);

  const translateY = bob.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -6],
  });

  return (
    <Animated.View
      style={{
        width: size,
        height: size * 0.62,
        alignItems: "center",
        justifyContent: "center",
        transform: [{ translateY }],
      }}
    >
      <Svg width={size} height={size * 0.62} viewBox="0 0 320 200">
        <Defs>
          {/* UFO 몸체 */}
          <LinearGradient id="ufoBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#DCEBFF" />
            <Stop offset="55%" stopColor="#9FC5FF" />
            <Stop offset="100%" stopColor="#6793DC" />
          </LinearGradient>

          {/* UFO 돔 */}
          <RadialGradient id="ufoGlass" cx="45%" cy="25%" r="75%">
            <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <Stop offset="45%" stopColor="#BEEAFF" stopOpacity="0.9" />
            <Stop offset="100%" stopColor="#6AC8E8" stopOpacity="0.95" />
          </RadialGradient>

          {/* 빛 */}
          <LinearGradient id="ufoLight" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#FFF7A8" stopOpacity="0.95" />
            <Stop offset="100%" stopColor="#FFE66D" stopOpacity="0.1" />
          </LinearGradient>
        </Defs>

        {/* ================================================= */}
        {/* UFO 빛 */}
        {/* ================================================= */}

        <Polygon points="95,112 225,112 260,180 60,180" fill="url(#ufoLight)" />

        {/* ================================================= */}
        {/* UFO 아래 몸체 */}
        {/* ================================================= */}

        <Ellipse cx="160" cy="112" rx="116" ry="39" fill="url(#ufoBody)" />

        {/* UFO 가운데 */}
        <Ellipse cx="160" cy="105" rx="82" ry="24" fill="#7BA8E9" />

        {/* ================================================= */}
        {/* UFO 돔 */}
        {/* ================================================= */}

        <Ellipse cx="160" cy="78" rx="61" ry="46" fill="url(#ufoGlass)" />

        {/* 돔 하이라이트 */}
        <Ellipse
          cx="139"
          cy="61"
          rx="23"
          ry="12"
          fill="#FFFFFF"
          opacity={0.55}
        />

        {/* ================================================= */}
        {/* UFO 불빛 */}
        {/* ================================================= */}
        {/* 
        <Circle cx="80" cy="119" r="9" fill="#FFF4A3" />

        <Circle cx="120" cy="130" r="9" fill="#FFF4A3" />

        <Circle cx="160" cy="133" r="9" fill="#FFF4A3" />

        <Circle cx="200" cy="130" r="9" fill="#FFF4A3" />

        <Circle cx="240" cy="119" r="9" fill="#FFF4A3" /> */}
      </Svg>
    </Animated.View>
  );
}

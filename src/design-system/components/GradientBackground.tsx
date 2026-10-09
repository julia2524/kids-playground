import React from "react";
import { StyleSheet } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";

export default function GradientBackground() {
  return (
    <Svg height="120%" width="100%" style={StyleSheet.absoluteFill}>
      <Defs>
        <LinearGradient id="bgGradient" x1="0" y1="0" x2="0" y2="1">
          {/* 1. 상단: 맑고 은은한 파스텔 하늘색 */}
          <Stop offset="0" stopColor="#E0F2FE" />

          {/* 2. 중간: 은은하게 연결되는 파스텔 수국 블루 */}
          <Stop offset="0.5" stopColor="#E0E7FF" />

          {/* 3. 하단: 은은하고 따뜻하게 깔리는 파스텔 라벤더 보라 */}
          <Stop offset="1" stopColor="#D8B4FE" />
        </LinearGradient>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#bgGradient)" />
    </Svg>
  );
}

import React from "react";
import Svg from "react-native-svg";

import PochiGlacialBackground from "./PochiGlacialBackground";
import IceFloePlatform from "./IceFloePlatform";
import PochiPenguin from "./PochiPenguin";

interface PochiPenguinPuzzleSceneProps {
  width?: number | string;
  height?: number | string;
}

export default function PochiPenguinPuzzleScene({
  width = "100%",
  height = "100%",
}: PochiPenguinPuzzleSceneProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 240 180"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Layer 1: Glacial night sky, aurora, distant mountains, sea */}
      <PochiGlacialBackground />

      {/* Layer 2: Floating ice floe platform */}
      <IceFloePlatform />

      {/* Layer 3: Pochi Penguin character */}
      <PochiPenguin scale={0.5} x={60} y={48} />
    </Svg>
  );
}

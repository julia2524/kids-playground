import React from "react";
import Svg from "react-native-svg";

import SunnyHoneyBackground from "./SunnyHoneyBackground";
import HoneyLogPlatform from "./HoneyLogPlatform";
import ChocoBear from "./ChocoBear";

interface ChocoBearPuzzleSceneProps {
  width?: number | string;
  height?: number | string;
}

export default function ChocoBearPuzzleScene({
  width = "100%",
  height = "100%",
}: ChocoBearPuzzleSceneProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 240 180"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Layer 1: Sunny sky, clouds, distant hills, meadow */}
      <SunnyHoneyBackground />

      {/* Layer 2: Honey log platform */}
      <HoneyLogPlatform />

      {/* Layer 3: Choco Bear character */}
      <ChocoBear scale={0.5} x={60} y={48} />
    </Svg>
  );
}

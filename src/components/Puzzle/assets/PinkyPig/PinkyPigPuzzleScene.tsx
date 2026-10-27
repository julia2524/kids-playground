import React from "react";
import Svg from "react-native-svg";

import PinkyFarmBackground from "./PinkyFarmBackground";
import FarmPlatform from "./FarmPlatform";
import PinkyPig from "./PinkyPig";

interface PinkyPigPuzzleSceneProps {
  width?: number | string;
  height?: number | string;
}

export default function PinkyPigPuzzleScene({
  width = "100%",
  height = "100%",
}: PinkyPigPuzzleSceneProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 240 180"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Layer 1: Sky, clouds, distant hills, meadow background */}
      <PinkyFarmBackground />

      {/* Layer 2: Floating grass platform */}
      <FarmPlatform />

      {/* Layer 3: Pinky Pig character */}
      <PinkyPig scale={0.5} x={60} y={48} />
    </Svg>
  );
}

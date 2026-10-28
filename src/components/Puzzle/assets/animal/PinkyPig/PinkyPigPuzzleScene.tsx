import React from "react";
import Svg from "react-native-svg";

import PinkyFarmBackground from "./PinkyFarmBackground";
import FarmPlatform from "./FarmPlatform";
import PinkyPig from "./PinkyPig";
import BabyLionPuzzleArtwork from "./PinkPigPuzzleArtwork";

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
      <BabyLionPuzzleArtwork />
    </Svg>
  );
}

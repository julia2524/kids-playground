import React from "react";
import Svg from "react-native-svg";

import SunnyHoneyBackground from "./SunnyHoneyBackground";
import HoneyLogPlatform from "./HoneyLogPlatform";
import ChocoBear from "./ChocoBear";
import ChocoBearPuzzleArtwork from "./ChocoBearPuzzleArtwork";

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
      <ChocoBearPuzzleArtwork />
    </Svg>
  );
}

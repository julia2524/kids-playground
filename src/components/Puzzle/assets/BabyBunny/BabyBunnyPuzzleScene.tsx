import React from "react";
import Svg from "react-native-svg";

import BabyBunnyPuzzleArtwork from "./BabyBunnyPuzzleArtwork";

interface BabyBunnyPuzzleSceneProps {
  width?: number | string;
  height?: number | string;
}

export default function BabyBunnyPuzzleScene({
  width = "100%",
  height = "100%",
}: BabyBunnyPuzzleSceneProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 240 180"
      preserveAspectRatio="xMidYMid meet"
    >
      <BabyBunnyPuzzleArtwork />
    </Svg>
  );
}

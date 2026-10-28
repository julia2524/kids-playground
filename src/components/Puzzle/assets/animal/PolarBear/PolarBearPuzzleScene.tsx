import React from "react";
import Svg from "react-native-svg";
import PolarBearPuzzleArtwork from "./PolarBearPuzzleArtwork";

interface PolarBearPuzzleSceneProps {
  width?: number | string;
  height?: number | string;
}

export default function PolarBearPuzzleScene({
  width = "100%",
  height = "100%",
}: PolarBearPuzzleSceneProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 240 180"
      preserveAspectRatio="xMidYMid meet"
    >
      <PolarBearPuzzleArtwork />
    </Svg>
  );
}

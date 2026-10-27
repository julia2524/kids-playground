import React from "react";
import Svg from "react-native-svg";
import BabyLionPuzzleArtwork from "./BabyLionPuzzleArtwork";

interface BabyLionPuzzleSceneProps {
  width?: number | string;
  height?: number | string;
}

export default function BabyLionPuzzleScene({
  width = "100%",
  height = "100%",
}: BabyLionPuzzleSceneProps) {
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

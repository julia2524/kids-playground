import React from "react";
import Svg from "react-native-svg";

import PochiGlacialBackground from "./PochiGlacialBackground";
import IceFloePlatform from "./IceFloePlatform";
import PochiPenguin from "./PochiPenguin";
import BabyLionPuzzleArtwork from "./PochiPenguinPuzzleArtwork";

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
      <BabyLionPuzzleArtwork />
    </Svg>
  );
}

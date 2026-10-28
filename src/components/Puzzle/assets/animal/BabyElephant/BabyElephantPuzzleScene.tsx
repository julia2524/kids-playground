import React from "react";
import Svg from "react-native-svg";

import StarlitSavannaBackground from "./StarlitSavannaBackground";
import SavannaPlatform from "./SavannaPlatform";
import { BabyElephant } from "./BabyElephant";
import BabyElephantPuzzleArtwork from "./BabyElephantPuzzleArtwork";

interface BabyElephantPuzzleSceneProps {
  width?: number | string;
  height?: number | string;
}

export default function BabyElephantPuzzleScene({
  width = "100%",
  height = "100%",
}: BabyElephantPuzzleSceneProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 240 180"
      preserveAspectRatio="xMidYMid meet"
    >
      <BabyElephantPuzzleArtwork />
    </Svg>
  );
}

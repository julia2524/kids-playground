import React from "react";
import Svg from "react-native-svg";

import StarlitSavannaBackground from "./StarlitSavannaBackground";
import SavannaPlatform from "./SavannaPlatform";
import { BabyElephant } from "./BabyElephant";

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
      {/* Layer 1: Starlit night sky, crescent moon, distant hills, meadow */}
      <StarlitSavannaBackground />

      {/* Layer 2: Savanna rock/earth platform */}
      <SavannaPlatform />

      {/* Layer 3: Baby Elephant character */}
      <BabyElephant scale={0.4} x={-30} y={-70} />
    </Svg>
  );
}

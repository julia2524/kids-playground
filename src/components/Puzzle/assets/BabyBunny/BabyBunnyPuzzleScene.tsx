import React from "react";
import Svg from "react-native-svg";

import MoonlitMeadowBackground from "./MoonlitMeadowBackground";
import CloudPlatform from "./CloudPlatform";
import BabyBunny from "./BabyBunny";

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
      {/* Layer 1: Moonlit night sky, stars, distant hills, meadow */}
      <MoonlitMeadowBackground />

      {/* Layer 2: Fluffy cloud platform */}
      <CloudPlatform />

      {/* Layer 3: Baby Bunny character */}
      <BabyBunny scale={0.5} x={60} y={48} />
    </Svg>
  );
}

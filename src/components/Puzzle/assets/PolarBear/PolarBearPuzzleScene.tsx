import React from "react";
import Svg from "react-native-svg";

import PolarBearBackground from "./PolarBearBackground";

import PolarBear from "./PolarBear";
import Iceberg from "./IceBerg";
import AstroCatMascot from "../AstroCatMascot";
import PinkyPig from "../PinkyPig/PinkyPig";
import PochiPenguin from "../PochiPenguin/PochiPenguin";
import ChocoBear from "../ChocoBear/ChocoBear";
import BabyLionMascot from "../BabyLion/BabyLion";
import { BabyElephant } from "../BabyElephant/BabyElephant";
import BabyBunny from "../BabyBunny/BabyBunny";

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
      {/* Layer 1: Aurora, mountains, water, snow */}
      <PolarBearBackground />

      {/* Layer 2: Floating iceberg */}
      <Iceberg />

      {/* Layer 3: Polar bear */}
      <PolarBear scale={0.5} x={60} y={60} />
      {/* <PinkyPig scale={0.5} y={90} /> */}
      {/*<PochiPenguin scale={0.5} />
      <ChocoBear scale={0.5} x={100} y={90} />
      <BabyElephant scale={0.4} x={0} y={-70} />
      <BabyBunny scale={0.4} /> */}
      {/* <BabyLionMascot size={100} /> */}
    </Svg>
  );
}

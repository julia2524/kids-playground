import React from "react";

import PinkyFarmBackground from "./PinkyFarmBackground";
import FarmPlatform from "./FarmPlatform";
import PinkyPig from "./PinkyPig";

/**
 * SVG 내부에서 재사용하는 artwork 전용 컴포넌트입니다.
 * 이 컴포넌트 자체는 Svg 루트를 만들지 않습니다.
 * 배경/바위/사자 모두 원본 240 x 180 좌표계를 사용합니다.
 */
export default function BabyLionPuzzleArtwork() {
  return (
    <>
      <PinkyFarmBackground />
      <FarmPlatform />
      <PinkyPig scale={0.5} x={60} y={48} />
    </>
  );
}

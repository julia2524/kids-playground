import React from "react";
import SunnyHoneyBackground from "./SunnyHoneyBackground";
import HoneyLogPlatform from "./HoneyLogPlatform";
import ChocoBear from "./ChocoBear";

/**
 * SVG 내부에서 재사용하는 artwork 전용 컴포넌트입니다.
 * 이 컴포넌트 자체는 Svg 루트를 만들지 않습니다.
 * 배경/바위/사자 모두 원본 240 x 180 좌표계를 사용합니다.
 */
export default function ChocoBearPuzzleArtwork() {
  return (
    <>
      <SunnyHoneyBackground />
      <HoneyLogPlatform />
      <ChocoBear scale={0.5} x={60} y={48} />
    </>
  );
}

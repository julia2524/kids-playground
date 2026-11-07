import React from "react";
import { Rect, Path, G } from "react-native-svg";

export function IranFlagPuzzleScene() {
  return (
    <>
      {/* 상단 초록 */}
      <Rect x="-2" y="-2" width="244" height="62" fill="#239F40" />
      {/* 중단 흰색 */}
      <Rect x="-2" y="58" width="244" height="64" fill="#FFFFFF" />
      {/* 하단 빨강 */}
      <Rect x="-2" y="120" width="244" height="64" fill="#DA0000" />

      {/* 중앙 붉은색 국장 심볼 실루엣 */}
      <G transform="translate(120, 90)">
        <Path d="M-8,-10 L8,-10 L0,12 Z" fill="#DA0000" />
      </G>
    </>
  );
}

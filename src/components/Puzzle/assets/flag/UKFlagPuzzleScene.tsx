import React from "react";
import { Rect, Path } from "react-native-svg";

export function UKFlagPuzzleScene() {
  return (
    <>
      {/* 파란색 배경 영역 확장 */}
      <Rect x="-2" y="-2" width="244" height="184" fill="#012169" />

      {/* 하얀색 대각선 (세인트 앤드루 십자) */}
      <Path d="M0,0 L240,180 M240,0 L0,180" stroke="#FFFFFF" strokeWidth="28" />

      {/* 빨간색 대각선 (세인트 패트릭 십자) */}
      <Path d="M0,0 L240,180 M240,0 L0,180" stroke="#C8102E" strokeWidth="14" />

      {/* 하얀색 수평/수직 십자 테두리 */}
      <Rect x="100" y="-2" width="40" height="184" fill="#FFFFFF" />
      <Rect x="-2" y="70" width="244" height="40" fill="#FFFFFF" />

      {/* 빨간색 수평/수직 십자 (세인트 조지 십자) */}
      <Rect x="110" y="-2" width="20" height="184" fill="#C8102E" />
      <Rect x="-2" y="80" width="244" height="20" fill="#C8102E" />
    </>
  );
}

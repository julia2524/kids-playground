import React from "react";
import { Rect } from "react-native-svg";

export function FranceFlagPuzzleScene() {
  return (
    <>
      {/* 전체 배경을 살짝 여유 있게(244x184) 잡아 조각 모서리 깎임 방지 */}
      <Rect x="-2" y="-2" width="244" height="184" fill="#FFFFFF" />

      {/* 파란색 세로 바 (좌측) */}
      <Rect x="-2" y="-2" width="82" height="184" fill="#002654" />

      {/* 흰색 세로 바 (중앙 - 이미 전체 배경이 흰색이므로 위치만 잡아줌) */}
      <Rect x="80" y="-2" width="80" height="184" fill="#FFFFFF" />

      {/* 빨간색 세로 바 (우측) */}
      <Rect x="160" y="-2" width="86" height="184" fill="#ED2939" />
    </>
  );
}

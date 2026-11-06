import React from "react";
import { Rect, Path, G, Circle } from "react-native-svg";

export function MexicoFlagPuzzleScene() {
  return (
    <>
      {/* 전체 배경 흰색 (중앙 바 역할 겸용) */}
      <Rect x="-2" y="-2" width="244" height="184" fill="#FFFFFF" />

      {/* 초록색 세로 바 (좌측) */}
      <Rect x="-2" y="-2" width="82" height="184" fill="#006847" />

      {/* 빨간색 세로 바 (우측) */}
      <Rect x="160" y="-2" width="86" height="184" fill="#CE1126" />

      {/* 중앙 멕시코 국장 심볼 실루엣 (독수리와 선인장) */}
      <G transform="translate(120, 90)">
        {/* 선인장 */}
        <Path d="M-4,15 L-4,0 L4,0 L4,15 Z" fill="#8A9A86" />
        <Circle cx="0" cy="-6" r="10" fill="#CE1126" />
        {/* 독수리/뱀 상징 포인트 */}
      </G>
    </>
  );
}

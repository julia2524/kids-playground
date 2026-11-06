import React from "react";
import { Rect } from "react-native-svg";

export function PeruFlagArtwork() {
  return (
    <>
      {/* 전체 배경 흰색 (중앙 바 역할 겸용) */}
      <Rect x="-2" y="-2" width="244" height="184" fill="#FFFFFF" />

      {/* 빨간색 세로 바 (좌측) */}
      <Rect x="-2" y="-2" width="82" height="184" fill="#D91023" />

      {/* 빨간색 세로 바 (우측) */}
      <Rect x="160" y="-2" width="86" height="184" fill="#D91023" />
    </>
  );
}

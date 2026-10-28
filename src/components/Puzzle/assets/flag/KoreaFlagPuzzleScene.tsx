import React from "react";
import { Rect, Path, G } from "react-native-svg";

export default function KoreaFlagPuzzleScene() {
  return (
    <>
      {/* 바탕 흰색: 240x180보다 살짝 여유 있게(244x184) 잡아서 조각 모서리 깎임 현상(빈공간)을 원천 차단 */}
      <Rect x="-2" y="-2" width="244" height="184" fill="#FFFFFF" />

      {/* 태극 문양 (중앙 120, 90) */}
      <G transform="translate(120, 90) rotate(-70) scale(3.5)">
        {/* 상단 붉은색 반원 */}
        <Path
          d="M 0,-12 A 12,12 0 0,1 0,12 A 6,6 0 0,0 0,0 A 6,6 0 0,1 0,-12"
          fill="#CD2E3A"
        />
        {/* 하단 푸른색 반원 */}
        <Path
          d="M 0,12 A 12,12 0 0,1 0,-12 A 6,6 0 0,0 0,0 A 6,6 0 0,1 0,12"
          fill="#0047A0"
        />
      </G>

      {/* 4괘 (건, 곤, 감, 리) */}

      {/* 1. 건 (좌상) */}
      <G transform="translate(52, 42) rotate(-37)" fill="#000000">
        <Rect x="-16" y="-10" width="32" height="3.5" rx="0.5" />
        <Rect x="-16" y="-3.5" width="32" height="3.5" rx="0.5" />
        <Rect x="-16" y="3" width="32" height="3.5" rx="0.5" />
      </G>

      {/* 2. 곤 (우하) */}
      <G transform="translate(188, 138) rotate(-37)" fill="#000000">
        <Rect x="-16" y="-10" width="14" height="3.5" rx="0.5" />
        <Rect x="2" y="-10" width="14" height="3.5" rx="0.5" />
        <Rect x="-16" y="-3.5" width="14" height="3.5" rx="0.5" />
        <Rect x="2" y="-3.5" width="14" height="3.5" rx="0.5" />
        <Rect x="-16" y="3" width="14" height="3.5" rx="0.5" />
        <Rect x="2" y="3" width="14" height="3.5" rx="0.5" />
      </G>

      {/* 3. 감 (우상) */}
      <G transform="translate(188, 42) rotate(37)" fill="#000000">
        <Rect x="-16" y="-10" width="14" height="3.5" rx="0.5" />
        <Rect x="2" y="-10" width="14" height="3.5" rx="0.5" />
        <Rect x="-16" y="-3.5" width="32" height="3.5" rx="0.5" />
        <Rect x="-16" y="3" width="14" height="3.5" rx="0.5" />
        <Rect x="2" y="3" width="14" height="3.5" rx="0.5" />
      </G>

      {/* 4. 리 (좌하) */}
      <G transform="translate(52, 138) rotate(37)" fill="#000000">
        <Rect x="-16" y="-10" width="32" height="3.5" rx="0.5" />
        <Rect x="-16" y="-3.5" width="14" height="3.5" rx="0.5" />
        <Rect x="2" y="-3.5" width="14" height="3.5" rx="0.5" />
        <Rect x="-16" y="3" width="32" height="3.5" rx="0.5" />
      </G>
    </>
  );
}

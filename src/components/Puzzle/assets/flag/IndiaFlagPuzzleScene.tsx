import React from "react";
import { Rect, Circle, Path, G } from "react-native-svg";

export function IndiaFlagPuzzleScene() {
  // 24개의 살을 가진 아소카 차크라 생성 함수
  const renderSpokes = () => {
    const spokes = [];
    for (let i = 0; i < 24; i++) {
      const angle = (i * 360) / 24;
      spokes.push(
        <Path
          key={i}
          d={`M120,90 L${120 + 18 * Math.cos((angle * Math.PI) / 180)},${
            90 + 18 * Math.sin((angle * Math.PI) / 180)
          }`}
          stroke="#000080"
          strokeWidth="1.5"
        />,
      );
    }
    return spokes;
  };

  return (
    <>
      {/* 사프란색 (주황) 상단 */}
      <Rect x="-2" y="-2" width="244" height="62" fill="#FF9933" />
      {/* 흰색 중단 */}
      <Rect x="-2" y="58" width="244" height="64" fill="#FFFFFF" />
      {/* 녹색 하단 */}
      <Rect x="-2" y="120" width="244" height="64" fill="#138808" />

      {/* 중앙 아소카 차크라 (남색) */}
      <Circle
        cx="120"
        cy="90"
        r="20"
        stroke="#000080"
        strokeWidth="2"
        fill="none"
      />
      <Circle cx="120" cy="90" r="3" fill="#000080" />
      <G>{renderSpokes()}</G>
    </>
  );
}

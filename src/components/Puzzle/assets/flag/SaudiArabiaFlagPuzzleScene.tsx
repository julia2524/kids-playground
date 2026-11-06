import React from "react";
import { Rect, Path } from "react-native-svg";

export function SaudiArabiaFlagPuzzleScene() {
  return (
    <>
      {/* 초록색 배경 영역 확장 */}
      <Rect x="-2" y="-2" width="244" height="184" fill="#006C35" />

      {/* 아랍어 서체 스타일리시한 표현을 위한 패스 및 검(Sword) 기호 */}
      {/* 검 디자인 */}
      <Path
        d="M60,115 L170,115 C175,115 178,112 175,110 L165,102 L60,102 Z"
        fill="#FFFFFF"
      />

      {/* 샤하다 텍스트 영역을 시각적으로 형상화한 그래픽 라인 (아동용 퍼즐 가독성 최적화) */}
      <Path
        d="M 75,55 Q 90,45 110,55 T 145,52 T 175,58"
        stroke="#FFFFFF"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M 65,75 Q 90,65 120,75 T 165,72"
        stroke="#FFFFFF"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
    </>
  );
}

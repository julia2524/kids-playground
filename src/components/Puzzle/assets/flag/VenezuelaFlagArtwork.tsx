import React from "react";
import { Rect, Polygon } from "react-native-svg";

export function VenezuelaFlagArtwork() {
  const starPoints =
    "5,1 6.3,3.8 9.5,3.8 6.9,5.5 7.9,8.5 5,6.8 2.1,8.5 3.1,5.5 0.5,3.8 3.7,3.8";

  return (
    <>
      {/* 상단 노랑 */}
      <Rect x="-2" y="-2" width="244" height="62" fill="#FFCC00" />
      {/* 중단 파랑 */}
      <Rect x="-2" y="58" width="244" height="64" fill="#00247D" />
      {/* 하단 빨강 */}
      <Rect x="-2" y="120" width="244" height="64" fill="#CF142B" />

      {/* 중앙 호 모양으로 배치된 8개의 흰색 별 */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        // 호를 그리며 배치되는 대략적인 좌표 계산
        const angle = Math.PI * (0.15 + (i / 7) * 0.7);
        const cx = 120 + 45 * Math.cos(angle);
        const cy = 90 - 20 * Math.sin(angle);
        return (
          <Polygon
            key={i}
            points={starPoints}
            fill="#FFFFFF"
            transform={`translate(${cx}, ${cy}) scale(1.1)`}
          />
        );
      })}
    </>
  );
}

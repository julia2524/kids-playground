import React from "react";
import { Rect, Path, Polygon, G } from "react-native-svg";

export function TurkeyFlagPuzzleScene() {
  const starPoints =
    "5,1 6.3,3.8 9.5,3.8 6.9,5.5 7.9,8.5 5,6.8 2.1,8.5 3.1,5.5 0.5,3.8 3.7,3.8";

  return (
    <>
      {/* 붉은색 바탕 영역 확장 */}
      <Rect x="-2" y="-2" width="244" height="184" fill="#E30A17" />

      {/* 하얀색 초승달 (겹침 효과를 활용한 정교한 컷팅) */}
      <G transform="translate(15,0)">
        <Path
          d="M 95, 45 A 50, 50 0 1, 0 95, 135 A 40, 40 0 1, 1 95, 45 Z"
          fill="#FFFFFF"
        />
      </G>

      {/* 하얀색 5각별 */}
      <G transform="translate(-26,-18)">
        <Polygon
          points={starPoints}
          fill="#FFFFFF"
          transform="translate(130, 90) scale(3.2)"
        />
      </G>
    </>
  );
}

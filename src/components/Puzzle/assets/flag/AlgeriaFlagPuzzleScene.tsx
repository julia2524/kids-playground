import React from "react";
import { Rect, Path, Polygon, G } from "react-native-svg";

export function AlgeriaFlagPuzzleScene() {
  const starPoints =
    "5,1 6.3,3.8 9.5,3.8 6.9,5.5 7.9,8.5 5,6.8 2.1,8.5 3.1,5.5 0.5,3.8 3.7,3.8";

  return (
    <>
      <Rect x="-2" y="-2" width="124" height="184" fill="#006233" />

      <Rect x="120" y="-2" width="124" height="184" fill="#FFFFFF" />

      {/* <Path
        d="M 120,50 A 40,40 0 1,0 120,130 A 32,32 0 1,1 120,50 Z"
        fill="#D21034"
      /> */}
      {/* 하얀색 초승달 (겹침 효과를 활용한 정교한 컷팅) */}
      <G transform="translate(52,0)">
        <Path
          d="M 95, 45 A 50, 50 0 1, 0 95, 135 A 40, 40 0 1, 1 95, 45 Z"
          fill="#D21034"
        />
      </G>

      <G transform="translate(0,-10)">
        <Polygon
          points={starPoints}
          fill="#D21034"
          transform="translate(132, 90) scale(1.8)"
        />
      </G>
    </>
  );
}

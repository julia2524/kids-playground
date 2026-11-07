import React from "react";
import { Rect, Path, Polygon, G } from "react-native-svg";

export function CubaFlagPuzzleScene() {
  const starPoints =
    "5,1 6.3,3.8 9.5,3.8 6.9,5.5 7.9,8.5 5,6.8 2.1,8.5 3.1,5.5 0.5,3.8 3.7,3.8";

  return (
    <>
      <Rect x="-2" y="-2" width="244" height="38" fill="#002A8F" />
      <Rect x="-2" y="34" width="244" height="38" fill="#FFFFFF" />
      <Rect x="-2" y="70" width="244" height="40" fill="#002A8F" />
      <Rect x="-2" y="108" width="244" height="38" fill="#FFFFFF" />
      <Rect x="-2" y="144" width="244" height="42" fill="#002A8F" />

      <Path d="M-2,-2 L120,90 L-2,182 Z" fill="#CF142B" />

      <G transform="scale(3) translate(-33, -60)">
        <Polygon
          points={starPoints}
          fill="#FFFFFF"
          transform="translate(42, 80) scale(1.8)"
        />
      </G>
    </>
  );
}

import React from "react";
import { Rect, Path } from "react-native-svg";

export function IraqFlagPuzzleScene() {
  return (
    <>
      <Rect x="-2" y="-2" width="244" height="62" fill="#CE1126" />
      <Rect x="-2" y="58" width="244" height="64" fill="#FFFFFF" />
      <Rect x="-2" y="120" width="244" height="62" fill="#000000" />

      <Path
        d="M95,82 L105,82 M115,80 L125,84 M135,82 L145,82"
        stroke="#007A3D"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <Path
        d="M100,95 L140,95"
        stroke="#007A3D"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </>
  );
}

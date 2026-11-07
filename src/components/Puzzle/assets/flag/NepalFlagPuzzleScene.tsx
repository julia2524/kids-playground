import React from "react";
import { Path } from "react-native-svg";

export function NepalFlagPuzzleScene() {
  return (
    <>
      {/* 바깥쪽 파란색 테두리 패스 */}
      <Path
        d="M -2,-2 L 150,-2 L 60,92 L 180,92 L 20,186 L 20,130 L -2,130 Z"
        fill="#003893"
      />
      {/* 안쪽 진홍색(Crimson Red) 바탕 패스 */}
      <Path
        d="M 5,6 L 135,6 L 55,88 L 160,88 L 26,174 L 26,122 L 5,122 Z"
        fill="#DC143C"
      />
    </>
  );
}

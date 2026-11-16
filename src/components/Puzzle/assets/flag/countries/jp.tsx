import * as React from "react";
import Svg, { Circle, G, Rect } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

// 기존 퍼즐판과 조각이 공유하는 좌표계
export const FLAG_VIEW_BOX = "0 0 240 180";

type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// 퍼즐판 전체를 채우는 일본 국기 배경
const FLAG_WIDTH = 240;
const FLAG_HEIGHT = 180;

// 일본 국기 원의 지름은 국기 높이의 3/5
const SUN_RADIUS = (FLAG_HEIGHT * 3) / 10;

export const JPFlagArtwork = React.memo(function JPFlagArtwork() {
  return (
    <G>
      {/* 흰색 배경 */}
      <Rect
        x={0}
        y={0}
        width={FLAG_WIDTH}
        height={FLAG_HEIGHT}
        fill="#FFFFFF"
      />

      {/* 중앙의 빨간 원: 정원 유지 */}
      <Circle
        cx={FLAG_WIDTH / 2}
        cy={FLAG_HEIGHT / 2}
        r={SUN_RADIUS}
        fill="#BC002D"
      />
    </G>
  );
});

export default function JPFlag(props: FlagProps) {
  return (
    <Svg
      width={240}
      height={180}
      {...props}
      viewBox={FLAG_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <JPFlagArtwork />
    </Svg>
  );
}

// import React from "react";
// import { Rect, Path, Polygon } from "react-native-svg";

// export function AustraliaPuzzleScene() {
//   const starPoints =
//     "5,1 6.3,3.8 9.5,3.8 6.9,5.5 7.9,8.5 5,6.8 2.1,8.5 3.1,5.5 0.5,3.8 3.7,3.8";

//   return (
//     <>
//       {/* 파란색 배경 영역 확장 */}
//       <Rect x="-2" y="-2" width="244" height="184" fill="#012169" />

//       {/* 좌상단 영국 국기 (유니언잭) 간소화 영역 */}
//       <Rect x="-2" y="-2" width="120" height="90" fill="#012169" />
//       <Path d="M0,0 L120,90 M120,0 L0,90" stroke="#FFFFFF" strokeWidth="14" />
//       <Path d="M0,0 L120,90 M120,0 L0,90" stroke="#C8102E" strokeWidth="7" />
//       <Rect x="50" y="-2" width="20" height="90" fill="#FFFFFF" />
//       <Rect x="-2" y="35" width="120" height="20" fill="#FFFFFF" />
//       <Rect x="55" y="-2" width="10" height="90" fill="#C8102E" />
//       <Rect x="-2" y="40" width="120" height="10" fill="#C8102E" />

//       {/* 연방별 (Commonwealth Star - 7각별이지만 표현상 기본 별 활용) */}
//       <Polygon
//         points={starPoints}
//         fill="#FFFFFF"
//         transform="translate(60, 135) scale(2.2)"
//       />

//       {/* 남십자성 (Southern Cross) 4개의 7각별 */}
//       <Polygon
//         points={starPoints}
//         fill="#FFFFFF"
//         transform="translate(180, 45) scale(1.5)"
//       />
//       <Polygon
//         points={starPoints}
//         fill="#FFFFFF"
//         transform="translate(210, 110) scale(1.8)"
//       />
//       <Polygon
//         points={starPoints}
//         fill="#FFFFFF"
//         transform="translate(180, 150) scale(1.2)"
//       />
//       <Polygon
//         points={starPoints}
//         fill="#FFFFFF"
//         transform="translate(150, 105) scale(1.5)"
//       />
//     </>
//   );
// }

import React from "react";
import { Rect, Path, Polygon } from "react-native-svg";

export function AustraliaPuzzleScene() {
  // N각별 좌표 계산 함수 (cx, cy, outerRadius, innerRadius, pointsCount)
  const createStarPoints = (
    cx: number,
    cy: number,
    outerRadius: number,
    innerRadius: number,
    numPoints: number,
  ) => {
    const points = [];
    const angleStep = Math.PI / numPoints;

    for (let i = 0; i < 2 * numPoints; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      // 상단 꼭짓점(-PI / 2)부터 시작
      const angle = i * angleStep - Math.PI / 2;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
    }

    return points.join(" ");
  };

  // 1. 7각별 좌표 (외경 10, 내경 4.5 기준)
  const star7Points = createStarPoints(0, 0, 10, 4.5, 7);

  // 2. 5각별 좌표 (외경 10, 내경 4 기준)
  const star5Points = createStarPoints(0, 0, 10, 4, 5);

  return (
    <>
      {/* 파란색 배경 영역 확장 */}
      <Rect x="-2" y="-2" width="244" height="184" fill="#012169" />

      {/* 좌상단 영국 국기 (유니언잭) 영역 */}
      <Rect x="-2" y="-2" width="122" height="92" fill="#012169" />
      <Path d="M0,0 L120,90 M120,0 L0,90" stroke="#FFFFFF" strokeWidth="14" />
      <Path d="M0,0 L120,90 M120,0 L0,90" stroke="#C8102E" strokeWidth="7" />
      <Rect x="50" y="-2" width="20" height="92" fill="#FFFFFF" />
      <Rect x="-2" y="35" width="122" height="20" fill="#FFFFFF" />
      <Rect x="55" y="-2" width="10" height="92" fill="#C8102E" />
      <Rect x="-2" y="40" width="122" height="10" fill="#C8102E" />

      {/* 1. 연방의 별 (Commonwealth Star - 좌하단 커다란 7각별) */}
      <Polygon
        points={star7Points}
        fill="#FFFFFF"
        transform="translate(60, 135) scale(1.6)"
      />

      {/* 2. 남십자성 (Southern Cross - 우측 영역 5개 별) */}

      {/* Gamma Crucis (상단 7각별) */}
      <Polygon
        points={star7Points}
        fill="#FFFFFF"
        transform="translate(180, 32) scale(0.85)"
      />

      {/* Beta Crucis (좌측 7각별) */}
      <Polygon
        points={star7Points}
        fill="#FFFFFF"
        transform="translate(148, 72) scale(0.85)"
      />

      {/* Delta Crucis (우측 7각별) */}
      <Polygon
        points={star7Points}
        fill="#FFFFFF"
        transform="translate(212, 62) scale(0.85)"
      />

      {/* Epsilon Crucis (우하단 작은 5각별!) */}
      <Polygon
        points={star5Points}
        fill="#FFFFFF"
        transform="translate(196, 96) scale(0.55)"
      />

      {/* Alpha Crucis (하단 7각별) */}
      <Polygon
        points={star7Points}
        fill="#FFFFFF"
        transform="translate(180, 142) scale(0.85)"
      />
    </>
  );
}

// import React from "react";
// import Svg, { Path as SvgPath } from "react-native-svg";

// export interface TrailPoint {
//   x: number;
//   y: number;
//   completed: boolean;
// }

// interface MapTrailProps {
//   width: number;
//   height: number;
//   points: TrailPoint[];
// }

// function buildSegmentPath(p1: TrailPoint, p2: TrailPoint) {
//   const midY = (p1.y + p2.y) / 2;
//   return `M ${p1.x} ${p1.y} C ${p1.x} ${midY}, ${p2.x} ${midY}, ${p2.x} ${p2.y}`;
// }

// export default function MapTrail({ width, height, points }: MapTrailProps) {
//   if (points.length < 2 || width === 0 || height === 0) return null;

//   return (
//     <Svg
//       width={width}
//       height={height}
//       viewBox={`0 0 ${width} ${height}`}
//       style={{ position: "absolute", top: 0, left: 0 }}
//       pointerEvents="none"
//     >
//       {points.slice(0, -1).map((point, index) => {
//         const next = points[index + 1];
//         const d = buildSegmentPath(point, next);
//         const isWalked = point.completed;

//         return (
//           <React.Fragment key={`segment-${index}`}>
//             {/* 배경 두꺼운 경로 선 */}
//             <SvgPath
//               d={d}
//               fill="none"
//               stroke={isWalked ? "#9ADFC8" : "#CFC8F8"}
//               strokeWidth={14}
//               strokeLinecap="round"
//             />
//             {/* 안쪽 점선 패스 */}
//             <SvgPath
//               d={d}
//               fill="none"
//               stroke="#FFFFFF"
//               strokeWidth={4}
//               strokeLinecap="round"
//               strokeDasharray="4 10"
//               opacity={0.9}
//             />
//           </React.Fragment>
//         );
//       })}
//     </Svg>
//   );
// }

import React, { memo } from "react";
import Svg, { Path as SvgPath } from "react-native-svg";

export interface TrailPoint {
  x: number;
  y: number;
  completed: boolean;
}

interface MapTrailProps {
  width: number;
  height: number;
  points: TrailPoint[];
  visibleTop: number;
  visibleBottom: number;
}

const SEGMENTS_PER_SVG = 6;
const SEGMENT_PADDING = 12;

function buildSegmentPath(p1: TrailPoint, p2: TrailPoint, offsetY: number) {
  const y1 = p1.y - offsetY;
  const y2 = p2.y - offsetY;
  const midY = (y1 + y2) / 2;

  return `
    M ${p1.x} ${y1}
    C ${p1.x} ${midY},
      ${p2.x} ${midY},
      ${p2.x} ${y2}
  `;
}

function MapTrail({
  width,
  height,
  points,
  visibleTop,
  visibleBottom,
}: MapTrailProps) {
  if (points.length < 2 || width <= 0 || height <= 0) {
    return null;
  }

  const segmentCount = points.length - 1;
  const groups = [];

  for (
    let startIndex = 0;
    startIndex < segmentCount;
    startIndex += SEGMENTS_PER_SVG
  ) {
    const endIndex = Math.min(startIndex + SEGMENTS_PER_SVG, segmentCount);

    const groupPoints = points.slice(startIndex, endIndex + 1);

    const minY = Math.min(...groupPoints.map((point) => point.y));

    const maxY = Math.max(...groupPoints.map((point) => point.y));

    const svgTop = Math.max(0, minY - SEGMENT_PADDING);

    const svgBottom = Math.min(height, maxY + SEGMENT_PADDING);

    // 현재 화면과 사전 렌더링 영역에 포함되지 않으면
    // SVG 자체를 생성하지 않음
    if (svgBottom < visibleTop || svgTop > visibleBottom) {
      continue;
    }

    const svgHeight = svgBottom - svgTop;

    if (svgHeight <= 0) continue;

    const segments = groupPoints.slice(0, -1).map((point, index) => {
      const next = groupPoints[index + 1];

      return {
        key: `segment-${startIndex + index}`,
        d: buildSegmentPath(point, next, svgTop),
        completed: point.completed,
      };
    });

    groups.push({
      key: `trail-group-${startIndex}`,
      svgTop,
      svgHeight,
      segments,
    });
  }

  return (
    <>
      {groups.map((group) => (
        <Svg
          key={group.key}
          width={width}
          height={group.svgHeight}
          viewBox={`0 0 ${width} ${group.svgHeight}`}
          style={{
            position: "absolute",
            top: group.svgTop,
            left: 0,
          }}
          pointerEvents="none"
        >
          {group.segments.map((segment) => (
            <React.Fragment key={segment.key}>
              <SvgPath
                d={segment.d}
                fill="none"
                stroke={segment.completed ? "#9ADFC8" : "#CFC8F8"}
                strokeWidth={14}
                strokeLinecap="round"
              />

              <SvgPath
                d={segment.d}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth={4}
                strokeLinecap="round"
                strokeDasharray="4 10"
                opacity={0.9}
              />
            </React.Fragment>
          ))}
        </Svg>
      ))}
    </>
  );
}

export default memo(MapTrail);

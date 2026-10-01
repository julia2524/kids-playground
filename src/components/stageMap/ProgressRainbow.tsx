import React from "react";
import Svg, { G, Path } from "react-native-svg";

interface ProgressRainbowProps {
  progress: number; // 0 ~ 10
  size?: number;
}

const TOTAL_PARTS = 10;

// 무지개 7색
const RAINBOW_COLORS = [
  "#F44336", // 빨강
  "#FF9800", // 주황
  "#FFD835", // 노랑
  "#4CAF50", // 초록
  "#42A5F5", // 파랑
  "#5C6BC0", // 남색
  "#AB47BC", // 보라
];

export default function ProgressRainbow({
  progress,
  size = 100,
}: ProgressRainbowProps) {
  const safeProgress = Math.max(0, Math.min(progress, TOTAL_PARTS));

  const center = size / 2;

  // 무지개 바깥쪽
  const outerRadius = size * 0.47;

  // 무지개 안쪽
  const innerRadius = size * 0.12;

  // 7개의 색 띠 두께
  const bandWidth = (outerRadius - innerRadius) / RAINBOW_COLORS.length;

  // 무지개는 위쪽 반원
  const startAngle = 180;
  const totalAngle = 180;

  // 10등분
  const segmentAngle = totalAngle / TOTAL_PARTS;

  /**
   * 무지개 한 조각을 만드는 Path
   *
   * 중요한 점:
   * stroke를 사용하지 않아서
   * 10개 구간으로 나뉘어도 경계선이 보이지 않는다.
   */
  const createArcPath = (
    innerR: number,
    outerR: number,
    startDeg: number,
    endDeg: number,
  ) => {
    const startRad = (startDeg * Math.PI) / 180;
    const endRad = (endDeg * Math.PI) / 180;

    const outerStartX = center + Math.cos(startRad) * outerR;

    const outerStartY = center + Math.sin(startRad) * outerR;

    const outerEndX = center + Math.cos(endRad) * outerR;

    const outerEndY = center + Math.sin(endRad) * outerR;

    const innerEndX = center + Math.cos(endRad) * innerR;

    const innerEndY = center + Math.sin(endRad) * innerR;

    const innerStartX = center + Math.cos(startRad) * innerR;

    const innerStartY = center + Math.sin(startRad) * innerR;

    return `
      M ${outerStartX} ${outerStartY}

      A ${outerR} ${outerR}
        0 0 1
        ${outerEndX} ${outerEndY}

      L ${innerEndX} ${innerEndY}

      A ${innerR} ${innerR}
        0 0 0
        ${innerStartX} ${innerStartY}

      Z
    `;
  };

  return (
    <Svg
      width={size}
      height={size * 0.55}
      viewBox={`0 0 ${size} ${size * 0.55}`}
    >
      <G>
        {Array.from({ length: TOTAL_PARTS }, (_, partIndex) => {
          const partStart = startAngle + partIndex * segmentAngle;

          const partEnd = startAngle + (partIndex + 1) * segmentAngle;

          /**
           * 이 구간이 얼마나 채워졌는지 계산
           *
           * progress
           * 0    → 아무것도 안 채움
           * 1    → 1/10
           * 5    → 5/10
           * 10   → 전체
           *
           * 0.5  → 첫 구간 절반
           * 1.5  → 1구간 전체 + 2구간 절반
           */
          const partProgress = Math.max(
            0,
            Math.min(1, safeProgress - partIndex),
          );

          return (
            <G key={partIndex}>
              {RAINBOW_COLORS.map((color, colorIndex) => {
                const bandOuterRadius = outerRadius - colorIndex * bandWidth;

                const bandInnerRadius = bandOuterRadius - bandWidth;

                /**
                 * 아직 진행되지 않은 부분
                 */
                if (partProgress === 0) {
                  return (
                    <Path
                      key={colorIndex}
                      d={createArcPath(
                        bandInnerRadius,
                        bandOuterRadius,
                        partStart,
                        partEnd,
                      )}
                      fill="#F3F4F8"
                    />
                  );
                }

                /**
                 * 이미 완료된 부분
                 */
                if (partProgress === 1) {
                  return (
                    <Path
                      key={colorIndex}
                      d={createArcPath(
                        bandInnerRadius,
                        bandOuterRadius,
                        partStart,
                        partEnd,
                      )}
                      fill={color}
                    />
                  );
                }

                /**
                 * 현재 진행 중인 부분
                 *
                 * 예:
                 * progress = 0.5
                 *
                 * → 첫 번째 구간의 절반만 색칠
                 */
                const currentEnd =
                  partStart + (partEnd - partStart) * partProgress;

                return (
                  <G key={colorIndex}>
                    {/* 아직 안 채워진 부분 */}
                    <Path
                      d={createArcPath(
                        bandInnerRadius,
                        bandOuterRadius,
                        currentEnd,
                        partEnd,
                      )}
                      fill="#F3F4F8"
                    />

                    {/* 채워진 부분 */}
                    <Path
                      d={createArcPath(
                        bandInnerRadius,
                        bandOuterRadius,
                        partStart,
                        currentEnd,
                      )}
                      fill={color}
                    />
                  </G>
                );
              })}
            </G>
          );
        })}
      </G>
      <Path
        d={createArcPath(
          innerRadius,
          outerRadius,
          startAngle,
          startAngle + totalAngle,
        )}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </Svg>
  );
}

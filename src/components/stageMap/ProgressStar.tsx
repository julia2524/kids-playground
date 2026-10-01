import React from "react";

import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Path,
  ClipPath,
  G,
  Polygon,
} from "react-native-svg";

interface ProgressStarProps {
  size?: number;

  // ⭐ 0 ~ 10
  progress?: number;
}

type Point = {
  x: number;
  y: number;
};

export default function ProgressStar({
  size = 90,
  progress = 0,
}: ProgressStarProps) {
  const safeProgress = Math.max(0, Math.min(10, progress));

  // ==========================================
  // ⭐ 별의 중심
  // ==========================================

  const center: Point = {
    x: 50,
    y: 50,
  };

  // ==========================================
  // ⭐⭐⭐ 젤리 별 Path
  //
  // 꽃잎처럼 통통한 5개의 팔
  // ==========================================

  const jellyStarPath = `
    M 50 7

    C 56 7, 61 17, 65 27
    C 67 32, 69 34, 74 34

    C 84 33, 94 33, 96 39
    C 98 45, 89 52, 80 57

    C 76 59, 75 62, 77 67

    C 81 77, 84 88, 79 92
    C 74 96, 63 88, 55 81

    C 52 78, 48 78, 45 81

    C 37 88, 26 96, 21 92
    C 16 88, 19 77, 23 67

    C 25 62, 24 59, 20 57

    C 11 52, 2 45, 4 39
    C 6 33, 16 33, 26 34

    C 31 34, 33 32, 35 27

    C 39 17, 44 7, 50 7

    Z
  `;

  // ==========================================
  // ⭐⭐⭐ 실제 젤리 별에 맞춘
  // 10개의 진행 기준점
  //
  // 바깥 팔 → 안쪽 골 → 바깥 팔...
  //
  // ⭐ 시계방향 순서!
  // ==========================================

  const segmentPoints: Point[] = [
    // 1️⃣ 위쪽 팔
    { x: 50, y: 7 },

    // 2️⃣ 오른쪽 위 골
    { x: 74, y: 34 },

    // 3️⃣ 오른쪽 팔
    { x: 96, y: 39 },

    // 4️⃣ 오른쪽 아래 골
    { x: 77, y: 67 },

    // 5️⃣ 오른쪽 아래 팔
    { x: 79, y: 92 },

    // 6️⃣ 아래쪽 골
    { x: 50, y: 78 },

    // 7️⃣ 왼쪽 아래 팔
    { x: 21, y: 92 },

    // 8️⃣ 왼쪽 아래 골
    { x: 23, y: 67 },

    // 9️⃣ 왼쪽 팔
    { x: 4, y: 39 },

    // 🔟 왼쪽 위 골
    { x: 26, y: 34 },
  ];

  // ==========================================
  // ⭐ 채워진 조각 개수
  // ==========================================

  const filledCount = Math.floor(safeProgress);

  // ==========================================
  // ⭐⭐⭐ 진행 조각 생성
  //
  // 중심 → 현재 기준점 → 다음 기준점
  //
  // 그리고 젤리별 Path로 잘라냄
  // ==========================================

  const filledSegments = Array.from(
    {
      length: filledCount,
    },
    (_, index) => {
      const currentPoint = segmentPoints[index];

      const nextPoint = segmentPoints[(index + 1) % segmentPoints.length];

      return (
        <Polygon
          key={index}
          points={`
            ${center.x},${center.y}
            ${currentPoint.x},${currentPoint.y}
            ${nextPoint.x},${nextPoint.y}
          `}
          fill="url(#progressGrad)"
        />
      );
    },
  );

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Defs>
        {/* ==============================
            ⭐ 빈 별 색상
        ============================== */}

        <LinearGradient id="emptyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#F8FAFC" />

          <Stop offset="100%" stopColor="#CBD5E1" />
        </LinearGradient>

        {/* ==============================
            ⭐ 진행 색상
        ============================== */}

        <LinearGradient id="progressGrad" x1="15%" y1="0%" x2="85%" y2="100%">
          <Stop offset="0%" stopColor="#FFEA00" />

          <Stop offset="50%" stopColor="#FFEA00" />

          <Stop offset="100%" stopColor="#FFEA00" />
        </LinearGradient>

        {/* ==============================
            ⭐ 젤리별 영역으로 Clip
        ============================== */}

        <ClipPath id="jellyStarClip">
          <Path d={jellyStarPath} />
        </ClipPath>
      </Defs>

      {/* ==============================
          ⭐ 빈 젤리 별
      ============================== */}

      <Path d={jellyStarPath} fill="url(#emptyGrad)" />

      {/* ==============================
          ⭐⭐⭐ 진행된 조각
      ============================== */}

      <G clipPath="url(#jellyStarClip)">{filledSegments}</G>

      {/* ==============================
          ⭐ 통통한 흰색 테두리
      ============================== */}

      <Path
        d={jellyStarPath}
        fill="transparent"
        stroke="#FFFFFF"
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* ==============================
          ⭐ 젤리 광택
      ============================== */}

      <Path
        d="
          M 43 17
          C 46 12, 51 11, 54 15
          C 56 18, 55 20, 52 21
          C 48 22, 45 21, 43 17
          Z
        "
        fill="#FFFFFF"
        opacity="0.35"
      />
    </Svg>
  );
}

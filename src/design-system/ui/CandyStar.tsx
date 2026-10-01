import React from "react";
import {
  Svg,
  Defs,
  LinearGradient,
  Stop,
  Path,
  ClipPath,
  Rect,
  G,
} from "react-native-svg";

interface CandyStarProps {
  size?: number;
  type?: "full" | "half" | "empty";
}

export default function CandyStar({
  size = 32,
  type = "full",
}: CandyStarProps) {
  const emojiStarPath =
    "M16 2.4l4.03 8.16 9.01 1.31-6.52 6.35 1.54 8.97L16 23.01l-8.06 4.18 1.54-8.97-6.52-6.35 9.01-1.31z";

  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <Defs>
        {/* 🌼 노란 별 그라데이션 */}
        <LinearGradient id="forsythiaGrad" x1="20%" y1="0%" x2="80%" y2="100%">
          <Stop offset="0%" stopColor="#FFF176" />
          <Stop offset="40%" stopColor="#FFEE58" />
          <Stop offset="80%" stopColor="#FDD835" />
          <Stop offset="100%" stopColor="#FBC02D" />
        </LinearGradient>

        {/* 🌫️ 빈 별 그라데이션 */}
        <LinearGradient id="emptyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#F1F5F9" />
          <Stop offset="100%" stopColor="#CBD5E1" />
        </LinearGradient>

        {/* ⭐ 별 모양으로 자르기 */}
        <ClipPath id="starClip">
          <Path d={emojiStarPath} />
        </ClipPath>
      </Defs>

      {/* ==========================================
          🌫️ 빈 별
      ========================================== */}

      {type === "empty" && <Path d={emojiStarPath} fill="url(#emptyGrad)" />}

      {/* ==========================================
          ⭐ 반쪽 별
          왼쪽 → 노란색
          오른쪽 → 회색
      ========================================== */}

      {type === "half" && (
        <>
          {/* 전체 빈 별 */}
          <Path d={emojiStarPath} fill="url(#emptyGrad)" />

          {/* 왼쪽 절반만 노란색 */}
          <G clipPath="url(#starClip)">
            <Rect
              x="0"
              y="0"
              width="16"
              height="32"
              fill="url(#forsythiaGrad)"
            />
          </G>
        </>
      )}

      {/* ==========================================
          🌟 꽉 찬 별
      ========================================== */}

      {type === "full" && (
        <>
          {/* 별 본체 */}
          <Path d={emojiStarPath} fill="url(#forsythiaGrad)" />

          {/* ✨ 하이라이트 */}
          <Path
            d="M16 4.5C16 4.5 13.5 9 11 10.5C9.5 11.5 8 12 8 12C8 12 10 13.5 12 12.5C14 11.5 16 4.5 16 4.5Z"
            fill="#FFFFFF"
            opacity="0.6"
          />
        </>
      )}
    </Svg>
  );
}

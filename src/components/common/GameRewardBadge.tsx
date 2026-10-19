import React from "react";
import RainbowBadge from "../../design-system/ui/RainbowBadge";
import StarBadge from "../../design-system/ui/StarBadge";
import SunBadge from "../../design-system/ui/SunBadge";

export type RewardBadgeType = "full" | "half" | "empty";

export type GameType =
  | "color"
  | "shape"
  | "category"
  | "size"
  | "pattern"
  | "puzzle"
  | "maze"
  | string; // 확장성을 위해 string 허용

interface GameRewardBadgeProps {
  gameType: GameType;
  type: RewardBadgeType;
  size?: number;
}

export default function GameRewardBadge({
  gameType,
  type,
  size,
}: GameRewardBadgeProps) {
  // ☀️ 모양 분류 게임일 때 (SunBadge)
  if (gameType === "shape") {
    return <SunBadge type={type} size={size} />;
  }

  // 🌈 카테고리 분류 게임일 때 (RainbowBadge)
  if (gameType === "category") {
    return <RainbowBadge type={type} size={size} />;
  }

  // 🧩 추후 확장할 게임들 (필요에 따라 주석 해제 및 전용 배지 연결)
  // if (gameType === "pattern") {
  //   return <PatternBadge type={type} size={size} />;
  // }

  // ⭐️ 기본값 및 색상(Color) 분류 등은 별(StarBadge) 배지 사용
  return <StarBadge type={type} size={size} />;
}

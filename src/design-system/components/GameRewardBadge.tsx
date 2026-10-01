import StarBadge from "../ui/StarBadge";

export type RewardBadgeType = "full" | "half" | "empty";

interface GameRewardBadgeProps {
  gameType: "classification" | "pattern" | "puzzle" | "maze";

  type: RewardBadgeType;

  size?: number;
}

export default function GameRewardBadge({
  gameType,
  type,
  size,
}: GameRewardBadgeProps) {
  // 현재 Kids Playground에서는
  // 모든 게임의 보상을 별로 사용한다.
  return <StarBadge type={type} size={size} />;
}

//나중에 확장한다~
// if (gameType === "pattern") {
//   return <... />;
// }

// if (gameType === "puzzle") {
//   return <... />;
// }

// if (gameType === "maze") {
//   return <... />;
// }

// return <StarBadge ... />;

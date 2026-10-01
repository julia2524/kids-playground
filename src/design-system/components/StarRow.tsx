import React from "react";
import styled from "styled-components/native";

import GameRewardBadge, { RewardBadgeType } from "./GameRewardBadge";

interface StarRowProps {
  earnedStars: number;
  totalStars?: number;
  gameType: "classification" | "pattern" | "puzzle" | "maze";
  size?: number;
}

export default function StarRow({
  earnedStars,
  totalStars = 5,
  gameType,
  size = 28,
}: StarRowProps) {
  return (
    <Container>
      {Array.from({
        length: totalStars,
      }).map((_, index) => {
        const starPosition = index + 1;

        let type: RewardBadgeType = "empty";

        if (earnedStars >= starPosition) {
          type = "full";
        } else if (earnedStars >= starPosition - 0.5) {
          type = "half";
        }

        return (
          <GameRewardBadge
            key={index}
            gameType={gameType}
            type={type}
            size={size}
          />
        );
      })}
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;

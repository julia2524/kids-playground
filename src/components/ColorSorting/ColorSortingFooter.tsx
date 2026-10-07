import React from "react";
import styled from "styled-components/native";

type ColorSortingFooterProps = {
  totalRounds: number;
  roundIndex: number;
};

export default function ColorSortingFooter({
  totalRounds,
  roundIndex,
}: ColorSortingFooterProps) {
  return (
    <Footer>
      <DotIndicatorGroup>
        {Array.from({ length: totalRounds }).map((_, index) => (
          <Dot key={index} active={index === roundIndex} />
        ))}
      </DotIndicatorGroup>

      <RoundBadge>
        <RoundBadgeText>
          {roundIndex + 1} / {totalRounds}
        </RoundBadgeText>
      </RoundBadge>
    </Footer>
  );
}

const Footer = styled.View`
  position: relative;
  height: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 4px;
`;

const DotIndicatorGroup = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
  pointer-events: none;
`;

const Dot = styled.View<{
  active?: boolean;
}>`
  width: ${(props) => (props.active ? "18px" : "7px")};
  height: 7px;
  border-radius: 4px;
  background-color: ${(props) => (props.active ? "#7C5CFF" : "#C9C4DF")};
`;

const RoundBadge = styled.View`
  min-width: 50px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 14px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
`;

const RoundBadgeText = styled.Text`
  font-size: 11px;
  font-weight: 800;
  color: #64748b;
`;

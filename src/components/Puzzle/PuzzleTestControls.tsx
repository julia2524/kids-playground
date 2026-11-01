import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";
import { AppText } from "../../utils/AppText";

type PuzzleTestControlsProps = {
  level: number;
  totalLevels: number;
  onChangeLevel: (level: number) => void;
};

export default function PuzzleTestControls({
  level,
  totalLevels,
  onChangeLevel,
}: PuzzleTestControlsProps) {
  return (
    <TestControlBar>
      <TestGroup>
        <TestLabel>LEVEL</TestLabel>

        <TestArrowButton
          disabled={level === 1}
          onPress={() => onChangeLevel(level - 1)}
        >
          <Ionicons
            name="chevron-back"
            size={16}
            color={level === 1 ? "#C9C4D9" : "#6657B8"}
          />
        </TestArrowButton>

        <TestValue>
          {level}/{totalLevels}
        </TestValue>

        <TestArrowButton
          disabled={level === totalLevels}
          onPress={() => onChangeLevel(level + 1)}
        >
          <Ionicons
            name="chevron-forward"
            size={16}
            color={level === totalLevels ? "#C9C4D9" : "#6657B8"}
          />
        </TestArrowButton>
      </TestGroup>
    </TestControlBar>
  );
}

const TestControlBar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  margin: 8px auto 4px auto;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.6);
`;

const TestGroup = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const TestLabel = styled(AppText)`
  font-size: 9px;
  font-weight: 900;
  color: #aaa3c2;
`;

const TestArrowButton = styled.TouchableOpacity`
  width: 26px;
  height: 26px;
  border-radius: 13px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
`;

const TestValue = styled(AppText)`
  min-width: 45px;
  text-align: center;
  font-size: 11px;
  font-weight: 900;
  color: #6657b8;
`;

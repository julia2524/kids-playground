import React from "react";
import { Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";
import { AppText } from "../../utils/AppText";

type ColorSortingTestControlsProps = {
  level: number;
  totalLevels: number;
  roundIndex: number;
  totalRounds: number;

  onChangeLevel: (level: number) => void;
  onPreviousRound: () => void;
  onNextRound: () => void;
};

export default function ColorSortingTestControls({
  level,
  totalLevels,
  roundIndex,
  totalRounds,
  onChangeLevel,
  onPreviousRound,
  onNextRound,
}: ColorSortingTestControlsProps) {
  return (
    <TestControlBar>
      {/* Level */}
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

        <TestValue>{level}</TestValue>

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

      {/* Round */}
      <TestGroup>
        <TestLabel>ROUND</TestLabel>

        <TestSmallButton disabled={roundIndex === 0} onPress={onPreviousRound}>
          <Text>이전</Text>
        </TestSmallButton>

        <TestValue>
          {roundIndex + 1}/{totalRounds}
        </TestValue>

        <TestSmallButton
          disabled={roundIndex === totalRounds - 1}
          onPress={onNextRound}
        >
          <Text>다음</Text>
        </TestSmallButton>
      </TestGroup>
    </TestControlBar>
  );
}

const TestControlBar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 5px 8px;
  margin-bottom: 2px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.5);
`;

const TestGroup = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const TestLabel = styled(AppText)`
  font-size: 8px;
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

const TestSmallButton = styled.TouchableOpacity`
  min-width: 38px;
  height: 25px;
  padding-left: 7px;
  padding-right: 7px;
  border-radius: 13px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
`;

const TestValue = styled(AppText)`
  min-width: 30px;
  text-align: center;
  font-size: 10px;
  font-weight: 900;
  color: #6657b8;
`;

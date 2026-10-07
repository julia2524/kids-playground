import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";

type RoundResult = "correct" | "wrong";

type ColorSortingResultOverlayProps = {
  result: RoundResult;
  roundIndex: number;
  totalRounds: number;
  isLastLevel: boolean;
  onNext: () => void;
};

export default function ColorSortingResultOverlay({
  result,
  roundIndex,
  totalRounds,
  isLastLevel,
  onNext,
}: ColorSortingResultOverlayProps) {
  const isCorrect = result === "correct";

  const buttonText =
    roundIndex === totalRounds - 1
      ? isLastLevel
        ? "완료"
        : "다음 Level"
      : "다음 라운드";

  return (
    <ResultOverlay>
      <ResultCard>
        {isCorrect ? (
          <>
            <ResultEmoji>🎉</ResultEmoji>

            <ResultTitle>정말 잘했어요!</ResultTitle>

            <ResultDescription>
              모든 물건을
              <ResultStrong> 알맞은 색깔</ResultStrong>에 넣었어요!
            </ResultDescription>
          </>
        ) : (
          <>
            <ResultEmoji>🌱</ResultEmoji>

            <ResultTitle>한 번 더 해볼까요?</ResultTitle>

            <ResultDescription>
              색깔을 다시 살펴보고 넣어볼까요?
            </ResultDescription>
          </>
        )}

        <ResultButton onPress={onNext} activeOpacity={0.85}>
          <ResultButtonText>{buttonText}</ResultButtonText>

          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </ResultButton>
      </ResultCard>
    </ResultOverlay>
  );
}

const ResultOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(83, 71, 135, 0.28);
  align-items: center;
  justify-content: center;
  padding: 28px;
`;

const ResultCard = styled.View`
  width: 100%;
  max-width: 340px;
  padding: 28px 24px 22px;
  border-radius: 30px;
  background-color: #ffffff;
  align-items: center;
  elevation: 8;
  shadow-color: #5d5193;
  shadow-offset: 0px 6px;
  shadow-opacity: 0.18;
  shadow-radius: 14px;
`;

const ResultEmoji = styled.Text`
  font-size: 48px;
  margin-bottom: 8px;
`;

const ResultTitle = styled.Text`
  font-size: 22px;
  font-weight: 900;
  color: #332c58;
  text-align: center;
`;

const ResultDescription = styled.Text`
  margin-top: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #817a9e;
  text-align: center;
  line-height: 21px;
`;

const ResultStrong = styled.Text`
  font-weight: 900;
  color: #6657b8;
`;

const ResultButton = styled.TouchableOpacity`
  width: 100%;
  height: 52px;
  margin-top: 22px;
  border-radius: 26px;
  background-color: #7c5cff;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  elevation: 3;
  shadow-color: #7c5cff;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 6px;
`;

const ResultButtonText = styled.Text`
  font-size: 16px;
  font-weight: 900;
  color: #ffffff;
`;

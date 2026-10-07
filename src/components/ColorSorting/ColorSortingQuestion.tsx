import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";

type ColorSortingQuestionProps = {
  text?: string;
};

export default function ColorSortingQuestion({
  text = "색깔에 맞춰 모아볼까요?",
}: ColorSortingQuestionProps) {
  return (
    <QuestionCard>
      <SpeakerCircle>
        <Ionicons name="volume-medium" size={15} color="#7C5CFF" />
      </SpeakerCircle>

      <QuestionText>{text}</QuestionText>
    </QuestionCard>
  );
}

const QuestionCard = styled.View`
  align-self: center;
  flex-direction: row;
  align-items: center;
  min-height: 48px;
  padding-left: 14px;
  padding-right: 14px;
  padding-top: 8px;
  padding-bottom: 8px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  elevation: 2;
  shadow-color: #7c5cff;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.06;
  shadow-radius: 5px;
`;

const SpeakerCircle = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin-right: 8px;
  background-color: #ede9fe;
  align-items: center;
  justify-content: center;
`;

const QuestionText = styled.Text`
  font-size: 15px;
  font-weight: 800;
  color: #29263d;
`;

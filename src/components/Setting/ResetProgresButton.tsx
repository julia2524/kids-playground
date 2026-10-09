import React from "react";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { AppText } from "../../utils/AppText";
import { colors } from "../../design-system/tokens/colors";
import { SETTING_LEVEL_CLEAR_INFO } from "../../constants/game";
import { StageMapGameType } from "../../types/game";

interface ResetButtonProps {
  gameType: StageMapGameType;
  onPress: () => void;
}

export default function ResetProgressButton({
  gameType,
  onPress,
}: ResetButtonProps) {
  const { iconName, title, description } = SETTING_LEVEL_CLEAR_INFO[
    gameType
  ] ?? {
    iconName: "color-palette",
    title: "분류 놀이 (색상)",
    description: "색상 분류 게임의 진행 기록을 초기화합니다.",
  };

  return (
    <ResetButtonContainer onPress={onPress} activeOpacity={0.8}>
      <GameIconWrapper>
        <Ionicons name={iconName as any} size={22} color={colors.purple} />
      </GameIconWrapper>

      <GameInfo>
        <GameTitle>{title}</GameTitle>
        <GameDescription>{description}</GameDescription>
      </GameInfo>

      <Arrow>›</Arrow>
    </ResetButtonContainer>
  );
}

/* ================================================================
   Styled Components
================================================================ */

const ResetButtonContainer = styled.TouchableOpacity`
  min-height: 72px;
  flex-direction: row;
  align-items: center;
  padding: 12px 14px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  border-width: 1.5px;
  border-color: ${colors.border.default};
`;

const GameIconWrapper = styled.View`
  width: 44px;
  height: 44px;
  margin-right: 12px;
  align-items: center;
  justify-content: center;
  border-radius: 22px;
  background-color: ${colors.button.secondary};
`;

const GameInfo = styled.View`
  flex: 1;
`;

const GameTitle = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.body.fontSize}px;
  line-height: ${(props) => props.theme.typography.body.lineHeight}px;
  font-weight: ${(props) => props.theme.typography.body.fontWeight};
  color: ${colors.textGroup.primary};
`;

const GameDescription = styled(AppText)`
  margin-top: 2px;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.bodySmall.fontSize}px;
  line-height: ${(props) => props.theme.typography.bodySmall.lineHeight}px;
  font-weight: ${(props) => props.theme.typography.bodySmall.fontWeight};
  color: ${colors.textGroup.secondary};
`;

const Arrow = styled(AppText)`
  margin-left: 8px;
  font-size: 24px;
  font-weight: 400;
  color: ${colors.textGroup.muted};
`;

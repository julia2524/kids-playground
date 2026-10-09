import React, { ReactNode } from "react";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Mascot from "../design-system/components/Mascot";
import { AppText } from "../utils/AppText";
import { colors } from "../design-system/tokens/colors";

interface HeaderProps {
  onBackPress?: () => void;
  onMascotPress?: () => void;
  title?: ReactNode;
  subtitle?: string;
  children?: ReactNode;
}

export default function AppHeader({
  onBackPress,
  onMascotPress,
  title,
  subtitle,
  children,
}: HeaderProps) {
  return (
    <Container>
      {/* 1. 좌측 뒤로가기 버튼 */}
      <HeaderButton onPress={onBackPress} activeOpacity={0.7}>
        <Ionicons name="chevron-back" size={24} color="#7C5CFF" />
      </HeaderButton>

      {/* 2. 중앙 영역 */}
      <CenterArea>
        {children ? (
          children
        ) : (
          <>
            {title &&
              (typeof title === "string" ? (
                <HeaderTitleText>{title}</HeaderTitleText>
              ) : (
                <TitleContainer>{title}</TitleContainer>
              ))}

            {subtitle && <HeaderSubtitleText>{subtitle}</HeaderSubtitleText>}
          </>
        )}
      </CenterArea>

      {/* 3. 우측 마스코트 버튼 */}
      <HeaderButton onPress={onMascotPress} activeOpacity={0.7}>
        <Mascot size={36} />
      </HeaderButton>
    </Container>
  );
}

// --- Styled Components ---

// const Container = styled.View`
//   height: 64px;
//   padding-horizontal: 20px;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
//   background-color: transparent;
// `;

// const HeaderButton = styled.TouchableOpacity`
//   width: 44px;
//   height: 44px;
//   border-radius: 22px;
//   background-color: #ffffff;
//   justify-content: center;
//   align-items: center;
//   border-width: 1.5px;
//   border-color: #e6e1f4;
//   elevation: 2;
//   shadow-color: #7c5cff;
//   shadow-offset: 0px 2px;
//   shadow-opacity: 0.1;
//   shadow-radius: 4px;
// `;

// const CenterArea = styled.View`
//   flex: 1;
//   align-items: center;
//   justify-content: center;
// `;

// const HeaderTitleText = styled(AppText)`
//   font-size: 18px;
//   font-weight: 900;
//   color: #29263d;
//   text-align: center;
// `;

// const TitleContainer = styled.View`
//   align-items: center;
//   justify-content: center;
// `;

// const HeaderSubtitleText = styled(AppText)`
//   font-size: 12px;
//   color: #7c5cff;
//   margin-top: 1px;
//   text-align: center;
// `;

export const Container = styled.View`
  height: 64px;
  padding-horizontal: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
`;

export const HeaderButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: ${colors.white};
  justify-content: center;
  align-items: center;
  border-width: 1.5px;
  border-color: ${colors.border.default};
  elevation: 2;
  shadow-color: #7c5cff;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const CenterArea = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const HeaderTitleText = styled(AppText)`
  font-size: ${(props) => props.theme.typography.button.fontSize}px;
  color: ${(props) => props.theme.colors.textGroup.primary};
  text-align: center;
`;

export const TitleContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const HeaderSubtitleText = styled(AppText)`
  font-size: ${(props) => props.theme.typography.caption.fontSize}px;
  color: ${colors.purple};
  margin-top: 1px;
  text-align: center;
`;

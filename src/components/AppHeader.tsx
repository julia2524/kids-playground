import React, { ReactNode } from "react";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Mascot from "../design-system/components/Mascot";
import { AppText } from "../utils/AppText";

interface HeaderProps {
  onBackPress?: () => void;
  onMascotPress?: () => void;
  title?: ReactNode;
  subtitle?: string; // ⭐ string에서 ReactNode로 변경!
  children?: ReactNode; // 별점 등 커스텀 중앙 영역용
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
        <Ionicons name="chevron-back" size={22} color="#7C5CFF" />
      </HeaderButton>

      {/* 2. 중앙 영역 (children이 있으면 커스텀 UI, 없으면 텍스트 UI) */}
      <CenterArea>
        {children ? (
          children
        ) : (
          <>
            {/* ⭐ title 분기: 문자열(string)이면 HeaderTitleText, 컴포넌트면 TitleContainer */}
            {title &&
              (typeof title === "string" ? (
                <HeaderTitleText>{title}</HeaderTitleText>
              ) : (
                <TitleContainer>{title}</TitleContainer>
              ))}

            {/* Subtitle 처리 */}
            {subtitle && <HeaderSubtitleText>{subtitle}</HeaderSubtitleText>}
          </>
        )}
      </CenterArea>

      {/* 3. 우측 마스코트 버튼 */}
      <HeaderButton onPress={onMascotPress} activeOpacity={0.7}>
        <Mascot size={38} />
      </HeaderButton>
    </Container>
  );
}

// --- Styled Components ---

const Container = styled.View`
  padding-vertical: 10px;
  padding-horizontal: 18px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
`;

const HeaderButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 4px rgba(124, 92, 255, 0.08);
  elevation: 2;
`;

const CenterArea = styled.View`
  align-items: center;
  justify-content: center;
`;

const HeaderTitle = styled(AppText)`
  font-size: 17px;
  font-weight: 900;
  color: #29263d;
`;

const HeaderSubtitle = styled(AppText)`
  font-size: 12px;
  color: #7c5cff;
  margin-top: 2px;
`;

const HeaderTitleText = styled(AppText)`
  font-size: 17px;
  font-weight: 900;
  color: #29263d;
`;

const TitleContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const HeaderSubtitleText = styled(AppText)`
  font-size: 12px;
  color: #7c5cff;
  margin-top: 2px;
`;

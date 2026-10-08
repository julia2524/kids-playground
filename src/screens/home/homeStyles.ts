// ==================================================
// Styled Components
// ==================================================

import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import { AppText } from "../../utils/AppText";
import { Image } from "react-native";
import { COLORS } from "../../design-system/tokens/colors";

export const Container = styled(SafeAreaView)`
  flex: 1;
`;

// --- Header ---
export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-left: 18px;
  margin-right: 18px;
  margin-bottom: 18px;
`;

export const HeaderTitleGroup = styled.View``;

export const LogoRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LogoStar = styled.View`
  width: 38px;
  height: 38px;
  border-radius: 14px;
  background-color: ${COLORS.yellow};
  justify-content: center;
  align-items: center;
  margin-right: 9px;
`;

export const LogoStarText = styled(AppText)`
  font-size: 22px;
  color: ${COLORS.white};
`;

export const LogoText = styled(AppText)`
  font-size: 20px;
  line-height: 19px;
  font-weight: 900;
  color: ${COLORS.purple};
`;

export const HeaderSubText = styled(AppText)`
  font-size: 13px;
  color: ${COLORS.purple};
`;

export const IconButton = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: ${COLORS.purple};
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  shadow-offset: 0px 3px;
  elevation: 3;
`;

// --- Hero ---
export const HeroCard = styled.View`
  margin: 0px 18px 20px;
`;

export const HeroTextArea = styled.View`
  z-index: 2;
`;

export const HeroTitle = styled(AppText)`
  font-size: 25px;
  line-height: 32px;
  font-weight: 900;
  color: ${COLORS.text};
`;

export const HeroDescription = styled(AppText)`
  font-size: 14px;
  line-height: 20px;
  color: ${COLORS.secondaryText};
`;

// --- Filter ---
export const FilterRow = styled.View`
  flex-direction: row;
  gap: 8px;
  margin-top: 18px;
  margin-left: 18px;
  margin-right: 18px;
  margin-bottom: 18px;
`;

export const FilterButton = styled.TouchableOpacity<{ active?: boolean }>`
  flex: 1;
  min-height: 52px;
  border-radius: 18px;
  background-color: ${(props) => (props.active ? COLORS.purple : COLORS.white)};
  align-items: center;
  justify-content: center;
  padding-horizontal: 4px;
  shadow-color: #000;
  shadow-opacity: 0.06;
  shadow-radius: 6px;
  shadow-offset: 0px 2px;
  elevation: 2;
`;

export const FilterText = styled(AppText)<{ active?: boolean }>`
  margin-top: 3px;
  font-size: 11px;
  font-weight: 800;
  color: ${(props) => (props.active ? COLORS.white : COLORS.secondaryText)};
`;

// --- Game Grid & Cards ---
export const GameGrid = styled.View`
  width: 95%;

  align-self: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 14px;
`;

export const GameCard = styled.TouchableOpacity<{ bgColor: string }>`
  width: 48.2%;
  aspect-ratio: 0.88;
  border-radius: 25px;
  overflow: hidden;
  padding: 13px;
  background-color: ${(props) => props.bgColor};
  border-width: 2px;
  border-color: ${COLORS.white};
  shadow-color: #000;
  shadow-opacity: 0.09;
  shadow-radius: 9px;
  shadow-offset: 0px 4px;
  elevation: 3;
`;

export const CardIllustration = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const IllustrationText = styled(AppText)<{ isSmall?: boolean }>`
  font-size: ${(props) => (props.isSmall ? "16px" : "57px")};
  margin-top: ${(props) => (props.isSmall ? "-6px" : "0px")};
`;

export const IllustrationSmallText = styled(AppText)`
  margin-top: -6px;
  font-size: 16px;
`;

export const CardBottom = styled.View`
  min-height: 58px;
  border-radius: 17px;
  background-color: ${COLORS.white};
  padding-left: 11px;
  padding-right: 11px;
  padding-top: 10px;
  padding-bottom: 10px;
  align-items: center;
  justify-content: space-between;
`;

export const CardTitle = styled(AppText)`
  font-size: 15px;
  font-weight: 900;
  color: ${COLORS.text};
`;

export const CardDescription = styled(AppText)`
  font-size: 11px;
  color: ${COLORS.secondaryText};
`;

export const ArrowCircle = styled.View`
  width: 31px;
  height: 31px;
  border-radius: 16px;
  background-color: #f7f7fb;
  justify-content: center;
  align-items: center;
`;

// --- Coming Soon ---
export const ComingSoon = styled.View`
  margin-top: 18px;
  min-height: 58px;
  border-radius: 22px;
  background-color: ${COLORS.white};
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: #e8e4f5;
`;

export const ComingSoonEmoji = styled(AppText)`
  font-size: 16px;
  margin-bottom: 3px;
`;

export const ComingSoonText = styled(AppText)`
  font-size: 13px;
  font-weight: 800;
  color: ${COLORS.secondaryText};
`;

// --- Footer ---
export const Footer = styled.View`
  margin-top: 20px;
  height: 68px;
  border-radius: 25px;
  background-color: ${COLORS.white};
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  shadow-color: #000;
  shadow-opacity: 0.07;
  shadow-radius: 8px;
  shadow-offset: 0px 3px;
  elevation: 3;
`;

export const FooterItem = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  min-width: 60px;
`;

export const FooterText = styled(AppText)<{ active?: boolean }>`
  margin-top: 2px;
  font-size: 11px;
  font-weight: 700;
  color: ${(props) => (props.active ? COLORS.purple : COLORS.muted)};
`;

// --- Decoration Elements ---
export const Star = styled.View<{ starType: "star1" | "star2" | "star3" }>`
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 4px;
  opacity: 0.8;

  ${(props) =>
    props.starType === "star1"
      ? `
        top: 110px;
        right: 26px;
        background-color: ${COLORS.yellow};
      `
      : ""}

  ${(props) =>
    props.starType === "star2"
      ? `
        top: 290px;
        left: 13px;
        background-color: ${COLORS.pink};
      `
      : ""}

  ${(props) =>
    props.starType === "star3"
      ? `
        top: 540px;
        right: 12px;
        background-color: ${COLORS.mint};
      `
      : ""}
`;

export const DecorationPlanet = styled.View<{
  planetType: "planet1" | "planet2";
}>`
  position: absolute;
  border-radius: 999px;
  opacity: 0.25;

  ${(props) =>
    props.planetType === "planet1"
      ? `
        width: 100px;
        height: 100px;
        right: -48px;
        top: 170px;
        background-color: ${COLORS.blue};
      `
      : ""}

  ${(props) =>
    props.planetType === "planet2"
      ? `
        width: 70px;
        height: 70px;
        left: -35px;
        top: 630px;
        background-color: ${COLORS.pink};
      `
      : ""}
`;

export const BottomTab = styled.View<{ bottomInset: number }>`
  position: absolute;
  /* ⭐ 바닥에서 떠 있게 지정 (안드로이드 내장키 높이 + 여유 8px) */
  bottom: ${(props) => Math.max(props.bottomInset, 12) + 8}px;
  left: 16px;
  right: 16px;

  height: 64px;
  background-color: ${COLORS.white};

  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  /* ⭐ 동글동글한 알약/캡슐 형태 */
  border-radius: 32px;

  /* 부드러운 그림자 효과 */
  shadow-color: #5d5193;
  shadow-opacity: 0.12;
  shadow-radius: 12px;
  shadow-offset: 0px 4px;
  elevation: 6;
`;
export const TabItem = styled.TouchableOpacity<{ active?: boolean }>`
  align-items: center;
  justify-content: center;
`;

export const TabLabel = styled(AppText)<{ active?: boolean }>`
  font-size: 11px;
  font-weight: 800;
  color: ${(props) => (props.active ? COLORS.purple : COLORS.muted)};
  margin-top: 3px;
`;

export const CardImage = styled(Image)`
  flex: 1;
  width: 100%;
`;

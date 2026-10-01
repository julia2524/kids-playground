import styled from "styled-components/native";

// --- Container ---
export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

// --- Header ---
export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

export const HeaderTitleGroup = styled.View``;

export const LogoRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LogoStar = styled.View`
  width: 38px;
  height: 38px;
  border-radius: ${({ theme }) => theme.radius.md}px;
  background-color: ${({ theme }) => theme.colors.brand.yellow};
  justify-content: center;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.sm}px;
`;

export const LogoStarText = styled.Text`
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  color: ${({ theme }) => theme.colors.text.inverse};
`;

export const LogoText = styled.Text`
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  line-height: ${({ theme }) => theme.typography.h3.lineHeight}px;
  font-weight: ${({ theme }) => theme.typography.h3.fontWeight};
  color: ${({ theme }) => theme.colors.brand.primary};
`;

export const HeaderSubText = styled.Text`
  margin-top: ${({ theme }) => theme.spacing.xs}px;
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const IconButton = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radius.pill}px;
  background-color: ${({ theme }) => theme.colors.background.surface};
  align-items: center;
  justify-content: center;

  /* Soft Shadow */
  shadow-color: ${({ theme }) => theme.shadows.soft.shadowColor};
  shadow-offset: ${({ theme }) => theme.shadows.soft.shadowOffset.width}px
    ${({ theme }) => theme.shadows.soft.shadowOffset.height}px;
  shadow-opacity: ${({ theme }) => theme.shadows.soft.shadowOpacity};
  shadow-radius: ${({ theme }) => theme.shadows.soft.shadowRadius}px;
  elevation: ${({ theme }) => theme.shadows.soft.elevation};
`;

// --- Hero ---
export const HeroCard = styled.View`
  min-height: 185px;
  border-radius: ${({ theme }) => theme.radius.xxl}px;
  background-color: ${({ theme }) => theme.colors.background.surface};
  padding: ${({ theme }) => theme.spacing.xl}px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  overflow: hidden;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.border.dashed};

  /* Card Shadow */
  shadow-color: ${({ theme }) => theme.colors.brand.primary};
  shadow-offset: ${({ theme }) => theme.shadows.card.shadowOffset.width}px
    ${({ theme }) => theme.shadows.card.shadowOffset.height}px;
  shadow-opacity: 0.12; /* Hero 특화 커스텀 투명도 유지 */
  shadow-radius: ${({ theme }) => theme.shadows.card.shadowRadius}px;
  elevation: ${({ theme }) => theme.shadows.card.elevation};
`;

export const HeroTextArea = styled.View`
  width: 68%;
  z-index: 2;
`;

export const HeroSmall = styled.Text`
  font-size: ${({ theme }) => theme.typography.bodySmall.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.h1.fontWeight};
  color: ${({ theme }) => theme.colors.brand.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

export const HeroTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.gameQuestion.fontSize}px;
  line-height: ${({ theme }) => theme.typography.gameQuestion.lineHeight}px;
  font-weight: ${({ theme }) => theme.typography.gameQuestion.fontWeight};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const HeroDescription = styled.Text`
  margin-top: ${({ theme }) => theme.spacing.sm}px;
  font-size: ${({ theme }) => theme.typography.bodySmall.fontSize}px;
  line-height: ${({ theme }) => theme.typography.bodySmall.lineHeight}px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Rocket = styled.View`
  position: absolute;
  right: 13px;
  top: 24px;
`;

export const RocketText = styled.Text`
  font-size: 70px;
`;

export const HeroPlanet = styled.View`
  position: absolute;
  right: 13px;
  bottom: -12px;
`;

export const HeroPlanetText = styled.Text`
  font-size: 62px;
`;

// --- Filter ---
export const FilterRow = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

export const FilterButton = styled.TouchableOpacity<{ active?: boolean }>`
  flex: 1;
  min-height: 52px;
  border-radius: ${({ theme }) => theme.radius.xl}px;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.button.primary : theme.colors.background.surface};
  align-items: center;
  justify-content: center;
  padding-horizontal: ${({ theme }) => theme.spacing.xs}px;

  /* Soft Shadow */
  shadow-color: ${({ theme }) => theme.shadows.soft.shadowColor};
  shadow-offset: ${({ theme }) => theme.shadows.soft.shadowOffset.width}px
    ${({ theme }) => theme.shadows.soft.shadowOffset.height}px;
  shadow-opacity: ${({ theme }) => theme.shadows.soft.shadowOpacity};
  shadow-radius: ${({ theme }) => theme.shadows.soft.shadowRadius}px;
  elevation: ${({ theme }) => theme.shadows.soft.elevation};
`;

export const FilterText = styled.Text<{ active?: boolean }>`
  margin-top: 3px;
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.button.fontWeight};
  color: ${({ active, theme }) =>
    active ? theme.colors.text.inverse : theme.colors.text.secondary};
`;

// --- Game Grid & Cards ---
export const GameGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: ${({ theme }) => theme.spacing.md}px;
`;

export const GameCard = styled.TouchableOpacity<{ bgColor: string }>`
  width: 48.2%;
  height: 190px;
  border-radius: ${({ theme }) => theme.radius.xxl}px;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing.md}px;
  background-color: ${(props) => props.bgColor};
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.background.surface};

  /* Card Shadow */
  shadow-color: ${({ theme }) => theme.shadows.card.shadowColor};
  shadow-offset: ${({ theme }) => theme.shadows.card.shadowOffset.width}px
    ${({ theme }) => theme.shadows.card.shadowOffset.height}px;
  shadow-opacity: ${({ theme }) => theme.shadows.card.shadowOpacity};
  shadow-radius: ${({ theme }) => theme.shadows.card.shadowRadius}px;
  elevation: ${({ theme }) => theme.shadows.card.elevation};
`;

export const CardIllustration = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const IllustrationText = styled.Text<{ isSmall?: boolean }>`
  font-size: ${(props) => (props.isSmall ? "16px" : "57px")};
  ${(props) => props.isSmall && "margin-top: -6px;"}
`;

export const IllustrationSmallText = styled.Text`
  margin-top: -6px;
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
`;

export const CardBottom = styled.View`
  min-height: 58px;
  border-radius: ${({ theme }) => theme.radius.lg}px;
  background-color: ${({ theme }) => theme.colors.background.surface};
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
  padding-vertical: ${({ theme }) => theme.spacing.sm}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CardTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.h1.fontWeight};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const CardDescription = styled.Text`
  margin-top: 2px;
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ArrowCircle = styled.View`
  width: 31px;
  height: 31px;
  border-radius: ${({ theme }) => theme.radius.lg}px;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  justify-content: center;
  align-items: center;
`;

// --- Coming Soon ---
export const ComingSoon = styled.View`
  margin-top: ${({ theme }) => theme.spacing.lg}px;
  min-height: 58px;
  border-radius: ${({ theme }) => theme.radius.xl}px;
  background-color: ${({ theme }) => theme.colors.background.surface};
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border.default};
`;

export const ComingSoonEmoji = styled.Text`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  margin-bottom: 3px;
`;

export const ComingSoonText = styled.Text`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.h3.fontWeight};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

// --- Footer ---
export const Footer = styled.View`
  margin-top: ${({ theme }) => theme.spacing.xl}px;
  height: 68px;
  border-radius: ${({ theme }) => theme.radius.xxl}px;
  background-color: ${({ theme }) => theme.colors.background.surface};
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  /* Floating Shadow */
  shadow-color: ${({ theme }) => theme.shadows.floating.shadowColor};
  shadow-offset: ${({ theme }) => theme.shadows.floating.shadowOffset.width}px
    ${({ theme }) => theme.shadows.floating.shadowOffset.height}px;
  shadow-opacity: ${({ theme }) => theme.shadows.floating.shadowOpacity};
  shadow-radius: ${({ theme }) => theme.shadows.floating.shadowRadius}px;
  elevation: ${({ theme }) => theme.shadows.floating.elevation};
`;

export const FooterItem = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  min-width: 60px;
`;

export const FooterText = styled.Text<{ active?: boolean }>`
  margin-top: 2px;
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.bodyLarge.fontWeight};
  color: ${({ active, theme }) =>
    active ? theme.colors.brand.primary : theme.colors.text.muted};
`;

// --- Decoration Elements ---
export const Star = styled.View<{ starType: "star1" | "star2" | "star3" }>`
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 4px;
  opacity: 0.8;

  ${({ starType, theme }) =>
    starType === "star1" &&
    `
      top: 110px;
      right: 26px;
      background-color: ${theme.colors.brand.yellow};
    `}

  ${({ starType, theme }) =>
    starType === "star2" &&
    `
      top: 290px;
      left: 13px;
      background-color: ${theme.colors.brand.pink};
    `}

  ${({ starType, theme }) =>
    starType === "star3" &&
    `
      top: 540px;
      right: 12px;
      background-color: ${theme.colors.brand.mint};
    `}
`;

export const DecorationPlanet = styled.View<{
  planetType: "planet1" | "planet2";
}>`
  position: absolute;
  border-radius: ${({ theme }) => theme.radius.pill}px;
  opacity: 0.25;

  ${({ planetType, theme }) =>
    planetType === "planet1" &&
    `
      width: 100px;
      height: 100px;
      right: -48px;
      top: 170px;
      background-color: ${theme.colors.brand.blue};
    `}

  ${({ planetType, theme }) =>
    planetType === "planet2" &&
    `
      width: 70px;
      height: 70px;
      left: -35px;
      top: 630px;
      background-color: ${theme.colors.brand.pink};
    `}
`;

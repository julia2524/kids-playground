import styled from "styled-components/native";
import { NODE_SIZE } from "./StageMapScreen";
import { AppText } from "../../utils/AppText";

// --- Screen Container ---
export const ScreenContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

// --- Header ---
export const Header = styled.View`
  height: 92px;
  padding-horizontal: ${({ theme }) => theme.spacing.lg}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.92);
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border.default};
`;

export const HeaderButton = styled.TouchableOpacity`
  width: 46px;
  height: 46px;
  border-radius: ${({ theme }) => theme.radius.pill}px;
  background-color: ${({ theme }) => theme.colors.background.surface};
  justify-content: center;
  align-items: center;

  /* Soft Shadow */
  shadow-color: ${({ theme }) => theme.shadows.soft.shadowColor};
  shadow-offset: ${({ theme }) => theme.shadows.soft.shadowOffset.width}px
    ${({ theme }) => theme.shadows.soft.shadowOffset.height}px;
  shadow-opacity: ${({ theme }) => theme.shadows.soft.shadowOpacity};
  shadow-radius: ${({ theme }) => theme.shadows.soft.shadowRadius}px;
  elevation: ${({ theme }) => theme.shadows.soft.elevation};
`;

export const HeaderTitleArea = styled.View`
  flex: 1;
  align-items: center;
`;

export const HeaderTitle = styled(AppText)`
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.h3.fontWeight};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const HeaderSubtitle = styled(AppText)`
  margin-top: 3px;
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

// --- Map ---
export const MapContainer = styled.View`
  flex: 1;
  position: relative;
`;

export const PathLine = styled.View`
  position: absolute;
  height: 8px;
  border-radius: ${({ theme }) => theme.radius.sm}px;
  background-color: ${({ theme }) => theme.colors.border.strong};
  border-style: dashed;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border.dashed};
  transform-origin: center;
`;

export const NodeWrapper = styled.View`
  position: absolute;
  width: ${NODE_SIZE}px;
  height: 115px;
  align-items: center;
  margin-left: -${NODE_SIZE / 2}px;
`;

interface StageNodeProps {
  unlocked: boolean;
  completed: boolean;
  isCurrent: boolean;
}

export const StageNode = styled.TouchableOpacity<StageNodeProps>`
  width: ${NODE_SIZE}px;
  height: ${NODE_SIZE}px;
  border-radius: ${NODE_SIZE / 2}px;
  align-items: center;
  justify-content: center;

  background-color: ${({ unlocked, completed, isCurrent, theme }) =>
    completed
      ? theme.colors.brand.mint
      : isCurrent
        ? theme.colors.brand.pink
        : unlocked
          ? theme.colors.brand.primary
          : theme.colors.button.disabled};

  border-width: ${({ unlocked }) => (unlocked ? "5px" : "4px")};
  border-color: ${({ theme }) => theme.colors.background.surface};

  /* Card Shadow */
  shadow-color: ${({ theme }) => theme.shadows.card.shadowColor};
  shadow-offset: ${({ theme }) => theme.shadows.card.shadowOffset.width}px
    ${({ theme }) => theme.shadows.card.shadowOffset.height}px;
  shadow-opacity: ${({ theme }) => theme.shadows.card.shadowOpacity};
  shadow-radius: ${({ theme }) => theme.shadows.card.shadowRadius}px;
  elevation: ${({ theme }) => theme.shadows.card.elevation};
`;

export const StageNumber = styled(AppText)`
  font-size: ${({ theme }) => theme.typography.h2.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.h2.fontWeight};
  color: ${({ theme }) => theme.colors.text.inverse};
`;

export const StarRow = styled.View`
  flex-direction: row;
  margin-top: ${({ theme }) => theme.spacing.xs}px;
`;

export const SmallStar = styled(AppText)<{ isStarOn: boolean }>`
  font-size: ${({ theme }) => theme.typography.caption.fontSize}px;
  margin-horizontal: 1px;
  color: ${({ isStarOn, theme }) =>
    isStarOn ? theme.colors.brand.yellow : theme.colors.text.muted};
`;

export const CurrentBadge = styled.View`
  position: absolute;
  top: 75px;
  background-color: ${({ theme }) => theme.colors.background.surface};
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  border-radius: ${({ theme }) => theme.radius.md}px;

  /* Soft Shadow */
  shadow-color: ${({ theme }) => theme.shadows.soft.shadowColor};
  shadow-offset: ${({ theme }) => theme.shadows.soft.shadowOffset.width}px
    ${({ theme }) => theme.shadows.soft.shadowOffset.height}px;
  shadow-opacity: ${({ theme }) => theme.shadows.soft.shadowOpacity};
  shadow-radius: ${({ theme }) => theme.shadows.soft.shadowRadius}px;
  elevation: ${({ theme }) => theme.shadows.soft.elevation};
`;

export const CurrentBadgeText = styled(AppText)`
  font-size: 10px;
  font-weight: ${({ theme }) => theme.typography.h1.fontWeight};
  color: ${({ theme }) => theme.colors.brand.pink};
`;

// --- Decorations ---
export const MapPlanet = styled.View`
  position: absolute;
  opacity: 0.85;
`;

export const PlanetEmoji = styled(AppText)`
  font-size: 52px;
`;

export const FinishDecoration = styled.View`
  position: absolute;
  bottom: 35px;
  left: 0;
  right: 0;
  align-items: center;
`;

export const FinishEmoji = styled(AppText)`
  font-size: 30px;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

export const FinishText = styled(AppText)`
  font-size: ${({ theme }) => theme.typography.bodySmall.fontSize}px;
  font-weight: ${({ theme }) => theme.typography.h1.fontWeight};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

// --- Floating UI & Ad ---
export const FloatingStickerButton = styled.TouchableOpacity`
  position: absolute;
  right: 18px;
  bottom: 76px;
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.radius.pill}px;
  background-color: ${({ theme }) => theme.colors.background.surface};
  align-items: center;
  justify-content: center;

  /* Floating Shadow */
  shadow-color: ${({ theme }) => theme.shadows.floating.shadowColor};
  shadow-offset: ${({ theme }) => theme.shadows.floating.shadowOffset.width}px
    ${({ theme }) => theme.shadows.floating.shadowOffset.height}px;
  shadow-opacity: ${({ theme }) => theme.shadows.floating.shadowOpacity};
  shadow-radius: ${({ theme }) => theme.shadows.floating.shadowRadius}px;
  elevation: ${({ theme }) => theme.shadows.floating.elevation};
`;

export const AdContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 52px;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.94);
`;

// --- Background Stars ---
export const Star = styled.View`
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: ${({ theme }) => theme.radius.sm}px;
  z-index: 2;
`;

import styled from "styled-components/native";
import { NODE_SIZE } from "./StageMapScreen";
import { AppText } from "../../utils/AppText";

// --- Screen Container ---
export const ScreenContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background || "#F5F2FF"};
`;

// --- Header ---
export const Header = styled.View`
  height: 92px;
  padding-horizontal: ${({ theme }) => theme.spacing?.lg || 20}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.92);
  border-bottom-width: 1.5px;
  border-bottom-color: ${({ theme }) =>
    theme.colors.border?.default || "#E6E1F4"};
`;

export const HeaderButton = styled.TouchableOpacity`
  width: 46px;
  height: 46px;
  border-radius: ${({ theme }) => theme.radius?.pill || 23}px;
  background-color: ${({ theme }) => theme.colors.white || "#FFFFFF"};
  justify-content: center;
  align-items: center;
  border-width: 1.5px;
  border-color: ${({ theme }) => theme.colors.border?.default || "#E6E1F4"};
  elevation: 3;
  box-shadow: 0px 4px 10px rgba(124, 92, 255, 0.08);
`;

export const HeaderTitleArea = styled.View`
  flex: 1;
  align-items: center;
`;

export const HeaderTitle = styled(AppText)`
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.typography?.h3?.fontSize || 20}px;
  line-height: ${({ theme }) => theme.typography?.h3?.lineHeight || 28}px;
  font-weight: ${({ theme }) => theme.typography?.h3?.fontWeight || "800"};
  color: ${({ theme }) => theme.colors.textGroup?.primary || "#29263D"};
`;

export const HeaderSubtitle = styled(AppText)`
  margin-top: 2px;
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.typography?.caption?.fontSize || 13}px;
  line-height: ${({ theme }) => theme.typography?.caption?.lineHeight || 18}px;
  font-weight: ${({ theme }) => theme.typography?.caption?.fontWeight || "600"};
  color: ${({ theme }) => theme.colors.textGroup?.secondary || "#68657A"};
`;

// --- Map ---
export const MapContainer = styled.View`
  flex: 1;
  position: relative;
`;

export const PathLine = styled.View`
  position: absolute;
  height: 8px;
  border-radius: ${({ theme }) => theme.radius?.sm || 8}px;
  background-color: ${({ theme }) => theme.colors.border?.strong || "#B7B0DD"};
  border-style: dashed;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border?.dashed || "#D8D2F1"};
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
      ? theme.colors.brand?.mint || "#55D6BE"
      : isCurrent
        ? theme.colors.brand?.pink || "#FF6FAE"
        : unlocked
          ? theme.colors.brand?.primary || "#7C5CFF"
          : theme.colors.button?.disabled || "#E6E1F4"};

  border-width: ${({ unlocked }) => (unlocked ? "5px" : "4px")};
  border-color: ${({ theme }) => theme.colors.white || "#FFFFFF"};

  elevation: 4;
  box-shadow: 0px 6px 14px rgba(124, 92, 255, 0.15);
`;

export const StageNumber = styled(AppText)`
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.typography?.h2?.fontSize || 24}px;
  line-height: ${({ theme }) => theme.typography?.h2?.lineHeight || 32}px;
  font-weight: ${({ theme }) => theme.typography?.h2?.fontWeight || "800"};
  color: ${({ theme }) => theme.colors.textGroup?.inverse || "#FFFFFF"};
`;

export const StarRow = styled.View`
  flex-direction: row;
  margin-top: ${({ theme }) => theme.spacing?.xs || 4}px;
`;

export const SmallStar = styled(AppText)<{ isStarOn: boolean }>`
  font-size: ${({ theme }) => theme.typography?.caption?.fontSize || 13}px;
  margin-horizontal: 1px;
  color: ${({ isStarOn, theme }) =>
    isStarOn
      ? theme.colors.brand?.yellow || "#FFD95A"
      : theme.colors.textGroup?.muted || "#9C99AA"};
`;

export const CurrentBadge = styled.View`
  position: absolute;
  top: 75px;
  background-color: ${({ theme }) => theme.colors.white || "#FFFFFF"};
  padding-horizontal: ${({ theme }) => theme.spacing?.sm || 8}px;
  padding-vertical: ${({ theme }) => theme.spacing?.xs || 4}px;
  border-radius: ${({ theme }) => theme.radius?.md || 12}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border?.default || "#E6E1F4"};

  elevation: 2;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.06);
`;

export const CurrentBadgeText = styled(AppText)`
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 10px;
  font-weight: ${({ theme }) => theme.typography?.h1?.fontWeight || "900"};
  color: ${({ theme }) => theme.colors.brand?.pink || "#FF6FAE"};
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
  margin-bottom: ${({ theme }) => theme.spacing?.xs || 4}px;
`;

export const FinishText = styled(AppText)`
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: ${({ theme }) => theme.typography?.bodySmall?.fontSize || 14}px;
  font-weight: ${({ theme }) => theme.typography?.h1?.fontWeight || "900"};
  color: ${({ theme }) => theme.colors.textGroup?.secondary || "#68657A"};
`;

// --- Floating UI & Ad ---
export const FloatingStickerButton = styled.TouchableOpacity`
  position: absolute;
  right: 18px;
  bottom: 76px;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: ${({ theme }) => theme.colors.white || "#FFFFFF"};
  align-items: center;
  justify-content: center;
  border-width: 1.5px;
  border-color: ${({ theme }) => theme.colors.border?.default || "#E6E1F4"};

  elevation: 5;
  box-shadow: 0px 6px 16px rgba(124, 92, 255, 0.18);
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
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border?.default || "#E6E1F4"};
`;

// --- Background Stars ---
export const Star = styled.View`
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 3.5px;
  background-color: ${({ theme }) => theme.colors.brand?.yellow || "#FFD95A"};
  z-index: 2;
`;

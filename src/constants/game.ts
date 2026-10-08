import { StageMapGameType } from "../types/game";

export const GAME_INFO = {
  classification: {
    title: "분류 놀이",
    description: "같은 것을 찾아볼까요?",
    subtitle: "무엇끼리 친구일까요?",
    icon: "grid-outline",
  },

  pattern: {
    title: "패턴 놀이",
    subtitle: "규칙을 찾아볼까요?",
    description: "규칙을 찾아볼까요?",
    icon: "repeat-outline",
  },

  puzzle: {
    title: "퍼즐 맞추기",
    subtitle: "조각을 맞춰볼까요?",
    description: "조각을 맞춰볼까요?",
    icon: "extension-puzzle-outline",
  },

  maze: {
    title: "자석 미로",
    subtitle: "길을 찾아갈까요?",
    description: "길을 찾아갈까요?",
    icon: "magnet-outline",
  },
} as const;

export const STAGE_MAP_INFO: Record<
  StageMapGameType,
  {
    title: string;
    subtitle: string;
  }
> = {
  color: {
    title: "색깔 분류",
    subtitle: "같은 색을 찾아요!",
  },

  shape: {
    title: "모양 분류",
    subtitle: "같은 모양을 찾아요!",
  },

  size: {
    title: "크기 분류",
    subtitle: "크고 작은 것을 찾아요!",
  },

  category: {
    title: "종류 분류",
    subtitle: "같은 종류를 찾아요!",
  },

  pattern: {
    title: "패턴 놀이",
    subtitle: "규칙을 찾아요!",
  },

  puzzle: {
    title: "퍼즐 맞추기",
    subtitle: "조각을 맞춰 완성해요!",
  },

  maze: {
    title: "미로 찾기",
    subtitle: "길을 찾아 출발해요!",
  },
};

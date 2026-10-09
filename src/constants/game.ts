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
import i18n from "../i18n";

// export const SETTING_LEVEL_CLEAR_INFO = {
//   maze: {
//     iconName: "color-palette",
//     get title() {
//       return i18n.t("game_color_full_title");
//     },
//     get description() {
//       return i18n.t("game_color_reset_desc");
//     },
//     get stickerDescription() {
//       return i18n.t("game_color_sticker_desc");
//     },
//   },
//   puzzle: {
//     iconName: "color-palette",
//     get title() {
//       return i18n.t("game_color_full_title");
//     },
//     get description() {
//       return i18n.t("game_color_reset_desc");
//     },
//     get stickerDescription() {
//       return i18n.t("game_color_sticker_desc");
//     },
//   },
//   pattern: {
//     iconName: "color-palette",
//     get title() {
//       return i18n.t("game_color_full_title");
//     },
//     get description() {
//       return i18n.t("game_color_reset_desc");
//     },
//     get stickerDescription() {
//       return i18n.t("game_color_sticker_desc");
//     },
//   },
//   color: {
//     iconName: "color-palette",
//     get title() {
//       return i18n.t("game_color_full_title");
//     },
//     get description() {
//       return i18n.t("game_color_reset_desc");
//     },
//     get stickerDescription() {
//       return i18n.t("game_color_sticker_desc");
//     },
//   },

//   shape: {
//     iconName: "diamond",
//     get title() {
//       return i18n.t("game_shape_full_title");
//     },
//     get description() {
//       return i18n.t("game_shape_reset_desc");
//     },
//     get stickerDescription() {
//       return i18n.t("game_shape_sticker_desc");
//     },
//   },
//   size: {
//     iconName: "diamond",
//     get title() {
//       return i18n.t("game_shape_full_title");
//     },
//     get description() {
//       return i18n.t("game_shape_reset_desc");
//     },
//     get stickerDescription() {
//       return i18n.t("game_shape_sticker_desc");
//     },
//   },

//   category: {
//     iconName: "fast-food",
//     get title() {
//       return i18n.t("game_category_full_title");
//     },
//     get description() {
//       return i18n.t("game_category_reset_desc");
//     },
//     get stickerDescription() {
//       return i18n.t("game_category_sticker_desc");
//     },
//   },
// };
export const SETTING_LEVEL_CLEAR_INFO = {
  maze: {
    iconName: "color-palette",
    title: "미로 찾기",
    description: "미로 찾기 게임의 진행 기록을 초기화합니다.",
    stickerDescription: "획득한 미로 찾기 스티커를 초기화합니다.",
  },
  puzzle: {
    iconName: "color-palette",
    title: "퍼즐 맞추기",
    description: "퍼즐 맞추기 게임의 진행 기록을 초기화합니다.",
    stickerDescription: "획득한 퍼즐 스티커를 초기화합니다.",
  },
  pattern: {
    iconName: "color-palette",
    title: "패턴 놀이",
    description: "패턴 놀이 게임의 진행 기록을 초기화합니다.",
    stickerDescription: "획득한 패턴 스티커를 초기화합니다.",
  },
  color: {
    iconName: "color-palette",
    title: "분류 놀이 (색상)",
    description: "색상 분류 게임의 진행 기록을 초기화합니다.",
    stickerDescription: "획득한 색상 스티커를 초기화합니다.",
  },
  shape: {
    iconName: "diamond",
    title: "분류 놀이 (모양)",
    description: "모양 분류 게임의 진행 기록을 초기화합니다.",
    stickerDescription: "획득한 모양 스티커를 초기화합니다.",
  },
  size: {
    iconName: "diamond",
    title: "크기 비교",
    description: "크기 비교 게임의 진행 기록을 초기화합니다.",
    stickerDescription: "획득한 크기 스티커를 초기화합니다.",
  },
  category: {
    iconName: "fast-food",
    title: "분류 놀이 (종류)",
    description: "종류 분류 게임의 진행 기록을 초기화합니다.",
    stickerDescription: "획득한 종류 스티커를 초기화합니다.",
  },
};
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

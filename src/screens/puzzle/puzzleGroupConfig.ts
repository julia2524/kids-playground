import { PuzzleCategoryType } from "./puzzleMenuScreen";

export type PuzzleGroupId =
  | "asia"
  | "europe"
  | "africa"
  | "northAmerica"
  | "southAmerica"
  | "oceania";

export type PuzzleGroupConfig = {
  id: PuzzleGroupId;
  titleKey: string;
  descriptionKey: string;
  fallbackTitle: string;
  emoji: string;
  color: string;
  backgroundColor: string;
};

// 국기 ID → 대륙

const FLAG_GROUPS: Record<string, PuzzleGroupId> = {
  // 아시아
  korea: "asia",
  japan: "asia",
  china: "asia",
  indonesia: "asia",
  thailand: "asia",
  vietnam: "asia",
  bangladesh: "asia",
  philippines: "asia",
  turkey: "asia",
  nepal: "asia",
  taiwan: "asia",

  // 유럽
  uk: "europe",
  france: "europe",
  netherlands: "europe",
  germany: "europe",
  greece: "europe",
  spain: "europe",
  italy: "europe",
  sweden: "europe",
  switzerland: "europe",
  poland: "europe",
  romania: "europe",
  russia: "europe",
  portugal: "europe",
  ukraine: "europe",
  belgium: "europe",

  // 아프리카
  egypt: "africa",
  algeria: "africa",
  nigeria: "africa",
  drcongo: "africa",
  tanzania: "africa",

  // 북아메리카
  usa: "northAmerica",
  canada: "northAmerica",

  cuba: "northAmerica",
  honduras: "northAmerica",
  elsalvador: "northAmerica",
  nicaragua: "northAmerica",
  guatemala: "northAmerica",
  costarica: "northAmerica",
  panama: "northAmerica",

  // 남아메리카
  brazil: "southAmerica",
  argentina: "southAmerica",
  venezuela: "southAmerica",
  colombia: "southAmerica",
  peru: "southAmerica",
  chile: "southAmerica",
  uruguay: "southAmerica",
  paraguay: "southAmerica",
  bolivia: "southAmerica",
  ecuador: "southAmerica",

  // 오세아니아
  australia: "oceania",
};

// 랜드마크 ID → 대륙
const LANDMARK_GROUPS: Record<string, PuzzleGroupId> = {
  bigben: "europe",
  pyramid: "africa",
  eiffel: "europe",
  pisa: "europe",
  operahouse: "oceania",
  liberty: "northAmerica",
  tajmahal: "asia",
};

export const PUZZLE_GROUP_CONFIGS: readonly PuzzleGroupConfig[] = [
  {
    id: "asia",
    titleKey: "puzzle_group_asia",
    descriptionKey: "puzzle_group_asia_desc",
    fallbackTitle: "아시아",
    emoji: "🌏",
    color: "#4D8DFF",
    backgroundColor: "#EAF3FF",
  },
  {
    id: "europe",
    titleKey: "puzzle_group_europe",
    descriptionKey: "puzzle_group_europe_desc",
    fallbackTitle: "유럽",
    emoji: "🌍",
    color: "#8B6BDB",
    backgroundColor: "#F3EDFF",
  },
  {
    id: "africa",
    titleKey: "puzzle_group_africa",
    descriptionKey: "puzzle_group_africa_desc",
    fallbackTitle: "아프리카",
    emoji: "🌍",
    color: "#E59A36",
    backgroundColor: "#FFF2E5",
  },
  {
    id: "northAmerica",
    titleKey: "puzzle_group_north_america",
    descriptionKey: "puzzle_group_north_america_desc",
    fallbackTitle: "북아메리카",
    emoji: "🌎",
    color: "#34A879",
    backgroundColor: "#E8F8F1",
  },
  {
    id: "southAmerica",
    titleKey: "puzzle_group_south_america",
    descriptionKey: "puzzle_group_south_america_desc",
    fallbackTitle: "남아메리카",
    emoji: "🌎",
    color: "#E66D8C",
    backgroundColor: "#FFF0F4",
  },
  {
    id: "oceania",
    titleKey: "puzzle_group_oceania",
    descriptionKey: "puzzle_group_oceania_desc",
    fallbackTitle: "오세아니아",
    emoji: "🌊",
    color: "#269DBB",
    backgroundColor: "#E9F8FC",
  },
];

export function getPuzzleGroupId(
  category: PuzzleCategoryType,
  itemId: string,
): PuzzleGroupId | null {
  if (category === "flag") {
    return FLAG_GROUPS[itemId] ?? null;
  }

  if (category === "landmark") {
    return LANDMARK_GROUPS[itemId] ?? null;
  }

  return null;
}

export function getPuzzleGroupsForCategory(category: PuzzleCategoryType) {
  const mapping =
    category === "flag"
      ? FLAG_GROUPS
      : category === "landmark"
        ? LANDMARK_GROUPS
        : {};

  return PUZZLE_GROUP_CONFIGS.map((group) => ({
    ...group,
    count: Object.values(mapping).filter((groupId) => groupId === group.id)
      .length,
  })).filter((group) => group.count > 0);
}

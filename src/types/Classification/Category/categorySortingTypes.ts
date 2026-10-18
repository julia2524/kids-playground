export type CategorySortingMode =
  | "sameSubcategory"
  | "differentTopCategories"
  | "differentSubcategories";

export type CategorySortingColorMode = "same" | "mixed";

export type CategorySortingLevelConfig = {
  level: number;
  rule: "category";

  // 분류할 목적지(TargetBox) 개수
  targetCount: number;

  // 한 라운드에 등장하는 전체 사물 수
  objectCount: number;

  // 한 목적지에 배정되는 사물 수
  objectsPerTarget: number;

  // 분류 범주 선택 규칙
  categoryMode: CategorySortingMode;

  // 각 목적지에 속할 서로 다른 사물 종류 수
  itemTypesPerTarget: number;

  // 한 종류의 사물이 몇 개씩 등장하는지
  instancesPerItem: number;

  // Level 4~6에서 선택할 서로 다른 topCategory 개수
  distinctTopCategoryCount?: 2 | 3;

  // Level 7~10에서 선택할 서로 다른 subCategory 개수
  distinctSubCategoryCount?: 2 | 3;

  // 한 라운드에서 사용할 서로 다른 색상 변형 개수
  distinctColorCount?: 1 | 2 | 3;

  // same: 같은 색상 변형만 사용
  // mixed: 여러 색상 변형 사용
  objectColorMode: CategorySortingColorMode;
};

export type BasketTargetData = {
  id: string;
  label: string;
  emoji: string;
  description: string;
  backgroundColor: string;
  borderColor: string;
};

export const CATEGORY_BASKETS: Record<string, BasketTargetData> = {
  animal: {
    id: "animal",
    label: "동물 친구들",
    emoji: "🐾",
    description: "동물들이 모이는 곳",
    backgroundColor: "#FFF0D9",
    borderColor: "#E9B66E",
  },
  food: {
    id: "food",
    label: "맛있는 음식",
    emoji: "🍽️",
    description: "먹을 것들이 모이는 곳",
    backgroundColor: "#FFF0E8",
    borderColor: "#E9A17E",
  },
  clothing: {
    id: "clothing",
    label: "옷과 꾸미기",
    emoji: "👒",
    description: "입고 꾸미는 것들",
    backgroundColor: "#FCE8F0",
    borderColor: "#E6A0BD",
  },
  living: {
    id: "living",
    label: "우리 집",
    emoji: "🏠",
    description: "집에서 사용하는 것들",
    backgroundColor: "#E9F1FF",
    borderColor: "#91B5EC",
  },
  vehicle: {
    id: "vehicle",
    label: "탈것 주차장",
    emoji: "🅿️",
    description: "타고 이동하는 것들",
    backgroundColor: "#E6F5EA",
    borderColor: "#88C89A",
  },
  nature: {
    id: "nature",
    label: "자연 친구들",
    emoji: "🌳",
    description: "자연에서 만나는 것들",
    backgroundColor: "#EAF6E7",
    borderColor: "#9BCB8C",
  },
};

export const SUB_CATEGORY_BASKETS: Record<string, BasketTargetData> = {
  land_animal: {
    id: "land_animal",
    label: "땅 위 동물",
    emoji: "🐕",
    description: "땅 위에서 사는 동물",
    backgroundColor: "#FFF0D9",
    borderColor: "#E9B66E",
  },
  insect: {
    id: "insect",
    label: "곤충 친구들",
    emoji: "🦋",
    description: "작은 곤충 친구들",
    backgroundColor: "#F1F8D9",
    borderColor: "#B4CB76",
  },
  bird: {
    id: "bird",
    label: "하늘을 나는 새",
    emoji: "🐦",
    description: "깃털이 있는 새 친구들",
    backgroundColor: "#E8F4FF",
    borderColor: "#91BDE9",
  },
  sea_animal: {
    id: "sea_animal",
    label: "바닷속 친구들",
    emoji: "🐙",
    description: "바다에서 사는 동물",
    backgroundColor: "#E2F6FF",
    borderColor: "#83C8E5",
  },
  fruit: {
    id: "fruit",
    label: "과일 바구니",
    emoji: "🍎",
    description: "달콤한 과일",
    backgroundColor: "#FFF0E5",
    borderColor: "#F0B18A",
  },
  vegetable: {
    id: "vegetable",
    label: "채소 바구니",
    emoji: "🥕",
    description: "몸에 좋은 채소",
    backgroundColor: "#F1F7DE",
    borderColor: "#B6CE7A",
  },
  meal: {
    id: "meal",
    label: "한 끼 음식",
    emoji: "🍚",
    description: "밥과 식사 음식",
    backgroundColor: "#FFF0E8",
    borderColor: "#E9A17E",
  },
  snack: {
    id: "snack",
    label: "간식 바구니",
    emoji: "🍪",
    description: "맛있는 간식",
    backgroundColor: "#FFF1DC",
    borderColor: "#E8BE7E",
  },
  drink: {
    id: "drink",
    label: "음료 컵",
    emoji: "🥤",
    description: "마시는 것들",
    backgroundColor: "#E7F5FF",
    borderColor: "#8CC4E8",
  },
  plant: {
    id: "plant",
    label: "식물 화분",
    emoji: "🪴",
    description: "나무와 꽃, 식물",
    backgroundColor: "#E8F5E3",
    borderColor: "#96C58B",
  },
  sky: {
    id: "sky",
    label: "하늘",
    emoji: "☁️",
    description: "해와 구름, 하늘의 모습",
    backgroundColor: "#E5F3FF",
    borderColor: "#8EBDE9",
  },
  clothes: {
    id: "clothes",
    label: "옷장",
    emoji: "👕",
    description: "입는 옷들이 모이는 곳",
    backgroundColor: "#FCE8F0",
    borderColor: "#E6A0BD",
  },

  shoes: {
    id: "shoes",
    label: "신발장",
    emoji: "👟",
    description: "발에 신는 것들",
    backgroundColor: "#E8F1FF",
    borderColor: "#91B5EC",
  },

  hat: {
    id: "hat",
    label: "모자 바구니",
    emoji: "🧢",
    description: "머리에 쓰는 모자",
    backgroundColor: "#FFF0D9",
    borderColor: "#E9B66E",
  },

  accessories: {
    id: "accessories",
    label: "꾸미기 보물함",
    emoji: "💎",
    description: "몸을 꾸며 주는 물건",
    backgroundColor: "#F3E9FF",
    borderColor: "#B49AE8",
  },

  // ==============================
  // VEHICLE: 탈것
  // ==============================

  road_vehicle: {
    id: "road_vehicle",
    label: "도로",
    emoji: "🚗",
    description: "도로 위를 달리는 탈것",
    backgroundColor: "#E6F5EA",
    borderColor: "#88C89A",
  },

  rail_vehicle: {
    id: "rail_vehicle",
    label: "기찻길",
    emoji: "🚂",
    description: "레일 위를 달리는 탈것",
    backgroundColor: "#FFF0D9",
    borderColor: "#E9B66E",
  },

  air_vehicle: {
    id: "air_vehicle",
    label: "하늘",
    emoji: "✈️",
    description: "하늘을 나는 탈것",
    backgroundColor: "#E5F3FF",
    borderColor: "#8EBDE9",
  },

  water_vehicle: {
    id: "water_vehicle",
    label: "물 위와 물속",
    emoji: "🚢",
    description: "물 위를 다니는 탈것",
    backgroundColor: "#E2F6FF",
    borderColor: "#83C8E5",
  },

  construction_vehicle: {
    id: "construction_vehicle",
    label: "공사장",
    emoji: "🚜",
    description: "공사장에서 일하는 특수차",
    backgroundColor: "#FFF2D6",
    borderColor: "#E7BD68",
  },

  // ==============================
  // LIVING: 생활용품
  // ==============================

  furniture: {
    id: "furniture",
    label: "가구가 있는 방",
    emoji: "🪑",
    description: "앉거나 물건을 놓는 가구",
    backgroundColor: "#F5E9DC",
    borderColor: "#C7A786",
  },

  electronics: {
    id: "electronics",
    label: "전자제품 선반",
    emoji: "💻",
    description: "전기로 사용하는 물건",
    backgroundColor: "#E8EEFF",
    borderColor: "#9CAFE8",
  },

  stationery: {
    id: "stationery",
    label: "문구 바구니",
    emoji: "✏️",
    description: "쓰고 그리고 공부할 때 쓰는 것",
    backgroundColor: "#FFF4D9",
    borderColor: "#E8C46E",
  },

  daily: {
    id: "daily",
    label: "생활용품 바구니",
    emoji: "👜",
    description: "일상생활에서 사용하는 물건",
    backgroundColor: "#F1EAFE",
    borderColor: "#B5A0E5",
  },

  toys_sports: {
    id: "toys_sports",
    label: "장난감 놀이터",
    emoji: "🧸",
    description: "가지고 놀거나 운동할 때 쓰는 것",
    backgroundColor: "#FFE8E3",
    borderColor: "#E9A395",
  },

  musical_instrument: {
    id: "musical_instrument",
    label: "악기 무대",
    emoji: "🎸",
    description: "소리를 내어 음악을 만드는 것",
    backgroundColor: "#F1E8FF",
    borderColor: "#B49AE8",
  },
};

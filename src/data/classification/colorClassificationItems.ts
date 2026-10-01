import { ClassificationItem } from "../../types/game";

export const colorClassificationItems: ClassificationItem[] = [
  {
    id: "balloon",
    name: "풍선",
    description:
      "둥실둥실 하늘로 날아가는 풍선이에요! 내가 좋아하는 색 풍선을 만들어 볼까요.",
    svgKey: "balloon",
    topCategory: "living",
    subCategory: "daily",
    shapes: ["circle"],
    variants: [
      {
        id: "red",
        primary: "#FF4D4D",
        secondary: "#FFB3B3",
        accent: "#FFFFFF",
      },
      {
        id: "blue",
        primary: "#4D94FF",
        secondary: "#B3D1FF",
        accent: "#FFFFFF",
      },
      {
        id: "yellow",
        primary: "#FFD700",
        secondary: "#FFF099",
        accent: "#FFFFFF",
      },
      {
        id: "green",
        primary: "#4CAF50",
        secondary: "#A5D6A7",
        accent: "#FFFFFF",
      },
      {
        id: "pink",
        primary: "#FF80AB",
        secondary: "#FFC1E3",
        accent: "#FFFFFF",
      },
      {
        id: "purple",
        primary: "#AB47BC",
        secondary: "#E1BEE7",
        accent: "#FFFFFF",
      },
    ],
  },

  {
    id: "fireTruck",
    name: "소방차",
    description:
      "씩씩한 소방차가 출동했어요! 오늘은 어떤 색 소방차가 멋질까요?",
    svgKey: "fireTruck",
    topCategory: "vehicle",
    subCategory: "road_vehicle",
    shapes: ["square"],
    variants: [
      {
        id: "red",
        primary: "#D32F2F",
        secondary: "#424242",
        accent: "#FFEB3B",
      },
      {
        id: "yellow",
        primary: "#FBC02D",
        secondary: "#424242",
        accent: "#E65100",
      },
      {
        id: "green",
        primary: "#388E3C",
        secondary: "#424242",
        accent: "#FFFFFF",
      },
      {
        id: "blue",
        primary: "#1976D2",
        secondary: "#424242",
        accent: "#FFEB3B",
      },
      {
        id: "white",
        primary: "#ECEFF1",
        secondary: "#37474F",
        accent: "#D32F2F",
      },
      {
        id: "orange",
        primary: "#F57C00",
        secondary: "#424242",
        accent: "#FFFFFF",
      },
    ],
  },

  {
    id: "cherry",
    name: "체리",
    description:
      "작고 동그란 체리가 두 알 콕! 오늘은 어떤 색 체리를 만들어 볼까요?",
    svgKey: "cherry",
    topCategory: "food",
    subCategory: "fruit",
    shapes: ["circle"],
    variants: [
      {
        id: "red",
        primary: "#C62828",
        secondary: "#2E7D32",
        accent: "#FF8A80",
      },
      {
        id: "dark_red",
        primary: "#880E4F",
        secondary: "#1B5E20",
        accent: "#BC8F8F",
      },
      {
        id: "pink",
        primary: "#EC407A",
        secondary: "#4CAF50",
        accent: "#F8BBD0",
      },
      {
        id: "yellow",
        primary: "#FDD835",
        secondary: "#388E3C",
        accent: "#FFF59D",
      },
      {
        id: "orange",
        primary: "#FB8C00",
        secondary: "#2E7D32",
        accent: "#FFE0B2",
      },
      {
        id: "purple",
        primary: "#6A1B9A",
        secondary: "#388E3C",
        accent: "#E1BEE7",
      },
    ],
  },

  {
    id: "fish",
    name: "물고기",
    description:
      "물속을 헤엄헤엄 다니는 물고기예요! 무지개 물고기를 만들어 볼까요?",
    svgKey: "fish",
    topCategory: "animal",
    subCategory: "sea_animal",
    shapes: [],
    variants: [
      {
        id: "blue",
        primary: "#29B6F6",
        secondary: "#E0F7FA",
        accent: "#FF7043",
      },
      {
        id: "orange",
        primary: "#FF9800",
        secondary: "#FFF3E0",
        accent: "#29B6F6",
      },
      {
        id: "yellow",
        primary: "#FFEE58",
        secondary: "#FFFDE7",
        accent: "#EC407A",
      },
      {
        id: "pink",
        primary: "#F06292",
        secondary: "#FCE4EC",
        accent: "#4FC3F7",
      },
      {
        id: "green",
        primary: "#66BB6A",
        secondary: "#E8F5E9",
        accent: "#FFA726",
      },
      {
        id: "purple",
        primary: "#AB47BC",
        secondary: "#F3E5F5",
        accent: "#26A69A",
      },
    ],
  },

  {
    id: "blueberry",
    name: "블루베리",
    description:
      "동글동글 블루베리예요! 이름은 블루베리인데 다른 색이면 어떨까요?",
    svgKey: "blueberry",
    topCategory: "food",
    subCategory: "fruit",
    shapes: ["circle"],
    variants: [
      {
        id: "blue",
        primary: "#3F51B5",
        secondary: "#C5CAE9",
        accent: "#1A237E",
      },
      {
        id: "purple",
        primary: "#7B1FA2",
        secondary: "#E1BEE7",
        accent: "#4A148C",
      },
      {
        id: "magenta",
        primary: "#C2185B",
        secondary: "#F8BBD0",
        accent: "#880E4F",
      },
      {
        id: "cyan",
        primary: "#00ACC1",
        secondary: "#B2EBF2",
        accent: "#006064",
      },
      {
        id: "green",
        primary: "#43A047",
        secondary: "#C8E6C9",
        accent: "#1B5E20",
      },
      {
        id: "coral",
        primary: "#FF7043",
        secondary: "#FFCCBC",
        accent: "#BF360C",
      },
    ],
  },

  {
    id: "umbrella",
    name: "우산",
    description:
      "비 오는 날 나를 지켜주는 우산이에요! 알록달록 우산을 만들어 보세요.",
    svgKey: "umbrella",
    topCategory: "living",
    subCategory: "daily",
    shapes: ["triangle"],
    variants: [
      {
        id: "yellow",
        primary: "#FFEB3B",
        secondary: "#FFF9C4",
        accent: "#8D6E63",
      },
      {
        id: "red",
        primary: "#E53935",
        secondary: "#FFCDD2",
        accent: "#424242",
      },
      {
        id: "blue",
        primary: "#1E88E5",
        secondary: "#BBDEFB",
        accent: "#37474F",
      },
      {
        id: "mint",
        primary: "#26A69A",
        secondary: "#E0F2F1",
        accent: "#5D4037",
      },
      {
        id: "pink",
        primary: "#F06292",
        secondary: "#FCE4EC",
        accent: "#4E342E",
      },
      {
        id: "rainbow_purple",
        primary: "#8E24AA",
        secondary: "#E1BEE7",
        accent: "#FFB300",
      },
    ],
  },

  {
    id: "bell",
    name: "종",
    description:
      "딸랑딸랑! 소리가 들리는 것 같지 않나요? 어떤 색 종을 만들어 볼까요?",
    svgKey: "bell",
    topCategory: "living",
    subCategory: "daily",
    shapes: ["triangle"],
    variants: [
      {
        id: "gold",
        primary: "#FFD700",
        secondary: "#FFF59D",
        accent: "#D84315",
      },
      {
        id: "silver",
        primary: "#B0BEC5",
        secondary: "#ECEFF1",
        accent: "#37474F",
      },
      {
        id: "bronze",
        primary: "#A1887F",
        secondary: "#D7CCC8",
        accent: "#4E342E",
      },
      {
        id: "red",
        primary: "#E53935",
        secondary: "#FFCDD2",
        accent: "#FFD700",
      },
      {
        id: "blue",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#FFF59D",
      },
      {
        id: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#FFD700",
      },
    ],
  },

  {
    id: "milk",
    name: "우유",
    description:
      "꼴깍꼴깍 맛있는 우유예요! 우유가 알록달록해진다면 어떤 맛일까요?",
    svgKey: "milk",
    topCategory: "drink",
    subCategory: "beverage",
    shapes: ["square"],
    variants: [
      {
        id: "white",
        primary: "#FFFFFF",
        secondary: "#E0F7FA",
        accent: "#29B6F6",
      },
      {
        id: "strawberry",
        primary: "#FF80AB",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },
      {
        id: "banana",
        primary: "#FFF176",
        secondary: "#FFFDE7",
        accent: "#F57F17",
      },
      {
        id: "choco",
        primary: "#8D6E63",
        secondary: "#EFEBE9",
        accent: "#4E342E",
      },
      {
        id: "melon",
        primary: "#A5D6A7",
        secondary: "#E8F5E9",
        accent: "#2E7D32",
      },
      {
        id: "blueberry",
        primary: "#9FA8DA",
        secondary: "#E8EAF6",
        accent: "#283593",
      },
    ],
  },

  {
    id: "bee",
    name: "벌",
    description: "붕붕! 꿀을 찾아 날아가는 벌이에요. 어떤 색 벌이 나타날까요?",
    svgKey: "bee",
    topCategory: "animal",
    subCategory: "insect",
    shapes: [],
    variants: [
      {
        id: "classic",
        primary: "#FBC02D",
        secondary: "#212121",
        accent: "#E0F7FA",
      },
      {
        id: "orange",
        primary: "#FB8C00",
        secondary: "#3E2723",
        accent: "#E0F7FA",
      },
      {
        id: "pink",
        primary: "#F06292",
        secondary: "#424242",
        accent: "#FCE4EC",
      },
      {
        id: "green",
        primary: "#7CB342",
        secondary: "#1B5E20",
        accent: "#FFFFFF",
      },
      {
        id: "cyan",
        primary: "#00ACC1",
        secondary: "#212121",
        accent: "#E0F7FA",
      },
      {
        id: "purple",
        primary: "#AB47BC",
        secondary: "#311B92",
        accent: "#F3E5F5",
      },
    ],
  },

  {
    id: "clock",
    name: "시계",
    description:
      "똑딱똑딱! 지금은 몇 시일까요? 시계 색깔도 마음대로 바꿔보세요.",
    svgKey: "clock",
    topCategory: "living",
    subCategory: "daily",
    shapes: ["circle"],
    variants: [
      {
        id: "white_red",
        primary: "#FFFFFF",
        secondary: "#E53935",
        accent: "#212121",
      },
      {
        id: "blue",
        primary: "#64B5F6",
        secondary: "#0D47A1",
        accent: "#FFFFFF",
      },
      {
        id: "mint",
        primary: "#80CBC4",
        secondary: "#004D40",
        accent: "#FFFFFF",
      },
      {
        id: "yellow",
        primary: "#FFF176",
        secondary: "#F57F17",
        accent: "#37474F",
      },
      {
        id: "pink",
        primary: "#F48FB1",
        secondary: "#880E4F",
        accent: "#FFFFFF",
      },
      {
        id: "wood",
        primary: "#BCAAA4",
        secondary: "#4E342E",
        accent: "#212121",
      },
    ],
  },

  {
    id: "frog",
    name: "개구리",
    description:
      "개굴개굴! 연못에서 개구리가 폴짝 뛰었어요. 무슨 색 개구리가 나타날까요?",
    svgKey: "frog",
    topCategory: "animal",
    subCategory: "land_animal",
    shapes: ["circle"],
    variants: [
      {
        id: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        id: "lime",
        primary: "#D4E157",
        secondary: "#F0F4C3",
        accent: "#827717",
      },
      {
        id: "blue",
        primary: "#29B6F6",
        secondary: "#E0F7FA",
        accent: "#0277BD",
      },
      {
        id: "tree_brown",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#3E2723",
      },
      {
        id: "yellow",
        primary: "#FFCA28",
        secondary: "#FFF8E1",
        accent: "#F57F17",
      },
      {
        id: "red_poison",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#B71C1C",
      },
    ],
  },

  {
    id: "koala",
    name: "코알라",
    description:
      "나무 위에서 꼬옥 안고 있는 코알라예요. 알록달록 코알라를 만들어 볼까요?",
    svgKey: "koala",
    topCategory: "animal",
    subCategory: "land_animal",
    shapes: ["circle"],
    variants: [
      {
        id: "gray",
        primary: "#9E9E9E",
        secondary: "#F5F5F5",
        accent: "#424242",
      },
      {
        id: "brown",
        primary: "#A1887F",
        secondary: "#EFEBE9",
        accent: "#3E2723",
      },
      {
        id: "ash_blue",
        primary: "#90A4AE",
        secondary: "#ECEFF1",
        accent: "#263238",
      },
      {
        id: "pink",
        primary: "#F48FB1",
        secondary: "#FCE4EC",
        accent: "#AD1457",
      },
      {
        id: "beige",
        primary: "#D7CCC8",
        secondary: "#FFFFFF",
        accent: "#5D4037",
      },
      {
        id: "lavender",
        primary: "#B39DDB",
        secondary: "#EDE7F6",
        accent: "#4A148C",
      },
    ],
  },

  {
    id: "ladybug",
    name: "무당벌레",
    description:
      "꼬물꼬물 무당벌레가 산책 중이에요! 오늘은 어떤 색 옷을 입혀줄까요?",
    svgKey: "ladybug",
    topCategory: "animal",
    subCategory: "insect",
    shapes: ["circle"],
    variants: [
      {
        id: "red",
        primary: "#F44336",
        secondary: "#212121",
        accent: "#FFFFFF",
      },
      {
        id: "yellow",
        primary: "#FFEB3B",
        secondary: "#212121",
        accent: "#FFFFFF",
      },
      {
        id: "orange",
        primary: "#FF9800",
        secondary: "#212121",
        accent: "#FFFFFF",
      },
      {
        id: "pink",
        primary: "#FF4081",
        secondary: "#212121",
        accent: "#FFFFFF",
      },
      {
        id: "green",
        primary: "#4CAF50",
        secondary: "#212121",
        accent: "#FFFFFF",
      },
      {
        id: "cyan",
        primary: "#00BCD4",
        secondary: "#212121",
        accent: "#FFFFFF",
      },
    ],
  },

  {
    id: "chick",
    name: "병아리",
    description:
      "삐약삐약! 귀여운 병아리가 나타났어요. 노란 병아리 말고 다른 색도 볼까요?",
    svgKey: "chick",
    topCategory: "animal",
    subCategory: "bird",
    shapes: ["circle"],
    variants: [
      {
        id: "yellow",
        primary: "#FFEE58",
        secondary: "#FFFDE7",
        accent: "#FF9800",
      },
      {
        id: "white",
        primary: "#FFFFFF",
        secondary: "#F5F5F5",
        accent: "#FFB74D",
      },
      {
        id: "pink",
        primary: "#F8BBD0",
        secondary: "#FCE4EC",
        accent: "#F4511E",
      },
      {
        id: "mint",
        primary: "#B2DFDB",
        secondary: "#E0F2F1",
        accent: "#FF8A65",
      },
      {
        id: "orange",
        primary: "#FFE0B2",
        secondary: "#FFF3E0",
        accent: "#E65100",
      },
      {
        id: "lavender",
        primary: "#D1C4E9",
        secondary: "#EDE7F6",
        accent: "#FF7043",
      },
    ],
  },

  {
    id: "sunflower",
    name: "해바라기",
    description:
      "햇님을 바라보는 해바라기예요! 해바라기가 다른 색으로 변신하면 어떨까요?",
    svgKey: "sunflower",
    topCategory: "living", // ⚠️ 임시
    subCategory: "daily", // ⚠️ 임시
    shapes: ["circle"],
    variants: [
      {
        id: "yellow",
        primary: "#FFCA28",
        secondary: "#5D4037",
        accent: "#689F38",
      },
      {
        id: "orange",
        primary: "#FB8C00",
        secondary: "#3E2723",
        accent: "#558B2F",
      },
      {
        id: "red",
        primary: "#E53935",
        secondary: "#4E342E",
        accent: "#33691E",
      },
      {
        id: "pink",
        primary: "#F06292",
        secondary: "#4A148C",
        accent: "#7CB342",
      },
      {
        id: "white_gold",
        primary: "#FFF9C4",
        secondary: "#8D6E63",
        accent: "#9E9D24",
      },
      {
        id: "purple",
        primary: "#AB47BC",
        secondary: "#212121",
        accent: "#7CB342",
      },
    ],
  },

  {
    id: "flower",
    name: "꽃",
    description:
      "활짝 피어난 예쁜 꽃이에요! 세상에 하나뿐인 특별한 색 꽃을 만들어 보세요.",
    svgKey: "flower",
    topCategory: "living", // ⚠️ 임시
    subCategory: "daily", // ⚠️ 임시
    shapes: ["circle"],
    variants: [
      {
        id: "pink",
        primary: "#EC407A",
        secondary: "#FFEE58",
        accent: "#66BB6A",
      },
      {
        id: "red",
        primary: "#E53935",
        secondary: "#FFF176",
        accent: "#4CAF50",
      },
      {
        id: "yellow",
        primary: "#FDD835",
        secondary: "#8D6E63",
        accent: "#81C784",
      },
      {
        id: "purple",
        primary: "#AB47BC",
        secondary: "#FFCA28",
        accent: "#43A047",
      },
      {
        id: "blue",
        primary: "#42A5F5",
        secondary: "#FFF59D",
        accent: "#66BB6A",
      },
      {
        id: "white",
        primary: "#FFFFFF",
        secondary: "#FBC02D",
        accent: "#81C784",
      },
    ],
  },

  {
    id: "star",
    name: "별",
    description:
      "반짝반짝 빛나는 별이에요! 오늘은 무슨 색 별이 하늘에 떠 있을까요?",
    svgKey: "star",
    topCategory: "living", // ⚠️ 임시
    subCategory: "daily", // ⚠️ 임시
    shapes: ["star"],
    variants: [
      {
        id: "yellow",
        primary: "#FFD700",
        secondary: "#FFF9C4",
        accent: "#FFA000",
      },
      {
        id: "white",
        primary: "#FFFFFF",
        secondary: "#E0F7FA",
        accent: "#80DEEA",
      },
      {
        id: "pink",
        primary: "#FF80AB",
        secondary: "#FCE4EC",
        accent: "#F50057",
      },
      {
        id: "cyan",
        primary: "#00E5FF",
        secondary: "#E0CFE6",
        accent: "#00B0FF",
      },
      {
        id: "purple",
        primary: "#E040FB",
        secondary: "#F3E5F5",
        accent: "#AA00FF",
      },
      {
        id: "orange",
        primary: "#FF9100",
        secondary: "#FFF3E0",
        accent: "#FF3D00",
      },
    ],
  },

  {
    id: "tree",
    name: "나무",
    description: "쑥쑥 자라는 나무예요! 알록달록 신기한 나무를 만들어 볼까요?",
    svgKey: "tree",
    topCategory: "living", // ⚠️ 임시
    subCategory: "daily", // ⚠️ 임시
    shapes: ["triangle"],
    variants: [
      {
        id: "green",
        primary: "#43A047",
        secondary: "#6D4C41",
        accent: "#81C784",
      },
      {
        id: "autumn_red",
        primary: "#E53935",
        secondary: "#4E342E",
        accent: "#FF8A65",
      },
      {
        id: "autumn_yellow",
        primary: "#FBC02D",
        secondary: "#5D4037",
        accent: "#FFE082",
      },
      {
        id: "pink_blossom",
        primary: "#F48FB1",
        secondary: "#8D6E63",
        accent: "#FCE4EC",
      },
      {
        id: "winter_snow",
        primary: "#E0F7FA",
        secondary: "#5D4037",
        accent: "#80DEEA",
      },
      {
        id: "fantasy_purple",
        primary: "#8E24AA",
        secondary: "#4A148C",
        accent: "#E1BEE7",
      },
    ],
  },

  {
    id: "butterfly",
    name: "나비",
    description:
      "팔랑팔랑 날아다니는 나비예요! 세상에 하나뿐인 나비를 만들어 보세요.",
    svgKey: "butterfly",
    topCategory: "animal",
    subCategory: "insect",
    shapes: [],
    variants: [
      {
        id: "yellow",
        primary: "#FFEB3B",
        secondary: "#FF9800",
        accent: "#212121",
      },
      {
        id: "blue_morpho",
        primary: "#29B6F6",
        secondary: "#0277BD",
        accent: "#212121",
      },
      {
        id: "pink",
        primary: "#F06292",
        secondary: "#AD1457",
        accent: "#FFFFFF",
      },
      {
        id: "purple",
        primary: "#AB47BC",
        secondary: "#4A148C",
        accent: "#FFD700",
      },
      {
        id: "orange_monarch",
        primary: "#FB8C00",
        secondary: "#212121",
        accent: "#FFFFFF",
      },
      {
        id: "mint",
        primary: "#4DB6AC",
        secondary: "#004D40",
        accent: "#FFF59D",
      },
    ],
  },

  {
    id: "cupcake",
    name: "컵케익",
    description: "달콤한 컵케익이 짠! 알록달록한 컵케익을 만들어 볼까요?",
    svgKey: "cupcake",
    topCategory: "food",
    subCategory: "snack",
    shapes: [],
    variants: [],
  },

  {
    id: "cactus",
    name: "선인장",
    description:
      "뾰족뾰족 선인장이에요! 사막에 알록달록 선인장이 있다면 어떨까요?",
    svgKey: "cactus",
    topCategory: "living", // ⚠️ 임시
    subCategory: "daily", // ⚠️ 임시
    shapes: [],
    variants: [
      {
        id: "green",
        primary: "#4CAF50",
        secondary: "#81C784",
        accent: "#E53935",
      },
      {
        id: "lime",
        primary: "#CDDC39",
        secondary: "#F0F4C3",
        accent: "#EC407A",
      },
      {
        id: "dark_green",
        primary: "#2E7D32",
        secondary: "#A5D6A7",
        accent: "#FFB74D",
      },
      {
        id: "blue_green",
        primary: "#00897B",
        secondary: "#80CBC4",
        accent: "#FF8A65",
      },
      {
        id: "yellow",
        primary: "#FBC02D",
        secondary: "#FFF59D",
        accent: "#D32F2F",
      },
      {
        id: "pink_fantasy",
        primary: "#F06292",
        secondary: "#F8BBD0",
        accent: "#FFEE58",
      },
    ],
  },

  {
    id: "crow",
    name: "까마귀",
    description:
      "까악까악! 까마귀가 날아왔어요. 오늘은 어떤 색 깃털을 입혀볼까요?",
    svgKey: "crow",
    topCategory: "animal",
    subCategory: "bird",
    shapes: [],
    variants: [
      {
        id: "black",
        primary: "#212121",
        secondary: "#424242",
        accent: "#FFB300",
      },
      {
        id: "dark_navy",
        primary: "#1A237E",
        secondary: "#283593",
        accent: "#FF9800",
      },
      {
        id: "charcoal",
        primary: "#37474F",
        secondary: "#546E7A",
        accent: "#FF7043",
      },
      {
        id: "purple_night",
        primary: "#311B92",
        secondary: "#4A148C",
        accent: "#FFD700",
      },
      {
        id: "silver_gray",
        primary: "#78909C",
        secondary: "#CFD8DC",
        accent: "#E65100",
      },
      {
        id: "albino_white",
        primary: "#ECEFF1",
        secondary: "#FFFFFF",
        accent: "#FFB74D",
      },
    ],
  },

  {
    id: "cloud",
    name: "구름",
    description:
      "둥실둥실 하늘을 떠다니는 구름이에요! 오늘 구름은 무슨 색일까요?",
    svgKey: "cloud",
    topCategory: "living", // ⚠️ 임시
    subCategory: "daily", // ⚠️ 임시
    shapes: [],
    variants: [
      {
        id: "white",
        primary: "#FFFFFF",
        secondary: "#E0F7FA",
        accent: "#29B6F6",
      },
      {
        id: "sunset_pink",
        primary: "#F8BBD0",
        secondary: "#FFCCBC",
        accent: "#FF7043",
      },
      {
        id: "sunset_orange",
        primary: "#FFE0B2",
        secondary: "#FFF3E0",
        accent: "#FB8C00",
      },
      {
        id: "rain_gray",
        primary: "#90A4AE",
        secondary: "#CFD8DC",
        accent: "#37474F",
      },
      {
        id: "sky_blue",
        primary: "#B3E5FC",
        secondary: "#E1F5FE",
        accent: "#0288D1",
      },
      {
        id: "purple_dream",
        primary: "#E1BEE7",
        secondary: "#F3E5F5",
        accent: "#8E24AA",
      },
    ],
  },

  {
    id: "snowman",
    name: "눈사람",
    description:
      "꽁꽁! 눈으로 만든 귀여운 눈사람이에요. 무지개 눈사람을 만들어 볼까요?",
    svgKey: "snowman",
    topCategory: "living", // ⚠️ 임시
    subCategory: "daily", // ⚠️ 임시
    shapes: ["circle"],
    variants: [
      {
        id: "classic_white",
        primary: "#FFFFFF",
        secondary: "#FF5722",
        accent: "#212121",
      },
      {
        id: "ice_blue",
        primary: "#E0F7FA",
        secondary: "#0288D1",
        accent: "#D32F2F",
      },
      {
        id: "pink",
        primary: "#FCE4EC",
        secondary: "#EC407A",
        accent: "#4E342E",
      },
      {
        id: "mint",
        primary: "#E0F2F1",
        secondary: "#00897B",
        accent: "#FF9800",
      },
      {
        id: "yellow",
        primary: "#FFFDE7",
        secondary: "#FBC02D",
        accent: "#5D4037",
      },
      {
        id: "lavender",
        primary: "#F3E5F5",
        secondary: "#7B1FA2",
        accent: "#212121",
      },
    ],
  },

  {
    id: "cottonCandy",
    name: "솜사탕",
    description:
      "폭신폭신 달콤한 솜사탕이에요! 내가 좋아하는 색 솜사탕을 만들어 보세요.",
    svgKey: "cottonCandy",
    topCategory: "food",
    subCategory: "snack",
    shapes: ["circle"],
    variants: [
      {
        id: "pink",
        primary: "#F8BBD0",
        secondary: "#FCE4EC",
        accent: "#D7CCC8",
      },
      {
        id: "blue",
        primary: "#B3E5FC",
        secondary: "#E1F5FE",
        accent: "#D7CCC8",
      },
      {
        id: "yellow",
        primary: "#FFF9C4",
        secondary: "#FFFDE7",
        accent: "#D7CCC8",
      },
      {
        id: "purple",
        primary: "#E1BEE7",
        secondary: "#F3E5F5",
        accent: "#D7CCC8",
      },
      {
        id: "mint",
        primary: "#B2DFDB",
        secondary: "#E0F2F1",
        accent: "#D7CCC8",
      },
      {
        id: "rainbow_mix",
        primary: "#FFCDD2",
        secondary: "#E1BEE7",
        accent: "#B3E5FC",
      },
    ],
  },

  {
    id: "fox",
    name: "여우",
    description:
      "살금살금 숲속을 걷는 여우예요. 오늘은 어떤 색 여우가 나타났을까요?",
    svgKey: "fox",
    topCategory: "animal",
    subCategory: "land_animal",
    shapes: ["triangle"],
    variants: [
      {
        id: "orange",
        primary: "#E65100",
        secondary: "#FFFFFF",
        accent: "#212121",
      },
      {
        id: "red_brown",
        primary: "#BF360C",
        secondary: "#FFF3E0",
        accent: "#3E2723",
      },
      {
        id: "arctic_white",
        primary: "#FFFFFF",
        secondary: "#CFD8DC",
        accent: "#37474F",
      },
      {
        id: "silver_black",
        primary: "#37474F",
        secondary: "#ECEFF1",
        accent: "#212121",
      },
      {
        id: "golden_yellow",
        primary: "#FFA000",
        secondary: "#FFFDE7",
        accent: "#4E342E",
      },
      {
        id: "pink_fantasy",
        primary: "#F48FB1",
        secondary: "#FFFFFF",
        accent: "#880E4F",
      },
    ],
  },

  {
    id: "snail",
    name: "달팽이",
    description:
      "느릿느릿 달팽이가 지나가요. 달팽이의 집을 알록달록 꾸며볼까요?",
    svgKey: "snail",
    topCategory: "animal",
    subCategory: "land_animal",
    shapes: ["circle"],
    variants: [
      {
        id: "brown_pink",
        primary: "#A1887F",
        secondary: "#FF80AB",
        accent: "#4E342E",
      },
      {
        id: "green_yellow",
        primary: "#81C784",
        secondary: "#FFF176",
        accent: "#2E7D32",
      },
      {
        id: "blue_cyan",
        primary: "#4FC3F7",
        secondary: "#80DEEA",
        accent: "#01579B",
      },
      {
        id: "yellow_orange",
        primary: "#FFD54F",
        secondary: "#FF7043",
        accent: "#E65100",
      },
      {
        id: "purple_mint",
        primary: "#BA68C8",
        secondary: "#80CBC4",
        accent: "#4A148C",
      },
      {
        id: "beige_red",
        primary: "#D7CCC8",
        secondary: "#EF5350",
        accent: "#5D4037",
      },
    ],
  },
];

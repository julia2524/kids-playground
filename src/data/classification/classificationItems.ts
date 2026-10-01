import { ClassificationItem } from "../../types/game";

export const classificationItems: ClassificationItem[] = [
  // ========== 탈것 ==========
  {
    id: "sparrow",
    name: "참새",

    svgKey: "sparrow",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    topCategory: "animal",
    subCategory: "bird",
    description: "짹짹! 작은 참새가 나뭇가지에 앉았어요. 어디로 날아가 볼까요?",
    variants: [
      {
        id: "classic",
        primary: "#A1785C",
        secondary: "#F5EBE6",
        accent: "#E0986B",
      },
      {
        id: "dark_brown",
        primary: "#6D4C41",
        secondary: "#E0D5D0",
        accent: "#D87A51",
      },
      {
        id: "beige",
        primary: "#D7CCC8",
        secondary: "#FFFFFF",
        accent: "#FFB74D",
      },
      {
        id: "golden",
        primary: "#C0CA33",
        secondary: "#F0F4C3",
        accent: "#FFA726",
      },
      {
        id: "ash_gray",
        primary: "#78909C",
        secondary: "#ECEFF1",
        accent: "#FF8A65",
      },
      {
        id: "cinnamon",
        primary: "#BCAAA4",
        secondary: "#F5F5F5",
        accent: "#FFB300",
      },
    ],
  },
  {
    id: "boat",
    name: "보트",
    topCategory: "vehicle",
    subCategory: "water_vehicle",
    svgKey: "boat",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "찰랑찰랑! 작은 배가 물 위에 둥실 떠 있어요.",
    variants: [
      {
        id: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
      {
        id: "blue",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#1565C0",
      },
      {
        id: "yellow",
        primary: "#FFEE58",
        secondary: "#FFF9C4",
        accent: "#F9A825",
      },
      {
        id: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        id: "orange",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        id: "purple",
        primary: "#AB47BC",
        secondary: "#E1BEE7",
        accent: "#6A1B9A",
      },
    ],
  },
  {
    id: "helicopter",
    name: "헬리콥터",
    topCategory: "vehicle",
    subCategory: "air_vehicle",
    svgKey: "helicopter",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "위잉위잉! 헬리콥터가 하늘을 날아가요.",
    variants: [
      {
        id: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
      {
        id: "blue",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#1565C0",
      },
      {
        id: "yellow",
        primary: "#FFEE58",
        secondary: "#FFF9C4",
        accent: "#F9A825",
      },
      {
        id: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        id: "orange",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        id: "purple",
        primary: "#AB47BC",
        secondary: "#E1BEE7",
        accent: "#6A1B9A",
      },
    ],
  },
  {
    id: "bicycle",
    name: "자전거",
    topCategory: "vehicle",
    subCategory: "road_vehicle",
    svgKey: "bicycle",
    shapes: ["circle"], // TODO: shapesPool 연결 단계에서 채움
    description: "따르릉! 자전거를 타고 신나게 달려볼까요?",
    variants: [
      {
        id: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
      {
        id: "blue",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#1565C0",
      },
      {
        id: "yellow",
        primary: "#FFEE58",
        secondary: "#FFF9C4",
        accent: "#F9A825",
      },
      {
        id: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        id: "orange",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        id: "purple",
        primary: "#AB47BC",
        secondary: "#E1BEE7",
        accent: "#6A1B9A",
      },
    ],
  },
  {
    id: "ship",
    name: "배",
    topCategory: "vehicle",
    subCategory: "water_vehicle",
    svgKey: "ship",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "출렁출렁! 커다란 배가 바다를 가로질러 떠나요.",
    variants: [
      {
        id: "white",
        primary: "#FAFAFA",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },
      {
        id: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
      {
        id: "blue",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#1565C0",
      },
      {
        id: "yellow",
        primary: "#FFEE58",
        secondary: "#FFF9C4",
        accent: "#F9A825",
      },
      {
        id: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        id: "orange",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
    ],
  },
  {
    id: "airplane",
    name: "비행기",
    topCategory: "vehicle",
    subCategory: "air_vehicle",
    svgKey: "airplane",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "슈우웅! 비행기가 하늘 높이 날아올라요.",
    variants: [
      {
        id: "white",
        primary: "#FAFAFA",
        secondary: "#E0E0E0",
        accent: "#42A5F5",
      },
      {
        id: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
      {
        id: "blue",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#1565C0",
      },
      {
        id: "yellow",
        primary: "#FFEE58",
        secondary: "#FFF9C4",
        accent: "#F9A825",
      },
      {
        id: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        id: "purple",
        primary: "#AB47BC",
        secondary: "#E1BEE7",
        accent: "#6A1B9A",
      },
    ],
  },
  {
    id: "train",
    name: "기차",
    topCategory: "vehicle",
    subCategory: "rail_special",
    svgKey: "train",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "칙칙폭폭! 기차가 힘차게 달려가요. 어디까지 갈까요?",
    variants: [
      {
        id: "blue",
        primary: "#1E88E5",
        secondary: "#64B5F6",
        accent: "#FFEE58",
      },
      {
        id: "green",
        primary: "#43A047",
        secondary: "#81C784",
        accent: "#FFEE58",
      },
      {
        id: "red",
        primary: "#E53935",
        secondary: "#EF5350",
        accent: "#FFEE58",
      },
      {
        id: "yellow",
        primary: "#FDD835",
        secondary: "#FFEE58",
        accent: "#5D4037",
      },
      {
        id: "orange",
        primary: "#FB8C00",
        secondary: "#FFB74D",
        accent: "#5D4037",
      },
      {
        id: "purple",
        primary: "#8E24AA",
        secondary: "#BA68C8",
        accent: "#FFEE58",
      },
    ],
  },
  {
    id: "bus",
    name: "버스",
    topCategory: "vehicle",
    subCategory: "road_vehicle",
    svgKey: "bus",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "빵빵! 커다란 버스가 사람들을 태우러 왔어요.",
    variants: [
      {
        id: "yellow",
        primary: "#FDD835",
        secondary: "#FFEE58",
        accent: "#5D4037",
      },
      {
        id: "green",
        primary: "#43A047",
        secondary: "#81C784",
        accent: "#FFEE58",
      },
      {
        id: "blue",
        primary: "#1E88E5",
        secondary: "#64B5F6",
        accent: "#FFEE58",
      },
      {
        id: "red",
        primary: "#E53935",
        secondary: "#EF5350",
        accent: "#FFEE58",
      },
      {
        id: "orange",
        primary: "#FB8C00",
        secondary: "#FFB74D",
        accent: "#5D4037",
      },
      {
        id: "white",
        primary: "#FAFAFA",
        secondary: "#E0E0E0",
        accent: "#42A5F5",
      },
    ],
  },
  {
    id: "car",
    name: "승용차",
    topCategory: "vehicle",
    subCategory: "road_vehicle",
    svgKey: "car",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "부릉부릉! 자동차가 신나게 출발해요. 어디로 가볼까요?",
    variants: [
      {
        id: "red",
        primary: "#E53935",
        secondary: "#EF5350",
        accent: "#212121",
      },
      {
        id: "blue",
        primary: "#1E88E5",
        secondary: "#64B5F6",
        accent: "#212121",
      },
      {
        id: "yellow",
        primary: "#FDD835",
        secondary: "#FFEE58",
        accent: "#212121",
      },
      {
        id: "green",
        primary: "#43A047",
        secondary: "#81C784",
        accent: "#212121",
      },
      {
        id: "white",
        primary: "#FAFAFA",
        secondary: "#EEEEEE",
        accent: "#212121",
      },
      {
        id: "black",
        primary: "#424242",
        secondary: "#616161",
        accent: "#FFEE58",
      },
    ],
  },
  {
    id: "submarine",
    name: "잠수함",
    topCategory: "vehicle",
    subCategory: "water_vehicle",
    svgKey: "submarine",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "슈우웅! 잠수함이 바닷속 깊은 곳으로 내려가요.",
    variants: [
      {
        id: "yellow",
        primary: "#FDD835",
        secondary: "#FFF9C4",
        accent: "#1565C0",
      },
      {
        id: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#1565C0",
      },
      {
        id: "blue",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#0D47A1",
      },
      {
        id: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#1B5E20",
      },
      {
        id: "orange",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#1565C0",
      },
      {
        id: "white",
        primary: "#ECEFF1",
        secondary: "#CFD8DC",
        accent: "#455A64",
      },
    ],
  },
  {
    id: "rocket",
    name: "로켓",
    topCategory: "vehicle",
    subCategory: "air_vehicle",
    svgKey: "rocket",
    shapes: ["triangle"], // TODO: shapesPool 연결 단계에서 채움
    description: "슈우웅! 로켓이 우주를 향해 출발해요. 어디까지 날아갈까요?",
    variants: [
      {
        id: "white",
        primary: "#ECEFF1",
        secondary: "#CFD8DC",
        accent: "#EF5350",
      },
      {
        id: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#1565C0",
      },
      {
        id: "blue",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#EF5350",
      },
      {
        id: "yellow",
        primary: "#FFEE58",
        secondary: "#FFF9C4",
        accent: "#E53935",
      },
      {
        id: "orange",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#1565C0",
      },
      {
        id: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#E53935",
      },
    ],
  },
  {
    id: "hotAirBalloon",
    name: "열기구",
    topCategory: "vehicle",
    subCategory: "air_vehicle",
    svgKey: "hotAirBalloon",
    shapes: ["circle"], // TODO: shapesPool 연결 단계에서 채움
    description:
      "둥실둥실 열기구가 하늘 위로 올라가요. 구름보다 높이 갈 수 있을까요?",
    variants: [
      {
        id: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#FDD835",
      },
      {
        id: "yellow",
        primary: "#FFEE58",
        secondary: "#FFF9C4",
        accent: "#EF5350",
      },
      {
        id: "blue",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#EF5350",
      },
      {
        id: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#FFA726",
      },
      {
        id: "orange",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#42A5F5",
      },
      {
        id: "purple",
        primary: "#AB47BC",
        secondary: "#E1BEE7",
        accent: "#FFEE58",
      },
    ],
  },
  {
    id: "truck",
    name: "트럭",
    topCategory: "vehicle",
    subCategory: "road_vehicle",
    svgKey: "truck",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "부릉부릉! 커다란 트럭이 무언가를 가득 싣고 달려가요.",
    variants: [
      {
        id: "blue",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#1565C0",
      },
      {
        id: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
      {
        id: "yellow",
        primary: "#FFEE58",
        secondary: "#FFF9C4",
        accent: "#F9A825",
      },
      {
        id: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        id: "orange",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        id: "white",
        primary: "#ECEFF1",
        secondary: "#CFD8DC",
        accent: "#455A64",
      },
    ],
  },
  {
    id: "excavator",
    name: "포크레인",
    topCategory: "vehicle",
    subCategory: "rail_special",
    svgKey: "excavator",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "윙윙! 굴착기의 커다란 팔이 흙을 푹푹 파고 있어요.",
    variants: [
      {
        id: "yellow",
        primary: "#FDD835",
        secondary: "#FFF9C4",
        accent: "#F9A825",
      },
      {
        id: "orange",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        id: "blue",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#1565C0",
      },
      {
        id: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        id: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
      {
        id: "white",
        primary: "#ECEFF1",
        secondary: "#CFD8DC",
        accent: "#455A64",
      },
    ],
  },
  {
    id: "subway",
    name: "지하철",
    topCategory: "vehicle",
    subCategory: "rail_special",
    svgKey: "subway",
    shapes: [],
    description: "슝! 지하철이 깜깜한 터널을 빠르게 지나가요.",
    variants: [
      {
        id: "silver",
        primary: "#ECEFF1",
        secondary: "#90CAF9",
        accent: "#1565C0",
      },
      {
        id: "blue",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#0D47A1",
      },
      {
        id: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#1B5E20",
      },
      {
        id: "orange",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#E65100",
      },
      {
        id: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#B71C1C",
      },
      {
        id: "purple",
        primary: "#AB47BC",
        secondary: "#E1BEE7",
        accent: "#6A1B9A",
      },
    ],
  },
  {
    id: "cementMixer",
    name: "레미콘",
    topCategory: "vehicle",
    subCategory: "rail_special",
    svgKey: "cementMixer",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "빙글빙글! 레미콘 트럭 통이 돌아가며 시멘트를 골고루 섞어요.",
    variants: [
      {
        id: "orange",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        id: "yellow",
        primary: "#FDD835",
        secondary: "#FFF9C4",
        accent: "#F9A825",
      },
      {
        id: "blue",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#1565C0",
      },
      {
        id: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        id: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
      {
        id: "white",
        primary: "#ECEFF1",
        secondary: "#CFD8DC",
        accent: "#455A64",
      },
    ],
  },
  // ========== 간식 ==========
  {
    id: "candy",
    name: "사탕",
    topCategory: "food",
    subCategory: "snack",
    svgKey: "candy",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "달콤한 사탕이 반짝반짝! 어떤 맛일지 궁금하지 않나요?",
    variants: [
      {
        id: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
      {
        id: "pink",
        primary: "#EC407A",
        secondary: "#F8BBD0",
        accent: "#AD1457",
      },
      {
        id: "yellow",
        primary: "#FFEE58",
        secondary: "#FFF9C4",
        accent: "#F9A825",
      },
      {
        id: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        id: "blue",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#1565C0",
      },
      {
        id: "purple",
        primary: "#AB47BC",
        secondary: "#E1BEE7",
        accent: "#6A1B9A",
      },
    ],
  },
  {
    id: "donut",
    name: "도넛",
    topCategory: "food",
    subCategory: "snack",
    svgKey: "donut",
    shapes: ["circle"], // TODO: shapesPool 연결 단계에서 채움
    description: "동그란 도넛이 짠! 가운데 구멍이 뽕 뚫려 있어요.",
    variants: [
      {
        id: "strawberry",
        primary: "#F06292",
        secondary: "#F8BBD0",
        accent: "#C2185B",
      },
      {
        id: "chocolate",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#4E342E",
      },
      {
        id: "vanilla",
        primary: "#FFEE58",
        secondary: "#FFF9C4",
        accent: "#F9A825",
      },
      {
        id: "blueberry",
        primary: "#5C6BC0",
        secondary: "#C5CAE9",
        accent: "#283593",
      },
      {
        id: "matcha",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        id: "orange",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
    ],
  },
  {
    id: "chocolate",
    name: "초콜릿",
    topCategory: "food",
    subCategory: "snack",
    svgKey: "chocolate",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "달콤달콤 초콜릿이에요! 한 조각만 먹어볼까요?",
    variants: [
      {
        id: "milk",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#4E342E",
      },
      {
        id: "dark",
        primary: "#5D4037",
        secondary: "#BCAAA4",
        accent: "#3E2723",
      },
      {
        id: "white",
        primary: "#FFF8E1",
        secondary: "#FFE0B2",
        accent: "#FFB300",
      },
      {
        id: "pink",
        primary: "#EC407A",
        secondary: "#F8BBD0",
        accent: "#AD1457",
      },
      {
        id: "mint",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        id: "orange",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
    ],
  },
  {
    id: "iceCream",
    name: "아이스크림",
    topCategory: "food",
    subCategory: "snack",
    svgKey: "iceCream",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "시원하고 달콤한 아이스크림이에요! 어떤 맛이 제일 맛있을까요?",
    variants: [
      {
        id: "vanilla",
        primary: "#FFF8E1",
        secondary: "#FFE0B2",
        accent: "#8D6E63",
      },
      {
        id: "chocolate",
        primary: "#8D6E63",
        secondary: "#6D4C41",
        accent: "#3E2723",
      },
      {
        id: "strawberry",
        primary: "#F8BBD0",
        secondary: "#F48FB1",
        accent: "#C2185B",
      },
      {
        id: "matcha",
        primary: "#C5E1A5",
        secondary: "#AED581",
        accent: "#558B2F",
      },
      {
        id: "blueberry",
        primary: "#90CAF9",
        secondary: "#64B5F6",
        accent: "#1565C0",
      },
      {
        id: "mint",
        primary: "#B2DFDB",
        secondary: "#80CBC4",
        accent: "#00695C",
      },
    ],
  },
  {
    id: "cake",
    name: "케이크",
    topCategory: "food",
    subCategory: "snack",
    svgKey: "cake",
    shapes: ["circle"], // TODO: shapesPool 연결 단계에서 채움
    description: "달콤한 케이크가 짠! 촛불을 후~ 불어볼까요?",
    variants: [
      {
        id: "strawberry",
        primary: "#F8BBD0",
        secondary: "#F48FB1",
        accent: "#E91E63",
      },
      {
        id: "chocolate",
        primary: "#A1887F",
        secondary: "#8D6E63",
        accent: "#5D4037",
      },
      {
        id: "vanilla",
        primary: "#FFF8E1",
        secondary: "#FFE082",
        accent: "#FF8A65",
      },
      {
        id: "matcha",
        primary: "#C5E1A5",
        secondary: "#AED581",
        accent: "#7CB342",
      },
      {
        id: "blueberry",
        primary: "#BBDEFB",
        secondary: "#90CAF9",
        accent: "#42A5F5",
      },
      {
        id: "lemon",
        primary: "#FFF59D",
        secondary: "#FFEE58",
        accent: "#FBC02D",
      },
    ],
  },
  {
    id: "cookie",
    name: "쿠키",
    topCategory: "food",
    subCategory: "snack",
    svgKey: "cookie",
    shapes: ["circle"], // TODO: shapesPool 연결 단계에서 채움
    description: "바삭바삭 맛있는 쿠키예요! 하나만 먹을까요, 두 개 먹을까요?",
    variants: [
      {
        id: "classic",
        primary: "#D7A86E",
        secondary: "#C4935A",
        accent: "#5D4037",
      },
      {
        id: "chocolate",
        primary: "#8D6E63",
        secondary: "#6D4C41",
        accent: "#3E2723",
      },
      {
        id: "strawberry",
        primary: "#F48FB1",
        secondary: "#EC407A",
        accent: "#AD1457",
      },
      {
        id: "matcha",
        primary: "#AED581",
        secondary: "#9CCC65",
        accent: "#558B2F",
      },
      {
        id: "sky",
        primary: "#81D4FA",
        secondary: "#4FC3F7",
        accent: "#0288D1",
      },
      {
        id: "grape",
        primary: "#CE93D8",
        secondary: "#BA68C8",
        accent: "#8E24AA",
      },
    ],
  },

  // ========== 동물 - 육지 ==========
  {
    id: "pig",
    name: "돼지",
    topCategory: "animal",
    subCategory: "land_animal",
    svgKey: "pig",
    shapes: ["circle"], // TODO: shapesPool 연결 단계에서 채움
    description: "꿀꿀! 귀여운 돼지가 꼬리를 빙글빙글 말았어요.",
    variants: [
      {
        id: "pink",
        primary: "#F48FB1",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },
      {
        id: "lightPink",
        primary: "#F8BBD0",
        secondary: "#FFF0F5",
        accent: "#AD1457",
      },
      {
        id: "coral",
        primary: "#FF8A80",
        secondary: "#FFCDD2",
        accent: "#D32F2F",
      },
      {
        id: "peach",
        primary: "#FFAB91",
        secondary: "#FBE9E7",
        accent: "#E64A19",
      },
      {
        id: "rose",
        primary: "#E57373",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
      {
        id: "purple",
        primary: "#CE93D8",
        secondary: "#F3E5F5",
        accent: "#7B1FA2",
      },
    ],
  },
  {
    id: "bear",
    name: "곰",
    topCategory: "animal",
    subCategory: "land_animal",
    svgKey: "bear",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "어흥? 아니죠! 귀여운 곰이 숲속에서 어슬렁어슬렁 걸어와요.",
    variants: [
      {
        id: "brown",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#4E342E",
      },
      {
        id: "lightBrown",
        primary: "#A1887F",
        secondary: "#EFEBE9",
        accent: "#5D4037",
      },
      {
        id: "darkBrown",
        primary: "#6D4C41",
        secondary: "#BCAAA4",
        accent: "#3E2723",
      },
      {
        id: "cream",
        primary: "#D7CCC8",
        secondary: "#F5F5F5",
        accent: "#795548",
      },
      {
        id: "golden",
        primary: "#BCAAA4",
        secondary: "#EFEBE9",
        accent: "#6D4C41",
      },
      {
        id: "honey",
        primary: "#A1887F",
        secondary: "#D7CCC8",
        accent: "#4E342E",
      },
    ],
  },
  {
    id: "cow",
    name: "소",
    topCategory: "animal",
    subCategory: "land_animal",
    svgKey: "cow",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "음메~! 들판에서 소가 풀을 냠냠 먹고 있어요.",
    variants: [
      {
        id: "whiteBlack",
        primary: "#FAFAFA",
        secondary: "#EEEEEE",
        accent: "#424242",
        pattern: "patches",
      },
      {
        id: "whiteBrown",
        primary: "#FFF8E1",
        secondary: "#EFEBE9",
        accent: "#6D4C41",
        pattern: "patches",
      },
      {
        id: "creamBrown",
        primary: "#FFE0B2",
        secondary: "#FFF3E0",
        accent: "#8D6E63",
        pattern: "patches",
      },
      {
        id: "grayBlack",
        primary: "#CFD8DC",
        secondary: "#ECEFF1",
        accent: "#37474F",
        pattern: "patches",
      },
      {
        id: "pinkBrown",
        primary: "#F8BBD0",
        secondary: "#FCE4EC",
        accent: "#6D4C41",
        pattern: "patches",
      },
      {
        id: "goldenBrown",
        primary: "#FFE082",
        secondary: "#FFF8E1",
        accent: "#795548",
        pattern: "patches",
      },
    ],
  },
  {
    id: "dog",
    name: "개",
    topCategory: "animal",
    subCategory: "land_animal",
    svgKey: "dog",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "멍멍! 꼬리를 살랑살랑 흔드는 강아지가 왔어요.",
    variants: [
      {
        id: "white",

        primary: "#FAFAFA",
        secondary: "#EEEEEE",
        accent: "#5D4037",
      },
      {
        id: "brown",

        primary: "#D4A574",
        secondary: "#B8956A",
        accent: "#5C4033",
      },
      {
        id: "black",

        primary: "#424242",
        secondary: "#212121",
        accent: "#FAFAFA",
      },
      {
        id: "golden",

        primary: "#FFD54F",
        secondary: "#FFC107",
        accent: "#5C4033",
      },
      {
        id: "spotted",

        primary: "#FAFAFA",
        secondary: "#424242",
        accent: "#5D4037",
        pattern: "spots",
      },
      {
        id: "gray",

        primary: "#BDBDBD",
        secondary: "#9E9E9E",
        accent: "#424242",
      },
    ],
  },
  {
    id: "cat",
    name: "고양이",
    topCategory: "animal",
    subCategory: "land_animal",
    svgKey: "cat",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description:
      "야옹! 귀여운 고양이가 살금살금 다가왔어요. 어디로 가고 있을까요?",
    variants: [
      {
        id: "orange",

        primary: "#FFB74D",
        secondary: "#FFA726",
        accent: "#5C4033",
      },
      {
        id: "gray",

        primary: "#BDBDBD",
        secondary: "#9E9E9E",
        accent: "#424242",
      },
      {
        id: "black",

        primary: "#424242",
        secondary: "#212121",
        accent: "#FAFAFA",
      },
      {
        id: "white",

        primary: "#FAFAFA",
        secondary: "#EEEEEE",
        accent: "#5D4037",
      },
      {
        id: "calico",

        primary: "#FAFAFA",
        secondary: "#FFB74D",
        accent: "#424242",
        pattern: "patches",
      },
      {
        id: "tabby",

        primary: "#D4A574",
        secondary: "#8D6E63",
        accent: "#5C4033",
        pattern: "stripes",
      },
    ],
  },
  {
    id: "rabbit",
    name: "토끼",
    topCategory: "animal",
    subCategory: "land_animal",
    svgKey: "rabbit",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "깡충깡충! 귀여운 토끼가 폴짝 뛰어왔어요.",
    variants: [
      {
        id: "white",
        primary: "#FAFAFA",
        secondary: "#F8BBD0",
        accent: "#F48FB1",
      },
      {
        id: "brown",
        primary: "#D4A574",
        secondary: "#B8956A",
        accent: "#5C4033",
      },
      {
        id: "gray",
        primary: "#BDBDBD",
        secondary: "#9E9E9E",
        accent: "#424242",
      },
      {
        id: "black",
        primary: "#424242",
        secondary: "#212121",
        accent: "#F48FB1",
      },
      {
        id: "pink",
        primary: "#F8BBD0",
        secondary: "#F48FB1",
        accent: "#C2185B",
      },
      {
        id: "cream",
        primary: "#FFF3E0",
        secondary: "#FFE0B2",
        accent: "#FF8A65",
      },
    ],
  },

  // ========== 동물 - 새 ==========
  {
    id: "owl",
    name: "부엉이",
    topCategory: "animal",
    subCategory: "bird",
    svgKey: "owl",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "부엉! 밤이 되면 부엉이가 두 눈을 동그랗게 뜨고 날아와요.",
    variants: [
      {
        id: "brown",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#4E342E",
      },
      {
        id: "gray",
        primary: "#90A4AE",
        secondary: "#CFD8DC",
        accent: "#455A64",
      },
      {
        id: "golden",
        primary: "#BCAAA4",
        secondary: "#FFE0B2",
        accent: "#6D4C41",
      },
      {
        id: "cream",
        primary: "#D7CCC8",
        secondary: "#FFF8E1",
        accent: "#795548",
      },
      {
        id: "redBrown",
        primary: "#A1887F",
        secondary: "#FFCCBC",
        accent: "#5D4037",
      },
      {
        id: "purple",
        primary: "#9575CD",
        secondary: "#D1C4E9",
        accent: "#512DA8",
      },
    ],
  },
  {
    id: "parrot",
    name: "앵무새",
    topCategory: "animal",
    subCategory: "bird",
    svgKey: "parrot",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description:
      "안녕! 알록달록 앵무새가 말을 따라 할 것 같아요. 뭐라고 말해볼까요?",
    variants: [
      {
        id: "green",
        primary: "#66BB6A",
        secondary: "#FFEE58",
        accent: "#EF5350",
      },
      {
        id: "blue",
        primary: "#42A5F5",
        secondary: "#AB47BC",
        accent: "#FFEE58",
      },
      {
        id: "red",
        primary: "#EF5350",
        secondary: "#FFEE58",
        accent: "#42A5F5",
      },
      {
        id: "yellow",
        primary: "#FFEE58",
        secondary: "#66BB6A",
        accent: "#EF5350",
      },
      {
        id: "orange",
        primary: "#FFA726",
        secondary: "#42A5F5",
        accent: "#AB47BC",
      },
      {
        id: "purple",
        primary: "#AB47BC",
        secondary: "#66BB6A",
        accent: "#FFEE58",
      },
    ],
  },
  {
    id: "chicken",
    name: "닭",
    topCategory: "animal",
    subCategory: "bird",
    svgKey: "chicken",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "꼬꼬댁! 마당에서 닭이 종종종 걸어가요.",
    variants: [
      {
        id: "white",
        primary: "#FAFAFA",
        secondary: "#EEEEEE",
        accent: "#E53935",
      },
      {
        id: "brown",
        primary: "#D4A574",
        secondary: "#B8956A",
        accent: "#E53935",
      },
      {
        id: "black",
        primary: "#424242",
        secondary: "#212121",
        accent: "#E53935",
      },
      {
        id: "yellow",
        primary: "#FFEE58",
        secondary: "#FDD835",
        accent: "#E53935",
      },
      {
        id: "orange",
        primary: "#FFB74D",
        secondary: "#FFA726",
        accent: "#E53935",
      },
      {
        id: "spotted",
        primary: "#FAFAFA",
        secondary: "#D4A574",
        accent: "#E53935",
        pattern: "spots",
      },
    ],
  },
  {
    id: "duck",
    name: "오리",
    topCategory: "animal",
    subCategory: "bird",
    svgKey: "duck",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "꽥꽥! 오리가 물 위에서 둥실둥실 떠 있어요.",
    variants: [
      {
        id: "yellow",
        primary: "#FFEE58",
        secondary: "#FDD835",
        accent: "#FF9800",
      },
      {
        id: "white",
        primary: "#FAFAFA",
        secondary: "#EEEEEE",
        accent: "#FF9800",
      },
      {
        id: "brown",
        primary: "#D4A574",
        secondary: "#B8956A",
        accent: "#FF9800",
      },
      {
        id: "green",
        primary: "#81C784",
        secondary: "#66BB6A",
        accent: "#FF9800",
      },
      {
        id: "blue",
        primary: "#64B5F6",
        secondary: "#42A5F5",
        accent: "#FF9800",
      },
      {
        id: "pink",
        primary: "#F48FB1",
        secondary: "#EC407A",
        accent: "#FF9800",
      },
    ],
  },
  {
    id: "penguin",
    name: "펭귄",
    topCategory: "animal",
    subCategory: "bird",
    svgKey: "penguin",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "뒤뚱뒤뚱! 귀여운 펭귄이 바닷가를 걸어가요.",
    variants: [
      {
        id: "classic",
        primary: "#37474F",
        secondary: "#FAFAFA",
        accent: "#FF9800",
      },
      {
        id: "gray",
        primary: "#78909C",
        secondary: "#ECEFF1",
        accent: "#FF9800",
      },
      {
        id: "blue",
        primary: "#546E7A",
        secondary: "#E3F2FD",
        accent: "#FF9800",
      },
      {
        id: "black",
        primary: "#212121",
        secondary: "#FAFAFA",
        accent: "#FF9800",
      },
      {
        id: "navy",
        primary: "#283593",
        secondary: "#E8EAF6",
        accent: "#FF9800",
      },
      {
        id: "teal",
        primary: "#00695C",
        secondary: "#E0F2F1",
        accent: "#FF9800",
      },
    ],
  },

  // ========== 동물 - 바다 ==========
  {
    id: "jellyfish",
    name: "해파리",
    topCategory: "animal",
    subCategory: "sea_animal",
    svgKey: "jellyfish",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "둥실둥실 해파리가 바닷속을 떠다녀요. 말랑말랑해 보여요!",
    variants: [
      {
        id: "pink",
        primary: "#F48FB1",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },
      {
        id: "blue",
        primary: "#64B5F6",
        secondary: "#E3F2FD",
        accent: "#1976D2",
      },
      {
        id: "purple",
        primary: "#BA68C8",
        secondary: "#F3E5F5",
        accent: "#7B1FA2",
      },
      {
        id: "cyan",
        primary: "#4DD0E1",
        secondary: "#E0F7FA",
        accent: "#00838F",
      },
      {
        id: "orange",
        primary: "#FFB74D",
        secondary: "#FFF3E0",
        accent: "#EF6C00",
      },
      {
        id: "green",
        primary: "#81C784",
        secondary: "#E8F5E9",
        accent: "#388E3C",
      },
    ],
  },
  {
    id: "stingray",
    name: "가오리",
    topCategory: "animal",
    subCategory: "sea_animal",
    svgKey: "stingray",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "넓적넓적 가오리가 바닷속을 슝슝 헤엄쳐요!",
    variants: [
      {
        id: "navy",
        primary: "#5C6BC0",
        secondary: "#9FA8DA",
        accent: "#1A237E",
      },
      {
        id: "black",
        primary: "#455A64",
        secondary: "#90A4AE",
        accent: "#212121",
      },
      {
        id: "yellow",
        primary: "#FBC02D",
        secondary: "#FFF59D",
        accent: "#F57F17",
      },
      {
        id: "teal",
        primary: "#26A69A",
        secondary: "#80CBC4",
        accent: "#004D40",
      },
      {
        id: "pink",
        primary: "#F48FB1",
        secondary: "#F8BBD0",
        accent: "#AD1457",
      },
      {
        id: "purple",
        primary: "#AB47BC",
        secondary: "#E1BEE7",
        accent: "#4A148C",
      },
    ],
  },

  {
    id: "crab",
    name: "꽃게",
    topCategory: "animal",
    subCategory: "sea_animal",
    svgKey: "crab",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "옆으로 뒤뚱뒤뚱! 게가 옆으로 걸어가고 있어요.",
    variants: [
      {
        id: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
      {
        id: "orange",
        primary: "#FF7043",
        secondary: "#FFCCBC",
        accent: "#D84315",
      },
      {
        id: "blue",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#1565C0",
      },
      {
        id: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        id: "purple",
        primary: "#AB47BC",
        secondary: "#E1BEE7",
        accent: "#6A1B9A",
      },
      {
        id: "pink",
        primary: "#EC407A",
        secondary: "#F8BBD0",
        accent: "#AD1457",
      },
    ],
  },

  {
    id: "whale",
    name: "고래",
    topCategory: "animal",
    subCategory: "sea_animal",
    svgKey: "whale",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "푸우우! 아주아주 큰 고래가 바닷속에서 나타났어요.",
    variants: [
      {
        id: "blue",
        primary: "#42A5F5",
        secondary: "#90CAF9",
        accent: "#1565C0",
      },
      {
        id: "gray",
        primary: "#90A4AE",
        secondary: "#CFD8DC",
        accent: "#455A64",
      },
      {
        id: "navy",
        primary: "#5C6BC0",
        secondary: "#9FA8DA",
        accent: "#283593",
      },
      {
        id: "teal",
        primary: "#26A69A",
        secondary: "#80CBC4",
        accent: "#00695C",
      },
      {
        id: "sky",
        primary: "#4FC3F7",
        secondary: "#B3E5FC",
        accent: "#0277BD",
      },
      {
        id: "purple",
        primary: "#7E57C2",
        secondary: "#B39DDB",
        accent: "#4527A0",
      },
    ],
  },
  {
    id: "shark",
    name: "상어",
    topCategory: "animal",
    subCategory: "sea_animal",
    svgKey: "shark",
    shapes: ["triangle"], // TODO: shapesPool 연결 단계에서 채움
    description: "슝! 바닷속을 빠르게 헤엄치는 상어가 지나가요.",
    variants: [
      {
        id: "gray",
        primary: "#90A4AE",
        secondary: "#78909C",
        accent: "#37474F",
      },
      {
        id: "blue",
        primary: "#42A5F5",
        secondary: "#1E88E5",
        accent: "#0D47A1",
      },
      {
        id: "navy",
        primary: "#5C6BC0",
        secondary: "#3F51B5",
        accent: "#1A237E",
      },
      {
        id: "teal",
        primary: "#26A69A",
        secondary: "#00897B",
        accent: "#004D40",
      },
      {
        id: "dark",
        primary: "#546E7A",
        secondary: "#37474F",
        accent: "#263238",
      },
      {
        id: "sky",
        primary: "#4FC3F7",
        secondary: "#29B6F6",
        accent: "#0277BD",
      },
    ],
  },
  {
    id: "octopus",
    name: "문어",
    topCategory: "animal",
    subCategory: "sea_animal",
    svgKey: "octopus",
    shapes: ["circle"], // TODO: shapesPool 연결 단계에서 채움
    description: "팔랑팔랑! 문어의 다리는 모두 몇 개일까요?",
    variants: [
      {
        id: "purple",
        primary: "#AB47BC",
        secondary: "#CE93D8",
        accent: "#6A1B9A",
      },
      {
        id: "red",
        primary: "#EF5350",
        secondary: "#EF9A9A",
        accent: "#C62828",
      },
      {
        id: "orange",
        primary: "#FF7043",
        secondary: "#FFAB91",
        accent: "#D84315",
      },
      {
        id: "pink",
        primary: "#EC407A",
        secondary: "#F48FB1",
        accent: "#AD1457",
      },
      {
        id: "blue",
        primary: "#5C6BC0",
        secondary: "#9FA8DA",
        accent: "#283593",
      },
      {
        id: "teal",
        primary: "#26A69A",
        secondary: "#80CBC4",
        accent: "#00695C",
      },
    ],
  },
  {
    id: "squid",
    name: "오징어",
    topCategory: "animal",
    subCategory: "sea_animal",
    svgKey: "squid",
    shapes: ["triangle"], // TODO: shapesPool 연결 단계에서 채움
    description: "오징어가 물속을 쏙쏙 헤엄쳐요. 어디로 가고 있을까요?",
    variants: [
      {
        id: "brown",
        primary: "#8D6E63",
        secondary: "#BCAAA4",
        accent: "#4E342E",
      },
      {
        id: "coral",
        primary: "#FF7043",
        secondary: "#FFAB91",
        accent: "#D84315",
      },
      {
        id: "emerald",
        primary: "#4DB6AC",
        secondary: "#B2DFDB",
        accent: "#00695C",
      },
      {
        id: "purple",
        primary: "#AB47BC",
        secondary: "#E1BEE7",
        accent: "#6A1B9A",
      },
      {
        id: "pink",
        primary: "#F48FB1",
        secondary: "#F8BBD0",
        accent: "#AD1457",
      },
      {
        id: "yellow",
        primary: "#FFCA28",
        secondary: "#FFE082",
        accent: "#F57F17",
      },
    ],
  },

  // ========== 과일 ==========
  {
    id: "grape",
    name: "포도",
    topCategory: "food",
    subCategory: "fruit",
    svgKey: "grape",
    shapes: ["circle"], // TODO: shapesPool 연결 단계에서 채움
    description: "포도알이 주렁주렁! 한 알 톡 따서 먹어볼까요?",
    variants: [
      {
        id: "purple",
        primary: "#7E57C2",
        secondary: "#D1C4E9",
        accent: "#512DA8",
      },
      {
        id: "green",
        primary: "#9CCC65",
        secondary: "#DCEDC8",
        accent: "#558B2F",
      },
      {
        id: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
      {
        id: "pink",
        primary: "#EC407A",
        secondary: "#F8BBD0",
        accent: "#AD1457",
      },
      {
        id: "darkPurple",
        primary: "#5E35B1",
        secondary: "#B39DDB",
        accent: "#311B92",
      },
      {
        id: "yellowGreen",
        primary: "#C0CA33",
        secondary: "#F0F4C3",
        accent: "#827717",
      },
    ],
  },
  {
    id: "tangerine",
    name: "귤",
    topCategory: "food",
    subCategory: "fruit",
    svgKey: "tangerine",
    shapes: ["circle"], // TODO: shapesPool 연결 단계에서 채움
    description: "새콤달콤 귤이에요! 껍질을 까면 향긋한 냄새가 솔솔 나요.",
    variants: [
      {
        id: "orange",
        primary: "#FF9800",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        id: "deepOrange",
        primary: "#F57C00",
        secondary: "#FFE0B2",
        accent: "#E65100",
      },
      {
        id: "yellow",
        primary: "#FFCA28",
        secondary: "#FFF9C4",
        accent: "#F9A825",
      },
      {
        id: "lightOrange",
        primary: "#FFB74D",
        secondary: "#FFF3E0",
        accent: "#EF6C00",
      },
      {
        id: "redOrange",
        primary: "#FF7043",
        secondary: "#FFCCBC",
        accent: "#D84315",
      },
      {
        id: "green",
        primary: "#9CCC65",
        secondary: "#DCEDC8",
        accent: "#558B2F",
      },
    ],
  },
  {
    id: "peach",
    name: "복숭아",
    topCategory: "food",
    subCategory: "fruit",
    svgKey: "peach",
    shapes: ["heart"], // TODO: shapesPool 연결 단계에서 채움
    description: "보들보들 달콤한 복숭아예요! 한 입 베어 물어볼까요?",
    variants: [
      {
        id: "pink",
        primary: "#FFAB91",
        secondary: "#FBE9E7",
        accent: "#E64A19",
      },
      {
        id: "peach",
        primary: "#FFCC80",
        secondary: "#FFF3E0",
        accent: "#EF6C00",
      },
      {
        id: "coral",
        primary: "#FF8A65",
        secondary: "#FFCCBC",
        accent: "#D84315",
      },
      {
        id: "yellow",
        primary: "#FFD54F",
        secondary: "#FFF9C4",
        accent: "#F9A825",
      },
      {
        id: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
      {
        id: "white",
        primary: "#F8BBD0",
        secondary: "#FFF0F5",
        accent: "#AD1457",
      },
    ],
  },
  {
    id: "apple",
    name: "사과",
    topCategory: "food",
    subCategory: "fruit",
    svgKey: "apple",
    shapes: ["circle"], // TODO: shapesPool 연결 단계에서 채움
    description: "아삭아삭 맛있는 사과예요! 한 입 베어 물면 어떤 맛일까요?",
    variants: [
      {
        id: "red",
        primary: "#E53935",
        secondary: "#EF5350",
        accent: "#2E7D32",
      },
      {
        id: "green",
        primary: "#43A047",
        secondary: "#66BB6A",
        accent: "#1B5E20",
      },
      {
        id: "yellow",
        primary: "#FDD835",
        secondary: "#FFEE58",
        accent: "#2E7D32",
      },
      {
        id: "pink",
        primary: "#EC407A",
        secondary: "#F48FB1",
        accent: "#2E7D32",
      },
      {
        id: "orange",
        primary: "#FB8C00",
        secondary: "#FFB74D",
        accent: "#2E7D32",
      },
      {
        id: "striped",
        primary: "#E53935",
        secondary: "#FDD835",
        accent: "#2E7D32",
        pattern: "stripes",
      },
    ],
  },
  {
    id: "banana",
    name: "바나나",
    topCategory: "food",
    subCategory: "fruit",
    svgKey: "banana",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "길쭉길쭉 달콤한 바나나예요! 껍질을 쏙 벗겨 먹어볼까요?",
    variants: [
      {
        id: "yellow",
        primary: "#FDD835",
        secondary: "#FFEE58",
        accent: "#5D4037",
      },
      {
        id: "green",
        primary: "#9CCC65",
        secondary: "#AED581",
        accent: "#5D4037",
      },
      {
        id: "gold",
        primary: "#FFB300",
        secondary: "#FFC107",
        accent: "#5D4037",
      },
      {
        id: "cream",
        primary: "#FFF59D",
        secondary: "#FFF9C4",
        accent: "#5D4037",
      },
      {
        id: "orange",
        primary: "#FFA726",
        secondary: "#FFB74D",
        accent: "#5D4037",
      },
      {
        id: "lime",
        primary: "#DCE775",
        secondary: "#D4E157",
        accent: "#5D4037",
      },
    ],
  },
  {
    id: "strawberry",
    name: "딸기",
    topCategory: "food",
    subCategory: "fruit",
    svgKey: "strawberry",
    shapes: ["triangle"], // TODO: shapesPool 연결 단계에서 채움
    description: "새콤달콤 딸기가 톡! 작은 씨앗이 콕콕 박혀 있어요.",
    variants: [
      {
        id: "red",
        primary: "#E53935",
        secondary: "#EF5350",
        accent: "#43A047",
      },
      {
        id: "pink",
        primary: "#EC407A",
        secondary: "#F48FB1",
        accent: "#43A047",
      },
      {
        id: "deep_red",
        primary: "#C62828",
        secondary: "#E53935",
        accent: "#2E7D32",
      },
      {
        id: "coral",
        primary: "#FF7043",
        secondary: "#FF8A65",
        accent: "#43A047",
      },
      {
        id: "rose",
        primary: "#F06292",
        secondary: "#F48FB1",
        accent: "#43A047",
      },
      {
        id: "berry",
        primary: "#AD1457",
        secondary: "#D81B60",
        accent: "#2E7D32",
      },
    ],
  },
  {
    id: "watermelon",
    name: "수박",
    topCategory: "food",
    subCategory: "fruit",
    svgKey: "watermelon",
    shapes: ["triangle"], // TODO: shapesPool 연결 단계에서 채움
    description: "아삭아삭 시원한 수박이에요! 한 조각 먹어볼까요?",
    variants: [
      {
        id: "classic",
        primary: "#43A047",
        secondary: "#E53935",
        accent: "#1B5E20",
      },
      {
        id: "light",
        primary: "#66BB6A",
        secondary: "#EF5350",
        accent: "#2E7D32",
      },
      {
        id: "dark",
        primary: "#2E7D32",
        secondary: "#C62828",
        accent: "#1B5E20",
      },
      {
        id: "yellow_melon",
        primary: "#9CCC65",
        secondary: "#FDD835",
        accent: "#558B2F",
      },
      {
        id: "mint",
        primary: "#26A69A",
        secondary: "#EF5350",
        accent: "#00695C",
      },
      {
        id: "deep",
        primary: "#1B5E20",
        secondary: "#B71C1C",
        accent: "#33691E",
      },
    ],
  },

  // ========== 채소 ==========
  {
    id: "eggplant",
    name: "가지",
    topCategory: "food",
    subCategory: "vegetable",
    svgKey: "eggplant",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "길쭉한 가지가 쑥쑥 자랐어요! 어떤 요리를 만들어볼까요?",
    variants: [
      {
        id: "purple",
        primary: "#7E57C2",
        secondary: "#D1C4E9",
        accent: "#512DA8",
      },
      {
        id: "darkPurple",
        primary: "#5E35B1",
        secondary: "#B39DDB",
        accent: "#311B92",
      },
      {
        id: "lightPurple",
        primary: "#9575CD",
        secondary: "#D1C4E9",
        accent: "#4527A0",
      },
      {
        id: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        id: "white",
        primary: "#EEEEEE",
        secondary: "#FAFAFA",
        accent: "#616161",
      },
      {
        id: "striped",
        primary: "#AB47BC",
        secondary: "#E1BEE7",
        accent: "#6A1B9A",
        pattern: "stripes",
      },
    ],
  },
  {
    id: "chili",
    name: "고추",
    topCategory: "food",
    subCategory: "vegetable",
    svgKey: "chili",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "길쭉한 고추가 매콤매콤! 먹을 때는 조심조심해야 해요.",
    variants: [
      {
        id: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
      {
        id: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        id: "orange",
        primary: "#FF7043",
        secondary: "#FFCCBC",
        accent: "#D84315",
      },
      {
        id: "yellow",
        primary: "#FFEE58",
        secondary: "#FFF9C4",
        accent: "#F9A825",
      },
      {
        id: "darkGreen",
        primary: "#43A047",
        secondary: "#C8E6C9",
        accent: "#1B5E20",
      },
      {
        id: "purple",
        primary: "#AB47BC",
        secondary: "#E1BEE7",
        accent: "#6A1B9A",
      },
    ],
  },
  {
    id: "pumpkin",
    name: "호박",
    topCategory: "food",
    subCategory: "vegetable",
    svgKey: "pumpkin",
    shapes: ["circle"], // TODO: shapesPool 연결 단계에서 채움
    description: "동글동글 커다란 호박이에요! 데굴데굴 굴러갈 것 같아요.",
    variants: [
      {
        id: "orange",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        id: "deepOrange",
        primary: "#F57C00",
        secondary: "#FFE0B2",
        accent: "#E65100",
      },
      {
        id: "yellow",
        primary: "#FFCA28",
        secondary: "#FFF9C4",
        accent: "#F9A825",
      },
      {
        id: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        id: "lightGreen",
        primary: "#9CCC65",
        secondary: "#DCEDC8",
        accent: "#558B2F",
      },
      {
        id: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
    ],
  },
  {
    id: "carrot",
    name: "당근",
    topCategory: "food",
    subCategory: "vegetable",
    svgKey: "carrot",
    shapes: ["triangle"], // TODO: shapesPool 연결 단계에서 채움
    description: "쑥쑥 자란 주황색 당근이에요! 토끼가 좋아하는 채소랍니다.",
    variants: [
      {
        id: "orange",
        primary: "#FB8C00",
        secondary: "#FFA726",
        accent: "#558B2F",
      },
      {
        id: "deep",
        primary: "#EF6C00",
        secondary: "#FB8C00",
        accent: "#33691E",
      },
      {
        id: "light",
        primary: "#FFB74D",
        secondary: "#FFCC80",
        accent: "#7CB342",
      },
      {
        id: "gold",
        primary: "#FFA000",
        secondary: "#FFB300",
        accent: "#558B2F",
      },
      {
        id: "coral",
        primary: "#FF7043",
        secondary: "#FF8A65",
        accent: "#558B2F",
      },
      {
        id: "amber",
        primary: "#FF8F00",
        secondary: "#FFA000",
        accent: "#33691E",
      },
    ],
  },
  {
    id: "cucumber",
    name: "오이",
    topCategory: "food",
    subCategory: "vegetable",
    svgKey: "cucumber",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "아삭아삭 오이가 길쭉하게 자랐어요! 냠냠 맛있겠죠?",
    variants: [
      {
        id: "green",
        primary: "#66BB6A",
        secondary: "#43A047",
        accent: "#2E7D32",
      },
      {
        id: "light",
        primary: "#81C784",
        secondary: "#66BB6A",
        accent: "#43A047",
      },
      {
        id: "dark",
        primary: "#2E7D32",
        secondary: "#1B5E20",
        accent: "#33691E",
      },
      {
        id: "lime",
        primary: "#9CCC65",
        secondary: "#8BC34A",
        accent: "#558B2F",
      },
      {
        id: "mint",
        primary: "#26A69A",
        secondary: "#00897B",
        accent: "#00695C",
      },
      {
        id: "olive",
        primary: "#9E9D24",
        secondary: "#AFB42B",
        accent: "#827717",
      },
    ],
  },
  {
    id: "tomato",
    name: "토마토",
    topCategory: "food",
    subCategory: "vegetable",
    svgKey: "tomato",
    shapes: ["circle"], // TODO: shapesPool 연결 단계에서 채움
    description: "동글동글 토마토가 데굴데굴 굴러가요!",
    variants: [
      {
        id: "red",
        primary: "#E53935",
        secondary: "#EF5350",
        accent: "#558B2F",
      },
      {
        id: "deep",
        primary: "#C62828",
        secondary: "#E53935",
        accent: "#33691E",
      },
      {
        id: "orange",
        primary: "#FB8C00",
        secondary: "#FFA726",
        accent: "#558B2F",
      },
      {
        id: "yellow",
        primary: "#FDD835",
        secondary: "#FFEE58",
        accent: "#558B2F",
      },
      {
        id: "pink",
        primary: "#EC407A",
        secondary: "#F48FB1",
        accent: "#558B2F",
      },
      {
        id: "coral",
        primary: "#FF7043",
        secondary: "#FF8A65",
        accent: "#558B2F",
      },
    ],
  },
  // 🍄 1. 버섯 (Mushroom)
  {
    id: "mushroom",
    name: "버섯",
    topCategory: "food",
    subCategory: "vegetable",
    svgKey: "mushroom",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "숲속에서 버섯이 쏙! 어디에 숨어 있었을까요?",
    variants: [
      {
        id: "redFlyAgaric",
        primary: "#EF5350",
        secondary: "#FFFFFF",
        accent: "#D7CCC8",
      },
      {
        id: "brownShiitake",
        primary: "#8D6E63",
        secondary: "#E0D7D5",
        accent: "#BCAAA4",
      },
      {
        id: "whiteButton",
        primary: "#F5F5F5",
        secondary: "#FFFFFF",
        accent: "#D7CCC8",
      },
      {
        id: "goldenEnoki",
        primary: "#FFCA28",
        secondary: "#FFF9C4",
        accent: "#D7CCC8",
      },
      {
        id: "purplePoison",
        primary: "#AB47BC",
        secondary: "#F3E5F5",
        accent: "#CE93D8",
      },
      {
        id: "chantarelle",
        primary: "#FF9800",
        secondary: "#FFE0B2",
        accent: "#D7CCC8",
      },
    ],
  },

  // 🥦 2. 브로콜리 (Broccoli)
  {
    id: "broccoli",
    name: "브로콜리",
    topCategory: "food",
    subCategory: "vegetable",
    svgKey: "broccoli",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "초록초록 브로콜리가 방긋! 작은 나무처럼 생겼어요.",
    variants: [
      {
        id: "freshGreen",
        primary: "#43A047",
        secondary: "#A5D6A7",
        accent: "#81C784",
      },
      {
        id: "darkGreen",
        primary: "#2E7D32",
        secondary: "#81C784",
        accent: "#66BB6A",
      },
      {
        id: "lightGreen",
        primary: "#7CB342",
        secondary: "#C5E1A5",
        accent: "#AED581",
      },
      {
        id: "purpleBroccoli",
        primary: "#7E57C2",
        secondary: "#D1C4E9",
        accent: "#9FA8DA",
      },
      {
        id: "cauliflower",
        primary: "#F5F5F5",
        secondary: "#FFFFFF",
        accent: "#C8E6C9",
      },
      {
        id: "yellowBroccoli",
        primary: "#FBC02D",
        secondary: "#FFF59D",
        accent: "#AED581",
      },
    ],
  },

  // 🌽 3. 옥수수 (Corn)
  {
    id: "corn",
    name: "옥수수",
    topCategory: "food",
    subCategory: "vegetable",
    svgKey: "corn",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "톡톡 알알이 옥수수예요! 노란 옥수수를 한 알씩 세어볼까요?",
    variants: [
      {
        id: "yellowSweet",
        primary: "#FFEE58",
        secondary: "#FBC02D",
        accent: "#7CB342",
      },
      {
        id: "whiteSticky",
        primary: "#FFFDE7",
        secondary: "#FFF59D",
        accent: "#81C784",
      },
      {
        id: "roastedOrange",
        primary: "#FFA726",
        secondary: "#F57C00",
        accent: "#689F38",
      },
      {
        id: "purpleSticky",
        primary: "#5E35B1",
        secondary: "#311B92",
        accent: "#558B2F",
      },
      {
        id: "bicolorMix",
        primary: "#FFD54F",
        secondary: "#FFF8E1",
        accent: "#7CB342",
      },
      {
        id: "redFlint",
        primary: "#E53935",
        secondary: "#B71C1C",
        accent: "#558B2F",
      },
    ],
  },

  // ========== 음식 ==========
  {
    id: "soup",
    name: "국/스프",
    topCategory: "food",
    subCategory: "meal",
    svgKey: "soup",
    shapes: ["circle"], // TODO: shapesPool 연결 단계에서 채움
    description: "보글보글 따끈한 수프예요! 후후 불어서 먹어볼까요?",
    variants: [
      {
        id: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
      {
        id: "orange",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        id: "yellow",
        primary: "#FFEE58",
        secondary: "#FFF9C4",
        accent: "#F9A825",
      },
      {
        id: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        id: "blue",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#1565C0",
      },
      {
        id: "purple",
        primary: "#AB47BC",
        secondary: "#E1BEE7",
        accent: "#6A1B9A",
      },
    ],
  },
  {
    id: "sandwich",
    name: "샌드위치",
    topCategory: "food",
    subCategory: "meal",
    svgKey: "sandwich",
    shapes: ["triangle"], // TODO: shapesPool 연결 단계에서 채움
    description: "빵 사이에 맛있는 재료가 쏙쏙! 샌드위치가 완성됐어요.",
    variants: [
      {
        id: "classic",
        primary: "#FFCC80",
        secondary: "#FFF3E0",
        accent: "#66BB6A",
      },
      {
        id: "ham",
        primary: "#FFAB91",
        secondary: "#FBE9E7",
        accent: "#66BB6A",
      },
      {
        id: "cheese",
        primary: "#FFEE58",
        secondary: "#FFF9C4",
        accent: "#EF5350",
      },
      {
        id: "lettuce",
        primary: "#81C784",
        secondary: "#E8F5E9",
        accent: "#FFCC80",
      },
      {
        id: "tomato",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#66BB6A",
      },
      {
        id: "purple",
        primary: "#AB47BC",
        secondary: "#E1BEE7",
        accent: "#FFEE58",
      },
    ],
  },
  {
    id: "dumpling",
    name: "만두",
    topCategory: "food",
    subCategory: "meal",
    svgKey: "dumpling",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "포동포동 만두가 한입에 쏙! 어떤 맛일까요?",
    variants: [
      {
        id: "cream",
        primary: "#FFF3E0",
        secondary: "#FFF8E1",
        accent: "#D7A86E",
      },
      {
        id: "white",
        primary: "#FAFAFA",
        secondary: "#F5F5F5",
        accent: "#BDBDBD",
      },
      {
        id: "yellow",
        primary: "#FFE082",
        secondary: "#FFF8E1",
        accent: "#F9A825",
      },
      {
        id: "green",
        primary: "#A5D6A7",
        secondary: "#E8F5E9",
        accent: "#388E3C",
      },
      {
        id: "pink",
        primary: "#F8BBD0",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },
      {
        id: "purple",
        primary: "#CE93D8",
        secondary: "#F3E5F5",
        accent: "#7B1FA2",
      },
    ],
  },
  {
    id: "rice",
    name: "밥",
    topCategory: "food",
    subCategory: "meal",
    svgKey: "rice",
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
    description: "따끈따끈 밥 한 그릇이에요! 김이 모락모락 나는 것 같아요.",
    variants: [
      {
        id: "classic",
        primary: "#FFF8E1",
        secondary: "#FFE0B2",
        accent: "#8D6E63",
      },
      {
        id: "brown",
        primary: "#D7CCC8",
        secondary: "#BCAAA4",
        accent: "#5D4037",
      },
      {
        id: "light",
        primary: "#FAFAFA",
        secondary: "#F5F5F5",
        accent: "#8D6E63",
      },
      {
        id: "cream",
        primary: "#FFF3E0",
        secondary: "#FFE0B2",
        accent: "#A1887F",
      },
      {
        id: "warm",
        primary: "#FFECB3",
        secondary: "#FFE082",
        accent: "#8D6E63",
      },
      {
        id: "soft",
        primary: "#F5F5F5",
        secondary: "#EEEEEE",
        accent: "#6D4C41",
      },
    ],
  },
  {
    id: "gimbap",
    name: "김밥",
    topCategory: "food",
    subCategory: "meal",
    svgKey: "gimbap",
    shapes: ["circle"], // TODO: shapesPool 연결 단계에서 채움
    description: "돌돌 말린 김밥이에요! 안에는 어떤 재료가 들어 있을까요?",
    variants: [
      {
        id: "classic",
        primary: "#37474F",
        secondary: "#FFF8E1",
        accent: "#E53935",
      },
      {
        id: "green",
        primary: "#2E7D32",
        secondary: "#FFF8E1",
        accent: "#FB8C00",
      },
      {
        id: "dark",
        primary: "#212121",
        secondary: "#FFFDE7",
        accent: "#43A047",
      },
      {
        id: "nori",
        primary: "#455A64",
        secondary: "#FFF8E1",
        accent: "#FF7043",
      },
      {
        id: "seaweed",
        primary: "#1B5E20",
        secondary: "#FFFDE7",
        accent: "#FDD835",
      },
      {
        id: "charcoal",
        primary: "#263238",
        secondary: "#FAFAFA",
        accent: "#EF5350",
      },
    ],
  },
  {
    id: "pizza",
    name: "피자",
    topCategory: "food",
    subCategory: "meal",
    svgKey: "pizza",
    shapes: ["triangle"], // TODO: shapesPool 연결 단계에서 채움
    description: "맛있는 피자가 짠! 한 조각 쏙 떼어 먹어볼까요?",
    variants: [
      {
        id: "classic",
        primary: "#FFCC80",
        secondary: "#E53935",
        accent: "#FDD835",
      },
      {
        id: "pepperoni",
        primary: "#FFB74D",
        secondary: "#C62828",
        accent: "#FFEE58",
      },
      {
        id: "cheese",
        primary: "#FFE082",
        secondary: "#FFA000",
        accent: "#FFF59D",
      },
      {
        id: "veggie",
        primary: "#FFCC80",
        secondary: "#43A047",
        accent: "#FDD835",
      },
      {
        id: "tomato",
        primary: "#FFAB91",
        secondary: "#E53935",
        accent: "#FFEE58",
      },
      {
        id: "golden",
        primary: "#FFD54F",
        secondary: "#EF6C00",
        accent: "#FFF59D",
      },
    ],
  },
  {
    id: "hamburger",
    name: "햄버거",
    topCategory: "food",
    subCategory: "meal",
    svgKey: "hamburger",
    shapes: ["circle"], // TODO: shapesPool 연결 단계에서 채움
    description: "빵 사이에 맛있는 재료가 차곡차곡! 햄버거가 완성됐어요.",
    variants: [
      {
        id: "classic",
        primary: "#D4A574",
        secondary: "#8D6E63",
        accent: "#66BB6A",
      },
      {
        id: "sesame",
        primary: "#E0B87A",
        secondary: "#A1887F",
        accent: "#81C784",
      },
      {
        id: "dark",
        primary: "#BCAAA4",
        secondary: "#6D4C41",
        accent: "#43A047",
      },
      {
        id: "golden",
        primary: "#FFB74D",
        secondary: "#8D6E63",
        accent: "#66BB6A",
      },
      {
        id: "light",
        primary: "#FFE0B2",
        secondary: "#A1887F",
        accent: "#A5D6A7",
      },
      {
        id: "toasted",
        primary: "#C4935A",
        secondary: "#5D4037",
        accent: "#66BB6A",
      },
    ],
  },
];

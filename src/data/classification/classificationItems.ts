import { ClassificationItem } from "../../types/game";

export const classificationItems: ClassificationItem[] = [
  {
    id: "wheel",
    name: "바퀴",
    topCategory: "living",
    subCategory: "daily",
    svgKey: "wheel",
    shapes: ["circle"],
    description: "데굴데굴 굴러가는 바퀴예요! 이 바퀴는 어디에 달려 있을까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#424242",
        secondary: "#E0E0E0",
        accent: "#212121",
      },
      {
        colorId: "red",
        primary: "#FF5252",
        secondary: "#EEEEEE",
        accent: "#B71C1C",
      },
      {
        colorId: "orange",
        primary: "#FF9800",
        secondary: "#FFE0B2",
        accent: "#E65100",
      },
      {
        colorId: "yellow",
        primary: "#FFD54F",
        secondary: "#FFF9C4",
        accent: "#F57F17",
      },
      {
        colorId: "green",
        primary: "#66BB6A",
        secondary: "#E8F5E9",
        accent: "#2E7D32",
      },
      {
        colorId: "blue",
        primary: "#448AFF",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },
      {
        colorId: "black",
        primary: "#212121",
        secondary: "#757575",
        accent: "#000000",
      },
      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#E0E0E0",
        accent: "#616161",
      },
      {
        colorId: "brown",
        primary: "#795548",
        secondary: "#D7CCC8",
        accent: "#4E342E",
      },
    ],
  },
  // ========== 탈것 ==========
  {
    id: "sparrow",
    name: "참새",
    topCategory: "animal",
    subCategory: "bird",
    svgKey: "sparrow",
    shapes: [],
    description: "짹짹! 작은 참새가 나뭇가지에 앉았어요. 어디로 날아가 볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#A1785C",
        secondary: "#F5EBE6",
        accent: "#E0986B",
      },
      {
        colorId: "brown",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#4E342E",
      },
    ],
  },
  {
    id: "boat",
    name: "보트",
    topCategory: "vehicle",
    subCategory: "water_vehicle",
    svgKey: "boat",
    shapes: [],
    description: "찰랑찰랑! 작은 배가 물 위에 둥실 떠 있어요.",
    variants: [
      {
        colorId: "natural",
        primary: "#5D4037",
        secondary: "#ECEFF1",
        accent: "#42A5F5", // 기본 유지
      },
      {
        colorId: "brown",
        primary: "#795548",
        secondary: "#EFEBE9",
        accent: "#4E342E", // 딥 브라운
      },
      {
        colorId: "red",
        primary: "#F44336",
        secondary: "#FFEBEE",
        accent: "#B71C1C", // 비비드 레드
      },
      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFF3E0",
        accent: "#EF6C00", // 선명한 오렌지
      },
      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFFDE7",
        accent: "#FBC02D", // 골드 옐로우
      },
      {
        colorId: "green",
        primary: "#4CAF50",
        secondary: "#E8F5E9",
        accent: "#2E7D32", // 포레스트 그린
      },
      {
        colorId: "blue",
        primary: "#2196F3",
        secondary: "#E3F2FD",
        accent: "#1565C0", // 로열 블루
      },
      {
        colorId: "purple",
        primary: "#9C27B0",
        secondary: "#F3E5F5",
        accent: "#6A1B9A", // 딥 퍼플
      },
      {
        colorId: "white",
        primary: "#FFFFFF",
        secondary: "#F5F5F5",
        accent: "#9E9E9E", // 그레이 포인트
      },
    ],
  },
  {
    id: "helicopter",
    name: "헬리콥터",
    topCategory: "vehicle",
    subCategory: "air_vehicle",
    svgKey: "helicopter",
    shapes: [],
    description: "위잉위잉! 헬리콥터가 하늘을 날아가요.",
    variants: [
      {
        colorId: "natural",
        primary: "#78909C",
        secondary: "#CFD8DC",
        accent: "#455A64",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
      {
        colorId: "orange",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        colorId: "yellow",
        primary: "#FFEE58",
        secondary: "#FFF9C4",
        accent: "#F9A825",
      },
      {
        colorId: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#1565C0",
      },
      {
        colorId: "purple",
        primary: "#AB47BC",
        secondary: "#E1BEE7",
        accent: "#6A1B9A",
      },
      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#ECEFF1",
        accent: "#607D8B",
      },
      {
        colorId: "black",
        primary: "#424242",
        secondary: "#757575",
        accent: "#212121",
      },
    ],
  },
  {
    id: "bicycle",
    name: "자전거",
    topCategory: "vehicle",
    subCategory: "road_vehicle",
    svgKey: "bicycle",
    shapes: ["circle"],
    description: "따르릉! 자전거를 타고 신나게 달려볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#455A64",
        secondary: "#CFD8DC",
        accent: "#263238",
      },
      {
        colorId: "brown",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#4E342E",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
      {
        colorId: "orange",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        colorId: "yellow",
        primary: "#FFEE58",
        secondary: "#FFF9C4",
        accent: "#F9A825",
      },
      {
        colorId: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#1565C0",
      },
      {
        colorId: "purple",
        primary: "#AB47BC",
        secondary: "#E1BEE7",
        accent: "#6A1B9A",
      },
      {
        colorId: "white",
        primary: "#FAFAFA", // 밝은 화이트
        secondary: "#ECEFF1", // 은은한 라이트 그레이
        accent: "#9E9E9E", // 미디엄 그레이 포인트
      },
      {
        colorId: "black",
        primary: "#424242",
        secondary: "#757575",
        accent: "#212121",
      },
    ],
  },
  {
    id: "ship",
    name: "배",
    topCategory: "vehicle",
    subCategory: "water_vehicle",
    svgKey: "ship",
    shapes: [],
    description: "출렁출렁! 커다란 배가 바다를 가로질러 떠나요.",
    variants: [
      {
        colorId: "natural",
        primary: "#FAFAFA",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },
      {
        colorId: "brown",
        primary: "#6D4C41",
        secondary: "#D7CCC8",
        accent: "#3E2723",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
      {
        colorId: "orange",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        colorId: "yellow",
        primary: "#FFEE58",
        secondary: "#FFF9C4",
        accent: "#F9A825",
      },
      {
        colorId: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#1565C0",
      },
      {
        colorId: "purple",
        primary: "#AB47BC",
        secondary: "#E1BEE7",
        accent: "#6A1B9A",
      },
      {
        colorId: "white",
        primary: "#FAFAFA", // 밝은 화이트
        secondary: "#F5F5F5", // 은은한 라이트 그레이
        accent: "#9E9E9E", // 중간 톤 그레이 포인트
      },
    ],
  },
  {
    id: "airplane",
    name: "비행기",
    topCategory: "vehicle",
    subCategory: "air_vehicle",
    svgKey: "airplane",
    shapes: [],
    description: "슈우웅! 비행기가 하늘 높이 날아올라요.",
    variants: [
      {
        colorId: "natural",
        primary: "#FAFAFA",
        secondary: "#E0E0E0",
        accent: "#42A5F5",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
      {
        colorId: "orange",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        colorId: "yellow",
        primary: "#FFEE58",
        secondary: "#FFF9C4",
        accent: "#F9A825",
      },
      {
        colorId: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#1565C0",
      },
      {
        colorId: "purple",
        primary: "#AB47BC",
        secondary: "#E1BEE7",
        accent: "#6A1B9A",
      },
      {
        colorId: "white",
        primary: "#FAFAFA", // 본체 화이트
        secondary: "#E0E0E0", // 라이트 그레이 음영
        accent: "#badbf6", // 은은한 라이트 블루 (창문)
      },
    ],
  },
  {
    id: "train",
    name: "기차",
    topCategory: "vehicle",
    subCategory: "rail_special",
    svgKey: "train",
    shapes: [],
    description: "칙칙폭폭! 기차가 힘차게 달려가요. 어디까지 갈까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#455A64", // 다크 그레이
        secondary: "#CFD8DC", // 파스텔 그레이
        accent: "#FFEB3B", // 노랑 포인트
      },
      {
        colorId: "brown",
        primary: "#795548", // 브라운
        secondary: "#D7CCC8", // 파스텔 브라운
        accent: "#FFEB3B", // 노랑 포인트
      },
      {
        colorId: "red",
        primary: "#E53935", // 비비드 레드
        secondary: "#FFCDD2", // 파스텔 레드
        accent: "#FFEB3B", // 노랑 포인트
      },
      {
        colorId: "orange",
        primary: "#FB8C00", // 비비드 오렌지
        secondary: "#FFE0B2", // 파스텔 오렌지
        accent: "#FFEB3B", // 노랑 포인트
      },
      {
        colorId: "yellow",
        primary: "#FDD835", // 비비드 옐로우
        secondary: "#FFF9C4", // 파스텔 옐로우
        accent: "#FFEB3B", // 노랑 포인트
      },
      {
        colorId: "green",
        primary: "#43A047", // 비비드 그린
        secondary: "#C8E6C9", // 파스텔 그린
        accent: "#FFEB3B", // 노랑 포인트
      },
      {
        colorId: "blue",
        primary: "#1E88E5", // 비비드 블루
        secondary: "#BBDEFB", // 파스텔 블루
        accent: "#FFEB3B", // 노랑 포인트
      },
      {
        colorId: "purple",
        primary: "#8E24AA", // 비비드 퍼플
        secondary: "#E1BEE7", // 파스텔 퍼플
        accent: "#FFEB3B", // 노랑 포인트
      },
      {
        colorId: "white",
        primary: "#FAFAFA", // 화이트
        secondary: "#F5F5F5", // 라이트 그레이
        accent: "#FFEB3B", // 노랑 포인트
      },
    ],
  },
  {
    id: "bus",
    name: "버스",
    topCategory: "vehicle",
    subCategory: "road_vehicle",
    svgKey: "bus",
    shapes: [],
    description: "빵빵! 커다란 버스가 사람들을 태우러 왔어요.",
    variants: [
      {
        colorId: "natural",
        primary: "#FDD835",
        secondary: "#FFEE58",
        accent: "#5D4037", // 기본 유지
      },
      {
        colorId: "brown",
        primary: "#795548",
        secondary: "#EFEBE9",
        accent: "#4E342E", // 딥 브라운
      },
      {
        colorId: "red",
        primary: "#F44336",
        secondary: "#FFEBEE",
        accent: "#B71C1C", // 비비드 레드
      },
      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFE0B2",
        accent: "#EF6C00", // 선명한 오렌지
      },
      {
        colorId: "green",
        primary: "#4CAF50",
        secondary: "#E8F5E9",
        accent: "#2E7D32", // 포레스트 그린
      },
      {
        colorId: "blue",
        primary: "#2196F3",
        secondary: "#BBDEFB",
        accent: "#64B5F6", // 하늘색 포인트
      },
      {
        colorId: "white",
        primary: "#FFFFFF",
        secondary: "#F5F5F5",
        accent: "#9E9E9E", // 그레이 포인트
      },
    ],
  },
  {
    id: "car",
    name: "승용차",
    topCategory: "vehicle",
    subCategory: "road_vehicle",
    svgKey: "car",
    shapes: [],
    description: "부릉부릉! 자동차가 신나게 출발해요. 어디로 가볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#FAFAFA",
        secondary: "#EEEEEE",
        accent: "#212121", // 기본 유지
      },
      {
        colorId: "brown",
        primary: "#795548",
        secondary: "#D7CCC8",
        accent: "#4E342E", // 딥 브라운
      },
      {
        colorId: "red",
        primary: "#F44336",
        secondary: "#FFEBEE",
        accent: "#B71C1C", // 비비드 레드
      },
      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFE0B2",
        accent: "#EF6C00", // 선명한 오렌지
      },
      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFEE58",
        accent: "#FBC02D", // 골드 옐로우
      },
      {
        colorId: "green",
        primary: "#4CAF50",
        secondary: "#81C784",
        accent: "#2E7D32", // 포레스트 그린
      },
      {
        colorId: "blue",
        primary: "#2196F3",
        secondary: "#64B5F6",
        accent: "#1565C0", // 로열 블루
      },
      {
        colorId: "purple",
        primary: "#9C27B0",
        secondary: "#BA68C8",
        accent: "#6A1B9A", // 딥 퍼플
      },
      {
        colorId: "black",
        primary: "#212121",
        secondary: "#616161",
        accent: "#000000", // 블랙 포인트
      },
      {
        colorId: "white",
        primary: "#FFFFFF",
        secondary: "#EEEEEE",
        accent: "#9E9E9E", // 그레이 포인트
      },
    ],
  },
  {
    id: "submarine",
    name: "잠수함",
    topCategory: "vehicle",
    subCategory: "water_vehicle",
    svgKey: "submarine",
    shapes: [],
    description: "슈우웅! 잠수함이 바닷속 깊은 곳으로 내려가요.",
    variants: [
      {
        colorId: "natural",
        primary: "#FDD835", // 비비드 옐로우
        secondary: "#FFF9C4", // 파스텔 옐로우
        accent: "#455A64", // 딥 그레이 포인트
      },
      {
        colorId: "red",
        primary: "#EF5350", // 비비드 레드
        secondary: "#FFCDD2", // 파스텔 레드
        accent: "#455A64", // 딥 그레이 포인트
      },
      {
        colorId: "orange",
        primary: "#FFA726", // 비비드 오렌지
        secondary: "#FFE0B2", // 파스텔 오렌지
        accent: "#455A64", // 딥 그레이 포인트
      },
      {
        colorId: "yellow",
        primary: "#FDD835", // 비비드 옐로우
        secondary: "#FFF9C4", // 파스텔 옐로우
        accent: "#455A64", // 딥 그레이 포인트
      },
      {
        colorId: "green",
        primary: "#66BB6A", // 비비드 그린
        secondary: "#C8E6C9", // 파스텔 그린
        accent: "#455A64", // 딥 그레이 포인트
      },
      {
        colorId: "blue",
        primary: "#42A5F5", // 비비드 블루
        secondary: "#BBDEFB", // 파스텔 블루
        accent: "#455A64", // 딥 그레이 포인트
      },
      {
        colorId: "white",
        primary: "#ECEFF1", // 라이트 그레이
        secondary: "#CFD8DC", // 파스텔 그레이
        accent: "#455A64", // 딥 그레이 포인트
      },
    ],
  },
  {
    id: "rocket",
    name: "로켓",
    topCategory: "vehicle",
    subCategory: "air_vehicle",
    svgKey: "rocket",
    shapes: ["triangle"],
    description: "슈우웅! 로켓이 우주를 향해 출발해요. 어디까지 날아갈까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#ECEFF1",
        secondary: "#CFD8DC",
        accent: "#EF5350",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#1565C0",
      },
      {
        colorId: "orange",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#1565C0",
      },
      {
        colorId: "yellow",
        primary: "#FFEE58",
        secondary: "#FFF9C4",
        accent: "#E53935",
      },
      {
        colorId: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#E53935",
      },
      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#EF5350",
      },
      {
        colorId: "purple",
        primary: "#AB47BC",
        secondary: "#E1BEE7",
        accent: "#FFEE58",
      },
      {
        colorId: "white",
        primary: "#ECEFF1",
        secondary: "#CFD8DC",
        accent: "#EF5350",
      },
    ],
  },
  {
    id: "hotAirBalloon",
    name: "열기구",
    topCategory: "vehicle",
    subCategory: "air_vehicle",
    svgKey: "hotAirBalloon",
    shapes: ["circle"],
    description:
      "둥실둥실 열기구가 하늘 위로 올라가요. 구름보다 높이 갈 수 있을까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#FDD835", // 기본 유지
      },
      {
        colorId: "brown",
        primary: "#795548",
        secondary: "#EFEBE9",
        accent: "#4E342E", // 딥 브라운
      },
      {
        colorId: "red",
        primary: "#F44336",
        secondary: "#FFEBEE",
        accent: "#B71C1C", // 비비드 레드
      },
      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFE0B2",
        accent: "#EF6C00", // 선명한 오렌지
      },
      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFFDE7",
        accent: "#FBC02D", // 골드 옐로우
      },
      {
        colorId: "green",
        primary: "#4CAF50",
        secondary: "#E8F5E9",
        accent: "#2E7D32", // 포레스트 그린
      },
      {
        colorId: "blue",
        primary: "#2196F3",
        secondary: "#BBDEFB",
        accent: "#1565C0", // 로열 블루
      },
      {
        colorId: "purple",
        primary: "#9C27B0",
        secondary: "#E1BEE7",
        accent: "#6A1B9A", // 딥 퍼플
      },
    ],
  },
  {
    id: "truck",
    name: "트럭",
    topCategory: "vehicle",
    subCategory: "road_vehicle",
    svgKey: "truck",
    shapes: [],
    description: "부릉부릉! 커다란 트럭이 무언가를 가득 싣고 달려가요.",
    variants: [
      {
        colorId: "natural",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#1565C0",
      },
      {
        colorId: "brown",
        primary: "#795548",
        secondary: "#D7CCC8",
        accent: "#3E2723",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
      {
        colorId: "orange",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        colorId: "yellow",
        primary: "#FFEE58",
        secondary: "#FFF9C4",
        accent: "#F9A825",
      },
      {
        colorId: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#1565C0",
      },
      {
        colorId: "white",
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
    shapes: [],
    description: "윙윙! 굴착기의 커다란 팔이 흙을 푹푹 파고 있어요.",
    variants: [
      {
        colorId: "natural",
        primary: "#FDD835",
        secondary: "#FFF9C4",
        accent: "#F9A825",
      },
      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFF9C4",
        accent: "#F9A825",
      },
      {
        colorId: "orange",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#1565C0",
      },
      {
        colorId: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
      {
        colorId: "white",
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
        colorId: "natural",
        primary: "#ECEFF1",
        secondary: "#90CAF9",
        accent: "#1565C0",
      },
      {
        colorId: "brown",
        primary: "#795548",
        secondary: "#D7CCC8",
        accent: "#3E2723",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#B71C1C",
      },
      {
        colorId: "orange",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#E65100",
      },
      {
        colorId: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#1B5E20",
      },
      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#0D47A1",
      },
      {
        colorId: "purple",
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
    shapes: [],
    description: "빙글빙글! 레미콘 트럭 통이 돌아가며 시멘트를 골고루 섞어요.",
    variants: [
      {
        colorId: "natural",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        colorId: "orange",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFF9C4",
        accent: "#F9A825",
      },
      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#1565C0",
      },
      {
        colorId: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
      {
        colorId: "white",
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
    shapes: [],
    description: "달콤한 사탕이 반짝반짝! 어떤 맛일지 궁금하지 않나요?",
    variants: [
      {
        colorId: "natural",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
      {
        colorId: "brown",
        primary: "#795548",
        secondary: "#D7CCC8",
        accent: "#3E2723",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
      {
        colorId: "orange",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        colorId: "yellow",
        primary: "#FFEE58",
        secondary: "#FFF9C4",
        accent: "#F9A825",
      },
      {
        colorId: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#1565C0",
      },
      {
        colorId: "purple",
        primary: "#AB47BC",
        secondary: "#E1BEE7",
        accent: "#6A1B9A",
      },
      {
        colorId: "pink",
        primary: "#EC407A",
        secondary: "#F8BBD0",
        accent: "#AD1457",
      },
      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#F5F5F5",
        accent: "#90A4AE",
      },
    ],
  },
  {
    id: "donut",
    name: "도넛",
    topCategory: "food",
    subCategory: "snack",
    svgKey: "donut",
    shapes: ["circle"],
    description: "동그란 도넛이 짠! 가운데 구멍이 뽕 뚫려 있어요.",
    variants: [
      {
        colorId: "natural",
        primary: "#D7A86E", // 기본 도넛 빵
        secondary: "#F5D6A6", // 파스텔 베이지
        accent: "#8D6E63", // 초코 포인트
      },
      {
        colorId: "brown",
        primary: "#6D4C41", // 초코 도넛
        secondary: "#D7CCC8", // 파스텔 브라운
        accent: "#3E2723", // 딥 브라운 포인트
      },
      {
        colorId: "red",
        primary: "#EF5350", // 딸기 토핑
        secondary: "#FFCDD2", // 파스텔 레드
        accent: "#C62828", // 딥 레드 포인트
      },
      {
        colorId: "orange",
        primary: "#FFA726", // 오렌지 토핑
        secondary: "#FFE0B2", // 파스텔 오렌지
        accent: "#EF6C00", // 딥 오렌지 포인트
      },
      {
        colorId: "yellow",
        primary: "#FFEE58", // 레몬/치즈 토핑
        secondary: "#FFF9C4", // 파스텔 옐로우
        accent: "#F9A825", // 골드 옐로우 포인트
      },
      {
        colorId: "purple",
        primary: "#AB47BC", // 블루베리/포도 토핑
        secondary: "#E1BEE7", // 파스텔 퍼플
        accent: "#6A1B9A", // 딥 퍼플 포인트
      },
      {
        colorId: "pink",
        primary: "#EC407A", // 딸기우유 토핑
        secondary: "#F8BBD0", // 파스텔 핑크
        accent: "#AD1457", // 딥 핑크 포인트
      },
      {
        colorId: "white",
        primary: "#FFFFFF", // 순백 화이트 글레이즈
        secondary: "#F5F5F5", // 라이트 그레이/크림빛 음영
        accent: "#D7CCC8", // 은은한 베이지 포인트 (빵 테두리)
      },
    ],
  },
  {
    id: "chocolate",
    name: "초콜릿",
    topCategory: "food",
    subCategory: "snack",
    svgKey: "chocolate",
    shapes: [],
    description: "달콤달콤 초콜릿이에요! 한 조각만 먹어볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#4E342E",
      },
      {
        colorId: "brown",
        primary: "#5D4037",
        secondary: "#D7CCC8",
        accent: "#3E2723",
      },
      {
        colorId: "white",
        primary: "#FFFFFF", // 순백 화이트
        secondary: "#F5F5F5", // 크림빛 라이트 그레이
        accent: "#D7CCC8", // 은은한 베이지 포인트
      },
      {
        colorId: "pink",
        primary: "#EC407A",
        secondary: "#F8BBD0",
        accent: "#AD1457",
      },
      {
        colorId: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        colorId: "orange",
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
    shapes: [],
    description: "시원하고 달콤한 아이스크림이에요! 어떤 맛이 제일 맛있을까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#FFF8E1",
        secondary: "#FFE0B2",
        accent: "#8D6E63",
      },
      {
        colorId: "brown",
        primary: "#795548",
        secondary: "#D7CCC8",
        accent: "#3E2723",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
      {
        colorId: "orange",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        colorId: "yellow",
        primary: "#FFEE58",
        secondary: "#FFF9C4",
        accent: "#F9A825",
      },
      {
        colorId: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        colorId: "blue",
        primary: "#64B5F6",
        secondary: "#BBDEFB",
        accent: "#1565C0",
      },
      {
        colorId: "purple",
        primary: "#AB47BC",
        secondary: "#E1BEE7",
        accent: "#6A1B9A",
      },
      {
        colorId: "pink",
        primary: "#F48FB1",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },
      {
        colorId: "white",
        primary: "#FFF8E1",
        secondary: "#FFFFFF",
        accent: "#D7CCC8",
      },
    ],
  },
  {
    id: "cake",
    name: "케이크",
    topCategory: "food",
    subCategory: "snack",
    svgKey: "cake",
    shapes: ["circle"],
    description: "달콤한 케이크가 짠! 촛불을 후~ 불어볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#FFF8E1",
        secondary: "#FFE082",
        accent: "#FF8A65",
      },
      {
        colorId: "brown",
        primary: "#795548",
        secondary: "#D7CCC8",
        accent: "#3E2723",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
      {
        colorId: "orange",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        colorId: "yellow",
        primary: "#FFF59D",
        secondary: "#FFEE58",
        accent: "#FBC02D",
      },
      {
        colorId: "green",
        primary: "#C5E1A5",
        secondary: "#AED581",
        accent: "#558B2F",
      },
      {
        colorId: "blue",
        primary: "#BBDEFB",
        secondary: "#90CAF9",
        accent: "#42A5F5",
      },
      {
        colorId: "purple",
        primary: "#CE93D8",
        secondary: "#E1BEE7",
        accent: "#8E24AA",
      },
      {
        colorId: "pink",
        primary: "#F8BBD0",
        secondary: "#F48FB1",
        accent: "#E91E63",
      },
      {
        colorId: "white",
        primary: "#FFFFFF", // 순백 화이트 케이크
        secondary: "#F5F5F5", // 크림빛 라이트 그레이
        accent: "#E0E0E0", // 은은한 회색 포인트 (장식/그림자)
      },
    ],
  },
  {
    id: "cookie",
    name: "쿠키",
    topCategory: "food",
    subCategory: "snack",
    svgKey: "cookie",
    shapes: ["circle"],
    description: "바삭바삭 맛있는 쿠키예요! 하나만 먹을까요, 두 개 먹을까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#D7A86E", // 기본 쿠키 브라운
        secondary: "#C4935A", // 구워진 쿠키 톤
        accent: "#5D4037", // 초코칩 포인트
      },
      {
        colorId: "brown",
        primary: "#D7A86E",
        secondary: "#C4935A",
        accent: "#5D4037",
      },
      {
        colorId: "red",
        primary: "#E53935", // 비비드 레드 → 딸기 쿠키
        secondary: "#FFCDD2", // 파스텔 레드 → 딸기 크림
        accent: "#B71C1C", // 딥 레드 포인트
      },
      {
        colorId: "orange",
        primary: "#FB8C00", // 오렌지 쿠키
        secondary: "#FFE0B2", // 파스텔 오렌지
        accent: "#EF6C00", // 딥 오렌지 포인트
      },
      {
        colorId: "yellow",
        primary: "#FDD835", // 치즈/레몬 쿠키
        secondary: "#FFF9C4", // 파스텔 옐로우
        accent: "#F9A825", // 골드 옐로우 포인트
      },
      {
        colorId: "green",
        primary: "#81C784", // 녹차 쿠키
        secondary: "#E8F5E9", // 파스텔 그린
        accent: "#2E7D32", // 딥 그린 포인트
      },
      {
        colorId: "blue",
        primary: "#64B5F6", // 블루베리 쿠키
        secondary: "#E3F2FD", // 파스텔 블루
        accent: "#1565C0", // 딥 블루 포인트
      },
      {
        colorId: "purple",
        primary: "#9C27B0", // 포도 쿠키
        secondary: "#E1BEE7", // 파스텔 퍼플
        accent: "#6A1B9A", // 딥 퍼플 포인트
      },
      {
        colorId: "pink",
        primary: "#F48FB1", // 딸기우유 쿠키
        secondary: "#FCE4EC", // 파스텔 핑크
        accent: "#AD1457", // 딥 핑크 포인트
      },
      {
        colorId: "white",
        primary: "#FFFFFF", // 바닐라 쿠키
        secondary: "#FFF8E1", // 크림 베이스
        accent: "#BDBDBD", // 연한 회색 포인트
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
    shapes: ["circle"],
    description: "꿀꿀! 귀여운 돼지가 꼬리를 빙글빙글 말았어요.",
    variants: [
      {
        colorId: "natural",
        primary: "#F48FB1",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },
      {
        colorId: "pink",
        primary: "#F48FB1",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },
      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#F5F5F5",
        accent: "#BDBDBD",
      },
      {
        colorId: "black",
        primary: "#424242",
        secondary: "#757575",
        accent: "#212121",
      },
    ],
  },
  {
    id: "bear",
    name: "곰",
    topCategory: "animal",
    subCategory: "land_animal",
    svgKey: "bear",
    shapes: [],
    description: "어흥? 아니죠! 귀여운 곰이 숲속에서 어슬렁어슬렁 걸어와요.",
    variants: [
      {
        colorId: "natural",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#4E342E",
      },
      {
        colorId: "brown",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#4E342E",
      },
      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#F5F5F5",
        accent: "#90A4AE",
      },
      {
        colorId: "black",
        primary: "#424242",
        secondary: "#757575",
        accent: "#212121",
      },
    ],
  },

  ////////////////////

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
        colorId: "natural",
        primary: "#FAFAFA",
        secondary: "#EEEEEE",
        accent: "#424242",
        pattern: "patches",
      },
      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#EEEEEE",
        accent: "#BDBDBD",
      },
      {
        colorId: "black",
        primary: "#424242",
        secondary: "#212121",
        accent: "#FAFAFA",
      },
      {
        colorId: "brown",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#5D4037",
      },
      {
        colorId: "yellow",
        primary: "#FFD54F",
        secondary: "#FFF8E1",
        accent: "#8D6E63",
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
        colorId: "natural",
        primary: "#FAFAFA",
        secondary: "#424242",
        accent: "#5D4037",
        pattern: "spots",
      },
      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#EEEEEE",
        accent: "#5D4037",
      },
      {
        colorId: "brown",
        primary: "#A1887F",
        secondary: "#D7CCC8",
        accent: "#5D4037",
      },
      {
        colorId: "black",
        primary: "#424242",
        secondary: "#212121",
        accent: "#FAFAFA",
      },
      {
        colorId: "yellow",
        primary: "#FFD54F",
        secondary: "#FFC107",
        accent: "#5C4033",
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
        colorId: "natural",
        primary: "#FFB74D",
        secondary: "#FFA726",
        accent: "#5C4033",
      },
      {
        colorId: "orange",
        primary: "#FFB74D",
        secondary: "#FFE0B2",
        accent: "#E65100",
      },
      {
        colorId: "black",
        primary: "#424242",
        secondary: "#212121",
        accent: "#FAFAFA",
      },
      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#EEEEEE",
        accent: "#5D4037",
      },
      {
        colorId: "brown",
        primary: "#A1887F",
        secondary: "#D7CCC8",
        accent: "#5D4037",
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
        colorId: "natural",
        primary: "#FAFAFA",
        secondary: "#F8BBD0",
        accent: "#F48FB1",
      },
      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#EEEEEE",
        accent: "#F48FB1",
      },
      {
        colorId: "brown",
        primary: "#A1887F",
        secondary: "#D7CCC8",
        accent: "#5C4033",
      },
      {
        colorId: "black",
        primary: "#424242",
        secondary: "#212121",
        accent: "#F48FB1",
      },
      {
        colorId: "pink",
        primary: "#F8BBD0",
        secondary: "#F48FB1",
        accent: "#C2185B",
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
        colorId: "natural",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#4E342E",
      },
      {
        colorId: "brown",
        primary: "#8D6E63",
        secondary: "#BCAAA4",
        accent: "#4E342E",
      },
      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#ECEFF1",
        accent: "#5D4037",
      },
      {
        colorId: "yellow",
        primary: "#FFD54F",
        secondary: "#FFF8E1",
        accent: "#6D4C41",
      },
      {
        colorId: "purple",
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
        colorId: "natural",
        primary: "#66BB6A",
        secondary: "#FFEE58",
        accent: "#EF5350",
        pattern: "multicolor",
      },
      {
        colorId: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#1565C0",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
      {
        colorId: "yellow",
        primary: "#FFD54F",
        secondary: "#FFF9C4",
        accent: "#F9A825",
      },
      {
        colorId: "orange",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        colorId: "purple",
        primary: "#AB47BC",
        secondary: "#E1BEE7",
        accent: "#6A1B9A",
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
        colorId: "natural",
        primary: "#FAFAFA",
        secondary: "#EEEEEE",
        accent: "#E53935",
      },
      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#EEEEEE",
        accent: "#E53935",
      },
      {
        colorId: "brown",
        primary: "#D4A574",
        secondary: "#B8956A",
        accent: "#E53935",
      },
      {
        colorId: "black",
        primary: "#424242",
        secondary: "#212121",
        accent: "#E53935",
      },
      {
        colorId: "yellow",
        primary: "#FFEE58",
        secondary: "#FDD835",
        accent: "#E53935",
      },
      {
        colorId: "orange",
        primary: "#FFB74D",
        secondary: "#FFA726",
        accent: "#E53935",
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
        colorId: "natural",
        primary: "#FFEE58",
        secondary: "#FDD835",
        accent: "#FF9800",
      },
      {
        colorId: "yellow",
        primary: "#FFEE58",
        secondary: "#FFF9C4",
        accent: "#FF9800",
      },
      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#EEEEEE",
        accent: "#FF9800",
      },
      {
        colorId: "brown",
        primary: "#A1887F",
        secondary: "#D7CCC8",
        accent: "#FF9800",
      },
      {
        colorId: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#FF9800",
      },
      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#FF9800",
      },
      {
        colorId: "pink",
        primary: "#EC407A",
        secondary: "#F8BBD0",
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
        colorId: "natural",
        primary: "#37474F",
        secondary: "#FAFAFA",
        accent: "#FF9800",
      },
      {
        colorId: "black",
        primary: "#212121",
        secondary: "#FAFAFA",
        accent: "#FF9800",
      },
      {
        colorId: "blue",
        primary: "#3F51B5",
        secondary: "#E8EAF6",
        accent: "#FF9800",
      },
      {
        colorId: "green",
        primary: "#00897B",
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
        colorId: "natural",
        primary: "#F48FB1",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },
      {
        colorId: "pink",
        primary: "#EC407A",
        secondary: "#F8BBD0",
        accent: "#AD1457",
      },
      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#E3F2FD",
        accent: "#1976D2",
      },
      {
        colorId: "purple",
        primary: "#AB47BC",
        secondary: "#E1BEE7",
        accent: "#7B1FA2",
      },
      {
        colorId: "orange",
        primary: "#FFB74D",
        secondary: "#FFF3E0",
        accent: "#EF6C00",
      },
      {
        colorId: "green",
        primary: "#66BB6A",
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
        colorId: "natural",
        primary: "#5C6BC0",
        secondary: "#9FA8DA",
        accent: "#1A237E", // 기본 유지
      },
      {
        colorId: "blue",
        primary: "#2196F3",
        secondary: "#E3F2FD",
        accent: "#1565C0", // 로열 블루
      },
      {
        colorId: "black",
        primary: "#212121",
        secondary: "#9E9E9E",
        accent: "#000000", // 블랙 포인트
      },
      {
        colorId: "green",
        primary: "#4CAF50",
        secondary: "#E8F5E9",
        accent: "#2E7D32", // 포레스트 그린
      },
      {
        colorId: "purple",
        primary: "#9C27B0",
        secondary: "#F3E5F5",
        accent: "#6A1B9A", // 딥 퍼플
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
        colorId: "natural",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
      {
        colorId: "orange",
        primary: "#FF7043",
        secondary: "#FFCCBC",
        accent: "#D84315",
      },
      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#1565C0",
      },
      {
        colorId: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        colorId: "purple",
        primary: "#AB47BC",
        secondary: "#E1BEE7",
        accent: "#6A1B9A",
      },
      {
        colorId: "pink",
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
        colorId: "natural",
        primary: "#42A5F5",
        secondary: "#90CAF9",
        accent: "#1565C0",
      },
      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#1565C0",
      },
      {
        colorId: "black",
        primary: "#455A64",
        secondary: "#CFD8DC",
        accent: "#212121",
      },
      {
        colorId: "green",
        primary: "#26A69A",
        secondary: "#80CBC4",
        accent: "#00695C",
      },
      {
        colorId: "purple",
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
        colorId: "natural",
        primary: "#90A4AE",
        secondary: "#78909C",
        accent: "#37474F",
      },
      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#1565C0",
      },
      {
        colorId: "black",
        primary: "#263238",
        secondary: "#37474F",
        accent: "#212121",
      },
      {
        colorId: "green",
        primary: "#26A69A",
        secondary: "#80CBC4",
        accent: "#004D40",
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
        colorId: "natural",
        primary: "#AB47BC",
        secondary: "#CE93D8",
        accent: "#6A1B9A", // 기본 유지
      },
      {
        colorId: "purple",
        primary: "#9C27B0",
        secondary: "#E1BEE7",
        accent: "#6A1B9A", // 딥 퍼플
      },
      {
        colorId: "red",
        primary: "#F44336",
        secondary: "#FFEBEE",
        accent: "#B71C1C", // 비비드 레드
      },
      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFE0B2",
        accent: "#EF6C00", // 선명한 오렌지
      },
      {
        colorId: "pink",
        primary: "#E91E63",
        secondary: "#FCE4EC",
        accent: "#C2185B", // 로즈 핑크
      },
      {
        colorId: "blue",
        primary: "#2196F3",
        secondary: "#E3F2FD",
        accent: "#1565C0", // 로열 블루
      },
      {
        colorId: "green",
        primary: "#4CAF50",
        secondary: "#E8F5E9",
        accent: "#2E7D32", // 포레스트 그린
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
        colorId: "natural",
        primary: "#8D6E63",
        secondary: "#BCAAA4",
        accent: "#4E342E",
      },
      {
        colorId: "brown",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#4E342E",
      },
      {
        colorId: "orange",
        primary: "#FF7043",
        secondary: "#FFCCBC",
        accent: "#D84315",
      },
      {
        colorId: "green",
        primary: "#4DB6AC",
        secondary: "#B2DFDB",
        accent: "#00695C",
      },
      {
        colorId: "purple",
        primary: "#AB47BC",
        secondary: "#E1BEE7",
        accent: "#6A1B9A",
      },
      {
        colorId: "pink",
        primary: "#F48FB1",
        secondary: "#F8BBD0",
        accent: "#AD1457",
      },
      {
        colorId: "yellow",
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
    shapes: ["circle"],
    description: "포도알이 주렁주렁! 한 알 톡 따서 먹어볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#7E57C2", // 비비드 퍼플
        secondary: "#D1C4E9", // 파스텔 퍼플
        accent: "#512DA8", // 딥 퍼플 포인트
      },
      {
        colorId: "purple",
        primary: "#7E57C2", // 보라 포도
        secondary: "#D1C4E9", // 파스텔 퍼플
        accent: "#512DA8", // 딥 퍼플 포인트
      },
      {
        colorId: "green",
        primary: "#9CCC65", // 청포도
        secondary: "#DCEDC8", // 파스텔 그린
        accent: "#558B2F", // 딥 그린 포인트
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
        colorId: "natural",
        primary: "#FF9800",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        colorId: "orange",
        primary: "#FF9800",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        colorId: "yellow",
        primary: "#FFCA28",
        secondary: "#FFF9C4",
        accent: "#F9A825",
      },
      {
        colorId: "green",
        primary: "#9CCC65",
        secondary: "#DCEDC8",
        accent: "#558B2F",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
    ],
  },
  {
    id: "peach",
    name: "복숭아",
    topCategory: "food",
    subCategory: "fruit",
    svgKey: "peach",
    shapes: ["heart"],
    description: "보들보들 달콤한 복숭아예요! 한 입 베어 물어볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#FFAB91", // 기본 피치톤
        secondary: "#FBE9E7", // 파스텔 피치
        accent: "#E64A19", // 오렌지빛 포인트
      },
      {
        colorId: "pink",
        primary: "#EC407A", // 핑크빛 복숭아
        secondary: "#F8BBD0", // 파스텔 핑크
        accent: "#AD1457", // 딥 핑크 포인트
      },
      {
        colorId: "orange",
        primary: "#FF8A65", // 오렌지빛 복숭아
        secondary: "#FFCCBC", // 파스텔 오렌지
        accent: "#D84315", // 딥 오렌지 포인트
      },
    ],
  },

  ///////////////////
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
        colorId: "natural",
        primary: "#E53935",
        secondary: "#EF5350",
        accent: "#2E7D32",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#2E7D32",
      },
      {
        colorId: "green",
        primary: "#43A047",
        secondary: "#C8E6C9",
        accent: "#1B5E20",
      },
      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFF9C4",
        accent: "#2E7D32",
      },
      {
        colorId: "pink",
        primary: "#EC407A",
        secondary: "#F8BBD0",
        accent: "#2E7D32",
      },
      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFE0B2",
        accent: "#2E7D32",
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
        colorId: "natural",
        primary: "#FDD835",
        secondary: "#FFEE58",
        accent: "#5D4037",
      },
      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFF9C4",
        accent: "#5D4037",
      },
      {
        colorId: "green",
        primary: "#9CCC65",
        secondary: "#DCEDC8",
        accent: "#5D4037",
      },
      {
        colorId: "orange",
        primary: "#FFA726",
        secondary: "#FFE0B2",
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
        colorId: "natural",
        primary: "#E53935",
        secondary: "#EF5350",
        accent: "#43A047",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#2E7D32",
      },
      {
        colorId: "pink",
        primary: "#EC407A",
        secondary: "#F8BBD0",
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
        colorId: "natural",
        primary: "#43A047",
        secondary: "#E53935",
        accent: "#1B5E20",
      },
      {
        colorId: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#2E7D32",
      },
      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFF9C4",
        accent: "#558B2F",
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
        colorId: "natural",
        primary: "#7E57C2",
        secondary: "#D1C4E9",
        accent: "#512DA8",
      },
      {
        colorId: "purple",
        primary: "#7E57C2",
        secondary: "#E1BEE7",
        accent: "#6A1B9A",
      },
      {
        colorId: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        colorId: "white",
        primary: "#F5F5F5",
        secondary: "#FFFFFF",
        accent: "#757575",
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
        colorId: "natural",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
      {
        colorId: "green",
        primary: "#43A047",
        secondary: "#C8E6C9",
        accent: "#1B5E20",
      },
      {
        colorId: "orange",
        primary: "#FF7043",
        secondary: "#FFCCBC",
        accent: "#D84315",
      },
      {
        colorId: "yellow",
        primary: "#FFEE58",
        secondary: "#FFF9C4",
        accent: "#F9A825",
      },
      {
        colorId: "purple",
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
        colorId: "natural",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        colorId: "orange",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        colorId: "yellow",
        primary: "#FFCA28",
        secondary: "#FFF9C4",
        accent: "#F9A825",
      },
      {
        colorId: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        colorId: "red",
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
        colorId: "natural",
        primary: "#FB8C00",
        secondary: "#FFA726",
        accent: "#558B2F",
      },
      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFE0B2",
        accent: "#558B2F",
      },
      {
        colorId: "yellow",
        primary: "#FFCA28",
        secondary: "#FFF9C4",
        accent: "#558B2F",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#558B2F",
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
        colorId: "natural",
        primary: "#66BB6A", // 오이 껍질의 선명한 녹색
        secondary: "#43A047", // 진한 녹색
        accent: "#2E7D32", // 포레스트 그린 포인트
      },
      {
        colorId: "green",
        primary: "#4CAF50", // 비비드 그린
        secondary: "#C8E6C9", // 연한 녹색
        accent: "#2E7D32", // 딥 그린 포인트
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
        colorId: "natural",
        primary: "#E53935",
        secondary: "#EF5350",
        accent: "#558B2F",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#2E7D32",
      },
      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFE0B2",
        accent: "#558B2F",
      },
      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFF9C4",
        accent: "#558B2F",
      },
      {
        colorId: "pink",
        primary: "#EC407A",
        secondary: "#F8BBD0",
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
        colorId: "natural",
        primary: "#EF5350",
        secondary: "#FFFFFF",
        accent: "#D7CCC8",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#FFFFFF",
      },
      {
        colorId: "brown",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#5D4037",
      },
      {
        colorId: "white",
        primary: "#F5F5F5",
        secondary: "#FFFFFF",
        accent: "#BDBDBD",
      },
      {
        colorId: "yellow",
        primary: "#FFCA28",
        secondary: "#FFF9C4",
        accent: "#D7CCC8",
      },
      {
        colorId: "purple",
        primary: "#AB47BC",
        secondary: "#E1BEE7",
        accent: "#6A1B9A",
      },
      {
        colorId: "orange",
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
        colorId: "natural",
        primary: "#43A047",
        secondary: "#A5D6A7",
        accent: "#81C784",
      },
      {
        colorId: "green",
        primary: "#43A047",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        colorId: "purple",
        primary: "#7E57C2",
        secondary: "#D1C4E9",
        accent: "#6A1B9A",
      },
      {
        colorId: "white",
        primary: "#F5F5F5",
        secondary: "#FFFFFF",
        accent: "#C8E6C9",
      },
      {
        colorId: "yellow",
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
        colorId: "natural",
        primary: "#FFEE58", // 노란 알맹이
        secondary: "#FBC02D", // 진한 옥수수 노랑
        accent: "#7CB342", // 껍질의 녹색
      },
      {
        colorId: "yellow",
        primary: "#FFEE58", // 밝은 옥수수 노랑
        secondary: "#FFF9C4", // 연한 노랑
        accent: "#7CB342", // 녹색 껍질
      },

      {
        colorId: "green",
        primary: "#2E7D32", // 껍질의 진한 녹색
        secondary: "#FFF8E1", // 옥수수 속 노랑
        accent: "#FB8C00", // 당근/포인트 컬러
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
        colorId: "natural",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
      {
        colorId: "orange",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        colorId: "yellow",
        primary: "#FFEE58",
        secondary: "#FFF9C4",
        accent: "#F9A825",
      },
      {
        colorId: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#1565C0",
      },
      {
        colorId: "purple",
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
        colorId: "natural",
        primary: "#FFF8E1", // 빵 베이스 (바닐라톤)
        secondary: "#F5DEB3", // 파스텔 베이지 (식빵 느낌)
        accent: "#81C784", // 상추 포인트
      },
      {
        colorId: "red",
        primary: "#E53935", // 토마토/햄
        secondary: "#FFCDD2", // 파스텔 레드
        accent: "#B71C1C", // 딥 레드 포인트
      },
      {
        colorId: "yellow",
        primary: "#FDD835", // 치즈
        secondary: "#FFF9C4", // 파스텔 옐로우
        accent: "#FBC02D", // 골드 옐로우 포인트
      },
      {
        colorId: "green",
        primary: "#43A047", // 상추/야채
        secondary: "#C8E6C9", // 파스텔 그린
        accent: "#2E7D32", // 딥 그린 포인트
      },
      {
        colorId: "brown",
        primary: "#8D6E63", // 구운 빵
        secondary: "#D7CCC8", // 파스텔 브라운
        accent: "#5D4037", // 딥 브라운 포인트
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
        colorId: "natural",
        primary: "#FFF3E0",
        secondary: "#FFF8E1",
        accent: "#D7A86E",
      },
      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#F5F5F5",
        accent: "#BDBDBD",
      },
      {
        colorId: "yellow",
        primary: "#FFE082",
        secondary: "#FFF8E1",
        accent: "#F9A825",
      },
      {
        colorId: "green",
        primary: "#A5D6A7",
        secondary: "#E8F5E9",
        accent: "#388E3C",
      },
      {
        colorId: "pink",
        primary: "#F8BBD0",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },
      {
        colorId: "purple",
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
        colorId: "natural",
        primary: "#FFF8E1",
        secondary: "#FFE0B2",
        accent: "#8D6E63",
      },
      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#F5F5F5",
        accent: "#8D6E63",
      },
      {
        colorId: "brown",
        primary: "#D7CCC8",
        secondary: "#BCAAA4",
        accent: "#5D4037",
      },
      {
        colorId: "yellow",
        primary: "#FFECB3",
        secondary: "#FFE082",
        accent: "#8D6E63",
      },
    ],
  },
  {
    id: "gimbap",
    name: "김밥",
    topCategory: "food",
    subCategory: "meal",
    svgKey: "gimbap",
    shapes: ["circle"],
    description: "돌돌 말린 김밥이에요! 안에는 어떤 재료가 들어 있을까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#37474F", // 김(해조류)
        secondary: "#FFF8E1", // 밥/계란
        accent: "#E53935", // 당근/햄 포인트
      },
      {
        colorId: "black",
        primary: "#212121", // 진한 김
        secondary: "#FFFDE7", // 밝은 밥
        accent: "#43A047", // 오이/채소 포인트
      },
      {
        colorId: "green",
        primary: "#2E7D32", // 오이/채소
        secondary: "#FFF8E1", // 밥/계란
        accent: "#FB8C00", // 당근 포인트
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
        colorId: "natural",
        primary: "#37474F", // 김(해조류) 느낌
        secondary: "#FFF8E1", // 밥/계란 느낌
        accent: "#E53935", // 당근/햄 포인트
      },
      {
        colorId: "black",
        primary: "#212121", // 김의 진한 색
        secondary: "#FFFDE7", // 밥의 밝은 색
        accent: "#43A047", // 오이/채소 포인트
      },
      {
        colorId: "green",
        primary: "#2E7D32", // 오이/채소
        secondary: "#FFF8E1", // 밥/계란
        accent: "#FB8C00", // 당근 포인트
      },
      {
        colorId: "pink",
        primary: "#EC407A", // 분홍 햄/맛살
        secondary: "#F8BBD0", // 부드러운 속재료
        accent: "#AD1457", // 진한 포인트
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
        colorId: "natural",
        primary: "#D4A574",
        secondary: "#8D6E63",
        accent: "#66BB6A",
      },
      {
        colorId: "brown",
        primary: "#A1887F",
        secondary: "#6D4C41",
        accent: "#43A047",
      },
      {
        colorId: "orange",
        primary: "#FFB74D",
        secondary: "#8D6E63",
        accent: "#66BB6A",
      },
      {
        colorId: "yellow",
        primary: "#FFCC80",
        secondary: "#FFF3E0",
        accent: "#66BB6A",
      },
      {
        colorId: "green",
        primary: "#81C784",
        secondary: "#E8F5E9",
        accent: "#A1887F",
      },
    ],
  },
  {
    id: "ball",
    name: "공",
    topCategory: "living",
    subCategory: "daily",
    svgKey: "ball",
    shapes: ["circle"],
    description: "데굴데굴 굴러가는 공이에요! 어떤 공을 만들어 볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#FFB300", // 비비드 옐로우 오렌지
        secondary: "#FFE082", // 파스텔 옐로우
        accent: "#FFFFFF", // 흰색 포인트
      },
      {
        colorId: "red",
        primary: "#E53935", // 비비드 레드
        secondary: "#FFCDD2", // 파스텔 레드
        accent: "#B71C1C", // 딥 레드 포인트
      },
      {
        colorId: "orange",
        primary: "#FB8C00", // 비비드 오렌지
        secondary: "#FFE0B2", // 파스텔 오렌지
        accent: "#E65100", // 딥 오렌지 포인트
      },
      {
        colorId: "yellow",
        primary: "#FDD835", // 비비드 옐로우
        secondary: "#FFF9C4", // 파스텔 옐로우
        accent: "#F57F17", // 골드 옐로우 포인트
      },
      {
        colorId: "green",
        primary: "#43A047", // 비비드 그린
        secondary: "#C8E6C9", // 파스텔 그린
        accent: "#2E7D32", // 딥 그린 포인트
      },
      {
        colorId: "blue",
        primary: "#1E88E5", // 비비드 블루
        secondary: "#BBDEFB", // 파스텔 블루
        accent: "#1565C0", // 딥 블루 포인트
      },
      {
        colorId: "purple",
        primary: "#8E24AA", // 비비드 퍼플
        secondary: "#E1BEE7", // 파스텔 퍼플
        accent: "#6A1B9A", // 딥 퍼플 포인트
      },
      {
        colorId: "black",
        primary: "#424242", // 블랙
        secondary: "#BDBDBD", // 라이트 그레이
        accent: "#212121", // 딥 블랙 포인트
      },
      {
        colorId: "white",
        primary: "#FFFFFF", // 화이트
        secondary: "#F5F5F5", // 라이트 그레이
        accent: "#9E9E9E", // 연한 회색 포인트
      },
    ],
  },
  {
    id: "donut1",
    name: "도넛",
    topCategory: "food",
    subCategory: "snack",
    svgKey: "donut1",
    shapes: ["circle"],
    description: "동글동글 달콤한 도넛이 또 나타났어요! 알록달록 꾸며볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#D7A86E",
        secondary: "#F5D7A1",
        accent: "#8D5524",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
      {
        colorId: "orange",
        primary: "#FFB74D",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        colorId: "yellow",
        primary: "#FFD54F",
        secondary: "#FFF59D",
        accent: "#F57F17",
      },
      {
        colorId: "green",
        primary: "#81C784",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        colorId: "purple",
        primary: "#B388FF",
        secondary: "#EDE7F6",
        accent: "#512DA8",
      },
      {
        colorId: "white",
        primary: "#FFFFFF", // 순백 화이트 글레이즈
        secondary: "#F5F5F5", // 라이트 그레이/크림빛 음영
        accent: "#D7CCC8", // 은은한 베이지 포인트 (빵 테두리)
      },
      {
        colorId: "pink",
        primary: "#FF80AB",
        secondary: "#F8BBD0",
        accent: "#C2185B",
      },
      {
        colorId: "brown",
        primary: "#6D4C41",
        secondary: "#D7CCC8",
        accent: "#3E2723",
      },
    ],
  },
  {
    id: "sunglasses",
    name: "선글라스",
    topCategory: "living",
    subCategory: "daily",
    svgKey: "sunglasses",
    shapes: ["circle"],
    description: "햇빛을 쏙 가려주는 멋진 선글라스예요! 누가 써볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#212121",
        secondary: "#757575",
        accent: "#000000",
      },
      {
        colorId: "red",
        primary: "#FF1744",
        secondary: "#FFCDD2",
        accent: "#B71C1C",
      },
      {
        colorId: "orange",
        primary: "#FF9800",
        secondary: "#FFE0B2",
        accent: "#E65100",
      },
      {
        colorId: "yellow",
        primary: "#FFD54F",
        secondary: "#FFF9C4",
        accent: "#F57F17",
      },
      {
        colorId: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        colorId: "blue",
        primary: "#00B0FF",
        secondary: "#E0F7FA",
        accent: "#0056B3",
      },
      {
        colorId: "purple",
        primary: "#D500F9",
        secondary: "#F3E5F5",
        accent: "#4A148C",
      },
      {
        colorId: "black",
        primary: "#212121",
        secondary: "#757575",
        accent: "#000000",
      },
      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#E0E0E0",
        accent: "#616161",
      },
      {
        colorId: "pink",
        primary: "#FF4081",
        secondary: "#F8BBD0",
        accent: "#C2185B",
      },
      {
        colorId: "brown",
        primary: "#795548",
        secondary: "#D7CCC8",
        accent: "#4E342E",
      },
    ],
  },
  {
    id: "basketball",
    name: "농구공",
    topCategory: "living",
    subCategory: "daily",
    svgKey: "basketball",
    shapes: ["circle"],
    description: "통통 튀는 농구공이에요! 골대에 슛! 넣어볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#FF6D00", // 비비드 오렌지
        secondary: "#FFE0B2", // 파스텔 오렌지
        accent: "#212121", // 블랙 라인
      },
      {
        colorId: "orange",
        primary: "#FF6D00", // 비비드 오렌지
        secondary: "#FFE0B2", // 파스텔 오렌지
        accent: "#212121", // 블랙 라인
      },
      {
        colorId: "brown",
        primary: "#795548", // 다크 브라운 (구형 농구공 느낌)
        secondary: "#D7CCC8", // 파스텔 브라운
        accent: "#3E2723", // 딥 브라운 라인
      },
      {
        colorId: "black",
        primary: "#37474F", // 블랙 농구공 (특수 디자인)
        secondary: "#CFD8DC", // 라이트 그레이
        accent: "#000000", // 블랙 라인
      },
      {
        colorId: "white",
        primary: "#FAFAFA", // 화이트 농구공 (특수 디자인)
        secondary: "#E0E0E0", // 라이트 그레이
        accent: "#424242", // 딥 그레이 라인
      },
    ],
  },
  {
    id: "baseball",
    name: "야구공",
    topCategory: "living",
    subCategory: "daily",
    svgKey: "baseball",
    shapes: ["circle"],
    description: "힘껏 휙! 날아가는 야구공이에요. 누가 멋지게 쳐볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#FFFFFF", // 기본 화이트 공
        secondary: "#F5F5F5", // 라이트 그레이 음영
        accent: "#D50000", // 레드 스티치
      },
      {
        colorId: "yellow",
        primary: "#FFEB3B", // 비비드 옐로우 (연습용 공 느낌)
        secondary: "#FFF9C4", // 파스텔 옐로우
        accent: "#D50000", // 레드 스티치
      },
    ],
  },
  {
    id: "tennisBall",
    name: "테니스공",
    topCategory: "living",
    subCategory: "daily",
    svgKey: "tennisBall",
    shapes: ["circle"],
    description: "통통! 튀어 오르는 테니스공이에요. 어디까지 날아갈까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#C6FF00", // 비비드 라임 옐로우
        secondary: "#F4FF81", // 파스텔 라임
        accent: "#FFFFFF", // 흰색 라인
      },
      {
        colorId: "yellow",
        primary: "#FFEB3B", // 비비드 옐로우
        secondary: "#FFF9C4", // 파스텔 옐로우
        accent: "#FFFFFF", // 흰색 라인
      },
      {
        colorId: "green",
        primary: "#76FF03", // 비비드 그린
        secondary: "#CCFF90", // 파스텔 그린
        accent: "#FFFFFF", // 흰색 라인
      },
    ],
  },
  {
    id: "fullMoon",
    name: "보름달",
    topCategory: "living",
    subCategory: "daily",
    svgKey: "fullMoon",
    shapes: ["circle"],
    description: "둥근 보름달이 밤하늘에 두둥실! 달님에게 인사해 볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#FFEE58",
        secondary: "#FFF9C4",
        accent: "#F57F17",
      },
      {
        colorId: "yellow",
        primary: "#FFEE58",
        secondary: "#FFF9C4",
        accent: "#F57F17",
      },
      {
        colorId: "orange",
        primary: "#FFB74D",
        secondary: "#FFE0B2",
        accent: "#E65100",
      },
      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#E0E0E0",
        accent: "#9E9E9E",
      },
      {
        colorId: "blue",
        primary: "#E0F7FA",
        secondary: "#80DEEA",
        accent: "#00838F",
      },
      {
        colorId: "pink",
        primary: "#F8BBD0",
        secondary: "#FFEBEE",
        accent: "#C2185B",
      },
    ],
  },
  {
    id: "roundBalloon",
    name: "풍선",
    topCategory: "living",
    subCategory: "daily",
    svgKey: "roundBalloon",
    shapes: ["circle"],
    description: "둥실둥실 동그란 풍선이 날아가요! 어디까지 올라갈까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#FF5252",
        secondary: "#FFCDD2",
        accent: "#D32F2F",
      },
      {
        colorId: "red",
        primary: "#FF5252",
        secondary: "#FFCDD2",
        accent: "#D32F2F",
      },
      {
        colorId: "orange",
        primary: "#FFAB40",
        secondary: "#FFE0B2",
        accent: "#E65100",
      },
      {
        colorId: "yellow",
        primary: "#FFEB3B",
        secondary: "#FFFDE7",
        accent: "#F57F17",
      },
      {
        colorId: "green",
        primary: "#69F0AE",
        secondary: "#C8E6C9",
        accent: "#388E3C",
      },
      {
        colorId: "blue",
        primary: "#448AFF",
        secondary: "#BBDEFB",
        accent: "#1976D2",
      },
      {
        colorId: "purple",
        primary: "#E040FB",
        secondary: "#EDE7F6",
        accent: "#7B1FA2",
      },
      {
        colorId: "black",
        primary: "#424242",
        secondary: "#BDBDBD",
        accent: "#212121",
      },
      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#E0E0E0",
        accent: "#9E9E9E",
      },
      {
        colorId: "pink",
        primary: "#FF80AB",
        secondary: "#F8BBD0",
        accent: "#C2185B",
      },
    ],
  },
  {
    id: "sun",
    name: "해",
    topCategory: "living",
    subCategory: "daily",
    svgKey: "sun",
    shapes: ["circle"],
    description: "반짝반짝 빛나는 해가 떴어요! 오늘도 따뜻하게 비춰줄까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#FFEB3B", // 태양의 기본 노랑
        secondary: "#FFFDE7", // 은은한 햇빛
        accent: "#F57F17", // 주황 포인트
      },
      {
        colorId: "red",
        primary: "#F44336", // 붉은 태양
        secondary: "#FFEBEE", // 연한 붉은빛
        accent: "#B71C1C", // 딥 레드 포인트
      },
      {
        colorId: "orange",
        primary: "#FB8C00", // 주황빛 태양
        secondary: "#FFE0B2", // 따뜻한 빛
        accent: "#EF6C00", // 진한 오렌지 포인트
      },
      {
        colorId: "yellow",
        primary: "#FDD835", // 밝은 노랑
        secondary: "#FFFDE7", // 은은한 노랑
        accent: "#FBC02D", // 골드 옐로우 포인트
      },
      {
        colorId: "white",
        primary: "#FFFDE7", // 햇빛의 은은한 화이트
        secondary: "#FFFFFF", // 순백
        accent: "#9E9E9E", // 그레이 포인트로 자연스럽게
      },
    ],
  },
  {
    id: "envelop",
    name: "편지봉투",
    topCategory: "living",
    subCategory: "stationery",
    svgKey: "envelop",
    shapes: ["square"],
    description:
      "소중한 마음을 담아 보내는 편지봉투예요! 누구에게 편지를 써볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#FAFAFA",
        secondary: "#EEEEEE",
        accent: "#E53935",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#C62828",
      },
      {
        colorId: "orange",
        primary: "#FFB74D",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        colorId: "yellow",
        primary: "#FFF9C4",
        secondary: "#FFFDE7",
        accent: "#FBC02D",
      },
      {
        colorId: "green",
        primary: "#A5D6A7",
        secondary: "#E8F5E9",
        accent: "#2E7D32",
      },
      {
        colorId: "blue",
        primary: "#BBDEFB",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },
      {
        colorId: "purple",
        primary: "#CE93D8",
        secondary: "#F3E5F5",
        accent: "#7B1FA2",
      },
      {
        colorId: "black",
        primary: "#424242",
        secondary: "#BDBDBD",
        accent: "#212121",
      },
      {
        colorId: "white",
        primary: "#FFFFFF",
        secondary: "#F5F5F5",
        accent: "#9E9E9E",
      },
      {
        colorId: "pink",
        primary: "#F8BBD0",
        secondary: "#FFEBEE",
        accent: "#C2185B",
      },
      {
        colorId: "brown",
        primary: "#D7CCC8",
        secondary: "#EFEBE9",
        accent: "#5D4037",
      },
    ],
  },

  {
    id: "chocolateBar",
    name: "초콜릿",
    topCategory: "food",
    subCategory: "snack",
    svgKey: "chocolateBar",
    shapes: ["square"],
    description: "달콤한 초콜릿 한 조각! 몇 조각을 냠냠 먹어볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#4E342E",
      },
      {
        colorId: "brown",
        primary: "#5D4037",
        secondary: "#D7CCC8",
        accent: "#3E2723",
      },
      {
        colorId: "white",
        primary: "#FFFFFF", // 순백 화이트
        secondary: "#F5F5F5", // 크림빛 라이트 그레이
        accent: "#D7CCC8", // 은은한 베이지 포인트
      },
      {
        colorId: "pink",
        primary: "#EC407A",
        secondary: "#F8BBD0",
        accent: "#AD1457",
      },
      {
        colorId: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        colorId: "orange",
        primary: "#FFA726",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
    ],
  },
  {
    id: "box",
    name: "상자",
    topCategory: "living",
    subCategory: "daily",
    svgKey: "box",
    shapes: ["square"],
    description: "무엇이 들어 있을까요? 두근두근 상자를 열어볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#BCAAA4",
        secondary: "#D7CCC8",
        accent: "#5D4037",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#B71C1C",
      },
      {
        colorId: "orange",
        primary: "#FF9800",
        secondary: "#FFE0B2",
        accent: "#E65100",
      },
      {
        colorId: "yellow",
        primary: "#FFEE58",
        secondary: "#FFFDE7",
        accent: "#F57F17",
      },
      {
        colorId: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#1B5E20",
      },
      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#0D47A1",
      },
      {
        colorId: "purple",
        primary: "#AB47BC",
        secondary: "#E1BEE7",
        accent: "#4A148C",
      },
      {
        colorId: "black",
        primary: "#424242",
        secondary: "#BDBDBD",
        accent: "#212121",
      },
      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#EEEEEE",
        accent: "#9E9E9E",
      },
      {
        colorId: "pink",
        primary: "#F48FB1",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },
      {
        colorId: "brown",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#4E342E",
      },
    ],
  },
  {
    id: "book",
    name: "책",
    topCategory: "living",
    subCategory: "stationery",
    svgKey: "book",
    shapes: ["square"],
    description:
      "재미있는 이야기가 가득한 책이에요! 어떤 이야기가 숨어 있을까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#8D6E63",
        secondary: "#FAFAFA",
        accent: "#5D4037",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FAFAFA",
        accent: "#B71C1C",
      },
      {
        colorId: "orange",
        primary: "#FFA726",
        secondary: "#FAFAFA",
        accent: "#E65100",
      },
      {
        colorId: "yellow",
        primary: "#FFEE58",
        secondary: "#FAFAFA",
        accent: "#F57F17",
      },
      {
        colorId: "green",
        primary: "#66BB6A",
        secondary: "#FAFAFA",
        accent: "#1B5E20",
      },
      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#FAFAFA",
        accent: "#0D47A1",
      },
      {
        colorId: "purple",
        primary: "#AB47BC",
        secondary: "#FAFAFA",
        accent: "#4A148C",
      },
      {
        colorId: "black",
        primary: "#424242",
        secondary: "#FAFAFA",
        accent: "#212121",
      },
      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#FFFFFF",
        accent: "#9E9E9E",
      },
      {
        colorId: "pink",
        primary: "#F48FB1",
        secondary: "#FAFAFA",
        accent: "#C2185B",
      },
      {
        colorId: "brown",
        primary: "#6D4C41",
        secondary: "#FAFAFA",
        accent: "#3E2723",
      },
    ],
  },
  {
    id: "window",
    name: "창문",
    topCategory: "living",
    subCategory: "daily",
    svgKey: "window",
    shapes: ["square"],
    description: "창문 밖으로 무엇이 보이나요? 살짝 들여다볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#A1887F",
        secondary: "#ECEFF1", // 파스텔 그레이
        accent: "#4E342E",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFEBEE", // 파스텔 핑크
        accent: "#B71C1C",
      },
      {
        colorId: "orange",
        primary: "#FF9800",
        secondary: "#FFF3E0", // 파스텔 오렌지
        accent: "#E65100",
      },
      {
        colorId: "yellow",
        primary: "#FFE082",
        secondary: "#FFFDE7", // 파스텔 옐로우
        accent: "#FF8F00",
      },
      {
        colorId: "green",
        primary: "#81C784",
        secondary: "#E8F5E9", // 파스텔 그린
        accent: "#2E7D32",
      },
      {
        colorId: "blue",
        primary: "#64B5F6",
        secondary: "#E3F2FD", // 파스텔 블루
        accent: "#1565C0",
      },
      {
        colorId: "purple",
        primary: "#BA68C8",
        secondary: "#F3E5F5", // 파스텔 퍼플
        accent: "#7B1FA2",
      },
      {
        colorId: "black",
        primary: "#424242",
        secondary: "#F5F5F5", // 라이트 그레이
        accent: "#212121",
      },
      {
        colorId: "white",
        primary: "#FAFAFA", // 화이트
        secondary: "#F5F5F5", // 순백
        accent: "#BDBDBD", // 연한 회색 포인트
      },
      {
        colorId: "pink",
        primary: "#F48FB1",
        secondary: "#FCE4EC", // 파스텔 핑크
        accent: "#AD1457",
      },
      {
        colorId: "brown",
        primary: "#6D4C41",
        secondary: "#D7CCC8", // 파스텔 브라운
        accent: "#3E2723",
      },
    ],
  },
  {
    id: "window1",
    name: "창문",
    topCategory: "living",
    subCategory: "daily",
    svgKey: "window1",
    shapes: ["square"],
    description: "네모난 창문이 활짝 열렸어요! 창밖에는 무엇이 있을까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#4FC3F7",
        secondary: "#E0F7FA",
        accent: "#0288D1",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFEBEE",
        accent: "#B71C1C",
      },
      {
        colorId: "orange",
        primary: "#FFB74D",
        secondary: "#FFF3E0",
        accent: "#E65100",
      },
      {
        colorId: "yellow",
        primary: "#FFE082",
        secondary: "#FFFDE7",
        accent: "#FF8F00",
      },
      {
        colorId: "green",
        primary: "#81C784",
        secondary: "#E8F5E9",
        accent: "#2E7D32",
      },
      {
        colorId: "blue",
        primary: "#4FC3F7",
        secondary: "#E0F7FA",
        accent: "#0288D1",
      },
      {
        colorId: "purple",
        primary: "#BA68C8",
        secondary: "#F3E5F5",
        accent: "#7B1FA2",
      },
      {
        colorId: "black",
        primary: "#424242", // 블랙 프레임
        secondary: "#F5F5F5", // 라이트 그레이 화면
        accent: "#212121", // 딥 블랙 포인트
      },
      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#F5F5F5",
        accent: "#90A4AE",
      },
      {
        colorId: "pink",
        primary: "#F48FB1",
        secondary: "#FCE4EC",
        accent: "#AD1457",
      },
      {
        colorId: "brown",
        primary: "#BCAAA4",
        secondary: "#D7CCC8",
        accent: "#5D4037",
      },
    ],
  },
  {
    id: "calendar",
    name: "달력",
    topCategory: "living",
    subCategory: "stationery",
    svgKey: "calendar",
    shapes: ["square"],
    description: "오늘은 며칠일까요? 달력에서 오늘 날짜를 찾아볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#FAFAFA",
        secondary: "#FFEBEE",
        accent: "#E53935",
      },
      {
        colorId: "red",
        primary: "#FAFAFA",
        secondary: "#FFEBEE",
        accent: "#E53935",
      },
      {
        colorId: "orange",
        primary: "#FAFAFA",
        secondary: "#FFF3E0",
        accent: "#EF6C00",
      },
      {
        colorId: "yellow",
        primary: "#FAFAFA",
        secondary: "#FFFDE7",
        accent: "#FDD835",
      },
      {
        colorId: "green",
        primary: "#FAFAFA",
        secondary: "#E8F5E9",
        accent: "#43A047",
      },
      {
        colorId: "blue",
        primary: "#FAFAFA",
        secondary: "#E3F2FD",
        accent: "#1E88E5",
      },
      {
        colorId: "purple",
        primary: "#FAFAFA",
        secondary: "#F3E5F5",
        accent: "#8E24AA",
      },
      {
        colorId: "black",
        primary: "#FAFAFA",
        secondary: "#ECEFF1",
        accent: "#263238",
      },
      {
        colorId: "white",
        primary: "#FFFFFF",
        secondary: "#F5F5F5",
        accent: "#9E9E9E",
      },
      {
        colorId: "pink",
        primary: "#FAFAFA",
        secondary: "#FCE4EC",
        accent: "#D81B60",
      },
      {
        colorId: "brown",
        primary: "#FAFAFA",
        secondary: "#EFEBE9",
        accent: "#6D4C41",
      },
    ],
  },
  {
    id: "bread",
    name: "식빵",
    topCategory: "food",
    subCategory: "snack",
    svgKey: "bread",
    shapes: ["square"],
    description: "폭신폭신 고소한 식빵이에요! 한 조각 냠냠 먹어볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#FFD54F",
        secondary: "#FFF8E1",
        accent: "#8D6E63",
      },
      {
        colorId: "orange",
        primary: "#FFB74D",
        secondary: "#FFF3E0",
        accent: "#E65100",
      },
      {
        colorId: "yellow",
        primary: "#FFD54F",
        secondary: "#FFF8E1",
        accent: "#8D6E63",
      },
      {
        colorId: "green",
        primary: "#81C784",
        secondary: "#E8F5E9",
        accent: "#2E7D32",
      },
      {
        colorId: "pink",
        primary: "#FF80AB",
        secondary: "#FFF8E1",
        accent: "#C2185B",
      },
      {
        colorId: "brown",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#3E2723",
      },
      {
        colorId: "white",
        primary: "#FFFFFF", // 순백색 빵
        secondary: "#F5F5F5", // 라이트 그레이 음영
        accent: "#A1887F", // 크러스트(빵 테두리) 포인트
      },
    ],
  },
  {
    id: "microwave",
    name: "전자레인지",
    topCategory: "living",
    subCategory: "kitchen",
    svgKey: "microwave",
    shapes: ["square"],
    description: "윙윙! 맛있는 음식을 따뜻하게 데워주는 전자레인지예요.",
    variants: [
      {
        colorId: "natural",
        primary: "#FAFAFA",
        secondary: "#CFD8DC",
        accent: "#37474F",
      },
      {
        colorId: "red",
        primary: "#E53935",
        secondary: "#FFCDD2",
        accent: "#B71C1C",
      },
      {
        colorId: "orange",
        primary: "#FF9800",
        secondary: "#FFE0B2",
        accent: "#E65100",
      },
      {
        colorId: "yellow",
        primary: "#FFD54F",
        secondary: "#FFF9C4",
        accent: "#F57F17",
      },
      {
        colorId: "green",
        primary: "#4CAF50", // 비비드 그린
        secondary: "#C8E6C9", // 파스텔 그린
        accent: "#2E7D32", // 딥 그린 포인트
      },
      {
        colorId: "blue",
        primary: "#64B5F6",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },
      {
        colorId: "black",
        primary: "#37474F",
        secondary: "#78909C",
        accent: "#212121",
      },
      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#CFD8DC",
        accent: "#37474F",
      },
      {
        colorId: "pink",
        primary: "#F48FB1",
        secondary: "#FCE4EC",
        accent: "#AD1457",
      },
      {
        colorId: "brown",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#4E342E",
      },
    ],
  },
  {
    id: "pillow",
    name: "쿠션",
    topCategory: "living",
    subCategory: "furniture",
    svgKey: "pillow",
    shapes: ["square"],
    description: "폭신폭신 편안한 쿠션이에요! 포근하게 안아볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#D7CCC8",
        secondary: "#EFEBE9",
        accent: "#5D4037",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#B71C1C",
      },
      {
        colorId: "orange",
        primary: "#FFB74D",
        secondary: "#FFE0B2",
        accent: "#E65100",
      },
      {
        colorId: "yellow",
        primary: "#FFF59D",
        secondary: "#FFFDE7",
        accent: "#F57F17",
      },
      {
        colorId: "green",
        primary: "#A5D6A7",
        secondary: "#E8F5E9",
        accent: "#2E7D32",
      },
      {
        colorId: "blue",
        primary: "#90CAF9",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },
      {
        colorId: "purple",
        primary: "#E1BEE7",
        secondary: "#F3E5F5",
        accent: "#7B1FA2",
      },
      {
        colorId: "black",
        primary: "#424242",
        secondary: "#757575",
        accent: "#212121",
      },
      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#F5F5F5",
        accent: "#B0BEC5",
      },
      {
        colorId: "pink",
        primary: "#F8BBD0",
        secondary: "#FFEBEE",
        accent: "#C2185B",
      },
      {
        colorId: "brown",
        primary: "#D7CCC8",
        secondary: "#EFEBE9",
        accent: "#5D4037",
      },
    ],
  },
  {
    id: "tv",
    name: "텔레비전",
    topCategory: "living",
    subCategory: "electronics",
    svgKey: "tv",
    shapes: ["square"],
    description: "재미있는 이야기가 나오는 텔레비전이에요! 무엇을 보고 싶나요?",
    variants: [
      {
        colorId: "natural",
        primary: "#212121",
        secondary: "#80DEEA",
        accent: "#000000",
      },
      {
        colorId: "red",
        primary: "#E53935",

        secondary: "#FFEBEE", // 라이트 핑크로 수정
        accent: "#B71C1C",
      },
      {
        colorId: "orange",
        primary: "#FF9800",
        secondary: "#FFF3E0",
        accent: "#E65100",
      },
      {
        colorId: "yellow",
        primary: "#FFD54F",
        secondary: "#FFF9C4",
        accent: "#F57F17",
      },
      {
        colorId: "green",
        primary: "#66BB6A",
        secondary: "#E8F5E9",
        accent: "#1B5E20",
      },
      {
        colorId: "blue",
        primary: "#64B5F6",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },
      {
        colorId: "purple",
        primary: "#AB47BC",
        secondary: "#EDE7F6",
        accent: "#4A148C",
      },
      {
        colorId: "black",
        primary: "#212121",
        secondary: "#CFD8DC",
        accent: "#000000",
      },

      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#CFD8DC",
        accent: "#757575",
      },
      {
        colorId: "pink",
        primary: "#F48FB1",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },

      {
        colorId: "brown",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#3E2723",
      },
    ],
  },
  {
    id: "giftBox",
    name: "선물상자",
    topCategory: "living",
    subCategory: "daily",
    svgKey: "giftBox",
    shapes: ["square"],
    description: "두근두근! 예쁜 선물상자 안에는 무엇이 들어 있을까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#E53935",
        secondary: "#FFCDD2",
        accent: "#8D6E63", // 자연스러운 브라운톤
      },
      {
        colorId: "red",
        primary: "#E53935",
        secondary: "#FFCDD2",
        accent: "#B71C1C", // 딥 레드
      },
      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFE0B2",
        accent: "#EF6C00", // 진한 오렌지
      },
      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFFDE7",
        accent: "#FBC02D", // 골드 옐로우
      },
      {
        colorId: "green",
        primary: "#43A047",
        secondary: "#C8E6C9",
        accent: "#2E7D32", // 딥 그린
      },
      {
        colorId: "blue",
        primary: "#1E88E5",
        secondary: "#BBDEFB",
        accent: "#1565C0", // 네이비 블루
      },
      {
        colorId: "purple",
        primary: "#8E24AA",
        secondary: "#E1BEE7",
        accent: "#6A1B9A", // 딥 퍼플
      },
      {
        colorId: "black",
        primary: "#424242",
        secondary: "#BDBDBD",
        accent: "#212121", // 블랙 계열
      },
      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#F5F5F5",
        accent: "#9E9E9E", // 그레이 포인트
      },
      {
        colorId: "pink",
        primary: "#F06292",
        secondary: "#FCE4EC",
        accent: "#C2185B", // 로즈 핑크
      },
      {
        colorId: "brown",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#5D4037", // 딥 브라운
      },
    ],
  },

  {
    id: "giftBox1",
    name: "선물상자",
    topCategory: "living",
    subCategory: "daily",
    svgKey: "giftBox1",
    shapes: ["square"],
    description: "짜잔! 선물상자가 도착했어요. 얼른 열어보고 싶지 않나요?",
    variants: [
      {
        colorId: "natural",
        primary: "#E53935",
        secondary: "#FFCDD2",
        accent: "#8D6E63", // 자연스러운 브라운톤
      },
      {
        colorId: "red",
        primary: "#E53935",
        secondary: "#FFCDD2",
        accent: "#B71C1C", // 딥 레드
      },
      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFE0B2",
        accent: "#EF6C00", // 진한 오렌지
      },
      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFFDE7",
        accent: "#FBC02D", // 골드 옐로우
      },
      {
        colorId: "green",
        primary: "#43A047",
        secondary: "#C8E6C9",
        accent: "#2E7D32", // 딥 그린
      },
      {
        colorId: "blue",
        primary: "#1E88E5",
        secondary: "#BBDEFB",
        accent: "#1565C0", // 네이비 블루
      },
      {
        colorId: "purple",
        primary: "#8E24AA",
        secondary: "#E1BEE7",
        accent: "#6A1B9A", // 딥 퍼플
      },
      {
        colorId: "black",
        primary: "#424242",
        secondary: "#BDBDBD",
        accent: "#212121", // 블랙 계열
      },
      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#F5F5F5",
        accent: "#9E9E9E", // 그레이 포인트
      },
      {
        colorId: "pink",
        primary: "#F06292",
        secondary: "#FCE4EC",
        accent: "#C2185B", // 로즈 핑크
      },
      {
        colorId: "brown",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#5D4037", // 딥 브라운
      },
    ],
  },
  {
    id: "squareClock",
    name: "네모 시계",
    topCategory: "living",
    subCategory: "daily",
    svgKey: "squareClock",
    shapes: ["square"],
    description: "똑딱똑딱! 네모난 시계가 시간을 알려주고 있어요.",
    variants: [
      {
        colorId: "natural",
        primary: "#F5F5F5",
        secondary: "#CFD8DC",
        accent: "#263238",
      },
      {
        colorId: "red",
        primary: "#E53935",
        secondary: "#FFEBEE",
        accent: "#B71C1C",
      },
      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFF3E0",
        accent: "#E65100",
      },
      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFFDE7",
        accent: "#F57F17",
      },
      {
        colorId: "green",
        primary: "#43A047",
        secondary: "#E8F5E9",
        accent: "#1B5E20",
      },
      {
        colorId: "blue",
        primary: "#1E88E5",
        secondary: "#E3F2FD",
        accent: "#0D47A1",
      },
      {
        colorId: "purple",
        primary: "#8E24AA",
        secondary: "#F3E5F5",
        accent: "#4A148C",
      },
      {
        colorId: "black",
        primary: "#212121",
        secondary: "#9E9E9E",
        accent: "#000000",
      },
      {
        colorId: "white",
        primary: "#FFFFFF",
        secondary: "#F5F5F5",
        accent: "#9E9E9E",
      },
      {
        colorId: "pink",
        primary: "#EC407A",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },
      {
        colorId: "brown",
        primary: "#6D4C41",
        secondary: "#EFEBE9",
        accent: "#3E2723",
      },
    ],
  },
  {
    id: "door",
    name: "문",
    topCategory: "living",
    subCategory: "daily",
    svgKey: "door",
    shapes: ["square"],
    description: "문 뒤에는 무엇이 있을까요? 살짝 열어볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#A1887F",
        secondary: "#D7CCC8",
        accent: "#6D4C41", // 브라운톤 강화
      },
      {
        colorId: "red",
        primary: "#F44336",
        secondary: "#FFEBEE",
        accent: "#B71C1C", // 비비드 레드
      },
      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFF3E0",
        accent: "#EF6C00", // 선명한 오렌지
      },
      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFFDE7",
        accent: "#FBC02D", // 골드 옐로우
      },
      {
        colorId: "green",
        primary: "#4CAF50",
        secondary: "#E8F5E9",
        accent: "#2E7D32", // 포레스트 그린
      },
      {
        colorId: "blue",
        primary: "#2196F3",
        secondary: "#E3F2FD",
        accent: "#1565C0", // 로열 블루
      },
      {
        colorId: "purple",
        primary: "#9C27B0",
        secondary: "#F3E5F5",
        accent: "#6A1B9A", // 딥 퍼플
      },
      {
        colorId: "black",
        primary: "#212121",
        secondary: "#9E9E9E",
        accent: "#000000", // 블랙 포인트
      },
      {
        colorId: "white",
        primary: "#FFFFFF",
        secondary: "#F5F5F5",
        accent: "#9E9E9E", // 그레이 포인트
      },
      {
        colorId: "pink",
        primary: "#E91E63",
        secondary: "#FCE4EC",
        accent: "#C2185B", // 로즈 핑크
      },
      {
        colorId: "brown",
        primary: "#795548",
        secondary: "#EFEBE9",
        accent: "#4E342E", // 딥 브라운
      },
    ],
  },

  {
    id: "bookshelf",
    name: "책장",
    topCategory: "living",
    subCategory: "furniture",
    svgKey: "bookshelf",
    shapes: ["square"],
    description: "책이 차곡차곡 모여 있는 책장이에요! 어떤 책을 골라볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#A1887F",
        secondary: "#D7CCC8",
        accent: "#EF5350",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#42A5F5",
      },
      {
        colorId: "orange",
        primary: "#FF9800",
        secondary: "#FFE0B2",
        accent: "#42A5F5",
      },
      {
        colorId: "yellow",
        primary: "#FFF59D",
        secondary: "#FFFDE7",
        accent: "#AB47BC",
      },
      {
        colorId: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#FF7043",
      },
      {
        colorId: "blue",
        primary: "#64B5F6",
        secondary: "#E3F2FD",
        accent: "#EF5350",
      },
      {
        colorId: "purple",
        primary: "#AB47BC",
        secondary: "#E1BEE7",
        accent: "#66BB6A",
      },
      {
        colorId: "black",
        primary: "#424242",
        secondary: "#BDBDBD",
        accent: "#42A5F5",
      },
      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#ECEFF1",
        accent: "#42A5F5",
      },
      {
        colorId: "pink",
        primary: "#F48FB1",
        secondary: "#FCE4EC",
        accent: "#26A69A",
      },
      {
        colorId: "brown",
        primary: "#5D4037",
        secondary: "#8D6E63",
        accent: "#66BB6A",
      },
    ],
  },
  {
    id: "refrigerator",
    name: "냉장고",
    topCategory: "living",
    subCategory: "kitchen",
    svgKey: "refrigerator",
    shapes: ["square"],
    description: "시원한 음식들이 가득한 냉장고예요! 안에는 무엇이 있을까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#FAFAFA",
        secondary: "#E0F7FA",
        accent: "#B0BEC5", // 기본 유지
      },
      {
        colorId: "red",
        primary: "#F44336",
        secondary: "#FFEBEE",
        accent: "#B71C1C", // 비비드 레드
      },
      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFF3E0",
        accent: "#EF6C00", // 선명한 오렌지
      },
      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFFDE7",
        accent: "#FBC02D", // 골드 옐로우
      },
      {
        colorId: "green",
        primary: "#4CAF50",
        secondary: "#E8F5E9",
        accent: "#2E7D32", // 포레스트 그린
      },
      {
        colorId: "blue",
        primary: "#2196F3",
        secondary: "#E3F2FD",
        accent: "#1565C0", // 로열 블루
      },
      {
        colorId: "black",
        primary: "#212121",
        secondary: "#9E9E9E",
        accent: "#000000", // 블랙 포인트
      },
      {
        colorId: "white",
        primary: "#FFFFFF",
        secondary: "#F5F5F5",
        accent: "#9E9E9E", // 그레이 포인트
      },
      {
        colorId: "pink",
        primary: "#E91E63",
        secondary: "#FCE4EC",
        accent: "#C2185B", // 로즈 핑크
      },
      {
        colorId: "brown",
        primary: "#795548",
        secondary: "#EFEBE9",
        accent: "#4E342E", // 딥 브라운
      },
    ],
  },
  {
    id: "laptop",
    name: "노트북",
    topCategory: "living",
    subCategory: "electronics",
    svgKey: "laptop",
    shapes: ["square"],
    description: "톡톡! 재미있는 이야기를 만들 수 있는 노트북이에요.",
    variants: [
      {
        colorId: "natural",
        primary: "#CFD8DC", // 라이트 그레이
        secondary: "#ECEFF1", // 파스텔 그레이
        accent: "#37474F",
      },
      {
        colorId: "red",
        primary: "#EF5350", // 파스텔 레드
        secondary: "#FFEBEE", // 라이트 핑크
        accent: "#B71C1C",
      },
      {
        colorId: "orange",
        primary: "#FF9800", // 파스텔 오렌지
        secondary: "#FFE0B2", // 라이트 오렌지
        accent: "#E65100",
      },
      {
        colorId: "yellow",
        primary: "#FFD54F", // 파스텔 옐로우
        secondary: "#FFF9C4", // 라이트 옐로우
        accent: "#FBC02D",
      },
      {
        colorId: "green",
        primary: "#66BB6A", // 파스텔 그린
        secondary: "#E8F5E9", // 라이트 그린
        accent: "#2E7D32",
      },
      {
        colorId: "blue",
        primary: "#90CAF9", // 파스텔 블루
        secondary: "#E3F2FD", // 라이트 블루
        accent: "#1565C0",
      },
      {
        colorId: "purple",
        primary: "#B388FF", // 파스텔 퍼플
        secondary: "#EDE7F6", // 라이트 퍼플
        accent: "#512DA8",
      },
      {
        colorId: "black",
        primary: "#212121", // 블랙
        secondary: "#B0BEC5", // 파스텔 그레이
        accent: "#000000",
      },
      {
        colorId: "white",
        primary: "#FAFAFA", // 화이트
        secondary: "#F5F5F5", // 라이트 그레이
        accent: "#78909C",
      },
      {
        colorId: "pink",
        primary: "#F8BBD0", // 파스텔 핑크
        secondary: "#FCE4EC", // 라이트 핑크
        accent: "#C2185B",
      },
      {
        colorId: "brown",
        primary: "#795548", // 브라운
        secondary: "#D7CCC8", // 파스텔 브라운
        accent: "#3E2723",
      },
    ],
  },

  {
    id: "calculator",
    name: "계산기",
    topCategory: "living",
    subCategory: "electronics",
    svgKey: "calculator",
    shapes: ["square"],
    description: "숫자를 톡톡 누르면 계산을 척척 해주는 계산기예요!",
    variants: [
      {
        colorId: "natural",
        primary: "#78909C",
        secondary: "#C8E6C9",
        accent: "#263238", // 기본 유지
      },
      {
        colorId: "red",
        primary: "#F44336",
        secondary: "#FFEBEE",
        accent: "#B71C1C", // 비비드 레드
      },
      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFF3E0",
        accent: "#EF6C00", // 선명한 오렌지
      },
      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFFDE7",
        accent: "#FBC02D", // 골드 옐로우
      },
      {
        colorId: "green",
        primary: "#4CAF50",
        secondary: "#E8F5E9",
        accent: "#2E7D32", // 포레스트 그린
      },
      {
        colorId: "blue",
        primary: "#2196F3",
        secondary: "#E3F2FD",
        accent: "#1565C0", // 로열 블루
      },
      {
        colorId: "purple",
        primary: "#9C27B0",
        secondary: "#F3E5F5",
        accent: "#6A1B9A", // 딥 퍼플
      },
      {
        colorId: "black",
        primary: "#212121",
        secondary: "#9E9E9E",
        accent: "#000000", // 블랙 포인트
      },
      {
        colorId: "white",
        primary: "#FFFFFF",
        secondary: "#F5F5F5",
        accent: "#9E9E9E", // 그레이 포인트
      },
      {
        colorId: "pink",
        primary: "#E91E63",
        secondary: "#FCE4EC",
        accent: "#C2185B", // 로즈 핑크
      },
      {
        colorId: "brown",
        primary: "#795548",
        secondary: "#EFEBE9",
        accent: "#4E342E", // 딥 브라운
      },
    ],
  },
  {
    id: "squareCakeSlice",
    name: "조각케이크",
    topCategory: "food",
    subCategory: "snack",
    svgKey: "squareCakeSlice",
    shapes: ["square"],
    description: "달콤한 케이크 한 조각이에요! 어떤 맛일 것 같나요?",
    variants: [
      {
        colorId: "natural",
        primary: "#FF80AB", // 딸기 크림
        secondary: "#FFF8E1", // 바닐라 크림
        accent: "#D50000", // 딸기 포인트
      },
      {
        colorId: "red",
        primary: "#F44336", // 딸기 케이크
        secondary: "#FFEBEE", // 연한 크림
        accent: "#B71C1C", // 딥 레드 포인트
      },
      {
        colorId: "orange",
        primary: "#FB8C00", // 오렌지 케이크
        secondary: "#FFE0B2", // 라이트 오렌지 크림
        accent: "#EF6C00", // 진한 오렌지 포인트
      },
      {
        colorId: "yellow",
        primary: "#FDD835", // 치즈 케이크 메인 노랑
        secondary: "#FFFDE7", // 라이트 옐로우 크림
        accent: "#FBC02D", // 골드 옐로우 포인트
      },
      {
        colorId: "green",
        primary: "#81C784", // 녹차 케이크
        secondary: "#E8F5E9", // 라이트 그린 크림
        accent: "#2E7D32", // 딥 그린 포인트
      },
      {
        colorId: "purple",
        primary: "#9C27B0", // 블루베리/포도 케이크
        secondary: "#EDE7F6", // 라이트 퍼플 크림
        accent: "#6A1B9A", // 딥 퍼플 포인트
      },
      {
        colorId: "brown",
        primary: "#6D4C41", // 초코 케이크
        secondary: "#EFEBE9", // 라이트 브라운 크림
        accent: "#3E2723", // 딥 초코 포인트
      },
      {
        colorId: "white",
        primary: "#FFFFFF", // 바닐라 케이크
        secondary: "#FFF8E1", // 크림 베이스
        accent: "#9E9E9E", // 그레이 포인트
      },
    ],
  },
  {
    id: "squareSunglasses",
    name: "사각 선글라스",
    topCategory: "living",
    subCategory: "daily",
    svgKey: "squareSunglasses",
    shapes: ["square"],
    description: "네모난 선글라스를 쓰면 멋쟁이로 변신! 누가 써볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#212121",
        secondary: "#616161",
        accent: "#000000",
      },
      {
        colorId: "red",
        primary: "#FF1744",
        secondary: "#FFCDD2",
        accent: "#B71C1C",
      },
      {
        colorId: "orange",
        primary: "#FF9800",
        secondary: "#FFE0B2",
        accent: "#E65100",
      },
      {
        colorId: "yellow",
        primary: "#FFD54F",
        secondary: "#FFF9C4",
        accent: "#F57F17",
      },
      {
        colorId: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        colorId: "blue",
        primary: "#40C4FF",
        secondary: "#E0F7FA",
        accent: "#0288D1",
      },
      {
        colorId: "purple",
        primary: "#AB47BC",
        secondary: "#F3E5F5",
        accent: "#6A1B9A",
      },
      {
        colorId: "black",
        primary: "#212121",
        secondary: "#616161",
        accent: "#000000",
      },
      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#B0BEC5",
        accent: "#37474F",
      },
      {
        colorId: "pink",
        primary: "#F48FB1",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },
      {
        colorId: "brown",
        primary: "#A1887F",
        secondary: "#D7CCC8",
        accent: "#3E2723",
      },
    ],
  },
  {
    id: "phone",
    name: "휴대폰",
    topCategory: "living",
    subCategory: "electronics",
    svgKey: "phone",
    shapes: ["square"],
    description: "띠링띠링! 누가 전화를 걸어왔을까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#212121",
        secondary: "#80DEEA",
        accent: "#000000", // 그대로 유지
      },
      {
        colorId: "red",
        primary: "#F44336",
        secondary: "#FFEBEE",
        accent: "#B71C1C", // 비비드 레드
      },
      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFF3E0",
        accent: "#EF6C00", // 선명한 오렌지
      },
      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFFDE7",
        accent: "#FBC02D", // 골드 옐로우
      },
      {
        colorId: "green",
        primary: "#4CAF50",
        secondary: "#E8F5E9",
        accent: "#2E7D32", // 포레스트 그린
      },
      {
        colorId: "blue",
        primary: "#2196F3",
        secondary: "#E3F2FD",
        accent: "#1565C0", // 로열 블루
      },
      {
        colorId: "purple",
        primary: "#9C27B0",
        secondary: "#F3E5F5",
        accent: "#6A1B9A", // 딥 퍼플
      },
      {
        colorId: "black",
        primary: "#212121",
        secondary: "#9E9E9E",
        accent: "#000000", // 블랙 포인트
      },
      {
        colorId: "white",
        primary: "#FFFFFF",
        secondary: "#F5F5F5",
        accent: "#9E9E9E", // 그레이 포인트
      },
      {
        colorId: "pink",
        primary: "#E91E63",
        secondary: "#FCE4EC",
        accent: "#C2185B", // 로즈 핑크
      },
      {
        colorId: "brown",
        primary: "#795548",
        secondary: "#EFEBE9",
        accent: "#4E342E", // 딥 브라운
      },
    ],
  },
  {
    id: "remoteControl",
    name: "리모콘",
    topCategory: "living",
    subCategory: "electronics",
    svgKey: "remoteControl",
    shapes: ["square"],
    description: "톡톡 버튼을 누르면 TV가 움직여요! 무엇을 틀어볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#424242",
        secondary: "#EF5350",
        accent: "#212121", // 그대로 유지
      },
      {
        colorId: "red",
        primary: "#F44336",
        secondary: "#FFEBEE",
        accent: "#B71C1C", // 비비드 레드
      },
      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFF3E0",
        accent: "#EF6C00", // 선명한 오렌지
      },
      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFFDE7",
        accent: "#FBC02D", // 골드 옐로우
      },
      {
        colorId: "green",
        primary: "#4CAF50",
        secondary: "#E8F5E9",
        accent: "#2E7D32", // 포레스트 그린
      },
      {
        colorId: "blue",
        primary: "#2196F3",
        secondary: "#E3F2FD",
        accent: "#1565C0", // 로열 블루
      },
      {
        colorId: "purple",
        primary: "#9C27B0",
        secondary: "#F3E5F5",
        accent: "#6A1B9A", // 딥 퍼플
      },
      {
        colorId: "black",
        primary: "#212121",
        secondary: "#9E9E9E",
        accent: "#000000", // 블랙 포인트
      },
      {
        colorId: "white",
        primary: "#FFFFFF",
        secondary: "#F5F5F5",
        accent: "#9E9E9E", // 그레이 포인트
      },
      {
        colorId: "pink",
        primary: "#E91E63",
        secondary: "#FCE4EC",
        accent: "#C2185B", // 로즈 핑크
      },
      {
        colorId: "brown",
        primary: "#795548",
        secondary: "#EFEBE9",
        accent: "#4E342E", // 딥 브라운
      },
    ],
  },
  {
    id: "switch",
    name: "스위치",
    topCategory: "living",
    subCategory: "electronics",
    svgKey: "switch",
    shapes: ["square"],
    description: "딸깍! 스위치를 누르면 불이 켜지고 꺼져요.",
    variants: [
      {
        colorId: "natural",
        primary: "#F5F5F5",
        secondary: "#E0F7FA",
        accent: "#9E9E9E",
      },
      {
        colorId: "red",
        primary: "#FF6F61",
        secondary: "#FFEBEE",
        accent: "#C62828",
      },
      {
        colorId: "orange",
        primary: "#FFB74D",
        secondary: "#FFF3E0",
        accent: "#EF6C00",
      },
      {
        colorId: "yellow",
        primary: "#FFF176",
        secondary: "#FFFDE7",
        accent: "#FBC02D",
      },
      {
        colorId: "green",
        primary: "#81C784",
        secondary: "#E8F5E9",
        accent: "#2E7D32",
      },
      {
        colorId: "blue",
        primary: "#64B5F6",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },
      {
        colorId: "purple",
        primary: "#BA68C8",
        secondary: "#F3E5F5",
        accent: "#6A1B9A",
      },
      {
        colorId: "black",
        primary: "#212121",
        secondary: "#ECEFF1",
        accent: "#000000",
      },
      {
        colorId: "white",
        primary: "#FFFFFF",
        secondary: "#F5F5F5",
        accent: "#BDBDBD",
      },
      {
        colorId: "pink",
        primary: "#F48FB1",
        secondary: "#FCE4EC",
        accent: "#AD1457",
      },
      {
        colorId: "brown",
        primary: "#A1887F",
        secondary: "#EFEBE9",
        accent: "#5D4037",
      },
    ],
  },
  {
    id: "frame",
    name: "액자",
    topCategory: "living",
    subCategory: "daily",
    svgKey: "frame",
    shapes: ["square"],
    description:
      "소중한 사진이나 그림을 쏙 넣어두는 액자예요! 무엇을 담아볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#A1887F",
        secondary: "#E0F7FA",
        accent: "#4E342E",
      },
      {
        colorId: "red",
        primary: "#EF5350",

        secondary: "#FFEBEE", // 라이트 핑크로 수정
        accent: "#B71C1C",
      },
      {
        colorId: "orange",
        primary: "#FF9800",
        secondary: "#FFF3E0",
        accent: "#E65100",
      },
      {
        colorId: "yellow",
        primary: "#FFD700",
        secondary: "#FFF9C4",
        accent: "#FF8F00",
      },
      {
        colorId: "green",
        primary: "#66BB6A",
        secondary: "#E8F5E9",
        accent: "#2E7D32",
      },
      {
        colorId: "blue",
        primary: "#90CAF9",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },
      {
        colorId: "purple",
        primary: "#AB47BC",
        secondary: "#F3E5F5",
        accent: "#6A1B9A",
      },
      {
        colorId: "black",
        primary: "#37474F",
        secondary: "#ECEFF1",
        accent: "#212121",
      },
      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#F5F5F5",
        accent: "#90A4AE",
      },
      {
        colorId: "pink",
        primary: "#F8BBD0",
        secondary: "#FFEBEE",
        accent: "#C2185B",
      },
      {
        colorId: "brown",
        primary: "#6D4C41",
        secondary: "#D7CCC8",
        accent: "#3E2723",
      },
    ],
  },
  {
    id: "triangleRuller",

    name: "삼각자",

    topCategory: "living",

    subCategory: "stationery",

    svgKey: "triangleRuller",

    shapes: ["triangle"],

    description: "삐죽삐죽 세모 모양 삼각자예요! 어떤 그림을 그려볼까요?",

    variants: [
      {
        colorId: "natural",
        primary: "#FFF59D",
        secondary: "#FFFDE7",
        accent: "#F57F17",
      },

      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFF9C4",
        accent: "#F57F17",
      },

      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },

      {
        colorId: "pink",
        primary: "#F06292",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },

      {
        colorId: "green",
        primary: "#43A047",
        secondary: "#C8E6C9",
        accent: "#1B5E20",
      },

      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFE0B2",
        accent: "#E65100",
      },

      {
        colorId: "purple",
        primary: "#8E24AA",
        secondary: "#E1BEE7",
        accent: "#4A148C",
      },
    ],
  },
  {
    id: "triangleInstrument",

    name: "트라이앵글",

    topCategory: "living",

    subCategory: "daily",

    svgKey: "triangleInstrument",

    shapes: ["triangle"],

    description: "딩동댕! 맑고 신나는 소리를 내는 트라이앵글이에요.",

    variants: [
      {
        colorId: "natural",
        primary: "#CFD8DC",
        secondary: "#ECEFF1",
        accent: "#455A64",
      },

      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFF9C4",
        accent: "#F57F17",
      },

      {
        colorId: "pink",
        primary: "#F06292",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },

      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },

      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFE0B2",
        accent: "#E65100",
      },

      {
        colorId: "brown",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#5D4037",
      },
    ],
  },
  {
    id: "partyHat",

    name: "파티모자",

    topCategory: "clothing",

    subCategory: "hat",

    svgKey: "partyHat",

    shapes: ["triangle"],

    description: "파티할 준비 완료! 뾰족한 파티모자를 써볼까요?",

    variants: [
      {
        colorId: "natural",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#FDD835",
      },

      {
        colorId: "red",
        primary: "#E53935",
        secondary: "#FFCDD2",
        accent: "#B71C1C",
      },

      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },

      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFF9C4",
        accent: "#F57F17",
      },

      {
        colorId: "purple",
        primary: "#8E24AA",
        secondary: "#E1BEE7",
        accent: "#4A148C",
      },

      {
        colorId: "green",
        primary: "#43A047",
        secondary: "#C8E6C9",
        accent: "#1B5E20",
      },

      {
        colorId: "pink",
        primary: "#F06292",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },
    ],
  },
  {
    id: "christmasTree",

    name: "크리스마스 트리",

    topCategory: "living",

    subCategory: "daily",

    svgKey: "christmasTree",

    shapes: ["triangle"],

    description:
      "반짝반짝 크리스마스 트리가 나타났어요! 어떤 장식을 달아볼까요?",

    variants: [
      {
        colorId: "natural",
        primary: "#2E7D32",
        secondary: "#A5D6A7",
        accent: "#FFD700",
      },

      {
        colorId: "green",
        primary: "#43A047",
        secondary: "#C8E6C9",
        accent: "#1B5E20",
      },

      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#E3F2FD",
        accent: "#E53935",
      },

      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFF9C4",
        accent: "#B71C1C",
      },

      {
        colorId: "pink",
        primary: "#F06292",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },

      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },
    ],
  },
  {
    id: "flag",

    name: "삼각 깃발",

    topCategory: "living",

    subCategory: "daily",

    svgKey: "flag",

    shapes: ["triangle"],

    description: "펄럭펄럭! 바람을 타고 삼각 깃발이 춤을 춰요.",

    variants: [
      {
        colorId: "natural",
        primary: "#E53935",
        secondary: "#FFCDD2",
        accent: "#B71C1C",
      },

      {
        colorId: "red",
        primary: "#E53935",
        secondary: "#FFCDD2",
        accent: "#B71C1C",
      },

      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },

      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFF9C4",
        accent: "#F57F17",
      },

      {
        colorId: "green",
        primary: "#43A047",
        secondary: "#C8E6C9",
        accent: "#1B5E20",
      },

      {
        colorId: "pink",
        primary: "#F06292",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },

      {
        colorId: "purple",
        primary: "#8E24AA",
        secondary: "#E1BEE7",
        accent: "#4A148C",
      },
    ],
  },
  {
    id: "triangleSandwich",
    name: "샌드위치",
    topCategory: "food",
    subCategory: "meal",
    svgKey: "triangleSandwich",
    shapes: ["triangle"],
    description: "세모로 자른 맛있는 샌드위치예요! 한입 크게 냠냠!",
    variants: [
      {
        colorId: "natural",
        primary: "#FFF8E1", // 빵 베이스 (바닐라톤)
        secondary: "#F5DEB3", // 파스텔 베이지 (식빵 느낌)
        accent: "#81C784", // 상추 포인트
      },
      {
        colorId: "red",
        primary: "#E53935", // 토마토/햄
        secondary: "#FFCDD2", // 파스텔 레드
        accent: "#B71C1C", // 딥 레드 포인트
      },
      {
        colorId: "yellow",
        primary: "#FDD835", // 치즈
        secondary: "#FFF9C4", // 파스텔 옐로우
        accent: "#FBC02D", // 골드 옐로우 포인트
      },
      {
        colorId: "green",
        primary: "#43A047", // 상추/야채
        secondary: "#C8E6C9", // 파스텔 그린
        accent: "#2E7D32", // 딥 그린 포인트
      },
      {
        colorId: "brown",
        primary: "#8D6E63", // 구운 빵
        secondary: "#D7CCC8", // 파스텔 브라운
        accent: "#5D4037", // 딥 브라운 포인트
      },
    ],
  },
  {
    id: "triangleKimbap",

    name: "삼각김밥",

    topCategory: "food",

    subCategory: "meal",

    svgKey: "triangleKimbap",

    shapes: ["triangle"],

    description: "뾰족한 삼각김밥이 짠! 속에는 무엇이 들어 있을까요?",

    variants: [
      {
        colorId: "natural",
        primary: "#212121",
        secondary: "#FAFAFA",
        accent: "#E53935",
      },

      {
        colorId: "black",
        primary: "#424242",
        secondary: "#B0BEC5",
        accent: "#212121",
      },

      {
        colorId: "brown",
        primary: "#5D4037",
        secondary: "#EFEBE9",
        accent: "#3E2723",
      },
    ],
  },
  {
    id: "pyramid",

    name: "피라미드",

    topCategory: "living",

    subCategory: "daily",

    svgKey: "pyramid",

    shapes: ["triangle"],

    description:
      "아주 오래된 피라미드가 나타났어요! 안에는 어떤 비밀이 있을까요?",

    variants: [
      {
        colorId: "natural",
        primary: "#FFE082",
        secondary: "#FFF8E1",
        accent: "#FF8F00",
      },

      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFF9C4",
        accent: "#F57F17",
      },

      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFE0B2",
        accent: "#E65100",
      },

      {
        colorId: "purple",
        primary: "#8E24AA",
        secondary: "#E1BEE7",
        accent: "#4A148C",
      },

      {
        colorId: "brown",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#5D4037",
      },

      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },
    ],
  },
  {
    id: "tent",

    name: "텐트",

    topCategory: "living",

    subCategory: "daily",

    svgKey: "tent",

    shapes: ["triangle"],

    description: "숲속에 아늑한 텐트가 있어요! 여기서 하룻밤 자볼까요?",

    variants: [
      {
        colorId: "natural",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#1B5E20",
      },

      {
        colorId: "green",
        primary: "#43A047",
        secondary: "#C8E6C9",
        accent: "#1B5E20",
      },

      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFE0B2",
        accent: "#E65100",
      },

      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },

      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFF9C4",
        accent: "#F57F17",
      },

      {
        colorId: "pink",
        primary: "#F06292",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },

      {
        colorId: "red",
        primary: "#E53935",
        secondary: "#FFCDD2",
        accent: "#B71C1C",
      },
    ],
  },
  {
    id: "mountain",

    name: "산",

    topCategory: "living",

    subCategory: "daily",

    svgKey: "mountain",

    shapes: ["triangle"],

    description: "높고 멋진 산이 우뚝! 정상까지 올라가 볼까요?",

    variants: [
      {
        colorId: "natural",
        primary: "#66BB6A",
        secondary: "#A5D6A7",
        accent: "#FAFAFA",
      },

      {
        colorId: "green",
        primary: "#43A047",
        secondary: "#C8E6C9",
        accent: "#1B5E20",
      },

      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFE0B2",
        accent: "#E65100",
      },

      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#E3F2FD",
        accent: "#757575",
      },

      {
        colorId: "brown",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#5D4037",
      },

      {
        colorId: "purple",
        primary: "#8E24AA",
        secondary: "#E1BEE7",
        accent: "#4A148C",
      },

      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },
    ],
  },
  {
    id: "sailboat",

    name: "범선",

    topCategory: "vehicle",

    subCategory: "water_vehicle",

    svgKey: "sailboat",

    shapes: ["triangle"],

    description: "바람을 타고 출렁출렁! 범선을 타고 어디로 떠나볼까요?",

    variants: [
      {
        colorId: "natural",
        primary: "#FAFAFA",
        secondary: "#42A5F5",
        accent: "#8D6E63",
      },

      {
        colorId: "red",
        primary: "#E53935",
        secondary: "#FFCDD2",
        accent: "#5D4037",
      },

      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFF9C4",
        accent: "#8D6E63",
      },

      {
        colorId: "green",
        primary: "#43A047",
        secondary: "#C8E6C9",
        accent: "#5D4037",
      },

      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFE0B2",
        accent: "#5D4037",
      },

      {
        colorId: "pink",
        primary: "#F06292",
        secondary: "#FCE4EC",
        accent: "#8D6E63",
      },

      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#E3F2FD",
        accent: "#5D4037",
      },
    ],
  },
  {
    id: "triangleCookie",

    name: "세모 쿠키",

    topCategory: "food",

    subCategory: "snack",

    svgKey: "triangleCookie",

    shapes: ["triangle"],

    description: "세모 모양의 바삭바삭 쿠키예요! 냠냠 한입 먹어볼까요?",

    variants: [
      {
        colorId: "natural",
        primary: "#FFD54F",
        secondary: "#FFF8E1",
        accent: "#8D6E63",
      },

      {
        colorId: "brown",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#5D4037",
      },

      {
        colorId: "green",
        primary: "#43A047",
        secondary: "#C8E6C9",
        accent: "#1B5E20",
      },

      {
        colorId: "pink",
        primary: "#F06292",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },

      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFE0B2",
        accent: "#E65100",
      },

      {
        colorId: "black",
        primary: "#424242",
        secondary: "#B0BEC5",
        accent: "#212121",
      },
    ],
  },
  {
    id: "watermelonSlice",

    name: "수박 조각",

    topCategory: "food",

    subCategory: "fruit",

    svgKey: "watermelonSlice",

    shapes: ["triangle"],

    description: "시원한 수박 한 조각이에요! 아삭! 한입 먹어볼까요?",

    variants: [
      {
        colorId: "natural",
        primary: "#EF5350",
        secondary: "#43A047",
        accent: "#212121",
      },

      {
        colorId: "red",
        primary: "#E53935",
        secondary: "#C8E6C9",
        accent: "#212121",
      },

      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#43A047",
        accent: "#212121",
      },

      {
        colorId: "pink",
        primary: "#F06292",
        secondary: "#66BB6A",
        accent: "#424242",
      },

      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#43A047",
        accent: "#212121",
      },
    ],
  },
  {
    id: "pizzaSlice",
    name: "피자 조각",
    topCategory: "food",
    subCategory: "meal",
    svgKey: "pizzaSlice",
    shapes: ["triangle"],
    description: "치즈가 쭈욱 늘어나는 피자 한 조각! 냠냠 먹어볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#FFD54F", // 치즈 노랑
        secondary: "#D7CCC8", // 도우 베이지
        accent: "#E53935", // 토마토 소스
      },
      {
        colorId: "yellow",
        primary: "#FDD835", // 치즈 노랑
        secondary: "#FFF9C4", // 연한 치즈
        accent: "#F57F17", // 구워진 치즈 포인트
      },
      {
        colorId: "red",
        primary: "#E53935", // 토마토 소스
        secondary: "#FFCDD2", // 연한 소스
        accent: "#B71C1C", // 딥 레드 포인트
      },
      {
        colorId: "green",
        primary: "#43A047", // 채소 토핑
        secondary: "#C8E6C9", // 연한 채소
        accent: "#1B5E20", // 진한 채소 포인트
      },
      {
        colorId: "orange",
        primary: "#FB8C00", // 치즈+토핑 오렌지
        secondary: "#FFE0B2", // 구워진 도우
        accent: "#E65100", // 진한 오렌지 포인트
      },
      {
        colorId: "brown",
        primary: "#8D6E63", // 도우 브라운
        secondary: "#D7CCC8", // 연한 도우
        accent: "#5D4037", // 딥 브라운 포인트
      },
    ],
  },
  {
    id: "heartCookie",

    name: "하트 쿠키",

    topCategory: "food",

    subCategory: "snack",

    svgKey: "heartCookie",

    shapes: ["heart"],

    description: "사랑을 담은 하트 쿠키예요! 누구에게 선물하고 싶나요?",

    variants: [
      {
        colorId: "natural",
        primary: "#FFD54F",
        secondary: "#FFF8E1",
        accent: "#8D6E63",
      },

      {
        colorId: "pink",
        primary: "#F06292",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },

      {
        colorId: "brown",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#5D4037",
      },

      {
        colorId: "red",
        primary: "#E53935",
        secondary: "#FFCDD2",
        accent: "#B71C1C",
      },

      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#FFF8E1",
        accent: "#C2185B",
      },

      {
        colorId: "purple",
        primary: "#8E24AA",
        secondary: "#E1BEE7",
        accent: "#4A148C",
      },
    ],
  },
  {
    id: "heartBalloon",

    name: "하트 풍선",

    topCategory: "living",

    subCategory: "daily",

    svgKey: "heartBalloon",

    shapes: ["heart"],

    description: "하트 모양 풍선이 둥실둥실! 사랑을 가득 담아 날려볼까요?",

    variants: [
      {
        colorId: "natural",
        primary: "#E53935",
        secondary: "#FFCDD2",
        accent: "#B71C1C",
      },

      {
        colorId: "pink",
        primary: "#F06292",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },

      {
        colorId: "purple",
        primary: "#8E24AA",
        secondary: "#E1BEE7",
        accent: "#4A148C",
      },

      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFF9C4",
        accent: "#F57F17",
      },

      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },

      {
        colorId: "green",
        primary: "#43A047",
        secondary: "#C8E6C9",
        accent: "#1B5E20",
      },
    ],
  },
  {
    id: "heartLollipop",

    name: "하트 사탕",

    topCategory: "food",

    subCategory: "snack",

    svgKey: "heartLollipop",

    shapes: ["heart"],

    description: "달콤한 하트 사탕이에요! 누구와 나눠 먹고 싶나요?",

    variants: [
      {
        colorId: "natural",
        primary: "#E53935",
        secondary: "#FFCDD2",
        accent: "#B71C1C",
      },

      {
        colorId: "pink",
        primary: "#F06292",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },

      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFE0B2",
        accent: "#E65100",
      },

      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFF9C4",
        accent: "#F57F17",
      },

      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },

      {
        colorId: "purple",
        primary: "#8E24AA",
        secondary: "#E1BEE7",
        accent: "#4A148C",
      },
    ],
  },
  {
    id: "heartPillow",

    name: "하트 쿠션",

    topCategory: "living",

    subCategory: "furniture",

    svgKey: "heartPillow",

    shapes: ["heart"],

    description: "폭신폭신 하트 쿠션이에요! 꼭 안아보고 싶지 않나요?",

    variants: [
      {
        colorId: "natural",
        primary: "#F8BBD0",
        secondary: "#FFEBEE",
        accent: "#C2185B",
      },

      {
        colorId: "red",
        primary: "#E53935",
        secondary: "#FFCDD2",
        accent: "#B71C1C",
      },

      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFF9C4",
        accent: "#F57F17",
      },

      {
        colorId: "purple",
        primary: "#8E24AA",
        secondary: "#E1BEE7",
        accent: "#4A148C",
      },

      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },

      {
        colorId: "green",
        primary: "#43A047",
        secondary: "#C8E6C9",
        accent: "#1B5E20",
      },
    ],
  },
  {
    id: "heartCake",

    name: "하트 케이크",

    topCategory: "food",

    subCategory: "snack",

    svgKey: "heartCake",

    shapes: ["heart"],

    description: "사랑이 듬뿍 담긴 하트 케이크예요! 누구와 함께 먹을까요?",

    variants: [
      {
        colorId: "natural",
        primary: "#F06292",
        secondary: "#FFF8E1",
        accent: "#D50000",
      },

      {
        colorId: "brown",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#5D4037",
      },

      {
        colorId: "red",
        primary: "#E53935",
        secondary: "#FAFAFA",
        accent: "#B71C1C",
      },

      {
        colorId: "purple",
        primary: "#8E24AA",
        secondary: "#E1BEE7",
        accent: "#4A148C",
      },

      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFF9C4",
        accent: "#F57F17",
      },

      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },
    ],
  },
  {
    id: "heartButton",

    name: "하트 단추",

    topCategory: "living",

    subCategory: "daily",

    svgKey: "heartButton",

    shapes: ["heart"],

    description: "앙증맞은 하트 단추예요! 어떤 옷에 달아볼까요?",

    variants: [
      {
        colorId: "natural",
        primary: "#E53935",
        secondary: "#FFCDD2",
        accent: "#B71C1C",
      },

      {
        colorId: "pink",
        primary: "#F06292",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },

      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFF9C4",
        accent: "#F57F17",
      },

      {
        colorId: "purple",
        primary: "#8E24AA",
        secondary: "#E1BEE7",
        accent: "#4A148C",
      },

      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },

      {
        colorId: "green",
        primary: "#43A047",
        secondary: "#C8E6C9",
        accent: "#1B5E20",
      },
    ],
  },
  {
    id: "heartClock",

    name: "하트 시계",

    topCategory: "living",

    subCategory: "daily",

    svgKey: "heartClock",

    shapes: ["heart"],

    description: "하트 모양 시계가 똑딱똑딱! 지금은 몇 시일까요?",

    variants: [
      {
        colorId: "natural",
        primary: "#F5F5F5",
        secondary: "#CFD8DC",
        accent: "#263238",
      },
      {
        colorId: "red",
        primary: "#E53935",
        secondary: "#FFEBEE",
        accent: "#B71C1C",
      },
      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFF3E0",
        accent: "#E65100",
      },
      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFFDE7",
        accent: "#F57F17",
      },
      {
        colorId: "green",
        primary: "#43A047",
        secondary: "#E8F5E9",
        accent: "#1B5E20",
      },
      {
        colorId: "blue",
        primary: "#1E88E5",
        secondary: "#E3F2FD",
        accent: "#0D47A1",
      },
      {
        colorId: "purple",
        primary: "#8E24AA",
        secondary: "#F3E5F5",
        accent: "#4A148C",
      },
      {
        colorId: "black",
        primary: "#212121",
        secondary: "#9E9E9E",
        accent: "#000000",
      },
      {
        colorId: "white",
        primary: "#FFFFFF",
        secondary: "#F5F5F5",
        accent: "#9E9E9E",
      },
      {
        colorId: "pink",
        primary: "#EC407A",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },
      {
        colorId: "brown",
        primary: "#6D4C41",
        secondary: "#EFEBE9",
        accent: "#3E2723",
      },
    ],
  },

  {
    id: "heartSunglasses",

    name: "하트 선글라스",

    topCategory: "living",

    subCategory: "daily",

    svgKey: "heartSunglasses",

    shapes: ["heart"],

    description: "하트 뿅뿅! 멋지고 귀여운 선글라스를 써볼까요?",

    variants: [
      {
        colorId: "natural",
        primary: "#212121",
        secondary: "#616161",
        accent: "#000000",
      },

      {
        colorId: "red",
        primary: "#E53935",
        secondary: "#FFCDD2",
        accent: "#212121",
      },

      {
        colorId: "pink",
        primary: "#F06292",
        secondary: "#FCE4EC",
        accent: "#212121",
      },

      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFF9C4",
        accent: "#212121",
      },

      {
        colorId: "purple",
        primary: "#8E24AA",
        secondary: "#E1BEE7",
        accent: "#212121",
      },

      {
        colorId: "brown",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#3E2723",
      },
    ],
  },
  {
    id: "heartGem",

    name: "하트 보석",

    topCategory: "living",

    subCategory: "daily",

    svgKey: "heartGem",

    shapes: ["heart"],

    description: "반짝반짝 빛나는 하트 보석이에요! 보물을 찾은 것 같아요!",

    variants: [
      {
        colorId: "natural",
        primary: "#E53935",
        secondary: "#FFCDD2",
        accent: "#B71C1C",
      },

      {
        colorId: "pink",
        primary: "#F06292",
        secondary: "#FCE4EC",
        accent: "#AD1457",
      },

      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },

      {
        colorId: "green",
        primary: "#43A047",
        secondary: "#C8E6C9",
        accent: "#1B5E20",
      },

      {
        colorId: "purple",
        primary: "#8E24AA",
        secondary: "#E1BEE7",
        accent: "#4A148C",
      },

      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFF9C4",
        accent: "#F57F17",
      },
    ],
  },
  {
    id: "heartNecklace",

    name: "하트 목걸이",

    topCategory: "clothing",

    subCategory: "clothes",

    svgKey: "heartNecklace",

    shapes: ["heart"],

    description: "반짝이는 하트 목걸이예요! 누구에게 예쁘게 걸어줄까요?",

    variants: [
      {
        colorId: "natural",
        primary: "#FFD54F",
        secondary: "#E53935",
        accent: "#E65100",
      },

      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#F06292",
        accent: "#757575",
      },

      {
        colorId: "pink",
        primary: "#F06292",
        secondary: "#FCE4EC",
        accent: "#AD1457",
      },

      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },

      {
        colorId: "purple",
        primary: "#8E24AA",
        secondary: "#E1BEE7",
        accent: "#4A148C",
      },
    ],
  },
  {
    id: "starCookie",

    name: "별 쿠키",

    topCategory: "food",

    subCategory: "snack",

    svgKey: "starCookie",

    shapes: ["star"],

    description: "반짝이는 별 모양 쿠키예요! 별 하나 냠냠 먹어볼까요?",

    variants: [
      {
        colorId: "natural",
        primary: "#FFD54F",
        secondary: "#FFF8E1",
        accent: "#8D6E63",
      },

      {
        colorId: "brown",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#5D4037",
      },

      {
        colorId: "pink",
        primary: "#F06292",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },

      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#FFF8E1",
        accent: "#C8A951",
      },

      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFF9C4",
        accent: "#F57F17",
      },
    ],
  },
  {
    id: "starBalloon",

    name: "별 풍선",

    topCategory: "living",

    subCategory: "daily",

    svgKey: "starBalloon",

    shapes: ["star"],

    description: "별 모양 풍선이 둥실둥실! 하늘까지 날아갈 수 있을까요?",

    variants: [
      {
        colorId: "natural",
        primary: "#FDD835",
        secondary: "#FFF9C4",
        accent: "#F57F17",
      },

      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },

      {
        colorId: "pink",
        primary: "#F06292",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },

      {
        colorId: "purple",
        primary: "#8E24AA",
        secondary: "#E1BEE7",
        accent: "#4A148C",
      },

      {
        colorId: "green",
        primary: "#43A047",
        secondary: "#C8E6C9",
        accent: "#1B5E20",
      },

      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#ECEFF1",
        accent: "#757575",
      },
    ],
  },
  {
    id: "starBalloon1",

    name: "별 풍선",

    topCategory: "living",

    subCategory: "daily",

    svgKey: "starBalloon1",

    shapes: ["star"],

    description: "반짝반짝 별 풍선이 나타났어요! 어디로 데려가 볼까요?",

    variants: [
      {
        colorId: "natural",
        primary: "#FB8C00",
        secondary: "#FFE0B2",
        accent: "#E65100",
      },

      {
        colorId: "green",
        primary: "#43A047",
        secondary: "#C8E6C9",
        accent: "#1B5E20",
      },

      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },

      {
        colorId: "pink",
        primary: "#F06292",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },

      {
        colorId: "purple",
        primary: "#8E24AA",
        secondary: "#E1BEE7",
        accent: "#4A148C",
      },

      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFF9C4",
        accent: "#F57F17",
      },
    ],
  },

  {
    id: "starWand",

    name: "요술봉",

    topCategory: "living",

    subCategory: "daily",

    svgKey: "starWand",

    shapes: ["star"],

    description: "반짝! 요술봉을 휘두르면 어떤 마법이 나타날까요?",

    variants: [
      {
        colorId: "natural",
        primary: "#FFD54F",
        secondary: "#FFF9C4",
        accent: "#FF8F00",
      },

      {
        colorId: "pink",
        primary: "#F06292",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },

      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },

      {
        colorId: "purple",
        primary: "#8E24AA",
        secondary: "#E1BEE7",
        accent: "#4A148C",
      },

      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#ECEFF1",
        accent: "#757575",
      },

      {
        colorId: "red",
        primary: "#E53935",
        secondary: "#FFCDD2",
        accent: "#B71C1C",
      },
    ],
  },
  {
    id: "starPillow",

    name: "별 쿠션",

    topCategory: "living",

    subCategory: "furniture",

    svgKey: "starPillow",

    shapes: ["star"],

    description: "폭신폭신 별 쿠션이에요! 꼭 안고 꿈나라로 가볼까요?",

    variants: [
      {
        colorId: "natural",
        primary: "#FFF59D",
        secondary: "#FFFDE7",
        accent: "#F57F17",
      },

      {
        colorId: "pink",
        primary: "#F06292",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },

      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },

      {
        colorId: "purple",
        primary: "#8E24AA",
        secondary: "#E1BEE7",
        accent: "#4A148C",
      },

      {
        colorId: "green",
        primary: "#43A047",
        secondary: "#C8E6C9",
        accent: "#1B5E20",
      },

      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#F5F5F5",
        accent: "#757575",
      },
    ],
  },
  {
    id: "starfish",

    name: "불가사리",

    topCategory: "animal",

    subCategory: "sea_animal",

    svgKey: "starfish",

    shapes: ["star"],

    description:
      "바닷속에 별처럼 생긴 불가사리가 있어요! 어디에 숨어 있을까요?",

    variants: [
      {
        colorId: "natural",
        primary: "#FF7043",
        secondary: "#FFCCBC",
        accent: "#D84315",
      },

      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFF9C4",
        accent: "#F57F17",
      },

      {
        colorId: "red",
        primary: "#E53935",
        secondary: "#FFCDD2",
        accent: "#B71C1C",
      },

      {
        colorId: "pink",
        primary: "#F06292",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },

      {
        colorId: "purple",
        primary: "#8E24AA",
        secondary: "#E1BEE7",
        accent: "#4A148C",
      },

      {
        colorId: "brown",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#5D4037",
      },
    ],
  },
  {
    id: "starButton",

    name: "별 단추",

    topCategory: "living",

    subCategory: "daily",

    svgKey: "starButton",

    shapes: ["star"],

    description: "반짝이는 별 단추예요! 어떤 옷에 달아주면 예쁠까요?",

    variants: [
      {
        colorId: "natural",
        primary: "#FDD835",
        secondary: "#FFF9C4",
        accent: "#F57F17",
      },

      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },

      {
        colorId: "pink",
        primary: "#F06292",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },

      {
        colorId: "purple",
        primary: "#8E24AA",
        secondary: "#E1BEE7",
        accent: "#4A148C",
      },

      {
        colorId: "green",
        primary: "#43A047",
        secondary: "#C8E6C9",
        accent: "#1B5E20",
      },

      {
        colorId: "red",
        primary: "#E53935",
        secondary: "#FFCDD2",
        accent: "#B71C1C",
      },
    ],
  },
  {
    id: "starClock",

    name: "별 시계",

    topCategory: "living",

    subCategory: "daily",

    svgKey: "starClock",

    shapes: ["star"],

    description: "별 모양 시계가 똑딱똑딱! 오늘은 몇 시일까요?",

    variants: [
      {
        colorId: "natural",
        primary: "#F5F5F5",
        secondary: "#CFD8DC",
        accent: "#263238",
      },
      {
        colorId: "red",
        primary: "#E53935",
        secondary: "#FFEBEE",
        accent: "#B71C1C",
      },
      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFF3E0",
        accent: "#E65100",
      },
      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFFDE7",
        accent: "#F57F17",
      },
      {
        colorId: "green",
        primary: "#43A047",
        secondary: "#E8F5E9",
        accent: "#1B5E20",
      },
      {
        colorId: "blue",
        primary: "#1E88E5",
        secondary: "#E3F2FD",
        accent: "#0D47A1",
      },
      {
        colorId: "purple",
        primary: "#8E24AA",
        secondary: "#F3E5F5",
        accent: "#4A148C",
      },
      {
        colorId: "black",
        primary: "#212121",
        secondary: "#9E9E9E",
        accent: "#000000",
      },
      {
        colorId: "white",
        primary: "#FFFFFF",
        secondary: "#F5F5F5",
        accent: "#9E9E9E",
      },
      {
        colorId: "pink",
        primary: "#EC407A",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },
      {
        colorId: "brown",
        primary: "#6D4C41",
        secondary: "#EFEBE9",
        accent: "#3E2723",
      },
    ],
  },
  {
    id: "starCake",

    name: "별 케이크",

    topCategory: "food",

    subCategory: "snack",

    svgKey: "starCake",

    shapes: ["star"],

    description: "별처럼 반짝이는 케이크예요! 특별한 날에 먹고 싶어요!",

    variants: [
      {
        colorId: "natural",
        primary: "#FDD835",
        secondary: "#FFF8E1",
        accent: "#F57F17",
      },

      {
        colorId: "pink",
        primary: "#F06292",
        secondary: "#FFF8E1",
        accent: "#D50000",
      },

      {
        colorId: "brown",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#5D4037",
      },

      {
        colorId: "purple",
        primary: "#8E24AA",
        secondary: "#E1BEE7",
        accent: "#4A148C",
      },

      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#FFFDE7",
        accent: "#F57F17",
      },

      {
        colorId: "green",
        primary: "#43A047",
        secondary: "#C8E6C9",
        accent: "#1B5E20",
      },
    ],
  },

  {
    id: "starOrnament",

    name: "별 장식",

    topCategory: "living",

    subCategory: "daily",

    svgKey: "starOrnament",

    shapes: ["star"],

    description: "반짝반짝 예쁜 별 장식이에요! 어디에 걸어볼까요?",

    variants: [
      {
        colorId: "natural",
        primary: "#FFD54F",
        secondary: "#FFF9C4",
        accent: "#FF8F00",
      },

      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#ECEFF1",
        accent: "#757575",
      },

      {
        colorId: "red",
        primary: "#E53935",
        secondary: "#FFCDD2",
        accent: "#B71C1C",
      },

      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },

      {
        colorId: "pink",
        primary: "#F06292",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },

      {
        colorId: "purple",
        primary: "#8E24AA",
        secondary: "#E1BEE7",
        accent: "#4A148C",
      },
    ],
  },
  {
    id: "starSunglasses",

    name: "별 선글라스",

    topCategory: "living",

    subCategory: "daily",

    svgKey: "starSunglasses",

    shapes: ["star"],

    description: "별 모양 선글라스를 쓰면 나도 반짝반짝 스타!",

    variants: [
      {
        colorId: "natural",
        primary: "#212121",
        secondary: "#616161",
        accent: "#000000",
      },

      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFF9C4",
        accent: "#212121",
      },

      {
        colorId: "pink",
        primary: "#F06292",
        secondary: "#FCE4EC",
        accent: "#212121",
      },

      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#E3F2FD",
        accent: "#212121",
      },

      {
        colorId: "red",
        primary: "#E53935",
        secondary: "#FFCDD2",
        accent: "#212121",
      },

      {
        colorId: "purple",
        primary: "#8E24AA",
        secondary: "#E1BEE7",
        accent: "#212121",
      },
    ],
  },

  {
    id: "starNecklace",
    name: "별 목걸이",
    topCategory: "clothing",
    subCategory: "clothes",
    svgKey: "starNecklace",
    shapes: ["star"],
    description: "반짝이는 별 목걸이예요! 목에 걸면 멋진 별처럼 변신!",
    variants: [
      {
        colorId: "natural",
        primary: "#FFD54F", // 골드 스타
        secondary: "#FFF9C4", // 라이트 옐로우
        accent: "#FF8F00", // 골드 포인트
      },
      {
        colorId: "white",
        primary: "#FFFFFF", // 실버 스타
        secondary: "#ECEFF1", // 라이트 그레이
        accent: "#9E9E9E", // 그레이 포인트
      },
      {
        colorId: "blue",
        primary: "#2196F3", // 블루 스타
        secondary: "#E3F2FD", // 라이트 블루
        accent: "#1565C0", // 로열 블루 포인트
      },
      {
        colorId: "purple",
        primary: "#9C27B0", // 퍼플 스타
        secondary: "#E1BEE7", // 라이트 퍼플
        accent: "#6A1B9A", // 딥 퍼플 포인트
      },
    ],
  },
  {
    id: "medal",
    name: "메달",
    topCategory: "living",
    subCategory: "daily",
    svgKey: "medal",
    shapes: ["star"],
    description: "짜잔! 멋진 메달을 받았어요. 오늘의 최고 주인공은 누구일까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#FFD54F", // 금메달 노랑
        secondary: "#E53935", // 레드 리본
        accent: "#FF8F00", // 골드 포인트
      },
      {
        colorId: "white",
        primary: "#FAFAFA", // 은메달 화이트
        secondary: "#E0E0E0", // 라이트 그레이
        accent: "#9E9E9E", // 그레이 포인트
      },
      {
        colorId: "brown",
        primary: "#795548", // 청동 브라운
        secondary: "#D7CCC8", // 연한 브라운
        accent: "#5D4037", // 딥 브라운 포인트
      },
      {
        colorId: "red",
        primary: "#F44336", // 레드 리본
        secondary: "#FFEBEE", // 연한 레드
        accent: "#B71C1C", // 딥 레드 포인트
      },
      {
        colorId: "blue",
        primary: "#2196F3", // 블루 리본
        secondary: "#E3F2FD", // 연한 블루
        accent: "#1565C0", // 로열 블루 포인트
      },
    ],
  },
  {
    id: "button1",
    name: "단추",
    topCategory: "living",
    subCategory: "daily",
    svgKey: "button1",
    shapes: ["circle"],
    description:
      "옷에 꼭 붙어 있는 동그란 단추예요! 내 옷에는 어떤 단추가 있을까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#5D4037", // 브라운톤 강화
      },
      {
        colorId: "red",
        primary: "#F44336",
        secondary: "#FFEBEE",
        accent: "#B71C1C", // 딥 레드
      },
      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFE0B2",
        accent: "#EF6C00", // 진한 오렌지
      },
      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFFDE7",
        accent: "#FBC02D", // 골드 옐로우
      },
      {
        colorId: "green",
        primary: "#4CAF50",
        secondary: "#E8F5E9",
        accent: "#2E7D32", // 포레스트 그린
      },
      {
        colorId: "blue",
        primary: "#2196F3",
        secondary: "#E3F2FD",
        accent: "#1565C0", // 로열 블루
      },
      {
        colorId: "purple",
        primary: "#9C27B0",
        secondary: "#F3E5F5",
        accent: "#6A1B9A", // 딥 퍼플
      },
      {
        colorId: "black",
        primary: "#212121",
        secondary: "#9E9E9E",
        accent: "#000000", // 블랙 포인트
      },
      {
        colorId: "white",
        primary: "#FFFFFF",
        secondary: "#F5F5F5",
        accent: "#9E9E9E", // 그레이 포인트
      },
      {
        colorId: "pink",
        primary: "#E91E63",
        secondary: "#FCE4EC",
        accent: "#C2185B", // 로즈 핑크
      },
      {
        colorId: "brown",
        primary: "#795548",
        secondary: "#EFEBE9",
        accent: "#4E342E", // 딥 브라운
      },
    ],
  },
  {
    id: "button2",
    name: "단추",
    topCategory: "living",
    subCategory: "daily",
    svgKey: "button2",
    shapes: ["circle"],
    description: "동글동글 귀여운 단추예요! 어떤 색 옷에 달아볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#5D4037", // 브라운톤 강화
      },
      {
        colorId: "red",
        primary: "#F44336",
        secondary: "#FFEBEE",
        accent: "#B71C1C", // 딥 레드
      },
      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFE0B2",
        accent: "#EF6C00", // 진한 오렌지
      },
      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFFDE7",
        accent: "#FBC02D", // 골드 옐로우
      },
      {
        colorId: "green",
        primary: "#4CAF50",
        secondary: "#E8F5E9",
        accent: "#2E7D32", // 포레스트 그린
      },
      {
        colorId: "blue",
        primary: "#2196F3",
        secondary: "#E3F2FD",
        accent: "#1565C0", // 로열 블루
      },
      {
        colorId: "purple",
        primary: "#9C27B0",
        secondary: "#F3E5F5",
        accent: "#6A1B9A", // 딥 퍼플
      },
      {
        colorId: "black",
        primary: "#212121",
        secondary: "#9E9E9E",
        accent: "#000000", // 블랙 포인트
      },
      {
        colorId: "white",
        primary: "#FFFFFF",
        secondary: "#F5F5F5",
        accent: "#9E9E9E", // 그레이 포인트
      },
      {
        colorId: "pink",
        primary: "#E91E63",
        secondary: "#FCE4EC",
        accent: "#C2185B", // 로즈 핑크
      },
      {
        colorId: "brown",
        primary: "#795548",
        secondary: "#EFEBE9",
        accent: "#4E342E", // 딥 브라운
      },
    ],
  },
  {
    id: "circleClock",
    name: "동그란 시계",
    topCategory: "living",
    subCategory: "daily",
    svgKey: "circleClock",
    shapes: ["circle"],
    description: "똑딱똑딱! 동그란 시계가 지금 몇 시인지 알려주고 있어요.",
    variants: [
      {
        colorId: "natural",
        primary: "#F5F5F5",
        secondary: "#CFD8DC",
        accent: "#263238",
      },
      {
        colorId: "red",
        primary: "#E53935",
        secondary: "#FFEBEE",
        accent: "#B71C1C",
      },
      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFF3E0",
        accent: "#E65100",
      },
      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFFDE7",
        accent: "#F57F17",
      },
      {
        colorId: "green",
        primary: "#43A047",
        secondary: "#E8F5E9",
        accent: "#1B5E20",
      },
      {
        colorId: "blue",
        primary: "#1E88E5",
        secondary: "#E3F2FD",
        accent: "#0D47A1",
      },
      {
        colorId: "purple",
        primary: "#8E24AA",
        secondary: "#F3E5F5",
        accent: "#4A148C",
      },
      {
        colorId: "black",
        primary: "#212121",
        secondary: "#9E9E9E",
        accent: "#000000",
      },
      {
        colorId: "white",
        primary: "#FFFFFF",
        secondary: "#F5F5F5",
        accent: "#9E9E9E",
      },
      {
        colorId: "pink",
        primary: "#EC407A",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },
      {
        colorId: "brown",
        primary: "#6D4C41",
        secondary: "#EFEBE9",
        accent: "#3E2723",
      },
    ],
  },
  {
    id: "lollipop",
    name: "막대사탕",
    topCategory: "food",
    subCategory: "snack",
    svgKey: "lollipop",
    shapes: ["circle"],
    description: "달콤한 막대사탕이 짠! 어떤 맛의 사탕처럼 보이나요?",
    variants: [
      {
        colorId: "natural",
        primary: "#FF80AB",
        secondary: "#F8BBD0",
        accent: "#C2185B",
      },
      {
        colorId: "red",
        primary: "#F44336", // 비비드 레드
        secondary: "#FFCDD2", // 파스텔 레드
        accent: "#B71C1C", // 딥 레드 포인트
      },
      {
        colorId: "orange",
        primary: "#FF9100",
        secondary: "#FFE0B2",
        accent: "#DD2C00",
      },
      {
        colorId: "yellow",
        primary: "#FFEB3B",
        secondary: "#FFFDE7",
        accent: "#F57F17",
      },
      {
        colorId: "green",
        primary: "#76FF03",
        secondary: "#F1F8E9",
        accent: "#33691E",
      },
      {
        colorId: "blue",
        primary: "#00B0FF",
        secondary: "#E0F7FA",
        accent: "#00838F",
      },
      {
        colorId: "purple",
        primary: "#E040FB",
        secondary: "#EDE7F6",
        accent: "#6A1B9A",
      },
      {
        colorId: "white",
        primary: "#FFFFFF",
        secondary: "#F5F5F5",
        accent: "#BDBDBD",
      },
      {
        colorId: "pink",
        primary: "#FF80AB",
        secondary: "#F8BBD0",
        accent: "#C2185B",
      },
      {
        colorId: "brown",
        primary: "#795548",
        secondary: "#D7CCC8",
        accent: "#4E342E",
      },
    ],
  },
];

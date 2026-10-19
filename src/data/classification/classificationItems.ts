import { ClassificationItem } from "../../types/game";

export const classificationItems: ClassificationItem[] = [
  {
    id: "steamLocomotive",
    name: "증기기관차",
    topCategory: "vehicle",
    subCategory: "rail_vehicle",
    svgKey: "steamLocomotive",
    shapes: [],
    description: "칙칙폭폭 증기를 뿜으며 철길을 달리는 귀여운 증기기관차예요.",
    variants: [
      {
        colorId: "natural", // 그린 본체 테마 -> 골드 디테일 & 스카이 블루 윈도우
        primary: "#4D9B79",
        secondary: "#D9B75C",
        accent: "#C9EAF6",
      },
      {
        colorId: "pink", // 핑크 계열 -> 로즈 그레이
        primary: "#F2A7B8",
        secondary: "#FFCCBC",
        accent: "#C5868B",
      },
      {
        colorId: "blue", // 블루 계열 -> 블루 그레이
        primary: "#65A9E8",
        secondary: "#FFE082",
        accent: "#8B9DAE",
      },
      {
        colorId: "yellow", // 옐로우 계열 -> 옐로우 베이지 그레이
        primary: "#FFD54F",
        secondary: "#81C784",
        accent: "#9E9552",
      },
    ],
  },
  {
    id: "freightTrain",
    name: "화물열차",
    topCategory: "vehicle",
    subCategory: "rail_vehicle",
    svgKey: "freightTrain",
    shapes: [],
    description:
      "철도 위로 무거운 짐과 상자들을 가득 싣고 달리는 튼튼한 화물열차예요.",
    variants: [
      {
        colorId: "natural", // 본래의 자연스러운 그린 테마
        primary: "#6BAA83",
        secondary: "#E8BD73",
        accent: "#6B8A70",
      },
      {
        colorId: "pink", // 핑크 계열 톤온톤
        primary: "#F2A7B8",
        secondary: "#FFCCBC",
        accent: "#C5868B",
      },
      {
        colorId: "blue", // 💙 완벽한 블루 계열 (시원한 블루 + 하늘빛 보조색 + 블루그레이 엑센트)
        primary: "#65A9E8",
        secondary: "#BBDEFB",
        accent: "#8B9DAE",
      },
      {
        colorId: "yellow", // 💛 완벽한 옐로우 계열 (따뜻한 옐로우 + 연노랑/크림 보조색 + 옐로우그레이 엑센트)
        primary: "#FFD54F",
        secondary: "#FFFDE7",
        accent: "#9E9552",
      },
    ],
  },
  {
    id: "highSpeedTrain",
    name: "고속열차",
    topCategory: "vehicle",
    subCategory: "rail_vehicle",
    svgKey: "highSpeedTrain",
    shapes: [],
    description: "철도 위를 바람처럼 빠르게 달리는 멋진 고속열차예요.",
    variants: [
      {
        colorId: "natural", // 스카이 블루 본체 테마 -> 다크 블루그레이 윈도우
        primary: "#58A9D9",
        secondary: "#F5F4EA",
        accent: "#24465D",
      },
      {
        colorId: "pink", // 핑크 계열 -> 로즈 그레이
        primary: "#F2A7B8",
        secondary: "#FFFDF8",
        accent: "#C5868B",
      },
      {
        colorId: "blue", // 블루 계열 -> 블루 그레이
        primary: "#65A9E8",
        secondary: "#E3F2FD",
        accent: "#8B9DAE",
      },
      {
        colorId: "green", // 그린 계열 -> 그린 그레이
        primary: "#81C784",
        secondary: "#E8F5E9",
        accent: "#6B8A70",
      },
    ],
  },
  {
    id: "crane",
    name: "크레인",
    topCategory: "vehicle",
    subCategory: "construction_vehicle",
    svgKey: "crane",
    shapes: [],
    description:
      "높은 곳까지 무거운 물건을 번쩍 들어 올려주는 멋진 크레인이에요.",
    variants: [
      {
        colorId: "natural", // 노란색 본체 테마 -> 블루그레이/그레이 훅
        primary: "#E9B83F",
        secondary: "#F6D66B",
        accent: "#68727D",
      },
      {
        colorId: "pink", // 핑크 계열 -> 로즈 그레이
        primary: "#F2A7B8",
        secondary: "#F8BBD0",
        accent: "#C5868B",
      },
      {
        colorId: "blue", // 블루 계열 -> 블루 그레이
        primary: "#65A9E8",
        secondary: "#90CAF9",
        accent: "#8B9DAE",
      },
      {
        colorId: "green", // 그린 계열 -> 그린 그레이
        primary: "#81C784",
        secondary: "#A5D6A7",
        accent: "#6B8A70",
      },
    ],
  },
  {
    id: "dumpTruck",
    name: "덤프트럭",
    topCategory: "vehicle",
    subCategory: "construction_vehicle",
    svgKey: "dumpTruck",
    shapes: [],
    description:
      "커다란 짐칸에 모래나 흙을 가득 싣고 달리는 멋진 덤프트럭이에요.",
    variants: [
      {
        colorId: "natural", // 노란색 본체 테마 -> 스카이 블루 윈도우/그레이
        primary: "#E9B83F",
        secondary: "#F3C94F",
        accent: "#8B9DAE",
      },
      {
        colorId: "pink", // 핑크 계열 -> 로즈 그레이
        primary: "#F2A7B8",
        secondary: "#F8BBD0",
        accent: "#C5868B",
      },
      {
        colorId: "blue", // 블루 계열 -> 블루 그레이
        primary: "#65A9E8",
        secondary: "#90CAF9",
        accent: "#8B9DAE",
      },
      {
        colorId: "green", // 그린 계열 -> 그린 그레이
        primary: "#81C784",
        secondary: "#A5D6A7",
        accent: "#6B8A70",
      },
    ],
  },
  {
    id: "bulldozer",
    name: "불도저",
    topCategory: "vehicle",
    subCategory: "construction_vehicle",
    svgKey: "bulldozer",
    shapes: [],
    description: "무거운 흙이나 돌을 척척 밀어내는 멋진 불도저예요.",
    variants: [
      {
        colorId: "natural", // 노란색 본체 테마 -> 웜 베이지 그레이
        primary: "#E9B83F",
        secondary: "#68727D",
        accent: "#9E9552",
      },
      {
        colorId: "pink", // 핑크 계열 -> 로즈 그레이
        primary: "#F2A7B8",
        secondary: "#68727D",
        accent: "#C5868B",
      },
      {
        colorId: "blue", // 블루 계열 -> 블루 그레이
        primary: "#65A9E8",
        secondary: "#68727D",
        accent: "#8B9DAE",
      },
      {
        colorId: "green", // 그린 계열 -> 그린 그레이
        primary: "#81C784",
        secondary: "#68727D",
        accent: "#6B8A70",
      },
    ],
  },
  {
    id: "stapler",
    name: "스테이플러",
    topCategory: "things",
    subCategory: "stationery",
    svgKey: "stapler",
    shapes: [],
    description:
      "여러 장의 종이를 단단하게 묶어서 철할 때 사용하는 스테이플러예요.",
    variants: [
      {
        colorId: "natural", // 블루그레이 본체 테마 -> 블루 그레이
        primary: "#8DA7D9",
        secondary: "#AEB8C5",
        accent: "#56657A",
      },
      {
        colorId: "pink", // 핑크 계열 -> 로즈 그레이
        primary: "#F2A7B8",
        secondary: "#C6D0D8",
        accent: "#C5868B",
      },
      {
        colorId: "yellow", // 옐로우 계열 -> 옐로우 베이지 그레이
        primary: "#FFD54F",
        secondary: "#C6D0D8",
        accent: "#9E9552",
      },
      {
        colorId: "green", // 그린 계열 -> 그린 그레이
        primary: "#81C784",
        secondary: "#C6D0D8",
        accent: "#6B8A70",
      },
    ],
  },
  {
    id: "notebook",
    name: "공책",
    topCategory: "things",
    subCategory: "stationery",
    svgKey: "notebook",
    shapes: [],
    description:
      "연필로 글씨를 쓰거나 중요한 내용을 깔끔하게 적어두는 공책이에요.",
    variants: [
      {
        colorId: "natural", // 핑크 계열 -> 로즈 그레이
        primary: "#F2A7B8",
        secondary: "#FFFDF8",
        accent: "#C5868B",
      },
      {
        colorId: "blue", // 블루 계열 -> 블루 그레이
        primary: "#65A9E8",
        secondary: "#FFFDF8",
        accent: "#8B9DAE",
      },
      {
        colorId: "yellow", // 옐로우 계열 -> 옐로우 베이지 그레이
        primary: "#FFD54F",
        secondary: "#FFFDF8",
        accent: "#9E9552",
      },
      {
        colorId: "green", // 그린 계열 -> 그린 그레이
        primary: "#81C784",
        secondary: "#FFFDF8",
        accent: "#6B8A70",
      },
    ],
  },
  {
    id: "sketchbook",
    name: "스케치북",
    topCategory: "things",
    subCategory: "stationery",
    svgKey: "sketchbook",
    shapes: [],
    description:
      "알록달록 예쁜 그림을 마음껏 그리고 색칠할 수 있는 스케치북이에요.",
    variants: [
      {
        colorId: "natural", // 블루/스카이 계열 -> 블루 그레이
        primary: "#79B9E8",
        secondary: "#FFFDF5",
        accent: "#8B9DAE",
      },
      {
        colorId: "pink", // 핑크 계열 -> 로즈 그레이
        primary: "#F08B83",
        secondary: "#FFFDF5",
        accent: "#C5868B",
      },
      {
        colorId: "yellow", // 옐로우 계열 -> 옐로우 베이지 그레이
        primary: "#FFD54F",
        secondary: "#FFFDF5",
        accent: "#9E9552",
      },
      {
        colorId: "green", // 그린 계열 -> 그린 그레이
        primary: "#81C784",
        secondary: "#FFFDF5",
        accent: "#6B8A70",
      },
    ],
  },
  {
    id: "ruler",
    name: "자",
    topCategory: "things",
    subCategory: "stationery",
    svgKey: "ruler",
    shapes: ["square"],
    description:
      "길이를 반듯하게 재거나 곧은 선을 그릴 때 사용하는 노란색 자예요.",
    variants: [
      {
        colorId: "natural", // 화사하고 클래식한 노란색 자 본래의 모습
        primary: "#F4D76B",
        secondary: "#806B35",
        accent: "#FFFFFF", // 깔끔한 구멍 포인트
      },
      {
        colorId: "pink", // 사랑스러운 핑크색 자 테마
        primary: "#F08B83",
        secondary: "#7A4A48",
        accent: "#FFFFFF",
      },
      {
        colorId: "blue", // 시원하고 청량한 스카이 블루 자 테마
        primary: "#65A9E8",
        secondary: "#3C5A78",
        accent: "#FFFFFF",
      },
      {
        colorId: "green", // 산뜻하고 싱그러운 초록색 자 테마
        primary: "#81C784",
        secondary: "#436846",
        accent: "#FFFFFF",
      },
    ],
  },
  {
    id: "pen",
    name: "볼펜",
    topCategory: "things",
    subCategory: "stationery",
    svgKey: "pen",
    shapes: [],
    description:
      "공책에 사각사각 선명한 글씨를 쓸 때 사용하는 깔끔한 볼펜이에요.",
    variants: [
      {
        colorId: "natural", // 시원하고 산뜻한 스카이 블루 펜 본래의 모습
        primary: "#65A9E8",
        secondary: "#DCEAF7",
        accent: "#3C4858", // 딥 블루그레이 잉크/펜촉 톤
      },
      {
        colorId: "pink", // 사랑스러운 핑크빛 볼펜 테마
        primary: "#F08B83",
        secondary: "#FCE4EC",
        accent: "#5C4A4E", // 로즈 그레이 톤
      },
      {
        colorId: "yellow", // 화사하고 발랄한 노란색 볼펜 테마
        primary: "#FFD54F",
        secondary: "#FFFDE7",
        accent: "#5C563B", // 웜 베이지 그레이
      },
      {
        colorId: "green", // 산뜻하고 청량한 민트 그린 볼펜 테마
        primary: "#81C784",
        secondary: "#E8F5E9",
        accent: "#3B5C42", // 뮤트 그린그레이
      },
    ],
  },
  {
    id: "scissors",
    name: "가위",
    topCategory: "things",
    subCategory: "stationery",
    svgKey: "scissors",
    shapes: [],
    description:
      "종이를 반듯하게 오리거나 모양을 자를 때 사용하는 안전한 가위예요.",
    variants: [
      {
        colorId: "natural", // 상큼하고 발랄한 코랄 핑크 손잡이 본래의 모습
        primary: "#F08B83",
        secondary: "#C6D0D8",
        accent: "#E6B94A", // 반짝이는 골드 나사 포인트
      },
      {
        colorId: "blue", // 시원하고 청량한 스카이 블루 가위 테마
        primary: "#64B5F6",
        secondary: "#CFD8DC",
        accent: "#FFD54F", // 옐로우 나사 포인트
      },
      {
        colorId: "yellow", // 상큼하고 화사한 노란색 손잡이 가위 테마
        primary: "#FFD54F",
        secondary: "#B0BEC5",
        accent: "#FF8A80", // 핑크 나사 포인트
      },
      {
        colorId: "green", // 산뜻하고 귀여운 민트 초록 가위 테마
        primary: "#81C784",
        secondary: "#CFD8DC",
        accent: "#FFF176", // 레몬 나사 포인트
      },
    ],
  },
  {
    id: "paperclip",
    name: "클립",
    topCategory: "things",
    subCategory: "stationery",
    svgKey: "paperclip",
    shapes: [],
    description:
      "종이들을 깔끔하게 모아서 묶어둘 때 사용하는 반짝이는 클립이에요.",
    variants: [
      {
        colorId: "natural", // 시크하고 깔끔한 메탈 실버 클립 본래의 모습
        primary: "#8E9BA8",
        secondary: "#FFFFFF",
        accent: "#5C6B78", // 블루그레이 섀도우 톤
      },
      {
        colorId: "pink", // 알록달록 상큼한 핑크 코팅 클립 테마
        primary: "#F48FB1",
        secondary: "#FCE4EC",
        accent: "#9C526B", // 로즈 그레이 톤
      },
      {
        colorId: "blue", // 시원하고 청량한 블루 코팅 클립 테마
        primary: "#64B5F6",
        secondary: "#E3F2FD",
        accent: "#4A709C", // 블루 그레이 톤
      },
      {
        colorId: "yellow", // 발랄하고 화사한 노란색 코팅 클립 테마
        primary: "#FFD54F",
        secondary: "#FFFDE7",
        accent: "#9E8B3B", // 웜 베이지 그레이
      },
    ],
  },
  {
    id: "pencil",
    name: "연필",
    topCategory: "things",
    subCategory: "stationery",
    svgKey: "pencil",
    shapes: [],
    description:
      "공책에 글을 쓰거나 예쁜 그림을 그릴 때 사용하는 노란색 연필이에요.",
    variants: [
      {
        colorId: "natural", // 알록달록하고 발랄한 노란색 연필 본래의 모습
        primary: "#F4C542",
        secondary: "#E9A1A1",
        accent: "#666666", // 시크한 차콜 그레이 심 톤
      },
      {
        colorId: "pink", // 사랑스러운 핑크 연필 테마
        primary: "#FF8A80",
        secondary: "#80CBC4",
        accent: "#7E575C", // 로즈 그레이 톤
      },
      {
        colorId: "blue", // 시원하고 청량한 블루 연필 테마
        primary: "#64B5F6",
        secondary: "#FFD54F",
        accent: "#607D8B", // 블루 그레이 톤
      },
      {
        colorId: "green", // 싱그러운 초록빛 연필 테마
        primary: "#81C784",
        secondary: "#FFB74D",
        accent: "#687D6E", // 뮤트 그린그레이 톤
      },
    ],
  },
  {
    id: "wardrobe",
    name: "옷장",
    topCategory: "things",
    subCategory: "furniture",
    svgKey: "wardrobe",
    shapes: [],
    description:
      "예쁜 옷들과 물건들을 깔끔하게 정리해서 보관할 수 있는 옷장이에요.",
    variants: [
      {
        colorId: "natural", // 포근하고 아기자기한 라벤더 컬러 옷장 본래의 모습
        primary: "#B89AD9",
        secondary: "#D8C5EF",
        accent: "#8F82A0", // 차분한 퍼플 그레이 섀도우 톤
      },
      {
        colorId: "pink", // 사랑스러운 파스텔 핑크 옷장 테마
        primary: "#F8BBD0",
        secondary: "#FCE4EC",
        accent: "#C5868B", // 로즈빛이 감도는 핑크그레이
      },
      {
        colorId: "blue", // 시원하고 화사한 스카이 블루 옷장 테마
        primary: "#90CAF9",
        secondary: "#E3F2FD",
        accent: "#8B9DAE", // 시원한 블루 그레이
      },
      {
        colorId: "brown", // 따뜻하고 차분한 우드 브라운 옷장 테마
        primary: "#D7CCC8",
        secondary: "#EFEBE9",
        accent: "#8D7B73", // 브라운 그레이 (토프 톤)
      },
    ],
  },
  {
    id: "bed",
    name: "침대",
    topCategory: "things",
    subCategory: "furniture",
    svgKey: "bed",
    shapes: [],
    description: "밤에 잠을 자거나 편안하게 누워서 쉴 수 있는 아늑한 침대예요.",
    variants: [
      {
        colorId: "natural", // 포근한 핑크 이불과 원목 프레임 본래의 모습
        primary: "#B98261",
        secondary: "#DDA7B5",
        accent: "#FFF1D6",
      },
      {
        colorId: "pink", // 사랑스러운 올 핑크 테마
        primary: "#E57373",
        secondary: "#FFCDD2",
        accent: "#FCE4EC",
      },
      {
        colorId: "blue", // 시원하고 깔끔한 블루 테마
        primary: "#64B5F6",
        secondary: "#BBDEFB",
        accent: "#E1F5FE",
      },
      {
        colorId: "brown", // 차분하고 아늑한 코코아 브라운 테마
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#EFEBE9",
      },
    ],
  },
  {
    id: "sofa",
    name: "소파",
    topCategory: "things",
    subCategory: "furniture",
    svgKey: "sofa",
    shapes: [],
    description: "거실에서 편안하게 앉아 휴식할 수 있는 푹신한 소파예요.",
    variants: [
      {
        colorId: "natural", // 아늑하고 편안한 민트그레이 소파 본래의 모습
        primary: "#72A7A1",
        secondary: "#A8D5CD",
        accent: "#7A8B89", // 차분한 뮤트 블루그레이 섀도우 톤
      },
      {
        colorId: "pink", // 아기자기한 파스텔 핑크 소파 테마
        primary: "#FFAB91",
        secondary: "#FFCCBC",
        accent: "#B88A82", // 로즈빛이 감도는 핑크그레이
      },
      {
        colorId: "yellow", // 따뜻하고 포근한 옐로우/베이지 소파 테마
        primary: "#FFE082",
        secondary: "#FFECB3",
        accent: "#A69B80", // 웜 베이지 그레이
      },
      {
        colorId: "brown", // 차분하고 부드러운 코코아 소파 테마
        primary: "#BCAAA4",
        secondary: "#D7CCC8",
        accent: "#8C7E78", // 브라운 그레이 (토프 톤)
      },
    ],
  },
  {
    id: "chair",
    name: "의자",
    topCategory: "things",
    subCategory: "furniture",
    svgKey: "chair",
    shapes: [],
    description: "편안하게 앉아서 쉴 수 있는 예쁜 의자에요.",
    variants: [
      {
        colorId: "natural", // 따뜻하고 포근한 원목 의자 본래의 모습
        primary: "#E9A66B",
        secondary: "#F6C98D",
        accent: "#B4A982",
      },
      {
        colorId: "pink", // 아기자기한 파스텔 핑크 의자 테마
        primary: "#F8BBD0",
        secondary: "#FCE4EC",
        accent: "#C5868B",
      },
      {
        colorId: "blue", // 깔끔하고 시원한 스카이 블루 의자 테마
        primary: "#B3E5FC",
        secondary: "#E1F5FE",
        accent: "#90A4AE",
      },
      {
        colorId: "brown", // 차분하고 묵직한 다크 우드 의자 테마
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#8D7B73",
      },
    ],
  },
  {
    id: "desk",
    name: "책상",
    topCategory: "things",
    subCategory: "furniture",
    svgKey: "desk",
    shapes: [],
    description: "공부를 하거나 그림을 그릴 수 있는 아늑한 책상이에요.",
    variants: [
      {
        colorId: "natural", // 따뜻하고 포근한 원목 책상 본래의 모습
        primary: "#DDA15E",
        secondary: "#F2CC8F",
        accent: "#8D5524",
      },
      {
        colorId: "pink", // 아기자기한 파스텔 핑크 책상 테마
        primary: "#F8BBD0",
        secondary: "#FCE4EC",
        accent: "#C5868B",
      },
      {
        colorId: "blue", // 깔끔하고 시원한 스카이 블루 책상 테마
        primary: "#B3E5FC",
        secondary: "#E1F5FE",
        accent: "#81D4FA",
      },
      {
        colorId: "brown", // 차분하고 묵직한 다크 우드 책상 테마
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#4E342E",
      },
    ],
  },
  {
    id: "milk",
    name: "우유 팩",
    topCategory: "food",
    subCategory: "drink",
    svgKey: "milk",
    shapes: [],
    description: "고소하고 영양 만점인 신선한 우유가 담긴 팩이에요.",
    variants: [
      {
        colorId: "natural", // 신선한 흰 우유 및 스카이 블루 라벨 본래의 모습
        primary: "#FFFFFF",
        secondary: "#83B8F7",
        accent: "#90A4AE", // 시원한 블루빛이 감도는 블루그레이
      },
      {
        colorId: "pink", // 달콤상큼한 딸기우유 테마
        primary: "#FFCDD2",
        secondary: "#E57373",
        accent: "#C5868B", // 붉은 기(로즈빛)가 감도는 차분한 핑크그레이
      },
      {
        colorId: "yellow", // 부드럽고 달콤한 바나나우유 테마
        primary: "#FFF9C4",
        secondary: "#FFEE58",
        accent: "#B4A982", // 노란 기가 감도는 웜 그레이 (샌드 그레이)
      },
      {
        colorId: "brown", // 진하고 달콤한 초코우유 테마
        primary: "#D7CCC8",
        secondary: "#8D6E63",
        accent: "#8D7B73", // 갈색빛이 감도는 토프 그레이 (브라운 그레이)
      },
    ],
  },
  {
    id: "juiceBox",
    name: "주스 팩",
    topCategory: "food",
    subCategory: "drink",
    svgKey: "juiceBox",
    shapes: [],
    description: "빨대를 꽂아 톡톡 마시는 상큼한 과일 주스 팩이에요.",
    variants: [
      {
        colorId: "natural", // 상큼한 오렌지 주스 팩 본래의 모습
        primary: "#F9A825",
        secondary: "#FFF8E1",
        accent: "#E53935",
      },
      {
        colorId: "green", // 싱그러운 사과/키위 주스 팩 테마
        primary: "#7CB342",
        secondary: "#F1F8E9",
        accent: "#FF7043",
      },
      {
        colorId: "purple", // 달콤한 포도 주스 팩 테마
        primary: "#8E24AA",
        secondary: "#F3E5F5",
        accent: "#FFCA28",
      },
      {
        colorId: "pink", // 달콤새콤한 복숭아 주스 팩 테마
        primary: "#EC407A",
        secondary: "#FCE4EC",
        accent: "#00ACC1",
      },
    ],
  },
  {
    id: "sodaBottle",
    name: "탄산음료 병",
    topCategory: "food",
    subCategory: "drink",
    svgKey: "sodaBottle",
    shapes: [],
    description: "톡 쏘는 탄산음료가 가득 들어있는 시원한 병이에요.",
    variants: [
      {
        colorId: "natural", // 클래식하고 짜릿한 레드 콜라 병 본래의 모습
        primary: "#D32F2F",
        secondary: "#EF4444",
        accent: "#FFFFFF",
      },
      {
        colorId: "blue", // 시원한 소다맛 블루 병 테마
        primary: "#1E88E5",
        secondary: "#42A5F5",
        accent: "#FFFFFF",
      },
      {
        colorId: "green", // 상큼한 라임/사이다 그린 병 테마
        primary: "#43A047",
        secondary: "#66BB6A",
        accent: "#FFFFFF",
      },
      {
        colorId: "orange", // 상큼달콤한 오렌지 탄산 병 테마
        primary: "#FB8C00",
        secondary: "#FFA726",
        accent: "#FFFFFF",
      },
    ],
  },
  {
    id: "milkBottle",
    name: "우유 병",
    topCategory: "food",
    subCategory: "drink",
    svgKey: "milkBottle",
    shapes: [],
    description: "신선하고 고소한 우유가 담긴 유리 병이에요.",
    variants: [
      {
        colorId: "natural", // 신선한 화이트 계열 병과 파란색 뚜껑 본래의 모습
        primary: "#FFFDF4",
        secondary: "#FFFFFF",
        accent: "#8CC8F4",
      },
      {
        colorId: "pink", // 사랑스러운 핑크빛 딸기우유 병 테마
        primary: "#FCE4EC",
        secondary: "#FFCDD2",
        accent: "#F48FB1",
      },
      {
        colorId: "yellow", // 부드러운 바나나우유 병 테마
        primary: "#FFFDE7",
        secondary: "#FFF9C4",
        accent: "#FFEE58",
      },
      {
        colorId: "brown", // 달콤한 초코우유 병 테마
        primary: "#EFEBE9",
        secondary: "#D7CCC8",
        accent: "#A1887F",
      },
    ],
  },
  {
    id: "drinkingGlass",
    name: "유리잔",
    topCategory: "food",
    subCategory: "drink",
    svgKey: "drinkingGlass",
    shapes: [],
    description: "시원한 물이나 음료를 따라 마실 수 있는 투명한 유리잔이에요.",
    variants: [
      {
        colorId: "natural", // 시원한 물이 담긴 투명한 유리잔 본래의 모습
        primary: "#B8C0C8",
        secondary: "#9ADBF5",
        accent: "#FFFFFF",
      },
      {
        colorId: "yellow", // 상큼한 레몬에이드/노란 주스 테마 (옐로우 계열 조화)
        primary: "#FFE082",
        secondary: "#FFCA28",
        accent: "#FFF8E1",
      },
      {
        colorId: "green", // 시원하고 청량한 민트소다 테마 (그린 계열 조화)
        primary: "#A7FFEB",
        secondary: "#64FFDA",
        accent: "#E0F2F1",
      },
      {
        colorId: "white", // 부드러운 우유가 담긴 테마 (화이트/라이트 그레이 계열 조화)
        primary: "#ECEFF1",
        secondary: "#FFFFFF",
        accent: "#CFD8DC",
      },
    ],
  },
  {
    id: "drinkCan",
    name: "음료 캔",
    topCategory: "food",
    subCategory: "drink",
    svgKey: "drinkCan",
    shapes: [],
    description: "시원하고 톡 쏘는 탄산음료가 담긴 알루미늄 캔이에요.",
    variants: [
      {
        colorId: "natural", // 클래식하고 청량한 레드 캔 본래의 모습
        primary: "#EF4444",
        secondary: "#D5DCE3",
        accent: "#FFFFFF",
      },
      {
        colorId: "blue", // 시원한 소다맛/사이다 블루 캔 테마
        primary: "#3B82F6",
        secondary: "#D5DCE3",
        accent: "#FFFFFF",
      },
      {
        colorId: "green", // 상큼한 라임/그린 소다 캔 테마
        primary: "#10B981",
        secondary: "#D5DCE3",
        accent: "#FFFFFF",
      },
      {
        colorId: "orange", // 상큼달콤한 오렌지 탄산 캔 테마
        primary: "#F97316",
        secondary: "#D5DCE3",
        accent: "#FFFFFF",
      },
    ],
  },
  {
    id: "juice",
    name: "주스 잔",
    topCategory: "food",
    subCategory: "drink",
    svgKey: "juice",
    shapes: [],
    description: "상큼하고 시원한 과일 주스가 가득 담긴 유리잔이에요.",
    variants: [
      {
        colorId: "natural", // 상큼하고 달콤한 오렌지 주스 본래의 모습
        primary: "#FDD166",
        secondary: "#FFFFFF",
        accent: "#E58B27",
      },
      {
        colorId: "orange", // 상큼하고 달콤한 오렌지 주스 본래의 모습
        primary: "#FDD166",
        secondary: "#FFFFFF",
        accent: "#E58B27",
      },
      {
        colorId: "pink", // 달콤새콤한 딸기 주스 테마
        primary: "#F48FB1",
        secondary: "#FFFFFF",
        accent: "#C2185B",
      },
      {
        colorId: "purple", // 진하고 향긋한 포도 주스 테마
        primary: "#CE93D8",
        secondary: "#FFFFFF",
        accent: "#7B1FA2",
      },
      {
        colorId: "green", // 싱그러운 사과 주스 테마
        primary: "#C5E1A5",
        secondary: "#FFFFFF",
        accent: "#689F38",
      },
    ],
  },

  {
    id: "waterBottle",
    name: "물병",
    topCategory: "food",
    subCategory: "drink",
    svgKey: "waterBottle",
    shapes: [],
    description: "목이 마를 때 시원한 물을 마실 수 있는 텀블러 물병이에요.",
    variants: [
      {
        colorId: "natural", // 산뜻하고 청량한 물빛 블루 테마 본래의 모습
        primary: "#BDE3F8",
        secondary: "#78909C",
        accent: "#FFFFFF",
      },
      {
        colorId: "pink", // 사랑스러운 핑크빛 물병 테마
        primary: "#F48FB1",
        secondary: "#EC407A",
        accent: "#FFFFFF",
      },
      {
        colorId: "green", // 싱그러운 민트/그린 테마
        primary: "#A7FFEB",
        secondary: "#00BFA5",
        accent: "#FFFFFF",
      },
      {
        colorId: "yellow", // 밝고 화사한 노란빛 물병 테마
        primary: "#FFF59D",
        secondary: "#FBC02D",
        accent: "#FFFFFF",
      },
    ],
  },
  {
    id: "rainbow",
    name: "무지개",
    topCategory: "nature",
    subCategory: "sky",
    svgKey: "rainbow",
    shapes: [],
    description: "비가 그친 뒤 하늘에 예쁘게 떠오르는 알록달록한 무지개예요.",
    variants: [
      {
        colorId: "natural", // 알록달록한 무지개 본래의 색상과 포근한 구름 테마
        primary: "#E1F5FE", // 구름 색상
        secondary: "#E53935", // 무지개 포인트 색상
        accent: "#212121", // 외곽선 색상
      },
    ],
  },
  {
    id: "flower1",
    name: "꽃",
    topCategory: "nature",
    subCategory: "plant",
    svgKey: "flower1",
    shapes: [],
    description: "알록달록 예쁘고 향기로운 꽃이에요.",
    variants: [
      {
        colorId: "natural", // 따뜻하고 화사한 주황빛 테라코타 꽃 본래의 모습
        primary: "#D85A38",
        secondary: "#4A7C59",
        accent: "#FFF176",
      },
      {
        colorId: "pink", // 사랑스러운 핑크빛 꽃 테마
        primary: "#F48FB1",
        secondary: "#4A7C59",
        accent: "#FFF59D",
      },
      {
        colorId: "yellow", // 싱그러운 노란빛 꽃 테마
        primary: "#FFD54F",
        secondary: "#4A7C59",
        accent: "#FF7043",
      },
      {
        colorId: "purple", // 신비롭고 아기자기한 보라빛 꽃 테마
        primary: "#CE93D8",
        secondary: "#4A7C59",
        accent: "#FFF176",
      },
    ],
  },
  {
    id: "recorder",
    name: "리코더",
    topCategory: "things",
    subCategory: "musical_instrument",
    svgKey: "recorder",
    shapes: [],
    description: "학교 음악 시간에 즐겨 연주하는 맑은 소리의 리코더예요.",
    variants: [
      {
        colorId: "natural", // 아이보리/베이지 브라운 바디 본래의 모습
        primary: "#F5F5F5",
        secondary: "#424242",
        accent: "#FFFFFF",
      },
      {
        colorId: "pink", // 사랑스러운 핑크빛 리코더 테마
        primary: "#F48FB1",
        secondary: "#880E4F",
        accent: "#FCE4EC",
      },
      {
        colorId: "blue", // 시원하고 청량한 블루 계열 리코더 테마
        primary: "#90CAF9",
        secondary: "#0D47A1",
        accent: "#E3F2FD",
      },
      {
        colorId: "purple", // 신비롭고 아기자기한 보라빛 리코더 테마
        primary: "#CE93D8",
        secondary: "#4A148C",
        accent: "#F3E5F5",
      },
    ],
  },
  {
    id: "maracas",
    name: "마라카스",
    topCategory: "things",
    subCategory: "musical_instrument",
    svgKey: "maracas",
    shapes: [],
    description: "흔들면 찰랑찰랑 신나는 소리가 나는 마라카스예요.",
    variants: [
      {
        colorId: "natural", // 알록달록 자연스러운 헤드 및 우드 핸들 본래의 모습
        primary: "#FFB74D",
        secondary: "#8D6E63",
        accent: "#424242",
      },
      {
        colorId: "pink", // 사랑스러운 핑크빛 마라카스 테마
        primary: "#F48FB1",
        secondary: "#EC407A",
        accent: "#880E4F",
      },
      {
        colorId: "blue", // 시원하고 청량한 블루 계열 마라카스 테마
        primary: "#90CAF9",
        secondary: "#42A5F5",
        accent: "#0D47A1",
      },
      {
        colorId: "purple", // 신비롭고 아기자기한 보라빛 마라카스 테마
        primary: "#CE93D8",
        secondary: "#8E24AA",
        accent: "#4A148C",
      },
    ],
  },
  {
    id: "trumpet",
    name: "트럼펫",
    topCategory: "things",
    subCategory: "musical_instrument",
    svgKey: "trumpet",
    shapes: [],
    description: "화려하고 우렁찬 소리를 뽐내는 반짝이는 트럼펫이에요.",
    variants: [
      {
        colorId: "natural", // 황동빛 골드 브라스 본래의 모습
        primary: "#FFD54F",
        secondary: "#FFA000",
        accent: "#424242",
      },
      {
        colorId: "white", // 세련되고 모던한 실버 브라스 테마
        primary: "#B8C0C8",
        secondary: "#90A4AE",
        accent: "#263238",
      },
      {
        colorId: "pink", // 사랑스러운 핑크빛 트럼펫 테마
        primary: "#F48FB1",
        secondary: "#EC407A",
        accent: "#880E4F",
      },
      {
        colorId: "blue", // 시원하고 청량한 블루 계열 트럼펫 테마
        primary: "#90CAF9",
        secondary: "#42A5F5",
        accent: "#0D47A1",
      },
    ],
  },
  {
    id: "harp",
    name: "하프",
    topCategory: "things",
    subCategory: "musical_instrument",
    svgKey: "harp",
    shapes: [],
    description: "우아하고 아름다운 선율을 연주하는 클래식한 하프예요.",
    variants: [
      {
        colorId: "natural", // 클래식한 우드 브라운 프레임 본래의 모습
        primary: "#8D6E63",
        secondary: "#FFF8E1",
        accent: "#424242",
      },
      {
        colorId: "yellow", // 찬란하고 고급스러운 골드 브라스 하프 테마
        primary: "#FFD54F",
        secondary: "#FFFDE7",
        accent: "#424242",
      },
      {
        colorId: "pink", // 사랑스러운 핑크빛 하프 테마
        primary: "#F48FB1",
        secondary: "#FCE4EC",
        accent: "#880E4F",
      },
      {
        colorId: "blue", // 시원하고 청량한 블루 계열 하프 테마
        primary: "#90CAF9",
        secondary: "#E3F2FD",
        accent: "#0D47A1",
      },
    ],
  },
  {
    id: "guitar",
    name: "기타",
    topCategory: "things",
    subCategory: "musical_instrument",
    svgKey: "guitar",
    shapes: [],
    description: "아름다운 선율과 리듬을 연주하는 통기타예요.",
    variants: [
      {
        colorId: "natural", // 클래식한 우드 브라운 바디 본래의 모습
        primary: "#8D6E63",
        secondary: "#5D4037",
        accent: "#424242",
      },
      {
        colorId: "pink", // 사랑스러운 핑크빛 기타 테마
        primary: "#F48FB1",
        secondary: "#C2185B",
        accent: "#880E4F",
      },
      {
        colorId: "blue", // 시원하고 청량한 블루 계열 기타 테마
        primary: "#90CAF9",
        secondary: "#1976D2",
        accent: "#0D47A1",
      },
      {
        colorId: "purple", // 신비롭고 아기자기한 보라빛 기타 테마
        primary: "#CE93D8",
        secondary: "#8E24AA",
        accent: "#4A148C",
      },
    ],
  },
  {
    id: "drumSet",
    name: "드럼 세트",
    topCategory: "things",
    subCategory: "musical_instrument",
    svgKey: "drumSet",
    shapes: [],
    description: "다양한 북과 심벌즈로 신나는 리듬을 연주하는 드럼 세트예요.",
    variants: [
      {
        colorId: "natural", // 모던한 메탈 실버 바디 + 크림빛 북면 본래의 모습
        primary: "#B8C0C8",
        secondary: "#F4D6A0",
        accent: "#424242",
      },
      {
        colorId: "pink", // 사랑스러운 핑크빛 드럼 세트 테마
        primary: "#F48FB1",
        secondary: "#FCE4EC",
        accent: "#880E4F",
      },
      {
        colorId: "blue", // 시원하고 청량한 블루 계열 드럼 세트 테마
        primary: "#90CAF9",
        secondary: "#E3F2FD",
        accent: "#0D47A1",
      },
      {
        colorId: "purple", // 신비롭고 아기자기한 보라빛 드럼 세트 테마
        primary: "#CE93D8",
        secondary: "#F3E5F5",
        accent: "#4A148C",
      },
    ],
  },
  {
    id: "bongo",
    name: "봉고",
    topCategory: "things",
    subCategory: "musical_instrument",
    svgKey: "bongo",
    shapes: [],
    description: "두 개의 북을 손으로 쳐서 신나는 리듬을 연주하는 봉고예요.",
    variants: [
      {
        colorId: "natural", // 따뜻한 우드 브라운 바디 및 가죽 북면 본래의 모습
        primary: "#8D6E63",
        secondary: "#F4D6A0",
        accent: "#424242",
      },
      {
        colorId: "pink", // 사랑스러운 핑크빛 봉고 테마
        primary: "#F48FB1",
        secondary: "#FCE4EC",
        accent: "#880E4F",
      },
      {
        colorId: "blue", // 시원하고 청량한 블루 계열 봉고 테마
        primary: "#90CAF9",
        secondary: "#E3F2FD",
        accent: "#0D47A1",
      },
      {
        colorId: "purple", // 신비롭고 아기자기한 보라빛 봉고 테마
        primary: "#CE93D8",
        secondary: "#F3E5F5",
        accent: "#4A148C",
      },
    ],
  },
  {
    id: "keyboard",
    name: "키보드",
    topCategory: "things",
    subCategory: "musical_instrument",
    svgKey: "keyboard",
    shapes: [],
    description: "다양한 리듬과 소리를 연주하는 전자 키보드예요.",
    variants: [
      {
        colorId: "natural", // 모던한 실버 그레이 바디 + 화이트 건반 본래의 모습
        primary: "#5f93c7",
        secondary: "#FFFFFF",
        accent: "#424242",
      },
      {
        colorId: "pink", // 사랑스러운 핑크빛 키보드 테마
        primary: "#F48FB1",
        secondary: "#FCE4EC",
        accent: "#880E4F",
      },
      {
        colorId: "blue", // 시원하고 청량한 블루 계열 키보드 테마
        primary: "#90CAF9",
        secondary: "#E3F2FD",
        accent: "#0D47A1",
      },
      {
        colorId: "purple", // 신비롭고 아기자기한 보라빛 키보드 테마
        primary: "#CE93D8",
        secondary: "#F3E5F5",
        accent: "#4A148C",
      },
    ],
  },
  {
    id: "violin",
    name: "바이올린",
    topCategory: "things",
    subCategory: "musical_instrument",
    svgKey: "violin",
    shapes: [],
    description: "아름다운 선율을 연주하는 클래식한 바이올린이에요.",
    variants: [
      {
        colorId: "natural", // 클래식한 우드 브라운 바디 본래의 모습
        primary: "#8D6E63",
        secondary: "#5D4037",
        accent: "#212121",
      },
      {
        colorId: "pink", // 사랑스러운 핑크빛 바이올린 테마
        primary: "#F48FB1",
        secondary: "#C2185B",
        accent: "#880E4F",
      },
      {
        colorId: "blue", // 청량하고 시원한 블루 계열 바이올린 테마
        primary: "#90CAF9",
        secondary: "#1976D2",
        accent: "#0D47A1",
      },
      {
        colorId: "purple", // 신비롭고 우아한 보라빛 바이올린 테마
        primary: "#CE93D8",
        secondary: "#8E24AA",
        accent: "#4A148C",
      },
    ],
  },
  {
    id: "piano",
    name: "피아노",
    topCategory: "things", // 혹은 해당 카테고리에 맞게 설정
    subCategory: "musical_instrument",
    svgKey: "piano",
    shapes: [],
    description: "아름다운 선율을 연주할 수 있는 멋진 피아노예요.",
    variants: [
      {
        colorId: "natural", // 은은한 실버 그레이 바디 + 화이트 건반 본래의 모습
        primary: "#B8C0C8",
        secondary: "#FFFFFF",
        accent: "#333333",
      },
      {
        colorId: "brown", // 클래식한 우드/브라운 계열 피아노 테마
        primary: "#8D6E63",
        secondary: "#EFEBE9",
        accent: "#3E2723",
      },
      {
        colorId: "pink", // 사랑스러운 핑크빛 피아노 테마
        primary: "#F48FB1",
        secondary: "#FCE4EC",
        accent: "#880E4F",
      },
      {
        colorId: "blue", // 시원하고 청량한 블루 계열 피아노 테마
        primary: "#90CAF9",
        secondary: "#E3F2FD",
        accent: "#0D47A1",
      },
    ],
  },
  {
    id: "tree",
    name: "나무",
    topCategory: "nature",
    subCategory: "plant",
    svgKey: "tree",
    shapes: [],
    description: "초록빛 잎이 무성하게 자란 커다란 나무예요.",
    variants: [
      {
        colorId: "natural", // 초록 잎 + 주황/갈색 기둥 본래의 자연스러운 모습[cite: 4]
        primary: "#9CCC65",
        secondary: "#FFA726",
        accent: "#FFFFFF",
      },
      {
        colorId: "green", // 싱그러운 올리브/진초록 계열 테마
        primary: "#66BB6A",
        secondary: "#388E3C",
        accent: "#C8E6C9",
      },
      {
        colorId: "yellow", // 노란빛 가을 단풍 테마
        primary: "#FFEE58",
        secondary: "#FBC02D",
        accent: "#FFFDE7",
      },
      {
        colorId: "pink", // 벚꽃이 피어난 핑크빛 나무 테마
        primary: "#F48FB1",
        secondary: "#E91E63",
        accent: "#FCE4EC",
      },
    ],
  },
  {
    id: "crescentMoon",
    name: "초승달",
    topCategory: "nature",
    subCategory: "sky",
    svgKey: "crescentMoon",
    shapes: [],
    description: "밤하늘에 예쁘게 떠 있는 노란 초승달이에요.",
    variants: [
      {
        colorId: "natural", // 노란 빛의 본래 자연스러운 초승달
        primary: "#FFEE58",
        secondary: "#FFFDE7",
        accent: "#FF8A80",
      },
      {
        colorId: "yellow", // 선명하고 화사한 골드 옐로 테마
        primary: "#FFD54F",
        secondary: "#FFF9C4",
        accent: "#FF7043",
      },
      {
        colorId: "blue", // 밤하늘빛 블루/실버 톤 초승달 테마
        primary: "#90CAF9",
        secondary: "#E3F2FD",
        accent: "#5C6BC0",
      },
      {
        colorId: "purple", // 신비로운 보라빛 몽환 테마
        primary: "#CE93D8",
        secondary: "#F3E5F5",
        accent: "#AB47BC",
      },
    ],
  },
  {
    id: "cloud",
    name: "구름",
    topCategory: "nature",
    subCategory: "sky",
    svgKey: "cloud",
    shapes: [],
    description: "하늘에서 몽글몽글 피어나는 하얀 구름이에요.",
    variants: [
      {
        colorId: "natural", // 기본 하늘빛 톤 구름
        primary: "#E0F7FA",
        secondary: "#FFFFFF",
        accent: "#B2EBF2",
      },
      {
        colorId: "white", // 순백색 솜사탕 같은 구름
        primary: "#FFFFFF",
        secondary: "#F5F5F5",
        accent: "#E0E0E0",
      },
      {
        colorId: "blue", // 푸른빛 하늘 구름 계열
        primary: "#90CAF9",
        secondary: "#E3F2FD",
        accent: "#42A5F5",
      },
      {
        colorId: "purple", // 노을빛이 감도는 보라/핑크 계열 구름
        primary: "#CE93D8",
        secondary: "#F3E5F5",
        accent: "#AB47BC",
      },
    ],
  },
  {
    id: "cactus",
    name: "선인장",
    topCategory: "nature",
    subCategory: "plant",
    svgKey: "cactus",
    shapes: [],
    description: "귀여운 얼굴을 하고 있는 방울선인장이에요.",
    variants: [
      {
        colorId: "natural", // 본래의 초록 몸통 + 갈색 화분
        primary: "#66BB6A",
        secondary: "#8D6E63",
        accent: "#E91E63",
      },
      {
        colorId: "green", // 올리브/그린 계열 테마
        primary: "#81C784",
        secondary: "#558B2F",
        accent: "#2E7D32",
      },
      {
        colorId: "yellow", // 노랑 계열 테마 (몸통, 화분, 포인트 모두 골드/노랑 톤)
        primary: "#FFEE58",
        secondary: "#FBC02D",
        accent: "#F57F17",
      },
      {
        colorId: "blue", // 블루/스카이 계열 테마
        primary: "#64B5F6",
        secondary: "#1E88E5",
        accent: "#1565C0",
      },
      {
        colorId: "purple", // 보라 계열 테마
        primary: "#BA68C8",
        secondary: "#8E24AA",
        accent: "#6A1B9A",
      },
    ],
  },
  {
    id: "flower",
    name: "꽃",
    topCategory: "nature",
    subCategory: "plant",
    svgKey: "flower",
    shapes: [],
    description: "향기로운 예쁜 꽃이 아름답게 피어있어요.",
    variants: [
      {
        colorId: "natural", // 보라빛 예쁜 꽃 본래의 모습 (보라 꽃잎 + 노란 중앙 포인트)
        primary: "#AB47BC",
        secondary: "#FFCA28",
        accent: "#F57F17",
      },
      {
        colorId: "pink", // 분홍 계열 테마 (꽃잎, 중앙, 포인트 모두 핑크 톤)
        primary: "#EC407A",
        secondary: "#D81B60",
        accent: "#AD1457",
      },
      {
        colorId: "red", // 레드 계열 테마 (꽃잎, 중앙, 포인트 모두 레드 톤)
        primary: "#E53935",
        secondary: "#C62828",
        accent: "#B71C1C",
      },
      {
        colorId: "yellow", // 노랑 계열 테마 (꽃잎, 중앙, 포인트 모두 노랑 톤)
        primary: "#FFEE58",
        secondary: "#FBC02D",
        accent: "#F57F17",
      },
      {
        colorId: "blue", // 블루 계열 테마 (꽃잎, 중앙, 포인트 모두 블루 톤)
        primary: "#42A5F5",
        secondary: "#1E88E5",
        accent: "#1565C0",
      },
    ],
  },
  {
    id: "sunflower",
    name: "해바라기",
    topCategory: "nature",
    subCategory: "plant",
    svgKey: "sunflower",
    shapes: [],
    description: "태양을 바라보며 활짝 피어나는 노란 해바라기에요.",
    variants: [
      {
        colorId: "natural", // 해바라기 본래의 자연스러운 모습 (노란 꽃잎 + 갈색 씨앗 + 초록 줄기)
        primary: "#FDD835",
        secondary: "#4E342E",
        accent: "#2E7D32",
      },
      {
        colorId: "yellow", // 노랑 계열 테마 (꽃잎, 씨앗, 포인트 모두 노랑/골드 톤)
        primary: "#FFEE58",
        secondary: "#FBC02D",
        accent: "#FDD835",
      },
      {
        colorId: "orange", // 주황 계열 테마 (꽃잎, 씨앗, 포인트 모두 주황/브라운 톤)
        primary: "#FFA726",
        secondary: "#FB8C00",
        accent: "#E65100",
      },
    ],
  },
  {
    id: "cottonCandy",
    name: "솜사탕",
    topCategory: "food",
    subCategory: "snack",
    svgKey: "cottonCandy",
    shapes: [],
    description: "구름처럼 폭신폭신하고 달콤한 솜사탕이에요.",
    variants: [
      {
        colorId: "natural", // 분홍빛 솜사탕 (대표 기본)
        primary: "#F48FB1",
        secondary: "#D7CCC8",
        accent: "#AD1457",
      },
      {
        colorId: "blue", // 하늘색 솜사탕 계열
        primary: "#64B5F6",
        secondary: "#D7CCC8",
        accent: "#1565C0",
      },
      {
        colorId: "yellow", // 쨍한 노란색 솜사탕 계열
        primary: "#FFEE58",
        secondary: "#D7CCC8",
        accent: "#FBC02D",
      },
      {
        colorId: "green", // 민트/연두색 솜사탕 계열
        primary: "#81C784",
        secondary: "#D7CCC8",
        accent: "#2E7D32",
      },
      {
        colorId: "purple", // 보라색 솜사탕 계열
        primary: "#BA68C8",
        secondary: "#D7CCC8",
        accent: "#7B1FA2",
      },
    ],
  },
  {
    id: "cupcake",
    name: "컵케이크",
    topCategory: "food",
    subCategory: "snack",
    svgKey: "cupcake",
    shapes: [],
    description: "달콤한 크림과 상큼한 토핑이 올라간 예쁜 컵케이크예요.",
    variants: [
      {
        colorId: "natural", // 딸기 크림 계열
        primary: "#F8BBD0",
        secondary: "#8D6E63",
        accent: "#C2185B",
      },
      {
        colorId: "brown", // 초코 크림 계열
        primary: "#8D6E63",
        secondary: "#5D4037",
        accent: "#3E2723",
      },
      {
        colorId: "yellow", // 선명하고 쨍한 순수 노랑 크림 계열
        primary: "#FFEE58",
        secondary: "#FFD54F",
        accent: "#FBC02D",
      },
      {
        colorId: "green", // 말차 크림 계열
        primary: "#C8E6C9",
        secondary: "#558B2F",
        accent: "#1B5E20",
      },
    ],
  },
  {
    id: "sweetPotato",
    name: "고구마",
    topCategory: "food",
    subCategory: "vegetable",
    svgKey: "sweetPotato",
    shapes: [],
    description: "달콤하고 맛있는 영양 만점 군고구마예요.",
    variants: [
      {
        colorId: "natural", // 고구마 본래의 자연스러운 자주빛 및 속살 색상
        primary: "#7B2452",
        secondary: "#FFCA28",
        accent: "#4A148C",
      },
    ],
  },
  {
    id: "blueberry",
    name: "블루베리",
    topCategory: "food",
    subCategory: "fruit",
    svgKey: "blueberry",
    shapes: ["circle"],
    description: "몸에 좋은 영양이 가득한 블루베리에요.",
    variants: [
      {
        colorId: "natural", // 블루베리 본래의 진청색 자연스러운 모습
        primary: "#3F51B5",
        secondary: "#1A237E",
        accent: "#5C6BC0",
      },
      {
        colorId: "blue", // 블루베리 본래의 진청색 자연스러운 모습
        primary: "#3F51B5",
        secondary: "#1A237E",
        accent: "#5C6BC0",
      },
    ],
  },
  {
    id: "cherry",
    name: "체리",
    topCategory: "food",
    subCategory: "fruit",
    svgKey: "cherry",
    shapes: ["circle"],
    description: "새콤달콤 알콩달콩 매달려 있는 빨간 체리에요.",
    variants: [
      {
        colorId: "natural", // 체리 본래의 붉은빛 자연스러운 모습
        primary: "#E53935",
        secondary: "#2E7D32",
        accent: "#43A047",
      },
    ],
  },
  {
    id: "fish",
    name: "물고기",
    topCategory: "animal",
    subCategory: "sea_animal",
    svgKey: "fish",
    shapes: [],
    description: "물속을 살랑살랑 헤엄치는 예쁜 물고기예요.",
    variants: [
      {
        colorId: "natural", // 물고기 대표 주황색 계열 (흰동가리/니모)
        primary: "#FF7043",
        secondary: "#FFAB91",
        accent: "#D84315",
      },
      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        colorId: "blue", // 열대어 계열
        primary: "#42A5F5",
        secondary: "#BBDEFB",
        accent: "#1565C0",
      },
      {
        colorId: "yellow", // 금붕어/노랑열대어 계열
        primary: "#FDD835",
        secondary: "#FFF9C4",
        accent: "#FBC02D",
      },
    ],
  },
  {
    id: "koala",
    name: "코알라",
    topCategory: "animal",
    subCategory: "wild_animal",
    svgKey: "koala",
    shapes: [],
    description: "동글동글한 귀와 커다란 코를 가진 귀여운 코알라예요.",
    variants: [
      {
        colorId: "natural", // 코알라 본래의 회색빛 자연스러운 모습
        primary: "#B0BEC5",
        secondary: "#78909C",
        accent: "#37474F",
      },
    ],
  },
  {
    id: "fox",
    name: "여우",
    topCategory: "animal",
    subCategory: "wild_animal",
    svgKey: "fox",
    shapes: [],
    description: "뾰족한 귀와 날렵한 주둥이를 가진 영리한 여우예요.",
    variants: [
      {
        colorId: "natural", // 여우 본래의 주황빛 자연스러운 모습
        primary: "#FF7043",
        secondary: "#FFFFFF",
        accent: "#D84315",
      },
      {
        colorId: "brown", // 붉은 갈색 늑대/여우 계열
        primary: "#8D6E63",
        secondary: "#b98b75",
        accent: "#4E342E",
      },
    ],
  },
  {
    id: "snail",
    name: "달팽이",
    topCategory: "animal",
    subCategory: "small_animal",
    svgKey: "snail",
    shapes: [],
    description: "동글동글한 집을 짊어지고 영차영차 기어가는 달팽이에요.",
    variants: [
      {
        colorId: "natural", // 달팽이 본래의 자연스러운 갈색 계열 모습
        primary: "#A1887F",
        secondary: "#D7CCC8",
        accent: "#4E342E",
      },
    ],
  },
  {
    id: "bee",
    name: "벌",
    topCategory: "animal",
    subCategory: "insect",
    svgKey: "bee",
    shapes: [],
    description: "노란색과 검은색 줄무늬가 매력적인 윙윙 꿀벌이에요.",
    variants: [
      {
        colorId: "natural", // 벌 본래의 노란 줄무늬 모습
        primary: "#FFEB3B",
        secondary: "#E0F7FA",
        accent: "#212121",
      },
    ],
  },
  {
    id: "ladybug",
    name: "무당벌레",
    topCategory: "animal",
    subCategory: "insect",
    svgKey: "ladybug",
    shapes: [],
    description: "빨간 등딱지에 까만 점이 콕콕 박혀 있는 귀여운 무당벌레예요.",
    variants: [
      {
        colorId: "natural", // 무당벌레 본래의 자연스러운 모습 (빨간 등딱지 + 검은 머리/점)
        primary: "#E53935",
        secondary: "#37474F",
        accent: "#212121",
      },
    ],
  },
  {
    id: "butterfly",
    name: "나비",
    topCategory: "animal", // 또는 알맞은 상위 카테고리
    subCategory: "insect",
    svgKey: "butterfly",
    shapes: [],
    description: "하늘하늘 날아다니며 예쁜 꽃을 찾아가는 알록달록 나비예요.",
    variants: [
      {
        colorId: "natural",
        primary: "#FAF4E8",
        secondary: "#D6C7A8",
        accent: "#8D7B68",
      },
      {
        colorId: "brown",
        primary: "#D7CCC8",
        secondary: "#8D6E63",
        accent: "#4E342E",
      },
      {
        colorId: "red",
        primary: "#FFCDD2",
        secondary: "#EF5350",
        accent: "#B71C1C",
      },
      {
        colorId: "orange",
        primary: "#FFE0B2",
        secondary: "#FB8C00",
        accent: "#E65100",
      },
      {
        colorId: "yellow",
        primary: "#FFF59D",
        secondary: "#FBC02D",
        accent: "#F57F17",
      },
      {
        colorId: "green",
        primary: "#C8E6C9",
        secondary: "#66BB6A",
        accent: "#2E7D32",
      },
      {
        colorId: "blue",
        primary: "#BBDEFB",
        secondary: "#42A5F5",
        accent: "#1565C0",
      },
      {
        colorId: "purple",
        primary: "#E1BEE7",
        secondary: "#AB47BC",
        accent: "#6A1B9A",
      },
      {
        colorId: "black",
        primary: "#757575",
        secondary: "#424242",
        accent: "#212121",
      },
      {
        colorId: "white",
        primary: "#FFFFFF",
        secondary: "#ECEFF1",
        accent: "#90A4AE",
      },
    ],
  },
  {
    id: "cruise",
    name: "유람선",
    topCategory: "vehicle",
    subCategory: "water_vehicle",
    svgKey: "cruise",
    shapes: [],
    description:
      "푸른 바다를 시원하게 가로지르며 항해하는 커다란 유람선이에요.",
    variants: [
      {
        colorId: "natural",
        primary: "#FAF8F2",
        secondary: "#EFECE6",
        accent: "#A7A19A",
      },
      {
        colorId: "brown",
        primary: "#795548",
        secondary: "#D7CCC8",
        accent: "#4E342E",
      },
      {
        colorId: "red",
        primary: "#FFCDD2",
        secondary: "#E53935",
        accent: "#B71C1C",
      },
      {
        colorId: "orange",
        primary: "#FFE0B2",
        secondary: "#FB8C00",
        accent: "#EF6C00",
      },
      {
        colorId: "yellow",
        primary: "#FFFDE7",
        secondary: "#FDD835",
        accent: "#FBC02D",
      },
      {
        colorId: "green",
        primary: "#C8E6C9",
        secondary: "#4CAF50",
        accent: "#2E7D32",
      },
      {
        colorId: "blue", // 유람선 대표 톤
        primary: "#E3F2FD",
        secondary: "#29B6F6",
        accent: "#1565C0",
      },
      {
        colorId: "purple",
        primary: "#E1BEE7",
        secondary: "#9C27B0",
        accent: "#6A1B9A",
      },
      {
        colorId: "black",
        primary: "#424242",
        secondary: "#212121",
        accent: "#000000",
      },
      {
        colorId: "white",
        primary: "#FFFFFF",
        secondary: "#CFD8DC",
        accent: "#BDBDBD",
      },
    ],
  },
  {
    id: "drone",
    name: "드론",
    topCategory: "vehicle",
    subCategory: "air_vehicle",
    svgKey: "drone",
    shapes: [],
    description: "위잉위잉! 하늘 높이 날아올라 멋진 영상을 찍는 드론이에요.",
    variants: [
      {
        colorId: "natural",
        primary: "#FAF8F2",
        secondary: "#EFECE6",
        accent: "#A7A19A",
      },
      {
        colorId: "brown",
        primary: "#795548",
        secondary: "#D7CCC8",
        accent: "#4E342E",
      },
      {
        colorId: "red",
        primary: "#F44336",
        secondary: "#FFCDD2",
        accent: "#B71C1C",
      },
      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFFDE7",
        accent: "#FBC02D",
      },
      {
        colorId: "green",
        primary: "#4CAF50",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        colorId: "blue", // 드론 대표 톤
        primary: "#42A5F5",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },
      {
        colorId: "purple",
        primary: "#9C27B0",
        secondary: "#E1BEE7",
        accent: "#6A1B9A",
      },
      {
        colorId: "black",
        primary: "#212121",
        secondary: "#424242",
        accent: "#000000",
      },
      {
        colorId: "white",
        primary: "#FFFFFF",
        secondary: "#F5F5F5",
        accent: "#BDBDBD",
      },
    ],
  },
  {
    id: "ambulance",
    name: "구급차",
    topCategory: "vehicle",
    subCategory: "road_vehicle",
    svgKey: "ambulance",
    shapes: [],
    description: "삐뽀삐뽀! 아픈 사람을 태우고 빠르게 달려가는 구급차예요.",
    variants: [
      {
        colorId: "natural",
        primary: "#FAF8F2",
        secondary: "#EFECE6",
        accent: "#A7A19A",
      },
      {
        colorId: "brown",
        primary: "#795548",
        secondary: "#D7CCC8",
        accent: "#4E342E",
      },
      {
        colorId: "red",
        primary: "#E53935",
        secondary: "#FFCDD2",
        accent: "#B71C1C",
      },
      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFFDE7",
        accent: "#FBC02D",
      },
      {
        colorId: "green",
        primary: "#4CAF50",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },
      {
        colorId: "purple",
        primary: "#9C27B0",
        secondary: "#E1BEE7",
        accent: "#6A1B9A",
      },
      {
        colorId: "black",
        primary: "#212121",
        secondary: "#424242",
        accent: "#000000",
      },
      {
        colorId: "white", // 구급차 기본 대표 톤
        primary: "#FFFFFF",
        secondary: "#FFCDD2",
        accent: "#212121",
      },
    ],
  },
  {
    id: "fireTruck",
    name: "소방차",
    topCategory: "vehicle",
    subCategory: "road_vehicle",
    svgKey: "fireTruck",
    shapes: [],
    description: "애앵! 애앵! 불이 나면 달려가는 씩씩한 소방차에요.",
    variants: [
      {
        colorId: "natural",
        primary: "#E53935",
        secondary: "#FFCDD2",
        accent: "#B71C1C",
      },
      {
        colorId: "brown",
        primary: "#795548",
        secondary: "#D7CCC8",
        accent: "#4E342E",
      },
      {
        colorId: "red", // 소방차 대표 컬러
        primary: "#E53935",
        secondary: "#FFCDD2",
        accent: "#B71C1C",
      },
      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFFDE7",
        accent: "#FBC02D",
      },
      {
        colorId: "green",
        primary: "#4CAF50",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },
      {
        colorId: "purple",
        primary: "#9C27B0",
        secondary: "#E1BEE7",
        accent: "#6A1B9A",
      },
      {
        colorId: "black",
        primary: "#212121",
        secondary: "#424242",
        accent: "#000000",
      },
      {
        colorId: "white",
        primary: "#FAF8F2",
        secondary: "#EFECE6",
        accent: "#A7A19A",
      },
    ],
  },
  {
    id: "scooter",
    name: "킥보드",
    topCategory: "vehicle",
    subCategory: "road_vehicle",
    svgKey: "scooter",
    shapes: [],
    description: "쌩쌩! 바람을 가르며 신나게 달려요. 안전하게 타볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#FAF8F2",
        secondary: "#EFECE6",
        accent: "#A7A19A",
      },
      {
        colorId: "brown",
        primary: "#795548",
        secondary: "#D7CCC8",
        accent: "#4E342E",
      },
      {
        colorId: "red",
        primary: "#F44336",
        secondary: "#FFCDD2",
        accent: "#B71C1C",
      },
      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        colorId: "yellow",
        primary: "#FDD835",
        secondary: "#FFFDE7",
        accent: "#FBC02D",
      },
      {
        colorId: "green",
        primary: "#4CAF50",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        colorId: "blue",
        primary: "#42A5F5",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },
      {
        colorId: "purple",
        primary: "#9C27B0",
        secondary: "#E1BEE7",
        accent: "#6A1B9A",
      },
      {
        colorId: "black",
        primary: "#212121",
        secondary: "#424242",
        accent: "#000000",
      },
      {
        colorId: "white",
        primary: "#FFFFFF",
        secondary: "#F5F5F5",
        accent: "#BDBDBD",
      },
    ],
  },
  {
    id: "taxi",
    name: "택시",
    topCategory: "vehicle",
    subCategory: "road_vehicle",
    svgKey: "taxi",
    shapes: [],
    description: "빵빵! 손님을 태우고 안전하게 달리는 노란색 택시에요.",
    variants: [
      {
        colorId: "natural",
        primary: "#FAFAFA",
        secondary: "#EEEEEE",
        accent: "#212121",
      },
      {
        colorId: "brown",
        primary: "#795548",
        secondary: "#D7CCC8",
        accent: "#4E342E",
      },
      {
        colorId: "red",
        primary: "#F44336",
        secondary: "#FFEBEE",
        accent: "#B71C1C",
      },
      {
        colorId: "orange",
        primary: "#FB8C00",
        secondary: "#FFE0B2",
        accent: "#EF6C00",
      },
      {
        colorId: "yellow", // 택시 대표 컬러
        primary: "#FFC107",
        secondary: "#FFECB3",
        accent: "#FFA000",
      },
      {
        colorId: "green",
        primary: "#4CAF50",
        secondary: "#81C784",
        accent: "#2E7D32",
      },
      {
        colorId: "blue",
        primary: "#2196F3",
        secondary: "#64B5F6",
        accent: "#1565C0",
      },
      {
        colorId: "purple",
        primary: "#9C27B0",
        secondary: "#BA68C8",
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
        primary: "#FFFFFF",
        secondary: "#EEEEEE",
        accent: "#9E9E9E",
      },
    ],
  },
  // 1. 운동화
  {
    id: "sneakers",
    name: "운동화",
    topCategory: "clothing",
    subCategory: "shoes",
    svgKey: "sneakers",
    shapes: [],
    description: "끈을 묶고 신는 운동화예요! 힘차게 달려 볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#70A8D9",
        secondary: "#FFFFFF",
        accent: "#315F91",
      },
      {
        colorId: "red",
        primary: "#E57373",
        secondary: "#FFCDD2",
        accent: "#B8323A",
      },
      {
        colorId: "yellow",
        primary: "#F2D36B",
        secondary: "#FFF1B8",
        accent: "#A88327",
      },
      {
        colorId: "green",
        primary: "#75A981",
        secondary: "#CDE5D0",
        accent: "#3B6B46",
      },
      {
        colorId: "pink",
        primary: "#F0A4BB",
        secondary: "#FCE2EA",
        accent: "#A94D6B",
      },
      {
        colorId: "black",
        primary: "#4A4A50",
        secondary: "#D9D9DE",
        accent: "#25252A",
      },
    ],
  },

  // 2. 구두
  {
    id: "dressShoes",
    name: "구두",
    topCategory: "clothing",
    subCategory: "shoes",
    svgKey: "dressShoes",
    shapes: [],
    description: "반짝반짝 멋지게 차려 신는 구두예요!",
    variants: [
      {
        colorId: "natural",
        primary: "#956C4F",
        secondary: "#DCC1A6",
        accent: "#563A2B",
      },
      {
        colorId: "black",
        primary: "#34343A",
        secondary: "#777780",
        accent: "#1D1D22",
      },
      {
        colorId: "red",
        primary: "#ee091f",
        secondary: "#E9A8AE",
        accent: "#81343D",
      },
      {
        colorId: "white",
        primary: "#FAF8F2",
        secondary: "#FFFFFF",
        accent: "#A7A19A",
      },
    ],
  },

  // 4. 슬리퍼
  {
    id: "slippers",
    name: "슬리퍼",
    topCategory: "clothing",
    subCategory: "shoes",
    svgKey: "slippers",
    shapes: [],
    description: "발을 쏙 넣어 편하게 신는 슬리퍼예요!",
    variants: [
      {
        colorId: "natural",
        primary: "#75A981",
        secondary: "#CDE5D0",
        accent: "#3B6B46",
      },
      {
        colorId: "blue",
        primary: "#70A8D9",
        secondary: "#D5E9FA",
        accent: "#315F91",
      },
      {
        colorId: "pink",
        primary: "#F0A4BB",
        secondary: "#FCE2EA",
        accent: "#A94D6B",
      },
      {
        colorId: "yellow",
        primary: "#F2D36B",
        secondary: "#FFF1B8",
        accent: "#A88327",
      },
      {
        colorId: "black",
        primary: "#4A4A50",
        secondary: "#888890",
        accent: "#25252A",
      },
    ],
  },

  // 5. 조리
  {
    id: "flipFlops",
    name: "조리",
    topCategory: "clothing",
    subCategory: "shoes",
    svgKey: "flipFlops",
    shapes: [],
    description: "엄지발가락 사이에 끈을 끼워 신는 조리예요!",
    variants: [
      {
        colorId: "natural",
        primary: "#70A8D9",
        secondary: "#D5E9FA",
        accent: "#315F91",
      },
      {
        colorId: "red",
        primary: "#E57373",
        secondary: "#FFCDD2",
        accent: "#B8323A",
      },
      {
        colorId: "yellow",
        primary: "#F2D36B",
        secondary: "#FFF1B8",
        accent: "#A88327",
      },
      {
        colorId: "green",
        primary: "#75A981",
        secondary: "#CDE5D0",
        accent: "#3B6B46",
      },
      {
        colorId: "pink",
        primary: "#F0A4BB",
        secondary: "#FCE2EA",
        accent: "#A94D6B",
      },
    ],
  },

  // 6. 장화
  {
    id: "rainBoots",
    name: "장화",
    topCategory: "clothing",
    subCategory: "shoes",
    svgKey: "rainBoots",
    shapes: [],
    description: "비 오는 날 물웅덩이를 첨벙첨벙 건너는 장화예요!",
    variants: [
      {
        colorId: "natural",
        primary: "#F2D36B",
        secondary: "#FFF1B8",
        accent: "#A88327",
      },
      {
        colorId: "red",
        primary: "#E57373",
        secondary: "#FFCDD2",
        accent: "#B8323A",
      },
      {
        colorId: "green",
        primary: "#75A981",
        secondary: "#CDE5D0",
        accent: "#3B6B46",
      },
      {
        colorId: "blue",
        primary: "#70A8D9",
        secondary: "#D5E9FA",
        accent: "#315F91",
      },
      {
        colorId: "pink",
        primary: "#F0A4BB",
        secondary: "#FCE2EA",
        accent: "#A94D6B",
      },
    ],
  },

  // 7. 털장화
  {
    id: "furBoots",
    name: "털장화",
    topCategory: "clothing",
    subCategory: "shoes",
    svgKey: "furBoots",
    shapes: [],
    description: "안쪽에 따뜻한 털이 있는 털장화예요!",
    variants: [
      {
        colorId: "natural",
        primary: "#956C4F",
        secondary: "#F5E7D2",
        accent: "#563A2B",
      },
      {
        colorId: "brown",
        primary: "#956C4F",
        secondary: "#DCC1A6",
        accent: "#563A2B",
      },
      {
        colorId: "black",
        primary: "#4A4A50",
        secondary: "#D9D9DE",
        accent: "#25252A",
      },
      {
        colorId: "pink",
        primary: "#F0A4BB",
        secondary: "#FCE2EA",
        accent: "#A94D6B",
      },
      {
        colorId: "white",
        primary: "#FAF8F2",
        secondary: "#FFFFFF",
        accent: "#A7A19A",
      },
    ],
  },

  // 8. 부츠
  {
    id: "boots",
    name: "부츠",
    topCategory: "clothing",
    subCategory: "shoes",
    svgKey: "boots",
    shapes: [],
    description: "발목이나 종아리까지 올라오는 부츠예요!",
    variants: [
      {
        colorId: "natural",
        primary: "#956C4F",
        secondary: "#DCC1A6",
        accent: "#563A2B",
      },
      {
        colorId: "black",
        primary: "#4A4A50",
        secondary: "#888890",
        accent: "#25252A",
      },
      {
        colorId: "brown",
        primary: "#956C4F",
        secondary: "#DCC1A6",
        accent: "#563A2B",
      },
      {
        colorId: "red",
        primary: "#B85C65",
        secondary: "#E9A8AE",
        accent: "#81343D",
      },
      {
        colorId: "white",
        primary: "#FAF8F2",
        secondary: "#FFFFFF",
        accent: "#A7A19A",
      },
    ],
  },

  // 1. 티셔츠
  {
    id: "tShirt",
    name: "티셔츠",
    topCategory: "clothing",
    subCategory: "clothes",
    svgKey: "tShirt",
    shapes: [],
    description: "편하게 입는 티셔츠예요! 어떤 색이 좋을까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#70A8D9",
        secondary: "#D5E9FA",
        accent: "#315F91",
      },
      {
        colorId: "red",
        primary: "#E57373",
        secondary: "#FFCDD2",
        accent: "#B8323A",
      },
      {
        colorId: "yellow",
        primary: "#F2D36B",
        secondary: "#FFF1B8",
        accent: "#A88327",
      },
      {
        colorId: "green",
        primary: "#75A981",
        secondary: "#CDE5D0",
        accent: "#3B6B46",
      },
      {
        colorId: "white",
        primary: "#FAF8F2",
        secondary: "#FFFFFF",
        accent: "#A7A19A",
      },
      {
        colorId: "black",
        primary: "#4A4A50",
        secondary: "#888890",
        accent: "#25252A",
      },
      {
        colorId: "pink",
        primary: "#F0A4BB",
        secondary: "#FCE2EA",
        accent: "#A94D6B",
      },
    ],
  },

  // 2. 반팔 셔츠
  {
    id: "shortSleeveShirt",
    name: "반팔 셔츠",
    topCategory: "clothing",
    subCategory: "clothes",
    svgKey: "shortSleeveShirt",
    shapes: [],
    description: "팔이 짧은 반팔 셔츠예요! 단추도 찾아볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#FAF8F2",
        secondary: "#FFFFFF",
        accent: "#A7A19A",
      },
      {
        colorId: "blue",
        primary: "#70A8D9",
        secondary: "#D5E9FA",
        accent: "#315F91",
      },
      {
        colorId: "yellow",
        primary: "#F2D36B",
        secondary: "#FFF1B8",
        accent: "#A88327",
      },
      {
        colorId: "green",
        primary: "#75A981",
        secondary: "#CDE5D0",
        accent: "#3B6B46",
      },
      {
        colorId: "pink",
        primary: "#F0A4BB",
        secondary: "#FCE2EA",
        accent: "#A94D6B",
      },
    ],
  },

  // 3. 나시
  {
    id: "tankTop",
    name: "나시",
    topCategory: "clothing",
    subCategory: "clothes",
    svgKey: "tankTop",
    shapes: [],
    description: "어깨가 드러나는 나시예요! 소매가 없어요.",
    variants: [
      {
        colorId: "natural",
        primary: "#F0A4BB",
        secondary: "#FCE2EA",
        accent: "#A94D6B",
      },
      {
        colorId: "white",
        primary: "#FAF8F2",
        secondary: "#FFFFFF",
        accent: "#A7A19A",
      },
      {
        colorId: "blue",
        primary: "#70A8D9",
        secondary: "#D5E9FA",
        accent: "#315F91",
      },
      {
        colorId: "black",
        primary: "#4A4A50",
        secondary: "#888890",
        accent: "#25252A",
      },
      {
        colorId: "yellow",
        primary: "#F2D36B",
        secondary: "#FFF1B8",
        accent: "#A88327",
      },
    ],
  },

  // 4. 런닝
  {
    id: "shortSleeve",
    name: "반팔티",
    topCategory: "clothing",
    subCategory: "clothes",
    svgKey: "shortSleeve",
    shapes: [],
    description: "여름에 시원하게 입을 반팔티셔츠예요!",
    variants: [
      {
        colorId: "natural",
        primary: "#FAF8F2",
        secondary: "#FFFFFF",
        accent: "#A7A19A",
      },
      {
        colorId: "blue",
        primary: "#B5D8F0",
        secondary: "#EAF6FF",
        accent: "#6A9FC7",
      },
      {
        colorId: "pink",
        primary: "#F0A4BB",
        secondary: "#FCE2EA",
        accent: "#A94D6B",
      },
      {
        colorId: "black",
        primary: "#4A4A50",
        secondary: "#888890",
        accent: "#25252A",
      },
    ],
  },

  // 6. 반바지
  {
    id: "shorts",
    name: "반바지",
    topCategory: "clothing",
    subCategory: "clothes",
    svgKey: "shorts",
    shapes: [],
    description: "다리가 짧게 내려오는 반바지예요!",
    variants: [
      {
        colorId: "natural",
        primary: "#75A981",
        secondary: "#CDE5D0",
        accent: "#3B6B46",
      },
      {
        colorId: "blue",
        primary: "#70A8D9",
        secondary: "#D5E9FA",
        accent: "#315F91",
      },
      {
        colorId: "red",
        primary: "#E57373",
        secondary: "#FFCDD2",
        accent: "#B8323A",
      },
      {
        colorId: "yellow",
        primary: "#F2D36B",
        secondary: "#FFF1B8",
        accent: "#A88327",
      },
      {
        colorId: "brown",
        primary: "#956C4F",
        secondary: "#DCC1A6",
        accent: "#563A2B",
      },
    ],
  },

  // 7. 긴바지
  {
    id: "longPants",
    name: "긴바지",
    topCategory: "clothing",
    subCategory: "clothes",
    svgKey: "longPants",
    shapes: [],
    description: "다리를 길게 덮는 긴바지예요!",
    variants: [
      {
        colorId: "natural",
        primary: "#70A8D9",
        secondary: "#D5E9FA",
        accent: "#315F91",
      },
      {
        colorId: "black",
        primary: "#4A4A50",
        secondary: "#888890",
        accent: "#25252A",
      },
      {
        colorId: "brown",
        primary: "#956C4F",
        secondary: "#DCC1A6",
        accent: "#563A2B",
      },
      {
        colorId: "green",
        primary: "#75A981",
        secondary: "#CDE5D0",
        accent: "#3B6B46",
      },
      {
        colorId: "white",
        primary: "#FAF8F2",
        secondary: "#FFFFFF",
        accent: "#A7A19A",
      },
    ],
  },

  // 8. 치마
  {
    id: "skirt",
    name: "치마",
    topCategory: "clothing",
    subCategory: "clothes",
    svgKey: "skirt",
    shapes: [],
    description: "허리에서 아래로 펼쳐지는 치마예요!",
    variants: [
      {
        colorId: "natural",
        primary: "#F0A4BB",
        secondary: "#FCE2EA",
        accent: "#A94D6B",
      },
      {
        colorId: "red",
        primary: "#E57373",
        secondary: "#FFCDD2",
        accent: "#B8323A",
      },
      {
        colorId: "yellow",
        primary: "#F2D36B",
        secondary: "#FFF1B8",
        accent: "#A88327",
      },
      {
        colorId: "blue",
        primary: "#70A8D9",
        secondary: "#D5E9FA",
        accent: "#315F91",
      },
      {
        colorId: "purple",
        primary: "#B98AE0",
        secondary: "#E9D8FA",
        accent: "#70429E",
      },
    ],
  },

  // 9. 원피스
  {
    id: "dress",
    name: "원피스",
    topCategory: "clothing",
    subCategory: "clothes",
    svgKey: "dress",
    shapes: [],
    description: "상의와 치마가 하나로 이어진 원피스예요!",
    variants: [
      {
        colorId: "natural",
        primary: "#F0A4BB",
        secondary: "#FCE2EA",
        accent: "#A94D6B",
      },
      {
        colorId: "red",
        primary: "#E57373",
        secondary: "#FFCDD2",
        accent: "#B8323A",
      },
      {
        colorId: "yellow",
        primary: "#F2D36B",
        secondary: "#FFF1B8",
        accent: "#A88327",
      },
      {
        colorId: "blue",
        primary: "#70A8D9",
        secondary: "#D5E9FA",
        accent: "#315F91",
      },
      {
        colorId: "purple",
        primary: "#B98AE0",
        secondary: "#E9D8FA",
        accent: "#70429E",
      },
    ],
  },

  // 10. 한복
  {
    id: "hanbok",
    name: "한복",
    topCategory: "clothing",
    subCategory: "clothes",
    svgKey: "hanbok",
    shapes: [],
    description: "대한민국의 전통 옷인 한복이에요!",
    variants: [
      {
        colorId: "natural",
        primary: "#F0A4BB",
        secondary: "#FAF8F2",
        accent: "#C34F79",
      },
      {
        colorId: "red",
        primary: "#E57373",
        secondary: "#FFF1B8",
        accent: "#B8323A",
      },
      {
        colorId: "blue",
        primary: "#70A8D9",
        secondary: "#FAF8F2",
        accent: "#315F91",
      },
      {
        colorId: "green",
        primary: "#75A981",
        secondary: "#FFF1B8",
        accent: "#3B6B46",
      },
      {
        colorId: "purple",
        primary: "#B98AE0",
        secondary: "#FAF8F2",
        accent: "#70429E",
      },
    ],
  },

  // 11. 점퍼
  {
    id: "jumper",
    name: "점퍼",
    topCategory: "clothing",
    subCategory: "clothes",
    svgKey: "jumper",
    shapes: [],
    description: "가볍게 걸쳐 입는 점퍼예요! 지퍼도 찾아봐요.",
    variants: [
      {
        colorId: "natural",
        primary: "#75A981",
        secondary: "#CDE5D0",
        accent: "#3B6B46",
      },
      {
        colorId: "red",
        primary: "#E57373",
        secondary: "#FFCDD2",
        accent: "#B8323A",
      },
      {
        colorId: "blue",
        primary: "#70A8D9",
        secondary: "#D5E9FA",
        accent: "#315F91",
      },
      {
        colorId: "black",
        primary: "#4A4A50",
        secondary: "#888890",
        accent: "#25252A",
      },
      {
        colorId: "yellow",
        primary: "#F2D36B",
        secondary: "#FFF1B8",
        accent: "#A88327",
      },
    ],
  },

  // 12. 코트
  {
    id: "coat",
    name: "코트",
    topCategory: "clothing",
    subCategory: "clothes",
    svgKey: "coat",
    shapes: [],
    description: "추운 날 따뜻하게 입는 긴 코트예요!",
    variants: [
      {
        colorId: "natural",
        primary: "#956C4F",
        secondary: "#DCC1A6",
        accent: "#563A2B",
      },
      {
        colorId: "brown",
        primary: "#956C4F",
        secondary: "#DCC1A6",
        accent: "#563A2B",
      },
      {
        colorId: "black",
        primary: "#4A4A50",
        secondary: "#888890",
        accent: "#25252A",
      },
      {
        colorId: "white",
        primary: "#FAF8F2",
        secondary: "#FFFFFF",
        accent: "#A7A19A",
      },
      {
        colorId: "red",
        primary: "#B85C65",
        secondary: "#E9A8AE",
        accent: "#81343D",
      },
      {
        colorId: "blue",
        primary: "#70A8D9",
        secondary: "#D5E9FA",
        accent: "#315F91",
      },
    ],
  },

  {
    id: "beret",
    name: "베레모",
    topCategory: "clothing",
    subCategory: "hat",
    svgKey: "beret",
    shapes: [],
    description: "동그랗고 납작한 베레모예요! 머리에 살짝 얹어 볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#B99A7A",
        secondary: "#D9BDA0",
        accent: "#795548",
      },
      {
        colorId: "red",
        primary: "#D94B57",
        secondary: "#F6B7BE",
        accent: "#8B2630",
      },
      {
        colorId: "green",
        primary: "#527C5A",
        secondary: "#A9C9A9",
        accent: "#294D32",
      },
      {
        colorId: "blue",
        primary: "#557FC2",
        secondary: "#AFC8EE",
        accent: "#294878",
      },
      {
        colorId: "black",
        primary: "#393941",
        secondary: "#777782",
        accent: "#202027",
      },
      {
        colorId: "white",
        primary: "#F5F0E8",
        secondary: "#FFFFFF",
        accent: "#AAA09A",
      },
      {
        colorId: "pink",
        primary: "#E99BB4",
        secondary: "#FCE0E9",
        accent: "#A84F6C",
      },
      {
        colorId: "brown",
        primary: "#80563F",
        secondary: "#C9A58A",
        accent: "#482D21",
      },
    ],
  },
  {
    id: "bucketHat",
    name: "버킷햇",
    topCategory: "clothing",
    subCategory: "hat",
    svgKey: "bucketHat",
    shapes: [],
    description: "챙이 둥글게 내려오는 버킷햇이에요! 멋지게 써 볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#566977",
        secondary: "#566977",
        accent: "#1d3749",
      },
      {
        colorId: "red",
        primary: "#E57373",
        secondary: "#FFCDD2",
        accent: "#B8323A",
      },
      {
        colorId: "yellow",
        primary: "#F2D36B",
        secondary: "#FFF1B8",
        accent: "#A88327",
      },
      {
        colorId: "green",
        primary: "#75A981",
        secondary: "#CDE5D0",
        accent: "#3B6B46",
      },
      {
        colorId: "blue",
        primary: "#70A8D9",
        secondary: "#D5E9FA",
        accent: "#315F91",
      },
      {
        colorId: "black",
        primary: "#4A4A50",
        secondary: "#888890",
        accent: "#25252A",
      },
      {
        colorId: "white",
        primary: "#FAF8F2",
        secondary: "#FFFFFF",
        accent: "#A7A19A",
      },
      {
        colorId: "pink",
        primary: "#F0A4BB",
        secondary: "#FCE2EA",
        accent: "#A94D6B",
      },
      {
        colorId: "brown",
        primary: "#956C4F",
        secondary: "#DCC1A6",
        accent: "#563A2B",
      },
    ],
  },
  {
    id: "winterHat",
    name: "털모자",
    topCategory: "clothing",
    subCategory: "hat",
    svgKey: "winterHat",
    shapes: [],
    description: "추운 날 머리를 따뜻하게 해 주는 털모자예요!",
    variants: [
      {
        colorId: "natural",
        primary: "#13305C",
        secondary: "#D43E4E",
        accent: "#A02437",
      },
      {
        colorId: "red",
        primary: "#D94F5C",
        secondary: "#F5B6BC",
        accent: "#8E2633",
      },
      {
        colorId: "orange",
        primary: "#E99B54",
        secondary: "#F9D4A7",
        accent: "#9C572A",
      },
      {
        colorId: "yellow",
        primary: "#E9CD66",
        secondary: "#FFF1B5",
        accent: "#A88428",
      },
      {
        colorId: "green",
        primary: "#6DAD83",
        secondary: "#C8E6CF",
        accent: "#356B4A",
      },
      {
        colorId: "blue",
        primary: "#6C9FD1",
        secondary: "#C8E0F8",
        accent: "#345C8A",
      },
      {
        colorId: "purple",
        primary: "#A78BC7",
        secondary: "#E4D8F3",
        accent: "#654A89",
      },
      {
        colorId: "black",
        primary: "#51515B",
        secondary: "#A5A5B0",
        accent: "#292932",
      },
      {
        colorId: "white",
        primary: "#F5F2ED",
        secondary: "#FFFFFF",
        accent: "#AAA3A0",
      },
      {
        colorId: "pink",
        primary: "#EBA1BB",
        secondary: "#FCE0EA",
        accent: "#A84F70",
      },
      {
        colorId: "brown",
        primary: "#8B6248",
        secondary: "#D7B89A",
        accent: "#503321",
      },
    ],
  },
  {
    id: "strawHat",
    name: "밀짚모자",
    topCategory: "clothing",
    subCategory: "hat",
    svgKey: "strawHat",
    shapes: [],
    description: "볕을 가려 주는 밀짚모자예요! 여름 나들이에 써 볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#E7C783",
        secondary: "#F8E7B5",
        accent: "#A67C3D",
      },
      {
        colorId: "yellow",
        primary: "#F5D76E",
        secondary: "#FFF0B5",
        accent: "#B88732",
      },
      {
        colorId: "brown",
        primary: "#B88752",
        secondary: "#E8C99A",
        accent: "#704522",
      },
      {
        colorId: "white",
        primary: "#FFF9E9",
        secondary: "#FFFFFF",
        accent: "#B6A27E",
      },
      {
        colorId: "pink",
        primary: "#F3B2C4",
        secondary: "#FFE5EC",
        accent: "#B85A77",
      },
    ],
  },
  {
    id: "baseballCap",
    name: "캡모자",
    topCategory: "clothing",
    subCategory: "hat",
    svgKey: "baseballCap",
    shapes: [],
    description: "앞에 챙이 달린 캡모자예요! 밖에 나갈 때 써 볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#4F78B8",
        secondary: "#85A6D8",
        accent: "#29466F",
      },
      {
        colorId: "red",
        primary: "#E53945",
        secondary: "#FFB5B8",
        accent: "#9D1725",
      },
      {
        colorId: "orange",
        primary: "#FF9B45",
        secondary: "#FFD2A3",
        accent: "#B95A20",
      },
      {
        colorId: "yellow",
        primary: "#FFD54F",
        secondary: "#FFF0A6",
        accent: "#B88720",
      },
      {
        colorId: "green",
        primary: "#66BB6A",
        secondary: "#BDE5B7",
        accent: "#2E7135",
      },
      {
        colorId: "blue",
        primary: "#64B5F6",
        secondary: "#D9EEFF",
        accent: "#245B9B",
      },
      {
        colorId: "black",
        primary: "#42454D",
        secondary: "#777C86",
        accent: "#202127",
      },
      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#ECEFF1",
        accent: "#78909C",
      },
      {
        colorId: "pink",
        primary: "#F48FB1",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },
    ],
  },
  {
    id: "heartHairpin",
    name: "하트 머리핀",
    topCategory: "clothing",
    subCategory: "hairpin",
    svgKey: "heartHairpin",
    shapes: ["heart"],
    description: "하트 장식이 달린 머리핀이에요! 머리에 예쁘게 꽂아볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#FFD54F",
        secondary: "#FFF9C4",
        accent: "#D7A62A",
      },
      {
        colorId: "pink",
        primary: "#F48FB1",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },
      {
        colorId: "purple",
        primary: "#BA68C8",
        secondary: "#F3E5F5",
        accent: "#6A1B9A",
      },
      {
        colorId: "blue",
        primary: "#64B5F6",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },
      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#ECEFF1",
        accent: "#78909C",
      },
    ],
  },

  {
    id: "starFlower",
    name: "별모양꽃",
    topCategory: "nature",
    subCategory: "plant",
    svgKey: "starFlower",
    shapes: ["star"],
    description:
      "별처럼 생긴 꽃잎이 활짝 피었어요! 꽃 가운데에는 어떤 색이 숨어 있을까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#F6D6D0",
        secondary: "#FFF3E8",
        accent: "#B83D55",
      },
      {
        colorId: "red",
        primary: "#E53955",
        secondary: "#FFB6C1",
        accent: "#8E1838",
      },
      {
        colorId: "orange",
        primary: "#FFAD66",
        secondary: "#FFE1B8",
        accent: "#C65D24",
      },
      {
        colorId: "yellow",
        primary: "#FFD95A",
        secondary: "#FFF1A8",
        accent: "#C98B22",
      },
      {
        colorId: "green",
        primary: "#78B96D",
        secondary: "#C9E8A9",
        accent: "#397344",
      },
      {
        colorId: "blue",
        primary: "#77BDEB",
        secondary: "#D7F0FF",
        accent: "#315EAD",
      },
      {
        colorId: "purple",
        primary: "#AB83D9",
        secondary: "#E9D9FA",
        accent: "#68419A",
      },
      {
        colorId: "white",
        primary: "#FFFDF5",
        secondary: "#F4EDE4",
        accent: "#D98B9D",
      },
      {
        colorId: "pink",
        primary: "#F49AB5",
        secondary: "#FFD9E4",
        accent: "#AD365D",
      },
    ],
  },
  {
    id: "heartOwl",
    name: "하트올빼미",
    topCategory: "animal",
    subCategory: "bird",
    svgKey: "heartOwl",
    shapes: [],
    description:
      "얼굴이 하트처럼 생긴 올빼미예요! 동그란 눈으로 주변을 살펴보고 있어요.",
    variants: [
      {
        colorId: "natural",
        primary: "#B99A7A",
        secondary: "#FFF2D9",
        accent: "#49372D",
      },
      {
        colorId: "red",
        primary: "#D96B72",
        secondary: "#FFE0D9",
        accent: "#792F3D",
      },
      {
        colorId: "orange",
        primary: "#E89A51",
        secondary: "#FFE4B8",
        accent: "#8C4D2C",
      },
      {
        colorId: "yellow",
        primary: "#E9CB67",
        secondary: "#FFF5C8",
        accent: "#8B713A",
      },
      {
        colorId: "green",
        primary: "#8BAA79",
        secondary: "#E0EACD",
        accent: "#405B3B",
      },
      {
        colorId: "blue",
        primary: "#83B8D8",
        secondary: "#E0F1F9",
        accent: "#365B78",
      },
      {
        colorId: "purple",
        primary: "#A995C7",
        secondary: "#EDE3F6",
        accent: "#5D477B",
      },
      {
        colorId: "black",
        primary: "#55545A",
        secondary: "#E6E1E8",
        accent: "#25242B",
      },
      {
        colorId: "white",
        primary: "#E8E6DF",
        secondary: "#FFFCF4",
        accent: "#8A776A",
      },
      {
        colorId: "pink",
        primary: "#DDA0AD",
        secondary: "#FFE5E9",
        accent: "#754451",
      },
      {
        colorId: "brown",
        primary: "#8B6248",
        secondary: "#E8D2B8",
        accent: "#422D24",
      },
    ],
  },
  {
    id: "heartKeychain",
    name: "하트 열쇠고리",
    topCategory: "unknown",
    subCategory: "unknown",
    svgKey: "heartKeychain",
    shapes: ["heart"],
    description: "하트 장식이 달린 열쇠고리예요! 가방에 달아볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#F48FB1",
        secondary: "#FCE4EC",
        accent: "#B0BEC5",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#B0BEC5",
      },
      {
        colorId: "pink",
        primary: "#F8BBD0",
        secondary: "#FFF1F5",
        accent: "#90A4AE",
      },
      {
        colorId: "yellow",
        primary: "#FFD54F",
        secondary: "#FFF9C4",
        accent: "#B0BEC5",
      },
      {
        colorId: "purple",
        primary: "#BA68C8",
        secondary: "#F3E5F5",
        accent: "#90A4AE",
      },
    ],
  },
  {
    id: "heartLeaf",
    name: "하트 모양 잎사귀",
    topCategory: "nature",
    subCategory: "plant",
    svgKey: "heartLeaf",
    shapes: ["heart"],
    description: "잎사귀가 꼭 하트처럼 생겼어요! 초록 잎맥도 찾아볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#66BB6A",
        secondary: "#A5D6A7",
        accent: "#2E7D32",
      },
      {
        colorId: "green",
        primary: "#66BB6A",
        secondary: "#C8E6C9",
        accent: "#2E7D32",
      },
      {
        colorId: "yellow",
        primary: "#DCE775",
        secondary: "#F0F4C3",
        accent: "#7CB342",
      },
      {
        colorId: "brown",
        primary: "#A1887F",
        secondary: "#D7CCC8",
        accent: "#5D4037",
      },
    ],
  },
  // ==================================================
  // 1. 하트 초콜릿
  // ==================================================
  {
    id: "heartChocolate",
    name: "하트 초콜릿",
    topCategory: "food",
    subCategory: "snack",
    svgKey: "heartChocolate",
    shapes: ["heart"],
    description:
      "달콤한 초콜릿이 하트 모양으로 만들어졌어요! 한 입 먹어볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#795548",
        secondary: "#A1887F",
        accent: "#F5D6A7",
      },
      {
        colorId: "brown",
        primary: "#6D4C41",
        secondary: "#A1887F",
        accent: "#D7CCC8",
      },
      {
        colorId: "white",
        primary: "#FFF3E0",
        secondary: "#D7CCC8",
        accent: "#BCAAA4",
      },
      {
        colorId: "pink",
        primary: "#F8BBD0",
        secondary: "#F48FB1",
        accent: "#AD1457",
      },
    ],
  },

  // ==================================================
  // 2. 하트 비누
  // ==================================================
  {
    id: "heartSoap",
    name: "하트 비누",
    topCategory: "unknown",
    subCategory: "unknown",
    svgKey: "heartSoap",
    shapes: ["heart"],
    description: "하트 모양 비누로 손을 깨끗하게 씻어요! 향긋한 거품이 나요.",
    variants: [
      {
        colorId: "natural",
        primary: "#F8BBD0",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFCDD2",
        accent: "#B71C1C",
      },
      {
        colorId: "yellow",
        primary: "#FFD54F",
        secondary: "#FFF9C4",
        accent: "#F9A825",
      },
      {
        colorId: "blue",
        primary: "#90CAF9",
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
        colorId: "green",
        primary: "#A5D6A7",
        secondary: "#E8F5E9",
        accent: "#2E7D32",
      },
    ],
  },

  // ==================================================
  // 3. 하트 액자
  // ==================================================
  {
    id: "heartFrame",
    name: "하트 액자",
    topCategory: "unknown",
    subCategory: "unknown",
    svgKey: "heartFrame",
    shapes: ["heart"],
    description:
      "소중한 사진을 넣어두는 하트 모양 액자예요! 누구의 사진을 넣을까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#A1887F",
        secondary: "#FFF3E0",
        accent: "#6D4C41",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFEBEE",
        accent: "#B71C1C",
      },
      {
        colorId: "pink",
        primary: "#F8BBD0",
        secondary: "#FFF1F5",
        accent: "#C2185B",
      },
      {
        colorId: "yellow",
        primary: "#FFD54F",
        secondary: "#FFF9C4",
        accent: "#F9A825",
      },
      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#e7eaed",
        accent: "#90A4AE",
      },
      {
        colorId: "brown",
        primary: "#8D6E63",
        secondary: "#D7CCC8",
        accent: "#4E342E",
      },
    ],
  },

  // ==================================================
  // 4. 별 스티커
  // ==================================================
  {
    id: "shootingStar",
    name: "별똥별",
    topCategory: "nature",
    subCategory: "sky",
    svgKey: "shootingStar",
    shapes: ["star"],
    description: "별똥별이 떨어져요! 우리 같이 소원을 빌어볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#FFD54F",
        secondary: "#FFF9C4",
        accent: "#F9A825",
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
        secondary: "#FFF3E0",
        accent: "#E65100",
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
        colorId: "pink",
        primary: "#F48FB1",
        secondary: "#FCE4EC",
        accent: "#AD1457",
      },
    ],
  },

  // ==================================================
  // 6. 별 머리핀
  // ==================================================
  {
    id: "starHairpin",
    name: "별 머리핀",
    topCategory: "clothing",
    subCategory: "hairpin",
    svgKey: "starHairpin",
    shapes: ["star"],
    description: "별 장식이 달린 머리핀이에요! 머리에 예쁘게 꽂아볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#FFD54F",
        secondary: "#FFF9C4",
        accent: "#D7A62A",
      },
      {
        colorId: "pink",
        primary: "#F48FB1",
        secondary: "#FCE4EC",
        accent: "#C2185B",
      },
      {
        colorId: "purple",
        primary: "#BA68C8",
        secondary: "#F3E5F5",
        accent: "#6A1B9A",
      },
      {
        colorId: "blue",
        primary: "#64B5F6",
        secondary: "#E3F2FD",
        accent: "#1565C0",
      },
      {
        colorId: "white",
        primary: "#FAFAFA",
        secondary: "#ECEFF1",
        accent: "#78909C",
      },
    ],
  },

  // ==================================================
  // 8. 삼각 치즈
  // ==================================================
  {
    id: "triangleCheese",
    name: "삼각 치즈",
    topCategory: "unknown",
    subCategory: "unknown",
    svgKey: "triangleCheese",
    shapes: ["triangle"],
    description: "노랗고 고소한 삼각 치즈예요! 맛있는 간식을 만들어볼까요?",
    variants: [
      {
        colorId: "natural",
        primary: "#FFD54F",
        secondary: "#FFF0A8",
        accent: "#E6A817",
      },
      {
        colorId: "yellow",
        primary: "#FFCA28",
        secondary: "#FFF59D",
        accent: "#F9A825",
      },
      {
        colorId: "orange",
        primary: "#FFB74D",
        secondary: "#FFE0B2",
        accent: "#E65100",
      },
      {
        colorId: "white",
        primary: "#FFF8E1",
        secondary: "#FFFFFF",
        accent: "#D7CCC8",
      },
    ],
  },

  // ==================================================
  // 9. 삼각 표지판
  // ==================================================
  {
    id: "triangleSign",
    name: "삼각 표지판",
    topCategory: "unknown",
    subCategory: "unknown",
    svgKey: "triangleSign",
    shapes: ["triangle"],
    description: "세모 모양 표지판이에요! 길을 지날 때 표지판을 잘 살펴봐요.",
    variants: [
      {
        colorId: "natural",
        primary: "#FFD54F",
        secondary: "#FFFFFF",
        accent: "#D32F2F",
      },
      {
        colorId: "red",
        primary: "#EF5350",
        secondary: "#FFFFFF",
        accent: "#B71C1C",
      },
      {
        colorId: "yellow",
        primary: "#FFD54F",
        secondary: "#FFFDE7",
        accent: "#D32F2F",
      },
      {
        colorId: "blue",
        primary: "#64B5F6",
        secondary: "#FFFFFF",
        accent: "#1565C0",
      },
    ],
  },

  {
    id: "wheel",
    name: "바퀴",
    topCategory: "unknown",
    subCategory: "unknown",
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
    subCategory: "rail_vehicle",
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
    shapes: [],
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
    subCategory: "construction_vehicle",
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
    subCategory: "rail_vehicle",
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
    subCategory: "construction_vehicle",
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
    shapes: [],
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
    subCategory: "farm_animal",
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
    subCategory: "wild_animal",
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
    subCategory: "farm_animal",
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
    subCategory: "pet",
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
    subCategory: "pet",
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
    subCategory: "pet",
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
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
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
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
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
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
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
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
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
    shapes: [], // TODO: shapesPool 연결 단계에서 채움
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
    name: "국",
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
    shapes: [],
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
    id: "gimbap1",
    name: "김밥",
    topCategory: "unknown",
    subCategory: "unknown",
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
    shapes: ["triangle"],
    description: "맛있는 피자가 짠! 한 조각 쏙 떼어 먹어볼까요?",
    variants: [
      {
        colorId: "natural", // 피자 본래의 모습 (노란 치즈 + 붉은 토마토 소스/페퍼로니 + 갈색 도우)
        primary: "#FFB300", // 치즈/도우 기본 톤
        secondary: "#E53935", // 토마토 소스 및 페퍼로니 포인트
        accent: "#43A047", // 피망/바질 등 채소 토핑 포인트
      },
      {
        colorId: "red", // 매콤한 페퍼로니/토마토 피자 계열
        primary: "#EF6C00",
        secondary: "#D32F2F",
        accent: "#B71C1C",
      },
      {
        colorId: "yellow", // 치즈가 듬뿍 들어간 고소한 치즈피자 계열
        primary: "#FFEE58",
        secondary: "#FDD835",
        accent: "#FBC02D",
      },
    ],
  },
  {
    id: "hamburger",
    name: "햄버거",
    topCategory: "food",
    subCategory: "meal",
    svgKey: "hamburger",
    shapes: [],
    description: "빵 사이에 맛있는 재료가 차곡차곡! 햄버거가 완성됐어요.",
    variants: [
      {
        colorId: "natural", // 햄버거 본래의 모습 (노릇한 빵 + 갈색 패티 + 초록 상추 등)
        primary: "#D4A574", // 빵 번 색상
        secondary: "#8D6E63", // 패티 및 고기 색상
        accent: "#66BB6A", // 양상추 포인트 색상
      },
      {
        colorId: "brown", // 바삭하게 구워진 수제버거 계열
        primary: "#A1887F",
        secondary: "#6D4C41",
        accent: "#5D4037",
      },
      {
        colorId: "orange", // 진한 체다 치즈와 소스가 어우러진 버거 계열
        primary: "#FFB74D",
        secondary: "#E65100",
        accent: "#F57C00",
      },
    ],
  },
  {
    id: "ball",
    name: "공",
    topCategory: "things",
    subCategory: "ball",
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
    topCategory: "clothing",
    subCategory: "glasses",
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
    topCategory: "things",
    subCategory: "ball",
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
    topCategory: "things",
    subCategory: "ball",
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
    topCategory: "things",
    subCategory: "ball",
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
    topCategory: "nature",
    subCategory: "sky",
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
    topCategory: "things",
    subCategory: "balloon",
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
    topCategory: "nature",
    subCategory: "sky",
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
    topCategory: "unknown",
    subCategory: "unknown",
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
    topCategory: "unknown",
    subCategory: "unknown",
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
    topCategory: "unknown",
    subCategory: "unknown",
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
    topCategory: "unknown",
    subCategory: "unknown",
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
    topCategory: "unknown",
    subCategory: "unknown",
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
    topCategory: "unknown",
    subCategory: "unknown",
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
    topCategory: "unknown",
    subCategory: "unknown",
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
    topCategory: "things",
    subCategory: "electronics",
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
    topCategory: "unknown",
    subCategory: "unknown",
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
    topCategory: "things",
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
    topCategory: "unknown",
    subCategory: "unknown",
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
    topCategory: "unknown",
    subCategory: "unknown",
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
    topCategory: "things",
    subCategory: "clock",
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
    topCategory: "unknown",
    subCategory: "unknown",
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
    topCategory: "things",
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
    topCategory: "things",
    subCategory: "electronics",
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
    topCategory: "things",
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
    topCategory: "things",
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
    topCategory: "clothing",
    subCategory: "glasses",
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
    topCategory: "things",
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
    topCategory: "things",
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
    topCategory: "things",
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
    topCategory: "unknown",
    subCategory: "unknown",
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
    id: "triangleRuler",

    name: "삼각자",

    topCategory: "things",

    subCategory: "stationery",

    svgKey: "triangleRuler",

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

    topCategory: "things",

    subCategory: "musical_instrument",

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

    topCategory: "nature",

    subCategory: "plant",

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

    topCategory: "unknown",

    subCategory: "unknown",

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

    topCategory: "unknown",

    subCategory: "unknown",

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
    ],
  },
  {
    id: "pyramid",

    name: "피라미드",

    topCategory: "unknown",

    subCategory: "unknown",

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

    topCategory: "unknown",

    subCategory: "unknown",

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

    topCategory: "nature",

    subCategory: "plant",

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

    topCategory: "unknown",

    subCategory: "unknown",

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

    topCategory: "unknown",

    subCategory: "unknown",

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

    topCategory: "things",
    subCategory: "balloon",

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

    topCategory: "unknown",

    subCategory: "unknown",

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

    topCategory: "unknown",

    subCategory: "unknown",

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

    topCategory: "clothing",

    subCategory: "button",

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

    topCategory: "things",

    subCategory: "clock",

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

    topCategory: "clothing",
    subCategory: "glasses",

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

    topCategory: "unknown",

    subCategory: "unknown",

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

    subCategory: "necklace",

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

    topCategory: "unknown",

    subCategory: "unknown",

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
    topCategory: "things",
    subCategory: "balloon",

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

    topCategory: "unknown",

    subCategory: "unknown",

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

    topCategory: "unknown",

    subCategory: "unknown",

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

    topCategory: "unknown",

    subCategory: "unknown",

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
    topCategory: "clothing",

    subCategory: "button",

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

    topCategory: "things",

    subCategory: "clock",

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
        secondary: "#FFF59D",
        accent: "#FFC107",
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

    topCategory: "unknown",

    subCategory: "unknown",

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

    topCategory: "unknown",

    subCategory: "unknown",

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
    topCategory: "clothing",
    subCategory: "glasses",

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
    subCategory: "necklace",
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
    topCategory: "unknown",
    subCategory: "unknown",
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
    topCategory: "clothing",
    subCategory: "button",
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
    topCategory: "clothing",

    subCategory: "button",
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
    topCategory: "things",
    subCategory: "clock",
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

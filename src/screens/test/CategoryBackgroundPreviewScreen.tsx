import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import AnimalCategoryBackground, {
  AnimalBackgroundKind,
} from "../../components/CategorySorting/AnimalCategoryBackgrounds";
import FoodCategoryBackground, {
  FoodBackgroundKind,
} from "../../components/CategorySorting/FoodCategoryBackgrounds";
import ClothingCategoryBackground, {
  ClothingBackgroundKind,
} from "../../components/CategorySorting/ClothingCategoryBackgrounds";

import VehicleCategoryBackground, {
  VehicleBackgroundCategory,
} from "../../components/CategorySorting/VehicleCategoryBackgrounds";
import {
  ThingsCategoryBackground,
  ThingsCategoryKind,
} from "../../components/CategorySorting/ThingsCategoryBackgrounds";
import RemainCategoryBackground, {
  NatureBackgroundKind,
} from "../../components/CategorySorting/NatureCategoryBackgrounds";

const ANIMAL_PREVIEW_ITEMS: {
  category: AnimalBackgroundKind;
  label: string;
  description: string;
  color: string;
}[] = [
  {
    category: "animal",
    label: "동물",
    description: "넓은 초원과 언덕",
    color: "#62B985",
  },
  {
    category: "pet",
    label: "반려동물",
    description: "강아지집과 낮은 울타리",
    color: "#E9B94F",
  },
  {
    category: "farm_animal",
    label: "농장동물",
    description: "헛간과 농장 울타리",
    color: "#E88778",
  },
  {
    category: "wild_animal",
    label: "숲·야생동물",
    description: "나무와 깊은 숲",
    color: "#69AE75",
  },
  {
    category: "sea_animal",
    label: "바다동물",
    description: "바닷속 물결과 해초",
    color: "#39A9D5",
  },
  {
    category: "bird",
    label: "새",
    description: "나뭇가지와 빈 둥지",
    color: "#987BD0",
  },
  {
    category: "insect",
    label: "곤충",
    description: "풀밭과 작은 꽃",
    color: "#E8788B",
  },
];
const FOOD_PREVIEW_ITEMS: {
  category: FoodBackgroundKind;
  label: string;
  description: string;
  color: string;
}[] = [
  {
    category: "food",
    label: "먹는 것",
    description: "맛있는 음식이 가득한 요리 세계",
    color: "#E88778", // 🍎 상큼한 코랄/레드 톤
  },
  {
    category: "fruit",
    label: "과일",
    description: "싱그러운 과일 나무와 잎사귀",
    color: "#E88778", // 🍎 레드/코랄 톤
  },
  {
    category: "vegetable",
    label: "채소",
    description: "초록빛 텃밭과 흙 언덕",
    color: "#69AE75", // 🥕 그린 톤
  },
  {
    category: "meal",
    label: "한 끼 음식",
    description: "따뜻한 식탁과 포크, 숟가락",
    color: "#E9B94F", // 🍚 웜 옐로우 톤
  },
  {
    category: "snack",
    label: "간식",
    description: "알록달록 달콤한 디저트 상자",
    color: "#E8788B", // 🍰 핑크/마젠타 톤
  },
  {
    category: "drink",
    label: "음료",
    description: "시원한 물결과 컵 받침대",
    color: "#39A9D5", // 🥛 스카이 블루 톤
  },
];
const CLOTHING_PREVIEW_ITEMS: {
  category: ClothingBackgroundKind;
  label: string;
  description: string;
  color: string;
}[] = [
  {
    category: "clothing",
    label: "의류 및 꾸미는 물건",
    description: "멋진 옷과 반짝이는 액세서리 상자",
    color: "#F2A7B8", // 👗 러블리한 파스텔 핑크 톤
  },
  {
    category: "hat",
    label: "모자",
    description: "아늑한 옷걸이와 모자 선반",
    color: "#E9B94F", // 👒 따뜻한 옐로우/브라운 톤
  },
  {
    category: "clothes",
    label: "옷",
    description: "알록달록 예쁜 옷장과 드레스룸",
    color: "#6BAA83", // 👕 세련된 엠버/그린 톤
  },
  {
    category: "shoes",
    label: "신발",
    description: "깔끔한 신발장과 푹신한 매트",
    color: "#E88778", // 👟 코랄/어씨 톤
  },
  {
    category: "hairpin",
    label: "머리핀",
    description: "반짝이는 보석함과 드레서",
    color: "#F2A7B8", // 🎀 러블리 핑크 톤
  },
  {
    category: "necklace",
    label: "목걸이",
    description: "화려한 액세서리 스탠드",
    color: "#987BD0", // 📿 은은한 퍼플 톤
  },
  {
    category: "glasses",
    label: "안경",
    description: "동글동글 안경케이스와 거울",
    color: "#39A9D5", // 👓 시원한 스카이 블루 톤
  },
];

export const NATURE_CATEGORY_PREVIEW_ITEMS: {
  category: NatureBackgroundKind;
  label: string;
  description: string;
  color: string;
}[] = [
  {
    category: "nature",
    label: "자연",
    description: "푸른 하늘과 파릇파릇 싱그러운 숲",
    color: "#69AE75", // 🌿 포근하고 건강한 내추럴 그린 톤
  },
  {
    category: "sky",
    label: "하늘",
    description: "푸른 하늘과 두둥실 뭉게구름",
    color: "#65A9E8", // 🌤️ 포근하고 시원한 맑은 하늘 블루 톤
  },
  {
    category: "plant",
    label: "식물",
    description: "싱그러운 파릇파릇 숲과 정원",
    color: "#69AE75", // 🍃 따뜻하고 건강한 자연 초록 톤
  },
];

export const VEHICLE_SUB_CATEGORY_PREVIEW_ITEMS: {
  category: VehicleBackgroundCategory;
  label: string;
  description: string;
  color: string;
}[] = [
  {
    category: "vehicle",
    label: "탈 것",
    description: "씽씽 달리고 쌩쌩 나는 멋진 탈 것",
    color: "#39A9D5", // 🚗 시원한 블루/스카이 톤
  },
  {
    category: "road_vehicle",
    label: "도로에서 다니는 탈 것",
    description: "차선 따라 씽씽 달리는 알록달록 자동차길",
    color: "#4D8DFF", // 🚘 선명하고 경쾌한 블루 톤
  },
  {
    category: "rail_vehicle",
    label: "레일 위를 다니는 탈 것",
    description: "칙칙폭폭 길게 이어진 기찻길과 선로",
    color: "#E9B94F", // 🚆 클래식한 옐로우/오렌지 톤
  },
  {
    category: "air_vehicle",
    label: "하늘을 나는 탈 것",
    description: "높은 구름 위를 쌩쌩 날아가는 하늘길",
    color: "#55D6BE", // ✈️ 상쾌한 민트 스카이 톤
  },
  {
    category: "water_vehicle",
    label: "물에서 다니는 탈 것",
    description: "찰랑이는 시원한 바다와 물결 정거장",
    color: "#39A9D5", // 🚢 깊고 시원한 오션 블루 톤
  },
  {
    category: "construction_vehicle",
    label: "공사하는 차",
    description: "뚝딱뚝딱 멋지게 건설하는 공사 현장",
    color: "#FFB020", // 🏗️ 강렬하고 활기찬 중장비 옐로우 톤
  },
];

export const THINGS_SUB_CATEGORY_PREVIEW_ITEMS: {
  category: ThingsCategoryKind;
  label: string;
  description: string;
  color: string;
}[] = [
  {
    category: "things",
    label: "생활물건과 놀이물건",
    description: "신나는 장난감과 편리한 우리 집 물건",
    color: "#987BD0", // 🎨 아기자기한 보라/퍼플 톤
  },
  {
    category: "musical_instrument",
    label: "악기",
    description: "아름다운 소리가 울려 퍼지는 음악실",
    color: "#E88778", // 🎸 따뜻하고 감성적인 코랄 톤
  },
  {
    category: "clock",
    label: "시계",
    description: "째깍째깍 시간을 알려주는 알록달록 시계",
    color: "#E9B94F", // ⏰ 밝고 화사한 옐로우 톤
  },
  {
    category: "stationery",
    label: "문구",
    description: "알록달록 연필과 공책이 가득한 책상",
    color: "#4D8DFF", // ✏️ 깔끔하고 선명한 블루 톤
  },
  {
    category: "electronics",
    label: "전자제품",
    description: "우리 생활을 편리하게 도와주는 가전제품",
    color: "#39A9D5", // 💻 스마트하고 시원한 스카이 블루 톤
  },
  {
    category: "furniture",
    label: "가구",
    description: "아늑하고 포근한 우리 집 방 꾸미기",
    color: "#A28AF5", // 🛏️ 부드러운 퍼플/라벤더 톤
  },
  {
    category: "ball",
    label: "공",
    description: "데굴데굴 통통 튀기는 신나는 구기 운동",
    color: "#FF6FAE", // 🏀 활기차고 경쾌한 핑크 톤
  },
  {
    category: "balloon",
    label: "풍선",
    description: "둥실둥실 하늘 높이 날아가는 알록달록 풍선",
    color: "#55D6BE", // 🎈 상쾌하고 예쁜 민트 톤
  },
  {
    category: "toys_sports",
    label: "장난감·놀이 도구",
    description: "즐겁게 뛰놀며 상상력을 키우는 놀이 공간",
    color: "#FFB020", // 🧸 즐겁고 활기찬 오렌지/옐로우 톤
  },
];
export default function AnimalCategoryBackgroundPreviewScreen() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <PageHeader>
          <PageTitle>동물 카테고리 배경 미리보기</PageTitle>
          <PageSubtitle>
            배경만 표시한 SVG 시안이야. 실제 분류 Object 스티커를 올리기 전
            장면의 색감과 공간을 확인해 봐.
          </PageSubtitle>
        </PageHeader>

        <PreviewGrid>
          {ANIMAL_PREVIEW_ITEMS.map((item) => (
            <PreviewCard key={item.category}>
              <CardHeader>
                <ColorDot color={item.color} />
                <CardTitle>{item.label}</CardTitle>
              </CardHeader>

              <IllustrationFrame>
                <AnimalCategoryBackground
                  category={item.category}
                  width="100%"
                  height="100%"
                />
              </IllustrationFrame>

              <CardDescription>{item.description}</CardDescription>
              <CategoryCode>{item.category}</CategoryCode>
            </PreviewCard>
          ))}
          {FOOD_PREVIEW_ITEMS.map((item) => (
            <PreviewCard key={item.category}>
              <CardHeader>
                <ColorDot color={item.color} />
                <CardTitle>{item.label}</CardTitle>
              </CardHeader>

              <IllustrationFrame>
                <FoodCategoryBackground
                  category={item.category}
                  width="100%"
                  height="100%"
                />
              </IllustrationFrame>

              <CardDescription>{item.description}</CardDescription>
              <CategoryCode>{item.category}</CategoryCode>
            </PreviewCard>
          ))}
          {CLOTHING_PREVIEW_ITEMS.map((item) => (
            <PreviewCard key={item.category}>
              <CardHeader>
                <ColorDot color={item.color} />
                <CardTitle>{item.label}</CardTitle>
              </CardHeader>

              <IllustrationFrame>
                <ClothingCategoryBackground
                  category={item.category}
                  width="100%"
                  height="100%"
                />
              </IllustrationFrame>

              <CardDescription>{item.description}</CardDescription>
              <CategoryCode>{item.category}</CategoryCode>
            </PreviewCard>
          ))}
          {NATURE_CATEGORY_PREVIEW_ITEMS.map((item) => (
            <PreviewCard key={item.category}>
              <CardHeader>
                <ColorDot color={item.color} />
                <CardTitle>{item.label}</CardTitle>
              </CardHeader>

              <IllustrationFrame>
                <RemainCategoryBackground
                  category={item.category}
                  width="100%"
                  height="100%"
                />
              </IllustrationFrame>

              <CardDescription>{item.description}</CardDescription>
              <CategoryCode>{item.category}</CategoryCode>
            </PreviewCard>
          ))}
          {VEHICLE_SUB_CATEGORY_PREVIEW_ITEMS.map((item) => (
            <PreviewCard key={item.category}>
              <CardHeader>
                <ColorDot color={item.color} />
                <CardTitle>{item.label}</CardTitle>
              </CardHeader>

              <IllustrationFrame>
                <VehicleCategoryBackground
                  category={item.category}
                  width="100%"
                  height="100%"
                />
              </IllustrationFrame>

              <CardDescription>{item.description}</CardDescription>
              <CategoryCode>{item.category}</CategoryCode>
            </PreviewCard>
          ))}
          {THINGS_SUB_CATEGORY_PREVIEW_ITEMS.map((item) => (
            <PreviewCard key={item.category}>
              <CardHeader>
                <ColorDot color={item.color} />
                <CardTitle>{item.label}</CardTitle>
              </CardHeader>

              <IllustrationFrame>
                <ThingsCategoryBackground
                  category={item.category}
                  width="100%"
                  height="100%"
                />
              </IllustrationFrame>

              <CardDescription>{item.description}</CardDescription>
              <CategoryCode>{item.category}</CategoryCode>
            </PreviewCard>
          ))}
        </PreviewGrid>

        <Hint>
          확인 포인트: 중앙에 놓일 스티커가 배경에 묻히지 않는지, 각 장면이
          이름을 읽지 않아도 서로 구분되는지 살펴봐 줘.
        </Hint>
      </ScrollView>
    </Screen>
  );
}

const Screen = styled.View`
  flex: 1;
  background-color: #f7f8f4;
`;

const PageHeader = styled.View`
  margin-bottom: 20px;
  gap: 7px;
`;

const PageTitle = styled(Text)`
  font-size: 22px;
  font-weight: 900;
  color: #34483b;
`;

const PageSubtitle = styled(Text)`
  font-size: 13px;
  line-height: 20px;
  color: #718075;
`;

const PreviewGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 14px;
`;

const PreviewCard = styled.View`
  width: 48.5%;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 18px;
  border-width: 1px;
  border-color: #e4eae1;
`;

const CardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 7px;
  margin-bottom: 9px;
`;

const ColorDot = styled.View<{ color: string }>`
  width: 9px;
  height: 9px;
  border-radius: 5px;
  background-color: ${(p) => p.color};
`;

const CardTitle = styled(Text)`
  flex-shrink: 1;
  font-size: 13px;
  font-weight: 800;
  color: #34483b;
`;

const IllustrationFrame = styled.View`
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 12px;
  background-color: #eaf5e9;
`;

const CardDescription = styled(Text)`
  margin-top: 9px;
  font-size: 12px;
  font-weight: 700;
  color: #4f6656;
`;

const CategoryCode = styled(Text)`
  margin-top: 3px;
  font-size: 10px;
  color: #9aa59b;
`;

const Hint = styled(Text)`
  margin-top: 18px;
  padding: 13px;
  overflow: hidden;
  border-radius: 12px;
  background-color: #edf3e9;
  color: #647663;
  font-size: 12px;
  line-height: 19px;
`;

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 32,
  },
});

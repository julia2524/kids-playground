import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import AnimalCategoryBackground, {
  AnimalBackgroundKind,
} from "../../components/CategorySorting/AnimalCategoryBackgrounds";
import FoodCategoryBackground, {
  FoodBackgroundKind,
} from "../../components/CategorySorting/FoodCategoryBackgrounds";

const ANIMAL_PREVIEW_ITEMS: {
  category: AnimalBackgroundKind;
  label: string;
  description: string;
  color: string;
}[] = [
  {
    category: "animal",
    label: "animal",
    description: "넓은 초원과 언덕",
    color: "#62B985",
  },
  {
    category: "pet",
    label: "pet",
    description: "강아지집과 낮은 울타리",
    color: "#E9B94F",
  },
  {
    category: "farm_animal",
    label: "farm_animal",
    description: "헛간과 농장 울타리",
    color: "#E88778",
  },
  {
    category: "wild_animal",
    label: "wild_animal",
    description: "나무와 깊은 숲",
    color: "#69AE75",
  },
  {
    category: "sea_animal",
    label: "sea_animal",
    description: "바닷속 물결과 해초",
    color: "#39A9D5",
  },
  {
    category: "bird",
    label: "bird",
    description: "나뭇가지와 빈 둥지",
    color: "#987BD0",
  },
  {
    category: "insect",
    label: "insect",
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

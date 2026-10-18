import React, { useState, useMemo } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";

import { AppText } from "../../utils/AppText";
import AppHeader from "../../components/AppHeader";
import GradientBackground from "../../design-system/components/GradientBackground";
import { colors } from "../../design-system/tokens/colors";
import { classificationItems } from "../../data/classification/classificationItems";
import { RenderClassificationItemSvg } from "../../assets/Classification/classificationItemSvgs";

// 🌿 1. 전체 고정 대분류 리스트 정의
const ALL_TOP_CATEGORIES = [
  "animal",
  "food",
  "clothing",
  "living",
  "vehicle",
  "nature",
  "unknown",
];

// 카테고리 한국어 라벨 맵핑
const TOP_CATEGORY_LABELS: Record<string, string> = {
  all: "전체 대분류",
  animal: "동물",
  food: "음식",
  clothing: "의류",
  living: "생활",
  vehicle: "탈것",
  nature: "자연",
  unknown: "알 수 없음",
};

// 🌿 2. 전체 고정 중분류 리스트 정의 (대분류별 매핑 정보 포함)
// 각 중분류가 어떤 대분류에 속하는지 명시해주면 연동하기 훨씬 깔끔합니다!
export const SUB_CATEGORY_MAP: Record<string, string[]> = {
  animal: [
    "pet",
    "farm_animal",
    "wild_animal",
    "sea_animal",
    "bird",
    "insect",
    "small_animal",
  ],

  food: ["fruit", "vegetable", "meal", "snack", "drink"],

  clothing: [
    "hat",
    "clothes",
    "shoes",
    "hairpin",
    "necklace",
    "glasses",
    "button",
  ],

  nature: ["sky", "plant"],

  vehicle: [
    "road_vehicle",
    "rail_vehicle",
    "air_vehicle",
    "water_vehicle",
    "construction_vehicle",
  ],

  living: [
    "musical_instrument",
    "clock",
    "stationery",
    "electronics",
    "furniture",
    "ball",
    "balloon",
    "toys_sports",
    "daily",
  ],

  unknown: ["unknown"],
};

export default function CategoryStickerPreviewScreen({
  navigation,
}: {
  navigation: any;
}) {
  // 1️⃣ 모든 스티커 데이터
  const allStickers = useMemo(() => classificationItems, []);

  // 2️⃣ 🗂️ 탭 선택 상태 관리
  const [selectedTopCategory, setSelectedTopCategory] = useState<string>("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("all");

  // 3️⃣ 🎨 각 스티커별 현재 색상 변형(Variant) 인덱스 관리
  const [selectedVariantMap, setSelectedVariantMap] = useState<
    Record<string, number>
  >({});

  const handleSelectVariant = (stickerId: string, variantIndex: number) => {
    setSelectedVariantMap((prev) => ({
      ...prev,
      [stickerId]: variantIndex,
    }));
  };

  // 4️⃣ 🔍 선택된 Top/Sub 카테고리에 따라 전체 스티커 필터링
  const filteredStickers = useMemo(() => {
    return allStickers.filter((sticker: any) => {
      const matchTop =
        selectedTopCategory === "all" ||
        sticker.topCategory === selectedTopCategory;
      const matchSub =
        selectedSubCategory === "all" ||
        sticker.subCategory === selectedSubCategory;
      return matchTop && matchSub;
    });
  }, [allStickers, selectedTopCategory, selectedSubCategory]);

  const getShapeMeta = (shapeName: string) => {
    switch (shapeName) {
      case "star":
        return {
          label: "별",
          icon: "star" as const,
          color: "#FBBF24",
          bg: colors.softYellow,
        };
      case "heart":
        return {
          label: "하트",
          icon: "heart" as const,
          color: colors.pink,
          bg: colors.softPink,
        };
      case "circle":
        return {
          label: "동그라미",
          icon: "ellipse" as const,
          color: colors.blue,
          bg: colors.softBlue,
        };
      case "triangle":
        return {
          label: "세모",
          icon: "triangle" as const,
          color: colors.mint,
          bg: colors.softMint,
        };
      case "square":
      case "rectangle":
        return {
          label: "네모",
          icon: "square" as const,
          color: colors.purple,
          bg: colors.button.secondary,
        };
      default:
        return {
          label: shapeName,
          icon: "shapes" as const,
          color: colors.muted,
          bg: "#F8F7FC",
        };
    }
  };

  // 대분류 목록은 항상 전체 고정 리스트 사용
  const availableTopCategories = ["all", ...ALL_TOP_CATEGORIES];

  // 💡 [핵심 수정] 선택된 대분류(selectedTopCategory)에 해당하는 중분류만 필터링해서 보여주기!
  const availableSubCategories = useMemo(() => {
    if (selectedTopCategory === "all") {
      // 전체 대분류일 때는 모든 중분류를 보여줌
      const allSubs = Object.values(SUB_CATEGORY_MAP).flat();
      return ["all", ...allSubs];
    } else {
      // 특정 대분류가 선택되면 그 대분류에 속한 중분류만 가져옴
      const matchedSubs = SUB_CATEGORY_MAP[selectedTopCategory] || [];
      return ["all", ...matchedSubs];
    }
  }, [selectedTopCategory]);

  return (
    <Container>
      <GradientBackground />

      <AppHeader
        title="모든 스티커 분류 및 상태 검토"
        onBackPress={() => navigation?.goBack?.()}
      />

      <Content>
        {/* 상단 요약 정보 카드 */}
        <SummaryCard>
          <SummaryHeader>
            <Ionicons name="albums" size={20} color={colors.purple} />
            <SummaryTitle>카테고리별 스티커 관리</SummaryTitle>
          </SummaryHeader>
          <TotalCountText>
            등록된 전체 스티커: <Highlight>{allStickers.length}개</Highlight> /
            현재 조건 검색됨: <Highlight>{filteredStickers.length}개</Highlight>
          </TotalCountText>
        </SummaryCard>

        {/* 🗂️ TopCategory & SubCategory 선택 탭 영역 */}
        <FilterContainer>
          {/* TopCategory 탭 */}
          <FilterSection>
            <FilterLabel>TopCategory (대분류)</FilterLabel>
            <FilterChipScroll horizontal showsHorizontalScrollIndicator={false}>
              {availableTopCategories.map((topCat) => {
                const isSelected = selectedTopCategory === topCat;
                const count =
                  topCat === "all"
                    ? allStickers.length
                    : allStickers.filter((i: any) => i.topCategory === topCat)
                        .length;

                return (
                  <FilterChip
                    key={topCat}
                    active={isSelected}
                    onPress={() => {
                      setSelectedTopCategory(topCat);
                      setSelectedSubCategory("all"); // 🌟 대분류가 바뀌면 중분류는 자동으로 'all'로 초기화!
                    }}
                  >
                    <FilterChipText active={isSelected}>
                      {TOP_CATEGORY_LABELS[topCat] || topCat} ({count})
                    </FilterChipText>
                  </FilterChip>
                );
              })}
            </FilterChipScroll>
          </FilterSection>

          {/* SubCategory 탭 (대분류에 맞는 것만 노출됨!) */}
          <FilterSection>
            <FilterLabel>SubCategory (중분류)</FilterLabel>
            <FilterChipScroll horizontal showsHorizontalScrollIndicator={false}>
              {availableSubCategories.map((subCat) => {
                const isSelected = selectedSubCategory === subCat;
                const count =
                  subCat === "all"
                    ? allStickers.filter(
                        (i: any) =>
                          selectedTopCategory === "all" ||
                          i.topCategory === selectedTopCategory,
                      ).length
                    : allStickers.filter((i: any) => i.subCategory === subCat)
                        .length;

                return (
                  <FilterChip
                    key={subCat}
                    active={isSelected}
                    onPress={() => setSelectedSubCategory(subCat)}
                  >
                    <FilterChipText active={isSelected}>
                      {subCat} ({count})
                    </FilterChipText>
                  </FilterChip>
                );
              })}
            </FilterChipScroll>
          </FilterSection>
        </FilterContainer>

        {/* 검색 결과가 없을 때 안내 문구 */}
        {filteredStickers.length === 0 && (
          <EmptyCard>
            <Ionicons
              name="folder-open-outline"
              size={36}
              color={colors.muted}
            />
            <EmptyText>이 카테고리에 속한 물품이 아직 없어요!</EmptyText>
            <SubEmptyText>
              잘못 들어간 스티커가 있거나 추가가 필요해 보이네요 ✨
            </SubEmptyText>
          </EmptyCard>
        )}

        {/* 개별 스티커 리스트 카드 */}
        {filteredStickers.map((sticker: any) => {
          const variants = sticker.variants || [];
          const rawIndex = selectedVariantMap[sticker.id] ?? 0;
          const currentIndex =
            variants.length > 0 ? Math.min(rawIndex, variants.length - 1) : 0;

          const currentVariant = variants[currentIndex] || {
            primary: "#7C5CFF",
            secondary: "#E6E1F4",
            accent: "#4A22F5",
            colorId: "default",
          };

          const shapes = sticker.shapes || [];

          return (
            <StickerCard key={sticker.id}>
              <HeaderRow>
                <TitleWrapper>
                  <StickerName>{sticker.name}</StickerName>
                  <StickerId>({sticker.svgKey})</StickerId>
                </TitleWrapper>

                {shapes.length > 0 && (
                  <ShapeBadgesRow>
                    {shapes.map((s: string) => {
                      const meta = getShapeMeta(s);
                      return (
                        <ShapeBadge
                          key={s}
                          style={{ backgroundColor: meta.bg }}
                        >
                          <Ionicons
                            name={meta.icon}
                            size={11}
                            color={meta.color}
                          />
                          <BadgeText style={{ color: meta.color }}>
                            {meta.label}
                          </BadgeText>
                        </ShapeBadge>
                      );
                    })}
                  </ShapeBadgesRow>
                )}
              </HeaderRow>

              {/* 카테고리 정보 표시 뱃지 */}
              <CategoryBadgeRow>
                <CategoryInfoBadge>
                  <CategoryInfoText>
                    Top: {sticker.topCategory || "미정"}
                  </CategoryInfoText>
                </CategoryInfoBadge>
                <CategoryInfoBadge>
                  <CategoryInfoText>
                    Sub: {sticker.subCategory || "미정"}
                  </CategoryInfoText>
                </CategoryInfoBadge>
              </CategoryBadgeRow>

              <Description>{sticker.description}</Description>

              {/* 🎨 클릭한 색상이 실시간으로 반영되는 SVG 프리뷰 */}
              <SvgPreviewContainer>
                <RenderClassificationItemSvg
                  itemId={sticker.id}
                  primary={currentVariant.primary}
                  secondary={currentVariant.secondary}
                  accent={currentVariant.accent}
                  size={100}
                />
                <SelectedColorLabel>
                  현재 적용 색상:{" "}
                  <ActiveColorText>{currentVariant.colorId}</ActiveColorText>
                </SelectedColorLabel>
              </SvgPreviewContainer>

              {/* 지원 색상 변형 칩 (터치 가능) */}
              {variants.length > 0 && (
                <VariantSection>
                  <VariantLabel>
                    지원 색상 변형 ({variants.length}개) - 터치해서 변경
                  </VariantLabel>
                  <ColorPaletteRow>
                    {variants.map((v: any, idx: number) => {
                      const isSelected = currentIndex === idx;
                      return (
                        <ColorChipButton
                          key={idx}
                          active={isSelected}
                          onPress={() => handleSelectVariant(sticker.id, idx)}
                          activeOpacity={0.7}
                        >
                          <ColorCircle style={{ backgroundColor: v.primary }} />
                          <ColorIdText active={isSelected}>
                            {v.colorId}
                          </ColorIdText>
                        </ColorChipButton>
                      );
                    })}
                  </ColorPaletteRow>
                </VariantSection>
              )}
            </StickerCard>
          );
        })}
      </Content>
    </Container>
  );
}

/* ================================================================
  Styled Components
================================================================ */

const Container = styled.View`
  flex: 1;
`;

const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 48,
  },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

const SummaryCard = styled.View`
  background-color: rgba(255, 255, 255, 0.92);
  padding: 16px;
  border-radius: 20px;
  border-width: 1.5px;
  border-color: ${colors.border.default};
  margin-bottom: 16px;
  gap: 8px;
  elevation: 2;
  box-shadow: 0px 4px 12px rgba(124, 92, 255, 0.06);
`;

const SummaryHeader = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const SummaryTitle = styled(AppText)`
  font-size: 16px;
  font-weight: 800;
  color: ${colors.textGroup.primary};
`;

const TotalCountText = styled(AppText)`
  font-size: 13px;
  color: ${colors.textGroup.secondary};
`;

const Highlight = styled(AppText)`
  font-weight: 700;
  color: ${colors.purple};
`;

const FilterContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.92);
  padding: 16px;
  border-radius: 20px;
  border-width: 1.5px;
  border-color: ${colors.border.default};
  margin-bottom: 16px;
  gap: 12px;
`;

const FilterSection = styled.View`
  gap: 6px;
`;

const FilterLabel = styled(AppText)`
  font-size: 13px;
  font-weight: 700;
  color: ${colors.textGroup.secondary};
`;

const FilterChipScroll = styled.ScrollView`
  flex-direction: row;
`;

const FilterChip = styled.TouchableOpacity<{ active?: boolean }>`
  background-color: ${(props) => (props.active ? colors.purple : "#F8F7FC")};
  padding-horizontal: 12px;
  padding-vertical: 8px;
  border-radius: 12px;
  margin-right: 8px;
  border-width: 1px;
  border-color: ${(props) =>
    props.active ? colors.purple : colors.border.default};
`;

const FilterChipText = styled(AppText)<{ active?: boolean }>`
  font-size: 12px;
  font-weight: 700;
  color: ${(props) => (props.active ? "#FFFFFF" : colors.textGroup.primary)};
`;

const EmptyCard = styled.View`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  padding: 32px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-width: 1.5px;
  border-color: ${colors.border.default};
  margin-bottom: 16px;
`;

const EmptyText = styled(AppText)`
  font-size: 15px;
  font-weight: 700;
  color: ${colors.textGroup.primary};
`;

const SubEmptyText = styled(AppText)`
  font-size: 13px;
  color: ${colors.muted};
`;

const StickerCard = styled.View`
  background-color: rgba(255, 255, 255, 0.92);
  border-radius: 24px;
  padding: 20px;
  border-width: 1.5px;
  border-color: ${colors.border.default};
  margin-bottom: 16px;
  gap: 12px;
  elevation: 2;
  box-shadow: 0px 4px 12px rgba(124, 92, 255, 0.06);
`;

const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TitleWrapper = styled.View`
  flex-direction: row;
  align-items: baseline;
  gap: 8px;
`;

const StickerName = styled(AppText)`
  font-size: 18px;
  font-weight: 800;
  color: ${colors.textGroup.primary};
`;

const StickerId = styled(AppText)`
  font-size: 13px;
  color: ${colors.muted};
`;

const ShapeBadgesRow = styled.View`
  flex-direction: row;
  gap: 4px;
`;

const ShapeBadge = styled.View`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 8px;
  padding-vertical: 4px;
  border-radius: 10px;
  gap: 4px;
`;

const BadgeText = styled(AppText)`
  font-size: 11px;
  font-weight: 700;
`;

const CategoryBadgeRow = styled.View`
  flex-direction: row;
  gap: 6px;
`;

const CategoryInfoBadge = styled.View`
  background-color: #f1edfd;
  padding-horizontal: 8px;
  padding-vertical: 3px;
  border-radius: 8px;
`;

const CategoryInfoText = styled(AppText)`
  font-size: 11px;
  font-weight: 700;
  color: ${colors.purple};
`;

const Description = styled(AppText)`
  font-size: 14px;
  color: ${colors.textGroup.secondary};
`;

const SvgPreviewContainer = styled.View`
  align-items: center;
  justify-content: center;
  background-color: #f8f7fc;
  padding: 16px;
  border-radius: 16px;
  border-width: 1px;
  border-color: ${colors.border.default};
  margin-vertical: 4px;
  gap: 6px;
`;

const SelectedColorLabel = styled(AppText)`
  font-size: 12px;
  color: ${colors.textGroup.secondary};
`;

const ActiveColorText = styled(AppText)`
  font-weight: 700;
  color: ${colors.purple};
`;

const VariantSection = styled.View`
  margin-top: 4px;
  gap: 6px;
`;

const VariantLabel = styled(AppText)`
  font-size: 12px;
  font-weight: 700;
  color: ${colors.muted};
`;

const ColorPaletteRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const ColorChipButton = styled.TouchableOpacity<{ active?: boolean }>`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => (props.active ? "#EDE9FE" : "#F8F7FC")};
  padding-horizontal: 10px;
  padding-vertical: 6px;
  border-radius: 10px;
  border-width: 1.5px;
  border-color: ${(props) =>
    props.active ? colors.purple : colors.border.default};
  gap: 6px;
`;

const ColorCircle = styled.View`
  width: 14px;
  height: 14px;
  border-radius: 7px;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.1);
`;

const ColorIdText = styled(AppText)<{ active?: boolean }>`
  font-size: 12px;
  font-weight: ${(props) => (props.active ? "700" : "500")};
  color: ${(props) =>
    props.active ? colors.purple : colors.textGroup.secondary};
`;

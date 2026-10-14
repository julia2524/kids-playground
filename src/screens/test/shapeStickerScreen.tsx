import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";

import { AppText } from "../../utils/AppText";
import AppHeader from "../../components/AppHeader";
import GradientBackground from "../../design-system/components/GradientBackground";
import { colors } from "../../design-system/tokens/colors";
import { classificationItems } from "../../data/classification/classificationItems";
import { RenderClassificationItemSvg } from "../../assets/Classification/classificationItemSvgs";

export default function ShapeStickerPreviewScreen({
  navigation,
}: {
  navigation: any;
}) {
  // 1️⃣ shapes가 비어있지 않은 유효한 스티커만 필터링
  const validShapeStickers = classificationItems.filter(
    (item: any) => item.shapes && item.shapes.length > 0,
  );

  // 2️⃣ 🎨 각 스티커별로 현재 선택된 색상 변형(Variant)의 인덱스를 관리하는 상태
  const [selectedVariantMap, setSelectedVariantMap] = useState<
    Record<string, number>
  >({});

  const handleSelectVariant = (stickerId: string, variantIndex: number) => {
    setSelectedVariantMap((prev) => ({
      ...prev,
      [stickerId]: variantIndex,
    }));
  };

  // 📊 도형별 개수 집계 계산
  const shapeCounts: Record<string, number> = {};
  validShapeStickers.forEach((sticker: any) => {
    sticker.shapes.forEach((shape: string) => {
      shapeCounts[shape] = (shapeCounts[shape] || 0) + 1;
    });
  });

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

  return (
    <Container>
      <GradientBackground />

      <AppHeader
        title="모양 스티커 상태 검토"
        onBackPress={() => navigation?.goBack?.()}
      />

      <Content>
        {/* 전체 요약 상단 카드 */}
        <SummaryCard>
          <SummaryHeader>
            <Ionicons name="stats-chart" size={20} color={colors.purple} />
            <SummaryTitle>도형별 스티커 보유 현황</SummaryTitle>
          </SummaryHeader>

          <SummaryRow>
            {Object.entries(shapeCounts).map(([shape, count]) => {
              const meta = getShapeMeta(shape);
              return (
                <SummaryBadge key={shape} style={{ backgroundColor: meta.bg }}>
                  <Ionicons name={meta.icon} size={14} color={meta.color} />
                  <SummaryBadgeText>
                    {meta.label}: <HighlightCount>{count}개</HighlightCount>
                  </SummaryBadgeText>
                </SummaryBadge>
              );
            })}
          </SummaryRow>
          <TotalCountText>
            유효한 전체 모양 스티커:{" "}
            <Highlight>{validShapeStickers.length}개</Highlight> (색상 칩을
            누르면 즉시 변경됩니다!)
          </TotalCountText>
        </SummaryCard>

        {/* 개별 스티커 리스트 카드 */}
        {validShapeStickers.map((sticker: any) => {
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

          return (
            <StickerCard key={sticker.id}>
              <HeaderRow>
                <TitleWrapper>
                  <StickerName>{sticker.name}</StickerName>
                  <StickerId>({sticker.svgKey})</StickerId>
                </TitleWrapper>

                <ShapeBadgesRow>
                  {sticker.shapes.map((s: string) => {
                    const meta = getShapeMeta(s);
                    return (
                      <ShapeBadge key={s} style={{ backgroundColor: meta.bg }}>
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
              </HeaderRow>

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
  margin-bottom: 20px;
  gap: 12px;
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

const SummaryRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const SummaryBadge = styled.View`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 10px;
  padding-vertical: 6px;
  border-radius: 12px;
  gap: 6px;
  border-width: 1px;
  border-color: ${colors.border.default};
`;

const SummaryBadgeText = styled(AppText)`
  font-size: 13px;
  font-weight: 700;
  color: ${colors.textGroup.primary};
`;

const HighlightCount = styled(AppText)`
  font-weight: 800;
  color: ${colors.purple};
`;

const TotalCountText = styled(AppText)`
  font-size: 13px;
  color: ${colors.textGroup.secondary};
  margin-top: 2px;
`;

const Highlight = styled(AppText)`
  font-weight: 700;
  color: ${colors.purple};
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

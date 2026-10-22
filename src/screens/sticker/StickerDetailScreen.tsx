import React, { useState, useMemo } from "react";
import { ScrollView, TouchableOpacity, Dimensions, View } from "react-native";
import styled from "styled-components/native";
import { useNavigation, useRoute } from "@react-navigation/native";

import i18n from "../../i18n";
import { classificationItems } from "../../data/classification/classificationItems";
import { RenderClassificationItemSvg } from "../../assets/Classification/classificationItemSvgs";
import AppHeader from "../../components/AppHeader";
import { AppText } from "../../utils/AppText";
import { useLanguage } from "../../context/LangaugeContext";

const { width } = Dimensions.get("window");

// BASIC_SHAPE_IDS는 prefix 없는 순수 이름으로 정의
const BASIC_SHAPE_IDS = ["circle", "square", "triangle", "heart", "star"];
// 기본도형 설명
const BASIC_SHAPE_DESCRIPTIONS: Record<string, string> = {
  circle: "동글동글 동그라미예요! 어디에도 모서리가 없는 부드러운 모양이에요.",

  square: "반듯반듯 네모예요! 네 개의 변이 똑같은 모양으로 나란히 있어요.",

  triangle: "뾰족뾰족 세모예요! 꼭짓점이 세 군데나 있답니다.",

  heart:
    "콩닥콩닥 하트예요! 사랑하는 마음을 담고 싶은 곳에 딱 어울리는 모양이에요.",

  star: "반짝반짝 별 모양이에요! 하늘에 반짝이는 별처럼 뾰족뾰족한 모양이에요.",
};

// shape/color SVG들의 대략적인 원본 캔버스 크기 (대부분 viewBox 0 0 100 100, Svg width/height 90~100)
const NATIVE_ICON_SIZE = 100;

const ScaledIcon = ({
  size,
  children,
}: {
  size: number;
  children: React.ReactNode;
}) => {
  const scale = size / NATIVE_ICON_SIZE;
  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <View
        style={{
          width: NATIVE_ICON_SIZE,
          height: NATIVE_ICON_SIZE,
          transform: [{ scale }],
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </View>
    </View>
  );
};
export default function StickerDetailScreen() {
  useLanguage();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { gameType, stickerId, stickerName } = route.params;

  // 색상 팔레트 다국어화
  const COLOR_PALETTE = useMemo(
    () => [
      {
        id: "natural",
        hex: undefined,
        label: i18n.t("color_natural", { defaultValue: "기본" }),
      },
      {
        id: "red",
        hex: "#EF5350",
        label: i18n.t("color_red", { defaultValue: "빨강" }),
      },
      {
        id: "orange",
        hex: "#FFA726",
        label: i18n.t("color_orange", { defaultValue: "주황" }),
      },
      {
        id: "yellow",
        hex: "#FFEE58",
        label: i18n.t("color_yellow", { defaultValue: "노랑" }),
      },
      {
        id: "green",
        hex: "#66BB6A",
        label: i18n.t("color_green", { defaultValue: "초록" }),
      },
      {
        id: "blue",
        hex: "#42A5F5",
        label: i18n.t("color_blue", { defaultValue: "파랑" }),
      },
      {
        id: "purple",
        hex: "#AB47BC",
        label: i18n.t("color_purple", { defaultValue: "보라" }),
      },
      {
        id: "pink",
        hex: "#EC407A",
        label: i18n.t("color_pink", { defaultValue: "분홍" }),
      },
      {
        id: "brown",
        hex: "#8D6E63",
        label: i18n.t("color_brown", { defaultValue: "갈색" }),
      },

      {
        id: "white",
        hex: "#FAFAFA",
        label: i18n.t("color_white", { defaultValue: "흰색" }),
      },
      {
        id: "black",
        hex: "#424242",
        label: i18n.t("color_black", { defaultValue: "검정" }),
      },
    ],
    [],
  );

  // 현재 선택된 색상 (hex 또는 undefined)
  const [selectedColorHex, setSelectedColorHex] = useState<string | undefined>(
    undefined,
  );

  // 해당 스티커 데이터 찾기
  const stickerData = useMemo(() => {
    return classificationItems.find((o) => o.id === stickerId) ?? null;
  }, [gameType, stickerId]);

  // category일 경우 variants 기반 색상 팔레트 만들기
  const availableColors = useMemo(() => {
    // gameType이 category이고, variants가 실제로 있을 때만 처리
    if (
      gameType === "category" &&
      stickerData &&
      "variants" in stickerData &&
      Array.isArray(stickerData.variants)
    ) {
      const variantColors = stickerData.variants.map((v: any) => ({
        id: v.id,
        hex: v.primary,
        label: v.id,
      }));
      return [
        { id: "natural", hex: undefined, label: "기본" },
        ...variantColors,
      ];
    }

    // color / shape는 공통 팔레트
    return COLOR_PALETTE;
  }, [gameType, stickerData]);
  // SVG 렌더
  const renderBigSvg = () => {
    const size = Math.min(width * 0.55, 220);

    return <RenderClassificationItemSvg itemId={stickerId} size={size} />;
  };

  // 스티커 이름 다국어화 (JSON에 작성된 대문자 이름 가져오기)
  const localizedStickerName = useMemo(() => {
    const normalizedShapeId = stickerId?.replace(/^basic/i, "");

    // 1. 기본 도형 이름
    if (gameType === "shape" && BASIC_SHAPE_IDS.includes(normalizedShapeId)) {
      const basicKey = `basic_shape_${normalizedShapeId}_name`;
      const translated = i18n.t(basicKey, { defaultValue: "" });
      if (translated && !translated.includes("missing")) return translated;
    }

    // 2. 카테고리 정보 추출
    const topCat =
      stickerData && "topCategory" in stickerData
        ? stickerData.topCategory
        : undefined;
    const subCat =
      stickerData && "subCategory" in stickerData
        ? stickerData.subCategory
        : undefined;

    // 이름 키 후보 목록
    const keyCandidates = [
      topCat && subCat
        ? `sticker_${gameType}_${topCat}_${subCat}_${stickerId}_name`
        : null,
      topCat && subCat ? `sticker_${topCat}_${subCat}_${stickerId}_name` : null,
      topCat ? `sticker_${gameType}_${topCat}_${stickerId}_name` : null,
      topCat ? `sticker_${topCat}_${stickerId}_name` : null,
      `sticker_${gameType}_${stickerId}_name`,
      `sticker_${stickerId}_name`,
    ].filter(Boolean) as string[];

    // JSON 탐색
    for (const key of keyCandidates) {
      const translated = i18n.t(key, { defaultValue: "" });
      if (translated && !translated.includes("missing")) {
        return translated;
      }
    }

    // fallback: JSON에 없으면 route.params에서 넘어온 stickerName 사용
    return stickerName;
  }, [gameType, stickerId, stickerData, stickerName, i18n.locale]);
  // 설명 텍스트 다국어화
  const description = useMemo(() => {
    const normalizedShapeId = stickerId?.replace(/^basic/i, "");

    // 1. 기본 도형 설명
    if (gameType === "shape" && BASIC_SHAPE_IDS.includes(normalizedShapeId)) {
      const basicKey = `basic_shape_${normalizedShapeId}_desc`;
      const translated = i18n.t(basicKey, { defaultValue: "" });
      return translated || (stickerData?.description ?? "");
    }

    // 2. 카테고리 정보 추출
    const topCat =
      stickerData && "topCategory" in stickerData
        ? stickerData.topCategory
        : undefined;
    const subCat =
      stickerData && "subCategory" in stickerData
        ? stickerData.subCategory
        : undefined;

    // 💡 탐색할 키 후보 목록 (상세한 키 -> 넓은 범주의 키 순서대로 탐색)
    const keyCandidates = [
      // 1) topCategory + subCategory 포함 (예: sticker_category_vehicle_rail_special_train_desc)
      topCat && subCat
        ? `sticker_${gameType}_${topCat}_${subCat}_${stickerId}_desc`
        : null,
      topCat && subCat ? `sticker_${topCat}_${subCat}_${stickerId}_desc` : null,

      // 2) topCategory만 포함 (💡 train처럼 subCategory가 JSON 키에서 빠진 경우를 캐치!)
      topCat ? `sticker_${gameType}_${topCat}_${stickerId}_desc` : null,
      topCat ? `sticker_${topCat}_${stickerId}_desc` : null,

      // 3) ID 기본 형태 (예: sticker_category_train_desc / sticker_train_desc)
      `sticker_${gameType}_${stickerId}_desc`,
      `sticker_${stickerId}_desc`,
    ].filter(Boolean) as string[];

    // 순차적으로 존재하는 번역 키 조회
    for (const key of keyCandidates) {
      const translated = i18n.t(key, { defaultValue: "" });

      if (translated && !translated.includes("missing")) {
        return translated;
      }
    }

    // 모든 키 탐색 실패 시 기본 설명 사용
    return stickerData?.description ?? "";
  }, [gameType, stickerId, stickerData, i18n.locale]);
  return (
    <Container>
      <AppHeader
        onBackPress={() => navigation.goBack()}
        title={i18n.t(`item_${stickerId}`)}
        onMascotPress={() => navigation.navigate("SettingScreen")}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* 큰 스티커 미리보기 */}
        <PreviewCard>
          <SvgWrapper>{renderBigSvg()}</SvgWrapper>
          <PreviewName>{i18n.t(`item_${stickerId}`)}</PreviewName>
        </PreviewCard>

        {/* 설명 */}
        <DescriptionCard>
          <DescriptionTitle>
            {i18n.t("sticker_detail_about_title", {
              defaultValue: "어떤 스티커인가요?",
            })}
          </DescriptionTitle>
          <DescriptionText>{description}</DescriptionText>
        </DescriptionCard>

        {/* 색상 선택 */}
        <ColorSection>
          <SectionTitle>
            {i18n.t("sticker_detail_change_color", {
              defaultValue: "색상 바꾸기",
            })}
          </SectionTitle>
          <ColorGrid>
            {availableColors.map((color) => {
              const isSelected =
                selectedColorHex === color.hex ||
                (selectedColorHex === undefined && color.hex === undefined);

              return (
                <ColorButton
                  key={color.id}
                  onPress={() => setSelectedColorHex(color.hex)}
                  isSelected={isSelected}
                  style={{
                    backgroundColor: color.hex ?? "#FFFFFF",
                    borderColor: isSelected ? "#1E293B" : "#CBD5E1",
                  }}
                >
                  {color.hex === undefined && (
                    <NaturalLabel>
                      {i18n.t("color_natural", { defaultValue: "기본" })}
                    </NaturalLabel>
                  )}
                </ColorButton>
              );
            })}
          </ColorGrid>
        </ColorSection>
      </ScrollView>
      {/* ⭐ 화면 하단 고정 광고 */}
      {/* <BannerAdContainer>
        <BannerAd />
      </BannerAdContainer> */}
    </Container>
  );
}

// ---------- Styled Components ----------
const Container = styled.View`
  flex: 1;
  background-color: #f8fafc;
`;

const HeaderTitle = styled(AppText)`
  font-size: 18px;
  font-weight: bold;
  color: #1e293b;
`;
const BannerAdContainer = styled.View`
  height: 60px;
  align-items: center;
  justify-content: center;
`;

const PreviewCard = styled.View`
  margin: 20px 20px 12px 20px;
  background-color: #ffffff;
  border-radius: 24px;
  padding: 28px 20px;
  align-items: center;
  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.06;
  shadow-radius: 8px;
`;

const SvgWrapper = styled.View`
  width: 200px;
  height: 200px;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
`;

const PreviewName = styled(AppText)`
  font-size: 20px;
  font-weight: bold;
  color: #0f172a;
`;

const DescriptionCard = styled.View`
  margin: 0 20px 16px 20px;
  background-color: #ffffff;
  border-radius: 18px;
  padding: 16px 18px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.04;
  shadow-radius: 4px;
`;

const DescriptionTitle = styled(AppText)`
  font-size: 14px;
  font-weight: bold;
  color: #475569;
  margin-bottom: 6px;
`;

const DescriptionText = styled(AppText)`
  font-size: 15px;
  color: #334155;
  line-height: 22px;
`;

const ColorSection = styled.View`
  margin: 0 20px;
  background-color: #ffffff;
  border-radius: 18px;
  padding: 16px 18px 20px 18px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.04;
  shadow-radius: 4px;
`;

const SectionTitle = styled(AppText)`
  font-size: 14px;
  font-weight: bold;
  color: #475569;
  margin-bottom: 14px;
`;

const ColorGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
`;

const ColorButton = styled(TouchableOpacity)<{ isSelected: boolean }>`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  border-width: ${(props) => (props.isSelected ? 3 : 1.5)}px;
  align-items: center;
  justify-content: center;
`;

const NaturalLabel = styled(AppText)`
  font-size: 10px;
  font-weight: bold;
  color: #64748b;
`;

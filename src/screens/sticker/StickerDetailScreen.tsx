//원래 디테일창
// import React, { useState, useMemo, useEffect } from "react";
// import { ScrollView, TouchableOpacity, Dimensions } from "react-native";
// import styled from "styled-components/native";
// import { useNavigation, useRoute } from "@react-navigation/native";

// import i18n from "../../i18n";
// import { classificationItems } from "../../data/classification/classificationItems";
// import { RenderClassificationItemSvg } from "../../assets/Classification/classificationItemSvgs";
// import AppHeader from "../../components/AppHeader";
// import { AppText } from "../../utils/AppText";
// import { useLanguage } from "../../context/LangaugeContext";

// const { width } = Dimensions.get("window");

// const BASIC_SHAPE_IDS = ["circle", "square", "triangle", "heart", "star"];

// type StickerColorOption = {
//   id: string;
//   hex?: string;
//   label: string;
//   primary?: string;
//   secondary?: string;
//   accent?: string;
//   pattern?: "spots" | "stripes" | "patches";
// };

// export default function StickerDetailScreen() {
//   useLanguage();

//   const navigation = useNavigation<any>();
//   const route = useRoute<any>();

//   const { gameType, stickerId, stickerName } = route.params;

//   // 공통 팔레트: variants가 없는 스티커에만 사용
//   const COLOR_PALETTE: StickerColorOption[] = useMemo(
//     () => [
//       {
//         id: "natural",
//         label: i18n.t("color_natural", { defaultValue: "기본" }),
//       },
//       {
//         id: "red",
//         hex: "#EF5350",
//         label: i18n.t("color_red", { defaultValue: "빨강" }),
//       },
//       {
//         id: "orange",
//         hex: "#FFA726",
//         label: i18n.t("color_orange", { defaultValue: "주황" }),
//       },
//       {
//         id: "yellow",
//         hex: "#FFEE58",
//         label: i18n.t("color_yellow", { defaultValue: "노랑" }),
//       },
//       {
//         id: "green",
//         hex: "#66BB6A",
//         label: i18n.t("color_green", { defaultValue: "초록" }),
//       },
//       {
//         id: "blue",
//         hex: "#42A5F5",
//         label: i18n.t("color_blue", { defaultValue: "파랑" }),
//       },
//       {
//         id: "purple",
//         hex: "#AB47BC",
//         label: i18n.t("color_purple", { defaultValue: "보라" }),
//       },
//       {
//         id: "pink",
//         hex: "#EC407A",
//         label: i18n.t("color_pink", { defaultValue: "분홍" }),
//       },
//       {
//         id: "brown",
//         hex: "#8D6E63",
//         label: i18n.t("color_brown", { defaultValue: "갈색" }),
//       },
//       {
//         id: "white",
//         hex: "#FAFAFA",
//         label: i18n.t("color_white", { defaultValue: "흰색" }),
//       },
//       {
//         id: "black",
//         hex: "#424242",
//         label: i18n.t("color_black", { defaultValue: "검정" }),
//       },
//     ],
//     [i18n.locale],
//   );

//   // 현재 스티커의 데이터
//   const stickerData = useMemo(
//     () => classificationItems.find((item) => item.id === stickerId) ?? null,
//     [stickerId],
//   );

//   // 해당 스티커에서 사용할 수 있는 색상 목록
//   const availableColors = useMemo<StickerColorOption[]>(() => {
//     if (
//       stickerData &&
//       "variants" in stickerData &&
//       Array.isArray(stickerData.variants) &&
//       stickerData.variants.length > 0
//     ) {
//       return stickerData.variants.map((variant: any) => ({
//         id: variant.colorId,
//         label: variant.colorId,
//         hex: variant.primary,
//         primary: variant.primary,
//         secondary: variant.secondary,
//         accent: variant.accent,
//         pattern: variant.pattern,
//       }));
//     }

//     return COLOR_PALETTE.map((color) => ({
//       ...color,
//       primary: color.hex,
//     }));
//   }, [stickerData, COLOR_PALETTE]);

//   // 현재 선택한 색상
//   const [selectedColor, setSelectedColor] = useState("natural");

//   // 스티커가 바뀌거나 색상 목록이 바뀌면 유효한 선택으로 맞추기
//   useEffect(() => {
//     if (!availableColors.some((color) => color.id === selectedColor)) {
//       setSelectedColor(availableColors[0]?.id ?? "natural");
//     }
//   }, [availableColors, selectedColor]);

//   // 선택된 색상 조합
//   const selectedColorOption = useMemo(
//     () =>
//       availableColors.find((color) => color.id === selectedColor) ??
//       availableColors[0],
//     [availableColors, selectedColor],
//   );

//   // 큰 스티커 미리보기
//   const renderBigSvg = () => {
//     const size = Math.min(width * 0.55, 220);

//     return (
//       <RenderClassificationItemSvg
//         key={`${stickerId}-${selectedColorOption?.id ?? "default"}`}
//         itemId={stickerId}
//         size={size}
//         colorHex={selectedColorOption?.primary}
//         primary={selectedColorOption?.primary}
//         secondary={selectedColorOption?.secondary}
//         accent={selectedColorOption?.accent}
//         pattern={selectedColorOption?.pattern}
//       />
//     );
//   };

//   // 스티커 이름 다국어화
//   const localizedStickerName = useMemo(() => {
//     const normalizedShapeId = stickerId?.replace(/^basic/i, "");

//     if (gameType === "shape" && BASIC_SHAPE_IDS.includes(normalizedShapeId)) {
//       const translated = i18n.t(`basic_shape_${normalizedShapeId}_name`, {
//         defaultValue: "",
//       });

//       if (translated && !translated.includes("missing")) {
//         return translated;
//       }
//     }

//     const topCat =
//       stickerData && "topCategory" in stickerData
//         ? stickerData.topCategory
//         : undefined;

//     const subCat =
//       stickerData && "subCategory" in stickerData
//         ? stickerData.subCategory
//         : undefined;

//     const keyCandidates = [
//       topCat && subCat
//         ? `sticker_${gameType}_${topCat}_${subCat}_${stickerId}_name`
//         : null,
//       topCat && subCat ? `sticker_${topCat}_${subCat}_${stickerId}_name` : null,
//       topCat ? `sticker_${gameType}_${topCat}_${stickerId}_name` : null,
//       topCat ? `sticker_${topCat}_${stickerId}_name` : null,
//       `sticker_${gameType}_${stickerId}_name`,
//       `sticker_${stickerId}_name`,
//     ].filter(Boolean) as string[];

//     for (const key of keyCandidates) {
//       const translated = i18n.t(key, { defaultValue: "" });

//       if (translated && !translated.includes("missing")) {
//         return translated;
//       }
//     }

//     return stickerName;
//   }, [gameType, stickerId, stickerData, stickerName, i18n.locale]);

//   // 스티커 설명 다국어화
//   const description = useMemo(() => {
//     const normalizedShapeId = stickerId?.replace(/^basic/i, "");

//     if (gameType === "shape" && BASIC_SHAPE_IDS.includes(normalizedShapeId)) {
//       const translated = i18n.t(`basic_shape_${normalizedShapeId}_desc`, {
//         defaultValue: "",
//       });

//       return translated || stickerData?.description || "";
//     }

//     const topCat =
//       stickerData && "topCategory" in stickerData
//         ? stickerData.topCategory
//         : undefined;

//     const subCat =
//       stickerData && "subCategory" in stickerData
//         ? stickerData.subCategory
//         : undefined;

//     const keyCandidates = [
//       topCat && subCat
//         ? `sticker_${gameType}_${topCat}_${subCat}_${stickerId}_desc`
//         : null,
//       topCat && subCat ? `sticker_${topCat}_${subCat}_${stickerId}_desc` : null,
//       topCat ? `sticker_${gameType}_${topCat}_${stickerId}_desc` : null,
//       topCat ? `sticker_${topCat}_${stickerId}_desc` : null,
//       `sticker_${gameType}_${stickerId}_desc`,
//       `sticker_${stickerId}_desc`,
//     ].filter(Boolean) as string[];

//     for (const key of keyCandidates) {
//       const translated = i18n.t(key, { defaultValue: "" });

//       if (translated && !translated.includes("missing")) {
//         return translated;
//       }
//     }

//     return stickerData?.description ?? "";
//   }, [gameType, stickerId, stickerData, i18n.locale]);

//   return (
//     <Container>
//       <AppHeader
//         onBackPress={() => navigation.goBack()}
//         title={localizedStickerName || i18n.t(`item_${stickerId}`)}
//         onMascotPress={() => navigation.navigate("SettingScreen")}
//       />

//       <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
//         <PreviewCard>
//           <SvgWrapper>{renderBigSvg()}</SvgWrapper>
//           <PreviewName>
//             {localizedStickerName || i18n.t(`item_${stickerId}`)}
//           </PreviewName>
//         </PreviewCard>

//         <DescriptionCard>
//           <DescriptionTitle>
//             {i18n.t("sticker_detail_about_title", {
//               defaultValue: "어떤 스티커인가요?",
//             })}
//           </DescriptionTitle>
//           <DescriptionText>{description}</DescriptionText>
//         </DescriptionCard>

//         <ColorSection>
//           <SectionTitle>
//             {i18n.t("sticker_detail_change_color", {
//               defaultValue: "색상 바꾸기",
//             })}
//           </SectionTitle>

//           <ColorGrid>
//             {availableColors.map((color, index) => {
//               const isSelected = selectedColor === color.id;

//               return (
//                 <ColorButton
//                   key={`${color.id}-${index}`}
//                   onPress={() => setSelectedColor(color.id)}
//                   isSelected={isSelected}
//                   accessibilityRole="button"
//                   accessibilityLabel={color.label}
//                   accessibilityState={{ selected: isSelected }}
//                   style={{
//                     backgroundColor: color.hex ?? "#FFFFFF",
//                     borderColor: isSelected ? "#1E293B" : "#CBD5E1",
//                   }}
//                 >
//                   {color.id === "natural" && (
//                     <NaturalLabel>
//                       {i18n.t("color_natural", { defaultValue: "기본" })}
//                     </NaturalLabel>
//                   )}
//                 </ColorButton>
//               );
//             })}
//           </ColorGrid>
//         </ColorSection>
//       </ScrollView>
//     </Container>
//   );
// }

// // ---------- Styled Components ----------

// const Container = styled.View`
//   flex: 1;
//   background-color: #f8fafc;
// `;

// const PreviewCard = styled.View`
//   margin: 20px 20px 12px 20px;
//   background-color: #ffffff;
//   border-radius: 24px;
//   padding: 28px 20px;
//   align-items: center;
//   elevation: 3;
//   shadow-color: #000;
//   shadow-offset: 0px 2px;
//   shadow-opacity: 0.06;
//   shadow-radius: 8px;
// `;

// const SvgWrapper = styled.View`
//   width: 200px;
//   height: 200px;
//   align-items: center;
//   justify-content: center;
//   margin-bottom: 12px;
// `;

// const PreviewName = styled(AppText)`
//   font-size: 20px;
//   font-weight: bold;
//   color: #0f172a;
// `;

// const DescriptionCard = styled.View`
//   margin: 0 20px 16px 20px;
//   background-color: #ffffff;
//   border-radius: 18px;
//   padding: 16px 18px;
//   elevation: 2;
//   shadow-color: #000;
//   shadow-offset: 0px 1px;
//   shadow-opacity: 0.04;
//   shadow-radius: 4px;
// `;

// const DescriptionTitle = styled(AppText)`
//   font-size: 14px;
//   font-weight: bold;
//   color: #475569;
//   margin-bottom: 6px;
// `;

// const DescriptionText = styled(AppText)`
//   font-size: 15px;
//   color: #334155;
//   line-height: 22px;
// `;

// const ColorSection = styled.View`
//   margin: 0 20px;
//   background-color: #ffffff;
//   border-radius: 18px;
//   padding: 16px 18px 20px 18px;
//   elevation: 2;
//   shadow-color: #000;
//   shadow-offset: 0px 1px;
//   shadow-opacity: 0.04;
//   shadow-radius: 4px;
// `;

// const SectionTitle = styled(AppText)`
//   font-size: 14px;
//   font-weight: bold;
//   color: #475569;
//   margin-bottom: 14px;
// `;

// const ColorGrid = styled.View`
//   flex-direction: row;
//   flex-wrap: wrap;
//   gap: 12px;
// `;

// const ColorButton = styled(TouchableOpacity)<{ isSelected: boolean }>`
//   width: 44px;
//   height: 44px;
//   border-radius: 22px;
//   border-width: ${(props) => (props.isSelected ? 3 : 1.5)}px;
//   align-items: center;
//   justify-content: center;
// `;

// const NaturalLabel = styled(AppText)`
//   font-size: 10px;
//   font-weight: bold;
//   color: #64748b;
// `;

// import React, { useState, useMemo, useEffect, useRef } from "react";
// import {
//   View,
//   ScrollView,
//   TouchableOpacity,
//   useWindowDimensions,
//   Alert,
//   LayoutChangeEvent,
//   NativeSyntheticEvent,
//   NativeTouchEvent,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import styled from "styled-components/native";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import Svg, { Path } from "react-native-svg";
// import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

// import i18n from "../../i18n";
// import { classificationItems } from "../../data/classification/classificationItems";
// import { RenderClassificationItemSvg } from "../../assets/Classification/classificationItemSvgs";
// import AppHeader from "../../components/AppHeader";
// import { AppText } from "../../utils/AppText";
// import { useLanguage } from "../../context/LangaugeContext";
// import CustomAlert from "../../components/CustomAlert";
// import { triggerHaptic } from "../../utils/haptic";

// // ============================================================
// // 설정
// // ============================================================

// const ARTWORK_STORAGE_KEY = "@sticker_artworks_v1";
// const DRAWING_VIEWBOX = 1000;
// const MAX_CANVAS_SIZE = 760;
// const MIN_CANVAS_SIZE = 160;

// const BASIC_SHAPE_IDS = ["circle", "square", "triangle", "heart", "star"];

// const clamp = (value: number, min: number, max: number) =>
//   Math.min(max, Math.max(min, value));

// // ============================================================
// // 타입
// // ============================================================

// type StickerColorOption = {
//   id: string;
//   hex?: string;
//   label: string;
//   primary?: string;
//   secondary?: string;
//   accent?: string;
//   pattern?: "spots" | "stripes" | "patches";
// };

// type DrawingStroke = {
//   id: string;
//   path: string;
//   color: string;
//   strokeWidth: number;
// };

// type SavedArtwork = {
//   stickerId: string;
//   selectedColor: string;
//   drawings: DrawingStroke[];
//   updatedAt: number;
// };

// type ArtworkCollection = Record<string, SavedArtwork>;
// type DrawingTool = "draw" | "eraser";
// type PanelMode = "draw" | "paint";
// type Point = { x: number; y: number };

// // ============================================================
// // 색상 / 브러시
// // ============================================================

// const INK_COLORS = [
//   { id: "red", hex: "#EF5350" },
//   { id: "orange", hex: "#FFA726" },
//   { id: "yellow", hex: "#FDD835" },
//   { id: "green", hex: "#66BB6A" },
//   { id: "blue", hex: "#42A5F5" },
//   { id: "purple", hex: "#AB47BC" },
//   { id: "pink", hex: "#EC407A" },
//   { id: "brown", hex: "#8D6E63" },
//   { id: "black", hex: "#374151" },
//   { id: "white", hex: "#FFFFFF" },
// ];

// const INK_ROWS = [INK_COLORS.slice(0, 5), INK_COLORS.slice(5, 10)];

// const BRUSH_SIZES = [
//   { size: 8, dot: 8 },
//   { size: 16, dot: 16 },
//   { size: 28, dot: 26 },
// ];

// // ============================================================
// // 지우개용 도형 계산 (획 단위 삭제)
// // ============================================================

// const parsePathPoints = (path: string): Point[] => {
//   const nums = path.match(/-?\d+(?:\.\d+)?/g);
//   if (!nums) return [];
//   const points: Point[] = [];
//   for (let i = 0; i + 1 < nums.length; i += 2) {
//     points.push({ x: Number(nums[i]), y: Number(nums[i + 1]) });
//   }
//   return points;
// };

// const distanceToSegment = (p: Point, a: Point, b: Point) => {
//   const dx = b.x - a.x;
//   const dy = b.y - a.y;
//   const lengthSq = dx * dx + dy * dy;
//   if (lengthSq === 0) return Math.hypot(p.x - a.x, p.y - a.y);
//   const t = clamp(((p.x - a.x) * dx + (p.y - a.y) * dy) / lengthSq, 0, 1);
//   return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
// };

// // ============================================================
// // 화면 컴포넌트
// // ============================================================

// export default function StickerDetailScreen() {
//   useLanguage();

//   const navigation = useNavigation<any>();
//   const route = useRoute<any>();
//   const { width, height } = useWindowDimensions();

//   const { gameType, stickerId, stickerName } = route.params;

//   // ----------------------------------------------------------
//   // 반응형 계산
//   // ----------------------------------------------------------
//   const isLandscape = width > height;
//   const shortSide = Math.min(width, height);
//   const scale = clamp(shortSide / 390, 0.9, 1.4);

//   const PANEL_MARGIN = 10;
//   const PANEL_PADDING = Math.round(14 * scale);
//   const panelOuterWidth = isLandscape
//     ? clamp(Math.round(width * 0.38), 280, 460)
//     : Math.min(width, 640);
//   const panelInnerWidth =
//     panelOuterWidth - PANEL_MARGIN * 2 - PANEL_PADDING * 2;

//   const INK_GAP = 8;
//   const inkSize = Math.min(
//     Math.round(54 * scale),
//     Math.floor((panelInnerWidth - INK_GAP * 4) / 5),
//   );
//   const stickerChipSize = Math.min(
//     Math.round(50 * scale),
//     Math.floor((panelInnerWidth - INK_GAP * 4) / 5),
//   );
//   const toolHeight = Math.round(56 * scale);
//   const iconSize = Math.round(24 * scale);

//   // 캔버스 영역 측정
//   const [areaSize, setAreaSize] = useState({ w: 0, h: 0 });
//   const handleAreaLayout = (event: LayoutChangeEvent) => {
//     const { width: w, height: h } = event.nativeEvent.layout;
//     setAreaSize((prev) =>
//       Math.abs(prev.w - w) < 1 && Math.abs(prev.h - h) < 1 ? prev : { w, h },
//     );
//   };

//   const CANVAS_AREA_PADDING = 8;
//   const CANVAS_CARD_PADDING = 6;
//   const canvasSize = useMemo(() => {
//     if (!areaSize.w || !areaSize.h) {
//       return clamp(Math.min(width - 40, 340), MIN_CANVAS_SIZE, MAX_CANVAS_SIZE);
//     }
//     const free =
//       Math.min(areaSize.w, areaSize.h) -
//       CANVAS_AREA_PADDING * 2 -
//       CANVAS_CARD_PADDING * 2;
//     return clamp(Math.floor(free), MIN_CANVAS_SIZE, MAX_CANVAS_SIZE);
//   }, [areaSize, width]);

//   // ----------------------------------------------------------
//   // 스티커 데이터
//   // ----------------------------------------------------------
//   const stickerData = useMemo(
//     () => classificationItems.find((item) => item.id === stickerId) ?? null,
//     [stickerId],
//   );

//   const COLOR_PALETTE: StickerColorOption[] = useMemo(
//     () => [
//       {
//         id: "natural",
//         label: i18n.t("color_natural", { defaultValue: "기본" }),
//       },
//       {
//         id: "red",
//         hex: "#EF5350",
//         label: i18n.t("color_red", { defaultValue: "빨강" }),
//       },
//       {
//         id: "orange",
//         hex: "#FFA726",
//         label: i18n.t("color_orange", { defaultValue: "주황" }),
//       },
//       {
//         id: "yellow",
//         hex: "#FFEE58",
//         label: i18n.t("color_yellow", { defaultValue: "노랑" }),
//       },
//       {
//         id: "green",
//         hex: "#66BB6A",
//         label: i18n.t("color_green", { defaultValue: "초록" }),
//       },
//       {
//         id: "blue",
//         hex: "#42A5F5",
//         label: i18n.t("color_blue", { defaultValue: "파랑" }),
//       },
//       {
//         id: "purple",
//         hex: "#AB47BC",
//         label: i18n.t("color_purple", { defaultValue: "보라" }),
//       },
//       {
//         id: "pink",
//         hex: "#EC407A",
//         label: i18n.t("color_pink", { defaultValue: "분홍" }),
//       },
//       {
//         id: "brown",
//         hex: "#8D6E63",
//         label: i18n.t("color_brown", { defaultValue: "갈색" }),
//       },
//       {
//         id: "white",
//         hex: "#FAFAFA",
//         label: i18n.t("color_white", { defaultValue: "흰색" }),
//       },
//       {
//         id: "black",
//         hex: "#424242",
//         label: i18n.t("color_black", { defaultValue: "검정" }),
//       },
//     ],
//     [i18n.locale],
//   );

//   const availableColors = useMemo<StickerColorOption[]>(() => {
//     if (
//       stickerData &&
//       "variants" in stickerData &&
//       Array.isArray(stickerData.variants) &&
//       stickerData.variants.length > 0
//     ) {
//       return stickerData.variants.map((variant: any) => ({
//         id: variant.colorId,
//         label: variant.colorId,
//         hex: variant.primary,
//         primary: variant.primary,
//         secondary: variant.secondary,
//         accent: variant.accent,
//         pattern: variant.pattern,
//       }));
//     }

//     return COLOR_PALETTE.map((color) => ({
//       ...color,
//       primary: color.hex,
//     }));
//   }, [stickerData, COLOR_PALETTE]);

//   // ----------------------------------------------------------
//   // 상태
//   // ----------------------------------------------------------
//   const [panelMode, setPanelMode] = useState<PanelMode>("draw");
//   const [selectedColor, setSelectedColor] = useState("natural");
//   const [selectedInk, setSelectedInk] = useState("#EF5350");
//   const [brushWidth, setBrushWidth] = useState(16);
//   const [tool, setTool] = useState<DrawingTool>("draw");

//   const [isClearAlertVisible, setIsClearAlertVisible] = useState(false);

//   const [drawings, setDrawings] = useState<DrawingStroke[]>([]);
//   const [currentPath, setCurrentPath] = useState("");

//   const [isLoaded, setIsLoaded] = useState(false);
//   const [isSaved, setIsSaved] = useState(true);

//   const currentPathRef = useRef("");
//   const strokeIdRef = useRef(0);
//   const drawingsRef = useRef<DrawingStroke[]>([]);
//   const pointsCacheRef = useRef<Map<string, Point[]>>(new Map());

//   useEffect(() => {
//     drawingsRef.current = drawings;
//   }, [drawings]);

//   const selectedColorOption = useMemo(
//     () =>
//       availableColors.find((color) => color.id === selectedColor) ??
//       availableColors[0],
//     [availableColors, selectedColor],
//   );

//   useEffect(() => {
//     if (!availableColors.some((color) => color.id === selectedColor)) {
//       setSelectedColor(availableColors[0]?.id ?? "natural");
//     }
//   }, [availableColors, selectedColor]);

//   // ----------------------------------------------------------
//   // 불러오기 / 자동 저장
//   // ----------------------------------------------------------
//   useEffect(() => {
//     let isActive = true;
//     const loadArtwork = async () => {
//       setIsLoaded(false);
//       setIsSaved(true);
//       try {
//         const json = await AsyncStorage.getItem(ARTWORK_STORAGE_KEY);
//         if (!isActive) return;
//         const collection: ArtworkCollection = json ? JSON.parse(json) : {};
//         const savedArtwork = collection[stickerId];

//         if (savedArtwork) {
//           setDrawings(
//             Array.isArray(savedArtwork.drawings) ? savedArtwork.drawings : [],
//           );
//           setSelectedColor(savedArtwork.selectedColor ?? "natural");
//         } else {
//           setDrawings([]);
//           setSelectedColor("natural");
//         }
//       } catch (error) {
//         console.error("작품 불러오기 실패:", error);
//       } finally {
//         if (isActive) setIsLoaded(true);
//       }
//     };
//     loadArtwork();
//     return () => {
//       isActive = false;
//     };
//   }, [stickerId]);

//   useEffect(() => {
//     if (!isLoaded) return;
//     setIsSaved(false);
//     const timeout = setTimeout(async () => {
//       try {
//         const json = await AsyncStorage.getItem(ARTWORK_STORAGE_KEY);
//         const collection: ArtworkCollection = json ? JSON.parse(json) : {};
//         collection[stickerId] = {
//           stickerId,
//           selectedColor,
//           drawings,
//           updatedAt: Date.now(),
//         };
//         await AsyncStorage.setItem(
//           ARTWORK_STORAGE_KEY,
//           JSON.stringify(collection),
//         );
//         setIsSaved(true);
//       } catch (error) {
//         console.error("작품 자동 저장 실패:", error);
//         setIsSaved(false);
//       }
//     }, 500);
//     return () => clearTimeout(timeout);
//   }, [isLoaded, stickerId, selectedColor, drawings]);

//   //   const localizedStickerName = useMemo(() => {
//   //     const normalizedShapeId = stickerId?.replace(/^basic/i, "");
//   //     if (gameType === "shape" && BASIC_SHAPE_IDS.includes(normalizedShapeId)) {
//   //       const translated = i18n.t(`basic_shape_${normalizedShapeId}_name`, {
//   //         defaultValue: "",
//   //       });
//   //       if (translated && !translated.includes("missing")) return translated;
//   //     }
//   //     return stickerName ?? i18n.t(`item_${stickerId}`);
//   //   }, [gameType, stickerId, stickerName, i18n.locale]);
//   // ----------------------------------------------------------
//   // 스티커 이름 다국어화
//   // ----------------------------------------------------------

//   const localizedStickerName = useMemo(() => {
//     const normalizedShapeId = stickerId?.replace(/^basic/i, "");

//     if (gameType === "shape" && BASIC_SHAPE_IDS.includes(normalizedShapeId)) {
//       const translated = i18n.t(`basic_shape_${normalizedShapeId}_name`, {
//         defaultValue: "",
//       });

//       if (translated && !translated.includes("missing")) {
//         return translated;
//       }
//     }

//     const topCat =
//       stickerData && "topCategory" in stickerData
//         ? stickerData.topCategory
//         : undefined;

//     const subCat =
//       stickerData && "subCategory" in stickerData
//         ? stickerData.subCategory
//         : undefined;

//     const keyCandidates = [
//       topCat && subCat
//         ? `sticker_${gameType}_${topCat}_${subCat}_${stickerId}_name`
//         : null,
//       topCat && subCat ? `sticker_${topCat}_${subCat}_${stickerId}_name` : null,
//       topCat ? `sticker_${gameType}_${topCat}_${stickerId}_name` : null,
//       topCat ? `sticker_${topCat}_${stickerId}_name` : null,
//       `sticker_${gameType}_${stickerId}_name`,
//       `sticker_${stickerId}_name`,
//     ].filter(Boolean) as string[];

//     for (const key of keyCandidates) {
//       const translated = i18n.t(key, { defaultValue: "" });

//       if (translated && !translated.includes("missing")) {
//         return translated;
//       }
//     }

//     // 1단계 기본 아이템 번역 키 우선 확인 (stickerName보다 우선 적용)
//     const directTranslation = i18n.t(`item_${stickerId}`, { defaultValue: "" });
//     if (directTranslation && !directTranslation.includes("missing")) {
//       return directTranslation;
//     }

//     // 번역 키가 없을 때만 route.params의 stickerName 사용
//     return stickerName ?? "";
//   }, [gameType, stickerId, stickerName, i18n.locale]);

//   // ----------------------------------------------------------
//   // 그리기 / 지우기 로직
//   // ----------------------------------------------------------
//   const getDrawingPoint = (
//     event: NativeSyntheticEvent<NativeTouchEvent>,
//   ): Point => {
//     const { locationX, locationY } = event.nativeEvent;
//     const x = clamp(
//       (locationX / canvasSize) * DRAWING_VIEWBOX,
//       0,
//       DRAWING_VIEWBOX,
//     );
//     const y = clamp(
//       (locationY / canvasSize) * DRAWING_VIEWBOX,
//       0,
//       DRAWING_VIEWBOX,
//     );
//     return { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) };
//   };

//   const getStrokePoints = (stroke: DrawingStroke) => {
//     const cached = pointsCacheRef.current.get(stroke.id);
//     if (cached) return cached;
//     const points = parsePathPoints(stroke.path);
//     pointsCacheRef.current.set(stroke.id, points);
//     return points;
//   };

//   const eraseAt = (point: Point) => {
//     const current = drawingsRef.current;
//     if (current.length === 0) return;

//     const next = current.filter((stroke) => {
//       const points = getStrokePoints(stroke);
//       if (points.length === 0) return false;
//       const threshold = Math.max(36, stroke.strokeWidth / 2 + 24);
//       if (points.length === 1) {
//         return (
//           Math.hypot(point.x - points[0].x, point.y - points[0].y) > threshold
//         );
//       }
//       for (let i = 0; i < points.length - 1; i += 1) {
//         if (distanceToSegment(point, points[i], points[i + 1]) <= threshold) {
//           return false;
//         }
//       }
//       return true;
//     });

//     if (next.length !== current.length) {
//       drawingsRef.current = next;
//       setDrawings(next);
//     }
//   };

//   const handleDrawingStart = (
//     event: NativeSyntheticEvent<NativeTouchEvent>,
//   ) => {
//     const point = getDrawingPoint(event);
//     if (tool === "eraser") {
//       eraseAt(point);
//       return;
//     }
//     strokeIdRef.current += 1;
//     currentPathRef.current = `M ${point.x} ${point.y}`;
//     setCurrentPath(currentPathRef.current);
//   };

//   const handleDrawingMove = (event: NativeSyntheticEvent<NativeTouchEvent>) => {
//     const point = getDrawingPoint(event);
//     if (tool === "eraser") {
//       eraseAt(point);
//       return;
//     }
//     if (!currentPathRef.current) return;
//     currentPathRef.current += ` L ${point.x} ${point.y}`;
//     setCurrentPath(currentPathRef.current);
//   };

//   const handleDrawingEnd = () => {
//     if (tool !== "draw" || !currentPathRef.current) {
//       currentPathRef.current = "";
//       setCurrentPath("");
//       return;
//     }

//     let finishedPath = currentPathRef.current;
//     if (!finishedPath.includes("L")) {
//       const [, x, y] = finishedPath.split(" ");
//       finishedPath = `${finishedPath} L ${Number(x) + 0.1} ${y}`;
//     }

//     setDrawings((previous) => [
//       ...previous,
//       {
//         id: `${stickerId}-${Date.now()}-${strokeIdRef.current}`,
//         path: finishedPath,
//         color: selectedInk,
//         strokeWidth: brushWidth,
//       },
//     ]);
//     currentPathRef.current = "";
//     setCurrentPath("");
//   };

//   const undoDrawing = () => {
//     if (currentPathRef.current) {
//       currentPathRef.current = "";
//       setCurrentPath("");
//       return;
//     }
//     setDrawings((previous) => previous.slice(0, -1));
//   };

//   //   const clearDrawings = () => {
//   //     if (drawings.length === 0) return;
//   //     Alert.alert(
//   //       i18n.t("sticker_clear_title", { defaultValue: "모두 지울까요?" }),
//   //       i18n.t("sticker_clear_message", {
//   //         defaultValue: "그린 그림이 모두 사라져요.",
//   //       }),
//   //       [
//   //         { text: i18n.t("cancel", { defaultValue: "아니요" }), style: "cancel" },
//   //         {
//   //           text: i18n.t("sticker_clear_confirm", {
//   //             defaultValue: "네, 지울래요",
//   //           }),
//   //           style: "destructive",
//   //           onPress: () => {
//   //             currentPathRef.current = "";
//   //             setCurrentPath("");
//   //             setDrawings([]);
//   //           },
//   //         },
//   //       ],
//   //     );
//   //   };

//   // 전체 삭제 버튼을 눌렀을 때 (그림이 없으면 무시, 있으면 모달 띄우기)
//   const clearDrawings = () => {
//     triggerHaptic("light");
//     if (drawings.length === 0) return;
//     setIsClearAlertVisible(true);
//   };

//   // 모달에서 '확인(네, 지울래요)'을 눌렀을 때 실제 초기화 수행
//   const handleConfirmClear = () => {
//     currentPathRef.current = "";
//     setCurrentPath("");
//     setDrawings([]);
//     setIsClearAlertVisible(false);
//   };
//   const renderBigSvg = () => (
//     <RenderClassificationItemSvg
//       key={`${stickerId}-${selectedColorOption?.id ?? "default"}`}
//       itemId={stickerId}
//       size={Math.round(canvasSize * 0.7)}
//       colorHex={selectedColorOption?.primary}
//       primary={selectedColorOption?.primary}
//       secondary={selectedColorOption?.secondary}
//       accent={selectedColorOption?.accent}
//       pattern={selectedColorOption?.pattern}
//     />
//   );

//   // ----------------------------------------------------------
//   // 도구 패널 UI (Vector Icons 적용)
//   // ----------------------------------------------------------
//   const renderDrawPanel = () => (
//     <>
//       <ToolBarRow>
//         <ToolChip
//           selected={tool === "draw"}
//           onPress={() => setTool("draw")}
//           activeOpacity={0.7}
//           style={{ minHeight: toolHeight }}
//         >
//           <MaterialCommunityIcons
//             name="pencil-outline"
//             size={iconSize}
//             color={tool === "draw" ? "#2f3e35" : "#667085"}
//           />
//         </ToolChip>

//         <ToolChip
//           selected={tool === "eraser"}
//           onPress={() => setTool("eraser")}
//           activeOpacity={0.7}
//           style={{ minHeight: toolHeight }}
//         >
//           <MaterialCommunityIcons
//             name="eraser"
//             size={iconSize}
//             color={tool === "eraser" ? "#2f3e35" : "#667085"}
//           />
//         </ToolChip>

//         <ToolChip
//           selected={false}
//           onPress={undoDrawing}
//           activeOpacity={0.7}
//           style={{ minHeight: toolHeight }}
//         >
//           <MaterialCommunityIcons
//             name="undo-variant"
//             size={iconSize}
//             color="#667085"
//           />
//         </ToolChip>

//         <ToolChip
//           selected={false}
//           onPress={clearDrawings}
//           activeOpacity={0.7}
//           style={{ minHeight: toolHeight }}
//         >
//           <MaterialCommunityIcons
//             name="trash-can-outline"
//             size={iconSize}
//             color="#e53e3e"
//           />
//         </ToolChip>
//       </ToolBarRow>

//       <SectionGap />

//       <BrushSizeRow>
//         {BRUSH_SIZES.map((item) => (
//           <BrushSizeButton
//             key={item.size}
//             selected={brushWidth === item.size}
//             onPress={() => {
//               setBrushWidth(item.size);
//               setTool("draw");
//             }}
//             activeOpacity={0.7}
//             style={{ minHeight: Math.round(44 * scale) }}
//           >
//             <BrushDot
//               style={{
//                 width: Math.round(item.dot * scale),
//                 height: Math.round(item.dot * scale),
//                 borderRadius: Math.round(item.dot * scale),
//                 backgroundColor:
//                   selectedInk === "#FFFFFF" ? "#9CA3AF" : selectedInk,
//               }}
//             />
//           </BrushSizeButton>
//         ))}
//       </BrushSizeRow>

//       <SectionGap />

//       {INK_ROWS.map((row, rowIndex) => (
//         <InkRow
//           key={rowIndex}
//           style={{ marginTop: rowIndex === 0 ? 0 : INK_GAP + 2 }}
//         >
//           {row.map((color) => {
//             const isSelected = selectedInk === color.hex && tool === "draw";
//             return (
//               <InkColorCircle
//                 key={color.id}
//                 selected={isSelected}
//                 activeOpacity={0.8}
//                 style={{
//                   width: inkSize,
//                   height: inkSize,
//                   borderRadius: inkSize / 2,
//                   backgroundColor: color.hex,
//                 }}
//                 onPress={() => {
//                   setSelectedInk(color.hex);
//                   setTool("draw");
//                 }}
//               >
//                 {isSelected && (
//                   <MaterialCommunityIcons
//                     name="check"
//                     size={Math.round(inkSize * 0.5)}
//                     color={
//                       color.id === "white" || color.id === "yellow"
//                         ? "#374151"
//                         : "#FFF"
//                     }
//                   />
//                 )}
//               </InkColorCircle>
//             );
//           })}
//         </InkRow>
//       ))}
//     </>
//   );

//   const renderPaintPanel = () => (
//     <StickerColorGrid>
//       {availableColors.map((color) => {
//         const isSelected = selectedColor === color.id;
//         return (
//           <StickerColorChip
//             key={color.id}
//             selected={isSelected}
//             activeOpacity={0.8}
//             style={{
//               width: stickerChipSize,
//               height: stickerChipSize,
//               borderRadius: stickerChipSize / 2,
//               backgroundColor: color.hex ?? "#FFFFFF",
//             }}
//             onPress={() => setSelectedColor(color.id)}
//           >
//             {/* {color.id === "natural" && (
//               <MaterialCommunityIcons
//                 name="star-sparkles"
//                 size={Math.round(stickerChipSize * 0.45)}
//                 color="#374151"
//               />
//             )} */}
//             {isSelected && color.id !== "natural" && (
//               <MaterialCommunityIcons
//                 name="check"
//                 size={Math.round(stickerChipSize * 0.45)}
//                 color="#FFF"
//               />
//             )}
//           </StickerColorChip>
//         );
//       })}
//     </StickerColorGrid>
//   );

//   return (
//     <Container>
//       {/* SafeAreaView 적용으로 상단/하단 잘림 현상 방지 */}
//       <SafeAreaView style={{ flex: 1 }} edges={["bottom", "left", "right"]}>
//         <AppHeader
//           onBackPress={() => navigation.goBack()}
//           title={i18n.t("sticker_workshop_title", {
//             defaultValue: "나만의 스티커 공방",
//           })}
//           onMascotPress={() => navigation.navigate("SettingScreen")}
//         />

//         <Body style={{ flexDirection: isLandscape ? "row" : "column" }}>
//           {/* 캔버스 영역 */}
//           <CanvasArea
//             onLayout={handleAreaLayout}
//             style={{ padding: CANVAS_AREA_PADDING }}
//           >
//             <CanvasCard style={{ padding: CANVAS_CARD_PADDING }}>
//               <Canvas style={{ width: canvasSize, height: canvasSize }}>
//                 <StickerLayer pointerEvents="none">
//                   {renderBigSvg()}
//                 </StickerLayer>

//                 <DrawingLayer
//                   onStartShouldSetResponder={() => true}
//                   onMoveShouldSetResponder={() => true}
//                   onResponderTerminationRequest={() => false}
//                   onResponderGrant={handleDrawingStart}
//                   onResponderMove={handleDrawingMove}
//                   onResponderRelease={handleDrawingEnd}
//                   onResponderTerminate={handleDrawingEnd}
//                 >
//                   <DrawingSvg
//                     width="100%"
//                     height="100%"
//                     viewBox={`0 0 ${DRAWING_VIEWBOX} ${DRAWING_VIEWBOX}`}
//                     preserveAspectRatio="none"
//                     pointerEvents="none"
//                   >
//                     {drawings.map((stroke) => (
//                       <Path
//                         key={stroke.id}
//                         d={stroke.path}
//                         stroke={stroke.color}
//                         strokeWidth={stroke.strokeWidth}
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         fill="none"
//                       />
//                     ))}
//                     {currentPath ? (
//                       <Path
//                         d={currentPath}
//                         stroke={selectedInk}
//                         strokeWidth={brushWidth}
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         fill="none"
//                       />
//                     ) : null}
//                   </DrawingSvg>
//                 </DrawingLayer>

//                 <NameTag pointerEvents="none">
//                   <NameTagText numberOfLines={1}>
//                     {localizedStickerName}
//                   </NameTagText>
//                 </NameTag>
//                 <SaveDot pointerEvents="none" saved={isSaved}>
//                   <SaveDotText>{isSaved ? "✓" : "…"}</SaveDotText>
//                 </SaveDot>
//               </Canvas>
//             </CanvasCard>
//           </CanvasArea>

//           {/* 도구 패널 영역 (ScrollView 감싸서 하단 잘림 해결) */}
//           <PanelWrap
//             style={
//               isLandscape
//                 ? { width: panelOuterWidth }
//                 : { width: "100%", flex: 1, maxHeight: height * 0.45 }
//             }
//           >
//             <PanelScrollContent
//               bounces={false}
//               showsVerticalScrollIndicator={false}
//               contentContainerStyle={{
//                 padding: PANEL_MARGIN,
//                 paddingBottom: 24,
//               }}
//             >
//               <StudioPanel style={{ padding: PANEL_PADDING }}>
//                 {/* 모드 전환 탭 */}
//                 <ModeRow>
//                   <ModeButton
//                     selected={panelMode === "draw"}
//                     onPress={() => setPanelMode("draw")}
//                     activeOpacity={0.8}
//                     style={{ minHeight: Math.round(46 * scale) }}
//                   >
//                     <MaterialCommunityIcons
//                       name="pencil"
//                       size={iconSize}
//                       color={panelMode === "draw" ? "#FFF" : "#4a5568"}
//                     />
//                   </ModeButton>
//                   <ModeButton
//                     selected={panelMode === "paint"}
//                     onPress={() => setPanelMode("paint")}
//                     activeOpacity={0.8}
//                     style={{ minHeight: Math.round(46 * scale) }}
//                   >
//                     <MaterialCommunityIcons
//                       name="palette-outline"
//                       size={iconSize}
//                       color={panelMode === "paint" ? "#FFF" : "#4a5568"}
//                     />
//                   </ModeButton>
//                 </ModeRow>

//                 <SectionGap />

//                 {panelMode === "draw" ? renderDrawPanel() : renderPaintPanel()}
//               </StudioPanel>
//             </PanelScrollContent>
//           </PanelWrap>
//         </Body>
//       </SafeAreaView>
//       {/* 모두 지우기 확인용 커스텀 모달 */}
//       <CustomAlert
//         visible={isClearAlertVisible}
//         title={i18n.t("sticker_clear_title", {
//           defaultValue: "모두 지울까요?",
//         })}
//         message={i18n.t("sticker_clear_message", {
//           defaultValue: "그린 그림이 모두 사라져요.",
//         })}
//         showCancel={true}
//         onCancel={() => setIsClearAlertVisible(false)}
//         onClose={handleConfirmClear}
//         confirmText={i18n.t("sticker_clear_confirm", {
//           defaultValue: "네, 지울래요",
//         })}
//       />
//     </Container>
//   );
// }

// ============================================================
// 스타일
// ============================================================

// const Container = styled.View`
//   flex: 1;
//   background-color: #f8f6f0;
// `;

// const Body = styled.View`
//   flex: 1;
// `;

// const CanvasArea = styled.View`
//   flex: 1;
//   align-items: center;
//   justify-content: center;
// `;

// const CanvasCard = styled.View`
//   align-items: center;
//   justify-content: center;
//   background-color: #ffffff;
//   border-radius: 24px;
//   shadow-color: #000;
//   shadow-offset: 0px 4px;
//   shadow-opacity: 0.08;
//   shadow-radius: 8px;
//   elevation: 3;
// `;

// const Canvas = styled.View`
//   position: relative;
//   overflow: hidden;
//   border-radius: 18px;
//   background-color: #fefcf9;
//   border-width: 1px;
//   border-color: #f0eae1;
// `;

// const StickerLayer = styled.View`
//   position: absolute;
//   left: 0;
//   right: 0;
//   top: 0;
//   bottom: 0;
//   align-items: center;
//   justify-content: center;
// `;

// const DrawingLayer = styled.View`
//   position: absolute;
//   left: 0;
//   right: 0;
//   top: 0;
//   bottom: 0;
// `;

// const DrawingSvg = styled(Svg)`
//   position: absolute;
//   left: 0;
//   top: 0;
// `;

// const NameTag = styled.View`
//   position: absolute;
//   left: 8px;
//   top: 8px;
//   max-width: 60%;
//   padding-horizontal: 10px;
//   padding-vertical: 4px;
//   background-color: rgba(255, 255, 255, 0.85);
//   border-radius: 10px;
// `;

// const NameTagText = styled(AppText)`
//   font-size: 13px;
//   font-weight: bold;
//   color: #3b4d43;
// `;

// const SaveDot = styled.View<{ saved: boolean }>`
//   position: absolute;
//   right: 8px;
//   top: 8px;
//   width: 26px;
//   height: 26px;
//   align-items: center;
//   justify-content: center;
//   border-radius: 13px;
//   background-color: ${(props) => (props.saved ? "#edf5ee" : "#fff4e0")};
// `;

// const SaveDotText = styled(AppText)`
//   font-size: 13px;
//   font-weight: bold;
//   color: #4a7c59;
// `;

// const PanelWrap = styled.View``;

// const PanelScrollContent = styled.ScrollView``;

// const StudioPanel = styled.View`
//   background-color: #ffffff;
//   border-radius: 24px;
//   shadow-color: #000;
//   shadow-offset: 0px 4px;
//   shadow-opacity: 0.05;
//   shadow-radius: 8px;
//   elevation: 2;
// `;

// const SectionGap = styled.View`
//   height: 10px;
// `;

// const ModeRow = styled.View`
//   flex-direction: row;
//   gap: 8px;
// `;

// const ModeButton = styled(TouchableOpacity)<{ selected: boolean }>`
//   flex: 1;
//   align-items: center;
//   justify-content: center;
//   border-radius: 14px;
//   background-color: ${(props) => (props.selected ? "#52796f" : "#f1eee6")};
// `;

// const ToolBarRow = styled.View`
//   flex-direction: row;
//   gap: 8px;
// `;

// const ToolChip = styled(TouchableOpacity)<{ selected: boolean }>`
//   flex: 1;
//   align-items: center;
//   justify-content: center;
//   border-radius: 14px;
//   background-color: ${(props) => (props.selected ? "#eaf2ec" : "#f7f5f0")};
//   border-width: 2px;
//   border-color: ${(props) => (props.selected ? "#52796f" : "transparent")};
// `;

// const BrushSizeRow = styled.View`
//   flex-direction: row;
//   gap: 8px;
// `;

// const BrushSizeButton = styled(TouchableOpacity)<{ selected: boolean }>`
//   flex: 1;
//   align-items: center;
//   justify-content: center;
//   border-radius: 12px;
//   background-color: ${(props) => (props.selected ? "#eaf2ec" : "#f7f5f0")};
//   border-width: 2px;
//   border-color: ${(props) => (props.selected ? "#52796f" : "transparent")};
// `;

// const BrushDot = styled.View``;

// const InkRow = styled.View`
//   flex-direction: row;
//   justify-content: space-between;
// `;

// const InkColorCircle = styled(TouchableOpacity)<{ selected: boolean }>`
//   align-items: center;
//   justify-content: center;
//   border-width: ${(props) => (props.selected ? 3 : 1)}px;
//   border-color: ${(props) => (props.selected ? "#2f3e35" : "#e2e8f0")};
// `;

// const StickerColorGrid = styled.View`
//   flex-direction: row;
//   flex-wrap: wrap;
//   gap: 8px;
// `;

// const StickerColorChip = styled(TouchableOpacity)<{ selected: boolean }>`
//   align-items: center;
//   justify-content: center;
//   border-width: ${(props) => (props.selected ? 3 : 1)}px;
//   border-color: ${(props) => (props.selected ? "#2f3e35" : "#cbd5e1")};
// `;

import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  NativeTouchEvent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Svg, { Path } from "react-native-svg";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import i18n from "../../i18n";
import { classificationItems } from "../../data/classification/classificationItems";
import { RenderClassificationItemSvg } from "../../assets/Classification/classificationItemSvgs";
import AppHeader from "../../components/AppHeader";
import { AppText } from "../../utils/AppText";
import { useLanguage } from "../../context/LangaugeContext";
import CustomAlert from "../../components/CustomAlert";
import { triggerHaptic } from "../../utils/haptic";

// ============================================================
// 설정
// ============================================================

const ARTWORK_STORAGE_KEY = "@sticker_artworks_v1";
const DRAWING_VIEWBOX = 1000;
const MAX_CANVAS_SIZE = 760;
const MIN_CANVAS_SIZE = 160;

const BASIC_SHAPE_IDS = ["circle", "square", "triangle", "heart", "star"];

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

// ============================================================
// 타입
// ============================================================

type StickerColorOption = {
  id: string;
  hex?: string;
  label: string;
  primary?: string;
  secondary?: string;
  accent?: string;
  pattern?: "spots" | "stripes" | "patches";
};

type DrawingStroke = {
  id: string;
  path: string;
  color: string;
  strokeWidth: number;
};

type SavedArtwork = {
  stickerId: string;
  selectedColor: string;
  drawings: DrawingStroke[];
  updatedAt: number;
};

type ArtworkCollection = Record<string, SavedArtwork>;
type DrawingTool = "draw" | "eraser";
type PanelMode = "draw" | "paint";
type Point = { x: number; y: number };

// ============================================================
// 색상 / 브러시
// ============================================================

const INK_COLORS = [
  { id: "red", hex: "#EF5350" },
  { id: "orange", hex: "#FFA726" },
  { id: "yellow", hex: "#FDD835" },
  { id: "green", hex: "#66BB6A" },
  { id: "blue", hex: "#42A5F5" },
  { id: "purple", hex: "#AB47BC" },
  { id: "pink", hex: "#EC407A" },
  { id: "brown", hex: "#8D6E63" },
  { id: "black", hex: "#374151" },
  { id: "white", hex: "#FFFFFF" },
];

const INK_ROWS = [INK_COLORS.slice(0, 5), INK_COLORS.slice(5, 10)];

const BRUSH_SIZES = [
  { size: 8, dot: 8 },
  { size: 16, dot: 16 },
  { size: 28, dot: 26 },
];

// ============================================================
// 지우개용 도형 계산 (획 단위 삭제)
// ============================================================

const parsePathPoints = (path: string): Point[] => {
  const nums = path.match(/-?\d+(?:\.\d+)?/g);
  if (!nums) return [];
  const points: Point[] = [];
  for (let i = 0; i + 1 < nums.length; i += 2) {
    points.push({ x: Number(nums[i]), y: Number(nums[i + 1]) });
  }
  return points;
};

const distanceToSegment = (p: Point, a: Point, b: Point) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const lengthSq = dx * dx + dy * dy;
  if (lengthSq === 0) return Math.hypot(p.x - a.x, p.y - a.y);
  const t = clamp(((p.x - a.x) * dx + (p.y - a.y) * dy) / lengthSq, 0, 1);
  return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
};

// ============================================================
// 화면 컴포넌트
// ============================================================

export default function StickerDetailScreen() {
  useLanguage();

  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { width, height } = useWindowDimensions();

  const { gameType, stickerId, stickerName } = route.params;

  // 캔버스 영역 측정 먼저 선언
  const [areaSize, setAreaSize] = useState({ w: 0, h: 0 });
  const handleAreaLayout = (event: LayoutChangeEvent) => {
    const { width: w, height: h } = event.nativeEvent.layout;
    setAreaSize((prev) =>
      Math.abs(prev.w - w) < 1 && Math.abs(prev.h - h) < 1 ? prev : { w, h },
    );
  };

  const CANVAS_AREA_PADDING = 8;
  const CANVAS_CARD_PADDING = 6;
  const canvasSize = useMemo(() => {
    if (!areaSize.w || !areaSize.h) {
      return clamp(Math.min(width - 40, 340), MIN_CANVAS_SIZE, MAX_CANVAS_SIZE);
    }
    const free =
      Math.min(areaSize.w, areaSize.h) -
      CANVAS_AREA_PADDING * 2 -
      CANVAS_CARD_PADDING * 2;
    return clamp(Math.floor(free), MIN_CANVAS_SIZE, MAX_CANVAS_SIZE);
  }, [areaSize, width]);

  // ----------------------------------------------------------
  // 반응형 계산 (캔버스와 패널 가로 크기 일치화)
  // ----------------------------------------------------------
  const isLandscape = width > height;
  const shortSide = Math.min(width, height);
  const scale = clamp(shortSide / 390, 0.9, 1.4);

  const PANEL_MARGIN = 10;
  const PANEL_PADDING = Math.round(14 * scale);

  // 세로 모드일 때는 캔버스 크기(canvasSize)와 정확히 일치시키고, 가로 모드일 때는 비율 유지
  const panelOuterWidth = isLandscape
    ? clamp(Math.round(width * 0.38), 280, 460)
    : canvasSize;

  const panelInnerWidth =
    panelOuterWidth - PANEL_MARGIN * 2 - PANEL_PADDING * 2;

  const INK_GAP = 8;
  const inkSize = Math.min(
    Math.round(54 * scale),
    Math.floor((panelInnerWidth - INK_GAP * 4) / 5),
  );
  const stickerChipSize = Math.min(
    Math.round(50 * scale),
    Math.floor((panelInnerWidth - INK_GAP * 4) / 5),
  );
  const toolHeight = Math.round(56 * scale);
  const iconSize = Math.round(24 * scale);

  // ----------------------------------------------------------
  // 스티커 데이터
  // ----------------------------------------------------------
  const stickerData = useMemo(
    () => classificationItems.find((item) => item.id === stickerId) ?? null,
    [stickerId],
  );

  const COLOR_PALETTE: StickerColorOption[] = useMemo(
    () => [
      {
        id: "natural",
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
    [i18n.locale],
  );

  const availableColors = useMemo<StickerColorOption[]>(() => {
    if (
      stickerData &&
      "variants" in stickerData &&
      Array.isArray(stickerData.variants) &&
      stickerData.variants.length > 0
    ) {
      return stickerData.variants.map((variant: any) => ({
        id: variant.colorId,
        label: variant.colorId,
        hex: variant.primary,
        primary: variant.primary,
        secondary: variant.secondary,
        accent: variant.accent,
        pattern: variant.pattern,
      }));
    }

    return COLOR_PALETTE.map((color) => ({
      ...color,
      primary: color.hex,
    }));
  }, [stickerData, COLOR_PALETTE]);

  // ----------------------------------------------------------
  // 상태
  // ----------------------------------------------------------
  const [panelMode, setPanelMode] = useState<PanelMode>("draw");
  const [selectedColor, setSelectedColor] = useState("natural");
  const [selectedInk, setSelectedInk] = useState("#EF5350");
  const [brushWidth, setBrushWidth] = useState(16);
  const [tool, setTool] = useState<DrawingTool>("draw");

  const [isClearAlertVisible, setIsClearAlertVisible] = useState(false);

  const [drawings, setDrawings] = useState<DrawingStroke[]>([]);
  const [currentPath, setCurrentPath] = useState("");

  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaved, setIsSaved] = useState(true);

  const currentPathRef = useRef("");
  const strokeIdRef = useRef(0);
  const drawingsRef = useRef<DrawingStroke[]>([]);
  const pointsCacheRef = useRef<Map<string, Point[]>>(new Map());

  useEffect(() => {
    drawingsRef.current = drawings;
  }, [drawings]);

  const selectedColorOption = useMemo(
    () =>
      availableColors.find((color) => color.id === selectedColor) ??
      availableColors[0],
    [availableColors, selectedColor],
  );

  useEffect(() => {
    if (!availableColors.some((color) => color.id === selectedColor)) {
      setSelectedColor(availableColors[0]?.id ?? "natural");
    }
  }, [availableColors, selectedColor]);

  // ----------------------------------------------------------
  // 불러오기 / 자동 저장
  // ----------------------------------------------------------
  useEffect(() => {
    let isActive = true;
    const loadArtwork = async () => {
      setIsLoaded(false);
      setIsSaved(true);
      try {
        const json = await AsyncStorage.getItem(ARTWORK_STORAGE_KEY);
        if (!isActive) return;
        const collection: ArtworkCollection = json ? JSON.parse(json) : {};
        const savedArtwork = collection[stickerId];

        if (savedArtwork) {
          setDrawings(
            Array.isArray(savedArtwork.drawings) ? savedArtwork.drawings : [],
          );
          setSelectedColor(savedArtwork.selectedColor ?? "natural");
        } else {
          setDrawings([]);
          setSelectedColor("natural");
        }
      } catch (error) {
        console.error("작품 불러오기 실패:", error);
      } finally {
        if (isActive) setIsLoaded(true);
      }
    };
    loadArtwork();
    return () => {
      isActive = false;
    };
  }, [stickerId]);

  useEffect(() => {
    if (!isLoaded) return;
    setIsSaved(false);
    const timeout = setTimeout(async () => {
      try {
        const json = await AsyncStorage.getItem(ARTWORK_STORAGE_KEY);
        const collection: ArtworkCollection = json ? JSON.parse(json) : {};
        collection[stickerId] = {
          stickerId,
          selectedColor,
          drawings,
          updatedAt: Date.now(),
        };
        await AsyncStorage.setItem(
          ARTWORK_STORAGE_KEY,
          JSON.stringify(collection),
        );
        setIsSaved(true);
      } catch (error) {
        console.error("작품 자동 저장 실패:", error);
        setIsSaved(false);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [isLoaded, stickerId, selectedColor, drawings]);

  // ----------------------------------------------------------
  // 스티커 이름 다국어화 (언어 변경 즉시 반영)
  // ----------------------------------------------------------
  const localizedStickerName = useMemo(() => {
    const normalizedShapeId = stickerId?.replace(/^basic/i, "");

    if (gameType === "shape" && BASIC_SHAPE_IDS.includes(normalizedShapeId)) {
      const translated = i18n.t(`basic_shape_${normalizedShapeId}_name`, {
        defaultValue: "",
      });

      if (translated && !translated.includes("missing")) {
        return translated;
      }
    }

    const topCat =
      stickerData && "topCategory" in stickerData
        ? stickerData.topCategory
        : undefined;

    const subCat =
      stickerData && "subCategory" in stickerData
        ? stickerData.subCategory
        : undefined;

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

    for (const key of keyCandidates) {
      const translated = i18n.t(key, { defaultValue: "" });

      if (translated && !translated.includes("missing")) {
        return translated;
      }
    }

    const directTranslation = i18n.t(`item_${stickerId}`, { defaultValue: "" });
    if (directTranslation && !directTranslation.includes("missing")) {
      return directTranslation;
    }

    return stickerName ?? "";
  }, [gameType, stickerId, stickerName, i18n.locale]);

  // ----------------------------------------------------------
  // 그리기 / 지우기 로직
  // ----------------------------------------------------------
  const getDrawingPoint = (
    event: NativeSyntheticEvent<NativeTouchEvent>,
  ): Point => {
    const { locationX, locationY } = event.nativeEvent;
    const x = clamp(
      (locationX / canvasSize) * DRAWING_VIEWBOX,
      0,
      DRAWING_VIEWBOX,
    );
    const y = clamp(
      (locationY / canvasSize) * DRAWING_VIEWBOX,
      0,
      DRAWING_VIEWBOX,
    );
    return { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) };
  };

  const getStrokePoints = (stroke: DrawingStroke) => {
    const cached = pointsCacheRef.current.get(stroke.id);
    if (cached) return cached;
    const points = parsePathPoints(stroke.path);
    pointsCacheRef.current.set(stroke.id, points);
    return points;
  };

  const eraseAt = (point: Point) => {
    const current = drawingsRef.current;
    if (current.length === 0) return;

    const next = current.filter((stroke) => {
      const points = getStrokePoints(stroke);
      if (points.length === 0) return false;
      const threshold = Math.max(36, stroke.strokeWidth / 2 + 24);
      if (points.length === 1) {
        return (
          Math.hypot(point.x - points[0].x, point.y - points[0].y) > threshold
        );
      }
      for (let i = 0; i < points.length - 1; i += 1) {
        if (distanceToSegment(point, points[i], points[i + 1]) <= threshold) {
          return false;
        }
      }
      return true;
    });

    if (next.length !== current.length) {
      drawingsRef.current = next;
      setDrawings(next);
    }
  };

  const handleDrawingStart = (
    event: NativeSyntheticEvent<NativeTouchEvent>,
  ) => {
    const point = getDrawingPoint(event);
    if (tool === "eraser") {
      eraseAt(point);
      return;
    }
    strokeIdRef.current += 1;
    currentPathRef.current = `M ${point.x} ${point.y}`;
    setCurrentPath(currentPathRef.current);
  };

  const handleDrawingMove = (event: NativeSyntheticEvent<NativeTouchEvent>) => {
    const point = getDrawingPoint(event);
    if (tool === "eraser") {
      eraseAt(point);
      return;
    }
    if (!currentPathRef.current) return;
    currentPathRef.current += ` L ${point.x} ${point.y}`;
    setCurrentPath(currentPathRef.current);
  };

  const handleDrawingEnd = () => {
    if (tool !== "draw" || !currentPathRef.current) {
      currentPathRef.current = "";
      setCurrentPath("");
      return;
    }

    let finishedPath = currentPathRef.current;
    if (!finishedPath.includes("L")) {
      const [, x, y] = finishedPath.split(" ");
      finishedPath = `${finishedPath} L ${Number(x) + 0.1} ${y}`;
    }

    setDrawings((previous) => [
      ...previous,
      {
        id: `${stickerId}-${Date.now()}-${strokeIdRef.current}`,
        path: finishedPath,
        color: selectedInk,
        strokeWidth: brushWidth,
      },
    ]);
    currentPathRef.current = "";
    setCurrentPath("");
  };

  // ----------------------------------------------------------
  // 햅틱이 포함된 액션 핸들러들
  // ----------------------------------------------------------
  const handleSelectTool = (newTool: DrawingTool) => {
    triggerHaptic("light");
    setTool(newTool);
  };

  const handleSelectInk = (hex: string) => {
    triggerHaptic("light");
    setSelectedInk(hex);
    setTool("draw");
  };

  const handleSelectBrush = (size: number) => {
    triggerHaptic("light");
    setBrushWidth(size);
    setTool("draw");
  };

  const handleSelectStickerColor = (colorId: string) => {
    triggerHaptic("light");
    setSelectedColor(colorId);
  };

  const handleUndo = () => {
    triggerHaptic("light");
    if (currentPathRef.current) {
      currentPathRef.current = "";
      setCurrentPath("");
      return;
    }
    setDrawings((previous) => previous.slice(0, -1));
  };

  const handleClearTrigger = () => {
    triggerHaptic("light");
    if (drawings.length === 0) return;
    setIsClearAlertVisible(true);
  };

  const handleConfirmClear = () => {
    currentPathRef.current = "";
    setCurrentPath("");
    setDrawings([]);
    setIsClearAlertVisible(false);
  };

  const handleModeChange = (mode: PanelMode) => {
    triggerHaptic("light");
    setPanelMode(mode);
  };

  const renderBigSvg = () => (
    <RenderClassificationItemSvg
      key={`${stickerId}-${selectedColorOption?.id ?? "default"}`}
      itemId={stickerId}
      size={Math.round(canvasSize * 0.7)}
      colorHex={selectedColorOption?.primary}
      primary={selectedColorOption?.primary}
      secondary={selectedColorOption?.secondary}
      accent={selectedColorOption?.accent}
      pattern={selectedColorOption?.pattern}
    />
  );

  // ----------------------------------------------------------
  // 도구 패널 UI (햅틱 + Vector Icons 적용)
  // ----------------------------------------------------------
  const renderDrawPanel = () => (
    <>
      <ToolBarRow>
        <ToolChip
          selected={tool === "draw"}
          onPress={() => handleSelectTool("draw")}
          activeOpacity={0.7}
          style={{ minHeight: toolHeight }}
        >
          <MaterialCommunityIcons
            name="pencil-outline"
            size={iconSize}
            color={tool === "draw" ? "#2f3e35" : "#667085"}
          />
        </ToolChip>

        <ToolChip
          selected={tool === "eraser"}
          onPress={() => handleSelectTool("eraser")}
          activeOpacity={0.7}
          style={{ minHeight: toolHeight }}
        >
          <MaterialCommunityIcons
            name="eraser"
            size={iconSize}
            color={tool === "eraser" ? "#2f3e35" : "#667085"}
          />
        </ToolChip>

        <ToolChip
          selected={false}
          onPress={handleUndo}
          activeOpacity={0.7}
          style={{ minHeight: toolHeight }}
        >
          <MaterialCommunityIcons
            name="undo-variant"
            size={iconSize}
            color="#667085"
          />
        </ToolChip>

        <ToolChip
          selected={false}
          onPress={handleClearTrigger}
          activeOpacity={0.7}
          style={{ minHeight: toolHeight }}
        >
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={iconSize}
            color="#e53e3e"
          />
        </ToolChip>
      </ToolBarRow>

      <SectionGap />

      <BrushSizeRow>
        {BRUSH_SIZES.map((item) => (
          <BrushSizeButton
            key={item.size}
            selected={brushWidth === item.size}
            onPress={() => handleSelectBrush(item.size)}
            activeOpacity={0.7}
            style={{ minHeight: Math.round(44 * scale) }}
          >
            <BrushDot
              style={{
                width: Math.round(item.dot * scale),
                height: Math.round(item.dot * scale),
                borderRadius: Math.round(item.dot * scale),
                backgroundColor:
                  selectedInk === "#FFFFFF" ? "#9CA3AF" : selectedInk,
              }}
            />
          </BrushSizeButton>
        ))}
      </BrushSizeRow>

      <SectionGap />

      {INK_ROWS.map((row, rowIndex) => (
        <InkRow
          key={rowIndex}
          style={{ marginTop: rowIndex === 0 ? 0 : INK_GAP + 2 }}
        >
          {row.map((color) => {
            const isSelected = selectedInk === color.hex && tool === "draw";
            return (
              <InkColorCircle
                key={color.id}
                selected={isSelected}
                activeOpacity={0.8}
                style={{
                  width: inkSize,
                  height: inkSize,
                  borderRadius: inkSize / 2,
                  backgroundColor: color.hex,
                }}
                onPress={() => handleSelectInk(color.hex)}
              >
                {isSelected && (
                  <MaterialCommunityIcons
                    name="check"
                    size={Math.round(inkSize * 0.5)}
                    color={
                      color.id === "white" || color.id === "yellow"
                        ? "#374151"
                        : "#FFF"
                    }
                  />
                )}
              </InkColorCircle>
            );
          })}
        </InkRow>
      ))}
    </>
  );

  const renderPaintPanel = () => (
    <StickerColorGrid>
      {availableColors.map((color) => {
        const isSelected = selectedColor === color.id;
        return (
          <StickerColorChip
            key={color.id}
            selected={isSelected}
            activeOpacity={0.8}
            style={{
              width: stickerChipSize,
              height: stickerChipSize,
              borderRadius: stickerChipSize / 2,
              backgroundColor: color.hex ?? "#FFFFFF",
            }}
            onPress={() => handleSelectStickerColor(color.id)}
          >
            {isSelected && color.id !== "natural" && (
              <MaterialCommunityIcons
                name="check"
                size={Math.round(stickerChipSize * 0.45)}
                color="#FFF"
              />
            )}
          </StickerColorChip>
        );
      })}
    </StickerColorGrid>
  );

  return (
    <Container>
      <SafeAreaView style={{ flex: 1 }} edges={["bottom", "left", "right"]}>
        <AppHeader
          onBackPress={() => navigation.goBack()}
          title={i18n.t("sticker_workshop_title", {
            defaultValue: "나만의 스티커 공방",
          })}
          onMascotPress={() => navigation.navigate("SettingScreen")}
        />

        <Body style={{ flexDirection: isLandscape ? "row" : "column" }}>
          {/* 캔버스 영역 */}
          <CanvasArea
            onLayout={handleAreaLayout}
            style={{ padding: CANVAS_AREA_PADDING }}
          >
            <CanvasCard style={{ padding: CANVAS_CARD_PADDING }}>
              <Canvas style={{ width: canvasSize, height: canvasSize }}>
                <StickerLayer pointerEvents="none">
                  {renderBigSvg()}
                </StickerLayer>

                <DrawingLayer
                  onStartShouldSetResponder={() => true}
                  onMoveShouldSetResponder={() => true}
                  onResponderTerminationRequest={() => false}
                  onResponderGrant={handleDrawingStart}
                  onResponderMove={handleDrawingMove}
                  onResponderRelease={handleDrawingEnd}
                  onResponderTerminate={handleDrawingEnd}
                >
                  <DrawingSvg
                    width="100%"
                    height="100%"
                    viewBox={`0 0 ${DRAWING_VIEWBOX} ${DRAWING_VIEWBOX}`}
                    preserveAspectRatio="none"
                    pointerEvents="none"
                  >
                    {drawings.map((stroke) => (
                      <Path
                        key={stroke.id}
                        d={stroke.path}
                        stroke={stroke.color}
                        strokeWidth={stroke.strokeWidth}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    ))}
                    {currentPath ? (
                      <Path
                        d={currentPath}
                        stroke={selectedInk}
                        strokeWidth={brushWidth}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    ) : null}
                  </DrawingSvg>
                </DrawingLayer>

                <NameTag pointerEvents="none">
                  <NameTagText numberOfLines={1}>
                    {localizedStickerName}
                  </NameTagText>
                </NameTag>
                <SaveDot pointerEvents="none" saved={isSaved}>
                  <SaveDotText>{isSaved ? "✓" : "…"}</SaveDotText>
                </SaveDot>
              </Canvas>
            </CanvasCard>
          </CanvasArea>

          {/* 도구 패널 영역 (캔버스와 가로 폭 일치 및 ScrollView 적용) */}
          <PanelWrap
            style={
              isLandscape
                ? { width: panelOuterWidth }
                : {
                    width: panelOuterWidth,
                    alignSelf: "center",
                    flex: 1,
                    maxHeight: height * 0.45,
                  }
            }
          >
            <PanelScrollContent
              bounces={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                padding: PANEL_MARGIN,
                paddingBottom: 24,
              }}
            >
              <StudioPanel style={{ padding: PANEL_PADDING }}>
                {/* 모드 전환 탭 */}
                <ModeRow>
                  <ModeButton
                    selected={panelMode === "draw"}
                    onPress={() => handleModeChange("draw")}
                    activeOpacity={0.8}
                    style={{ minHeight: Math.round(46 * scale) }}
                  >
                    <MaterialCommunityIcons
                      name="pencil"
                      size={iconSize}
                      color={panelMode === "draw" ? "#FFF" : "#4a5568"}
                    />
                  </ModeButton>
                  <ModeButton
                    selected={panelMode === "paint"}
                    onPress={() => handleModeChange("paint")}
                    activeOpacity={0.8}
                    style={{ minHeight: Math.round(46 * scale) }}
                  >
                    <MaterialCommunityIcons
                      name="palette-outline"
                      size={iconSize}
                      color={panelMode === "paint" ? "#FFF" : "#4a5568"}
                    />
                  </ModeButton>
                </ModeRow>

                <SectionGap />

                {panelMode === "draw" ? renderDrawPanel() : renderPaintPanel()}
              </StudioPanel>
            </PanelScrollContent>
          </PanelWrap>
        </Body>
      </SafeAreaView>

      {/* 모두 지우기 확인용 커스텀 모달 */}
      <CustomAlert
        visible={isClearAlertVisible}
        title={i18n.t("sticker_clear_title", {
          defaultValue: "모두 지울까요?",
        })}
        message={i18n.t("sticker_clear_message", {
          defaultValue: "그린 그림이 모두 사라져요.",
        })}
        showCancel={true}
        onCancel={() => setIsClearAlertVisible(false)}
        onClose={handleConfirmClear}
        confirmText={i18n.t("sticker_clear_confirm", {
          defaultValue: "네, 지울래요",
        })}
      />
    </Container>
  );
}

// ============================================================
// 스타일
// ============================================================

const Container = styled.View`
  flex: 1;
  background-color: #f8f6f0;
`;

const Body = styled.View`
  flex: 1;
`;

const CanvasArea = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const CanvasCard = styled.View`
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 24px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  elevation: 3;
`;

const Canvas = styled.View`
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  background-color: #fefcf9;
  border-width: 1px;
  border-color: #f0eae1;
`;

const StickerLayer = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
`;

const DrawingLayer = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const DrawingSvg = styled(Svg)`
  position: absolute;
  left: 0;
  top: 0;
`;

const NameTag = styled.View`
  position: absolute;
  left: 8px;
  top: 8px;
  max-width: 60%;
  padding-horizontal: 10px;
  padding-vertical: 4px;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 10px;
`;

const NameTagText = styled(AppText)`
  font-size: 13px;
  font-weight: bold;
  color: #3b4d43;
`;

const SaveDot = styled.View<{ saved: boolean }>`
  position: absolute;
  right: 8px;
  top: 8px;
  width: 26px;
  height: 26px;
  align-items: center;
  justify-content: center;
  border-radius: 13px;
  background-color: ${(props) => (props.saved ? "#edf5ee" : "#fff4e0")};
`;

const SaveDotText = styled(AppText)`
  font-size: 13px;
  font-weight: bold;
  color: #4a7c59;
`;

const PanelWrap = styled.View``;

const PanelScrollContent = styled.ScrollView``;

const StudioPanel = styled.View`
  background-color: #ffffff;
  border-radius: 24px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.05;
  shadow-radius: 8px;
  elevation: 2;
`;

const SectionGap = styled.View`
  height: 10px;
`;

const ModeRow = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const ModeButton = styled(TouchableOpacity)<{ selected: boolean }>`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background-color: ${(props) => (props.selected ? "#52796f" : "#f1eee6")};
`;

const ToolBarRow = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const ToolChip = styled(TouchableOpacity)<{ selected: boolean }>`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background-color: ${(props) => (props.selected ? "#eaf2ec" : "#f7f5f0")};
  border-width: 2px;
  border-color: ${(props) => (props.selected ? "#52796f" : "transparent")};
`;

const BrushSizeRow = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const BrushSizeButton = styled(TouchableOpacity)<{ selected: boolean }>`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: ${(props) => (props.selected ? "#eaf2ec" : "#f7f5f0")};
  border-width: 2px;
  border-color: ${(props) => (props.selected ? "#52796f" : "transparent")};
`;

const BrushDot = styled.View``;

const InkRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const InkColorCircle = styled(TouchableOpacity)<{ selected: boolean }>`
  align-items: center;
  justify-content: center;
  border-width: ${(props) => (props.selected ? 3 : 1)}px;
  border-color: ${(props) => (props.selected ? "#2f3e35" : "#e2e8f0")};
`;

const StickerColorGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const StickerColorChip = styled(TouchableOpacity)<{ selected: boolean }>`
  align-items: center;
  justify-content: center;
  border-width: ${(props) => (props.selected ? 3 : 1)}px;
  border-color: ${(props) => (props.selected ? "#2f3e35" : "#cbd5e1")};
`;

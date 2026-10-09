import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";

import { RootStackParamList } from "../../navigation/types";
import { STAGE_CONFIGS } from "./stageConfigs";
import { STAGE_MAP_INFO } from "../../constants/game";
import MapTrail from "./components/MapTrail";
import StageNode from "./components/StageNode";
import AppHeader from "../../components/AppHeader";
// Mascot import 경로가 없어 임시 주석 처리 (원래 파일에 맞춰 유지하세요)
// import Mascot from "../design-system/components/Mascot";
import { AppText } from "../../utils/AppText";
import { colorSortingLevels } from "../../types/colorSortingLevels";
import { ASSETS } from "../../assets/assets";
import { LEVEL_CONFIGS } from "../../data/classification/classificationLevels";
import useGameProgress from "../../hooks/useGameProgress";
import { useLanguage } from "../../context/LangaugeContext";
import i18n from "../../i18n";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "StageMapScreen"
>;

type StageMapRouteProp = RouteProp<RootStackParamList, "StageMapScreen">;

const NODE_STEP_Y = 150;
const TOP_PADDING = 120;
const BOTTOM_PADDING = 140;
export const NODE_SIZE = 120;
const HORIZONTAL_SAFE_PADDING = 70;

export default function StageMapScreen() {
  const { locale } = useLanguage(); // 💡 언어 변경 감지
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<StageMapRouteProp>();
  const gameType = route.params.gameType;

  const scrollRef = useRef<ScrollView>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  // 진입 깜빡임(Flash) 방지를 위한 상태
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [trackWidth, setTrackWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [isReady, setIsReady] = useState(false); // 준비 완료 상태

  // ============================================================
  // Game Type별 레벨 설정
  // ============================================================
  const levelConfigs = (() => {
    switch (gameType) {
      case "color":
        return colorSortingLevels;
      default:
        return [];
    }
  })();

  // ============================================================
  // 실제 존재하는 Stage만 가져오기
  // ============================================================
  const availableStages = STAGE_CONFIGS.filter((stage) =>
    Object.values(levelConfigs).some((level) => level.level === stage.level),
  );
  // ✅ 추가 (availableStages 선언 바로 아래)
  const { progress, currentLevel, loaded } = useGameProgress(
    gameType,
    availableStages.length,
  );

  // ============================================================
  // Map 전체 높이
  // ============================================================
  const contentHeight =
    TOP_PADDING +
    BOTTOM_PADDING +
    Math.max(availableStages.length - 1, 0) * NODE_STEP_Y;

  // ============================================================
  // Stage 위치 계산
  // ============================================================
  const positions = availableStages.map((stage, index) => {
    const y = contentHeight - BOTTOM_PADDING - index * NODE_STEP_Y;
    const usableHalfWidth = Math.max(
      trackWidth / 2 - HORIZONTAL_SAFE_PADDING,
      0,
    );
    const x = trackWidth / 2 + stage.xOffset * usableHalfWidth;
    return { x, y };
  });

  // ============================================================
  // 현재 레벨 위치로 스크롤 동기화
  // ============================================================
  useEffect(() => {
    if (!loaded) return; // ✅ 추가
    if (trackWidth === 0 || viewportHeight === 0) return;

    const targetIndex = availableStages.findIndex(
      (stage) => stage.level === currentLevel,
    );

    if (targetIndex === -1) return;

    const targetY = positions[targetIndex]?.y ?? 0;
    const scrollYPosition = Math.max(targetY - viewportHeight / 2, 0);

    // 1️⃣ 배경 Animated Value 초기값을 타겟 스크롤 위치에 바로 맞춥니다.
    scrollY.setValue(scrollYPosition);

    // 2️⃣ ScrollView 실제 위치를 해당 레벨로 이동
    scrollRef.current?.scrollTo({
      y: scrollYPosition,
      animated: false,
    });

    // 3️⃣ 스크롤 준비 완료 상태 변경 및 Fade-In 애니메이션 시작
    setIsReady(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150, // 0.15초 동안 서서히 나타남
      useNativeDriver: true,
    }).start();
  }, [trackWidth, viewportHeight, currentLevel, availableStages, positions]);

  // ============================================================
  // Stage 선택
  // ============================================================
  const handleStagePress = (level: number) => {
    switch (gameType) {
      case "color":
        navigation.navigate("ColorSortingPlayScreen", {
          gameType,
          level,
        });
        break;
    }
  };

  // ============================================================
  // Header 정보
  // ============================================================
  // 💡 현재 언어(locale)에 맞는 타이틀/서브타이틀 동적 생성
  const { title, subtitle } = useMemo(() => {
    // 1. STAGE_MAP_INFO에서 gameType에 해당하는 키 객체 가져오기
    const info = gameType
      ? STAGE_MAP_INFO[gameType as keyof typeof STAGE_MAP_INFO]
      : undefined;

    // 2. 정보가 없을 경우 Fallback 기본값 제공
    if (!info) {
      return {
        title: i18n.t("stage_default_title", { defaultValue: "분류 놀이" }),
        subtitle: i18n.t("stage_default_subtitle", {
          defaultValue: "알맞은 항목을 찾아요!",
        }),
      };
    }

    // 3. 정상 키가 존재하면 i18n 번역값 반환 (defaultValue 지정으로 키 미등록 시 기본 한국어 노출)
    return {
      title: i18n.t(info.titleKey, { defaultValue: "분류 놀이" }),
      subtitle: i18n.t(info.subtitleKey, {
        defaultValue: "알맞은 항목을 찾아요!",
      }),
    };
  }, [gameType, locale]);

  const isClassificationGame =
    gameType === "color" ||
    gameType === "shape" ||
    gameType === "size" ||
    gameType === "category";

  // ============================================================
  // 배경 전환 (고정 길이 구간 + 짧은 fade)
  // ============================================================
  const BG_SECTION = NODE_STEP_Y * 7; // 배경 한 장이 차지하는 스크롤 길이 (노드 약 7개)
  const BG_FADE = 220; // 전환(fade) 구간 길이

  const maxScrollDistance = Math.max(contentHeight - viewportHeight, 1);

  // 아래(스크롤 최대)에서 위로 올라갈수록 bg2 → bg3 → bg4
  const fadeIn = (boundaryFromBottom: number) => {
    const center = maxScrollDistance - boundaryFromBottom; // scrollY 기준 경계 위치
    return scrollY.interpolate({
      inputRange: [center - BG_FADE / 2, center + BG_FADE / 2],
      outputRange: [1, 0], // 위로 올라오면(scrollY↓) 나타남
      extrapolate: "clamp",
    });
  };

  const bg2Opacity = Animated.multiply(fadeIn(BG_SECTION * 1), fadeAnim);
  const bg3Opacity = Animated.multiply(fadeIn(BG_SECTION * 2), fadeAnim);
  const bg4Opacity = Animated.multiply(fadeIn(BG_SECTION * 3), fadeAnim);

  return (
    <SafeAreaContainer edges={["top"]}>
      <Container>
        {/* ======================================================
            Map View Area (isReady 상태에 따라 Fade-In)
        ====================================================== */}
        <MapContainer
          onLayout={(e) => setViewportHeight(e.nativeEvent.layout.height)}
        >
          {/* bg1은 항상 즉시 표시 → 흰 화면 방지 */}
          <BackgroundLayer source={ASSETS.stageBg1} resizeMode="cover" />

          {/* bg2~4는 scrollY에 따라 (기존 그대로) */}
          <BackgroundLayer
            source={ASSETS.stageBg2}
            resizeMode="cover"
            style={{ opacity: bg2Opacity }}
          />
          <BackgroundLayer
            source={ASSETS.stageBg3}
            resizeMode="cover"
            style={{ opacity: bg3Opacity }}
          />
          <BackgroundLayer
            source={ASSETS.stageBg4}
            resizeMode="cover"
            style={{ opacity: bg4Opacity }}
          />

          {/* 헤더 + 지도 + 버튼만 fade-in */}
          <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            {/* Header */}
            <AppHeader
              title={title}
              subtitle={subtitle}
              onBackPress={() => {
                if (isClassificationGame) {
                  navigation.navigate("ClassificationMenuScreen");
                } else {
                  navigation.navigate("Home");
                }
              }}
              onMascotPress={() => navigation.navigate("SettingScreen")}
            />

            {/* 실제 Stage Map */}
            <Animated.ScrollView
              ref={scrollRef}
              showsVerticalScrollIndicator={false}
              onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}
              contentContainerStyle={{
                height: contentHeight,
              }}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollY,
                      },
                    },
                  },
                ],
                {
                  useNativeDriver: true,
                },
              )}
              scrollEventThrottle={16}
            >
              <View
                style={{
                  height: contentHeight,
                  width: "100%",
                }}
              >
                {trackWidth > 0 && (
                  <MapTrail
                    width={trackWidth}
                    height={contentHeight}
                    points={availableStages.map((stage, idx) => ({
                      ...positions[idx],
                      completed: stage.level < progress.highestClearedLevel,
                    }))}
                  />
                )}

                {availableStages.map((stage, index) => {
                  const pos = positions[index];
                  if (!pos) return null;
                  const unlocked =
                    stage.level <= progress.highestClearedLevel + 1;
                  const completed = stage.level < currentLevel;

                  return (
                    <StageNode
                      key={stage.level}
                      gameType={gameType}
                      level={stage.level}
                      name={stage.name}
                      unlocked={unlocked}
                      completed={completed}
                      isCurrent={stage.level === currentLevel}
                      stars={Math.min(progress.stars[stage.level] ?? 0, 3)}
                      maxStars={3}
                      onPress={() => handleStagePress(stage.level)}
                      style={{
                        left: pos.x - NODE_SIZE / 2,
                        top: pos.y - NODE_SIZE / 2,
                      }}
                    />
                  );
                })}
              </View>
            </Animated.ScrollView>

            {/* Sticker Gallery */}
            <FloatingStickerButton
              activeOpacity={0.85}
              onPress={() => navigation.navigate("StickerGalleryScreen")}
            >
              <Ionicons name="book" size={26} color="#7C5CFF" />
            </FloatingStickerButton>
          </Animated.View>
        </MapContainer>
      </Container>
    </SafeAreaContainer>
  );
}

/* ================================================================
   Background
================================================================ */
const BackgroundLayer = styled(Animated.Image)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

/* ================================================================
   Screen
================================================================ */
const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: transparent;
`;

const Container = styled.View`
  flex: 1;
  background-color: transparent;
`;

/* ================================================================
   Map
================================================================ */
const MapContainer = styled.View`
  flex: 1;
  position: relative;
`;

/* ================================================================
   Floating Sticker
================================================================ */
const FloatingStickerButton = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  bottom: 55px;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  elevation: 6;
  z-index: 10;
`;

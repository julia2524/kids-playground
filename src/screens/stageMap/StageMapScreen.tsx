import React, { useEffect, useRef, useState } from "react";

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

import { AppText } from "../../utils/AppText";

import { colorSortingLevels } from "../../types/colorSortingLevels";

import { ASSETS } from "../../assets/assets";

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
  const navigation = useNavigation<NavigationProp>();

  const route = useRoute<StageMapRouteProp>();

  const gameType = route.params.gameType;

  const scrollRef = useRef<ScrollView>(null);

  const scrollY = useRef(new Animated.Value(0)).current;

  const [trackWidth, setTrackWidth] = useState(0);

  const [viewportHeight, setViewportHeight] = useState(0);

  // ============================================================
  // Game Type별 레벨 설정
  // ============================================================

  const levelConfigs = (() => {
    switch (gameType) {
      case "color":
        return colorSortingLevels;

      // 나중에 추가
      // case "shape":
      //   return shapeSortingLevels;
      // case "size":
      //   return sizeSortingLevels;
      // case "category":
      //   return categorySortingLevels;
      // case "pattern":
      //   return patternLevels;
      // case "puzzle":
      //   return puzzleLevels;
      // case "maze":
      //   return mazeLevels;

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

  const currentLevel = availableStages[0]?.level ?? 1;

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
  // 첫 번째 스테이지로 이동
  // ============================================================

  useEffect(() => {
    if (trackWidth === 0 || viewportHeight === 0) return;

    const targetIndex = availableStages.findIndex(
      (stage) => stage.level === currentLevel,
    );

    if (targetIndex === -1) return;

    const targetY = positions[targetIndex]?.y ?? 0;

    const scrollYPosition = Math.max(targetY - viewportHeight / 2, 0);

    const timer = setTimeout(() => {
      scrollRef.current?.scrollTo({
        y: scrollYPosition,
        animated: false,
      });
    }, 80);

    return () => clearTimeout(timer);
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

      // 나중에 추가
      // case "shape":
      //   navigation.navigate("ShapeSortingPlayScreen", {
      //     gameType,
      //     level,
      //   });
      //   break;

      // case "size":
      //   ...

      // case "category":
      //   ...

      // case "pattern":
      //   ...

      // case "puzzle":
      //   ...

      // case "maze":
      //   ...
    }
  };

  // ============================================================
  // Header 정보
  // ============================================================

  const { title, subtitle } = STAGE_MAP_INFO[gameType] ?? {
    title: "분류 놀이",
    subtitle: "알맞은 항목을 찾아요!",
  };

  const isClassificationGame =
    gameType === "color" ||
    gameType === "shape" ||
    gameType === "size" ||
    gameType === "category";

  // ============================================================
  // ⭐ 우주 배경 전환 계산
  // ============================================================

  const maxScrollDistance = Math.max(contentHeight - viewportHeight, 1);

  // 전체 여행 거리를 3개의 전환 구간으로 나눔
  //
  // bg1 ─────→ bg2 ─────→ bg3 ─────→ bg4
  //
  const travelSection = maxScrollDistance / 3;

  /*
   * 각 배경은 완전히 사라졌다 나타나는 게 아니라
   * 서로 겹치는 구간에서 자연스럽게 cross-fade 된다.
   */

  const bg1Opacity = scrollY.interpolate({
    inputRange: [0, travelSection * 0.75, travelSection * 1.15],
    outputRange: [1, 1, 0],
    extrapolate: "clamp",
  });

  const bg2Opacity = scrollY.interpolate({
    inputRange: [0, travelSection * 0.75, travelSection, travelSection * 1.25],
    outputRange: [0, 1, 1, 0],
    extrapolate: "clamp",
  });

  const bg3Opacity = scrollY.interpolate({
    inputRange: [
      travelSection * 0.85,
      travelSection * 1.75,
      travelSection * 2,
      travelSection * 2.25,
    ],
    outputRange: [0, 1, 1, 0],
    extrapolate: "clamp",
  });

  const bg4Opacity = scrollY.interpolate({
    inputRange: [travelSection * 1.85, travelSection * 2.25, maxScrollDistance],
    outputRange: [0, 1, 1],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaContainer edges={["top"]}>
      <Container>
        {/* ======================================================
            Map View Area
        ====================================================== */}

        <MapContainer
          onLayout={(e) => setViewportHeight(e.nativeEvent.layout.height)}
        >
          {/* ==================================================
              🌌 우주 배경
              
              ScrollView 위에 고정해서 깔고
              scrollY에 따라 서로 자연스럽게 전환
          ================================================== */}

          <BackgroundLayer
            source={ASSETS.stageBg4}
            resizeMode="cover"
            style={{
              opacity: bg1Opacity,
            }}
          />

          <BackgroundLayer
            source={ASSETS.stageBg3}
            resizeMode="cover"
            style={{
              opacity: bg2Opacity,
            }}
          />

          <BackgroundLayer
            source={ASSETS.stageBg2}
            resizeMode="cover"
            style={{
              opacity: bg3Opacity,
            }}
          />

          <BackgroundLayer
            source={ASSETS.stageBg1}
            resizeMode="cover"
            style={{
              opacity: bg4Opacity,
            }}
          />
          {/* ======================================================
            Header
        ====================================================== */}

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

          {/* ==================================================
              실제 Stage Map
          ================================================== */}

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
              {/* ==================================================
                  Map Trail
              ================================================== */}

              {trackWidth > 0 && (
                <MapTrail
                  width={trackWidth}
                  height={contentHeight}
                  points={availableStages.map((stage, idx) => ({
                    ...positions[idx],
                    completed: stage.level < currentLevel,
                  }))}
                />
              )}

              {/* ==================================================
                  Stage Nodes
              ================================================== */}

              {availableStages.map((stage, index) => {
                const pos = positions[index];

                if (!pos) return null;

                const unlocked = true;

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
                    stars={completed ? 3 : 0}
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

          {/* ==================================================
              Sticker Gallery
          ================================================== */}

          <FloatingStickerButton
            activeOpacity={0.85}
            onPress={() => navigation.navigate("StickerGalleryScreen")}
          >
            <Ionicons name="book" size={26} color="#7C5CFF" />
          </FloatingStickerButton>
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
  background-color: transparent; /* 상위 컨테이너도 투명하게 변경 */
`;

const Container = styled.View`
  flex: 1;
  background-color: transparent; /* 상위 컨테이너도 투명하게 변경 */
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

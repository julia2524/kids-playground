import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Animated, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";

import { RootStackParamList } from "../../navigation/types";
import { STAGE_CONFIGS } from "./stageConfigs";
import { STAGE_MAP_INFO } from "../../constants/game";
import MapTrail from "./components/MapTrail";
import StageNode from "./components/StageNode";
import AppHeader from "../../components/AppHeader";

import { colorSortingLevels } from "../../types/Classification/Color/colorSortingLevels";
import { ShapeSortingLevels } from "../../types/Classification/Shape/shapeSortingLevels";
import { CategorySortingLevels } from "../../types/Classification/Category/categorySortingLevels";
import { SizeSortingLevels } from "../../types/Classification/Size/sizeSortingLevels";
import { PATTERN_LEVELS } from "../../types/Pattern/patternLevels";
import { PUZZLE_LEVELS } from "../../types/Puzzle/puzzleLevels";

import { ASSETS } from "../../assets/assets";
import useGameProgress from "../../hooks/useGameProgress";
import { useLanguage } from "../../context/LangaugeContext";
import i18n from "../../i18n";
import { triggerHaptic } from "../../utils/haptic";

import {
  getPuzzleProgress,
  PuzzleProgress,
} from "../../utils/asyncStorage/puzzleProgressStorage";

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

const EMPTY_PUZZLE_PROGRESS: PuzzleProgress = {
  bestStars: {},
  clearedLevels: [],
};

// const PUZZLE_CHARACTER_INFO: Record<
//   string,
//   { title: string; subtitle: string }
// > = {
//   polarbear: {
//     title: i18n.t("puzzle_map_polarbear_title"),
//     subtitle: i18n.t("puzzle_map_polarbear_subtitle"),
//   },
//   rabbit: {
//     title: i18n.t("puzzle_map_rabbit_title"),
//     subtitle: i18n.t("puzzle_map_rabbit_subtitle"),
//   },
//   lion: {
//     title: i18n.t("puzzle_map_lion_title"),
//     subtitle: i18n.t("puzzle_map_lion_subtitle"),
//   },
//   penguin: {
//     title: i18n.t("puzzle_map_penguin_title"),
//     subtitle: i18n.t("puzzle_map_penguin_subtitle"),
//   },
//   elephant: {
//     title: i18n.t("puzzle_map_elephant_title"),
//     subtitle: i18n.t("puzzle_map_elephant_subtitle"),
//   },
//   pig: {
//     title: i18n.t("puzzle_map_pig_title"),
//     subtitle: i18n.t("puzzle_map_pig_subtitle"),
//   },
//   bear: {
//     title: i18n.t("puzzle_map_bear_title"),
//     subtitle: i18n.t("puzzle_map_bear_subtitle"),
//   },
// };
export default function StageMapScreen() {
  const { locale } = useLanguage();

  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<StageMapRouteProp>();

  const {
    gameType,
    character = "polarbear",
    puzzleCategory = "animal",
  } = route.params;

  const isPuzzle = gameType === "puzzle";

  const scrollRef = useRef<any>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [trackWidth, setTrackWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // ============================================================
  // 퍼즐 전용 진행 기록
  // 기존 분류/패턴 게임의 진행 기록과 분리
  // ============================================================
  const [puzzleProgress, setPuzzleProgress] = useState<PuzzleProgress>(
    EMPTY_PUZZLE_PROGRESS,
  );

  const [puzzleLoaded, setPuzzleLoaded] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let active = true;

      if (!isPuzzle) {
        setPuzzleLoaded(false);

        return () => {
          active = false;
        };
      }

      setPuzzleLoaded(false);

      getPuzzleProgress(character)
        .then((result) => {
          if (!active) return;

          setPuzzleProgress(result);
          setPuzzleLoaded(true);
        })
        .catch((error) => {
          console.warn("퍼즐 진행 상황을 불러오지 못했어요.", error);

          if (active) {
            setPuzzleProgress(EMPTY_PUZZLE_PROGRESS);
            setPuzzleLoaded(true);
          }
        });

      return () => {
        active = false;
      };
    }, [isPuzzle, character]),
  );

  // ============================================================
  // 게임별 레벨 설정
  // ============================================================
  const levelConfigs = useMemo(() => {
    switch (gameType) {
      case "color":
        return colorSortingLevels;

      case "shape":
        return ShapeSortingLevels;

      case "category":
        return CategorySortingLevels;

      case "size":
        return SizeSortingLevels;

      case "pattern":
        return PATTERN_LEVELS;

      case "puzzle":
        return PUZZLE_LEVELS;

      default:
        return [];
    }
  }, [gameType]);

  // ============================================================
  // 실제 레벨이 존재하는 스테이지만 사용
  // ============================================================
  const availableStages = useMemo(
    () =>
      STAGE_CONFIGS.filter((stage) =>
        Object.values(levelConfigs).some(
          (level) => level.level === stage.level,
        ),
      ),
    [levelConfigs],
  );

  // 기존 게임의 진행 기록은 기존 훅을 그대로 사용
  const { progress, currentLevel, loaded } = useGameProgress(
    gameType,
    availableStages.length,
  );

  // ============================================================
  // 퍼즐 진행 상태 계산
  // ============================================================
  const puzzleCurrentLevel = useMemo(() => {
    const firstUncleared = PUZZLE_LEVELS.find(
      (item) => !puzzleProgress.clearedLevels.includes(item.level),
    );

    // 모든 레벨을 클리어했다면 마지막 레벨에 위치
    return (
      firstUncleared?.level ??
      PUZZLE_LEVELS[PUZZLE_LEVELS.length - 1]?.level ??
      1
    );
  }, [puzzleProgress.clearedLevels]);

  const puzzleHighestClearedLevel = useMemo(
    () => Math.max(0, ...puzzleProgress.clearedLevels),
    [puzzleProgress.clearedLevels],
  );

  const activeLevel = isPuzzle ? puzzleCurrentLevel : currentLevel;

  const mapLoaded = isPuzzle ? puzzleLoaded : loaded;

  // ============================================================
  // 지도 전체 높이
  // ============================================================
  const contentHeight =
    TOP_PADDING +
    BOTTOM_PADDING +
    Math.max(availableStages.length - 1, 0) * NODE_STEP_Y;

  // ============================================================
  // 스테이지 위치 계산
  // ============================================================
  const positions = useMemo(
    () =>
      availableStages.map((stage, index) => {
        const y = contentHeight - BOTTOM_PADDING - index * NODE_STEP_Y;

        const usableHalfWidth = Math.max(
          trackWidth / 2 - HORIZONTAL_SAFE_PADDING,
          0,
        );

        const x = trackWidth / 2 + stage.xOffset * usableHalfWidth;

        return { x, y };
      }),
    [availableStages, contentHeight, trackWidth],
  );

  // ============================================================
  // 현재 레벨 위치로 스크롤 동기화
  // ============================================================
  useEffect(() => {
    if (!mapLoaded) return;
    if (trackWidth === 0 || viewportHeight === 0) return;
    if (availableStages.length === 0) return;

    const foundIndex = availableStages.findIndex(
      (stage) => stage.level === activeLevel,
    );

    const targetIndex =
      foundIndex >= 0 ? foundIndex : availableStages.length - 1;

    const targetY = positions[targetIndex]?.y ?? 0;

    const scrollYPosition = Math.max(targetY - viewportHeight / 2, 0);

    scrollY.setValue(scrollYPosition);

    scrollRef.current?.scrollTo({
      y: scrollYPosition,
      animated: false,
    });

    setIsReady(true);

    fadeAnim.setValue(0);

    const animation = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    });

    animation.start();

    return () => {
      animation.stop();
    };
  }, [
    mapLoaded,
    trackWidth,
    viewportHeight,
    activeLevel,
    availableStages,
    positions,
    scrollY,
    fadeAnim,
  ]);

  // ============================================================
  // 스테이지 선택
  // ============================================================
  const handleStagePress = useCallback(
    (level: number) => {
      if (isPuzzle) {
        const unlocked =
          level === 1 || puzzleProgress.clearedLevels.includes(level - 1);

        if (!unlocked) return;

        navigation.navigate("PuzzlePlayScreen", {
          gameType: "puzzle",
          puzzleCategory,
          character,
          level,
        });

        return;
      }

      switch (gameType) {
        case "color":
          navigation.navigate("ColorSortingPlayScreen", {
            gameType,
            level,
          });
          break;

        case "shape":
          navigation.navigate("ShapeSortingPlayScreen", {
            gameType,
            level,
          });
          break;

        case "category":
          navigation.navigate("CategorySortingPlayScreen", {
            gameType,
            level,
          });
          break;

        case "size":
          navigation.navigate("SizeSortingPlayScreen", {
            gameType,
            level,
          });
          break;

        case "pattern":
          navigation.navigate("PatternPlayScreen", {
            gameType,
            level,
          });
          break;
      }
    },
    [
      isPuzzle,
      puzzleProgress.clearedLevels,
      navigation,
      puzzleCategory,
      character,
      gameType,
    ],
  );

  // 💡 컴포넌트 내부(또는 useMemo)로 이동하여 locale 변경 시 실시간 반영
  const puzzleCharacterInfo = useMemo(
    () => ({
      polarbear: {
        title: i18n.t("puzzle_map_polarbear_title"),
        subtitle: i18n.t("puzzle_map_polarbear_subtitle"),
      },
      rabbit: {
        title: i18n.t("puzzle_map_rabbit_title"),
        subtitle: i18n.t("puzzle_map_rabbit_subtitle"),
      },
      lion: {
        title: i18n.t("puzzle_map_lion_title"),
        subtitle: i18n.t("puzzle_map_lion_subtitle"),
      },
      penguin: {
        title: i18n.t("puzzle_map_penguin_title"),
        subtitle: i18n.t("puzzle_map_penguin_subtitle"),
      },
      elephant: {
        title: i18n.t("puzzle_map_elephant_title"),
        subtitle: i18n.t("puzzle_map_elephant_subtitle"),
      },
      pig: {
        title: i18n.t("puzzle_map_pig_title"),
        subtitle: i18n.t("puzzle_map_pig_subtitle"),
      },
      bear: {
        title: i18n.t("puzzle_map_bear_title"),
        subtitle: i18n.t("puzzle_map_bear_subtitle"),
      },
    }),
    [locale],
  );
  // ============================================================
  // 헤더 정보
  // ============================================================
  const { title, subtitle } = useMemo(() => {
    if (isPuzzle) {
      const info =
        puzzleCharacterInfo[character as keyof typeof puzzleCharacterInfo] ??
        puzzleCharacterInfo.polarbear;

      return {
        title: info.title,
        subtitle: info.subtitle,
      };
    }

    const info = STAGE_MAP_INFO[gameType as keyof typeof STAGE_MAP_INFO];

    if (!info) {
      return {
        title: i18n.t("stage_default_title", {
          defaultValue: "분류 놀이",
        }),
        subtitle: i18n.t("stage_default_subtitle", {
          defaultValue: "알맞은 항목을 찾아요!",
        }),
      };
    }

    return {
      title: i18n.t(info.titleKey, {
        defaultValue: "분류 놀이",
      }),
      subtitle: i18n.t(info.subtitleKey, {
        defaultValue: "알맞은 항목을 찾아요!",
      }),
    };
  }, [gameType, isPuzzle, character, locale]);
  const isClassificationGame =
    gameType === "color" ||
    gameType === "shape" ||
    gameType === "size" ||
    gameType === "category";

  // ============================================================
  // 배경 전환
  // ============================================================
  const BG_SECTION = NODE_STEP_Y * 7;
  const BG_FADE = 220;

  const maxScrollDistance = Math.max(contentHeight - viewportHeight, 1);

  const fadeIn = (boundaryFromBottom: number) => {
    const center = maxScrollDistance - boundaryFromBottom;

    return scrollY.interpolate({
      inputRange: [center - BG_FADE / 2, center + BG_FADE / 2],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
  };

  const bg2Opacity = Animated.multiply(fadeIn(BG_SECTION), fadeAnim);

  const bg3Opacity = Animated.multiply(fadeIn(BG_SECTION * 2), fadeAnim);

  const bg4Opacity = Animated.multiply(fadeIn(BG_SECTION * 3), fadeAnim);

  // ============================================================
  // 렌더링
  // ============================================================
  return (
    <SafeAreaContainer edges={["top"]}>
      <Container>
        <MapContainer
          onLayout={(event) =>
            setViewportHeight(event.nativeEvent.layout.height)
          }
        >
          {/* 배경 */}
          <BackgroundLayer source={ASSETS.stageBg1} resizeMode="cover" />

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

          {/* 헤더와 지도 */}
          <Animated.View
            style={{
              flex: 1,
              opacity: isReady ? fadeAnim : 0,
            }}
          >
            <AppHeader
              title={title}
              subtitle={subtitle}
              onBackPress={() => {
                if (isPuzzle) {
                  navigation.navigate("PuzzleThemeSelectScreen", {
                    puzzleCategory,
                  });
                  return;
                }

                if (isClassificationGame) {
                  navigation.navigate("ClassificationMenuScreen");
                } else {
                  navigation.navigate("Home");
                }
              }}
              onMascotPress={() => navigation.navigate("SettingScreen")}
            />

            <Animated.ScrollView
              ref={scrollRef}
              showsVerticalScrollIndicator={false}
              onLayout={(event) =>
                setTrackWidth(event.nativeEvent.layout.width)
              }
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
                {/* 구불구불한 길 */}
                {trackWidth > 0 && (
                  <MapTrail
                    width={trackWidth}
                    height={contentHeight}
                    points={availableStages.map((stage, index) => ({
                      ...positions[index],
                      completed: isPuzzle
                        ? puzzleProgress.clearedLevels.includes(stage.level)
                        : stage.level < progress.highestClearedLevel,
                    }))}
                  />
                )}

                {/* 스테이지 노드 */}
                {availableStages.map((stage, index) => {
                  const pos = positions[index];

                  if (!pos) return null;

                  const cleared = isPuzzle
                    ? puzzleProgress.clearedLevels.includes(stage.level)
                    : stage.level < currentLevel;

                  const unlocked = isPuzzle
                    ? stage.level === 1 ||
                      puzzleProgress.clearedLevels.includes(stage.level - 1)
                    : stage.level <= progress.highestClearedLevel + 1;

                  const isCurrent = isPuzzle
                    ? stage.level === puzzleCurrentLevel && !cleared
                    : stage.level === currentLevel;

                  const stars = isPuzzle
                    ? (puzzleProgress.bestStars[String(stage.level)] ?? 0)
                    : (progress.stars[stage.level] ?? 0);

                  const puzzleLevel = PUZZLE_LEVELS.find(
                    (item) => item.level === stage.level,
                  );

                  const nodeName = isPuzzle
                    ? `${puzzleLevel?.pieceCount ?? 0}조각`
                    : stage.name;

                  return (
                    <StageNode
                      key={stage.level}
                      gameType={gameType}
                      level={stage.level}
                      name={nodeName}
                      unlocked={unlocked}
                      completed={cleared}
                      isCurrent={isCurrent}
                      stars={Math.min(stars, isPuzzle ? 5 : 3)}
                      maxStars={isPuzzle ? 5 : 3}
                      onPress={() => {
                        triggerHaptic("light");
                        handleStagePress(stage.level);
                      }}
                      style={{
                        left: pos.x - NODE_SIZE / 2,
                        top: pos.y - NODE_SIZE / 2,
                      }}
                    />
                  );
                })}
              </View>
            </Animated.ScrollView>

            {/* 스티커 갤러리 */}
            <FloatingStickerButton
              activeOpacity={0.85}
              onPress={() => {
                triggerHaptic("light");
                navigation.navigate("StickerGalleryScreen");
              }}
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

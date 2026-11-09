import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from "react-native";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

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

import BannerAd from "../../services/BannerAd";

// ============================================================
// Types
// ============================================================

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "StageMapScreen"
>;

type StageMapRouteProp = RouteProp<RootStackParamList, "StageMapScreen">;

// ============================================================
// Layout Constants
// ============================================================

const NODE_STEP_Y = 150;

const TOP_PADDING = 120;
const BOTTOM_PADDING = 140;

export const NODE_SIZE = 120;

const HORIZONTAL_SAFE_PADDING = 70;

// 화면 밖에서 미리 렌더링할 여유 영역
const RENDER_OVERSCAN = NODE_STEP_Y * 2;
// 연결선은 노드보다 더 넓은 범위를 미리 렌더링
const TRAIL_OVERSCAN = NODE_STEP_Y * 4;

// 스크롤 위치를 이 단위로 나누어 렌더링 범위 갱신
const RENDER_WINDOW_STEP = NODE_STEP_Y;

const EMPTY_PUZZLE_PROGRESS: PuzzleProgress = {
  bestStars: {},
  clearedLevels: [],
};

// ============================================================
// Screen
// ============================================================

export default function StageMapScreen() {
  const insets = useSafeAreaInsets();

  const { locale } = useLanguage();

  const navigation = useNavigation<NavigationProp>();

  const route = useRoute<StageMapRouteProp>();

  const {
    gameType,
    character = "polarbear",
    puzzleCategory = "animal",
    groupId,
  } = route.params;

  const isPuzzle = gameType === "puzzle";

  const scrollRef = useRef<any>(null);

  const scrollY = useRef(new Animated.Value(0)).current;
  const isLeavingRef = useRef(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [trackWidth, setTrackWidth] = useState(0);

  const [viewportHeight, setViewportHeight] = useState(0);

  const [isReady, setIsReady] = useState(false);

  // ============================================================
  // 렌더링 범위 관리
  // ============================================================

  const [renderWindowOffset, setRenderWindowOffset] = useState(0);

  const lastRenderBucket = useRef(0);

  const updateRenderWindow = useCallback((offset: number) => {
    const safeOffset = Math.max(0, offset);

    const nextBucket = Math.floor(safeOffset / RENDER_WINDOW_STEP);

    if (lastRenderBucket.current === nextBucket) {
      return;
    }

    lastRenderBucket.current = nextBucket;

    setRenderWindowOffset(nextBucket * RENDER_WINDOW_STEP);
  }, []);

  // 화면 위쪽 렌더링 경계
  const visibleTop = Math.max(0, renderWindowOffset - RENDER_OVERSCAN);

  // 화면 아래쪽 렌더링 경계
  const visibleBottom = renderWindowOffset + viewportHeight + RENDER_OVERSCAN;

  // ============================================================
  // 퍼즐 전용 진행 기록
  // ============================================================

  const [puzzleProgress, setPuzzleProgress] = useState<PuzzleProgress>(
    EMPTY_PUZZLE_PROGRESS,
  );

  const [puzzleLoaded, setPuzzleLoaded] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let active = true;

      // 화면에 다시 진입하면 스크롤 갱신 허용
      isLeavingRef.current = false;

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

  // ============================================================
  // 게임 진행 기록
  // ============================================================

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

    return (
      firstUncleared?.level ??
      PUZZLE_LEVELS[PUZZLE_LEVELS.length - 1]?.level ??
      1
    );
  }, [puzzleProgress.clearedLevels]);

  const activeLevel = isPuzzle ? puzzleCurrentLevel : currentLevel;

  const mapLoaded = isPuzzle ? puzzleLoaded : loaded;

  // ============================================================
  // 지도 전체 높이
  // ============================================================

  const contentHeight =
    TOP_PADDING +
    BOTTOM_PADDING +
    Math.max(availableStages.length - 1, 0) * NODE_STEP_Y;

  // 연결선 전용 렌더링 범위
  const trailVisibleTop = Math.max(0, visibleTop - TRAIL_OVERSCAN);

  const trailVisibleBottom = Math.min(
    contentHeight,
    visibleBottom + TRAIL_OVERSCAN,
  );

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
  // 지도 연결선 데이터
  // 스크롤 렌더링과 분리하여 데이터가 바뀔 때만 재생성
  // ============================================================

  const trailPoints = useMemo(
    () =>
      availableStages.map((stage, index) => ({
        ...positions[index],

        completed: isPuzzle
          ? puzzleProgress.clearedLevels.includes(stage.level)
          : stage.level < progress.highestClearedLevel,
      })),
    [
      availableStages,
      positions,
      isPuzzle,
      puzzleProgress.clearedLevels,
      progress.highestClearedLevel,
    ],
  );
  // ============================================================
  // 현재 레벨 위치로 스크롤 동기화
  // ============================================================

  useEffect(() => {
    if (!mapLoaded) return;

    if (trackWidth === 0 || viewportHeight === 0) {
      return;
    }

    if (availableStages.length === 0) {
      return;
    }

    const foundIndex = availableStages.findIndex(
      (stage) => stage.level === activeLevel,
    );

    const targetIndex =
      foundIndex >= 0 ? foundIndex : availableStages.length - 1;

    const targetY = positions[targetIndex]?.y ?? 0;

    const scrollYPosition = Math.max(targetY - viewportHeight / 2, 0);

    // 기존 스크롤 위치 유지
    scrollY.setValue(scrollYPosition);

    scrollRef.current?.scrollTo({
      y: scrollYPosition,
      animated: false,
    });

    // 자동 스크롤 위치에 맞춰 렌더링 범위도 동기화
    updateRenderWindow(scrollYPosition);

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
    updateRenderWindow,
  ]);

  // ============================================================
  // 스크롤 이벤트
  // ============================================================

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      // 화면을 나가는 중에는 렌더링 범위를 갱신하지 않음
      if (isLeavingRef.current) return;

      const offsetY = event.nativeEvent.contentOffset.y;

      updateRenderWindow(offsetY);
    },
    [updateRenderWindow],
  );

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

  // ============================================================
  // 퍼즐 캐릭터 정보
  // ============================================================

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

      korea: {
        title: i18n.t("flag_korea_title"),
        subtitle: i18n.t("flag_korea_desc"),
      },

      usa: {
        title: i18n.t("flag_usa_title"),
        subtitle: i18n.t("flag_usa_desc"),
      },

      japan: {
        title: i18n.t("flag_japan_title"),
        subtitle: i18n.t("flag_japan_desc"),
      },

      uk: {
        title: i18n.t("flag_uk_title"),
        subtitle: i18n.t("flag_uk_desc"),
      },

      australia: {
        title: i18n.t("flag_australia_title"),
        subtitle: i18n.t("flag_australia_desc"),
      },

      china: {
        title: i18n.t("flag_china_title"),
        subtitle: i18n.t("flag_china_desc"),
      },

      france: {
        title: i18n.t("flag_france_title"),
        subtitle: i18n.t("flag_france_desc"),
      },

      egypt: {
        title: i18n.t("flag_egypt_title"),
        subtitle: i18n.t("flag_egypt_desc"),
      },

      saudiarabia: {
        title: i18n.t("flag_saudiarabia_title"),
        subtitle: i18n.t("flag_saudiarabia_desc"),
      },
      venezuela: {
        title: i18n.t("flag_venezuela_title"),
        subtitle: i18n.t("flag_venezuela_desc"),
      },
      colombia: {
        title: i18n.t("flag_colombia_title"),
        subtitle: i18n.t("flag_colombia_desc"),
      },
      peru: {
        title: i18n.t("flag_peru_title"),
        subtitle: i18n.t("flag_peru_desc"),
      },
      iraq: {
        title: i18n.t("flag_iraq_title"),
        subtitle: i18n.t("flag_iraq_desc"),
      },
      algeria: {
        title: i18n.t("flag_algeria_title"),
        subtitle: i18n.t("flag_algeria_desc"),
      },
      chile: {
        title: i18n.t("flag_chile_title"),
        subtitle: i18n.t("flag_chile_desc"),
      },
      cuba: {
        title: i18n.t("flag_cuba_title"),
        subtitle: i18n.t("flag_cuba_desc"),
      },
      ukraine: {
        title: i18n.t("flag_ukraine_title"),
        subtitle: i18n.t("flag_ukraine_desc"),
      },
      uruguay: {
        title: i18n.t("flag_uruguay_title"),
        subtitle: i18n.t("flag_uruguay_desc"),
      },
      paraguay: {
        title: i18n.t("flag_paraguay_title"),
        subtitle: i18n.t("flag_paraguay_desc"),
      },
      honduras: {
        title: i18n.t("flag_honduras_title"),
        subtitle: i18n.t("flag_honduras_desc"),
      },
      elsalvador: {
        title: i18n.t("flag_elsalvador_title"),
        subtitle: i18n.t("flag_elsalvador_desc"),
      },
      nicaragua: {
        title: i18n.t("flag_nicaragua_title"),
        subtitle: i18n.t("flag_nicaragua_desc"),
      },
      guatemala: {
        title: i18n.t("flag_guatemala_title"),
        subtitle: i18n.t("flag_guatemala_desc"),
      },
      costarica: {
        title: i18n.t("flag_costarica_title"),
        subtitle: i18n.t("flag_costarica_desc"),
      },
      panama: {
        title: i18n.t("flag_panama_title"),
        subtitle: i18n.t("flag_panama_desc"),
      },
      bolivia: {
        title: i18n.t("flag_bolivia_title"),
        subtitle: i18n.t("flag_bolivia_desc"),
      },
      ecuador: {
        title: i18n.t("flag_ecuador_title"),
        subtitle: i18n.t("flag_ecuador_desc"),
      },
      bangladesh: {
        title: i18n.t("flag_bangladesh_title"),
        subtitle: i18n.t("flag_bangladesh_desc"),
      },

      netherlands: {
        title: i18n.t("flag_netherlands_title"),
        subtitle: i18n.t("flag_netherlands_desc"),
      },

      germany: {
        title: i18n.t("flag_germany_title"),
        subtitle: i18n.t("flag_germany_desc"),
      },

      greece: {
        title: i18n.t("flag_greece_title"),
        subtitle: i18n.t("flag_greece_desc"),
      },

      india: {
        title: i18n.t("flag_india_title"),
        subtitle: i18n.t("flag_india_desc"),
      },

      indonesia: {
        title: i18n.t("flag_indonesia_title"),
        subtitle: i18n.t("flag_indonesia_desc"),
      },

      spain: {
        title: i18n.t("flag_spain_title"),
        subtitle: i18n.t("flag_spain_desc"),
      },

      italy: {
        title: i18n.t("flag_italy_title"),
        subtitle: i18n.t("flag_italy_desc"),
      },

      brazil: {
        title: i18n.t("flag_brazil_title"),
        subtitle: i18n.t("flag_brazil_desc"),
      },

      sweden: {
        title: i18n.t("flag_sweden_title"),
        subtitle: i18n.t("flag_sweden_desc"),
      },

      thailand: {
        title: i18n.t("flag_thailand_title"),
        subtitle: i18n.t("flag_thailand_desc"),
      },

      vietnam: {
        title: i18n.t("flag_vietnam_title"),
        subtitle: i18n.t("flag_vietnam_desc"),
      },

      canada: {
        title: i18n.t("flag_canada_title"),
        subtitle: i18n.t("flag_canada_desc"),
      },

      switzerland: {
        title: i18n.t("flag_switzerland_title"),
        subtitle: i18n.t("flag_switzerland_desc"),
      },

      turkey: {
        title: i18n.t("flag_turkey_title"),
        subtitle: i18n.t("flag_turkey_desc"),
      },

      argentina: {
        title: i18n.t("flag_argentina_title"),
        subtitle: i18n.t("flag_argentina_desc"),
      },

      poland: {
        title: i18n.t("flag_poland_title"),
        subtitle: i18n.t("flag_poland_desc"),
      },

      romania: {
        title: i18n.t("flag_romania_title"),
        subtitle: i18n.t("flag_romania_desc"),
      },

      russia: {
        title: i18n.t("flag_russia_title"),
        subtitle: i18n.t("flag_russia_desc"),
      },

      philippines: {
        title: i18n.t("flag_philippines_title"),
        subtitle: i18n.t("flag_philippines_desc"),
      },

      malaysia: {
        title: i18n.t("flag_malaysia_title"),
        subtitle: i18n.t("flag_malaysia_desc"),
      },

      pakistan: {
        title: i18n.t("flag_pakistan_title"),
        subtitle: i18n.t("flag_pakistan_desc"),
      },

      mexico: {
        title: i18n.t("flag_mexico_title"),
        subtitle: i18n.t("flag_mexico_desc"),
      },
      portugal: {
        title: i18n.t("flag_portugal_title"),
        subtitle: i18n.t("flag_portugal_desc"),
      },
      belgium: {
        title: i18n.t("flag_belgium_title"),
        subtitle: i18n.t("flag_belgium_desc"),
      },
      drcongo: {
        title: i18n.t("flag_drcongo_title"),
        subtitle: i18n.t("flag_drcongo_desc"),
      },
      nigeria: {
        title: i18n.t("flag_nigeria_title"),
        subtitle: i18n.t("flag_nigeria_desc"),
      },
      nepal: {
        title: i18n.t("flag_nepal_title"),
        subtitle: i18n.t("flag_nepal_desc"),
      },
      iran: {
        title: i18n.t("flag_iran_title"),
        subtitle: i18n.t("flag_iran_desc"),
      },
      tanzania: {
        title: i18n.t("flag_tanzania_title"),
        subtitle: i18n.t("flag_tanzania_desc"),
      },
      taiwan: {
        title: i18n.t("flag_taiwan_title"),
        subtitle: i18n.t("flag_taiwan_desc"),
      },

      bigben: {
        title: i18n.t("landmark_bigben_title"),
        subtitle: i18n.t("landmark_bigben_desc"),
      },

      pyramid: {
        title: i18n.t("landmark_pyramid_title"),
        subtitle: i18n.t("landmark_pyramid_desc"),
      },

      eiffel: {
        title: i18n.t("landmark_eiffel_title"),
        subtitle: i18n.t("landmark_eiffel_desc"),
      },

      pisa: {
        title: i18n.t("landmark_pisa_title"),
        subtitle: i18n.t("landmark_pisa_desc"),
      },

      operahouse: {
        title: i18n.t("landmark_operahouse_title"),
        subtitle: i18n.t("landmark_operahouse_desc"),
      },

      liberty: {
        title: i18n.t("landmark_liberty_title"),
        subtitle: i18n.t("landmark_liberty_desc"),
      },

      tajmahal: {
        title: i18n.t("landmark_tajmahal_title"),
        subtitle: i18n.t("landmark_tajmahal_desc"),
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
  }, [gameType, isPuzzle, character, locale, puzzleCharacterInfo]);

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
    <Container>
      {/* 배경 이미지 */}
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

      <SafeAreaContainer edges={["top", "bottom"]}>
        <MapContainer
          onLayout={(event) =>
            setViewportHeight(event.nativeEvent.layout.height)
          }
        >
          <Animated.View
            style={{
              flex: 1,
              opacity: isReady ? fadeAnim : 0,
            }}
          >
            <AppHeader
              title={title}
              subtitle={subtitle}
              // onBackPress={() => {
              //   // 화면 전환 시작 전에 스크롤 기반 렌더링 갱신 중단
              //   isLeavingRef.current = true;

              //   if (isPuzzle) {
              //     navigation.navigate("PuzzleThemeSelectScreen", {
              //       puzzleCategory,
              //     });

              //     return;
              //   }

              //   if (isClassificationGame) {
              //     navigation.navigate("ClassificationMenuScreen");
              //   } else {
              //     navigation.navigate("Home");
              //   }
              // }}
              onBackPress={() => {
                isLeavingRef.current = true;

                if (isPuzzle) {
                  navigation.navigate("PuzzleThemeSelectScreen", {
                    puzzleCategory,
                    groupId,
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
                paddingBottom: 80,
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
                  listener: handleScroll,
                },
              )}
              scrollEventThrottle={16}
            >
              <View
                style={{
                  height: contentHeight,
                  direction: "ltr",
                  width: "100%",
                }}
              >
                {/* 구불구불한 길 */}
                {trackWidth > 0 && (
                  <MapTrail
                    width={trackWidth}
                    height={contentHeight}
                    points={trailPoints}
                    visibleTop={trailVisibleTop}
                    visibleBottom={trailVisibleBottom}
                  />
                )}
                {/* 스테이지 노드 */}
                {availableStages.map((stage, index) => {
                  const pos = positions[index];

                  if (!pos) return null;

                  // 현재 렌더링 영역 밖의 노드는 생성하지 않음
                  const nodeTop = pos.y - NODE_SIZE / 2;

                  const nodeBottom = pos.y + NODE_SIZE / 2;

                  const isInRenderWindow =
                    nodeBottom >= visibleTop && nodeTop <= visibleBottom;

                  if (!isInRenderWindow) {
                    return null;
                  }

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

                  const isFiveStarGame =
                    gameType === "puzzle" ||
                    gameType === "pattern" ||
                    gameType === "category" ||
                    gameType === "size";

                  return (
                    <StageNode
                      key={stage.level}
                      gameType={gameType}
                      level={stage.level}
                      name={nodeName}
                      unlocked={unlocked}
                      completed={cleared}
                      isCurrent={isCurrent}
                      stars={Math.min(stars, isFiveStarGame ? 5 : 3)}
                      maxStars={isFiveStarGame ? 5 : 3}
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
      </SafeAreaContainer>

      {/* 하단 고정 광고 */}
      <BannerAdContainer bottomInset={insets.bottom}>
        <BannerAd />
      </BannerAdContainer>
    </Container>
  );
}

// ============================================================
// Background
// ============================================================

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

// ============================================================
// Screen
// ============================================================

const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: transparent;
`;

const Container = styled.View`
  flex: 1;
  background-color: transparent;
`;

// ============================================================
// Map
// ============================================================

const MapContainer = styled.View`
  flex: 1;
  position: relative;
`;

// ============================================================
// Floating Sticker
// ============================================================

const FloatingStickerButton = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  bottom: 65px;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  elevation: 6;
  z-index: 10;
`;

// ============================================================
// Banner
// ============================================================

const BannerAdContainer = styled.View<{
  bottomInset: number;
}>`
  height: 60px;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  position: absolute;
  bottom: ${(props) => Math.max(props.bottomInset, 12)}px;
  left: 0;
  z-index: 20;
`;

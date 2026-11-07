import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  I18nManager,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
} from "react-native";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { AppText } from "../../utils/AppText";
import { RootStackParamList } from "../../navigation/types";
import { ASSETS } from "../../assets/assets";
import AppHeader from "../../components/AppHeader";
import i18n from "../../i18n";
import { useLanguage } from "../../context/LangaugeContext";
import { triggerHaptic } from "../../utils/haptic";
import {
  getLastPuzzleCategory,
  saveLastPuzzleCategory,
} from "../../utils/asyncStorage/puzzleProgressStorage";
import CustomAlert from "../../components/CustomAlert";
import { getKoreanSubjectParticle } from "../../utils/korean";
import BannerAd from "../../services/BannerAd";

export type PuzzleCategoryType =
  | "animal"
  | "vehicle"
  | "flag"
  | "landmark"
  | "dinosaur"
  | "object";

export const colors = {
  purple: "#7C5CFF",
  blue: "#4D8DFF",
  pink: "#FF6FAE",
  yellow: "#FFD95A",
  mint: "#55D6BE",
  white: "#FFFFFF",
  background: "#F2F5FF",
  text: "#29263D",
  secondaryText: "#7E7B9A",

  cardBg: {
    animal: "#FFF0F5",
    vehicle: "#F0F5FF",
    flag: "#FFF2F2",
    landmark: "#FFF9E6",
    dinosaur: "#EDFAF6",
    object: "#FFF9E6",
  },

  accent: {
    animal: "#FF6FAE",
    vehicle: "#4D8DFF",
    flag: "#E84A5F",
    landmark: "#FFB020",
    dinosaur: "#34CDB2",
    object: "#FFB020",
  },
} as const;

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// ⭐ 카드가 화면을 더 큼직하게 꽉 채우도록 너비를 90%로 늘림 (좌우 여백 최소화)
// const CARD_WIDTH = SCREEN_WIDTH * 0.81;
// const ITEM_SPACING = 16;
// const SNAP_INTERVAL = CARD_WIDTH + ITEM_SPACING;
// const SIDE_SPACE = (SCREEN_WIDTH - CARD_WIDTH) / 2;

// ⭐ 카드가 큼직하면서도 좌우 균형이 딱 맞도록 너비를 0.86으로 살짝 키웁니다.
const CARD_WIDTH = SCREEN_WIDTH * 0.8;
const ITEM_SPACING = 12; // 간격을 살짝 줄여서 중앙 정렬감을 높임
const SNAP_INTERVAL = CARD_WIDTH + ITEM_SPACING;

// ⭐ 양옆 여백을 '카드와 화면의 빈 공간 / 2' 로 정확히 나누어 중앙에 고정시킵니다.
const SIDE_SPACE = (SCREEN_WIDTH - CARD_WIDTH) / 2;

type PuzzleGameConfig = {
  id: PuzzleCategoryType;
  titleKey: string;
  subtitleKey: string;
  descKey: string;
  iconName: keyof typeof Ionicons.glyphMap;
  accentColor: string;
  cardBg: string;
  isUnlocked: boolean;
};

const MENU_PUZZLE_CONFIGS: readonly PuzzleGameConfig[] = [
  {
    id: "animal",
    titleKey: "puzzle_animal_title",
    subtitleKey: "puzzle_animal_subtitle",
    descKey: "puzzle_animal_desc",
    iconName: "paw",
    accentColor: colors.accent.animal,
    cardBg: colors.cardBg.animal,
    isUnlocked: true,
  },
  {
    id: "flag",
    titleKey: "puzzle_flag_title",
    subtitleKey: "puzzle_flag_subtitle",
    descKey: "puzzle_flag_desc",
    iconName: "flag",
    accentColor: colors.accent.flag,
    cardBg: colors.cardBg.flag,
    isUnlocked: true,
  },
  {
    id: "landmark",
    titleKey: "puzzle_landmark_title",
    subtitleKey: "puzzle_landmark_subtitle",
    descKey: "puzzle_landmark_desc",
    iconName: "globe-outline",
    accentColor: "#FFB020",
    cardBg: "#FFF9E6",
    isUnlocked: true,
  },
] as const;

export default function PuzzleMenuScreen() {
  const insets = useSafeAreaInsets();
  const { locale } = useLanguage();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<any>>(null);

  // ⭐ 앱이 forceRTL 로 네이티브 레이아웃 방향을 이미 뒤집어 둔 상태이므로
  //    그 값(I18nManager.isRTL)을 기준으로 삼는다.
  //    네이티브 RTL 에서는 FlatList / flex-row 가 알아서 오른쪽부터 시작하므로
  //    데이터 순서는 절대 뒤집지 않는다. (animal=0, flag=1, landmark=2 유지)
  const isRTL = I18nManager.isRTL;

  const PUZZLES = useMemo(() => {
    return MENU_PUZZLE_CONFIGS.map((item) => ({
      ...item,
      title: i18n.t(item.titleKey) || item.id,
      subtitle: i18n.t(item.subtitleKey) || "",
      description: i18n.t(item.descKey) || "",
    }));
  }, [locale]);

  useEffect(() => {
    const loadLastPuzzlePosition = async () => {
      const lastPuzzleId = await getLastPuzzleCategory();
      if (!lastPuzzleId) return;

      const targetIndex = PUZZLES.findIndex(
        (puzzle) => puzzle.id === lastPuzzleId,
      );

      if (targetIndex !== -1) {
        setCurrentIndex(targetIndex);
        setTimeout(() => {
          flatListRef.current?.scrollToOffset({
            offset: targetIndex * SNAP_INTERVAL,
            animated: false,
          });
        }, 100);
      }
    };

    loadLastPuzzlePosition();
  }, [PUZZLES]);

  // LTR(영어권): 원본 그대로
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SNAP_INTERVAL);
    if (index !== currentIndex && index >= 0 && index < PUZZLES.length) {
      setCurrentIndex(index);
    }
  };

  // ------------------------------------------------------------
  // RTL 전용: 스크롤이 멈춘 뒤에만 인덱스를 계산한다.
  //
  // scrollToOffset(x) 은 "시작점(오른쪽) 기준"으로 동작하지만,
  // 플랫폼에 따라 onMomentumScrollEnd 의 contentOffset.x 는
  //   (A) 시작점 기준       : 첫 카드 = 0,  마지막 카드 = 최대값
  //   (B) 물리적 왼쪽 기준  : 첫 카드 = 최대값, 마지막 카드 = 0   (Android 에서 흔함)
  // 중 하나로 보고된다. (B)를 (A)처럼 읽으면 카드/Dot 인덱스가 뒤집힌다.
  // -> 기본값은 플랫폼으로 정하고, 화살표로 이동한 "목표 인덱스"와 비교해서
  //    어느 쪽 방식인지 스스로 보정한다.
  // ------------------------------------------------------------
  const offsetIsFromLeftRef = useRef<boolean>(Platform.OS === "android");
  const pendingTargetRef = useRef<number | null>(null);

  const handleScrollEndRTL = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const rawX = Math.abs(contentOffset.x);
    const maxOffset = Math.max(0, contentSize.width - layoutMeasurement.width);

    const lastIndex = PUZZLES.length - 1;
    const clamp = (n: number) => Math.min(lastIndex, Math.max(0, n));

    const directIndex = clamp(Math.round(rawX / SNAP_INTERVAL)); // (A)
    const reversedIndex = clamp(Math.round((maxOffset - rawX) / SNAP_INTERVAL)); // (B)

    // 화살표로 이동한 직후라면 목표 인덱스와 맞는 쪽으로 방식을 학습
    const target = pendingTargetRef.current;
    if (target !== null) {
      if (directIndex === target && reversedIndex !== target) {
        offsetIsFromLeftRef.current = false;
      } else if (reversedIndex === target && directIndex !== target) {
        offsetIsFromLeftRef.current = true;
      }
      pendingTargetRef.current = null;
    }

    setCurrentIndex(offsetIsFromLeftRef.current ? reversedIndex : directIndex);
  };

  const handleSelectPuzzle = async (puzzle: (typeof PUZZLES)[number]) => {
    triggerHaptic("light");
    await saveLastPuzzleCategory(puzzle.id);

    if (puzzle.id === "flag" || puzzle.id === "landmark") {
      navigation.navigate("PuzzleGroupSelectScreen", {
        puzzleCategory: puzzle.id,
      });
      return;
    }

    navigation.navigate("PuzzleThemeSelectScreen", {
      puzzleCategory: puzzle.id,
    });
  };

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const showLockedAlert = (gameName: string) => {
    setAlertTitle(i18n.t("alert_locked_title"));
    setAlertMessage(
      i18n.t("alert_locked_message", {
        gameName,
        particle: getKoreanSubjectParticle(gameName),
      }),
    );
    setAlertVisible(true);
  };

  const scrollToIndex = (index: number) => {
    if (index < 0 || index >= PUZZLES.length) return;
    // RTL 에서는 카드/Dot/버튼 상태가 항상 같은 인덱스를 보도록 즉시 반영
    if (isRTL) {
      setCurrentIndex(index);
      pendingTargetRef.current = index;
    }
    flatListRef.current?.scrollToOffset({
      offset: index * SNAP_INTERVAL,
      animated: true,
    });
  };

  return (
    <Background>
      <BackgroundImage
        source={ASSETS.classificationMenuBackground}
        resizeMode="cover"
      />
      <Screen edges={["top", "bottom"]}>
        <AppHeader
          title={i18n.t("puzzle_space_title") || "퍼즐 탐험대"}
          onBackPress={() => {
            navigation.navigate("Home");
          }}
          onMascotPress={() => navigation.navigate("SettingScreen")}
        />
        <MainContainer>
          <CarouselArea>
            <TitleArea>
              <Title>
                {i18n.t("puzzle_hero_title") || "어떤 퍼즐을 맞출까요?"}
              </Title>
              <Description>
                {i18n.t("puzzle_hero_desc") ||
                  "좋아하는 테마를 골라 퍼즐 조각을 맞춰보세요!"}
              </Description>
            </TitleArea>
            <FlatList
              ref={flatListRef}
              data={PUZZLES}
              extraData={currentIndex}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={SNAP_INTERVAL}
              decelerationRate="fast"
              contentContainerStyle={{
                paddingHorizontal: SIDE_SPACE,
                alignItems: "center",
              }}
              style={{ flexGrow: 0 }}
              onScroll={isRTL ? undefined : handleScroll}
              onMomentumScrollEnd={isRTL ? handleScrollEndRTL : undefined}
              scrollEventThrottle={16}
              renderItem={({ item, index }) => {
                const isActive = index === currentIndex;
                const cardTitle = i18n.t(item.titleKey);
                return (
                  <GameCardWrapper>
                    <GameCard
                      active={isActive}
                      bgColor={item.cardBg}
                      activeOpacity={0.95}
                      onPress={() => {
                        triggerHaptic("light");
                        if (item.isUnlocked) {
                          handleSelectPuzzle(item);
                        } else {
                          showLockedAlert(cardTitle);
                        }
                      }}
                    >
                      <IllustrationArea>
                        <IconCircle
                          style={{ backgroundColor: item.accentColor }}
                        >
                          <Ionicons
                            name={item.iconName}
                            size={64}
                            color="#FFFFFF"
                          />
                        </IconCircle>
                      </IllustrationArea>

                      <GameInfo>
                        <GameTitle numberOfLines={1} adjustsFontSizeToFit>
                          {item.title}
                        </GameTitle>
                        <GameDescription numberOfLines={2}>
                          {item.description}
                        </GameDescription>
                      </GameInfo>

                      <StartButton
                        style={{ backgroundColor: item.accentColor }}
                      >
                        <StartButtonText>
                          {i18n.t("puzzle_start") || "퍼즐 시작하기"}
                        </StartButtonText>
                      </StartButton>
                    </GameCard>
                  </GameCardWrapper>
                );
              }}
            />
          </CarouselArea>

          {/*
            BottomArea 는 flex-row 라서 RTL 에서 첫 번째 자식이 화면 "오른쪽"에 놓인다.
            - 첫 번째 버튼 = 이전 카드 (LTR: 왼쪽 "<" / RTL: 오른쪽 ">")
            - 마지막 버튼 = 다음 카드 (LTR: 오른쪽 ">" / RTL: 왼쪽 "<")
            Dot 도 같은 이유로 첫 번째 Dot 가 맨 오른쪽에 놓인다.
          */}
          <BottomArea>
            <ArrowButton
              onPress={() => {
                triggerHaptic("light");
                scrollToIndex(currentIndex - 1);
              }}
              disabled={currentIndex === 0}
              activeOpacity={0.8}
            >
              <Ionicons
                name={isRTL ? "chevron-forward" : "chevron-back"}
                size={22}
                color={currentIndex === 0 ? "#D0CCE4" : "#7C5CFF"}
              />
            </ArrowButton>

            <Dots>
              {PUZZLES.map((puzzle, index) => (
                <Dot key={puzzle.id} active={index === currentIndex} />
              ))}
            </Dots>

            <ArrowButton
              onPress={() => {
                triggerHaptic("light");
                scrollToIndex(currentIndex + 1);
              }}
              disabled={currentIndex === PUZZLES.length - 1}
              activeOpacity={0.8}
            >
              <Ionicons
                name={isRTL ? "chevron-back" : "chevron-forward"}
                size={22}
                color={
                  currentIndex === PUZZLES.length - 1 ? "#D0CCE4" : "#7C5CFF"
                }
              />
            </ArrowButton>
          </BottomArea>
          <CustomAlert
            visible={alertVisible}
            title={alertTitle}
            message={alertMessage}
            onClose={() => setAlertVisible(false)}
          />
        </MainContainer>
      </Screen>
      <BannerAdContainer bottomInset={insets.bottom}>
        <BannerAd />
      </BannerAdContainer>
    </Background>
  );
}

export const Background = styled.View`
  flex: 1;
`;

export const BackgroundImage = styled.Image`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Screen = styled(SafeAreaView)`
  flex: 1;
  justify-content: space-between;
`;

export const MainContainer = styled.View`
  flex: 1;
`;

export const TitleArea = styled.View`
  align-items: center;
  padding-right: 24px;
  padding-left: 24px;
  margin-bottom: 20px;
`;

export const Title = styled(AppText)`
  color: #29263d;
  font-size: ${(props) => props.theme.typography.h2.fontSize}px;
  font-family: ${(props) => props.theme.fontFamily};
  text-align: center;
`;

export const Description = styled(AppText)`
  color: ${colors.secondaryText};
  font-size: ${(props) => props.theme.typography.caption.fontSize}px;
  margin-top: 4px;
  text-align: center;
`;

export const CarouselArea = styled.View`
  flex: 1;
  justify-content: center;
`;

export const GameCardWrapper = styled.View`
  width: ${CARD_WIDTH}px;
  margin-right: ${ITEM_SPACING}px;
  justify-content: center;
`;

export const GameCard = styled.TouchableOpacity<{
  active: boolean;
  bgColor: string;
}>`
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 32px;
  padding: 22px;
  border-width: 3px;
  border-color: #ffffff;

  shadow-color: #a3a8cc;
  shadow-offset: 0px 8px;
  shadow-opacity: ${({ active }) => (active ? 0.2 : 0.08)};
  shadow-radius: 12px;
  elevation: ${({ active }) => (active ? 5 : 2)};

  opacity: ${({ active }) => (active ? 1 : 0.65)};
`;

export const IllustrationArea = styled.View`
  height: 140px;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 8px;
`;

export const IconCircle = styled.View`
  width: 104px;
  height: 104px;
  border-radius: 52px;
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-offset: 0px 6px;
  shadow-opacity: 0.15;
  shadow-radius: 8px;
  elevation: 4;
`;

export const GameInfo = styled.View`
  align-items: center;
  margin-bottom: 16px;
  margin-top: 4px;
`;

export const GameTitle = styled(AppText)`
  color: #29263d;
  font-size: ${(props) => props.theme.typography.h3.fontSize}px;
  font-family: ${(props) => props.theme.fontFamily};
  text-align: center;
`;

export const GameDescription = styled(AppText)`
  color: ${colors.secondaryText};
  font-size: ${(props) => props.theme.typography.caption.fontSize}px;
  margin-top: 4px;
  text-align: center;
`;

export const StartButton = styled.View`
  height: 50px;
  border-radius: 25px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;

  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.12;
  shadow-radius: 6px;
  elevation: 3;
`;

export const StartButtonText = styled(AppText)`
  color: #ffffff;
  font-size: ${(props) => props.theme.typography.body.fontSize}px;
  flex: 1;
  text-align: center;
`;

export const BottomArea = styled.View`
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 60px;
`;

export const ArrowButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${colors.white};
  align-items: center;
  justify-content: center;
  shadow-color: #7c5cff;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

export const Dots = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const Dot = styled.View<{ active: boolean }>`
  width: ${({ active }) => (active ? "20px" : "8px")};
  height: 8px;
  border-radius: 4px;
  background-color: ${({ active }) => (active ? "#7C5CFF" : "#DCD7EE")};
`;

const BannerAdContainer = styled.View<{ bottomInset: number }>`
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

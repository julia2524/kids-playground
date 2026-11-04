import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
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
    iconName: "business",
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

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SNAP_INTERVAL);
    if (index !== currentIndex && index >= 0 && index < PUZZLES.length) {
      setCurrentIndex(index);
    }
  };

  const handleSelectPuzzle = async (puzzle: (typeof PUZZLES)[number]) => {
    triggerHaptic("light");
    await saveLastPuzzleCategory(puzzle.id);
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
              onScroll={handleScroll}
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
                name="chevron-back"
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
                name="chevron-forward"
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

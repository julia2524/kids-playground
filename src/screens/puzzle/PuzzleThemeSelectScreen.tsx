import React, { useMemo } from "react";
import { Dimensions, FlatList, ImageBackground } from "react-native";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../../utils/AppText";
import { RootStackParamList } from "../../navigation/types";
import { ASSETS } from "../../assets/assets";
import AppHeader from "../../components/AppHeader";
import i18n from "../../i18n";
import { useLanguage } from "../../context/LangaugeContext";
import { triggerHaptic } from "../../utils/haptic";

export type AnimalCharacterType =
  | "rabbit"
  | "polarbear"
  | "lion"
  | "penguin"
  | "elephant"
  | "pig"
  | "bear";

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
} as const;

const { width: SCREEN_WIDTH } = Dimensions.get("window");
// 2열 그리드 배치를 위한 카드 너비 계산
const CARD_WIDTH = (SCREEN_WIDTH - 48 - 16) / 2;

export type PuzzleItemConfig = {
  id: string;
  titleKey: string;
  descKey: string;
  iconName: keyof typeof Ionicons.glyphMap;
  accentColor: string;
  cardBg: string;
};

export const ANIMAL_CONFIGS: readonly PuzzleItemConfig[] = [
  {
    id: "rabbit",
    titleKey: "animal_rabbit_title",
    descKey: "animal_rabbit_desc",
    iconName: "heart",
    accentColor: "#FF6FAE",
    cardBg: "#FFF0F5",
  },
  {
    id: "polarbear",
    titleKey: "animal_polarbear_title",
    descKey: "animal_polarbear_desc",
    iconName: "snow",
    accentColor: "#4D8DFF",
    cardBg: "#F0F5FF",
  },
  {
    id: "bear", // 👈 곰 추가
    titleKey: "animal_bear_title",
    descKey: "animal_bear_desc",
    iconName: "shield",
    accentColor: "#9B7653",
    cardBg: "#FDF5EE",
  },
  {
    id: "lion",
    titleKey: "animal_lion_title",
    descKey: "animal_lion_desc",
    iconName: "sunny",
    accentColor: "#FFB020",
    cardBg: "#FFF9E6",
  },
  {
    id: "pig", // 👈 돼지 추가
    titleKey: "animal_pig_title",
    descKey: "animal_pig_desc",
    iconName: "ellipse",
    accentColor: "#FF94B8",
    cardBg: "#FFF0F3",
  },
  {
    id: "penguin",
    titleKey: "animal_penguin_title",
    descKey: "animal_penguin_desc",
    iconName: "water",
    accentColor: "#55D6BE",
    cardBg: "#EDFAF6",
  },
  {
    id: "elephant",
    titleKey: "animal_elephant_title",
    descKey: "animal_elephant_desc",
    iconName: "leaf",
    accentColor: "#7C5CFF",
    cardBg: "#F2F5FF",
  },
] as const;
export const FLAG_CONFIGS: readonly PuzzleItemConfig[] = [
  {
    id: "korea",
    titleKey: "flag_korea_title",
    descKey: "flag_korea_desc",
    iconName: "flag",
    accentColor: "#E84A5F",
    cardBg: "#FFF2F2",
  },
  {
    id: "usa",
    titleKey: "flag_usa_title",
    descKey: "flag_usa_desc",
    iconName: "star",
    accentColor: "#4D8DFF",
    cardBg: "#F0F5FF",
  },
  {
    id: "japan",
    titleKey: "flag_japan_title",
    descKey: "flag_japan_desc",
    iconName: "ellipse",
    accentColor: "#FF6FAE",
    cardBg: "#FFF0F5",
  },
  {
    id: "uk",
    titleKey: "flag_uk_title",
    descKey: "flag_uk_desc",
    iconName: "diamond",
    accentColor: "#5B6CFF",
    cardBg: "#F2F5FF",
  },
  {
    id: "australia",
    titleKey: "flag_australia_title",
    descKey: "flag_australia_desc",
    iconName: "moon",
    accentColor: "#6B7CFF",
    cardBg: "#EEF3FF",
  },
  {
    id: "china",
    titleKey: "flag_china_title",
    descKey: "flag_china_desc",
    iconName: "star",
    accentColor: "#FFB020",
    cardBg: "#FFF7E8",
  },
  {
    id: "france",
    titleKey: "flag_france_title",
    descKey: "flag_france_desc",
    iconName: "ribbon",
    accentColor: "#4D8DFF",
    cardBg: "#F4F7FF",
  },
] as const;

export default function PuzzleThemeSelectScreen() {
  const { locale } = useLanguage();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const route =
    useRoute<RouteProp<RootStackParamList, "PuzzleThemeSelectScreen">>();

  const { puzzleCategory } = route.params;
  const titleKey = `puzzle_${puzzleCategory}_title`;
  const headerTitle = i18n.t(titleKey);
  const selectTitle = i18n.t(`select_${puzzleCategory}_title`);

  const selectDescription = i18n.t(`select_${puzzleCategory}_desc`);

  const configs = useMemo(() => {
    switch (puzzleCategory) {
      case "animal":
        return ANIMAL_CONFIGS;
      case "flag":
        return FLAG_CONFIGS;

      // case "vehicle":
      //   return VEHICLE_CONFIGS;

      // case "dinosaur":
      //   return DINOSAUR_CONFIGS;

      // case "object":
      //   return OBJECT_CONFIGS;

      default:
        return [];
    }
  }, [puzzleCategory]);

  // 다국어 번역 매핑
  const items = useMemo(() => {
    return configs.map((item) => ({
      ...item,
      title: i18n.t(item.titleKey) || item.id,
      description: i18n.t(item.descKey) || "",
    }));
  }, [locale]);

  const handleSelectItem = (item: (typeof items)[number]) => {
    triggerHaptic("light");

    navigation.navigate("StageMapScreen", {
      gameType: "puzzle",
      puzzleCategory,
      character: item.id,
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
          title={headerTitle}
          onBackPress={() => navigation.navigate("PuzzleMenuScreen")}
          onMascotPress={() => navigation.navigate("SettingScreen")}
        />

        <MainContainer>
          {/* <TitleArea>
            <Title>
              {i18n.t("select_animal_title") ||
                "함께할 동물 친구를 골라주세요!"}
            </Title>
            <Description>
              {i18n.t("select_animal_desc") ||
                "좋아하는 동물 친구와 함께 퍼즐을 맞춰봐요."}
            </Description>
          </TitleArea> */}
          <TitleArea>
            <Title>{selectTitle}</Title>
            <Description>{selectDescription}</Description>
          </TitleArea>

          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom: 24,
            }}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 16,
            }}
            renderItem={({ item }) => (
              <AnimalCard
                bgColor={item.cardBg}
                activeOpacity={0.9}
                onPress={() => handleSelectItem(item)}
              >
                <IconCircle style={{ backgroundColor: item.accentColor }}>
                  <Ionicons name={item.iconName} size={42} color="#FFFFFF" />
                </IconCircle>
                <AnimalInfo>
                  <AnimalTitle>{item.title}</AnimalTitle>
                  <AnimalDescription>{item.description}</AnimalDescription>
                </AnimalInfo>
              </AnimalCard>
            )}
          />
        </MainContainer>
      </Screen>
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
`;

export const MainContainer = styled.View`
  flex: 1;
`;

export const TitleArea = styled.View`
  align-items: center;
  padding-horizontal: 24px;
  margin-top: 10px;
  margin-bottom: 24px;
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

export const GridContainer = styled(FlatList as new () => FlatList<any>)`
  flex: 1;
`;

export const AnimalCard = styled.TouchableOpacity<{ bgColor: string }>`
  width: ${CARD_WIDTH}px;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 28px;
  padding: 20px 16px;
  align-items: center;
  border-width: 3px;
  border-color: #ffffff;

  shadow-color: #a3a8cc;
  shadow-offset: 0px 6px;
  shadow-opacity: 0.12;
  shadow-radius: 10px;
  elevation: 3;
`;

export const IconCircle = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;

  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.12;
  shadow-radius: 6px;
  elevation: 3;
`;

export const AnimalInfo = styled.View`
  align-items: center;
`;

export const AnimalTitle = styled(AppText)`
  color: #29263d;
  font-size: ${(props) => props.theme.typography.h3.fontSize}px;
  font-family: ${(props) => props.theme.fontFamily};
  text-align: center;
`;

export const AnimalDescription = styled(AppText)`
  color: ${colors.secondaryText};
  font-size: ${(props) => props.theme.typography.caption.fontSize}px;
  margin-top: 2px;
  text-align: center;
`;

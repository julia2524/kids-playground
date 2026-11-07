import React, { useMemo } from "react";
import { FlatList, useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { AppText } from "../../utils/AppText";
import { RootStackParamList } from "../../navigation/types";
import AppHeader from "../../components/AppHeader";
import { ASSETS } from "../../assets/assets";
import i18n from "../../i18n";
import { useLanguage } from "../../context/LangaugeContext";
import { triggerHaptic } from "../../utils/haptic";
import BannerAd from "../../services/BannerAd";

import { getPuzzleGroupsForCategory } from "./puzzleGroupConfig";

function translate(key: string, fallback: string) {
  const value = i18n.t(key);
  return !value || value === key ? fallback : value;
}

export default function PuzzleGroupSelectScreen() {
  const insets = useSafeAreaInsets();
  const { locale } = useLanguage();
  const { width } = useWindowDimensions();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const route =
    useRoute<RouteProp<RootStackParamList, "PuzzleGroupSelectScreen">>();

  const { puzzleCategory } = route.params;

  const isTablet = width > 768;
  const containerWidth = isTablet ? Math.min(width, 600) : width;
  const cardWidth = (containerWidth - 48 - 16) / 2;

  const categoryTitle = useMemo(() => {
    const key = `puzzle_${puzzleCategory}_title`;
    return translate(key, "퍼즐 탐험");
  }, [locale, puzzleCategory]);

  const groupTitle = useMemo(() => {
    return translate(
      `puzzle_${puzzleCategory}_group_title`,
      puzzleCategory === "flag"
        ? "어느 대륙을 탐험할까요?"
        : "어느 대륙의 명소를 만나볼까요?",
    );
  }, [locale, puzzleCategory]);

  const groupDescription = useMemo(() => {
    return translate(
      `puzzle_${puzzleCategory}_group_desc`,
      "가고 싶은 곳을 골라보세요!",
    );
  }, [locale, puzzleCategory]);

  const groups = useMemo(
    () => getPuzzleGroupsForCategory(puzzleCategory),
    [puzzleCategory],
  );

  const handleSelectGroup = (groupId: string) => {
    triggerHaptic("light");

    navigation.navigate("PuzzleThemeSelectScreen", {
      puzzleCategory,
      groupId,
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
          title={categoryTitle}
          onBackPress={() => navigation.navigate("PuzzleMenuScreen")}
          onMascotPress={() => navigation.navigate("SettingScreen")}
        />

        <CenterWrapper>
          <TitleArea>
            <Title>{groupTitle}</Title>
            <Description>{groupDescription}</Description>
          </TitleArea>

          <FlatList
            data={groups}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom: 40,
            }}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 16,
            }}
            renderItem={({ item }) => (
              <GroupCard
                cardWidth={cardWidth}
                backgroundColor={item.backgroundColor}
                activeOpacity={0.85}
                onPress={() => handleSelectGroup(item.id)}
              >
                <Emoji>{item.emoji}</Emoji>

                <GroupTitle>
                  {translate(item.titleKey, item.fallbackTitle)}
                </GroupTitle>

                {/* <GroupDescription>
                  {item.count} {translate("puzzle_group_item_count", "개")}
                </GroupDescription> */}

                <ExploreButton color={item.color}>
                  <ExploreButtonText>
                    {translate("puzzle_group_explore", "탐험하기")}
                  </ExploreButtonText>
                </ExploreButton>
              </GroupCard>
            )}
          />
        </CenterWrapper>
      </Screen>

      <BannerAdContainer bottomInset={insets.bottom}>
        <BannerAd />
      </BannerAdContainer>
    </Background>
  );
}

const Background = styled.View`
  flex: 1;
`;

const BackgroundImage = styled.Image`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Screen = styled(SafeAreaView)`
  flex: 1;
`;

const CenterWrapper = styled.View`
  flex: 1;
  width: 100%;
  align-self: center;
  max-width: 600px;
`;

const TitleArea = styled.View`
  align-items: center;
  padding-horizontal: 24px;
  margin-top: 20px;
  margin-bottom: 28px;
`;

const Title = styled(AppText)`
  color: #29263d;
  font-size: ${(props) => props.theme.typography.h2.fontSize}px;
  font-family: ${(props) => props.theme.fontFamily};
  text-align: center;
`;

const Description = styled(AppText)`
  color: #7e7b9a;
  font-size: ${(props) => props.theme.typography.caption.fontSize}px;
  margin-top: 6px;
  text-align: center;
`;

const GroupCard = styled.TouchableOpacity<{
  cardWidth: number;
  backgroundColor: string;
}>`
  width: ${({ cardWidth }) => cardWidth}px;
  min-height: 190px;
  padding: 18px 12px;
  border-radius: 26px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-width: 3px;
  border-color: #ffffff;
  align-items: center;
  justify-content: center;

  shadow-color: #a3a8cc;
  shadow-offset: 0px 5px;
  shadow-opacity: 0.12;
  shadow-radius: 8px;
  elevation: 3;
`;

const Emoji = styled(AppText)`
  font-size: 48px;
  margin-bottom: 8px;
`;

const GroupTitle = styled(AppText)`
  color: #29263d;
  font-size: 19px;
  font-weight: 800;
  text-align: center;
`;

const GroupDescription = styled(AppText)`
  color: #7e7b9a;
  font-size: 13px;
  margin-top: 4px;
`;

const ExploreButton = styled.View<{ color: string }>`
  background-color: ${({ color }) => color};
  border-radius: 18px;
  padding: 9px 18px;
  margin-top: 14px;
`;

const ExploreButtonText = styled(AppText)`
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
`;

const BannerAdContainer = styled.View<{ bottomInset: number }>`
  height: 60px;
  width: 100%;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: ${(props) => Math.max(props.bottomInset, 12)}px;
  left: 0;
  z-index: 20;
`;

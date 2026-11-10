import React, { useState, useMemo, useCallback, useEffect } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";

import { AppText } from "../../utils/AppText";
import AppHeader from "../../components/AppHeader";
import CustomAlert from "../../components/CustomAlert";
import { RenderClassificationItemSvg } from "../../assets/Classification/classificationItemSvgs";
import { useLanguage } from "../../context/LangaugeContext";
import i18n from "../../i18n";
import { useBackgroundMusic } from "../../utils/BackgroundMusicContext";
import { classificationItems } from "../../data/classification/classificationItems";
import { triggerHaptic } from "../../utils/haptic";

import BannerAd from "../../services/BannerAd";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const UNLOCKED_STICKERS_KEY = "@unlocked_stickers";
// // 전체 스티커 키 리스트
export const ALL_STICKER_KEYS = [
  // 🐶 동물 (animal)
  "dog",
  "cat",
  "rabbit",
  "cow",
  "pig",
  "bear",
  "koala",
  "fox",
  "jellyfish",
  "stingray",
  "crab",
  "whale",
  "shark",
  "octopus",
  "squid",
  "starfish",
  "fish",
  "heartOwl",
  "owl",
  "sparrow",
  "parrot",
  "chicken",
  "duck",
  "penguin",
  "butterfly",
  "ladybug",
  "bee",
  "snail",

  // 🍎 먹는 것 (food)
  "grape",
  "tangerine",
  "peach",
  "apple",
  "banana",
  "strawberry",
  "watermelon",
  "watermelonSlice",
  "blueberry",
  "cherry",
  "eggplant",
  "chili",
  "pumpkin",
  "carrot",
  "cucumber",
  "broccoli",
  "corn",
  "sweetPotato",
  "tomato",
  "mushroom",
  "soup",
  "sandwich",
  "triangleSandwich",
  "dumpling",
  "rice",
  "gimbap",
  "triangleKimbap",
  "pizza",
  "pizzaSlice",
  "hamburger",
  "cuttonCandy",
  "cupcake",
  "heartChocolate",
  "candy",
  "donut",
  "donut1",
  "chocolate",
  "chocolateBar",
  "iceCream",
  "cake",
  "squareCakeSlice",
  "heartCake",
  "starCake",
  "cookie",
  "triangleCookie",
  "heartCookie",
  "starCookie",
  "lollipop",
  "heartLollipop",
  "milk",
  "juiceBox",
  "sodaBottle",
  "milkBottle",
  "drinkingGlass",
  "drinkCan",
  "juice",
  "waterBottle",

  // 👕 의류 및 꾸미는 물건 (clothing)
  "strawHat",
  "baseballCap",
  "winterHat",
  "bucketHat",
  "beret",
  "partyHat",
  "tShirt",
  "shortSleeveShirt",
  "tankTop",
  "shortSleeve",
  "shorts",
  "longPants",
  "skirt",
  "dress",
  "hanbok",
  "jumper",
  "coat",
  "sneakers",
  "dressShoes",
  "slippers",
  "flipFlops",
  "rainBoots",
  "furBoots",
  "boots",
  "heartHairpin",
  "starHairpin",
  "heartNecklace",
  "starNecklace",
  "sunglasses",
  "squareSunglasses",
  "heartSunglasses",
  "starSunglasses",
  "heartButton",
  "starButton",
  "button1",
  "button2",

  // ☀️ 자연 (nature)
  "sun",
  "cloud",
  "rainbow",
  "fullMoon",
  "crescentMoon",
  "shootingStar",
  "tree",
  "flower",
  "flower1",
  "sunflower",
  "cactus",
  "starFlower",
  "heartLeaf",
  "christmasTree",
  "mountain",

  // 🚗 탈 것 (vehicle)
  "bicycle",
  "bus",
  "car",
  "truck",
  "taxi",
  "scooter",
  "fireTruck",
  "ambulance",
  "train",
  "subway",
  "steamLocomotive",
  "freightTrain",
  "highSpeedTrain",
  "airplane",
  "helicopter",
  "rocket",
  "hotAirBalloon",
  "drone",
  "ship",
  "cruise",
  "submarine",
  "boat",
  "sailboat",
  "cementMixer",
  "excavator",
  "crane",
  "dumpTruck",
  "bulldozer",

  // 🎸 생활물건과 놀이물건 (things)
  "recorder",
  "maracas",
  "trumpet",
  "guitar",
  "drumSet",
  "bongo",
  "keyboard",
  "violin",
  "piano",
  "triangleInstrument",
  "harp",
  "squareClock",
  "heartClock",
  "starClock",
  "circleClock",
  "stapler",
  "notebook",
  "sketchbook",
  "ruler",
  "triangleRuler",
  "pen",
  "scissors",
  "paperclip",
  "pencil",
  "microwave",
  "tv",
  "refrigerator",
  "laptop",
  "calculator",
  "phone",
  "remoteControl",
  "switch",
  "wardrobe",
  "bed",
  "sofa",
  "chair",
  "desk",
  "bookshelf",
  "ball",
  "basketball",
  "baseball",
  "tennisBall",
  "roundBalloon",
  "heartBalloon",
  "starBalloon",
  "starBalloon1",

  // ❓ 기타 및 기타 자원 (unknown/misc)
  "heartKeychain",
  "heartSoap",
  "heartFrame",
  "triangleCheese",
  "triangleSign",
  "wheel",
  "envelop",
  "box",
  "book",
  "window",
  "window1",
  "calendar",
  "bread",
  "pillow",
  "heartPillow",
  "starPillow",
  "giftBox",
  "giftBox1",
  "door",
  "frame",
  "flag",
  "pyramid",
  "tent",
  "heartGem",
  "starWand",
  "starOrnament",
  "medal",
  "plate",
];

export default function StickerGalleryScreen() {
  const insets = useSafeAreaInsets(); // ⭐ 하단 안전 영역 값 가져오기
  const { playThemeBGM } = useBackgroundMusic();
  const { locale } = useLanguage(); // 👈 언어 변경 리렌더링 감지
  const navigation = useNavigation<any>();
  const [unlockedStickers, setUnlockedStickers] = useState<string[]>([]);

  useEffect(() => {
    // 🎮 게임 화면에 들어올 때 게임용 BGM으로 전환!
    playThemeBGM("sticker");

    return () => {
      playThemeBGM("main");
    };
  }, []);

  //   // 이스터에그 카운터
  //   // const [easterEggCount, setEasterEggCount] = useState(0);
  //   // const [alertVisible, setAlertVisible] = useState(false);
  //   // const [alertMessage, setAlertMessage] = useState("");

  // AsyncStorage에서 해금 스티커 목록 불러오기
  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      const loadUnlockedStickers = async () => {
        try {
          const stored = await AsyncStorage.getItem(UNLOCKED_STICKERS_KEY);
          if (isMounted) {
            setUnlockedStickers(stored ? JSON.parse(stored) : []);
          }
        } catch (e) {
          console.error("스티커 데이터 로딩 실패", e);
        }
      };

      loadUnlockedStickers();
      return () => {
        isMounted = false;
      };
    }, []),
  );
  //   // 헤더 5연타 이스터에그 발동
  //   // const handleEasterEggTap = async () => {
  //   //   const nextCount = easterEggCount + 1;
  //   //   setEasterEggCount(nextCount);

  //   //   if (nextCount >= 5) {
  //   //     setEasterEggCount(0);
  //   //     if (!unlockedStickers.includes("medal")) {
  //   //       const updated = [...unlockedStickers, "medal"];
  //   //       setUnlockedStickers(updated);
  //   //       await AsyncStorage.setItem(
  //   //         UNLOCKED_STICKERS_KEY,
  //   //         JSON.stringify(updated),
  //   //       );
  //   //       setAlertMessage(
  //   //         "🎉 이스터에그 발견! 비밀 메달 스티커가 해금되었습니다!",
  //   //       );
  //   //     } else {
  //   //       setAlertMessage("✨ 이미 이스터에그 스티커를 획득했어요!");
  //   //     }
  //   //     setAlertVisible(true);
  //   //   }
  //   // };
  // 수집률 계산
  const totalCount = ALL_STICKER_KEYS.length;
  const unlockedCount = unlockedStickers.filter((id) =>
    ALL_STICKER_KEYS.includes(id),
  ).length;
  const progressPercent =
    totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

  // 스티커 클릭 → 해금된 스티커의 상세 화면으로 이동
  const handleStickerPress = useCallback(
    (stickerId: string, stickerName: string) => {
      if (!unlockedStickers.includes(stickerId)) return;

      triggerHaptic("light");

      navigation.navigate("StickerDetailScreen", {
        gameType: "category",
        stickerId,
        stickerName,
      });
    },
    [unlockedStickers, navigation],
  );

  return (
    <Container>
      {/* 🛡️ 상단바 및 하단 영역 침범을 막고 콘텐츠를 보호할 SafeAreaContainer */}
      <TopSafeAreaWrapper style={{ paddingTop: insets.top }}>
        <AppHeader
          onBackPress={() => navigation.goBack()}
          title={i18n.t("sticker_book_title", {
            unlockedCount,
            totalCount,
          })}
          onMascotPress={() => navigation.navigate("SettingScreen")}
        />

        {/* 1. 수집 진행률 카드 */}
        <ProgressCard>
          <ProgressInfoRow>
            <ProgressTitle>
              {i18n.t("sticker_collection_subtitle")}
            </ProgressTitle>
            <ProgressCount>
              {unlockedCount} / {totalCount} ({progressPercent}%)
            </ProgressCount>
          </ProgressInfoRow>
          <ProgressBarBackground>
            <ProgressBarFill percent={progressPercent} />
          </ProgressBarBackground>
        </ProgressCard>

        {/* 2. 스티커 그리드 (하단 광고 영역과 겹치지 않도록 paddingBottom에 여유 공간 확보) */}
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 8,
            paddingBottom: 80 + Math.max(insets.bottom, 12), // ⭐ 하단 짤림 방지 및 여유 공간 확보
            // paddingBottom: 90, // ⭐ 하단 고정 광고(60px) + 안전 여백 고려
          }}
          showsVerticalScrollIndicator={false}
        >
          <GridContainer>
            {ALL_STICKER_KEYS.map((key) => {
              const obj = classificationItems.find((o) => o.id === key);
              const isUnlocked = unlockedStickers.includes(key);

              return (
                <StickerCard
                  key={key}
                  isUnlocked={isUnlocked}
                  activeOpacity={isUnlocked ? 0.8 : 1}
                  onPress={() =>
                    handleStickerPress(
                      key,
                      i18n.t(`item_${key}`, {
                        defaultValue: obj?.name ?? key,
                      }),
                    )
                  }
                >
                  {isUnlocked ? (
                    <>
                      <StickerImageArea>
                        <RenderClassificationItemSvg itemId={key} size={55} />
                      </StickerImageArea>
                      <StickerName numberOfLines={1}>
                        {i18n.t(`item_${key}`, {
                          defaultValue: obj?.name ?? key,
                        })}
                      </StickerName>
                    </>
                  ) : (
                    <>
                      <StickerImageArea>
                        <QuestionMark>❓</QuestionMark>
                      </StickerImageArea>
                      <LockedName>???</LockedName>
                    </>
                  )}
                </StickerCard>
              );
            })}
          </GridContainer>
        </ScrollView>
      </TopSafeAreaWrapper>

      {/* ⭐ 화면 하단 고정 표준 배너 광고 (StageMapScreen과 동일하게 하단 홈바 인셋 보호) */}
      <BannerAdContainer bottomInset={insets.bottom}>
        <BannerAd />
      </BannerAdContainer>
      {/* 
        ⭐ [핵심 포인트] 
        하단 홈바 영역의 배경이 투명하게 비치지 않도록, 
        기기 하단 인셋 높이만큼의 빈 뷰를 깔아주어 StageMap과 똑같이 배경색을 꽉 채워줍니다.
      */}
      <BottomSafeAreaFiller style={{ height: insets.bottom }} />
    </Container>
  );
}

/* ================================================================
   Styled Components
================================================================ */

const Container = styled.View`
  flex: 1;
  background-color: #f8fafc;
`;

const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: transparent;
`;

// ⭐ SafeAreaView 대신 사용하는 스타일 컴포넌트
const TopSafeAreaWrapper = styled.View`
  flex: 1;
`;
const ProgressCard = styled.View`
  margin: 12px 20px 8px 20px;
  padding: 14px 16px;
  background-color: #ffffff;
  border-radius: 18px;
  elevation: 2;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.05);
`;

const ProgressInfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const ProgressTitle = styled(AppText)`
  font-size: 13px;
  font-weight: 700;
  color: #475569;
  font-family: ${(props) => props.theme.fontFamily};
`;

const ProgressCount = styled(AppText)`
  font-size: 13px;
  font-weight: 800;
  color: #7c5cff;
  direction: ltr;
  font-family: ${(props) => props.theme.fontFamily};
`;

const ProgressBarBackground = styled.View`
  height: 10px;
  background-color: #f1f5f9;
  border-radius: 5px;
  overflow: hidden;
`;

const ProgressBarFill = styled.View<{ percent: number }>`
  height: 100%;
  width: ${(props) => props.percent}%;
  background-color: #7c5cff;
  border-radius: 5px;
`;

const GridContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const StickerCard = styled.TouchableOpacity<{ isUnlocked: boolean }>`
  width: 30%;
  height: 110px;
  background-color: ${(props) => (props.isUnlocked ? "#FFFFFF" : "#F1F5F9")};
  border-radius: 18px;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  padding: 6px;
  elevation: ${(props) => (props.isUnlocked ? 3 : 0)};
  box-shadow: 0px 2px 6px
    ${(props) => (props.isUnlocked ? "rgba(0, 0, 0, 0.06)" : "transparent")};
  border-width: ${(props) => (props.isUnlocked ? 1.5 : 1)}px;
  border-color: ${(props) => (props.isUnlocked ? "#CBD5E1" : "#E2E8F0")};
  border-style: ${(props) => (props.isUnlocked ? "solid" : "dashed")};
`;

const StickerImageArea = styled.View`
  height: 68px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const QuestionMark = styled(AppText)`
  font-size: 32px;
  opacity: 0.5;
`;

const StickerName = styled(AppText)`
  font-size: 11px;
  color: #334155;
  margin-top: 4px;
  font-weight: 700;
  text-align: center;
  font-family: ${(props) => props.theme.fontFamily};
`;

const LockedName = styled(AppText)`
  font-size: 11px;
  color: #94a3b8;
  margin-top: 4px;
  font-weight: 700;
  font-family: ${(props) => props.theme.fontFamily};
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

/* ⭐ 하단 홈바 영역의 배경 공백을 메워주는 필러 뷰 */
const BottomSafeAreaFiller = styled.View`
  width: 100%;
  background-color: #f8fafc; /* Container 배경색과 동일하게 맞춤 */
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;
`;

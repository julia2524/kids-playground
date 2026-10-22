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

const UNLOCKED_STICKERS_KEY = "@unlocked_stickers";

// 전체 스티커 키 리스트
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
  "shots",
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
  const { playThemeBGM } = useBackgroundMusic();

  useEffect(() => {
    // 🎮 게임 화면에 들어올 때 게임용 BGM으로 전환!
    playThemeBGM("sticker");

    return () => {
      // (선택) 다시 메인 화면으로 돌아갈 때 메인 BGM으로 원복하고 싶다면 cleanup에서 호출 가능
      playThemeBGM("main");
    };
  }, []);
  const { locale } = useLanguage(); // 👈 언어 변경 리렌더링 감지
  const navigation = useNavigation<any>();
  const [unlockedStickers, setUnlockedStickers] = useState<string[]>([]);

  // 이스터에그 카운터
  const [easterEggCount, setEasterEggCount] = useState(0);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

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

  // 헤더 5연타 이스터에그 발동
  // const handleEasterEggTap = async () => {
  //   const nextCount = easterEggCount + 1;
  //   setEasterEggCount(nextCount);

  //   if (nextCount >= 5) {
  //     setEasterEggCount(0);
  //     if (!unlockedStickers.includes("medal")) {
  //       const updated = [...unlockedStickers, "medal"];
  //       setUnlockedStickers(updated);
  //       await AsyncStorage.setItem(
  //         UNLOCKED_STICKERS_KEY,
  //         JSON.stringify(updated),
  //       );
  //       setAlertMessage(
  //         "🎉 이스터에그 발견! 비밀 메달 스티커가 해금되었습니다!",
  //       );
  //     } else {
  //       setAlertMessage("✨ 이미 이스터에그 스티커를 획득했어요!");
  //     }
  //     setAlertVisible(true);
  //   }
  // };

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
      // 실제 해금된 스티커인지 확인
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
          <ProgressTitle>{i18n.t("stikcer_collection_subtitle")}</ProgressTitle>
          <ProgressCount>
            {unlockedCount} / {totalCount} ({progressPercent}%)
          </ProgressCount>
        </ProgressInfoRow>
        <ProgressBarBackground>
          <ProgressBarFill percent={progressPercent} />
        </ProgressBarBackground>
      </ProgressCard>

      {/* 2. 스티커 그리드 (실루엣 없이 물음표 + ???) */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 100,
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
                    {/* 🔓 해금 상태: 문자열 itemId 기반 SVG + 스티커 이름 */}
                    <StickerImageArea>
                      <RenderClassificationItemSvg itemId={key} size={55} />
                    </StickerImageArea>
                    <StickerName numberOfLines={1}>
                      {/* 💡 i18n 키로 먼저 조회하고, 누락 시 obj.name(한국어) -> key 순으로 fallback */}
                      {i18n.t(`item_${key}`, {
                        defaultValue: obj?.name ?? key,
                      })}
                    </StickerName>
                  </>
                ) : (
                  <>
                    {/* 🔒 미해금 상태: 실루엣 없이 ❓ + ??? */}
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

      {/* 이스터에그 알럿 */}
      {/* <CustomAlert
        visible={alertVisible}
        title="이스터에그!"
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      /> */}
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
`;

const ProgressCount = styled(AppText)`
  font-size: 13px;
  font-weight: 800;
  color: #7c5cff;
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

const StickerCard = styled(TouchableOpacity)<{ isUnlocked: boolean }>`
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
`;

const LockedName = styled(AppText)`
  font-size: 11px;
  color: #94a3b8;
  margin-top: 4px;
  font-weight: 700;
`;

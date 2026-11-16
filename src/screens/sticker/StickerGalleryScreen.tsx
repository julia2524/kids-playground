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

// ⭐ [추가] 잠긴 스티커를 누르고 있을 때 살짝 미리보기 보여주기 위한 서브 컴포넌트
function LockedStickerItem({
  itemKey,
  itemName,
  obj,
}: {
  itemKey: string;
  itemName: string;
  obj: any;
}) {
  const [isPreviewing, setIsPreviewing] = useState(false);

  const handlePeek = () => {
    if (isPreviewing) return;

    triggerHaptic("light");
    setIsPreviewing(true);

    setTimeout(() => {
      setIsPreviewing(false);
    }, 400);
  };
  return (
    <StickerCard
      isUnlocked={false}
      isPressing={isPreviewing}
      activeOpacity={0.9}
      onPress={handlePeek}
    >
      {isPreviewing ? (
        // 👆 손가락으로 누르고 있는 동안 깜짝 공개!
        <>
          <StickerImageArea>
            <RenderClassificationItemSvg itemId={itemKey} size={55} />
          </StickerImageArea>
          <StickerName numberOfLines={1} style={{ color: "#7c5cff" }}>
            {itemName}
          </StickerName>
        </>
      ) : (
        // 평소 모습 (물음표)
        <>
          <StickerImageArea>
            <QuestionMark>❓</QuestionMark>
          </StickerImageArea>
          <LockedName>???</LockedName>
        </>
      )}
    </StickerCard>
  );
}

export default function StickerGalleryScreen() {
  const insets = useSafeAreaInsets();
  const { playThemeBGM } = useBackgroundMusic();
  const { locale } = useLanguage();
  const navigation = useNavigation<any>();
  const [unlockedStickers, setUnlockedStickers] = useState<string[]>([]);

  useEffect(() => {
    playThemeBGM("sticker");
    return () => {
      playThemeBGM("main");
    };
  }, []);

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

  const totalCount = ALL_STICKER_KEYS.length;
  const unlockedCount = unlockedStickers.filter((id) =>
    ALL_STICKER_KEYS.includes(id),
  ).length;
  const progressPercent =
    totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

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
      <TopSafeAreaWrapper style={{ paddingTop: insets.top }}>
        <AppHeader
          onBackPress={() => navigation.goBack()}
          title={i18n.t("sticker_book_title", {
            unlockedCount,
            totalCount,
          })}
          onMascotPress={() => navigation.navigate("SettingScreen")}
        />

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

        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 8,
            paddingBottom: 80 + Math.max(insets.bottom, 12),
          }}
          showsVerticalScrollIndicator={false}
        >
          <GridContainer>
            {ALL_STICKER_KEYS.map((key) => {
              const obj = classificationItems.find((o) => o.id === key);
              const isUnlocked = unlockedStickers.includes(key);
              const itemName = i18n.t(`item_${key}`, {
                defaultValue: obj?.name ?? key,
              });

              return isUnlocked ? (
                // ✅ 해금된 스티커 카드
                <StickerCard
                  key={key}
                  isUnlocked={true}
                  isPressing={false}
                  activeOpacity={0.8}
                  onPress={() => handleStickerPress(key, itemName)}
                >
                  <StickerImageArea>
                    <RenderClassificationItemSvg itemId={key} size={55} />
                  </StickerImageArea>
                  <StickerName numberOfLines={1}>{itemName}</StickerName>
                </StickerCard>
              ) : (
                // 🔒 잠긴 스티커 카드 (누르고 있을 때 미리보기 기능 적용)
                <LockedStickerItem
                  key={key}
                  itemKey={key}
                  itemName={itemName}
                  obj={obj}
                />
              );
            })}
          </GridContainer>
        </ScrollView>
      </TopSafeAreaWrapper>

      <BannerAdContainer bottomInset={insets.bottom}>
        <BannerAd />
      </BannerAdContainer>
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

// ⭐ 누르고 있을 때 배경색이 살짝 변하는 효과(`isPressing`) 추가
const StickerCard = styled.TouchableOpacity<{
  isUnlocked: boolean;
  isPressing?: boolean;
}>`
  width: 30%;
  height: 110px;
  background-color: ${(props) =>
    props.isUnlocked ? "#FFFFFF" : props.isPressing ? "#EDE9FE" : "#F1F5F9"};
  border-radius: 18px;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  padding: 6px;
  elevation: ${(props) => (props.isUnlocked || props.isPressing ? 3 : 0)};
  box-shadow: 0px 2px 6px
    ${(props) =>
      props.isUnlocked || props.isPressing
        ? "rgba(0, 0, 0, 0.06)"
        : "transparent"};
  border-width: ${(props) =>
    props.isUnlocked || props.isPressing ? 1.5 : 1}px;
  border-color: ${(props) =>
    props.isUnlocked || props.isPressing ? "#7c5cff" : "#E2E8F0"};
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

const BottomSafeAreaFiller = styled.View`
  width: 100%;
  background-color: #f8fafc;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;
`;

// // // //토글형식
// import React, { useState, useMemo, useCallback, useEffect } from "react";
// import { ScrollView, TouchableOpacity, View } from "react-native";
// import styled from "styled-components/native";
// import { useNavigation, useFocusEffect } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Ionicons from "@expo/vector-icons/Ionicons";

// import { AppText } from "../../utils/AppText";
// import AppHeader from "../../components/AppHeader";
// import CustomAlert from "../../components/CustomAlert";
// import { RenderClassificationItemSvg } from "../../assets/Classification/classificationItemSvgs";
// import { useLanguage } from "../../context/LangaugeContext";
// import i18n from "../../i18n";
// import { useBackgroundMusic } from "../../utils/BackgroundMusicContext";
// import { classificationItems } from "../../data/classification/classificationItems";
// import { triggerHaptic } from "../../utils/haptic";

// import BannerAd from "../../services/BannerAd";
// import {
//   SafeAreaView,
//   useSafeAreaInsets,
// } from "react-native-safe-area-context";

// const UNLOCKED_STICKERS_KEY = "@unlocked_stickers";

// // 전체 스티커 키 리스트
// export const ALL_STICKER_KEYS = [
//   // 🐶 동물 (animal)
//   "dog",
//   "cat",
//   "rabbit",
//   "cow",
//   "pig",
//   "bear",
//   "koala",
//   "fox",
//   "jellyfish",
//   "stingray",
//   "crab",
//   "whale",
//   "shark",
//   "octopus",
//   "squid",
//   "starfish",
//   "fish",
//   "heartOwl",
//   "owl",
//   "sparrow",
//   "parrot",
//   "chicken",
//   "duck",
//   "penguin",
//   "butterfly",
//   "ladybug",
//   "bee",
//   "snail",

//   // 🍎 먹는 것 (food)
//   "grape",
//   "tangerine",
//   "peach",
//   "apple",
//   "banana",
//   "strawberry",
//   "watermelon",
//   "watermelonSlice",
//   "blueberry",
//   "cherry",
//   "eggplant",
//   "chili",
//   "pumpkin",
//   "carrot",
//   "cucumber",
//   "broccoli",
//   "corn",
//   "sweetPotato",
//   "tomato",
//   "mushroom",
//   "soup",
//   "sandwich",
//   "triangleSandwich",
//   "dumpling",
//   "rice",
//   "gimbap",
//   "triangleKimbap",
//   "pizza",
//   "pizzaSlice",
//   "hamburger",
//   "cuttonCandy",
//   "cupcake",
//   "heartChocolate",
//   "candy",
//   "donut",
//   "donut1",
//   "chocolate",
//   "chocolateBar",
//   "iceCream",
//   "cake",
//   "squareCakeSlice",
//   "heartCake",
//   "starCake",
//   "cookie",
//   "triangleCookie",
//   "heartCookie",
//   "starCookie",
//   "lollipop",
//   "heartLollipop",
//   "milk",
//   "juiceBox",
//   "sodaBottle",
//   "milkBottle",
//   "drinkingGlass",
//   "drinkCan",
//   "juice",
//   "waterBottle",

//   // 👕 의류 및 꾸미는 물건 (clothing)
//   "strawHat",
//   "baseballCap",
//   "winterHat",
//   "bucketHat",
//   "beret",
//   "partyHat",
//   "tShirt",
//   "shortSleeveShirt",
//   "tankTop",
//   "shortSleeve",
//   "shorts",
//   "longPants",
//   "skirt",
//   "dress",
//   "hanbok",
//   "jumper",
//   "coat",
//   "sneakers",
//   "dressShoes",
//   "slippers",
//   "flipFlops",
//   "rainBoots",
//   "furBoots",
//   "boots",
//   "heartHairpin",
//   "starHairpin",
//   "heartNecklace",
//   "starNecklace",
//   "sunglasses",
//   "squareSunglasses",
//   "heartSunglasses",
//   "starSunglasses",
//   "heartButton",
//   "starButton",
//   "button1",
//   "button2",

//   // ☀️ 자연 (nature)
//   "sun",
//   "cloud",
//   "rainbow",
//   "fullMoon",
//   "crescentMoon",
//   "shootingStar",
//   "tree",
//   "flower",
//   "flower1",
//   "sunflower",
//   "cactus",
//   "starFlower",
//   "heartLeaf",
//   "christmasTree",
//   "mountain",

//   // 🚗 탈 것 (vehicle)
//   "bicycle",
//   "bus",
//   "car",
//   "truck",
//   "taxi",
//   "scooter",
//   "fireTruck",
//   "ambulance",
//   "train",
//   "subway",
//   "steamLocomotive",
//   "freightTrain",
//   "highSpeedTrain",
//   "airplane",
//   "helicopter",
//   "rocket",
//   "hotAirBalloon",
//   "drone",
//   "ship",
//   "cruise",
//   "submarine",
//   "boat",
//   "sailboat",
//   "cementMixer",
//   "excavator",
//   "crane",
//   "dumpTruck",
//   "bulldozer",

//   // 🎸 생활물건과 놀이물건 (things)
//   "recorder",
//   "maracas",
//   "trumpet",
//   "guitar",
//   "drumSet",
//   "bongo",
//   "keyboard",
//   "violin",
//   "piano",
//   "triangleInstrument",
//   "harp",
//   "squareClock",
//   "heartClock",
//   "starClock",
//   "circleClock",
//   "stapler",
//   "notebook",
//   "sketchbook",
//   "ruler",
//   "triangleRuler",
//   "pen",
//   "scissors",
//   "paperclip",
//   "pencil",
//   "microwave",
//   "tv",
//   "refrigerator",
//   "laptop",
//   "calculator",
//   "phone",
//   "remoteControl",
//   "switch",
//   "wardrobe",
//   "bed",
//   "sofa",
//   "chair",
//   "desk",
//   "bookshelf",
//   "ball",
//   "basketball",
//   "baseball",
//   "tennisBall",
//   "roundBalloon",
//   "heartBalloon",
//   "starBalloon",
//   "starBalloon1",

//   // ❓ 기타 및 기타 자원 (unknown/misc)
//   "heartKeychain",
//   "heartSoap",
//   "heartFrame",
//   "triangleCheese",
//   "triangleSign",
//   "wheel",
//   "envelop",
//   "box",
//   "book",
//   "window",
//   "window1",
//   "calendar",
//   "bread",
//   "pillow",
//   "heartPillow",
//   "starPillow",
//   "giftBox",
//   "giftBox1",
//   "door",
//   "frame",
//   "flag",
//   "pyramid",
//   "tent",
//   "heartGem",
//   "starWand",
//   "starOrnament",
//   "medal",
//   "plate",
// ];

// // ⭐ [추가] 잠긴 스티커를 누르고 있을 때 살짝 미리보기 보여주기 위한 서브 컴포넌트
// function LockedStickerItem({
//   itemKey,
//   itemName,
//   obj,
// }: {
//   itemKey: string;
//   itemName: string;
//   obj: any;
// }) {
//   const [isPressing, setIsPressing] = useState(false);

//   const handlePressIn = () => {
//     setIsPressing(true);
//     triggerHaptic("light"); // 누르는 순간 가벼운 햅틱!
//   };

//   const handlePressOut = () => {
//     setIsPressing(false);
//   };

//   return (
//     <StickerCard
//       isUnlocked={false}
//       isPressing={isPressing}
//       activeOpacity={1}
//       onPressIn={handlePressIn}
//       onPressOut={handlePressOut}
//     >
//       {isPressing ? (
//         // 👆 손가락으로 누르고 있는 동안 깜짝 공개!
//         <>
//           <StickerImageArea>
//             <RenderClassificationItemSvg itemId={itemKey} size={55} />
//           </StickerImageArea>
//           <StickerName numberOfLines={1} style={{ color: "#7c5cff" }}>
//             {itemName}
//           </StickerName>
//         </>
//       ) : (
//         // 평소 모습 (물음표)
//         <>
//           <StickerImageArea>
//             <QuestionMark>❓</QuestionMark>
//           </StickerImageArea>
//           <LockedName>???</LockedName>
//         </>
//       )}
//     </StickerCard>
//   );
// }

// export default function StickerGalleryScreen() {
//   const insets = useSafeAreaInsets();
//   const { playThemeBGM } = useBackgroundMusic();
//   const { locale } = useLanguage();
//   const navigation = useNavigation<any>();
//   const [unlockedStickers, setUnlockedStickers] = useState<string[]>([]);

//   useEffect(() => {
//     playThemeBGM("sticker");
//     return () => {
//       playThemeBGM("main");
//     };
//   }, []);

//   useFocusEffect(
//     useCallback(() => {
//       let isMounted = true;
//       const loadUnlockedStickers = async () => {
//         try {
//           const stored = await AsyncStorage.getItem(UNLOCKED_STICKERS_KEY);
//           if (isMounted) {
//             setUnlockedStickers(stored ? JSON.parse(stored) : []);
//           }
//         } catch (e) {
//           console.error("스티커 데이터 로딩 실패", e);
//         }
//       };

//       loadUnlockedStickers();
//       return () => {
//         isMounted = false;
//       };
//     }, []),
//   );

//   const totalCount = ALL_STICKER_KEYS.length;
//   const unlockedCount = unlockedStickers.filter((id) =>
//     ALL_STICKER_KEYS.includes(id),
//   ).length;
//   const progressPercent =
//     totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

//   const handleStickerPress = useCallback(
//     (stickerId: string, stickerName: string) => {
//       if (!unlockedStickers.includes(stickerId)) return;

//       triggerHaptic("light");

//       navigation.navigate("StickerDetailScreen", {
//         gameType: "category",
//         stickerId,
//         stickerName,
//       });
//     },
//     [unlockedStickers, navigation],
//   );

//   return (
//     <Container>
//       <TopSafeAreaWrapper style={{ paddingTop: insets.top }}>
//         <AppHeader
//           onBackPress={() => navigation.goBack()}
//           title={i18n.t("sticker_book_title", {
//             unlockedCount,
//             totalCount,
//           })}
//           onMascotPress={() => navigation.navigate("SettingScreen")}
//         />

//         <ProgressCard>
//           <ProgressInfoRow>
//             <ProgressTitle>
//               {i18n.t("sticker_collection_subtitle")}
//             </ProgressTitle>
//             <ProgressCount>
//               {unlockedCount} / {totalCount} ({progressPercent}%)
//             </ProgressCount>
//           </ProgressInfoRow>
//           <ProgressBarBackground>
//             <ProgressBarFill percent={progressPercent} />
//           </ProgressBarBackground>
//         </ProgressCard>

//         <ScrollView
//           contentContainerStyle={{
//             paddingHorizontal: 16,
//             paddingTop: 8,
//             paddingBottom: 80 + Math.max(insets.bottom, 12),
//           }}
//           showsVerticalScrollIndicator={false}
//         >
//           <GridContainer>
//             {ALL_STICKER_KEYS.map((key) => {
//               const obj = classificationItems.find((o) => o.id === key);
//               const isUnlocked = unlockedStickers.includes(key);
//               const itemName = i18n.t(`item_${key}`, {
//                 defaultValue: obj?.name ?? key,
//               });

//               return isUnlocked ? (
//                 // ✅ 해금된 스티커 카드
//                 <StickerCard
//                   key={key}
//                   isUnlocked={true}
//                   isPressing={false}
//                   activeOpacity={0.8}
//                   onPress={() => handleStickerPress(key, itemName)}
//                 >
//                   <StickerImageArea>
//                     <RenderClassificationItemSvg itemId={key} size={55} />
//                   </StickerImageArea>
//                   <StickerName numberOfLines={1}>{itemName}</StickerName>
//                 </StickerCard>
//               ) : (
//                 // 🔒 잠긴 스티커 카드 (누르고 있을 때 미리보기 기능 적용)
//                 <LockedStickerItem
//                   key={key}
//                   itemKey={key}
//                   itemName={itemName}
//                   obj={obj}
//                 />
//               );
//             })}
//           </GridContainer>
//         </ScrollView>
//       </TopSafeAreaWrapper>

//       <BannerAdContainer bottomInset={insets.bottom}>
//         <BannerAd />
//       </BannerAdContainer>
//       <BottomSafeAreaFiller style={{ height: insets.bottom }} />
//     </Container>
//   );
// }

// /* ================================================================
//   Styled Components
// ================================================================ */

// const Container = styled.View`
//   flex: 1;
//   background-color: #f8fafc;
// `;

// const TopSafeAreaWrapper = styled.View`
//   flex: 1;
// `;

// const ProgressCard = styled.View`
//   margin: 12px 20px 8px 20px;
//   padding: 14px 16px;
//   background-color: #ffffff;
//   border-radius: 18px;
//   elevation: 2;
//   box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.05);
// `;

// const ProgressInfoRow = styled.View`
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 8px;
// `;

// const ProgressTitle = styled(AppText)`
//   font-size: 13px;
//   font-weight: 700;
//   color: #475569;
//   font-family: ${(props) => props.theme.fontFamily};
// `;

// const ProgressCount = styled(AppText)`
//   font-size: 13px;
//   font-weight: 800;
//   color: #7c5cff;
//   direction: ltr;
//   font-family: ${(props) => props.theme.fontFamily};
// `;

// const ProgressBarBackground = styled.View`
//   height: 10px;
//   background-color: #f1f5f9;
//   border-radius: 5px;
//   overflow: hidden;
// `;

// const ProgressBarFill = styled.View<{ percent: number }>`
//   height: 100%;
//   width: ${(props) => props.percent}%;
//   background-color: #7c5cff;
//   border-radius: 5px;
// `;

// const GridContainer = styled.View`
//   flex-direction: row;
//   flex-wrap: wrap;
//   justify-content: space-between;
// `;

// // ⭐ 누르고 있을 때 배경색이 살짝 변하는 효과(`isPressing`) 추가
// const StickerCard = styled.TouchableOpacity<{
//   isUnlocked: boolean;
//   isPressing?: boolean;
// }>`
//   width: 30%;
//   height: 110px;
//   background-color: ${(props) =>
//     props.isUnlocked ? "#FFFFFF" : props.isPressing ? "#EDE9FE" : "#F1F5F9"};
//   border-radius: 18px;
//   align-items: center;
//   justify-content: center;
//   margin-bottom: 12px;
//   padding: 6px;
//   elevation: ${(props) => (props.isUnlocked || props.isPressing ? 3 : 0)};
//   box-shadow: 0px 2px 6px
//     ${(props) =>
//       props.isUnlocked || props.isPressing
//         ? "rgba(0, 0, 0, 0.06)"
//         : "transparent"};
//   border-width: ${(props) =>
//     props.isUnlocked || props.isPressing ? 1.5 : 1}px;
//   border-color: ${(props) =>
//     props.isUnlocked || props.isPressing ? "#7c5cff" : "#E2E8F0"};
//   border-style: ${(props) => (props.isUnlocked ? "solid" : "dashed")};
// `;

// const StickerImageArea = styled.View`
//   height: 68px;
//   width: 100%;
//   align-items: center;
//   justify-content: center;
// `;

// const QuestionMark = styled(AppText)`
//   font-size: 32px;
//   opacity: 0.5;
// `;

// const StickerName = styled(AppText)`
//   font-size: 11px;
//   color: #334155;
//   margin-top: 4px;
//   font-weight: 700;
//   text-align: center;
//   font-family: ${(props) => props.theme.fontFamily};
// `;

// const LockedName = styled(AppText)`
//   font-size: 11px;
//   color: #94a3b8;
//   margin-top: 4px;
//   font-weight: 700;
//   font-family: ${(props) => props.theme.fontFamily};
// `;

// const BannerAdContainer = styled.View<{ bottomInset: number }>`
//   height: 60px;
//   width: 100%;
//   align-items: center;
//   justify-content: center;
//   background-color: transparent;
//   position: absolute;
//   bottom: ${(props) => Math.max(props.bottomInset, 12)}px;
//   left: 0;
//   z-index: 20;
// `;

// const BottomSafeAreaFiller = styled.View`
//   width: 100%;
//   background-color: #f8fafc;
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   z-index: 10;
// `;

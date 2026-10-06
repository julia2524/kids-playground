// import React, { useState, useCallback } from "react";
// import { ScrollView, Text, TouchableOpacity } from "react-native";
// import styled from "styled-components/native";
// import { useNavigation } from "@react-navigation/native";

// import { AppText } from "../../utils/AppText";
// import AppHeader from "../../components/AppHeader";
// import { ClassificationItem } from "../../types/game";
// import { classificationItems } from "../../data/classification/classificationItems";
// import { RenderClassificationItemSvg } from "../../assets/Classification/classificationItemSvgs";

// // ---------- 실제 데이터 기반 색상 계열 ----------
// const COLOR_FAMILIES = [
//   "natural",
//   "red",
//   "orange",
//   "yellow",
//   "green",
//   "blue",
//   "purple",
//   "pink",
//   "brown",

//   "white",
//   "black",
// ] as const;
// const COLOR_PALETTE: {
//   id: ColorFamily;
//   hex: string;
// }[] = [
//   { id: "natural", hex: "#FFFFFF" },

//   { id: "red", hex: "#E53935" },
//   { id: "orange", hex: "#FB8C00" },
//   { id: "yellow", hex: "#FDD835" },
//   { id: "green", hex: "#43A047" },
//   { id: "blue", hex: "#42A5F5" },
//   { id: "purple", hex: "#8E24AA" },
//   { id: "pink", hex: "#F06292" },
//   { id: "brown", hex: "#8D6E63" },

//   { id: "white", hex: "#FAFAFA" },
//   { id: "black", hex: "#424242" },
// ];

// type ColorFamily = (typeof COLOR_FAMILIES)[number];

// const categoryStickerKeys1 = [
//   "medal",
//   "starNecklace",
//   "starSunglasses",
//   "starOrnament",
//   "starCake",
//   "starClock",
//   "starButton",
//   "starfish",
//   "starPillow",
//   "starWand",
//   "starBalloon1",
//   "starBalloon",
//   "starCookie",
//   "heartNecklace",
//   "heartGem",
//   "heartSunglasses",
//   "heartClock",
//   "heartButton",
//   "heartCake",
//   "heartPillow",
//   "heartLollipop",
//   "heartBalloon",
//   "heartCookie",
//   "pizzaSlice",
//   "watermelonSlice",
//   "triangleCookie",
//   "sailboat",
//   "mountain",
//   "tent",
//   "pyramid",
//   "triangleKimbap",
//   "triangleSandwich",
//   "flag",
//   "christmasTree",
//   "partyHat",
//   "triangleInstrument",
//   "triangleRuller",
//   "frame",
//   "switch",
//   "remoteControl",
//   "phone",
//   "squareSunglasses",
//   "squareCakeSlice",
//   "calculator",
//   "laptop",
//   "refrigerator",
//   "bookshelf",
//   "door",
//   "squareClock",
//   "giftBox1",
//   "giftBox",
//   "tv",
//   "pillow",
//   "microwave",
//   "bread",
//   "calendar",
//   "window1",
//   "window",
//   "book",
//   "box",
//   "chocolateBar",
//   "envelop",
//   "sun",
//   "roundBalloon",
//   "fullMoon",
//   "plate",
//   "tennisBall",
//   "baseball",
//   "basketball",
//   "sunglasses",
//   "lollipop",
//   "wheel",
//   "circleClock",
//   "donut1",
//   "button1",
//   "button2",
//   "dog",
//   "cat",
//   "rabbit",
//   "chicken",
//   "duck",
//   "penguin",
//   "whale",
//   "shark",
//   "octopus",
//   "squid",
//   "apple",
//   "banana",
//   "strawberry",
//   "watermelon",
//   "carrot",
//   "cucumber",
//   "mushroom",
//   "tomato",
//   "broccoli",
//   "corn",
//   "rice",
//   "gimbap",
//   "pizza",
//   "hamburger",
//   "cake",
//   "cookie",
//   "iceCream",
//   "car",
//   "bus",
//   "train",
//   "airplane",
//   "ship",
//   "bicycle",
//   "helicopter",
//   "boat",
//   "candy",
//   "donut",
//   "chocolate",
//   "pig",
//   "bear",
//   "cow",
//   "owl",
//   "parrot",
//   "sparrow",
//   "jellyfish",
//   "crab",
//   "stingray",
//   "grape",
//   "tangerine",
//   "peach",
//   "eggplant",
//   "chili",
//   "pumpkin",
//   "soup",
//   "sandwich",
//   "dumpling",
//   "submarine",
//   "rocket",
//   "hotAirBalloon",
//   "truck",
//   "excavator",
//   "subway",
//   "cementMixer",
//   "ball",
// ];

// function resolveVariant(obj: ClassificationItem, familyId: ColorFamily) {
//   return obj.variants.find((v) => v.colorId === familyId);
// }

// export default function StickerGalleryScreen() {
//   const navigation = useNavigation<any>();
//   const [selectedFamily, setSelectedFamily] = useState<ColorFamily>("natural");
//   const [unlockedStickers, setUnlockedStickers] = useState<string[]>([]);

//   return (
//     <Container>
//       <AppHeader
//         onBackPress={() => navigation.goBack()}
//         title={`통합 스티커북 (${unlockedStickers.length}/ ${categoryStickerKeys1.length})`}
//         onMascotPress={() => navigation.navigate("SettingScreen")}
//       />

//       {/* 2. 색상 선택 바 */}
//       <ColorPickerBar>
//         {COLOR_PALETTE.map(({ id, hex }) => (
//           <ColorButton
//             key={id}
//             color={hex}
//             isSelected={selectedFamily === id}
//             onPress={() => setSelectedFamily(id)}
//           />
//         ))}
//       </ColorPickerBar>

//       {/* 3. 스티커 그리드 목록 */}
//       <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 300 }}>
//         <GridContainer>
//           {categoryStickerKeys1.map((key) => {
//             const obj = classificationItems.find((o) => o.id === key);
//             const isUnlocked = unlockedStickers.includes(key);
//             const variant = obj
//               ? resolveVariant(obj, selectedFamily)
//               : undefined;

//             return (
//               <StickerCard key={key} isUnlocked={isUnlocked}>
//                 <RenderClassificationItemSvg
//                   itemId={key}
//                   primary={variant?.primary}
//                   secondary={variant?.secondary}
//                   accent={variant?.accent}
//                 />

//                 <StickerName>{obj?.name ?? key}</StickerName>

//                 {/* {isUnlocked ? (
//                   <>
//                     <RenderClassificationItemSvg
//                       primary={variant?.primary}
//                       secondary={variant?.secondary}
//                       accent={variant?.accent}
//                     />
//                     <StickerName>{obj?.name ?? key}</StickerName>
//                   </>
//                 ) : (
//                   <LockedContainer>
//                     <RenderClassificationItemSvg
//                       primary={variant?.primary}
//                       secondary={variant?.secondary}
//                       accent={variant?.accent}
//                     />
//                     <LockBadge>🔒</LockBadge>
//                     <StickerName style={{ color: "#94A3B8" }}>???</StickerName>
//                   </LockedContainer>
//                 )} */}
//               </StickerCard>
//             );
//           })}
//         </GridContainer>
//       </ScrollView>
//     </Container>
//   );
// }

// // ---------- Styled Components ----------

// const Container = styled.View`
//   flex: 1;
//   background-color: #f8fafc;
//   padding-bottom: 10px;
// `;

// const HeaderTitle = styled(AppText)`
//   font-size: 18px;
//   font-weight: bold;
//   color: #334155;
// `;

// const TabContainer = styled.View`
//   flex-direction: row;
//   padding: 12px 16px 4px 16px;
//   justify-content: space-between;
// `;

// const ModeTabButton = styled(TouchableOpacity)<{ isSelected: boolean }>`
//   flex: 1;
//   align-items: center;
//   justify-content: center;
//   padding: 10px 0;
//   margin: 0 4px;
//   border-radius: 14px;
//   background-color: ${(props) => (props.isSelected ? "#3B82F6" : "#E2E8F0")};
// `;

// const ModeTabText = styled(AppText)<{ isSelected: boolean }>`
//   font-size: 13px;
//   font-weight: bold;
//   color: ${(props) => (props.isSelected ? "#FFFFFF" : "#64748B")};
// `;

// const ColorPickerBar = styled.View`
//   flex-direction: row;
//   align-items: center;
//   background-color: rgba(255, 255, 255, 0.9);
//   padding: 10px 16px;
//   margin: 10px 16px 0 16px;
//   border-radius: 16px;
//   justify-content: space-between;
// `;

// const ColorButton = styled(TouchableOpacity)<{
//   color: string;
//   isSelected: boolean;
// }>`
//   width: 24px;
//   height: 24px;
//   border-radius: 12px;
//   background-color: ${(props) => props.color};
//   border-width: ${(props) => (props.isSelected ? "2.5px" : "1px")};
//   border-color: ${(props) => (props.isSelected ? "#1E293B" : "#CBD5E1")};
// `;

// const GridContainer = styled.View`
//   flex-direction: row;
//   flex-wrap: wrap;
//   justify-content: space-between;
// `;

// const StickerCard = styled.View<{ isUnlocked: boolean }>`
//   width: 30%;
//   aspect-ratio: 1;
//   background-color: ${(props) =>
//     props.isUnlocked ? "#FFFFFF" : "rgba(241, 245, 249, 0.7)"};
//   border-radius: 20px;
//   align-items: center;
//   justify-content: center;
//   margin-bottom: 15px;
//   padding: 8px;
//   elevation: ${(props) => (props.isUnlocked ? 3 : 0)};
//   shadow-color: #000;
//   shadow-offset: 0px 2px;
//   shadow-opacity: ${(props) => (props.isUnlocked ? 0.05 : 0)};
//   shadow-radius: 4px;
// `;

// const LockedContainer = styled.View`
//   align-items: center;
//   justify-content: center;
//   opacity: 0.5;
// `;

// const LockBadge = styled(AppText)`
//   position: absolute;
//   font-size: 18px;
// `;

// const StickerName = styled(AppText)`
//   font-size: 11px;
//   color: #64748b;
//   margin-top: 6px;
//   font-weight: bold;
// `;

import React, { useState, useMemo } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import { AppText } from "../../utils/AppText";
import AppHeader from "../../components/AppHeader";
import { ClassificationItem } from "../../types/game";
import { classificationItems } from "../../data/classification/classificationItems";
import { RenderClassificationItemSvg } from "../../assets/Classification/classificationItemSvgs";

// ---------- 실제 데이터 기반 색상 계열 ----------
const COLOR_FAMILIES = [
  "natural",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "pink",
  "brown",
  "white",
  "black",
] as const;

const COLOR_PALETTE: {
  id: ColorFamily;
  hex: string;
}[] = [
  { id: "natural", hex: "#FFFFFF" },
  { id: "red", hex: "#E53935" },
  { id: "orange", hex: "#FB8C00" },
  { id: "yellow", hex: "#FDD835" },
  { id: "green", hex: "#43A047" },
  { id: "blue", hex: "#42A5F5" },
  { id: "purple", hex: "#8E24AA" },
  { id: "pink", hex: "#F06292" },
  { id: "brown", hex: "#8D6E63" },
  { id: "white", hex: "#FAFAFA" },
  { id: "black", hex: "#424242" },
];

type ColorFamily = (typeof COLOR_FAMILIES)[number];

const categoryStickerKeys1 = [
  "medal",
  "starNecklace",
  "starSunglasses",
  "starOrnament",
  "starCake",
  "starClock",
  "starButton",
  "starfish",
  "starPillow",
  "starWand",
  "starBalloon1",
  "starBalloon",
  "starCookie",
  "heartNecklace",
  "heartGem",
  "heartSunglasses",
  "heartClock",
  "heartButton",
  "heartCake",
  "heartPillow",
  "heartLollipop",
  "heartBalloon",
  "heartCookie",
  "pizzaSlice",
  "watermelonSlice",
  "triangleCookie",
  "sailboat",
  "mountain",
  "tent",
  "pyramid",
  "triangleKimbap",
  "triangleSandwich",
  "flag",
  "christmasTree",
  "partyHat",
  "triangleInstrument",
  "triangleRuller",
  "frame",
  "switch",
  "remoteControl",
  "phone",
  "squareSunglasses",
  "squareCakeSlice",
  "calculator",
  "laptop",
  "refrigerator",
  "bookshelf",
  "door",
  "squareClock",
  "giftBox1",
  "giftBox",
  "tv",
  "pillow",
  "microwave",
  "bread",
  "calendar",
  "window1",
  "window",
  "book",
  "box",
  "chocolateBar",
  "envelop",
  "sun",
  "roundBalloon",
  "fullMoon",
  "plate",
  "tennisBall",
  "baseball",
  "basketball",
  "sunglasses",
  "lollipop",
  "wheel",
  "circleClock",
  "donut1",
  "button1",
  "button2",
  "dog",
  "cat",
  "rabbit",
  "chicken",
  "duck",
  "penguin",
  "whale",
  "shark",
  "octopus",
  "squid",
  "apple",
  "banana",
  "strawberry",
  "watermelon",
  "carrot",
  "cucumber",
  "mushroom",
  "tomato",
  "broccoli",
  "corn",
  "rice",
  "gimbap",
  "pizza",
  "hamburger",
  "cake",
  "cookie",
  "iceCream",
  "car",
  "bus",
  "train",
  "airplane",
  "ship",
  "bicycle",
  "helicopter",
  "boat",
  "candy",
  "donut",
  "chocolate",
  "pig",
  "bear",
  "cow",
  "owl",
  "parrot",
  "sparrow",
  "jellyfish",
  "crab",
  "stingray",
  "grape",
  "tangerine",
  "peach",
  "eggplant",
  "chili",
  "pumpkin",
  "soup",
  "sandwich",
  "dumpling",
  "submarine",
  "rocket",
  "hotAirBalloon",
  "truck",
  "excavator",
  "subway",
  "cementMixer",
  "ball",
];

function resolveVariant(obj: ClassificationItem, familyId: ColorFamily) {
  return obj.variants.find((v) => v.colorId === familyId);
}

export default function StickerGalleryScreen() {
  const navigation = useNavigation<any>();
  const [selectedFamily, setSelectedFamily] = useState<ColorFamily>("natural");
  const [unlockedStickers, setUnlockedStickers] = useState<string[]>([]);

  // 선택된 색상(selectedFamily)의 variant가 존재하는 스티커만 필터링
  const filteredStickerKeys = useMemo(() => {
    return categoryStickerKeys1.filter((key) => {
      const obj = classificationItems.find((o) => o.id === key);
      if (!obj) return false;
      return !!resolveVariant(obj, selectedFamily);
    });
  }, [selectedFamily]);

  return (
    <Container>
      <AppHeader
        onBackPress={() => navigation.goBack()}
        title={`통합 스티커북 (${unlockedStickers.length}/ ${categoryStickerKeys1.length})`}
        onMascotPress={() => navigation.navigate("SettingScreen")}
      />

      {/* 2. 색상 선택 바 */}
      <ColorPickerBar>
        {COLOR_PALETTE.map(({ id, hex }) => (
          <ColorButton
            key={id}
            color={hex}
            isSelected={selectedFamily === id}
            onPress={() => setSelectedFamily(id)}
          />
        ))}
      </ColorPickerBar>

      {/* 3. 스티커 그리드 목록 */}
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 300 }}>
        {filteredStickerKeys.length > 0 ? (
          <GridContainer>
            {filteredStickerKeys.map((key) => {
              const obj = classificationItems.find((o) => o.id === key);
              const isUnlocked = unlockedStickers.includes(key);
              const variant = obj
                ? resolveVariant(obj, selectedFamily)
                : undefined;

              return (
                <StickerCard key={key} isUnlocked={isUnlocked}>
                  <RenderClassificationItemSvg
                    itemId={key}
                    primary={variant?.primary}
                    secondary={variant?.secondary}
                    accent={variant?.accent}
                  />
                  <StickerName>{obj?.name ?? key}</StickerName>
                </StickerCard>
              );
            })}
          </GridContainer>
        ) : (
          <EmptyContainer>
            <EmptyText>해당 색상의 스티커가 없습니다.</EmptyText>
          </EmptyContainer>
        )}
      </ScrollView>
    </Container>
  );
}

// ---------- Styled Components ----------

const Container = styled.View`
  flex: 1;
  background-color: #f8fafc;
  padding-bottom: 10px;
`;

const HeaderTitle = styled(AppText)`
  font-size: 18px;
  font-weight: bold;
  color: #334155;
`;

const TabContainer = styled.View`
  flex-direction: row;
  padding: 12px 16px 4px 16px;
  justify-content: space-between;
`;

const ModeTabButton = styled(TouchableOpacity)<{ isSelected: boolean }>`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  margin: 0 4px;
  border-radius: 14px;
  background-color: ${(props) => (props.isSelected ? "#3B82F6" : "#E2E8F0")};
`;

const ModeTabText = styled(AppText)<{ isSelected: boolean }>`
  font-size: 13px;
  font-weight: bold;
  color: ${(props) => (props.isSelected ? "#FFFFFF" : "#64748B")};
`;

const ColorPickerBar = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 16px;
  margin: 10px 16px 0 16px;
  border-radius: 16px;
  justify-content: space-between;
`;

const ColorButton = styled(TouchableOpacity)<{
  color: string;
  isSelected: boolean;
}>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${(props) => props.color};
  border-width: ${(props) => (props.isSelected ? "2.5px" : "1px")};
  border-color: ${(props) => (props.isSelected ? "#1E293B" : "#CBD5E1")};
`;

const GridContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const StickerCard = styled.View<{ isUnlocked: boolean }>`
  width: 30%;
  aspect-ratio: 1;
  background-color: ${(props) =>
    props.isUnlocked ? "#FFFFFF" : "rgba(241, 245, 249, 0.7)"};
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  padding: 8px;
  elevation: ${(props) => (props.isUnlocked ? 3 : 0)};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: ${(props) => (props.isUnlocked ? 0.05 : 0)};
  shadow-radius: 4px;
`;

const LockedContainer = styled.View`
  align-items: center;
  justify-content: center;
  opacity: 0.5;
`;

const LockBadge = styled(AppText)`
  position: absolute;
  font-size: 18px;
`;

const StickerName = styled(AppText)`
  font-size: 11px;
  color: #64748b;
  margin-top: 6px;
  font-weight: bold;
`;

const EmptyContainer = styled.View`
  padding: 40px 0;
  align-items: center;
  justify-content: center;
`;

const EmptyText = styled(AppText)`
  font-size: 14px;
  color: #94a3b8;
`;

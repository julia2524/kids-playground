// import React, { useEffect, useRef, useState } from "react";
// import { DimensionValue, ScrollView, View } from "react-native";
// import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import styled from "styled-components/native";

// import { RootStackParamList } from "../../navigation/types";
// import { STAGE_CONFIGS } from "./stageConfigs";
// import { GAME_INFO } from "../../constants/game";
// import { LEVEL_CONFIGS } from "../../data/classification/classificationLevels";
// import MapTrail from "./components/MapTrail";
// import StageNode from "./components/StageNode";
// import Mascot from "../../design-system/components/Mascot";

// type NavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   "StageMapScreen"
// >;
// type StageMapRouteProp = RouteProp<RootStackParamList, "StageMapScreen">;

// const NODE_STEP_Y = 150;
// const TOP_PADDING = 120;
// const BOTTOM_PADDING = 140;
// const NODE_SIZE = 120;
// const HORIZONTAL_SAFE_PADDING = 70;

// export default function StageMapScreen() {
//   const navigation = useNavigation<NavigationProp>();
//   const route = useRoute<StageMapRouteProp>();
//   const gameType = route.params?.gameType ?? "classification";

//   const scrollRef = useRef<ScrollView>(null);
//   const [trackWidth, setTrackWidth] = useState(0);
//   const [viewportHeight, setViewportHeight] = useState(0);

//   // 1. 유효한 스테이지 필터링
//   const availableStages = STAGE_CONFIGS.filter((stage) =>
//     Object.values(LEVEL_CONFIGS).some((level) => level.level === stage.level),
//   );

//   // 임시 현재 진행 레벨 (DB 연동 전)
//   const currentLevel = availableStages[0]?.level ?? 1;

//   // 2. 전체 콘텐츠 높이 계산
//   const contentHeight =
//     TOP_PADDING +
//     BOTTOM_PADDING +
//     Math.max(availableStages.length - 1, 0) * NODE_STEP_Y;

//   // 3. 각 스테이지 노드의 (X, Y) 좌표 계산 (아래에서 위로)
//   const positions = availableStages.map((stage, index) => {
//     const y = contentHeight - BOTTOM_PADDING - index * NODE_STEP_Y;
//     const usableHalfWidth = Math.max(
//       trackWidth / 2 - HORIZONTAL_SAFE_PADDING,
//       0,
//     );
//     const x = trackWidth / 2 + stage.xOffset * usableHalfWidth;

//     return { x, y };
//   });

//   // 4. 현재 진행 레벨 위치로 자동 스크롤
//   useEffect(() => {
//     if (trackWidth === 0 || viewportHeight === 0) return;

//     const targetIndex = availableStages.findIndex(
//       (stage) => stage.level === currentLevel,
//     );
//     if (targetIndex === -1) return;

//     const targetY = positions[targetIndex]?.y ?? 0;
//     const scrollY = Math.max(targetY - viewportHeight / 2, 0);

//     const timer = setTimeout(() => {
//       scrollRef.current?.scrollTo({
//         y: scrollY,
//         animated: false,
//       });
//     }, 80);

//     return () => clearTimeout(timer);
//   }, [trackWidth, viewportHeight, currentLevel, availableStages, positions]);

//   const handleStagePress = (level: number) => {
//     if (gameType !== "classification") {
//       return;
//     }
//     navigation.navigate("ClassificationPlayScreen", {
//       gameType,
//       level,
//     });
//   };

//   const { title, subtitle } = GAME_INFO[gameType] ?? {
//     title: "분류 놀이",
//     subtitle: "알맞은 항목을 찾아요!",
//   };

//   return (
//     <Container>
//       {/* Header */}
//       <Header>
//         <HeaderButton onPress={() => navigation.navigate("Home")}>
//           <Ionicons name="chevron-back" size={26} color="#7C5CFF" />
//         </HeaderButton>
//         <HeaderTitleArea>
//           <HeaderTitle>{title}</HeaderTitle>
//           <HeaderSubtitle>{subtitle}</HeaderSubtitle>
//         </HeaderTitleArea>
//         <HeaderButton onPress={() => navigation.navigate("SettingScreen")}>
//           <Mascot size={50} />
//           {/* <Ionicons name="book-outline" size={23} color="#7C5CFF" /> */}
//         </HeaderButton>
//       </Header>

//       {/* Map View Area */}
//       <MapContainer
//         onLayout={(e) => setViewportHeight(e.nativeEvent.layout.height)}
//       >
//         <ScrollView
//           ref={scrollRef}
//           showsVerticalScrollIndicator={false}
//           onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}
//           contentContainerStyle={{ height: contentHeight }}
//         >
//           <View style={{ height: contentHeight, width: "100%" }}>
//             {/* SVG 곡선 길 연결 */}
//             {trackWidth > 0 && (
//               <MapTrail
//                 width={trackWidth}
//                 height={contentHeight}
//                 points={availableStages.map((stage, idx) => ({
//                   ...positions[idx],
//                   completed: stage.level < currentLevel,
//                 }))}
//               />
//             )}

//             {/* 스테이지 노드들 */}
//             {availableStages.map((stage, index) => {
//               const pos = positions[index];
//               if (!pos) return null;

//               const unlocked = true; // 테스트용 해금 상태
//               const completed = stage.level < currentLevel;

//               return (
//                 <StageNode
//                   key={stage.level}
//                   gameType={gameType}
//                   level={stage.level}
//                   name={stage.name}
//                   unlocked={unlocked}
//                   completed={completed}
//                   isCurrent={stage.level === currentLevel}
//                   stars={completed ? 3 : 0}
//                   maxStars={3}
//                   onPress={() => handleStagePress(stage.level)}
//                   style={{
//                     left: pos.x - NODE_SIZE / 2,
//                     top: pos.y - NODE_SIZE / 2,
//                   }}
//                 />
//               );
//             })}
//           </View>
//         </ScrollView>

//         {/* 플로팅 스티커북 버튼 */}
//         <FloatingStickerButton
//           activeOpacity={0.85}
//           onPress={() => console.log("스티커북 이동")}
//         >
//           <Ionicons name="book" size={26} color="#7C5CFF" />
//         </FloatingStickerButton>
//       </MapContainer>
//     </Container>
//   );
// }

// const Container = styled.View`
//   flex: 1;
//   background-color: #f5f2ff;
// `;

// const Header = styled.View`
//   height: 80px;
//   padding-horizontal: 16px;
//   padding-top: 20px;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
//   background-color: transparent;
// `;

// const HeaderButton = styled.TouchableOpacity`
//   width: 44px;
//   height: 44px;
//   border-radius: 22px;
//   background-color: #ffffff;
//   justify-content: center;
//   align-items: center;
//   elevation: 2;
// `;

// const HeaderTitleArea = styled.View`
//   align-items: center;
// `;

// const HeaderTitle = styled.Text`
//   font-size: 20px;
//   font-weight: 900;
//   color: #29263d;
// `;

// const HeaderSubtitle = styled.Text`
//   font-size: 12px;
//   color: #68657a;
//   margin-top: 2px;
// `;

// const MapContainer = styled.View`
//   flex: 1;
//   position: relative;
// `;

// const FloatingStickerButton = styled.TouchableOpacity`
//   position: absolute;
//   right: 20px;
//   bottom: 30px;
//   width: 56px;
//   height: 56px;
//   border-radius: 28px;
//   background-color: #ffffff;
//   align-items: center;
//   justify-content: center;
//   elevation: 6;
// `;

import React, { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";

import { RootStackParamList } from "../../navigation/types";
import { STAGE_CONFIGS } from "./stageConfigs";
import { GAME_INFO } from "../../constants/game";
import { LEVEL_CONFIGS } from "../../data/classification/classificationLevels";
import MapTrail from "./components/MapTrail";
import StageNode from "./components/StageNode";
import Mascot from "../../design-system/components/Mascot";
import AppHeader from "../../components/AppHeader";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "StageMapScreen"
>;
type StageMapRouteProp = RouteProp<RootStackParamList, "StageMapScreen">;

const NODE_STEP_Y = 150;
const TOP_PADDING = 120;
const BOTTOM_PADDING = 140;
const NODE_SIZE = 120;
const HORIZONTAL_SAFE_PADDING = 70;

export default function StageMapScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<StageMapRouteProp>();
  const gameType = route.params?.gameType ?? "classification";

  const scrollRef = useRef<ScrollView>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  const availableStages = STAGE_CONFIGS.filter((stage) =>
    Object.values(LEVEL_CONFIGS).some((level) => level.level === stage.level),
  );

  const currentLevel = availableStages[0]?.level ?? 1;

  const contentHeight =
    TOP_PADDING +
    BOTTOM_PADDING +
    Math.max(availableStages.length - 1, 0) * NODE_STEP_Y;

  const positions = availableStages.map((stage, index) => {
    const y = contentHeight - BOTTOM_PADDING - index * NODE_STEP_Y;
    const usableHalfWidth = Math.max(
      trackWidth / 2 - HORIZONTAL_SAFE_PADDING,
      0,
    );
    const x = trackWidth / 2 + stage.xOffset * usableHalfWidth;

    return { x, y };
  });

  useEffect(() => {
    if (trackWidth === 0 || viewportHeight === 0) return;

    const targetIndex = availableStages.findIndex(
      (stage) => stage.level === currentLevel,
    );
    if (targetIndex === -1) return;

    const targetY = positions[targetIndex]?.y ?? 0;
    const scrollY = Math.max(targetY - viewportHeight / 2, 0);

    const timer = setTimeout(() => {
      scrollRef.current?.scrollTo({
        y: scrollY,
        animated: false,
      });
    }, 80);

    return () => clearTimeout(timer);
  }, [trackWidth, viewportHeight, currentLevel, availableStages, positions]);

  const handleStagePress = (level: number) => {
    if (gameType !== "classification") return;
    navigation.navigate("ColorSortingPlayScreen", {
      gameType,
      level,
    });
  };

  const { title, subtitle } = GAME_INFO[gameType] ?? {
    title: "분류 놀이",
    subtitle: "알맞은 항목을 찾아요!",
  };

  return (
    <SafeAreaContainer edges={["top"]}>
      <Container>
        {/* Header - ClassificationPlayScreen과 동일한 높이 및 구조 */}
        <AppHeader
          title={title}
          subtitle={subtitle}
          onBackPress={() => navigation.navigate("Home")}
          onMascotPress={() => navigation.navigate("SettingScreen")}
        />
        {/* <Header>
          <HeaderButton onPress={() => navigation.navigate("Home")}>
            <Ionicons name="chevron-back" size={22} color="#7C5CFF" />
          </HeaderButton>

          <HeaderTitleArea>
            <HeaderTitle>{title}</HeaderTitle>
            {subtitle ? <HeaderSubtitle>{subtitle}</HeaderSubtitle> : null}
          </HeaderTitleArea>

          <HeaderButton onPress={() => navigation.navigate("SettingScreen")}>
            <Mascot size={38} />
          </HeaderButton>
        </Header> */}

        {/* Map View Area */}
        <MapContainer
          onLayout={(e) => setViewportHeight(e.nativeEvent.layout.height)}
        >
          <ScrollView
            ref={scrollRef}
            showsVerticalScrollIndicator={false}
            onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}
            contentContainerStyle={{ height: contentHeight }}
          >
            <View style={{ height: contentHeight, width: "100%" }}>
              {trackWidth > 0 && (
                <MapTrail
                  width={trackWidth}
                  height={contentHeight}
                  points={availableStages.map((stage, idx) => ({
                    ...positions[idx],
                    completed: stage.level < currentLevel,
                  }))}
                />
              )}

              {availableStages.map((stage, index) => {
                const pos = positions[index];
                if (!pos) return null;

                const unlocked = true;
                const completed = stage.level < currentLevel;

                return (
                  <StageNode
                    key={stage.level}
                    gameType={gameType}
                    level={stage.level}
                    name={stage.name}
                    unlocked={unlocked}
                    completed={completed}
                    isCurrent={stage.level === currentLevel}
                    stars={completed ? 3 : 0}
                    maxStars={3}
                    onPress={() => handleStagePress(stage.level)}
                    style={{
                      left: pos.x - NODE_SIZE / 2,
                      top: pos.y - NODE_SIZE / 2,
                    }}
                  />
                );
              })}
            </View>
          </ScrollView>

          <FloatingStickerButton
            activeOpacity={0.85}
            onPress={() => navigation.navigate("StickerGalleryScreen")}
          >
            <Ionicons name="book" size={26} color="#7C5CFF" />
          </FloatingStickerButton>
        </MapContainer>
      </Container>
    </SafeAreaContainer>
  );
}

const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: #f5f2ff;
`;

const Container = styled.View`
  flex: 1;
  background-color: #f5f2ff;
`;

const Header = styled.View`
  padding-horizontal: 18px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #f5f2ff;
`;

const HeaderButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 4px rgba(124, 92, 255, 0.08);
  elevation: 2;
`;

const HeaderTitleArea = styled.View`
  align-items: center;
`;

const HeaderTitle = styled.Text`
  font-size: 17px;
  font-weight: 900;
  color: #29263d;
`;

const HeaderSubtitle = styled.Text`
  font-size: 11px;
  color: #68657a;
  margin-top: 1px;
`;

const MapContainer = styled.View`
  flex: 1;
  position: relative;
`;

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
`;

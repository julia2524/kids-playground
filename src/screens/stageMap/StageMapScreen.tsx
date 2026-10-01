// import React, { useEffect, useRef, useState } from "react";
// import { DimensionValue, ScrollView } from "react-native";
// import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import styled from "styled-components/native";

// import { RootStackParamList } from "../../navigation/types";
// import { STAGE_CONFIGS } from "./stageConfigs";
// import { GAME_INFO } from "../../constants/game";
// import { LEVEL_CONFIGS } from "../../data/classification/classificationLevels";

// type NavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   "StageMapScreen"
// >;

// type StageMapRouteProp = RouteProp<RootStackParamList, "StageMapScreen">;

// const COLORS = {
//   purple: "#7C5CFF",
//   blue: "#4D8DFF",
//   pink: "#FF6FAE",
//   yellow: "#FFD95A",
//   mint: "#55D6BE",

//   background: "#F5F2FF",
//   white: "#FFFFFF",

//   text: "#29263D",
//   secondary: "#68657A",
//   muted: "#9C99AA",

//   line: "#CFC8F8",
//   locked: "#DAD7E8",
// };

// export const NODE_SIZE = 72;
// export const NODE_STEP = 145;

// export default function StageMapScreen() {
//   const navigation = useNavigation<NavigationProp>();
//   const route = useRoute<StageMapRouteProp>();
//   const gameType = route.params?.gameType ?? "classification";

//   const scrollRef = useRef<ScrollView>(null);
//   const [viewportHeight, setViewportHeight] = useState(0);

//   // ==================================================
//   // 1. Levels & Available Stages
//   // ==================================================
//   const availableStages = STAGE_CONFIGS.filter((stage) =>
//     Object.values(LEVEL_CONFIGS).some((level) => level.level === stage.level),
//   );

//   // 진행도(Progress) DB 연동 전 임시 처리 (기본 첫 번째 레벨)
//   const currentLevel = availableStages[0]?.level ?? 1;

//   const contentHeight = Math.max(availableStages.length * NODE_STEP + 160, 700);

//   // ==================================================
//   // 2. 제목 정보
//   // ==================================================
//   const { title, subtitle } = GAME_INFO[gameType] ?? {
//     title: "분류 놀이",
//     subtitle: "알맞은 항목을 찾아요!",
//   };

//   // ==================================================
//   // 3. 노드 위치 계산 함수
//   // ==================================================
//   const getNodePosition = (index: number) => {
//     const stage = availableStages[index];
//     const baseY = contentHeight - 120 - index * NODE_STEP;
//     const centerX = 0.5;

//     return {
//       x: centerX + (stage?.xOffset ?? 0) * 0.35,
//       y: baseY,
//     };
//   };

//   // ==================================================
//   // 4. 자동 스크롤
//   // ==================================================
//   useEffect(() => {
//     if (!currentLevel || viewportHeight <= 0) return;

//     const index = availableStages.findIndex(
//       (stage) => stage.level === currentLevel,
//     );

//     if (index < 0) return;

//     const targetY = contentHeight - 100 - index * NODE_STEP;
//     const scrollY = Math.max(targetY - viewportHeight / 2, 0);

//     const timer = setTimeout(() => {
//       scrollRef.current?.scrollTo({
//         y: scrollY,
//         animated: false,
//       });
//     }, 100);

//     return () => clearTimeout(timer);
//   }, [currentLevel, viewportHeight, availableStages, contentHeight]);

//   // ==================================================
//   // 5. Stage Press Handlers
//   // ==================================================
//   const handleStagePress = (level: number) => {
//     //나중에 game추가되면 지우면 됨!
//     if (gameType !== "classification") {
//       return;
//     }
//     navigation.navigate("ClassificationPlayScreen", {
//       gameType,
//       level,
//     });
//   };

//   return (
//     <ScreenContainer>
//       {/* 배경 장식 별 */}
//       <Star style={{ top: 120, right: 25, backgroundColor: COLORS.yellow }} />
//       <Star style={{ top: 330, left: 20, backgroundColor: COLORS.pink }} />
//       <Star style={{ top: 530, right: 22, backgroundColor: COLORS.mint }} />

//       {/* ==========================================
//           Header
//       ========================================== */}
//       <Header>
//         <HeaderButton
//           activeOpacity={0.8}
//           onPress={() => navigation.navigate("Home")}
//         >
//           <Ionicons name="chevron-back" size={26} color={COLORS.purple} />
//         </HeaderButton>

//         <HeaderTitleArea>
//           <HeaderTitle>{title}</HeaderTitle>
//           <HeaderSubtitle>{subtitle}</HeaderSubtitle>
//         </HeaderTitleArea>

//         <HeaderButton
//           activeOpacity={0.8}
//           onPress={() => console.log("스티커북 이동")}
//         >
//           <Ionicons name="book-outline" size={23} color={COLORS.purple} />
//         </HeaderButton>
//       </Header>

//       {/* ==========================================
//           Map View
//       ========================================== */}
//       <MapContainer
//         onLayout={(event) => {
//           setViewportHeight(event.nativeEvent.layout.height);
//         }}
//       >
//         <ScrollView
//           ref={scrollRef}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{
//             height: contentHeight,
//           }}
//         >
//           {/* 우주/행성 장식 */}
//           <MapPlanet style={{ right: 20, top: 80 }}>
//             <PlanetEmoji>🪐</PlanetEmoji>
//           </MapPlanet>

//           <MapPlanet style={{ left: 10, top: 520 }}>
//             <PlanetEmoji>🌍</PlanetEmoji>
//           </MapPlanet>

//           {/* 연결선 (Path Line) */}
//           {availableStages.slice(0, -1).map((stage, index) => {
//             const from = getNodePosition(index);
//             const to = getNodePosition(index + 1);

//             const left: DimensionValue = `${Math.min(from.x, to.x) * 100}%`;
//             const width: DimensionValue = `${Math.abs(from.x - to.x) * 100}%`;
//             const top = (from.y + to.y) / 2;
//             const rotate = from.x < to.x ? "8deg" : "-8deg";

//             return (
//               <PathLine
//                 key={`line-${stage.level}`}
//                 style={{
//                   left,
//                   width,
//                   top,
//                   transform: [{ rotate }],
//                 }}
//               />
//             );
//           })}

//           {/* 스테이지 노드 (Stage Nodes) */}
//           {availableStages.map((stage, index) => {
//             const position = getNodePosition(index);

//             // 💡 Progress 구현 전 기본값 설정 (모두 해금 상태로 개발 진행)
//             const unlocked = true;
//             const completed = false;
//             const stars = 0;
//             const isCurrent = stage.level === currentLevel;

//             return (
//               <NodeWrapper
//                 key={stage.level}
//                 style={{
//                   left: `${position.x * 100}%`,
//                   top: position.y - NODE_SIZE / 2,
//                 }}
//               >
//                 <StageNode
//                   activeOpacity={0.85}
//                   disabled={!unlocked}
//                   unlocked={unlocked}
//                   completed={completed}
//                   isCurrent={isCurrent}
//                   onPress={() => handleStagePress(stage.level)}
//                 >
//                   {completed ? (
//                     <Ionicons name="checkmark" size={30} color={COLORS.white} />
//                   ) : unlocked ? (
//                     <StageNumber>{stage.level}</StageNumber>
//                   ) : (
//                     <Ionicons
//                       name="lock-closed"
//                       size={25}
//                       color={COLORS.muted}
//                     />
//                   )}
//                 </StageNode>

//                 {/* 별 점수 표시 */}
//                 <StarRow>
//                   {[0, 1, 2].map((star) => (
//                     <SmallStar key={star} isStarOn={star < Math.min(stars, 3)}>
//                       ★
//                     </SmallStar>
//                   ))}
//                 </StarRow>

//                 {/* 현재 진행 중 배지 */}
//                 {isCurrent && unlocked && (
//                   <CurrentBadge>
//                     <CurrentBadgeText>여기부터!</CurrentBadgeText>
//                   </CurrentBadge>
//                 )}
//               </NodeWrapper>
//             );
//           })}

//           {/* 맨 아래 시작 지점 장식 */}
//           <FinishDecoration>
//             <FinishEmoji>🚀 ✨ 🎡</FinishEmoji>
//             <FinishText>놀이동산으로 출발!</FinishText>
//           </FinishDecoration>
//         </ScrollView>

//         {/* 플로팅 스티커북 버튼 */}
//         <FloatingStickerButton
//           activeOpacity={0.85}
//           onPress={() => console.log("스티커북 이동")}
//         >
//           <Ionicons name="book" size={25} color={COLORS.purple} />
//         </FloatingStickerButton>
//       </MapContainer>
//     </ScreenContainer>
//   );
// }

// // ==================================================
// // Styled Components
// // ==================================================

// const ScreenContainer = styled.View`
//   flex: 1;
//   background-color: ${COLORS.background};
// `;

// /* Header */
// const Header = styled.View`
//   height: 92px;
//   padding-horizontal: 16px;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
//   background-color: rgba(255, 255, 255, 0.92);
//   border-bottom-width: 1px;
//   border-bottom-color: #e8e4f7;
// `;

// const HeaderButton = styled.TouchableOpacity`
//   width: 46px;
//   height: 46px;
//   border-radius: 23px;
//   background-color: ${COLORS.white};
//   justify-content: center;
//   align-items: center;

//   shadow-color: #000;
//   shadow-opacity: 0.07;
//   shadow-radius: 7px;
//   shadow-offset: 0px 2px;
//   elevation: 2;
// `;

// const HeaderTitleArea = styled.View`
//   flex: 1;
//   align-items: center;
// `;

// const HeaderTitle = styled.Text`
//   font-size: 22px;
//   font-weight: 900;
//   color: ${COLORS.text};
// `;

// const HeaderSubtitle = styled.Text`
//   margin-top: 3px;
//   font-size: 12px;
//   color: ${COLORS.secondary};
// `;

// /* Map */
// const MapContainer = styled.View`
//   flex: 1;
//   position: relative;
// `;

// const PathLine = styled.View`
//   position: absolute;
//   height: 8px;
//   border-radius: 4px;
//   background-color: ${COLORS.line};
//   border-style: dashed;
//   border-width: 1px;
//   border-color: #beb6ed;
// `;

// const NodeWrapper = styled.View`
//   position: absolute;
//   width: ${NODE_SIZE}px;
//   height: 115px;
//   align-items: center;
//   margin-left: -${NODE_SIZE / 2}px;
// `;

// interface StageNodeProps {
//   unlocked: boolean;
//   completed: boolean;
//   isCurrent: boolean;
// }

// const StageNode = styled.TouchableOpacity<StageNodeProps>`
//   width: ${NODE_SIZE}px;
//   height: ${NODE_SIZE}px;
//   border-radius: ${NODE_SIZE / 2}px;
//   align-items: center;
//   justify-content: center;

//   background-color: ${({ unlocked, completed, isCurrent }) =>
//     completed
//       ? COLORS.mint
//       : isCurrent
//         ? COLORS.pink
//         : unlocked
//           ? COLORS.purple
//           : COLORS.locked};

//   border-width: ${({ unlocked }) => (unlocked ? "5px" : "4px")};
//   border-color: ${COLORS.white};

//   shadow-color: #000;
//   shadow-opacity: 0.13;
//   shadow-radius: 9px;
//   shadow-offset: 0px 4px;
//   elevation: 4;
// `;

// const StageNumber = styled.Text`
//   font-size: 25px;
//   font-weight: 900;
//   color: ${COLORS.white};
// `;

// const StarRow = styled.View`
//   flex-direction: row;
//   margin-top: 4px;
// `;

// const SmallStar = styled.Text<{ isStarOn: boolean }>`
//   font-size: 13px;
//   margin-horizontal: 1px;
//   color: ${({ isStarOn }) => (isStarOn ? COLORS.yellow : "#D8D5E5")};
// `;

// const CurrentBadge = styled.View`
//   position: absolute;
//   top: 75px;
//   background-color: ${COLORS.white};
//   padding-horizontal: 9px;
//   padding-vertical: 4px;
//   border-radius: 12px;

//   shadow-color: #000;
//   shadow-opacity: 0.08;
//   shadow-radius: 5px;
//   shadow-offset: 0px 2px;
// `;

// const CurrentBadgeText = styled.Text`
//   font-size: 10px;
//   font-weight: 900;
//   color: ${COLORS.pink};
// `;

// /* Background & Floating UI */
// const MapPlanet = styled.View`
//   position: absolute;
//   opacity: 0.85;
// `;

// const PlanetEmoji = styled.Text`
//   font-size: 52px;
// `;

// const FinishDecoration = styled.View`
//   position: absolute;
//   bottom: 35px;
//   left: 0;
//   right: 0;
//   align-items: center;
// `;

// const FinishEmoji = styled.Text`
//   font-size: 30px;
//   margin-bottom: 5px;
// `;

// const FinishText = styled.Text`
//   font-size: 15px;
//   font-weight: 900;
//   color: ${COLORS.secondary};
// `;

// const FloatingStickerButton = styled.TouchableOpacity`
//   position: absolute;
//   right: 18px;
//   bottom: 76px;
//   width: 56px;
//   height: 56px;
//   border-radius: 28px;
//   background-color: ${COLORS.white};
//   align-items: center;
//   justify-content: center;

//   shadow-color: #000;
//   shadow-opacity: 0.14;
//   shadow-radius: 10px;
//   shadow-offset: 0px 4px;
//   elevation: 6;
// `;

// const Star = styled.View`
//   position: absolute;
//   width: 7px;
//   height: 7px;
//   border-radius: 4px;
//   z-index: 2;
// `;

import React, { useEffect, useRef, useState } from "react";
import { DimensionValue, ScrollView } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";

import { RootStackParamList } from "../../navigation/types";
import { STAGE_CONFIGS } from "./stageConfigs";
import { GAME_INFO } from "../../constants/game";
import { LEVEL_CONFIGS } from "../../data/classification/classificationLevels";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "StageMapScreen"
>;

type StageMapRouteProp = RouteProp<RootStackParamList, "StageMapScreen">;

const COLORS = {
  purple: "#7C5CFF",
  blue: "#4D8DFF",
  pink: "#FF6FAE",
  yellow: "#FFD95A",
  mint: "#55D6BE",

  background: "#F5F2FF",
  white: "#FFFFFF",

  text: "#29263D",
  secondary: "#68657A",
  muted: "#9C99AA",

  line: "#CFC8F8",
  locked: "#DAD7E8",
};

export const NODE_SIZE = 72;
export const NODE_STEP = 145;

export default function StageMapScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<StageMapRouteProp>();
  const gameType = route.params?.gameType ?? "classification";

  const scrollRef = useRef<ScrollView>(null);
  const [viewportHeight, setViewportHeight] = useState(0);

  // ==================================================
  // 1. Levels & Available Stages
  // ==================================================
  const availableStages = STAGE_CONFIGS.filter((stage) =>
    Object.values(LEVEL_CONFIGS).some((level) => level.level === stage.level),
  );

  // 진행도(Progress) DB 연동 전 임시 처리 (기본 첫 번째 레벨)
  const currentLevel = availableStages[0]?.level ?? 1;

  const contentHeight = Math.max(availableStages.length * NODE_STEP + 160, 700);

  // ==================================================
  // 2. 제목 정보
  // ==================================================
  const { title, subtitle } = GAME_INFO[gameType] ?? {
    title: "분류 놀이",
    subtitle: "알맞은 항목을 찾아요!",
  };

  // ==================================================
  // 3. 노드 위치 계산 함수
  // ==================================================
  const getNodePosition = (index: number) => {
    const stage = availableStages[index];
    const baseY = contentHeight - 120 - index * NODE_STEP;
    const centerX = 0.5;

    return {
      x: centerX + (stage?.xOffset ?? 0) * 0.35,
      y: baseY,
    };
  };

  // ==================================================
  // 4. 자동 스크롤
  // ==================================================
  useEffect(() => {
    if (!currentLevel || viewportHeight <= 0) return;

    const index = availableStages.findIndex(
      (stage) => stage.level === currentLevel,
    );

    if (index < 0) return;

    const targetY = contentHeight - 100 - index * NODE_STEP;
    const scrollY = Math.max(targetY - viewportHeight / 2, 0);

    const timer = setTimeout(() => {
      scrollRef.current?.scrollTo({
        y: scrollY,
        animated: false,
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [currentLevel, viewportHeight, availableStages, contentHeight]);

  // ==================================================
  // 5. Stage Press Handlers
  // ==================================================
  const handleStagePress = (level: number) => {
    if (gameType !== "classification") {
      return;
    }
    navigation.navigate("ClassificationPlayScreen", {
      gameType,
      level,
    });
  };

  return (
    <ScreenContainer>
      {/* 배경 장식 별 */}
      <Star style={{ top: 120, right: 25, backgroundColor: COLORS.yellow }} />
      <Star style={{ top: 330, left: 20, backgroundColor: COLORS.pink }} />
      <Star style={{ top: 530, right: 22, backgroundColor: COLORS.mint }} />

      {/* Header */}
      <Header>
        <HeaderButton
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="chevron-back" size={26} color={COLORS.purple} />
        </HeaderButton>

        <HeaderTitleArea>
          <HeaderTitle>{title}</HeaderTitle>
          <HeaderSubtitle>{subtitle}</HeaderSubtitle>
        </HeaderTitleArea>

        <HeaderButton
          activeOpacity={0.8}
          onPress={() => console.log("스티커북 이동")}
        >
          <Ionicons name="book-outline" size={23} color={COLORS.purple} />
        </HeaderButton>
      </Header>

      {/* Map View */}
      <MapContainer
        onLayout={(event) => {
          setViewportHeight(event.nativeEvent.layout.height);
        }}
      >
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            height: contentHeight,
          }}
        >
          {/* 우주/행성 장식 */}
          <MapPlanet style={{ right: 20, top: 80 }}>
            <PlanetEmoji>🪐</PlanetEmoji>
          </MapPlanet>

          <MapPlanet style={{ left: 10, top: 520 }}>
            <PlanetEmoji>🌍</PlanetEmoji>
          </MapPlanet>

          {/* 연결선 (Path Line) */}
          {availableStages.slice(0, -1).map((stage, index) => {
            const from = getNodePosition(index);
            const to = getNodePosition(index + 1);

            const left: DimensionValue = `${Math.min(from.x, to.x) * 100}%`;
            const width: DimensionValue = `${Math.abs(from.x - to.x) * 100}%`;
            const top = (from.y + to.y) / 2;
            const rotateDeg = from.x < to.x ? "8deg" : "-8deg";

            return (
              <PathLine
                key={`line-${stage.level}`}
                style={{
                  left,
                  width,
                  top,
                  transform: [{ rotate: rotateDeg }],
                }}
              />
            );
          })}

          {/* 스테이지 노드 (Stage Nodes) */}
          {availableStages.map((stage, index) => {
            const position = getNodePosition(index);

            const unlocked = true;
            const completed = false;
            const stars = 0;
            const isCurrent = stage.level === currentLevel;

            // 노드 배경색 계산
            let nodeBgColor = COLORS.locked;
            if (completed) {
              nodeBgColor = COLORS.mint;
            } else if (isCurrent) {
              nodeBgColor = COLORS.pink;
            } else if (unlocked) {
              nodeBgColor = COLORS.purple;
            }

            return (
              <NodeWrapper
                key={stage.level}
                style={{
                  left: `${position.x * 100}%`,
                  top: position.y - NODE_SIZE / 2,
                }}
              >
                <StageNode
                  activeOpacity={0.85}
                  disabled={!unlocked}
                  unlocked={unlocked}
                  bgColor={nodeBgColor}
                  onPress={() => handleStagePress(stage.level)}
                >
                  {completed ? (
                    <Ionicons name="checkmark" size={30} color={COLORS.white} />
                  ) : unlocked ? (
                    <StageNumber>{stage.level}</StageNumber>
                  ) : (
                    <Ionicons
                      name="lock-closed"
                      size={25}
                      color={COLORS.muted}
                    />
                  )}
                </StageNode>

                {/* 별 점수 표시 */}
                <StarRow>
                  {[0, 1, 2].map((star) => (
                    <SmallStar key={star} isStarOn={star < Math.min(stars, 3)}>
                      ★
                    </SmallStar>
                  ))}
                </StarRow>

                {/* 현재 진행 중 배지 */}
                {isCurrent && unlocked && (
                  <CurrentBadge>
                    <CurrentBadgeText>여기부터!</CurrentBadgeText>
                  </CurrentBadge>
                )}
              </NodeWrapper>
            );
          })}

          {/* 맨 아래 시작 지점 장식 */}
          <FinishDecoration>
            <FinishEmoji>🚀 ✨ 🎡</FinishEmoji>
            <FinishText>놀이동산으로 출발!</FinishText>
          </FinishDecoration>
        </ScrollView>

        {/* 플로팅 스티커북 버튼 */}
        <FloatingStickerButton
          activeOpacity={0.85}
          onPress={() => console.log("스티커북 이동")}
        >
          <Ionicons name="book" size={25} color={COLORS.purple} />
        </FloatingStickerButton>
      </MapContainer>
    </ScreenContainer>
  );
}

// ==================================================
// Styled Components
// ==================================================

const ScreenContainer = styled.View`
  flex: 1;
  background-color: ${COLORS.background};
`;

/* Header */
const Header = styled.View`
  height: 92px;
  padding-horizontal: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.92);
  border-bottom-width: 1px;
  border-bottom-color: #e8e4f7;
`;

const HeaderButton = styled.TouchableOpacity`
  width: 46px;
  height: 46px;
  border-radius: 23px;
  background-color: ${COLORS.white};
  justify-content: center;
  align-items: center;

  shadow-color: #000;
  shadow-opacity: 0.07;
  shadow-radius: 7px;
  shadow-offset: 0px 2px;
  elevation: 2;
`;

const HeaderTitleArea = styled.View`
  flex: 1;
  align-items: center;
`;

const HeaderTitle = styled.Text`
  font-size: 22px;
  font-weight: 900;
  color: ${COLORS.text};
`;

const HeaderSubtitle = styled.Text`
  margin-top: 3px;
  font-size: 12px;
  color: ${COLORS.secondary};
`;

/* Map */
const MapContainer = styled.View`
  flex: 1;
  position: relative;
`;

const PathLine = styled.View`
  position: absolute;
  height: 8px;
  border-radius: 4px;
  background-color: ${COLORS.line};
  border-style: dashed;
  border-width: 1px;
  border-color: #beb6ed;
`;

const NodeWrapper = styled.View`
  position: absolute;
  width: ${NODE_SIZE}px;
  height: 115px;
  align-items: center;
  margin-left: -${NODE_SIZE / 2}px;
`;

interface StageNodeProps {
  unlocked: boolean;
  bgColor: string;
}

const StageNode = styled.TouchableOpacity<StageNodeProps>`
  width: ${NODE_SIZE}px;
  height: ${NODE_SIZE}px;
  border-radius: ${NODE_SIZE / 2}px;
  align-items: center;
  justify-content: center;

  background-color: ${(props) => props.bgColor};

  border-width: ${(props) => (props.unlocked ? "5px" : "4px")};
  border-color: ${COLORS.white};

  shadow-color: #000;
  shadow-opacity: 0.13;
  shadow-radius: 9px;
  shadow-offset: 0px 4px;
  elevation: 4;
`;

const StageNumber = styled.Text`
  font-size: 25px;
  font-weight: 900;
  color: ${COLORS.white};
`;

const StarRow = styled.View`
  flex-direction: row;
  margin-top: 4px;
`;

const SmallStar = styled.Text<{ isStarOn: boolean }>`
  font-size: 13px;
  margin-horizontal: 1px;
  color: ${(props) => (props.isStarOn ? COLORS.yellow : "#D8D5E5")};
`;

const CurrentBadge = styled.View`
  position: absolute;
  top: 75px;
  background-color: ${COLORS.white};
  padding-horizontal: 9px;
  padding-vertical: 4px;
  border-radius: 12px;

  shadow-color: #000;
  shadow-opacity: 0.08;
  shadow-radius: 5px;
  shadow-offset: 0px 2px;
`;

const CurrentBadgeText = styled.Text`
  font-size: 10px;
  font-weight: 900;
  color: ${COLORS.pink};
`;

/* Background & Floating UI */
const MapPlanet = styled.View`
  position: absolute;
  opacity: 0.85;
`;

const PlanetEmoji = styled.Text`
  font-size: 52px;
`;

const FinishDecoration = styled.View`
  position: absolute;
  bottom: 35px;
  left: 0;
  right: 0;
  align-items: center;
`;

const FinishEmoji = styled.Text`
  font-size: 30px;
  margin-bottom: 5px;
`;

const FinishText = styled.Text`
  font-size: 15px;
  font-weight: 900;
  color: ${COLORS.secondary};
`;

const FloatingStickerButton = styled.TouchableOpacity`
  position: absolute;
  right: 18px;
  bottom: 76px;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: ${COLORS.white};
  align-items: center;
  justify-content: center;

  shadow-color: #000;
  shadow-opacity: 0.14;
  shadow-radius: 10px;
  shadow-offset: 0px 4px;
  elevation: 6;
`;

const Star = styled.View`
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 4px;
  z-index: 2;
`;

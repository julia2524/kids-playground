// import React, {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import { Animated } from "react-native";
// import styled from "styled-components/native";

// import {
//   RouteProp,
//   useNavigation,
//   useRoute,
// } from "@react-navigation/native";

// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import Ionicons from "@expo/vector-icons/Ionicons";

// import { RootStackParamList } from "../../navigation/types";
// import { generateRounds } from "./createRounds";
// import {
//   getCorrectObjectId,
//   toDisplayObjects,
// } from "./adapters/toDisplayModal";

// import { colorLevels } from "./color/constants/levels";
// import { shapeLevels } from "./shape/constants/levels";
// import { categoryLevels } from "./category/constants/levels";

// import { RenderColorItemSvg } from "./color/assets/ColorItemSvgs";
// import {
//   RenderBasicShapeSvg,
//   RenderShapeItemSvg,
// } from "./shape/assets/shapeItemSvgs";
// import { RenderCategoryItemSvg } from "./category/assets/categoryItemSvgs";

// import SuccessModal from "./components/SuccessModal";
// import { calculateStars } from "../../components/common/rewardSystem";
// import {
//   loadGameProgress,
//   saveGameProgress,
// } from "./progress/progressStorage";
// import {
//   completeLevel,
//   createInitialProgress,
// } from "./progress/gameProgress";
// import { unlockSticker } from "../sticker/utils/stickerStorage";
// import {
//   preloadSounds,
//   resetLastSuccessNote,
// } from "../../utils/sound";
// import i18n from "../../i18n";

// type RouteProps = RouteProp<
//   RootStackParamList,
//   "ClassificationPlayScreen"
// >;

// type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

// type GameType = "color" | "shape" | "category";

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

//   retry: "#FFB84D",
//   retrySoft: "#FFF5E3",

//   success: "#35C98B",
//   successSoft: "#E7FAF2",

//   board: "#FFFFFF",
//   border: "#E6E1F4",
// };

// const COLOR_HEX: Record<string, string> = {
//   red: "#FF5C6C",
//   blue: "#4D8DFF",
//   yellow: "#FFD95A",
//   green: "#55C98B",
//   purple: "#9A78FF",
//   orange: "#FF9F43",
//   pink: "#FF75B5",
//   brown: "#A97A58",
//   black: "#29263D",
//   white: "#FFFFFF",
// };

// export default function ClassificationPlayScreen() {
//   const navigation = useNavigation<NavigationProps>();
//   const route = useRoute<RouteProps>();

//   const { gameType = "category", level = 1 } = route.params;

//   // ==================================================
//   // Level
//   // ==================================================

//   const levels =
//     gameType === "color"
//       ? colorLevels
//       : gameType === "shape"
//       ? shapeLevels
//       : categoryLevels;

//   const [levelIndex, setLevelIndex] = useState(level - 1);

//   const levelConfig =
//     levels[levelIndex] ?? levels[levels.length - 1];

//   // Round
//   const [roundIndex, setRoundIndex] = useState(0);
//   const [rounds, setRounds] = useState<any[]>([]);
//   const currentRound = rounds[roundIndex];

//   // Selection
//   const [selectedIds, setSelectedIds] = useState<string[]>([]);
//   const [attemptCount, setAttemptCount] = useState(0);
//   const [feedback, setFeedback] = useState<string | null>(null);
//   const [feedbackType, setFeedbackType] = useState<"success" | "retry" | null>(null);

//   const [earnedStars, setEarnedStars] = useState(0);
//   const [correctRoundCount, setCorrectRoundCount] = useState(0);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);

//   // Generate
//   useEffect(() => {
//     preloadSounds();

//     const generated = generateRounds(levelConfig, gameType);

//     setRounds(generated);
//     setRoundIndex(0);
//     setSelectedIds([]);
//     setAttemptCount(0);
//     setFeedback(null);
//     setFeedbackType(null);
//     setEarnedStars(0);
//     setCorrectRoundCount(0);
//   }, [levelConfig, gameType]);

//   // ==================================================
//   // Display Objects
//   // ==================================================

//   const displayObjects = useMemo(() => {
//     if (!currentRound) return [];
//     return toDisplayObjects(currentRound);
//   }, [currentRound]);

//   // ==================================================
//   // Correct IDs
//   // ==================================================

//   const correctIds = useMemo(() => {
//     if (!currentRound) return [];

//     if (
//       currentRound.answer &&
//       typeof currentRound.answer === "object"
//     ) {
//       return Object.keys(currentRound.answer);
//     }

//     const fallback = getCorrectObjectId(currentRound);
//     return fallback ? [fallback] : [];
//   }, [currentRound]);

//   const allowMultiple = Boolean(
//     (levelConfig as any)?.allowMultipleCorrect
//   );

//   // ==================================================
//   // Question
//   // ==================================================

//   const question = useMemo(
//     () => createQuestion(levelConfig, gameType),
//     [levelConfig, gameType]
//   );

//   // ==================================================
//   // Save
//   // ==================================================

//   const saveCompletedLevel = async (
//     completedLevel: number,
//     stars: number
//   ) => {
//     try {
//       const saved = await loadGameProgress(gameType);
//       const current = saved ?? createInitialProgress();
//       const next = completeLevel(current, completedLevel, stars);
//       await saveGameProgress(gameType, next);
//     } catch (error) {
//       console.error("Progress 저장 실패", error);
//     }
//   };

//   // ==================================================
//   // Sticker
//   // ==================================================

//   const unlockSelectedSticker = async (objectId: string) => {
//     try {
//       const object = displayObjects.find(
//         (item: any) => item.id === objectId
//       );
//       if (!object) return;

//       const stickerId = object.renderId;
//       if (!stickerId) return;

//       await unlockSticker(gameType, stickerId);
//     } catch (error) {
//       console.error("Sticker unlock 실패", error);
//     }
//   };

//   // ==================================================
//   // Next Round
//   // ==================================================

//   const goNextRound = async (finalStars: number) => {
//     if (roundIndex >= rounds.length - 1) {
//       await saveCompletedLevel(levelConfig.level, finalStars);
//       setShowSuccessModal(true);
//       return;
//     }

//     setRoundIndex((prev) => prev + 1);
//     setSelectedIds([]);
//     setAttemptCount(0);
//     setFeedback(null);
//     setFeedbackType(null);
//   };

//   // ==================================================
//   // Correct
//   // ==================================================

//   const handleCorrect = async (objectId: string) => {
//     const nextCorrectCount = correctRoundCount + 1;
//     const stars = calculateStars(nextCorrectCount);

//     setCorrectRoundCount(nextCorrectCount);
//     setEarnedStars(stars);
//     setFeedback(i18n.t("feedback_great_job"));
//     setFeedbackType("success");

//     await unlockSelectedSticker(objectId);

//     setTimeout(() => {
//       goNextRound(stars);
//     }, 700);
//   };

//   // ==================================================
//   // Wrong
//   // ==================================================

//   const handleWrong = (objectId: string) => {
//     const nextAttempt = attemptCount + 1;
//     setAttemptCount(nextAttempt);

//     setFeedback(
//       nextAttempt >= 3
//         ? "조금 더 살펴보고 다음에 다시 해볼까요?"
//         : nextAttempt === 2
//         ? "한 번 더 찾아볼래?"
//         : "다시 해 볼까?"
//     );
//     setFeedbackType("retry");

//     setTimeout(() => {
//       setSelectedIds((prev) => prev.filter((id) => id !== objectId));

//       if (nextAttempt >= 3) {
//         setTimeout(() => {
//           goNextRound(earnedStars);
//         }, 300);
//       } else {
//         setFeedback(null);
//         setFeedbackType(null);
//       }
//     }, 750);
//   };

//   // ==================================================
//   // Select
//   // ==================================================

//   const handleObjectPress = (objectId: string) => {
//     if (!currentRound) return;
//     if (selectedIds.includes(objectId)) return;

//     setSelectedIds((prev) => [...prev, objectId]);
//     const isCorrect = correctIds.includes(objectId);

//     if (allowMultiple) {
//       if (!isCorrect) {
//         handleWrong(objectId);
//         return;
//       }

//       const nextSelected = [...selectedIds, objectId];
//       const allCorrectSelected = correctIds.every((id) =>
//         nextSelected.includes(id)
//       );

//       if (allCorrectSelected) {
//         handleCorrect(objectId);
//       } else {
//         setFeedback("좋아! 하나 더 찾아볼까요?");
//         setFeedbackType("success");

//         setTimeout(() => {
//           setFeedback(null);
//           setFeedbackType(null);
//         }, 650);
//       }
//       return;
//     }

//     if (isCorrect) {
//       handleCorrect(objectId);
//     } else {
//       handleWrong(objectId);
//     }
//   };

//   // ==================================================
//   // Restart / Next Level
//   // ==================================================

//   const handleRestart = () => {
//     resetLastSuccessNote();
//     const generated = generateRounds(levelConfig, gameType);

//     setRounds(generated);
//     setRoundIndex(0);
//     setSelectedIds([]);
//     setAttemptCount(0);
//     setFeedback(null);
//     setFeedbackType(null);
//     setEarnedStars(0);
//     setCorrectRoundCount(0);
//     setShowSuccessModal(false);
//   };

//   const handleNextLevel = () => {
//     resetLastSuccessNote();
//     const nextIndex = levelIndex + 1;

//     if (nextIndex >= levels.length) {
//       navigation.goBack();
//       return;
//     }

//     const nextConfig = levels[nextIndex];
//     const generated = generateRounds(nextConfig, gameType);

//     setLevelIndex(nextIndex);
//     setRounds(generated);
//     setRoundIndex(0);
//     setSelectedIds([]);
//     setAttemptCount(0);
//     setFeedback(null);
//     setFeedbackType(null);
//     setEarnedStars(0);
//     setCorrectRoundCount(0);
//     setShowSuccessModal(false);
//   };

//   // ==================================================
//   // SVG
//   // ==================================================

//   const renderObjectSvg = (object: any, size = 90) => {
//     const colorHex =
//       object.variant?.primary ??
//       COLOR_HEX[object.color] ??
//       "#9B8EF7";

//     if (object.kind === "category") {
//       return (
//         <RenderCategoryItemSvg
//           itemId={object.renderId}
//           size={size}
//           colorHex={colorHex}
//           primary={object.variant?.primary}
//           secondary={object.variant?.secondary}
//           accent={object.variant?.accent}
//           pattern={object.variant?.pattern}
//         />
//       );
//     }

//     if (object.kind === "color") {
//       return (
//         <RenderColorItemSvg
//           shapeId={object.renderId}
//           colorHex={colorHex}
//         />
//       );
//     }

//     if (object.kind === "item") {
//       return (
//         <RenderShapeItemSvg
//           itemId={object.renderId}
//           colorHex={colorHex}
//         />
//       );
//     }

//     return (
//       <RenderBasicShapeSvg
//         shapeId={object.renderId}
//         colorHex={colorHex}
//       />
//     );
//   };

//   // ==================================================
//   // Loading
//   // ==================================================

//   if (!currentRound) {
//     return (
//       <LoadingContainer>
//         <LoadingText>놀이를 준비하고 있어요 ✨</LoadingText>
//       </LoadingContainer>
//     );
//   }

//   // ==================================================
//   // Render
//   // ==================================================

//   return (
//     <Container>
//       {/* Header */}
//       <Header>
//         <CircleButton
//           activeOpacity={0.8}
//           onPress={() => navigation.goBack()}
//         >
//           <Ionicons
//             name="chevron-back"
//             size={25}
//             color={COLORS.purple}
//           />
//         </CircleButton>

//         <GameTitlePill>
//           <GameTitleEmoji>🧩</GameTitleEmoji>
//           <GameTitle>분류 놀이</GameTitle>
//         </GameTitlePill>

//         <HeaderRight>
//           <StarPill>
//             <StarEmoji>⭐</StarEmoji>
//             <StarCount>{earnedStars}</StarCount>
//           </StarPill>

//           <CircleButton
//             activeOpacity={0.8}
//             onPress={() =>
//               navigation.navigate("SettingScreen" as never)
//             }
//           >
//             <Ionicons
//               name="settings-outline"
//               size={21}
//               color={COLORS.secondary}
//             />
//           </CircleButton>
//         </HeaderRight>
//       </Header>

//       {/* Mission Bubble */}
//       <QuestionCard>
//         <SpeakerButton>
//           <Ionicons
//             name="volume-high"
//             size={20}
//             color={COLORS.purple}
//           />
//         </SpeakerButton>
//         <QuestionText>{question}</QuestionText>
//       </QuestionCard>

//       {/* Problem Area */}
//       <ProblemCard>
//         <ProblemHeader>
//           <ProblemBadge>
//             <Ionicons
//               name="sparkles"
//               size={14}
//               color={COLORS.purple}
//             />
//             <ProblemBadgeText>찾아볼까요?</ProblemBadgeText>
//           </ProblemBadge>
//           <ProblemCount>{displayObjects.length}개</ProblemCount>
//         </ProblemHeader>

//         <ObjectGrid>
//           {displayObjects.map((object: any) => {
//             const isSelected = selectedIds.includes(object.id);
//             if (isSelected) return null;

//             return (
//               <ObjectCard
//                 key={object.id}
//                 activeOpacity={0.8}
//                 isRetry={feedbackType === "retry"}
//                 onPress={() => handleObjectPress(object.id)}
//               >
//                 <ObjectGlow />
//                 {renderObjectSvg(object, 82)}
//               </ObjectCard>
//             );
//           })}
//         </ObjectGrid>
//       </ProblemCard>

//       {/* Feedback */}
//       {feedback && (
//         <FeedbackBubble feedbackType={feedbackType}>
//           <FeedbackText>{feedback}</FeedbackText>
//         </FeedbackBubble>
//       )}

//       {/* Selection / Answer Tray */}
//       <SelectionArea>
//         <SelectionHeader>
//           <SelectionTitle>내가 고른 것</SelectionTitle>
//           <SelectionCount>
//             {selectedIds.length}
//             {allowMultiple ? ` / ${correctIds.length}` : ""}
//           </SelectionCount>
//         </SelectionHeader>

//         <SelectionTray>
//           {selectedIds.length === 0 ? (
//             <>
//               <Ionicons
//                 name="sparkles-outline"
//                 size={29}
//                 color="#B7B0DD"
//               />
//               <EmptyText>고른 것이 여기에 나타나요</EmptyText>
//             </>
//           ) : (
//             <SelectedRow>
//               {selectedIds.map((id) => {
//                 const object = displayObjects.find(
//                   (item: any) => item.id === id
//                 );
//                 if (!object) return null;

//                 return (
//                   <SelectedItem key={id}>
//                     {renderObjectSvg(object, 65)}
//                   </SelectedItem>
//                 );
//               })}
//             </SelectedRow>
//           )}
//         </SelectionTray>
//       </SelectionArea>

//       {/* Progress */}
//       <ProgressArea>
//         <ProgressDotsContainer>
//           {rounds.map((_, index) => (
//             <ProgressDot
//               key={index}
//               isActive={index === roundIndex}
//               isDone={index < roundIndex}
//             />
//           ))}
//         </ProgressDotsContainer>

//         <RoundPill>
//           <RoundText>
//             {roundIndex + 1} / {rounds.length}
//           </RoundText>
//         </RoundPill>
//       </ProgressArea>

//       {/* Success Modal */}
//       <SuccessModal
//         gameType={gameType}
//         show={showSuccessModal}
//         level={levelConfig.level}
//         earnedStars={earnedStars}
//         onRestart={handleRestart}
//         onNextLevel={handleNextLevel}
//         correctStreakCount={correctRoundCount}
//       />
//     </Container>
//   );
// }

// // ==================================================
// // Question Builder
// // ==================================================

// function createQuestion(config: any, gameType: GameType): string {
//   const rule = config?.rule;

//   switch (rule) {
//     case "color":
//       return "빨간색인 것을 찾아보세요.";
//     case "shape":
//       return "동그란 것을 찾아보세요.";
//     case "category":
//       return "동물을 찾아보세요.";
//     case "size":
//       return "큰 것을 찾아보세요.";
//     case "quantity":
//       return "많은 것을 찾아보세요.";
//     case "position":
//       return "오른쪽에 있는 것을 찾아보세요.";
//     case "color_and_category":
//       return "빨간색 동물을 찾아보세요.";
//     case "shape_and_category":
//       return "동그란 과일을 찾아보세요.";
//     case "color_and_size":
//       return "큰 빨간색 물건을 찾아보세요.";
//     case "category_and_size":
//       return "큰 동물을 찾아보세요.";
//     case "position_and_color":
//       return "오른쪽에 있는 빨간색을 찾아보세요.";
//     case "position_and_category":
//       return "왼쪽에 있는 동물을 찾아보세요.";
//     case "quantity_and_category":
//       return "3개 있는 과일을 찾아보세요.";
//     case "size_and_color_and_category":
//       return "빨간색 + 작은 + 동물을 찾아보세요.";
//     case "position_and_quantity_and_category":
//       return "오른쪽에 있는 3개의 동물을 찾아보세요.";
//     case "not_color":
//       return "빨간색이 아닌 것을 찾아보세요.";
//     case "not_color_and_category":
//       return "빨간색이 아닌 동물을 찾아보세요.";
//     default:
//       if (gameType === "color") return "알맞은 색을 찾아보세요.";
//       if (gameType === "shape") return "알맞은 모양을 찾아보세요.";
//       return "알맞은 것을 찾아보세요.";
//   }
// }

// // ==================================================
// // Styled Components
// // ==================================================

// const Container = styled.View`
//   flex: 1;
//   background-color: ${COLORS.background};
//   padding-horizontal: 16px;
//   padding-top: 18px;
//   padding-bottom: 15px;
// `;

// const LoadingContainer = styled.View`
//   flex: 1;
//   background-color: ${COLORS.background};
//   align-items: center;
//   justify-content: center;
// `;

// const LoadingText = styled.Text`
//   font-size: 17px;
//   font-weight: 800;
//   color: ${COLORS.secondary};
// `;

// // Header Component
// const Header = styled.View`
//   height: 58px;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
// `;

// const CircleButton = styled.TouchableOpacity`
//   width: 45px;
//   height: 45px;
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

// const GameTitlePill = styled.View`
//   flex-direction: row;
//   align-items: center;
//   background-color: ${COLORS.white};
//   border-radius: 22px;
//   padding-horizontal: 16px;
//   padding-vertical: 10px;
//   shadow-color: #000;
//   shadow-opacity: 0.06;
//   shadow-radius: 7px;
//   shadow-offset: 0px 2px;
//   elevation: 2;
// `;

// const GameTitleEmoji = styled.Text`
//   font-size: 18px;
//   margin-right: 6px;
// `;

// const GameTitle = styled.Text`
//   font-size: 16px;
//   font-weight: 900;
//   color: ${COLORS.text};
// `;

// const HeaderRight = styled.View`
//   flex-direction: row;
//   align-items: center;
//   gap: 7px;
// `;

// const StarPill = styled.View`
//   height: 38px;
//   min-width: 54px;
//   padding-horizontal: 10px;
//   border-radius: 19px;
//   background-color: ${COLORS.white};
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   gap: 3px;
// `;

// const StarEmoji = styled.Text``;

// const StarCount = styled.Text`
//   font-size: 14px;
//   font-weight: 900;
//   color: ${COLORS.text};
// `;

// // Question Card Component
// const QuestionCard = styled.View`
//   margin-top: 12px;
//   min-height: 76px;
//   border-radius: 25px;
//   background-color: ${COLORS.white};
//   padding-horizontal: 14px;
//   padding-vertical: 12px;
//   flex-direction: row;
//   align-items: center;
//   border-width: 1px;
//   border-color: ${COLORS.border};
//   shadow-color: #000;
//   shadow-opacity: 0.08;
//   shadow-radius: 9px;
//   shadow-offset: 0px 3px;
//   elevation: 3;
// `;

// const SpeakerButton = styled.View`
//   width: 45px;
//   height: 45px;
//   border-radius: 23px;
//   background-color: #f0edff;
//   align-items: center;
//   justify-content: center;
//   margin-right: 11px;
// `;

// const QuestionText = styled.Text`
//   flex: 1;
//   font-size: 20px;
//   line-height: 27px;
//   font-weight: 900;
//   color: ${COLORS.text};
// `;

// // Problem Area Component
// const ProblemCard = styled.View`
//   flex: 1;
//   margin-top: 14px;
//   border-radius: 28px;
//   background-color: ${COLORS.white};
//   padding: 14px;
//   border-width: 1px;
//   border-color: ${COLORS.border};
//   shadow-color: #000;
//   shadow-opacity: 0.08;
//   shadow-radius: 10px;
//   shadow-offset: 0px 4px;
//   elevation: 3;
// `;

// const ProblemHeader = styled.View`
//   height: 32px;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
// `;

// const ProblemBadge = styled.View`
//   flex-direction: row;
//   align-items: center;
//   background-color: #f2efff;
//   border-radius: 14px;
//   padding-horizontal: 9px;
//   padding-vertical: 5px;
// `;

// const ProblemBadgeText = styled.Text`
//   margin-left: 4px;
//   font-size: 11px;
//   font-weight: 900;
//   color: ${COLORS.purple};
// `;

// const ProblemCount = styled.Text`
//   font-size: 11px;
//   font-weight: 800;
//   color: ${COLORS.muted};
// `;

// const ObjectGrid = styled.View`
//   flex: 1;
//   flex-direction: row;
//   flex-wrap: wrap;
//   align-items: center;
//   justify-content: center;
//   gap: 12px;
//   padding-horizontal: 5px;
//   padding-vertical: 8px;
// `;

// const ObjectCard = styled.TouchableOpacity<{ isRetry?: boolean }>`
//   width: 104px;
//   height: 104px;
//   border-radius: 25px;
//   background-color: ${(props) =>
//     props.isRetry ? COLORS.retrySoft : "#F8F7FC"};
//   align-items: center;
//   justify-content: center;
//   border-width: 2px;
//   border-color: ${(props) => (props.isRetry ? "#FFE1B3" : "#F0EDF8")};
//   shadow-color: #000;
//   shadow-opacity: 0.06;
//   shadow-radius: 5px;
//   shadow-offset: 0px 2px;
//   elevation: 2;
// `;

// const ObjectGlow = styled.View`
//   position: absolute;
//   width: 58px;
//   height: 58px;
//   border-radius: 29px;
//   background-color: rgba(124, 92, 255, 0.06);
// `;

// // Feedback Component
// const FeedbackBubble = styled.View<{
//   feedbackType: "success" | "retry" | null;
// }>`
//   position: absolute;
//   top: 105px;
//   align-self: center;
//   padding-horizontal: 18px;
//   padding-vertical: 10px;
//   border-radius: 20px;
//   z-index: 20;
//   background-color: ${(props) =>
//     props.feedbackType === "success"
//       ? COLORS.successSoft
//       : COLORS.retrySoft};
//   shadow-color: #000;
//   shadow-opacity: 0.12;
//   shadow-radius: 8px;
//   shadow-offset: 0px 3px;
//   elevation: 7;
// `;

// const FeedbackText = styled.Text`
//   font-size: 14px;
//   font-weight: 900;
//   color: ${COLORS.text};
// `;

// // Selection Component
// const SelectionArea = styled.View`
//   margin-top: 12px;
// `;

// const SelectionHeader = styled.View`
//   height: 28px;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
//   padding-horizontal: 4px;
// `;

// const SelectionTitle = styled.Text`
//   font-size: 14px;
//   font-weight: 900;
//   color: ${COLORS.text};
// `;

// const SelectionCount = styled.Text`
//   font-size: 12px;
//   font-weight: 800;
//   color: ${COLORS.secondary};
// `;

// const SelectionTray = styled.View`
//   min-height: 88px;
//   border-radius: 23px;
//   border-width: 2px;
//   border-style: dashed;
//   border-color: #d8d2f1;
//   background-color: rgba(255, 255, 255, 0.65);
//   align-items: center;
//   justify-content: center;
//   margin-top: 5px;
//   overflow: hidden;
// `;

// const EmptyText = styled.Text`
//   margin-top: 3px;
//   font-size: 12px;
//   font-weight: 700;
//   color: #aaa4c4;
// `;

// const SelectedRow = styled.View`
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   flex-wrap: wrap;
//   padding-horizontal: 8px;
// `;

// const SelectedItem = styled(Animated.View)`
//   width: 76px;
//   height: 76px;
//   margin-horizontal: 4px;
//   align-items: center;
//   justify-content: center;
//   border-radius: 20px;
//   background-color: ${COLORS.white};
// `;

// // Progress Component
// const ProgressArea = styled.View`
//   height: 45px;
//   margin-top: 10px;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
// `;

// const ProgressDotsContainer = styled.View`
//   height: 34px;
//   border-radius: 18px;
//   background-color: ${COLORS.white};
//   flex-direction: row;
//   align-items: center;
//   padding-horizontal: 13px;
//   gap: 7px;
//   shadow-color: #000;
//   shadow-opacity: 0.05;
//   shadow-radius: 6px;
//   shadow-offset: 0px 2px;
//   elevation: 2;
// `;

// const ProgressDot = styled.View<{ isActive?: boolean; isDone?: boolean }>`
//   width: ${(props) => (props.isActive ? "14px" : "9px")};
//   height: ${(props) => (props.isActive ? "14px" : "9px")};
//   border-radius: ${(props) => (props.isActive ? "7px" : "5px")};
//   background-color: ${(props) =>
//     props.isActive
//       ? COLORS.purple
//       : props.isDone
//       ? COLORS.mint
//       : "#D9D5E9"};
// `;

// const RoundPill = styled.View`
//   margin-left: 8px;
//   height: 34px;
//   padding-horizontal: 12px;
//   border-radius: 17px;
//   background-color: ${COLORS.white};
//   align-items: center;
//   justify-content: center;
// `;

// const RoundText = styled.Text`
//   font-size: 12px;
//   font-weight: 900;
//   color: ${COLORS.secondary};
// `;

import { Text, View } from "react-native";
export default function ClassificationPlayScreen() {
  return (
    <View>
      <Text>ClassficationPlayScreen</Text>
    </View>
  );
}

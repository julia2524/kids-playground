// import React, { useEffect, useState } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import styled from "styled-components/native";
// import Ionicons from "@expo/vector-icons/Ionicons";

import { Text, View } from "react-native";

// import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// import { RootStackParamList } from "../../navigation/types";
// import { classificationItems } from "../../data/classification/classificationItems";

// import { RenderClassificationItemSvg } from "../../assets/Classification/classificationItemSvgs";
// import { generateQuestion } from "../../generators/classificationGenerator";
// import Mascot from "../../design-system/components/Mascot";
// import { LinearGradient } from "expo-linear-gradient";
// import { StyleSheet } from "react-native";
// import StarRow from "../../design-system/components/StarRow";
// import { ClassificationSubCategory, ClassificationTopCategory, GameItem } from "../../types/game";
// import { Question } from "../../types/level";

// type RouteProps = RouteProp<RootStackParamList, "ClassificationPlayScreen">;
// type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

// const toGeneratorCategory = (
//   topCategory: string,
//   subCategory: string,
// ): ClassificationTopCategory | ClassificationSubCategory => {
//   if (subCategory === "fruit") return "fruit";
//   switch (topCategory) {
//     case "animal":
//       return "animal";
//     case "food":
//       return "food";
//     case "vehicle":
//       return "vehicle";
//     default:
//       return "living";
//   }
// };

// const generatorItemPool: GameItem[] = classificationItems
//   .filter((item) => item.variants.length > 0)
//   .map((item) => ({
//     ...item,
//     category: toGeneratorCategory(item.topCategory, item.subCategory),
//     shape: item.shapes,
//   })) as unknown as GameItem[];

// export default function ClassificationPlayScreen() {
//   const navigation = useNavigation<NavigationProps>();
//   const route = useRoute<RouteProps>();

//   const { level = 1 } = route.params ?? {};

//   const [question, setQuestion] = useState<Question | null>(null);
//   const [selectedIds, setSelectedIds] = useState<string[]>([]);
//   const [roundIndex, setRoundIndex] = useState(0);
//   const [message, setMessage] = useState("");
//   const [earnedStars, setEarnedStars] = useState(0);

//   const createQuestion = () => {
//     try {
//       const nextQuestion = generateQuestion(level, generatorItemPool);
//       setQuestion(nextQuestion);
//       setSelectedIds([]);
//       setMessage("");
//     } catch (error) {
//       console.error("❌ 문제 생성 실패", error);
//     }
//   };

//   useEffect(() => {
//     createQuestion();
//   }, [level]);

//   const handleSelect = (choiceId: string) => {
//     if (!question) return;
//     if (selectedIds.includes(choiceId)) {
//       handleDeselect(choiceId);
//       return;
//     }
//     setSelectedIds((prev) => [...prev, choiceId]);
//   };

//   const handleDeselect = (choiceId: string) => {
//     setSelectedIds((prev) => prev.filter((id) => id !== choiceId));
//   };

//   const handleCheck = () => {
//     if (!question) return;

//     if (selectedIds.length === 0) {
//       setMessage("하나를 골라볼까요?");
//       return;
//     }

//     const correctIds = [...question.correctIds].sort();
//     const selected = [...selectedIds].sort();

//     const isCorrect =
//       correctIds.length === selected.length &&
//       correctIds.every((id, index) => id === selected[index]);

//     if (isCorrect) {
//       setMessage("정답이에요! 🎉");
//       setTimeout(() => {
//         if (roundIndex >= 4) {
//           setRoundIndex(0);
//         } else {
//           setRoundIndex((prev) => prev + 1);
//         }
//         createQuestion();
//       }, 700);
//     } else {
//       setMessage("다시 한번 살펴볼까요?");
//       setSelectedIds([]);
//     }
//   };

//   const getItem = (itemId: string) => {
//     return classificationItems.find((item) => item.id === itemId);
//   };

//   return (
//     <SafeAreaContainer edges={["top", "bottom"]}>
//       <LinearGradient
//         colors={["#D9EAFF", "#EEE8FF", "#F8F5FF"]}
//         style={StyleSheet.absoluteFill}
//       />
//       <Container>
//         {/* Header - StageMapScreen과 동일한 52px 높이 및 기준 위치 */}
//         <Header>
//           <IconButton onPress={() => navigation.goBack()}>
//             <Ionicons name="chevron-back" size={22} color="#5C4EB0" />
//           </IconButton>

//           <TitleBadge>
//             <StarRow
//               earnedStars={earnedStars}
//               totalStars={5}
//               gameType="classification"
//               size={28}
//             />
//             {/* <Ionicons name="color-palette" size={18} color="#7C5CFF" />
//             <TitleText>분류 놀이</TitleText> */}
//           </TitleBadge>

//           <HeaderRightGroup>
//             {/* <IconButton style={{ marginRight: 6 }}>
//               <Ionicons
//                 name="volume-medium-outline"
//                 size={20}
//                 color="#5C4EB0"
//               />
//             </IconButton> */}
//             <IconButton>
//               <Mascot size={38} />
//               {/* <Ionicons name="settings-outline" size={20} color="#5C4EB0" /> */}
//             </IconButton>
//           </HeaderRightGroup>
//         </Header>

//         {/* Question Box */}
//         <QuestionCard>
//           <SpeakerCircle>
//             <Ionicons name="volume-medium" size={16} color="#7C5CFF" />
//           </SpeakerCircle>

//           <QuestionText>
//             {question?.prompt ?? "문제를 준비하고 있어요..."}
//           </QuestionText>
//         </QuestionCard>

//         {/* Choice Grid Area */}
//         <GridContainer>
//           <GridBoard>
//             {question?.choices.map((choice) => {
//               const item = getItem(choice.itemId);
//               if (!item) return null;
//               const variant = item.variants.find((v) => v.id === choice.color);
//               const isSelected = selectedIds.includes(choice.id);

//               return (
//                 <ChoiceSlot
//                   key={choice.id}
//                   activeOpacity={0.8}
//                   isSelected={isSelected}
//                   onPress={() => handleSelect(choice.id)}
//                 >
//                   <RenderClassificationItemSvg
//                     itemId={item.svgKey}
//                     primary={variant?.primary}
//                     secondary={variant?.secondary}
//                     accent={variant?.accent}
//                     colorHex={variant?.primary ?? "#FFD95A"}
//                     size={72}
//                   />
//                   {choice.quantity ? (
//                     <QuantityText>{choice.quantity}개</QuantityText>
//                   ) : null}
//                 </ChoiceSlot>
//               );
//             })}
//           </GridBoard>
//         </GridContainer>

//         {/* Selection Area */}
//         <DropZoneArea activeOpacity={0.9} onPress={handleCheck}>
//           {selectedIds.length === 0 ? (
//             <EmptyBoxContent>
//               <UfoIconWrapper>
//                 <Ionicons name="planet-outline" size={36} color="#B1A7F0" />
//               </UfoIconWrapper>
//               <EmptyText>여기에 선택한 것을{"\n"}놓아보세요!</EmptyText>
//             </EmptyBoxContent>
//           ) : (
//             <SelectedItemsRow>
//               {question?.choices
//                 .filter((choice) => selectedIds.includes(choice.id))
//                 .map((choice) => {
//                   const item = getItem(choice.itemId);
//                   if (!item) return null;
//                   const variant = item.variants.find(
//                     (v) => v.id === choice.color,
//                   );

//                   return (
//                     <SelectedItem
//                       key={choice.id}
//                       activeOpacity={0.8}
//                       onPress={() => handleDeselect(choice.id)}
//                     >
//                       <RenderClassificationItemSvg
//                         itemId={item.svgKey}
//                         primary={variant?.primary}
//                         secondary={variant?.secondary}
//                         accent={variant?.accent}
//                         colorHex={variant?.primary ?? "#FFD95A"}
//                         size={55}
//                       />
//                     </SelectedItem>
//                   );
//                 })}
//             </SelectedItemsRow>
//           )}
//         </DropZoneArea>

//         {message !== "" && <MessageText>{message}</MessageText>}

//         {/* Footer */}
//         <Footer>
//           <DotIndicatorGroup>
//             {[0, 1, 2, 3, 4].map((idx) => (
//               <Dot key={idx} active={idx === roundIndex} />
//             ))}
//           </DotIndicatorGroup>

//           <RoundBadge>
//             <RoundBadgeText>{roundIndex + 1} / 5</RoundBadgeText>
//           </RoundBadge>
//         </Footer>
//       </Container>
//     </SafeAreaContainer>
//   );
// }

// const SafeAreaContainer = styled(SafeAreaView)`
//   flex: 1;
//   background-color: #eef0fe;
// `;

// const Container = styled.View`
//   flex: 1;
//   padding-horizontal: 18px;
//   padding-bottom: 12px;
//   justify-content: space-between;
// `;

// /* Header (StageMapScreen과 높이 및 패딩 동일) */
// const Header = styled.View`
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
// `;

// const IconButton = styled.TouchableOpacity`
//   width: 40px;
//   height: 40px;
//   border-radius: 20px;
//   background-color: #ffffff;
//   align-items: center;
//   justify-content: center;
//   box-shadow: 0px 2px 4px rgba(124, 92, 255, 0.08);
//   elevation: 2;
// `;

// const TitleBadge = styled.View`
//   flex-direction: row;
//   align-items: center;
//   /* background-color: #ffffff; */
//   padding-horizontal: 16px;
//   padding-vertical: 8px;
//   border-radius: 20px;
//   gap: 6px;
//   box-shadow: 0px 2px 4px rgba(124, 92, 255, 0.08);
//   elevation: 2;
// `;

// const TitleText = styled(AppText)`
//   font-size: 20px;
//   font-weight: 800;
//   color: #29263d;
// `;

// const HeaderRightGroup = styled.View`
//   flex-direction: row;
//   align-items: center;
// `;

// /* Question Card */
// const QuestionCard = styled.View`
//   flex-direction: row;
//   align-items: center;
//   background-color: #ffffff;
//   padding-vertical: 14px;
//   padding-horizontal: 16px;
//   border-radius: 24px;
//   margin-top: 6px;
//   gap: 10px;
//   box-shadow: 0px 3px 6px rgba(124, 92, 255, 0.06);
//   elevation: 2;
// `;

// const SpeakerCircle = styled.View`
//   width: 32px;
//   height: 32px;
//   border-radius: 16px;
//   background-color: #ede9fe;
//   align-items: center;
//   justify-content: center;
// `;

// const QuestionText = styled(AppText)`
//   flex: 1;
//   font-size: 19px;
//   font-weight: 900;
//   color: #29263d;
// `;

// /* Grid Area */
// const GridContainer = styled.View`
//   flex: 1.2;
//   margin-top: 12px;
//   margin-bottom: 12px;
// `;

// const GridBoard = styled.View`
//   flex: 1;
//   background-color: #ffffff;
//   border-radius: 24px;
//   padding: 12px;
//   flex-direction: row;
//   flex-wrap: wrap;
//   align-items: center;
//   justify-content: space-around;
//   box-shadow: 0px 4px 10px rgba(124, 92, 255, 0.05);
//   elevation: 2;
// `;

// const ChoiceSlot = styled.TouchableOpacity<{ isSelected?: boolean }>`
//   width: 30%;
//   height: 44%;
//   align-items: center;
//   justify-content: center;
//   border-radius: 16px;
//   opacity: ${(props) => (props.isSelected ? 0.25 : 1)};
// `;

// const QuantityText = styled(AppText)`
//   margin-top: 2px;
//   font-size: 12px;
//   font-weight: 800;
//   color: #68657a;
// `;

// /* Drop Zone Area */
// const DropZoneArea = styled.TouchableOpacity`
//   min-height: 150px;
//   background-color: #f6f5ff;
//   border-radius: 24px;
//   border-width: 2px;
//   border-color: #d1cbfa;
//   border-style: dashed;
//   align-items: center;
//   justify-content: center;
//   padding: 12px;
// `;

// const EmptyBoxContent = styled.View`
//   align-items: center;
//   justify-content: center;
// `;

// const UfoIconWrapper = styled.View`
//   margin-bottom: 6px;
//   opacity: 0.8;
// `;

// const EmptyText = styled(AppText)`
//   font-size: 14px;
//   font-weight: 700;
//   color: #9d96ca;
//   text-align: center;
//   line-height: 20px;
// `;

// const SelectedItemsRow = styled.View`
//   flex-direction: row;
//   flex-wrap: wrap;
//   gap: 10px;
//   align-items: center;
//   justify-content: center;
// `;

// const SelectedItem = styled.TouchableOpacity`
//   width: 65px;
//   height: 65px;
//   background-color: #ffffff;
//   border-radius: 18px;
//   align-items: center;
//   justify-content: center;
//   box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
//   elevation: 2;
// `;

// const MessageText = styled(AppText)`
//   margin-top: 6px;
//   text-align: center;
//   font-size: 15px;
//   font-weight: 800;
//   color: #7c5cff;
// `;

// /* Footer */
// const Footer = styled.View`
//   height: 44px;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
//   margin-top: 8px;
// `;

// const DotIndicatorGroup = styled.View`
//   flex-direction: row;
//   background-color: #ffffff;
//   padding-horizontal: 16px;
//   padding-vertical: 10px;
//   border-radius: 20px;
//   gap: 8px;
//   align-items: center;
// `;

// const Dot = styled.View<{ active?: boolean }>`
//   width: ${(props) => (props.active ? "12px" : "8px")};
//   height: 8px;
//   border-radius: 4px;
//   background-color: ${(props) => (props.active ? "#7C5CFF" : "#D2CCFA")};
// `;

// const RoundBadge = styled.View`
//   background-color: #ffffff;
//   padding-horizontal: 18px;
//   padding-vertical: 8px;
//   border-radius: 20px;
// `;

// const RoundBadgeText = styled(AppText)`
//   font-size: 14px;
//   font-weight: 900;
//   color: #29263d;
// `;

export default function ClassificationPlayScreen() {
  return (
    <View>
      <Text>ClassificationPlayScreen</Text>
    </View>
  );
}

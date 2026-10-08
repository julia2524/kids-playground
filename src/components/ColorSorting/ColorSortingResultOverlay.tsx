// import React from "react";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import styled from "styled-components/native";
// import { AppText } from "../../utils/AppText";

// type RoundResult = "correct" | "wrong";

// type ColorSortingResultOverlayProps = {
//   result: RoundResult;
//   roundIndex: number;
//   totalRounds: number;
//   isLastLevel: boolean;
//   onNext: () => void;
// };

// export default function ColorSortingResultOverlay({
//   result,
//   roundIndex,
//   totalRounds,
//   isLastLevel,
//   onNext,
// }: ColorSortingResultOverlayProps) {
//   const isCorrect = result === "correct";

//   const buttonText =
//     roundIndex === totalRounds - 1
//       ? isLastLevel
//         ? "완료"
//         : "다음 Level"
//       : "다음 라운드";

//   return (
//     // 1. 최상단은 오직 반투명 배경 1개만 존재해야 합니다.
//     <ResultOverlay>
//       {/* 2. 중앙의 흰색 카드만 독립된 레이어로 띄웁니다. */}
//       <ResultCard>
//         {isCorrect ? (
//           <>
//             <ResultEmoji>🎉</ResultEmoji>

//             <ResultTitle>정말 잘했어요!</ResultTitle>

//             <ResultDescription>
//               모든 물건을
//               <ResultStrong> 알맞은 색깔</ResultStrong>에 넣었어요!
//             </ResultDescription>
//           </>
//         ) : (
//           <>
//             <ResultEmoji>🌱</ResultEmoji>

//             <ResultTitle>한 번 더 해볼까요?</ResultTitle>

//             <ResultDescription>
//               색깔을 다시 살펴보고 넣어볼까요?
//             </ResultDescription>
//           </>
//         )}

//         <ResultButton onPress={onNext} activeOpacity={0.85}>
//           <ResultButtonText>{buttonText}</ResultButtonText>

//           <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
//         </ResultButton>
//       </ResultCard>
//     </ResultOverlay>
//   );
// }

// // ============================================================
// // Styled Components
// // ============================================================

// const ResultOverlay = styled.View`
//   /* 화면 전체를 덮는 유일한 반투명 딤드 레이어 */
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: rgba(83, 71, 135, 0.28);
//   align-items: center;
//   justify-content: center;
//   padding: 28px;
//   z-index: 999;
// `;

// const ResultCard = styled.View`
//   /* 카드 자체만 흰색 배경을 가집니다 */
//   width: 100%;
//   max-width: 340px;
//   padding: 28px 24px 22px;
//   border-radius: 30px;
//   background-color: #ffffff;
//   align-items: center;
//   elevation: 8;
//   shadow-color: #5d5193;
//   shadow-offset: 0px 6px;
//   shadow-opacity: 0.18;
//   shadow-radius: 14px;
// `;

// const ResultEmoji = styled(AppText)`
//   font-size: 48px;
//   margin-bottom: 8px;
// `;

// const ResultTitle = styled(AppText)`
//   font-size: 22px;
//   font-weight: 900;
//   color: #332c58;
//   text-align: center;
// `;

// const ResultDescription = styled(AppText)`
//   margin-top: 8px;
//   font-size: 14px;
//   font-weight: 600;
//   color: #817a9e;
//   text-align: center;
//   line-height: 21px;
// `;

// const ResultStrong = styled(AppText)`
//   font-weight: 900;
//   color: #6657b8;
// `;

// const ResultButton = styled.TouchableOpacity`
//   width: 100%;
//   height: 52px;
//   margin-top: 22px;
//   border-radius: 26px;
//   background-color: #7c5cff;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   gap: 8px;
//   elevation: 3;
//   shadow-color: #7c5cff;
//   shadow-offset: 0px 4px;
//   shadow-opacity: 0.2;
//   shadow-radius: 6px;
// `;

// const ResultButtonText = styled(AppText)`
//   font-size: 16px;
//   font-weight: 900;
//   color: #ffffff;
// `;
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

import { AppText } from "../../utils/AppText";
import UfoLevelBadge from "../UfoLevelBadge";
import { colors } from "../../design-system/tokens/colors";
import StarBadge from "../../design-system/ui/StarBadge";
import { StageMapGameType } from "../../types/game";

// ============================================================
// Theme / Color Definitions
// ============================================================

// Component Props Definition
type ColorSortingResultOverlayProps = {
  level: number;
  earnedStars: number;
  isLastLevel: boolean;

  onHome: () => void;
  onRestart: () => void;
  onNextLevel: () => void;
  onGoRoadmap: () => void;
};

export default function ColorSortingResultOverlay({
  level,
  earnedStars,
  isLastLevel,
  onHome,
  onRestart,
  onNextLevel,
  onGoRoadmap,
}: ColorSortingResultOverlayProps) {
  // ⭐ 별 5개를 표시
  const starOffsets = [18, 6, 0, 6, 18];

  return (
    <ResultOverlay>
      <ResultCard>
        <Inner>
          {/* ================================================= */}
          {/* 닫기 */}
          {/* ================================================= */}
          <CloseButton onPress={onGoRoadmap} activeOpacity={0.7}>
            <Ionicons name="close" size={24} color={colors.brand.primary} />
          </CloseButton>

          {/* ================================================= */}
          {/* 🚀 UFO */}
          {/* ================================================= */}
          <UfoWrapper>
            <UfoLevelBadge size={300} floating />
            <LevelText> LEVEL {level}</LevelText>
          </UfoWrapper>

          {/* ================================================= */}
          {/* ⭐ 획득한 별 */}
          {/* ================================================= */}
          <StarSection>
            {/* <StarTitle>이번 레벨에서</StarTitle>

            <StarTitleStrong>별 {earnedStars}개</StarTitleStrong> */}

            <StarRow>
              {Array.from({ length: 5 }).map((_, index) => {
                const starPosition = index + 1;

                let type: "full" | "half" | "empty" = "empty";

                if (earnedStars >= starPosition) {
                  type = "full";
                } else if (earnedStars >= starPosition - 0.5) {
                  type = "half";
                }

                return (
                  <StarWrapper
                    key={index}
                    style={{ marginTop: starOffsets[index] }}
                  >
                    {/* 외부 Badge 컴포넌트가 존재한다고 가정 */}
                    {/* <GameRewardBadge gameType="color" type={type} size={42} /> */}
                    <StarBadge type={type} size={42} />
                  </StarWrapper>
                );
              })}
            </StarRow>
          </StarSection>

          {/* ================================================= */}
          {/* 성공 문구 */}
          {/* ================================================= */}
          <ResultTitle>정말 잘했어요!</ResultTitle>

          {/* ================================================= */}
          {/* 버튼 */}
          {/* ================================================= */}
          <ButtonRow>
            {/* 다시하기 */}
            <ActionButton
              variant="secondary"
              onPress={onRestart}
              activeOpacity={0.85}
            >
              <Ionicons name="refresh" size={26} color={colors.white} />
            </ActionButton>

            {/* 다음 레벨 */}
            {!isLastLevel && (
              <ActionButton
                variant="primary"
                onPress={onNextLevel}
                activeOpacity={0.85}
              >
                <Ionicons name="arrow-forward" size={26} color={colors.white} />
              </ActionButton>
            )}
          </ButtonRow>

          {/* ================================================= */}
          {/* 홈 */}
          {/* ================================================= */}
          <HomeButton onPress={onHome} activeOpacity={0.85}>
            <Ionicons name="home" size={20} color={colors.white} />
          </HomeButton>
        </Inner>
      </ResultCard>
    </ResultOverlay>
  );
}

// ============================================================
// Overlay
// ============================================================

const ResultOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(41, 38, 61, 0.48);
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 999;
  elevation: 999;
`;

// ============================================================
// Card
// ============================================================

const ResultCard = styled.View`
  width: 88%;
  max-width: 370px;
  background-color: ${colors.softBlue};
  border-radius: 34px;
  padding: 7px;
  border-width: 3px;
  border-color: ${colors.brand.primary};
  elevation: 15;
  shadow-color: ${colors.brand.primary};
  shadow-offset: 0px 7px;
  shadow-opacity: 0.22;
  shadow-radius: 12px;
  position: relative;
`;

// ============================================================
// Inner
// ============================================================

const Inner = styled.View`
  width: 100%;
  background-color: ${colors.white};
  border-radius: 28px;
  padding: 24px 20px 20px;
  align-items: center;
`;

// ============================================================
// UFO
// ============================================================

const UfoWrapper = styled.View`
  width: 100%;
  height: 150px;
  align-items: center;
  justify-content: center;
  margin-top: -100px;
  position: relative;
  z-index: 10;
`;

const LevelText = styled(AppText)`
  position: absolute;
  top: 40px;
  font-size: 21px;
  font-weight: 900;
  color: ${colors.brand.primary};
  text-align: center;
`;

// ============================================================
// ⭐ Star
// ============================================================

const StarSection = styled.View`
  width: 100%;
  align-items: center;
`;

const StarTitle = styled(AppText)`
  font-size: 15px;
  font-weight: 800;
  color: ${colors.textGroup.secondary};
  text-align: center;
`;

const StarTitleStrong = styled(AppText)`
  margin-top: 2px;
  font-size: 23px;
  font-weight: 900;
  color: ${colors.brand.primary};
  text-align: center;
`;

const StarRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 100%;

  margin-bottom: 12px;
`;

const StarWrapper = styled.View`
  margin-left: 1px;
  margin-right: 1px;
  align-items: center;
  justify-content: center;
`;

// ============================================================
// Result Text
// ============================================================

const ResultTitle = styled(AppText)`
  font-size: 23px;
  font-weight: 900;
  color: ${colors.brand.primary};
  text-align: center;
  margin-top: 2px;
`;

const ResultDescription = styled(AppText)`
  margin-top: 6px;
  font-size: 14px;
  font-weight: 700;
  color: ${colors.textGroup.secondary};
  text-align: center;
  line-height: 20px;
`;

// ============================================================
// Buttons
// ============================================================

const ButtonRow = styled.View`
  flex-direction: row;
  width: 100%;
  gap: 12px;
  margin-top: 18px;
`;

const ActionButton = styled(TouchableOpacity)<{
  variant: "primary" | "secondary";
}>`
  flex: 1;
  min-height: 56px;
  border-radius: 28px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 6px;

  background-color: ${(props) =>
    props.variant === "primary"
      ? colors.feedback.success
      : colors.feedback.retry};

  border-width: 2px;
  border-color: ${(props) =>
    props.variant === "primary" ? "#6AC8A3" : "#FFC875"};

  border-bottom-width: 5px;
  border-bottom-color: ${(props) =>
    props.variant === "primary" ? "#238B5E" : "#D98800"};

  elevation: 5;
`;

const ActionButtonText = styled(AppText)`
  font-size: 14px;
  font-weight: 900;
  color: ${colors.white};
`;

const HomeButton = styled(TouchableOpacity)`
  width: 100%;
  height: 48px;
  margin-top: 10px;
  border-radius: 24px;
  background-color: ${colors.brand.primary};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 7px;

  border-width: 2px;
  border-color: #9d84ff;

  border-bottom-width: 4px;
  border-bottom-color: #5a3cd1;

  elevation: 4;
`;

const HomeButtonText = styled(AppText)`
  font-size: 14px;
  font-weight: 900;
  color: ${colors.white};
`;

const CloseButton = styled(TouchableOpacity)`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: ${colors.white};
  align-items: center;
  justify-content: center;
  z-index: 30;

  border-width: 1.5px;
  border-color: ${colors.border.default};

  elevation: 5;
`;

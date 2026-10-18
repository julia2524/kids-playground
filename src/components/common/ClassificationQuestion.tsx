// import React from "react";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import styled from "styled-components/native";
// import { AppText } from "../../utils/AppText";
// import i18n from "../../i18n";
// import { useLanguage } from "../../context/LangaugeContext";

// type ColorSortingQuestionProps = {
//   text?: string;
// };

// export default function ColorSortingQuestion({
//   text = "색깔에 맞춰 모아볼까요?",
// }: ColorSortingQuestionProps) {
//   useLanguage();
//   return (
//     <QuestionCard>
//       <SpeakerCircle>
//         <Ionicons name="volume-medium" size={15} color="#7C5CFF" />
//       </SpeakerCircle>

//       <QuestionText>{i18n.t("question_sort_by_color") || text}</QuestionText>
//     </QuestionCard>
//   );
// }

const QuestionCard = styled.View`
  align-self: center;
  flex-direction: row;
  align-items: center;
  min-height: 48px;
  padding-left: 14px;
  padding-right: 14px;
  padding-top: 8px;
  padding-bottom: 8px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  elevation: 2;
  shadow-color: #7c5cff;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.06;
  shadow-radius: 5px;
`;

const SpeakerCircle = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin-right: 8px;
  background-color: #ede9fe;
  align-items: center;
  justify-content: center;
`;

const QuestionText = styled(AppText)`
  font-size: 15px;
  font-weight: 800;
  color: #29263d;
`;
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import styled from "styled-components/native";
import { AppText } from "../../utils/AppText";
import i18n from "../../i18n";
import { useLanguage } from "../../context/LangaugeContext";

type QuestionProps = {
  text?: string;
  i18nKey?: string; // 번역 키 (예: "sort_by_shape", "find_friends_home" 등)
  iconColor?: string;
};

export default function ClassificationQuestion({
  text = "알맞은 곳에 모아볼까요?",
  i18nKey,
  iconColor = "#7C5CFF",
}: QuestionProps) {
  useLanguage(); // 언어 변경 시 리렌더링 감지

  // i18nKey가 전달되었을 때, 키가 번역 파일에 없으면 defaultValue(text)를 사용하도록 설정
  const displayMessage = i18nKey
    ? i18n.t(i18nKey, { defaultValue: text })
    : text;

  return (
    <QuestionCard>
      <SpeakerCircle>
        <Ionicons name="volume-medium" size={15} color={iconColor} />
      </SpeakerCircle>

      <QuestionText>{displayMessage}</QuestionText>
    </QuestionCard>
  );
}

// import React from "react";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import styled from "styled-components/native";
// import { AppText } from "../../utils/AppText";
// import i18n from "../../i18n";
// import { useLanguage } from "../../context/LangaugeContext";

// type QuestionProps = {
//   text?: string;
//   i18nKey?: string; // 번역 키를 직접 전달받을 수 있도록 추가
//   iconColor?: string;
// };

// export default function ClassificationQuestion({
//   text = "알맞은 곳에 모아볼까요?",
//   i18nKey,
//   iconColor = "#7C5CFF",
// }: QuestionProps) {
//   useLanguage();

//   // i18nKey가 있으면 해당 번역을 우선 사용하고, 없으면 text prop 사용
//   const displayMessage = i18nKey ? i18n.t(i18nKey) || text : text;

//   return (
//     <QuestionCard>
//       <SpeakerCircle>
//         <Ionicons name="volume-medium" size={15} color={iconColor} />
//       </SpeakerCircle>

//       <QuestionText>{displayMessage}</QuestionText>
//     </QuestionCard>
//   );
// }

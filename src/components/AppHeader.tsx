// import React, { ReactNode } from "react";
// import styled from "styled-components/native";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import Mascot from "../design-system/components/Mascot";
// import { AppText } from "../utils/AppText";
// import { colors } from "../design-system/tokens/colors";
// import { triggerHaptic } from "../utils/haptic";

// interface HeaderProps {
//   onBackPress?: () => void;
//   onMascotPress?: () => void;
//   title?: ReactNode;
//   subtitle?: string;
//   children?: ReactNode;
// }

// export default function AppHeader({
//   onBackPress,
//   onMascotPress,
//   title,
//   subtitle,
//   children,
// }: HeaderProps) {
//   const handleBackPress = () => {
//     triggerHaptic("light");
//     // playSound("grab");
//     onBackPress?.();
//   };

//   const handleSettingPress = () => {
//     triggerHaptic("light");
//     // playSound("grab");
//     onMascotPress?.();
//   };

//   return (
//     <Container>
//       {/* 1. 좌측 뒤로가기 버튼 */}
//       <HeaderButton onPress={handleBackPress} activeOpacity={0.7}>
//         <Ionicons name="chevron-back" size={24} color="#7C5CFF" />
//       </HeaderButton>

//       {/* 2. 중앙 영역 */}
//       <CenterArea>
//         {children ? (
//           children
//         ) : (
//           <>
//             {title &&
//               (typeof title === "string" ? (
//                 <HeaderTitleText>{title}</HeaderTitleText>
//               ) : (
//                 <TitleContainer>{title}</TitleContainer>
//               ))}

//             {subtitle && <HeaderSubtitleText>{subtitle}</HeaderSubtitleText>}
//           </>
//         )}
//       </CenterArea>

//       {/* 3. 우측 마스코트 버튼 */}
//       {onMascotPress ? (
//         <HeaderButton onPress={handleSettingPress} activeOpacity={0.7}>
//           <Mascot size={36} />
//         </HeaderButton>
//       ) : (
//         /* 중앙 정렬 균형을 위한 좌측 버튼과 동일한 크기의 빈 스페이서 */
//         <HeaderSpacer />
//       )}
//     </Container>
//   );
// }

// export const Container = styled.View`
//   height: 64px;
//   padding-horizontal: 20px;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
//   background-color: transparent;
// `;

// export const HeaderButton = styled.TouchableOpacity`
//   width: 44px;
//   height: 44px;
//   border-radius: 22px;
//   background-color: ${colors.white};
//   justify-content: center;
//   align-items: center;
//   border-width: 1.5px;
//   border-color: ${colors.border.default};
//   elevation: 2;
//   shadow-color: #7c5cff;
//   shadow-offset: 0px 2px;
//   shadow-opacity: 0.1;
//   shadow-radius: 4px;
// `;
// export const HeaderSpacer = styled.View`
//   width: 44px;
//   height: 44px;
// `;

// export const CenterArea = styled.View`
//   flex: 1;
//   align-items: center;
//   justify-content: center;
// `;

// export const HeaderTitleText = styled(AppText)`
//   font-size: ${(props) => props.theme.typography.button.fontSize}px;
//   color: ${(props) => props.theme.colors.textGroup.primary};
//   text-align: center;
// `;

// export const TitleContainer = styled.View`
//   align-items: center;
//   justify-content: center;
// `;

// export const HeaderSubtitleText = styled(AppText)`
//   font-size: ${(props) => props.theme.typography.caption.fontSize}px;
//   color: ${colors.purple};
//   margin-top: 1px;
//   text-align: center;
// `;

import React, { ReactNode } from "react";
import { I18nManager } from "react-native";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Mascot from "../design-system/components/Mascot";
import { AppText } from "../utils/AppText";
import { colors } from "../design-system/tokens/colors";
import { triggerHaptic } from "../utils/haptic";

interface HeaderProps {
  onBackPress?: () => void;
  onMascotPress?: () => void;
  title?: ReactNode;
  subtitle?: string;
  children?: ReactNode;
}

export default function AppHeader({
  onBackPress,
  onMascotPress,
  title,
  subtitle,
  children,
}: HeaderProps) {
  const handleBackPress = () => {
    triggerHaptic("light");
    onBackPress?.();
  };

  const handleSettingPress = () => {
    triggerHaptic("light");
    onMascotPress?.();
  };

  // 💡 RTL(아랍어) 환경인지 확인
  const isRTL = I18nManager.isRTL;

  // 좌측/우측에 들어갈 컴포넌트를 RTL 여부에 따라 결정
  // - RTL(아랍어): 오른쪽에 뒤로가기(<), 왼쪽에 마스코트
  // - LTR(일반): 왼쪽에 뒤로가기(<), 오른쪽에 마스코트
  const backButtonElement = (
    <HeaderButton onPress={handleBackPress} activeOpacity={0.7}>
      <Ionicons
        name={isRTL ? "chevron-forward" : "chevron-back"}
        size={24}
        color="#7C5CFF"
      />
    </HeaderButton>
  );

  const mascotOrSpacerElement = onMascotPress ? (
    <HeaderButton onPress={handleSettingPress} activeOpacity={0.7}>
      <Mascot size={36} />
    </HeaderButton>
  ) : (
    <HeaderSpacer />
  );

  return (
    <Container>
      {/* 💡 RTL일 때는 뒤로가기가 우측, LTR일 때는 좌측에 위치하도록 배치 교체 */}
      {isRTL ? mascotOrSpacerElement : backButtonElement}

      {/* 중앙 영역 */}
      <CenterArea>
        {children ? (
          children
        ) : (
          <>
            {title &&
              (typeof title === "string" ? (
                <HeaderTitleText>{title}</HeaderTitleText>
              ) : (
                <TitleContainer>{title}</TitleContainer>
              ))}

            {subtitle && <HeaderSubtitleText>{subtitle}</HeaderSubtitleText>}
          </>
        )}
      </CenterArea>

      {/* 반대쪽 영역 */}
      {isRTL ? backButtonElement : mascotOrSpacerElement}
    </Container>
  );
}

export const Container = styled.View`
  height: 64px;
  padding-horizontal: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
`;

export const HeaderButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: ${colors.white};
  justify-content: center;
  align-items: center;
  border-width: 1.5px;
  border-color: ${colors.border.default};
  elevation: 2;
  shadow-color: #7c5cff;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const HeaderSpacer = styled.View`
  width: 44px;
  height: 44px;
`;

export const CenterArea = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-horizontal: 8px;
`;

export const HeaderTitleText = styled(AppText)`
  font-size: ${(props) => props.theme.typography.button.fontSize}px;
  color: ${(props) => props.theme.colors.textGroup.primary};
  text-align: center;
`;

export const TitleContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const HeaderSubtitleText = styled(AppText)`
  font-size: ${(props) => props.theme.typography.caption.fontSize}px;
  color: ${colors.purple};
  margin-top: 1px;
  text-align: center;
`;

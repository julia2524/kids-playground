// import React from "react";
// import { Image, Modal } from "react-native";
// import styled from "styled-components/native";
// import { AppText } from "../utils/AppText";
// import { showRewardedAd } from "../services/RewardedAd";
// import { triggerHaptic } from "../utils/haptic";
// import { ASSETS } from "../assets/assets";

// interface RestModalProps {
//   visible: boolean;
//   isCooltimeActive: boolean;
//   remainingCooltimeSec: number;
//   onRestThreeMinutes: () => void;
//   onWatchAdSuccess: () => void;
// }

// export default function RestModal({
//   visible,
//   isCooltimeActive,
//   remainingCooltimeSec,
//   onRestThreeMinutes,
//   onWatchAdSuccess,
// }: RestModalProps) {
//   const handleResetThreeMinutes = () => {
//     triggerHaptic("light");
//     // playSound("grab");
//     onRestThreeMinutes?.();
//   };
//   const handleWatchAd = () => {
//     triggerHaptic("light");
//     showRewardedAd(() => {
//       // 광고 시청 완료 시 쿨타임 해제 및 플레이 시간 리셋
//       onWatchAdSuccess();
//     });
//   };

//   // 남은 초를 "MM:SS" 형식으로 변환
//   const formatTime = (totalSeconds: number) => {
//     const mins = Math.floor(totalSeconds / 60);
//     const secs = totalSeconds % 60;
//     return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
//   };

//   return (
//     <Modal visible={visible} transparent animationType="fade">
//       <Overlay>
//         <ParentGuideImage
//           source={ASSETS.parentPause}
//           style={{
//             width: 240,
//             height: 210,
//             alignSelf: "center",
//             marginBottom: 12,
//           }}
//           resizeMode="contain"
//         />
//         <ModalContainer>
//           {/* <Emoji>⏰🐻</Emoji> */}
//           <Title>
//             {isCooltimeActive ? "잠깐 기다려요!" : "잠깐~ 엄마 아빠!"}
//           </Title>

//           {isCooltimeActive ? (
//             // ⭐ 3분 카운트다운 중일 때 보여줄 화면 (+ 하단 광고 바로보기 버튼 추가)
//             <TimerContainer>
//               <TimerText>{formatTime(remainingCooltimeSec)}</TimerText>
//               <Description>조금만 기다리면 다시 놀 수 있어요!</Description>

//               {/* 💡 카운트다운 중에도 마음이 바뀌면 광고 보고 바로 넘어갈 수 있는 버튼 */}
//               <ButtonContainer style={{ marginTop: 10 }}>
//                 <AdButton activeOpacity={0.85} onPress={handleWatchAd}>
//                   <AdButtonText>광고 보고 바로 놀기</AdButtonText>
//                 </AdButton>
//               </ButtonContainer>
//             </TimerContainer>
//           ) : (
//             // ⭐ 처음 15분이 지나 팝업이 떴을 때
//             <>
//               <Description>엄마 아빠와 같이 놀아요!</Description>

//               <ButtonContainer>
//                 <AdButton activeOpacity={0.85} onPress={handleWatchAd}>
//                   <AdButtonText>광고 보고 바로 놀기</AdButtonText>
//                 </AdButton>

//                 <RestButton
//                   activeOpacity={0.85}
//                   onPress={handleResetThreeMinutes}
//                 >
//                   <RestButtonText>3분 동안 쉬기</RestButtonText>
//                 </RestButton>
//               </ButtonContainer>
//             </>
//           )}
//         </ModalContainer>
//       </Overlay>
//     </Modal>
//   );
// }

// // ================================================================
// // Styles
// // ================================================================
// const Overlay = styled.View`
//   flex: 1;
//   background-color: rgba(0, 0, 0, 0.6);
//   justify-content: center;
//   align-items: center;
//   padding: 20px;
// `;

// const ModalContainer = styled.View`
//   width: 85%;
//   background-color: #ffffff;
//   border-radius: 28px;
//   padding: 28px 20px;
//   align-items: center;
//   elevation: 10;
// `;

// const Emoji = styled.Text`
//   font-size: 48px;
//   margin-bottom: 12px;
// `;

// const Title = styled(AppText)`
//   font-size: 20px;
//   color: #29263d;
//   margin-bottom: 8px;
//   text-align: center;
// `;

// const Description = styled(AppText)`
//   font-size: 14px;
//   color: #7e7b9a;
//   text-align: center;
//   line-height: 20px;
//   margin-bottom: 24px;
// `;

// const TimerContainer = styled.View`
//   align-items: center;
//   width: 100%;
//   margin-top: 5px;
// `;

// const TimerText = styled(AppText)`
//   font-size: 42px;
//   color: #7c5cff;
//   font-weight: bold;
//   margin-bottom: 12px;
// `;

// const ButtonContainer = styled.View`
//   width: 100%;
//   gap: 10px;
// `;

// const AdButton = styled.TouchableOpacity`
//   height: 52px;
//   background-color: #7c5cff;
//   border-radius: 26px;
//   justify-content: center;
//   align-items: center;
// `;

// const AdButtonText = styled(AppText)`
//   color: #ffffff;
//   font-size: 15px;
// `;

// const RestButton = styled.TouchableOpacity`
//   height: 48px;
//   background-color: #f2f5ff;
//   border-radius: 24px;
//   justify-content: center;
//   align-items: center;
// `;

// const RestButtonText = styled(AppText)`
//   color: #7c5cff;
//   font-size: 14px;
// `;

// const ParentGuideImage = styled(Image)`
//   width: 220px;
//   height: 180px;
//   margin-bottom: 12px;
// `;

import React from "react";
import { Image, Modal } from "react-native";
import styled from "styled-components/native";
import { AppText } from "../utils/AppText";
import { showRewardedAd } from "../services/RewardedAd";
import { triggerHaptic } from "../utils/haptic";
import { ASSETS } from "../assets/assets";
import i18n from "../i18n"; // i18n 임포트 경로에 맞게 확인해주세요!

interface RestModalProps {
  visible: boolean;
  isCooltimeActive: boolean;
  remainingCooltimeSec: number;
  onRestThreeMinutes: () => void;
  onWatchAdSuccess: () => void;
}

export default function RestModal({
  visible,
  isCooltimeActive,
  remainingCooltimeSec,
  onRestThreeMinutes,
  onWatchAdSuccess,
}: RestModalProps) {
  const handleResetThreeMinutes = () => {
    triggerHaptic("light");
    onRestThreeMinutes?.();
  };

  const handleWatchAd = () => {
    triggerHaptic("light");
    showRewardedAd(() => {
      onWatchAdSuccess();
    });
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Overlay>
        <ParentGuideImage
          source={ASSETS.parentPause}
          style={{
            width: 240,
            height: 210,
            alignSelf: "center",
            marginBottom: 12,
          }}
          resizeMode="contain"
        />
        <ModalContainer>
          <Title>
            {isCooltimeActive
              ? i18n.t("rest_modal_wait_title")
              : i18n.t("rest_modal_adult_title")}
          </Title>

          {isCooltimeActive ? (
            <TimerContainer>
              <TimerText>{formatTime(remainingCooltimeSec)}</TimerText>
              <Description>{i18n.t("rest_modal_wait_desc")}</Description>

              <ButtonContainer style={{ marginTop: 10 }}>
                <AdButton activeOpacity={0.85} onPress={handleWatchAd}>
                  <AdButtonText>{i18n.t("rest_modal_ad_button")}</AdButtonText>
                </AdButton>
              </ButtonContainer>
            </TimerContainer>
          ) : (
            <>
              <Description>{i18n.t("rest_modal_adult_desc")}</Description>

              <ButtonContainer>
                <AdButton activeOpacity={0.85} onPress={handleWatchAd}>
                  <AdButtonText>{i18n.t("rest_modal_ad_button")}</AdButtonText>
                </AdButton>

                <RestButton
                  activeOpacity={0.85}
                  onPress={handleResetThreeMinutes}
                >
                  <RestButtonText>
                    {i18n.t("rest_modal_rest_button")}
                  </RestButtonText>
                </RestButton>
              </ButtonContainer>
            </>
          )}
        </ModalContainer>
      </Overlay>
    </Modal>
  );
}

// 스타일 컴포넌트 생략 (기존 코드 유지)
const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ModalContainer = styled.View`
  width: 85%;
  background-color: #ffffff;
  border-radius: 28px;
  padding: 28px 20px;
  align-items: center;
  elevation: 10;
`;

const Title = styled(AppText)`
  font-size: 20px;
  color: #29263d;
  margin-bottom: 8px;
  text-align: center;
`;

const Description = styled(AppText)`
  font-size: 14px;
  color: #7e7b9a;
  text-align: center;
  line-height: 20px;
  margin-bottom: 24px;
`;

const TimerContainer = styled.View`
  align-items: center;
  width: 100%;
  margin-top: 5px;
`;

const TimerText = styled(AppText)`
  font-size: 42px;
  color: #7c5cff;
  font-weight: bold;
  margin-bottom: 12px;
`;

const ButtonContainer = styled.View`
  width: 100%;
  gap: 10px;
`;

const AdButton = styled.TouchableOpacity`
  height: 52px;
  background-color: #7c5cff;
  border-radius: 26px;
  justify-content: center;
  align-items: center;
`;

const AdButtonText = styled(AppText)`
  color: #ffffff;
  font-size: 15px;
`;

const RestButton = styled.TouchableOpacity`
  height: 48px;
  background-color: #f2f5ff;
  border-radius: 24px;
  justify-content: center;
  align-items: center;
`;

const RestButtonText = styled(AppText)`
  color: #7c5cff;
  font-size: 14px;
`;

const ParentGuideImage = styled(Image)`
  width: 220px;
  height: 180px;
  margin-bottom: 12px;
`;

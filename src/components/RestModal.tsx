// import React from "react";
// import { Image, Modal } from "react-native";
// import styled from "styled-components/native";
// import { AppText } from "../utils/AppText";
// import { showRewardedAd } from "../services/RewardedAd";
// import { triggerHaptic } from "../utils/haptic";
// import { ASSETS } from "../assets/assets";
// import i18n from "../i18n"; // i18n 임포트 경로에 맞게 확인해주세요!

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
//     onRestThreeMinutes?.();
//   };

//   const handleWatchAd = () => {
//     triggerHaptic("light");
//     showRewardedAd(() => {
//       onWatchAdSuccess();
//     });
//   };

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
//           <Title>
//             {isCooltimeActive
//               ? i18n.t("rest_modal_wait_title")
//               : i18n.t("rest_modal_adult_title")}
//           </Title>

//           {isCooltimeActive ? (
//             <TimerContainer>
//               <TimerText>{formatTime(remainingCooltimeSec)}</TimerText>
//               <Description>{i18n.t("rest_modal_wait_desc")}</Description>

//               <ButtonContainer style={{ marginTop: 10 }}>
//                 <AdButton activeOpacity={0.85} onPress={handleWatchAd}>
//                   <AdButtonText>{i18n.t("rest_modal_ad_button")}</AdButtonText>
//                 </AdButton>
//               </ButtonContainer>
//             </TimerContainer>
//           ) : (
//             <>
//               <Description>{i18n.t("rest_modal_adult_desc")}</Description>

//               <ButtonContainer>
//                 <AdButton activeOpacity={0.85} onPress={handleWatchAd}>
//                   <AdButtonText>{i18n.t("rest_modal_ad_button")}</AdButtonText>
//                 </AdButton>

//                 <RestButton
//                   activeOpacity={0.85}
//                   onPress={handleResetThreeMinutes}
//                 >
//                   <RestButtonText>
//                     {i18n.t("rest_modal_rest_button")}
//                   </RestButtonText>
//                 </RestButton>
//               </ButtonContainer>
//             </>
//           )}
//         </ModalContainer>
//       </Overlay>
//     </Modal>
//   );
// }

// // 스타일 컴포넌트 생략 (기존 코드 유지)
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

import React, { useEffect, useState } from "react";
import { Image, Modal } from "react-native";
import styled from "styled-components/native";

import { AppText } from "../utils/AppText";
import { showRewardedAd } from "../services/RewardedAd";
import { triggerHaptic } from "../utils/haptic";
import { ASSETS } from "../assets/assets";
import i18n from "../i18n";

interface RestModalProps {
  visible: boolean;
  isCooltimeActive: boolean;
  remainingCooltimeSec: number;
  onRestThreeMinutes: () => void;
  onWatchAdSuccess: () => void;
}

type AdFailureReason =
  | "load_failed"
  | "show_failed"
  | "cancelled"
  | "already_showing";

export default function RestModal({
  visible,
  isCooltimeActive,
  remainingCooltimeSec,
  onRestThreeMinutes,
  onWatchAdSuccess,
}: RestModalProps) {
  const [showAdError, setShowAdError] = useState(false);
  const [adErrorReason, setAdErrorReason] =
    useState<AdFailureReason>("load_failed");
  const [isRequestingAd, setIsRequestingAd] = useState(false);

  // 모달이 닫히면 실패 화면과 요청 상태 초기화
  useEffect(() => {
    if (!visible) {
      setShowAdError(false);
      setIsRequestingAd(false);
    }
  }, [visible]);

  const handleResetThreeMinutes = () => {
    triggerHaptic("light");
    setShowAdError(false);
    onRestThreeMinutes();
  };

  // 광고 시청 요청
  const handleWatchAd = () => {
    if (isRequestingAd) return;

    triggerHaptic("light");

    setShowAdError(false);
    setIsRequestingAd(true);

    showRewardedAd((result) => {
      setIsRequestingAd(false);

      if (result.success) {
        setShowAdError(false);
        onWatchAdSuccess();
        return;
      }

      setAdErrorReason(result.reason);
      setShowAdError(true);
    });
  };

  // 실패 화면에서 돌아가기
  const handleBack = () => {
    triggerHaptic("light");
    setShowAdError(false);
  };

  const formatTime = (totalSeconds: number) => {
    const safeSeconds = Math.max(0, totalSeconds);
    const mins = Math.floor(safeSeconds / 60);
    const secs = safeSeconds % 60;

    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const getAdErrorMessage = () => {
    switch (adErrorReason) {
      case "load_failed":
        return i18n.t("rest_modal_ad_load_failed");

      case "show_failed":
        return i18n.t("rest_modal_ad_show_failed");

      case "cancelled":
        return i18n.t("rest_modal_ad_cancelled");

      case "already_showing":
        return i18n.t("rest_modal_ad_already_showing");

      default:
        return i18n.t("rest_modal_ad_load_failed");
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={handleBack}
    >
      <Overlay>
        <ParentGuideImage source={ASSETS.parentPause} resizeMode="contain" />

        <ModalContainer>
          {showAdError ? (
            // ==================================
            // 광고 실패 안내 화면
            // ==================================
            <ErrorContent>
              <ErrorIcon>
                <ErrorEmoji>☁️</ErrorEmoji>
              </ErrorIcon>

              <Title>{i18n.t("rest_modal_ad_error_title")}</Title>

              <Description>{getAdErrorMessage()}</Description>

              <ButtonContainer>
                <AdButton
                  activeOpacity={0.85}
                  onPress={handleWatchAd}
                  disabled={isRequestingAd}
                >
                  <AdButtonText>
                    {i18n.t("rest_modal_ad_retry_button")}
                  </AdButtonText>
                </AdButton>

                {!isCooltimeActive && (
                  <RestButton
                    activeOpacity={0.85}
                    onPress={handleResetThreeMinutes}
                  >
                    <RestButtonText>
                      {i18n.t("rest_modal_rest_button")}
                    </RestButtonText>
                  </RestButton>
                )}

                <BackButton activeOpacity={0.8} onPress={handleBack}>
                  <BackButtonText>
                    {i18n.t("rest_modal_ad_back_button")}
                  </BackButtonText>
                </BackButton>
              </ButtonContainer>
            </ErrorContent>
          ) : (
            // ==================================
            // 기본 휴식 화면
            // ==================================
            <>
              <Title>
                {isCooltimeActive
                  ? i18n.t("rest_modal_wait_title")
                  : i18n.t("rest_modal_adult_title")}
              </Title>

              {isCooltimeActive ? (
                <TimerContainer>
                  <TimerText>{formatTime(remainingCooltimeSec)}</TimerText>

                  <Description>{i18n.t("rest_modal_wait_desc")}</Description>

                  <ButtonContainer>
                    <AdButton
                      activeOpacity={0.85}
                      onPress={handleWatchAd}
                      disabled={isRequestingAd}
                    >
                      <AdButtonText>
                        {isRequestingAd
                          ? i18n.t("rest_modal_ad_loading")
                          : i18n.t("rest_modal_ad_button")}
                      </AdButtonText>
                    </AdButton>
                  </ButtonContainer>
                </TimerContainer>
              ) : (
                <>
                  <Description>{i18n.t("rest_modal_adult_desc")}</Description>

                  <ButtonContainer>
                    <AdButton
                      activeOpacity={0.85}
                      onPress={handleWatchAd}
                      disabled={isRequestingAd}
                    >
                      <AdButtonText>
                        {isRequestingAd
                          ? i18n.t("rest_modal_ad_loading")
                          : i18n.t("rest_modal_ad_button")}
                      </AdButtonText>
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
            </>
          )}
        </ModalContainer>
      </Overlay>
    </Modal>
  );
}

// ==================================
// STYLES
// ==================================

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
  margin-bottom: 10px;
  text-align: center;
`;

const Description = styled(AppText)`
  font-size: 14px;
  color: #7e7b9a;
  text-align: center;
  line-height: 21px;
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

const ErrorContent = styled.View`
  width: 100%;
  align-items: center;
`;

const ErrorIcon = styled.View`
  width: 66px;
  height: 66px;
  border-radius: 33px;
  background-color: #f2efff;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

const ErrorEmoji = styled(AppText)`
  font-size: 34px;
`;

const ButtonContainer = styled.View`
  width: 100%;
  gap: 10px;
`;

const AdButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  height: 52px;
  background-color: #7c5cff;
  border-radius: 26px;
  justify-content: center;
  align-items: center;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
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

const BackButton = styled.TouchableOpacity`
  height: 44px;
  justify-content: center;
  align-items: center;
`;

const BackButtonText = styled(AppText)`
  color: #aaa6bd;
  font-size: 13px;
`;

const ParentGuideImage = styled(Image)`
  width: 240px;
  height: 210px;
  align-self: center;
  margin-bottom: 12px;
`;

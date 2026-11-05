import React from "react";
import { ActivityIndicator, Image, Modal, Platform, Text } from "react-native";
import styled from "styled-components/native";
import i18n from "../i18n";
import { ASSETS } from "../assets/assets";

interface UpdateModalProps {
  visible: boolean;
  isUpdating: boolean;
  onUpdate: () => void;
  onLater: () => void;
}

export default function UpdateModal({
  visible,
  isUpdating,
  onUpdate,
  onLater,
}: UpdateModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onLater}
    >
      <Overlay>
        <ModalContainer>
          {/* 업데이트 마스코트 */}
          <UpdateMascot>
            <Image
              source={ASSETS.updateMascot}
              style={{
                width: 116,
                height: 116,
              }}
              resizeMode="contain"
            />
          </UpdateMascot>

          {/* 안내 문구 */}
          <Eyebrow>
            {i18n.t("update_modal_eyebrow", {
              defaultValue: "KIDS PLAYGROUND",
            })}
          </Eyebrow>

          <Title>
            {i18n.t("update_modal_title", {
              defaultValue: "새로운 업데이트가 있어요!",
            })}
          </Title>

          <Description>
            {i18n.t("update_modal_description", {
              defaultValue:
                "더 즐겁고 재미있는 놀이를 위해\nKids Playground를 최신 버전으로\n업데이트해 주세요.",
            })}
          </Description>

          {/* 업데이트 안내 */}
          <InfoBox>
            <InfoText>
              {i18n.t("update_modal_info_text", {
                defaultValue: "새로운 기능과 개선 사항을 만나보세요!",
              })}
            </InfoText>
          </InfoBox>

          {/* 업데이트 버튼 */}
          <UpdateButton
            onPress={onUpdate}
            disabled={isUpdating}
            isUpdating={isUpdating}
          >
            {({ pressed }) =>
              isUpdating ? (
                <LoadingRow>
                  <ActivityIndicator color="#FFFFFF" size="small" />
                  <UpdateButtonText>
                    {i18n.t("update_modal_loading", {
                      defaultValue: "업데이트 준비 중...",
                    })}
                  </UpdateButtonText>
                </LoadingRow>
              ) : (
                <UpdateButtonText style={{ opacity: pressed ? 0.86 : 1 }}>
                  {i18n.t("update_modal_update_button", {
                    defaultValue: "업데이트하기",
                  })}
                </UpdateButtonText>
              )
            }
          </UpdateButton>

          {/* 나중에 버튼 */}
          <LaterButton onPress={onLater} disabled={isUpdating}>
            <LaterButtonText isUpdating={isUpdating}>
              {i18n.t("update_modal_later_button", {
                defaultValue: "나중에 할게요",
              })}
            </LaterButtonText>
          </LaterButton>

          <Footer>
            {i18n.t("update_modal_footer", {
              defaultValue: "더 좋은 놀이 시간을 위해 준비했어요 💜",
            })}
          </Footer>
        </ModalContainer>
      </Overlay>
    </Modal>
  );
}

// Styled Components
const Overlay = styled.View`
  flex: 1;
  background-color: rgba(30, 20, 55, 0.58);
  justify-content: center;
  align-items: center;
  padding-horizontal: 24px;
`;

const ModalContainer = styled.View`
  width: 100%;
  max-width: 380px;
  background-color: #ffffff;
  border-radius: 28px;
  padding-horizontal: 26px;
  padding-top: 30px;
  padding-bottom: 24px;
  align-items: center;

  ${Platform.select({
    android: `
      elevation: 16;
    `,
    ios: `
      shadow-color: #24134B;
      shadow-offset: 0px 10px;
      shadow-opacity: 0.18;
      shadow-radius: 22px;
    `,
  })}
`;

const IconCircle = styled.View`
  width: 82px;
  height: 82px;
  border-radius: 41px;
  background-color: #f0ebff;
  justify-content: center;
  align-items: center;
  margin-bottom: 18px;
`;

const IconText = styled.Text`
  font-size: 42px;
`;

const Eyebrow = styled.Text`
  color: #8b72d9;
  font-size: 11px;
  font-weight: 850;
  letter-spacing: 2px;
  margin-bottom: 10px;
`;

const Title = styled.Text`
  color: #30234d;
  font-size: 22px;
  font-weight: 850;
  text-align: center;
  line-height: 30px;
  margin-bottom: 12px;
`;

const Description = styled.Text`
  color: #77718a;
  font-size: 14px;
  font-weight: 500;
  line-height: 23px;
  text-align: center;
`;

const InfoBox = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #f7f4ff;
  border-radius: 14px;
  padding-vertical: 14px;
  padding-horizontal: 12px;
  margin-top: 22px;
  margin-bottom: 22px;
`;
const UpdateMascot = styled.View`
  width: 124px;
  height: 124px;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
`;

const InfoIcon = styled.Text`
  font-size: 16px;
  margin-right: 7px;
`;

const InfoText = styled.Text`
  color: #68549c;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 1;
`;

interface UpdateButtonProps {
  isUpdating: boolean;
}

const UpdateButton = styled.Pressable<UpdateButtonProps>`
  width: 100%;
  min-height: 54px;
  background-color: #6741d9;
  border-radius: 17px;
  justify-content: center;
  align-items: center;
  opacity: ${({ isUpdating }) => (isUpdating ? 0.75 : 1)};
`;

const UpdateButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: 850;
`;

const LoadingRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 9px;
`;

const LaterButton = styled.Pressable`
  padding-vertical: 15px;
  padding-horizontal: 20px;
`;

interface LaterButtonTextProps {
  isUpdating: boolean;
}

const LaterButtonText = styled.Text<LaterButtonTextProps>`
  color: #8c879b;
  font-size: 13px;
  font-weight: 600;
  opacity: ${({ isUpdating }) => (isUpdating ? 0.4 : 1)};
`;

const Footer = styled.Text`
  color: #b2acbf;
  font-size: 10px;
  font-weight: 500;
  margin-top: 4px;
`;

import React from "react";
import { Modal } from "react-native";
import styled from "styled-components/native";
import { AppText } from "../utils/AppText";
import i18n from "../i18n";
import { colors } from "../design-system/tokens/colors";

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;

  // 확인 버튼을 눌렀을 때
  onClose: () => void;

  // 취소/확인 두 버튼이 필요한 경우
  showCancel?: boolean;
  onCancel?: () => void;

  // 확인 버튼에 표시할 글자
  confirmText?: string;
}

export default function CustomAlert({
  visible,
  title,
  message,
  onClose,
  showCancel = false,
  onCancel,
  confirmText = "Confirm",
}: CustomAlertProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
    >
      <Overlay>
        <AlertBox>
          <AlertTitle>{title}</AlertTitle>

          <AlertMessage>{message}</AlertMessage>

          <ButtonContainer>
            {showCancel && (
              <CancelButton onPress={onCancel} activeOpacity={0.8}>
                <CancelButtonText>{i18n.t("cancel")}</CancelButtonText>
              </CancelButton>
            )}

            <ConfirmButton onPress={onClose} activeOpacity={0.8}>
              <ConfirmButtonText>
                {i18n.t("confirm") || confirmText}
              </ConfirmButtonText>
            </ConfirmButton>
          </ButtonContainer>
        </AlertBox>
      </Overlay>
    </Modal>
  );
}

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
`;

const AlertBox = styled.View`
  width: 80%;
  max-width: 320px;
  background-color: #ffffff;
  border-radius: 24px;
  padding: 24px;
  align-items: center;
  border-width: 2px;
  border-color: #dce4ec;
`;
const AlertTitle = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.h2.fontSize}px;
  line-height: ${(props) => props.theme.typography.h2.lineHeight}px;

  color: ${colors.textGroup.primary};
  margin-bottom: 8px;
  text-align: center;
`;

const AlertMessage = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.body.fontSize}px;
  line-height: ${(props) => props.theme.typography.body.lineHeight}px;

  color: ${colors.textGroup.secondary};
  margin-bottom: 24px;
  text-align: center;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
`;

const ConfirmButton = styled.TouchableOpacity`
  flex: 1;
  min-height: 48px;
  background-color: ${colors.purple};
  padding-vertical: 12px;
  border-radius: 18px;
  align-items: center;
  justify-content: center;
  elevation: 2;
  box-shadow: 0px 3px 8px rgba(124, 92, 255, 0.25);
`;

const ConfirmButtonText = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.button.fontSize}px;
  line-height: ${(props) => props.theme.typography.button.lineHeight}px;

  color: ${colors.white};
`;

const CancelButton = styled.TouchableOpacity`
  flex: 1;
  min-height: 48px;
  background-color: ${colors.button.secondary};
  padding-vertical: 12px;
  border-radius: 18px;
  align-items: center;
  justify-content: center;
`;

const CancelButtonText = styled(AppText)`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.typography.button.fontSize}px;
  line-height: ${(props) => props.theme.typography.button.lineHeight}px;

  color: ${colors.textGroup.secondary};
`;

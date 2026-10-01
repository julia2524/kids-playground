import React from "react";
import { Modal } from "react-native";
import styled from "styled-components/native";

import { AppText } from "../utils/AppText";
import i18n from "../i18n";

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
  confirmText = "확인",
}: CustomAlertProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
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
              <ConfirmButtonText>{confirmText}</ConfirmButtonText>
            </ConfirmButton>
          </ButtonContainer>
        </AlertBox>
      </Overlay>
    </Modal>
  );
}
// --- Modal Overlay ---
export const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
`;

// --- Alert Box Surface ---
export const AlertBox = styled.View`
  width: 80%;
  max-width: 320px;
  background-color: ${({ theme }) => theme.colors.background.surface};
  border-radius: ${({ theme }) => theme.radius.xxl}px;
  padding: ${({ theme }) => theme.spacing.xl}px;
  align-items: center;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.border.default};

  /* Floating Shadow */
  shadow-color: ${({ theme }) => theme.shadows.floating.shadowColor};
  shadow-offset: ${({ theme }) => theme.shadows.floating.shadowOffset.width}px
    ${({ theme }) => theme.shadows.floating.shadowOffset.height}px;
  shadow-opacity: ${({ theme }) => theme.shadows.floating.shadowOpacity};
  shadow-radius: ${({ theme }) => theme.shadows.floating.shadowRadius}px;
  elevation: ${({ theme }) => theme.shadows.floating.elevation};
`;

// --- Typography ---
export const AlertTitle = styled(AppText)`
  font-size: ${({ theme }) => theme.typography.h3.fontSize}px;
  line-height: ${({ theme }) => theme.typography.h3.lineHeight}px;
  font-weight: ${({ theme }) => theme.typography.h3.fontWeight};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  text-align: center;
`;

export const AlertMessage = styled(AppText)`
  font-size: ${({ theme }) => theme.typography.body.fontSize}px;
  line-height: ${({ theme }) => theme.typography.body.lineHeight}px;
  font-weight: ${({ theme }) => theme.typography.body.fontWeight};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
  text-align: center;
`;

// --- Button Actions ---
export const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const ConfirmButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.button.primary};
  padding-vertical: ${({ theme }) => theme.spacing.md}px;
  padding-horizontal: ${({ theme }) => theme.spacing.xl}px;
  border-radius: ${({ theme }) => theme.radius.xl}px;
  align-items: center;

  /* Card Shadow */
  shadow-color: ${({ theme }) => theme.shadows.card.shadowColor};
  shadow-offset: ${({ theme }) => theme.shadows.card.shadowOffset.width}px
    ${({ theme }) => theme.shadows.card.shadowOffset.height}px;
  shadow-opacity: ${({ theme }) => theme.shadows.card.shadowOpacity};
  shadow-radius: ${({ theme }) => theme.shadows.card.shadowRadius}px;
  elevation: ${({ theme }) => theme.shadows.card.elevation};
`;

export const ConfirmButtonText = styled(AppText)`
  font-size: ${({ theme }) => theme.typography.button.fontSize}px;
  line-height: ${({ theme }) => theme.typography.button.lineHeight}px;
  font-weight: ${({ theme }) => theme.typography.button.fontWeight};
  color: ${({ theme }) => theme.colors.button.primaryText};
`;

export const CancelButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  padding-vertical: ${({ theme }) => theme.spacing.md}px;
  padding-horizontal: ${({ theme }) => theme.spacing.xl}px;
  border-radius: ${({ theme }) => theme.radius.xl}px;
  align-items: center;
`;

export const CancelButtonText = styled(AppText)`
  font-size: ${({ theme }) => theme.typography.button.fontSize}px;
  line-height: ${({ theme }) => theme.typography.button.lineHeight}px;
  font-weight: ${({ theme }) => theme.typography.button.fontWeight};
  color: ${({ theme }) => theme.colors.button.secondaryText};
`;

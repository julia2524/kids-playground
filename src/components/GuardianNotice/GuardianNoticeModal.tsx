import React from "react";
import { Modal, Pressable } from "react-native";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import i18n from "../../i18n";
import { AppText } from "../../utils/AppText";
import { useLanguage } from "../../context/LangaugeContext";

interface GuardianNoticeModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function GuardianNoticeModal({
  visible,
  onClose,
}: GuardianNoticeModalProps) {
  useLanguage();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Overlay>
        <NoticeCard>
          {/* ==========================================
              Header
          ========================================== */}

          <Header>
            <Title>{i18n.t("guardian_notice_title")}</Title>

            <CloseButton
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="닫기"
            >
              <Ionicons name="close" size={26} color="#90A4AE" />
            </CloseButton>
          </Header>

          {/* ==========================================
              Content
          ========================================== */}

          <Content>
            <NoticeText>{i18n.t("guardian_notice_p1")}</NoticeText>

            <NoticeText>{i18n.t("guardian_notice_p2")}</NoticeText>

            <NoticeText>{i18n.t("guardian_notice_p3")}</NoticeText>

            <GuideText>{i18n.t("guardian_notice_guide")}</GuideText>

            {/* ========================================
                설정 안내
            ======================================== */}

            <SettingGuideBox>
              <SettingIcon>
                <Ionicons name="settings-outline" size={18} color="#5C6BC0" />
              </SettingIcon>
              <SettingGuideText>
                <SettingGuideNormal>
                  {i18n.t("guardian_notice_setting_1")}

                  <SettingGuideBold>
                    {i18n.t("guardian_notice_setting_2")}
                  </SettingGuideBold>
                </SettingGuideNormal>
              </SettingGuideText>
              {/* <SettingGuideText>
                <SettingGuideNormal>
                  {i18n.t("guardian_notice_setting_1")}
                </SettingGuideNormal>

                <SettingGuideBold>
                  {i18n.t("guardian_notice_setting_2")}
                </SettingGuideBold>
              </SettingGuideText> */}
            </SettingGuideBox>
          </Content>

          {/* ==========================================
              Confirm
          ========================================== */}

          <ConfirmButton onPress={onClose} accessibilityRole="button">
            <ConfirmText>{i18n.t("confirm")}</ConfirmText>
          </ConfirmButton>
        </NoticeCard>
      </Overlay>
    </Modal>
  );
}

/* ==================================================
   Overlay
================================================== */

const Overlay = styled.View`
  flex: 1;

  background-color: rgba(0, 0, 0, 0.45);

  align-items: center;
  justify-content: center;

  padding: 24px;
`;

/* ==================================================
   Notice Card
================================================== */

const NoticeCard = styled.View`
  width: 100%;
  max-width: 360px;

  background-color: #ffffff;

  border-radius: 24px;

  padding: 24px;

  elevation: 10;

  shadow-color: #000000;
  shadow-opacity: 0.15;
  shadow-radius: 16px;
  shadow-offset: 0px 6px;
`;

/* ==================================================
   Header
================================================== */

const Header = styled.View`
  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  margin-bottom: 18px;
`;

const Title = styled(AppText)`
  flex: 1;

  font-size: 22px;
  font-weight: 700;

  color: #263238;
`;

const CloseButton = styled(Pressable)`
  width: 36px;
  height: 36px;

  margin-left: 8px;

  align-items: center;
  justify-content: center;
`;

/* ==================================================
   Content
================================================== */

const Content = styled.View`
  margin-bottom: 20px;
`;

const NoticeText = styled(AppText)`
  font-size: 15px;
  line-height: 23px;

  color: #455a64;

  margin-bottom: 14px;
`;

const GuideText = styled(AppText)`
  font-size: 13px;
  line-height: 20px;

  color: #78909c;

  margin-top: 2px;
  margin-bottom: 16px;
`;

/* ==================================================
   Setting Guide
================================================== */

const SettingGuideBox = styled.View`
  flex-direction: row;

  align-items: flex-start;

  background-color: #f7f8fa;

  border-radius: 14px;

  padding: 13px 14px;
`;

const SettingIcon = styled.View`
  width: 26px;

  align-items: center;

  margin-right: 7px;

  padding-top: 3px;
`;

const SettingGuideText = styled.View`
  flex: 1;
`;

const SettingGuideNormal = styled(AppText)`
  font-size: 13px;
  line-height: 20px;

  color: #78909c;
`;

const SettingGuideBold = styled(AppText)`
  font-size: 13px;
  line-height: 20px;

  font-weight: 700;

  color: #5c6bc0;
`;

/* ==================================================
   Confirm Button
================================================== */

const ConfirmButton = styled(Pressable)`
  height: 50px;

  border-radius: 16px;

  align-items: center;
  justify-content: center;

  background-color: #5c6bc0;
`;

const ConfirmText = styled(AppText)`
  font-size: 16px;
  font-weight: 700;

  color: #ffffff;
`;

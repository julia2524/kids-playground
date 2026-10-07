import React from "react";

import { Modal, Pressable, useWindowDimensions } from "react-native";

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

  // ==========================================================
  // 현재 화면 크기
  // ==========================================================

  const { width, height } = useWindowDimensions();

  // ==========================================================
  // Modal Responsive Scale
  //
  // 정상 화면에서는 기존 디자인 크기 유지
  // 화면이 작아질 때만 조금씩 축소
  // ==========================================================

  const widthScale = width / 360;
  const heightScale = height / 700;

  const scale = Math.min(1, widthScale, heightScale);

  // 너무 작아지는 것도 방지
  const modalScale = Math.max(0.78, scale);

  // ==========================================================
  // Responsive Values
  // ==========================================================

  const cardPadding = 24 * modalScale;

  const titleSize = 22 * modalScale;

  const noticeFontSize = 15 * modalScale;
  const noticeLineHeight = 23 * modalScale;

  const guideFontSize = 13 * modalScale;
  const guideLineHeight = 20 * modalScale;

  const settingFontSize = 13 * modalScale;
  const settingLineHeight = 20 * modalScale;

  const confirmHeight = 50 * modalScale;
  const confirmFontSize = 16 * modalScale;

  const closeButtonSize = 36 * modalScale;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Overlay>
        <NoticeCard padding={cardPadding} scale={modalScale}>
          {/* ==========================================
              Header
          ========================================== */}

          <Header scale={modalScale}>
            <Title fontSize={titleSize} lineHeight={titleSize * 1.25}>
              {i18n.t("guardian_notice_title")}
            </Title>

            <CloseButton
              size={closeButtonSize}
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="닫기"
            >
              <Ionicons name="close" size={26 * modalScale} color="#90A4AE" />
            </CloseButton>
          </Header>

          {/* ==========================================
              Content
          ========================================== */}

          <Content scale={modalScale}>
            <NoticeText fontSize={noticeFontSize} lineHeight={noticeLineHeight}>
              {i18n.t("guardian_notice_p1")}
            </NoticeText>

            <NoticeText fontSize={noticeFontSize} lineHeight={noticeLineHeight}>
              {i18n.t("guardian_notice_p2")}
            </NoticeText>

            <NoticeText fontSize={noticeFontSize} lineHeight={noticeLineHeight}>
              {i18n.t("guardian_notice_p3")}
            </NoticeText>

            <GuideText fontSize={guideFontSize} lineHeight={guideLineHeight}>
              {i18n.t("guardian_notice_guide")}
            </GuideText>

            {/* ========================================
                설정 안내
            ======================================== */}

            <SettingGuideBox
              paddingVertical={13 * modalScale}
              paddingHorizontal={14 * modalScale}
            >
              <SettingIcon width={26 * modalScale} marginRight={7 * modalScale}>
                <Ionicons
                  name="settings-outline"
                  size={18 * modalScale}
                  color="#5C6BC0"
                />
              </SettingIcon>

              <SettingGuideText>
                <SettingGuideNormal
                  fontSize={settingFontSize}
                  lineHeight={settingLineHeight}
                >
                  {i18n.t("guardian_notice_setting_1")}

                  <SettingGuideBold
                    fontSize={settingFontSize}
                    lineHeight={settingLineHeight}
                  >
                    {i18n.t("guardian_notice_setting_2")}
                  </SettingGuideBold>
                </SettingGuideNormal>
              </SettingGuideText>
            </SettingGuideBox>
          </Content>

          {/* ==========================================
              Confirm
          ========================================== */}

          <ConfirmButton
            height={confirmHeight}
            borderRadius={16 * modalScale}
            onPress={onClose}
            accessibilityRole="button"
          >
            <ConfirmText fontSize={confirmFontSize}>
              {i18n.t("confirm")}
            </ConfirmText>
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

const NoticeCard = styled.View<{
  padding: number;
  scale: number;
}>`
  width: 100%;
  max-width: 360px;

  background-color: #ffffff;

  border-radius: ${(p) => 24 * p.scale}px;

  padding: ${(p) => p.padding}px;

  elevation: 10;

  shadow-color: #000000;
  shadow-opacity: 0.15;
  shadow-radius: 16px;
  shadow-offset: 0px 6px;
`;

/* ==================================================
   Header
================================================== */

const Header = styled.View<{
  scale: number;
}>`
  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  margin-bottom: ${(p) => 18 * p.scale}px;
`;

const Title = styled(AppText)<{
  fontSize: number;
  lineHeight: number;
}>`
  flex: 1;

  font-size: ${(p) => p.fontSize}px;
  line-height: ${(p) => p.lineHeight}px;

  font-weight: 700;

  color: #263238;
`;

const CloseButton = styled(Pressable)<{
  size: number;
}>`
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;

  margin-left: ${(p) => 8 * (p.size / 36)}px;

  align-items: center;
  justify-content: center;
`;

/* ==================================================
   Content
================================================== */

const Content = styled.View<{
  scale: number;
}>`
  margin-bottom: ${(p) => 20 * p.scale}px;
`;

const NoticeText = styled(AppText)<{
  fontSize: number;
  lineHeight: number;
}>`
  font-size: ${(p) => p.fontSize}px;
  line-height: ${(p) => p.lineHeight}px;

  color: #455a64;

  margin-bottom: ${(p) => 14 * (p.fontSize / 15)}px;
`;

const GuideText = styled(AppText)<{
  fontSize: number;
  lineHeight: number;
}>`
  font-size: ${(p) => p.fontSize}px;
  line-height: ${(p) => p.lineHeight}px;

  color: #78909c;

  margin-top: ${(p) => 2 * (p.fontSize / 13)}px;
  margin-bottom: ${(p) => 16 * (p.fontSize / 13)}px;
`;

/* ==================================================
   Setting Guide
================================================== */

const SettingGuideBox = styled.View<{
  paddingVertical: number;
  paddingHorizontal: number;
}>`
  flex-direction: row;

  align-items: flex-start;

  background-color: #f7f8fa;

  border-radius: 14px;

  padding-top: ${(p) => p.paddingVertical}px;
  padding-bottom: ${(p) => p.paddingVertical}px;

  padding-left: ${(p) => p.paddingHorizontal}px;
  padding-right: ${(p) => p.paddingHorizontal}px;
`;

const SettingIcon = styled.View<{
  width: number;
  marginRight: number;
}>`
  width: ${(p) => p.width}px;

  align-items: center;

  margin-right: ${(p) => p.marginRight}px;

  padding-top: 3px;
`;

const SettingGuideText = styled.View`
  flex: 1;
`;

const SettingGuideNormal = styled(AppText)<{
  fontSize: number;
  lineHeight: number;
}>`
  font-size: ${(p) => p.fontSize}px;
  line-height: ${(p) => p.lineHeight}px;

  color: #78909c;
`;

const SettingGuideBold = styled(AppText)<{
  fontSize: number;
  lineHeight: number;
}>`
  font-size: ${(p) => p.fontSize}px;
  line-height: ${(p) => p.lineHeight}px;

  font-weight: 700;

  color: #5c6bc0;
`;

/* ==================================================
   Confirm Button
================================================== */

const ConfirmButton = styled(Pressable)<{
  height: number;
  borderRadius: number;
}>`
  height: ${(p) => p.height}px;

  border-radius: ${(p) => p.borderRadius}px;

  align-items: center;
  justify-content: center;

  background-color: #5c6bc0;
`;

const ConfirmText = styled(AppText)<{
  fontSize: number;
}>`
  font-size: ${(p) => p.fontSize}px;

  font-weight: 700;

  color: #ffffff;
`;

// import {
//   Text as RNText,
//   TextProps,
//   TextInput,
//   TextInputProps,
// } from "react-native";

// export function AppText(props: TextProps) {
//   return <RNText allowFontScaling={false} {...props} />;
// }

// export function AppTextInput(props: TextInputProps) {
//   return <TextInput allowFontScaling={false} {...props} />;
// }

import React from "react";
import {
  Text as RNText,
  TextProps,
  TextInput,
  TextInputProps,
  StyleSheet,
} from "react-native";
import i18n from "../i18n"; // i18n 상대 경로에 맞춰 확인해 주세요!

/**
 * 현재 i18n.locale에 따라 동적으로 fontFamily 반환
 */
export const getDynamicFontFamily = (): string => {
  const lang = i18n.locale || "en";
  if (lang.startsWith("zh")) return "ZCOOLKuaiLe";
  if (lang.startsWith("ko")) return "Jua";
  return "Fredoka"; // 기본 영문
};

export function AppText({ style, ...props }: TextProps) {
  const fontFamily = getDynamicFontFamily();

  return (
    <RNText
      allowFontScaling={false}
      style={[{ fontFamily }, style]} // 💡 기본 fontFamily에 외부 style을 병합
      {...props}
    />
  );
}

export function AppTextInput({ style, ...props }: TextInputProps) {
  const fontFamily = getDynamicFontFamily();

  return (
    <TextInput
      allowFontScaling={false}
      style={[{ fontFamily }, style]} // 💡 기본 fontFamily에 외부 style을 병합
      {...props}
    />
  );
}

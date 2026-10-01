import {
  Text as RNText,
  TextProps,
  TextInput,
  TextInputProps,
} from "react-native";

export function AppText(props: TextProps) {
  return <RNText allowFontScaling={false} {...props} />;
}

export function AppTextInput(props: TextInputProps) {
  return <TextInput allowFontScaling={false} {...props} />;
}

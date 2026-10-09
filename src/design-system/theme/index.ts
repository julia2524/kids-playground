import { colors } from "../tokens/colors";
import { typography } from "../tokens/typography";
import { spacing } from "../tokens/spacing";
import { radius } from "../tokens/radius";
import { shadows } from "../tokens/shadows";
import { motion } from "../tokens/motion";

export const theme = {
  fontFamily: "Pretendard-Bold", // 👈 사용하는 기본 폰트명 추가
  colors,
  typography,
  spacing,
  radius,
  shadows,
  motion,
};

export type AppTheme = typeof theme;

// styled-components 모듈 확장
declare module "styled-components/native" {
  export interface DefaultTheme extends AppTheme {}
}

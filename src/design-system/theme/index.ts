import { colors } from "../tokens/colors";
import { getTypography, getFontFamily } from "../tokens/typography";
import { spacing } from "../tokens/spacing";
import { radius } from "../tokens/radius";
import { shadows } from "../tokens/shadows";
import { motion } from "../tokens/motion";

export const theme = {
  // 💡 getter를 사용해 조회 시점에 실시간 동적 반환
  get fontFamily() {
    return getFontFamily();
  },
  get typography() {
    return getTypography();
  },
  colors,
  spacing,
  radius,
  shadows,
  motion,
};

export type AppTheme = typeof theme;

// styled-components 타입 확장
declare module "styled-components/native" {
  export interface DefaultTheme extends AppTheme {}
}

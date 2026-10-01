import { colors } from "../tokens/colors";
import { typography } from "../tokens/typography";
import { spacing } from "../tokens/spacing";
import { radius } from "../tokens/radius";
import { shadows } from "../tokens/shadows";
import { motion } from "../tokens/motion";

export const theme = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  motion,
};

export type AppTheme = typeof theme;

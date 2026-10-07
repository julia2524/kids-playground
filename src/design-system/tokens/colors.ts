// theme/colors.ts (또는 design-system/colors.ts)

export const colors = {
  // Brand Colors (포인트 색상)
  purple: "#7C5CFF",
  blue: "#4D8DFF",
  pink: "#FF6FAE",
  yellow: "#FFD95A",
  mint: "#55D6BE",

  // Pure Colors
  white: "#FFFFFF",
  black: "#000000",

  // Soft Background Accent Colors
  softBlue: "#EEF6FF",
  softPink: "#FFF1F7",
  softYellow: "#FFF8DD",
  softMint: "#E9FBF6",

  // Neutral & Text Colors
  background: "#F5F2FF",
  text: "#29263D",
  secondaryText: "#68657A",
  muted: "#9C99AA",

  // Semantic Structure (확장성을 위한 구조화)
  brand: {
    primary: "#7C5CFF",
    blue: "#4D8DFF",
    pink: "#FF6FAE",
    yellow: "#FFD95A",
    mint: "#55D6BE",
  },
  textGroup: {
    primary: "#29263D",
    secondary: "#68657A",
    muted: "#9C99AA",
    inverse: "#FFFFFF",
  },
  button: {
    primary: "#7C5CFF",
    primaryText: "#FFFFFF",
    secondary: "#F2EFFD",
    secondaryText: "#29263D",
    disabled: "#E6E1F4",
    disabledText: "#9C99AA",
  },
  feedback: {
    success: "#35C98B",
    successSoft: "#E7FAF2",
    retry: "#FFB84D",
    retrySoft: "#FFF5E3",
    error: "#FF7A7A",
    errorSoft: "#FFF0F0",
    info: "#65A8FF",
    infoSoft: "#EDF5FF",
  },
  border: {
    default: "#E6E1F4",
    strong: "#B7B0DD",
    dashed: "#D8D2F1",
  },
} as const;

// 하위 호환성을 위한 대문자 Alias (기존 COLORS 사용처 호환)
export const COLORS = colors;

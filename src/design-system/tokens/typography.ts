// src/design-system/tokens/typography.ts (또는 해당 경로)

export const typography = {
  display: { fontSize: 32, lineHeight: 40, fontWeight: "900" as const },
  h1: { fontSize: 28, lineHeight: 36, fontWeight: "900" as const },
  h2: { fontSize: 24, lineHeight: 32, fontWeight: "800" as const },
  h3: { fontSize: 20, lineHeight: 28, fontWeight: "800" as const },

  bodyLarge: { fontSize: 18, lineHeight: 26, fontWeight: "700" as const },
  body: { fontSize: 16, lineHeight: 22, fontWeight: "600" as const },
  bodySmall: { fontSize: 14, lineHeight: 20, fontWeight: "500" as const },

  button: { fontSize: 18, lineHeight: 24, fontWeight: "800" as const },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: "600" as const },

  // 레거시/구버전 코드 호환용 (혹시 구식 키값을 부르는 곳이 있을까 봐 맵핑)
  heading: 24,
  subheading: 20,
  small: 14,

  // 게임 특화 타이포그래피
  gameQuestion: { fontSize: 24, lineHeight: 32, fontWeight: "900" as const },
  learningTitle: { fontSize: 28, lineHeight: 36, fontWeight: "900" as const },
};

export type Typography = typeof typography;

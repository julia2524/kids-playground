// // src/design-system/tokens/typography.ts (또는 해당 경로)

// export const typography = {
//   display: { fontSize: 32, lineHeight: 40, fontWeight: "900" as const },
//   h1: { fontSize: 28, lineHeight: 36, fontWeight: "900" as const },
//   h2: { fontSize: 24, lineHeight: 32, fontWeight: "800" as const },
//   h3: { fontSize: 20, lineHeight: 28, fontWeight: "800" as const },

//   bodyLarge: { fontSize: 18, lineHeight: 26, fontWeight: "700" as const },
//   body: { fontSize: 16, lineHeight: 22, fontWeight: "600" as const },
//   bodySmall: { fontSize: 14, lineHeight: 20, fontWeight: "500" as const },

//   button: { fontSize: 18, lineHeight: 24, fontWeight: "800" as const },
//   caption: { fontSize: 13, lineHeight: 18, fontWeight: "600" as const },

//   // 레거시/구버전 코드 호환용 (혹시 구식 키값을 부르는 곳이 있을까 봐 맵핑)
//   heading: 24,
//   subheading: 20,
//   small: 14,

//   // 게임 특화 타이포그래피
//   gameQuestion: { fontSize: 24, lineHeight: 32, fontWeight: "900" as const },
//   learningTitle: { fontSize: 28, lineHeight: 36, fontWeight: "900" as const },
// };

// export type Typography = typeof typography;
import i18n from "../../i18n"; // i18n 상대 경로 확인!

// 1. 언어별 폰트 패밀리 분기
export const getFontFamily = (): string => {
  const lang = i18n.locale || "en";
  if (lang.startsWith("zh")) return "ZCOOLKuaiLe";
  if (lang.startsWith("ko")) return "Jua";
  return "Fredoka"; // 기본 영문
};

// 2. 타이포그래피 토큰 정의
export const getTypography = () => {
  const fontFamily = getFontFamily();

  // 반복을 줄이기 위한 베이스 객체 생성
  const fontStyle = (
    fontSize: number,
    lineHeight: number,
    fontWeight: "500" | "600" | "700" | "800" | "900",
  ) => ({
    fontFamily,
    fontSize,
    lineHeight,
    fontWeight,
  });

  return {
    fontFamily,

    display: fontStyle(32, 40, "900"),
    h1: fontStyle(28, 36, "900"),
    h2: fontStyle(24, 32, "800"),
    h3: fontStyle(20, 28, "800"),

    bodyLarge: fontStyle(18, 26, "700"),
    body: fontStyle(16, 22, "600"),
    bodySmall: fontStyle(14, 20, "500"),

    button: fontStyle(18, 24, "800"),
    caption: fontStyle(13, 18, "600"),

    // 레거시 호환용
    heading: 24,
    subheading: 20,
    small: 14,

    // 게임 특화 타이포그래피
    gameQuestion: fontStyle(24, 32, "900"),
    learningTitle: fontStyle(28, 36, "900"),
  };
};

export type Typography = ReturnType<typeof getTypography>;

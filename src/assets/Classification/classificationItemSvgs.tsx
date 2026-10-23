import React from "react";
import Svg, {
  Circle,
  Ellipse,
  Path,
  Rect,
  Polygon,
  Line,
  G,
} from "react-native-svg";
import { COLOR_SORTING_COLORS } from "../../data/classification/colorSortingColors";
import { ColorSortingObject } from "../../types/Classification/Color/colorSotringTypes";
import { ClassificationColorId } from "../../types/game";
import { ShapeSortingObject } from "../../generators/classification/generateShapeSortingProblem";
import { CategorySortingObject } from "../../generators/classification/generateCategorySortingProblem";
import { SizeSortingObject } from "../../generators/classification/generateSizeSortingProblem";

/**
 * ===============================================
 *  유아 분류게임용 아이콘 세트 (colorHex 단일 prop 버전)
 *  - 기존 RenderCategoryItemSvg 가 <ItemComponent colorHex={finalColor} /> 로
 *    호출하는 구조에 맞춰, 모든 컴포넌트는 colorHex 하나만 받습니다.
 *  - 내부적으로 shade()/contrastAccent() 헬퍼가 colorHex를 밝게/어둡게 변형해서
 *    그림자·포인트 색을 자동으로 만들어냅니다. (별도 secondary/accent prop 불필요)
 *  - 잎/부리/타이어처럼 색이 원래 고정인 부분은 하드코딩된 상수를 그대로 씁니다.
 * ===============================================
 */

export const OUTLINE = "#333";
export const DARK = "#222";
export const WHITE = "#fff";

export const DEFAULT_COLOR = "#FFD166";

export interface ItemSvgProps {
  colorHex?: string;

  primary?: string;
  secondary?: string;
  accent?: string;

  pattern?: "spots" | "stripes" | "patches";

  size?: number;
}

/* ---------- 색상 헬퍼 ---------- */

const clampByte = (v: number) => Math.max(0, Math.min(255, Math.round(v)));

const toRgb = (hex: string) => {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const num = parseInt(full, 16) || 0;
  return { r: (num >> 16) & 0xff, g: (num >> 8) & 0xff, b: num & 0xff };
};

const toHex = (r: number, g: number, b: number) =>
  `#${((1 << 24) + (clampByte(r) << 16) + (clampByte(g) << 8) + clampByte(b))
    .toString(16)
    .slice(1)}`;

// colorHex를 밝게(percent 양수) / 어둡게(percent 음수) 만들어줌 (-1 ~ 1)
export const shade = (hex: string, percent: number) => {
  const { r, g, b } = toRgb(hex);
  if (percent >= 0) {
    return toHex(
      r + (255 - r) * percent,
      g + (255 - g) * percent,
      b + (255 - b) * percent,
    );
  }
  const p = 1 + percent;
  return toHex(r * p, g * p, b * p);
};

const getLuminance = (hex: string) => {
  const { r, g, b } = toRgb(hex);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
};

// colorHex가 밝으면 어두운 포인트색, 어두우면 밝은 포인트색 (눈/코/바퀴 등 가시성 확보용)
export const contrastAccent = (
  hex: string,
  dark = "#4A4A4A",
  light = "#FAFAFA",
) => (getLuminance(hex) > 0.65 ? dark : light);

/* =========================================================
 * 🐾 ANIMAL
 * ======================================================= */
export const Dog = ({
  colorHex = "#FAFAFA",
  primary,
  secondary,
  accent,
  pattern,
  size = 95,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const secondaryColor = secondary ?? shade(mainColor, -0.15);
  const accentColor = accent ?? contrastAccent(mainColor);

  const noseColor = contrastAccent(mainColor, "#5D4037", "#F5F5F5");

  const spotColor = secondaryColor;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* =====================================================
          강아지 머리
      ===================================================== */}
      <Path
        d="
          M32 25
          C45 25 55 25 68 25
          C78 25 83 33 80 50
          C77 67 70 85 50 85
          C30 85 23 67 20 50
          C17 33 22 25 32 25
          Z
        "
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* =====================================================
          귀 (너비를 양쪽 모두 2씩 줄임)
      ===================================================== */}
      {/* =====================================================
    귀 (가로 폭만 줄임)
===================================================== */}

      {/* 왼쪽 귀 */}
      <Path
        d="
    M29 25
    C21 25 14 30 12 41
    C10 51 12 61 16 66
    C20 70 23 66 27 60
    C31 53 33 43 34 32
    C34 27 32 25 29 25
    Z
  "
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 오른쪽 귀 */}
      <Path
        d="
    M71 25
    C79 25 86 30 88 41
    C90 51 88 61 84 66
    C80 70 77 66 73 60
    C69 53 67 43 66 32
    C66 27 68 25 71 25
    Z
  "
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 귀 안쪽 - 왼쪽 */}
      <Path
        d="
    M28 31
    C22 32 18 37 17 44
    C16 51 18 56 20 58
    C22 59 25 54 28 49
    C30 43 31 36 30 32
    C30 31 29 31 28 31
    Z
  "
        fill={secondaryColor}
        opacity="0.55"
      />

      {/* 귀 안쪽 - 오른쪽 */}
      <Path
        d="
    M72 31
    C78 32 82 37 83 44
    C84 51 82 56 80 58
    C78 59 75 54 72 49
    C70 43 69 36 70 32
    C70 31 71 31 72 31
    Z
  "
        fill={secondaryColor}
        opacity="0.55"
      />

      {/* =====================================================
          무늬
      ===================================================== */}

      {pattern === "spots" && (
        <G opacity="0.9">
          <Circle cx="32" cy="34" r="5.5" fill={spotColor} />

          <Circle cx="68" cy="63" r="6.5" fill={spotColor} />

          <Circle cx="67" cy="31" r="4" fill={spotColor} />
        </G>
      )}

      {pattern === "patches" && (
        <G opacity="0.9">
          {/* 눈 주변 패치 */}
          <Path
            d="
              M27 38
              C28 31 35 27 41 30
              C46 33 46 40 42 45
              C38 49 31 48 28 44
              C27 42 26 40 27 38
              Z
            "
            fill={spotColor}
          />

          {/* 아래쪽 패치 */}
          <Path
            d="
              M59 66
              C61 60 67 57 72 60
              C77 63 77 69 73 73
              C69 77 62 75 60 71
              C59 69 58 68 59 66
              Z
            "
            fill={spotColor}
          />
        </G>
      )}

      {pattern === "stripes" && (
        <G
          opacity="0.7"
          stroke={spotColor}
          strokeWidth="3"
          strokeLinecap="round"
        >
          <Path d="M27 43 Q32 45 37 44" />
          <Path d="M27 50 Q32 52 37 51" />

          <Path d="M63 44 Q68 45 73 43" />
          <Path d="M63 51 Q68 52 73 50" />
        </G>
      )}

      {/* =====================================================
          눈
      ===================================================== */}

      <Circle cx="39" cy="46" r="4" fill={DARK} />

      <Circle cx="61" cy="46" r="4" fill={DARK} />

      {/* 눈 반짝임 */}
      <Circle cx="40" cy="45" r="1.2" fill={WHITE} />

      <Circle cx="62" cy="45" r="1.2" fill={WHITE} />

      {/* =====================================================
          주둥이
      ===================================================== */}

      <Ellipse cx="50" cy="63" rx="13" ry="10" fill="#F3D5C0" />

      {/* =====================================================
          코
      ===================================================== */}

      <Path
        d="
          M44.5 59
          Q50 55
          55.5 59
          Q55 64
          50 64
          Q45 64
          44.5 59
          Z
        "
        fill={noseColor}
      />

      {/* 코 하이라이트 */}
      <Ellipse cx="48" cy="59" rx="1.4" ry="0.9" fill={WHITE} opacity="0.8" />

      {/* =====================================================
          입
      ===================================================== */}

      <Path
        d="M50 63 Q50 67 50 69"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="2.3"
        strokeLinecap="round"
      />

      <Path
        d="M50 68 Q46 71 42 69"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="2.3"
        strokeLinecap="round"
      />

      <Path
        d="M50 68 Q54 71 58 69"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="2.3"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export const Cat = ({
  colorHex = "#FFB74D",
  primary,
  secondary,
  accent,
  pattern,
  size = 95,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const secondaryColor = secondary ?? shade(mainColor, -0.15);
  const accentColor = accent ?? contrastAccent(mainColor);

  const earInner = secondaryColor;
  const whisker = contrastAccent(mainColor, "#4A4A4A", "#F5F5F5");
  const markColor = accentColor;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 전체 고양이 요소를 Y축 아래 방향으로 이동 */}
      <G transform="translate(0, 5)">
        {/* 바깥 귀 (왼쪽, 오른쪽) */}
        <Polygon
          points="22,44 34,12 46,44"
          fill={mainColor}
          stroke={OUTLINE}
          strokeWidth="4"
          strokeLinejoin="round"
        />

        <Polygon
          points="78,44 66,12 54,44"
          fill={mainColor}
          stroke={OUTLINE}
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* 안쪽 귀 (왼쪽, 오른쪽) */}
        <Polygon points="27,40 34,20 41,40" fill={earInner} opacity="0.8" />

        <Polygon points="73,40 66,20 59,40" fill={earInner} opacity="0.8" />

        {/* 머리: 타원형 */}
        <Ellipse
          cx="50"
          cy="58"
          rx="32"
          ry="25"
          fill={mainColor}
          stroke={OUTLINE}
          strokeWidth="4"
        />

        {pattern === "patches" && (
          <G opacity="0.9">
            <Circle cx="28" cy="50" r="7.5" fill={secondaryColor} />
            <Circle cx="68" cy="64" r="8" fill={secondaryColor} />
          </G>
        )}

        {pattern === "stripes" && (
          <G
            stroke={accentColor}
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.8"
          >
            <Line x1="26" y1="44" x2="34" y2="36" />
            <Line x1="30" y1="54" x2="40" y2="48" />
            <Line x1="74" y1="44" x2="66" y2="36" />
            <Line x1="70" y1="54" x2="60" y2="48" />
          </G>
        )}

        {/* 눈 */}
        <Circle cx="38" cy="55" r="3.5" fill={DARK} />
        <Circle cx="62" cy="55" r="3.5" fill={DARK} />

        {/* 코 */}
        <Polygon
          points="50,61 46,66 54,66"
          fill={accentColor}
          stroke={OUTLINE}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* 입 */}
        <Path
          d="M50 66 Q46 71 41 69 M50 66 Q54 71 59 69"
          fill="none"
          stroke={OUTLINE}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* 수염 (왼쪽) */}
        <Line
          x1="10"
          y1="59"
          x2="26"
          y2="57"
          stroke={whisker}
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        <Line
          x1="10"
          y1="65"
          x2="26"
          y2="65"
          stroke={whisker}
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* 수염 (오른쪽) */}
        <Line
          x1="90"
          y1="59"
          x2="74"
          y2="57"
          stroke={whisker}
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        <Line
          x1="90"
          y1="65"
          x2="74"
          y2="65"
          stroke={whisker}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </G>
    </Svg>
  );
};
export const Rabbit = ({
  colorHex = "#FAFAFA",
  primary,
  secondary,
  accent,
  pattern,
  size = 95,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const secondaryColor = secondary ?? shade(mainColor, -0.15);
  const accentColor = accent ?? contrastAccent(mainColor);

  const earInner = secondaryColor;
  const whisker = contrastAccent(mainColor, "#4A4A4A", "#F5F5F5");

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* translate(0, 8) -> translate(0, 14)로 조정하여 전체 요소를 아래로 이동 */}
      <G transform="translate(0, 14)">
        {/* 왼쪽 귀 */}
        <Ellipse
          cx="36"
          cy="24"
          rx="9"
          ry="25"
          fill={mainColor}
          stroke={OUTLINE}
          strokeWidth="4"
          transform="rotate(-12 36 24)"
        />

        <Ellipse
          cx="36"
          cy="24"
          rx="4.5"
          ry="18"
          fill={earInner}
          transform="rotate(-12 36 24)"
        />

        {/* 오른쪽 귀 */}
        <Ellipse
          cx="64"
          cy="24"
          rx="9"
          ry="25"
          fill={mainColor}
          stroke={OUTLINE}
          strokeWidth="4"
          transform="rotate(12 64 24)"
        />

        <Ellipse
          cx="64"
          cy="24"
          rx="4.5"
          ry="18"
          fill={earInner}
          transform="rotate(12 64 24)"
        />

        {/* [상단 평평한 볼통통 둥근 사다리꼴 머리] */}
        <Path
          d="
            M 42,38
            C 45,36.8 55,36.8 58,38

            C 68,41 84,52 83,65
            C 82,78 68,82 50,82
            C 32,82 18,78 17,65
            C 16,52 32,41 42,38

            Z
          "
          fill={mainColor}
          stroke={OUTLINE}
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {pattern === "spots" && (
          <G opacity="0.85">
            <Circle cx="28" cy="54" r="6" fill={secondaryColor} />
            <Circle cx="70" cy="65" r="5" fill={secondaryColor} />
          </G>
        )}

        {/* 눈 & 반사광 */}
        <Circle cx="38" cy="56" r="4" fill={DARK} />
        <Circle cx="62" cy="56" r="4" fill={DARK} />

        <Circle cx="39" cy="55" r="1.3" fill={WHITE} />
        <Circle cx="63" cy="55" r="1.3" fill={WHITE} />

        {/* 코 */}
        <Ellipse
          cx="50"
          cy="64"
          rx="4"
          ry="3"
          fill={accentColor}
          stroke={OUTLINE}
          strokeWidth="1.5"
        />

        {/* 입 */}
        <Path
          d="M50 67 Q46 72 41 70 M50 67 Q54 72 59 70"
          fill="none"
          stroke={OUTLINE}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* 수염 (왼쪽) */}
        <Line
          x1="9"
          y1="61"
          x2="25"
          y2="59"
          stroke={whisker}
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        <Line
          x1="9"
          y1="67"
          x2="25"
          y2="66"
          stroke={whisker}
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        {/* 수염 (오른쪽) */}
        <Line
          x1="91"
          y1="61"
          x2="75"
          y2="59"
          stroke={whisker}
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        <Line
          x1="91"
          y1="67"
          x2="75"
          y2="66"
          stroke={whisker}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </G>
    </Svg>
  );
};

export const Chicken = ({
  colorHex = "#FAFAFA",
  primary,
  secondary,
  accent,
  pattern,
  size = 95,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const secondaryColor = secondary ?? shade(mainColor, -0.15);
  const accentColor = accent ?? "#E53935";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Ellipse
        cx="50"
        cy="65"
        rx="28"
        ry="22"
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />
      <Path
        d="M 52 70 C 52 61 39 58 31 64 C 26 68 26 72 31 76 C 39 82 52 79 52 70 Z"
        fill={secondaryColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
      />
      {/* <Ellipse
        cx="37"
        cy="66"
        rx="9"
        ry="14"
        fill={secondaryColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
        transform="rotate(77 34 66)"
      /> */}

      {pattern === "spots" && (
        <G opacity="0.9">
          <Circle cx="60" cy="60" r="5" fill={secondaryColor} />
          <Circle cx="44" cy="76" r="4" fill={secondaryColor} />
        </G>
      )}

      <Circle
        cx="58"
        cy="38"
        r="22"
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      <Path
        d="M50 18 Q54 8 58 18 Q62 10 65 19 Q69 12 71 22"
        fill={accentColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      <Circle cx="64" cy="36" r="3.5" fill={DARK} />
      <Circle cx="65" cy="35" r="1.1" fill={WHITE} />

      <Polygon
        points="76,40 90,36 76,48"
        fill="#F0C14B"
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      <Path
        d="M55 46 Q52 52 58 54"
        fill={accentColor}
        stroke={OUTLINE}
        strokeWidth="1.5"
      />

      <Line
        x1="42"
        y1="87"
        x2="42"
        y2="94"
        stroke="#F0C14B"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <Line
        x1="38"
        y1="94"
        x2="46"
        y2="94"
        stroke="#F0C14B"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* 오른쪽 다리 & 발 */}
      <Line
        x1="58"
        y1="87"
        x2="58"
        y2="94"
        stroke="#F0C14B"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <Line
        x1="54"
        y1="94"
        x2="62"
        y2="94"
        stroke="#F0C14B"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </Svg>
  );
};
export const Duck = ({
  colorHex = "#FFEE58",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const secondaryColor = secondary ?? shade(mainColor, -0.15);
  const accentColor = accent ?? "#FF9800";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Ellipse
        cx="82"
        cy="41"
        rx="12"
        ry="7"
        fill={accentColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
      />
      <Path
        d="M78 41 Q82 44 86 41"
        stroke={OUTLINE}
        strokeWidth="1.5"
        fill="none"
      />
      <Ellipse
        cx="47"
        cy="66"
        rx="30"
        ry="21"
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />
      <Path
        d="M 52 66 C 52 57 39 54 31 60 C 26 64 26 68 31 72 C 39 78 52 75 52 66 Z"
        fill={secondaryColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
      />

      <Circle
        cx="62"
        cy="38"
        r="20"
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      <Circle cx="68" cy="35" r="3.5" fill={DARK} />
      <Circle cx="69" cy="34" r="1.1" fill={WHITE} />

      <Line
        x1="42"
        y1="87"
        x2="42"
        y2="94"
        stroke="#F0C14B"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <Line
        x1="38"
        y1="94"
        x2="46"
        y2="94"
        stroke="#F0C14B"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* 오른쪽 다리 & 발 */}
      <Line
        x1="58"
        y1="87"
        x2="58"
        y2="94"
        stroke="#F0C14B"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <Line
        x1="54"
        y1="94"
        x2="62"
        y2="94"
        stroke="#F0C14B"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </Svg>
  );
};
export const Penguin = ({
  colorHex = "#37474F",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const secondaryColor = secondary ?? "#FAFAFA";
  const accentColor = accent ?? "#FF9800";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Ellipse
        cx="50"
        cy="55"
        rx="30"
        ry="38"
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      <Ellipse cx="50" cy="62" rx="18" ry="26" fill={secondaryColor} />

      <Ellipse
        cx="23"
        cy="55"
        rx="7"
        ry="15"
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="3"
        transform="rotate(20 26 52)"
      />

      <Ellipse
        cx="77"
        cy="55"
        rx="7"
        ry="15"
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="3"
        transform="rotate(-20 74 52)"
      />

      <Ellipse cx="50" cy="34" rx="17" ry="14" fill={secondaryColor} />

      <Circle cx="43" cy="32" r="3.3" fill={DARK} />
      <Circle cx="57" cy="32" r="3.3" fill={DARK} />

      <Polygon
        points="46,38 54,38 50,45"
        fill={accentColor}
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <Ellipse
        cx="40"
        cy="93"
        rx="7"
        ry="3.5"
        fill={accentColor}
        stroke={OUTLINE}
        strokeWidth="2"
      />

      <Ellipse
        cx="60"
        cy="93"
        rx="7"
        ry="3.5"
        fill={accentColor}
        stroke={OUTLINE}
        strokeWidth="2"
      />
    </Svg>
  );
};
export const Whale = ({
  colorHex = "#42A5F5",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const secondaryColor = secondary ?? shade(mainColor, 0.35);
  const accentColor = accent ?? contrastAccent(mainColor);

  const eyeColor = contrastAccent(mainColor, "#1A237E", "#222");
  const mouthColor = "#F48FB1";
  const bellyColor = secondaryColor;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <G transform="translate(9.4, 16.7) scale(0.78)">
        {/* 💦 물줄기: blowhole에서 바로 이어지는 줄기 → 위에서 3갈래로 퍼짐 */}
        <Path
          d="M73 15 C73 8 73 2 73 -4"
          fill="none"
          stroke={accentColor}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <Path
          d="M73 2 C69 -2 66 -6 62 -9"
          fill="none"
          stroke={accentColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <Path
          d="M73 2 C77 -2 80 -6 84 -9"
          fill="none"
          stroke={accentColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <Circle cx="62" cy="-9" r="2" fill={accentColor} />
        <Circle cx="84" cy="-9" r="2" fill={accentColor} />
        <Circle cx="73" cy="-13" r="2.5" fill={accentColor} />

        {/* 💦 blowhole 구멍 */}
        <Circle cx="73" cy="15" r="2" fill={accentColor} opacity="0.8" />

        {/* 🐋 고래 몸통 */}
        <Path
          d="
            M9 56

            C8 43 12 29 22 21
            C32 13 45 14 56 19

            C65 23 72 29 78 34
            C83 38 87 38 91 35

            C94 33 97 29 97 32
            C98 39 94 45 89 48

            C85 51 82 54 81 61

            C79 71 73 78 64 82
            C53 87 38 86 25 82

            C15 79 8 72 8 63
            C8 60 8 58 9 56

            Z
          "
          fill={mainColor}
          stroke={OUTLINE}
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* 🤍 배 */}
        <Path
          d="
            M6 62
            C12 68 22 72 33 74
            C45 77 60 76 70 70
            C67 76 62 80 55 82
            C43 85 30 84 19 81
            C11 78 6 72 6 62
            Z
          "
          fill={bellyColor}
        />

        {/* 👄 입 안쪽 */}
        <Path
          d="
            M6 60
            C14 63 22 64 31 62
            C26 68 18 70 12 67
            C8 65 6 63 6 60
            Z
          "
          fill={mouthColor}
          stroke={OUTLINE}
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* 🦷 입 / 배 경계 */}
        <Path
          d="
            M22 66
            C29 67 37 69 45 70
            C53 71 61 70 68 66
          "
          fill="none"
          stroke={OUTLINE}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.65"
        />

        {/* 🐋 아래쪽 왼쪽 지느러미 */}
        <Path
          d="
            M51 78
            C51 86 55 92 61 96
            C65 98 67 95 66 91
            C65 86 62 82 58 78
            Z
          "
          fill={accentColor}
          stroke={OUTLINE}
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* 🐋 큰 앞지느러미 */}
        <Path
          d="
            M66 68
            C71 72 76 76 81 80
            C85 83 82 86 77 86
            C70 86 64 83 60 79
            C57 76 58 71 61 68
            Z
          "
          fill={mainColor}
          stroke={OUTLINE}
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* 🐋 꼬리 위쪽 */}
        <Path
          d="
            M82 36
            C80 29 80 24 83 20
            C87 22 91 25 94 27
            C96 28 98 27 98 29
            C98 35 94 41 88 45
            Z
          "
          fill={mainColor}
          stroke={OUTLINE}
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* 🐋 꼬리 아래쪽 */}
        <Path
          d="
            M84 38
            C89 37 94 34 98 30
            C98 37 95 43 89 47
            C86 49 83 49 81 47
            Z
          "
          fill={mainColor}
          stroke={OUTLINE}
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* 👁️ 눈 */}
        <Circle cx="45" cy="50" r="5" fill={eyeColor} />
        <Circle cx="47" cy="48" r="1.8" fill={WHITE} />

        {/* 😊 볼 */}
        <Circle cx="60" cy="56" r="3" fill={mouthColor} opacity="0.75" />

        {/* 몸통의 살짝 밝은 부분 */}
        <Path
          d="
            M20 25
            C28 18 39 18 49 21
            C56 23 63 27 68 31
            C58 27 47 24 37 24
            C29 24 24 27 20 31
            Z
          "
          fill={secondaryColor}
          opacity="0.45"
        />
      </G>
    </Svg>
  );
};
export const Shark = ({
  colorHex = "#90A4AE",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const secondaryColor = secondary ?? shade(mainColor, 0.3);
  const accentColor = accent ?? shade(mainColor, -0.2);

  // 👁️ 눈동자는 흰자 위에서 확실하게 보이도록 지정
  const eyeColor = contrastAccent(mainColor, "#1A237E", "#222");

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <G transform="translate(2, 4)">
        {/* 🦈 1. 상어 꼬리지느러미 (위/아래 뾰족하게 갈라진 모양) */}
        <Path
          d="
            M72 48
            C79 38 88 24 93 20
            C90 32 84 40 80 48
            C85 57 92 68 94 76
            C88 71 78 58 72 52
            Z
          "
          fill={mainColor}
          stroke={OUTLINE}
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* 🦈 2. 등지느러미 (위로 솟아오른 뾰족 삼각 지느러미) */}
        <Path
          d="
            M42 32
            C48 22 53 12 60 10
            C60 20 58 29 57 33
            Z
          "
          fill={mainColor}
          stroke={OUTLINE}
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* 🦈 3. 유선형 몸통 */}
        <Path
          d="
            M8 52
            C12 36 32 30 52 32
            C64 33 70 40 76 48
            C70 56 62 64 50 66
            C35 68 18 64 8 52
            Z
          "
          fill={mainColor}
          stroke={OUTLINE}
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* 🤍 4. 배부분 (하얀/밝은 톤) */}
        <Path
          d="
            M8 52
            C18 60 30 63 45 62
            C58 61 68 54 74 49
            C66 58 52 65 38 65
            C22 65 12 59 8 52
            Z
          "
          fill={secondaryColor}
        />

        {/* 🦈 5. 가슴지느러미 (옆 지느러미) */}
        <Path
          d="
            M36 55
            C38 64 42 72 48 76
            C48 70 46 62 44 56
            Z
          "
          fill={mainColor}
          stroke={OUTLINE}
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* 🦷 무서우면서 귀여운 뾰족 이빨 */}
        <Polygon
          points="18,55 21,60 24,55"
          fill={WHITE}
          stroke={OUTLINE}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <Polygon
          points="24,55 27,60 30,55"
          fill={WHITE}
          stroke={OUTLINE}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* 👄 입선 */}
        <Path
          d="M14 54 Q25 58 34 55"
          stroke={OUTLINE}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* 🫧 아가미선 3줄 */}
        <Path
          d="
            M44 42 C43 45 43 48 44 50
            M48 42 C47 45 47 48 48 50
            M52 42 C51 45 51 48 52 50
          "
          fill="none"
          stroke={OUTLINE}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* 👀 동글동글 초롱초롱한 눈 */}
        {/* 1. 흰자 */}
        <Circle cx="25" cy="42" r="5" fill={WHITE} />
        {/* 2. 눈동자 */}
        <Circle cx="25" cy="42" r="2.5" fill={eyeColor} />
        {/* 3. 하이라이트 */}
        <Circle cx="26.5" cy="40.5" r="1" fill={WHITE} />

        {/* 😊 핑크 볼터치 */}
        <Circle cx="18" cy="47" r="3" fill="#F48FB1" opacity="0.65" />
      </G>
    </Svg>
  );
};
// export const Shark = ({
//   colorHex = "#90A4AE",
//   primary,
//   secondary,
//   accent,
//   size = 95,
// }: ItemSvgProps) => {
//   const mainColor = primary ?? colorHex;
//   const secondaryColor = secondary ?? shade(mainColor, 0.25);
//   const accentColor = accent ?? shade(mainColor, -0.35);

//   return (
//     <Svg width={size} height={size} viewBox="0 0 100 100">
//       <Path
//         d="M8 55 Q15 35 45 33 Q75 32 92 50 Q75 55 45 55 Q60 65 55 72 Q35 68 20 58 Q10 60 8 55 Z"
//         fill={mainColor}
//         stroke={OUTLINE}
//         strokeWidth="4"
//         strokeLinejoin="round"
//       />

//       <Path d="M14 52 Q30 60 45 55 Q30 58 16 58 Z" fill={secondaryColor} />

//       <Polygon
//         points="45,33 52,14 58,34"
//         fill={accentColor}
//         stroke={OUTLINE}
//         strokeWidth="3"
//         strokeLinejoin="round"
//       />

//       <Circle cx="30" cy="44" r="3" fill={accentColor} />

//       <Path
//         d="M18 55 Q28 62 40 60"
//         stroke={OUTLINE}
//         strokeWidth="2"
//         fill="none"
//         strokeLinecap="round"
//       />

//       <Polygon
//         points="15,56 19,61 23,56"
//         fill={WHITE}
//         stroke={OUTLINE}
//         strokeWidth="1.2"
//         strokeLinejoin="round"
//       />

//       <Polygon
//         points="9,56 13,61 17,56"
//         fill={WHITE}
//         stroke={OUTLINE}
//         strokeWidth="1.2"
//         strokeLinejoin="round"
//       />
//     </Svg>
//   );
// };
export const Octopus = ({
  colorHex = "#AB47BC",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const secondaryColor = secondary ?? shade(mainColor, 0.2);
  const accentColor = accent ?? contrastAccent(mainColor);

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 뒤쪽 다리 */}
      <Path
        d="
          M28 57
          C20 63 17 71 20 78
          C22 83 27 82 30 76
          C32 82 36 84 39 80
          C41 76 38 67 35 60
          Z
        "
        fill={secondaryColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      <Path
        d="
          M72 57
          C80 63 83 71 80 78
          C78 83 73 82 70 76
          C68 82 64 84 61 80
          C59 76 62 67 65 60
          Z
        "
        fill={secondaryColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* 가운데 다리 */}
      <Path
        d="
          M39 60
          C34 70 35 80 40 84
          C43 86 46 82 46 76
          C48 83 52 87 55 84
          C58 81 57 71 54 61
          Z
        "
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* 오른쪽 앞다리 */}
      <Path
        d="
          M61 60
          C67 68 67 78 63 83
          C60 87 56 83 56 77
          C54 83 51 85 48 82
          C46 79 49 68 53 60
          Z
        "
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* 🐙 왕머리 */}
      <Path
        d="
          M20 49
          C18 38 22 27 31 21
          C39 15 61 15 69 21
          C78 27 82 38 80 49
          C78 59 69 65 61 67
          C54 69 46 69 39 67
          C31 65 22 59 20 49
          Z
        "
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 머리 하이라이트 */}
      <Path
        d="
          M30 29
          C37 23 45 22 51 23
        "
        fill="none"
        stroke={secondaryColor}
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.65"
      />

      {/* 👀 눈 */}
      {/* 1. 흰자 (가장 아래) */}
      <Circle cx="36" cy="43" r="5.5" fill={WHITE} />
      <Circle cx="64" cy="43" r="5.5" fill={WHITE} />

      {/* 2. 눈동자 색상 (중간) */}
      <Circle cx="37" cy="44" r="2.8" fill={DARK} />
      <Circle cx="65" cy="44" r="2.8" fill={DARK} />

      {/* 3. 하이라이트 반짝이 (가장 위) */}
      <Circle cx="38" cy="42" r="1.2" fill={WHITE} />
      <Circle cx="66" cy="42" r="1.2" fill={WHITE} />

      {/* 😊 입 */}
      <Path
        d="M43 54 Q50 60 57 54"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* 🩷 볼터치 */}
      <Circle cx="27" cy="53" r="4" fill="#F48FB1" opacity="0.7" />
      <Circle cx="73" cy="53" r="4" fill="#F48FB1" opacity="0.7" />
    </Svg>
  );
};
// ============================================================
// 🦑 오징어 Squid
// ============================================================

export const Squid = ({
  colorHex = "#FF8A65",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const secondaryColor = secondary ?? shade(mainColor, 0.25);
  const accentColor = accent ?? contrastAccent(mainColor);

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 🦑 1. 삼각형 머리 지느러미 (상단) */}
      <Path
        d="
          M50 8
          C58 15 72 23 75 30
          C70 32 60 32 50 32
          C40 32 30 32 25 30
          C28 23 42 15 50 8
          Z
        "
        fill={secondaryColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* 🦑 2. 네모 몸통 (중간) */}
      <Path
        d="
          M27 29
          C27 28 73 28 73 29
          C74 42 74 53 72 63
          C71 67 65 69 50 69
          C35 69 29 67 28 63
          C26 53 26 42 27 29
          Z
        "
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 몸통 하이라이트 (왼쪽 모서리) */}
      <Path
        d="
          M32 34
          V58
        "
        fill="none"
        stroke={secondaryColor}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* 🦑 3. 다리 4개 (하단) */}
      {/* 다리 1 (맨 왼쪽) */}
      <Path
        d="
          M33 67
          C30 74 27 80 30 85
          C33 88 37 84 37 78
          C37 73 38 68 39 67
        "
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* 다리 2 (왼쪽 안쪽) */}
      <Path
        d="
          M41 68
          C40 75 39 82 43 87
          C46 89 48 85 47 78
          C46 73 46 69 46 68
        "
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* 다리 3 (오른쪽 안쪽) */}
      <Path
        d="
          M54 68
          C54 69 54 73 53 78
          C52 85 54 89 57 87
          C61 82 60 75 59 68
        "
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* 다리 4 (맨 오른쪽) */}
      <Path
        d="
          M61 67
          C62 68 63 73 63 78
          C63 84 67 88 70 85
          C73 80 70 74 67 67
        "
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* 👀 눈 */}
      {/* 1. 흰자 */}
      <Circle cx="39" cy="45" r="6" fill={WHITE} />
      <Circle cx="61" cy="45" r="6" fill={WHITE} />

      {/* 2. 눈동자 (어두운 eyeColor 사용) */}
      <Circle cx="40" cy="46" r="3" fill={DARK} />
      <Circle cx="62" cy="46" r="3" fill={DARK} />

      {/* 3. 하이라이트 반짝이 */}
      <Circle cx="41" cy="44" r="1.2" fill={WHITE} />
      <Circle cx="63" cy="44" r="1.2" fill={WHITE} />

      {/* 😊 볼터치 */}
      <Circle cx="31" cy="53" r="3.5" fill="#F48FB1" opacity="0.7" />
      <Circle cx="69" cy="53" r="3.5" fill="#F48FB1" opacity="0.7" />

      {/* 👄 살짝 벌어진 입 */}
      <Ellipse
        cx="50"
        cy="53"
        rx="4.5"
        ry="3"
        fill="#F48FB1"
        stroke={OUTLINE}
        strokeWidth="1.8"
      />
      <Ellipse cx="50" cy="53" rx="2" ry="1.2" fill={accentColor} />
    </Svg>
  );
};

/* =========================================================
 * 🍎 FRUIT / VEGETABLE
 * ======================================================= */

export const Apple = ({
  colorHex = "#E53935",
  primary,
  secondary,
  accent,
  pattern,
  size = 95,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const secondaryColor = secondary ?? shade(mainColor, -0.3);
  const accentColor = accent ?? "#4CAF50";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="M50 35 C25 30 18 55 22 70 C26 85 38 90 50 84 C62 90 74 85 78 70 C82 55 75 30 50 35 Z"
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {pattern === "stripes" && (
        <G
          stroke={secondaryColor}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.85"
        >
          <Path d="M32 42 Q30 60 34 78" fill="none" />
          <Path d="M50 40 Q48 62 50 84" fill="none" />
          <Path d="M68 42 Q70 60 66 78" fill="none" />
        </G>
      )}

      <Path
        d="M50 35 Q48 28 50 22"
        stroke="#5C4033"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      <Path
        d="M50 26 Q60 18 68 24 Q60 24 55 30"
        fill={accentColor}
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <Ellipse cx="36" cy="52" rx="6" ry="9" fill={WHITE} opacity="0.5" />
    </Svg>
  );
};
export const Banana = ({
  colorHex = "#FDD835",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const secondaryColor = secondary ?? shade(mainColor, -0.2); // 또는 밝은 하이라이트/음영
  const accentColor = accent ?? "#5D4037"; // 꼭지 및 갈색 끝부분

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 🍌 1. 공통 위쪽 꼭지 (accentColor) */}
      <Path
        d="
          M47 16
          C50 12 56 12 59 16
          L57 24
          C54 26 49 26 46 23
          Z
        "
        fill={accentColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* 🍌 2. 뒤쪽/왼쪽 바나나 */}
      <Path
        d="
          M48 23
          C34 29 22 42 22 59
          C22 75 34 83 48 81
          C54 80 57 75 53 71
          C43 61 40 46 48 23
          Z
        "
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 🍌 3. 앞쪽/오른쪽 바나나 */}
      <Path
        d="
          M52 23
          C43 41 44 61 52 77
          C57 87 69 89 76 82
          C80 78 78 74 74 72
          C62 64 56 46 56 24
          Z
        "
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 🍌 4. 바나나 끝부분 검은 점/꼭지 (accentColor) */}
      <Path
        d="M42 80 L47 84"
        stroke={accentColor}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <Path
        d="M72 81 L76 84"
        stroke={accentColor}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* ✨ 5. 바나나 결 & 하이라이트 (secondaryColor & WHITE) */}
      {/* 왼쪽 바나나 곡선 음영/결 */}
      <Path
        d="M33 43 C28 57 31 68 40 74"
        fill="none"
        stroke={secondaryColor}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* 오른쪽 바나나 하이라이트 */}
      <Path
        d="M57 38 C53 52 56 66 65 74"
        fill="none"
        stroke={WHITE}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* 은은한 흰색 은광 반짝이 */}
      <Path
        d="M28 48 C25 57 27 65 33 70"
        fill="none"
        stroke={WHITE}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.4"
      />
    </Svg>
  );
};
// export const Banana = ({
//   colorHex = "#FDD835",
//   primary,
//   secondary,
//   accent,
//   size = 95,
// }: ItemSvgProps) => {
//   const mainColor = primary ?? colorHex;
//   const secondaryColor = secondary ?? shade(mainColor, 0.25);
//   const accentColor = accent ?? "#5D4037";

//   return (
//     <Svg width={size} height={size} viewBox="0 0 100 100">
//       <Path
//         d="M20 78 Q14 55 30 32 Q42 18 58 16 Q64 15 62 22 Q52 24 42 36 Q28 54 32 74 Q30 80 20 78 Z"
//         fill={mainColor}
//         stroke={OUTLINE}
//         strokeWidth="4"
//         strokeLinejoin="round"
//       />

//       <Path
//         d="M56 17 Q64 12 70 18 Q66 22 60 22 Z"
//         fill={accentColor}
//         stroke={OUTLINE}
//         strokeWidth="2"
//         strokeLinejoin="round"
//       />

//       <Path
//         d="M26 70 Q30 55 40 42"
//         stroke={secondaryColor}
//         strokeWidth="2"
//         fill="none"
//         opacity="0.8"
//         strokeLinecap="round"
//       />
//     </Svg>
//   );
// };
// export const Strawberry = ({
//   colorHex = "#E53935",
//   size = 95,
// }: ItemSvgProps) => {
//   const shadow = shade(colorHex, 0.25);
//   return (
//     <Svg width={size} height={size} viewBox="0 0 100 100">
//       <Path
//         d="M50 32 C22 32 18 60 32 78 C40 90 60 90 68 78 C82 60 78 32 50 32 Z"
//         fill={colorHex}
//         stroke={OUTLINE}
//         strokeWidth="4"
//         strokeLinejoin="round"
//       />
//       <Path d="M28 45 Q38 40 46 50 Q34 48 28 45" fill={shadow} opacity="0.6" />
//       <Polygon
//         points="50,16 40,30 60,30"
//         fill="#43A047"
//         stroke={OUTLINE}
//         strokeWidth="2.5"
//         strokeLinejoin="round"
//       />
//       <Polygon
//         points="38,20 32,32 46,29"
//         fill="#43A047"
//         stroke={OUTLINE}
//         strokeWidth="2"
//         strokeLinejoin="round"
//       />
//       <Polygon
//         points="62,20 68,32 54,29"
//         fill="#43A047"
//         stroke={OUTLINE}
//         strokeWidth="2"
//         strokeLinejoin="round"
//       />
//       <Circle cx="38" cy="48" r="2" fill="#FDD835" />
//       <Circle cx="52" cy="44" r="2" fill="#FDD835" />
//       <Circle cx="63" cy="50" r="2" fill="#FDD835" />
//       <Circle cx="42" cy="62" r="2" fill="#FDD835" />
//       <Circle cx="58" cy="64" r="2" fill="#FDD835" />
//       <Circle cx="50" cy="74" r="2" fill="#FDD835" />
//     </Svg>
//   );
// };
export const Strawberry = ({
  colorHex = "#E53935",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const secondaryColor = secondary ?? shade(mainColor, 0.25);
  const accentColor = accent ?? "#43A047";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="M50 32 C22 32 18 60 32 78 C40 90 60 90 68 78 C82 60 78 32 50 32 Z"
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <Path
        d="M28 45 Q38 40 46 50 Q34 48 28 45"
        fill={secondaryColor}
        opacity="0.6"
      />

      <Polygon
        points="50,16 40,30 60,30"
        fill={accentColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      <Polygon
        points="38,20 32,32 46,29"
        fill={accentColor}
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <Polygon
        points="62,20 68,32 54,29"
        fill={accentColor}
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <Circle cx="38" cy="48" r="2" fill="#FDD835" />
      <Circle cx="52" cy="44" r="2" fill="#FDD835" />
      <Circle cx="63" cy="50" r="2" fill="#FDD835" />
      <Circle cx="42" cy="62" r="2" fill="#FDD835" />
      <Circle cx="58" cy="64" r="2" fill="#FDD835" />
      <Circle cx="50" cy="74" r="2" fill="#FDD835" />
    </Svg>
  );
};

export const Watermelon = ({
  colorHex = "#43A047",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const rindColor = primary ?? colorHex;
  const fleshColor = secondary ?? "#E53935";
  const accentColor = accent ?? shade(rindColor, -0.25);
  const seedColor = "#2C2C2C";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 1. 수박 껍질 (초록색 외각) */}
      <Path
        d="M10 55 A40 40 0 0 0 90 55 Z"
        fill={rindColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 2. 흰색 속껍질 층 */}
      <Path d="M16 55 A34 34 0 0 0 84 55 Z" fill={WHITE} />

      {/* 3. 수박 과육 (빨간색) */}
      <Path
        d="M22 55 A28 28 0 0 0 78 55 Z"
        fill={fleshColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 4. 껍질 무늬/디테일 선 */}
      {/* <Path
        d="M18 55 A36 36 0 0 0 82 55"
        stroke={accentColor}
        strokeWidth="3"
        fill="none"
        opacity="0.9"
      /> */}

      {/* 🍉 5. 통통하고 귀여운 수박 씨앗들 (더 두껍게) */}
      {/* 상단 씨앗 2개 */}
      <Path
        d="M42 63 C39 60 40 56 42 56 C44 56 45 60 42 63 Z"
        fill={seedColor}
        transform="rotate(-15, 42, 60)"
      />
      <Path
        d="M58 63 C55 60 56 56 58 56 C60 56 61 60 58 63 Z"
        fill={seedColor}
        transform="rotate(15, 58, 60)"
      />

      {/* 중간 씨앗 3개 */}
      <Path
        d="M33 69 C30 66 31 62 33 62 C35 62 36 66 33 69 Z"
        fill={seedColor}
        transform="rotate(-25, 33, 66)"
      />
      <Path
        d="M50 71 C47 68 48 64 50 64 C52 64 53 68 50 71 Z"
        fill={seedColor}
      />
      <Path
        d="M67 69 C64 66 65 62 67 62 C69 62 70 66 67 69 Z"
        fill={seedColor}
        transform="rotate(25, 67, 66)"
      />

      {/* 하단 씨앗 2개 */}
      <Path
        d="M42 77 C39 74 40 70 42 70 C44 70 45 74 42 77 Z"
        fill={seedColor}
        transform="rotate(-10, 42, 74)"
      />
      <Path
        d="M58 77 C55 74 56 70 58 70 C60 70 61 74 58 77 Z"
        fill={seedColor}
        transform="rotate(10, 58, 74)"
      />

      {/* 과육 하이라이트 */}
      {/* <Path
        d="M28 58 A22 22 0 0 0 45 74"
        fill="none"
        stroke={WHITE}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.35"
      /> */}
    </Svg>
  );
};
export const Carrot = ({
  colorHex = "#FB8C00",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const secondaryColor = secondary ?? shade(mainColor, -0.25);
  const accentColor = accent ?? "#558B2F";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="M50 30 Q68 32 62 55 Q58 78 50 90 Q42 78 38 55 Q32 32 50 30 Z"
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <Path
        d="M44 42 Q50 45 56 42 M43 55 Q50 58 57 55 M45 68 Q50 70 55 68"
        stroke={secondaryColor}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />

      <Path
        d="M50 30 Q46 18 38 14 M50 30 Q50 16 50 10 M50 30 Q54 18 62 14"
        stroke={accentColor}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
};
export const Cucumber = ({
  colorHex = "#66BB6A",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const secondaryColor = secondary ?? shade(mainColor, -0.25); // 연한 하이라이트/배 색상
  const accentColor = accent ?? shade(mainColor, 0.3); // 짙은 가시/무늬 색상

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 🥒 1. 상단 오이 꼭지 */}
      <Path
        d="M21 19 L15 13 C14 11 17 10 19 12 L24 17 Z"
        fill={accentColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* 🥒 2. 길고 매끄러운 오이 몸통 (대각선 배치) */}
      <Path
        d="
          M21 19
          C32 23 48 31 63 46
          C78 60 88 74 84 83
          C80 91 69 88 60 80
          C45 67 29 50 18 36
          C12 28 14 20 21 19
          Z
        "
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* ✨ 3. 오이 몸통 밝은 곡선 결 (secondaryColor) */}
      <Path
        d="M24 28 C36 38 52 53 66 69"
        fill="none"
        stroke={secondaryColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* 🥒 4. 오이 특유의 뾰족뾰족 가시 점들 (accentColor) */}
      <Circle cx="30" cy="38" r="1.8" fill={accentColor} />
      <Circle cx="40" cy="32" r="1.8" fill={accentColor} />
      <Circle cx="44" cy="49" r="1.8" fill={accentColor} />
      <Circle cx="55" cy="42" r="1.8" fill={accentColor} />
      <Circle cx="58" cy="62" r="1.8" fill={accentColor} />
      <Circle cx="69" cy="54" r="1.8" fill={accentColor} />
      <Circle cx="73" cy="74" r="1.8" fill={accentColor} />

      {/* ✨ 5. 은은한 흰색 광택 하이라이트 */}
      <Path
        d="M20 25 C30 33 44 47 57 60"
        fill="none"
        stroke={WHITE}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.4"
      />
    </Svg>
  );
};
export const Mushroom = ({
  colorHex = "#EF5350",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const capColor = primary ?? colorHex;
  const dotColor = secondary ?? "#FFFFFF";
  const stemColor = accent ?? "#D7CCC8";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 버섯 기둥 (줄기) */}
      <Path
        d="M36 50 C34 72 38 88 50 88 C62 88 66 72 64 50 Z"
        fill={stemColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 기둥 음영 */}
      <Path
        d="M58 52 C61 68 59 80 50 86"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="2.5"
        opacity="0.2"
        strokeLinecap="round"
      />

      {/* 버섯 갓 */}
      <Path
        d="M12 52 C12 22 28 14 50 14 C72 14 88 22 88 52 C88 56 82 58 50 58 C18 58 12 56 12 52 Z"
        fill={capColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 버섯 갓 점 무늬 (dotColor) */}
      <Circle cx="50" cy="28" r="6" fill={dotColor} />
      <Circle cx="32" cy="38" r="5" fill={dotColor} />
      <Circle cx="68" cy="38" r="5" fill={dotColor} />
      <Circle cx="22" cy="48" r="3.5" fill={dotColor} />
      <Circle cx="78" cy="48" r="3.5" fill={dotColor} />

      {/* 갓 하이라이트 */}
      <Path
        d="M24 28 C32 20 44 18 52 18"
        fill="none"
        stroke={WHITE}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.4"
      />
    </Svg>
  );
};

export const Tomato = ({
  colorHex = "#E53935",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const secondaryColor = secondary ?? shade(mainColor, -0.25); // 볼륨 음영 선
  const accentColor = accent ?? "#4CAF50"; // 초록 꼭지

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 🍅 1. 넓적하고 통통한 토마토 몸통 (위아래 완만한 홈) */}
      <Path
        d="
          M 50 34
          C 58 32, 85 36, 85 58
          C 85 78, 62 82, 50 80
          C 38 82, 15 78, 15 58
          C 15 36, 42 32, 50 34
          Z
        "
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 🍅 2. 별 모양 초록 꼭지 & 줄기 */}
      <Path
        d="
          M 50 20 C 51 14, 55 12, 58 14 C 55 20, 52 24, 50 28
          M 50 28 L 40 22 L 45 28 L 32 30 L 44 34 L 50 38 L 56 34 L 68 30 L 55 28 L 60 22 Z
        "
        fill={accentColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* ✨ 3. 왼쪽 볼륨 음영 선 */}
      <Path
        d="M 28 46 C 22 54 24 68 34 74"
        fill="none"
        stroke={secondaryColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* ✨ 4. 중앙 볼륨 골 홈 선 (새로 추가) */}
      <Path
        d="M 50 38 C 49 50 49 68 50 78"
        fill="none"
        stroke={secondaryColor}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* ✨ 5. 오른쪽 볼륨 음영 선 (새로 추가) */}
      <Path
        d="M 72 46 C 78 54 76 68 66 74"
        fill="none"
        stroke={secondaryColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* ✨ 6. 상단 은은한 광택 하이라이트 (WHITE) */}
      <Path
        d="M 32 40 C 40 36 60 36 68 40"
        fill="none"
        stroke={WHITE}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.4"
      />
    </Svg>
  );
};

// 🥦 2. 브로콜리 (Broccoli)
export const Broccoli = ({
  colorHex = "#66BB6A",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const highlightColor = secondary ?? "#A5D6A7";
  const stemColor = accent ?? "#81C784";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 줄기 */}
      <Path
        d="M40 55 L35 84 C34 88 66 88 65 84 L60 55 Z"
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 줄기 갈래 결 */}
      <Path
        d="M44 65 L40 52 M56 65 L60 52"
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.3"
      />

      {/* 브로콜리 송이 구름 모양들 */}
      {/* 뒤쪽 송이들 */}
      <Circle
        cx="30"
        cy="42"
        r="16"
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
      />
      <Circle
        cx="70"
        cy="42"
        r="16"
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
      />
      <Circle
        cx="50"
        cy="25"
        r="18"
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
      />

      {/* 앞쪽 중앙 송이들 */}
      <Circle
        cx="38"
        cy="32"
        r="15"
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
      />
      <Circle
        cx="62"
        cy="32"
        r="15"
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
      />
      <Circle
        cx="50"
        cy="44"
        r="17"
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
      />

      {/* 송이 질감 디테일 (highlightColor) */}
      <Circle cx="48" cy="22" r="4" fill={highlightColor} opacity="0.6" />
      <Circle cx="32" cy="30" r="3.5" fill={highlightColor} opacity="0.6" />
      <Circle cx="66" cy="30" r="3.5" fill={highlightColor} opacity="0.6" />
      <Circle cx="44" cy="40" r="4" fill={highlightColor} opacity="0.6" />
      <Circle cx="56" cy="42" r="3.5" fill={highlightColor} opacity="0.6" />
      <Circle cx="26" cy="42" r="3" fill={highlightColor} opacity="0.6" />
      <Circle cx="74" cy="42" r="3" fill={highlightColor} opacity="0.6" />
    </Svg>
  );
};
/* =========================================================
 * 🍙 FOOD
 * ======================================================= */

// rice : colorHex = 밥알 색 (흰쌀/현미 등)

export const Rice = ({
  colorHex = "#FFF8E1",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const riceColor = primary ?? colorHex;
  const bowlColor = secondary ?? shade(riceColor, -0.12);
  const accentColor = accent ?? "#8D6E63";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 🥣 1. 밥그릇 받침대 (하단 안정감) */}
      <Path
        d="M 38 82 L 36 88 C 36 90, 64 90, 64 88 L 62 82 Z"
        fill={shade(bowlColor, 0.2)}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* 🥣 2. 밥그릇 뒷면/몸통 */}
      <Path
        d="M 18 52 C 18 78, 30 84, 50 84 C 70 84, 82 78, 82 52 Z"
        fill={bowlColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 🍚 3. 수북하게 고슬고슬 담긴 밥 (그릇 안쪽에 위치) */}
      <Path
        d="
          M 20 52
          C 20 40, 28 34, 36 34
          C 40 26, 60 26, 64 34
          C 72 34, 80 40, 80 52
          C 68 58, 32 58, 20 52
          Z
        "
        fill={riceColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* 🍚 4. 밥알 결 & 질감 음영 디테일 */}
      <Path
        d="M 32 38 C 38 34, 46 38, 50 36 M 52 32 C 58 28, 66 32, 70 38"
        fill="none"
        stroke={shade(riceColor, 0.25)}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* ✨ 5. 밥 상단 은은한 광택/하이라이트 */}
      <Path
        d="M 38 30 C 44 26, 56 26, 60 30"
        fill="none"
        stroke={WHITE}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* 🌾 6. 밥 위의 깨/고명 포인트 */}
      <Circle cx="44" cy="35" r="1.5" fill={accentColor} opacity="0.6" />
      <Circle cx="52" cy="31" r="1.5" fill={accentColor} opacity="0.6" />
      <Circle cx="58" cy="36" r="1.5" fill={accentColor} opacity="0.6" />

      {/* 🥣 7. 밥그릇 전면 입구 림 (밥을 자연스럽게 감싸 안아줌) */}
      <Path
        d="M 18 52 C 18 62, 82 62, 82 52"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <Path
        d="M 20 52 C 20 60, 80 60, 80 52 C 80 48, 20 48, 20 52 Z"
        fill={shade(bowlColor, -0.1)}
        opacity="0.3"
      />
    </Svg>
  );
};
export const Gimbap1 = ({
  colorHex = "#37474F",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const seaweedColor = primary ?? colorHex;
  const riceColor = secondary ?? "#FFF8E1";
  const accentColor = accent ?? "#E53935";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Circle
        cx="50"
        cy="55"
        r="34"
        fill={seaweedColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      <Circle cx="50" cy="55" r="26" fill={riceColor} />

      <Circle cx="42" cy="46" r="6" fill={accentColor} />
      <Circle cx="60" cy="46" r="6" fill="#FFB300" />
      <Circle cx="42" cy="64" r="6" fill="#43A047" />
      <Circle cx="60" cy="64" r="6" fill={accentColor} opacity="0.8" />

      <Circle cx="50" cy="55" r="5" fill={shade(riceColor, -0.08)} />
    </Svg>
  );
};

export const Gimbap = ({
  colorHex = "#292321",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const seaweedColor = primary ?? colorHex;
  const riceColor = secondary ?? "#FFFBE8";
  const eggColor = accent ?? "#F9A12B";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 뒤쪽 김밥 몸통: 원통형 */}
      <Path
        d="
          M 18 25
          L 55 8
          Q 73 0 87 15
          Q 98 28 91 44
          Q 88 52 79 58
          L 43 80
          Q 33 85 24 78
          Z
        "
        fill={seaweedColor}
        stroke={OUTLINE}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />

      {/* 앞쪽 김밥 단면 */}
      <Ellipse
        cx={34}
        cy={52}
        rx={31}
        ry={31}
        fill={riceColor}
        stroke={OUTLINE}
        strokeWidth={2.5}
      />

      {/* 단면과 몸통이 만나는 부분 */}
      <Path
        d="M 56 20 Q 66 34 65 49 Q 64 68 51 78"
        fill="none"
        stroke={OUTLINE}
        strokeWidth={1.5}
      />

      {/* 달걀 지단 */}
      <Path
        d="
          M 21 43
          Q 19 32 35 31
          Q 49 30 53 39
          Q 55 45 48 49
          L 29 54
          Q 19 54 21 43
          Z
        "
        fill={eggColor}
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* 노란 단무지 */}
      <Path
        d="
          M 25 49
          Q 18 53 22 61
          Q 26 68 34 64
          L 41 57
          L 35 49
          Z
        "
        fill="#F7D747"
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* 초록색 오이 */}
      <Path
        d="
          M 38 49
          Q 45 43 51 49
          Q 58 56 51 63
          Q 44 68 38 61
          Q 34 55 38 49
          Z
        "
        fill="#579B35"
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* 주황색 당근 */}
      <Path
        d="
          M 18 41
          Q 17 34 26 32
          Q 39 28 49 34
          Q 55 38 50 44
          Q 46 48 39 45
          L 29 47
          Q 21 48 18 41
          Z
        "
        fill="#F99A2E"
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* 속재료 경계선 */}
      <Path
        d="M 29 47 Q 34 43 39 45"
        fill="none"
        stroke={OUTLINE}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
};

// pizza : colorHex = 도우/치즈 색
export const Pizza = ({
  colorHex = "#FFCC80",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const doughColor = primary ?? colorHex;
  const toppingColor = secondary ?? "#E53935";
  const cheeseColor = accent ?? shade(doughColor, 0.25);

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="M50 12 L90 82 Q50 96 10 82 Z"
        fill={doughColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <Path
        d="M14 78 Q50 90 86 78 L90 82 Q50 96 10 82 Z"
        fill={toppingColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <Rect
        x="45"
        y="30"
        width="8"
        height="16"
        rx="2"
        fill={toppingColor}
        stroke={OUTLINE}
        strokeWidth="1.5"
        transform="rotate(-15, 46, 38)"
      />

      <Path
        d="M 62,46 a 6,6 0 1,1 0,12 a 6,6 0 1,1 0,-12 z M 62,50 a 2,2 0 1,0 0,4 a 2,2 0 1,0 0,-4 z"
        fill={toppingColor}
        stroke={OUTLINE}
        strokeWidth="1.5"
      />

      <Path
        d="M 36,54 
           L 44,54 
           Q 46,60 44,66 
           L 36,66 
           Q 34,60 36,54 z"
        fill={toppingColor}
        stroke={OUTLINE}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <G transform="translate(5, 5) scale(0.9)">
        <Path
          d="M 55,65 a 5,5 0 0,1 5,5 a 5,5 0 0,1 -5,5 a 5,5 0 0,1 -5,-5 a 5,5 0 0,1 5,-5 z M 55,68.5 a 1.5,1.5 0 1,0 0,3 a 1.5,1.5 0 1,0 0,-3 z"
          fill={toppingColor}
          stroke={OUTLINE}
          strokeWidth="1.5"
        />
      </G>
    </Svg>
  );
};
export const Hamburger = ({
  colorHex = "#D4A574",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const bunColor = primary ?? colorHex;
  const pattyColor = secondary ?? shade(bunColor, -0.35);
  const accentColor = accent ?? "#66BB6A";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="M14 45 Q14 20 50 18 Q86 20 86 45 Z"
        fill={bunColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <Circle cx="34" cy="28" r="2" fill={WHITE} />
      <Circle cx="50" cy="24" r="2" fill={WHITE} />
      <Circle cx="66" cy="28" r="2" fill={WHITE} />

      <Path
        d="M12 48 Q50 58 88 48 L86 58 Q50 68 14 58 Z"
        fill={accentColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      <Path
        d="M12 60 Q50 70 88 60 L86 72 Q50 82 14 72 Z"
        fill={pattyColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      <Path
        d="M12 74 Q50 82 88 74 L86 84 Q50 92 14 84 Z"
        fill={bunColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
export const Cake = ({
  colorHex = "#F8BBD0",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const frostingColor = primary ?? colorHex;
  const cakeColor = secondary ?? shade(frostingColor, -0.15);
  const accentColor = accent ?? "#E91E63";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect
        x="18"
        y="55"
        width="64"
        height="30"
        rx="6"
        fill={cakeColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      <Path
        d="M14 55 Q30 45 50 55 Q70 45 86 55 L82 60 Q70 52 50 60 Q30 52 18 60 Z"
        fill={frostingColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      <Rect
        x="46"
        y="36"
        width="8"
        height="16"
        rx="2"
        fill={accentColor}
        stroke={OUTLINE}
        strokeWidth="2"
      />

      <Path d="M50 36 Q46 28 50 22 Q54 28 50 36" fill="#E53935" />

      <Circle cx="30" cy="70" r="3" fill={accentColor} opacity="0.8" />

      <Circle cx="70" cy="70" r="3" fill={accentColor} opacity="0.8" />
    </Svg>
  );
};
export const Cookie = ({
  colorHex = "#D7A86E",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const doughColor = primary ?? colorHex;
  const shadowColor = secondary ?? shade(doughColor, -0.15);
  const chipColor = accent ?? "#5D4037";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Circle
        cx="50"
        cy="52"
        r="32"
        fill={doughColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      <Circle cx="38" cy="40" r="4.5" fill={chipColor} />
      <Circle cx="58" cy="36" r="4" fill={chipColor} />
      <Circle cx="66" cy="55" r="4.5" fill={chipColor} />
      <Circle cx="44" cy="62" r="4" fill={chipColor} />
      <Circle cx="60" cy="68" r="3.5" fill={chipColor} />

      <Circle cx="34" cy="55" r="3" fill={shadowColor} opacity="0.6" />
    </Svg>
  );
};
export const IceCream = ({
  colorHex = "#FFF8E1",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const scoopColor = primary ?? colorHex;
  const swirlColor = secondary ?? shade(scoopColor, 0.25);
  const accentColor = accent ?? "#E53935";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Polygon
        points="38,51 62,51 50,85"
        fill={swirlColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <Line
        x1="42"
        y1="62"
        x2="52"
        y2="86"
        stroke="#8D6E63"
        strokeWidth="1.4"
        opacity="0.5"
      />

      <Line
        x1="58"
        y1="62"
        x2="48"
        y2="86"
        stroke="#8D6E63"
        strokeWidth="1.4"
        opacity="0.5"
      />

      <Path
        d="M32 55 Q26 30 50 24 Q74 30 68 55 Q60 44 50 50 Q40 44 32 55 Z"
        fill={scoopColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <Path
        d="M40 40 Q50 34 60 40"
        stroke={swirlColor}
        strokeWidth="2"
        fill="none"
        opacity="0.8"
        strokeLinecap="round"
      />

      <Circle
        cx="50"
        cy="18"
        r="5"
        fill={accentColor}
        stroke={OUTLINE}
        strokeWidth="2"
      />
      <Polygon
        points="38,52 62,52 50,86"
        fill={swirlColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

/* =========================================================
 * 🚗 VEHICLE
 * ======================================================= */
export const FireTruck = ({
  colorHex = "#E53935", // 소방차 기본 빨간색
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const stripeColor = secondary ?? "#FFCDD2"; // 흰색/연핑크 계열 띠
  const wheelColor = accent ?? "#B71C1C"; // 짙은 버건디/레드 또는 그레이

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 1. 지붕 위 사다리 (Ladder) */}
      {/* 사다리 받침대 */}
      <Path
        d="M20 34 L20 28 M48 34 L48 28"
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* 사다리 가로 프레임 2줄 */}
      <Path
        d="M8 22 L60 22 M8 28 L60 28"
        stroke={bodyColor}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <Path
        d="M8 22 L60 22 M8 28 L60 28"
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* 사다리 세로 살 */}
      <Path
        d="M16 22 L16 28 M28 22 L28 28 M40 22 L40 28 M52 22 L52 28"
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* 2. 운전석 위 경광등 (Siren) */}
      <Path
        d="M74 34 C74 28 82 28 82 34 Z"
        fill="#FFD54F"
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* 사이렌 빛 연출 라인 */}
      <Path
        d="M71 25 L68 22 M78 23 L78 18 M85 25 L88 22"
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* 3. 소방차 뒷몸통 (Body - 장비 수납칸) */}
      <Rect
        x="8"
        y="34"
        width="54"
        height="38"
        rx="4"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* 장비함 세로/가로 무늬 라인 */}
      <Path
        d="M18 42 L52 42 M18 48 L52 48"
        stroke={stripeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* 측면 하단 하얀 띠 */}
      <Path
        d="M8 58 L62 58"
        stroke={stripeColor}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* 4. 운전석 캐빈 (Cabin) */}
      <Path
        d="M62 34 
           L80 34 
           C86 34, 94 44, 94 54 
           L94 72 
           L62 72 Z"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* 5. 운전석 전면 창문 (Window) */}
      <Path
        d="M66 40 
           L80 40 
           C84 40, 88 48, 88 52 
           L66 52 Z"
        fill={stripeColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* 6. 사이드 미러 / 헤드라이트 디테일 */}
      <Rect
        x="88"
        y="56"
        width="5"
        height="7"
        rx="1"
        fill="#FFD54F"
        stroke={OUTLINE}
        strokeWidth="2"
      />

      {/* 7. 바퀴 3개 (뒤 2개 + 앞 1개) */}
      {/* 뒷바퀴 1 */}
      <Circle
        cx="20"
        cy="74"
        r="10"
        fill={wheelColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
      />
      <Circle cx="20" cy="74" r="4" fill={stripeColor} />

      {/* 뒷바퀴 2 */}
      <Circle
        cx="38"
        cy="74"
        r="10"
        fill={wheelColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
      />
      <Circle cx="38" cy="74" r="4" fill={stripeColor} />

      {/* 앞바퀴 */}
      <Circle
        cx="78"
        cy="74"
        r="10"
        fill={wheelColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
      />
      <Circle cx="78" cy="74" r="4" fill={stripeColor} />
    </Svg>
  );
};
export const Scooter = ({
  colorHex = "#42A5F5",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const frameColor = primary ?? colorHex;
  const detailColor = secondary ?? "#FFEE58"; // 노란색 포인트
  const accentColor = accent ?? "#1565C0";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 1. 뒷바퀴 및 펜더 */}
      <Circle
        cx="20"
        cy="75"
        r="9"
        fill={accentColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />
      <Circle cx="20" cy="75" r="4" fill={detailColor} />
      <Path
        d="M10 75 A10 10 0 0 1 30 75"
        fill="none"
        stroke={detailColor}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <Path
        d="M10 75 A10 10 0 0 1 30 75"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* 2. 앞바퀴 및 펜더 */}
      <Circle
        cx="80"
        cy="75"
        r="9"
        fill={accentColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />
      <Circle cx="80" cy="75" r="4" fill={detailColor} />
      <Path
        d="M70 75 A10 10 0 0 1 90 75"
        fill="none"
        stroke={detailColor}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <Path
        d="M70 75 A10 10 0 0 1 90 75"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* 3. 발판 데크 (Deck) */}
      <Path
        d="M20 78 L78 78 C81 78 82 72 78 72 L20 72 C17 72 17 78 20 78 Z"
        fill={frameColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 4. 손잡이 기둥 (Stem - 사선형 이중 구조) */}
      {/* 하단 고정 기둥 */}
      <Path
        d="M72 72 L78 48"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* 높이 조절부 (노란색 파이프) */}
      <Path
        d="M76 56 L81 36"
        fill="none"
        stroke={detailColor}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <Path
        d="M76 56 L81 36"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* 상단 기둥 */}
      <Path
        d="M79 44 L83 26"
        fill="none"
        stroke={detailColor}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* 5. 핸들바 (Handlebars) */}
      <Path
        d="M73 24 L91 24"
        fill="none"
        stroke={detailColor}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <Path
        d="M73 24 L91 24"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </Svg>
  );
};
export const Taxi = ({
  colorHex = "#FFC107", // 택시 기본 노란색
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const stripeColor = secondary ?? shade(bodyColor, 0.3);
  const wheelColor = accent ?? contrastAccent(bodyColor, "#212121", "#F5F5F5");

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 1. 지붕 위 TAXI 표시판 */}
      <Rect
        x="34"
        y="12"
        width="32"
        height="14"
        rx="2"
        fill={wheelColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* TAXI 텍스트 라인 심볼 */}
      {/* <Path
        d="M39 19 L43 19 M41 19 L41 23 M47 19 L47 23 M51 19 L55 19 M53 19 L53 23 M59 19 L63 19 M61 19 L61 23"
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinecap="round"
      /> */}

      {/* 2. 하단 양옆 바퀴 (둥근 네모 형태) */}
      <Rect
        x="15"
        y="70"
        width="14"
        height="16"
        rx="6"
        fill={wheelColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <Rect
        x="70"
        y="70"
        width="14"
        height="16"
        rx="6"
        fill={wheelColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 3. 자동차 차체 (정면 뷰) */}
      <Path
        d="M15 62 
           L15 48 
           C15 32, 28 26, 50 26 
           C72 26, 85 32, 85 48 
           L85 62 
           C85 76, 75 78, 70 78 
           L30 78 
           C25 78, 15 76, 15 62 Z"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* 4. 좌우 사이드미러 */}
      <Path
        d="M15 46 L9 42 L13 39 Z"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <Path
        d="M85 46 L91 42 L87 39 Z"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* 5. 전면 유리창 (Windshield) */}
      <Path
        d="M22 46 
           C26 34, 36 30, 50 30 
           C64 30, 74 34, 78 46 
           Z"
        fill={stripeColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 6. 양쪽 네모난 전조등 (Headlights) */}
      <Rect
        x="20"
        y="58"
        width="14"
        height="10"
        rx="2"
        fill={stripeColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
      />
      <Rect
        x="66"
        y="58"
        width="14"
        height="10"
        rx="2"
        fill={stripeColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
      />

      {/* 7. 하단 범퍼 라인 */}
      <Path
        d="M22 72 L78 72"
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </Svg>
  );
};
export const Car = ({
  colorHex = "#E53935",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const stripeColor = secondary ?? shade(bodyColor, 0.3);
  const wheelColor = accent ?? contrastAccent(bodyColor, "#212121", "#F5F5F5");

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="M10 68 Q10 50 22 48 L30 32 Q34 26 44 26 L62 26 Q72 26 76 34 L82 48 Q92 50 92 68 Z"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <Path
        d="M32 46 L36 32 Q38 30 42 30 L58 30 Q62 30 64 33 L69 46 Z"
        fill={stripeColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      <Line
        x1="50"
        y1="30"
        x2="50"
        y2="46"
        stroke={OUTLINE}
        strokeWidth="2.5"
      />

      <Circle
        cx="28"
        cy="70"
        r="11"
        fill={wheelColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      <Circle cx="28" cy="70" r="4" fill="#888" />

      <Circle
        cx="72"
        cy="70"
        r="11"
        fill={wheelColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      <Circle cx="72" cy="70" r="4" fill="#888" />

      <Circle cx="18" cy="54" r="3" fill="#FDD835" />

      <Path
        d="M14 58 Q50 66 88 58"
        stroke={stripeColor}
        strokeWidth="3"
        fill="none"
        opacity="0.6"
      />
    </Svg>
  );
};
export const Bus = ({
  colorHex = "#FDD835",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const stripeColor = secondary ?? shade(bodyColor, 0.25);
  const wheelColor = accent ?? contrastAccent(bodyColor, "#5D4037", "#F5F5F5");

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect
        x="10"
        y="24"
        width="80"
        height="48"
        rx="8"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      <Rect
        x="16"
        y="32"
        width="16"
        height="14"
        rx="2"
        fill={stripeColor}
        stroke={OUTLINE}
        strokeWidth="2"
      />

      <Rect
        x="36"
        y="32"
        width="16"
        height="14"
        rx="2"
        fill={stripeColor}
        stroke={OUTLINE}
        strokeWidth="2"
      />

      <Rect
        x="56"
        y="32"
        width="16"
        height="14"
        rx="2"
        fill={stripeColor}
        stroke={OUTLINE}
        strokeWidth="2"
      />

      <Rect
        x="16"
        y="52"
        width="62"
        height="8"
        rx="2"
        fill={stripeColor}
        opacity="0.9"
      />

      <Circle
        cx="28"
        cy="76"
        r="10"
        fill={wheelColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      <Circle cx="28" cy="76" r="4" fill="#888" />

      <Circle
        cx="72"
        cy="76"
        r="10"
        fill={wheelColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      <Circle cx="72" cy="76" r="4" fill="#888" />
    </Svg>
  );
};
export const Train = ({
  colorHex = "#1E88E5",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const stripeColor = secondary ?? shade(bodyColor, 0.25);
  const trimColor = accent ?? contrastAccent(bodyColor, "#5D4037", "#FFEE58");

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect x="16" y="14" width="10" height="14" rx="2" fill="#333" />
      <Rect x="12" y="8" width="18" height="8" rx="2" fill="#333" />

      <Path
        d="M14 30 Q14 22 24 22 L76 22 Q86 22 86 34 L86 68 Q86 76 78 76 L22 76 Q14 76 14 68 Z"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <Rect
        x="26"
        y="33"
        width="16"
        height="18"
        rx="2"
        fill="#fff"
        stroke={OUTLINE}
        strokeWidth="2.5"
      />
      <Rect
        x="58"
        y="33"
        width="16"
        height="18"
        rx="2"
        fill="#fff"
        stroke={OUTLINE}
        strokeWidth="2.5"
      />

      <Circle
        cx="30"
        cy="80"
        r="7"
        fill={stripeColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
      />

      <Circle
        cx="50"
        cy="80"
        r="7"
        fill={stripeColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
      />

      <Circle
        cx="70"
        cy="80"
        r="7"
        fill={stripeColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
      />
      <Rect
        x="26"
        y="77"
        width="48"
        height="5"
        rx="2"
        fill={OUTLINE}
        opacity="0.9"
      />
    </Svg>
  );
};
// export const Train = ({
//   colorHex = "#1E88E5",
//   primary,
//   secondary,
//   accent,
//   size = 70,
// }: ItemSvgProps) => {
//   const bodyColor = primary ?? colorHex;
//   const stripeColor = secondary ?? shade(bodyColor, 0.25);
//   const trimColor = accent ?? contrastAccent(bodyColor, "#5D4037", "#FFEE58");

//   return (
//     <Svg width={size} height={size} viewBox="0 0 100 100">
//       {/* ===== 1. 기관차 (Locomotive) - 살짝 왼쪽으로 이동 ===== */}
//       {/* 상단 굴뚝 */}
//       <Rect x="8" y="14" width="8" height="12" rx="1.5" fill="#333" />
//       <Rect x="6" y="8" width="12" height="6" rx="1.5" fill="#333" />

//       {/* 기관차 본체 */}
//       <Path
//         d="M6 30 Q6 22 16 22 L52 22 Q60 22 60 34 L60 68 Q60 76 52 76 L14 76 Q6 76 6 68 Z"
//         fill={bodyColor}
//         stroke={OUTLINE}
//         strokeWidth="4"
//         strokeLinejoin="round"
//       />

//       {/* 전면 창문 (둥근 사각형 2개) */}
//       <Rect
//         x="10"
//         y="28"
//         width="16"
//         height="18"
//         rx="2"
//         fill="#fff"
//         stroke={OUTLINE}
//         strokeWidth="2.5"
//       />
//       <Rect
//         x="32"
//         y="28"
//         width="16"
//         height="18"
//         rx="2"
//         fill="#fff"
//         stroke={OUTLINE}
//         strokeWidth="2.5"
//       />

//       {/* 전면 그릴 무늬 */}
//       <Rect
//         x="14"
//         y="58"
//         width="34"
//         height="8"
//         rx="2"
//         fill={stripeColor}
//         opacity="0.9"
//       />

//       {/* 기관차 바퀴 3개 */}
//       <Circle
//         cx="18"
//         cy="80"
//         r="6.5"
//         fill={stripeColor}
//         stroke={OUTLINE}
//         strokeWidth="2.5"
//       />
//       <Circle
//         cx="32"
//         cy="80"
//         r="6.5"
//         fill={stripeColor}
//         stroke={OUTLINE}
//         strokeWidth="2.5"
//       />
//       <Circle
//         cx="46"
//         cy="80"
//         r="6.5"
//         fill={stripeColor}
//         stroke={OUTLINE}
//         strokeWidth="2.5"
//       />

//       {/* ===== 2. 연결부 및 기차칸 (Carriage) - 안쪽으로 당김 ===== */}
//       {/* 연결 고리 */}
//       <Rect x="60" y="50" width="10" height="6" fill={OUTLINE} />

//       {/* 기차칸 본체 */}
//       <Rect
//         x="64"
//         y="22"
//         width="30"
//         height="54"
//         rx="4"
//         fill={bodyColor}
//         stroke={OUTLINE}
//         strokeWidth="4"
//         strokeLinejoin="round"
//       />

//       {/* 기차칸 창문 (작은 사각형 2개) */}
//       <Rect
//         x="70"
//         y="28"
//         width="8"
//         height="12"
//         rx="1"
//         fill="#fff"
//         stroke={OUTLINE}
//         strokeWidth="2"
//       />
//       <Rect
//         x="82"
//         y="28"
//         width="8"
//         height="12"
//         rx="1"
//         fill="#fff"
//         stroke={OUTLINE}
//         strokeWidth="2"
//       />

//       {/* 기차칸 하단 띠 */}
//       <Rect
//         x="68"
//         y="58"
//         width="22"
//         height="6"
//         rx="1"
//         fill={stripeColor}
//         opacity="0.9"
//       />

//       {/* 기차칸 바퀴 2개 */}
//       <Circle
//         cx="72"
//         cy="80"
//         r="6.5"
//         fill={stripeColor}
//         stroke={OUTLINE}
//         strokeWidth="2.5"
//       />
//       <Circle
//         cx="88"
//         cy="80"
//         r="6.5"
//         fill={stripeColor}
//         stroke={OUTLINE}
//         strokeWidth="2.5"
//       />
//     </Svg>
//   );
// };
export const Airplane = ({
  colorHex = "#D6D9FA",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex; // 동체 기본 색상 (연연보라/밝은 회보라)
  const wingColor = secondary ?? shade(bodyColor, -0.2); // 날개 및 꼬리날개 (보라/연보라)
  const accentColor = accent ?? "#3A3F98"; // 조종석 창문, 객실 창문, 음영 포인트 (짙은 파랑/보라)

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* ✈️ 1. 뒤쪽 건너편 수평 꼬리날개 (새로 추가) */}
      <Path
        d="M 16 32 C 14 31, 16 25, 23 27 L 28 34 Z"
        fill={shade(wingColor, 0.25)}
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* ✈️ 2. 수직 꼬리날개 (뒤쪽 위) */}
      <Path
        d="M 12 18 C 10 9, 16 9, 21 21 L 28 38 L 18 38 Z"
        fill={wingColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* 수직 꼬리날개 음영 */}
      <Path
        d="M 12 18 C 10 9, 16 9, 21 21 L 21 38 L 18 38 Z"
        fill={accentColor}
        opacity="0.8"
      />

      {/* ✈️ 3. 앞쪽 수평 꼬리날개 (좌측 작은 날개) */}
      <Path
        d="M 10 40 C 8 41, 12 49, 20 48 L 26 42 Z"
        fill={wingColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* ✈️ 4. 비행기 몸통 (유선형 동체 - 우측 머리, 좌측 꼬리) */}
      <Path
        d="
          M 16 38
          C 35 34, 70 33, 88 41
          C 96 45, 96 55, 88 58
          C 65 65, 30 63, 16 52
          C 12 48, 12 42, 16 38
          Z
        "
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* ✈️ 5. 동체 하단 볼륨 음영 */}
      <Path
        d="
          M 16 52
          C 30 63, 65 65, 88 58
          C 94 56, 95 50, 92 48
          C 70 56, 32 55, 16 52
          Z
        "
        fill={shade(bodyColor, -0.3)}
        opacity="0.6"
      />

      {/* ✈️ 6. 조종석 (Front Cockpit Window) */}
      <Path
        d="M 72 40 C 78 36, 88 38, 90 42 C 82 48, 75 48, 72 40 Z"
        fill={accentColor}
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* 조종석 창문 하이라이트 */}
      <Path
        d="M 75 42 C 78 40, 83 40, 85 42"
        fill="none"
        stroke={WHITE}
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* ✈️ 7. 승객용 창문 (타원형 연속 창문들) */}
      <G fill={accentColor}>
        <Rect x="26" y="39" width="3.5" height="4.5" rx="1.8" />
        <Rect x="32" y="39" width="3.5" height="4.5" rx="1.8" />
        <Rect x="38" y="39" width="3.5" height="4.5" rx="1.8" />
        <Rect x="44" y="39" width="3.5" height="4.5" rx="1.8" />
        <Rect x="50" y="39" width="3.5" height="4.5" rx="1.8" />
        <Rect x="56" y="39" width="3.5" height="4.5" rx="1.8" />
        <Rect x="62" y="39" width="3.5" height="4.5" rx="1.8" />
      </G>

      {/* ✈️ 8. 동체 중앙 하이라이트 (광택) */}
      <Path
        d="M 52 36 C 68 36, 80 40, 86 46"
        fill="none"
        stroke={WHITE}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* ✈️ 9. 메인 주날개 (앞쪽 대각선으로 크게 뻗은 날개) */}
      <Path
        d="
          M 40 48
          L 13 82
          C 11 85, 15 88, 19 86
          L 54 52
          Z
        "
        fill={wingColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* 날개 전면 짙은 음영 */}
      <Path
        d="
          M 40 48
          L 13 82
          C 11 85, 13 87, 16 85
          L 42 50
          Z
        "
        fill={accentColor}
        opacity="0.7"
      />
    </Svg>
  );
};

export const Ship = ({
  colorHex = "#FAFAFA",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const hullColor = primary ?? colorHex;
  const upperColor = secondary ?? "#FAFAFA";
  const accentColor = accent ?? "#1565C0";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="M14 62 L86 62 L74 82 Q50 88 26 82 Z"
        fill={hullColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <Rect
        x="32"
        y="38"
        width="36"
        height="24"
        rx="3"
        fill={upperColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
      />

      <Rect
        x="40"
        y="44"
        width="8"
        height="8"
        fill={accentColor}
        stroke={OUTLINE}
        strokeWidth="1.5"
      />

      <Rect
        x="52"
        y="44"
        width="8"
        height="8"
        fill={accentColor}
        stroke={OUTLINE}
        strokeWidth="1.5"
      />

      <Rect
        x="46"
        y="20"
        width="8"
        height="18"
        rx="2"
        fill={accentColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
      />

      <Path
        d="M18 66 Q30 72 42 66 Q54 72 66 66 Q78 72 88 66"
        stroke={accentColor}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.9"
      />
    </Svg>
  );
};
///추가

// ============================================================
// 🚗 VEHICLES
// ============================================================

export const Bicycle = ({
  colorHex = "#42A5F5",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const frameColor = primary ?? colorHex;
  const detailColor = secondary ?? "#BBDEFB";
  const accentColor = accent ?? "#1565C0";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* wheels */}
      <Circle
        cx="25"
        cy="68"
        r="17"
        fill="none"
        stroke={accentColor}
        strokeWidth="4"
      />
      <Circle
        cx="75"
        cy="68"
        r="17"
        fill="none"
        stroke={accentColor}
        strokeWidth="4"
      />

      {/* wheel inner highlight */}
      <Circle cx="25" cy="68" r="13" fill={detailColor} opacity="0.55" />
      <Circle cx="75" cy="68" r="13" fill={detailColor} opacity="0.55" />

      {/* frame */}
      <Path
        d="M25 68 L42 40 L57 68 L25 68 M42 40 L68 40 L57 68 M42 40 L35 68"
        fill="none"
        stroke={accentColor}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* handle */}
      <Path
        d="M68 40 L73 34 L79 34"
        fill="none"
        stroke={accentColor}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* seat */}
      <Path
        d="M37 38 L46 38"
        stroke={accentColor}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* pedal */}
      <Circle
        cx="57"
        cy="68"
        r="4"
        fill={accentColor}
        stroke={OUTLINE}
        strokeWidth="2"
      />
      <Line
        x1="57"
        y1="68"
        x2="63"
        y2="73"
        stroke={accentColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </Svg>
  );
};

// ------------------------------------------------------------

export const Helicopter = ({
  colorHex = "#42A5F5",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const windowColor = secondary ?? "#BBDEFB";
  const accentColor = accent ?? "#1565C0";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* main body */}
      <Path
        d="M25 52
           Q25 37 42 34
           L62 34
           Q73 35 78 45
           L78 58
           Q72 66 58 66
           L39 66
           Q27 64 25 52 Z"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* window */}
      <Path
        d="M48 39
           L61 39
           Q68 40 71 46
           L71 52
           L50 52 Z"
        fill={windowColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      {/* tail */}
      <Path
        d="M27 47 L11 38 L10 43 L25 55"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* tail rotor */}
      <Line
        x1="10"
        y1="32"
        x2="10"
        y2="50"
        stroke={accentColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Line
        x1="3"
        y1="41"
        x2="17"
        y2="41"
        stroke={accentColor}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* top mast */}
      <Line
        x1="50"
        y1="34"
        x2="50"
        y2="20"
        stroke={accentColor}
        strokeWidth="3"
      />

      {/* main rotor */}
      <Line
        x1="25"
        y1="20"
        x2="75"
        y2="20"
        stroke={accentColor}
        strokeWidth="4"
        strokeLinecap="round"
      />

      <Circle
        cx="50"
        cy="20"
        r="4"
        fill={accentColor}
        stroke={OUTLINE}
        strokeWidth="2"
      />

      {/* landing skids */}
      <Path
        d="M32 67 L27 75 M68 67 L73 75 M24 75 L38 75 M62 75 L76 75"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </Svg>
  );
};

// ------------------------------------------------------------

export const Boat = ({
  colorHex = "#42A5F5",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const hullColor = primary ?? colorHex;
  const sailColor = secondary ?? "#E3F2FD";
  const accentColor = accent ?? "#1565C0";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* mast */}
      <Line
        x1="52"
        y1="20"
        x2="52"
        y2="66"
        stroke={accentColor}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* sail */}
      <Path
        d="M50 22 L50 55 L25 55 Z"
        fill={sailColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* small sail */}
      <Path
        d="M55 31 L55 55 L73 55 Z"
        fill={secondary ?? "#BBDEFB"}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* hull */}
      <Path
        d="M15 63
           L86 63
           L76 77
           Q50 88 24 77
           Z"
        fill={hullColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* hull accent */}
      <Path
        d="M22 68 Q50 76 80 68"
        fill="none"
        stroke={accentColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export const Submarine = ({
  colorHex = "#FDD835",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const bodyColor = primary ?? "#B982C5";
  const windowColor = secondary ?? "#9DDDF4";
  const detailColor = accent ?? "#5D929D";
  const outlineColor = OUTLINE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 물결 */}
      <Path
        d="M8 25 Q13 20 18 25 T28 25"
        fill="none"
        stroke={detailColor}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <Path
        d="M68 18 Q73 13 78 18 T88 18"
        fill="none"
        stroke={detailColor}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <Path
        d="M75 29 Q80 24 85 29 T95 29"
        fill="none"
        stroke={detailColor}
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.75}
      />

      {/* 잠망경 */}
      <Path
        d="M42 39 L42 24 Q42 21 46 21 L52 21 Q56 21 56 25 L56 39"
        fill="none"
        stroke={outlineColor}
        strokeWidth={3.5}
        strokeLinejoin="round"
      />
      <Path
        d="M42 24 L42 15 Q42 10 47 10 Q52 10 52 15 L52 21"
        fill={bodyColor}
        stroke={outlineColor}
        strokeWidth={3.5}
        strokeLinejoin="round"
      />

      {/* 잠망경 상단 */}
      <Rect
        x={39}
        y={8}
        width={10}
        height={14}
        rx={5}
        fill="#FDD835"
        stroke={outlineColor}
        strokeWidth={2.5}
      />

      {/* 꼬리 지느러미 - 이미지처럼 뒤쪽으로 튀어나온 형태 */}
      <Path
        d="
          M83 48
          L94 48
          Q97 48 96 52
          L91 64
          L96 76
          Q97 80 93 80
          L84 80
          Q81 80 80 76
          L77 65
          L80 54
          Q81 49 83 48
          Z
        "
        fill={bodyColor}
        stroke={outlineColor}
        strokeWidth={3}
        strokeLinejoin="round"
      />

      {/* 잠수함 몸체 */}
      <Path
        d="
          M12 60
          Q12 43 29 42
          L68 42
          Q84 43 87 58
          Q90 74 72 79
          L29 79
          Q12 76 12 60
          Z
        "
        fill={bodyColor}
        stroke={outlineColor}
        strokeWidth={3.5}
        strokeLinejoin="round"
      />

      {/* 몸체의 은은한 하이라이트 */}
      <Path
        d="M20 51 Q30 44 46 45 L68 45"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.45}
      />

      {/* 창문 테두리 */}
      {[30, 49, 68].map((x) => (
        <Circle
          key={x}
          cx={x}
          cy={60}
          r={7}
          fill="#FFF8E8"
          stroke={outlineColor}
          strokeWidth={2.5}
        />
      ))}

      {/* 창문 안쪽 */}
      {[30, 49, 68].map((x) => (
        <Circle
          key={x}
          cx={x}
          cy={60}
          r={4.5}
          fill={windowColor}
          stroke={outlineColor}
          strokeWidth={1.5}
        />
      ))}

      {/* 창문 반짝임 */}
      {[30, 49, 68].map((x) => (
        <Circle key={x} cx={x - 1.5} cy={58} r={1} fill="#FFFFFF" />
      ))}

      {/* 아래쪽 작은 지느러미 */}
      <Path
        d="M43 78 L40 84 L50 79"
        fill={bodyColor}
        stroke={outlineColor}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
    </Svg>
  );
};

// export const Submarine = ({
//   colorHex = "#FDD835",
//   primary,
//   secondary,
//   accent,
//   size = 95,
// }: ItemSvgProps) => {
//   const bodyColor = primary ?? colorHex;
//   const windowColor = secondary ?? "#BBDEFB";
//   const detailColor = accent ?? "#1565C0";

//   return (
//     <Svg width={size} height={size} viewBox="0 0 100 100">
//       {/* 잠망경 */}
//       <Line
//         x1="57"
//         y1="34"
//         x2="57"
//         y2="21"
//         stroke={detailColor}
//         strokeWidth="4"
//         strokeLinecap="round"
//       />

//       <Path
//         d="M57 21 Q57 16 64 16"
//         fill="none"
//         stroke={detailColor}
//         strokeWidth="4"
//         strokeLinecap="round"
//       />

//       {/* 잠망경 받침 */}
//       <Rect
//         x="51"
//         y="31"
//         width="12"
//         height="8"
//         rx="2"
//         fill={detailColor}
//         stroke={OUTLINE}
//         strokeWidth="2.5"
//       />

//       {/* 몸체 */}
//       <Path
//         d="M13 58
//            Q13 39 30 35
//            L70 35
//            Q87 39 87 58
//            Q87 76 70 80
//            L30 80
//            Q13 76 13 58 Z"
//         fill={bodyColor}
//         stroke={OUTLINE}
//         strokeWidth="4"
//       />

//       {/* 창문 */}
//       <Circle
//         cx="31"
//         cy="56"
//         r="7"
//         fill={windowColor}
//         stroke={OUTLINE}
//         strokeWidth="3"
//       />

//       <Circle
//         cx="50"
//         cy="56"
//         r="7"
//         fill={windowColor}
//         stroke={OUTLINE}
//         strokeWidth="3"
//       />

//       <Circle
//         cx="69"
//         cy="56"
//         r="7"
//         fill={windowColor}
//         stroke={OUTLINE}
//         strokeWidth="3"
//       />

//       {/* 창문 반짝임 */}
//       <Circle cx="29" cy="54" r="2" fill={WHITE} />
//       <Circle cx="48" cy="54" r="2" fill={WHITE} />
//       <Circle cx="67" cy="54" r="2" fill={WHITE} />

//       {/* 아래 지느러미 */}
//       <Path
//         d="M43 79 L39 87 L49 81 Z"
//         fill={detailColor}
//         stroke={OUTLINE}
//         strokeWidth="2.5"
//       />

//       {/* 뒤쪽 프로펠러 */}
//       <Line
//         x1="87"
//         y1="50"
//         x2="94"
//         y2="66"
//         stroke={detailColor}
//         strokeWidth="3"
//         strokeLinecap="round"
//       />

//       <Line
//         x1="94"
//         y1="50"
//         x2="87"
//         y2="66"
//         stroke={detailColor}
//         strokeWidth="3"
//         strokeLinecap="round"
//       />
//     </Svg>
//   );
// };
export const Rocket = ({
  colorHex = "#ECEFF1",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const noseColor = secondary ?? "#CFD8DC";
  const accentColor = accent ?? "#EF5350";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 왼쪽 날개 */}
      <Path
        d="M34 64 L20 78 L36 75 Z"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 오른쪽 날개 */}
      <Path
        d="M66 64 L80 78 L64 75 Z"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 로켓 몸체 */}
      <Path
        d="M50 12
           Q30 27 30 55
           L30 72
           L70 72
           L70 55
           Q70 27 50 12 Z"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 노즈콘 */}
      <Path
        d="M50 12
           Q40 20 36 30
           L64 30
           Q60 20 50 12 Z"
        fill={noseColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      {/* 창문 */}
      <Circle
        cx="50"
        cy="42"
        r="9"
        fill={secondary ?? "#BBDEFB"}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      <Circle cx="47" cy="39" r="3" fill={WHITE} opacity="0.8" />

      {/* 몸체 줄 */}
      <Line
        x1="32"
        y1="57"
        x2="68"
        y2="57"
        stroke={accentColor}
        strokeWidth="3"
      />

      {/* 엔진 */}
      <Rect
        x="39"
        y="70"
        width="9"
        height="7"
        fill={accentColor}
        stroke={OUTLINE}
        strokeWidth="2"
      />

      <Rect
        x="52"
        y="70"
        width="9"
        height="7"
        fill={accentColor}
        stroke={OUTLINE}
        strokeWidth="2"
      />

      {/* 불꽃 */}
      <Path
        d="M40 77
           Q40 87 45 94
           Q50 88 50 78
           Q54 88 59 94
           Q64 86 60 77 Z"
        fill={noseColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      <Path d="M46 79 Q50 87 50 90 Q54 85 54 79 Z" fill="#F4511E" />
    </Svg>
  );
};
export const HotAirBalloon = ({
  colorHex = "#EF5350",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const balloonColor = primary ?? colorHex;
  const stripeColor = secondary ?? "#FFCDD2";
  const accentColor = accent ?? "#F9A825";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 풍선 */}
      <Ellipse
        cx="50"
        cy="36"
        rx="30"
        ry="28"
        fill={balloonColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 풍선 중앙 줄무늬 */}
      <Path
        d="M50 9 Q43 36 50 64"
        fill="none"
        stroke={stripeColor}
        strokeWidth="9"
      />

      <Path
        d="M35 13 Q28 36 37 60"
        fill="none"
        stroke={stripeColor}
        strokeWidth="7"
        opacity="0.8"
      />

      <Path
        d="M65 13 Q72 36 63 60"
        fill="none"
        stroke={stripeColor}
        strokeWidth="7"
        opacity="0.8"
      />

      {/* 연결 줄 */}
      <Line x1="36" y1="59" x2="42" y2="75" stroke={OUTLINE} strokeWidth="2" />

      <Line x1="64" y1="59" x2="58" y2="75" stroke={OUTLINE} strokeWidth="2" />

      {/* 바구니 */}
      <Path
        d="M40 74 L60 74 L57 88 L43 88 Z"
        fill={accentColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 바구니 위쪽 */}
      <Rect
        x="39"
        y="72"
        width="22"
        height="6"
        rx="2"
        fill={stripeColor}
        stroke={OUTLINE}
        strokeWidth="2"
      />
    </Svg>
  );
};
export const Truck = ({
  colorHex = "#42A5F5",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const windowColor = secondary ?? "#BBDEFB";
  const detailColor = accent ?? "#1565C0";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 짐칸 */}
      <Rect
        x="12"
        y="34"
        width="48"
        height="36"
        rx="3"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 운전석 */}
      <Path
        d="M60 47
           L72 47
           L86 58
           L86 70
           L60 70 Z"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 앞유리 */}
      <Path
        d="M64 50 L71 50 L80 58 L64 58 Z"
        fill={windowColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
      />

      {/* 문 */}
      <Line
        x1="62"
        y1="48"
        x2="62"
        y2="70"
        stroke={detailColor}
        strokeWidth="2.5"
      />

      {/* 문 손잡이 */}
      <Line
        x1="65"
        y1="62"
        x2="70"
        y2="62"
        stroke={detailColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* 범퍼 */}
      <Rect
        x="82"
        y="67"
        width="9"
        height="6"
        rx="2"
        fill={detailColor}
        stroke={OUTLINE}
        strokeWidth="2"
      />

      {/* 바퀴 */}
      <Circle
        cx="28"
        cy="73"
        r="11"
        fill="#333"
        stroke={OUTLINE}
        strokeWidth="3"
      />

      <Circle cx="28" cy="73" r="5" fill={secondary ?? "#CFD8DC"} />

      <Circle
        cx="73"
        cy="73"
        r="11"
        fill="#333"
        stroke={OUTLINE}
        strokeWidth="3"
      />

      <Circle cx="73" cy="73" r="5" fill={secondary ?? "#CFD8DC"} />

      {/* 짐칸 디테일 */}
      <Line
        x1="18"
        y1="42"
        x2="54"
        y2="42"
        stroke={secondary ?? "#FFFFFF"}
        strokeWidth="3"
        opacity="0.8"
      />
    </Svg>
  );
};
export const Excavator = ({
  colorHex = "#FDD835",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const windowColor = secondary ?? "#FFF9C4";
  const detailColor = accent ?? "#F9A825";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 바닥 궤도 */}
      <Rect
        x="13"
        y="75"
        width="65"
        height="11"
        rx="5"
        fill={detailColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 궤도 내부 */}
      <Line
        x1="20"
        y1="80"
        x2="71"
        y2="80"
        stroke={secondary ?? "#FFF9C4"}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* 차체 */}
      <Rect
        x="22"
        y="57"
        width="45"
        height="21"
        rx="4"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 운전석 */}
      <Path
        d="M35 57 L35 39 Q36 34 42 34 L57 34 Q63 35 64 42 L64 57 Z"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 창문 */}
      <Path
        d="M39 40 L55 40 Q59 40 60 45 L60 51 L39 51 Z"
        fill={windowColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
      />

      {/* 회전축 */}
      <Circle
        cx="42"
        cy="58"
        r="7"
        fill={detailColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      {/* 첫 번째 붐 */}
      <Path
        d="M45 49 L60 30 L68 33 L53 57 Z"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 두 번째 암 */}
      <Path
        d="M64 31 L77 39 L87 57 L80 60 L70 43 L58 36 Z"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 버킷 */}
      <Path
        d="M80 55
           L94 59
           L88 75
           Q82 79 76 73
           L79 60 Z"
        fill={detailColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
export const Subway = ({
  colorHex = "#ECEFF1",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const windowColor = secondary ?? "#90CAF9";
  const detailColor = accent ?? "#1565C0";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 차량 몸체 (날씬하게 조정) */}
      <Path
        d="M25 70 
           L25 32 
           Q25 24 35 24 
           L65 24 
           Q75 24 75 32 
           L75 70 
           Z"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 전면 유리 (몸체에 맞춰 날씬하게 조정) */}
      <Path
        d="M32 30 
           L68 30 
           Q72 30 72 35 
           L72 47 
           L28 47 
           L28 35 
           Q28 30 32 30 Z"
        fill={windowColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      {/* 중앙 전면 구분 */}
      <Line
        x1="50"
        y1="30"
        x2="50"
        y2="47"
        stroke={detailColor}
        strokeWidth="2.5"
      />

      {/* 하단 띠 */}
      <Rect x="26" y="50" width="48" height="8" fill={detailColor} />

      {/* 문 */}
      <Line
        x1="40"
        y1="58"
        x2="40"
        y2="66"
        stroke={secondary ?? "#FFFFFF"}
        strokeWidth="2"
      />

      <Line
        x1="60"
        y1="58"
        x2="60"
        y2="66"
        stroke={secondary ?? "#FFFFFF"}
        strokeWidth="2"
      />

      {/* 바퀴 */}
      <Circle
        cx="35"
        cy="76"
        r="8"
        fill="#333"
        stroke={OUTLINE}
        strokeWidth="3"
      />

      <Circle
        cx="65"
        cy="76"
        r="8"
        fill="#333"
        stroke={OUTLINE}
        strokeWidth="3"
      />

      {/* 전조등 */}
      <Circle
        cx="32"
        cy="53"
        r="3"
        fill={secondary ?? "#FFF9C4"}
        stroke={OUTLINE}
        strokeWidth="1.5"
      />

      <Circle
        cx="68"
        cy="53"
        r="3"
        fill={secondary ?? "#FFF9C4"}
        stroke={OUTLINE}
        strokeWidth="1.5"
      />
    </Svg>
  );
};
// export const Subway = ({
//   colorHex = "#ECEFF1",
//   primary,
//   secondary,
//   accent,
//   size = 95,
// }: ItemSvgProps) => {
//   const bodyColor = primary ?? colorHex;
//   const windowColor = secondary ?? "#90CAF9";
//   const detailColor = accent ?? "#1565C0";

//   return (
//     <Svg width={size} height={size} viewBox="0 0 100 100">
//       {/* 차량 몸체 */}
//       <Path
//         d="M15 70
//            L15 37
//            Q15 28 25 28
//            L75 28
//            Q85 28 85 37
//            L85 70
//            Z"
//         fill={bodyColor}
//         stroke={OUTLINE}
//         strokeWidth="4"
//         strokeLinejoin="round"
//       />

//       {/* 넓은 전면 유리 */}
//       <Path
//         d="M25 35
//            L75 35
//            Q79 35 79 40
//            L79 52
//            L21 52
//            L21 40
//            Q21 35 25 35 Z"
//         fill={windowColor}
//         stroke={OUTLINE}
//         strokeWidth="3"
//       />

//       {/* 중앙 전면 구분 */}
//       <Line
//         x1="50"
//         y1="35"
//         x2="50"
//         y2="52"
//         stroke={detailColor}
//         strokeWidth="2.5"
//       />

//       {/* 하단 띠 */}
//       <Rect x="16" y="55" width="68" height="8" fill={detailColor} />

//       {/* 문 */}
//       <Line
//         x1="34"
//         y1="63"
//         x2="34"
//         y2="72"
//         stroke={secondary ?? "#FFFFFF"}
//         strokeWidth="2"
//       />

//       <Line
//         x1="66"
//         y1="63"
//         x2="66"
//         y2="72"
//         stroke={secondary ?? "#FFFFFF"}
//         strokeWidth="2"
//       />

//       {/* 바퀴 */}
//       <Circle
//         cx="29"
//         cy="76"
//         r="8"
//         fill="#333"
//         stroke={OUTLINE}
//         strokeWidth="3"
//       />

//       <Circle
//         cx="71"
//         cy="76"
//         r="8"
//         fill="#333"
//         stroke={OUTLINE}
//         strokeWidth="3"
//       />

//       {/* 전조등 */}
//       <Circle
//         cx="25"
//         cy="58"
//         r="3"
//         fill={secondary ?? "#FFF9C4"}
//         stroke={OUTLINE}
//         strokeWidth="1.5"
//       />

//       <Circle
//         cx="75"
//         cy="58"
//         r="3"
//         fill={secondary ?? "#FFF9C4"}
//         stroke={OUTLINE}
//         strokeWidth="1.5"
//       />
//     </Svg>
//   );
// };
export const CementMixer = ({
  colorHex = "#FFA726",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const drumColor = secondary ?? "#FFE0B2";
  const detailColor = accent ?? "#EF6C00";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 트럭 적재부 */}
      <Rect
        x="10"
        y="49"
        width="37"
        height="25"
        rx="3"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 운전석 */}
      <Path
        d="M47 53
           L63 53
           L76 63
           L76 74
           L47 74 Z"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 운전석 창문 */}
      <Path
        d="M51 56 L61 56 L69 63 L51 63 Z"
        fill={drumColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
      />

      {/* 회전 드럼 */}
      <Ellipse
        cx="57"
        cy="43"
        rx="25"
        ry="17"
        fill={drumColor}
        stroke={OUTLINE}
        strokeWidth="4"
        transform="rotate(-18 57 43)"
      />

      {/* 드럼 중앙 줄무늬 */}
      <Path
        d="M42 32 Q52 43 70 54"
        fill="none"
        stroke={detailColor}
        strokeWidth="4"
      />

      <Path
        d="M36 39 Q48 49 63 56"
        fill="none"
        stroke={detailColor}
        strokeWidth="4"
      />

      {/* 드럼 뒤쪽 축 */}
      <Circle
        cx="77"
        cy="46"
        r="5"
        fill={detailColor}
        stroke={OUTLINE}
        strokeWidth="2"
      />

      {/* 뒷부분 */}
      <Path
        d="M77 49 L88 55 L88 69 L76 69"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 바퀴 */}
      <Circle
        cx="27"
        cy="76"
        r="10"
        fill="#333"
        stroke={OUTLINE}
        strokeWidth="3"
      />

      <Circle
        cx="67"
        cy="76"
        r="10"
        fill="#333"
        stroke={OUTLINE}
        strokeWidth="3"
      />

      {/* 바퀴 중심 */}
      <Circle cx="27" cy="76" r="4" fill={drumColor} />

      <Circle cx="67" cy="76" r="4" fill={drumColor} />
    </Svg>
  );
};

// ============================================================
// 🍬 SNACK
// ============================================================

export const Candy = ({
  colorHex = "#EC407A",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const candyColor = primary ?? colorHex;
  const wrapperColor = secondary ?? "#F8BBD0";
  const accentColor = accent ?? "#AD1457";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* left wrapper */}
      <Path
        d="M35 42 L16 32 L21 50 L16 68 L35 58 Z"
        fill={wrapperColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* right wrapper */}
      <Path
        d="M65 42 L84 32 L79 50 L84 68 L65 58 Z"
        fill={wrapperColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* candy */}
      <Circle
        cx="50"
        cy="50"
        r="18"
        fill={candyColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* candy shine */}
      <Circle
        cx="44"
        cy="44"
        r="5"
        fill={secondary ?? "#FFFFFF"}
        opacity="0.7"
      />

      {/* wrapper lines */}
      <Line
        x1="21"
        y1="50"
        x2="33"
        y2="50"
        stroke={accentColor}
        strokeWidth="2"
      />
      <Line
        x1="79"
        y1="50"
        x2="67"
        y2="50"
        stroke={accentColor}
        strokeWidth="2"
      />
    </Svg>
  );
};

// ------------------------------------------------------------

export const Donut = ({
  colorHex = "#FFAB91",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const donutColor = primary ?? colorHex;
  const icingColor = secondary ?? "#F8BBD0";
  const accentColor = accent ?? "#C2185B";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* donut body */}
      <Circle
        cx="50"
        cy="50"
        r="34"
        fill={donutColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* icing */}
      <Path
        d="M19 48
           Q25 29 45 26
           Q66 22 79 37
           Q84 44 81 51
           Q73 46 66 51
           Q58 57 51 51
           Q43 44 36 51
           Q27 57 19 48 Z"
        fill={icingColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
      />

      {/* hole */}
      <Circle
        cx="50"
        cy="50"
        r="11"
        fill="#FFF8E1"
        stroke={OUTLINE}
        strokeWidth="3"
      />

      {/* sprinkles */}
      <Line
        x1="31"
        y1="39"
        x2="35"
        y2="37"
        stroke={accentColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Line
        x1="65"
        y1="35"
        x2="68"
        y2="38"
        stroke={accentColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Line
        x1="70"
        y1="48"
        x2="74"
        y2="47"
        stroke={accentColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </Svg>
  );
};

// ------------------------------------------------------------

export const Chocolate = ({
  colorHex = "#8D6E63",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const chocolateColor = primary ?? colorHex;
  const highlightColor = secondary ?? "#D7CCC8";
  const gridColor = accent ?? "#4E342E";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect
        x="20"
        y="20"
        width="60"
        height="60"
        rx="5"
        fill={chocolateColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* grid */}
      <Line
        x1="40"
        y1="20"
        x2="40"
        y2="80"
        stroke={gridColor}
        strokeWidth="3"
      />
      <Line
        x1="60"
        y1="20"
        x2="60"
        y2="80"
        stroke={gridColor}
        strokeWidth="3"
      />
      <Line
        x1="20"
        y1="40"
        x2="80"
        y2="40"
        stroke={gridColor}
        strokeWidth="3"
      />
      <Line
        x1="20"
        y1="60"
        x2="80"
        y2="60"
        stroke={gridColor}
        strokeWidth="3"
      />

      {/* highlight */}
      <Path
        d="M27 28 L48 28"
        stroke={highlightColor}
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.65"
      />
    </Svg>
  );
};

// ============================================================
// 🐷 LAND ANIMALS
// ============================================================

export const Pig = ({
  colorHex = "#F48FB1",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const faceColor = primary ?? colorHex;
  const snoutColor = secondary ?? "#FCE4EC";
  const accentColor = accent ?? "#C2185B";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* ears */}
      <Circle
        cx="27"
        cy="32"
        r="11"
        fill={faceColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />
      <Circle
        cx="73"
        cy="32"
        r="11"
        fill={faceColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      {/* face */}
      <Circle
        cx="50"
        cy="52"
        r="31"
        fill={faceColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* eyes */}
      <Circle cx="39" cy="48" r="3.5" fill={OUTLINE} />
      <Circle cx="61" cy="48" r="3.5" fill={OUTLINE} />

      {/* snout */}
      <Ellipse
        cx="50"
        cy="64"
        rx="15"
        ry="10"
        fill={snoutColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      {/* nostrils */}
      <Ellipse cx="44" cy="64" rx="3" ry="2.5" fill={accentColor} />
      <Ellipse cx="56" cy="64" rx="3" ry="2.5" fill={accentColor} />
    </Svg>
  );
};

// ------------------------------------------------------------

export const Bear = ({
  colorHex = "#8D6E63",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const furColor = primary ?? colorHex;
  const innerColor = secondary ?? "#D7CCC8";
  const accentColor = accent ?? "#4E342E";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* ears */}
      <Circle
        cx="28"
        cy="30"
        r="14"
        fill={furColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />
      <Circle
        cx="72"
        cy="30"
        r="14"
        fill={furColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* inner ears */}
      <Circle cx="28" cy="30" r="7" fill={innerColor} />
      <Circle cx="72" cy="30" r="7" fill={innerColor} />

      {/* face */}
      <Circle
        cx="50"
        cy="53"
        r="30"
        fill={furColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* muzzle */}
      <Ellipse cx="50" cy="64" rx="15" ry="11" fill={innerColor} />

      {/* eyes */}
      <Circle cx="39" cy="50" r="4" fill={OUTLINE} />
      <Circle cx="61" cy="50" r="4" fill={OUTLINE} />

      {/* nose */}
      <Ellipse cx="50" cy="61" rx="5" ry="4" fill={accentColor} />

      {/* mouth */}
      <Path
        d="M50 65 Q46 70 42 69 M50 65 Q54 70 58 69"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
};

// ------------------------------------------------------------

export const Cow = ({
  colorHex = "#FAFAFA",
  primary,
  secondary,
  accent,
  pattern,
  size = 95,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const patchColor = accent ?? "#424242";
  const hornColor = secondary ?? "#FFF8E1";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* horns */}
      <Path
        d="M31 30 Q24 19 29 14 Q35 18 39 28"
        fill={hornColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Path
        d="M69 30 Q76 19 71 14 Q65 18 61 28"
        fill={hornColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* ears */}
      <Ellipse
        cx="25"
        cy="35"
        rx="10"
        ry="6"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />
      <Ellipse
        cx="75"
        cy="35"
        rx="10"
        ry="6"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      {/* face */}
      <Ellipse
        cx="50"
        cy="54"
        rx="30"
        ry="29"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* patches */}
      <Path
        d="M29 45 Q36 35 44 41 Q47 49 40 55 Q31 57 29 45 Z"
        fill={patchColor}
      />
      <Path
        d="M62 36 Q72 35 75 44 Q73 51 65 50 Q59 45 62 36 Z"
        fill={patchColor}
      />
      <Path
        d="M55 64 Q65 59 71 66 Q69 76 58 77 Q52 72 55 64 Z"
        fill={patchColor}
      />

      {/* eyes */}
      <Circle cx="39" cy="53" r="3.5" fill={OUTLINE} />
      <Circle cx="61" cy="53" r="3.5" fill={OUTLINE} />

      {/* muzzle */}
      <Ellipse
        cx="50"
        cy="67"
        rx="14"
        ry="9"
        fill={hornColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
      />

      <Circle cx="44" cy="67" r="2.5" fill={OUTLINE} />
      <Circle cx="56" cy="67" r="2.5" fill={OUTLINE} />
    </Svg>
  );
};

// ============================================================
// 🦉 BIRDS
// ============================================================

export const Owl = ({
  colorHex = "#8D6E63",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const eyeColor = secondary ?? "#FFF8E1";
  const beakColor = accent ?? "#F9A825";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* pointed ear feathers */}
      <Path
        d="M24 36 L29 17 L40 34"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <Path
        d="M60 34 L71 17 L76 36"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* body/head */}
      <Ellipse
        cx="50"
        cy="56"
        rx="31"
        ry="34"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* eyes */}
      <Circle
        cx="38"
        cy="49"
        r="12"
        fill={eyeColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />
      <Circle
        cx="62"
        cy="49"
        r="12"
        fill={eyeColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      <Circle cx="38" cy="49" r="5" fill={OUTLINE} />
      <Circle cx="62" cy="49" r="5" fill={OUTLINE} />

      {/* beak */}
      <Polygon
        points="50,52 44,62 56,62"
        fill={beakColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
      />

      {/* belly */}
      <Ellipse
        cx="50"
        cy="76"
        rx="16"
        ry="9"
        fill={secondary ?? "#D7CCC8"}
        opacity="0.75"
      />
      <Path
        d="M38 89 L35 95 M38 89 L42 95 M62 89 L58 95 M62 89 L66 95"
        fill="none"
        stroke={secondary}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export const Sparrow = ({
  colorHex = "#A1785C",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const brownColor = primary ?? colorHex; // 머리와 날개 (따뜻한 갈색)
  const bellyColor = secondary ?? "#F5EBE6"; // 배/가슴 (밝은 아이보리)
  const beakColor = accent ?? "#E0986B"; // 부리 및 다리 (살구색)
  const patchColor = shade(brownColor, -0.2); // 눈가 볼 무늬 (짙은 갈색)

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 🐦 1. 꼬리 깃털 */}
      <Path
        d="M 28 65 L 10 73 C 8 76, 12 79, 15 76 L 33 67 Z"
        fill={brownColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <Path
        d="M 25 68 L 13 78 C 11 81, 15 83, 18 80 L 30 71 Z"
        fill={shade(brownColor, -0.15)}
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* 🐦 2. 하얀 가슴/배 전체 몸통 */}
      <Path
        d="
          M 48 15
          C 65 15, 75 28, 75 42
          C 75 60, 60 72, 32 68
          C 20 62, 28 48, 38 35
          C 42 22, 44 15, 48 15
          Z
        "
        fill={bellyColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* 🐦 3. 갈색 머리 & 등 라인 */}
      <Path
        d="
          M 48 15
          C 36 15, 30 28, 22 45
          C 18 53, 20 58, 25 63
          C 32 50, 42 34, 53 28
          C 53 20, 52 15, 48 15
          Z
        "
        fill={brownColor}
      />

      {/* 🐦 4. 눈가 주변 갈색 반점 패치 */}
      <Path
        d="M 52 23 C 65 23, 68 32, 62 38 C 55 42, 50 35, 52 23 Z"
        fill={patchColor}
      />

      {/* 🐦 5. 눈 위의 밝은 눈썹선 */}
      <Path
        d="M 50 20 Q 60 21 66 26"
        fill="none"
        stroke={bellyColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* 👀 6. 동그란 까만 눈 & 하이라이트 */}
      <Circle cx="60" cy="28" r="3.5" fill={OUTLINE} />
      <Circle cx="61.5" cy="26.8" r="1" fill={WHITE} />

      {/* 🐦 7. 날개 깃털 (결 무늬 포함) */}
      <Path
        d="
          M 48 33
          C 35 40, 22 52, 20 60
          C 26 62, 36 55, 48 44
          Z
        "
        fill={brownColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <Path
        d="M 28 55 Q 36 50 42 43"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="2"
      />
      <Path
        d="M 24 58 Q 32 53 38 47"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="2"
      />

      {/* 🐦 8. 세모난 부리 */}
      <Path
        d="M 70 26 L 82 28 L 72 34 Z"
        fill={beakColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <Path
        d="M 70 29 L 80 29"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="1.5"
      />

      {/* 🐦 9. 새 다리 (양쪽 발가락) */}
      <Path
        d="M 44 68 L 40 78 M 40 78 L 35 81 M 40 78 L 40 83 M 40 78 L 44 82"
        fill="none"
        stroke={beakColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M 52 68 L 50 78 M 50 78 L 45 81 M 50 78 L 50 83 M 50 78 L 54 82"
        fill="none"
        stroke={beakColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 외곽선 다듬기 */}
      <Path
        d="
          M 48 15
          C 65 15, 75 28, 75 42
          C 75 60, 60 72, 32 68
          C 20 62, 20 50, 30 35
          C 38 20, 42 15, 48 15
          Z
        "
        fill="none"
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
export const Parrot = ({
  colorHex = "#E53935",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const wingColor = secondary ?? "#1E88E5";
  const yellowWing = "#FDD835";
  const beakColor = accent ?? "#FFB74D";
  const eyeAreaColor = "#FFF8E1";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 🦜 1. 나뭇가지 */}
      <Path
        d="M 38 78 L 82 74"
        fill="none"
        stroke="#795548"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* 🦜 2. 길게 내려오는 붉은 꼬리 깃털 */}
      <Path
        d="M 28 72 L 12 92 C 10 95, 14 97, 18 94 L 33 76 Z"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <Path
        d="M 23 76 L 18 94 C 17 96, 21 98, 23 95 L 35 77 Z"
        fill={shade(bodyColor, -0.2)}
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* 🦜 3. 앵무새 몸통 */}
      <Path
        d="
          M 52 10
          C 72 10, 80 22, 78 40
          C 76 58, 72 73, 50 75
          C 36 76, 32 60, 36 48
          C 39 38, 38 22, 52 10
          Z
        "
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* 🦜 4. 머리 벼슬 */}
      <Path
        d="M 70 12 Q 78 10 73 17 Q 80 16 75 22"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 🦜 5. 눈 주변 패치 */}
      <Path
        d="
          M 46 22
          C 58 18, 68 22, 68 34
          C 68 44, 52 46, 44 38
          C 40 32, 40 24, 46 22
          Z
        "
        fill={eyeAreaColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
      />

      {/* 👀 6. 눈 & 볼 디테일 */}
      <Circle cx="56" cy="31" r="4" fill={OUTLINE} />
      <Circle cx="57.5" cy="29.5" r="1.3" fill={WHITE} />
      <Circle cx="59" cy="38" r="0.8" fill="#D7CCC8" />
      <Circle cx="62" cy="37" r="0.8" fill="#D7CCC8" />

      {/* 🦜 7. 부리 */}
      <Path
        d="M 40 36 C 38 42, 48 44, 50 38 Z"
        fill="#424242"
        stroke={OUTLINE}
        strokeWidth="2"
      />
      <Path
        d="
          M 46 24
          C 32 22, 30 36, 38 40
          C 44 42, 49 35, 48 29
          Z
        "
        fill={beakColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <Path
        d="M 36 27 Q 34 32 38 35"
        fill="none"
        stroke={WHITE}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* 🦜 8. 날개 깃털 레이어 (빨강 -> 노랑 -> 파랑) */}
      {/* 1) 빨간색 상단 깃털 */}
      <Path
        d="
          M 34 40
          C 24 42, 28 54, 38 52
          C 44 50, 48 44, 42 40
          Z
        "
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* 2) 노란색 중간 깃털 */}
      <Path
        d="
          M 25 45
          C 20 52, 22 58, 28 61
          C 34 64, 40 58, 42 50
          Z
        "
        fill={yellowWing}
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* 3) 파란색 하단 깃털 (노란 깃털 아래로 딱 맞게 정돈) */}
      <Path
        d="
          M 25 55
          C 20 62, 18 72, 23 78
          C 26 81, 30 76, 32 70
          C 35 77, 39 76, 40 68
          C 42 61, 38 56, 32 58
          Z
        "
        fill={wingColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* 🦜 9. 발가락 */}
      <Circle
        cx="52"
        cy="75"
        r="2"
        fill="#FFB74D"
        stroke={OUTLINE}
        strokeWidth="1.5"
      />
      <Circle
        cx="56"
        cy="75"
        r="2"
        fill="#FFB74D"
        stroke={OUTLINE}
        strokeWidth="1.5"
      />
      <Circle
        cx="60"
        cy="74"
        r="2"
        fill="#FFB74D"
        stroke={OUTLINE}
        strokeWidth="1.5"
      />
    </Svg>
  );
};

// ============================================================
// 🌊 SEA ANIMALS
// ============================================================
export const Jellyfish = ({
  colorHex = "#64B5F6",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const highlightColor = secondary ?? "#E3F2FD";
  const tentacleColor = accent ?? "#1976D2";

  // 👁️ 눈동자가 몸통 색상 위에서 또렷하게 보이도록 어두운 색상 설정
  const eyeColor = contrastAccent(bodyColor, "#1A237E", "#222");

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 🪼 1. 촉수 (머리 아래쪽에서 자연스럽게 내려오도록 y 위치 조정) */}
      <Path
        d="M32 58 Q27 69 32 79 Q36 84 31 89"
        fill="none"
        stroke={tentacleColor}
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      <Path
        d="M43 59 Q38 70 44 80 Q48 85 43 91"
        fill="none"
        stroke={tentacleColor}
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      <Path
        d="M55 59 Q50 70 56 80 Q60 85 55 91"
        fill="none"
        stroke={tentacleColor}
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      <Path
        d="M66 58 Q61 69 67 79 Q71 84 66 89"
        fill="none"
        stroke={tentacleColor}
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* 🪼 2. 더 길어진 둥근 우산 머리 (y범위 16 ~ 58로 확충) */}
      <Path
        d="
          M20 54
          Q20 16 50 16
          Q80 16 80 54
          Q72 48 65 54
          Q58 59 50 53
          Q42 59 35 54
          Q28 48 20 54
          Z
        "
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 🪼 3. 머리 은은한 하이라이트 */}
      <Path
        d="M29 32 Q38 22 50 22"
        fill="none"
        stroke={highlightColor}
        strokeWidth="4.5"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* 👀 4. 초롱초롱한 눈 */}
      {/* 흰자 */}
      <Circle cx="38" cy="38" r="5" fill={WHITE} />
      <Circle cx="62" cy="38" r="5" fill={WHITE} />

      {/* 눈동자 */}
      <Circle cx="39" cy="39" r="2.5" fill={eyeColor} />
      <Circle cx="63" cy="39" r="2.5" fill={eyeColor} />

      {/* 하이라이트 반짝이 */}
      <Circle cx="40" cy="37.5" r="1" fill={WHITE} />
      <Circle cx="64" cy="37.5" r="1" fill={WHITE} />

      {/* 😊 5. 방긋 웃는 입 */}
      <Path
        d="M45 44 Q50 49 55 44"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="2.3"
        strokeLinecap="round"
      />

      {/* 🩷 6. 수줍은 핑크 볼터치 */}
      <Circle cx="30" cy="43" r="3.5" fill="#F48FB1" opacity="0.75" />
      <Circle cx="70" cy="43" r="3.5" fill="#F48FB1" opacity="0.75" />
    </Svg>
  );
};

// ------------------------------------------------------------
export const Crab = ({
  colorHex = "#EF5350",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const secondaryColor = secondary ?? shade(mainColor, 0.25);
  const accentColor = accent ?? contrastAccent(mainColor);

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 🦀 아래쪽 작은 다리 */}
      <Path
        d="M30 66 Q23 72 22 78"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinecap="round"
      />

      <Path
        d="M37 69 Q31 76 31 81"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinecap="round"
      />

      <Path
        d="M63 69 Q69 76 69 81"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinecap="round"
      />

      <Path
        d="M70 66 Q77 72 78 78"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* 왼쪽 큰 집게 */}
      <Path
        d="
          M28 43
          C20 43 13 38 11 31
          C10 26 14 23 18 25
          C22 27 24 31 26 34
          C23 28 25 22 29 21
          C33 21 35 25 33 30
          C32 35 31 39 28 43
          Z
        "
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* 오른쪽 큰 집게 */}
      <Path
        d="
          M72 43
          C80 43 87 38 89 31
          C90 26 86 23 82 25
          C78 27 76 31 74 34
          C77 28 75 22 71 21
          C67 21 65 25 67 30
          C68 35 69 39 72 43
          Z
        "
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* 🦀 빵빵한 몸통 */}
      <Path
        d="
          M22 48
          C22 38 34 32 50 32
          C66 32 78 38 78 48
          C78 61 69 71 50 72
          C31 71 22 61 22 48
          Z
        "
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 배 */}
      <Path
        d="
          M29 57
          C36 65 44 67 50 67
          C56 67 64 65 71 57
          C67 67 59 70 50 70
          C41 70 33 67 29 57
          Z
        "
        fill={secondaryColor}
        opacity="0.7"
      />

      {/* 👀 툭 튀어나온 눈 */}
      <Circle
        cx="39"
        cy="36"
        r="6"
        fill={WHITE}
        stroke={OUTLINE}
        strokeWidth="2"
      />
      <Circle
        cx="61"
        cy="36"
        r="6"
        fill={WHITE}
        stroke={OUTLINE}
        strokeWidth="2"
      />

      <Circle cx="40" cy="37" r="3" fill={DARK} />
      <Circle cx="62" cy="37" r="3" fill={DARK} />

      {/* 😊 입 */}
      <Path
        d="M44 54 Q50 59 56 54"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </Svg>
  );
};
export const Stingray = ({
  colorHex = "#5C6BC0",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const secondaryColor = secondary ?? shade(mainColor, 0.3);
  const accentColor = accent ?? contrastAccent(mainColor);

  // 👁️ 눈동자 색상
  const eyeColor = contrastAccent(mainColor, "#1A237E", "#222");

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 🌊 전체를 살짝 비스듬히 기울여 자연스러운 헤엄 연출 */}
      <G transform="rotate(-15, 50, 50)">
        {/* 1. 꼬리 (몸통 중앙 아래에서 부드러운 S자 곡선으로 뻗어나감) */}
        <Path
          d="
            M50 70
            C50 78 45 84 48 90
            C50 94 56 95 62 92
          "
          fill="none"
          stroke={OUTLINE}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <Path
          d="
            M50 70
            C50 78 45 84 48 90
            C50 94 56 95 62 92
          "
          fill="none"
          stroke={mainColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* 2. 대칭적이고 부드러운 마름모/다이아몬드형 몸통 */}
        <Path
          d="
            M50 16
            C60 22 78 35 92 48
            C82 60 68 70 50 72
            C32 70 18 60 8 48
            C22 35 40 22 50 16
            Z
          "
          fill={mainColor}
          stroke={OUTLINE}
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* 3. 하단 배 부분 (밝은 배 영역) */}
        <Path
          d="
            M22 51
            C30 62 40 67 50 67
            C60 67 70 62 78 51
            C70 61 60 65 50 65
            C40 65 30 61 22 51
            Z
          "
          fill={secondaryColor}
          opacity="0.8"
        />

        {/* 4. 날개 양쪽 은은한 하이라이트 (대칭 곡선) */}
        <Path
          d="M22 42 C32 32 42 24 50 22"
          fill="none"
          stroke={secondaryColor}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.6"
        />
        <Path
          d="M78 42 C68 32 58 24 50 22"
          fill="none"
          stroke={secondaryColor}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* 👀 5. 동글동글 귀여운 눈 */}
        <Circle cx="38" cy="44" r="5" fill={WHITE} />
        <Circle cx="62" cy="44" r="5" fill={WHITE} />

        <Circle cx="39" cy="45" r="2.5" fill={eyeColor} />
        <Circle cx="63" cy="45" r="2.5" fill={eyeColor} />

        <Circle cx="40" cy="43.5" r="1" fill={WHITE} />
        <Circle cx="64" cy="43.5" r="1" fill={WHITE} />

        {/* 😊 6. 방긋 웃는 입 */}
        <Path
          d="M44 53 Q50 58 56 53"
          fill="none"
          stroke={OUTLINE}
          strokeWidth="2.3"
          strokeLinecap="round"
        />

        {/* 🩷 7. 볼터치 */}
        <Circle cx="30" cy="50" r="3.5" fill="#F48FB1" opacity="0.7" />
        <Circle cx="70" cy="50" r="3.5" fill="#F48FB1" opacity="0.7" />
      </G>
    </Svg>
  );
};

// ============================================================
// 🍎 FRUITS
// ============================================================

export const Grape = ({
  colorHex = "#7E57C2",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const grapeColor = primary ?? colorHex;
  const highlightColor = secondary ?? "#D1C4E9";
  const stemColor = accent ?? "#512DA8";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* stem */}
      <Path
        d="M50 22 Q53 16 61 15"
        fill="none"
        stroke={stemColor}
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* leaves */}
      <Path
        d="M50 27 Q37 17 27 25 Q37 34 50 31 Z"
        fill={secondary ?? "#81C784"}
        stroke={OUTLINE}
        strokeWidth="2.5"
      />

      {/* grapes */}
      <Circle
        cx="50"
        cy="37"
        r="9"
        fill={grapeColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
      />

      <Circle
        cx="39"
        cy="46"
        r="9"
        fill={grapeColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
      />
      <Circle
        cx="61"
        cy="46"
        r="9"
        fill={grapeColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
      />

      <Circle
        cx="34"
        cy="58"
        r="9"
        fill={grapeColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
      />
      <Circle
        cx="50"
        cy="58"
        r="9"
        fill={grapeColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
      />
      <Circle
        cx="66"
        cy="58"
        r="9"
        fill={grapeColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
      />

      <Circle
        cx="42"
        cy="71"
        r="9"
        fill={grapeColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
      />
      <Circle
        cx="58"
        cy="71"
        r="9"
        fill={grapeColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
      />

      {/* highlights */}
      <Circle cx="47" cy="34" r="2.5" fill={highlightColor} opacity="0.8" />
      <Circle cx="36" cy="43" r="2.5" fill={highlightColor} opacity="0.8" />
      <Circle cx="58" cy="43" r="2.5" fill={highlightColor} opacity="0.8" />
    </Svg>
  );
};

export const Tangerine = ({
  colorHex = "#FF8A00",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const fruitColor = primary ?? colorHex;
  const leafColor = secondary ?? "#4CAF50";
  const detailColor = accent ?? OUTLINE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <G transform="translate(16.5, 16.5) scale(0.67)">
        {/* 🍊 1. 상단 나뭇잎 2장 (결 무늬 포함) */}
        <Path
          d="
            M 50 25
            C 35 15, 25 15, 28 8
            C 38 5, 48 15, 50 25
            Z
          "
          fill={leafColor}
          stroke={OUTLINE}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <Path
          d="M 33 13 C 38 11, 44 16, 47 22"
          fill="none"
          stroke="#2E7D32"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        <Path
          d="
            M 50 25
            C 50 10, 62 2, 72 4
            C 75 14, 62 22, 50 25
            Z
          "
          fill={leafColor}
          stroke={OUTLINE}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <Path
          d="M 54 22 C 60 14, 66 8, 70 6"
          fill="none"
          stroke="#2E7D32"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* 🍊 2. 귤 몸통 */}
        <Path
          d="
            M 50 25
            C 60 23, 94 28, 94 60
            C 94 88, 62 93, 50 92
            C 38 93, 6 88, 6 60
            C 6 28, 40 23, 50 25
            Z
          "
          fill={fruitColor}
          stroke={OUTLINE}
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* ✨ 3. 왼쪽 상단 흰색 광택 하이라이트 */}
        <Path
          d="M 22 36 A 35 35 0 0 1 30 29"
          fill="none"
          stroke={WHITE}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <Circle cx="18" cy="43" r="1.8" fill={WHITE} />

        {/* 🍊 4. 귤의 모공 껍질 디테일 */}
        <Circle
          cx="30"
          cy="38"
          r="0.8"
          fill={shade(fruitColor, -0.2)}
          opacity="0.6"
        />
        <Circle
          cx="35"
          cy="35"
          r="0.8"
          fill={shade(fruitColor, -0.2)}
          opacity="0.6"
        />
        <Circle
          cx="26"
          cy="46"
          r="0.8"
          fill={shade(fruitColor, -0.2)}
          opacity="0.6"
        />

        <Circle
          cx="78"
          cy="38"
          r="0.8"
          fill={shade(fruitColor, -0.2)}
          opacity="0.6"
        />
        <Circle
          cx="82"
          cy="42"
          r="0.8"
          fill={shade(fruitColor, -0.2)}
          opacity="0.6"
        />

        <Circle cx="87" cy="50" r="1" fill={WHITE} opacity="0.9" />
        <Circle cx="89" cy="56" r="1" fill={WHITE} opacity="0.9" />

        <Circle
          cx="72"
          cy="80"
          r="0.8"
          fill={shade(fruitColor, -0.2)}
          opacity="0.6"
        />
        <Circle
          cx="78"
          cy="76"
          r="0.8"
          fill={shade(fruitColor, -0.2)}
          opacity="0.6"
        />

        {/* 🌸 5. 미소 표정 디테일 */}
        <Path
          d="M 47 53 L 48 57 M 50 52 L 50 57 M 53 53 L 52 57"
          fill="none"
          stroke={WHITE}
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        <Circle cx="42" cy="61" r="2.8" fill={detailColor} />
        <Circle cx="58" cy="61" r="2.8" fill={detailColor} />

        <Path
          d="M 37 65 C 34 63, 34 67, 37 67 C 39 67, 39 63, 36 63"
          fill="none"
          stroke="#FF7043"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.8"
        />
        <Path
          d="M 63 65 C 66 63, 66 67, 63 67 C 61 67, 61 63, 64 63"
          fill="none"
          stroke="#FF7043"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.8"
        />

        <Path
          d="M 47 62 Q 48.5 64 50 62 Q 51.5 64 53 62"
          fill="none"
          stroke={detailColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
};
export const Tangerine1 = ({
  colorHex = "#FF8A00",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const fruitColor = primary ?? colorHex;
  const leafColor = secondary ?? "#4CAF50";
  const detailColor = accent ?? OUTLINE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 🍊 1. 상단 나뭇잎 2장 (결 무늬 포함) */}
      <Path
        d="
          M 50 25
          C 35 15, 25 15, 28 8
          C 38 5, 48 15, 50 25
          Z
        "
        fill={leafColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <Path
        d="M 33 13 C 38 11, 44 16, 47 22"
        fill="none"
        stroke="#2E7D32"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <Path
        d="
          M 50 25
          C 50 10, 62 2, 72 4
          C 75 14, 62 22, 50 25
          Z
        "
        fill={leafColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <Path
        d="M 54 22 C 60 14, 66 8, 70 6"
        fill="none"
        stroke="#2E7D32"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* 🍊 2. 귤 몸통 (통통하고 아주 넓적한 형태 + 위아래 홈) */}
      <Path
        d="
          M 50 25
          C 60 23, 94 28, 94 60
          C 94 88, 62 93, 50 92
          C 38 93, 6 88, 6 60
          C 6 28, 40 23, 50 25
          Z
        "
        fill={fruitColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* ✨ 3. 왼쪽 상단 흰색 광택 하이라이트 */}
      <Path
        d="M 22 36 A 35 35 0 0 1 30 29"
        fill="none"
        stroke={WHITE}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <Circle cx="18" cy="43" r="1.8" fill={WHITE} />

      {/* 🍊 4. 귤의 모공 껍질 디테일 (점들) */}
      {/* 왼쪽 상단 점들 */}
      <Circle
        cx="30"
        cy="38"
        r="0.8"
        fill={shade(fruitColor, -0.2)}
        opacity="0.6"
      />
      <Circle
        cx="35"
        cy="35"
        r="0.8"
        fill={shade(fruitColor, -0.2)}
        opacity="0.6"
      />
      <Circle
        cx="26"
        cy="46"
        r="0.8"
        fill={shade(fruitColor, -0.2)}
        opacity="0.6"
      />

      {/* 오른쪽 상단 점들 */}
      <Circle
        cx="78"
        cy="38"
        r="0.8"
        fill={shade(fruitColor, -0.2)}
        opacity="0.6"
      />
      <Circle
        cx="82"
        cy="42"
        r="0.8"
        fill={shade(fruitColor, -0.2)}
        opacity="0.6"
      />

      {/* 오른쪽 측면 흰 점들 */}
      <Circle cx="87" cy="50" r="1" fill={WHITE} opacity="0.9" />
      <Circle cx="89" cy="56" r="1" fill={WHITE} opacity="0.9" />

      {/* 오른쪽 하단 점들 */}
      <Circle
        cx="72"
        cy="80"
        r="0.8"
        fill={shade(fruitColor, -0.2)}
        opacity="0.6"
      />
      <Circle
        cx="78"
        cy="76"
        r="0.8"
        fill={shade(fruitColor, -0.2)}
        opacity="0.6"
      />

      {/* 🌸 5. 미소 표정 디테일 */}
      {/* 이마의 작은 3개 주름 선 */}
      <Path
        d="M 47 53 L 48 57 M 50 52 L 50 57 M 53 53 L 52 57"
        fill="none"
        stroke={WHITE}
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* 까만 눈 */}
      <Circle cx="42" cy="61" r="2.8" fill={detailColor} />
      <Circle cx="58" cy="61" r="2.8" fill={detailColor} />

      {/* 소용돌이 볼터치 */}
      <Path
        d="M 37 65 C 34 63, 34 67, 37 67 C 39 67, 39 63, 36 63"
        fill="none"
        stroke="#FF7043"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.8"
      />
      <Path
        d="M 63 65 C 66 63, 66 67, 63 67 C 61 67, 61 63, 64 63"
        fill="none"
        stroke="#FF7043"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* 앙다문 입 (3 모양 입) */}
      <Path
        d="M 47 62 Q 48.5 64 50 62 Q 51.5 64 53 62"
        fill="none"
        stroke={detailColor}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
// ------------------------------------------------------------

export const Peach = ({
  colorHex = "#FFAB91",
  primary,
  secondary,
  accent,
  size = 70,
}: ItemSvgProps) => {
  const fruitColor = primary ?? colorHex;
  const highlightColor = secondary ?? "#FBE9E7";
  const accentColor = accent ?? "#E64A19";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 🍑 1. 더 통통하고 뚱뚱해진 복숭아 몸통 */}
      <G transform="scale(0.7) translate(30,20)">
        <Path
          d="
          M 50 25
          C 36 17, 10 24, 10 52
          C 10 77, 32 88, 50 92
          C 68 88, 90 77, 90 52
          C 90 24, 64 17, 50 25
          Z
        "
          fill={fruitColor}
          stroke={OUTLINE}
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* 🍑 2. 부드러운 곡선 형태의 중앙 골(groove) 선 */}
        <Path
          d="M 50 25 C 41 38, 43 55, 50 67"
          fill="none"
          stroke={shade(fruitColor, -0.18)}
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* 🍃 3. 상단 잎사귀 */}
        <Path
          d="M 51 25 Q 64 13, 74 19 Q 67 31, 52 30"
          fill={accentColor}
          stroke={OUTLINE}
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* ✨ 4. 볼록한 볼륨감을 살려주는 은은한 광택 하이라이트 */}
        <Path
          d="M 28 38 Q 21 52 28 65"
          fill="none"
          stroke={highlightColor}
          strokeWidth="4.5"
          strokeLinecap="round"
          opacity="0.75"
        />
      </G>
    </Svg>
  );
};
export const Peach1 = ({
  colorHex = "#FFAB91",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const fruitColor = primary ?? colorHex;
  const highlightColor = secondary ?? "#FBE9E7";
  const accentColor = accent ?? "#E64A19";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* peach */}
      <Path
        d="M50 27
           C40 20 25 27 23 43
           C20 61 32 78 50 83
           C68 78 80 61 77 43
           C75 27 60 20 50 27 Z"
        fill={fruitColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* center groove */}
      <Path
        d="M50 27
           Q45 42 50 57
           Q55 42 50 27"
        fill={highlightColor}
        opacity="0.7"
      />

      {/* leaf */}
      <Path
        d="M51 28 Q61 16 70 21 Q64 31 52 31"
        fill={accentColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* highlight */}
      <Path
        d="M34 40 Q30 51 35 58"
        fill="none"
        stroke={highlightColor}
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.7"
      />
    </Svg>
  );
};

// ============================================================
// 🥕 VEGETABLES
// ============================================================

// 🍆 5. 가지 (Eggplant)
export const Eggplant = ({
  colorHex = "#7E57C2",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const highlightColor = secondary ?? "#D1C4E9";
  const stemColor = accent ?? "#4CAF50";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 1. 통통한 가지 몸통 */}
      <Path
        d="
          M42 32
          C30 32 20 48 20 64
          C20 80 34 88 52 88
          C72 88 84 76 84 58
          C84 40 66 32 54 32
          Z
        "
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 2. 가지 꽃받침/꼭지 (stemColor) */}
      <Path
        d="
          M48 12 L52 12 L50 24
          C56 22 64 24 68 28
          C62 31 58 36 56 42
          C50 36 44 38 38 42
          C38 34 32 30 26 28
          C32 25 42 24 50 24
          Z
        "
        fill={stemColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* 3. 광택 및 하이라이트 */}
      <Path
        d="M32 52 C30 62 34 74 46 80"
        fill="none"
        stroke={highlightColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <Path
        d="M58 42 C68 46 74 54 74 62"
        fill="none"
        stroke={WHITE}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.4"
      />
    </Svg>
  );
};

// ------------------------------------------------------------

export const Chili1 = ({
  colorHex = "#EF5350",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const pepperColor = primary ?? colorHex;
  const highlightColor = secondary ?? "#FFCDD2";
  const stemColor = accent ?? "#2E7D32";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* stem */}
      <Path
        d="M47 27 Q42 17 48 13 Q54 18 52 28"
        fill={stemColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      {/* pepper */}
      <Path
        d="M49 27
           Q69 27 76 40
           Q82 53 72 68
           Q62 82 43 84
           Q49 70 43 59
           Q37 47 49 27 Z"
        fill={pepperColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* highlight */}
      <Path
        d="M56 34 Q67 38 68 47"
        fill="none"
        stroke={highlightColor}
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.7"
      />
    </Svg>
  );
};
export const Chili = ({
  colorHex = "#EF5350",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const highlightColor = secondary ?? "#FFCDD2";
  const stemColor = accent ?? "#43A047";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 1. 상단 꼭지 & 줄기 */}
      <Path
        d="M52 14 C56 8 64 8 68 12 C62 16 58 20 56 25"
        fill="none"
        stroke={stemColor}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <Path
        d="M40 25 C45 20 59 20 64 25 L61 31 C54 28 48 28 43 31 Z"
        fill={stemColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 2. 휘어진 고추 몸통 */}
      <Path
        d="
          M42 28
          C58 28 64 34 62 48
          C59 64 48 76 38 84
          C32 89 26 90 28 84
          C32 74 38 64 41 50
          C43 40 38 34 42 28
          Z
        "
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 3. 몸통 볼륨감 하이라이트 (highlightColor & WHITE) */}
      <Path
        d="M54 35 C56 44 52 56 45 66 C40 73 34 80 31 82"
        fill="none"
        stroke={highlightColor}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.7"
      />
      <Path
        d="M50 34 C53 40 51 48 47 55"
        fill="none"
        stroke={WHITE}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
    </Svg>
  );
};

// ------------------------------------------------------------
// 🎃 6. 호박 (Pumpkin)
export const Pumpkin = ({
  colorHex = "#FFA726",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const highlightColor = secondary ?? "#FFE0B2";
  const stemColor = accent ?? "#558B2F";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 호박 꼭지 */}
      <Path
        d="M46 19 C46 13 52 11 58 13 C55 21 53 25 52 31 Z"
        fill={stemColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* 뒤쪽 외각 볼륨 */}
      <Circle
        cx="28"
        cy="56"
        r="22"
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />
      <Circle
        cx="72"
        cy="56"
        r="22"
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 중간 볼륨 */}
      <Circle
        cx="38"
        cy="58"
        r="24"
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />
      <Circle
        cx="62"
        cy="58"
        r="24"
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 중앙 메인 볼륨 */}
      <Ellipse
        cx="50"
        cy="60"
        rx="20"
        ry="26"
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 볼륨 구분선 명암 디테일 */}
      <Path
        d="M38 36 C32 44 32 70 38 80 M62 36 C68 44 68 70 62 80"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="2.5"
        opacity="0.25"
      />

      {/* 은은한 엠보싱 하이라이트 */}
      <Path
        d="M46 38 C42 46 42 68 46 74"
        fill="none"
        stroke={highlightColor}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.6"
      />
      <Path
        d="M22 42 C18 50 18 62 22 70"
        fill="none"
        stroke={WHITE}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.4"
      />
    </Svg>
  );
};

// ============================================================
// 🍚 FOOD
// ============================================================

export const Soup = ({
  colorHex = "#FFA726",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const soupColor = primary ?? colorHex; // 국물 색상
  const bowlColor = secondary ?? "#FFF3E0";
  const steamColor = accent ?? "#37474F"; // 김/연기 (진한 쥐색)

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 🍲 1. 수증기 (모락모락 S자 곡선) */}
      <Path
        d="M 33 30 C 27 25, 37 20, 31 15"
        fill="none"
        stroke={steamColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <Path
        d="M 49 32 C 41 24, 57 17, 48 8"
        fill="none"
        stroke={steamColor}
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <Path
        d="M 64 28 C 58 23, 68 18, 62 13"
        fill="none"
        stroke={steamColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* 🍲 2. 그릇 굽 (맨 아래 받침) */}
      <Ellipse cx="50" cy="88" rx="20" ry="4" fill={OUTLINE} />

      {/* 🍲 3. 그릇 외관 (볼록한 파란색 그릇 몸통) */}
      <Path
        d="
          M 8 50
          C 8 78, 30 90, 50 90
          C 70 90, 92 78, 92 50
          Z
        "
        fill={bowlColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* 🍲 4. 그릇 안쪽 흰색/연파랑 입구 테두리 */}
      <Ellipse
        cx="50"
        cy="48"
        rx="42"
        ry="18"
        fill="#E8F0FE"
        stroke={OUTLINE}
        strokeWidth="3.5"
      />

      {/* 🍲 5. 수프 국물 수면 */}
      <Ellipse
        cx="50"
        cy="50"
        rx="36"
        ry="14"
        fill={soupColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      {/* 🍲 6. 국물 위 밝은 하이라이트 원 및 기름방울 디테일 */}
      <Ellipse cx="50" cy="48" rx="10" ry="4" fill="#FFE0B2" opacity="0.8" />
      <Path
        d="M 22 48 C 22 52, 28 54, 28 50"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <Path
        d="M 72 50 C 72 54, 78 52, 78 48"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* 🍲 7. 그릇 하이라이트 (우측 및 좌하단 광택 선) */}
      <Path
        d="M 85 58 C 88 66, 82 74, 78 78"
        fill="none"
        stroke={WHITE}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Path
        d="M 18 72 C 22 78, 26 80, 28 82"
        fill="none"
        stroke={WHITE}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export const Sandwich = ({
  colorHex = "#FFCC80",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const breadColor = primary ?? colorHex;
  const crustColor = shade(breadColor, -0.2);
  const cheeseColor = secondary ?? "#FFF59D";
  const tomatoColor = accent ?? "#E53935";
  const lettuceColor = "#4CAF50";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 🥪 전체 요소를 중심(50, 50) 기준으로 75% 크기로 축소 */}
      <G transform="translate(50, 50) scale(0.75) translate(-50, -50)">
        {/* 4. 빨간색 속재료 (토마토/햄) */}
        <Path
          d="
            M 80 10
            Q 88 18 84 22
            C 78 28, 68 28, 62 38
            C 56 48, 48 48, 40 58
            C 32 68, 22 70, 18 80
            L 22 96
            C 28 84, 38 82, 44 72
            C 50 62, 60 62, 66 50
            C 72 38, 84 38, 88 24
            Z
          "
          fill={tomatoColor}
          stroke={OUTLINE}
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* 5. 흰색/아이보리 속재료 (치즈) */}
        <Path
          d="
            M 88 24
            C 84 38, 72 38, 66 50
            C 60 62, 50 62, 44 72
            C 38 82, 28 84, 22 96
            L 27 100
            C 33 88, 43 86, 50 76
            C 57 66, 67 66, 73 54
            C 79 42, 91 42, 94 30
            Z
          "
          fill={cheeseColor}
          stroke={OUTLINE}
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* 6. 초록색 속재료 (양상추) */}
        <Path
          d="
            M 94 30
            C 91 42, 79 42, 73 54
            C 67 66, 57 66, 50 76
            C 43 86, 33 88, 27 100
            L 34 100
            C 40 90, 50 88, 57 78
            C 64 68, 74 68, 80 56
            C 86 44, 98 44, 99 35
            Z
          "
          fill={lettuceColor}
          stroke={OUTLINE}
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* 7. 아래쪽 식빵 테두리 */}
        <Path
          d="
            M 99 35
            C 98 44, 86 44, 80 56
            C 74 68, 64 68, 57 78
            C 50 88, 40 90, 34 100
            L 45 100
            L 100 44
            Z
          "
          fill={breadColor}
          stroke={OUTLINE}
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* 1. 샌드위치 윗면 (식빵) */}
        <Path
          d="
            M 10 38
            Q 10 20 28 15
            L 70 2
            L 15 88
            Z
          "
          fill={breadColor}
          stroke={OUTLINE}
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* 2. 빵 윗면의 깨/곡물 가루 디테일 */}
        <Circle cx="16" cy="52" r="2.2" fill="#FFA726" opacity="0.9" />
        <Circle cx="22" cy="36" r="2.2" fill="#FFA726" opacity="0.9" />
        <Circle cx="27" cy="20" r="2.2" fill="#FFA726" opacity="0.9" />
        <Circle cx="32" cy="44" r="2.2" fill="#FFA726" opacity="0.9" />
        <Circle cx="42" cy="28" r="2.2" fill="#FFA726" opacity="0.9" />
        <Circle cx="42" cy="14" r="2.2" fill="#FFA726" opacity="0.9" />
        <Circle cx="58" cy="10" r="2.2" fill="#FFA726" opacity="0.9" />

        {/* 3. 대각선 단면 - 식빵 테두리 */}
        <Path
          d="
            M 70 2
            L 80 10
            L 22 96
            L 15 88
            Z
          "
          fill={crustColor}
          stroke={OUTLINE}
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
};

export const Sandwich1 = ({
  colorHex = "#FFCC80",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const breadColor = primary ?? colorHex; // 식빵 겉면 (따뜻한 노란빛 브라운)
  const crustColor = shade(breadColor, -0.2); // 테두리/식빵 테두리 색상
  const cheeseColor = secondary ?? "#FFF59D"; // 치즈/아이보리 속재료
  const tomatoColor = accent ?? "#E53935"; // 토마토/햄 (빨간색 레이어)
  const lettuceColor = "#4CAF50"; // 양상추 (초록색 레이어)

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 🥪 1. 샌드위치 윗면 (대각선 삼각 식빵 빵) */}
      <Path
        d="
          M 10 38
          Q 10 20 28 15
          L 70 2
          L 15 88
          Z
        "
        fill={breadColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* 🥪 2. 빵 윗면의 깨/곡물 가루 구멍 디테일 */}
      <Circle cx="16" cy="52" r="2.2" fill="#FFA726" opacity="0.9" />
      <Circle cx="22" cy="36" r="2.2" fill="#FFA726" opacity="0.9" />
      <Circle cx="27" cy="20" r="2.2" fill="#FFA726" opacity="0.9" />
      <Circle cx="32" cy="44" r="2.2" fill="#FFA726" opacity="0.9" />
      <Circle cx="42" cy="28" r="2.2" fill="#FFA726" opacity="0.9" />
      <Circle cx="42" cy="14" r="2.2" fill="#FFA726" opacity="0.9" />
      <Circle cx="58" cy="10" r="2.2" fill="#FFA726" opacity="0.9" />

      {/* 🥪 3. 대각선 단면 - 식빵 테두리 패키지 (윗 식빵 테두리) */}
      <Path
        d="
          M 70 2
          L 80 10
          L 22 96
          L 15 88
          Z
        "
        fill={crustColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* 🥪 4. 빨간색 속재료 (토마토/햄 - 물결 곡선 레이어) */}
      <Path
        d="
          M 80 10
          Q 88 18 84 22
          C 78 28, 68 28, 62 38
          C 56 48, 48 48, 40 58
          C 32 68, 22 70, 18 80
          L 22 96
          C 28 84, 38 82, 44 72
          C 50 62, 60 62, 66 50
          C 72 38, 84 38, 88 24
          Z
        "
        fill={tomatoColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 🥪 5. 흰색/아이보리 속재료 (치즈/마요네즈 - 물결 곡선 레이어) */}
      <Path
        d="
          M 88 24
          C 84 38, 72 38, 66 50
          C 60 62, 50 62, 44 72
          C 38 82, 28 84, 22 96
          L 27 100
          C 33 88, 43 86, 50 76
          C 57 66, 67 66, 73 54
          C 79 42, 91 42, 94 30
          Z
        "
        fill={cheeseColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 🥪 6. 초록색 속재료 (양상추 - 물결 곡선 레이어) */}
      <Path
        d="
          M 94 30
          C 91 42, 79 42, 73 54
          C 67 66, 57 66, 50 76
          C 43 86, 33 88, 27 100
          L 34 100
          C 40 90, 50 88, 57 78
          C 64 68, 74 68, 80 56
          C 86 44, 98 44, 99 35
          Z
        "
        fill={lettuceColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 🥪 7. 아래쪽 식빵 테두리 마감 */}
      <Path
        d="
          M 99 35
          C 98 44, 86 44, 80 56
          C 74 68, 64 68, 57 78
          C 50 88, 40 90, 34 100
          L 45 100
          L 100 44
          Z
        "
        fill={breadColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <Path
        d="
          M 10 38
          Q 10 20 28 15
          L 70 2
          L 15 88
          Z
        "
        fill={breadColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* 🥪 3. 대각선 단면 - 식빵 테두리 패키지 (윗 식빵 테두리) */}
      <Path
        d="
          M 70 2
          L 80 10
          L 22 96
          L 15 88
          Z
        "
        fill={crustColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const Dumpling = ({
  colorHex = "#FFF3E0",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const dumplingColor = primary ?? colorHex;
  const blushColor = secondary ?? "#F8BBD0"; // 볼터치 핑크 색상
  const foldColor = accent ?? OUTLINE; // 주름 및 눈/입 색상

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 🥟 3/4 축소 및 Y축 상단 이동 조정 */}
      <G transform="translate(12.5, 8) scale(0.75)">
        {/* 1. 만두 몸통 */}
        <Path
          d="
            M 50 10
            C 53 10, 56 15, 58 15
            C 61 15, 62 12, 67 15
            C 72 20, 68 28, 62 30
            C 76 34, 92 52, 88 72
            C 84 88, 16 88, 12 72
            C 8 52, 24 34, 38 30
            C 32 28, 28 20, 33 15
            C 38 12, 39 15, 42 15
            C 44 15, 47 10, 50 10
            Z
          "
          fill={dumplingColor}
          stroke={OUTLINE}
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* 2. 상단 꼭지 주름 선 3개 */}
        <Path
          d="
            M 38 23 L 42 18
            M 50 24 L 50 17
            M 62 23 L 58 18
          "
          fill="none"
          stroke={foldColor}
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* 3. 볼터치 */}
        <Circle cx="20" cy="63" r="7" fill={blushColor} opacity="0.6" />
        <Circle cx="80" cy="63" r="7" fill={blushColor} opacity="0.6" />

        {/* 4. 동그란 눈 */}
        <Circle cx="32" cy="54" r="4.5" fill={OUTLINE} />
        <Circle cx="68" cy="54" r="4.5" fill={OUTLINE} />

        {/* 5. 스마일 입 곡선 */}
        <Path
          d="M 44 59 Q 50 65 56 59"
          fill="none"
          stroke={OUTLINE}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </G>
    </Svg>
  );
};
export const Dumpling1 = ({
  colorHex = "#FFF3E0",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const dumplingColor = primary ?? colorHex;
  const blushColor = secondary ?? "#F8BBD0"; // 볼터치 핑크 색상
  const foldColor = accent ?? OUTLINE; // 주름 및 눈/입 색상

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 🥟 만두 전체 요소 원래 모양 그대로 y축 10px(약 2cm) 아래로 이동 */}
      <G translateY={10}>
        {/* 1. 만두 몸통 */}
        <Path
          d="
            M 50 10
            C 53 10, 56 15, 58 15
            C 61 15, 62 12, 67 15
            C 72 20, 68 28, 62 30
            C 76 34, 92 52, 88 72
            C 84 88, 16 88, 12 72
            C 8 52, 24 34, 38 30
            C 32 28, 28 20, 33 15
            C 38 12, 39 15, 42 15
            C 44 15, 47 10, 50 10
            Z
          "
          fill={dumplingColor}
          stroke={OUTLINE}
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* 2. 상단 꼭지 주름 선 3개 */}
        <Path
          d="
            M 38 23 L 42 18
            M 50 24 L 50 17
            M 62 23 L 58 18
          "
          fill="none"
          stroke={foldColor}
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* 3. 볼터치 */}
        <Circle cx="20" cy="63" r="7" fill={blushColor} opacity="0.6" />
        <Circle cx="80" cy="63" r="7" fill={blushColor} opacity="0.6" />

        {/* 4. 동그란 눈 */}
        <Circle cx="32" cy="54" r="4.5" fill={OUTLINE} />
        <Circle cx="68" cy="54" r="4.5" fill={OUTLINE} />

        {/* 5. 스마일 입 곡선 */}
        <Path
          d="M 44 59 Q 50 65 56 59"
          fill="none"
          stroke={OUTLINE}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </G>
    </Svg>
  );
};

// 🌽 3. 옥수수 (Corn)
export const Corn = ({
  colorHex = "#FFEE58",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const kernelShade = secondary ?? "#FBC02D";
  const huskColor = accent ?? "#7CB342";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 뒤쪽 껍질 */}
      <Path
        d="M28 78 C15 60 18 35 32 20 C22 45 28 70 36 82 Z"
        fill={kernelShade}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 옥수수 알맹이 몸통 */}
      <Path
        d="M34 22 C34 10 66 10 66 22 C72 45 70 70 50 86 C30 70 28 45 34 22 Z"
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 알맹이 격자 가로/세로 무늬 */}
      <Path
        d="
          M34 28 H66 M32 38 H68 M31 48 H69 M32 58 H68 M36 68 H64 M42 77 H58
          M42 16 V82 M50 14 V85 M58 16 V82
        "
        fill="none"
        stroke={kernelShade}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* 앞쪽 감싸는 껍질 (좌/우) */}
      <Path
        d="M20 84 C25 65 22 48 18 40 C30 52 35 70 45 88 Z"
        fill={kernelShade}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <Path
        d="M80 84 C75 65 78 48 82 40 C70 52 65 70 55 88 Z"
        fill={kernelShade}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* 하단 줄기 단면 */}
      <Path
        d="M45 87 L46 93 C46 95 54 95 54 93 L55 87 Z"
        fill={kernelShade}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
export const Ball = ({
  colorHex = DEFAULT_COLOR,
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const patternColor = secondary ?? shade(mainColor, -0.35);
  const highlightColor = accent ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Circle
        cx="50"
        cy="53"
        r="30"
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 공 무늬 */}
      <Path
        d="M38 29 Q50 40 62 29"
        fill="none"
        stroke={patternColor}
        strokeWidth="3"
        strokeLinecap="round"
      />

      <Path
        d="M25 52 Q38 58 38 72"
        fill="none"
        stroke={patternColor}
        strokeWidth="3"
        strokeLinecap="round"
      />

      <Path
        d="M62 72 Q62 58 75 52"
        fill="none"
        stroke={patternColor}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* 반짝임 */}
      <Circle cx="40" cy="42" r="5" fill={highlightColor} opacity={0.55} />
    </Svg>
  );
};
export const Donut1 = ({
  colorHex = "#602F22",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const donutColor = primary ?? colorHex;
  const sprinkle1 = secondary ?? "#FF6B6B";
  const sprinkle2 = accent ?? "#4CC9F0";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Circle
        cx="50"
        cy="51"
        r="32"
        fill={donutColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      <Circle
        cx="50"
        cy="51"
        r="12"
        fill={WHITE}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      <Rect x="32" y="32" width="6" height="3" rx="1.5" fill={sprinkle1} />
      <Rect x="60" y="38" width="6" height="3" rx="1.5" fill={sprinkle2} />
      <Rect x="42" y="66" width="6" height="3" rx="1.5" fill="#FFD166" />
      <Rect x="62" y="71" width="6" height="3" rx="1.5" fill={sprinkle1} />
      <Rect x="25" y="54" width="6" height="3" rx="1.5" fill={sprinkle2} />
      <Rect x="70" y="51" width="6" height="3" rx="1.5" fill="#FFD166" />
    </Svg>
  );
};
export const Sunglasses = ({
  colorHex = "#FF6B8A",
  primary,
  size = 95,
}: ItemSvgProps) => {
  const lensColor = primary ?? colorHex;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 왼쪽 렌즈 */}
      <Circle
        cx="34"
        cy="54"
        r="13"
        fill={lensColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      {/* 오른쪽 렌즈 */}
      <Circle
        cx="66"
        cy="54"
        r="13"
        fill={lensColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      {/* 코 다리 */}
      <Path
        d="M47 54 Q50 58 53 54"
        stroke={OUTLINE}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* 안경다리 */}
      <Line
        x1="21"
        y1="53"
        x2="12"
        y2="48"
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Line
        x1="79"
        y1="53"
        x2="88"
        y2="48"
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* 렌즈 하이라이트 */}
      <Line
        x1="27"
        y1="54"
        x2="33"
        y2="57"
        stroke={WHITE}
        strokeWidth="2"
        opacity={0.45}
      />
      <Line
        x1="69"
        y1="54"
        x2="75"
        y2="57"
        stroke={WHITE}
        strokeWidth="2"
        opacity={0.45}
      />
    </Svg>
  );
};
export const Button1 = ({
  colorHex = DEFAULT_COLOR,
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const highlightColor = accent ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Circle
        cx="50"
        cy="51"
        r="30"
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 안쪽 테두리 */}
      <Circle
        cx="50"
        cy="51"
        r="21"
        fill="none"
        stroke={WHITE}
        strokeWidth="3"
        opacity={0.7}
      />

      {/* 구멍 */}
      <Circle cx="42" cy="44" r="3.5" fill={OUTLINE} />
      <Circle cx="58" cy="44" r="3.5" fill={OUTLINE} />
      <Circle cx="42" cy="59" r="3.5" fill={OUTLINE} />
      <Circle cx="58" cy="59" r="3.5" fill={OUTLINE} />

      <Circle cx="40" cy="34" r="5" fill={highlightColor} opacity={0.45} />
    </Svg>
  );
};
export const Button2 = ({
  colorHex = "#4D96FF",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const highlightColor = accent ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Circle
        cx="50"
        cy="50"
        r="31"
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      <Circle
        cx="50"
        cy="50"
        r="25"
        fill="none"
        stroke={WHITE}
        strokeWidth="2"
        opacity={0.3}
      />

      <Circle cx="39" cy="39" r="5" fill={highlightColor} />
      <Circle cx="61" cy="39" r="5" fill={highlightColor} />
      <Circle cx="39" cy="61" r="5" fill={highlightColor} />
      <Circle cx="61" cy="61" r="5" fill={highlightColor} />
    </Svg>
  );
};
export const CircleClock = ({
  colorHex = "#F25C54",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const handColor = secondary ?? DARK;
  const centerColor = accent ?? "#FF9F43";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Circle
        cx="50"
        cy="50"
        r="32"
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      <Circle cx="50" cy="50" r="26" fill={handColor} />

      <Line
        x1="50"
        y1="50"
        x2="50"
        y2="34"
        stroke={centerColor}
        strokeWidth="4"
        strokeLinecap="round"
      />

      <Line
        x1="50"
        y1="50"
        x2="64"
        y2="42"
        stroke={centerColor}
        strokeWidth="4"
        strokeLinecap="round"
      />

      <Circle cx="50" cy="50" r="4" fill={mainColor} />
    </Svg>
  );
};

export const Wheel = ({
  colorHex = "#343A40",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const outerColor = primary ?? colorHex;
  const innerColor = secondary ?? "#AEB6BC";
  const spokeColor = accent ?? "#687178";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Circle
        cx="50"
        cy="50"
        r="32"
        fill={outerColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      <Circle cx="50" cy="50" r="23" fill={innerColor} />

      <Line
        x1="50"
        y1="29"
        x2="50"
        y2="71"
        stroke={spokeColor}
        strokeWidth="6"
      />

      <Line
        x1="29"
        y1="50"
        x2="71"
        y2="50"
        stroke={spokeColor}
        strokeWidth="6"
      />

      <Circle
        cx="50"
        cy="50"
        r="7"
        fill="#E9ECEF"
        stroke={spokeColor}
        strokeWidth="3"
      />
    </Svg>
  );
};
export const Lollipop = ({
  colorHex = "#FF6B8A",
  primary,
  secondary,
  size = 95,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const swirlColor = secondary ?? "#FFD7E2";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 사탕 */}
      <Circle
        cx="50"
        cy="36"
        r="27"
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 소용돌이 */}
      <Path
        d="
          M50 17
          C34 17 27 29 32 40
          C37 51 54 53 61 43
          C67 34 59 25 50 26
          C42 27 39 34 43 39
          C47 44 55 42 56 37
        "
        fill="none"
        stroke={swirlColor}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* 막대 */}
      <Line
        x1="50"
        y1="63"
        x2="50"
        y2="89"
        stroke={OUTLINE}
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* 반짝임 */}
      <Ellipse
        cx="37"
        cy="27"
        rx="6"
        ry="3"
        fill={WHITE}
        opacity={0.35}
        transform="rotate(-35 37 27)"
      />
    </Svg>
  );
};
export const Basketball = ({
  colorHex = "#F0813C",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const lineColor = secondary ?? "#3A2A20";
  const highlightColor = accent ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 공 */}
      <Circle
        cx="50"
        cy="53"
        r="31"
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 세로 중앙선 */}
      <Line
        x1="50"
        y1="22"
        x2="50"
        y2="84"
        stroke={lineColor}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* 가로 중앙선 */}
      <Path
        d="M19 53 Q50 46 81 53"
        fill="none"
        stroke={lineColor}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* 왼쪽 곡선 */}
      <Path
        d="M29 32 Q40 53 29 74"
        fill="none"
        stroke={lineColor}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* 오른쪽 곡선 */}
      <Path
        d="M71 32 Q60 53 71 74"
        fill="none"
        stroke={lineColor}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* 반짝임 */}
      <Ellipse
        cx="38"
        cy="38"
        rx="6"
        ry="3"
        fill={highlightColor}
        opacity={0.4}
        transform="rotate(-30 38 38)"
      />
    </Svg>
  );
};

export const Baseball = ({
  colorHex = "#FFF8EC",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const stitchColor = accent ?? "#E4463D";
  const highlightColor = secondary ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 야구공 */}
      <Circle
        cx="50"
        cy="55"
        r="24"
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 왼쪽 실밥 */}
      <Path
        d="M31 37 Q42 55 31 73"
        fill="none"
        stroke={stitchColor}
        strokeWidth="2.5"
      />

      {/* 오른쪽 실밥 */}
      <Path
        d="M69 37 Q58 55 69 73"
        fill="none"
        stroke={stitchColor}
        strokeWidth="2.5"
      />

      {/* 왼쪽 실밥 */}
      <Line
        x1="29"
        y1="41"
        x2="35"
        y2="39"
        stroke={stitchColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <Line
        x1="34"
        y1="49"
        x2="40"
        y2="47"
        stroke={stitchColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <Line
        x1="36"
        y1="55"
        x2="42"
        y2="55"
        stroke={stitchColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <Line
        x1="34"
        y1="61"
        x2="40"
        y2="63"
        stroke={stitchColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <Line
        x1="29"
        y1="69"
        x2="35"
        y2="71"
        stroke={stitchColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* 오른쪽 실밥 */}
      <Line
        x1="71"
        y1="41"
        x2="65"
        y2="39"
        stroke={stitchColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <Line
        x1="66"
        y1="49"
        x2="60"
        y2="47"
        stroke={stitchColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <Line
        x1="64"
        y1="55"
        x2="58"
        y2="55"
        stroke={stitchColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <Line
        x1="66"
        y1="61"
        x2="60"
        y2="63"
        stroke={stitchColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <Line
        x1="71"
        y1="69"
        x2="65"
        y2="71"
        stroke={stitchColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* 반짝임 */}
      <Ellipse
        cx="41"
        cy="43"
        rx="5"
        ry="2.5"
        fill={highlightColor}
        opacity={0.5}
        transform="rotate(-30 41 43)"
      />
    </Svg>
  );
};
export const TennisBall = ({
  colorHex = "#D4E157",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const highlightColor = accent ?? shade(mainColor, 0.35);

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 공 */}
      <Circle
        cx="50"
        cy="55"
        r="23"
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 왼쪽 흰 곡선 */}
      <Path
        d="M31 43 Q45 55 31 67"
        fill="none"
        stroke={WHITE}
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* 오른쪽 흰 곡선 */}
      <Path
        d="M69 43 Q55 55 69 67"
        fill="none"
        stroke={WHITE}
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* 반짝임 */}
      <Ellipse
        cx="40"
        cy="43"
        rx="5"
        ry="2.5"
        fill={highlightColor}
        opacity={0.7}
        transform="rotate(-30 40 43)"
      />
    </Svg>
  );
};
export const Plate = ({
  colorHex = DEFAULT_COLOR,
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 접시 */}
      <Circle
        cx="50"
        cy="52"
        r="32"
        fill={WHITE}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      <Circle cx="50" cy="52" r="24" fill={mainColor} opacity={0.85} />

      <Circle cx="50" cy="52" r="18" fill={WHITE} opacity={0.8} />

      {/* 반짝임 */}
      <Path
        d="M30 38 Q36 31 44 31"
        fill="none"
        stroke={WHITE}
        strokeWidth="4"
        strokeLinecap="round"
        opacity={0.8}
      />
    </Svg>
  );
};
export const RoundBalloon = ({
  colorHex = "#9B5DE5",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const balloonColor = primary ?? colorHex;
  const knotColor = secondary ?? balloonColor;
  const highlightColor = accent ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <G transform="scale(0.8) translate(15, 0)">
        <Circle
          cx="50"
          cy="45"
          r="30"
          fill={balloonColor}
          stroke={OUTLINE}
          strokeWidth="4"
        />

        <Polygon
          points="47,73 53,73 50,82"
          fill={knotColor}
          stroke={OUTLINE}
          strokeWidth="3"
        />
        <Path
          d="M50 82 Q55 90 48 98 T52 115"
          stroke={OUTLINE}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        <Path
          d="M34 30 Q40 24 47 26"
          stroke={highlightColor}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          opacity={0.6}
        />
      </G>
    </Svg>
  );
};
export const FullMoon = ({
  colorHex = DEFAULT_COLOR,
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const moonColor = primary ?? colorHex;
  const craterColor = secondary ?? WHITE;
  const highlightColor = accent ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 보름달 본체 */}
      <Circle
        cx="50"
        cy="50"
        r="31"
        fill={moonColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 크레이터 (달 표면 무늬) */}
      <Circle cx="37" cy="40" r="6" fill={craterColor} opacity={0.18} />
      <Circle cx="61" cy="37" r="4" fill={craterColor} opacity={0.18} />
      <Circle cx="63" cy="60" r="7" fill={craterColor} opacity={0.15} />
      <Circle cx="40" cy="65" r="4" fill={craterColor} opacity={0.18} />

      {/* 상단 입체 하이라이트 */}
      <Path
        d="M30 30 Q37 23 46 21"
        fill="none"
        stroke={highlightColor}
        strokeWidth="4"
        strokeLinecap="round"
        opacity={0.7}
      />

      {/* 얼굴 그룹 (정중앙 50, 50 기준 대칭 정렬) */}
      {/* 왼쪽 눈 */}
      <Path
        d="M 43 47 Q 45 44 47 47"
        fill="none"
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinecap="round"
      />

      {/* 오른쪽 눈 */}
      <Path
        d="M 53 47 Q 55 44 57 47"
        fill="none"
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinecap="round"
      />

      {/* 정중앙 작은 미소 */}
      <Path
        d="M 46 54 Q 50 58 54 54"
        fill="none"
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinecap="round"
      />

      {/* 왼쪽 볼터치 */}
      <Circle cx="39" cy="51" r="2.5" fill={highlightColor} opacity={0.65} />
      {/* 오른쪽 볼터치 */}
      <Circle cx="61" cy="51" r="2.5" fill={highlightColor} opacity={0.65} />
    </Svg>
  );
};
export const Sun = ({
  colorHex = "#FFD166",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const sunColor = primary ?? colorHex;
  const highlightColor = accent ?? sunColor;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <Line
          key={deg}
          x1="50"
          y1="50"
          x2="50"
          y2="12"
          stroke={sunColor}
          strokeWidth="5"
          strokeLinecap="round"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}

      <Circle
        cx="50"
        cy="50"
        r="22"
        fill={sunColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      <Circle cx="43" cy="47" r="2.5" fill={OUTLINE} />
      <Circle cx="57" cy="47" r="2.5" fill={OUTLINE} />

      <Path
        d="M43 56 Q50 61 57 56"
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
};
export const Envelop = ({
  colorHex = "#FFD6E8",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const flapColor = secondary ?? "#FFE8F1";
  const sealColor = accent ?? "#F45B69";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 봉투 몸체 */}
      <Rect
        x="18"
        y="34"
        width="64"
        height="46"
        rx="6"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 접히는 뚜껑 */}
      <Rect
        x="18"
        y="20"
        width="64"
        height="24"
        rx="5"
        fill={flapColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 뚜껑 접힘선 */}
      <Line
        x1="22"
        y1="44"
        x2="78"
        y2="44"
        stroke={OUTLINE}
        strokeWidth="2.5"
        opacity={0.4}
      />

      {/* 봉투 스티커/씰 */}
      <Rect
        x="43"
        y="34"
        width="16"
        height="16"
        rx="3"
        fill={sealColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
      />

      {/* 하이라이트 */}
      <Ellipse
        cx="30"
        cy="50"
        rx="5"
        ry="2"
        fill={WHITE}
        opacity={0.4}
        transform="rotate(-20 30 50)"
      />
    </Svg>
  );
};
export const ChocolateBar = ({
  colorHex = "#7F4F24",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const chocolateColor = primary ?? colorHex;
  const lineColor = secondary ?? "#5A3418";
  const highlightColor = accent ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect
        x="20"
        y="24"
        width="60"
        height="52"
        rx="6"
        fill={chocolateColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      <Line
        x1="20"
        y1="50"
        x2="80"
        y2="50"
        stroke={lineColor}
        strokeWidth="3"
      />
      <Line
        x1="40"
        y1="24"
        x2="40"
        y2="76"
        stroke={lineColor}
        strokeWidth="3"
      />
      <Line
        x1="60"
        y1="24"
        x2="60"
        y2="76"
        stroke={lineColor}
        strokeWidth="3"
      />

      <Path
        d="M27 32 L35 32"
        stroke={highlightColor}
        strokeWidth="3"
        strokeLinecap="round"
        opacity={0.5}
      />
    </Svg>
  );
};
export const Box = ({
  colorHex = DEFAULT_COLOR,
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const boxColor = primary ?? colorHex;
  const lidColor = secondary ?? WHITE;
  const ribbonColor = accent ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="
          M24 35
          L50 22
          L76 35
          L76 68
          L50 81
          L24 68
          Z
        "
        fill={boxColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <Path
        d="
          M24 35
          L50 48
          L76 35
          L50 22
          Z
        "
        fill={lidColor}
        opacity={0.28}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      <Path
        d="M50 48 L50 78"
        stroke={ribbonColor}
        strokeWidth="6"
        opacity={0.7}
      />

      <Path
        d="M24 35 L50 48 L76 35"
        fill="none"
        stroke={ribbonColor}
        strokeWidth="4"
        opacity={0.7}
      />
    </Svg>
  );
};
export const Book = ({
  colorHex = "#F45B55",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const pageColor = secondary ?? "#E3D3B0";
  const ribbonColor = accent ?? "#FFD166";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 페이지 옆면 */}
      <Line
        x1="78"
        y1="20"
        x2="78"
        y2="80"
        stroke={pageColor}
        strokeWidth="1.5"
      />
      <Line
        x1="76"
        y1="18"
        x2="76"
        y2="82"
        stroke={pageColor}
        strokeWidth="1.5"
      />
      <Line
        x1="74"
        y1="16"
        x2="74"
        y2="84"
        stroke={pageColor}
        strokeWidth="1.5"
      />

      {/* 표지 */}
      <Rect
        x="20"
        y="14"
        width="54"
        height="72"
        rx="5"
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 책등 라인 */}
      <Line
        x1="30"
        y1="14"
        x2="30"
        y2="86"
        stroke={OUTLINE}
        strokeWidth="3"
        opacity={0.35}
      />

      {/* 제목/텍스트 라인 */}
      <Rect
        x="38"
        y="30"
        width="26"
        height="6"
        rx="3"
        fill={WHITE}
        opacity={0.9}
      />

      <Line
        x1="38"
        y1="48"
        x2="66"
        y2="48"
        stroke={WHITE}
        strokeWidth="3"
        opacity={0.8}
      />

      <Line
        x1="38"
        y1="56"
        x2="58"
        y2="56"
        stroke={WHITE}
        strokeWidth="3"
        opacity={0.8}
      />

      {/* 책갈피 리본 */}
      <Path
        d="M41 14 L41 36 L35 30 L29 36 L29 14 Z"
        fill={ribbonColor}
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const Window = ({
  colorHex = "#A8733E",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const frameColor = primary ?? colorHex;
  const glassColor = secondary ?? "#9EDCFF";
  const highlightColor = accent ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 창틀 */}
      <Rect
        x="18"
        y="18"
        width="64"
        height="64"
        rx="4"
        fill={frameColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 유리 */}
      <Rect x="26" y="26" width="48" height="48" fill={glassColor} />

      {/* 창살 */}
      <Line
        x1="50"
        y1="26"
        x2="50"
        y2="74"
        stroke={highlightColor}
        strokeWidth="5"
      />

      <Line
        x1="26"
        y1="50"
        x2="74"
        y2="50"
        stroke={highlightColor}
        strokeWidth="5"
      />
    </Svg>
  );
};
export const Window1 = ({
  colorHex = DEFAULT_COLOR,
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const frameColor = primary ?? colorHex;
  const glassColor = secondary ?? "#BFE3FF";
  const highlightColor = accent ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect
        x="20"
        y="22"
        width="60"
        height="58"
        rx="7"
        fill={frameColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      <Rect
        x="29"
        y="31"
        width="42"
        height="40"
        rx="3"
        fill={glassColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      <Line x1="50" y1="31" x2="50" y2="71" stroke={OUTLINE} strokeWidth="3" />
      <Line x1="29" y1="51" x2="71" y2="51" stroke={OUTLINE} strokeWidth="3" />

      <Path
        d="M35 37 L43 37"
        stroke={highlightColor}
        strokeWidth="4"
        strokeLinecap="round"
        opacity={0.7}
      />
    </Svg>
  );
};
export const Calendar = ({
  colorHex = "#FF665E",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const headerColor = primary ?? colorHex;
  const dotColor = secondary ?? "#D8CEC3";
  const bindingColor = accent ?? OUTLINE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 달력 본체 */}
      <Rect
        x="18"
        y="20"
        width="64"
        height="62"
        rx="7"
        fill={dotColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 상단 */}
      {/* <Rect x="18" y="20" width="64" height="18" rx="7" fill={headerColor} /> */}

      {/* 고리 */}
      <Line
        x1="34"
        y1="14"
        x2="34"
        y2="28"
        stroke={bindingColor}
        strokeWidth="5"
        strokeLinecap="round"
      />

      <Line
        x1="66"
        y1="14"
        x2="66"
        y2="28"
        stroke={bindingColor}
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* 날짜 */}
      <Circle cx="31" cy="36" r="3" fill={bindingColor} />
      <Circle cx="50" cy="36" r="3" fill={bindingColor} />
      <Circle cx="69" cy="36" r="3" fill={bindingColor} />

      <Circle cx="31" cy="49" r="3" fill={bindingColor} />
      <Circle cx="50" cy="49" r="3" fill={bindingColor} />
      <Circle cx="69" cy="49" r="3" fill={bindingColor} />

      <Circle cx="31" cy="62" r="3" fill={bindingColor} />
      <Circle cx="50" cy="62" r="3" fill={bindingColor} />
      <Circle cx="69" cy="62" r="3" fill={bindingColor} />

      <Circle cx="31" cy="75" r="3" fill={bindingColor} />
      <Circle cx="50" cy="75" r="3" fill={bindingColor} />
      <Circle cx="69" cy="75" r="3" fill={bindingColor} />
    </Svg>
  );
};
export const Bread = ({
  colorHex = DEFAULT_COLOR,
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const breadColor = primary ?? colorHex;
  const insideColor = secondary ?? "#FFF3BF";
  const highlightColor = accent ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="
          M27 77
          Q22 73 22 64
          V42
          Q22 27 35 24
          Q50 19 65 24
          Q78 27 78 42
          V64
          Q78 74 73 77
          Z
        "
        fill={breadColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      <Path
        d="
          M31 68
          V43
          Q31 32 42 31
          Q50 29 58 31
          Q69 32 69 43
          V68
          Q69 72 65 72
          H35
          Q31 72 31 68
          Z
        "
        fill={insideColor}
        opacity={0.85}
      />

      <Path
        d="M34 39 Q39 33 45 33"
        fill="none"
        stroke={highlightColor}
        strokeWidth="4"
        strokeLinecap="round"
        opacity={0.8}
      />
    </Svg>
  );
};
export const Microwave = ({
  colorHex = "#C9D0D5",
  primary,
  secondary,
  accent,
  size = 85,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const screenColor = secondary ?? "#46515A";
  const controlColor = accent ?? "#707A82";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 본체 */}
      <Rect
        x="12"
        y="25"
        width="76"
        height="52"
        rx="7"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 화면 */}
      <Rect x="20" y="34" width="45" height="34" rx="3" fill={screenColor} />

      {/* 화면 반사 */}
      <Path d="M25 59 L48 37" stroke={WHITE} strokeWidth="5" opacity={0.12} />

      {/* 버튼 */}
      <Circle cx="76" cy="42" r="5" fill={controlColor} />
      <Circle cx="76" cy="57" r="5" fill={controlColor} />
    </Svg>
  );
};
export const Pillow = ({
  colorHex = "#8CC8FF",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const seamColor = secondary ?? WHITE;
  const buttonColor = accent ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 베개 */}
      <Rect
        x="20"
        y="20"
        width="60"
        height="60"
        rx="16"
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 코너 주름 */}
      <Path
        d="M20 30 Q28 30 28 20"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinecap="round"
        opacity={0.5}
      />

      <Path
        d="M80 30 Q72 30 72 20"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinecap="round"
        opacity={0.5}
      />

      <Path
        d="M20 70 Q28 70 28 80"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinecap="round"
        opacity={0.5}
      />

      <Path
        d="M80 70 Q72 70 72 80"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinecap="round"
        opacity={0.5}
      />

      {/* 안쪽 시접선 */}
      <Rect
        x="30"
        y="30"
        width="40"
        height="40"
        rx="10"
        fill="none"
        stroke={seamColor}
        strokeWidth="2.5"
        strokeDasharray="4 4"
        opacity={0.6}
      />

      {/* 가운데 단추 */}
      <Path
        d="M46 46 H54 V54 H46 Z"
        fill={buttonColor}
        opacity={0.85}
        stroke={OUTLINE}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
export const Tv = ({
  colorHex = "#555E68",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const screenColor = secondary ?? "#303941";
  const baseColor = accent ?? OUTLINE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* TV 본체 */}
      <Rect
        x="13"
        y="20"
        width="74"
        height="51"
        rx="5"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 화면 */}
      <Rect x="20" y="27" width="60" height="37" rx="2" fill={screenColor} />

      {/* 받침대 */}
      <Line
        x1="50"
        y1="71"
        x2="50"
        y2="80"
        stroke={baseColor}
        strokeWidth="5"
      />

      <Line
        x1="35"
        y1="82"
        x2="65"
        y2="82"
        stroke={baseColor}
        strokeWidth="5"
        strokeLinecap="round"
      />
    </Svg>
  );
};
export const GiftBox1 = ({
  colorHex = DEFAULT_COLOR,
  primary,
  secondary,
  accent,
  size = 85,
}: ItemSvgProps) => {
  const boxColor = primary ?? colorHex;
  const ribbonColor = secondary ?? WHITE;
  const bowColor = accent ?? boxColor;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect
        x="23"
        y="38"
        width="54"
        height="39"
        rx="5"
        fill={boxColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      <Rect
        x="20"
        y="30"
        width="60"
        height="13"
        rx="5"
        fill={boxColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      <Rect
        x="46"
        y="30"
        width="8"
        height="47"
        fill={ribbonColor}
        opacity={0.75}
      />

      <Rect
        x="20"
        y="34"
        width="60"
        height="7"
        fill={ribbonColor}
        opacity={0.75}
      />

      <Path
        d="M50 30
           Q38 18 34 26
           Q32 32 50 35"
        fill={boxColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      <Path
        d="M50 30
           Q62 18 66 26
           Q68 32 50 35"
        fill={boxColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />
    </Svg>
  );
};
export const GiftBox = ({
  colorHex = "#FFD43B",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const boxColor = primary ?? colorHex;
  const ribbonColor = secondary ?? "#F04F5F";
  const ribbonHighlight = accent ?? ribbonColor;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 상자 */}
      <Rect
        x="20"
        y="35"
        width="60"
        height="48"
        rx="4"
        fill={boxColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 뚜껑 */}
      <Rect
        x="15"
        y="28"
        width="70"
        height="16"
        rx="4"
        fill={boxColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 리본 세로 */}
      <Rect x="45" y="29" width="10" height="54" fill={ribbonHighlight} />

      {/* 리본 왼쪽 */}
      <Path
        d="M50 28 C38 18 29 20 31 28 C33 35 43 33 50 28"
        fill={ribbonHighlight}
      />

      {/* 리본 오른쪽 */}
      <Path
        d="M50 28 C62 18 71 20 69 28 C67 35 57 33 50 28"
        fill={ribbonHighlight}
      />
    </Svg>
  );
};
export const SquareClock = ({
  colorHex = "#4D96FF",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const frameColor = primary ?? colorHex;
  const handColor = secondary ?? DARK;
  const centerColor = accent ?? "#FF9F43";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect
        x="17"
        y="17"
        width="66"
        height="66"
        rx="9"
        fill={frameColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      <Rect x="25" y="25" width="50" height="50" rx="6" fill={handColor} />

      <Line
        x1="50"
        y1="50"
        x2="50"
        y2="34"
        stroke={centerColor}
        strokeWidth="4"
        strokeLinecap="round"
      />

      <Line
        x1="50"
        y1="50"
        x2="63"
        y2="58"
        stroke={centerColor}
        strokeWidth="4"
        strokeLinecap="round"
      />

      <Circle cx="50" cy="50" r="4" fill={frameColor} />
    </Svg>
  );
};
export const Door = ({
  colorHex = "#B97845",
  primary,
  secondary,
  accent,
  size = 85,
}: ItemSvgProps) => {
  const doorColor = primary ?? colorHex;
  const panelColor = secondary ?? "#D99A63";
  const handleColor = accent ?? "#FFD166";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 문 */}
      <Rect
        x="25"
        y="12"
        width="50"
        height="76"
        rx="4"
        fill={doorColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 문 패널 */}
      <Rect
        x="34"
        y="22"
        width="32"
        height="25"
        rx="3"
        fill={panelColor}
        stroke="#8D5A32"
        strokeWidth="3"
      />

      <Rect
        x="34"
        y="53"
        width="32"
        height="25"
        rx="3"
        fill={panelColor}
        stroke="#8D5A32"
        strokeWidth="3"
      />

      {/* 손잡이 */}
      <Circle
        cx="62"
        cy="51"
        r="4"
        fill={handleColor}
        stroke={OUTLINE}
        strokeWidth="2"
      />
    </Svg>
  );
};
export const Bookshelf = ({
  colorHex = "#A8733E",
  primary,
  size = 75,
}: ItemSvgProps) => {
  const shelfColor = primary ?? colorHex;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 책장 */}
      <Rect
        x="18"
        y="13"
        width="64"
        height="75"
        rx="4"
        fill={shelfColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 선반 */}
      <Line x1="20" y1="38" x2="80" y2="38" stroke={OUTLINE} strokeWidth="4" />
      <Line x1="20" y1="63" x2="80" y2="63" stroke={OUTLINE} strokeWidth="4" />

      {/* 책 */}
      <Rect x="25" y="19" width="9" height="18" rx="1" fill="#F45B69" />
      <Rect x="35" y="22" width="10" height="15" rx="1" fill="#4D96FF" />
      <Rect x="47" y="17" width="9" height="20" rx="1" fill="#FFD166" />
      <Rect x="58" y="21" width="11" height="16" rx="1" fill="#65B95B" />

      <Rect x="25" y="44" width="11" height="18" rx="1" fill="#9C6ADE" />
      <Rect x="38" y="42" width="9" height="20" rx="1" fill="#FF8A65" />
      <Rect x="49" y="46" width="12" height="16" rx="1" fill="#4D96FF" />
      <Rect x="63" y="43" width="9" height="19" rx="1" fill="#FFD166" />

      {/* 바닥 */}
      <Rect x="14" y="85" width="72" height="7" rx="3" fill={shelfColor} />
    </Svg>
  );
};
export const Refrigerator = ({
  colorHex = "#C9DDE8",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const dividerColor = secondary ?? "#AABFCB";
  const coldColor = accent ?? "#8AC6E8";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 냉장고 */}
      <Rect
        x="22"
        y="10"
        width="56"
        height="80"
        rx="7"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 문 구분 */}
      <Line
        x1="24"
        y1="48"
        x2="76"
        y2="48"
        stroke={dividerColor}
        strokeWidth="3"
      />

      {/* 손잡이 */}
      <Line
        x1="66"
        y1="25"
        x2="66"
        y2="40"
        stroke="#687780"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <Line
        x1="66"
        y1="56"
        x2="66"
        y2="75"
        stroke="#687780"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* 냉기 표시 */}
      <Path
        d="M35 25 L35 36 M30 30 L40 30"
        stroke={coldColor}
        strokeWidth="3"
        strokeLinecap="round"
      />

      <Ellipse
        cx="39"
        cy="20"
        rx="6"
        ry="3"
        fill={WHITE}
        opacity={0.4}
        transform="rotate(-30 39 20)"
      />
    </Svg>
  );
};
export const Laptop = ({
  colorHex = "#78909C",
  primary,
  secondary,
  size = 75,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const screenColor = secondary ?? "#C8EEFF";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 화면 본체 */}
      <Rect
        x="18"
        y="17"
        width="64"
        height="48"
        rx="5"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 화면 */}
      <Rect x="25" y="24" width="50" height="34" rx="2" fill={screenColor} />

      <Path
        d="M30 49 L44 32"
        stroke={WHITE}
        strokeWidth="5"
        opacity={0.35}
        strokeLinecap="round"
      />

      {/* 키보드 받침 */}
      <Path
        d="M14 66 L86 66 L82 77 Q81 80 78 80 L22 80 Q19 80 18 77 Z"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <Line
        x1="24"
        y1="80"
        x2="76"
        y2="80"
        stroke="#8B959B"
        strokeWidth="2"
        opacity={0.6}
      />

      <Rect x="43" y="70" width="14" height="6" rx="2" fill="#DDE3E7" />

      <Line x1="27" y1="70" x2="39" y2="70" stroke="#7B858B" strokeWidth="2" />

      <Line x1="61" y1="70" x2="73" y2="70" stroke="#7B858B" strokeWidth="2" />
    </Svg>
  );
};
export const Calculator = ({
  colorHex = "#6C7A89",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const screenColor = secondary ?? "#C7F0D8";
  const accentColor = accent ?? "#FFB74D";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 몸체 */}
      <Rect
        x="24"
        y="12"
        width="52"
        height="76"
        rx="8"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 화면 */}
      <Rect
        x="31"
        y="20"
        width="38"
        height="16"
        rx="3"
        fill={screenColor}
        stroke={OUTLINE}
        strokeWidth="2"
      />

      <Line
        x1="35"
        y1="29"
        x2="55"
        y2="29"
        stroke="#3F8F5F"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* 버튼 */}
      <Rect
        x="31"
        y="42"
        width="9"
        height="8"
        rx="2"
        fill={WHITE}
        opacity={0.9}
      />
      <Rect
        x="45"
        y="42"
        width="9"
        height="8"
        rx="2"
        fill={WHITE}
        opacity={0.9}
      />
      <Rect x="59" y="42" width="9" height="8" rx="2" fill={accentColor} />

      <Rect
        x="31"
        y="54"
        width="9"
        height="8"
        rx="2"
        fill={WHITE}
        opacity={0.9}
      />
      <Rect
        x="45"
        y="54"
        width="9"
        height="8"
        rx="2"
        fill={WHITE}
        opacity={0.9}
      />
      <Rect x="59" y="54" width="9" height="8" rx="2" fill={accentColor} />

      <Rect
        x="31"
        y="66"
        width="9"
        height="8"
        rx="2"
        fill={WHITE}
        opacity={0.9}
      />
      <Rect
        x="45"
        y="66"
        width="9"
        height="8"
        rx="2"
        fill={WHITE}
        opacity={0.9}
      />
      <Rect x="59" y="66" width="9" height="8" rx="2" fill="#F45B69" />
    </Svg>
  );
};
export const SquareCakeSlice = ({
  colorHex = "#FFD6E0",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const cakeColor = primary ?? colorHex;
  const sideColor = secondary ?? "#F7B6C8";
  const highlightColor = accent ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 케이크 본체 */}
      <Path
        d="M20 43 L50 25 L80 43 L80 68 L50 84 L20 68 Z"
        fill={cakeColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 케이크 단면 */}
      <Path
        d="M20 43 L50 59 L80 43 L80 68 L50 84 L20 68 Z"
        fill={cakeColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 크림층 */}
      <Path
        d="M22 52 L50 67 L78 52"
        fill="none"
        stroke={highlightColor}
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* 위쪽 크림 */}
      <Path
        d="M20 43 L50 25 L80 43 L50 59 Z"
        fill={cakeColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 딸기 */}
      <Path
        d="M46 30 C46 25 54 25 54 30 C54 35 50 38 50 38 C50 38 46 35 46 30 Z"
        fill="#F44336"
        stroke="#B83B3B"
        strokeWidth="2"
      />

      {/* 딸기 잎 */}
      <Path d="M50 29 L47 25 L50 27 L53 25 L50 31 Z" fill="#4CAF50" />

      {/* 반짝임 */}
      <Ellipse
        cx="36"
        cy="38"
        rx="5"
        ry="2"
        fill={highlightColor}
        opacity={0.5}
        transform="rotate(-30 36 38)"
      />
    </Svg>
  );
};
export const SquareSunglasses = ({
  colorHex = "#FF6B8A",
  primary,
  size = 95,
}: ItemSvgProps) => {
  const lensColor = primary ?? colorHex;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 왼쪽 렌즈 */}
      <Path
        d="M21 41 H47 V67 H21 Z"
        fill={lensColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 오른쪽 렌즈 */}
      <Path
        d="M53 41 H79 V67 H53 Z"
        fill={lensColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 코 다리 */}
      <Path
        d="M47 54 Q50 58 53 54"
        stroke={OUTLINE}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* 안경다리 */}
      <Line
        x1="21"
        y1="53"
        x2="12"
        y2="48"
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Line
        x1="79"
        y1="53"
        x2="88"
        y2="48"
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* 하이라이트 */}
      <Line
        x1="27"
        y1="54"
        x2="33"
        y2="57"
        stroke={WHITE}
        strokeWidth="2"
        opacity={0.45}
      />
      <Line
        x1="69"
        y1="54"
        x2="75"
        y2="57"
        stroke={WHITE}
        strokeWidth="2"
        opacity={0.45}
      />
    </Svg>
  );
};
export const Phone = ({
  colorHex = "#7C8CFF",
  primary,
  secondary,
  size = 75,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const screenColor = secondary ?? "#E8ECFF";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 몸체 */}
      <Rect
        x="27"
        y="8"
        width="46"
        height="84"
        rx="10"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 화면 */}
      <Rect
        x="32"
        y="18"
        width="36"
        height="58"
        rx="3"
        fill={screenColor}
        stroke={OUTLINE}
        strokeWidth="2"
      />

      {/* 상단 스피커 */}
      <Rect
        x="43"
        y="12"
        width="14"
        height="3"
        rx="1.5"
        fill="#3A3F55"
        opacity={0.5}
      />

      {/* 화면 아이콘 */}
      <Circle cx="41" cy="30" r="4" fill="#FFB74D" />

      <Rect
        x="48"
        y="27"
        width="12"
        height="6"
        rx="2"
        fill={WHITE}
        opacity={0.85}
      />

      <Line
        x1="37"
        y1="44"
        x2="63"
        y2="44"
        stroke={WHITE}
        strokeWidth="3"
        opacity={0.85}
        strokeLinecap="round"
      />

      <Line
        x1="37"
        y1="52"
        x2="55"
        y2="52"
        stroke={WHITE}
        strokeWidth="3"
        opacity={0.85}
        strokeLinecap="round"
      />

      {/* 홈버튼 */}
      <Circle cx="50" cy="84" r="4.5" fill="#3A3F55" opacity={0.4} />

      {/* 반짝임 */}
      <Ellipse
        cx="37"
        cy="22"
        rx="4"
        ry="2"
        fill={WHITE}
        opacity={0.5}
        transform="rotate(-30 37 22)"
      />
    </Svg>
  );
};
export const RemoteControl = ({
  colorHex = "#4A4E5A",
  primary,
  secondary,
  size = 95,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const greenButton = secondary ?? "#6FCF97";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 몸체 */}
      <Rect
        x="34"
        y="21"
        width="32"
        height="64"
        rx="6"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* IR 표시등 */}
      <Rect
        x="41"
        y="28"
        width="7"
        height="6"
        rx="1.5"
        fill="#F45B69"
        stroke={OUTLINE}
        strokeWidth="1.5"
      />

      {/* 상단 버튼 */}
      <Rect
        x="39"
        y="36"
        width="9"
        height="12"
        rx="3"
        fill="#FFB74D"
        stroke={OUTLINE}
        strokeWidth="1.5"
      />

      <Rect
        x="52"
        y="36"
        width="9"
        height="12"
        rx="3"
        fill={greenButton}
        stroke={OUTLINE}
        strokeWidth="1.5"
      />

      {/* 하단 버튼 */}
      <Rect
        x="39"
        y="58"
        width="9"
        height="8"
        rx="2"
        fill={WHITE}
        opacity={0.9}
      />
      <Rect
        x="52"
        y="58"
        width="9"
        height="8"
        rx="2"
        fill={WHITE}
        opacity={0.9}
      />

      <Rect x="39" y="70" width="9" height="8" rx="2" fill="#F45B69" />
      <Rect x="52" y="70" width="9" height="8" rx="2" fill={greenButton} />
    </Svg>
  );
};
export const Switch = ({
  colorHex = "#F5F0E6",
  primary,
  secondary,
  size = 75,
}: ItemSvgProps) => {
  const panelColor = primary ?? colorHex;
  const onColor = secondary ?? "#FFD166";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 벽판 */}
      <Rect
        x="18"
        y="18"
        width="64"
        height="64"
        rx="10"
        fill={panelColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* ON */}
      <Rect
        x="36"
        y="30"
        width="28"
        height="17"
        rx="4"
        fill={onColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
      />

      {/* OFF */}
      <Rect
        x="36"
        y="54"
        width="28"
        height="17"
        rx="4"
        fill={onColor}
        stroke={OUTLINE}
        strokeWidth="2"
      />

      {/* 고정 나사 */}
      <Circle cx="23" cy="23" r="2.5" fill="#9A9484" />
      <Circle cx="77" cy="23" r="2.5" fill="#9A9484" />
      <Circle cx="23" cy="77" r="2.5" fill="#9A9484" />
      <Circle cx="77" cy="77" r="2.5" fill="#9A9484" />

      {/* 반짝임 */}
      <Ellipse
        cx="44"
        cy="38"
        rx="5"
        ry="2"
        fill={WHITE}
        opacity={0.5}
        transform="rotate(-20 44 38)"
      />
    </Svg>
  );
};
export const Frame = ({
  colorHex = DEFAULT_COLOR,
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const frameColor = primary ?? colorHex;
  const pictureColor = secondary ?? WHITE;
  const highlightColor = accent ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect
        x="19"
        y="20"
        width="62"
        height="62"
        rx="6"
        fill={frameColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      <Rect
        x="29"
        y="30"
        width="42"
        height="42"
        rx="3"
        fill={pictureColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      <Path
        d="M27 28 L36 28"
        stroke={highlightColor}
        strokeWidth="4"
        strokeLinecap="round"
        opacity={0.6}
      />
    </Svg>
  );
};
export const TriangleRuler = ({
  colorHex = "#FF8B8B",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const rulerColor = primary ?? colorHex;
  const innerColor = secondary ?? WHITE;
  const highlightColor = accent ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Polygon
        points="50,15 90,75 10,75"
        fill={rulerColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <Polygon
        points="50,27 78,67 22,67"
        fill={innerColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      <Line
        x1="30"
        y1="75"
        x2="30"
        y2="71"
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Line
        x1="40"
        y1="75"
        x2="40"
        y2="72"
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Line
        x1="50"
        y1="75"
        x2="50"
        y2="70"
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Line
        x1="60"
        y1="75"
        x2="60"
        y2="72"
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Line
        x1="70"
        y1="75"
        x2="70"
        y2="71"
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinecap="round"
      />

      <Path
        d="M35 30 L50 20"
        stroke={highlightColor}
        strokeWidth="4"
        strokeLinecap="round"
        opacity={0.6}
      />
    </Svg>
  );
};
export const TriangleInstrument = ({
  colorHex = "#B8C0C8",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const instrumentColor = primary ?? colorHex;
  const handleColor = secondary ?? "#E5A13B";
  const topColor = accent ?? "#FFD166";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Polygon
        points="50,16 18,76 82,76"
        fill="none"
        stroke={instrumentColor}
        strokeWidth="8"
        strokeLinejoin="round"
      />

      <Line
        x1="50"
        y1="65"
        x2="61"
        y2="85"
        stroke={handleColor}
        strokeWidth="5"
        strokeLinecap="round"
      />

      <Circle cx="50" cy="16" r="5" fill={topColor} />
    </Svg>
  );
};
export const PartyHat = ({
  colorHex = "#4D96FF",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const hatColor = primary ?? colorHex;
  const decorationColor = secondary ?? "#FFD166";
  const topColor = accent ?? "#FFD166";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Polygon
        points="50,14 20,78 80,78"
        fill={hatColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 꼭대기 장식 */}
      <Polygon points="50,6 42,20 58,20" fill={topColor} />

      {/* 장식 1 */}
      <Polygon points="42,37 37,47 47,47" fill={WHITE} />

      {/* 장식 2 */}
      <Polygon points="59,50 54,60 64,60" fill={decorationColor} />

      {/* 장식 3 */}
      <Polygon points="37,59 32,69 42,69" fill={decorationColor} />

      {/* 아래 리본 */}
      <Path
        d="M25 78 Q50 120 75 78"
        fill="none"
        stroke={hatColor}
        strokeWidth="5"
        strokeLinecap="round"
      />
    </Svg>
  );
};
export const ChristmasTree = ({
  colorHex = "#38A852",
  primary,
  secondary,
  accent,
  size = 85,
}: ItemSvgProps) => {
  const treeColor = primary ?? colorHex;
  const trunkColor = secondary ?? "#8D5A32";
  const starColor = accent ?? "#FFD166";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 나무 기둥 */}
      <Rect x="44" y="69" width="12" height="18" fill={trunkColor} />

      {/* 아래 나뭇가지 */}
      <Polygon
        points="50,31 19,73 81,73"
        fill={treeColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      {/* 위 나뭇가지 */}
      <Polygon
        points="50,16 28,52 72,52"
        fill={treeColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      {/* 장식 */}
      <Polygon points="37,44 32,53 42,53" fill="#FF5B5B" />

      <Polygon points="62,38 57,47 67,47" fill={starColor} />

      <Polygon points="47,57 42,66 52,66" fill="#4D96FF" />

      <Polygon points="67,58 62,67 72,67" fill="#FF6B8A" />
    </Svg>
  );
};
export const Flag = ({
  colorHex = "#F44336",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const flagColor = primary ?? colorHex;
  const poleColor = secondary ?? "#8D5A32";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Line
        x1="27"
        y1="14"
        x2="27"
        y2="87"
        stroke={poleColor}
        strokeWidth="6"
        strokeLinecap="round"
      />

      <Polygon
        points="30,18 79,34 30,51"
        fill={flagColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
export const TriangleSandwich = ({
  colorHex = "#F4C27A",
  primary,
  secondary,
  accent,
  size = 85,
}: ItemSvgProps) => {
  const breadColor = primary ?? colorHex;
  const bottomBreadColor = secondary ?? "#D99A4E";
  const highlightColor = accent ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 아래 빵 */}
      <Path
        d="M18 68 L50 27 L82 68 Z"
        fill={bottomBreadColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 치즈 */}
      <Path
        d="M23 60 L50 37 L77 60 L72 66 L50 49 L28 66 Z"
        fill="#FFD166"
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 양상추 */}
      <Path
        d="
          M25 56
          L50 35
          L75 56
          L70 62
          C65 58 61 64 56 60
          C51 57 48 63 43 59
          C38 55 34 62 29 60
          Z
        "
        fill="#72C968"
        stroke="#4F9148"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 토마토 */}
      <Polygon
        points="50,38 76,58 24,55"
        fill="#F05A47"
        stroke="#B83B3B"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 위쪽 빵 */}
      <Polygon
        points="50,18 82,54 18,54"
        fill={breadColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 빵 하이라이트 */}
      <Path
        d="M38 36 L43 29"
        stroke={highlightColor}
        strokeWidth="3"
        strokeLinecap="round"
        opacity={0.45}
      />
    </Svg>
  );
};
export const TriangleKimbap = ({
  colorHex = "#22272B",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const seaweedColor = primary ?? colorHex;
  const riceColor = secondary ?? "#FFF9F0";
  const fillingColor = accent ?? "#FFD166";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 김 */}
      <Polygon
        points="50,15 17,80 83,80"
        fill={seaweedColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 밥 */}
      <Polygon
        points="50,26 26,73 74,73"
        fill={riceColor}
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* 속재료 */}
      <Path
        d="M50 47 L56 59 L44 59 Z"
        fill={fillingColor}
        strokeLinejoin="round"
      />

      <Path
        d="M41 55.5 L45.5 65.5 L36.5 65.5 Z"
        fill="#F15B5B"
        strokeLinejoin="round"
      />

      <Path
        d="M59 55.5 L63.5 65.5 L54.5 65.5 Z"
        fill="#65B95B"
        strokeLinejoin="round"
      />

      {/* 김 결 느낌 */}
      <Line
        x1="24"
        y1="80"
        x2="30"
        y2="68"
        stroke="#000000"
        strokeOpacity={0.15}
        strokeWidth="2"
      />

      <Line
        x1="76"
        y1="80"
        x2="70"
        y2="68"
        stroke="#000000"
        strokeOpacity={0.15}
        strokeWidth="2"
      />
    </Svg>
  );
};
export const Pyramid = ({
  colorHex = "#E6C594",
  primary,
  secondary,
  accent,
  size = 85,
}: ItemSvgProps) => {
  const pyramidColor = primary ?? colorHex;
  const baseColor = secondary ?? "#B07D4F";
  const highlightColor = accent ?? "#FFE082";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 피라미드 전체 */}
      <Polygon
        points="50,18 84,74 16,74"
        fill={pyramidColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 돌 블록 층 1 */}
      <Polygon
        points="37,40 63,40 66,46 34,46"
        fill={baseColor}
        stroke={OUTLINE}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* 돌 블록 층 2 */}
      <Polygon
        points="32,48 68,48 72,54 28,54"
        fill={baseColor}
        stroke={OUTLINE}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* 돌 블록 층 3 */}
      <Polygon
        points="27,56 73,56 78,64 22,64"
        fill={baseColor}
        stroke={OUTLINE}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* 기반암 */}
      <Polygon
        points="21,66 79,66 84,74 16,74"
        fill={baseColor}
        stroke={OUTLINE}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* 능선 */}
      <Path
        d="M50 18 L50 74"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="2"
        opacity={0.3}
        strokeLinecap="round"
      />

      {/* 꼭짓점 하이라이트 */}
      <Ellipse cx="50" cy="25" rx="3" ry="1.5" fill={baseColor} opacity={0.7} />
    </Svg>
  );
};
export const Tent = ({
  colorHex = "#118AB2",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const tentColor = primary ?? colorHex;
  const doorColor = secondary ?? WHITE;
  const flagColor = accent ?? "#FFD166";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 텐트 */}
      <Polygon
        points="50,18 85,80 15,80"
        fill={tentColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 텐트 문 */}
      <Path
        d="M50 48 L65 80 L35 80 Z"
        fill={doorColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 깃발 */}
      <Path
        d="M50 18 L50 10 L62 14 L50 18 Z"
        fill={flagColor}
        stroke={OUTLINE}
        strokeWidth="2"
      />
    </Svg>
  );
};
export const Mountain = ({
  colorHex = "#72B86A",
  primary,
  size = 75,
}: ItemSvgProps) => {
  const mountainColor = primary ?? colorHex;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 큰 산 */}
      <Polygon
        points="50,12 12,82 88,82"
        fill={mountainColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 눈 */}
      <Polygon points="50,12 38,35 50,31 61,36" fill={WHITE} />

      {/* 작은 산 */}
      <Polygon
        points="73,38 50,82 94,82"
        fill={mountainColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 작은 눈 */}
      <Polygon points="73,38 66,52 73,49 80,53" fill={WHITE} />
    </Svg>
  );
};
export const Sailboat = ({
  colorHex = "#4D96FF",
  primary,
  secondary,
  accent,
  size = 85,
}: ItemSvgProps) => {
  const sailColor = primary ?? colorHex;
  const hullColor = secondary ?? "#A8733E";
  const waveColor = accent ?? "#63C5E8";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 돛대 */}
      <Line
        x1="50"
        y1="13"
        x2="50"
        y2="67"
        stroke="#8D5A32"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* 왼쪽 돛 */}
      {/* <Polygon
        points="48,18 22,57 48,57"
        fill={sailColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      /> */}

      {/* 오른쪽 돛 */}
      <Polygon
        points="53,17 53,51 78,51"
        fill={sailColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 배 */}
      <Path
        d="M18 63 L82 63 L70 79 Q50 87 30 79 Z"
        fill={hullColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 파도 */}
      <Path
        d="M20 86 Q30 80 40 86 Q50 92 60 86 Q70 80 80 86"
        fill="none"
        stroke={waveColor}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </Svg>
  );
};
export const TriangleCookie = ({
  colorHex = "#D99A52",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const cookieColor = primary ?? colorHex;
  const chipColor = secondary ?? "#754421";
  const highlightColor = accent ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="M46.4 20.1 Q50 13 53.6 20.1 L80.4 72.9 Q84 80 76 80 L24 80 Q16 80 19.6 72.9 Z"
        fill={cookieColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* 초코칩 */}

      <Circle cx="60" cy="45" r="3.5" fill={chipColor} />

      <Circle cx="33" cy="58" r="2.8" fill={chipColor} />

      <Circle cx="52" cy="63" r="3.2" fill={chipColor} />

      <Circle cx="68" cy="60" r="3" fill={chipColor} />

      <Circle cx="47" cy="75" r="2.8" fill={chipColor} />
      <Circle cx="48" cy="33" r="2" fill={chipColor} />
      <Circle cx="43" cy="52" r="1.8" fill={chipColor} />
      <Ellipse
        cx="42"
        cy="31"
        rx="10"
        ry="4"
        fill={highlightColor}
        opacity={0.22}
        transform="rotate(-30 42 31)"
      />
    </Svg>
  );
};
export const WatermelonSlice = ({
  colorHex = "#EF476F",
  primary,
  secondary,
  accent,
  size = 85,
}: ItemSvgProps) => {
  const fleshColor = primary ?? colorHex;
  const rindColor = secondary ?? "#06D6A0";
  const seedColor = accent ?? OUTLINE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 수박 껍질 */}
      <Rect
        x="19.5"
        y="70"
        width="60"
        height="12"
        fill={rindColor}
        stroke={OUTLINE}
        strokeWidth="4"
        rx="5"
      />

      {/* 수박 과육 */}
      <Polygon
        points="50,24 82,76 18,76"
        fill={fleshColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 수박 씨앗 */}
      <Circle cx="50" cy="48" r="3" fill={seedColor} />
      <Circle cx="40" cy="62" r="3" fill={seedColor} />
      <Circle cx="60" cy="62" r="3" fill={seedColor} />
    </Svg>
  );
};
export const PizzaSlice = ({
  colorHex = "#FFC93C",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const cheeseColor = primary ?? colorHex;
  const crustColor = secondary ?? "#E8A857";
  const highlightColor = accent ?? "#FFE380";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 크러스트 */}
      <Path
        d="M17 68 Q19 79 24 80 L76 80 Q81 79 83 68 Q50 74 17 68 Z"
        fill={crustColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 크러스트 기포 */}
      <Circle cx="30" cy="73" r="2" fill="#C98A3E" opacity={0.6} />

      <Circle cx="45" cy="76" r="2" fill="#C98A3E" opacity={0.6} />

      <Circle cx="60" cy="75" r="2" fill="#C98A3E" opacity={0.6} />

      <Circle cx="72" cy="72" r="2" fill="#C98A3E" opacity={0.6} />

      {/* 피자 몸통 */}
      <Polygon
        points="50,20 81,70 19,70"
        fill={cheeseColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 치즈 광택 */}
      <Path d="M50 26 L74 66 L26 66 Z" fill={highlightColor} opacity={0.4} />

      {/* 페퍼로니 질감 점 */}
      <Polygon
        points="48,38 53,44 43,44"
        fill="#B8342C"
        strokeLinejoin="round"
      />

      <Polygon
        points="52,42 57,48 47,48"
        fill="#B8342C"
        strokeLinejoin="round"
      />

      <Polygon
        points="36,51 41,57 31,57"
        fill="#B8342C"
        strokeLinejoin="round"
      />

      <Polygon
        points="64,55 69,61 59,61"
        fill="#B8342C"
        strokeLinejoin="round"
      />

      {/* 피망 */}
      <Path d="M42 60 Q45 56 48 60 Q45 63 42 60 Z" fill="#4CAF50" />

      <Path d="M58 48 Q61 44 64 48 Q61 51 58 48 Z" fill="#4CAF50" />

      {/* 반짝임 */}
      <Ellipse
        cx="42"
        cy="33"
        rx="5"
        ry="2.5"
        fill={WHITE}
        opacity={0.5}
        transform="rotate(-25 42 33)"
      />
    </Svg>
  );
};
export const HeartCookie = ({
  colorHex = "#E09F3E",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const cookieColor = primary ?? colorHex;
  const chipColor = secondary ?? "#754421";
  const highlightColor = accent ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="M50 82 C50 82 20 60 20 38 C20 25 30 18 40 18 C47 18 50 24 50 24 C50 24 53 18 60 18 C70 18 80 25 80 38 C80 60 50 82 50 82 Z"
        fill={cookieColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 설탕 데코 */}
      <Path
        d="M40 35 Q50 30 60 35"
        stroke={highlightColor}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity={0.7}
      />

      {/* 초코칩 */}
      <Circle cx="35" cy="39" r="3" fill={chipColor} />
      <Circle cx="61" cy="39" r="3" fill={chipColor} />
      <Circle cx="48" cy="56" r="3" fill={chipColor} />
      <Circle cx="64" cy="57" r="3" fill={chipColor} />
    </Svg>
  );
};
export const HeartBalloon = ({
  colorHex = "#FF4F6D",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const balloonColor = primary ?? colorHex;
  const stringColor = secondary ?? "#777777";
  const highlightColor = accent ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 풍선 */}
      <Path
        d="
          M50 72
          C43 64 19 50 19 31
          C19 17 37 12 50 28
          C63 12 81 17 81 31
          C81 50 57 64 50 72
          Z
        "
        fill={balloonColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 매듭 */}
      <Polygon points="45,72 55,72 50,80" fill={balloonColor} />

      {/* 줄 */}
      <Path
        d="M50 80 C43 87 57 91 50 97"
        fill="none"
        stroke={stringColor}
        strokeWidth="3"
      />

      {/* 반짝임 */}
      <Ellipse
        cx="35"
        cy="29"
        rx="5"
        ry="9"
        fill={highlightColor}
        opacity={0.3}
      />
    </Svg>
  );
};
export const HeartLollipop = ({
  colorHex = "#F72585",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const candyColor = primary ?? colorHex;
  const stickColor = secondary ?? "#C9A66B";
  const highlightColor = accent ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 막대 */}
      <Line
        x1="50"
        y1="60"
        x2="50"
        y2="88"
        stroke={OUTLINE}
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* 하트 사탕 */}
      <Path
        d="M50 62 C50 62 22 42 22 24 C22 13 30 8 38 8 C44 8 50 13 50 13 C50 13 56 8 62 8 C70 8 78 13 78 24 C78 42 50 62 50 62 Z"
        fill={candyColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 반짝임 */}
      <Path
        d="M34 22 L40 28"
        stroke={highlightColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity={0.6}
      />
    </Svg>
  );
};
export const HeartPillow = ({
  colorHex = "#B897E8",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const pillowColor = primary ?? colorHex;
  const seamColor = secondary ?? WHITE;
  const highlightColor = accent ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 하트 베개 */}
      <Path
        d="
          M50 83
          C41 75 18 59 19 37
          C20 22 37 17 50 32
          C63 17 80 22 81 37
          C82 59 59 75 50 83
          Z
        "
        fill={pillowColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 안쪽 시접 */}
      <Path
        d="
          M50 73
          C43 67 29 56 29 43
          C30 34 40 31 50 42
          C60 31 70 34 71 43
          C71 56 57 67 50 73
        "
        fill="none"
        stroke={seamColor}
        strokeWidth="3"
        opacity={0.35}
      />

      {/* 작은 반짝임 */}
      <Ellipse
        cx="35"
        cy="35"
        rx="5"
        ry="2"
        fill={highlightColor}
        opacity={0.25}
        transform="rotate(-25 35 35)"
      />
    </Svg>
  );
};
export const HeartCake = ({
  colorHex = "#FFB6C1",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const frostingColor = primary ?? colorHex;
  const sideColor = secondary ?? "#E8879E";
  const highlightColor = accent ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 케이크 옆면 */}
      <Path
        d="M50 90 C41 81 16 63 16 42 C16 25 36 21 50 37 C64 21 84 25 84 42 C84 63 59 81 50 90 Z"
        fill={sideColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 케이크 윗면 */}
      <Path
        d="M50 83 C42 75 18 59 18 39 C18 23 36 19 50 34 C64 19 82 23 82 39 C82 59 58 75 50 83 Z"
        fill={frostingColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 층 구분 크림 */}
      <Path
        d="M25 50 Q33 46 41 50 Q50 54 59 50 Q67 46 75 50"
        fill="none"
        stroke={WHITE}
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* 하단 크림 */}
      <Path
        d="M30 64 Q40 60 50 64 Q60 68 70 64"
        fill="none"
        stroke="#FFF0F3"
        strokeWidth="4"
        strokeLinecap="round"
        opacity={0.8}
      />

      {/* 체리 토핑 */}
      <Path
        d="M50 40 C50 40 40 31 40 25 C40 20 45 18 50 24 C55 18 60 20 60 25 C60 31 50 40 50 40 Z"
        fill="#F44355"
        stroke={OUTLINE}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* 체리 잎 */}
      <Path
        d="M50 21 Q55 12 60 14"
        stroke="#4CAF50"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* 반짝임 */}
      <Ellipse
        cx="34"
        cy="46"
        rx="6"
        ry="2.5"
        fill={highlightColor}
        opacity={0.45}
        transform="rotate(-30 34 46)"
      />
    </Svg>
  );
};
export const HeartButton = ({
  colorHex = "#FF6B8A",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const highlightColor = accent ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="
          M50 82
          C42 74 19 59 19 38
          C19 22 37 18 50 33
          C63 18 81 22 81 38
          C81 59 58 74 50 82
          Z
        "
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      <Circle cx="40" cy="42" r="2.5" fill={WHITE} />
      <Circle cx="60" cy="42" r="2.5" fill={WHITE} />
      <Circle cx="40" cy="60" r="2.5" fill={WHITE} />
      <Circle cx="60" cy="60" r="2.5" fill={WHITE} />

      <Ellipse
        cx="37"
        cy="30"
        rx="6"
        ry="3"
        fill={highlightColor}
        opacity={0.4}
        transform="rotate(-30 37 30)"
      />
    </Svg>
  );
};
export const HeartClock = ({
  colorHex = "#FF8FAB",
  primary,
  secondary,
  accent,
  size = 80,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const handColor = secondary ?? DARK;
  const centerColor = accent ?? "#FF9F43";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="
          M50 84
          C42 76 18 60 18 37
          C18 20 37 16 50 32
          C63 16 82 20 82 37
          C82 60 58 76 50 84
          Z
        "
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      <Path
        d="M50 66 C50 66 32 53 32 41 C32 33 40 29 45 35 C50 41 50 41 50 41 C50 41 50 41 55 35 C60 29 68 33 68 41 C68 53 50 66 50 66 Z"
        fill={handColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      <Line
        x1="50"
        y1="49"
        x2="50"
        y2="38"
        stroke={centerColor}
        strokeWidth="3"
        strokeLinecap="round"
      />

      <Line
        x1="50"
        y1="49"
        x2="59"
        y2="54"
        stroke={centerColor}
        strokeWidth="3"
        strokeLinecap="round"
      />

      <Circle cx="50" cy="49" r="3" fill={mainColor} />
    </Svg>
  );
};
export const HeartSunglasses = ({
  colorHex = "#9B5DE5",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const frameColor = primary ?? colorHex;
  const lensColor = secondary ?? "#353B43";
  const highlightColor = accent ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="M34 72 C34 72 21 63 21 54 C21 47 28 44 34 51 C40 44 47 47 47 54 C47 63 34 72 34 72 Z"
        fill={lensColor}
        stroke={frameColor}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      <Path
        d="M66 72 C66 72 53 63 53 54 C53 47 60 44 66 51 C72 44 79 47 79 54 C79 63 66 72 66 72 Z"
        fill={lensColor}
        stroke={frameColor}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      <Path
        d="M47 54 Q50 58 53 54"
        stroke={frameColor}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      <Line
        x1="21"
        y1="53"
        x2="12"
        y2="48"
        stroke={frameColor}
        strokeWidth="3"
        strokeLinecap="round"
      />

      <Line
        x1="79"
        y1="53"
        x2="88"
        y2="48"
        stroke={frameColor}
        strokeWidth="3"
        strokeLinecap="round"
      />

      <Line
        x1="27"
        y1="54"
        x2="33"
        y2="57"
        stroke={highlightColor}
        strokeWidth="2"
        opacity={0.45}
      />

      <Line
        x1="69"
        y1="54"
        x2="75"
        y2="57"
        stroke={highlightColor}
        strokeWidth="2"
        opacity={0.45}
      />
    </Svg>
  );
};
export const HeartGem = ({
  colorHex = "#B388FF",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const gemColor = primary ?? colorHex;
  const cutColor = secondary ?? WHITE;
  const highlightColor = accent ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="
          M50 82
          L23 53
          C10 39 18 19 34 19
          C42 19 48 24 50 31
          C52 24 58 19 66 19
          C82 19 90 39 77 53
          Z
        "
        fill={gemColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <Path
        d="M25 30 L39 25 L50 32 L61 25 L75 30 L67 43 L50 37 L33 43 Z"
        fill={cutColor}
        opacity={0.28}
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <Path
        d="M33 43 L50 37 L67 43 L58 64 L50 76 L42 64 Z"
        fill={cutColor}
        opacity={0.18}
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <Path
        d="M29 32 L37 28 L42 31 L35 39 Z"
        fill={highlightColor}
        opacity={0.55}
      />
    </Svg>
  );
};
export const HeartNecklace = ({
  colorHex = "#F48FB1",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const pendantColor = primary ?? colorHex;
  const chainColor = secondary ?? "#D9A441";
  const highlightColor = accent ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="
          M22 18
          C25 34 32 45 50 50
          C68 45 75 34 78 18
        "
        fill="none"
        stroke={chainColor}
        strokeWidth="3"
        strokeLinecap="round"
      />

      <Path
        d="
          M50 78
          C47 75 29 63 29 52
          C29 43 39 39 46 46
          L50 50
          L54 46
          C61 39 71 43 71 52
          C71 63 53 75 50 78
          Z
        "
        fill={pendantColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <Path
        d="
          M39 50
          C40 47 43 46 46 49
        "
        fill="none"
        stroke={highlightColor}
        strokeWidth="3"
        strokeLinecap="round"
        opacity={0.55}
      />

      <Circle cx="61" cy="63" r="2.2" fill={highlightColor} opacity={0.45} />
    </Svg>
  );
};
export const StarCookie = ({
  colorHex = "#E5A64D",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const cookieColor = primary ?? colorHex;
  const chipColor = secondary ?? "#754421";
  const highlightColor = accent ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Polygon
        points="
          50,10
          61,34
          87,37
          67,54
          73,81
          50,67
          27,81
          33,54
          13,37
          39,34
        "
        fill={cookieColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <Circle cx="43" cy="37" r="3" fill={chipColor} />
      <Circle cx="61" cy="46" r="3" fill={chipColor} />
      <Circle cx="38" cy="57" r="3" fill={chipColor} />
      <Circle cx="54" cy="62" r="3" fill={chipColor} />

      {/* 작은 반짝임 */}
      <Ellipse
        cx="35"
        cy="29"
        rx="4"
        ry="2"
        fill={highlightColor}
        opacity={0.25}
        transform="rotate(-20 35 29)"
      />
    </Svg>
  );
};
export const StarBalloon = ({
  colorHex = "#FFD43B",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const balloonColor = primary ?? colorHex;
  const stringColor = secondary ?? "#777777";
  const highlightColor = accent ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 풍선 */}
      <Polygon
        points="
          50,10
          61,34
          87,37
          67,54
          73,80
          50,67
          27,80
          33,54
          13,37
          39,34
        "
        fill={balloonColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 매듭 */}
      <Path
        d="M45 72 Q50 79 55 72"
        fill={balloonColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 풍선 줄 */}
      <Path
        d="
          M50 78
          C46 86 54 94 49 101
          C45 107 53 113 50 120
        "
        fill="none"
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* 반짝임 */}
      <Ellipse
        cx="38"
        cy="30"
        rx="5"
        ry="9"
        fill={highlightColor}
        opacity={0.3}
      />
    </Svg>
  );
};
export const StarBalloon1 = ({
  colorHex = "#9B5DE5",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const balloonColor = primary ?? colorHex;
  const stringColor = secondary ?? OUTLINE;
  const highlightColor = accent ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 줄 */}
      <Line
        x1="50"
        y1="70"
        x2="50"
        y2="88"
        stroke={stringColor}
        strokeWidth="2"
        opacity={0.7}
      />

      {/* 별 풍선 */}
      <Path
        d="M50 10 L60 34 L86 36 L66 53 L72 78 L50 65 L28 78 L34 53 L14 36 L40 34 Z"
        fill={balloonColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 반짝임 */}
      <Path
        d="M38 28 L44 34"
        stroke={highlightColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity={0.6}
      />
    </Svg>
  );
};
export const StarWand = ({
  colorHex = "#FFD43B",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const starColor = primary ?? colorHex;
  const wandColor = secondary ?? "#F278A1";
  const sparkleColor = accent ?? "#FFD166";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 막대 */}
      <Line
        x1="43"
        y1="57"
        x2="25"
        y2="88"
        stroke={starColor}
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* 별 */}
      <Polygon
        points="
          55,10
          63,28
          83,30
          68,43
          73,63
          55,52
          37,63
          42,43
          27,30
          47,28
        "
        fill={starColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 반짝이 1 */}
      <Line
        x1="90"
        y1="15"
        x2="90"
        y2="25"
        stroke={sparkleColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Line
        x1="85"
        y1="20"
        x2="95"
        y2="20"
        stroke={sparkleColor}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* 반짝이 2 */}
      <Line
        x1="87"
        y1="33"
        x2="87"
        y2="43"
        stroke={sparkleColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Line
        x1="82"
        y1="38"
        x2="92"
        y2="38"
        stroke={sparkleColor}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* 반짝이 3 */}
      <Line
        x1="71"
        y1="11"
        x2="71"
        y2="21"
        stroke={sparkleColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Line
        x1="66"
        y1="16"
        x2="76"
        y2="16"
        stroke={sparkleColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* 반짝이 */}
      {/* <Circle cx="83" cy="20" r="3" fill={sparkleColor} />
      <Circle cx="87" cy="38" r="3" fill={sparkleColor} />
      <Circle cx="71" cy="14" r="3" fill={sparkleColor} /> */}
    </Svg>
  );
};
export const StarPillow = ({
  colorHex = "#74C8FF",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const pillowColor = primary ?? colorHex;
  const seamColor = secondary ?? WHITE;
  const highlightColor = accent ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 별 모양 베개 */}
      <Polygon
        points="
          50,11
          62,34
          87,38
          68,55
          73,81
          50,68
          27,81
          32,55
          13,38
          38,34
        "
        fill={pillowColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 안쪽 시접 */}
      <Polygon
        points="
          50,22
          59,40
          78,43
          64,56
          67,70
          50,61
          33,70
          36,56
          22,43
          41,40
        "
        fill="none"
        stroke={seamColor}
        strokeWidth="3"
        opacity={0.35}
      />

      {/* 반짝임 */}
      <Ellipse
        cx="36"
        cy="30"
        rx="5"
        ry="2"
        fill={highlightColor}
        opacity={0.25}
        transform="rotate(-20 36 30)"
      />
    </Svg>
  );
};
export const Starfish = ({
  colorHex = "#FF7F45",
  primary,
  secondary,
  size = 75,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const spotColor = secondary ?? "#FFB078";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="
          M50 10
          C57 24 59 32 64 35
          C70 38 78 32 88 31
          C81 43 70 49 69 55
          C68 62 76 72 78 84
          C65 78 57 68 50 69
          C43 68 35 78 22 84
          C24 72 32 62 31 55
          C30 49 19 43 12 31
          C22 32 30 38 36 35
          C41 32 43 24 50 10
          Z
        "
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <Circle cx="42" cy="39" r="3" fill={spotColor} />
      <Circle cx="60" cy="44" r="3" fill={spotColor} />
      <Circle cx="49" cy="56" r="3" fill={spotColor} />
      <Circle cx="35" cy="57" r="3" fill={spotColor} />
      <Circle cx="63" cy="61" r="3" fill={spotColor} />
    </Svg>
  );
};
export const StarButton = ({
  colorHex = "#FFD43B",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const highlightColor = accent ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Polygon
        points="
          50,10
          61,34
          87,37
          67,54
          73,81
          50,67
          27,81
          33,54
          13,37
          39,34
        "
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <Circle cx="42" cy="40" r="2.5" fill={WHITE} />
      <Circle cx="58" cy="40" r="2.5" fill={WHITE} />
      <Circle cx="42" cy="56" r="2.5" fill={WHITE} />
      <Circle cx="58" cy="56" r="2.5" fill={WHITE} />

      <Ellipse
        cx="38"
        cy="29"
        rx="6"
        ry="3"
        fill={highlightColor}
        opacity={0.4}
        transform="rotate(-30 38 29)"
      />
    </Svg>
  );
};
export const StarClock = ({
  colorHex = "#FFD43B",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const handColor = secondary ?? DARK;
  const centerColor = accent ?? "#FF6B6B";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Polygon
        points="
          50,9
          61,33
          87,37
          67,54
          73,81
          50,67
          27,81
          33,54
          13,37
          39,33
        "
        fill={handColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* <Path
        d="M50 30 L55.5 40.5 L68 42.4 L59 51.4 L61.2 64 L50 58 L38.8 64 L41 51.4 L32 42.4 L44.5 40.5 Z"
        fill={handColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      /> */}

      <Line
        x1="50"
        y1="49"
        x2="50"
        y2="30"
        stroke={centerColor}
        strokeWidth="3"
        strokeLinecap="round"
      />

      <Line
        x1="50"
        y1="49"
        x2="59"
        y2="54"
        stroke={centerColor}
        strokeWidth="3"
        strokeLinecap="round"
      />

      <Circle cx="50" cy="49" r="3" fill={OUTLINE} />
    </Svg>
  );
};
export const StarCake = ({
  colorHex = "#FF9EB5",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const cakeColor = primary ?? colorHex;
  const fruitColor = secondary ?? "#F44336";
  const berryColor = accent ?? "#4D96FF";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Polygon
        points="50,10 61,34 87,37 67,54 73,81 50,67 27,81 33,54 13,37 39,34"
        fill={cakeColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <Path
        d="M50 13 L51.2 15.5 L54 15.9 L52 17.9 L52.5 20.7 L50 19.4 L47.5 20.7 L48 17.9 L46 15.9 L48.8 15.5 Z"
        fill={WHITE}
        opacity={0.85}
      />

      <Path
        d="M70 33 L71.2 35.5 L74 35.9 L72 37.9 L72.5 40.7 L70 39.4 L67.5 40.7 L68 37.9 L66 35.9 L68.8 35.5 Z"
        fill={WHITE}
        opacity={0.85}
      />

      <Path
        d="M63 58 L64.2 60.5 L67 60.9 L65 62.9 L65.5 65.7 L63 64.4 L60.5 65.7 L61 62.9 L59 60.9 L61.8 60.5 Z"
        fill={WHITE}
        opacity={0.85}
      />

      <Path
        d="M37 58 L38.2 60.5 L41 60.9 L39 62.9 L39.5 65.7 L37 64.4 L34.5 65.7 L35 62.9 L33 60.9 L35.8 60.5 Z"
        fill={WHITE}
        opacity={0.85}
      />

      <Path
        d="M30 33 L31.2 35.5 L34 35.9 L32 37.9 L32.5 40.7 L30 39.4 L27.5 40.7 L28 37.9 L26 35.9 L28.8 35.5 Z"
        fill={WHITE}
        opacity={0.85}
      />

      <Path
        d="M50 33 L52.5 38 L58 38.8 L54 42.7 L55 48.2 L50 45.6 L45 48.2 L46 42.7 L42 38.8 L47.5 38 Z"
        fill={fruitColor}
        stroke={OUTLINE}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <Path
        d="M50 35 L47 31 M50 35 L53 31"
        stroke="#4CAF50"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      <Path
        d="M40 47 L41.2 49.5 L44 49.9 L42 51.9 L42.5 54.7 L40 53.4 L37.5 54.7 L38 51.9 L36 49.9 L38.8 49.5 Z"
        fill={berryColor}
      />

      <Path
        d="M60 47 L61.2 49.5 L64 49.9 L62 51.9 L62.5 54.7 L60 53.4 L57.5 54.7 L58 51.9 L56 49.9 L58.8 49.5 Z"
        fill={berryColor}
      />
    </Svg>
  );
};
export const StarOrnament = ({
  colorHex = "#FF5C6C",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const mainColor = primary ?? colorHex;
  const decoration1 = secondary ?? "#FFD166";
  const decoration2 = accent ?? "#4D96FF";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Line
        x1="50"
        y1="8"
        x2="50"
        y2="17"
        stroke="#8D5A32"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <Polygon
        points="
          50,15
          61,36
          85,39
          67,54
          72,78
          50,66
          28,78
          33,54
          15,39
          39,36
        "
        fill={mainColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <Path
        d="M40 38 L41.8 41.5 L45.5 42 L42.8 44.7 L43.5 48.5 L40 46.7 L36.5 48.5 L37.2 44.7 L34.5 42 L38.2 41.5 Z"
        fill={decoration1}
      />

      <Path
        d="M61 43 L62.8 46.5 L66.5 47 L63.8 49.7 L64.5 53.5 L61 51.7 L57.5 53.5 L58.2 49.7 L55.5 47 L59.2 46.5 Z"
        fill={decoration2}
      />

      <Path
        d="M49 55 L50.8 58.5 L54.5 59 L51.8 61.7 L52.5 65.5 L49 63.7 L45.5 65.5 L46.2 61.7 L43.5 59 L47.2 58.5 Z"
        fill="#65B95B"
      />

      <Ellipse
        cx="39"
        cy="30"
        rx="6"
        ry="3"
        fill={WHITE}
        opacity={0.4}
        transform="rotate(-30 39 30)"
      />
    </Svg>
  );
};
export const StarSunglasses = ({
  colorHex = "#FF6B8A",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const lensColor = primary ?? colorHex;
  const frameColor = secondary ?? OUTLINE;
  const highlightColor = accent ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Polygon
        points="34,43 38,53 48,54 40,61 43,72 34,66 25,72 28,61 20,54 30,53"
        fill={frameColor}
        stroke={lensColor}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      <Polygon
        points="66,43 70,53 80,54 72,61 75,72 66,66 57,72 60,61 52,54 62,53"
        fill={frameColor}
        stroke={lensColor}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      <Path
        d="M47 55 Q50 58 53 55"
        stroke={lensColor}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      <Line
        x1="20"
        y1="54"
        x2="12"
        y2="50"
        stroke={lensColor}
        strokeWidth="3"
        strokeLinecap="round"
      />

      <Line
        x1="80"
        y1="54"
        x2="88"
        y2="50"
        stroke={lensColor}
        strokeWidth="3"
        strokeLinecap="round"
      />

      <Line
        x1="27"
        y1="59"
        x2="33"
        y2="62"
        stroke={highlightColor}
        strokeWidth="2"
        opacity={0.45}
      />

      <Line
        x1="69"
        y1="59"
        x2="75"
        y2="62"
        stroke={highlightColor}
        strokeWidth="2"
        opacity={0.45}
      />
    </Svg>
  );
};
export const StarNecklace = ({
  colorHex = "#FFD166",
  primary,
  secondary,
  accent,
  size = 80,
}: ItemSvgProps) => {
  const pendantColor = primary ?? colorHex;
  const chainColor = secondary ?? "#D9A441";
  const sparkleColor = accent ?? "#FFD166";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="
          M22 21
          C25 37 32 48 50 53
          C68 48 75 37 78 21
        "
        fill="none"
        stroke={sparkleColor}
        strokeWidth="3"
        strokeLinecap="round"
      />

      <Polygon
        points="
          50,55
          56,65
          68,67
          59,76
          61,88
          50,82
          39,88
          41,76
          32,67
          44,65
        "
        fill={pendantColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <Circle cx="50" cy="70" r="4" fill={WHITE} opacity={0.35} />

      <Path
        d="M28 48 L29.5 52 L33 53.5 L29.5 55 L28 59 L26.5 55 L23 53.5 L26.5 52 Z"
        fill={sparkleColor}
        stroke={OUTLINE}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <Path
        d="M73 48 L74.5 52 L78 53.5 L74.5 55 L73 59 L71.5 55 L68 53.5 L71.5 52 Z"
        fill={sparkleColor}
        stroke={OUTLINE}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
export const Medal = ({
  colorHex = "#FFD166",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const medalColor = primary ?? colorHex;
  const ribbonColor = secondary ?? "#EF476F";
  const highlightColor = accent ?? WHITE;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="M35 15 L50 42 L65 15"
        fill="none"
        stroke={medalColor}
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M35 15 L50 42 L65 15"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M50 35 L58 52 L78 54 L63 68 L67 87 L50 78 L33 87 L37 68 L22 54 L42 52 Z"
        fill={medalColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <Circle cx="50" cy="57" r="5" fill={highlightColor} opacity={0.35} />
    </Svg>
  );
};

export const BasicCircle = ({
  colorHex = DEFAULT_COLOR,
  size = 95,
}: ItemSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Circle
      cx="50"
      cy="50"
      r="32"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
  </Svg>
);
export const BasicSquare = ({
  colorHex = DEFAULT_COLOR,
  size = 95,
}: ItemSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Rect
      x="18"
      y="18"
      width="64"
      height="64"
      rx="5"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
  </Svg>
);
export const BasicTriangle = ({
  colorHex = DEFAULT_COLOR,
  size = 95,
}: ItemSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Polygon
      points="50,14 17,82 83,82"
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
  </Svg>
);
export const BasicHeart = ({
  colorHex = DEFAULT_COLOR,
  size = 95,
}: ItemSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Path
      d="
        M50 84
        C42 76 18 60 18 37
        C18 20 37 16 50 32
        C63 16 82 20 82 37
        C82 60 58 76 50 84
        Z
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
    />
  </Svg>
);
export const BasicStar = ({
  colorHex = DEFAULT_COLOR,
  size = 95,
}: ItemSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Polygon
      points="
        50,10
        61,34
        87,37
        67,54
        73,81
        50,67
        27,81
        33,54
        13,37
        39,34
      "
      fill={colorHex}
      stroke={OUTLINE}
      strokeWidth="4"
      strokeLinejoin="round"
    />
  </Svg>
);
// ============================================================
// BASIC SHAPE REGISTRY
// ============================================================

export const BASIC_SHAPE_SVGS = {
  basiccircle: BasicCircle,
  basicsquare: BasicSquare,
  basictriangle: BasicTriangle,
  basicheart: BasicHeart,
  basicstar: BasicStar,
} as const;

// ============================================================
// COLOR RESOLVER
// ============================================================

const resolveColor = (colorId?: ClassificationColorId) => {
  if (!colorId) {
    return undefined;
  }

  return COLOR_SORTING_COLORS[colorId];
};

// ============================================================
// RENDER BASIC SHAPE
// ============================================================

export const RenderBasicShapeSvg = ({
  shapeId,
  colorHex,
  size,
}: ItemSvgProps & { shapeId?: string }) => {
  const renderId = shapeId ? `basic${shapeId}` : undefined;

  const ShapeComponent = renderId
    ? BASIC_SHAPE_SVGS[renderId as keyof typeof BASIC_SHAPE_SVGS]
    : undefined;

  if (!ShapeComponent) {
    return null;
  }

  return <ShapeComponent colorHex={colorHex} size={size} />;
};

// 기존 프로젝트의 OUTLINE과 ItemSvgProps를 사용해 줘.

// ==================================================
// 공통 하트 경로
// ==================================================
const HEART_PATH =
  "M50 84 C43 77 13 57 13 35 C13 21 23 14 35 14 C43 14 48 19 50 26 C53 19 59 14 67 14 C79 14 87 23 87 35 C87 57 58 77 50 84 Z";

// ==================================================
// 1. 하트 초콜릿
// ==================================================
export const HeartChocolate = ({
  primary = "#795548",
  secondary = "#A1887F",
  accent = "#F5D6A7",
  size = 85,
}: ItemSvgProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d={HEART_PATH}
        fill={primary}
        stroke={OUTLINE}
        strokeWidth={4}
        strokeLinejoin="round"
      />

      {/* 초콜릿 표면 */}
      <Path
        d="M28 34 Q31 24 42 29"
        fill="none"
        stroke={secondary}
        strokeWidth={5}
        strokeLinecap="round"
      />

      {/* 초콜릿 장식 */}
      <Circle cx="38" cy="43" r="4" fill={accent} />
      <Circle cx="61" cy="36" r="3" fill={accent} />
      <Circle cx="66" cy="53" r="4" fill={secondary} />
      <Circle cx="47" cy="61" r="3" fill={accent} />
    </Svg>
  );
};

// ==================================================
// 2. 하트 비누
// ==================================================
export const HeartSoap = ({
  primary = "#F8BBD0",
  secondary = "#FCE4EC",
  accent = "#C2185B",
  size = 85,
}: ItemSvgProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 비누의 입체적인 옆면 */}
      <Path
        d="M15 37 Q15 25 29 20 Q50 7 71 20 Q85 25 85 37 L85 48 Q85 64 50 88 Q15 64 15 48 Z"
        fill={accent}
        stroke={OUTLINE}
        strokeWidth={4}
        strokeLinejoin="round"
      />

      {/* 비누의 앞면 */}
      <Path
        d={HEART_PATH}
        fill={primary}
        stroke={OUTLINE}
        strokeWidth={4}
        strokeLinejoin="round"
      />

      {/* 비누의 반짝임 */}
      <Path
        d="M30 35 Q32 29 40 30"
        fill="none"
        stroke={secondary}
        strokeWidth={5}
        strokeLinecap="round"
      />

      <Circle cx="68" cy="40" r="3" fill={secondary} />
    </Svg>
  );
};

// ==================================================
// 3. 하트 액자
// ==================================================
export const HeartFrame = ({
  primary = "#A1887F",
  secondary = "#FFF3E0",
  accent = "#6D4C41",
  size = 85,
}: ItemSvgProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 하트 프레임 외곽 */}
      <Path
        d={HEART_PATH}
        fill={primary}
        stroke={OUTLINE}
        strokeWidth={4}
        strokeLinejoin="round"
      />

      {/* 사진이 들어가는 안쪽 공간 */}
      <Path
        d="M50 73 C43 67 25 52 25 38 C25 29 31 24 39 24 C44 24 48 28 50 33 C53 28 57 24 63 24 C71 24 76 30 76 38 C76 52 58 67 50 73 Z"
        fill={secondary}
        stroke={accent}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />

      {/* 사진 속 작은 산과 해 */}
      <Circle cx="61" cy="36" r="5" fill={primary} />

      <Path
        d="M31 56 L43 43 L51 51 L58 45 L71 59 L71 64 L36 64 Z"
        fill={secondary}
        stroke={accent}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </Svg>
  );
};

// ==================================================
// 공통 별 경로
// ==================================================
const STAR_PATH =
  "M50 9 L61 36 L90 38 L68 57 L75 86 L50 70 L25 86 L32 57 L10 38 L39 36 Z";

// ==================================================
// 4. 별 스티커
// ==================================================
export const ShootingStar = ({
  primary = "#FFD54F",
  secondary = "#FFF9C4",
  accent = "#F9A825",
  size = 85,
}: ItemSvgProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 별똥별 꼬리 */}
      {/* 메인 꼬리 */}
      <Path
        d="M12 12 C18 18 28 25 40 30 C50 35 58 38 65 42"
        stroke={accent}
        strokeWidth={7}
        strokeLinecap="round"
        fill="none"
      />

      <Path
        d="M7 8 C15 15 25 22 37 28 C47 33 55 36 61 40"
        stroke={secondary}
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
      />

      <Path
        d="M12 26 C18 32 28 39 40 44 C50 49 58 52 65 56"
        stroke={accent}
        strokeWidth={7}
        strokeLinecap="round"
        fill="none"
      />

      <Path
        d="M7 22 C15 29 25 36 37 42 C47 51 55 50 61 54"
        stroke={secondary}
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
      />

      {/* 별 */}
      <G transform="translate(35, 22) scale(0.45)">
        <Path
          d={STAR_PATH}
          fill={primary}
          stroke={OUTLINE}
          strokeWidth={4}
          strokeLinejoin="round"
        />

        {/* 하이라이트 */}
        <Path d="M43 23 L48 38 L39 38 Z" fill={secondary} />
      </G>
    </Svg>
  );
};

export const HeartHairpin = ({
  primary = "#FFD54F",
  secondary = "#FFF9C4",
  accent = "#D7A62A",
  size = 85,
}: ItemSvgProps) => {
  const HEART_PATH = `
    M50 88
    C43 81 10 58 10 34
    C10 17 29 8 42 20
    L50 28
    L58 20
    C71 8 90 17 90 34
    C90 58 57 81 50 88
    Z
  `;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <G transform="rotate(70 50 50)">
        {/* 머리핀 집게 */}
        <Path
          d="M48 56 L34 87 Q32 92 37 94 L42 95 L57 63"
          fill={accent}
          stroke={OUTLINE}
          strokeWidth={3}
          strokeLinejoin="round"
        />

        <Path
          d="M54 59 L48 87 Q47 92 52 93 L57 93 L64 63"
          fill={secondary}
          stroke={OUTLINE}
          strokeWidth={3}
          strokeLinejoin="round"
        />

        {/* 하트 장식 */}
        <G transform="translate(18, 17) scale(0.62) rotate(-60 50 50)">
          <Path
            d={HEART_PATH}
            fill={primary}
            stroke={OUTLINE}
            strokeWidth={4}
            strokeLinejoin="round"
          />

          <Path d="M29 27 Q34 24 37 31 L41 39 L33 35 Z" fill={secondary} />

          <Path
            d="M61 43 L64 49 L70 52 L64 55 L61 61 L58 55 L52 52 L58 49 Z"
            fill={secondary}
          />
        </G>
      </G>
    </Svg>
  );
};

// ==================================================
// 6. 별 머리핀
// ==================================================
export const StarHairpin = ({
  primary = "#FFD54F",
  secondary = "#FFF9C4",
  accent = "#D7A62A",
  size = 85,
}: ItemSvgProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <G transform="rotate(70 50 50) ">
        {/* 머리핀 집게 */}
        <Path
          d="M48 56 L34 87 Q32 92 37 94 L42 95 L57 63"
          fill={accent}
          stroke={OUTLINE}
          strokeWidth={3}
          strokeLinejoin="round"
        />

        <Path
          d="M54 59 L48 87 Q47 92 52 93 L57 93 L64 63"
          fill={secondary}
          stroke={OUTLINE}
          strokeWidth={3}
          strokeLinejoin="round"
        />

        {/* 별 장식 */}
        <G transform="translate(18, 17) scale(0.68) rotate(10 50 50)">
          <Path
            d={STAR_PATH}
            fill={primary}
            stroke={OUTLINE}
            strokeWidth={4}
            strokeLinejoin="round"
          />

          <Path d="M42 25 L47 38 L39 38 Z" fill={secondary} />
        </G>
      </G>
    </Svg>
  );
};
// ==================================================
// 8. 삼각 치즈
// ==================================================
export const TriangleCheese = ({
  primary = "#FFD54F",
  secondary = "#FFF0A8",
  accent = "#E6A817",
  size = 85,
}: ItemSvgProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 치즈의 삼각형 외곽 */}
      <Path
        d="M50 10 L91 83 Q95 90 85 90 L15 90 Q5 90 9 83 Z"
        fill={primary}
        stroke={OUTLINE}
        strokeWidth={4}
        strokeLinejoin="round"
      />

      {/* 치즈의 밝은 면 */}
      <Path
        d="M50 20 L77 75 L23 75 Z"
        fill={secondary}
        stroke={accent}
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* 치즈 구멍 */}
      {/* 위쪽 */}
      <Polygon points="49,38 54,48 44,48" fill={accent} />

      {/* 왼쪽 아래 */}
      <Polygon points="34,60 42,58 38,67" fill={accent} />

      {/* 오른쪽 아래 */}
      <Polygon points="62,58 69,67 57,69" fill={accent} />
    </Svg>
  );
};

// ==================================================
// 9. 삼각 표지판
// ==================================================
export const TriangleSign = ({
  primary = "#FFD54F",
  secondary = "#FFFFFF",
  accent = "#D32F2F",
  size = 85,
}: ItemSvgProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 표지판 기둥 */}
      <Rect
        x="44"
        y="70"
        width="12"
        height="24"
        rx="2"
        fill="#9E9E9E"
        stroke={OUTLINE}
        strokeWidth={3}
      />

      {/* 삼각 표지판의 테두리 */}
      <Path
        d="M50 8 L91 77 Q94 83 86 83 L14 83 Q6 83 9 77 Z"
        fill={accent}
        stroke={OUTLINE}
        strokeWidth={4}
        strokeLinejoin="round"
      />

      {/* 표지판 안쪽 */}
      <Path
        d="M50 22 L78 72 L22 72 Z"
        fill={primary}
        stroke={secondary}
        strokeWidth={3}
        strokeLinejoin="round"
      />

      {/* 가운데 느낌표 */}
      <Path
        d="M47 38 Q47 35 50 35 Q53 35 53 38 L52 53 L48 53 Z"
        fill={secondary}
        stroke={OUTLINE}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />

      <Circle
        cx="50"
        cy="61"
        r="3"
        fill={secondary}
        stroke={OUTLINE}
        strokeWidth={1}
      />
    </Svg>
  );
};

// ==================================================
// 하트 열쇠고리
// ==================================================
// export const HeartKeychain = ({
//   primary = "#F48FB1",
//   secondary = "#FCE4EC",
//   accent = "#B0BEC5",
//   size = 85,
// }: ItemSvgProps) => {
//   return (
//     <Svg width={size} height={size} viewBox="0 0 100 100">
//       {/* 금속 고리 */}
//       <Circle
//         cx="50"
//         cy="13"
//         r="9"
//         fill="none"
//         stroke={accent}
//         strokeWidth={4}
//       />

//       {/* 연결 고리 */}
//       <Path
//         d="M50 22 L50 28"
//         stroke={accent}
//         strokeWidth={5}
//         strokeLinecap="round"
//       />

//       {/* 하트 장식 */}
//       <Path
//         d={HEART_PATH}
//         fill={primary}
//         stroke={OUTLINE}
//         strokeWidth={4}
//         strokeLinejoin="round"
//       />

//       {/* 하트 광택 */}
//       <Path
//         d="M32 35 Q34 28 41 30"
//         fill="none"
//         stroke={secondary}
//         strokeWidth={4}
//         strokeLinecap="round"
//       />
//     </Svg>
//   );
// };

export const HeartKeychain = ({
  colorHex = "#F48FB1",
  primary,
  secondary,
  accent,
  size = 85,
}: ItemSvgProps) => {
  const heartColor = primary ?? colorHex;
  const highlightColor = secondary ?? "#FCE4EC";
  const ringColor = accent ?? "#B0BEC5";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 금속 고리 */}
      <Circle
        cx="50"
        cy="15"
        r="3"
        fill="none"
        stroke={ringColor}
        strokeWidth={4}
      />

      {/* 연결 체인 마디 추가 */}
      <G>
        <Path
          d="M50 22 C52 26 48 30 50 34"
          fill="none"
          stroke={ringColor}
          strokeWidth={4.5}
          strokeLinecap="round"
        />
        <Path
          d="M50 34 C52 38 48 42 50 46"
          fill="none"
          stroke={ringColor}
          strokeWidth={4.5}
          strokeLinecap="round"
        />
      </G>

      {/* 연결 고리 */}
      <Path
        d="M50 46 L50 51"
        stroke={ringColor}
        strokeWidth={5}
        strokeLinecap="round"
      />

      {/* 하트 장식 (위치가 아래로 내려오고 얼굴이 포함된 버전) */}
      <G transform="translate(10.5, 32) scale(0.8)">
        <Path
          d={HEART_PATH}
          fill={heartColor}
          stroke={OUTLINE}
          strokeWidth={4}
          strokeLinejoin="round"
        />

        {/* 하트 광택 */}
        <Path
          d="M32 35 Q34 28 41 30"
          fill="none"
          stroke={highlightColor}
          strokeWidth={4}
          strokeLinecap="round"
        />

        {/* 귀여운 얼굴 (눈, 입, 볼터치) */}
        <Circle cx="44" cy="46" r="2" fill={OUTLINE} />
        <Circle cx="56" cy="46" r="2" fill={OUTLINE} />
        <Path
          d="M 47 51 Q 50 54 53 51"
          fill="none"
          stroke={OUTLINE}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <Circle cx="39" cy="49" r="3" fill="#E91E63" opacity={0.5} />
        <Circle cx="61" cy="49" r="3" fill="#E91E63" opacity={0.5} />
      </G>
    </Svg>
  );
};
// ==================================================
// 하트 모양 잎사귀
// ==================================================

export const HeartLeaf = ({
  primary = "#66BB6A",
  secondary = "#A5D6A7",
  accent = "#2E7D32",
  size = 85,
}: ItemSvgProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 잎자루: 하트 위쪽의 움푹 들어간 부분에서 위로 */}
      <Path
        d="M50 29 Q48 19 43 11"
        fill="none"
        stroke={accent}
        strokeWidth={4}
        strokeLinecap="round"
      />

      {/* 하트 모양 잎사귀 */}
      <Path
        d="M50 76
          C43 67 20 51 20 35
          C20 23 29 17 39 20
          C45 21 49 25 50 30
          C54 22 62 18 70 21
          C83 25 85 39 78 51
          C72 62 58 71 50 76 Z"
        fill={primary}
        stroke={OUTLINE}
        strokeWidth={3.5}
        strokeLinejoin="round"
      />

      {/* 중앙 잎맥 */}
      <Path
        d="M50 32 Q51 51 50 71"
        fill="none"
        stroke={accent}
        strokeWidth={2.5}
        strokeLinecap="round"
      />

      {/* 위쪽을 향해 뻗는 잎맥 가지 */}
      <Path
        d="M50 43 Q41 35 33 32
           M51 40 Q59 32 68 31
           M50 53 Q41 46 29 44
           M50 51 Q61 43 74 41
           M50 63 Q41 57 37 54
           M50 62 Q59 55 65 51"
        fill="none"
        stroke={secondary}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </Svg>
  );
};
// 3. 밀짚모자 (StrawHat)
export const StrawHat = ({
  primary = "#E7C783",
  secondary = "#F8E7B5",
  accent = "#A67C3D",
  size = 85,
}: ItemSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    {/* 1. 넓은 모자 챙 (Brim) */}
    <Ellipse
      cx={50}
      cy={68}
      rx={44}
      ry={18}
      fill={secondary}
      stroke={OUTLINE}
      strokeWidth={4}
    />

    {/* 챙 안쪽 질감 표현을 위한 결 무늬 선들 */}
    <Path
      d="M18 68 Q50 84 82 68"
      fill="none"
      stroke={accent}
      strokeWidth={2}
      strokeLinecap="round"
      opacity={0.6}
    />
    <Path
      d="M26 73 Q50 89 74 73"
      fill="none"
      stroke={accent}
      strokeWidth={1.5}
      strokeLinecap="round"
      opacity={0.4}
    />

    {/* 2. 모자 크라운 (머리 윗부분 - y축 방향으로 아래로 내림) */}
    <Path
      d="M26 68 C24 45 34 30 50 30 C66 30 76 45 74 68 Z"
      fill={primary}
      stroke={OUTLINE}
      strokeWidth={4}
      strokeLinejoin="round"
    />

    {/* 크라운 윗면의 둥근 입체감 라인 */}
    <Path
      d="M34 37 Q50 32 66 37"
      stroke={accent}
      strokeWidth={2}
      fill="none"
      strokeLinecap="round"
    />

    {/* 크라운 중간 짜임새 결 무늬 */}
    <Path
      d="M28 50 Q50 55 72 50"
      stroke={accent}
      strokeWidth={1.5}
      fill="none"
      opacity={0.6}
    />
    <Path
      d="M26 59 Q50 64 74 59"
      stroke={accent}
      strokeWidth={1.5}
      fill="none"
      opacity={0.6}
    />

    {/* 3. 모자 리본 밴드 (포인트 컬러) */}
    <Path
      d="M27 62 Q50 69 73 62 L75 72 Q50 79 25 72 Z"
      fill={accent}
      stroke={OUTLINE}
      strokeWidth={2.5}
      strokeLinejoin="round"
    />
  </Svg>
);
export const BaseballCap = ({
  primary = "#4F78B8",
  secondary = "#85A6D8",
  accent = "#29466F",
  size = 85,
}: ItemSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    {/* 왼쪽으로 길게 뻗은 챙 */}
    <Path
      d="
        M34 52
        C25 54 13 58 5 62
        C2 64 4 71 9 75
        C17 82 31 81 43 77
        C52 74 60 69 66 64
        L61 53
        Z
      "
      fill={secondary}
      stroke={OUTLINE}
      strokeWidth={1.5}
      strokeLinejoin="round"
    />

    {/* 모자 몸통의 왼쪽 패널 */}
    <Path
      d="
        M25 56
        C30 43 36 27 47 20
        C55 15 65 14 75 17
        C62 21 54 31 50 43
        L43 62
        C42 65 40 66 37 65
        Z
      "
      fill={primary}
      stroke={OUTLINE}
      strokeWidth={1.5}
      strokeLinejoin="round"
    />

    {/* 모자 몸통의 중앙 패널 */}
    <Path
      d="
        M50 43
        C54 31 62 21 75 17
        C85 23 87 39 85 55
        L83 72
        C73 72 59 69 43 64
        Z
      "
      fill={primary}
      stroke={OUTLINE}
      strokeWidth={1.5}
      strokeLinejoin="round"
    />

    {/* 오른쪽 패널 */}
    <Path
      d="
        M75 17
        C88 22 96 38 97 53
        C98 64 96 72 91 73
        C89 74 86 73 83 72
        L85 55
        C87 39 85 23 75 17
        Z
      "
      fill={primary}
      stroke={OUTLINE}
      strokeWidth={1.5}
      strokeLinejoin="round"
    />

    {/* 패널을 나누는 곡선 */}
    <Path
      d="M75 17 C64 25 58 40 53 55 L49 66"
      fill="none"
      stroke={OUTLINE}
      strokeWidth={1.1}
      strokeLinecap="round"
    />

    <Path
      d="M75 17 C87 30 87 45 85 55 L83 72"
      fill="none"
      stroke={OUTLINE}
      strokeWidth={1.1}
      strokeLinecap="round"
    />

    {/* 챙과 몸통의 연결선 */}
    <Path
      d="M25 56 C34 60 40 64 49 66"
      fill="none"
      stroke={OUTLINE}
      strokeWidth={1.2}
      strokeLinecap="round"
    />

    {/* 꼭대기의 작은 단추 */}
    <Path
      d="
        M72 17
        C72 14 74 13 76 14
        C78 14 79 16 78 18
        Z
      "
      fill={secondary}
      stroke={OUTLINE}
      strokeWidth={1.2}
      strokeLinejoin="round"
    />
  </Svg>
);
export const HeartOwl = ({
  colorHex = "#B99A7A",
  primary,
  secondary,
  accent,
  size = 85,
}: ItemSvgProps) => {
  const featherColor = primary ?? colorHex;
  const faceColor = secondary ?? "#FFF2D9";
  const detailColor = accent ?? "#49372D";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 몸통 */}
      <Path
        d="
          M20 48
          C20 33 31 23 50 23
          C69 23 80 33 80 48
          L85 79
          C85 88 74 92 50 92
          C26 92 15 88 15 79
          Z
        "
        fill={featherColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* 배의 깃털 */}
      <Path
        d="
          M31 57
          C35 48 43 45 50 45
          C57 45 65 48 69 57
          L72 80
          C65 85 58 87 50 87
          C42 87 35 85 28 80
          Z
        "
        fill={faceColor}
        stroke={OUTLINE}
        strokeWidth="2"
      />

      {/* 하트 모양 얼굴 */}
      <Path
        d="
          M50 70
          C44 64 25 49 25 37
          C25 26 38 20 46 29
          L50 34
          L54 29
          C62 20 75 26 75 37
          C75 49 56 64 50 70
          Z
        "
        fill={faceColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 왼쪽 눈 테두리 */}
      <Circle
        cx="39"
        cy="43"
        r="10"
        fill="#FFFFFF"
        stroke={detailColor}
        strokeWidth="2.5"
      />

      {/* 오른쪽 눈 테두리 */}
      <Circle
        cx="61"
        cy="43"
        r="10"
        fill="#FFFFFF"
        stroke={detailColor}
        strokeWidth="2.5"
      />

      {/* 눈동자 */}
      <Circle cx="40" cy="44" r="5.5" fill={detailColor} />

      <Circle cx="60" cy="44" r="5.5" fill={detailColor} />

      {/* 눈 반짝임 */}
      <Circle cx="42" cy="41" r="2" fill="#FFFFFF" />

      <Circle cx="62" cy="41" r="2" fill="#FFFFFF" />

      {/* 부리 */}
      <Path
        d="M45 52 L55 52 L50 61 Z"
        fill="#F4B942"
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* 날개 */}
      <Path
        d="M21 59 Q12 66 20 78 Q27 77 31 68"
        fill={featherColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      <Path
        d="M79 59 Q88 66 80 78 Q73 77 69 68"
        fill={featherColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* 발 */}
      <Path
        d="M38 89 L35 95 M38 89 L42 95 M62 89 L58 95 M62 89 L66 95"
        fill="none"
        stroke="#F4B942"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </Svg>
  );
};
export const StarFlower = ({
  colorHex = "#F49AB5",
  primary,
  secondary,
  accent,
  size = 85,
}: ItemSvgProps) => {
  const petalColor = primary ?? colorHex;
  const innerColor = secondary ?? "#FFF0F5";
  const centerColor = accent ?? "#AD365D";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 🌿 하단 줄기 및 잎사귀 (별꽃 아래 연결) */}
      <Path
        d="M50 65 Q48 80 45 92"
        stroke="#55B879"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      {/* 왼쪽 작은 잎 */}
      <Path
        d="M48 75 Q38 72 40 82 Q46 82 48 75 Z"
        fill="#55B879"
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* ⭐ 바깥쪽에 딱 하나 더 얹어주는 진하고 선명한 별 레이어 */}
      <Polygon
        points="
          50,9 61,35 87,35 68,53 73,79 
          50,66 27,79 32,53 13,35 39,31
        "
        fill={petalColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* 🌸 기존 안쪽 별 (방사형 음영) */}
      <Path
        d="
          M50 25
          L56 38
          L70 41
          L59 51
          L63 65
          L50 57
          L37 65
          L41 51
          L30 41
          L44 38
          Z
        "
        fill={innerColor}
        opacity={0.6}
      />
    </Svg>
  );
};
// 3. 털모자 / 방울비니 (WinterHat)
export const WinterHat = ({
  primary = "#B99A7A", // 모자 몸통 색상
  secondary = "#E8D5BC", // 털방울 & 접힌 밑단 색상
  accent = "#795548", // 골지 줄무늬 색상
  size = 85,
}: ItemSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    {/* 1. 모자 윗부분 (부드러운 돔 형태) */}
    <Path
      d="M23 70 C20 38 35 24 50 24 C65 24 80 38 77 70 Z"
      fill={primary}
      stroke={OUTLINE}
      strokeWidth={4}
      strokeLinejoin="round"
    />

    {/* 2. 더 작고 동글동글해진 상단 털방울 (위치 위로 밀착 & 크기 축소) */}
    <Path
      d="M50 10 
         C47 10, 44 13, 44 16 
         C41 16, 40 20, 42 23 
         C40 25, 42 29, 46 29 
         C48 31, 52 31, 54 29 
         C58 29, 60 25, 58 23 
         C60 20, 59 16, 56 16 
         C56 13, 53 10, 50 10 Z"
      fill={secondary}
      stroke={OUTLINE}
      strokeWidth={3}
      strokeLinejoin="round"
    />

    {/* 3. 접혀 올라간 아랫단 (Ribbed Cuff) */}
    <Rect
      x={18}
      y={64}
      width={64}
      height={22}
      rx={5}
      ry={5}
      fill={secondary}
      stroke={OUTLINE}
      strokeWidth={4}
    />

    {/* 4. 접힌 아랫단 세로 골지 줄무늬 */}
    <Path
      d="M26 68 L26 82 
         M34 68 L34 82 
         M42 68 L42 82 
         M50 68 L50 82 
         M58 68 L58 82 
         M66 68 L66 82 
         M74 68 L74 82"
      stroke={accent}
      strokeWidth={2}
      strokeLinecap="round"
      opacity={0.6}
    />
  </Svg>
);

export const Beret = ({
  primary = "#9C5DCB",
  secondary = "#B98AE0",
  accent = "#70429E",
  size = 85,
}: ItemSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    {/* 베레모 본체: 넓고 납작한 둥근 실루엣 */}
    <Path
      d="
        M 9 69
        C 10 49, 23 29, 42 23
        C 56 18, 72 24, 84 35
        C 92 43, 96 55, 94 66
        C 93 73, 87 77, 80 75
        C 61 70, 39 70, 20 76
        C 14 78, 10 75, 9 69
        Z
      "
      fill={primary}
      stroke={OUTLINE}
      strokeWidth={2.5}
      strokeLinejoin="round"
    />

    {/* 베레모 윗부분의 부드러운 색상 영역 */}
    <Path
      d="
        M 14 62
        C 17 43, 30 29, 44 25
        C 58 21, 72 27, 83 37
        C 69 32, 52 31, 38 37
        C 27 42, 19 52, 14 62
        Z
      "
      fill={secondary}
      opacity={0.7}
    />

    {/* 아래쪽 테두리: 본체와 자연스럽게 이어지는 밴드 */}
    <Path
      d="
        M 10 67
        C 15 59, 31 56, 49 57
        C 66 58, 82 63, 89 68
        C 92 70, 91 75, 87 77
        C 83 79, 78 76, 73 75
        C 55 71, 36 71, 21 77
        C 15 79, 10 75, 10 67
        Z
      "
      fill={accent}
      stroke={OUTLINE}
      strokeWidth={2}
      strokeLinejoin="round"
    />

    {/* 밴드 안쪽의 밝은 곡선 */}
    <Path
      d="
        M 15 68
        C 31 61, 58 62, 83 71
      "
      fill="none"
      stroke={secondary}
      strokeWidth={2.5}
      strokeLinecap="round"
    />

    {/* 오른쪽 위의 작은 꼭지 */}
    <Path
      d="
        M 72 25
        C 71 21, 74 18, 78 19
        C 82 19, 84 22, 83 26
        C 82 29, 77 30, 74 28
        Z
      "
      fill={accent}
      stroke={OUTLINE}
      strokeWidth={1.8}
      strokeLinejoin="round"
    />
  </Svg>
);

export const BucketHat = ({
  primary = "#D4B58A", // 모자 크라운(몸통) 색상
  secondary = "#F0DEC1", // 모자 챙(Brim) 색상
  accent = "#8B6A43", // 봉제선/스티치 디테일 색상
  size = 85,
}: ItemSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    {/* 1. 모자 크라운 (몸통 - 위는 완만한 평평 타원, 아래로 내려갈수록 약간 넓어지는 형태) */}
    <Path
      d="M32 24 
         C38 20, 62 20, 68 24 
         L76 52 
         C60 58, 40 58, 24 52 Z"
      fill={primary}
      stroke={OUTLINE}
      strokeWidth={4}
      strokeLinejoin="round"
    />

    {/* 2. 모자 윗면 테두리 곡선 (입체감을 부여하는 윗면 타원 라인) */}
    <Path
      d="M32 24 C40 28, 60 28, 68 24"
      fill="none"
      stroke={OUTLINE}
      strokeWidth={3.5}
      strokeLinecap="round"
    />

    {/* 3. 모자 챙 (Brim - 크라운 아래로 자연스럽게 퍼져 내려오는 형태) */}
    <Path
      d="M24 52 
         C40 58, 60 58, 76 52 
         L88 70 
         C62 80, 38 80, 12 70 Z"
      fill={secondary}
      stroke={OUTLINE}
      strokeWidth={4}
      strokeLinejoin="round"
    />

    {/* 4. 챙 중앙의 디테일 스티치 선 (버킷햇 특유의 누빔 라인 표현) */}
    <Path
      d="M18 61 C38 70, 62 70, 82 61"
      fill="none"
      stroke={accent}
      strokeWidth={2}
      strokeLinecap="round"
      opacity={0.6}
    />
  </Svg>
);

// 1. 티셔츠
export const TShirt = ({
  primary = "#70A8D9",
  secondary = "#D5E9FA",
  accent = "#315F91",
  size = 85,
}: ItemSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Path
      d="M35 20 L23 25 L10 37 L23 49 L31 41 L31 82 Q50 88 69 82 L69 41 L77 49 L90 37 L77 25 L65 20 Q50 29 35 20 Z"
      fill={primary}
      stroke={OUTLINE}
      strokeWidth={2.5}
      strokeLinejoin="round"
    />
    <Path
      d="M35 20 Q50 34 65 20"
      fill="none"
      stroke={accent}
      strokeWidth={2.5}
    />
    <Path
      d="M32 77 Q50 82 68 77"
      fill="none"
      stroke={secondary}
      strokeWidth={2}
    />
  </Svg>
);

// 2. 반팔 셔츠
export const ShortSleeveShirt = ({
  primary = "#FAF8F2",
  secondary = "#70A8D9",
  accent = "#315F91",
  size = 85,
}: ItemSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Path
      d="M35 19 L22 25 L9 40 L23 49 L31 40 L31 83 L69 83 L69 40 L77 49 L91 40 L78 25 L65 19 Q50 25 35 19 Z"
      fill={primary}
      stroke={OUTLINE}
      strokeWidth={2.5}
      strokeLinejoin="round"
    />
    <Circle cx="50" cy="30" r="2.5" fill={accent} />
    <Circle cx="50" cy="40" r="2.5" fill={accent} />
    <Circle cx="50" cy="50" r="2.5" fill={accent} />
    <Circle cx="50" cy="60" r="2.5" fill={accent} />
    <Circle cx="50" cy="70" r="2.5" fill={accent} />
  </Svg>
);

// 3. 나시
// 나시 / 민소매 (TankTop)
export const TankTop = ({
  primary = "#F0A4BB", // 옷 바탕 색상
  secondary = "#FCE2EA", // 뒷목 안쪽/포인트 색상
  accent = "#A94D6B", // 목선/암홀 시보리 디테일 색상
  size = 85,
}: ItemSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    {/* 1. 뒷목 안쪽 선 (목 파임 부분의 입체감 표현) */}
    <Path
      d="M36 20 C36 28, 64 28, 64 20"
      fill={secondary}
      stroke={OUTLINE}
      strokeWidth={3}
      strokeLinecap="round"
    />

    {/* 2. 나시 전체 외곽선 (어깨 끈 -> 파인 암홀 -> 몸통 일자 라인) */}
    <Path
      d="M28 18 
         C38 16, 62 16, 72 18 
         L78 28 
         C68 30, 66 45, 78 48 
         L78 86 
         L22 86 
         L22 48 
         C34 45, 32 30, 22 28 Z"
      fill={primary}
      stroke={OUTLINE}
      strokeWidth={4}
      strokeLinejoin="round"
    />

    {/* 3. 앞목 U자형 라인 (이미지 속 U자 넥라인) */}
    <Path
      d="M36 17 C36 32, 64 32, 64 17"
      fill="none"
      stroke={OUTLINE}
      strokeWidth={4}
      strokeLinecap="round"
    />
  </Svg>
);

// 4. 런닝
export const ShortSleeve = ({
  primary = "#FAF8F2",
  secondary = "#FFFFFF",
  accent = "#A7A19A",
  size = 85,
}: ItemSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Path
      d="M35 17 L43 17 L46 31 L54 31 L57 17 L65 17
         L70 29 L76 43 L66 48 L64 40 L64 83
         Q50 87 36 83 L36 40 L34 48 L24 43
         L30 29 Z"
      fill={primary}
      stroke={OUTLINE}
      strokeWidth={2.5}
      strokeLinejoin="round"
    />
    <Path
      d="M35 17 L39 34 L46 31 L50 37 L54 31 L61 34 L65 17"
      fill={secondary}
      stroke={OUTLINE}
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <Path
      d="M37 76 Q50 80 63 76"
      fill="none"
      stroke={accent}
      strokeWidth={1.5}
    />
  </Svg>
);

// 6. 반바지
export const Shorts = ({
  primary = "#75A981",
  secondary = "#CDE5D0",
  accent = "#3B6B46",
  size = 85,
}: ItemSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Path
      d="M24 20 L76 20 L82 76
         L58 80 L50 57 L42 80 L18 76 Z"
      fill={primary}
      stroke={OUTLINE}
      strokeWidth={2.5}
      strokeLinejoin="round"
    />
    <Path
      d="M24 20 L76 20 L77 32 L23 32 Z"
      fill={secondary}
      stroke={OUTLINE}
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <Path d="M50 32 L50 57" fill="none" stroke={accent} strokeWidth={2} />
    <Path
      d="M22 69 L42 72 M58 72 L78 69"
      fill="none"
      stroke={secondary}
      strokeWidth={2}
    />
    <Circle cx="50" cy="26" r="2" fill={accent} />
  </Svg>
);

// 7. 긴바지
export const LongPants = ({
  primary = "#70A8D9",
  secondary = "#D5E9FA",
  accent = "#315F91",
  size = 85,
}: ItemSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Path
      d="M25 16 L75 16 L79 86 L55 86 L50 49
         L45 86 L21 86 Z"
      fill={primary}
      stroke={OUTLINE}
      strokeWidth={2.5}
      strokeLinejoin="round"
    />
    <Path
      d="M25 16 L75 16 L76 28 L24 28 Z"
      fill={secondary}
      stroke={OUTLINE}
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <Path d="M50 28 L50 49" fill="none" stroke={accent} strokeWidth={2} />
    <Path
      d="M24 78 L43 78 M57 78 L77 78"
      fill="none"
      stroke={secondary}
      strokeWidth={2}
    />
    <Circle cx="50" cy="22" r="2" fill={accent} />
  </Svg>
);

// 8. 치마
export const Skirt = ({
  primary = "#F0A4BB",
  secondary = "#FCE2EA",
  accent = "#A94D6B",
  size = 85,
}: ItemSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Path
      d="M33 19 L67 19 L83 82
         Q50 91 17 82 Z"
      fill={primary}
      stroke={OUTLINE}
      strokeWidth={2.5}
      strokeLinejoin="round"
    />
    <Path
      d="M33 19 L67 19 L69 31 L31 31 Z"
      fill={secondary}
      stroke={OUTLINE}
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <Path
      d="M31 42 L25 76 M43 44 L40 81 M57 44 L60 81 M69 42 L75 76"
      fill="none"
      stroke={accent}
      strokeWidth={1.5}
      strokeLinecap="round"
      opacity={0.75}
    />
    <Path
      d="M19 78 Q50 86 81 78"
      fill="none"
      stroke={secondary}
      strokeWidth={2.5}
    />
  </Svg>
);

// 9. 원피스
export const Dress = ({
  primary = "#F0A4BB",
  secondary = "#FCE2EA",
  accent = "#A94D6B",
  size = 85,
}: ItemSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Path
      d="M36 17 L44 17 L50 25 L56 17 L64 17
         L72 35 L64 41 L60 33 L63 49
         L83 84 Q50 92 17 84 L37 49
         L40 33 L36 41 L28 35 Z"
      fill={primary}
      stroke={OUTLINE}
      strokeWidth={2.5}
      strokeLinejoin="round"
    />
    <Path
      d="M36 17 L44 17 L50 25 L56 17 L64 17
         L60 33 L50 39 L40 33 Z"
      fill={secondary}
      stroke={OUTLINE}
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <Path
      d="M37 49 Q50 54 63 49"
      fill="none"
      stroke={accent}
      strokeWidth={2.5}
    />
    <Path
      d="M25 77 Q50 84 75 77"
      fill="none"
      stroke={secondary}
      strokeWidth={2}
    />
    <Circle cx="50" cy="45" r="3" fill={accent} />
  </Svg>
);

// 10. 한복
export const Hanbok = ({
  primary = "#F0A4BB",
  secondary = "#FAF8F2",
  accent = "#C34F79",
  size = 85,
}: ItemSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    {/* 치마 */}
    <Path
      d="M36 45 L64 45 L81 84 Q50 92 19 84 L36 45 Z"
      fill={primary}
      stroke={OUTLINE}
      strokeWidth={2.5}
      strokeLinejoin="round"
    />
    <Path
      d="M36 45 L64 45 L68 56 L32 56 Z"
      fill={secondary}
      stroke={OUTLINE}
      strokeWidth={2}
      strokeLinejoin="round"
    />
    {/* 저고리 */}
    <Path
      d="M35 16 L44 16 L50 25 L56 16 L65 16
         L76 30 L67 39 L62 33 L62 51
         L38 51 L38 33 L33 39 L24 30 Z"
      fill={secondary}
      stroke={OUTLINE}
      strokeWidth={2.5}
      strokeLinejoin="round"
    />
    {/* 고름과 깃 */}
    <Path
      d="M44 16 L50 29 L56 16 L52 36 L48 36 Z"
      fill={primary}
      stroke={OUTLINE}
      strokeWidth={1.8}
      strokeLinejoin="round"
    />
    <Path
      d="M43 37 L57 37 L54 44 L46 44 Z"
      fill={accent}
      stroke={OUTLINE}
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
    <Path
      d="M50 44 L50 57 L44 62 L48 65"
      fill="none"
      stroke={accent}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M24 80 Q50 87 76 80"
      fill="none"
      stroke={secondary}
      strokeWidth={2}
    />
  </Svg>
);

// 11. 점퍼
export const Jumper = ({
  primary = "#75A981",
  secondary = "#CDE5D0",
  accent = "#3B6B46",
  size = 85,
}: ItemSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Path
      d="M35 17 L44 17 L50 25 L56 17 L65 17
         L78 29 L88 48 L76 54 L69 41
         L69 83 L31 83 L31 41 L24 54
         L12 48 L22 29 Z"
      fill={primary}
      stroke={OUTLINE}
      strokeWidth={2.5}
      strokeLinejoin="round"
    />
    <Path
      d="M35 17 L44 17 L50 25 L56 17 L65 17
         L60 34 L50 42 L40 34 Z"
      fill={secondary}
      stroke={OUTLINE}
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <Path d="M50 42 L50 80" fill="none" stroke={accent} strokeWidth={2.5} />
    <Rect x="45" y="53" width="10" height="3" rx="1.5" fill={secondary} />
    <Rect x="45" y="65" width="10" height="3" rx="1.5" fill={secondary} />
    <Path
      d="M32 77 L42 77 M58 77 L68 77"
      fill="none"
      stroke={secondary}
      strokeWidth={2}
    />
  </Svg>
);

// 12. 코트
export const Coat = ({
  primary = "#956C4F",
  secondary = "#DCC1A6",
  accent = "#563A2B",
  size = 85,
}: ItemSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Path
      d="M35 14 L44 14 L50 24 L56 14 L65 14
         L77 27 L83 45 L72 50 L68 39
         L72 87 L28 87 L32 39 L28 50
         L17 45 L23 27 Z"
      fill={primary}
      stroke={OUTLINE}
      strokeWidth={2.5}
      strokeLinejoin="round"
    />
    {/* 옷깃 */}
    <Path
      d="M35 14 L44 14 L50 24 L43 43 L32 28 Z"
      fill={secondary}
      stroke={OUTLINE}
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <Path
      d="M65 14 L56 14 L50 24 L57 43 L68 28 Z"
      fill={secondary}
      stroke={OUTLINE}
      strokeWidth={2}
      strokeLinejoin="round"
    />
    {/* 앞섶 */}
    <Path
      d="M43 43 L50 24 L57 43 L54 85 L46 85 Z"
      fill={secondary}
      stroke={OUTLINE}
      strokeWidth={1.8}
      strokeLinejoin="round"
    />
    {/* 단추 */}
    <Circle cx="54" cy="51" r="1.8" fill={accent} />
    <Circle cx="54" cy="62" r="1.8" fill={accent} />
    <Circle cx="54" cy="73" r="1.8" fill={accent} />
    {/* 주머니 */}
    <Path
      d="M31 60 L42 60 L41 70 L30 70 Z
         M58 60 L69 60 L70 70 L59 70 Z"
      fill={secondary}
      stroke={accent}
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
  </Svg>
);

// 1. 운동화
// export const Sneakers = ({
//   primary = "#70A8D9",
//   secondary = "#FFFFFF",
//   accent = "#315F91",
//   size = 85,
// }: ItemSvgProps) => (
//   <Svg width={size} height={size} viewBox="0 0 100 100">
//     {/* 운동화 몸통 */}
//     <Path
//       d="M13 58
//          Q22 55 30 42
//          L39 29
//          Q43 26 47 33
//          L57 47
//          Q66 54 78 56
//          Q88 58 91 68
//          L91 76
//          Q90 82 82 82
//          L18 82
//          Q8 80 9 70
//          Q9 63 13 58 Z"
//       fill={primary}
//       stroke={OUTLINE}
//       strokeWidth={2.5}
//       strokeLinejoin="round"
//     />

//     {/* 발목 부분 */}
//     <Path
//       d="M31 43 L39 29 Q43 26 47 33 L54 44
//          Q43 49 31 43 Z"
//       fill={secondary}
//       stroke={OUTLINE}
//       strokeWidth={2}
//       strokeLinejoin="round"
//     />

//     {/* 신발끈 구멍 */}
//     <Circle cx="43" cy="43" r="2" fill={accent} />
//     <Circle cx="48" cy="48" r="2" fill={accent} />
//     <Circle cx="53" cy="52" r="2" fill={accent} />

//     {/* 운동화 끈 */}
//     <Path
//       d="M40 40 L52 47 M45 45 L57 51 M49 49 L60 54"
//       fill="none"
//       stroke={secondary}
//       strokeWidth={3}
//       strokeLinecap="round"
//     />

//     {/* 밑창 */}
//     <Path
//       d="M10 70 Q38 76 63 73 Q82 72 91 68
//          L91 77 Q90 83 82 83 L18 83
//          Q9 82 10 75 Z"
//       fill={secondary}
//       stroke={OUTLINE}
//       strokeWidth={2}
//       strokeLinejoin="round"
//     />

//     {/* 밑창 무늬 */}
//     <Path
//       d="M25 78 L32 78 M40 79 L47 79 M55 78 L62 78 M70 77 L77 77"
//       stroke={accent}
//       strokeWidth={1.5}
//       strokeLinecap="round"
//     />
//   </Svg>
// );
// 12. 운동화 / 스니커즈 (Sneakers)
export const Sneakers = ({
  primary = "#70A8D9", // 신발 천 몸통 색상 (이미지에서는 레드 계열)
  secondary = "#FFFFFF", // 밑창, 앞코 캡 & 발목 패치 색상
  accent = "#315F91", // 신발끈 및 테두리 디테일 색상
  size = 85,
}: ItemSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    {/* 1. 솟아난 신발 혀 (Tongue - 앞쪽 높게 솟은 혀 부분) */}
    <Path
      d="M25 20 L33 10 L43 25 Z"
      fill={primary}
      stroke={OUTLINE}
      strokeWidth={3.5}
      strokeLinejoin="round"
    />

    {/* 2. 운동화 하이탑 몸통 (발목까지 길게 올라가는 수직 일자 뒤축) */}
    <Path
      d="M12 70 
         L12 22 
         C22 24, 28 22, 34 20 
         L78 54 
         C84 58, 88 64, 88 70 
         Z"
      fill={primary}
      stroke={OUTLINE}
      strokeWidth={3.5}
      strokeLinejoin="round"
    />

    {/* 3. 발목 동그란 둥근 로고 패치 */}
    <Circle
      cx="24"
      cy="38"
      r="8"
      fill={secondary}
      stroke={OUTLINE}
      strokeWidth={3}
    />

    {/* 4. 신발 하단 고무 환기구 구멍 2개 */}
    <Circle cx="32" cy="62" r="2" fill={OUTLINE} />
    <Circle cx="39" cy="62" r="2" fill={OUTLINE} />

    {/* 5. 운동화 끈 (등선을 따라 사선으로 가로지르는 끈) */}
    <Path
      d="M34 25 L42 21 
         M40 32 L48 28 
         M46 39 L54 35 
         M52 46 L60 42 
         M58 53 L66 49 
         M64 60 L72 56"
      stroke={OUTLINE}
      strokeWidth={3.5}
      strokeLinecap="round"
    />

    {/* 6. 앞코 고무 캡 (Toe Cap) */}
    <Path
      d="M74 52 
         C80 54, 88 60, 88 70 
         L72 70 
         Z"
      fill={secondary}
      stroke={OUTLINE}
      strokeWidth={3.5}
      strokeLinejoin="round"
    />

    {/* 7. 두툼한 밑창 (Sole) */}
    <Rect
      x="8"
      y="70"
      width="84"
      height="14"
      rx="2"
      fill={secondary}
      stroke={OUTLINE}
      strokeWidth={3.5}
      strokeLinejoin="round"
    />

    {/* 8. 밑창 고무 검은 라인 */}
    <Path
      d="M10 77 L90 77"
      stroke={OUTLINE}
      strokeWidth={2.5}
      strokeLinecap="round"
    />
  </Svg>
);

export const DressShoes = ({
  primary = "#956C4F", // 구두 본체 색상
  secondary = "#DCC1A6", // 내피/안감 색상
  accent = "#563A2B", // 보석 포인트 색상
  size = 85,
}: ItemSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    {/* 2. 날렵하고 긴 하이힐 굽 */}
    <Path
      d="M17 28
     L17 80
     C17 84 23 84 23 79
     L28 35 Z"
      fill={primary}
      stroke={OUTLINE}
      strokeWidth={2.5}
      strokeLinejoin="round"
    />

    {/* 1. 하이힐 본체 (우아하게 파인 발등과 높고 뾰족한 뒤축) */}
    <Path
      d="M14 26 
         C14 26 28 50 42 66 
         C52 78 68 88 88 84 
         C96 82 96 70 92 64 
         C86 55 78 60 76 60 
         C68 60 56 62 48 50 
         C38 35 24 10 14 26 Z"
      fill={primary}
      stroke={OUTLINE}
      strokeWidth={3}
      strokeLinejoin="round"
    />

    {/* 3. 구두 앞코의 보석 장식 (다이아몬드/리본 형태) */}
    <Path
      d="M74 54 
         L82 46 
         L90 52 
         L82 60 Z"
      fill={accent}
      stroke={OUTLINE}
      strokeWidth={2.5}
      strokeLinejoin="round"
    />

    {/* 4. 보석 반사 광택 라인 */}
    <Path
      d="M80 50 L84 56"
      stroke={secondary}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);

// 10. 슬리퍼 (Slippers)
export const Slippers = ({
  primary = "#75A981", // 밑창 색상
  secondary = "#CDE5D0", // 발등 덮개 밴드 색상
  accent = "#3B6B46", // 포인트 디테일 색상
  size = 85,
}: ItemSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    {/* ===== 1. 왼쪽 슬리퍼 (Left Slipper) ===== */}
    {/* 왼쪽 밑창 (상단 곡선 + 하단 U자형) */}
    <Path
      d="M14 26 
         C14 12, 42 12, 42 26 
         L40 70 
         C40 86, 16 86, 16 70 Z"
      fill={primary}
      stroke={OUTLINE}
      strokeWidth={3.5}
      strokeLinejoin="round"
    />

    {/* 왼쪽 발등 덮개 (직사각형 밴드) */}
    <Rect
      x="11"
      y="24"
      width="34"
      height="26"
      rx="1"
      fill={secondary}
      stroke={OUTLINE}
      strokeWidth={3.5}
      strokeLinejoin="round"
    />

    {/* ===== 2. 오른쪽 슬리퍼 (Right Slipper) ===== */}
    {/* 오른쪽 밑창 (상단 곡선 + 하단 U자형) */}
    <Path
      d="M58 26 
         C58 12, 86 12, 86 26 
         L84 70 
         C84 86, 60 86, 60 70 Z"
      fill={primary}
      stroke={OUTLINE}
      strokeWidth={3.5}
      strokeLinejoin="round"
    />

    {/* 오른쪽 발등 덮개 (직사각형 밴드) */}
    <Rect
      x="55"
      y="24"
      width="34"
      height="26"
      rx="1"
      fill={secondary}
      stroke={OUTLINE}
      strokeWidth={3.5}
      strokeLinejoin="round"
    />
  </Svg>
);

export const FlipFlops = ({
  primary = "#70A8D9", // 밑창 색상
  secondary = "#D5E9FA", // 끈 하이라이트/포인트 색상
  accent = "#315F91", // V자 끈 색상
  size = 85,
}: ItemSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    {/* ===== 1. 왼쪽 조리 (Left Flip-flop) ===== */}
    {/* 왼쪽 밑창 */}
    <Path
      d="M26 15
         C14 15, 12 30, 14 48
         C15 62, 12 75, 20 82
         C28 89, 38 85, 38 72
         C38 58, 42 35, 38 22
         C36 17, 31 15, 26 15 Z"
      fill={primary}
      stroke={OUTLINE}
      strokeWidth={3}
      strokeLinejoin="round"
    />

    {/* 왼쪽 V자 끈 */}
    <Path
      d="M13 42
         C18 32, 24 25, 27 25
         C30 25, 35 34, 38 48"
      fill="none"
      stroke={accent}
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M27 18 L27 27"
      fill="none"
      stroke={accent}
      strokeWidth={3}
      strokeLinecap="round"
    />

    {/* ===== 2. 오른쪽 조리 (Right Flip-flop) ===== */}
    {/* 오른쪽 밑창 */}
    <Path
      d="M71 7
         C59 7, 57 22, 59 40
         C60 54, 57 67, 65 74
         C73 81, 83 77, 83 64
         C83 50, 87 27, 83 14
         C81 9, 76 7, 71 7 Z"
      fill={primary}
      stroke={OUTLINE}
      strokeWidth={3}
      strokeLinejoin="round"
    />

    {/* 오른쪽 V자 끈 */}
    <Path
      d="M58 34
         C63 24, 69 17, 72 17
         C75 17, 80 26, 83 40"
      fill="none"
      stroke={accent}
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M72 10 L72 19"
      fill="none"
      stroke={accent}
      strokeWidth={3}
      strokeLinecap="round"
    />
  </Svg>
);

export const RainBoots = ({
  primary = "#F2D36B",
  secondary = "#FFF1B8",
  accent = "#A88327",
  size = 85,
}: ItemSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    {/* 장화 몸통 (뒤꿈치-발목 수직 일자 직선 라인) */}
    <Path
      d="M26 18
         L62 18
         L62 52
         C62 58 70 60 76 62
         L82 64
         C88 66 88 74 88 78
         L26 78
         Z"
      fill={primary}
      stroke={OUTLINE}
      strokeWidth={3}
      strokeLinejoin="round"
    />

    {/* 장화 입구 (테두리 띠) */}
    <Rect
      x="22"
      y="14"
      width="44"
      height="12"
      rx="2"
      fill={secondary}
      stroke={OUTLINE}
      strokeWidth={3}
      strokeLinejoin="round"
    />

    {/* 주름 디테일 선 */}
    <Path
      d="M58 56 L58 64 M64 58 L64 66"
      stroke={accent}
      strokeWidth={2.5}
      strokeLinecap="round"
    />

    {/* 일자 밑창 (Sole) */}
    <Rect
      x="20"
      y="78"
      width="70"
      height="8"
      rx="2"
      fill={accent}
      stroke={OUTLINE}
      strokeWidth={3}
      strokeLinejoin="round"
    />
  </Svg>
);
export const FurBoots = ({
  primary = "#956C4F",
  secondary = "#F5E7D2",
  accent = "#563A2B",
  size = 85,
}: ItemSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    {/* 장화 몸통 (뒤꿈치 수직 일자 라인) */}
    <Path
      d="M26 28
         L62 28
         L62 52
         C62 58 70 60 76 62
         L82 64
         C88 66 88 74 88 78
         L26 78
         Z"
      fill={primary}
      stroke={OUTLINE}
      strokeWidth={3}
      strokeLinejoin="round"
    />

    {/* 윗부분의 두툼한 털 테두리 */}
    <Path
      d="M22 18
         Q26 14 30 18
         Q35 14 40 18
         Q45 14 50 18
         Q55 14 60 18
         Q64 14 68 18
         L68 30
         L22 30 Z"
      fill={secondary}
      stroke={OUTLINE}
      strokeWidth={3}
      strokeLinejoin="round"
    />

    {/* 털의 세로 결 */}
    <Path
      d="M31 20 L31 28 M41 20 L41 28 M51 20 L51 28 M59 20 L59 28"
      stroke={accent}
      strokeWidth={2}
      strokeLinecap="round"
    />

    {/* 일자 밑창 (Sole) */}
    <Rect
      x="20"
      y="78"
      width="70"
      height="8"
      rx="2"
      fill={accent}
      stroke={OUTLINE}
      strokeWidth={3}
      strokeLinejoin="round"
    />
  </Svg>
);
export const Boots = ({
  primary = "#956C4F",
  secondary = "#DCC1A6",
  accent = "#563A2B",
  size = 85,
}: ItemSvgProps) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    {/* 긴 부츠 몸통 (뒤꿈치 수직 일자 라인) */}
    <Path
      d="M26 18
         L62 18
         L62 52
         C62 58 70 60 76 62
         L82 64
         C88 66 88 74 88 78
         L26 78
         Z"
      fill={primary}
      stroke={OUTLINE}
      strokeWidth={3}
      strokeLinejoin="round"
    />

    {/* 부츠 입구 띠 */}
    <Rect
      x="22"
      y="14"
      width="44"
      height="10"
      rx="2"
      fill={secondary}
      stroke={OUTLINE}
      strokeWidth={3}
      strokeLinejoin="round"
    />

    {/* 발목 부분 장식 띠와 버클 */}
    <Path
      d="M26 56 L62 56"
      stroke={secondary}
      strokeWidth={4}
      strokeLinecap="round"
    />
    <Rect
      x="40"
      y="52"
      width="10"
      height="8"
      rx="1.5"
      fill={accent}
      stroke={OUTLINE}
      strokeWidth={1.5}
    />

    {/* 일자 밑창 (Sole) */}
    <Rect
      x="20"
      y="78"
      width="70"
      height="8"
      rx="2"
      fill={accent}
      stroke={OUTLINE}
      strokeWidth={3}
      strokeLinejoin="round"
    />
  </Svg>
);
export const Ambulance = ({
  colorHex = "#FAFAFA", // 구급차 기본 화이트/라이트톤
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const stripeColor = secondary ?? "#FFCDD2"; // 붉은 십자가 및 포인트 톤
  const wheelColor = accent ?? "#212121";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 1. 지붕 위 경광등 및 불빛 효과 */}
      <Path
        d="M58 26 C58 20, 66 20, 66 26 Z"
        fill="#F44336"
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* 사이렌 불빛 파동 라인 */}
      <Path
        d="M54 15 L56 18 M62 13 L62 17 M70 15 L68 18"
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* 2. 구급차 몸통 (박스형 뒷공간 + 운전석 캐빈) */}
      <Path
        d="M12 66
     L12 34
     C12 30, 16 26, 22 26
     L62 26
     L84 46
     L88 48
     C92 50, 94 54, 94 58
     L94 62
     C94 65, 92 66, 89 66
     L12 66
     Z"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* 3. 뒷공간과 운전석을 나누는 세로 격벽 라인 */}
      <Path
        d="M50 26 L50 66"
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* 4. 측면 십자가 (Plus) 심볼 */}
      <Path
        d="M23 44 L35 44 M29 38 L29 50"
        stroke={stripeColor}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <Path
        d="M23 44 L35 44 M29 38 L29 50"
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* 5. 운전석 전면 창문 */}
      <Path
        d="M56 32 L72 32 L78 44 L56 44 Z"
        fill={stripeColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* 6. 하단 바퀴 2개 */}
      {/* 뒷바퀴 */}
      <Circle
        cx="28"
        cy="72"
        r="11"
        fill={wheelColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
      />
      <Circle
        cx="28"
        cy="72"
        r="4.5"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="1.5"
      />

      {/* 앞바퀴 */}
      <Circle
        cx="72"
        cy="72"
        r="11"
        fill={wheelColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
      />
      <Circle
        cx="72"
        cy="72"
        r="4.5"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="1.5"
      />
    </Svg>
  );
};
export const Drone = ({
  colorHex = "#B0BEC5", // 드론 기본 메탈릭/라이트 그레이 톤
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const rotorColor = secondary ?? "#37474F";
  const detailColor = accent ?? "#212121";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 4. 프로펠러 날개 (암의 방향과 90도 직각인 대각선 방향으로 교차 배치) */}
      {/* 좌상단 프로펠러 (중심 22, 22 기준 우상-좌하 방향) */}
      <Path
        d="M10 34 L34 10"
        stroke={rotorColor}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <Path
        d="M10 34 L34 10"
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* 우상단 프로펠러 (중심 78, 22 기준 좌상-우하 방향) */}
      <Path
        d="M66 10 L90 34"
        stroke={rotorColor}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <Path
        d="M66 10 L90 34"
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* 좌하단 프로펠러 (중심 22, 78 기준 좌상-우하 방향) */}
      <Path
        d="M10 66 L34 90"
        stroke={rotorColor}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <Path
        d="M10 66 L34 90"
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* 우하단 프로펠러 (중심 78, 78 기준 우상-좌하 방향) */}
      <Path
        d="M66 90 L90 66"
        stroke={rotorColor}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <Path
        d="M66 90 L90 66"
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* 1. 4개의 대각선 암 (Arms) */}
      {/* 좌상단 암 */}
      <Path
        d="M42 42 L24 24"
        stroke={bodyColor}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <Path
        d="M42 42 L24 24"
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* 우상단 암 */}
      <Path
        d="M58 42 L76 24"
        stroke={bodyColor}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <Path
        d="M58 42 L76 24"
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* 좌하단 암 */}
      <Path
        d="M42 58 L24 76"
        stroke={bodyColor}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <Path
        d="M42 58 L24 76"
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* 우하단 암 */}
      <Path
        d="M58 58 L76 76"
        stroke={bodyColor}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <Path
        d="M58 58 L76 76"
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* 2. 중앙 본체 (Center Body) */}
      <Circle
        cx="50"
        cy="50"
        r="14"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
      />
      <Circle
        cx="50"
        cy="50"
        r="6"
        fill={rotorColor}
        stroke={OUTLINE}
        strokeWidth="2"
      />

      {/* 3. 모터 하우징 (끝부분 원형) */}
      <Circle
        cx="22"
        cy="22"
        r="7"
        fill={detailColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />
      <Circle
        cx="78"
        cy="22"
        r="7"
        fill={detailColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />
      <Circle
        cx="22"
        cy="78"
        r="7"
        fill={detailColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />
      <Circle
        cx="78"
        cy="78"
        r="7"
        fill={detailColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />
    </Svg>
  );
};
export const Cruise = ({
  colorHex = "#29B6F6", // 유람선 바다/기본 포인트 톤
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const bodyColor = primary ?? "#ECEFF1"; // 선체 기본 색상
  const deckColor = secondary ?? "#E53935"; // 중간 붉은색 갑판/선실
  const waveColor = accent ?? "#29B6F6"; // 물결 색상

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 1. 하단 파도 (선체 하단과 겹치도록 위쪽으로 배치) */}
      {/* <Path
        d="M6 62 
           Q 22 52, 38 62 
           Q 54 72, 70 62 
           Q 84 52, 94 62 
           L 94 88 
           L 6 88 
           Z"
        fill={waveColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      /> */}

      {/* 파도 물결 추가 라인 */}
      <Path
        d="M8 72 
           Q 24 62, 40 72 
           Q 56 82, 72 72 
           Q 86 62, 92 72"
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* 2. 선체 메인 몸통 (Hull) */}
      <Path
        d="
          M8 56
          L16 46
          L80 46
          L90 46
          Q96 54 94 60
          Q92 68 82 68
          L20 68
          Q10 68 8 60
          Z
        "
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* 3. 선체 창문 디테일 (사각 창문 3개 + 원형/작은 창문 3개) */}
      <Rect
        x="22"
        y="50"
        width="10"
        height="7"
        rx="2"
        fill="#1565C0"
        stroke={OUTLINE}
        strokeWidth="2"
      />
      <Rect
        x="37"
        y="50"
        width="10"
        height="7"
        rx="2"
        fill="#1565C0"
        stroke={OUTLINE}
        strokeWidth="2"
      />
      <Rect
        x="52"
        y="50"
        width="10"
        height="7"
        rx="2"
        fill="#1565C0"
        stroke={OUTLINE}
        strokeWidth="2"
      />

      {/* 우측 작은 원형/세로 구멍 창문들 */}
      <Rect
        x="68"
        y="51"
        width="3"
        height="5"
        rx="1.5"
        fill="#E53935"
        stroke={OUTLINE}
        strokeWidth="1.5"
      />
      <Rect
        x="74"
        y="51"
        width="3"
        height="5"
        rx="1.5"
        fill="#E53935"
        stroke={OUTLINE}
        strokeWidth="1.5"
      />
      <Rect
        x="80"
        y="51"
        width="3"
        height="5"
        rx="1.5"
        fill="#E53935"
        stroke={OUTLINE}
        strokeWidth="1.5"
      />

      {/* 4. 중간 붉은색 선실 (Middle Deck) */}
      <Path
        d="M24 46
           L30 32
           L76 32
           L84 46
           Z"
        fill={deckColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* 중간 선실 세로 구분선 */}
      <Path
        d="M40 32 L 40 46 M 55 32 L 55 46 M 70 32 L 70 46"
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* 5. 최상단 조타실 (Top Cabin) */}
      <Path
        d="M34 32 
           L 37 20 
           L 69 20 
           L 72 32 
           Z"
        fill="#CFD8DC"
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* 최상단 조타실 유리창 세로 라인 */}
      <Path
        d="M45 20 L 45 32 M 53 20 L 53 32 M 61 20 L 61 32"
        stroke={OUTLINE}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
};
export const Butterfly = ({
  colorHex = "#FFEE58",
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const wingColor = primary ?? colorHex;
  const bodyColor = secondary ?? "#E0A458";
  const detailColor = accent ?? "#5D1A0A";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 좌상 날개 */}
      <Path
        d="
    M48 42
    C18 24 6 42 12 60
    C18 78 38 74 48 62
    Z
  "
        fill={wingColor}
        stroke={OUTLINE}
        strokeWidth={3.5}
      />

      {/* 좌하 날개 */}
      <Path
        d="
M50 58
    C26 66 20 84 30 94
    C42 101 52 92 54 76
    Z
  "
        fill={wingColor}
        stroke={OUTLINE}
        strokeWidth={3.5}
      />

      {/* 우상 날개 */}
      <Path
        d="
  M52 42
    C82 18 96 38 92 58
    C88 76 68 74 52 62
    Z
  "
        fill={wingColor}
        stroke={OUTLINE}
        strokeWidth={3.5}
      />

      {/* 우하 날개 */}
      <Path
        d="
  M54 58
    C80 66 88 84 80 94
    C70 101 60 92 56 76
    Z
  "
        fill={wingColor}
        stroke={OUTLINE}
        strokeWidth={3.5}
      />

      {/* 더듬이 */}
      <Path
        d="M47 34 Q39 22 30 18"
        stroke={OUTLINE}
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
      />

      <Path
        d="M47 34 Q54 20 62 15"
        stroke={OUTLINE}
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
      />

      {/* 몸통 */}
      <Path
        d="M47 34 L58 78"
        stroke={OUTLINE}
        strokeWidth={12}
        strokeLinecap="round"
      />

      <Path
        d="M47 34 L58 78"
        stroke={bodyColor}
        strokeWidth={7}
        strokeLinecap="round"
      />
    </Svg>
  );
};
export const Ladybug = ({
  colorHex = "#E53935", // 무당벌레 기본 빨간색 톤
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const headColor = secondary ?? "#37474F";
  const spotColor = accent ?? "#212121";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 1. 머리 */}
      <Circle
        cx="50"
        cy="28"
        r="13"
        fill={headColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />
      <Circle cx="45" cy="26" r="2" fill="#FFFFFF" />
      <Circle cx="55" cy="26" r="2" fill="#FFFFFF" />

      {/* 2. 더듬이 */}
      <Path
        d="M45 18 C42 12 38 10 35 10 M55 18 C58 12 62 10 65 10"
        stroke={OUTLINE}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* 3. 몸통 (등껍질) */}
      <Path
        d="M50 38 C72 38 84 52 84 66 C84 80 70 90 50 90 C30 90 16 80 16 66 C16 52 28 38 50 38Z"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 4. 등판 가운데선 */}
      <Path d="M50 38 L50 90" stroke={OUTLINE} strokeWidth="3" opacity={0.5} />

      {/* 5. 점 무늬 */}
      <Circle cx="34" cy="56" r="6" fill={spotColor} />
      <Circle cx="34" cy="76" r="6" fill={spotColor} />
      <Circle cx="66" cy="56" r="6" fill={spotColor} />
      <Circle cx="66" cy="76" r="6" fill={spotColor} />

      {/* 하이라이트 효과 */}
      <Ellipse cx="30" cy="50" rx="6" ry="4" fill="#FFFFFF" opacity={0.3} />
    </Svg>
  );
};
export const Bee = ({
  colorHex = "#FFEB3B", // 벌 기본 노란색 톤
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const wingColor = secondary ?? "#E0F7FA";
  const stripeColor = accent ?? "#212121";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 날개 (좌측) */}

      <Ellipse
        cx="15"
        cy="50"
        rx="15"
        ry="10"
        fill={wingColor}
        stroke={OUTLINE}
        strokeWidth="3"
        opacity={0.8}
        transform="rotate(-30 38 38)"
      />

      <Ellipse
        cx="85"
        cy="50"
        rx="15"
        ry="10"
        fill={wingColor}
        stroke={OUTLINE}
        strokeWidth="3"
        opacity={0.8}
        transform="rotate(30 61 38)"
      />

      {/* 몸 */}
      <Ellipse
        cx="50"
        cy="58"
        rx="21"
        ry="27"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 줄무늬 */}
      <Path d="M32 50 H68" stroke={stripeColor} strokeWidth="5" />
      <Path d="M30 61 H70" stroke={stripeColor} strokeWidth="5" />
      <Path d="M35 72 H65" stroke={stripeColor} strokeWidth="5" />

      {/* 얼굴 */}
      <Circle cx="42" cy="43" r="3" fill={OUTLINE} />
      <Circle cx="58" cy="43" r="3" fill={OUTLINE} />

      {/* 웃는 입 */}

      {/* 더듬이 */}
      <Path
        d="M43 34 Q39 24 33 23 M57 34 Q61 24 67 23"
        stroke={OUTLINE}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </Svg>
  );
};
export const Snail = ({
  colorHex = "#A1887F", // 달팽이 기본 갈색 톤
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const shellColor = secondary ?? "#D7CCC8";
  const detailColor = accent ?? "#4E342E";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 몸 */}
      <Path
        d="
          M20 68
          Q25 55 43 58
          H70
          Q84 58 86 72
          Q82 82 65 82
          H30
          Q18 80 20 68
          Z
        "
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 껍질 */}
      <Circle
        cx="42"
        cy="52"
        r="24"
        fill={shellColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 소용돌이 */}
      <Path
        d="
          M42 39
          Q54 39 54 51
          Q54 63 42 63
          Q32 63 32 53
          Q32 45 40 45
          Q46 45 46 51
          Q46 55 42 55
        "
        fill="none"
        stroke={detailColor}
        strokeWidth="4"
        opacity={0.7}
        strokeLinecap="round"
      />

      {/* 더듬이 */}
      <Path
        d="M70 59 L74 43 M77 60 L84 47"
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinecap="round"
      />

      <Circle cx="74" cy="42" r="3" fill={OUTLINE} />
      <Circle cx="84" cy="46" r="3" fill={OUTLINE} />
    </Svg>
  );
};
export const Fox = ({
  colorHex = "#FF7043", // 여우 기본 주황빛 톤
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const snoutColor = secondary ?? "#FFFFFF";
  const detailColor = accent ?? "#D84315";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 귀 */}
      <Path
        d="M26 40 L30 15 L45 34"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <Path
        d="M55 34 L70 15 L74 40"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 얼굴 */}
      <Path
        d="
        M24 43
        Q28 30 50 30
        Q72 30 76 43
        Q80 63 50 83
        Q20 63 24 43
        Z
      "
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 흰 주둥이 */}
      <Path
        d="M35 60 Q50 50 65 60 Q61 75 50 77 Q39 75 35 60 Z"
        fill={snoutColor}
      />

      {/* 눈 */}
      <Circle cx="40" cy="52" r="3.5" fill={OUTLINE} />
      <Circle cx="60" cy="52" r="3.5" fill={OUTLINE} />

      {/* 코 */}
      <Circle cx="50" cy="65" r="4" fill={OUTLINE} />
    </Svg>
  );
};
export const Koala = ({
  colorHex = "#B0BEC5", // 코알라 기본 회색 톤
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const earInnerColor = secondary ?? "#78909C";
  const noseColor = accent ?? "#37474F";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 귀 */}
      <Circle
        cx="24"
        cy="34"
        r="15"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />
      <Circle
        cx="76"
        cy="34"
        r="15"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />
      <Circle cx="24" cy="34" r="7" fill={earInnerColor} />
      <Circle cx="76" cy="34" r="7" fill={earInnerColor} />

      {/* 얼굴 */}
      <Circle
        cx="50"
        cy="55"
        r="30"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />
      <Circle cx="40" cy="52" r="4" fill={OUTLINE} />
      <Circle cx="60" cy="52" r="4" fill={OUTLINE} />
      <Circle cx="41.2" cy="51" r="1.2" fill="#FFFFFF" />
      <Circle cx="61.2" cy="51" r="1.2" fill="#FFFFFF" />

      {/* 코 (큰 타원) */}
      <Ellipse cx="50" cy="63" rx="8" ry="6" fill={noseColor} />
      <Circle cx="37" cy="60" r="4" fill={earInnerColor} opacity={0.5} />
      <Circle cx="63" cy="60" r="4" fill={earInnerColor} opacity={0.5} />
    </Svg>
  );
};
export const Fish = ({
  colorHex = "#FF7043", // 물고기 기본 주황빛 톤
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const tailColor = secondary ?? "#FFAB91";
  const detailColor = accent ?? "#D84315";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 꼬리 */}
      <Path
        d="
        M70 50
        L88 30
        L86 70
        Z
      "
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 몸통 */}
      <Path
        d="
        M15 50
        C22 30 45 23 68 35
        C82 42 82 58 68 65
        C45 77 22 70 15 50
        Z
      "
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 눈 */}
      <Circle cx="32" cy="45" r="6" fill={tailColor} />
      <Circle cx="33" cy="46" r="3" fill={OUTLINE} />

      {/* 비늘 */}
      <Path
        d="M48 43 Q54 50 48 57"
        stroke={detailColor}
        strokeWidth="3"
        fill="none"
        opacity={0.35}
      />
    </Svg>
  );
};
export const Cherry = ({
  colorHex = "#E53935", // 체리 기본 빨간색 톤
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const fruitColor = primary ?? colorHex;
  const stemColor = secondary ?? "#2E7D32";
  const leafColor = accent ?? "#43A047";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Circle
        cx="37"
        cy="62"
        r="17"
        fill={fruitColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      <Circle
        cx="63"
        cy="62"
        r="17"
        fill={fruitColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      <Path
        d="M37 47 C40 27 50 22 63 45"
        stroke={stemColor}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />

      <Path
        d="M47 29 C54 20 67 21 71 27 C61 32 53 32 47 29Z"
        fill={leafColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />
    </Svg>
  );
};
export const Blueberry = ({
  colorHex = "#3F51B5", // 블루베리 기본 진청색 톤
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const fruitColor = primary ?? colorHex;
  const crownColor = secondary ?? "#1A237E";
  const detailColor = accent ?? "#5C6BC0";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Ellipse
        cx="50"
        cy="56"
        rx="30"
        ry="24"
        fill={fruitColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />
      {/* 블루베리 특유의 별모양 꽃받침 자국 */}
      <Path
        d="M50 34 L52 38 L56 37 L53 41 L55 45 L50 42 L45 45 L47 41 L44 37 L48 38Z"
        fill={crownColor}
      />
      <Ellipse
        cx="39"
        cy="47"
        rx="6"
        ry="4.5"
        fill={detailColor}
        opacity={0.35}
      />
    </Svg>
  );
};
export const SweetPotato = ({
  colorHex = "#7B2452", // 고구마 기본 자주빛 톤
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const skinColor = primary ?? colorHex;
  const fleshColor = secondary ?? "#FFCA28";
  const detailColor = accent ?? "#4A148C";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 1. 뒷쪽 고구마 */}
      {/* 뒷쪽 고구마 */}
      <Path
        d="
      M28 50
      C18 45, 34 20, 65 22
      C86 24, 89 40, 75 54
      C64 63, 45 57, 28 50
      Z
    "
        fill={skinColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      <Path
        d="M60 30 L65 37 M71 35 L74 42"
        stroke={detailColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity={0.6}
      />

      {/* 앞쪽 고구마 */}
      <Path
        d="
      M30 50
      C24 50, 18 60, 28 76
      C40 90, 72 88, 90 67
      C96 60, 84 48, 55 48
      C44 48, 34 50, 30 50
      Z
    "
        fill={skinColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <Path
        d="M45 28 L52 36"
        stroke={detailColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity={0.45}
      />

      <Path
        d="M55 23 L60 29"
        stroke={detailColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity={0.45}
      />

      <Path
        d="M76 38 L81 44"
        stroke={detailColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity={0.45}
      />
      <Path
        d="M58 73 L64 79"
        stroke={detailColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity={0.45}
      />

      <Path
        d="M48 66 L54 73"
        stroke={detailColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity={0.45}
      />

      <Path
        d="M70 58 L76 64"
        stroke={detailColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity={0.45}
      />
    </Svg>
  );
};
export const Cupcake = ({
  colorHex = "#F8BBD0", // 컵케이크 기본 분홍빛 크림 톤
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const creamColor = primary ?? colorHex;
  const cupColor = secondary ?? "#8D6E63";
  const cherryColor = accent ?? "#E53935";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 크림 */}
      <Path
        d="
        M25 52
        C18 44 24 32 35 32
        C36 20 55 18 61 30
        C74 25 84 36 77 48
        C83 58 72 65 62 61
        L38 61
        C28 64 21 59 25 52Z
      "
        fill={creamColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 컵 */}
      <Path
        d="M30 60 L70 60 L64 84 Q50 90 36 84Z"
        fill={cupColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <Path d="M40 64 L43 81" stroke="#FFFFFF" strokeWidth="3" opacity={0.35} />
      <Path d="M52 63 L52 84" stroke="#FFFFFF" strokeWidth="3" opacity={0.35} />
      <Path d="M63 64 L59 81" stroke="#FFFFFF" strokeWidth="3" opacity={0.35} />

      {/* 체리 */}
      <Circle
        cx="51"
        cy="22"
        r="7"
        fill={cherryColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />
    </Svg>
  );
};

export const CottonCandy = ({
  colorHex = "#F48FB1", // 솜사탕 기본 분홍빛 톤
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const cloudColor = primary ?? colorHex;
  const coneColor = secondary ?? "#BCAAA4"; // 종이 콘 기본 색상
  const lineAccentColor = accent ?? "#AD1457"; // 콘 아웃라인/무늬 색상

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 종이 콘(막대 대신 원뿔) */}
      <Polygon
        points="42,60 58,60 52,90 48,90"
        fill={coneColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <Path
        d="M43 66 L57 66 M44 74 L56 74"
        stroke={lineAccentColor}
        strokeWidth="4"
        strokeLinecap="round"
        opacity={0.4}
      />

      {/* 뭉게뭉게 솜사탕 (여러 원을 겹쳐 구름처럼) */}
      <Circle
        cx="32"
        cy="46"
        r="16"
        fill={cloudColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />
      <Circle
        cx="50"
        cy="34"
        r="20"
        fill={cloudColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />
      <Circle
        cx="68"
        cy="46"
        r="16"
        fill={cloudColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />
      <Circle cx="40" cy="52" r="14" fill={cloudColor} />
      <Circle cx="60" cy="52" r="14" fill={cloudColor} />

      {/* 입체 하이라이트 (Unchanged) */}
      <Ellipse cx="42" cy="30" rx="9" ry="6" fill={WHITE} opacity={0.45} />
      <Ellipse cx="60" cy="40" rx="6" ry="4" fill={WHITE} opacity={0.3} />

      <G transform="translate(50, 44)">
        <Circle cx="-6" cy="-2" r="2" fill={DARK} />
        <Circle cx="6" cy="-2" r="2" fill={DARK} />

        <Path
          d="M -5 4 Q 0 9 5 4"
          fill="none"
          stroke={DARK}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* 볼터치 (진한 핑크 계열, 투명도 조절) */}
        <Circle cx="-12" cy="5" r="3.5" fill={lineAccentColor} opacity={0.6} />
        {/* 왼쪽 볼 */}
        <Circle cx="12" cy="5" r="3.5" fill={lineAccentColor} opacity={0.6} />
        {/* 오른쪽 볼 */}
      </G>
    </Svg>
  );
};
export const Sunflower = ({
  colorHex = "#FDD835", // 해바라기 기본 노란빛 톤
  primary,
  secondary,
  accent,
  size = 90,
}: ItemSvgProps) => {
  const petalColor = primary ?? colorHex;
  const centerColor = secondary ?? "#4E342E";
  const stemColor = accent ?? "#2E7D32";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 줄기 + 잎 */}
      <Path
        d="M50 62 L50 90"
        stroke={stemColor}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <Path
        d="M50 78 C40 76 34 82 32 90 C42 90 48 86 50 78Z"
        fill={stemColor}
      />

      {/* 뾰족한 꽃잎 8장 (타원을 회전시켜 배치) */}
      <G>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <Ellipse
            key={angle}
            cx="50"
            cy="26"
            rx="9"
            ry="17"
            fill={petalColor}
            stroke={OUTLINE}
            strokeWidth="4"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
      </G>

      {/* 가운데 씨앗 원판 */}
      <Circle
        cx="50"
        cy="50"
        r="16"
        fill={centerColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />
      {/* 씨앗 질감 점들 */}
      <Circle cx="45" cy="46" r="1.6" fill={OUTLINE} />
      <Circle cx="55" cy="46" r="1.6" fill={OUTLINE} />
      <Circle cx="50" cy="52" r="1.6" fill={OUTLINE} />
      <Circle cx="44" cy="54" r="1.6" fill={OUTLINE} />
      <Circle cx="56" cy="54" r="1.6" fill={OUTLINE} />
    </Svg>
  );
};
export const Flower = ({
  colorHex = "#AB47BC", // 꽃 기본 보라빛 톤
  primary,
  secondary,
  accent,
  size = 90,
}: ItemSvgProps) => {
  const petalColor = primary ?? colorHex;
  const centerColor = secondary ?? "#FFCA28";
  const detailColor = accent ?? "#F57F17";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 꽃잎 */}
      <Circle
        cx="50"
        cy="28"
        r="17"
        fill={petalColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      <Circle
        cx="72"
        cy="43"
        r="17"
        fill={petalColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      <Circle
        cx="64"
        cy="68"
        r="17"
        fill={petalColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      <Circle
        cx="36"
        cy="68"
        r="17"
        fill={petalColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      <Circle
        cx="28"
        cy="43"
        r="17"
        fill={petalColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      {/* 가운데 */}
      <Circle
        cx="50"
        cy="50"
        r="14"
        fill={centerColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      <Circle cx="45" cy="45" r="4" fill={detailColor} opacity={0.4} />
    </Svg>
  );
};
export const Flower1 = ({
  colorHex = "#D85A38", // 이미지의 따뜻한 붉은 주황빛 꽃잎 컬러
  primary,
  secondary,
  accent,
  size = 85,
}: ItemSvgProps) => {
  const petalColor = primary ?? colorHex;
  const stemColor = secondary ?? "#4A7C59"; // 초록빛 줄기
  const centerColor = accent ?? "#FFF176"; // 노란색 꽃술
  const OUTLINE = "#212121";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 1. 줄기 (부드러운 곡선 형태) */}
      <Path
        d="M 50 55 Q 42 75 48 95"
        fill="none"
        stroke={stemColor}
        strokeWidth={4.5}
        strokeLinecap="round"
      />

      {/* 2. 꽃잎 5장 (회전 대칭 구조로 둥글고 귀엽게 배치) */}
      {[0, 72, 144, 216, 288].map((angle, index) => (
        <G key={index} transform={`rotate(${angle}, 50, 45)`}>
          {/* 꽃잎 기본 형태 */}
          <Path
            d="M 50 45 C 43 30 36 18 43 12 C 48 8 52 8 57 12 C 64 18 57 30 50 45 Z"
            fill={petalColor}
            stroke={OUTLINE}
            strokeWidth={3}
            strokeLinejoin="round"
          />
          {/* 꽃잎 안쪽의 따뜻한 하이라이트 디테일 */}
          <Path
            d="M 50 36 C 47 26 44 20 47 16"
            fill="none"
            stroke="#FFD54F"
            strokeWidth={2.5}
            strokeLinecap="round"
            opacity={0.6}
          />
        </G>
      ))}

      {/* 3. 중앙 꽃술 배경 (동글동글한 코어) */}
      <Circle
        cx="50"
        cy="45"
        r="11"
        fill={petalColor}
        stroke={OUTLINE}
        strokeWidth={3}
      />
    </Svg>
  );
};
export const Cactus = ({
  colorHex = "#66BB6A", // 선인장 기본 초록빛 톤
  primary,
  secondary,
  accent,
  size = 90,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const potColor = secondary ?? "#8D6E63";
  const flowerColor = accent ?? "#E91E63";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 화분 */}
      <Path
        d="M30 82 L70 82 L66 94 L34 94Z"
        fill={potColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* 팔 (왼쪽) */}
      <Path
        d="M38 55 H24 C17 55 17 42 24 42"
        stroke={bodyColor}
        strokeWidth="15"
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M38 55 H24 C17 55 17 42 24 42"
        stroke={OUTLINE}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        opacity={0.9}
      />
      {/* 팔 (오른쪽) */}
      <Path
        d="M62 65 H76 C83 65 83 52 76 52"
        stroke={bodyColor}
        strokeWidth="15"
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M62 65 H76 C83 65 83 52 76 52"
        stroke={OUTLINE}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        opacity={0.9}
      />

      {/* 몸통 */}
      <Rect
        x="38"
        y="30"
        width="24"
        height="55"
        rx="12"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />
      {/* 작은 가시 */}
      <Path
        d="M48 34 L46 30 M54 43 L58 40 M46 58 L43 61"
        stroke={WHITE}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* 얼굴 */}
      <Circle cx="45" cy="55" r="3" fill={DARK} />
      <Circle cx="55" cy="55" r="3" fill={DARK} />
      <Path
        d="M45 63 Q50 67 55 63"
        stroke={DARK}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <Ellipse cx="43" cy="42" rx="4" ry="8" fill={WHITE} opacity={0.3} />
    </Svg>
  );
};
export const Cloud = ({
  colorHex = "#E0F7FA", // 구름 기본 하늘빛/화이트 톤
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const cloudColor = primary ?? colorHex;
  const highlightColor = secondary ?? "#FFFFFF";
  const detailColor = accent ?? "#B2EBF2";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="M20 65
          C15 52 24 42 37 44
          C40 30 58 26 68 39
          C82 36 91 47 87 59
          C95 68 85 78 74 77
          L30 77
          C20 77 15 72 20 65Z"
        fill={cloudColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      <Ellipse
        cx="43"
        cy="50"
        rx="9"
        ry="5"
        fill={highlightColor}
        opacity={0.5}
      />
    </Svg>
  );
};
export const CrescentMoon = ({
  colorHex = "#FFEE58",
  primary,
  secondary,
  accent,
  size = 90,
}: ItemSvgProps) => {
  const moonColor = primary ?? colorHex;
  const highlightColor = secondary ?? "#FFFDE7";
  const blushColor = accent ?? "#FF8A80";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="
    M 72 8
    C 91 26, 99 49, 91 69
    C 82 91, 59 98, 38 89
    C 30 86, 23 81, 18 75
    C 38 85, 59 75, 70 57
    C 81 39, 80 20, 72 8
    Z
  "
        fill={moonColor}
        stroke={OUTLINE}
        strokeWidth={2}
      />

      {/* 오른쪽 바깥쪽 곡선만 검은 테두리 */}
      <Path
        d="
    M 72 8
    C 91 26, 99 49, 91 69
    C 82 91, 59 98, 38 89
  "
        fill="none"
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinecap="round"
      />

      {/* 달 안쪽의 은은한 하이라이트 */}
      <Path
        d="M 72 15 C 84 30, 88 48, 82 64"
        fill="none"
        stroke={highlightColor}
        strokeWidth={2.5}
        strokeLinecap="round"
        opacity={0.65}
      />
    </Svg>
  );
};
export const Tree = ({
  colorHex = "#9CCC65", // 나무 잎 기본 초록빛 톤
  primary,
  secondary,
  accent,
  size = 95,
}: ItemSvgProps) => {
  const leavesColor = primary ?? colorHex;
  const trunkColor = secondary ?? "#FFA726";
  const highlightColor = accent ?? "#FFFFFF";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 나무 기둥 및 가지 (아래가 넓고 위로 갈라지는 형태)[cite: 4] */}
      <Path
        d="M32 94 
           L68 94 
           C65 65 63 55 60 45
           C66 43 72 38 68 30
           C65 24 58 27 54 36
           C52 30 50 22 50 22
           C50 22 48 30 46 36
           C42 27 35 24 32 30
           C28 38 34 43 40 45
           C37 55 35 65 32 94 Z"
        fill={trunkColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* 몽글몽글한 잎사귀 덩어리 (구름 형태 복합 패스)[cite: 4] */}
      <G transform="translate(9.4, -10) scale(0.78)">
        <Path
          d="M20 58
           C12 45 22 30 38 32
           C44 18 64 18 70 32
           C86 30 96 45 88 58
           C96 72 82 85 68 82
           L32 82
           C18 85 12 72 20 58 Z"
          fill={leavesColor}
          stroke={OUTLINE}
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* 잎사귀 입체 하이라이트 */}
        <Ellipse
          cx="42"
          cy="38"
          rx="10"
          ry="5"
          fill={highlightColor}
          opacity={0.4}
        />
      </G>
    </Svg>
  );
};

export const Piano = ({
  colorHex = "#B8C0C8",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const keyColor = secondary ?? "#FFFFFF";
  const accentColor = accent ?? "#333333";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="M15 18 Q15 12 22 12 H78 Q85 12 85 18 V72 H15 Z"
        fill={bodyColor}
        stroke={accentColor}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <Rect
        x={22}
        y={35}
        width={56}
        height={23}
        rx={2}
        fill={keyColor}
        stroke={accentColor}
        strokeWidth={2}
      />
      {Array.from({ length: 7 }, (_, i) => (
        <Line
          key={i}
          x1={30 + i * 7}
          y1={36}
          x2={30 + i * 7}
          y2={57}
          stroke={accentColor}
          strokeWidth={1.5}
        />
      ))}
      {[27, 41, 55, 69].map((x) => (
        <Rect
          key={x}
          x={x}
          y={35}
          width={4}
          height={12}
          rx={1}
          fill={accentColor}
        />
      ))}
      <Line
        x1={22}
        y1={64}
        x2={78}
        y2={64}
        stroke={accentColor}
        strokeWidth={3}
      />
      <Path
        d="M23 72 L23 87 M77 72 L77 87"
        stroke={accentColor}
        strokeWidth={5}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export const Violin = ({
  colorHex = "#C98A47",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const neckColor = secondary ?? "#8D6E63";
  const stringColor = accent ?? "#424242";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 활 */}
      <Line
        x1="68"
        y1="18"
        x2="89"
        y2="84"
        stroke={neckColor}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <Line
        x1="70"
        y1="20"
        x2="87"
        y2="82"
        stroke={stringColor}
        strokeWidth="1"
      />
      {/* 바이올린 몸통 */}
      <Path
        d="
    M44 12
    L44 28

    C30 30 24 40 30 50
    C35 57 34 63 28 69
C22 77 30 84 50 84
C70 84 78 77 72 69

    C70 87 78 77 72 69
    C66 63 65 57 70 50
    C76 40 70 30 56 28

    L56 12
    Z
  "
        fill={bodyColor}
        stroke={stringColor}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 헤드 */}
      <Rect
        x="40"
        y="4"
        width="20"
        height="12"
        rx="4"
        fill={neckColor}
        stroke={stringColor}
        strokeWidth="2"
      />

      {/* 현판 */}
      <Rect x="45" y="16" width="10" height="42" rx="2" fill={neckColor} />

      {/* 줄 */}
      <Line
        x1="49"
        y1="8"
        x2="49"
        y2="82"
        stroke={stringColor}
        strokeWidth="1"
      />

      <Line
        x1="53"
        y1="8"
        x2="53"
        y2="82"
        stroke={stringColor}
        strokeWidth="1"
      />

      {/* 페그 */}
      <Circle cx="40" cy="8" r="2" fill={stringColor} />
      <Circle cx="60" cy="8" r="2" fill={stringColor} />
      <Circle cx="40" cy="14" r="2" fill={stringColor} />
      <Circle cx="60" cy="14" r="2" fill={stringColor} />

      {/* 브릿지 */}
      <Path
        d="
    M44 55
    Q50 50 56 55
    L54 64
    L46 64
    Z
  "
        fill={neckColor}
        stroke={stringColor}
        strokeWidth="2"
      />

      {/* 왼쪽 f홀 */}
      <Path
        d="
          M41 44
          Q36 48 41 54
          Q36 60 41 64
        "
        fill="none"
        stroke={stringColor}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* 오른쪽 f홀 */}
      <Path
        d="
          M59 44
          Q64 48 59 54
          Q64 60 59 64
        "
        fill="none"
        stroke={stringColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export const Keyboard = ({
  colorHex = "#B8C0C8",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const keyColor = secondary ?? "#FFFFFF";
  const detailColor = accent ?? "#424242";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect
        x={8}
        y={20}
        width={84}
        height={60}
        rx={8}
        fill={bodyColor}
        stroke={detailColor}
        strokeWidth={3}
      />
      <Rect x={17} y={29} width={24} height={8} rx={2} fill={detailColor} />
      <Circle cx={53} cy={33} r={4} fill={detailColor} />
      <Circle cx={68} cy={33} r={4} fill={detailColor} />
      <Rect
        x={17}
        y={43}
        width={66}
        height={26}
        rx={2}
        fill={keyColor}
        stroke={detailColor}
        strokeWidth={2}
      />
      {Array.from({ length: 11 }, (_, i) => (
        <Line
          key={i}
          x1={23 + i * 5.8}
          y1={44}
          x2={23 + i * 5.8}
          y2={68}
          stroke={detailColor}
          strokeWidth={1.2}
        />
      ))}
      {[25, 36, 48, 59, 71].map((x) => (
        <Rect
          key={x}
          x={x}
          y={44}
          width={3.5}
          height={13}
          rx={0.5}
          fill={detailColor}
        />
      ))}
    </Svg>
  );
};

export const Bongo = ({
  colorHex = "#B8C0C8",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const drumColor = secondary ?? "#F4D6A0";
  const outlineColor = accent ?? "#424242";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {[25, 59].map((x, i) => (
        <G key={x}>
          <Path
            d={`M${x - 12} 32
               Q${x} 27 ${x + 12} 32
               L${x + 9} 70
               Q${x} 78 ${x - 9} 70 Z`}
            fill={bodyColor}
            stroke={outlineColor}
            strokeWidth={3}
            strokeLinejoin="round"
          />
          <Ellipse
            cx={x}
            cy={32}
            rx={12}
            ry={5}
            fill={drumColor}
            stroke={outlineColor}
            strokeWidth={2.5}
          />
          <Line
            x1={x - 9}
            y1={43}
            x2={x - 7}
            y2={65}
            stroke={outlineColor}
            strokeWidth={2}
          />
          <Line
            x1={x + 9}
            y1={43}
            x2={x + 7}
            y2={65}
            stroke={outlineColor}
            strokeWidth={2}
          />
        </G>
      ))}
      <Line
        x1={36}
        y1={47}
        x2={48}
        y2={47}
        stroke={outlineColor}
        strokeWidth={3}
      />
    </Svg>
  );
};

export const DrumSet = ({
  colorHex = "#B8C0C8",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const drumColor = secondary ?? "#F4D6A0";
  const outlineColor = accent ?? "#424242";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Line
        x1={12}
        y1={82}
        x2={88}
        y2={82}
        stroke={outlineColor}
        strokeWidth={2.5}
      />
      <Ellipse
        cx={50}
        cy={65}
        rx={19}
        ry={18}
        fill={bodyColor}
        stroke={outlineColor}
        strokeWidth={3}
      />
      <Ellipse
        cx={50}
        cy={65}
        rx={12}
        ry={11}
        fill={drumColor}
        stroke={outlineColor}
        strokeWidth={2}
      />
      <Rect
        x={27}
        y={42}
        width={14}
        height={17}
        rx={3}
        fill={bodyColor}
        stroke={outlineColor}
        strokeWidth={2.5}
      />
      <Ellipse
        cx={34}
        cy={42}
        rx={7}
        ry={3}
        fill={drumColor}
        stroke={outlineColor}
        strokeWidth={2}
      />
      <Rect
        x={59}
        y={40}
        width={14}
        height={18}
        rx={3}
        fill={bodyColor}
        stroke={outlineColor}
        strokeWidth={2.5}
      />
      <Ellipse
        cx={66}
        cy={40}
        rx={7}
        ry={3}
        fill={drumColor}
        stroke={outlineColor}
        strokeWidth={2}
      />
      <Line
        x1={18}
        y1={28}
        x2={18}
        y2={83}
        stroke={outlineColor}
        strokeWidth={2.5}
      />
      <Ellipse
        cx={18}
        cy={26}
        rx={12}
        ry={4}
        fill={drumColor}
        stroke={outlineColor}
        strokeWidth={2.5}
      />
      <Line
        x1={82}
        y1={28}
        x2={82}
        y2={83}
        stroke={outlineColor}
        strokeWidth={2.5}
      />
      <Ellipse
        cx={82}
        cy={26}
        rx={12}
        ry={4}
        fill={drumColor}
        stroke={outlineColor}
        strokeWidth={2.5}
      />
    </Svg>
  );
};
export const Guitar = ({
  colorHex = "#B8C0C8",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const neckColor = secondary ?? "#8D6E63";
  const outlineColor = accent ?? "#424242";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 몸통을 넥 방향과 일치하도록 중심점 기준에 맞춰 transform 회전/정렬 */}
      <G transform="rotate(-25, 50, 80)">
        <Path
          d="
            M46 51
            C34 44 21 49 20 62
            C19 76 30 86 45 84
            C56 82 60 75 59 67
            C67 72 79 68 82 57
            C85 45 76 35 63 38
            C55 40 49 45 46 51
            Z
          "
          fill={bodyColor}
          stroke={outlineColor}
          strokeWidth={3}
          strokeLinejoin="round"
        />
      </G>

      {/* 넥 및 헤드, 줄 부문 */}
      <Path
        d="M47 49 L73 18 L80 24 L55 55 Z"
        fill={neckColor}
        stroke={outlineColor}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <Path
        d="M72 18 L79 11 L87 16 L80 25 Z"
        fill={neckColor}
        stroke={outlineColor}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <Circle
        cx={41}
        cy={62}
        r={7}
        fill={neckColor}
        stroke={outlineColor}
        strokeWidth={2}
      />
      <G transform="rotate(25, 50, 80)">
        <Rect x={25} y={80} width={12} height={4} rx={10} fill={outlineColor} />
      </G>
      <Line
        x1={38}
        y1={62}
        x2={78}
        y2={18}
        stroke={outlineColor}
        strokeWidth={1}
      />
      <Line
        x1={41}
        y1={65}
        x2={81}
        y2={21}
        stroke={outlineColor}
        strokeWidth={1}
      />
    </Svg>
  );
};

export const Harp = ({
  colorHex = "#B8C0C8",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const frameColor = primary ?? colorHex;
  const stringColor = secondary ?? "#FFFFFF";
  const outlineColor = accent ?? "#424242";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="M22 15 L22 84 L80 84
           Q86 83 80 77
           L48 26
           Q41 14 32 15 Z"
        fill={frameColor}
        stroke={outlineColor}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <Path
        d="M32 23 Q40 18 46 29 L72 76 L31 76 Z"
        fill={stringColor}
        stroke={outlineColor}
        strokeWidth={2}
      />
      {Array.from({ length: 7 }, (_, i) => (
        <Line
          key={i}
          x1={34 + i * 5}
          y1={24 + i * 4}
          x2={34 + i * 5}
          y2={75}
          stroke={outlineColor}
          strokeWidth={1.3}
        />
      ))}
      <Rect
        x={18}
        y={81}
        width={67}
        height={7}
        rx={2}
        fill={frameColor}
        stroke={outlineColor}
        strokeWidth={2}
      />
    </Svg>
  );
};

export const Trumpet = ({
  colorHex = "#B8C0C8",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const detailColor = secondary ?? "#E5A13B";
  const outlineColor = accent ?? "#424242";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="M13 42 L59 42 L78 27
           L87 32 L87 48 L78 53 L59 48 L13 48 Z"
        fill={bodyColor}
        stroke={outlineColor}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <Path
        d="M78 27 L87 23 L94 30 L94 49 L87 53 L78 48 Z"
        fill={detailColor}
        stroke={outlineColor}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <Path
        d="M37 48 L37 61 Q37 67 43 67
           L48 67 Q53 67 53 61 L53 48"
        fill="none"
        stroke={outlineColor}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      {[37, 46, 55].map((x) => (
        <G key={x}>
          <Line
            x1={x}
            y1={35}
            x2={x}
            y2={42}
            stroke={outlineColor}
            strokeWidth={2.5}
          />
          <Circle
            cx={x}
            cy={33}
            r={3}
            fill={detailColor}
            stroke={outlineColor}
            strokeWidth={1.5}
          />
        </G>
      ))}
      <Line
        x1={13}
        y1={42}
        x2={13}
        y2={48}
        stroke={outlineColor}
        strokeWidth={3}
      />
    </Svg>
  );
};

export const Maracas = ({
  colorHex = "#B8C0C8",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const headColor = primary ?? colorHex;
  const handleColor = secondary ?? "#E5A13B";
  const detailColor = accent ?? "#424242";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <G rotation="-25" origin="32, 35">
        <Ellipse
          cx={32}
          cy={30}
          rx={13}
          ry={18}
          fill={headColor}
          stroke={detailColor}
          strokeWidth={3}
        />
        <Path
          d="M20 28 Q32 34 44 28"
          fill="none"
          stroke={detailColor}
          strokeWidth={2}
        />
        <Path
          d="M32 47 L32 83"
          stroke={handleColor}
          strokeWidth={7}
          strokeLinecap="round"
        />
        <Path
          d="M32 47 L32 83"
          stroke={detailColor}
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </G>
      <G rotation="25" origin="68, 35">
        <Ellipse
          cx={68}
          cy={30}
          rx={13}
          ry={18}
          fill={headColor}
          stroke={detailColor}
          strokeWidth={3}
        />
        <Path
          d="M56 28 Q68 34 80 28"
          fill="none"
          stroke={detailColor}
          strokeWidth={2}
        />
        <Path
          d="M68 47 L68 83"
          stroke={handleColor}
          strokeWidth={7}
          strokeLinecap="round"
        />
        <Path
          d="M68 47 L68 83"
          stroke={detailColor}
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </G>
    </Svg>
  );
};

export const Recorder = ({
  colorHex = "#FFFFFF",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const bodyColor = primary ?? colorHex;
  const outlineColor = secondary ?? "#111111";
  const detailColor = accent ?? "#FFFFFF";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 리코더 본체 */}
      <G transform="scale(0.8) translate(18,5)">
        <Path
          d="
          M 9 72
          Q 23 68 35 55
          L 63 22
          Q 67 17 75 16
          Q 83 15 91 8
          L 96 13
          Q 91 20 92 29
          Q 91 39 83 41
          Q 78 43 73 39
          L 70 49
          Q 68 56 61 60
          Q 43 72 34 86
          Q 29 92 27 98
          L 15 87
          Z
        "
          fill={bodyColor}
          stroke={outlineColor}
          strokeWidth={4}
          strokeLinejoin="round"
        />
        {/* 위쪽 마우스피스 */}
        <Path
          d="
          M 63 22
          Q 63 15 72 13
          Q 81 12 86 5
          L 94 3
          L 100 10
          Q 96 16 96 23
          Q 96 32 90 37
          Q 85 41 79 37
          L 73 33
        "
          fill={bodyColor}
          stroke={outlineColor}
          strokeWidth={4}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* 마우스피스 내부 연결선 */}
        <Path
          d="M 76 19 Q 81 18 84 15"
          fill="none"
          stroke={outlineColor}
          strokeWidth={3}
          strokeLinecap="round"
        />

        {/* 상단 연결부 테두리 */}
        <Path
          d="M 62 25 Q 72 29 77 38"
          fill="none"
          stroke={outlineColor}
          strokeWidth={4}
          strokeLinecap="round"
        />
        {/* 하단 연결부 테두리 */}
        <Path
          d="M 56 32 Q 65 36 70 45"
          fill="none"
          stroke={outlineColor}
          strokeWidth={4}
          strokeLinecap="round"
        />
        {/* 손가락 구멍 */}
        {[
          { x: 58, y: 40 },
          { x: 53, y: 47 },
          { x: 48, y: 54 },
          { x: 43, y: 61 },
          { x: 38, y: 68 },
        ].map((hole, index) => (
          <Circle
            key={index}
            cx={hole.x}
            cy={hole.y}
            r={1.7}
            fill={outlineColor}
          />
        ))}
        {/* 아래쪽 마우스피스 */}
        <Path
          d="
          M 9 72
          Q 5 69 2 73
          Q -1 77 3 81
          L 22 100
          Q 26 103 30 99
          Q 33 95 29 91
          L 13 75
          Z
        "
          fill={bodyColor}
          stroke={outlineColor}
          strokeWidth={4}
          strokeLinejoin="round"
        />
        {/* 아래쪽 마우스피스 안쪽 */}
        <Path
          d="M 4 78 L 24 98"
          fill="none"
          stroke={detailColor}
          strokeWidth={2}
          strokeLinecap="round"
        />
        {/* 손가락 받침 */}
        <Path
          d="
          M 20 59
          Q 17 56 14 59
          Q 11 62 14 65
          L 39 90
          Q 42 93 45 90
          Q 48 87 45 84
          Z
        "
          fill={bodyColor}
          stroke={outlineColor}
          strokeWidth={4}
          strokeLinejoin="round"
        />
        {/* 손가락 받침 안쪽 */}
        <Path
          d="M 18 62 L 42 87"
          fill="none"
          stroke={detailColor}
          strokeWidth={2}
          strokeLinecap="round"
        />
        {/* 아래쪽 손가락 구멍 */}
        <Circle cx={24} cy={78} r={1.7} fill={outlineColor} />
      </G>
    </Svg>
  );
};
export const Rainbow = ({
  colorHex = "#E57373", // 기본 무지개 맨 아웃라인 컬러 호환용
  primary,
  secondary,
  accent,
  size = 90,
}: ItemSvgProps) => {
  const cloudColor = primary ?? "#E1F5FE"; // 구름 색상
  const outlineColor = accent ?? "#212121"; // 외곽선 색상

  // 무지개 색상 순서 (빨, 주, 노, 초, 파, 남, 보)
  const rainbowColors = [
    "#E53935", // 빨강
    "#FB8C00", // 주황
    "#FDD835", // 노랑
    "#7CB342", // 초록
    "#039BE5", // 파랑
    "#3949AB", // 남색
    "#8E24AA", // 보라
  ];

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 1. 무지개 아치 레이어 (안쪽에서 바깥쪽으로 순서대로 그리기) */}
      <G>
        {rainbowColors.map((color, index) => {
          // 반지름을 점진적으로 키워서 아치 띠를 형성합니다.
          const r = 38 - index * 3.5;
          return (
            <Path
              key={index}
              d={`M ${50 - r} 65 A ${r} ${r} 0 0 1 ${50 + r} 65`}
              fill="none"
              stroke={color}
              strokeWidth="3.8"
              strokeLinecap="butt"
            />
          );
        })}

        {/* 무지개 전체 바깥 테두리 선 (선명한 카툰 스타일 마감) */}
        <Path
          d="M 10 65 A 40 40 0 0 1 90 65"
          fill="none"
          stroke={outlineColor}
          strokeWidth="3"
        />
        <Path
          d="M 27.5 65 A 22.5 22.5 0 0 1 72.5 65"
          fill="none"
          stroke={outlineColor}
          strokeWidth="3"
        />
      </G>

      {/* 2. 왼쪽 구름 */}
      <G transform="translate(-10,0)">
        <Path
          d="M 15 78 
             C 12 70 20 62 28 65 
             C 33 58 43 60 45 68 
             C 52 70 52 82 44 86 
             L 16 86 
             C 12 85 13 80 15 78 Z"
          fill={cloudColor}
          stroke={outlineColor}
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </G>

      {/* 3. 오른쪽 구름 */}
      <G transform="translate(13,0)">
        <Path
          d="M 85 78 
             C 88 70 80 62 72 65 
             C 67 58 57 60 55 68 
             C 48 70 48 82 56 86 
             L 84 86 
             C 88 85 87 80 85 78 Z"
          fill={cloudColor}
          stroke={outlineColor}
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
};

export const WaterBottle = ({
  colorHex = "#B8C0C8",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const bottleColor = primary ?? "#BDE3F8";
  const capColor = secondary ?? "#78909C";
  const detailColor = accent ?? "#FFFFFF";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="M40 17 L60 17 L60 29
           Q60 34 66 42
           Q74 51 74 63
           L74 83
           Q74 92 65 92
           L35 92
           Q26 92 26 83 L26 63
           Q26 51 34 42
           Q40 34 40 29 Z"
        fill={bottleColor}
        stroke={OUTLINE}
        strokeWidth={3.5}
        strokeLinejoin="round"
      />
      <Path
        d="M40 17 L60 17 L60 29 L40 29 Z"
        fill={bottleColor}
        stroke={OUTLINE}
        strokeWidth={3}
      />
      <Rect
        x={37}
        y={8}
        width={26}
        height={11}
        rx={3}
        fill={capColor}
        stroke={OUTLINE}
        strokeWidth={3}
      />
      <Path
        d="M29 65 Q50 70 71 65"
        fill="none"
        stroke={capColor}
        strokeWidth={2.5}
      />
      <Path
        d="M35 45 Q29 52 30 62 L30 76"
        fill="none"
        stroke={detailColor}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <Path
        d="M31 84 Q35 91 40 85 M60 85 Q65 91 69 84"
        fill="none"
        stroke={OUTLINE}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export const Juice = ({
  colorHex = "#FDD166",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const drinkColor = primary ?? colorHex;
  const glassColor = secondary ?? "#FFFFFF";
  const detailColor = accent ?? "#E58B27";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 컵 안의 음료 */}
      <Path
        d="M25 27 L75 27 L66 82
           Q50 89 34 82 Z"
        fill={drinkColor}
        stroke={detailColor}
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* 컵 외곽 */}
      <Path
        d="M20 20 L80 20 L69 83
           Q67 91 50 92
           Q33 91 31 83 Z"
        fill="none"
        stroke={glassColor}
        strokeWidth={4}
        strokeLinejoin="round"
      />

      <Path
        d="M20 20 L80 20 L69 83
           Q67 91 50 92
           Q33 91 31 83 Z"
        fill="none"
        stroke={OUTLINE}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />

      {/* 음료 표면 */}
      <Ellipse
        cx={50}
        cy={28}
        rx={25}
        ry={5}
        fill={drinkColor}
        stroke={OUTLINE}
        strokeWidth={2}
      />

      {/* 반짝임 */}
      <Path
        d="M31 36 L35 55"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={3.5}
        strokeLinecap="round"
      />
      <Circle cx={61} cy={39} r={2} fill="#FFFFFF" />
      <Circle cx={56} cy={50} r={1.5} fill="#FFFFFF" />
    </Svg>
  );
};

export const DrinkCan = ({
  colorHex = "#EF4444",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const canColor = primary ?? colorHex;
  const topColor = secondary ?? "#D5DCE3";
  const detailColor = accent ?? "#FFFFFF";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="M29 17 L71 17
           L75 27 L75 82
           Q75 91 66 91 L34 91
           Q25 91 25 82 L25 27 Z"
        fill={canColor}
        stroke={OUTLINE}
        strokeWidth={3.5}
        strokeLinejoin="round"
      />

      {/* 윗면 */}
      <Ellipse
        cx={50}
        cy={18}
        rx={21}
        ry={5}
        fill={topColor}
        stroke={OUTLINE}
        strokeWidth={3}
      />
      <Path
        d="M36 18 Q50 23 64 18"
        fill="none"
        stroke={OUTLINE}
        strokeWidth={2}
      />

      {/* 윗부분 테두리 */}
      <Path
        d="M28 27 Q50 32 72 27"
        fill="none"
        stroke={OUTLINE}
        strokeWidth={2.5}
      />

      {/* 라벨 */}
      <Path
        d="M27 44 Q50 49 73 44 L73 66
           Q50 71 27 66 Z"
        fill={detailColor}
        opacity={0.95}
      />

      {/* 라벨 장식 */}
      <Path
        d="M34 56 Q50 46 66 56"
        fill="none"
        stroke={canColor}
        strokeWidth={3}
        strokeLinecap="round"
      />

      {/* 캔의 반사광 */}
      <Path
        d="M32 31 L32 39 M32 72 L32 80"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.8}
      />

      {/* 바닥 테두리 */}
      <Path
        d="M29 87 Q50 93 71 87"
        fill="none"
        stroke={OUTLINE}
        strokeWidth={2}
      />
    </Svg>
  );
};

export const DrinkingGlass = ({
  colorHex = "#B8C0C8",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const glassColor = primary ?? colorHex;
  const drinkColor = secondary ?? "#9ADBF5";
  const detailColor = accent ?? "#FFFFFF";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="M24 20 L76 20 L68 80
           Q66 88 50 88
           Q34 88 32 80 Z"
        fill={glassColor}
        stroke={OUTLINE}
        strokeWidth={3}
        strokeLinejoin="round"
      />

      {/* 잔 안의 음료 */}
      <Path
        d="M28 44 L72 44 L68 79
           Q50 86 32 79 Z"
        fill={drinkColor}
      />

      {/* 음료 표면 */}
      <Path
        d="M28 44 Q50 49 72 44"
        fill="none"
        stroke={OUTLINE}
        strokeWidth={2}
      />

      {/* 컵 테두리 */}
      <Ellipse
        cx={50}
        cy={20}
        rx={26}
        ry={5}
        fill="#FFFFFF"
        stroke={OUTLINE}
        strokeWidth={3}
      />

      {/* 유리 반짝임 */}
      <Path
        d="M32 29 L35 41 M34 53 L36 62"
        fill="none"
        stroke={detailColor}
        strokeWidth={3}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export const MilkBottle = ({
  colorHex = "#B8C0C8",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const bottleColor = primary ?? "#FFFDF4";
  const milkColor = secondary ?? "#FFFFFF";
  const capColor = accent ?? "#8CC8F4";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="M40 19 L60 19 L60 31
           Q60 37 67 45
           Q75 54 75 64
           L75 83
           Q75 92 66 92 L34 92
           Q25 92 25 83 L25 64
           Q25 54 33 45
           Q40 37 40 31 Z"
        fill={bottleColor}
        stroke={OUTLINE}
        strokeWidth={3}
        strokeLinejoin="round"
      />

      <Path
        d="M28 62 Q50 66 72 62 L72 81
           Q72 89 64 89 L36 89
           Q28 89 28 81 Z"
        fill={milkColor}
      />

      <Rect
        x={37}
        y={10}
        width={26}
        height={12}
        rx={3}
        fill={capColor}
        stroke={OUTLINE}
        strokeWidth={3}
      />

      <Path d="M40 24 L60 24" stroke={OUTLINE} strokeWidth={2} />

      <Path
        d="M34 47 Q29 55 30 69"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={4}
        strokeLinecap="round"
      />

      <Path
        d="M29 73 Q50 78 71 73"
        fill="none"
        stroke={capColor}
        strokeWidth={2}
      />
    </Svg>
  );
};

export const SodaBottle = ({
  colorHex = "#D32F2F",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const bottleColor = primary ?? colorHex;
  const capColor = secondary ?? "#EF4444";
  const detailColor = accent ?? "#FFFFFF";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="M40 18 L60 18 L60 28
           Q60 34 66 41
           Q72 47 68 54
           Q64 60 69 67
           Q75 75 70 86
           Q68 92 60 92 L40 92
           Q32 92 30 86
           Q25 75 31 67
           Q36 60 32 54
           Q28 47 34 41
           Q40 34 40 28 Z"
        fill={bottleColor}
        stroke={OUTLINE}
        strokeWidth={3.5}
        strokeLinejoin="round"
      />

      <Rect
        x={39}
        y={9}
        width={22}
        height={11}
        rx={3}
        fill={capColor}
        stroke={OUTLINE}
        strokeWidth={3}
      />

      {/* 라벨 */}
      <Path
        d="M32 52 Q50 57 68 52 L67 68
           Q50 74 33 68 Z"
        fill="#FFFFFF"
        stroke={OUTLINE}
        strokeWidth={2}
      />

      <Path
        d="M36 59 Q50 63 64 59"
        fill="none"
        stroke={bottleColor}
        strokeWidth={3}
        strokeLinecap="round"
      />

      {/* 반사광 */}
      <Path
        d="M37 39 Q32 47 37 52 M34 74 L34 81"
        fill="none"
        stroke={detailColor}
        strokeWidth={3}
        strokeLinecap="round"
      />

      {/* 병 바닥 굴곡 */}
      <Path
        d="M35 87 Q40 92 44 87 Q50 93 56 87 Q62 92 66 87"
        fill="none"
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export const JuiceBox = ({
  colorHex = "#F9A825",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const boxColor = primary ?? colorHex;
  const topColor = secondary ?? "#FFF8E1";
  const strawColor = accent ?? "#E53935";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 옆면 */}
      <Path
        d="M70 26 L84 33 L84 83 L70 90 Z"
        fill={topColor}
        stroke={OUTLINE}
        strokeWidth={3}
        strokeLinejoin="round"
      />

      {/* 본체 */}
      <Path
        d="M17 26 L70 26 L70 90 L17 90 Z"
        fill={boxColor}
        stroke={OUTLINE}
        strokeWidth={3}
        strokeLinejoin="round"
      />

      {/* 윗면 */}
      <Path
        d="M17 26 L28 14 L84 14 L70 26 Z"
        fill={topColor}
        stroke={OUTLINE}
        strokeWidth={3}
        strokeLinejoin="round"
      />

      {/* 빨대 */}
      <Path
        d="M43 16 L43 5 L49 5 L49 23"
        fill="none"
        stroke={boxColor}
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 앞면 라벨 */}
      <Rect
        x={24}
        y={43}
        width={39}
        height={28}
        rx={5}
        fill={topColor}
        opacity={0.9}
      />

      {/* 과일 장식 */}
      <Circle cx={43} cy={55} r={8} fill={boxColor} />
      <Path
        d="M43 47 Q47 41 52 44"
        fill="none"
        stroke="#388E3C"
        strokeWidth={2.5}
        strokeLinecap="round"
      />

      <Path
        d="M24 78 L63 78"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.8}
      />
    </Svg>
  );
};

export const Milk = ({
  colorHex = "#FFFFFF",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const cartonColor = primary ?? colorHex;
  const labelColor = secondary ?? "#54B6E8";
  const detailColor = accent ?? "#424242";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <G transform="scale(0.95)">
        {/* 오른쪽 옆면 */}
        <Path
          d="M50 45 L91 29 L91 77 L50 94 Z"
          fill={cartonColor}
          stroke={OUTLINE}
          strokeWidth={1.2}
          strokeLinejoin="round"
        />

        {/* 앞면 */}
        <Path
          d="M9 31 L50 45 L50 94 L9 77 Z"
          fill={cartonColor}
          stroke={OUTLINE}
          strokeWidth={1.2}
          strokeLinejoin="round"
        />

        {/* 앞면 라벨 */}
        <Path d="M9 52 L50 65 L50 82 L9 68 Z" fill={labelColor} />

        {/* 오른쪽 옆면 라벨 */}
        <Path d="M50 65 L91 49 L91 65 L50 82 Z" fill={labelColor} />

        {/* 왼쪽 지붕 접힘면 */}
        <Path
          d="M9 31 L32 15 L32 27 L50 45 Z"
          fill={cartonColor}
          stroke={OUTLINE}
          strokeWidth={1.2}
          strokeLinejoin="round"
        />

        {/* 왼쪽 지붕의 접힘면 음영 */}
        <Path
          d="M9 31 L32 15 L32 27 Z"
          fill={detailColor}
          stroke={OUTLINE}
          strokeWidth={1.2}
          strokeLinejoin="round"
        />

        {/* 왼쪽 지붕 내부 접힘선 */}
        <Path d="M9 31 L32 27" fill="none" stroke={OUTLINE} strokeWidth={1.2} />

        {/* 오른쪽 지붕 접힘면 */}
        <Path
          d="M73 11 L91 29 L50 45 L32 27 Z"
          fill={cartonColor}
          stroke={OUTLINE}
          strokeWidth={1.2}
          strokeLinejoin="round"
        />

        {/* 위쪽 밀봉 날개 */}
        <Path
          d="M32 15 L73 -1 L73 11 L32 27 Z"
          fill={cartonColor}
          stroke={OUTLINE}
          strokeWidth={1.2}
          strokeLinejoin="round"
        />

        {/* 밀봉 날개와 지붕의 연결선 */}
        <Path
          d="M32 27 L73 11"
          fill="none"
          stroke={OUTLINE}
          strokeWidth={1.2}
        />
      </G>
    </Svg>
  );
};

export const Desk = ({
  colorHex = "#DDA15E",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const wood = primary ?? colorHex;
  const drawer = secondary ?? "#F2CC8F";
  const detail = accent ?? "#8D5524";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 책상 다리 */}
      <Path
        d="M21 43 L31 43 L29 86 L20 86 Z"
        fill={wood}
        stroke={OUTLINE}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Path
        d="M8 37 L18 40 L16 83 L7 83 Z"
        fill={wood}
        stroke={OUTLINE}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Path
        d="M68 43 L78 43 L80 86 L71 86 Z"
        fill={wood}
        stroke={OUTLINE}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Path
        d="M80 43 L90 43 L92 86 L83 86 Z"
        fill={wood}
        stroke={OUTLINE}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />

      {/* 서랍 */}
      <Rect
        x={35}
        y={47}
        width={30}
        height={19}
        rx={2}
        fill={drawer}
        stroke={OUTLINE}
        strokeWidth={1.5}
      />
      <Circle cx={50} cy={56} r={2} fill={detail} />

      {/* 책상 상판 */}
      <Path
        d="M10 30 L77 30 L91 40 L24 40 Z"
        fill={drawer}
        stroke={OUTLINE}
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
      <Path
        d="M24 40 L91 40 L88 47 L21 47 Z"
        fill={wood}
        stroke={OUTLINE}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Path
        d="M10 30 L24 40 L21 47 L8 37 Z"
        fill={wood}
        stroke={OUTLINE}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const Chair = ({
  colorHex = "#E9A66B",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const wood = primary ?? colorHex;
  const seat = secondary ?? "#F6C98D";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 뒤쪽 다리 */}
      <Path
        d="M28 53 L36 53 L34 87 L26 87 Z"
        fill={wood}
        stroke={OUTLINE}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Path
        d="M68 53 L76 53 L81 87 L73 87 Z"
        fill={wood}
        stroke={OUTLINE}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />

      {/* 등받이 */}
      <Path
        d="M24 13 Q24 10 28 10 L69 10 Q74 10 74 15
           L76 52 L28 52 Z"
        fill={wood}
        stroke={OUTLINE}
        strokeWidth={1.7}
        strokeLinejoin="round"
      />

      {/* 등받이 안쪽 */}
      <Path
        d="M32 18 L66 18 L68 43 L33 43 Z"
        fill={seat}
        stroke={OUTLINE}
        strokeWidth={1.1}
        strokeLinejoin="round"
      />
      {/* 앞쪽 다리 */}
      <Path
        d="M39 65 L47 65 L45 88 L37 88 Z"
        fill={wood}
        stroke={OUTLINE}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Path
        d="M86 65 L94 65 L97 88 L89 88 Z"
        fill={wood}
        stroke={OUTLINE}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />

      {/* 좌석 */}
      <Path
        d="M27 50 L83 50 L97 60 L41 60 Z"
        fill={seat}
        stroke={OUTLINE}
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
      <Path
        d="M41 60 L97 60 L93 68 L38 68 Z"
        fill={wood}
        stroke={OUTLINE}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const Sofa = ({
  colorHex = "#72A7A1",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const sofaColor = primary ?? colorHex;
  const cushion = secondary ?? "#A8D5CD";
  const detail = accent ?? "#477D78";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 소파 다리 */}
      <Path
        d="M20 75 L29 75 L27 87 L19 87 Z"
        fill={detail}
        stroke={OUTLINE}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
      <Path
        d="M73 75 L82 75 L84 87 L76 87 Z"
        fill={detail}
        stroke={OUTLINE}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />

      {/* 등받이 */}
      <Path
        d="M17 35 Q17 25 27 25 L73 25
           Q83 25 83 35 L83 66 L17 66 Z"
        fill={sofaColor}
        stroke={OUTLINE}
        strokeWidth={1.7}
        strokeLinejoin="round"
      />

      {/* 등받이 쿠션 */}
      <Rect
        x={25}
        y={31}
        width={23}
        height={29}
        rx={6}
        fill={cushion}
        stroke={OUTLINE}
        strokeWidth={1.3}
      />
      <Rect
        x={52}
        y={31}
        width={23}
        height={29}
        rx={6}
        fill={cushion}
        stroke={OUTLINE}
        strokeWidth={1.3}
      />

      {/* 팔걸이 */}
      <Path
        d="M10 48 Q10 41 17 41 L24 43 L24 72
           L10 72 Z"
        fill={sofaColor}
        stroke={OUTLINE}
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
      <Path
        d="M76 43 L83 41 Q90 41 90 48
           L90 72 L76 72 Z"
        fill={sofaColor}
        stroke={OUTLINE}
        strokeWidth={1.7}
        strokeLinejoin="round"
      />

      {/* 좌석 쿠션 */}
      <Path
        d="M20 61 Q20 57 25 57 L75 57
           Q80 57 80 62 L80 72 L20 72 Z"
        fill={cushion}
        stroke={OUTLINE}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />

      {/* 앞면 */}
      <Path
        d="M20 72 L80 72 L78 80 L22 80 Z"
        fill={sofaColor}
        stroke={OUTLINE}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const Bed = ({
  colorHex = "#DDA7B5",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const frame = primary ?? "#B98261";
  const blanket = secondary ?? colorHex;
  const pillow = accent ?? "#FFF1D6";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 침대 다리 */}
      <Path
        d="M13 67 L21 67 L21 86 L14 86 Z"
        fill={frame}
        stroke={OUTLINE}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Path
        d="M79 68 L87 68 L88 86 L81 86 Z"
        fill={frame}
        stroke={OUTLINE}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />

      {/* 침대 프레임 */}
      <Path
        d="M10 59 L87 59 L87 76 L10 76 Z"
        fill={frame}
        stroke={OUTLINE}
        strokeWidth={1.7}
        strokeLinejoin="round"
      />

      {/* 매트리스 */}
      <Path
        d="M10 51 Q10 46 16 46 L81 46 Q87 46 87 52
           L87 62 L10 62 Z"
        fill="#FFF8EC"
        stroke={OUTLINE}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />

      {/* 베개 */}
      <Path
        d="M18 42 Q18 38 23 38 L42 38
           Q46 38 46 42 L46 51 L18 51 Z"
        fill={pillow}
        stroke={OUTLINE}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />

      {/* 이불 */}
      <Path
        d="M45 43 L78 43 Q82 43 82 48
           L82 61 L45 61 Z"
        fill={blanket}
        stroke={OUTLINE}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Path d="M45 43 L45 61" fill="none" stroke={OUTLINE} strokeWidth={1.2} />

      {/* 헤드보드 */}
      <Path
        d="M9 29 Q9 25 13 25 L21 25
           Q25 25 25 29 L25 62 L9 62 Z"
        fill={frame}
        stroke={OUTLINE}
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const Wardrobe = ({
  colorHex = "#B89AD9",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const body = primary ?? colorHex;
  const door = secondary ?? "#D8C5EF";
  const handle = accent ?? "#8064A2";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 본체 */}
      <Rect
        x={15}
        y={12}
        width={70}
        height={76}
        rx={3}
        fill={body}
        stroke={OUTLINE}
        strokeWidth={1.8}
      />

      {/* 왼쪽 문 */}
      <Rect
        x={20}
        y={18}
        width={28}
        height={64}
        rx={2}
        fill={door}
        stroke={OUTLINE}
        strokeWidth={1.4}
      />

      {/* 오른쪽 문 */}
      <Rect
        x={52}
        y={18}
        width={28}
        height={64}
        rx={2}
        fill={door}
        stroke={OUTLINE}
        strokeWidth={1.4}
      />

      {/* 문 안쪽 장식선 */}
      <Path
        d="M25 24 L43 24 L43 76 L25 76 Z"
        fill="none"
        stroke={body}
        strokeWidth={1.1}
      />
      <Path
        d="M57 24 L75 24 L75 76 L57 76 Z"
        fill="none"
        stroke={body}
        strokeWidth={1.1}
      />

      {/* 손잡이 */}
      <Circle
        cx={43}
        cy={49}
        r={2}
        fill={handle}
        stroke={OUTLINE}
        strokeWidth={0.7}
      />
      <Circle
        cx={57}
        cy={49}
        r={2}
        fill={handle}
        stroke={OUTLINE}
        strokeWidth={0.7}
      />

      {/* 아래 받침 */}
      <Path
        d="M18 85 L82 85 L80 90 L20 90 Z"
        fill={body}
        stroke={OUTLINE}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const Pencil = ({
  colorHex = "#F4C542",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const body = primary ?? colorHex;
  const band = secondary ?? "#E9A1A1";
  const lead = accent ?? "#555555";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="M25 73 L68 15 Q72 10 77 14 L84 19 Q88 23 84 28 L41 85 L25 91 Z"
        fill={body}
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M25 73 L41 85 L25 91 Z"
        fill="#F2D2A2"
        stroke={OUTLINE}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <Path
        d="M25 91 L29 82 L34 86 Z"
        fill={lead}
        stroke={OUTLINE}
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
      <Path d="M64 20 L78 31" fill="none" stroke={band} strokeWidth={4} />
      <Path d="M69 14 L85 26" fill="none" stroke={OUTLINE} strokeWidth={1.8} />
      <Path
        d="M40 73 L73 29"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={1.5}
        opacity={0.7}
      />
    </Svg>
  );
};

export const PaperClip = ({
  colorHex = "#8E9BA8",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const metal = primary ?? colorHex;
  const inner = secondary ?? "#FFFFFF";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="M38 24
           C38 10 61 10 61 25
           L61 69
           C61 88 34 88 34 69
           L34 31
           C34 22 47 22 47 32
           L47 66
           C47 71 40 71 40 66
           L40 37"
        fill="none"
        stroke={OUTLINE}
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M38 24
           C38 10 61 10 61 25
           L61 69
           C61 88 34 88 34 69
           L34 31
           C34 22 47 22 47 32
           L47 66
           C47 71 40 71 40 66
           L40 37"
        fill="none"
        stroke={metal}
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M43 34 L43 65"
        fill="none"
        stroke={inner}
        strokeWidth={1}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export const Scissors = ({
  colorHex = "#F08B83",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const handle = primary ?? colorHex;
  const blade = secondary ?? "#C6D0D8";
  const center = accent ?? "#E6B94A";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 손잡이 */}
      <Path
        d="M43 43 L28 17
           C22 7 8 13 11 25
           C14 36 26 40 39 49 Z"
        fill={handle}
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M48 48 L28 72
           C18 84 6 74 12 63
           C18 52 31 46 43 43 Z"
        fill={handle}
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* 손잡이 구멍 */}
      <Path
        d="M25 19 C20 16 17 21 20 26
           C23 31 29 33 32 31
           C35 28 30 22 25 19 Z"
        fill="#FFFFFF"
        stroke={OUTLINE}
        strokeWidth={1.3}
      />
      <Path
        d="M25 60 C19 59 15 65 18 69
           C21 73 27 71 30 67
           C33 64 29 61 25 60 Z"
        fill="#FFFFFF"
        stroke={OUTLINE}
        strokeWidth={1.3}
      />

      {/* 날 */}
      <Path
        d="M42 46 L88 15 L55 58 L47 54 Z"
        fill={blade}
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinejoin="round"
      />

      <Path
        d="M42 58 L88 83 L55 53 L47 49 Z"
        fill={blade}
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {/* 가운데 나사 */}
      <Circle
        cx={45}
        cy={50}
        r={4}
        fill={center}
        stroke={OUTLINE}
        strokeWidth={1.5}
      />
    </Svg>
  );
};

export const Pen = ({
  colorHex = "#65A9E8",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const body = primary ?? colorHex;
  const detail = secondary ?? "#DCEAF7";
  const ink = accent ?? "#3C4858";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 펜 몸통 */}
      <Path
        d="M18 77 L69 20 L81 31 L30 88 L17 91 Z"
        fill={body}
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* 펜촉 */}
      <Path
        d="M18 77 L30 88 L17 91 Z"
        fill={ink}
        stroke={OUTLINE}
        strokeWidth={1.7}
        strokeLinejoin="round"
      />

      {/* 펜 끝부분 */}
      <Path
        d="M69 20 L76 12 L88 23 L81 31 Z"
        fill={detail}
        stroke={OUTLINE}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />

      {/* 클립 */}
      <Path
        d="M70 19 L80 26 L84 21 L76 14"
        fill="none"
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* 몸통 장식선 */}
      <Path
        d="M29 72 L70 27"
        fill="none"
        stroke={detail}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <Path d="M39 68 L45 73" fill="none" stroke={OUTLINE} strokeWidth={1.5} />
    </Svg>
  );
};

export const Ruler = ({
  colorHex = "#F4D76B",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const body = primary ?? colorHex;
  const marks = secondary ?? "#806B35";
  const hole = accent ?? "#FFFFFF";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="M15 20 L84 20 Q88 20 88 24
           L88 43 L15 43 Q11 43 11 39 L11 24 Q11 20 15 20 Z"
        fill={body}
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {Array.from({ length: 11 }, (_, i) => (
        <Line
          key={i}
          x1={17 + i * 6.5}
          y1={21}
          x2={17 + i * 6.5}
          y2={i % 5 === 0 ? 33 : i % 2 === 0 ? 28 : 25}
          stroke={marks}
          strokeWidth={1.3}
        />
      ))}

      <Circle
        cx={20}
        cy={35}
        r={2.2}
        fill={hole}
        stroke={OUTLINE}
        strokeWidth={1}
      />
    </Svg>
  );
};

export const Sketchbook = ({
  colorHex = "#79B9E8",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const cover = primary ?? colorHex;
  const page = secondary ?? "#FFFDF5";
  const detail = accent ?? "#F4C542";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 책 표지 */}
      <Path
        d="M22 15 L77 9 Q82 9 83 15 L88 78
           Q88 83 83 84 L28 91 Q23 91 22 86 Z"
        fill={cover}
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* 속지 */}
      <Path
        d="M29 22 L76 17 L81 76 L34 82 Z"
        fill={page}
        stroke={OUTLINE}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />

      {/* 그림 */}
      <Circle cx={49} cy={39} r={9} fill={detail} />
      <Path
        d="M35 67 L47 51 L56 60 L63 52 L76 70 Z"
        fill="#80C995"
        stroke={OUTLINE}
        strokeWidth={1.2}
        strokeLinejoin="round"
      />

      {/* 스프링 */}
      {Array.from({ length: 7 }, (_, i) => (
        <Circle
          key={i}
          cx={22 + i * 0.3}
          cy={23 + i * 9}
          r={2.5}
          fill="#FFFFFF"
          stroke={OUTLINE}
          strokeWidth={1.2}
        />
      ))}
    </Svg>
  );
};

export const Notebook = ({
  colorHex = "#F2A7B8",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const cover = primary ?? colorHex;
  const paper = secondary ?? "#FFFDF8";
  const line = accent ?? "#83B9E8";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Path
        d="M24 12 L79 12 Q84 12 84 17 L84 83
           Q84 88 79 88 L24 88 Z"
        fill={cover}
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinejoin="round"
      />

      <Path
        d="M30 18 L77 18 L77 81 L30 81 Z"
        fill={paper}
        stroke={OUTLINE}
        strokeWidth={1.4}
      />

      {Array.from({ length: 5 }, (_, i) => (
        <Line
          key={i}
          x1={37}
          y1={31 + i * 10}
          x2={70}
          y2={31 + i * 10}
          stroke={line}
          strokeWidth={1.5}
        />
      ))}

      {Array.from({ length: 7 }, (_, i) => (
        <Circle
          key={i}
          cx={24}
          cy={20 + i * 10}
          r={2}
          fill="#FFFFFF"
          stroke={OUTLINE}
          strokeWidth={1}
        />
      ))}
    </Svg>
  );
};
export const Stapler = ({
  colorHex = "#8DA7D9",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const body = primary ?? colorHex;
  const base = secondary ?? "#AEB8C5";
  const detail = accent ?? "#56657A";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 아래 받침 */}
      <Path
        d="M14 70 L87 70 L87 79 L14 79 Z"
        fill={base}
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* 스테이플러 윗부분 */}
      {/* <Path
        d="M20 42 L72 42 Q81 42 84 51
           L88 68 L17 68 L15 54 Q14 44 20 42 Z"
        fill={body}
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinejoin="round"
      /> */}
      {/* 스테이플러 윗부분 */}
      <G transform="rotate(-30 23 54)">
        <Path
          d="
      M20 42
      L72 42
      Q81 42 84 51
      L88 68
      L17 68
      L15 54
      Q14 44 20 42
      Z
    "
          fill={body}
          stroke={OUTLINE}
          strokeWidth={2}
          strokeLinejoin="round"
        />

        {/* 윗면 장식 */}
        <Path
          d="M23 48 L70 48 Q77 48 79 55"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </G>

      {/* 윗면 장식 */}
      <Path
        d="M23 48 L70 48 Q77 48 79 55"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={2}
        strokeLinecap="round"
      />

      {/* 금속 연결부 */}
      <Rect
        x={20}
        y={65}
        width={64}
        height={5}
        rx={1}
        fill={detail}
        stroke={OUTLINE}
        strokeWidth={1.2}
      />

      {/* 회전축 */}
      <Circle
        cx={23}
        cy={54}
        r={3}
        fill={base}
        stroke={OUTLINE}
        strokeWidth={1.3}
      />
    </Svg>
  );
};

export const Bulldozer = ({
  colorHex = "#E9B83F",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const body = primary ?? colorHex;
  const track = secondary ?? "#68727D";
  const detail = accent ?? "#F6D66B";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 무한궤도 */}
      <Rect
        x={12}
        y={65}
        width={65}
        height={19}
        rx={8}
        fill={track}
        stroke={OUTLINE}
        strokeWidth={2}
      />
      <Path d="M20 74 H69" stroke="#D8DEE3" strokeWidth={2} />
      {[22, 35, 48, 61].map((x) => (
        <Circle
          key={x}
          cx={x}
          cy={75}
          r={4}
          fill="#AAB3BC"
          stroke={OUTLINE}
          strokeWidth={1.2}
        />
      ))}

      {/* 차체 */}
      <Path
        d="M22 42 L58 42 L72 64 L20 64 Z"
        fill={body}
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* 운전석 */}
      <Path
        d="M29 24 L50 24 L58 43 L27 43 Z"
        fill={detail}
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M34 29 L47 29 L52 39 L32 39 Z"
        fill="#D9F0F7"
        stroke={OUTLINE}
        strokeWidth={1.3}
      />

      {/* 앞쪽 밀기 판 */}
      <Path
        d="M69 47 L82 44 L89 69 L75 73 Z"
        fill={body}
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M73 70 L91 66 L91 74 L75 79 Z"
        fill={track}
        stroke={OUTLINE}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />

      {/* 뒤쪽 연결부 */}
      <Path
        d="M20 58 L12 62 L12 69 L20 69"
        fill={body}
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const DumpTruck = ({
  colorHex = "#E9B83F",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const body = primary ?? colorHex;
  const cabin = secondary ?? "#F3C94F";
  const window = accent ?? "#BCE6F5";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 바퀴 */}
      {[27, 43, 77].map((x) => (
        <G key={x}>
          <Circle
            cx={x}
            cy={73}
            r={9}
            fill="#555E68"
            stroke={OUTLINE}
            strokeWidth={1.8}
          />
          <Circle
            cx={x}
            cy={73}
            r={4}
            fill="#DCE1E5"
            stroke={OUTLINE}
            strokeWidth={1.2}
          />
        </G>
      ))}

      {/* 적재함 */}
      <Path
        d="M12 29 L65 20 L72 51 L20 61 Z"
        fill={body}
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M18 35 L60 28 L64 46 L22 54 Z"
        fill={cabin}
        stroke={OUTLINE}
        strokeWidth={1.3}
        strokeLinejoin="round"
      />

      {/* 적재함 뒤쪽 */}
      <Path
        d="M65 20 L72 24 L78 53 L72 51 Z"
        fill={cabin}
        stroke={OUTLINE}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />

      {/* 운전석 */}
      <Path
        d="M65 43 L83 43 L91 55 L91 67 L69 67 Z"
        fill={cabin}
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M72 47 L81 47 L86 55 L72 55 Z"
        fill={window}
        stroke={OUTLINE}
        strokeWidth={1.3}
      />

      {/* 차체 */}
      <Path
        d="M18 61 L91 61 L91 69 L18 69 Z"
        fill={body}
        stroke={OUTLINE}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const Crane = ({
  colorHex = "#E9B83F",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const body = primary ?? colorHex;
  const cabin = secondary ?? "#F6D66B";
  const hook = accent ?? "#68727D";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 바퀴 */}
      {[25, 42, 70].map((x) => (
        <G key={x}>
          <Circle
            cx={x}
            cy={78}
            r={7}
            fill="#555E68"
            stroke={OUTLINE}
            strokeWidth={1.8}
          />
          <Circle
            cx={x}
            cy={78}
            r={3}
            fill="#DCE1E5"
            stroke={OUTLINE}
            strokeWidth={1}
          />
        </G>
      ))}

      {/* 차체 */}
      <Path
        d="M12 59 L76 59 L84 72 L12 72 Z"
        fill={body}
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* 운전석 */}
      <Path
        d="M16 42 L34 42 L39 60 L16 60 Z"
        fill={cabin}
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M20 46 L30 46 L33 55 L20 55 Z"
        fill="#C9EAF6"
        stroke={OUTLINE}
        strokeWidth={1.2}
      />

      {/* 크레인 붐 */}
      <Path
        d="M48 59 L58 59 L82 17 L75 13 Z"
        fill={body}
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M56 45 L74 28 M62 33 L78 35 M68 24 L74 40"
        fill="none"
        stroke={OUTLINE}
        strokeWidth={1.3}
      />

      {/* 붐 끝과 와이어 */}
      <Circle
        cx={79}
        cy={16}
        r={4}
        fill={cabin}
        stroke={OUTLINE}
        strokeWidth={1.5}
      />
      <Path d="M79 20 L79 43" stroke={hook} strokeWidth={1.8} />
      <Path
        d="M79 43 C79 51 89 50 86 43"
        fill="none"
        stroke={hook}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export const HighSpeedTrain = ({
  colorHex = "#58A9D9",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const body = primary ?? colorHex;
  const stripe = secondary ?? "#F5F4EA";
  const window = accent ?? "#24465D";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 열차 몸체 */}
      <Path
        d="M14 69 L14 39 Q15 17 39 15
        L79 23 Q88 26 88 39 L88 69 Z"
        fill={body}
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* 유선형 앞부분 */}
      <Path
        d="M14 43 Q15 17 39 15
        L49 18 L40 48 L14 53 Z"
        fill={stripe}
        stroke={OUTLINE}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />

      {/* 앞 유리창 */}
      <Path
        d="M22 39 Q25 25 39 23 L42 25 L36 40 Z"
        fill={window}
        stroke={OUTLINE}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />

      {/* 옆 창문 */}
      <Path
        d="M49 27 L61 29 L61 38 L46 36 Z"
        fill={window}
        stroke={OUTLINE}
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
      <Path
        d="M66 31 L78 33 L78 41 L65 39 Z"
        fill={window}
        stroke={OUTLINE}
        strokeWidth={1.2}
        strokeLinejoin="round"
      />

      {/* 하단 띠 */}
      <Path
        d="M15 55 L87 55 L87 64 L15 64 Z"
        fill={stripe}
        stroke={OUTLINE}
        strokeWidth={1.2}
      />

      {/* 바퀴 */}
      {[19, 33, 64, 78].map((x) => (
        <Circle
          key={x}
          cx={x}
          cy={70}
          r={5}
          fill="#454D56"
          stroke={OUTLINE}
          strokeWidth={1.4}
        />
      ))}

      {/* 레일 */}
      <Path
        d="M9 79 L92 79 M15 83 L87 83"
        fill="none"
        stroke="#777F87"
        strokeWidth={2}
      />
    </Svg>
  );
};

export const FreightTrain = ({
  colorHex = "#6BAA83",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const body = primary ?? colorHex;
  const cargo = secondary ?? "#E8BD73";
  const window = accent ?? "#C6EAF6";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 화물칸 */}
      <Rect
        x={32}
        y={25}
        width={53}
        height={39}
        rx={2}
        fill={body}
        stroke={OUTLINE}
        strokeWidth={2}
      />
      {[43, 55, 67, 79].map((x) => (
        <Path
          key={x}
          d={`M${x} 27 L${x} 62`}
          stroke={OUTLINE}
          strokeWidth={1.5}
        />
      ))}

      {/* 화물 적재물 */}
      <Path
        d="M36 25 L42 17 L52 17 L57 25 Z"
        fill={cargo}
        stroke={OUTLINE}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Path
        d="M58 25 L64 19 L74 19 L79 25 Z"
        fill={cargo}
        stroke={OUTLINE}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />

      {/* 기관차 앞부분 */}
      <Path
        d="M10 40 L32 40 L32 64 L10 64 Z"
        fill={body}
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M14 44 L27 44 L27 52 L14 52 Z"
        fill={window}
        stroke={OUTLINE}
        strokeWidth={1.3}
      />

      {/* 연결부 */}
      <Path
        d="M8 64 L89 64 L89 69 L8 69 Z"
        fill="#7C858E"
        stroke={OUTLINE}
        strokeWidth={1.5}
      />

      {/* 바퀴 */}
      {[19, 39, 59, 79].map((x) => (
        <Circle
          key={x}
          cx={x}
          cy={73}
          r={5}
          fill="#515963"
          stroke={OUTLINE}
          strokeWidth={1.5}
        />
      ))}

      {/* 레일 */}
      <Path
        d="M6 81 L94 81 M10 85 L90 85"
        fill="none"
        stroke="#777F87"
        strokeWidth={2}
      />
    </Svg>
  );
};

export const SteamLocomotive = ({
  colorHex = "#4D9B79",
  primary,
  secondary,
  accent,
  size = 75,
}: ItemSvgProps) => {
  const body = primary ?? colorHex;
  const detail = secondary ?? "#D9B75C";
  const window = accent ?? "#C9EAF6";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 굴뚝 */}
      <Path
        d="M21 28 L30 28 L33 41 L18 41 Z"
        fill={detail}
        stroke={OUTLINE}
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
      <Path
        d="M18 27 L32 27 L32 31 L18 31 Z"
        fill={body}
        stroke={OUTLINE}
        strokeWidth={1.5}
      />

      {/* 보일러 */}
      <Path
        d="M15 39 Q15 32 24 32 L53 32
        Q61 32 61 41 L61 62 L15 62 Z"
        fill={body}
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* 앞쪽 원형 보일러 면 */}
      <Circle
        cx={17}
        cy={49}
        r={8}
        fill={detail}
        stroke={OUTLINE}
        strokeWidth={1.8}
      />

      {/* 운전실 */}
      <Path
        d="M58 29 L75 29 L82 40 L82 62 L59 62 Z"
        fill={body}
        stroke={OUTLINE}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M63 34 L74 34 L78 42 L63 42 Z"
        fill={window}
        stroke={OUTLINE}
        strokeWidth={1.3}
        strokeLinejoin="round"
      />

      {/* 하단 프레임 */}
      <Path
        d="M10 62 L87 62 L87 69 L10 69 Z"
        fill={detail}
        stroke={OUTLINE}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />

      {/* 큰 구동 바퀴 */}
      {[30, 48].map((x) => (
        <G key={x}>
          <Circle
            cx={x}
            cy={70}
            r={9}
            fill="#525B64"
            stroke={OUTLINE}
            strokeWidth={1.7}
          />
          <Circle
            cx={x}
            cy={70}
            r={4}
            fill="#D5DCE1"
            stroke={OUTLINE}
            strokeWidth={1.2}
          />
        </G>
      ))}

      {/* 작은 바퀴 */}
      <Circle
        cx={75}
        cy={72}
        r={5}
        fill="#525B64"
        stroke={OUTLINE}
        strokeWidth={1.5}
      />
      <Circle cx={75} cy={72} r={2} fill="#D5DCE1" />

      {/* 레일 */}
      <Path
        d="M7 83 L93 83 M12 87 L88 87"
        fill="none"
        stroke="#777F87"
        strokeWidth={2}
      />
    </Svg>
  );
};

export const CATEGORY_ITEM_SVGS = {
  steamLocomotive: SteamLocomotive,
  freightTrain: FreightTrain,
  highSpeedTrain: HighSpeedTrain,
  crane: Crane,
  dumpTruck: DumpTruck,
  bulldozer: Bulldozer,
  stapler: Stapler,
  notebook: Notebook,
  sketchbook: Sketchbook,
  ruler: Ruler,
  pen: Pen,
  scissors: Scissors,
  paperclip: PaperClip,
  pencil: Pencil,
  wardrobe: Wardrobe,
  bed: Bed,
  sofa: Sofa,
  chair: Chair,
  desk: Desk,
  milk: Milk,
  juiceBox: JuiceBox,
  sodaBottle: SodaBottle,
  milkBottle: MilkBottle,
  drinkingGlass: DrinkingGlass,
  drinkCan: DrinkCan,
  juice: Juice,
  waterBottle: WaterBottle,
  rainbow: Rainbow,
  flower1: Flower1,
  gimbap1: Gimbap1,
  recorder: Recorder,
  maracas: Maracas,
  trumpet: Trumpet,
  harp: Harp,
  guitar: Guitar,
  drumSet: DrumSet,
  bongo: Bongo,
  keyboard: Keyboard,
  violin: Violin,
  piano: Piano,
  tree: Tree,
  crescentMoon: CrescentMoon,
  cloud: Cloud,
  cactus: Cactus,
  flower: Flower,
  sunflower: Sunflower,
  cottonCandy: CottonCandy,
  cupcake: Cupcake,
  sweetPotato: SweetPotato,
  blueberry: Blueberry,
  cherry: Cherry,
  fish: Fish,
  koala: Koala,
  fox: Fox,
  snail: Snail,
  bee: Bee,
  ladybug: Ladybug,
  butterfly: Butterfly,
  cruise: Cruise,
  drone: Drone,
  ambulance: Ambulance,
  fireTruck: FireTruck,
  scooter: Scooter,
  taxi: Taxi,
  sneakers: Sneakers,
  dressShoes: DressShoes,

  slippers: Slippers,
  flipFlops: FlipFlops,
  rainBoots: RainBoots,
  furBoots: FurBoots,
  boots: Boots,
  tShirt: TShirt,
  shortSleeveShirt: ShortSleeveShirt,
  tankTop: TankTop,
  shortSleeve: ShortSleeve,

  shorts: Shorts,
  longPants: LongPants,
  skirt: Skirt,
  dress: Dress,
  hanbok: Hanbok,
  jumper: Jumper,
  coat: Coat,
  bucketHat: BucketHat,
  beret: Beret,
  winterHat: WinterHat,
  baseballCap: BaseballCap,

  strawHat: StrawHat,

  starFlower: StarFlower,
  heartOwl: HeartOwl,
  heartKeychain: HeartKeychain,
  heartLeaf: HeartLeaf,
  heartChocolate: HeartChocolate,
  heartSoap: HeartSoap,
  heartFrame: HeartFrame,
  shootingStar: ShootingStar,

  starHairpin: StarHairpin,

  triangleCheese: TriangleCheese,
  triangleSign: TriangleSign,

  medal: Medal,
  starNecklace: StarNecklace,
  starSunglasses: StarSunglasses,
  starOrnament: StarOrnament,
  starCake: StarCake,
  starClock: StarClock,
  starButton: StarButton,
  starfish: Starfish,
  starPillow: StarPillow,
  starWand: StarWand,
  starBalloon1: StarBalloon1,
  starBalloon: StarBalloon,
  starCookie: StarCookie,

  heartNecklace: HeartNecklace,
  heartGem: HeartGem,
  heartSunglasses: HeartSunglasses,
  heartClock: HeartClock,
  heartButton: HeartButton,
  heartCake: HeartCake,
  heartPillow: HeartPillow,
  heartLollipop: HeartLollipop,
  heartBalloon: HeartBalloon,
  heartCookie: HeartCookie,

  pizzaSlice: PizzaSlice,
  watermelonSlice: WatermelonSlice,
  triangleCookie: TriangleCookie,
  sailboat: Sailboat,
  mountain: Mountain,
  tent: Tent,
  pyramid: Pyramid,
  triangleKimbap: TriangleKimbap,
  triangleSandwich: TriangleSandwich,
  flag: Flag,
  christmasTree: ChristmasTree,
  partyHat: PartyHat,
  triangleInstrument: TriangleInstrument,
  triangleRuler: TriangleRuler,

  frame: Frame,
  switch: Switch,
  remoteControl: RemoteControl,
  phone: Phone,
  squareSunglasses: SquareSunglasses,
  squareCakeSlice: SquareCakeSlice,
  calculator: Calculator,
  laptop: Laptop,
  refrigerator: Refrigerator,
  bookshelf: Bookshelf,
  door: Door,
  squareClock: SquareClock,
  giftBox1: GiftBox1,
  giftBox: GiftBox,
  tv: Tv,
  pillow: Pillow,
  microwave: Microwave,

  bread: Bread,
  calendar: Calendar,
  window1: Window1,
  window: Window,
  book: Book,
  box: Box,
  chocolateBar: ChocolateBar,

  envelop: Envelop,
  sun: Sun,
  roundBalloon: RoundBalloon,
  fullMoon: FullMoon,
  plate: Plate,
  tennisBall: TennisBall,
  baseball: Baseball,
  basketball: Basketball,
  sunglasses: Sunglasses,
  lollipop: Lollipop,
  wheel: Wheel,
  circleClock: CircleClock,
  donut1: Donut1,
  button1: Button1,
  button2: Button2,

  dog: Dog,
  cat: Cat,
  rabbit: Rabbit,
  chicken: Chicken,
  duck: Duck,
  penguin: Penguin,
  whale: Whale,
  shark: Shark,
  octopus: Octopus,
  squid: Squid,

  apple: Apple,
  banana: Banana,
  strawberry: Strawberry,
  watermelon: Watermelon,
  carrot: Carrot,
  cucumber: Cucumber,
  mushroom: Mushroom,
  tomato: Tomato,
  broccoli: Broccoli,
  corn: Corn,

  rice: Rice,
  gimbap: Gimbap,
  pizza: Pizza,
  hamburger: Hamburger,
  cake: Cake,
  cookie: Cookie,
  iceCream: IceCream,

  car: Car,
  bus: Bus,
  train: Train,
  airplane: Airplane,
  ship: Ship,

  bicycle: Bicycle,
  helicopter: Helicopter,
  boat: Boat,

  candy: Candy,
  donut: Donut,
  chocolate: Chocolate,

  pig: Pig,
  bear: Bear,
  cow: Cow,

  owl: Owl,
  parrot: Parrot,
  sparrow: Sparrow,

  jellyfish: Jellyfish,
  crab: Crab,
  stingray: Stingray,

  grape: Grape,
  tangerine: Tangerine,
  peach: Peach,

  eggplant: Eggplant,
  chili: Chili,
  pumpkin: Pumpkin,

  soup: Soup,
  sandwich: Sandwich,
  dumpling: Dumpling,

  submarine: Submarine,
  rocket: Rocket,
  hotAirBalloon: HotAirBalloon,
  truck: Truck,
  excavator: Excavator,
  subway: Subway,
  cementMixer: CementMixer,
  ball: Ball,
  heartHairpin: HeartHairpin,
} as const;

// ============================================================
// RENDER CLASSIFICATION ITEM
// ============================================================

type SortingObjectTypes =
  | ColorSortingObject
  | ShapeSortingObject
  | CategorySortingObject
  | SizeSortingObject;
export const RenderClassificationItemSvg = ({
  itemId,
  colorHex,
  primary,
  secondary,
  accent,
  pattern,
  size,
}: ItemSvgProps & { itemId?: string }) => {
  const ItemComponent = itemId
    ? CATEGORY_ITEM_SVGS[itemId as keyof typeof CATEGORY_ITEM_SVGS]
    : undefined;

  if (!ItemComponent) {
    return (
      <Svg width={size ?? 100} height={size ?? 100} viewBox="0 0 100 100">
        <Circle
          cx="50"
          cy="50"
          r="30"
          fill={primary ?? colorHex ?? DEFAULT_COLOR}
          stroke={OUTLINE}
          strokeWidth="3"
        />
      </Svg>
    );
  }

  return (
    <ItemComponent
      colorHex={colorHex}
      primary={primary}
      secondary={secondary}
      accent={accent}
      pattern={pattern}
      size={size}
    />
  );
};

export const RenderClassificationObjectSvg = ({
  object,
  primary,
  secondary,
  accent,
  size = 95,
}: {
  object: SortingObjectTypes;
  primary?: string;
  secondary?: string;
  accent?: string;
  size?: number;
}) => {
  // ----------------------------------------------------------
  // 1. 새로 추가된 단순 도형(SimpleShapeObject)인 경우
  // ----------------------------------------------------------
  if ("kind" in object && object.kind === "simple_shape") {
    return (
      <RenderBasicShapeSvg
        shapeId={object.shapeId}
        colorHex={primary}
        size={size}
      />
    );
  }

  // ----------------------------------------------------------
  // 2. 새로 추가된 ShapeItemObject인 경우 (기존 렌더러 그대로 활용!)
  // ----------------------------------------------------------
  if ("kind" in object && object.kind === "item") {
    return (
      <RenderClassificationItemSvg
        itemId={object.itemId}
        primary={primary}
        secondary={secondary}
        accent={accent}
        size={size}
      />
    );
  }

  // ----------------------------------------------------------
  // 3. 기존에 아주 잘 돌아가고 있던 ColorSortingObject 처리 영역
  // ----------------------------------------------------------
  const colorObj = object as ColorSortingObject;

  if (colorObj.itemId.startsWith("simple-")) {
    return (
      <RenderBasicShapeSvg
        shapeId={colorObj.shape}
        colorHex={primary}
        size={size}
      />
    );
  }

  return (
    <RenderClassificationItemSvg
      itemId={colorObj.itemId}
      primary={primary}
      secondary={secondary}
      accent={accent}
      size={size}
    />
  );
};

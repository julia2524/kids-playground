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

const DEFAULT_COLOR = "#FFD166";

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
        fill={stemColor}
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
export const Gimbap = ({
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
        fill={cheeseColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <Path
        d="M14 78 Q50 90 86 78 L90 82 Q50 96 10 82 Z"
        fill={doughColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      <Circle
        cx="46"
        cy="38"
        r="6"
        fill={toppingColor}
        stroke={OUTLINE}
        strokeWidth="1.5"
      />

      <Circle
        cx="62"
        cy="52"
        r="6"
        fill={toppingColor}
        stroke={OUTLINE}
        strokeWidth="1.5"
      />

      <Circle
        cx="40"
        cy="60"
        r="6"
        fill={toppingColor}
        stroke={OUTLINE}
        strokeWidth="1.5"
      />

      <Circle
        cx="55"
        cy="70"
        r="5"
        fill={toppingColor}
        stroke={OUTLINE}
        strokeWidth="1.5"
      />
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
        fill="#E0B87A"
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
        fill="#E0B87A"
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
        fill="#BBDEFB"
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
        fill="#BBDEFB"
        stroke={OUTLINE}
        strokeWidth="2"
      />

      <Rect
        x="36"
        y="32"
        width="16"
        height="14"
        rx="2"
        fill="#BBDEFB"
        stroke={OUTLINE}
        strokeWidth="2"
      />

      <Rect
        x="56"
        y="32"
        width="16"
        height="14"
        rx="2"
        fill="#BBDEFB"
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

      <Circle
        cx="34"
        cy="42"
        r="10"
        fill="#F5F5F5"
        stroke={OUTLINE}
        strokeWidth="3"
      />

      <Circle
        cx="66"
        cy="42"
        r="10"
        fill="#F5F5F5"
        stroke={OUTLINE}
        strokeWidth="3"
      />

      <Rect
        x="24"
        y="58"
        width="52"
        height="8"
        rx="2"
        fill={stripeColor}
        opacity="0.9"
      />

      <Circle
        cx="26"
        cy="80"
        r="7"
        fill={trimColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
      />

      <Circle
        cx="44"
        cy="80"
        r="7"
        fill={trimColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
      />

      <Circle
        cx="62"
        cy="80"
        r="7"
        fill={trimColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
      />

      <Circle
        cx="78"
        cy="80"
        r="7"
        fill={trimColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
      />
    </Svg>
  );
};

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
        stroke={OUTLINE}
        strokeWidth="4"
      />
      <Circle
        cx="75"
        cy="68"
        r="17"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* wheel inner highlight */}
      <Circle cx="25" cy="68" r="13" fill={detailColor} opacity="0.55" />
      <Circle cx="75" cy="68" r="13" fill={detailColor} opacity="0.55" />

      {/* frame */}
      <Path
        d="M25 68 L42 40 L57 68 L25 68 M42 40 L68 40 L57 68 M42 40 L35 68"
        fill="none"
        stroke={frameColor}
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
  const bodyColor = primary ?? colorHex;
  const windowColor = secondary ?? "#BBDEFB";
  const detailColor = accent ?? "#1565C0";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 잠망경 */}
      <Line
        x1="57"
        y1="34"
        x2="57"
        y2="21"
        stroke={detailColor}
        strokeWidth="4"
        strokeLinecap="round"
      />

      <Path
        d="M57 21 Q57 16 64 16"
        fill="none"
        stroke={detailColor}
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* 잠망경 받침 */}
      <Rect
        x="51"
        y="31"
        width="12"
        height="8"
        rx="2"
        fill={detailColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
      />

      {/* 몸체 */}
      <Path
        d="M13 58
           Q13 39 30 35
           L70 35
           Q87 39 87 58
           Q87 76 70 80
           L30 80
           Q13 76 13 58 Z"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
      />

      {/* 창문 */}
      <Circle
        cx="31"
        cy="56"
        r="7"
        fill={windowColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      <Circle
        cx="50"
        cy="56"
        r="7"
        fill={windowColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      <Circle
        cx="69"
        cy="56"
        r="7"
        fill={windowColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      {/* 창문 반짝임 */}
      <Circle cx="29" cy="54" r="2" fill={WHITE} />
      <Circle cx="48" cy="54" r="2" fill={WHITE} />
      <Circle cx="67" cy="54" r="2" fill={WHITE} />

      {/* 아래 지느러미 */}
      <Path
        d="M43 79 L39 87 L49 81 Z"
        fill={detailColor}
        stroke={OUTLINE}
        strokeWidth="2.5"
      />

      {/* 뒤쪽 프로펠러 */}
      <Line
        x1="87"
        y1="50"
        x2="94"
        y2="66"
        stroke={detailColor}
        strokeWidth="3"
        strokeLinecap="round"
      />

      <Line
        x1="94"
        y1="50"
        x2="87"
        y2="66"
        stroke={detailColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </Svg>
  );
};
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
        fill={accentColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* 오른쪽 날개 */}
      <Path
        d="M66 64 L80 78 L64 75 Z"
        fill={accentColor}
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
        fill="#FFB300"
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
        stroke={accentColor}
        strokeWidth="7"
        opacity="0.8"
      />

      <Path
        d="M65 13 Q72 36 63 60"
        fill="none"
        stroke={accentColor}
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
      {/* 차량 몸체 */}
      <Path
        d="M15 70
           L15 37
           Q15 28 25 28
           L75 28
           Q85 28 85 37
           L85 70
           Z"
        fill={bodyColor}
        stroke={OUTLINE}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* 넓은 전면 유리 */}
      <Path
        d="M25 35
           L75 35
           Q79 35 79 40
           L79 52
           L21 52
           L21 40
           Q21 35 25 35 Z"
        fill={windowColor}
        stroke={OUTLINE}
        strokeWidth="3"
      />

      {/* 중앙 전면 구분 */}
      <Line
        x1="50"
        y1="35"
        x2="50"
        y2="52"
        stroke={detailColor}
        strokeWidth="2.5"
      />

      {/* 하단 띠 */}
      <Rect x="16" y="55" width="68" height="8" fill={detailColor} />

      {/* 문 */}
      <Line
        x1="34"
        y1="63"
        x2="34"
        y2="72"
        stroke={secondary ?? "#FFFFFF"}
        strokeWidth="2"
      />

      <Line
        x1="66"
        y1="63"
        x2="66"
        y2="72"
        stroke={secondary ?? "#FFFFFF"}
        strokeWidth="2"
      />

      {/* 바퀴 */}
      <Circle
        cx="29"
        cy="76"
        r="8"
        fill="#333"
        stroke={OUTLINE}
        strokeWidth="3"
      />

      <Circle
        cx="71"
        cy="76"
        r="8"
        fill="#333"
        stroke={OUTLINE}
        strokeWidth="3"
      />

      {/* 전조등 */}
      <Circle
        cx="25"
        cy="58"
        r="3"
        fill={secondary ?? "#FFF9C4"}
        stroke={OUTLINE}
        strokeWidth="1.5"
      />

      <Circle
        cx="75"
        cy="58"
        r="3"
        fill={secondary ?? "#FFF9C4"}
        stroke={OUTLINE}
        strokeWidth="1.5"
      />
    </Svg>
  );
};
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
  size = 95,
}: ItemSvgProps) => {
  const fruitColor = primary ?? colorHex;
  const highlightColor = secondary ?? "#FBE9E7";
  const accentColor = accent ?? "#E64A19";

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* 🍑 1. 더 통통하고 뚱뚱해진 복숭아 몸통 */}
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
        fill={huskColor}
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
        fill={huskColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <Path
        d="M80 84 C75 65 78 48 82 40 C70 52 65 70 55 88 Z"
        fill={huskColor}
        stroke={OUTLINE}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* 하단 줄기 단면 */}
      <Path
        d="M45 87 L46 93 C46 95 54 95 54 93 L55 87 Z"
        fill={huskColor}
        stroke={OUTLINE}
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
export const CATEGORY_ITEM_SVGS = {
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

  // 🆕 추가
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
} as const;

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
      <Svg width="100" height="100" viewBox="0 0 100 100">
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

/* =========================================================
 * 사용 예시 — 기존 RenderCategoryItemSvg 그대로 사용 가능
 * ---------------------------------------------------------
 * import { Dog, Apple, Pizza } from "./ItemSvgIcons";
 *
 * // CATEGORY_ITEM_SVGS, RenderCategoryItemSvg 는 기존 코드 그대로 두면 됩니다.
 * // <ItemComponent colorHex={finalColor} /> 호출부가 바뀔 필요 없어요.
 * ======================================================= */

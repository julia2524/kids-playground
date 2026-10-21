import React from "react";
import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  Line,
  LinearGradient,
  Path,
  Polygon,
  Rect,
  Stop,
} from "react-native-svg";

export type ThingsCategoryKind =
  | "things"
  | "musical_instrument"
  | "clock"
  | "stationery"
  | "electronics"
  | "furniture"
  | "ball"
  | "balloon"
  | "toys_sports";

type ThingsCategoryBackgroundProps = {
  category: ThingsCategoryKind;
  width?: number | string;
  height?: number | string;
};

const PALETTE: Record<
  ThingsCategoryKind,
  { edge: string; pale: string; accent: string }
> = {
  things: { edge: "#A98AE8", pale: "#F5EFFF", accent: "#D8C7F7" },
  musical_instrument: { edge: "#F0B94F", pale: "#FFF5D9", accent: "#F6D98A" },
  clock: { edge: "#F17F9B", pale: "#FFF0F4", accent: "#F8C3D0" },
  stationery: { edge: "#48BFB6", pale: "#E9FAF7", accent: "#A8E6DB" },
  electronics: { edge: "#4DAFE6", pale: "#EAF7FF", accent: "#B4E2F8" },
  furniture: { edge: "#65B58C", pale: "#EDF9F0", accent: "#BCE3C8" },
  ball: { edge: "#25BDB6", pale: "#E8FBF8", accent: "#9CE4D9" },
  balloon: { edge: "#F17CA4", pale: "#FFF0F6", accent: "#F8BED3" },
  toys_sports: { edge: "#F0AC48", pale: "#FFF5E2", accent: "#F8D18C" },
};

export function MusicScene() {
  return (
    <>
      <Defs>
        <LinearGradient id="musicSceneBg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFFDF9" />
          <Stop offset="1" stopColor="#FFF7EE" />
        </LinearGradient>

        <LinearGradient id="musicPianoBody" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#756960" />
          <Stop offset="1" stopColor="#59524C" />
        </LinearGradient>

        <LinearGradient id="musicTrumpetGold" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FFF3B0" />
          <Stop offset="1" stopColor="#FFE885" />
        </LinearGradient>
      </Defs>

      {/* 기본 바탕 */}
      <Rect
        x={0}
        y={0}
        width={406}
        height={326}
        rx={14}
        fill="url(#musicSceneBg)"
      />

      {/* ================================================== */}
      {/* 배경 오선지: 우측 상단 */}
      {/* ================================================== */}
      <G
        fill="none"
        stroke="#E2DCD5"
        strokeWidth={0.8}
        opacity={0.7}
        strokeLinecap="round"
      >
        <Path d="M178 25 Q233 18 308 26" />
        <Path d="M179 32 Q237 25 308 33" />
        <Path d="M180 39 Q239 32 308 40" />
        <Path d="M181 46 Q240 39 308 47" />
        <Path d="M182 53 Q242 46 308 54" />
      </G>

      {/* 배경 오선지: 좌측 하단 */}
      <G
        fill="none"
        stroke="#E2DCD5"
        strokeWidth={0.8}
        opacity={0.7}
        strokeLinecap="round"
      >
        <Path d="M10 188 Q65 180 139 188" />
        <Path d="M10 195 Q67 187 139 195" />
        <Path d="M10 202 Q69 194 139 202" />
        <Path d="M10 209 Q70 201 139 209" />
        <Path d="M10 216 Q72 208 139 216" />
      </G>

      {/* ================================================== */}
      {/* 모서리의 파스텔 음표 장식 */}
      {/* ================================================== */}

      {/* 상단 중앙의 라벤더 8분음표 */}
      <G transform="translate(105 20) rotate(-12)" opacity={0.75}>
        <Ellipse
          cx={0}
          cy={12}
          rx={4}
          ry={2.8}
          fill="#CBB3E8"
          transform="rotate(-25 0 12)"
        />
        <Path d="M3 11 L4 0 Q13 1 11 8 Q9 4 4 4" fill="#CBB3E8" />
      </G>

      {/* 상단 민트색 음표 */}
      <G transform="translate(190 12)" opacity={0.75}>
        <Ellipse
          cx={0}
          cy={12}
          rx={4}
          ry={2.8}
          fill="#A8D8B9"
          transform="rotate(-25 0 12)"
        />
        <Path d="M3 11 V0 Q13 1 10 8 Q8 4 3 4" fill="#A8D8B9" />
      </G>

      {/* 우측 가장자리의 핑크색 16분음표 */}
      <G transform="translate(300 66) rotate(12)" opacity={0.75}>
        <Ellipse
          cx={-2}
          cy={13}
          rx={3.5}
          ry={2.5}
          fill="#FDE4EC"
          transform="rotate(-25 -2 13)"
        />
        <Ellipse
          cx={7}
          cy={11}
          rx={3.5}
          ry={2.5}
          fill="#FDE4EC"
          transform="rotate(-25 7 11)"
        />
        <Path
          d="M1 12 V0 M10 10 V-2 M1 0 Q8 -1 10 3"
          fill="none"
          stroke="#E6B8C7"
          strokeWidth={1.7}
          strokeLinecap="round"
        />
      </G>

      {/* 우측 상단의 작은 노란 음표 */}
      <G transform="translate(224 59)" opacity={0.75}>
        <Ellipse
          cx={0}
          cy={7}
          rx={3.2}
          ry={2.2}
          fill="#FFE885"
          transform="rotate(-25 0 7)"
        />
        <Path d="M3 6 V-4 Q11 -3 9 2 Q7 -1 3 0" fill="#FFE885" />
      </G>

      {/* 좌측 하단의 민트 음표 */}
      <G transform="translate(104 222) rotate(-8)" opacity={0.75}>
        <Ellipse
          cx={0}
          cy={0}
          rx={3.6}
          ry={2.5}
          fill="#A8D8B9"
          transform="rotate(-25 0 0)"
        />
        <Path d="M3 -1 V-12 Q12 -11 10 -5 Q7 -8 3 -8" fill="#A8D8B9" />
      </G>

      {/* 하단의 작은 라벤더 음표 */}
      <G transform="translate(137 188) rotate(10)" opacity={0.7}>
        <Ellipse
          cx={0}
          cy={7}
          rx={3}
          ry={2}
          fill="#CBB3E8"
          transform="rotate(-25 0 7)"
        />
        <Path d="M3 6 V-3 Q10 -2 8 2 Q6 0 3 1" fill="#CBB3E8" />
      </G>

      {/* 작은 반짝임 */}
      <G
        stroke="#E8CF9A"
        strokeWidth={1.2}
        strokeLinecap="round"
        opacity={0.75}
      >
        <Path d="M91 55 V61 M88 58 H94" />
        <Path d="M226 19 V24 M223.5 21.5 H228.5" />
        <Path d="M87 178 V183 M84.5 180.5 H89.5" />
        <Path d="M294 145 V150 M291.5 147.5 H296.5" />
      </G>

      {/* ================================================== */}
      {/* 좌측 상단: 미니 그랜드 피아노 */}
      {/* ================================================== */}
      <G transform="translate(13 27) scale(0.65)" opacity={0.8}>
        {/* 바닥 그림자 */}
        <Ellipse cx={44} cy={77} rx={40} ry={4} fill="#D8C9B4" opacity={0.35} />

        {/* 피아노 다리 */}
        <Path d="M12 59 L10 76 Q10 79 14 79 L19 78 L22 60 Z" fill="#C9B59C" />
        <Path d="M64 59 L66 76 Q67 79 70 78 L74 76 L71 57 Z" fill="#C9B59C" />
        <Path d="M28 61 L29 75 L34 75 L35 61 Z" fill="#C9B59C" />

        {/* 그랜드 피아노 본체 */}
        <Path
          d="M8 43 Q9 36 19 35 L63 35 Q78 37 82 49 L79 61 Q75 67 64 67 H18 Q8 65 7 57 Z"
          fill="url(#musicPianoBody)"
          stroke="#4D4742"
          strokeWidth={1.6}
          strokeLinejoin="round"
        />

        {/* 열린 피아노 뚜껑 */}
        <Path
          d="M12 40 Q15 24 31 13 Q49 4 72 15 L61 34 Q43 27 25 39 Z"
          fill="#756960"
          stroke="#4D4742"
          strokeWidth={1.7}
          strokeLinejoin="round"
        />
        <Path
          d="M18 35 Q33 18 52 15"
          fill="none"
          stroke="#A89B8E"
          strokeWidth={1.5}
          strokeLinecap="round"
        />

        {/* 뚜껑 안쪽의 따뜻한 반사광 */}
        <Path
          d="M25 35 Q43 27 61 34 L56 38 Q39 32 25 40 Z"
          fill="#C9B59C"
          opacity={0.8}
        />

        {/* 악보 받침 */}
        <Path
          d="M38 32 L43 26 L54 31 L50 37 Z"
          fill="#FFFDF9"
          stroke="#C9B59C"
          strokeWidth={1}
        />
        <Path
          d="M42 30 L50 33 M41 33 L48 35"
          stroke="#D8D0C5"
          strokeWidth={0.8}
        />

        {/* 건반 상판 */}
        <Path
          d="M13 44 Q13 41 18 41 H66 Q72 42 73 46 L70 57 H15 Z"
          fill="#FFFDF9"
          stroke="#D8D0C5"
          strokeWidth={1.2}
          strokeLinejoin="round"
        />

        {/* 흰 건반 */}
        <G stroke="#D8D0C5" strokeWidth={0.7}>
          <Path d="M22 42 L21 56 M30 42 L29 56 M38 42 L37 56 M46 42 L45 56 M54 42 L53 56 M62 42 L61 56" />
        </G>

        {/* 검은 건반 */}
        <G fill="#59524C">
          <Rect x={24} y={42} width={3.5} height={7} rx={0.7} />
          <Rect x={32} y={42} width={3.5} height={7} rx={0.7} />
          <Rect x={48} y={42} width={3.5} height={7} rx={0.7} />
          <Rect x={56} y={42} width={3.5} height={7} rx={0.7} />
          <Rect x={64} y={43} width={3} height={6} rx={0.7} />
        </G>

        {/* 본체 앞면의 은은한 하이라이트 */}
        <Path
          d="M16 60 Q41 64 69 60"
          fill="none"
          stroke="#9D8D80"
          strokeWidth={1}
          strokeLinecap="round"
          opacity={0.7}
        />
      </G>

      {/* ================================================== */}
      {/* 좌측 중단: 파스텔 미니 탬버린 */}
      {/* ================================================== */}
      <G transform="translate(130 26) rotate(-12) scale(0.6)" opacity={0.8}>
        {/* 부드러운 바닥 그림자 */}
        <Ellipse cx={39} cy={80} rx={29} ry={3} fill="#D8C9B4" opacity={0.3} />

        {/* 탬버린 바깥 프레임 */}
        <Circle
          cx={39}
          cy={39}
          r={31}
          fill="#A8D8B9"
          stroke="#83BDA0"
          strokeWidth={2}
        />

        {/* 프레임의 안쪽 테두리 */}
        <Circle
          cx={39}
          cy={39}
          r={26}
          fill="#FFFDF9"
          stroke="#D8E9D9"
          strokeWidth={1.5}
        />

        {/* 탬버린 북면 */}
        <Circle
          cx={39}
          cy={39}
          r={23}
          fill="#FFFDF9"
          stroke="#EFE5D8"
          strokeWidth={1}
        />

        {/* 북면의 은은한 빛 반사 */}
        <Path
          d="M25 25 Q34 18 43 21"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={0.9}
        />

        {/* 프레임 위쪽의 금색 징 */}
        <G fill="#D6B65A" stroke="#F5D982" strokeWidth={0.5}>
          <Circle cx={24} cy={14} r={2.2} />
          <Circle cx={39} cy={8} r={2.2} />
          <Circle cx={54} cy={14} r={2.2} />
        </G>

        {/* 프레임 오른쪽의 징 */}
        <G fill="#D6B65A" stroke="#F5D982" strokeWidth={0.5}>
          <Circle cx={64} cy={27} r={2.2} />
          <Circle cx={69} cy={40} r={2.2} />
          <Circle cx={63} cy={53} r={2.2} />
        </G>

        {/* 프레임 아래쪽의 징 */}
        <G fill="#D6B65A" stroke="#F5D982" strokeWidth={0.5}>
          <Circle cx={54} cy={64} r={2.2} />
          <Circle cx={39} cy={70} r={2.2} />
          <Circle cx={24} cy={64} r={2.2} />
        </G>

        {/* 프레임 왼쪽의 징 */}
        <G fill="#D6B65A" stroke="#F5D982" strokeWidth={0.5}>
          <Circle cx={14} cy={53} r={2.2} />
          <Circle cx={9} cy={40} r={2.2} />
          <Circle cx={14} cy={27} r={2.2} />
        </G>

        {/* 징의 작은 반짝임 */}
        <G stroke="#FFF4C9" strokeWidth={0.9} strokeLinecap="round">
          <Path d="M23 12 V15 M21.5 13.5 H24.5" />
          <Path d="M53 12 V15 M51.5 13.5 H54.5" />
          <Path d="M67 38 V41 M65.5 39.5 H68.5" />
          <Path d="M52 62 V65 M50.5 63.5 H53.5" />
        </G>

        {/* 북면 중앙의 작은 별 장식 */}
        <Path
          d="
      M39 28
      L42 35
      L49 36
      L44 41
      L45 48
      L39 44
      L33 48
      L34 41
      L29 36
      L36 35 Z
    "
          fill="#FFE885"
          stroke="#E7C85D"
          strokeWidth={0.8}
          strokeLinejoin="round"
        />

        {/* 손잡이 */}
        <Path
          d="M35 68 L34 76 Q39 80 44 76 L43 68"
          fill="#E6B89C"
          stroke="#C9A187"
          strokeWidth={1.2}
          strokeLinejoin="round"
        />

        {/* 손잡이 끝의 작은 구멍 */}
        <Circle cx={39} cy={75} r={1.5} fill="#FFF3E0" />
      </G>

      {/* ================================================== */}
      {/* 우측 상단: 클래식 바이올린과 활 */}
      {/* ================================================== */}
      <G transform="translate(267 47) rotate(25)" opacity={0.8}>
        {/* 바이올린의 목과 지판 */}
        <Path
          d="M-3 -19 L3 -19 L3 1 L-3 1 Z"
          fill="#736253"
          stroke="#665649"
          strokeWidth={0.8}
        />

        {/* 줄감개 */}
        <Path
          d="M-3 -19 L-7 -22 M3 -19 L7 -22 M-3 -16 L-7 -14 M3 -16 L7 -14"
          fill="none"
          stroke="#736253"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <Circle cx={-7} cy={-22} r={1.8} fill="#C9B59C" />
        <Circle cx={7} cy={-22} r={1.8} fill="#C9B59C" />
        <Circle cx={-7} cy={-14} r={1.8} fill="#C9B59C" />
        <Circle cx={7} cy={-14} r={1.8} fill="#C9B59C" />

        {/* 바이올린 몸통 */}
        <Path
          d="M-3 -1
             C-10 -7 -15 0 -12 7
             C-11 11 -7 12 -7 17
             C-7 24 -13 29 -8 35
             C-4 41 4 41 8 35
             C13 29 7 24 7 17
             C7 12 11 11 12 7
             C15 0 10 -7 3 -1
             L2 4 L-2 4 Z"
          fill="#E6B89C"
          stroke="#B9876B"
          strokeWidth={1.2}
          strokeLinejoin="round"
        />

        {/* 몸통의 따뜻한 하이라이트 */}
        <Path
          d="M-9 4 Q-12 10 -6 15 M-5 29 Q-7 34 -3 37"
          fill="none"
          stroke="#F6D5BF"
          strokeWidth={1.7}
          strokeLinecap="round"
        />

        {/* 줄 */}
        <Path
          d="M-1 -19 V34 M1 -19 V34"
          fill="none"
          stroke="#FFF3E0"
          strokeWidth={0.65}
        />

        {/* 브리지 */}
        <Path d="M-4 14 Q0 12 4 14 L3 17 H-3 Z" fill="#736253" />

        {/* F홀 */}
        <Path
          d="M-7 18 Q-10 20 -7 22 M7 18 Q10 20 7 22"
          fill="none"
          stroke="#986C54"
          strokeWidth={1.2}
          strokeLinecap="round"
        />

        {/* 턱받침 */}
        <Path d="M-5 33 Q0 30 5 33 L4 36 H-4 Z" fill="#736253" />

        {/* 바이올린 활: 몸통 옆에 사선으로 배치 */}
        <G transform="translate(18 -4) rotate(-13)">
          <Path
            d="M0 -24 Q3 0 0 37"
            fill="none"
            stroke="#C9B59C"
            strokeWidth={2}
            strokeLinecap="round"
          />
          <Path
            d="M-1 -24 Q2 0 -1 37"
            fill="none"
            stroke="#FFF3E0"
            strokeWidth={0.8}
            strokeLinecap="round"
          />
          <Path d="M-2 -27 L2 -27 L2 -22 L-2 -22 Z" fill="#736253" />
          <Path d="M-2 35 L2 35 L2 39 L-2 39 Z" fill="#736253" />
        </G>
      </G>

      {/* ================================================== */}
      {/* 좌측 하단: 반짝이는 파스텔 트럼펫 */}
      {/* ================================================== */}
      <G transform="translate(21 164) scale(0.65)" opacity={0.8}>
        {/* 바닥 그림자 */}
        <Ellipse cx={39} cy={47} rx={34} ry={3} fill="#D8C9B4" opacity={0.35} />

        {/* 둥글게 말린 관 */}
        <Path
          d="M9 28
             H30
             Q36 28 36 34
             V39
             Q36 44 31 44
             H20
             Q14 44 14 38
             V35
             Q14 32 18 32
             H28"
          fill="none"
          stroke="#E7C85D"
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 관의 크림빛 반사 */}
        <Path
          d="M10 26 H29 Q33 26 33 32 V38 Q33 41 29 41 H20"
          fill="none"
          stroke="#FFF3C6"
          strokeWidth={2}
          strokeLinecap="round"
        />

        {/* 트럼펫 본관 */}
        <Path
          d="M27 27 L52 20 L55 28 L31 36 Z"
          fill="url(#musicTrumpetGold)"
          stroke="#D6B65A"
          strokeWidth={1.3}
          strokeLinejoin="round"
        />

        {/* 나팔 입구의 바깥 테두리 */}
        <Path
          d="M49 19
             Q57 13 65 16
             L76 21
             Q79 24 76 28
             L65 34
             Q57 37 51 31 Z"
          fill="#FFE885"
          stroke="#D6B65A"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />

        {/* 나팔 입구 안쪽 */}
        <Path
          d="M58 20
             Q64 18 72 22
             Q75 24 72 27
             Q65 31 58 29
             Q55 25 58 20 Z"
          fill="#FFF3E0"
          stroke="#E7C85D"
          strokeWidth={1}
        />
        <Ellipse
          cx={65}
          cy={24.5}
          rx={5}
          ry={3.3}
          fill="#F3D56D"
          opacity={0.75}
        />

        {/* 세 개의 밸브 */}
        <G>
          <Path
            d="M28 23 V15 M37 21 V13 M46 18 V10"
            stroke="#D6B65A"
            strokeWidth={2}
            strokeLinecap="round"
          />
          <Circle
            cx={28}
            cy={14}
            r={3}
            fill="#FFFDF9"
            stroke="#D6B65A"
            strokeWidth={1}
          />
          <Circle
            cx={37}
            cy={12}
            r={3}
            fill="#FFFDF9"
            stroke="#D6B65A"
            strokeWidth={1}
          />
          <Circle
            cx={46}
            cy={9}
            r={3}
            fill="#FFFDF9"
            stroke="#D6B65A"
            strokeWidth={1}
          />
        </G>

        {/* 밸브 연결부 */}
        <Path
          d="M27 25 L29 30 M36 22 L38 27 M45 19 L47 24"
          stroke="#FFF3C6"
          strokeWidth={1.4}
          strokeLinecap="round"
        />

        {/* 마우스피스 */}
        <Path
          d="M5 26 H12 L15 29 L12 32 H5 Z"
          fill="#FFF3E0"
          stroke="#D6B65A"
          strokeWidth={1.1}
          strokeLinejoin="round"
        />

        {/* 작은 빛 반사 */}
        <Path
          d="M57 18 Q64 15 70 20"
          fill="none"
          stroke="#FFFCDF"
          strokeWidth={1.6}
          strokeLinecap="round"
        />
      </G>

      {/* ================================================== */}
      {/* 우측 하단: 미니 파스텔 우쿨렐레 */}
      {/* ================================================== */}
      <G transform="translate(273 150) rotate(32) scale(0.75)" opacity={0.8}>
        {/* 바닥 그림자 */}
        <Ellipse cx={34} cy={72} rx={23} ry={3} fill="#D8C9B4" opacity={0.35} />

        {/* 우쿨렐레 목 */}
        <Path
          d="M28 29 L38 29 L41 52 L30 52 Z"
          fill="#736253"
          stroke="#665649"
          strokeWidth={1.2}
          strokeLinejoin="round"
        />

        {/* 지판의 나무 결 */}
        <Path
          d="M31 32 L37 32 M32 37 L38 37 M33 42 L39 42 M34 47 L40 47"
          stroke="#A89580"
          strokeWidth={0.8}
          strokeLinecap="round"
        />

        {/* 우쿨렐레 몸통 */}
        <Path
          d="
      M29 47
      C24 43 17 45 15 52
      C12 59 17 64 23 65
      C27 72 39 72 43 65
      C50 62 52 55 48 49
      C44 43 37 44 34 48
      Z
    "
          fill="#FDE4EC"
          stroke="#E6B8C7"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />

        {/* 몸통 안쪽의 은은한 나무색 테두리 */}
        <Path
          d="
      M29 50
      C24 47 19 50 18 55
      C17 60 22 63 26 63
      C30 69 38 69 41 63
      C46 61 48 55 44 51
      C41 48 37 48 34 51
    "
          fill="none"
          stroke="#FFF3E0"
          strokeWidth={1.3}
          strokeLinejoin="round"
        />

        {/* 헤드 */}
        <Path
          d="M27 7
       Q27 3 31 3
       L39 3
       Q43 3 43 7
       L42 16
       L39 20
       L39 30
       L28 30
       L28 20
       L26 16 Z"
          fill="#736253"
          stroke="#665649"
          strokeWidth={1.2}
          strokeLinejoin="round"
        />

        {/* 헤드 끝의 둥근 장식 */}
        <Path
          d="M29 6 Q35 2 41 6"
          fill="none"
          stroke="#A89580"
          strokeWidth={1}
          strokeLinecap="round"
        />

        {/* 줄감개 4개 */}
        <G fill="#FFF3E0" stroke="#C9B59C" strokeWidth={1}>
          <Circle cx={25} cy={7} r={2.5} />
          <Circle cx={45} cy={7} r={2.5} />
          <Circle cx={25} cy={15} r={2.5} />
          <Circle cx={44} cy={15} r={2.5} />
        </G>

        {/* 4개의 현 */}
        <Path
          d="M30 8 L30 56
       M33 8 L33 56
       M36 8 L36 56
       M39 8 L39 56"
          fill="none"
          stroke="#FFF3E0"
          strokeWidth={0.6}
        />

        {/* 사운드홀의 테두리 */}
        <Circle
          cx={34}
          cy={56}
          r={6}
          fill="#E6B89C"
          stroke="#FFF3E0"
          strokeWidth={1.5}
        />

        {/* 사운드홀 */}
        <Circle cx={34} cy={56} r={3.6} fill="#736253" />

        {/* 브리지 */}
        <Path
          d="M28 63 Q34 61 40 63 L39 66 L29 66 Z"
          fill="#736253"
          stroke="#665649"
          strokeWidth={0.7}
          strokeLinejoin="round"
        />

        {/* 브리지 위 현 고정점 */}
        <G fill="#FFF3E0">
          <Circle cx={30} cy={64} r={0.7} />
          <Circle cx={32.7} cy={64} r={0.7} />
          <Circle cx={35.3} cy={64} r={0.7} />
          <Circle cx={38} cy={64} r={0.7} />
        </G>

        {/* 몸통의 빛 반사 */}
        <Path
          d="M20 53 Q19 57 22 59"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={1.5}
          strokeLinecap="round"
          opacity={0.8}
        />
      </G>

      {/* ================================================== */}
      {/* 작은 가장자리 장식: 중앙 영역은 비워둠 */}
      {/* ================================================== */}
      <G opacity={0.75}>
        <Circle cx={91} cy={39} r={2} fill="#CBB3E8" />
        <Circle cx={236} cy={83} r={2} fill="#A8D8B9" />
        <Circle cx={93} cy={165} r={1.8} fill="#FFE885" />
        <Circle cx={237} cy={188} r={2} fill="#FDE4EC" />
        <Path
          d="M286 113 Q289 109 292 113 Q289 117 286 113 Z"
          fill="#CBB3E8"
          opacity={0.65}
        />
      </G>

      {/* 마지막 우유빛 오버레이 */}
      <Rect
        x={0}
        y={0}
        width={406}
        height={326}
        rx={14}
        fill="#FFFDF6"
        opacity={0.3}
      />
    </>
  );
}

export function ClockScene() {
  return (
    <>
      <Defs>
        <LinearGradient id="clockSceneBg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFFDF8" />
          <Stop offset="1" stopColor="#FFF7EE" />
        </LinearGradient>

        <LinearGradient id="clockWood" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#E0CFB8" />
          <Stop offset="1" stopColor="#C9B59C" />
        </LinearGradient>

        <LinearGradient id="clockGlass" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#F4FBFF" />
          <Stop offset="1" stopColor="#D9ECF7" />
        </LinearGradient>
      </Defs>

      {/* 기본 크림빛 배경 */}
      <Rect
        x={0}
        y={0}
        width={406}
        height={326}
        rx={14}
        fill="url(#clockSceneBg)"
      />

      {/* 가장자리 시간의 흐름을 표현하는 점선 궤적 */}
      <G
        fill="none"
        stroke="#E8DFD5"
        strokeWidth={1.2}
        strokeDasharray="4,4"
        strokeLinecap="round"
        opacity={0.7}
      >
        <Path d="M174 26 Q233 15 308 29" />
        <Path d="M176 34 Q240 24 308 37" />
        <Path d="M10 190 Q69 179 139 191" />
        <Path d="M10 201 Q74 190 139 202" />
      </G>

      {/* 작은 시간 장식: 중앙 공간은 비워둠 */}
      <G opacity={0.7}>
        {/* 우측 상단의 째깍 별 */}
        <Path
          d="M226 19 L228 24 L233 26 L228 28 L226 33 L224 28 L219 26 L224 24 Z"
          fill="#FFE885"
        />

        {/* 좌측 하단의 핑크 반짝임 */}
        <Path
          d="M91 180 L93 185 L98 187 L93 189 L91 194 L89 189 L84 187 L89 185 Z"
          fill="#FDE4EC"
        />

        {/* 작은 민트색 톱니 모티프 */}
        <G transform="translate(118 29)">
          <Circle cx={0} cy={0} r={6} fill="#A8D8B9" opacity={0.55} />
          <Circle
            cx={0}
            cy={0}
            r={3}
            fill="#FFFDF8"
            stroke="#A8D8B9"
            strokeWidth={1.2}
          />
          <Path
            d="M0 -9 V-6 M0 6 V9 M-9 0 H-6 M6 0 H9 M-6 -6 L-4 -4 M4 4 L6 6 M6 -6 L4 -4 M-4 4 L-6 6"
            stroke="#A8D8B9"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </G>

        {/* 작은 라벤더 시계바늘 기호 */}
        <G transform="translate(203 52)">
          <Circle cx={0} cy={0} r={7} fill="#CBB3E8" opacity={0.45} />
          <Path
            d="M0 -4 V0 L3 2"
            fill="none"
            stroke="#9C83C1"
            strokeWidth={1.3}
            strokeLinecap="round"
          />
        </G>

        {/* 우측 가장자리 작은 점 */}
        <Circle cx={301} cy={105} r={2} fill="#FFE885" />
        <Circle cx={286} cy={132} r={1.7} fill="#CBB3E8" />
        <Circle cx={94} cy={168} r={1.8} fill="#A8D8B9" />
      </G>

      {/* ================================================== */}
      {/* 좌측 상단: 미니 원목 괘종시계 */}
      {/* ================================================== */}
      <G transform="translate(15 27) scale(0.6)" opacity={0.8}>
        {/* 그림자 */}
        <Ellipse
          cx={42}
          cy={122}
          rx={31}
          ry={3.5}
          fill="#C9B59C"
          opacity={0.3}
        />

        {/* 본체 바닥 */}
        <Path
          d="M13 104 Q13 99 18 99 H67 Q72 99 72 104 V115 H13 Z"
          fill="url(#clockWood)"
          stroke="#B59F84"
          strokeWidth={1.5}
        />

        {/* 본체 몸통 */}
        <Path
          d="M19 48
             Q19 41 26 41
             H59
             Q66 41 66 48
             V102
             H19 Z"
          fill="url(#clockWood)"
          stroke="#B59F84"
          strokeWidth={1.6}
          strokeLinejoin="round"
        />

        {/* 몸통의 장식 테두리 */}
        <Path
          d="M25 52 V96 M60 52 V96"
          stroke="#E9D9C5"
          strokeWidth={1.4}
          strokeLinecap="round"
        />

        {/* 둥근 시계 머리 */}
        <Path
          d="M16 43
             V27
             Q16 8 42 8
             Q68 8 68 27
             V43 Z"
          fill="#C9B59C"
          stroke="#B59F84"
          strokeWidth={1.6}
        />

        {/* 시계 머리의 안쪽 테두리 */}
        <Circle
          cx={42}
          cy={30}
          r={19}
          fill="#FFFDF9"
          stroke="#E8D9C6"
          strokeWidth={2}
        />

        {/* 시계판 눈금 */}
        <G stroke="#C9B59C" strokeWidth={1.2} strokeLinecap="round">
          <Path d="M42 14 V17 M42 43 V46 M26 30 H29 M55 30 H58" />
          <Path d="M30 18 L32 20 M52 40 L54 42 M54 18 L52 20 M32 40 L30 42" />
        </G>

        {/* 시계바늘: 10시 10분 */}
        <Path
          d="M42 30 L33 23 M42 30 L50 21"
          stroke="#736253"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <Circle cx={42} cy={30} r={2.5} fill="#B59F84" />

        {/* 유리 반짝임 */}
        <Path
          d="M29 17 Q33 13 37 13"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={1.8}
          strokeLinecap="round"
        />

        {/* 아래쪽 추를 매다는 막대 */}
        <Path
          d="M42 115 V132"
          stroke="#B59F84"
          strokeWidth={2.2}
          strokeLinecap="round"
        />

        {/* 버터 옐로우 시계 추 */}
        <Path
          d="M42 128
             C34 128 31 135 34 141
             Q42 151 50 141
             C53 135 50 128 42 128 Z"
          fill="#FFE885"
          stroke="#E7C85D"
          strokeWidth={1.2}
        />
        <Path
          d="M38 133 Q35 137 39 141"
          fill="none"
          stroke="#FFF5BE"
          strokeWidth={1.6}
          strokeLinecap="round"
        />

        {/* 작은 장식 손잡이 */}
        <Circle cx={42} cy={48} r={2} fill="#FFF3E0" />
      </G>

      {/* ================================================== */}
      {/* 좌측 중단: 귀여운 파스텔 미니 손목시계 */}
      {/* ================================================== */}
      <G transform="translate(15 160) scale(0.65)" opacity={0.8}>
        {/* 바닥 그림자 */}
        <Ellipse cx={43} cy={91} rx={23} ry={3} fill="#C9B59C" opacity={0.28} />

        {/* 위쪽 스트랩 */}
        <Path
          d="M32 9 Q32 4 37 4 H49 Q54 4 54 9
       L52 28 H34 Z"
          fill="#FDE4EC"
          stroke="#D9B5B9"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />

        {/* 위쪽 스트랩 장식 */}
        <Path
          d="M36 9 H50 M35 14 H51 M35 19 H51"
          stroke="#E8BFCB"
          strokeWidth={1}
          strokeLinecap="round"
        />

        {/* 아래쪽 스트랩 */}
        <Path
          d="M34 54 L52 54 L55 76
       Q55 81 50 81 H37
       Q32 81 32 76 Z"
          fill="#FDE4EC"
          stroke="#D9B5B9"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />

        {/* 스트랩의 구멍 */}
        <G fill="#FFFDF9" stroke="#D9B5B9" strokeWidth={0.9}>
          <Circle cx={43} cy={64} r={2} />
          <Circle cx={43} cy={71} r={2} />
          <Circle cx={43} cy={77} r={1.5} />
        </G>

        {/* 시계 본체 외곽 */}
        <Circle
          cx={43}
          cy={41}
          r={25}
          fill="#A8D8B9"
          stroke="#83BDA0"
          strokeWidth={2}
        />

        {/* 프레임 안쪽 하이라이트 */}
        <Circle
          cx={43}
          cy={41}
          r={21}
          fill="#DDF1E4"
          stroke="#F5FFF7"
          strokeWidth={1.5}
        />

        {/* 크림색 시계판 */}
        <Circle
          cx={43}
          cy={41}
          r={18}
          fill="#FFFDF9"
          stroke="#E8E0D5"
          strokeWidth={1}
        />

        {/* 시계 눈금 */}
        <G stroke="#B59F84" strokeWidth={1.5} strokeLinecap="round">
          <Path d="M43 26 V29 M43 53 V56 M28 41 H31 M55 41 H58" />
          <Path d="M32 30 L34 32 M52 50 L54 52 M54 30 L52 32 M34 50 L32 52" />
        </G>

        {/* 시곗바늘: 10시 10분 */}
        <Path
          d="M43 41 L35 34 M43 41 L50 32"
          fill="none"
          stroke="#736253"
          strokeWidth={2}
          strokeLinecap="round"
        />

        {/* 바늘 중심 */}
        <Circle cx={43} cy={41} r={2.5} fill="#C9B59C" />

        {/* 시계판 반짝임 */}
        <Path
          d="M32 30 Q35 27 38 27"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={1.8}
          strokeLinecap="round"
        />

        {/* 오른쪽 스트랩 버클 */}
        <G transform="translate(53 67)">
          <Rect
            x={-3}
            y={-5}
            width={8}
            height={10}
            rx={2}
            fill="#D9B5B9"
            stroke="#C997A4"
            strokeWidth={1}
          />
          <Rect x={-1} y={-3} width={4} height={6} rx={1} fill="#FFF3E0" />
        </G>

        {/* 버클 핀 */}
        <Path
          d="M53 67 H57"
          stroke="#C997A4"
          strokeWidth={1.2}
          strokeLinecap="round"
        />

        {/* 작은 민트색 반짝임 */}
        <Path
          d="M68 25 L70 29 L74 31 L70 33 L68 37 L66 33 L62 31 L66 29 Z"
          fill="#FFE885"
        />
      </G>

      {/* ================================================== */}
      {/* 우측 상단: 파스텔 탁상 알람시계 */}
      {/* ================================================== */}
      <G transform="translate(249 34) scale(0.65)" opacity={0.8}>
        {/* 그림자 */}
        <Ellipse cx={43} cy={75} rx={34} ry={4} fill="#C9B59C" opacity={0.3} />

        {/* 알람시계 다리 */}
        <Path
          d="M22 62 L17 72 H26 L31 64 Z"
          fill="#D9B5B9"
          stroke="#C997A4"
          strokeWidth={1}
        />
        <Path
          d="M54 64 L59 72 H68 L62 62 Z"
          fill="#D9B5B9"
          stroke="#C997A4"
          strokeWidth={1}
        />

        {/* 위쪽 종 두 개 */}
        <Path
          d="M19 18 Q11 6 19 1 Q27 -2 31 12 Z"
          fill="#FDE4EC"
          stroke="#D9B5B9"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
        <Path
          d="M53 12 Q58 -2 67 2 Q75 7 67 19 Z"
          fill="#FDE4EC"
          stroke="#D9B5B9"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />

        {/* 종 받침 */}
        <Path
          d="M22 15 L28 12 M59 12 L65 15"
          stroke="#C997A4"
          strokeWidth={2}
          strokeLinecap="round"
        />

        {/* 종 사이 해머 */}
        <Path
          d="M43 6 V12"
          stroke="#B59F84"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <Path
          d="M38 6 H48"
          stroke="#B59F84"
          strokeWidth={3}
          strokeLinecap="round"
        />

        {/* 시계 본체 */}
        <Circle
          cx={43}
          cy={40}
          r={30}
          fill="#FDE4EC"
          stroke="#D9B5B9"
          strokeWidth={2}
        />

        {/* 안쪽 테두리 */}
        <Circle
          cx={43}
          cy={40}
          r={24}
          fill="#FFFDF9"
          stroke="#F3D7DE"
          strokeWidth={2}
        />

        {/* 눈금 */}
        <G stroke="#B59F84" strokeWidth={1.4} strokeLinecap="round">
          <Path d="M43 19 V23 M43 57 V61 M22 40 H26 M60 40 H64" />
          <Path d="M28 25 L31 28 M55 52 L58 55 M58 25 L55 28 M31 52 L28 55" />
        </G>

        {/* 10시 10분 시곗바늘 */}
        <Path
          d="M43 40 L32 31 M43 40 L52 28"
          stroke="#736253"
          strokeWidth={2.4}
          strokeLinecap="round"
        />
        <Circle cx={43} cy={40} r={3} fill="#B59F84" />

        {/* 시계판 반짝임 */}
        <Path
          d="M29 26 Q33 21 37 21"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={2}
          strokeLinecap="round"
        />

        {/* 작은 버튼 */}
        <Circle cx={43} cy={8} r={2.5} fill="#C9B59C" />
      </G>

      {/* ================================================== */}
      {/* 우측 중앙: 귀여운 미니 뻐꾸기 벽시계 */}
      {/* ================================================== */}
      <G transform="translate(133 18) scale(0.65)" opacity={0.8}>
        {/* 그림자 */}
        <Ellipse cx={43} cy={94} rx={31} ry={3} fill="#C9B59C" opacity={0.28} />

        {/* 지붕 바탕 */}
        <Path
          d="M7 30 L43 3 L79 30 Z"
          fill="#C9B59C"
          stroke="#B59F84"
          strokeWidth={2}
          strokeLinejoin="round"
        />

        {/* 지붕 안쪽 밝은 테두리 */}
        <Path
          d="M15 28 L43 8 L71 28"
          fill="none"
          stroke="#E9D9C5"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 지붕 꼭대기 장식 */}
        <Circle
          cx={43}
          cy={5}
          r={3}
          fill="#FFE885"
          stroke="#E7C85D"
          strokeWidth={1}
        />

        {/* 시계 본체 */}
        <Path
          d="M12 29 Q12 26 16 26 H70 Q74 26 74 30
       V80 Q74 84 70 84 H16 Q12 84 12 80 Z"
          fill="url(#clockWood)"
          stroke="#B59F84"
          strokeWidth={1.8}
          strokeLinejoin="round"
        />

        {/* 본체 양옆 세로 장식 */}
        <Path
          d="M18 35 V76 M68 35 V76"
          stroke="#E9D9C5"
          strokeWidth={1.5}
          strokeLinecap="round"
        />

        {/* 뻐꾸기 창문 외곽 */}
        <Path
          d="M33 28 V22 Q33 14 43 14
       Q53 14 53 22 V28 Z"
          fill="#736253"
          stroke="#9F896F"
          strokeWidth={1.3}
          strokeLinejoin="round"
        />

        {/* 창문 안쪽 */}
        <Path
          d="M36 27 V22 Q36 17 43 17
       Q50 17 50 22 V27 Z"
          fill="#D9ECF7"
          stroke="#FFF3E0"
          strokeWidth={1}
        />

        {/* 작은 뻐꾸기 새 */}
        <G transform="translate(43 22)">
          {/* 몸통 */}
          <Ellipse
            cx={0}
            cy={2}
            rx={4}
            ry={3}
            fill="#A8D8B9"
            stroke="#83BDA0"
            strokeWidth={0.8}
          />

          {/* 머리 */}
          <Circle cx={2} cy={-2} r={2.5} fill="#A8D8B9" />

          {/* 부리 */}
          <Path d="M4 -2 L7 -1 L4 0 Z" fill="#FFE885" />

          {/* 눈 */}
          <Circle cx={2.7} cy={-2.5} r={0.6} fill="#736253" />

          {/* 날개 */}
          <Path d="M-3 1 Q0 -2 2 2 Q-1 4 -3 1 Z" fill="#FFFDF9" />
        </G>

        {/* 시계판 테두리 */}
        <Circle
          cx={43}
          cy={52}
          r={20}
          fill="#E0CFB8"
          stroke="#B59F84"
          strokeWidth={1.5}
        />

        {/* 크림 화이트 시계판 */}
        <Circle
          cx={43}
          cy={52}
          r={16.5}
          fill="#FFFDF9"
          stroke="#E8D9C6"
          strokeWidth={1.3}
        />

        {/* 시계 눈금 */}
        <G stroke="#C9B59C" strokeWidth={1.2} strokeLinecap="round">
          <Path d="M43 38 V41 M43 63 V66 M29 52 H32 M54 52 H57" />
          <Path d="M33 42 L35 44 M51 60 L53 62 M53 42 L51 44 M35 60 L33 62" />
        </G>

        {/* 시곗바늘 */}
        <Path
          d="M43 52 L36 46 M43 52 L49 43"
          fill="none"
          stroke="#736253"
          strokeWidth={1.8}
          strokeLinecap="round"
        />

        <Circle cx={43} cy={52} r={2} fill="#B59F84" />

        {/* 본체 하단 장식 */}
        <Path
          d="M27 76 Q43 71 59 76"
          fill="none"
          stroke="#E9D9C5"
          strokeWidth={1.4}
          strokeLinecap="round"
        />

        {/* 추를 매다는 짧은 막대 */}
        <Path
          d="M43 84 V91"
          stroke="#B59F84"
          strokeWidth={2}
          strokeLinecap="round"
        />

        {/* 작은 추 */}
        <Path
          d="M43 88
       C37 88 36 93 39 97
       Q43 101 47 97
       C50 93 49 88 43 88 Z"
          fill="#FFE885"
          stroke="#E7C85D"
          strokeWidth={1.1}
        />

        {/* 추 하이라이트 */}
        <Path
          d="M41 91 Q39 94 42 96"
          fill="none"
          stroke="#FFF5BE"
          strokeWidth={1.3}
          strokeLinecap="round"
        />

        {/* 지붕 옆 반짝임 */}
        <Path
          d="M84 25 L86 29 L90 31 L86 33 L84 37 L82 33 L78 31 L82 29 Z"
          fill="#CBB3E8"
        />
      </G>

      {/* ================================================== */}
      {/* 우측 하단: 파스텔 모래시계 */}
      {/* ================================================== */}
      <G transform="translate(251 154) scale(0.65)" opacity={0.8}>
        {/* 그림자 */}
        <Ellipse
          cx={39}
          cy={94}
          rx={29}
          ry={3.5}
          fill="#C9B59C"
          opacity={0.3}
        />

        {/* 위쪽 받침 */}
        <Path
          d="M10 8 Q10 4 15 4 H63 Q68 4 68 8 V14 H10 Z"
          fill="#B59F84"
          stroke="#9F896F"
          strokeWidth={1.3}
        />
        <Path
          d="M15 7 H63"
          stroke="#E6D5BF"
          strokeWidth={1.5}
          strokeLinecap="round"
        />

        {/* 아래쪽 받침 */}
        <Path
          d="M10 83 H68 V90 Q68 94 63 94 H15 Q10 94 10 90 Z"
          fill="#B59F84"
          stroke="#9F896F"
          strokeWidth={1.3}
        />
        <Path
          d="M15 89 H63"
          stroke="#E6D5BF"
          strokeWidth={1.5}
          strokeLinecap="round"
        />

        {/* 양쪽 기둥 */}
        <Path
          d="M14 14 L20 14 L27 81 L20 81 Z"
          fill="#B59F84"
          stroke="#9F896F"
          strokeWidth={1}
        />
        <Path
          d="M58 14 L64 14 L58 81 L51 81 Z"
          fill="#B59F84"
          stroke="#9F896F"
          strokeWidth={1}
        />

        {/* 유리 실루엣 */}
        <Path
          d="M23 14
             H55
             L45 38
             Q43 42 45 46
             L56 82
             H22
             L33 46
             Q35 42 33 38 Z"
          fill="url(#clockGlass)"
          stroke="#B7D6E8"
          strokeWidth={1.4}
          strokeLinejoin="round"
        />

        {/* 위쪽 모래 */}
        <Path
          d="M27 19 H51 L43 36 Q39 39 35 36 Z"
          fill="#FFE885"
          opacity={0.95}
        />

        {/* 떨어지는 모래 */}
        <Path
          d="M39 39 L39 57"
          stroke="#E7C85D"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeDasharray="2,2"
        />

        {/* 아래쪽 쌓인 모래 */}
        <Path
          d="M28 77 L34 59 Q39 55 44 59 L51 77 Z"
          fill="#FFE885"
          opacity={0.95}
        />

        {/* 유리 하이라이트 */}
        <Path
          d="M27 19 L34 36 M27 70 L31 57"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={0.8}
        />

        {/* 작은 모래 반짝임 */}
        <Circle cx={45} cy={64} r={1.2} fill="#FFF8D7" />
        <Circle cx={34} cy={71} r={1} fill="#FFF8D7" />
      </G>

      {/* 가장자리의 작은 톱니 장식 */}
      <G transform="translate(291 143)" opacity={0.65}>
        <Circle cx={0} cy={0} r={5} fill="#CBB3E8" opacity={0.6} />
        <Circle
          cx={0}
          cy={0}
          r={2}
          fill="#FFFDF8"
          stroke="#B69AD9"
          strokeWidth={1}
        />
        <Path
          d="M0 -8 V-5 M0 5 V8 M-8 0 H-5 M5 0 H8 M-6 -6 L-4 -4 M4 4 L6 6 M6 -6 L4 -4 M-4 4 L-6 6"
          stroke="#CBB3E8"
          strokeWidth={1.8}
          strokeLinecap="round"
        />
      </G>

      {/* 마지막 우유빛 오버레이 */}
      <Rect
        x={7}
        y={7}
        width={306}
        height={226}
        rx={14}
        fill="#FFFDF6"
        opacity={0.3}
      />
    </>
  );
}

export function StationeryScene() {
  return (
    <>
      <Defs>
        <LinearGradient id="stationerySceneBg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFFDF8" />
          <Stop offset="1" stopColor="#FFF7EF" />
        </LinearGradient>

        <LinearGradient
          id="stationeryNotebookCover"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <Stop offset="0" stopColor="#FFF0E8" />
          <Stop offset="1" stopColor="#F6CEDB" />
        </LinearGradient>

        <LinearGradient id="stationeryCup" x1="0" y1="0" x2="0.8" y2="1">
          <Stop offset="0" stopColor="#C5E8D2" />
          <Stop offset="1" stopColor="#A8D8B9" />
        </LinearGradient>

        <LinearGradient id="stationeryEraser" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#E5F5FC" />
          <Stop offset="1" stopColor="#C8E4F2" />
        </LinearGradient>
      </Defs>

      {/* 1. 기본 크림빛 배경 */}
      <Rect
        x={0}
        y={0}
        width={320}
        height={240}
        rx={14}
        fill="url(#stationerySceneBg)"
      />

      {/* 은은한 모눈종이 패턴: 우측 상단 */}
      <G stroke="#E5E0D8" strokeWidth={0.8} opacity={0.6}>
        <Path d="M174 17 V57 M186 17 V57 M198 17 V57 M210 17 V57 M222 17 V57 M234 17 V57 M246 17 V57 M258 17 V57 M270 17 V57 M282 17 V57 M294 17 V57 M306 17 V57" />
        <Path d="M172 21 H308 M172 33 H308 M172 45 H308 M172 57 H308" />

        {/* 좌측 하단 */}
        <Path d="M12 183 V222 M24 183 V222 M36 183 V222 M48 183 V222 M60 183 V222 M72 183 V222 M84 183 V222 M96 183 V222 M108 183 V222 M120 183 V222 M132 183 V222" />
        <Path d="M12 186 H132 M12 198 H132 M12 210 H132 M12 222 H132" />
      </G>

      {/* 2. 가장자리의 부드러운 낙서 장식 */}

      {/* 위쪽 버터 옐로우 별 */}
      <G opacity={0.75}>
        <Path
          d="M101 17 L103 22 L108 24 L103 26 L101 31 L99 26 L94 24 L99 22 Z"
          fill="#FFE885"
        />

        {/* 작은 핑크 별 */}
        <Path
          d="M221 47 L223 51 L227 53 L223 55 L221 59 L219 55 L215 53 L219 51 Z"
          fill="#FDE4EC"
        />

        {/* 라벤더 반짝임 */}
        <Path
          d="M139 29 L140.5 33 L144 34.5 L140.5 36 L139 40 L137.5 36 L134 34.5 L137.5 33 Z"
          fill="#CBB3E8"
        />

        {/* 민트 점 */}
        <Circle cx={83} cy={35} r={2.2} fill="#A8D8B9" />
        <Circle cx={230} cy={40} r={1.8} fill="#A8D8B9" />
        <Circle cx={148} cy={210} r={2} fill="#A8D8B9" />

        {/* 작은 연필 낙서 지그재그 */}
        <Path
          d="M85 51 L90 47 L95 51 L100 47 L105 51"
          fill="none"
          stroke="#E8B9C6"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 아래쪽 작은 점선 */}
        <Path
          d="M15 174 Q37 166 57 173"
          fill="none"
          stroke="#D9C9E9"
          strokeWidth={1.4}
          strokeDasharray="2 4"
          strokeLinecap="round"
        />

        {/* 우측 가장자리 별 */}
        <Path
          d="M307 119 L309 124 L314 126 L309 128 L307 133 L305 128 L300 126 L305 124 Z"
          fill="#FFE885"
        />

        <Circle cx={286} cy={143} r={2} fill="#FDE4EC" />
        <Circle cx={24} cy={104} r={1.8} fill="#CBB3E8" />
      </G>

      {/* 3. 좌측 상단: 미니 링 스프링 공책 */}
      <G transform="translate(14 14) scale(0.65)" opacity={0.84}>
        {/* 그림자 */}
        <Ellipse cx={46} cy={94} rx={36} ry={4} fill="#C9B59C" opacity={0.22} />

        {/* 공책 커버 */}
        <Rect
          x={13}
          y={8}
          width={65}
          height={83}
          rx={6}
          fill="url(#stationeryNotebookCover)"
          stroke="#E7C2CB"
          strokeWidth={1.4}
        />

        {/* 커버 안쪽 테두리 */}
        <Rect
          x={19}
          y={13}
          width={54}
          height={73}
          rx={3}
          fill="#FFFDF9"
          stroke="#F2D9DE"
          strokeWidth={1}
        />

        {/* 내지의 연한 분홍 줄 */}
        <Path
          d="M27 34 H65 M27 46 H65 M27 58 H65 M27 70 H59"
          stroke="#F1C8D3"
          strokeWidth={1.3}
          strokeLinecap="round"
        />

        {/* 위쪽 작은 제목 장식 */}
        <Rect x={29} y={20} width={25} height={5} rx={2.5} fill="#FFE5B9" />

        {/* 커버 오른쪽 아래 작은 별 */}
        <Path
          d="M62 74 L64 78 L68 80 L64 82 L62 86 L60 82 L56 80 L60 78 Z"
          fill="#FFE885"
        />

        {/* 스프링 구멍 */}
        {[18, 30, 42, 54, 66, 78].map((y) => (
          <G key={y}>
            <Circle
              cx={15}
              cy={y}
              r={3.1}
              fill="#FFFDF8"
              stroke="#C7BDB3"
              strokeWidth={1}
            />
          </G>
        ))}

        {/* 링 */}
        {[18, 30, 42, 54, 66, 78].map((y) => (
          <G key={`ring-${y}`}>
            <Path
              d={`M15 ${y - 4} C7 ${y - 4} 7 ${y + 4} 15 ${y + 4}`}
              fill="none"
              stroke="#B8B4B0"
              strokeWidth={2.2}
              strokeLinecap="round"
            />
            <Path
              d={`M15 ${y - 3} C10 ${y - 3} 10 ${y + 3} 15 ${y + 3}`}
              fill="none"
              stroke="#FDFBF7"
              strokeWidth={0.8}
              strokeLinecap="round"
            />
          </G>
        ))}

        {/* 커버 하이라이트 */}
        <Path
          d="M24 15 Q29 12 34 15"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </G>

      {/* 4. 우측 상단: 컵 연필꽂이 */}
      <G transform="translate(244 18) scale(0.65)" opacity={0.84}>
        {/* 그림자 */}
        <Ellipse
          cx={44}
          cy={103}
          rx={38}
          ry={4}
          fill="#B7C9B9"
          opacity={0.25}
        />

        {/* 연필 뒤쪽: 노란 연필 */}
        <G transform="rotate(-10 27 42)">
          <Path
            d="M19 44 L20 9 Q20 5 24 2 Q28 5 28 9 L29 44 Z"
            fill="#FFE885"
            stroke="#E6C85D"
            strokeWidth={1.2}
            strokeLinejoin="round"
          />
          <Path
            d="M20 9 L24 2 L28 9 Z"
            fill="#F3D2A9"
            stroke="#D8B58B"
            strokeWidth={0.8}
          />
          <Path
            d="M23 4 L24 2 L25 4"
            fill="none"
            stroke="#8E7766"
            strokeWidth={0.8}
          />
        </G>

        {/* 민트 연필 */}
        <G transform="rotate(4 44 38)">
          <Path
            d="M36 44 L37 5 Q37 2 41 0 Q45 3 45 6 L46 44 Z"
            fill="#A8D8B9"
            stroke="#83B99A"
            strokeWidth={1.2}
            strokeLinejoin="round"
          />
          <Path
            d="M37 6 L41 0 L45 6 Z"
            fill="#F0D1AD"
            stroke="#D8B58B"
            strokeWidth={0.8}
          />
        </G>

        {/* 핑크 연필 */}
        <G transform="rotate(13 59 40)">
          <Path
            d="M52 45 L52 13 Q52 9 56 6 Q60 9 60 13 L60 45 Z"
            fill="#F7C9D5"
            stroke="#DDA7B7"
            strokeWidth={1.2}
            strokeLinejoin="round"
          />
          <Path
            d="M52 13 L56 6 L60 13 Z"
            fill="#F0D1AD"
            stroke="#D8B58B"
            strokeWidth={0.8}
          />
        </G>

        {/* 작은 자 */}
        <G transform="rotate(8 67 43)">
          <Rect
            x={65}
            y={12}
            width={8}
            height={39}
            rx={2}
            fill="#FDE4EC"
            stroke="#E5BAC7"
            strokeWidth={1}
          />
          <Path
            d="M67 18 H70 M67 24 H70 M67 30 H70 M67 36 H70 M67 42 H70"
            stroke="#C995A6"
            strokeWidth={0.8}
          />
        </G>

        {/* 컵 뒤쪽 테두리 */}
        <Ellipse
          cx={44}
          cy={46}
          rx={36}
          ry={10}
          fill="#D4EBDD"
          stroke="#91C6A6"
          strokeWidth={1.5}
        />

        {/* 컵 본체 */}
        <Path
          d="M9 45 L15 91 Q16 99 24 101 H64 Q72 99 73 91 L79 45 Z"
          fill="url(#stationeryCup)"
          stroke="#8EC3A2"
          strokeWidth={1.6}
          strokeLinejoin="round"
        />

        {/* 컵 입구 */}
        <Ellipse
          cx={44}
          cy={45}
          rx={35}
          ry={9}
          fill="#D8EDDF"
          stroke="#8EC3A2"
          strokeWidth={1.5}
        />
        <Ellipse
          cx={44}
          cy={45}
          rx={29}
          ry={5.5}
          fill="#92C5A3"
          opacity={0.35}
        />

        {/* 컵 앞쪽 하이라이트 */}
        <Path
          d="M20 57 Q22 74 25 83"
          fill="none"
          stroke="#EFF9F1"
          strokeWidth={3}
          strokeLinecap="round"
          opacity={0.9}
        />

        {/* 컵의 작은 별 장식 */}
        <Path
          d="M55 70 L57 75 L62 77 L57 79 L55 84 L53 79 L48 77 L53 75 Z"
          fill="#FFFDF4"
          opacity={0.9}
        />

        <Circle cx={35} cy={85} r={2} fill="#E5F4E9" />
      </G>

      {/* 5. 우측 하단: 어린이용 가위 */}
      <G transform="translate(244 153) scale(0.65)" opacity={0.84}>
        {/* 그림자 */}
        <Ellipse cx={44} cy={96} rx={38} ry={4} fill="#C9B59C" opacity={0.22} />

        {/* 가위의 금속 날 */}
        <Path
          d="M35 50 L71 16 Q74 13 77 16 Q79 19 75 22 L45 55 Z"
          fill="#DDE5E8"
          stroke="#AEBCC3"
          strokeWidth={1.4}
          strokeLinejoin="round"
        />
        <Path
          d="M43 54 L74 29 Q77 27 79 30 Q81 33 77 36 L49 59 Z"
          fill="#EEF2F3"
          stroke="#AEBCC3"
          strokeWidth={1.4}
          strokeLinejoin="round"
        />

        {/* 날의 빛 반사 */}
        <Path
          d="M48 43 L70 22 M53 51 L73 34"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={1.5}
          strokeLinecap="round"
        />

        {/* 왼쪽 가위 손잡이 */}
        <Path
          d="M36 51
             C26 43 13 44 10 54
             C7 64 15 75 26 72
             C35 69 38 60 33 54
             L28 58
             C31 63 28 67 24 67
             C18 67 15 62 17 56
             C19 51 26 51 31 56 Z"
          fill="#CBB3E8"
          stroke="#A991D0"
          strokeWidth={1.8}
          strokeLinejoin="round"
        />

        {/* 오른쪽 가위 손잡이 */}
        <Path
          d="M43 57
             C48 49 60 49 64 57
             C68 65 61 75 52 73
             C44 72 40 65 43 59
             L48 61
             C46 65 49 69 53 69
             C58 69 61 64 58 60
             C55 55 49 56 46 61 Z"
          fill="#E3D5F5"
          stroke="#A991D0"
          strokeWidth={1.8}
          strokeLinejoin="round"
        />

        {/* 가위 중심 나사 */}
        <Circle
          cx={40}
          cy={56}
          r={5}
          fill="#F8EFCF"
          stroke="#B9A5D5"
          strokeWidth={1.5}
        />
        <Circle cx={40} cy={56} r={1.5} fill="#A991D0" />
      </G>

      {/* 6. 가장자리의 작은 클립 장식 */}

      {/* 좌측 아래 민트색 종이 클립 */}
      <G transform="translate(17 139) rotate(-18)" opacity={0.72}>
        <Path
          d="M8 0
             C2 0 0 4 0 9
             V23
             C0 29 9 29 9 23
             V8
             C9 5 5 5 5 8
             V22"
          fill="none"
          stroke="#A8D8B9"
          strokeWidth={2.8}
          strokeLinecap="round"
        />
        <Path
          d="M8 2 C5 2 3 5 3 9 V22"
          fill="none"
          stroke="#EAF8EE"
          strokeWidth={1}
          strokeLinecap="round"
        />
        <G transform="scale(0.8) translate(-30,0)">
          {/* 6. 슬라이딩 지우개 */}
          {/* 지우개 아래쪽 그림자 */}
          <Rect
            x={12}
            y={82}
            width={69}
            height={15}
            rx={5}
            fill="#B8CDD7"
            opacity={0.2}
          />

          {/* 지우개 본체 */}
          <Rect
            x={11}
            y={75}
            width={70}
            height={19}
            rx={5}
            fill="url(#stationeryEraser)"
            stroke="#AFCFDF"
            strokeWidth={1.5}
          />

          {/* 지우개 포장지 */}
          <Path
            d="M15 78 Q15 76 19 76 H47 V93 H19 Q15 93 15 89 Z"
            fill="#D7ECF6"
            stroke="#B7D9E9"
            strokeWidth={0.8}
          />

          {/* 노출된 크림색 지우개 */}
          <Path
            d="M47 76 H74 Q78 76 78 80 V89 Q78 93 74 93 H47 Z"
            fill="#FFFDF4"
            stroke="#D8D6CC"
            strokeWidth={1}
          />

          {/* 포장지 장식선 */}
          <Path
            d="M21 81 H40 M21 85 H40 M21 89 H35"
            stroke="#A7CCDE"
            strokeWidth={1}
            strokeLinecap="round"
          />

          {/* 지우개 하이라이트 */}
          <Path
            d="M53 79 H71"
            stroke="#FFFFFF"
            strokeWidth={1.8}
            strokeLinecap="round"
          />

          {/* 작은 포장지 별 */}
          <Path
            d="M30 63 L31.5 66 L35 67.5 L31.5 69 L30 72 L28.5 69 L25 67.5 L28.5 66 Z"
            fill="#FFE885"
          />
        </G>
      </G>

      {/* 우측 중앙의 작은 핑크 클립 */}
      <G transform="translate(299 94) rotate(16)" opacity={0.7}>
        <Path
          d="M5 0
             C0 0 -1 4 0 8
             V18
             C0 24 8 24 8 18
             V7
             C8 4 4 4 4 7
             V17"
          fill="none"
          stroke="#F0BFCF"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
      </G>

      {/* 좌측 가장자리의 라벤더 반짝임 */}
      <Path
        d="M23 116 L25 121 L30 123 L25 125 L23 130 L21 125 L16 123 L21 121 Z"
        fill="#CBB3E8"
        opacity={0.72}
      />

      {/* 중앙은 비워두고 배경에만 밀크 톤을 적용 */}
      <Rect
        x={7}
        y={7}
        width={306}
        height={226}
        rx={14}
        fill="#FFFDF6"
        opacity={0.3}
      />

      {/* 소품의 선명도를 유지하기 위해 중앙 배경을 한 번 더 정돈 */}
      <Rect
        x={76}
        y={61}
        width={168}
        height={118}
        rx={10}
        fill="#FFFDF8"
        opacity={0.01}
      />
    </>
  );
}

export function ElectronicsScene() {
  return (
    <>
      <Defs>
        <LinearGradient id="electronicsBg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFFDF8" />
          <Stop offset="1" stopColor="#FFF7EF" />
        </LinearGradient>

        <LinearGradient id="electronicsTvBody" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#D3EBDD" />
          <Stop offset="1" stopColor="#A8D8B9" />
        </LinearGradient>

        <LinearGradient id="electronicsScreen" x1="0" y1="0" x2="0.8" y2="1">
          <Stop offset="0" stopColor="#F1FAFF" />
          <Stop offset="1" stopColor="#D4EAF7" />
        </LinearGradient>

        <LinearGradient id="electronicsRadio" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFF0F0" />
          <Stop offset="1" stopColor="#F5C9D5" />
        </LinearGradient>

        <LinearGradient id="electronicsKettle" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FFF3B5" />
          <Stop offset="1" stopColor="#FFE885" />
        </LinearGradient>
      </Defs>

      {/* 1. 크림빛 배경 */}
      <Rect
        x={0}
        y={0}
        width={320}
        height={240}
        rx={14}
        fill="url(#electronicsBg)"
      />

      {/* 2. 가장자리의 부드러운 전기 신호 파동 */}
      <G
        fill="none"
        stroke="#E5DDD0"
        strokeWidth={1.2}
        strokeLinecap="round"
        opacity={0.65}
      >
        {/* 우측 상단 */}
        <Path d="M201 19 Q219 31 201 43" />
        <Path d="M207 15 Q232 31 207 47" />
        <Path d="M214 12 Q244 31 214 51" />

        <Path d="M267 49 Q279 39 291 49" />
        <Path d="M262 54 Q279 40 296 54" />

        {/* 좌측 하단 */}
        <Path d="M19 199 Q35 185 51 199" />
        <Path d="M13 205 Q35 184 57 205" />
        <Path d="M8 211 Q35 182 62 211" />

        <Path d="M82 218 Q94 208 106 218" />
        <Path d="M77 223 Q94 207 111 223" />
      </G>

      {/* 3. 가장자리의 파스텔 전기 장식 */}
      <G opacity={0.72}>
        {/* 작은 번개 */}
        <Path
          d="M104 17 L98 27 H104 L100 35 L112 23 H106 L110 17 Z"
          fill="#FFE885"
        />

        <Path
          d="M220 51 L215 59 H220 L217 65 L227 55 H222 L225 51 Z"
          fill="#CBB3E8"
        />

        {/* 전원 버튼 장식 */}
        <G transform="translate(112 50)">
          <Circle cx={0} cy={0} r={7} fill="#FDE4EC" opacity={0.65} />
          <Path
            d="M0 -4 V1 M-3 -2.5 A5 5 0 1 0 3 -2.5"
            fill="none"
            stroke="#D6A6B7"
            strokeWidth={1.5}
            strokeLinecap="round"
          />
        </G>

        {/* 민트색 작은 전원 기호 */}
        <G transform="translate(111 187)">
          <Circle cx={0} cy={0} r={6} fill="#A8D8B9" opacity={0.45} />
          <Path
            d="M0 -3 V1 M-2.5 -1.5 A4 4 0 1 0 2.5 -1.5"
            fill="none"
            stroke="#78B993"
            strokeWidth={1.3}
            strokeLinecap="round"
          />
        </G>

        {/* 작은 별 */}
        <Path
          d="M91 157 L93 162 L98 164 L93 166 L91 171 L89 166 L84 164 L89 162 Z"
          fill="#FFE885"
        />

        <Path
          d="M230 123 L232 128 L237 130 L232 132 L230 137 L228 132 L223 130 L228 128 Z"
          fill="#FDE4EC"
        />

        <Circle cx={91} cy={42} r={2} fill="#A8D8B9" />
        <Circle cx={230} cy={42} r={2} fill="#CBB3E8" />
        <Circle cx={95} cy={219} r={2} fill="#FDE4EC" />
        <Circle cx={232} cy={201} r={2} fill="#A8D8B9" />
      </G>

      {/* 4. 좌측 상단: 미니 클래식 TV */}
      <G transform="translate(12 12) scale(0.65)" opacity={0.84}>
        {/* 안테나 */}
        <Path
          d="M37 22 L25 3 M52 22 L66 3"
          fill="none"
          stroke="#8EAA99"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
        <Circle cx={24} cy={3} r={2.5} fill="#FFE885" />
        <Circle cx={67} cy={3} r={2.5} fill="#FDE4EC" />

        {/* 안테나 연결부 */}
        <Circle
          cx={45}
          cy={24}
          r={5}
          fill="#FFF3E0"
          stroke="#A8CDB5"
          strokeWidth={1.3}
        />

        {/* TV 아래 그림자 */}
        <Ellipse
          cx={47}
          cy={104}
          rx={44}
          ry={4}
          fill="#B7C9B9"
          opacity={0.28}
        />

        {/* TV 다리 */}
        <Path
          d="M26 85 L21 98 H33 L38 87 Z"
          fill="#A8CDB5"
          stroke="#86B69A"
          strokeWidth={1.2}
          strokeLinejoin="round"
        />
        <Path
          d="M56 87 L61 98 H73 L68 85 Z"
          fill="#A8CDB5"
          stroke="#86B69A"
          strokeWidth={1.2}
          strokeLinejoin="round"
        />

        {/* TV 본체 */}
        <Rect
          x={5}
          y={22}
          width={84}
          height={68}
          rx={13}
          fill="url(#electronicsTvBody)"
          stroke="#8EBDA0"
          strokeWidth={2}
        />

        {/* 본체 안쪽 테두리 */}
        <Rect
          x={10}
          y={27}
          width={74}
          height={58}
          rx={10}
          fill="#C9E6D4"
          stroke="#E8F5EC"
          strokeWidth={1.3}
        />

        {/* TV 화면 */}
        <Rect
          x={15}
          y={32}
          width={48}
          height={48}
          rx={7}
          fill="url(#electronicsScreen)"
          stroke="#A9CADB"
          strokeWidth={1.5}
        />

        {/* 화면 속 부드러운 반사광 */}
        <Path
          d="M21 39 Q27 34 34 37"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
        <Path
          d="M20 46 Q22 42 25 42"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={1.4}
          strokeLinecap="round"
        />

        {/* 화면 속 작은 구름 */}
        <G fill="#FFFFFF" opacity={0.7}>
          <Circle cx={28} cy={62} r={4} />
          <Circle cx={34} cy={60} r={5} />
          <Circle cx={40} cy={63} r={3.5} />
          <Path d="M25 63 H43 V66 H25 Z" />
        </G>

        {/* 오른쪽 조절 다이얼 */}
        <Circle
          cx={73}
          cy={43}
          r={5.5}
          fill="#FFFDF9"
          stroke="#8EBDA0"
          strokeWidth={1.3}
        />
        <Circle cx={73} cy={43} r={2} fill="#A8D8B9" />

        <Circle
          cx={73}
          cy={59}
          r={4}
          fill="#FFF3E0"
          stroke="#8EBDA0"
          strokeWidth={1.2}
        />
        <Circle cx={73} cy={59} r={1.5} fill="#E5C982" />

        {/* 본체 하이라이트 */}
        <Path
          d="M17 30 Q23 26 31 29"
          fill="none"
          stroke="#F6FFF8"
          strokeWidth={2}
          strokeLinecap="round"
        />

        {/* 작은 장식 점 */}
        <Circle cx={72} cy={75} r={2} fill="#FFE885" />
      </G>

      {/* 5. 우측 상단: 미니 스탠드 선풍기 */}
      <G transform="translate(244 13) scale(0.65)" opacity={0.82}>
        {/* 그림자 */}
        <Ellipse
          cx={43}
          cy={106}
          rx={29}
          ry={4}
          fill="#B7A99A"
          opacity={0.25}
        />

        {/* 받침대 */}
        <Path
          d="M28 99 Q43 93 58 99 L64 104 Q43 111 22 104 Z"
          fill="#8C8174"
          stroke="#6E6255"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />

        {/* 기둥 */}
        <Path
          d="M40 67 H47 L49 100 H38 Z"
          fill="#A99B8B"
          stroke="#6E6255"
          strokeWidth={1.6}
          strokeLinejoin="round"
        />
        <Path
          d="M43 71 L44 96"
          fill="none"
          stroke="#D7CEC3"
          strokeWidth={1.5}
          strokeLinecap="round"
        />

        {/* 선풍기 목 연결부 */}
        <Circle
          cx={43}
          cy={66}
          r={8}
          fill="#B7AA9C"
          stroke="#6E6255"
          strokeWidth={1.5}
        />

        {/* 안전망 바깥 프레임 */}
        <Circle
          cx={43}
          cy={37}
          r={33}
          fill="#F5F0E9"
          stroke="#6E6255"
          strokeWidth={3}
        />

        {/* 안전망 안쪽 링 */}
        <Circle
          cx={43}
          cy={37}
          r={27}
          fill="#EAF4F9"
          stroke="#A99B8B"
          strokeWidth={1.5}
        />

        <Circle
          cx={43}
          cy={37}
          r={19}
          fill="none"
          stroke="#C7D5DC"
          strokeWidth={1}
        />

        {/* 선풍기 날개 */}
        <Path
          d="M43 34
             C31 29 22 14 30 10
             C39 7 45 21 46 32 Z"
          fill="#D2E8F9"
          stroke="#A9CDE5"
          strokeWidth={1.2}
        />

        <Path
          d="M46 37
             C52 25 68 20 71 29
             C74 38 60 43 48 42 Z"
          fill="#D2E8F9"
          stroke="#A9CDE5"
          strokeWidth={1.2}
        />

        <Path
          d="M42 41
             C51 49 52 65 42 66
             C33 66 35 51 39 42 Z"
          fill="#D2E8F9"
          stroke="#A9CDE5"
          strokeWidth={1.2}
        />

        <Path
          d="M39 37
             C27 44 12 38 15 30
             C18 22 32 29 41 33 Z"
          fill="#D2E8F9"
          stroke="#A9CDE5"
          strokeWidth={1.2}
        />

        {/* 날개의 부드러운 하이라이트 */}
        <Path
          d="M33 14 Q39 18 41 27"
          fill="none"
          stroke="#F8FDFF"
          strokeWidth={1.8}
          strokeLinecap="round"
        />
        <Path
          d="M63 30 Q57 34 51 36"
          fill="none"
          stroke="#F8FDFF"
          strokeWidth={1.8}
          strokeLinecap="round"
        />

        {/* 중앙 허브 */}
        <Circle
          cx={43}
          cy={37}
          r={7}
          fill="#F7E8D8"
          stroke="#6E6255"
          strokeWidth={1.5}
        />
        <Circle cx={43} cy={37} r={3} fill="#B4A391" />

        {/* 안전망 방사형 선 */}
        <G stroke="#A99B8B" strokeWidth={0.9} opacity={0.8}>
          <Path d="M43 5 V30" />
          <Path d="M43 44 V69" />
          <Path d="M11 37 H36" />
          <Path d="M50 37 H75" />
          <Path d="M20 14 L38 32" />
          <Path d="M48 42 L66 60" />
          <Path d="M66 14 L48 32" />
          <Path d="M38 42 L20 60" />
        </G>

        {/* 프레임을 다시 얹어 선명하게 */}
        <Circle
          cx={43}
          cy={37}
          r={33}
          fill="none"
          stroke="#6E6255"
          strokeWidth={2.5}
        />

        {/* 상단 하이라이트 */}
        <Path
          d="M23 12 Q32 4 42 5"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </G>

      {/* 6. 좌측 하단: 레트로 라디오 */}
      <G transform="translate(12 151) scale(0.65)" opacity={0.84}>
        {/* 그림자 */}
        <Ellipse
          cx={48}
          cy={100}
          rx={43}
          ry={4}
          fill="#C9B59C"
          opacity={0.24}
        />

        {/* 안테나 */}
        <Path
          d="M20 29 L10 2"
          fill="none"
          stroke="#B6A69A"
          strokeWidth={2.2}
          strokeLinecap="round"
        />
        <Circle cx={10} cy={2} r={2.2} fill="#FFE885" />

        {/* 안테나 작은 연결부 */}
        <Circle
          cx={20}
          cy={29}
          r={3}
          fill="#FFFDF9"
          stroke="#D4B7B9"
          strokeWidth={1}
        />

        {/* 라디오 본체 */}
        <Rect
          x={5}
          y={27}
          width={86}
          height={66}
          rx={10}
          fill="url(#electronicsRadio)"
          stroke="#D7AAB8"
          strokeWidth={1.8}
        />

        {/* 상단 테두리 */}
        <Path
          d="M13 33 Q47 28 82 33"
          fill="none"
          stroke="#FFF8F6"
          strokeWidth={2}
          strokeLinecap="round"
        />

        {/* 스피커 패널 */}
        <Rect
          x={12}
          y={36}
          width={43}
          height={43}
          rx={5}
          fill="#FFF7F2"
          stroke="#E3BAC5"
          strokeWidth={1.3}
        />

        {/* 스피커 그릴 */}
        <G
          stroke="#D9AEBB"
          strokeWidth={1}
          strokeLinecap="round"
          opacity={0.85}
        >
          <Path d="M18 42 V73 M23 42 V73 M28 42 V73 M33 42 V73 M38 42 V73 M43 42 V73 M48 42 V73" />
        </G>

        {/* 스피커 중앙 장식 */}
        <Circle cx={33} cy={57} r={10} fill="#FDE4EC" opacity={0.55} />
        <Circle
          cx={33}
          cy={57}
          r={5}
          fill="#F8D2DD"
          stroke="#D9AEBB"
          strokeWidth={1}
        />
        <Circle cx={33} cy={57} r={1.8} fill="#FFFDF9" />

        {/* 오른쪽 다이얼 */}
        <Circle
          cx={70}
          cy={46}
          r={9}
          fill="#FFFDF9"
          stroke="#D7AAB8"
          strokeWidth={1.5}
        />
        <Circle
          cx={70}
          cy={46}
          r={5}
          fill="#F6D5DF"
          stroke="#E3BAC5"
          strokeWidth={1}
        />
        <Circle cx={70} cy={46} r={1.8} fill="#B9909B" />

        {/* 작은 버튼 */}
        <Circle
          cx={65}
          cy={67}
          r={3.5}
          fill="#FFFDF9"
          stroke="#D7AAB8"
          strokeWidth={1}
        />
        <Circle
          cx={76}
          cy={67}
          r={3.5}
          fill="#FFE885"
          stroke="#E4C965"
          strokeWidth={1}
        />

        {/* 하단 장식선 */}
        <Path
          d="M14 85 H82"
          stroke="#E6BFC9"
          strokeWidth={1.2}
          strokeLinecap="round"
        />

        {/* 라디오 다리 */}
        <Path d="M16 92 L14 98 H27 L25 92 Z" fill="#D5B0B9" />
        <Path d="M72 92 L70 98 H83 L81 92 Z" fill="#D5B0B9" />

        {/* 본체 하이라이트 */}
        <Path
          d="M14 32 Q20 29 27 32"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </G>

      {/* 7. 우측 하단: 파스텔 전기포트 */}
      <G transform="translate(244 153) scale(0.65)" opacity={0.84}>
        {/* 그림자 */}
        <Ellipse cx={44} cy={96} rx={38} ry={4} fill="#C9B59C" opacity={0.24} />

        {/* 주전자 손잡이 */}
        <Path
          d="M61 39
             C81 35 86 48 81 64
             C78 75 72 79 62 76
             L62 67
             C69 70 74 65 75 58
             C77 49 73 45 62 48 Z"
          fill="#CBB3E8"
          stroke="#A991D0"
          strokeWidth={2}
          strokeLinejoin="round"
        />

        {/* 손잡이 안쪽 */}
        <Path
          d="M65 48
             C74 46 77 51 74 60
             C73 65 70 67 65 65"
          fill="none"
          stroke="#EEE5FA"
          strokeWidth={2}
          strokeLinecap="round"
        />

        {/* 주전자 몸통 */}
        <Path
          d="M17 42
             Q17 32 28 30
             H55
             Q66 32 68 44
             L72 73
             Q73 87 61 91
             H27
             Q15 87 16 73 Z"
          fill="url(#electronicsKettle)"
          stroke="#D7BC60"
          strokeWidth={1.8}
          strokeLinejoin="round"
        />

        {/* 주전자 아랫부분 */}
        <Path
          d="M20 79 Q43 86 68 79 L69 85 Q66 92 59 92 H28 Q20 91 19 85 Z"
          fill="#F3D66D"
          stroke="#D7BC60"
          strokeWidth={1.2}
          strokeLinejoin="round"
        />

        {/* 주전자 주둥이 */}
        <Path
          d="M19 42
             L5 34
             Q1 32 2 38
             L11 57
             Q15 61 20 56 Z"
          fill="#FFEBA0"
          stroke="#D7BC60"
          strokeWidth={1.6}
          strokeLinejoin="round"
        />

        {/* 주둥이 끝 */}
        <Path
          d="M3 36 L11 42"
          fill="none"
          stroke="#FFF9D9"
          strokeWidth={2}
          strokeLinecap="round"
        />

        {/* 뚜껑 */}
        <Path
          d="M22 32 Q23 24 33 24 H51 Q61 24 63 33 Z"
          fill="#D9C7F0"
          stroke="#A991D0"
          strokeWidth={1.6}
          strokeLinejoin="round"
        />

        {/* 뚜껑 하이라이트 */}
        <Path
          d="M29 28 Q39 25 49 28"
          fill="none"
          stroke="#F7F1FF"
          strokeWidth={1.8}
          strokeLinecap="round"
        />

        {/* 뚜껑 손잡이 */}
        <Path
          d="M35 24
             Q34 17 42 17
             Q50 17 49 24 Z"
          fill="#CBB3E8"
          stroke="#A991D0"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />

        {/* 전원 버튼 */}
        <Circle
          cx={44}
          cy={65}
          r={7}
          fill="#FFFDF9"
          stroke="#D7BC60"
          strokeWidth={1.4}
        />
        <Path
          d="M44 61 V65 M41 62.5 A4 4 0 1 0 47 62.5"
          fill="none"
          stroke="#B6A0D8"
          strokeWidth={1.5}
          strokeLinecap="round"
        />

        {/* 수위 표시 */}
        <Path
          d="M27 48 V66"
          stroke="#E5C85F"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <Path
          d="M27 52 H32 M27 59 H32 M27 66 H32"
          stroke="#E5C85F"
          strokeWidth={1}
          strokeLinecap="round"
        />

        {/* 몸통 하이라이트 */}
        <Path
          d="M24 39 Q23 47 25 52"
          fill="none"
          stroke="#FFFBE4"
          strokeWidth={3}
          strokeLinecap="round"
        />

        {/* 작은 별 장식 */}
        <Path
          d="M53 47 L55 51 L59 53 L55 55 L53 59 L51 55 L47 53 L51 51 Z"
          fill="#FFFDF9"
          opacity={0.9}
        />
      </G>

      {/* 8. 가장자리의 작은 연결 점 */}
      <G opacity={0.65}>
        <Circle cx={84} cy={112} r={3} fill="#A8D8B9" opacity={0.5} />
        <Circle cx={91} cy={119} r={1.7} fill="#CBB3E8" />

        <Circle cx={235} cy={103} r={2.5} fill="#FDE4EC" />
        <Circle cx={228} cy={110} r={1.5} fill="#FFE885" />

        {/* 연결을 상징하는 작은 점선 */}
        <Path
          d="M89 130 Q96 135 103 130"
          fill="none"
          stroke="#D9CDE8"
          strokeWidth={1.2}
          strokeDasharray="2 3"
          strokeLinecap="round"
        />
      </G>

      {/* 9. 배경에만 은은한 밀크 오버레이 */}
      {/* 소품 위에 덮지 않아 색감과 외곽선을 선명하게 유지 */}
      <Rect
        x={7}
        y={7}
        width={306}
        height={226}
        rx={14}
        fill="#FFFDF6"
        opacity={0.3}
      />
    </>
  );
}

export function BallScene() {
  return (
    <>
      <Defs>
        <LinearGradient id="ballSceneBg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFFDF9" />
          <Stop offset="1" stopColor="#FFF7EE" />
        </LinearGradient>

        <LinearGradient id="ballMat" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#F1F4E9" />
          <Stop offset="1" stopColor="#E5EEDC" />
        </LinearGradient>

        <LinearGradient id="beachBallPink" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FFF3F4" />
          <Stop offset="1" stopColor="#F5C9D8" />
        </LinearGradient>

        <LinearGradient id="beachBallBlue" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#EDF8FF" />
          <Stop offset="1" stopColor="#C4DFF4" />
        </LinearGradient>

        <LinearGradient id="bounceBallLavender" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#E3D5F5" />
          <Stop offset="1" stopColor="#BDA2DE" />
        </LinearGradient>

        <LinearGradient id="mintPlayBall" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#C9E9D4" />
          <Stop offset="1" stopColor="#96C9AA" />
        </LinearGradient>
      </Defs>

      {/* 기본 크림빛 배경 */}
      <Rect
        x={0}
        y={0}
        width={320}
        height={240}
        rx={14}
        fill="url(#ballSceneBg)"
      />

      {/* 하단의 포근한 놀이 매트 */}
      <Path
        d="M0 191 Q48 185 91 191 T179 190 T263 190 T320 188 L320 240 L0 240 Z"
        fill="url(#ballMat)"
      />

      <Path
        d="M0 191 Q48 185 91 191 T179 190 T263 190 T320 188"
        fill="none"
        stroke="#E8E2D5"
        strokeWidth={1.5}
        strokeLinecap="round"
      />

      {/* 매트의 은은한 스티치 */}
      <Path
        d="M83 208 Q160 202 237 208"
        fill="none"
        stroke="#D9E5D2"
        strokeWidth={1}
        strokeDasharray="3 5"
        opacity={0.7}
      />

      {/* 가장자리의 바운스 궤적 */}
      <G
        fill="none"
        stroke="#E4DDD2"
        strokeWidth={1.2}
        strokeDasharray="4 4"
        strokeLinecap="round"
        opacity={0.7}
      >
        <Path d="M8 91 Q19 72 36 81 T64 65" />
        <Path d="M255 91 Q278 72 295 48 T313 29" />
        <Path d="M77 145 Q91 132 101 143" />
        <Path d="M220 135 Q234 119 246 130" />
      </G>

      {/* 작은 별가루와 방울 */}
      <G opacity={0.78}>
        <Path
          d="M91 28 L93 33 L98 35 L93 37 L91 42 L89 37 L84 35 L89 33 Z"
          fill="#FFE885"
        />
        <Path
          d="M226 31 L228 36 L233 38 L228 40 L226 45 L224 40 L219 38 L224 36 Z"
          fill="#FDE4EC"
        />
        <Path
          d="M93 151 L94.5 155 L99 156.5 L94.5 158 L93 162 L91.5 158 L87 156.5 L91.5 155 Z"
          fill="#CBB3E8"
        />
        <Path
          d="M225 180 L226.5 184 L231 185.5 L226.5 187 L225 191 L223.5 187 L219 185.5 L223.5 184 Z"
          fill="#FFE885"
        />

        <Circle cx={83} cy={70} r={2} fill="#A8D8B9" />
        <Circle cx={236} cy={76} r={2.2} fill="#CBB3E8" />
        <Circle cx={102} cy={177} r={1.8} fill="#FDE4EC" />
        <Circle cx={216} cy={96} r={1.6} fill="#FFE885" />
        <Circle cx={306} cy={111} r={2} fill="#A8D8B9" />
        <Circle cx={12} cy={130} r={1.8} fill="#CBB3E8" />
        <Circle cx={288} cy={143} r={1.7} fill="#FDE4EC" />
      </G>

      {/* 좌측 상단: 줄무늬 파스텔 비치볼 */}
      <G transform="translate(14 15) rotate(-12 30 30)" opacity={0.88}>
        <Circle
          cx={31}
          cy={32}
          r={27}
          fill="#FFFDF9"
          stroke="#E8D9CF"
          strokeWidth={1.2}
        />

        {/* 부드러운 색상 패널 */}
        <Path d="M31 32 L31 5 A27 27 0 0 0 7 20 Z" fill="url(#beachBallPink)" />
        <Path d="M31 32 L7 20 A27 27 0 0 0 15 53 Z" fill="#FFE885" />
        <Path
          d="M31 32 L15 53 A27 27 0 0 0 52 51 Z"
          fill="url(#beachBallBlue)"
        />
        <Path d="M31 32 L52 51 A27 27 0 0 0 58 23 Z" fill="#FDE4EC" />
        <Path d="M31 32 L58 23 A27 27 0 0 0 31 5 Z" fill="#D2E8F9" />

        {/* 패널 구분선 */}
        <Path
          d="M31 5 Q22 20 31 32 Q42 40 52 51
             M7 20 Q24 24 31 32
             M15 53 Q24 40 31 32
             M58 23 Q41 26 31 32"
          fill="none"
          stroke="#FFFDF9"
          strokeWidth={1.4}
          strokeLinecap="round"
        />

        <Circle cx={31} cy={32} r={3.1} fill="#FFFDF9" />
        <Ellipse
          cx={22}
          cy={15}
          rx={7}
          ry={3}
          fill="#FFFFFF"
          opacity={0.45}
          transform="rotate(-35 22 15)"
        />
      </G>

      {/* 우측 상단: 라벤더 도트 탱탱볼 */}
      <G transform="translate(249 22)" opacity={0.88}>
        <Ellipse cx={27} cy={56} rx={23} ry={4} fill="#D9D0E0" opacity={0.28} />

        <Circle
          cx={27}
          cy={29}
          r={26}
          fill="url(#bounceBallLavender)"
          stroke="#B7A0D2"
          strokeWidth={1.1}
        />

        <Ellipse
          cx={19}
          cy={13}
          rx={9}
          ry={4}
          fill="#FFFFFF"
          opacity={0.32}
          transform="rotate(-35 19 13)"
        />

        {/* 크림색 도트 */}
        <G fill="#FFFDF9" opacity={0.95}>
          <Circle cx={17} cy={17} r={3.1} />
          <Circle cx={34} cy={13} r={2.6} />
          <Circle cx={42} cy={27} r={3.2} />
          <Circle cx={25} cy={31} r={2.8} />
          <Circle cx={13} cy={37} r={2.5} />
          <Circle cx={36} cy={43} r={2.6} />
          <Circle cx={23} cy={47} r={2} />
        </G>
      </G>

      {/* 좌측 하단: 미니 볼링핀 두 개 */}
      <G transform="translate(12 151)" opacity={0.88}>
        <Ellipse cx={34} cy={65} rx={30} ry={4} fill="#CFCFC0" opacity={0.3} />

        {/* 뒤쪽 작은 핀 */}
        <G transform="translate(33 8) rotate(9 12 24)">
          <Path
            d="M8 8
               Q5 1 10 -2
               Q16 -5 20 1
               Q23 6 19 13
               Q16 19 17 27
               Q19 37 23 44
               Q24 51 17 53
               L8 53
               Q1 51 3 44
               Q7 34 8 27
               Q9 19 6 13 Z"
            fill="#FFFDF9"
            stroke="#DED8CE"
            strokeWidth={1}
          />
          <Path d="M7 13 Q13 16 20 13 L18 18 Q13 21 8 18 Z" fill="#A8D8B9" />
          <Path
            d="M8 14 Q13 17 19 14"
            fill="none"
            stroke="#D0E9D8"
            strokeWidth={1}
          />
        </G>

        {/* 앞쪽 큰 핀 */}
        <G transform="translate(4 14)">
          <Path
            d="M11 9
               Q7 2 12 -2
               Q18 -6 23 0
               Q27 6 22 14
               Q19 20 20 29
               Q22 39 27 47
               Q28 54 21 57
               L9 57
               Q2 54 4 47
               Q9 38 10 29
               Q11 20 7 14 Z"
            fill="#FFFDF9"
            stroke="#DED8CE"
            strokeWidth={1.1}
            strokeLinejoin="round"
          />

          <Path d="M8 14 Q15 18 23 14 L21 20 Q15 23 10 20 Z" fill="#A8D8B9" />

          <Path
            d="M10 15 Q15 18 22 15"
            fill="none"
            stroke="#D7EFE0"
            strokeWidth={1}
          />

          <Ellipse
            cx={12}
            cy={6}
            rx={4}
            ry={2}
            fill="#FFFFFF"
            opacity={0.7}
            transform="rotate(-30 12 6)"
          />
          <Circle
            cx={45}
            cy={45}
            r={15}
            fill="url(#mintPlayBall)"
            stroke="#8FBEA0"
            strokeWidth={1.2}
          />
        </G>
      </G>

      {/* 우측 하단: 별무늬 민트 놀이 공 */}
      <G transform="translate(239 157)" opacity={0.9}>
        <Ellipse cx={32} cy={59} rx={30} ry={4} fill="#C8D9CB" opacity={0.3} />

        <Circle
          cx={29}
          cy={30}
          r={27}
          fill="url(#mintPlayBall)"
          stroke="#8FBEA0"
          strokeWidth={1.2}
        />

        {/* 공의 반사광 */}
        <Path
          d="M13 16 Q19 8 28 8"
          fill="none"
          stroke="#F4FFF6"
          strokeWidth={2.4}
          strokeLinecap="round"
          opacity={0.8}
        />

        {/* 노란 별 */}
        <Path
          d="M29 14
             L33.5 24
             L44 25
             L36 32
             L38.5 42
             L29 36.5
             L19.5 42
             L22 32
             L14 25
             L24.5 24 Z"
          fill="#FFE885"
          stroke="#F4D76F"
          strokeWidth={0.8}
          strokeLinejoin="round"
        />

        {/* 옆의 장난감 블록 */}
        {/* <G transform="translate(48 34)">
          <Path
            d="M0 8 L17 1 L30 8 L13 16 Z"
            fill="#FDE4EC"
            stroke="#E7C8D2"
            strokeWidth={1}
            strokeLinejoin="round"
          />
          <Path
            d="M0 8 L13 16 L13 31 L0 23 Z"
            fill="#F5D1DD"
            stroke="#E7C8D2"
            strokeWidth={1}
            strokeLinejoin="round"
          />
          <Path
            d="M13 16 L30 8 L30 23 L13 31 Z"
            fill="#CBB3E8"
            stroke="#B7A0D2"
            strokeWidth={1}
            strokeLinejoin="round"
          />
          <Path
            d="M6 11 L13 15 L23 10"
            fill="none"
            stroke="#FFFDF9"
            strokeWidth={1}
            strokeLinecap="round"
            opacity={0.8}
          />
        </G> */}
      </G>

      {/* 가장자리의 작은 장식 */}
      <G opacity={0.72}>
        <Circle cx={76} cy={48} r={1.8} fill="#FDE4EC" />
        <Circle cx={240} cy={99} r={1.8} fill="#A8D8B9" />
        <Circle cx={84} cy={184} r={1.8} fill="#FFE885" />
        <Circle cx={232} cy={151} r={1.7} fill="#CBB3E8" />
      </G>

      {/* 배경에만 적용되는 우유빛 톤 다운 오버레이 */}
      <Rect
        x={0}
        y={0}
        width={320}
        height={240}
        rx={14}
        fill="#FFFDF6"
        opacity={0.3}
      />

      {/* 오버레이 위에 아주 은은한 장난감 하이라이트를 다시 살림 */}
      <G opacity={0.18}>
        <Circle cx={45} cy={43} r={23} fill="#FFFFFF" />
        <Circle cx={276} cy={51} r={20} fill="#FFFFFF" />
      </G>
    </>
  );
}

export function FurnitureScene() {
  return (
    <>
      <Defs>
        <LinearGradient id="furnitureWall" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFFDF9" />
          <Stop offset="1" stopColor="#FFF8F0" />
        </LinearGradient>

        <LinearGradient id="furnitureFloor" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#F5EBDD" />
          <Stop offset="1" stopColor="#EAD9C3" />
        </LinearGradient>

        <LinearGradient id="furnitureWood" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#E8D6BD" />
          <Stop offset="1" stopColor="#C9AD8E" />
        </LinearGradient>

        <LinearGradient id="furnitureLampGlow" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFF9EF" stopOpacity="0.85" />
          <Stop offset="1" stopColor="#FFE885" stopOpacity="0" />
        </LinearGradient>
      </Defs>

      {/* 둥근 크림빛 캔버스 */}
      <Rect x={0} y={0} width={320} height={240} rx={14} fill="#FFFDF8" />

      {/* 벽면 */}
      <Rect
        x={1}
        y={1}
        width={318}
        height={170}
        rx={13}
        fill="url(#furnitureWall)"
      />

      {/* 벽지 세로 스트라이프 */}
      <G stroke="#F0E8DE" strokeWidth={1} opacity={0.72}>
        <Path d="M18 12 V65" />
        <Path d="M42 12 V65" />
        <Path d="M66 12 V65" />
        <Path d="M90 12 V65" />
        <Path d="M114 12 V65" />
        <Path d="M138 12 V65" />
        <Path d="M182 12 V65" />
        <Path d="M206 12 V65" />
        <Path d="M230 12 V65" />
        <Path d="M254 12 V65" />
        <Path d="M278 12 V65" />
        <Path d="M302 12 V65" />
      </G>

      {/* 벽면 아래쪽의 은은한 장식 라인 */}
      <Path
        d="M9 160 Q80 158 150 160 T311 160"
        fill="none"
        stroke="#F0E4D5"
        strokeWidth={1}
        opacity={0.65}
      />

      {/* 바닥 */}
      <Rect x={1} y={170} width={318} height={69} fill="url(#furnitureFloor)" />

      {/* 벽과 바닥의 경계 */}
      <Path
        d="M7 170 Q160 172 313 170"
        fill="none"
        stroke="#EADCC8"
        strokeWidth={1.5}
      />

      {/* 바닥 마루 결 */}
      <G fill="none" stroke="#DCC8AE" strokeWidth={0.8} opacity={0.55}>
        <Path d="M0 194 Q80 192 160 194 T320 194" />
        <Path d="M0 218 Q80 216 160 218 T320 218" />
        <Path d="M65 171 L65 194" />
        <Path d="M245 171 L245 194" />
        <Path d="M150 195 L150 218" />
        <Path d="M285 195 L285 218" />
        <Path d="M35 219 L35 240" />
        <Path d="M210 219 L210 240" />
      </G>

      {/* 배경 전체에 얇게 얹는 밀크 오버레이 */}
      <Rect
        x={0}
        y={0}
        width={320}
        height={240}
        rx={14}
        fill="#FFFDF6"
        opacity={0.3}
      />

      {/* ================================================= */}
      {/* 좌측 상단: 작은 민트색 벽 액자 */}
      {/* ================================================= */}
      <G opacity={0.82}>
        {/* 액자 그림자 */}
        <Rect
          x={25}
          y={22}
          width={35}
          height={36}
          rx={4}
          fill="#D9CDBE"
          opacity={0.25}
        />

        {/* 프레임 */}
        <Rect
          x={23}
          y={19}
          width={35}
          height={36}
          rx={4}
          fill="#A8D8B9"
          stroke="#91C8A4"
          strokeWidth={1}
        />

        {/* 그림 안쪽 */}
        <Rect x={27} y={23} width={27} height={28} rx={2} fill="#FFFDF8" />

        {/* 그림 속 언덕 */}
        <Path d="M28 45 Q35 35 41 43 Q47 35 53 44 V50 H28 Z" fill="#D5E9D5" />

        {/* 노란 별 */}
        <Path
          d="M40 26 L42 31 L47 31.5 L43 35 L44 40 L40 37.5 L36 40 L37 35 L33 31.5 L38 31 Z"
          fill="#FFE885"
          stroke="#E9CE78"
          strokeWidth={0.6}
          strokeLinejoin="round"
        />

        {/* 액자 고리 */}
        <Path
          d="M37 19 Q40 14 43 19"
          fill="none"
          stroke="#C9B59C"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </G>

      {/* ================================================= */}
      {/* 우측 상단: 미니 원목 옷장 */}
      {/* ================================================= */}
      <G transform="translate(248 17) scale(0.65)" opacity={0.8}>
        {/* 바닥 그림자 */}
        <Ellipse cx={43} cy={103} rx={43} ry={5} fill="#C9B59C" opacity={0.3} />

        {/* 옷장 본체 */}
        <Rect
          x={5}
          y={8}
          width={76}
          height={94}
          rx={6}
          fill="url(#furnitureWood)"
          stroke="#C9AD8E"
          strokeWidth={1.5}
        />

        {/* 상단 장식 */}
        <Path
          d="M2 12 Q1 5 8 4 H78 Q85 5 84 12 Z"
          fill="#E8D6BD"
          stroke="#C9AD8E"
          strokeWidth={1.2}
        />

        {/* 왼쪽 문 */}
        <Rect
          x={11}
          y={17}
          width={29}
          height={48}
          rx={3}
          fill="#FFF9EF"
          stroke="#D6C1A6"
          strokeWidth={1}
        />

        {/* 오른쪽 문 */}
        <Rect
          x={46}
          y={17}
          width={29}
          height={48}
          rx={3}
          fill="#FFF9EF"
          stroke="#D6C1A6"
          strokeWidth={1}
        />

        {/* 문 안쪽 패널 */}
        <Rect
          x={15}
          y={21}
          width={21}
          height={40}
          rx={2}
          fill="none"
          stroke="#E8D9C5"
          strokeWidth={1}
        />
        <Rect
          x={50}
          y={21}
          width={21}
          height={40}
          rx={2}
          fill="none"
          stroke="#E8D9C5"
          strokeWidth={1}
        />

        {/* 라벤더 손잡이 */}
        <Circle cx={35} cy={42} r={2.5} fill="#CBB3E8" />
        <Circle cx={51} cy={42} r={2.5} fill="#CBB3E8" />

        {/* 아래쪽 서랍 */}
        <Rect
          x={11}
          y={70}
          width={64}
          height={24}
          rx={3}
          fill="#F8EBDD"
          stroke="#D6C1A6"
          strokeWidth={1}
        />

        <Path d="M15 74 H71" stroke="#E8D9C5" strokeWidth={1} />

        <Circle cx={43} cy={82} r={2.8} fill="#CBB3E8" />

        {/* 옷장 다리 */}
        <Path
          d="M12 98 L11 105 H21 L22 100 M65 100 L66 105 H76 L75 98"
          fill="#B59F84"
          stroke="#B59F84"
          strokeWidth={1.2}
          strokeLinejoin="round"
        />

        {/* 나무결 하이라이트 */}
        <Path
          d="M8 14 Q10 38 8 58"
          fill="none"
          stroke="#F5E7D5"
          strokeWidth={1.5}
          strokeLinecap="round"
          opacity={0.8}
        />
      </G>

      {/* ================================================= */}
      {/* 좌측 하단: 포근한 1인용 안락의자 */}
      {/* ================================================= */}
      <G transform="translate(12 150) scale(0.65)" opacity={0.82}>
        {/* 바닥 그림자 */}
        <Ellipse
          cx={49}
          cy={103}
          rx={47}
          ry={5}
          fill="#B59F84"
          opacity={0.28}
        />

        {/* 뒤쪽 등받이 */}
        <Path
          d="M17 37 Q16 16 34 13 H65 Q82 16 81 38 L78 67 H19 Z"
          fill="#F8D8E2"
          stroke="#E8BAC9"
          strokeWidth={1.5}
        />

        {/* 등받이 안쪽 쿠션 */}
        <Path
          d="M25 34 Q25 23 37 22 H61 Q72 23 72 35 L70 57 H27 Z"
          fill="#FDECF0"
        />

        {/* 좌우 팔걸이 */}
        <Path
          d="M11 49 Q4 48 4 59 V82 Q4 92 14 92 H28 V63 Q26 51 11 49 Z"
          fill="#FDE4EC"
          stroke="#E8BAC9"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />

        <Path
          d="M72 63 V92 H85 Q95 92 95 82 V59 Q95 48 85 49 Q74 51 72 63 Z"
          fill="#FDE4EC"
          stroke="#E8BAC9"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />

        {/* 좌우 팔걸이 하이라이트 */}
        <Path
          d="M10 57 Q8 60 9 67"
          fill="none"
          stroke="#FFF8FA"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <Path
          d="M89 57 Q91 60 90 67"
          fill="none"
          stroke="#FFF8FA"
          strokeWidth={2}
          strokeLinecap="round"
        />

        {/* 앉는 부분 */}
        <Path
          d="M20 61 Q20 56 29 56 H69 Q78 56 79 65 L77 83 Q76 90 67 90 H29 Q20 90 20 82 Z"
          fill="#FFE5A9"
          stroke="#E9D19D"
          strokeWidth={1.5}
        />

        {/* 쿠션의 은은한 곡선 */}
        <Path
          d="M29 64 Q48 59 69 64"
          fill="none"
          stroke="#FFF4D7"
          strokeWidth={2}
          strokeLinecap="round"
        />

        {/* 다리 */}
        <Path
          d="M24 88 L22 103 H31 L34 89 M67 89 L70 103 H79 L76 87"
          fill="#B59F84"
          stroke="#A88F73"
          strokeWidth={1.2}
          strokeLinejoin="round"
        />

        {/* 작은 장식 단추 */}
        <Circle cx={49} cy={38} r={2} fill="#E8BAC9" />
        <Circle cx={49} cy={47} r={2} fill="#E8BAC9" />

        {/* 옆면 하이라이트 */}
        <Path
          d="M27 17 Q36 12 45 15"
          fill="none"
          stroke="#FFF8FA"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </G>

      {/* ================================================= */}
      {/* 우측 하단: 협탁과 스탠드 조명 */}
      {/* ================================================= */}
      <G transform="translate(240 153) scale(0.65)" opacity={0.82}>
        {/* 바닥 그림자 */}
        <Ellipse cx={49} cy={104} rx={43} ry={4} fill="#B59F84" opacity={0.3} />

        {/* 조명 빛 번짐 */}
        <Ellipse
          cx={51}
          cy={36}
          rx={34}
          ry={32}
          fill="url(#furnitureLampGlow)"
          opacity={0.7}
        />

        {/* 협탁 상판 */}
        <Path
          d="M9 54 Q9 50 14 50 H82 Q87 50 87 54 L84 60 H12 Z"
          fill="#D8C2A7"
          stroke="#BDA487"
          strokeWidth={1.3}
        />

        {/* 협탁 본체 */}
        <Rect
          x={14}
          y={59}
          width={68}
          height={39}
          rx={3}
          fill="#C9B59C"
          stroke="#B59F84"
          strokeWidth={1.3}
        />

        {/* 서랍 */}
        <Rect
          x={20}
          y={65}
          width={56}
          height={14}
          rx={2}
          fill="#E8D6BD"
          stroke="#BDA487"
          strokeWidth={0.9}
        />

        <Circle cx={48} cy={72} r={2.2} fill="#B59F84" />

        {/* 아래쪽 문 */}
        <Rect
          x={20}
          y={83}
          width={56}
          height={10}
          rx={2}
          fill="#D9C4AA"
          stroke="#BDA487"
          strokeWidth={0.8}
        />

        {/* 협탁 다리 */}
        <Path
          d="M20 97 L18 104 H28 L30 98 M67 98 L69 104 H79 L77 97"
          fill="#B59F84"
          stroke="#A88F73"
          strokeWidth={1}
        />

        {/* 스탠드 받침 */}
        <Ellipse
          cx={49}
          cy={49}
          rx={16}
          ry={3.5}
          fill="#D8C2A7"
          stroke="#B59F84"
          strokeWidth={1}
        />

        {/* 스탠드 기둥 */}
        <Path
          d="M46 47 L47 25 H51 L52 47 Z"
          fill="#D8C2A7"
          stroke="#B59F84"
          strokeWidth={0.9}
        />

        {/* 조명 갓 */}
        <Path
          d="M30 25 Q31 9 40 5 Q49 1 58 5 Q67 9 68 25 Q50 30 30 25 Z"
          fill="#FFE885"
          stroke="#E8CD79"
          strokeWidth={1.4}
          strokeLinejoin="round"
        />

        {/* 갓 아래 테두리 */}
        <Path
          d="M30 25 Q49 31 68 25"
          fill="none"
          stroke="#E4C76E"
          strokeWidth={1.5}
          strokeLinecap="round"
        />

        {/* 갓의 빛 반사 */}
        <Path
          d="M39 9 Q35 14 35 20"
          fill="none"
          stroke="#FFF9D9"
          strokeWidth={2}
          strokeLinecap="round"
        />

        {/* 전구 */}
        <Circle cx={49} cy={28} r={3} fill="#FFF9EF" opacity={0.9} />
      </G>

      {/* ================================================= */}
      {/* 상단 중앙: 펜던트 천장 조명 */}
      {/* 중앙 드롭존을 침범하지 않도록 작게 배치 */}
      {/* ================================================= */}
      <G transform="translate(160 7) scale(0.6)" opacity={0.78}>
        {/* 천장 고정 장식 */}
        <Rect x={-7} y={-1} width={14} height={4} rx={2} fill="#D9C7B0" />

        {/* 전깃줄 */}
        <Path
          d="M0 3 V26"
          fill="none"
          stroke="#C9B59C"
          strokeWidth={1.6}
          strokeLinecap="round"
        />

        {/* 조명 갓 */}
        <Path
          d="M-24 26 Q-22 23 -18 23 H18 Q22 23 24 26 L16 42 Q0 47 -16 42 Z"
          fill="#A8D8B9"
          stroke="#8FC5A3"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />

        {/* 갓의 안쪽 */}
        <Path d="M-19 28 Q0 32 19 28 L14 38 Q0 42 -14 38 Z" fill="#DDF1DF" />

        {/* 따뜻한 전구 */}
        <Ellipse cx={0} cy={41} rx={7} ry={3} fill="#FFF1B8" opacity={0.9} />

        {/* 빛 반사 */}
        <Path
          d="M-14 28 Q-10 26 -5 27"
          fill="none"
          stroke="#F4FFF4"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </G>

      {/* ================================================= */}
      {/* 모서리의 작은 반짝임 */}
      {/* 중앙에는 장식을 두지 않음 */}
      {/* ================================================= */}
      <G
        stroke="#E8CF9A"
        strokeWidth={1.2}
        strokeLinecap="round"
        opacity={0.72}
      >
        <Path d="M77 26 V32 M74 29 H80" />
        <Path d="M231 94 V99 M228.5 96.5 H233.5" />
        <Path d="M94 145 V150 M91.5 147.5 H96.5" />
        <Path d="M224 145 V150 M221.5 147.5 H226.5" />
        <Path d="M91 222 V227 M88.5 224.5 H93.5" />
      </G>

      {/* 가장자리의 작은 파스텔 점 */}
      <G opacity={0.65}>
        <Circle cx={83} cy={44} r={2} fill="#CBB3E8" />
        <Circle cx={232} cy={30} r={2} fill="#FDE4EC" />
        <Circle cx={91} cy={155} r={2} fill="#A8D8B9" />
        <Circle cx={230} cy={226} r={2} fill="#FFE885" />
      </G>
    </>
  );
}

export function BalloonScene() {
  return (
    <>
      <Defs>
        {/* 몽환적인 3단 파스텔 하늘 */}
        <LinearGradient id="balloonSky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FDE4EC" />
          <Stop offset="0.5" stopColor="#FFFDF0" />
          <Stop offset="1" stopColor="#E8EAF6" />
        </LinearGradient>

        {/* 하트 풍선의 은은한 입체감 */}
        <LinearGradient id="balloonHeartFill" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FFF0F3" />
          <Stop offset="1" stopColor="#F4C8D5" />
        </LinearGradient>

        {/* 둥근 라벤더 풍선 */}
        <LinearGradient id="balloonRoundFill" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#E3D6F5" />
          <Stop offset="1" stopColor="#BBA2DF" />
        </LinearGradient>

        {/* 민트 풍선 */}
        <LinearGradient id="balloonMintFill" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#D5F0DF" />
          <Stop offset="1" stopColor="#93CBAA" />
        </LinearGradient>

        {/* 하늘색 풍선 */}
        <LinearGradient id="balloonBlueFill" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#EAF6FF" />
          <Stop offset="1" stopColor="#B9D9F1" />
        </LinearGradient>
      </Defs>

      {/* ================================================== */}
      {/* 기본 배경 */}
      {/* ================================================== */}
      <Rect x={0} y={0} width={320} height={240} rx={14} fill="#FFFDF8" />

      <Rect
        x={0}
        y={0}
        width={320}
        height={240}
        rx={14}
        fill="url(#balloonSky)"
      />

      {/* 배경 전용 밀크 오버레이 */}
      <Rect
        x={0}
        y={0}
        width={320}
        height={240}
        rx={14}
        fill="#FFFDF6"
        opacity={0.3}
      />

      {/* ================================================== */}
      {/* 상단 아치형 파티 가랜드 */}
      {/* ================================================== */}
      <Path
        d="M10 10 Q160 38 310 10"
        fill="none"
        stroke="#D8C7B8"
        strokeWidth={1.2}
        strokeLinecap="round"
        opacity={0.85}
      />

      <G opacity={0.88}>
        <Path d="M25 13 L45 16 L35 31 Z" fill="#FFE885" />
        <Path d="M65 19 L85 22 L74 37 Z" fill="#FDE4EC" />
        <Path d="M107 25 L127 27 L116 42 Z" fill="#A8D8B9" />
        <Path d="M149 28 L169 28 L159 44 Z" fill="#CBB3E8" />
        <Path d="M191 27 L211 25 L201 41 Z" fill="#FFE885" />
        <Path d="M233 22 L253 18 L243 35 Z" fill="#FDE4EC" />
        <Path d="M275 15 L295 11 L285 28 Z" fill="#A8D8B9" />
      </G>

      {/* ================================================== */}
      {/* 좌우 상단의 꼬불꼬불한 리본 */}
      {/* ================================================== */}
      <G
        fill="none"
        stroke="#EADCC8"
        strokeWidth={1.2}
        strokeLinecap="round"
        opacity={0.7}
      >
        <Path d="M8 35 C20 42 5 51 15 58 S22 72 13 79" />
        <Path d="M311 35 C299 43 314 51 304 60 S298 72 307 80" />
      </G>

      {/* ================================================== */}
      {/* 왼쪽 위: 하트 풍선 */}
      {/* ================================================== */}
      <G opacity={0.88}>
        {/* 풍선 끈 */}
        <Path
          d="M42 66 C45 77 34 81 40 91"
          fill="none"
          stroke="#D8C7B8"
          strokeWidth={1.5}
          strokeLinecap="round"
        />

        {/* 하트 풍선 몸체 */}
        <Path
          d="
            M42 31
            C35 20 19 23 18 36
            C17 47 31 57 41 64
            Q43 66 45 63
            C57 54 67 44 66 34
            C65 22 50 20 42 31
            Z
          "
          fill="url(#balloonHeartFill)"
          stroke="#E8BCCB"
          strokeWidth={1}
          strokeLinejoin="round"
        />

        {/* 반사광 */}
        <Path
          d="M26 32 Q27 27 33 28"
          fill="none"
          stroke="#FFFDF9"
          strokeWidth={2.4}
          strokeLinecap="round"
        />

        <Ellipse
          cx={30}
          cy={38}
          rx={2}
          ry={4}
          fill="#FFFDF9"
          opacity={0.65}
          transform="rotate(-25 30 38)"
        />

        {/* 气球结 */}
        <Path d="M40 64 L43 69 L46 63 Z" fill="#E8BCCB" />
      </G>

      {/* ================================================== */}
      {/* 오른쪽 위: 라벤더 원형 풍선 */}
      {/* ================================================== */}
      <G opacity={0.88}>
        <Path
          d="M277 62 C273 73 286 77 281 86"
          fill="none"
          stroke="#D8C7B8"
          strokeWidth={1.5}
          strokeLinecap="round"
        />

        <Ellipse
          cx={278}
          cy={39}
          rx={20}
          ry={25}
          fill="url(#balloonRoundFill)"
          stroke="#B7A0D7"
          strokeWidth={1}
        />

        {/* 풍선 목 */}
        <Path d="M275 62 L278 67 L282 62 Z" fill="#B7A0D7" />

        {/* 유광 하이라이트 */}
        <Path
          d="M266 28 C268 23 273 20 277 22"
          fill="none"
          stroke="#FFFDF9"
          strokeWidth={2.6}
          strokeLinecap="round"
        />

        <Ellipse
          cx={266}
          cy={36}
          rx={2.1}
          ry={4.2}
          fill="#FFFDF9"
          opacity={0.65}
          transform="rotate(15 266 36)"
        />
      </G>

      {/* ================================================== */}
      {/* 왼쪽 아래: 민트 + 하늘색 풍선 묶음 */}
      {/* ================================================== */}
      <G opacity={0.82}>
        {/* 민트 풍선 끈 */}
        <Path
          d="M31 190 C23 199 42 207 31 220"
          fill="none"
          stroke="#D8C7B8"
          strokeWidth={1.2}
          strokeLinecap="round"
        />

        {/* 하늘색 풍선 끈 */}
        <Path
          d="M51 184 C60 198 43 205 48 220"
          fill="none"
          stroke="#D8C7B8"
          strokeWidth={1.2}
          strokeLinecap="round"
        />

        {/* 민트 풍선 */}
        <Ellipse
          cx={29}
          cy={179}
          rx={14}
          ry={18}
          fill="url(#balloonMintFill)"
          stroke="#91C5A5"
          strokeWidth={0.9}
          transform="rotate(-12 29 179)"
        />

        <Path
          d="M22 169 Q24 165 28 166"
          fill="none"
          stroke="#FFFDF9"
          strokeWidth={1.8}
          strokeLinecap="round"
        />

        <Path d="M27 197 L30 201 L33 196 Z" fill="#91C5A5" />

        {/* 하늘색 풍선 */}
        <Ellipse
          cx={49}
          cy={176}
          rx={13}
          ry={17}
          fill="url(#balloonBlueFill)"
          stroke="#B4D2EA"
          strokeWidth={0.9}
          transform="rotate(12 49 176)"
        />

        <Path
          d="M43 167 Q45 163 48 164"
          fill="none"
          stroke="#FFFDF9"
          strokeWidth={1.8}
          strokeLinecap="round"
        />

        <Path d="M47 193 L50 197 L53 193 Z" fill="#B4D2EA" />

        {/* 두 끈을 묶은 리본 */}
        <Path
          d="M36 205 Q29 199 28 206 Q30 211 36 207 Q42 212 44 207 Q43 201 36 205 Z"
          fill="#FDE4EC"
          stroke="#E8BCCB"
          strokeWidth={0.7}
        />
        <Circle cx={36} cy={206} r={2} fill="#FFFDF9" />
      </G>

      {/* ================================================== */}
      {/* 오른쪽 아래: 버터 옐로우 별 풍선 */}
      {/* ================================================== */}
      <G opacity={0.84}>
        {/* 별 풍선 끈 */}
        <Path
          d="M282 205 C292 213 277 220 285 229"
          fill="none"
          stroke="#D8C7B8"
          strokeWidth={1.4}
          strokeLinecap="round"
        />

        {/* 둥근 모서리의 별 */}
        <Path
          d="
            M282 165
            Q284 163 286 166
            L293 178
            L306 181
            Q310 182 307 186
            L298 196
            L300 209
            Q300 213 296 211
            L284 205
            L272 211
            Q268 213 269 209
            L271 196
            L262 186
            Q259 182 264 181
            L276 178
            Z
          "
          fill="#FFE885"
          stroke="#E9D16F"
          strokeWidth={1.1}
          strokeLinejoin="round"
        />

        {/* 별의 반짝이는 표면 */}
        <Path
          d="M279 172 Q282 169 285 173 L289 180"
          fill="none"
          stroke="#FFFDF9"
          strokeWidth={2.2}
          strokeLinecap="round"
        />

        <Circle cx={280} cy={184} r={2} fill="#FFF8D6" opacity={0.9} />

        <Path d="M280 211 L284 216 L288 211 Z" fill="#E9D16F" />
      </G>

      {/* ================================================== */}
      {/* 테두리 주변의 파스텔 컨페티 */}
      {/* 중앙 드롭존은 넓게 비워 둠 */}
      {/* ================================================== */}
      <G opacity={0.78}>
        {/* 상단 작은 점 */}
        <Circle cx={91} cy={42} r={2} fill="#CBB3E8" />
        <Circle cx={119} cy={49} r={1.7} fill="#FFE885" />
        <Circle cx={205} cy={48} r={2} fill="#A8D8B9" />
        <Circle cx={231} cy={41} r={1.7} fill="#FDE4EC" />

        {/* 좌우 가장자리 */}
        <Circle cx={12} cy={107} r={2} fill="#FFE885" />
        <Circle cx={20} cy={133} r={1.5} fill="#CBB3E8" />
        <Circle cx={307} cy={100} r={2} fill="#A8D8B9" />
        <Circle cx={300} cy={131} r={1.7} fill="#FDE4EC" />

        {/* 하단 점 */}
        <Circle cx={78} cy={216} r={1.8} fill="#CBB3E8" />
        <Circle cx={102} cy={225} r={1.6} fill="#FFE885" />
        <Circle cx={219} cy={222} r={1.8} fill="#A8D8B9" />
        <Circle cx={241} cy={211} r={1.6} fill="#FDE4EC" />

        {/* 작은 별 조각 */}
        <Path
          d="M83 62 L85 67 L90 69 L85 71 L83 76 L81 71 L76 69 L81 67 Z"
          fill="#FFE885"
        />

        <Path
          d="M234 83 L236 87 L240 89 L236 91 L234 95 L232 91 L228 89 L232 87 Z"
          fill="#CBB3E8"
        />

        <Path
          d="M78 190 L79.5 193.5 L83 195 L79.5 196.5 L78 200 L76.5 196.5 L73 195 L76.5 193.5 Z"
          fill="#FDE4EC"
        />

        <Path
          d="M245 151 L246.5 154.5 L250 156 L246.5 157.5 L245 161 L243.5 157.5 L240 156 L243.5 154.5 Z"
          fill="#A8D8B9"
        />

        {/* 작은 종이 조각 */}
        <Rect
          x={58}
          y={91}
          width={4}
          height={2}
          rx={1}
          fill="#FDE4EC"
          transform="rotate(-28 60 92)"
        />

        <Rect
          x={260}
          y={111}
          width={4}
          height={2}
          rx={1}
          fill="#FFE885"
          transform="rotate(35 262 112)"
        />

        <Rect
          x={68}
          y={207}
          width={4}
          height={2}
          rx={1}
          fill="#A8D8B9"
          transform="rotate(25 70 208)"
        />
      </G>
    </>
  );
}

export function ToysScene() {
  return (
    <>
      <Defs>
        <LinearGradient id="toysSceneBg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFFDF8" />
          <Stop offset="1" stopColor="#FFF7EE" />
        </LinearGradient>

        <LinearGradient id="toysWood" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#F3E6D5" />
          <Stop offset="1" stopColor="#D9C2A7" />
        </LinearGradient>

        <LinearGradient id="toysTrainBody" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#DED2F3" />
          <Stop offset="1" stopColor="#BCA8DE" />
        </LinearGradient>

        <LinearGradient id="toysMintBlock" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#D5EBDD" />
          <Stop offset="1" stopColor="#A8D8B9" />
        </LinearGradient>
      </Defs>

      {/* ================================================== */}
      {/* 기본 크림 배경 + 배경 전용 오버레이 */}
      {/* ================================================== */}
      <Rect
        x={0}
        y={0}
        width={320}
        height={240}
        rx={14}
        fill="url(#toysSceneBg)"
      />

      <Rect
        x={0}
        y={0}
        width={320}
        height={240}
        rx={14}
        fill="#FFFDF6"
        opacity={0.3}
      />

      {/* ================================================== */}
      {/* 하단 패브릭 매트 바닥 */}
      {/* ================================================== */}
      <Path
        d="M0 193 Q55 183 105 192 T215 192 Q270 181 320 193 L320 240 L0 240 Z"
        fill="#F5EBE0"
        stroke="#E8DDD0"
        strokeWidth={1.2}
      />

      <Path
        d="M0 207 Q70 198 135 207 T260 205 Q293 201 320 207"
        fill="none"
        stroke="#E7D9C9"
        strokeWidth={0.9}
        opacity={0.7}
      />

      {/* 매트의 작은 점무늬 */}
      <G fill="#DCCAB6" opacity={0.45}>
        <Circle cx={91} cy={220} r={1} />
        <Circle cx={109} cy={229} r={1} />
        <Circle cx={208} cy={218} r={1} />
        <Circle cx={231} cy={230} r={1} />
        <Circle cx={139} cy={232} r={1} />
      </G>

      {/* ================================================== */}
      {/* 상단 중앙 파스텔 무지개 */}
      {/* ================================================== */}
      {/* <G fill="none" strokeLinecap="round" opacity={0.78}>
        <Path d="M91 75 A69 58 0 0 1 229 75" stroke="#FDE4EC" strokeWidth={7} />
        <Path
          d="M103 75 A57 46 0 0 1 217 75"
          stroke="#FFE885"
          strokeWidth={6}
        />
        <Path
          d="M115 75 A45 34 0 0 1 205 75"
          stroke="#A8D8B9"
          strokeWidth={6}
        />
      </G> */}

      {/* 무지개 양쪽의 솜사탕 구름 */}
      {/* <G fill="#FFFDFA" stroke="#EFE6DF" strokeWidth={0.8}>
        <Path
          d="M63 76
             C58 76 56 72 59 68
             C60 64 65 63 69 66
             C70 59 80 58 84 65
             C91 63 96 68 94 73
             Q92 77 86 77 Z"
        />
        <Path
          d="M226 75
             C220 74 220 69 224 66
             C226 61 232 61 236 65
             C240 58 249 61 250 67
             C257 66 261 71 258 75
             Q256 78 249 77 Z"
        />
      </G> */}

      {/* ================================================== */}
      {/* 좌측 상단: 미니 흔들목마 */}
      {/* ================================================== */}
      <G transform="translate(12 24) scale(0.68)" opacity={0.88}>
        {/* 바닥 그림자 */}
        <Ellipse cx={40} cy={72} rx={35} ry={4} fill="#CBB8A3" opacity={0.3} />

        {/* 흔들 받침 */}
        <Path
          d="M7 64 Q37 76 70 63 L72 68 Q38 82 5 69 Z"
          fill="#C9B59C"
          stroke="#B69E84"
          strokeWidth={1.2}
          strokeLinejoin="round"
        />

        {/* 다리 */}
        <Path d="M21 53 L18 67 L24 69 L30 54 Z" fill="#C9B59C" />
        <Path d="M53 52 L55 66 L61 65 L60 51 Z" fill="#C9B59C" />

        {/* 몸통 */}
        <Path
          d="M16 37
             Q13 28 22 25
             L48 26
             Q60 29 61 40
             L55 55
             Q40 62 25 55 Z"
          fill="url(#toysWood)"
          stroke="#C5AD91"
          strokeWidth={1.4}
          strokeLinejoin="round"
        />

        {/* 목과 머리 */}
        <Path
          d="M45 31 L51 14 Q54 9 61 13
             L68 22 L62 29 L55 28 L52 39 Z"
          fill="#EADCC8"
          stroke="#C5AD91"
          strokeWidth={1.3}
          strokeLinejoin="round"
        />

        {/* 귀 */}
        <Path
          d="M54 14 L55 7 L61 13 Z"
          fill="#FDE4EC"
          stroke="#C5AD91"
          strokeWidth={0.8}
        />

        {/* 갈기 */}
        <Path
          d="M48 15 Q44 19 47 24
             Q42 27 47 32
             L52 27 L55 17 Z"
          fill="#FDE4EC"
          stroke="#E6B8C7"
          strokeWidth={1}
        />

        {/* 얼굴 */}
        <Circle cx={60} cy={21} r={1.4} fill="#756960" />
        <Path
          d="M64 25 Q67 26 68 23"
          fill="none"
          stroke="#C28F91"
          strokeWidth={1}
          strokeLinecap="round"
        />

        {/* 안장 */}
        <Path
          d="M21 34 Q36 29 48 35 L45 41 L24 42 Z"
          fill="#FDE4EC"
          stroke="#E5B8C6"
          strokeWidth={1}
        />

        {/* 안장 장식 */}
        <Path
          d="M27 36 Q35 33 42 36"
          fill="none"
          stroke="#FFFDF9"
          strokeWidth={1.5}
          strokeLinecap="round"
        />

        {/* 꼬리 */}
        <Path
          d="M17 38 Q8 31 11 25"
          fill="none"
          stroke="#C5AD91"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <Path
          d="M9 27 L6 23 M11 28 L15 24"
          fill="none"
          stroke="#FDE4EC"
          strokeWidth={2}
          strokeLinecap="round"
        />

        {/* 목마의 장식 무늬 */}
        <Circle cx={30} cy={47} r={2} fill="#FFFDF9" />
        <Circle cx={39} cy={49} r={1.5} fill="#D9C2A7" />
      </G>

      {/* ================================================== */}
      {/* 우측 상단: 링 쌓기 장난감 */}
      {/* ================================================== */}
      <G transform="translate(255 18)" opacity={0.88}>
        {/* 그림자 */}
        <Ellipse cx={24} cy={58} rx={22} ry={3} fill="#CBB8A3" opacity={0.3} />

        {/* 받침 */}
        <Path
          d="M3 54 Q24 48 45 54 L42 60 Q24 65 6 60 Z"
          fill="#F0DFCC"
          stroke="#D4BEA4"
          strokeWidth={1}
        />

        {/* 기둥 */}
        <Rect x={22} y={19} width={4} height={36} rx={2} fill="#D9C7B1" />

        {/* 아래부터 쌓인 링 */}
        <Ellipse
          cx={24}
          cy={49}
          rx={20}
          ry={7}
          fill="#D2E8F9"
          stroke="#A9CBE5"
          strokeWidth={1}
        />
        <Ellipse
          cx={24}
          cy={41}
          rx={17}
          ry={6}
          fill="#A8D8B9"
          stroke="#91C5A5"
          strokeWidth={1}
        />
        <Ellipse
          cx={24}
          cy={33}
          rx={13.5}
          ry={5.5}
          fill="#FFE885"
          stroke="#E7D16F"
          strokeWidth={1}
        />
        <Ellipse
          cx={24}
          cy={26}
          rx={10}
          ry={4.5}
          fill="#FDE4EC"
          stroke="#E6B8C7"
          strokeWidth={1}
        />

        {/* 꼭대기 공 */}
        <Circle
          cx={24}
          cy={17}
          r={6.5}
          fill="#FFE885"
          stroke="#E7D16F"
          strokeWidth={1}
        />
        <Circle cx={22} cy={15} r={1.8} fill="#FFFDF9" opacity={0.9} />

        {/* 링의 빛 반사 */}
        <Path
          d="M9 47 Q20 43 34 47"
          fill="none"
          stroke="#F8FBFF"
          strokeWidth={1.3}
          strokeLinecap="round"
        />
        <Path
          d="M13 39 Q23 36 33 39"
          fill="none"
          stroke="#E9F7EE"
          strokeWidth={1.2}
          strokeLinecap="round"
        />
      </G>

      {/* ================================================== */}
      {/* 좌측 하단: 꼬마 장난감 기차 */}
      {/* ================================================== */}
      <G transform="translate(9 164)" opacity={0.88}>
        {/* 바닥 그림자 */}
        <Ellipse cx={34} cy={48} rx={33} ry={4} fill="#CBB8A3" opacity={0.35} />

        {/* 차체 */}
        <Path
          d="M5 23
             Q5 18 11 18
             H38 Q43 18 43 24
             V40 H5 Z"
          fill="url(#toysTrainBody)"
          stroke="#AA96CF"
          strokeWidth={1.2}
          strokeLinejoin="round"
        />

        {/* 앞부분 */}
        <Path
          d="M43 29 H52 Q59 29 59 36 V40 H43 Z"
          fill="#FFE885"
          stroke="#DCC16B"
          strokeWidth={1.2}
          strokeLinejoin="round"
        />

        {/* 운전실 */}
        <Path
          d="M10 18 V7 Q10 4 14 4 H27 Q31 4 31 9 V18 Z"
          fill="#CBB3E8"
          stroke="#AA96CF"
          strokeWidth={1.2}
          strokeLinejoin="round"
        />

        {/* 창문 */}
        <Rect
          x={15}
          y={8}
          width={11}
          height={7}
          rx={2}
          fill="#FFFDF9"
          stroke="#B7A4D9"
          strokeWidth={0.8}
        />

        {/* 굴뚝 */}
        <Path
          d="M34 18 L35 9 Q35 7 38 7 H42 Q44 7 44 10 V18 Z"
          fill="#FFE885"
          stroke="#DCC16B"
          strokeWidth={1}
        />
        <Ellipse
          cx={39}
          cy={8}
          rx={5}
          ry={2}
          fill="#FFF2B8"
          stroke="#DCC16B"
          strokeWidth={0.8}
        />

        {/* 굴뚝의 작은 증기 구름 */}
        <Path
          d="M37 3 Q34 0 37 -2 M43 3 Q47 0 44 -3"
          fill="none"
          stroke="#D8D0E8"
          strokeWidth={1.5}
          strokeLinecap="round"
        />

        {/* 차체 장식 */}
        <Path
          d="M9 24 H38"
          stroke="#EDE4FB"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <Circle cx={17} cy={31} r={2} fill="#FFFDF9" />
        <Circle cx={26} cy={31} r={2} fill="#FFFDF9" />

        {/* 범퍼 */}
        <Path
          d="M3 39 H60"
          stroke="#D4C4E8"
          strokeWidth={3}
          strokeLinecap="round"
        />

        {/* 바퀴 */}
        <G>
          <Circle
            cx={17}
            cy={41}
            r={6}
            fill="#FFFDF9"
            stroke="#BBA8D8"
            strokeWidth={1.2}
          />
          <Circle cx={17} cy={41} r={2} fill="#FFE885" />
          <Circle
            cx={43}
            cy={41}
            r={6}
            fill="#FFFDF9"
            stroke="#BBA8D8"
            strokeWidth={1.2}
          />
          <Circle cx={43} cy={41} r={2} fill="#FFE885" />
        </G>

        {/* 앞쪽 작은 빛 반사 */}
        <Path
          d="M48 32 Q53 32 54 36"
          fill="none"
          stroke="#FFFDF9"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </G>

      {/* ================================================== */}
      {/* 우측 하단: 파스텔 블록과 미니 팽이 */}
      {/* ================================================== */}
      <G transform="translate(243 166)" opacity={0.88}>
        {/* 바닥 그림자 */}
        <Ellipse cx={31} cy={48} rx={31} ry={4} fill="#CBB8A3" opacity={0.3} />

        {/* 민트 사각 블록 */}
        <Path
          d="M4 28 L22 22 L35 28 L17 35 Z"
          fill="#D8EDE0"
          stroke="#A8CDB6"
          strokeWidth={1}
          strokeLinejoin="round"
        />
        <Path
          d="M4 28 L17 35 V49 L4 42 Z"
          fill="#A8D8B9"
          stroke="#91C5A5"
          strokeWidth={1}
          strokeLinejoin="round"
        />
        <Path
          d="M17 35 L35 28 V42 L17 49 Z"
          fill="#B9E1C7"
          stroke="#91C5A5"
          strokeWidth={1}
          strokeLinejoin="round"
        />

        {/* 핑크 블록 */}
        <Path
          d="M29 18 L42 13 L55 19 L42 25 Z"
          fill="#FDE4EC"
          stroke="#E6B8C7"
          strokeWidth={1}
          strokeLinejoin="round"
        />
        <Path
          d="M29 18 L42 25 V39 L29 32 Z"
          fill="#F4CAD8"
          stroke="#E6B8C7"
          strokeWidth={1}
          strokeLinejoin="round"
        />
        <Path
          d="M42 25 L55 19 V33 L42 39 Z"
          fill="#F8D7E1"
          stroke="#E6B8C7"
          strokeWidth={1}
          strokeLinejoin="round"
        />

        {/* 우드 삼각 블록 */}
        <Path
          d="M3 20 L14 4 L25 20 Z"
          fill="#EADCC8"
          stroke="#C9B59C"
          strokeWidth={1.2}
          strokeLinejoin="round"
        />
        <Path d="M14 4 L14 20" fill="none" stroke="#D6C2A8" strokeWidth={0.8} />

        {/* 미니 팽이 */}
        <G transform="translate(43 5) rotate(17)">
          {/* 손잡이 */}
          <Rect x={-3} y={-2} width={6} height={9} rx={2.5} fill="#C9B59C" />

          {/* 팽이 몸체 */}
          <Path
            d="M0 4
               C-5 5 -11 9 -11 16
               Q-10 22 0 28
               Q10 22 11 16
               C11 9 5 5 0 4 Z"
            fill="#FDE4EC"
            stroke="#D9AEBE"
            strokeWidth={1.2}
            strokeLinejoin="round"
          />

          {/* 색상 띠 */}
          <Path
            d="M-9 13 Q0 18 9 13"
            fill="none"
            stroke="#A8D8B9"
            strokeWidth={4}
          />
          <Path
            d="M-6 21 Q0 24 6 21"
            fill="none"
            stroke="#FFE885"
            strokeWidth={3}
          />

          {/* 꼭짓점 */}
          <Path d="M-2 27 L0 33 L2 27 Z" fill="#C9B59C" />
          <Path
            d="M-5 9 Q-2 7 1 9"
            fill="none"
            stroke="#FFFDF9"
            strokeWidth={1.4}
            strokeLinecap="round"
          />
        </G>
      </G>

      {/* ================================================== */}
      {/* 가장자리의 작은 반짝임 */}
      {/* ================================================== */}
      <G opacity={0.78}>
        {/* 위쪽 */}
        <Circle cx={111} cy={14} r={1.8} fill="#CBB3E8" />
        <Circle cx={207} cy={15} r={1.7} fill="#A8D8B9" />

        {/* 왼쪽 */}
        <Circle cx={9} cy={106} r={1.8} fill="#FFE885" />
        <Circle cx={16} cy={132} r={1.5} fill="#CBB3E8" />

        {/* 오른쪽 */}
        <Circle cx={308} cy={103} r={1.8} fill="#FDE4EC" />
        <Circle cx={303} cy={135} r={1.6} fill="#A8D8B9" />

        {/* 작은 별 */}
        <Path
          d="M82 91 L84 96 L89 98 L84 100 L82 105 L80 100 L75 98 L80 96 Z"
          fill="#FFE885"
        />

        <Path
          d="M238 112 L239.5 116 L243 117.5 L239.5 119 L238 123 L236.5 119 L233 117.5 L236.5 116 Z"
          fill="#CBB3E8"
        />

        <Path
          d="M91 173 L92.5 177 L96 178.5 L92.5 180 L91 184 L89.5 180 L86 178.5 L89.5 177 Z"
          fill="#FDE4EC"
        />

        <Path
          d="M232 184 L233.5 188 L237 189.5 L233.5 191 L232 195 L230.5 191 L227 189.5 L230.5 188 Z"
          fill="#A8D8B9"
        />

        {/* 작은 점선 */}
        <Circle cx={69} cy={110} r={1.3} fill="#FDE4EC" />
        <Circle cx={251} cy={143} r={1.3} fill="#FFE885" />
        <Circle cx={84} cy={151} r={1.3} fill="#A8D8B9" />
        <Circle cx={220} cy={160} r={1.3} fill="#CBB3E8" />
      </G>
    </>
  );
}

export function ThingsScene() {
  return (
    <>
      {/* =========================================
          1. 기본 배경
      ========================================= */}
      <Rect x={0} y={0} width={320} height={240} rx={14} fill="#FFFDF8" />

      {/* 은은한 베이지 벽 */}
      <Rect x={0} y={0} width={320} height={163} rx={14} fill="#F4EFE6" />
      {/* 벽 하단 모서리의 둥근 부분을 정리 */}
      <Rect x={0} y={145} width={320} height={18} fill="#F4EFE6" />

      {/* 배경 전용 밀크빛 오버레이 */}
      <Rect
        x={0}
        y={0}
        width={320}
        height={240}
        rx={14}
        fill="#FFFDF6"
        opacity={0.3}
      />

      {/* 따뜻한 우드 마루 */}
      <Rect x={0} y={163} width={320} height={77} fill="#EADCC8" />

      {/* 마루의 부드러운 나뭇결 */}
      <G fill="none" stroke="#D7C3A9" strokeWidth={0.8} opacity={0.55}>
        <Path d="M0 188 Q50 183 100 188" />
        <Path d="M120 207 Q180 201 237 207" />
        <Path d="M20 229 Q65 225 105 229" />
        <Path d="M260 183 Q287 180 320 184" />
      </G>

      {/* 벽과 바닥 사이의 걸레받이 */}
      <Rect x={0} y={155} width={320} height={8} fill="#DBC6AC" />
      <Path d="M0 155 H320" fill="none" stroke="#CDB69A" strokeWidth={1} />
      <Path d="M0 162 H320" fill="none" stroke="#F4E8D8" strokeWidth={1} />

      {/* =========================================
          2. 배경 구름 벽지
      ========================================= */}
      <G fill="#FFFDF9" opacity={0.5}>
        {/* 왼쪽 위 구름 */}
        <Path
          d="
          M79 43
          C72 43 69 38 72 33
          C74 28 80 28 84 31
          C87 23 98 23 102 31
          C109 29 114 34 112 39
          C111 43 107 44 102 44
          Z
        "
        />

        {/* 중앙 왼쪽 작은 구름 */}
        <Path
          d="
          M105 102
          C100 102 98 98 100 94
          C102 90 107 90 110 93
          C113 87 121 88 123 94
          C129 92 133 96 132 100
          C131 103 127 104 123 104
          Z
        "
        />

        {/* 오른쪽 가장자리 구름 */}
        <Path
          d="
          M271 125
          C265 125 263 120 266 116
          C268 112 274 112 277 116
          C281 110 289 112 291 117
          C297 115 301 119 299 123
          C298 126 294 127 290 127
          Z
        "
        />

        {/* 왼쪽 아래쪽 벽 구름 */}
        <Path
          d="
          M22 119
          C17 119 15 115 17 111
          C19 107 24 107 27 110
          C30 104 38 105 40 111
          C45 109 49 113 47 117
          C46 120 42 121 38 121
          Z
        "
        />
      </G>

      {/* =========================================
          3. 우측 상단 창문과 커튼
          창문은 가장자리로 배치
      ========================================= */}
      <G opacity={0.88}>
        {/* 창문 그림자 */}
        <Rect
          x={222}
          y={24}
          width={72}
          height={83}
          rx={5}
          fill="#D8C7B4"
          opacity={0.35}
        />

        {/* 창문 하늘 */}
        <Rect
          x={225}
          y={21}
          width={68}
          height={81}
          rx={4}
          fill="#E4F2F9"
          stroke="#FFFDF9"
          strokeWidth={4}
        />

        {/* 창문 속 작은 구름 */}
        <Path
          d="
            M237 45
            C233 45 232 42 234 39
            C236 36 240 37 242 40
            C245 35 251 37 252 41
            C257 40 260 43 258 46
            Z
          "
          fill="#FFFFFF"
          opacity={0.85}
        />

        {/* 창문 아래 먼 하늘빛 언덕 */}
        <Path
          d="M227 81 Q242 67 256 80 Q273 64 291 78 V99 H227 Z"
          fill="#CDE5D9"
          opacity={0.8}
        />

        {/* 창문 격자 */}
        <G stroke="#FFFDF9" strokeWidth={3} strokeLinecap="round">
          <Line x1={259} y1={23} x2={259} y2={100} />
          <Line x1={226} y1={61} x2={292} y2={61} />
        </G>

        {/* 커튼 */}
        <Path
          d="
            M222 21
            Q230 25 235 34
            L232 78
            Q226 72 222 77
            Z
          "
          fill="#FDE4EC"
          opacity={0.9}
        />
        <Path
          d="
            M294 21
            Q286 26 282 34
            L286 78
            Q291 73 294 77
            Z
          "
          fill="#FDE4EC"
          opacity={0.9}
        />

        {/* 커튼 주름 */}
        <G fill="none" stroke="#EABFD0" strokeWidth={1} opacity={0.85}>
          <Path d="M227 28 Q232 46 228 67" />
          <Path d="M289 28 Q284 46 288 67" />
        </G>

        {/* 창틀 하단 */}
        <Rect x={219} y={101} width={78} height={5} rx={2} fill="#FFFDF9" />
      </G>

      {/* 창문에서 들어오는 은은한 햇살 */}
      <Path
        d="M229 108 L246 108 L222 161 L194 161 Z"
        fill="#FFFDF0"
        opacity={0.28}
      />
      <Path
        d="M260 108 L274 108 L250 161 L231 161 Z"
        fill="#FFFDF0"
        opacity={0.25}
      />

      {/* =========================================
          4. 상단 중앙 열기구 모빌
      ========================================= */}
      <G transform="translate(160 8) scale(0.55)" opacity={0.82}>
        {/* 천장에 매달린 실 */}
        <Path d="M0 -4 V13" stroke="#C9B59C" strokeWidth={1.3} fill="none" />

        {/* 열기구 풍선 */}
        <Path
          d="
            M0 12
            C-15 12 -23 23 -21 36
            C-19 48 -9 54 0 56
            C9 54 19 48 21 36
            C23 23 15 12 0 12
            Z
          "
          fill="#FDE4EC"
          stroke="#E6C5CE"
          strokeWidth={1.4}
        />

        {/* 풍선의 노란 스트라이프 */}
        <Path
          d="
            M-9 15
            C-14 20 -17 28 -15 37
            L-8 48
            L-3 53
            L-3 15
            Z
          "
          fill="#FFE885"
        />
        <Path
          d="
            M7 15
            C14 20 17 29 15 37
            L8 48
            L3 53
            L3 15
            Z
          "
          fill="#FFE885"
          opacity={0.85}
        />

        {/* 바구니 연결 줄 */}
        <Path
          d="M-10 50 L-6 59 M10 50 L6 59"
          stroke="#C9B59C"
          strokeWidth={1.5}
        />

        {/* 바구니 */}
        <Path
          d="M-7 58 L7 58 L5 67 L-5 67 Z"
          fill="#C9B59C"
          stroke="#B5A084"
          strokeWidth={1}
        />

        {/* 바구니 장식 */}
        <Path d="M-4 61 H4" stroke="#FFF3E0" strokeWidth={1.2} />
      </G>

      {/* =========================================
          5. 좌측 상단 미니 장난감 수납장
      ========================================= */}
      <G transform="translate(7 38) scale(0.62)" opacity={0.82}>
        {/* 수납장 그림자 */}
        <Ellipse cx={47} cy={181} rx={41} ry={4} fill="#BCA68E" opacity={0.3} />

        {/* 수납장 다리 */}
        <Path d="M15 143 L13 178 L22 178 L25 145 Z" fill="#C9B59C" />
        <Path d="M67 145 L70 178 L79 178 L76 143 Z" fill="#C9B59C" />

        {/* 수납장 본체 */}
        <Rect
          x={7}
          y={70}
          width={78}
          height={80}
          rx={5}
          fill="#DBC6AC"
          stroke="#C9B59C"
          strokeWidth={1.5}
        />

        {/* 상판 */}
        <Path
          d="M4 72 Q4 66 11 66 H81 Q88 66 88 72 V78 H4 Z"
          fill="#E8D6BF"
          stroke="#C9B59C"
          strokeWidth={1.5}
        />

        {/* 윗칸 */}
        <Rect x={13} y={84} width={66} height={27} rx={2} fill="#F4E8D8" />

        {/* 책 1 */}
        <Rect x={18} y={87} width={10} height={22} rx={1.5} fill="#CBB3E8" />
        <Path d="M20 91 H26 M20 95 H26" stroke="#F3EAFB" strokeWidth={1} />

        {/* 책 2 */}
        <Rect x={29} y={90} width={10} height={19} rx={1.5} fill="#A8D8B9" />
        <Path d="M31 94 H37" stroke="#E9F7EC" strokeWidth={1} />

        {/* 미니 블록 */}
        <Rect x={46} y={96} width={12} height={12} rx={2} fill="#FFE885" />
        <Rect x={59} y={91} width={13} height={17} rx={2} fill="#FDE4EC" />

        {/* 아래쪽 서랍 */}
        <Rect
          x={13}
          y={116}
          width={66}
          height={27}
          rx={3}
          fill="#E8D6BF"
          stroke="#C9B59C"
          strokeWidth={1}
        />
        <Rect x={18} y={122} width={56} height={15} rx={2} fill="#F3E5D2" />
        <Circle cx={46} cy={129} r={2.3} fill="#B69C7E" />

        {/* 수납장 위 오뚝이 */}
        <Ellipse
          cx={66}
          cy={55}
          rx={9}
          ry={12}
          fill="#FDE4EC"
          stroke="#E6C5CE"
          strokeWidth={1.2}
        />
        <Circle cx={66} cy={45} r={6} fill="#EADCC8" />
        <Circle cx={64} cy={45} r={0.9} fill="#8C7A6B" />
        <Circle cx={68} cy={45} r={0.9} fill="#8C7A6B" />
        <Path
          d="M64 48 Q66 50 68 48"
          fill="none"
          stroke="#B78F85"
          strokeWidth={0.9}
        />
      </G>

      {/* =========================================
          6. 좌측 하단 아기 침대와 곰인형
      ========================================= */}
      <G transform="translate(8 142) scale(0.65)" opacity={0.84}>
        {/* 침대 바닥 그림자 */}
        <Ellipse
          cx={61}
          cy={115}
          rx={58}
          ry={5}
          fill="#BCA68E"
          opacity={0.32}
        />

        {/* 침대 다리 */}
        <Path d="M12 83 L10 112 L18 112 L21 83 Z" fill="#C9B59C" />
        <Path d="M98 83 L101 112 L109 112 L106 83 Z" fill="#C9B59C" />

        {/* 침대 프레임 */}
        <Path
          d="
            M8 54
            Q8 48 15 48
            H104
            Q111 48 111 55
            V91
            H8 Z
          "
          fill="#EADCC8"
          stroke="#C9B59C"
          strokeWidth={1.7}
        />

        {/* 헤드보드 */}
        <Path
          d="
            M5 51
            Q5 36 17 36
            H26
            Q32 36 32 44
            V91 H5 Z
          "
          fill="#C9B59C"
          stroke="#B5A084"
          strokeWidth={1.4}
        />

        {/* 헤드보드 장식 */}
        <Circle cx={18} cy={49} r={5} fill="#EADCC8" />
        <Circle cx={18} cy={49} r={2} fill="#F4EFE6" />

        {/* 베개 */}
        <Path
          d="M30 52 Q31 45 39 46 L55 49 Q60 51 57 59 L34 61 Q29 59 30 52 Z"
          fill="#FFFDF9"
          stroke="#E4D8C9"
          strokeWidth={1}
        />

        {/* 별무늬 이불 */}
        <Path
          d="
            M31 62
            Q46 55 60 63
            Q78 56 100 63
            L104 86
            Q74 92 31 86 Z
          "
          fill="#D2E8F9"
          stroke="#BBD6E8"
          strokeWidth={1.2}
        />

        {/* 이불 주름 */}
        <Path
          d="M39 67 Q61 74 83 67"
          fill="none"
          stroke="#B7D3E6"
          strokeWidth={1}
          opacity={0.8}
        />

        {/* 별 장식 */}
        <Path
          d="M48 68 L50 73 L55 73 L51 76 L53 81 L48 78 L44 81 L45 76 L41 73 L46 73 Z"
          fill="#FFE885"
        />
        <Path
          d="M77 70 L79 74 L83 74 L80 77 L81 81 L77 79 L73 81 L74 77 L71 74 L75 74 Z"
          fill="#FFE885"
        />
        <Path
          d="M94 78 L95 81 L99 81 L96 83 L97 86 L94 84 L91 86 L92 83 L89 81 L93 81 Z"
          fill="#FFF3C6"
        />

        {/* 곰인형 몸통 */}
        <Ellipse cx={75} cy={53} rx={13} ry={15} fill="#8C7A6B" />
        {/* 곰인형 귀 */}
        <Circle cx={64} cy={31} r={6} fill="#8C7A6B" />
        <Circle cx={84} cy={31} r={6} fill="#8C7A6B" />
        <Circle cx={64} cy={31} r={3} fill="#BDA797" />
        <Circle cx={84} cy={31} r={3} fill="#BDA797" />

        {/* 곰인형 머리 */}
        <Circle cx={74} cy={39} r={15} fill="#9B8878" />
        <Ellipse cx={74} cy={44} rx={7} ry={5} fill="#E7D5C4" />
        <Circle cx={69} cy={38} r={1.5} fill="#4F4640" />
        <Circle cx={79} cy={38} r={1.5} fill="#4F4640" />
        <Ellipse cx={74} cy={43} rx={2} ry={1.5} fill="#5C4B42" />

        {/* 곰인형 팔 */}
        <Ellipse
          cx={62}
          cy={53}
          rx={5}
          ry={8}
          fill="#9B8878"
          transform="rotate(-30 62 53)"
        />
        <Ellipse
          cx={87}
          cy={53}
          rx={5}
          ry={8}
          fill="#9B8878"
          transform="rotate(30 87 53)"
        />

        {/* 곰인형 발 */}
        <Ellipse cx={68} cy={65} rx={7} ry={4} fill="#8C7A6B" />
        <Ellipse cx={81} cy={65} rx={7} ry={4} fill="#8C7A6B" />
      </G>

      {/* =========================================
          7. 우측 하단 둥근 러그와 공부상
      ========================================= */}
      <G transform="translate(224 153) scale(0.65)" opacity={0.84}>
        {/* 러그 그림자 */}
        <Ellipse cx={60} cy={90} rx={59} ry={9} fill="#BCA68E" opacity={0.2} />

        {/* 러그 */}
        <Ellipse
          cx={58}
          cy={70}
          rx={56}
          ry={23}
          fill="#FFF3E0"
          stroke="#E8D8C4"
          strokeWidth={1.5}
        />
        <Ellipse
          cx={58}
          cy={70}
          rx={47}
          ry={17}
          fill="none"
          stroke="#EBDCC8"
          strokeWidth={1}
          strokeDasharray="2 4"
        />

        {/* 러그 솜방울 */}
        <G fill="#FDE4EC">
          <Circle cx={9} cy={64} r={3} />
          <Circle cx={15} cy={52} r={3} />
          <Circle cx={27} cy={47} r={3} />
          <Circle cx={43} cy={46} r={3} />
          <Circle cx={59} cy={46} r={3} />
          <Circle cx={75} cy={47} r={3} />
          <Circle cx={89} cy={53} r={3} />
          <Circle cx={105} cy={63} r={3} />
          <Circle cx={104} cy={78} r={3} />
          <Circle cx={90} cy={87} r={3} />
          <Circle cx={72} cy={92} r={3} />
          <Circle cx={53} cy={93} r={3} />
          <Circle cx={35} cy={91} r={3} />
          <Circle cx={19} cy={83} r={3} />
        </G>

        {/* 공부상 다리 */}
        <Path d="M29 47 L33 72 L39 72 L40 48 Z" fill="#8FC6A4" />
        <Path d="M78 47 L79 72 L85 72 L89 47 Z" fill="#8FC6A4" />

        {/* 민트색 상판 */}
        <Path
          d="
            M22 42
            Q22 36 30 36
            H84
            Q92 36 92 42
            Q92 47 84 48
            H30
            Q22 47 22 42 Z
          "
          fill="#A8D8B9"
          stroke="#83B99A"
          strokeWidth={1.5}
        />

        {/* 상판 하이라이트 */}
        <Path
          d="M31 40 Q56 36 82 40"
          fill="none"
          stroke="#DDF2E2"
          strokeWidth={1.5}
          strokeLinecap="round"
        />

        {/* 색연필 */}
        <G transform="translate(40 27) rotate(-12)">
          <Path d="M0 0 L4 -12 L8 0 Z" fill="#FDE4EC" />
          <Rect x={0} y={0} width={8} height={17} rx={1} fill="#FDE4EC" />
          <Path d="M2 3 V14" stroke="#E6B8C7" strokeWidth={1} />
        </G>

        <G transform="translate(53 26) rotate(7)">
          <Path d="M0 0 L4 -10 L8 0 Z" fill="#FFE885" />
          <Rect x={0} y={0} width={8} height={18} rx={1} fill="#FFE885" />
          <Path d="M2 3 V15" stroke="#E7C85D" strokeWidth={1} />
        </G>

        <G transform="translate(66 29) rotate(18)">
          <Path d="M0 0 L4 -10 L8 0 Z" fill="#CBB3E8" />
          <Rect x={0} y={0} width={8} height={15} rx={1} fill="#CBB3E8" />
          <Path d="M2 3 V12" stroke="#A88BCB" strokeWidth={1} />
        </G>

        {/* 작은 크레파스 */}
        <Rect
          x={74}
          y={39}
          width={11}
          height={4}
          rx={2}
          fill="#FDE4EC"
          transform="rotate(-8 74 39)"
        />
      </G>

      {/* =========================================
          8. 가장자리의 작은 장난감 장식
      ========================================= */}
      <G opacity={0.8}>
        {/* 작은 반짝임 */}
        <G stroke="#D8BD82" strokeWidth={1.2} strokeLinecap="round">
          <Path d="M91 28 V35 M87.5 31.5 H94.5" />
          <Path d="M201 35 V41 M198 38 H204" />
          <Path d="M105 174 V180 M102 177 H108" />
          <Path d="M306 136 V142 M303 139 H309" />
        </G>

        {/* 파스텔 점 장식 */}
        <Circle cx={82} cy={83} r={2} fill="#CBB3E8" />
        <Circle cx={208} cy={91} r={2} fill="#A8D8B9" />
        <Circle cx={104} cy={147} r={1.8} fill="#FFE885" />
        <Circle cx={211} cy={174} r={2} fill="#FDE4EC" />
        <Circle cx={302} cy={116} r={1.8} fill="#CBB3E8" />

        {/* 작은 별 */}
        <Path
          d="M300 37 L302 42 L307 43 L303 46 L304 51 L300 48 L296 51 L297 46 L293 43 L298 42 Z"
          fill="#FFE885"
          opacity={0.75}
        />
      </G>

      {/* 중앙 스티커 드롭존:
          x=80~230, y=70~200의 중심부를 비워 둠 */}
    </>
  );
}

export default function ThingsCategoryBackground({
  category,
  width = "100%",
  height = "100%",
}: ThingsCategoryBackgroundProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 320 240"
      preserveAspectRatio="none"
      style={{ width: "100%", height: "100%" }}
    >
      <Defs>
        <LinearGradient id="airSky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#79D0F5" />
          <Stop offset="1" stopColor="#E3F8FF" />
        </LinearGradient>
      </Defs>

      {/* 카테고리별 씬 조건부 렌더링 */}
      {category === "musical_instrument" && <MusicScene />}
      {category === "clock" && <ClockScene />}
      {category === "stationery" && <StationeryScene />}
      {category === "electronics" && <ElectronicsScene />}
      {category === "furniture" && <FurnitureScene />}
      {category === "ball" && <BallScene />}
      {category === "balloon" && <BalloonScene />}
      {category === "toys_sports" && <ToysScene />}
      {(category === "things" || !category) && <ThingsScene />}

      {/* 전체 소프트 톤 다운 오버레이 */}
      <Rect
        x="0"
        y="0"
        width="320"
        height="240"
        rx="12"
        fill="#FFFDF6"
        opacity={0.3}
      />
    </Svg>
  );
}

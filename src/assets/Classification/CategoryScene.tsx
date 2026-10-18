import React from "react";
import Svg, { Circle, Ellipse, G, Path, Polygon, Rect } from "react-native-svg";

export type CategorySceneType =
  | "animal"
  | "food"
  | "clothing"
  | "nature"
  | "vehicle"
  | "living";

type Props = {
  width?: number;
  height?: number;
};

const SceneBackground = ({ color }: { color: string }) => (
  <Rect x="4" y="4" width="232" height="172" rx="26" fill={color} />
);

// 1. ANIMAL — 동물 친구들의 세계
export function AnimalScene({ width = 240, height = 180 }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 240 180">
      <SceneBackground color="#FFF3D5" />
      <Circle cx="190" cy="38" r="19" fill="#FFE08A" />
      <Path
        d="M15 125 Q45 91 76 120 Q113 91 145 119 Q185 86 225 122 L225 157 L15 157 Z"
        fill="#B9DFA1"
      />
      <Ellipse cx="120" cy="151" rx="96" ry="12" fill="#94CC82" />

      {/* 나무 */}
      <Path d="M187 112 L191 63 L202 63 L204 112 Z" fill="#A76B43" />
      <Circle cx="197" cy="49" r="23" fill="#6DBE69" />
      <Circle cx="181" cy="59" r="15" fill="#81CC72" />
      <Circle cx="212" cy="61" r="15" fill="#57AE5E" />

      {/* 강아지 */}
      <Ellipse cx="77" cy="132" rx="36" ry="9" fill="#7CBF72" />
      <Path d="M52 92 Q39 76 46 61 Q57 48 66 67 L70 79 Z" fill="#B96F37" />
      <Path d="M91 92 Q108 75 103 61 Q95 49 84 68 L80 79 Z" fill="#B96F37" />
      <Ellipse cx="77" cy="105" rx="31" ry="35" fill="#E9A14D" />
      <Ellipse cx="77" cy="117" rx="20" ry="20" fill="#FFE1A6" />
      <Circle cx="67" cy="101" r="3" fill="#51382D" />
      <Circle cx="87" cy="101" r="3" fill="#51382D" />
      <Path
        d="M72 113 Q77 118 82 113 M77 109 L77 114"
        stroke="#51382D"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <Ellipse cx="59" cy="139" rx="10" ry="5" fill="#F5C47A" />
      <Ellipse cx="95" cy="139" rx="10" ry="5" fill="#F5C47A" />

      {/* 새 */}
      <Ellipse cx="143" cy="62" rx="15" ry="12" fill="#FFD34F" />
      <Circle cx="150" cy="54" r="2" fill="#51382D" />
      <Polygon points="128,60 118,56 128,52" fill="#F29B38" />
      <Path d="M136 62 Q144 47 150 63" fill="#F8B82F" />
      <Path
        d="M144 73 L142 78 M149 73 L151 78"
        stroke="#A76B43"
        strokeWidth="2"
      />

      {/* 나비 */}
      <Ellipse
        cx="35"
        cy="44"
        rx="7"
        ry="10"
        fill="#F59A69"
        transform="rotate(-35 35 44)"
      />
      <Ellipse
        cx="48"
        cy="44"
        rx="7"
        ry="10"
        fill="#F59A69"
        transform="rotate(35 48 44)"
      />
      <Ellipse
        cx="35"
        cy="55"
        rx="6"
        ry="8"
        fill="#FFD06B"
        transform="rotate(35 35 55)"
      />
      <Ellipse
        cx="48"
        cy="55"
        rx="6"
        ry="8"
        fill="#FFD06B"
        transform="rotate(-35 48 55)"
      />
      <Path
        d="M42 43 L42 57"
        stroke="#8C6344"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </Svg>
  );
}

// 2. FOOD — 여러 먹거리가 놓인 진열대
export function FoodScene({ width = 240, height = 180 }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 240 180">
      <SceneBackground color="#FFE9DD" />
      <Ellipse cx="120" cy="135" rx="94" ry="23" fill="#E9AD6D" />
      <Ellipse cx="120" cy="129" rx="89" ry="18" fill="#FFD69A" />

      {/* 사과 */}
      <Path
        d="M49 78 Q31 61 42 48 Q54 39 66 50 Q83 40 93 54 Q101 73 82 96 L65 108 Z"
        fill="#F15B52"
      />
      <Path
        d="M65 51 Q64 41 72 35"
        stroke="#8C6541"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <Path d="M68 42 Q80 29 88 40 Q79 49 68 42" fill="#64B96A" />
      <Ellipse
        cx="49"
        cy="64"
        rx="5"
        ry="9"
        fill="#FF9281"
        transform="rotate(30 49 64)"
      />

      {/* 당근 */}
      <Path
        d="M111 53 Q130 45 145 60 L125 108 Q116 117 112 105 Z"
        fill="#F69B43"
      />
      <Path
        d="M119 52 Q112 34 124 30 Q131 39 127 49 Q142 30 147 39 Q145 49 130 54"
        fill="#62B96A"
      />
      <Path
        d="M119 69 L127 73 M115 83 L122 87"
        stroke="#D8782C"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* 우유 */}
      <Path
        d="M165 49 L173 40 L194 40 L201 49 L201 106 Q183 112 165 106 Z"
        fill="#FFFFFF"
        stroke="#8BCFEA"
        strokeWidth="2"
      />
      <Path d="M173 40 L173 33 L193 33 L194 40" fill="#8BCFEA" />
      <Path
        d="M168 75 Q183 81 198 75"
        stroke="#B8E6F7"
        strokeWidth="3"
        fill="none"
      />

      {/* 바나나 */}
      <Path
        d="M47 99 Q59 122 92 113 Q105 109 110 97 Q115 111 99 124 Q66 144 42 114 Q36 105 47 99 Z"
        fill="#FFD64E"
      />
      <Path
        d="M45 98 L41 95 M109 96 L113 92"
        stroke="#B98536"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* 딸기 */}
      <Path
        d="M104 104 Q115 92 127 103 Q133 117 115 129 Q98 119 104 104 Z"
        fill="#EF514F"
      />
      <Path d="M105 102 L111 97 L115 103 L121 97 L127 103" fill="#63B66A" />
      <Circle cx="110" cy="111" r="1.5" fill="#FFE5A2" />
      <Circle cx="119" cy="116" r="1.5" fill="#FFE5A2" />

      {/* 빵 */}
      <Path
        d="M143 113 Q135 96 150 84 Q167 72 183 85 Q197 94 192 114 Z"
        fill="#EAA65B"
      />
      <Path
        d="M150 94 Q162 84 177 94"
        stroke="#F8CD88"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />

      {/* 쿠키 */}
      <Circle cx="164" cy="118" r="15" fill="#C98A4D" />
      <Circle cx="158" cy="112" r="2.5" fill="#75472F" />
      <Circle cx="169" cy="109" r="2.5" fill="#75472F" />
      <Circle cx="172" cy="120" r="2.5" fill="#75472F" />
      <Circle cx="160" cy="124" r="2.5" fill="#75472F" />
    </Svg>
  );
}

// 3. CLOTHING — 옷과 꾸미기
export function ClothingScene({ width = 240, height = 180 }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 240 180">
      <SceneBackground color="#FCE8F0" />

      {/* 옷걸이 */}
      <Path
        d="M45 38 L195 38"
        stroke="#C99B7B"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <Path
        d="M120 38 Q120 24 131 27 Q141 31 127 41"
        stroke="#C99B7B"
        strokeWidth="3"
        fill="none"
      />

      {/* 티셔츠 */}
      <Path
        d="M61 57 L76 49 L88 56 L100 49 L115 57 L105 74 L98 69 L98 111 L72 111 L72 69 L65 74 Z"
        fill="#4297ED"
        stroke="#3478C5"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <Polygon
        points="82,71 86,80 96,81 89,88 91,98 82,93 73,98 75,88 68,81 78,80"
        fill="#FFFFFF"
      />

      {/* 모자 */}
      <Path d="M137 58 Q143 34 165 36 Q187 38 189 61 Z" fill="#FFD05A" />
      <Path
        d="M132 61 Q163 71 196 61 Q187 77 159 74 Q142 73 132 61 Z"
        fill="#F0AE42"
      />
      <Path
        d="M144 47 Q164 55 181 47"
        stroke="#F7B83F"
        strokeWidth="3"
        fill="none"
      />

      {/* 신발 */}
      <Path
        d="M36 121 Q47 115 54 101 L65 105 L69 122 Q79 128 72 136 L35 136 Q28 131 36 121 Z"
        fill="#4A9AE8"
      />
      <Path
        d="M39 127 L68 127"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Path
        d="M45 116 L54 121 M51 110 L60 116"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <Path
        d="M76 121 Q87 115 94 101 L105 105 L109 122 Q119 128 112 136 L75 136 Q68 131 76 121 Z"
        fill="#4A9AE8"
      />
      <Path
        d="M79 127 L108 127"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* 가방 */}
      <Path
        d="M139 99 Q139 85 151 85 Q163 85 163 99"
        stroke="#8F69D7"
        strokeWidth="6"
        fill="none"
      />
      <Rect x="132" y="96" width="39" height="36" rx="9" fill="#AC8BEF" />
      <Path
        d="M151 107 C143 98 136 109 151 119 C166 109 159 98 151 107 Z"
        fill="#FBE9FF"
      />

      {/* 목걸이 */}
      <Path
        d="M190 103 Q202 125 215 103"
        stroke="#D68AB5"
        strokeWidth="3"
        fill="none"
      />
      <Circle cx="191" cy="105" r="4" fill="#F4A6C8" />
      <Circle cx="198" cy="114" r="4" fill="#C7A0F5" />
      <Circle cx="205" cy="116" r="4" fill="#F4A6C8" />
      <Circle cx="212" cy="108" r="4" fill="#C7A0F5" />
    </Svg>
  );
}

// 4. NATURE — 하늘과 땅이 함께 있는 풍경
export function NatureScene({ width = 240, height = 180 }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 240 180">
      <SceneBackground color="#DFF3FF" />

      {/* 해 */}
      <Circle cx="43" cy="39" r="15" fill="#FFD34F" />
      <Path
        d="M43 17 L43 11 M43 61 L43 67 M21 39 L15 39 M65 39 L71 39 M27 23 L22 18 M59 55 L64 60 M59 23 L64 18 M27 55 L22 60"
        stroke="#FFD34F"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* 구름 */}
      <Path
        d="M104 53 Q94 53 94 44 Q94 35 104 35 Q110 19 126 27 Q137 26 140 39 Q153 38 153 48 Q153 54 145 54 Z"
        fill="#FFFFFF"
      />
      <Path
        d="M166 71 Q157 71 157 63 Q157 55 166 55 Q171 43 183 49 Q194 49 196 61 Q205 60 205 67 Q205 72 198 72 Z"
        fill="#FFFFFF"
      />

      {/* 언덕 */}
      <Path
        d="M4 119 Q41 77 82 111 Q127 78 165 109 Q202 80 236 113 L236 176 L4 176 Z"
        fill="#A8D995"
      />
      <Path
        d="M4 143 Q42 119 80 142 Q130 111 169 142 Q204 122 236 140 L236 176 L4 176 Z"
        fill="#78C66F"
      />

      {/* 나무 */}
      <Path d="M180 135 L183 96 L193 96 L198 135 Z" fill="#A96E43" />
      <Circle cx="190" cy="83" r="22" fill="#62B963" />
      <Circle cx="175" cy="92" r="14" fill="#7CCB70" />
      <Circle cx="204" cy="94" r="14" fill="#4EA95B" />

      {/* 꽃 */}
      <G>
        <Circle cx="38" cy="143" r="4" fill="#FFE17B" />
        <Circle cx="34" cy="139" r="4" fill="#FFFFFF" />
        <Circle cx="42" cy="139" r="4" fill="#FFFFFF" />
        <Circle cx="34" cy="147" r="4" fill="#FFFFFF" />
        <Circle cx="42" cy="147" r="4" fill="#FFFFFF" />
        <Path d="M38 147 L38 160" stroke="#3F9C54" strokeWidth="2.5" />
      </G>
      <G>
        <Circle cx="84" cy="151" r="4" fill="#F7A6C7" />
        <Circle cx="80" cy="147" r="4" fill="#FFFFFF" />
        <Circle cx="88" cy="147" r="4" fill="#FFFFFF" />
        <Circle cx="80" cy="155" r="4" fill="#FFFFFF" />
        <Circle cx="88" cy="155" r="4" fill="#FFFFFF" />
        <Path d="M84 155 L84 164" stroke="#3F9C54" strokeWidth="2.5" />
      </G>
    </Svg>
  );
}

// 5. VEHICLE — 도로, 레일, 하늘, 물의 탈것
export function VehicleScene({ width = 240, height = 180 }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 240 180">
      <SceneBackground color="#DFF2FF" />

      {/* 하늘 */}
      <Circle cx="196" cy="31" r="13" fill="#FFE17A" />
      <Path
        d="M20 44 Q12 44 12 37 Q12 30 20 30 Q24 18 36 23 Q44 23 46 34 Q55 33 55 40 Q55 44 49 44 Z"
        fill="#FFFFFF"
      />

      {/* 비행기 */}
      <Path
        d="M90 40 L111 43 L128 30 Q133 27 137 31 L132 46 L157 52 Q163 54 159 59 L130 57 L120 72 Q116 76 113 71 L115 56 L91 51 Q84 49 90 40 Z"
        fill="#FFFFFF"
        stroke="#76BDEB"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <Path d="M117 44 L127 46 L121 52 Z" fill="#4397E3" />

      {/* 물 */}
      <Path
        d="M4 111 Q33 105 62 111 T120 111 T180 111 T236 111 L236 153 L4 153 Z"
        fill="#65C4EE"
      />
      <Path
        d="M16 124 Q25 117 34 124 T52 124 M148 133 Q157 126 166 133 T184 133 M190 118 Q199 111 208 118 T226 118"
        stroke="#DFF8FF"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* 배 */}
      <Path d="M159 98 L211 98 L200 116 Q181 125 165 115 Z" fill="#3987D9" />
      <Rect x="177" y="82" width="18" height="16" rx="2" fill="#FFFFFF" />
      <Rect x="181" y="85" width="5" height="6" rx="1" fill="#7AC5ED" />
      <Rect x="188" y="85" width="4" height="6" rx="1" fill="#7AC5ED" />
      <Path
        d="M163 122 Q172 117 181 122 T199 122 T217 122"
        stroke="#FFFFFF"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* 기찻길 */}
      <Path d="M8 139 L232 139" stroke="#AAB3C0" strokeWidth="7" />
      <Path
        d="M12 134 L12 145 M35 134 L35 145 M58 134 L58 145 M81 134 L81 145 M104 134 L104 145 M127 134 L127 145 M150 134 L150 145 M173 134 L173 145 M196 134 L196 145 M219 134 L219 145"
        stroke="#7E8B9B"
        strokeWidth="2"
      />

      {/* 기차 */}
      <Rect x="19" y="103" width="49" height="28" rx="5" fill="#F06457" />
      <Rect x="70" y="109" width="29" height="22" rx="4" fill="#FFC64D" />
      <Rect x="24" y="108" width="12" height="9" rx="2" fill="#BDEBFF" />
      <Rect x="40" y="108" width="12" height="9" rx="2" fill="#BDEBFF" />
      <Rect x="75" y="113" width="9" height="8" rx="1.5" fill="#BDEBFF" />
      <Circle cx="32" cy="132" r="5" fill="#596576" />
      <Circle cx="56" cy="132" r="5" fill="#596576" />
      <Circle cx="84" cy="132" r="5" fill="#596576" />

      {/* 자동차 */}
      <Path
        d="M54 155 L60 144 Q64 138 74 138 L91 138 Q98 139 102 148 L110 151 L110 161 L51 161 Z"
        fill="#F15D52"
      />
      <Path
        d="M68 144 L76 144 L76 151 L63 151 Z M80 144 L90 144 Q95 145 97 151 L80 151 Z"
        fill="#BDEBFF"
      />
      <Circle cx="66" cy="161" r="6" fill="#536071" />
      <Circle cx="98" cy="161" r="6" fill="#536071" />
      <Circle cx="104" cy="155" r="2" fill="#FFE17A" />
    </Svg>
  );
}

// 6. LIVING — 생활 속 물건 전시장
export function LivingScene({ width = 240, height = 180 }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 240 180">
      <SceneBackground color="#FFF0DC" />

      {/* 선반 */}
      <Rect x="15" y="89" width="210" height="7" rx="3" fill="#D9A66F" />
      <Rect x="21" y="96" width="6" height="48" rx="2" fill="#C78E5D" />
      <Rect x="213" y="96" width="6" height="48" rx="2" fill="#C78E5D" />
      <Rect x="15" y="143" width="210" height="7" rx="3" fill="#D9A66F" />

      {/* 의자 */}
      <Rect x="27" y="44" width="40" height="38" rx="12" fill="#A68AE8" />
      <Rect x="22" y="68" width="50" height="20" rx="8" fill="#8D70D1" />
      <Path
        d="M30 87 L27 96 M64 87 L67 96"
        stroke="#A76F47"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* 스탠드 */}
      <Path d="M90 57 L105 57 L110 89 L85 89 Z" fill="#FFD166" />
      <Path
        d="M98 89 L98 96 M88 96 L108 96"
        stroke="#B78454"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* 책 */}
      <Rect x="132" y="45" width="12" height="43" rx="2" fill="#5BA5EA" />
      <Rect x="146" y="38" width="12" height="50" rx="2" fill="#F3A65C" />
      <Rect x="160" y="47" width="12" height="41" rx="2" fill="#7CCB86" />
      <Rect x="174" y="41" width="12" height="47" rx="2" fill="#E97F9E" />

      {/* 노트북 */}
      <Rect x="128" y="104" width="49" height="28" rx="4" fill="#667C91" />
      <Rect x="132" y="108" width="41" height="20" rx="2" fill="#9EDAF2" />
      <Path d="M122 133 L183 133 L177 139 L128 139 Z" fill="#9AA9B7" />

      {/* 곰 인형 */}
      <Circle cx="48" cy="115" r="9" fill="#C98C59" />
      <Circle cx="41" cy="108" r="5" fill="#C98C59" />
      <Circle cx="55" cy="108" r="5" fill="#C98C59" />
      <Ellipse cx="48" cy="126" rx="12" ry="13" fill="#DCA16A" />
      <Circle cx="44" cy="114" r="1.5" fill="#60442E" />
      <Circle cx="52" cy="114" r="1.5" fill="#60442E" />
      <Ellipse cx="48" cy="119" rx="4" ry="3" fill="#F5D5A9" />

      {/* 연필꽂이 */}
      <Path d="M78 116 L111 116 L107 140 L82 140 Z" fill="#5FADE9" />
      <Path d="M84 116 L84 101 L90 101 L90 116" fill="#F2C44C" />
      <Path d="M94 116 L94 98 L100 98 L100 116" fill="#F18A78" />
      <Path d="M103 116 L103 103 L109 103 L109 116" fill="#79C886" />

      {/* 기타 */}
      <Path
        d="M191 115 Q182 107 189 99 Q196 92 201 100 Q209 105 203 114 L199 125 L194 130 Z"
        fill="#DDA04E"
      />
      <Path d="M195 102 L197 128" stroke="#795637" strokeWidth="2" />
      <Circle cx="196" cy="110" r="4" fill="#795637" />

      {/* 화분 */}
      <Path d="M195 139 L217 139 L213 153 L199 153 Z" fill="#E7A17A" />
      <Path
        d="M206 138 Q193 126 193 116 Q204 119 206 132 Q207 115 218 111 Q221 126 206 138"
        fill="#70BC71"
      />
    </Svg>
  );
}

export default function CategoryScene({
  category,
  width = 240,
  height = 180,
}: Props & { category: CategorySceneType }) {
  switch (category) {
    case "animal":
      return <AnimalScene width={width} height={height} />;
    case "food":
      return <FoodScene width={width} height={height} />;
    case "clothing":
      return <ClothingScene width={width} height={height} />;
    case "nature":
      return <NatureScene width={width} height={height} />;
    case "vehicle":
      return <VehicleScene width={width} height={height} />;
    case "living":
      return <LivingScene width={width} height={height} />;
    default:
      return null;
  }
}

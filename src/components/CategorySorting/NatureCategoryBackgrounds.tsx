import React from "react";
import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from "react-native-svg";

export type NatureBackgroundKind = "nature" | "sky" | "plant";

type Props = {
  category: NatureBackgroundKind;
  width?: number | string;
  height?: number | string;
};

function SkyScene() {
  return (
    <>
      {/* 1. 파스텔 밤하늘 */}
      <Rect x="0" y="0" width="420" height="340" rx="14" fill="#E9F7FF" />

      <Defs>
        <LinearGradient id="dreamySky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#6B9EE8" />
          <Stop offset="0.48" stopColor="#AFADE8" />
          <Stop offset="0.76" stopColor="#E6C5E9" />
          <Stop offset="1" stopColor="#FFE5B4" />
        </LinearGradient>

        <LinearGradient id="dreamyCloud" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFFFFF" />
          <Stop offset="1" stopColor="#FFE8C5" />
        </LinearGradient>

        <LinearGradient id="dreamyPeachCloud" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFF0F3" />
          <Stop offset="1" stopColor="#FDE4EC" />
        </LinearGradient>
      </Defs>

      <Rect
        x="0"
        y="0"
        width="312"
        height="232"
        rx="12"
        fill="url(#dreamySky)"
      />

      {/* 2. 은은한 오로라 빛무리 */}
      <Ellipse
        cx="160"
        cy="40"
        rx="120"
        ry="30"
        fill="#FFFFFF"
        opacity={0.15}
      />

      <Circle cx="280" cy="240" r="60" fill="#FFE58A" opacity={0.25} />

      {/* 상단의 부드러운 빛 구름 */}
      <Ellipse
        cx="160"
        cy="80"
        rx="110"
        ry="35"
        fill="#DCCFFF"
        opacity={0.12}
      />

      {/* 3. 작은 별들 */}
      <G opacity={0.85}>
        {[
          { x: 18, y: 24, r: 1.4 },
          { x: 43, y: 58, r: 1.2 },
          { x: 66, y: 20, r: 1.6 },
          { x: 105, y: 42, r: 1.2 },
          { x: 126, y: 17, r: 1.3 },
          { x: 174, y: 28, r: 1.6 },
          { x: 204, y: 18, r: 1.1 },
          { x: 248, y: 29, r: 1.5 },
          { x: 291, y: 24, r: 1.2 },
          { x: 304, y: 58, r: 1.6 },
          { x: 28, y: 84, r: 1.2 },
          { x: 73, y: 96, r: 1.5 },
          { x: 110, y: 75, r: 1.1 },
          { x: 190, y: 67, r: 1.4 },
          { x: 221, y: 93, r: 1.2 },
          { x: 269, y: 78, r: 1.5 },
          { x: 302, y: 105, r: 1.1 },
          { x: 145, y: 105, r: 1.3 },
          { x: 52, y: 112, r: 1.1 },
          { x: 240, y: 115, r: 1.2 },
        ].map((star, index) => (
          <Circle
            key={index}
            cx={star.x}
            cy={star.y}
            r={star.r}
            fill="#FFFFFF"
            opacity={0.6 + (index % 3) * 0.12}
          />
        ))}
      </G>

      {/* 4. 십자가 모양의 반짝이는 별 */}
      <G fill="none" stroke="#FFFDF0" strokeLinecap="round" opacity={0.9}>
        <G transform="translate(80 34)">
          <Path
            d="M0 -7 Q1 -1 6 0 Q1 1 0 7 Q-1 1 -6 0 Q-1 -1 0 -7Z"
            fill="#FFFDF0"
          />
          <Circle cx="0" cy="0" r="1.3" fill="#FFFFFF" stroke="none" />
        </G>

        <G transform="translate(230 49)">
          <Path
            d="M0 -8 Q1 -1 7 0 Q1 1 0 8 Q-1 1 -7 0 Q-1 -1 0 -8Z"
            fill="#FFFDF0"
          />
          <Circle cx="0" cy="0" r="1.4" fill="#FFFFFF" stroke="none" />
        </G>

        <G transform="translate(151 79)">
          <Path
            d="M0 -6 Q1 -1 5 0 Q1 1 0 6 Q-1 1 -5 0 Q-1 -1 0 -6Z"
            fill="#FFFDF0"
          />
        </G>

        <G transform="translate(286 91) scale(0.65)">
          <Path
            d="M0 -8 Q1 -1 7 0 Q1 1 0 8 Q-1 1 -7 0 Q-1 -1 0 -8Z"
            fill="#FFFDF0"
          />
        </G>
      </G>

      {/* 작은 반짝임 */}
      <G fill="#FFFDF0" opacity={0.7}>
        <Circle cx="94" cy="64" r="1.5" />
        <Circle cx="214" cy="35" r="1.5" />
        <Circle cx="43" cy="96" r="1.3" />
        <Circle cx="181" cy="98" r="1.5" />
        <Circle cx="260" cy="58" r="1.2" />
      </G>

      {/* 5. 뒤쪽 라벤더 구름 레이어 */}
      <G opacity={0.7}>
        <Path
          d="
            M0 151
            V132
            Q10 125 19 132
            Q23 112 43 116
            Q54 91 76 106
            Q87 87 106 104
            Q122 91 137 109
            Q151 98 164 116
            Q182 105 195 122
            Q208 130 215 145
            V175
            H0 Z
          "
          fill="#DBCBF5"
        />

        <Circle cx="27" cy="139" r="22" fill="#DBCBF5" />
        <Circle cx="57" cy="126" r="25" fill="#DBCBF5" />
        <Circle cx="88" cy="127" r="23" fill="#DBCBF5" />
        <Circle cx="121" cy="137" r="24" fill="#DBCBF5" />
        <Circle cx="151" cy="145" r="23" fill="#DBCBF5" />
        <Rect x="0" y="140" width="177" height="35" fill="#DBCBF5" />
      </G>

      {/* 6. 중간 피치 크림 구름 - 오른쪽 */}
      <G opacity={0.85}>
        <Path
          d="
            M135 174
            Q132 157 149 151
            Q151 129 174 135
            Q187 112 209 130
            Q229 114 246 137
            Q267 121 282 143
            Q305 137 320 155
            V204
            H135 Z
          "
          fill="url(#dreamyPeachCloud)"
        />

        <Circle cx="154" cy="165" r="24" fill="#FDE4EC" />
        <Circle cx="183" cy="150" r="27" fill="#FDE4EC" />
        <Circle cx="216" cy="148" r="25" fill="#FDE4EC" />
        <Circle cx="247" cy="157" r="27" fill="#FDE4EC" />
        <Circle cx="280" cy="163" r="25" fill="#FDE4EC" />
        <Circle cx="307" cy="169" r="24" fill="#FDE4EC" />
        <Rect x="140" y="165" width="180" height="39" fill="#FDE4EC" />
      </G>

      {/* 중간 피치 구름 - 왼쪽 */}
      <G opacity={0.8}>
        <Path
          d="
            M0 176
            V157
            Q14 143 29 157
            Q36 135 55 145
            Q69 123 89 143
            Q107 128 125 149
            Q144 144 157 163
            V197
            H0 Z
          "
          fill="#FDE4EC"
        />

        <Circle cx="18" cy="164" r="22" fill="#FDE4EC" />
        <Circle cx="48" cy="154" r="23" fill="#FDE4EC" />
        <Circle cx="78" cy="158" r="25" fill="#FDE4EC" />
        <Circle cx="110" cy="166" r="24" fill="#FDE4EC" />
        <Circle cx="140" cy="173" r="22" fill="#FDE4EC" />
        <Rect x="0" y="170" width="160" height="28" fill="#FDE4EC" />
      </G>

      {/* 7. 맨 앞쪽 메인 크림 구름 */}
      <G opacity={0.95}>
        {/* 구름 아래의 따뜻한 노을 그림자 */}
        <Path
          d="
            M0 203
            Q15 190 31 200
            Q45 178 66 194
            Q82 175 104 194
            Q126 180 146 199
            Q166 181 185 200
            Q207 178 226 197
            Q247 179 265 197
            Q286 183 303 198
            Q314 193 320 200
            V240 H0 Z
          "
          fill="#FFE8C5"
          opacity={0.4}
        />

        {/* 폭신한 구름 본체 */}
        <Path
          d="
            M0 211
            V199
            Q12 185 27 198
            Q39 177 58 192
            Q74 169 94 191
            Q112 174 133 193
            Q151 177 170 195
            Q188 174 208 194
            Q229 174 249 195
            Q270 177 288 194
            Q305 184 320 198
            V240 H0 Z
          "
          fill="url(#dreamyCloud)"
        />

        <Circle cx="14" cy="207" r="23" fill="#FFFDFA" />
        <Circle cx="43" cy="199" r="25" fill="#FFFDFA" />
        <Circle cx="75" cy="198" r="27" fill="#FFFDFA" />
        <Circle cx="108" cy="202" r="25" fill="#FFFDFA" />
        <Circle cx="140" cy="204" r="27" fill="#FFFDFA" />
        <Circle cx="174" cy="201" r="27" fill="#FFFDFA" />
        <Circle cx="207" cy="202" r="26" fill="#FFFDFA" />
        <Circle cx="240" cy="200" r="27" fill="#FFFDFA" />
        <Circle cx="273" cy="202" r="26" fill="#FFFDFA" />
        <Circle cx="306" cy="207" r="24" fill="#FFFDFA" />

        <Rect x="0" y="207" width="320" height="33" fill="#FFFDFA" />
      </G>

      {/* 구름 표면의 은은한 하이라이트 */}
      <G
        fill="none"
        stroke="#FFFFFF"
        strokeLinecap="round"
        strokeWidth={1.5}
        opacity={0.75}
      >
        <Path d="M30 193 Q39 184 49 193" />
        <Path d="M87 190 Q98 181 109 191" />
        <Path d="M154 192 Q165 183 176 193" />
        <Path d="M225 191 Q236 182 247 192" />
        <Path d="M278 193 Q287 186 296 195" />
      </G>

      {/* 8. 전체를 감싸는 우유빛 소프트 오버레이 */}
      <Rect
        x="0"
        y="0"
        width="412"
        height="332"
        rx="12"
        fill="#FFFDF6"
        opacity={0.3}
      />
    </>
  );
}
function NatureScene() {
  return (
    <>
      <Defs>
        <LinearGradient id="natureSky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#D0EBFB" />
          <Stop offset="1" stopColor="#F2F9FD" />
        </LinearGradient>

        <LinearGradient id="natureStream" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#D7EDFF" />
          <Stop offset="0.55" stopColor="#BFDFFF" />
          <Stop offset="1" stopColor="#D9EEFF" />
        </LinearGradient>

        <LinearGradient id="natureTreeLeaves" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#B9E6B2" />
          <Stop offset="1" stopColor="#91CE9A" />
        </LinearGradient>
      </Defs>

      {/* 기본 배경 */}
      {/* <Rect x={4} y={4} width="320" height="240" rx="14" fill="#EAF8E9" /> */}

      <Rect
        x="0"
        y="0"
        width="320"
        height="240"
        rx="12"
        fill="url(#natureSky)"
      />

      {/* 햇살과 부드러운 구름 */}
      <Circle cx="160" cy="30" r="70" fill="#FFFDF4" opacity={0.35} />

      <G opacity={0.55}>
        <Ellipse cx="54" cy="48" rx="23" ry="7" fill="#FFFFFF" />
        <Circle cx="43" cy="44" r="8" fill="#FFFFFF" />
        <Circle cx="56" cy="41" r="11" fill="#FFFFFF" />
        <Circle cx="68" cy="46" r="7" fill="#FFFFFF" />

        <Ellipse cx="253" cy="62" rx="20" ry="6" fill="#FFFFFF" />
        <Circle cx="244" cy="58" r="7" fill="#FFFFFF" />
        <Circle cx="255" cy="55" r="9" fill="#FFFFFF" />
        <Circle cx="266" cy="60" r="6" fill="#FFFFFF" />
      </G>

      {/* 원경 산맥 */}
      <G opacity={0.85}>
        <Path
          d="M7 132 L7 121 Q37 91 63 112 Q83 79 112 106 Q137 87 160 119 Q192 83 220 109 Q247 82 271 105 Q293 91 313 108 L313 233 L7 233 Z"
          fill="#CBE0F5"
        />

        <Path
          d="M27 106 L40 92 L51 105 L43 101 L39 106 L34 101 Z"
          fill="#E9F3FC"
          opacity={0.8}
        />

        <Path
          d="M180 104 L194 88 L207 103 L199 99 L194 103 L188 99 Z"
          fill="#F6FAFF"
          opacity={0.8}
        />
      </G>

      {/* 중경 1 - 민트빛 먼 언덕 */}
      <Path
        d="M7 135 Q57 111 104 132 T205 139 Q261 111 313 130 V233 H7 Z"
        fill="#D4EDDA"
        opacity={0.95}
      />

      {/* 멀리 있는 작은 나무들 */}
      <G opacity={0.6}>
        {[82, 126, 222, 246].map((x, i) => (
          <G key={x} transform={`translate(${x} ${124 + (i % 2) * 8})`}>
            <Path
              d="M-2 14 L-2 4"
              stroke="#A8CBA8"
              strokeWidth={2}
              strokeLinecap="round"
            />
            <Circle cx="0" cy="0" r="6" fill="#A8D5BA" />
            <Circle cx="-4" cy="3" r="4" fill="#B8DFC2" />
            <Circle cx="4" cy="3" r="4" fill="#9DCEAF" />
          </G>
        ))}
      </G>

      {/* 중경 2 - 오른쪽 연두빛 언덕 */}
      <Path
        d="M110 165 Q166 133 218 145 Q266 151 313 130 V233 H110 Z"
        fill="#C3E6CB"
      />

      {/* 오른쪽 동화 속 커다란 나무 */}
      <G opacity={0.92}>
        {/* 나무 그림자 */}
        <Ellipse
          cx="282"
          cy="170"
          rx="25"
          ry="6"
          fill="#A5CFA9"
          opacity={0.3}
        />

        {/* 나무 기둥 */}
        <Path
          d="M277 171 Q280 151 276 132 L288 132 Q285 151 290 171 Z"
          fill="#C9B59C"
        />

        <Path
          d="M280 146 L268 133 M285 143 L295 129"
          fill="none"
          stroke="#C9B59C"
          strokeWidth={4}
          strokeLinecap="round"
        />

        {/* 둥글고 풍성한 수관 */}
        <Circle cx="279" cy="113" r="23" fill="url(#natureTreeLeaves)" />
        <Circle cx="261" cy="119" r="16" fill="#A3D9A5" />
        <Circle cx="294" cy="119" r="17" fill="#A3D9A5" />
        <Circle cx="273" cy="99" r="16" fill="#B8E4B1" />
        <Circle cx="291" cy="101" r="14" fill="#9FD39F" />

        {/* 잎의 은은한 빛 */}
        <Circle cx="268" cy="106" r="5" fill="#D7F0C9" opacity={0.8} />
        <Circle cx="288" cy="112" r="4" fill="#D7F0C9" opacity={0.7} />
      </G>

      {/* 왼쪽 앞쪽 언덕 */}
      <Path
        d="M7 169 Q47 145 89 164 Q128 177 160 195 Q180 207 197 233 H7 Z"
        fill="#B1DFBB"
      />

      {/* 왼쪽 작은 나무 두 그루 */}
      <G>
        {/* 작은 나무 1 */}
        <Path d="M37 165 L40 140 L45 140 L47 165 Z" fill="#C9B59C" />
        <Circle cx="37" cy="134" r="12" fill="#92D3A2" />
        <Circle cx="47" cy="132" r="13" fill="#9EDBAA" />
        <Circle cx="43" cy="122" r="11" fill="#A8DFAD" />
        <Circle cx="35" cy="130" r="5" fill="#C5EBC4" opacity={0.8} />

        {/* 작은 나무 2 */}
        <Path d="M58 166 L60 146 L65 146 L67 166 Z" fill="#C9B59C" />
        <Circle cx="57" cy="141" r="10" fill="#92D3A2" />
        <Circle cx="67" cy="139" r="11" fill="#9EDBAA" />
        <Circle cx="63" cy="131" r="9" fill="#A8DFAD" />
      </G>

      {/* 오른쪽 언덕의 부드러운 전경 레이어 */}
      <Path
        d="M167 190 Q208 166 249 175 Q284 181 313 165 V233 H167 Z"
        fill="#C9E8C8"
        opacity={0.9}
      />

      {/* S자로 굽이치는 시냇물 */}
      <Path
        d="M199 174
           Q215 182 220 194
           Q226 207 248 214
           Q269 222 273 233
           H313
           Q300 211 283 201
           Q258 188 251 173
           Q243 161 231 157
           Z"
        fill="url(#natureStream)"
        stroke="#B8DAFF"
        strokeWidth={1.2}
      />

      {/* 시냇물 위 반짝이는 물결 */}
      <G
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={1.5}
        strokeLinecap="round"
        opacity={0.85}
      >
        <Path d="M218 188 Q225 190 229 195" />
        <Path d="M237 204 Q245 208 253 209" />
        <Path d="M264 219 Q272 222 276 227" />
        <Path d="M238 176 Q244 179 247 183" />
      </G>

      {/* 물가의 작은 둥근 돌 */}
      <G opacity={0.5}>
        <Ellipse cx="211" cy="198" rx="4" ry="2.5" fill="#FFFFFF" />
        <Ellipse cx="258" cy="213" rx="5" ry="2.5" fill="#EAF7FF" />
        <Ellipse cx="285" cy="226" rx="4" ry="2" fill="#FFFFFF" />
      </G>

      {/* 좌측 하단의 부드러운 풀잎 */}
      <G opacity={0.75}>
        <Path
          d="M10 233 Q17 208 12 195 Q25 209 21 233
             M20 233 Q30 202 39 193 Q35 215 28 233
             M31 233 Q42 214 49 205 Q47 224 40 233
             M47 233 Q50 208 64 199 Q61 220 56 233
             M58 233 Q72 211 80 207 Q76 225 69 233
             M72 233 Q85 216 96 212 Q90 229 84 233"
          fill="#7BC68A"
        />

        <Path
          d="M9 233 Q17 218 24 215
             M28 233 Q34 220 43 217
             M51 233 Q58 220 68 218
             M75 233 Q82 224 90 222"
          fill="none"
          stroke="#A7D9A7"
          strokeWidth={1.3}
          strokeLinecap="round"
        />
      </G>

      {/* 데이지 꽃을 그리는 공통 소품 */}
      {[
        { x: 50, y: 171, r: 5.5 },
        { x: 99, y: 181, r: 5 },
        { x: 143, y: 205, r: 3.5 },
        { x: 166, y: 220, r: 3.3 },
        { x: 190, y: 211, r: 3.2 },
        { x: 244, y: 224, r: 3.3 },
        { x: 291, y: 214, r: 3.5 },
      ].map((flower, index) => (
        <G
          key={index}
          transform={`translate(${flower.x} ${flower.y})`}
          opacity={0.8}
        >
          {/* 꽃잎 */}
          {Array.from({ length: 8 }, (_, petal) => {
            const angle = (petal * Math.PI) / 4;
            const px = Math.cos(angle) * flower.r * 0.85;
            const py = Math.sin(angle) * flower.r * 0.85;

            return (
              <Ellipse
                key={petal}
                cx={px}
                cy={py}
                rx={flower.r * 0.42}
                ry={flower.r * 0.65}
                fill="#FFFDF0"
                transform={`rotate(${petal * 45} ${px} ${py})`}
              />
            );
          })}

          {/* 꽃 중심 */}
          <Circle cx="0" cy="0" r={flower.r * 0.42} fill="#FFE885" />
        </G>
      ))}

      {/* 작은 들꽃 봉오리 */}
      <G opacity={0.7}>
        <Path
          d="M119 233 Q120 222 125 218 M128 233 Q130 225 135 224"
          fill="none"
          stroke="#83C78B"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <Circle cx="125" cy="217" r="3" fill="#FFFDF0" />
        <Circle cx="135" cy="223" r="2.5" fill="#FFE885" />

        <Path
          d="M300 233 Q298 225 294 222"
          fill="none"
          stroke="#83C78B"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <Circle cx="294" cy="221" r="2.8" fill="#FFFDF0" />
        <Circle cx="294" cy="221" r="1.2" fill="#FFE885" />
      </G>

      {/* 화면 전체의 따뜻한 수채화 라이팅 */}
      <Rect
        x="7"
        y="7"
        width="306"
        height="226"
        rx="12"
        fill="#FFFDF6"
        opacity={0.16}
      />
    </>
  );
}

function PlantScene() {
  return (
    <>
      <Defs>
        {/* 상단의 따뜻한 아이보리빛 하늘 */}
        <LinearGradient id="plantSky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFFDF9" />
          <Stop offset="1" stopColor="#F2F9EE" />
        </LinearGradient>

        {/* 가장 먼 원경의 세이지 언덕 */}
        <LinearGradient id="plantFarHill" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#E1F0DD" />
          <Stop offset="1" stopColor="#D4EACF" />
        </LinearGradient>

        {/* 중경의 패치워크 밭 */}
        <LinearGradient id="plantField" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#D5ECCD" />
          <Stop offset="1" stopColor="#C7E5BE" />
        </LinearGradient>

        {/* 전경 잔디의 부드러운 색감 */}
        <LinearGradient id="plantGrass" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#B8E2AC" />
          <Stop offset="1" stopColor="#9FD493" />
        </LinearGradient>

        {/* 햇살이 비치는 부드러운 빛 */}
        <LinearGradient id="plantSunlight" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFFDF2" stopOpacity={0.9} />
          <Stop offset="1" stopColor="#FFFDF2" stopOpacity={0} />
        </LinearGradient>
      </Defs>

      {/* 1. 둥근 모서리의 기본 배경 */}
      <Rect x="0" y="0" width="320" height="240" rx="14" fill="#EFF9E8" />

      {/* 상단 하늘 */}
      <Rect
        x="0"
        y="0"
        width="320"
        height="240"
        rx="11"
        fill="url(#plantSky)"
      />

      {/* 2. 상단의 은은한 햇살 */}
      <G opacity={0.4}>
        <Circle cx="160" cy="0" r="90" fill="#FFFFFF" />
        <Ellipse cx="160" cy="50" rx="118" ry="65" fill="url(#plantSunlight)" />
      </G>

      {/* 아주 희미한 햇살의 공기감 */}
      <G opacity={0.22}>
        <Ellipse cx="65" cy="73" rx="48" ry="23" fill="#FFF4E6" />
        <Ellipse cx="267" cy="88" rx="42" ry="19" fill="#E7F3DF" />
      </G>

      {/* 3. 원경 언덕 */}
      <G opacity={0.85}>
        <Path
          d="M0 135 Q90 120 180 130 T320 125 V240 H0 Z"
          fill="url(#plantFarHill)"
        />

        {/* 먼 언덕의 가느다란 나무 실루엣 */}
        <G
          fill="none"
          stroke="#BEE3B8"
          strokeWidth={1}
          strokeLinecap="round"
          opacity={0.65}
        >
          <Path d="M24 132 l0 -5 M20 129 l4 -5 l4 5" />
          <Path d="M33 132 l0 -4 M30 130 l3 -4 l3 4" />
          <Path d="M87 129 l0 -5 M83 127 l4 -5 l4 5" />
          <Path d="M224 131 l0 -5 M220 128 l4 -5 l4 5" />
          <Path d="M287 127 l0 -5 M283 124 l4 -5 l4 5" />
          <Path d="M299 127 l0 -4 M296 125 l3 -4 l3 4" />
        </G>
      </G>

      {/* 4. 중경의 패치워크 밭 */}
      <Path
        d="M0 150 Q110 135 210 155 T320 140 V240 H0 Z"
        fill="url(#plantField)"
      />

      {/* 밭고랑의 부드러운 곡선 */}
      <G
        fill="none"
        stroke="#B5DEAA"
        strokeWidth={1.2}
        strokeLinecap="round"
        opacity={0.65}
      >
        <Path d="M-8 158 Q70 144 137 157 T260 156 T328 150" />
        <Path d="M-8 169 Q73 153 142 168 T265 166 T328 161" />
        <Path d="M18 183 Q86 165 143 180" />
        <Path d="M175 180 Q236 166 323 177" />
      </G>

      {/* 밭에 스며드는 작은 빛 */}
      <G opacity={0.3}>
        <Ellipse cx="82" cy="158" rx="55" ry="9" fill="#F5F8D9" />
        <Ellipse cx="256" cy="163" rx="42" ry="7" fill="#F5F8D9" />
      </G>

      {/* 5. 풀밭 바로 뒤의 언덕 */}
      <Path
        d="M0 170 Q75 153 142 171 Q220 188 320 165 V240 H0 Z"
        fill="#B9E2B0"
      />

      {/* 언덕의 완만한 빛과 그림자 */}
      <Path
        d="M0 181 Q74 165 143 184 Q230 198 320 177"
        fill="none"
        stroke="#CBEBC0"
        strokeWidth={2}
        opacity={0.7}
      />

      {/* 6. 전경의 메인 잔디밭 */}
      <Path
        d="M0 190
           Q42 177 80 188
           Q124 199 163 187
           Q210 175 251 188
           Q289 197 320 183
           V240 H0 Z"
        fill="url(#plantGrass)"
      />

      {/* 잔디밭 위의 부드러운 색면 */}
      <Path
        d="M0 204 Q62 190 119 205
           T235 201 T320 198
           V240 H0 Z"
        fill="#A9DA9D"
        opacity={0.55}
      />

      {/* 7. 바람에 흔들리는 둥근 풀잎들 */}
      <G
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.75}
      >
        {/* 왼쪽 잔디 */}
        <G stroke="#85CC7B" strokeWidth={2.5}>
          <Path d="M10 239 Q15 222 8 210" />
          <Path d="M19 239 Q21 219 34 207" />
          <Path d="M30 239 Q36 224 31 214" />
          <Path d="M43 239 Q48 218 61 213" />
          <Path d="M55 239 Q57 225 52 218" />
          <Path d="M68 239 Q77 220 88 219" />
          <Path d="M80 239 Q84 226 80 220" />
        </G>

        <G stroke="#6EB264" strokeWidth={2}>
          <Path d="M14 239 Q10 229 17 222" />
          <Path d="M36 239 Q30 226 25 221" />
          <Path d="M49 239 Q53 228 65 224" />
          <Path d="M72 239 Q68 230 72 225" />
          <Path d="M91 239 Q96 229 106 226" />
        </G>

        {/* 가운데 잔디 */}
        <G stroke="#85CC7B" strokeWidth={2.5}>
          <Path d="M111 239 Q115 222 108 214" />
          <Path d="M124 239 Q128 222 140 215" />
          <Path d="M138 239 Q142 226 137 219" />
          <Path d="M151 239 Q158 222 168 218" />
          <Path d="M168 239 Q170 226 179 221" />
          <Path d="M185 239 Q190 223 185 215" />
          <Path d="M200 239 Q204 226 215 222" />
        </G>

        <G stroke="#6EB264" strokeWidth={2}>
          <Path d="M118 239 Q111 229 117 222" />
          <Path d="M146 239 Q151 230 160 226" />
          <Path d="M177 239 Q173 229 179 224" />
          <Path d="M207 239 Q212 230 222 228" />
        </G>

        {/* 오른쪽 잔디 */}
        <G stroke="#85CC7B" strokeWidth={2.5}>
          <Path d="M226 239 Q231 222 226 214" />
          <Path d="M239 239 Q246 221 258 216" />
          <Path d="M254 239 Q258 227 253 220" />
          <Path d="M268 239 Q276 220 287 216" />
          <Path d="M283 239 Q286 227 282 221" />
          <Path d="M298 239 Q305 222 315 218" />
        </G>

        <G stroke="#6EB264" strokeWidth={2}>
          <Path d="M233 239 Q227 230 233 224" />
          <Path d="M262 239 Q267 229 276 225" />
          <Path d="M290 239 Q294 230 302 227" />
          <Path d="M310 239 Q307 230 313 225" />
        </G>
      </G>

      {/* 8. 작은 흰색 들꽃 */}
      <G opacity={0.88}>
        {/* 꽃 1 */}
        <G>
          <Path
            d="M58 234 Q59 224 62 220"
            fill="none"
            stroke="#7EBB75"
            strokeWidth={1.3}
            strokeLinecap="round"
          />
          <Ellipse cx="58" cy="219" rx="2" ry="3" fill="#FFFDF0" />
          <Ellipse cx="63" cy="216" rx="2" ry="3" fill="#FFFDF0" />
          <Ellipse cx="66" cy="220" rx="2" ry="3" fill="#FFFDF0" />
          <Ellipse cx="61" cy="223" rx="2" ry="3" fill="#FFFDF0" />
          <Circle cx="62" cy="220" r="1.6" fill="#FFE885" />
        </G>

        {/* 꽃 2 */}
        <G>
          <Path
            d="M105 237 Q106 228 109 226"
            fill="none"
            stroke="#7EBB75"
            strokeWidth={1.3}
            strokeLinecap="round"
          />
          <Circle cx="107" cy="223" r="2.4" fill="#FFFDF0" />
          <Circle cx="111" cy="225" r="2.4" fill="#FFFDF0" />
          <Circle cx="109" cy="228" r="2.4" fill="#FFFDF0" />
          <Circle cx="105" cy="226" r="2.4" fill="#FFFDF0" />
          <Circle cx="109" cy="226" r="1.3" fill="#FFE885" />
        </G>

        {/* 꽃 3 */}
        <G>
          <Path
            d="M211 238 Q211 229 215 225"
            fill="none"
            stroke="#7EBB75"
            strokeWidth={1.3}
            strokeLinecap="round"
          />
          <Circle cx="213" cy="222" r="2.3" fill="#FFFDF0" />
          <Circle cx="217" cy="224" r="2.3" fill="#FFFDF0" />
          <Circle cx="217" cy="228" r="2.3" fill="#FFFDF0" />
          <Circle cx="212" cy="227" r="2.3" fill="#FFFDF0" />
          <Circle cx="215" cy="225" r="1.3" fill="#FFE885" />
        </G>

        {/* 꽃 4 */}
        <G>
          <Path
            d="M270 237 Q269 229 273 225"
            fill="none"
            stroke="#7EBB75"
            strokeWidth={1.3}
            strokeLinecap="round"
          />
          <Ellipse cx="270" cy="223" rx="2" ry="3" fill="#FFFDF0" />
          <Ellipse cx="275" cy="222" rx="2" ry="3" fill="#FFFDF0" />
          <Ellipse cx="277" cy="226" rx="2" ry="3" fill="#FFFDF0" />
          <Ellipse cx="272" cy="228" rx="2" ry="3" fill="#FFFDF0" />
          <Circle cx="273" cy="225" r="1.3" fill="#FFE885" />
        </G>

        {/* 꽃 5 */}
        <G>
          <Path
            d="M155 238 Q156 231 158 229"
            fill="none"
            stroke="#7EBB75"
            strokeWidth={1.2}
            strokeLinecap="round"
          />
          <Circle cx="156" cy="227" r="2" fill="#FFFDF0" />
          <Circle cx="160" cy="228" r="2" fill="#FFFDF0" />
          <Circle cx="159" cy="232" r="2" fill="#FFFDF0" />
          <Circle cx="155" cy="231" r="2" fill="#FFFDF0" />
          <Circle cx="158" cy="229" r="1.1" fill="#FFE885" />
        </G>

        {/* 꽃 6 */}
        <G>
          <Path
            d="M294 237 Q294 231 297 229"
            fill="none"
            stroke="#7EBB75"
            strokeWidth={1.2}
            strokeLinecap="round"
          />
          <Circle cx="295" cy="227" r="2" fill="#FFFDF0" />
          <Circle cx="299" cy="228" r="2" fill="#FFFDF0" />
          <Circle cx="298" cy="232" r="2" fill="#FFFDF0" />
          <Circle cx="294" cy="231" r="2" fill="#FFFDF0" />
          <Circle cx="297" cy="229" r="1.1" fill="#FFE885" />
        </G>
      </G>

      {/* 9. 전체 풍경을 부드럽게 연결하는 우유빛 오버레이 */}
      <Rect
        x="0"
        y="0"
        width="412"
        height="332"
        rx="11"
        fill="#FFFDF6"
        opacity={0.32}
      />
    </>
  );
}

// 1. 팔레트 정의 (제시해주신 PALETTES 활용)
const PALETTE = {
  nature: { edge: "#70B78C", pale: "#EAF8E9" },
  sky: { edge: "#6AB6E8", pale: "#E9F7FF" },
  plant: { edge: "#65AE70", pale: "#EFF9E8" },
};

const SCENES: Record<NatureBackgroundKind, React.FC> = {
  nature: NatureScene,
  sky: SkyScene,
  plant: PlantScene,
};
export default function NatureCategoryBackground({
  category,
  width = "100%",
  height = "100%",
}: Props) {
  const Scene = SCENES[category];
  const colors = PALETTE[category];
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 240 180"
      preserveAspectRatio="none"
      style={{ width: "100%", height: "100%" }}
    >
      {/* <Rect width="320" height="240" rx="14" fill={colors.pale} /> */}
      {/* 320x240 크기의 모든 씬 내용을 240x180에 맞게 0.75배 축소 */}
      <G transform="scale(0.75)">
        <Scene />
      </G>
    </Svg>
  );
}
export { PALETTE as CLOTHING_SCENE_COLORS };

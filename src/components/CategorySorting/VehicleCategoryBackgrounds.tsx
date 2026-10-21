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

export type VehicleBackgroundCategory =
  | "vehicle"
  | "road_vehicle"
  | "rail_vehicle"
  | "air_vehicle"
  | "water_vehicle"
  | "construction_vehicle";

type Props = {
  category: VehicleBackgroundCategory;
  width?: number | string;
  height?: number | string;
};

const COLORS = {
  vehicle: { border: "#70B9D8", pale: "#EAF7FC" },
  road_vehicle: { border: "#E6B66B", pale: "#FFF5E3" },
  rail_vehicle: { border: "#8AABD7", pale: "#EEF4FF" },
  air_vehicle: { border: "#67B9E8", pale: "#EAF8FF" },
  water_vehicle: { border: "#5DAED0", pale: "#E8F8FC" },
  construction_vehicle: { border: "#D9A653", pale: "#FFF5D9" },
};

function VehicleScene() {
  return (
    <>
      <Defs>
        {/* 하늘 */}
        <LinearGradient id="vehicleSky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#E4F2F9" />
          <Stop offset="1" stopColor="#FFF9EF" />
        </LinearGradient>

        {/* 호수 */}
        <LinearGradient id="vehicleWater" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#D2E8F9" />
          <Stop offset="1" stopColor="#C6E1F3" />
        </LinearGradient>

        {/* 잔디 */}
        <LinearGradient id="vehicleGrass" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#CDE9C9" />
          <Stop offset="1" stopColor="#B7DDB6" />
        </LinearGradient>

        {/* 도로 */}
        <LinearGradient id="vehicleRoad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#AAA6A1" />
          <Stop offset="1" stopColor="#96938F" />
        </LinearGradient>
      </Defs>

      {/* 1. 바탕과 하늘 */}
      {/* <Rect x={0} y={0} width={420} height={340} rx={14} fill="#E4F2F9" /> */}

      <Rect
        x={0}
        y={0}
        width={412}
        height={332}
        rx={11}
        fill="url(#vehicleSky)"
      />

      {/* 햇살 */}
      <Circle cx={265} cy={25} r={32} fill="#FFF3D7" opacity={0.48} />
      <Circle cx={265} cy={25} r={19} fill="#FFF8E8" opacity={0.7} />

      {/* 2. 하늘의 구름 */}
      <G fill="#FFFDFA" opacity={0.9}>
        <Ellipse cx={48} cy={37} rx={24} ry={8} />
        <Circle cx={34} cy={34} r={9} />
        <Circle cx={47} cy={29} r={12} />
        <Circle cx={61} cy={35} r={8} />

        <Ellipse cx={263} cy={57} rx={25} ry={7} />
        <Circle cx={249} cy={53} r={8} />
        <Circle cx={263} cy={48} r={11} />
        <Circle cx={277} cy={54} r={8} />
      </G>

      {/* 3. 하늘과 호수 사이의 먼 언덕 */}
      <Path
        d="M4 83
           Q39 57 75 75
           Q113 91 151 73
           Q190 55 226 76
           Q270 91 316 69
           L316 101 L4 101 Z"
        fill="#D4EDDA"
        opacity={0.9}
      />

      {/* 언덕 위 작은 나무 실루엣 */}
      <G opacity={0.45} fill="#A9D4AD">
        <Circle cx={84} cy={74} r={5} />
        <Circle cx={90} cy={72} r={6} />
        <Circle cx={96} cy={75} r={4} />

        <Circle cx={207} cy={70} r={5} />
        <Circle cx={213} cy={67} r={7} />
        <Circle cx={220} cy={72} r={5} />
      </G>

      {/* 4. 호수 */}
      <Rect x={4} y={85} width={312} height={45} fill="url(#vehicleWater)" />

      {/* 잔잔한 수면 반짝임 */}
      <G
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={1.2}
        strokeLinecap="round"
        opacity={0.75}
      >
        <Path d="M12 96 Q21 93 30 96" />
        <Path d="M103 105 Q113 102 123 105" />
        <Path d="M146 93 Q154 91 163 93" />
        <Path d="M256 110 Q267 107 278 110" />
        <Path d="M289 95 Q296 93 303 95" />
        <Path d="M74 119 Q81 117 89 119" />
      </G>

      {/* 5. 작은 돛단배 - 왼쪽 */}
      <G opacity={0.72}>
        {/* 돛대 */}
        <Path
          d="M48 88 L48 72"
          stroke="#C8B69F"
          strokeWidth={1.5}
          strokeLinecap="round"
        />

        {/* 돛 */}
        <Path d="M46 74 L34 85 L46 85 Z" fill="#FDE4EC" />
        <Path d="M50 75 L61 85 L50 85 Z" fill="#FFF3E0" />

        {/* 선체 */}
        <Path d="M31 87 Q47 91 63 87 L58 92 L37 92 Z" fill="#EADCC8" />

        {/* 작은 구명튜브 */}
        <Circle
          cx={54}
          cy={87}
          r={2.2}
          fill="#FDE4EC"
          stroke="#EADCC8"
          strokeWidth={0.7}
        />
      </G>

      {/* 6. 작은 돛단배 - 오른쪽 */}
      <G opacity={0.7}>
        <Path
          d="M230 101 L230 84"
          stroke="#C8B69F"
          strokeWidth={1.5}
          strokeLinecap="round"
        />

        <Path d="M228 86 L216 98 L228 98 Z" fill="#FFF3E0" />
        <Path d="M232 87 L243 98 L232 98 Z" fill="#FDE4EC" />

        <Path
          d="M213 100 Q229 104 245 100 L240 105 L219 105 Z"
          fill="#EADCC8"
        />

        <Circle
          cx={236}
          cy={100}
          r={2}
          fill="#FFF3E0"
          stroke="#D9C6B1"
          strokeWidth={0.7}
        />
      </G>

      {/* 7. 잔디밭 */}
      <Rect x={4} y={130} width={312} height={45} fill="url(#vehicleGrass)" />

      {/* 잔디의 완만한 지형 */}
      <Path
        d="M4 139
           Q66 130 121 139
           T224 138
           Q271 132 316 140
           V175 H4 Z"
        fill="#C3E6CB"
        opacity={0.7}
      />

      {/* 철길 바깥의 자갈 받침 */}
      <Path
        d="M4 151 Q160 147 316 151"
        fill="none"
        stroke="#D9CDBB"
        strokeWidth={9}
        strokeLinecap="round"
        opacity={0.55}
      />

      {/* 철길 레일 두 줄 */}
      <G fill="none" stroke="#B8A896" strokeWidth={1.8} strokeLinecap="round">
        <Path d="M4 147 Q160 143 316 147" />
        <Path d="M4 157 Q160 153 316 157" />
      </G>

      {/* 침목 */}
      <G
        stroke="#B8A896"
        strokeWidth={1.3}
        strokeLinecap="round"
        opacity={0.85}
      >
        <Path d="M22 145 L22 159" />
        <Path d="M42 145 L42 159" />
        <Path d="M62 145 L62 159" />
        <Path d="M82 145 L82 159" />
        <Path d="M102 144 L102 158" />
        <Path d="M122 144 L122 158" />
        <Path d="M142 144 L142 158" />
        <Path d="M162 144 L162 158" />
        <Path d="M182 144 L182 158" />
        <Path d="M202 144 L202 158" />
        <Path d="M222 144 L222 158" />
        <Path d="M242 144 L242 158" />
        <Path d="M262 144 L262 158" />
        <Path d="M282 144 L282 158" />
        <Path d="M302 145 L302 159" />
      </G>

      {/* 8. 파스텔 꼬마 기차 */}
      <G opacity={0.76}>
        {/* 객차 */}
        <Rect
          x={184}
          y={132}
          width={22}
          height={13}
          rx={3}
          fill="#FFF3E0"
          stroke="#E7D4C6"
          strokeWidth={0.7}
        />
        <Rect
          x={208}
          y={134}
          width={19}
          height={11}
          rx={3}
          fill="#FDE4EC"
          stroke="#E7D4C6"
          strokeWidth={0.7}
        />

        {/* 객차 창문 */}
        <Rect x={188} y={135} width={5} height={5} rx={1.5} fill="#D6EAF6" />
        <Rect x={196} y={135} width={5} height={5} rx={1.5} fill="#D6EAF6" />
        <Rect x={212} y={137} width={5} height={4} rx={1.3} fill="#D6EAF6" />

        {/* 기관차 본체 */}
        <Rect
          x={227}
          y={132}
          width={21}
          height={13}
          rx={3}
          fill="#FDE4EC"
          stroke="#E7D4C6"
          strokeWidth={0.7}
        />

        {/* 기관차 앞부분 */}
        <Path
          d="M244 137 L250 137 Q253 138 253 142 L253 145 L244 145 Z"
          fill="#FDE4EC"
          stroke="#E7D4C6"
          strokeWidth={0.7}
        />

        {/* 운전실 */}
        <Rect
          x={231}
          y={126}
          width={11}
          height={9}
          rx={2}
          fill="#FFF3E0"
          stroke="#E7D4C6"
          strokeWidth={0.7}
        />
        <Rect x={234} y={128} width={5} height={4} rx={1} fill="#D6EAF6" />

        {/* 굴뚝 */}
        <Rect x={246} y={129} width={4} height={6} rx={1} fill="#EADCC8" />

        {/* 바퀴 */}
        <Circle cx={190} cy={145} r={3} fill="#DBC6AC" />
        <Circle cx={201} cy={145} r={3} fill="#DBC6AC" />
        <Circle cx={216} cy={145} r={3} fill="#DBC6AC" />
        <Circle cx={235} cy={145} r={3} fill="#DBC6AC" />
        <Circle cx={248} cy={145} r={3} fill="#DBC6AC" />
      </G>

      {/* 9. 도로 */}
      <Rect x={4} y={175} width={312} height={61} fill="url(#vehicleRoad)" />

      {/* 도로 위쪽 가장자리 */}
      <Path
        d="M4 176 Q160 173 316 176"
        fill="none"
        stroke="#D5D0C8"
        strokeWidth={2}
        opacity={0.8}
      />

      {/* 도로의 부드러운 아스팔트 질감 */}
      <G
        fill="none"
        stroke="#C3BFBA"
        strokeWidth={1}
        strokeLinecap="round"
        opacity={0.32}
      >
        <Path d="M24 187 l8 -1" />
        <Path d="M122 204 l10 0" />
        <Path d="M285 188 l7 1" />
        <Path d="M90 229 l9 -1" />
        <Path d="M213 225 l7 0" />
      </G>

      {/* 중앙 차선 */}
      <Path
        d="M13 207 H307"
        fill="none"
        stroke="#FFFEFA"
        strokeWidth={2.5}
        strokeDasharray="12 10"
        strokeLinecap="round"
        opacity={0.85}
      />

      {/* 10. 왼쪽 파스텔 레트로 자동차 */}
      <G opacity={0.76}>
        {/* 그림자 */}
        <Ellipse
          cx={66}
          cy={222}
          rx={29}
          ry={4}
          fill="#6D7778"
          opacity={0.15}
        />

        {/* 차체 */}
        <Path
          d="M39 212
             L42 202
             Q43 199 48 199
             L56 191
             Q59 188 65 188
             L78 188
             Q82 189 85 195
             L91 201
             Q95 202 96 207
             L96 214
             Q95 217 91 217
             L43 217
             Q39 216 39 212 Z"
          fill="#EEEAF9"
          stroke="#D2C8E6"
          strokeWidth={1}
        />

        {/* 지붕과 창문 */}
        <Path
          d="M53 198 L60 192 Q62 191 66 191 L76 191 Q79 192 81 198 Z"
          fill="#D6EAF6"
        />
        <Path d="M65 192 L65 198" stroke="#C4CDE1" strokeWidth={1} />

        {/* 범퍼와 라이트 */}
        <Rect x={40} y={208} width={5} height={3} rx={1} fill="#FFF3E0" />
        <Rect x={90} y={208} width={4} height={3} rx={1} fill="#F8D8D3" />

        {/* 바퀴 */}
        <Circle cx={52} cy={216} r={6} fill="#8D8C91" />
        <Circle cx={52} cy={216} r={3} fill="#EADCC8" />
        <Circle cx={82} cy={216} r={6} fill="#8D8C91" />
        <Circle cx={82} cy={216} r={3} fill="#EADCC8" />
      </G>

      {/* 11. 오른쪽 파스텔 레트로 자동차 */}
      <G opacity={0.76}>
        {/* 그림자 */}
        <Ellipse
          cx={243}
          cy={226}
          rx={29}
          ry={4}
          fill="#6D7778"
          opacity={0.15}
        />

        {/* 차체 */}
        <Path
          d="M215 216
             L218 206
             Q219 203 224 203
             L232 195
             Q235 192 241 192
             L253 192
             Q258 193 261 199
             L267 205
             Q271 206 272 211
             L272 218
             Q271 221 267 221
             L219 221
             Q215 220 215 216 Z"
          fill="#E4F2F9"
          stroke="#C4DDEB"
          strokeWidth={1}
        />

        {/* 지붕과 창문 */}
        <Path
          d="M229 202 L236 196 Q238 195 242 195 L252 195 Q255 196 257 202 Z"
          fill="#CDE4F4"
        />
        <Path d="M241 196 L241 202" stroke="#B8D3E5" strokeWidth={1} />

        {/* 범퍼와 라이트 */}
        <Rect x={216} y={212} width={5} height={3} rx={1} fill="#FFF3E0" />
        <Rect x={267} y={212} width={4} height={3} rx={1} fill="#F8D8D3" />

        {/* 바퀴 */}
        <Circle cx={228} cy={220} r={6} fill="#8D8C91" />
        <Circle cx={228} cy={220} r={3} fill="#EADCC8" />
        <Circle cx={258} cy={220} r={6} fill="#8D8C91" />
        <Circle cx={258} cy={220} r={3} fill="#EADCC8" />
      </G>

      {/* 12. 하늘의 작은 파스텔 여객기 */}
      <G transform="translate(145 34) scale(0.7)" opacity={0.65}>
        {/* 꼬리날개 */}
        <Path
          d="M-19 0 L-27 -8 L-23 0 L-27 6 Z"
          fill="#EEEAF9"
          stroke="#D9D3E9"
          strokeWidth={0.8}
        />

        {/* 본체 */}
        <Path
          d="M-24 0
             Q-25 -3 -20 -3
             L17 -3
             Q24 -3 27 0
             Q24 3 17 3
             L-20 3
             Q-25 3 -24 0 Z"
          fill="#FFF8EF"
          stroke="#E8DCCD"
          strokeWidth={0.8}
        />

        {/* 날개 */}
        <Path
          d="M-5 -2 L5 -12 Q7 -13 10 -12 L6 -2 Z"
          fill="#EEEAF9"
          stroke="#D9D3E9"
          strokeWidth={0.7}
        />
        <Path
          d="M-5 2 L5 12 Q7 13 10 12 L6 2 Z"
          fill="#EEEAF9"
          stroke="#D9D3E9"
          strokeWidth={0.7}
        />

        {/* 창문 */}
        <G fill="#C7E2F3">
          <Circle cx={-13} cy={0} r={1.2} />
          <Circle cx={-8} cy={0} r={1.2} />
          <Circle cx={-3} cy={0} r={1.2} />
          <Circle cx={2} cy={0} r={1.2} />
          <Circle cx={7} cy={0} r={1.2} />
          <Circle cx={12} cy={0} r={1.2} />
        </G>
      </G>

      {/* 13. 전체를 감싸는 따뜻한 우유빛 오버레이 */}
      <Rect
        x={0}
        y={0}
        width={512}
        height={332}
        rx={11}
        fill="#FFFDF6"
        opacity={0.3}
      />
    </>
  );
}

function RoadScene() {
  return (
    <>
      <Defs>
        {/* 포근한 파스텔 초원 */}
        <LinearGradient id="roadMeadow" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#F2F9EE" />
          <Stop offset="1" stopColor="#DCEFD8" />
        </LinearGradient>

        {/* 도로 표면 */}
        <LinearGradient id="roadSurface" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#BDB7B0" />
          <Stop offset="1" stopColor="#AFA9A3" />
        </LinearGradient>

        {/* 나무의 부드러운 명암 */}
        <LinearGradient id="roadPineLeaves" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#B8E0C2" />
          <Stop offset="1" stopColor="#8EC8A3" />
        </LinearGradient>

        <LinearGradient id="roadCarBody" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFFDF8" />
          <Stop offset="1" stopColor="#FDE4EC" />
        </LinearGradient>
      </Defs>

      {/* 1. 기본 초원 배경 */}
      <Rect x={0} y={0} width={420} height={340} rx={14} fill="#EAF5E8" />

      <Rect
        x={0}
        y={0}
        width={412}
        height={332}
        rx={11}
        fill="url(#roadMeadow)"
      />

      {/* 2. 부드러운 초원 둔덕 */}
      <G opacity={0.65}>
        <Ellipse cx={54} cy={67} rx={65} ry={30} fill="#CDECC6" />
        <Ellipse cx={260} cy={73} rx={74} ry={34} fill="#CDECC6" />
        <Ellipse cx={65} cy={194} rx={83} ry={34} fill="#CDECC6" />
        <Ellipse cx={273} cy={207} rx={64} ry={30} fill="#CDECC6" />
      </G>

      {/* 초원의 은은한 곡선 */}
      <G
        fill="none"
        stroke="#C1E2B9"
        strokeWidth={1.2}
        strokeLinecap="round"
        opacity={0.65}
      >
        <Path d="M8 85 Q42 74 75 83" />
        <Path d="M230 92 Q266 79 308 89" />
        <Path d="M12 181 Q42 170 68 180" />
        <Path d="M260 225 Q283 215 308 221" />
      </G>

      {/* 3. 나무 그리기용 소품 */}

      {/* 왼쪽 위 침엽수 */}
      <G opacity={0.78}>
        <Path d="M29 75 L33 56 L37 75 Z" fill="#C9B59C" />
        <Path
          d="M33 29 L19 51 L27 51 L15 64 L51 64 L39 51 L47 51 Z"
          fill="url(#roadPineLeaves)"
        />
        <Path
          d="M33 35 L26 49 L33 47 L23 59 L33 57 Z"
          fill="#A8D8B9"
          opacity={0.75}
        />
      </G>

      {/* 왼쪽 가장자리 침엽수 */}
      <G opacity={0.76}>
        <Path d="M12 135 L15 119 L18 135 Z" fill="#C9B59C" />
        <Path
          d="M15 94 L3 114 L10 114 L1 127 L29 127 L20 114 L27 114 Z"
          fill="#A8D8B9"
        />
      </G>

      {/* 왼쪽 중간 침엽수 */}
      <G opacity={0.75}>
        <Path d="M38 187 L41 169 L44 187 Z" fill="#C9B59C" />
        <Path
          d="M41 143 L28 165 L35 165 L24 178 L58 178 L47 165 L54 165 Z"
          fill="#8EC8A3"
        />
      </G>

      {/* 중앙 왼쪽 침엽수 */}
      <G opacity={0.78}>
        <Path d="M119 106 L122 89 L125 106 Z" fill="#C9B59C" />
        <Path
          d="M122 65 L110 84 L117 84 L106 98 L138 98 L127 84 L134 84 Z"
          fill="#A8D8B9"
        />
      </G>

      {/* 중앙 오른쪽 침엽수 */}
      <G opacity={0.78}>
        <Path d="M213 83 L216 67 L219 83 Z" fill="#C9B59C" />
        <Path
          d="M216 42 L204 62 L211 62 L201 75 L231 75 L221 62 L228 62 Z"
          fill="#8EC8A3"
        />
      </G>

      {/* 오른쪽 위 침엽수 */}
      <G opacity={0.75}>
        <Path d="M296 108 L299 91 L302 108 Z" fill="#C9B59C" />
        <Path
          d="M299 67 L287 87 L294 87 L283 100 L315 100 L304 87 L311 87 Z"
          fill="#A8D8B9"
        />
      </G>

      {/* 오른쪽 아래 침엽수 */}
      <G opacity={0.78}>
        <Path d="M296 188 L299 171 L302 188 Z" fill="#C9B59C" />
        <Path
          d="M299 147 L287 166 L294 166 L283 180 L315 180 L304 166 L311 166 Z"
          fill="#8EC8A3"
        />
      </G>

      {/* 하단 중앙 침엽수 */}
      <G opacity={0.76}>
        <Path d="M158 232 L161 216 L164 232 Z" fill="#C9B59C" />
        <Path
          d="M161 192 L149 211 L156 211 L145 224 L177 224 L166 211 L173 211 Z"
          fill="#A8D8B9"
        />
      </G>

      {/* 4. 둥근 활엽수 - 상단 왼쪽 */}
      <G opacity={0.78}>
        <Path d="M68 60 Q71 48 69 39 L77 39 Q75 50 79 60 Z" fill="#B59F84" />
        <Circle cx={63} cy={36} r={12} fill="#9BCF85" />
        <Circle cx={75} cy={30} r={14} fill="#A8D995" />
        <Circle cx={87} cy={38} r={11} fill="#95C982" />
        <Circle cx={75} cy={42} r={12} fill="#A4D58F" />
        <Circle cx={70} cy={29} r={5} fill="#C8E8B7" opacity={0.8} />
      </G>

      {/* 둥근 활엽수 - 오른쪽 아래 */}
      <G opacity={0.78}>
        <Path
          d="M253 224 Q256 211 254 201 L262 201 Q260 213 264 224 Z"
          fill="#B59F84"
        />
        <Circle cx={249} cy={200} r={12} fill="#9BCF85" />
        <Circle cx={262} cy={194} r={14} fill="#A8D995" />
        <Circle cx={274} cy={201} r={12} fill="#95C982" />
        <Circle cx={262} cy={207} r={12} fill="#A4D58F" />
        <Circle cx={258} cy={193} r={5} fill="#C8E8B7" opacity={0.8} />
      </G>

      {/* 5. S자 도로의 바깥쪽 가장자리 */}
      <Path
        d="M280 20
           C180 20 80 50 80 90
           C80 130 260 120 260 160
           C260 200 120 205 0 210"
        fill="none"
        stroke="#D2CCC4"
        strokeWidth={35}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 도로 본체 */}
      <Path
        d="M280 20
           C180 20 80 50 80 90
           C80 130 260 120 260 160
           C260 200 120 205 0 210"
        fill="none"
        stroke="url(#roadSurface)"
        strokeWidth={30}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 도로의 부드러운 하이라이트 */}
      <Path
        d="M280 20
           C180 20 80 50 80 90
           C80 130 260 120 260 160
           C260 200 120 205 0 210"
        fill="none"
        stroke="#D4CEC7"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.6}
      />

      {/* 6. 도로 중앙 점선 */}
      <Path
        d="M280 20
           C180 20 80 50 80 90
           C80 130 260 120 260 160
           C260 200 120 205 0 210"
        fill="none"
        stroke="#FFFEFA"
        strokeWidth={1.8}
        strokeDasharray="6 5"
        strokeLinecap="round"
        opacity={0.9}
      />

      {/* 7. 커브 주의 표지판 - 왼쪽 코너 */}
      <G transform="translate(45 78) scale(0.7)" opacity={0.78}>
        <Path
          d="M0 15 L0 39"
          fill="none"
          stroke="#A3988E"
          strokeWidth={3}
          strokeLinecap="round"
        />

        <Path
          d="M0 -4 L15 5 L15 23 L0 31 L-15 23 L-15 5 Z"
          fill="#FFF3E0"
          stroke="#D9C8A9"
          strokeWidth={1.5}
        />

        <Path
          d="M-6 7 Q5 7 5 14 Q5 20 -4 20"
          fill="none"
          stroke="#8C7A6B"
          strokeWidth={2.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <Path
          d="M-8 17 L-4 20 L-7 24"
          fill="none"
          stroke="#8C7A6B"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>

      {/* 커브 주의 표지판 - 오른쪽 코너 */}
      <G transform="translate(293 139) scale(0.7)" opacity={0.78}>
        <Path
          d="M0 15 L0 39"
          fill="none"
          stroke="#A3988E"
          strokeWidth={3}
          strokeLinecap="round"
        />

        <Path
          d="M0 -4 L15 5 L15 23 L0 31 L-15 23 L-15 5 Z"
          fill="#FFF3E0"
          stroke="#D9C8A9"
          strokeWidth={1.5}
        />

        <Path
          d="M-6 7 Q5 7 5 14 Q5 20 -4 20"
          fill="none"
          stroke="#8C7A6B"
          strokeWidth={2.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <Path
          d="M-8 17 L-4 20 L-7 24"
          fill="none"
          stroke="#8C7A6B"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>

      {/* 8. 상단 도로의 작은 피치 승용차 */}
      <G transform="translate(199 20) rotate(-10) scale(0.6)" opacity={0.65}>
        <Ellipse cx={0} cy={13} rx={25} ry={3} fill="#8F8B86" opacity={0.2} />

        <Path
          d="M-25 5 L-21 -3 Q-20 -6 -15 -6
             L-8 -13 Q-5 -15 0 -15
             L10 -15 Q15 -14 18 -7
             L24 -2 Q27 0 27 5
             L27 9 L-25 9 Z"
          fill="url(#roadCarBody)"
          stroke="#E8C9D0"
          strokeWidth={1}
        />

        <Path d="M-7 -12 L0 -12 L0 -5 L-14 -5 Z" fill="#DCEBF4" />
        <Path d="M3 -12 L10 -12 Q13 -11 16 -5 L3 -5 Z" fill="#DCEBF4" />

        <Circle cx={-15} cy={8} r={5} fill="#8D8B8A" />
        <Circle cx={-15} cy={8} r={2.5} fill="#EADCC8" />
        <Circle cx={17} cy={8} r={5} fill="#8D8B8A" />
        <Circle cx={17} cy={8} r={2.5} fill="#EADCC8" />

        <Rect x={22} y={2} width={4} height={3} rx={1} fill="#FFF3E0" />
      </G>

      {/* 9. 중간 도로의 작은 파스텔 트럭 */}
      <G transform="translate(177 124) rotate(8) scale(0.6)" opacity={0.65}>
        <Ellipse cx={0} cy={12} rx={27} ry={3} fill="#8F8B86" opacity={0.2} />

        {/* 적재함 */}
        <Rect
          x={-27}
          y={-10}
          width={28}
          height={18}
          rx={3}
          fill="#E4F2F9"
          stroke="#C4DDEB"
          strokeWidth={1}
        />

        {/* 운전석 */}
        <Path
          d="M1 -4 L13 -4 Q16 -4 19 1 L24 5 L24 9 L1 9 Z"
          fill="#D5EAF7"
          stroke="#C4DDEB"
          strokeWidth={1}
        />

        <Path d="M5 -1 L12 -1 Q14 -1 17 4 L5 4 Z" fill="#BFDDEE" />

        {/* 적재함의 장식 선 */}
        <Path
          d="M-22 -5 H-5 M-22 0 H-5"
          stroke="#C4DDEB"
          strokeWidth={1.3}
          strokeLinecap="round"
        />

        <Circle cx={-16} cy={9} r={5} fill="#8D8B8A" />
        <Circle cx={-16} cy={9} r={2.5} fill="#EADCC8" />
        <Circle cx={12} cy={9} r={5} fill="#8D8B8A" />
        <Circle cx={12} cy={9} r={2.5} fill="#EADCC8" />

        <Rect x={20} y={5} width={3} height={3} rx={1} fill="#FFF3E0" />
      </G>

      {/* 10. 하단 도로의 작은 버스 */}
      <G transform="translate(87 202) rotate(2) scale(0.65)" opacity={0.7}>
        <Ellipse cx={0} cy={13} rx={28} ry={3} fill="#8F8B86" opacity={0.2} />

        {/* 버스 차체 */}
        <Path
          d="M-27 -12
             Q-27 -16 -22 -16
             L19 -16
             Q26 -16 26 -9
             L26 8
             L-27 8 Z"
          fill="#FFF3E0"
          stroke="#E5D3B5"
          strokeWidth={1}
        />

        {/* 창문 */}
        <Rect x={-22} y={-12} width={9} height={8} rx={1.5} fill="#D6EAF6" />
        <Rect x={-10} y={-12} width={9} height={8} rx={1.5} fill="#D6EAF6" />
        <Rect x={2} y={-12} width={9} height={8} rx={1.5} fill="#D6EAF6" />
        <Rect x={14} y={-12} width={7} height={8} rx={1.5} fill="#D6EAF6" />

        {/* 앞 유리와 범퍼 */}
        <Rect x={19} y={-2} width={5} height={6} rx={1} fill="#E4F2F9" />
        <Rect x={-25} y={3} width={4} height={3} rx={1} fill="#F8D8D3" />
        <Rect x={22} y={3} width={3} height={3} rx={1} fill="#FFFDF8" />

        {/* 바퀴 */}
        <Circle cx={-16} cy={8} r={5} fill="#8D8B8A" />
        <Circle cx={-16} cy={8} r={2.5} fill="#EADCC8" />
        <Circle cx={16} cy={8} r={5} fill="#8D8B8A" />
        <Circle cx={16} cy={8} r={2.5} fill="#EADCC8" />
      </G>

      {/* 11. 작은 풀잎으로 초원 마무리 */}
      <G
        fill="none"
        stroke="#8FC98B"
        strokeWidth={1.6}
        strokeLinecap="round"
        opacity={0.65}
      >
        <Path d="M16 229 Q13 219 8 216" />
        <Path d="M20 230 Q22 220 28 218" />
        <Path d="M117 57 Q114 51 110 50" />
        <Path d="M124 58 Q128 51 133 51" />
        <Path d="M300 224 Q296 215 292 213" />
        <Path d="M305 224 Q309 216 313 215" />
      </G>

      {/* 12. 전체에 따뜻한 우유빛 오버레이 */}
      <Rect
        x={0}
        y={0}
        width={412}
        height={332}
        rx={11}
        fill="#FFFDF6"
        opacity={0.3}
      />
    </>
  );
}

export function AirVehicleScene() {
  const farClouds = [
    [48, 100, 23, 4],
    [110, 115, 30, 3],
    [179, 103, 25, 3.5],
    [252, 113, 24, 3],
  ];

  const sparkles = [
    { x: 184, y: 57, size: 4 },
    { x: 236, y: 82, size: 3 },
    { x: 151, y: 74, size: 2.5 },
  ];

  return (
    <>
      <Defs>
        {/* 파스텔 블루에서 피치 핑크로 이어지는 하늘 */}
        <LinearGradient id="fairytaleAirSky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#A3D2F7" />
          <Stop offset="0.65" stopColor="#E4F2F9" />
          <Stop offset="1" stopColor="#FDE4EC" />
        </LinearGradient>

        {/* 아래쪽 마을 언덕 */}
        <LinearGradient id="airVillageHill" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#C3E6CB" />
          <Stop offset="1" stopColor="#A9DDB8" />
        </LinearGradient>
      </Defs>

      {/* 둥근 모서리 하늘 배경 */}
      <Rect x={7} y={7} width={306} height={226} rx={12} fill="#E9F7FF" />

      <G>
        {/* 하늘 */}
        <Rect
          x={7}
          y={7}
          width={306}
          height={226}
          rx={12}
          fill="url(#fairytaleAirSky)"
        />

        {/* 상단 왼쪽 구름의 라벤더빛 밑그림자 */}
        <G fill="#E8DEF8" opacity={0.4}>
          <Ellipse cx={27} cy={49} rx={20} ry={10} />
          <Ellipse cx={42} cy={43} rx={17} ry={12} />
          <Ellipse cx={57} cy={51} rx={19} ry={9} />

          <Ellipse cx={253} cy={58} rx={20} ry={9} />
          <Ellipse cx={270} cy={50} rx={17} ry={12} />
          <Ellipse cx={286} cy={58} rx={19} ry={9} />
        </G>

        {/* 왼쪽 위 솜사탕 구름 */}
        <G fill="#FFFDFA" opacity={0.94}>
          <Circle cx={17} cy={40} r={12} />
          <Circle cx={29} cy={31} r={15} />
          <Circle cx={43} cy={36} r={17} />
          <Circle cx={57} cy={44} r={12} />
          <Ellipse cx={38} cy={45} rx={28} ry={10} />
        </G>

        {/* 오른쪽 위 솜사탕 구름 */}
        <G fill="#FFFDFA" opacity={0.94}>
          <Circle cx={249} cy={49} r={12} />
          <Circle cx={262} cy={37} r={17} />
          <Circle cx={278} cy={39} r={15} />
          <Circle cx={294} cy={47} r={13} />
          <Ellipse cx={274} cy={50} rx={29} ry={10} />
        </G>

        {/* 중앙 뒤편의 가느다란 먼 구름 */}
        <G fill="#FFFFFF" opacity={0.6}>
          {farClouds.map(([x, y, rx, ry], i) => (
            <Ellipse key={`far-cloud-${i}`} cx={x} cy={y} rx={rx} ry={ry} />
          ))}
        </G>

        {/* 무지개: 바깥쪽부터 안쪽으로 */}
        <G fill="none" strokeLinecap="round" opacity={0.5}>
          <Path d="M67 178 Q160 55 286 153" stroke="#FDE4EC" strokeWidth={5} />
          <Path d="M73 180 Q161 70 280 158" stroke="#FFF3E0" strokeWidth={4} />
          <Path d="M79 182 Q163 84 274 163" stroke="#E2F0CE" strokeWidth={4} />
          <Path
            d="M85 184 Q164 98 268 168"
            stroke="#D5EBFA"
            strokeWidth={3.5}
          />
        </G>

        {/* 구름 뒤편의 부드러운 수평 구름띠 */}
        <G fill="#FFFFFF" opacity={0.38}>
          <Ellipse cx={63} cy={136} rx={33} ry={4} />
          <Ellipse cx={119} cy={128} rx={27} ry={3} />
          <Ellipse cx={211} cy={137} rx={36} ry={4} />
          <Ellipse cx={278} cy={128} rx={22} ry={3} />
        </G>

        {/* 종이비행기의 점선 비행 궤적 */}
        <Path
          d="M153 67 Q171 56 189 68 T215 72"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={1.3}
          strokeDasharray="3,3"
          strokeLinecap="round"
          opacity={0.7}
        />

        {/* 작은 종이비행기 */}
        <G transform="translate(199 65) scale(0.6)" opacity={0.8}>
          <Path
            d="M-15 -5 L19 -14 L5 13 L0 2 Z"
            fill="#FFFFFF"
            stroke="#D2E8F9"
            strokeWidth={1.4}
            strokeLinejoin="round"
          />
          <Path
            d="M-15 -5 L0 2 L19 -14"
            fill="none"
            stroke="#D2E8F9"
            strokeWidth={1}
          />
          <Path d="M0 2 L5 13 L7 -2" fill="#E4F2F9" />
        </G>

        {/* 반짝이는 작은 별 */}
        {sparkles.map(({ x, y, size }, i) => (
          <G key={`air-sparkle-${i}`} opacity={0.8}>
            <Path
              d={`M${x} ${y - size}
                  Q${x + 0.7} ${y - 0.7} ${x + size} ${y}
                  Q${x + 0.7} ${y + 0.7} ${x} ${y + size}
                  Q${x - 0.7} ${y + 0.7} ${x - size} ${y}
                  Q${x - 0.7} ${y - 0.7} ${x} ${y - size} Z`}
              fill="#FFF9E6"
            />
          </G>
        ))}

        {/* 하단의 몽글몽글한 구름 언덕 */}
        <Path
          d="
            M7 190
            Q17 179 31 187
            Q41 166 58 180
            Q73 160 92 178
            Q107 166 124 183
            Q143 166 160 184
            Q176 169 193 185
            Q211 162 231 181
            Q250 164 268 181
            Q290 166 313 184
            L313 233 L7 233 Z
          "
          fill="#FFFDF7"
          opacity={0.88}
        />

        {/* 구름 언덕의 앞쪽 부드러운 레이어 */}
        <Path
          d="
            M7 207
            Q31 192 54 204
            Q76 187 101 205
            Q126 193 148 210
            Q174 193 197 208
            Q219 192 243 207
            Q277 189 313 205
            L313 233 L7 233 Z
          "
          fill="#FFF8F5"
          opacity={0.9}
        />

        {/* 최하단 미니 마을 언덕 */}
        <Path
          d="
            M7 215
            Q45 204 79 216
            Q111 226 148 214
            Q180 202 215 216
            Q267 227 313 207
            L313 233 L7 233 Z
          "
          fill="url(#airVillageHill)"
          opacity={0.85}
        />

        {/* 작은 나무 1 */}
        <G opacity={0.75}>
          <Path d="M49 213 L49 225" stroke="#A98269" strokeWidth={2} />
          <Circle cx={49} cy={208} r={7} fill="#85C99B" />
          <Circle cx={44} cy={212} r={5} fill="#A5DDB1" />
          <Circle cx={54} cy={213} r={5} fill="#B8E5BE" />
        </G>

        {/* 작은 집 1: 벽과 지붕 */}
        <G opacity={0.78}>
          <Rect x={78} y={211} width={15} height={13} rx={1} fill="#FFF6E9" />
          <Path d="M75 212 L85.5 202 L96 212 Z" fill="#E99A94" />
          <Rect x={84} y={216} width={4} height={8} rx={1} fill="#B5D7E9" />
          <Rect x={89} y={214} width={3} height={3} rx={0.5} fill="#B5D7E9" />
        </G>

        {/* 작은 나무 2 */}
        <G opacity={0.75}>
          <Path d="M122 214 L122 226" stroke="#A98269" strokeWidth={2} />
          <Circle cx={122} cy={209} r={7} fill="#82C89A" />
          <Circle cx={117} cy={213} r={5} fill="#A8DEB1" />
          <Circle cx={127} cy={213} r={5} fill="#BDE8C5" />
        </G>

        {/* 작은 집 2 */}
        <G opacity={0.78}>
          <Rect x={157} y={215} width={14} height={11} rx={1} fill="#FFF6E9" />
          <Path d="M154 216 L164 207 L174 216 Z" fill="#E99A94" />
          <Rect x={162} y={219} width={4} height={7} rx={1} fill="#B5D7E9" />
        </G>

        {/* 작은 나무 3 */}
        <G opacity={0.75}>
          <Path d="M197 215 L197 227" stroke="#A98269" strokeWidth={2} />
          <Circle cx={197} cy={210} r={7} fill="#82C89A" />
          <Circle cx={192} cy={214} r={5} fill="#A8DEB1" />
          <Circle cx={202} cy={214} r={5} fill="#BDE8C5" />
        </G>

        {/* 아주 작은 언덕의 꽃 */}
        <G opacity={0.7}>
          <Circle cx={25} cy={222} r={1.5} fill="#FFF3E0" />
          <Circle cx={31} cy={225} r={1.5} fill="#FDE4EC" />
          <Circle cx={230} cy={224} r={1.5} fill="#FFF3E0" />
          <Circle cx={278} cy={219} r={1.5} fill="#FDE4EC" />
          <Circle cx={292} cy={222} r={1.5} fill="#FFFDF7" />
        </G>

        {/* 전체를 따뜻하게 감싸는 우유빛 오버레이 */}
        <Rect
          x={7}
          y={7}
          width={306}
          height={226}
          rx={12}
          fill="#FFFDF6"
          opacity={0.32}
        />
      </G>
    </>
  );
}

export function AirScene() {
  const ribbonClouds = [
    { x: 48, y: 108, rx: 28, ry: 3 },
    { x: 104, y: 126, rx: 24, ry: 2.5 },
    { x: 171, y: 105, rx: 32, ry: 3 },
    { x: 252, y: 120, rx: 29, ry: 3 },
  ];

  return (
    <>
      <Defs>
        {/* 3단 수채화 하늘 */}
        <LinearGradient id="pureAirSky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#A0CFF7" />
          <Stop offset="0.5" stopColor="#E2E2F9" />
          <Stop offset="1" stopColor="#FDE4EC" />
        </LinearGradient>
      </Defs>

      {/* 둥근 하늘 바탕 */}
      <Rect x={7} y={7} width={306} height={226} rx={12} fill="#E9F7FF" />

      <G>
        {/* 하늘 그라데이션 */}
        <Rect
          x={0}
          y={0}
          width={406}
          height={326}
          rx={12}
          fill="url(#pureAirSky)"
        />

        {/* 상단 중앙의 은은한 햇살 */}
        <Circle cx={160} cy={7} r={72} fill="#FFFFFF" opacity={0.25} />
        <Circle cx={160} cy={7} r={48} fill="#FFF9E9" opacity={0.18} />

        {/* 왼쪽 위 구름 밑면의 라벤더 음영 */}
        <G fill="#E8DEF8" opacity={0.35}>
          <Ellipse cx={25} cy={40} rx={19} ry={9} />
          <Ellipse cx={43} cy={34} rx={17} ry={11} />
          <Ellipse cx={58} cy={42} rx={18} ry={8} />

          <Ellipse cx={253} cy={45} rx={20} ry={9} />
          <Ellipse cx={272} cy={36} rx={18} ry={12} />
          <Ellipse cx={290} cy={45} rx={19} ry={9} />
        </G>

        {/* 왼쪽 위 솜사탕 구름 */}
        <G fill="#FFFDFA" opacity={0.92}>
          <Circle cx={12} cy={30} r={11} />
          <Circle cx={25} cy={23} r={15} />
          <Circle cx={42} cy={27} r={17} />
          <Circle cx={57} cy={35} r={12} />
          <Ellipse cx={35} cy={36} rx={30} ry={10} />
        </G>

        {/* 오른쪽 위 솜사탕 구름 */}
        <G fill="#FFFDFA" opacity={0.92}>
          <Circle cx={250} cy={36} r={12} />
          <Circle cx={266} cy={26} r={17} />
          <Circle cx={283} cy={30} r={16} />
          <Circle cx={300} cy={38} r={13} />
          <Ellipse cx={276} cy={40} rx={31} ry={10} />
        </G>

        {/* 화면 왼쪽 중단에서 오른쪽 상단으로 이어지는 무지개 */}
        <G fill="none" strokeLinecap="round" opacity={0.45}>
          <Path d="M9 105 Q135 9 292 31" stroke="#FDE4EC" strokeWidth={5} />
          <Path d="M12 111 Q137 17 291 38" stroke="#FFF3E0" strokeWidth={4.5} />
          <Path d="M15 117 Q139 25 289 45" stroke="#E2F0CE" strokeWidth={4} />
          <Path d="M18 123 Q141 33 287 52" stroke="#E4F2F9" strokeWidth={3.5} />
        </G>

        {/* 중앙 뒤편의 가느다란 띠 구름 */}
        <G fill="#FFFFFF" opacity={0.5}>
          {ribbonClouds.map((cloud, i) => (
            <Ellipse
              key={`ribbon-cloud-${i}`}
              cx={cloud.x}
              cy={cloud.y}
              rx={cloud.rx}
              ry={cloud.ry}
            />
          ))}
        </G>

        {/* 먼 곳의 부드러운 비행 궤적 */}

        <Path
          d="M184 72 Q207 59 230 72 T275 69"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={1.5}
          strokeDasharray="4,4"
          strokeLinecap="round"
          opacity={0.6}
        />
        {/* 멀리 날아가는 작은 비행기 */}
        <G transform="translate(88 77) rotate(-12) scale(3)" opacity={0.9}>
          {/* 날개 */}
          <Path
            d="M-4 -2 L-1 -13 L3 -13 L2 -2"
            fill="#FFF8EF"
            stroke="#C8DFF2"
            strokeWidth={1}
            strokeLinejoin="round"
          />
          {/* 동체 */}
          <Path
            d="M-17 0 Q-14 -2 -8 -2 L12 -1 Q17 0 12 2 L-8 3 Q-14 3 -17 0 Z"
            fill="#FFF8EF"
            stroke="#C8DFF2"
            strokeWidth={1}
            strokeLinejoin="round"
          />
          {/* 꼬리 날개 */}
          <Path
            d="M-13 0 L-17 -5 L-13 -5 L-8 -1"
            fill="#E4F2F9"
            stroke="#C8DFF2"
            strokeWidth={0.8}
            strokeLinejoin="round"
          />
          {/* 창문 */}
          <Circle cx={2} cy={0} r={1} fill="#A7CFEA" />
          <Circle cx={6} cy={0} r={1} fill="#A7CFEA" />
        </G>

        {/* 멀리 떠 있는 작은 열기구 */}
        <G transform="translate(48 145) scale(1)" opacity={1}>
          {/* 풍선 */}
          <Path
            d="M0 -20
               C-12 -20 -17 -9 -14 1
               C-12 9 -5 14 0 15
               C5 14 12 9 14 1
               C17 -9 12 -20 0 -20 Z"
            fill="#F7D9E6"
            stroke="#E8C5DA"
            strokeWidth={1}
          />
          {/* 풍선의 밝은 면 */}
          <Path
            d="M-2 -17
               C-8 -15 -10 -8 -8 -2
               Q-7 4 -3 8"
            fill="none"
            stroke="#FFF8FC"
            strokeWidth={2}
            strokeLinecap="round"
          />
          {/* 바구니 연결선 */}
          <Path
            d="M-5 12 L-3 18 M5 12 L3 18"
            stroke="#D8B7C9"
            strokeWidth={1}
          />
          {/* 바구니 */}
          <Path
            d="M-4 18 L4 18 L3 24 L-3 24 Z"
            fill="#F4D8B4"
            stroke="#D7B995"
            strokeWidth={1}
            strokeLinejoin="round"
          />
        </G>

        {/* 오른쪽 멀리 있는 작은 드론 */}
        <G transform="translate(276 102) scale(2)" opacity={1}>
          {/* 프로펠러 암 */}
          <Path
            d="M-5 -3 L-13 -9 M5 -3 L13 -9
               M-5 3 L-13 9 M5 3 L13 9"
            stroke="#C5D9E9"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
          {/* 프로펠러 */}
          <G fill="#FFFDF8">
            <Ellipse cx={-15} cy={-10} rx={6} ry={2} />
            <Ellipse cx={15} cy={-10} rx={6} ry={2} />
            <Ellipse cx={-15} cy={10} rx={6} ry={2} />
            <Ellipse cx={15} cy={10} rx={6} ry={2} />
          </G>
          {/* 본체 */}
          <Rect
            x={-7}
            y={-5}
            width={14}
            height={10}
            rx={4}
            fill="#E6E0F6"
            stroke="#C9C4E5"
            strokeWidth={1}
          />
          {/* 카메라 */}
          <Circle cx={0} cy={2} r={2} fill="#A6CBE7" />
        </G>

        {/* 아주 작은 보조 헬리콥터 */}
        <G transform="translate(226 59) scale(1)" opacity={1}>
          {/* 메인 로터 */}
          <Path
            d="M-17 -12 H18"
            stroke="#FFF8EF"
            strokeWidth={2}
            strokeLinecap="round"
          />
          <Circle cx={0} cy={-12} r={2} fill="#FFF8EF" />

          {/* 로터 축 */}
          <Path
            d="M0 -10 V-4"
            stroke="#FFF8EF"
            strokeWidth={2}
            strokeLinecap="round"
          />

          {/* 헬리콥터 동체 */}
          <Path
            d="
              M-12 -3
              Q-10 -10 0 -9
              Q11 -9 14 -2
              L11 4
              Q2 8 -8 4
              Z
            "
            fill="#FFF8EF"
            stroke="#D2E8F9"
            strokeWidth={1.5}
            strokeLinejoin="round"
          />

          {/* 조종석 유리 */}
          <Path d="M3 -7 Q10 -6 12 -2 L4 0 Z" fill="#DCEFFA" />

          {/* 꼬리 */}
          <Path
            d="M-11 -2 L-22 -7 L-24 -4 L-12 2 Z"
            fill="#FFF8EF"
            stroke="#D2E8F9"
            strokeWidth={1.2}
          />

          {/* 꼬리 로터 */}
          <Path
            d="M-24 -9 V1 M-28 -4 H-20"
            stroke="#FFF8EF"
            strokeWidth={1.8}
            strokeLinecap="round"
          />

          {/* 착륙용 스키드 */}
          <Path
            d="M-8 5 L-10 9 M7 5 L9 9 M-13 9 H12"
            fill="none"
            stroke="#FFF8EF"
            strokeWidth={1.7}
            strokeLinecap="round"
          />
        </G>
        <G transform="scale(1.12 1.12) translate(-15 -18)">
          {/* 구름 바다 아래쪽 노을빛 음영 */}
          <Path
            d="
            M7 201
            Q24 183 42 194
            Q59 173 80 190
            Q101 173 122 191
            Q143 174 165 193
            Q186 175 208 192
            Q232 172 252 190
            Q281 174 313 192
            L313 233 L7 233 Z
          "
            fill="#FFE8C5"
            opacity={0.3}
          />

          {/* 하단 첫 번째 구름 레이어 */}
          <Path
            d="
            M7 194
            Q20 181 35 190
            Q47 169 65 184
            Q81 164 101 184
            Q118 171 136 188
            Q156 167 177 186
            Q195 169 214 187
            Q233 164 253 184
            Q278 166 296 185
            Q305 188 313 183
            L313 233 L7 233 Z
          "
            fill="#FFFDF7"
            opacity={0.86}
          />

          {/* 하단 두 번째 구름 레이어 */}
          <Path
            d="
            M7 211
            Q28 194 49 207
            Q70 190 92 207
            Q114 194 136 211
            Q160 192 181 209
            Q204 191 226 208
            Q251 189 273 207
            Q294 195 313 205
            L313 233 L7 233 Z
          "
            fill="#FFFFFF"
            opacity={0.72}
          />

          {/* 앞쪽 구름의 연한 핑크빛 음영 */}
          <Path
            d="
            M7 222
            Q40 209 69 220
            Q99 231 128 218
            Q159 208 189 221
            Q222 232 253 219
            Q284 211 313 218
            L313 233 L7 233 Z
          "
            fill="#FDE4EC"
            opacity={0.45}
          />
        </G>

        {/* 마지막 우유빛 라이팅 */}
        <Rect
          x={0}
          y={0}
          width={406}
          height={326}
          rx={12}
          fill="#FFFDF6"
          opacity={0.3}
        />
      </G>
    </>
  );
}

export function WaterScene() {
  const waterWaves = [
    { x: 24, y: 145, w: 30 },
    { x: 88, y: 159, w: 25 },
    { x: 169, y: 143, w: 32 },
    { x: 250, y: 155, w: 28 },
    { x: 57, y: 185, w: 34 },
    { x: 135, y: 198, w: 26 },
    { x: 224, y: 187, w: 32 },
    { x: 278, y: 211, w: 20 },
  ];

  return (
    <>
      <Defs>
        {/* 위쪽은 맑은 하늘, 아래쪽은 따뜻한 수평선 */}
        <LinearGradient id="waterSky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#DFF2FE" />
          <Stop offset="0.58" stopColor="#EDF6FF" />
          <Stop offset="1" stopColor="#F5F9FF" />
        </LinearGradient>

        {/* 바다의 민트빛 그라데이션 */}
        <LinearGradient id="waterOcean" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#BCE5E7" />
          <Stop offset="0.55" stopColor="#B5E1E2" />
          <Stop offset="1" stopColor="#CDE9EA" />
        </LinearGradient>

        {/* 등대의 은은한 빛 */}
        <LinearGradient id="waterBeacon" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#FFE885" stopOpacity={0} />
          <Stop offset="0.5" stopColor="#FFF5CC" stopOpacity={0.8} />
          <Stop offset="1" stopColor="#FFE885" stopOpacity={0} />
        </LinearGradient>
      </Defs>

      {/* 둥근 배경 바탕 */}
      <Rect x={7} y={7} width={306} height={226} rx={14} fill="#E4F2F9" />

      <G>
        {/* 수채화 하늘 */}
        <Rect
          x={0}
          y={0}
          width={406}
          height={326}
          rx={14}
          fill="url(#waterSky)"
        />

        {/* 따뜻한 햇살과 빛무리 */}
        <Circle cx={60} cy={30} r={26} fill="#FFF5CC" opacity={0.4} />
        <Circle cx={60} cy={30} r={18} fill="#FFE885" opacity={0.9} />
        <Circle cx={55} cy={25} r={5} fill="#FFF6CB" opacity={0.7} />

        {/* 왼쪽 위 구름의 부드러운 그림자 */}
        <G fill="#D9E7F6" opacity={0.42}>
          <Ellipse cx={19} cy={47} rx={17} ry={7} />
          <Ellipse cx={37} cy={40} rx={17} ry={10} />
          <Ellipse cx={54} cy={47} rx={17} ry={7} />
        </G>

        {/* 왼쪽 위 솜사탕 구름 */}
        <G fill="#FFFDFA" opacity={0.92}>
          <Circle cx={12} cy={39} r={10} />
          <Circle cx={26} cy={32} r={13} />
          <Circle cx={42} cy={36} r={15} />
          <Circle cx={57} cy={43} r={10} />
          <Ellipse cx={34} cy={44} rx={29} ry={8} />
        </G>

        {/* 오른쪽 하늘의 구름 */}
        <G fill="#D9E7F6" opacity={0.35}>
          <Ellipse cx={242} cy={42} rx={17} ry={8} />
          <Ellipse cx={260} cy={35} rx={18} ry={10} />
          <Ellipse cx={282} cy={43} rx={20} ry={8} />
        </G>

        <G fill="#FFFDFA" opacity={0.9}>
          <Circle cx={238} cy={34} r={11} />
          <Circle cx={253} cy={27} r={15} />
          <Circle cx={271} cy={31} r={14} />
          <Circle cx={288} cy={37} r={12} />
          <Circle cx={304} cy={42} r={9} />
          <Ellipse cx={271} cy={42} rx={35} ry={9} />
        </G>

        {/* 멀리 날아가는 작은 갈매기 */}
        <G
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={1.4}
          strokeLinecap="round"
          opacity={0.82}
        >
          <Path d="M128 52 Q133 46 138 52 Q143 46 148 52" />
          <Path d="M166 43 Q170 39 174 43 Q178 39 182 43" />
          <Path d="M194 59 Q198 55 202 59 Q206 55 210 59" />
        </G>

        {/* 수평선 아래의 넓은 바다 */}
        <Rect x={1} y={90} width={406} height={248} fill="url(#waterOcean)" />

        {/* 수평선의 옅은 빛 */}
        <Path
          d="M8 87 Q82 83 155 87 T312 85"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={2}
          opacity={0.6}
        />

        {/* 왼쪽 항구 섬의 먼 언덕 */}
        <Path
          d="
            M7 91
            Q20 84 34 85
            Q49 68 65 76
            Q79 68 94 82
            Q109 80 122 92
            L122 111
            L7 111 Z
          "
          fill="#B9E2B0"
          opacity={0.85}
        />

        {/* 왼쪽 섬의 앞쪽 언덕 */}
        <Path
          d="
            M7 100
            Q34 91 58 98
            Q80 87 103 99
            Q115 100 126 106
            L126 116
            L7 116 Z
          "
          fill="#A8D8B9"
          opacity={0.85}
        />

        {/* 왼쪽 항구 집 1 - 코랄 지붕 */}
        <G opacity={0.88}>
          <Path d="M19 91 L31 81 L43 91 Z" fill="#FDE4EC" />
          <Rect x={22} y={91} width={18} height={14} rx={1.5} fill="#FFF8EF" />
          <Rect x={29} y={96} width={5} height={9} rx={1} fill="#C7DDEA" />
          <Rect x={24} y={94} width={4} height={4} rx={1} fill="#DCEFFA" />
        </G>

        {/* 왼쪽 항구 집 2 - 라벤더 지붕 */}
        <G opacity={0.88}>
          <Path d="M47 94 L58 85 L69 94 Z" fill="#EEEAF9" />
          <Rect x={50} y={94} width={16} height={12} rx={1.5} fill="#FFF8EF" />
          <Rect x={56} y={98} width={4} height={8} rx={1} fill="#C7DDEA" />
        </G>

        {/* 멀리 있는 작은 집 */}
        <G opacity={0.75}>
          <Path d="M75 94 L84 87 L93 94 Z" fill="#F6D8C8" />
          <Rect x={78} y={94} width={12} height={10} rx={1} fill="#FFF8EF" />
          <Rect x={82} y={97} width={4} height={4} rx={1} fill="#DCEFFA" />
        </G>

        {/* 오른쪽 돌섬 */}
        <Path
          d="
            M199 101
            Q207 88 220 86
            Q231 75 244 83
            Q257 76 270 86
            Q286 81 299 92
            L313 94
            L313 117
            L199 117 Z
          "
          fill="#A8D8B9"
          opacity={0.88}
        />

        {/* 돌섬의 부드러운 앞쪽 음영 */}
        <Path
          d="
            M205 106
            Q230 95 250 102
            Q276 91 313 101
            L313 120
            L205 120 Z
          "
          fill="#91CBAA"
          opacity={0.42}
        />

        {/* 등대 주변의 은은한 빛 */}
        <Path
          d="M233 64 L208 83 L253 83 Z"
          fill="url(#waterBeacon)"
          opacity={0.7}
        />

        {/* 동화 속 작은 등대 */}
        <G transform="translate(231 63) scale(0.8)" opacity={0.88}>
          {/* 지붕 꼭대기 */}
          <Path d="M-2 -3 L0 -9 L2 -3 Z" fill="#FDE4EC" />

          {/* 지붕 */}
          <Path
            d="M-11 4 L-8 -3 L8 -3 L11 4 Z"
            fill="#F7C9D8"
            stroke="#E8B7CA"
            strokeWidth={0.8}
            strokeLinejoin="round"
          />

          {/* 등대 불빛 방 */}
          <Rect
            x={-7}
            y={4}
            width={14}
            height={9}
            rx={1}
            fill="#FFE885"
            stroke="#E7D4A0"
            strokeWidth={0.8}
          />

          {/* 유리창 */}
          <Rect x={-4} y={6} width={8} height={5} rx={1} fill="#DCEFFA" />

          {/* 난간 */}
          <Path
            d="M-9 4 H9 M-8 2 V5 M8 2 V5"
            stroke="#FFF8EF"
            strokeWidth={1.2}
            fill="none"
          />

          {/* 등대 몸통 */}
          <Path
            d="M-6 13 L-10 43 Q0 47 10 43 L6 13 Z"
            fill="#FFF9EF"
            stroke="#E8DCD2"
            strokeWidth={1}
            strokeLinejoin="round"
          />

          {/* 코랄색 띠 */}
          <Path d="M-7.5 22 L-8.5 29 Q0 32 8.5 29 L7.5 22 Z" fill="#FDE4EC" />

          <Path d="M-9 36 L-9.5 42 Q0 45 9.5 42 L9 36 Z" fill="#FDE4EC" />

          {/* 문 */}
          <Path d="M-3 43 V36 Q0 32 3 36 V43 Z" fill="#D5E8EF" />

          {/* 바닥 */}
          <Path
            d="M-13 45 Q0 42 13 45"
            fill="none"
            stroke="#E9DCCF"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </G>

        {/* 수평선 근처의 작은 보조 돛단배 */}
        <G transform="translate(204 113) scale(1)" opacity={0.58}>
          {/* 돛대 */}
          <Path
            d="M0 -18 V2"
            stroke="#C5B49D"
            strokeWidth={1.5}
            strokeLinecap="round"
          />

          {/* 작은 돛 */}
          <Path
            d="M-1 -16 L-1 -2 L-12 -2 Z"
            fill="#FFF8EF"
            stroke="#E5D9C9"
            strokeWidth={0.8}
            strokeLinejoin="round"
          />
          <Path
            d="M2 -12 L2 -2 L10 -2 Z"
            fill="#FDE4EC"
            stroke="#E8C8D4"
            strokeWidth={0.8}
            strokeLinejoin="round"
          />

          {/* 배 몸체 */}
          <Path
            d="M-15 3 Q0 7 15 3 L9 11 L-9 11 Z"
            fill="#EADCC8"
            stroke="#D6C7B4"
            strokeWidth={1}
            strokeLinejoin="round"
          />

          {/* 배 위쪽 밝은 테두리 */}
          <Path
            d="M-13 3 Q0 6 13 3"
            fill="none"
            stroke="#FFF8EF"
            strokeWidth={1.2}
            strokeLinecap="round"
          />
        </G>
        <G transform="translate(54 183) scale(2)" opacity={0.58}>
          {/* 돛대 */}
          <Path
            d="M0 -18 V2"
            stroke="#C5B49D"
            strokeWidth={1.5}
            strokeLinecap="round"
          />

          {/* 작은 돛 */}
          <Path
            d="M-1 -16 L-1 -2 L-12 -2 Z"
            fill="#FFF8EF"
            stroke="#E5D9C9"
            strokeWidth={0.8}
            strokeLinejoin="round"
          />
          <Path
            d="M2 -12 L2 -2 L10 -2 Z"
            fill="#FDE4EC"
            stroke="#E8C8D4"
            strokeWidth={0.8}
            strokeLinejoin="round"
          />

          {/* 배 몸체 */}
          <Path
            d="M-15 3 Q0 7 15 3 L9 11 L-9 11 Z"
            fill="#EADCC8"
            stroke="#D6C7B4"
            strokeWidth={1}
            strokeLinejoin="round"
          />

          {/* 배 위쪽 밝은 테두리 */}
          <Path
            d="M-13 3 Q0 6 13 3"
            fill="none"
            stroke="#FFF8EF"
            strokeWidth={1.2}
            strokeLinecap="round"
          />
        </G>

        {/* 보조 배 뒤의 잔물결 */}
        <Path
          d="M187 121 Q197 118 207 121 M212 123 Q222 120 232 123"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={1}
          strokeLinecap="round"
          opacity={0.7}
        />

        {/* 바다 위의 작은 수평 물결 */}
        <G
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={1.8}
          strokeLinecap="round"
          opacity={0.65}
        >
          {waterWaves.map((wave, index) => (
            <Path
              key={`water-wave-${index}`}
              d={`M${wave.x} ${wave.y} q${wave.w / 2} -3 ${wave.w} 0`}
            />
          ))}
        </G>

        {/* 멀리서 비치는 잔잔한 민트빛 수면 */}
        <Path
          d="M8 133 Q70 129 130 134 T250 132 T312 134"
          fill="none"
          stroke="#E9FFFF"
          strokeWidth={1.2}
          opacity={0.55}
        />

        {/* 바다 아래쪽의 아주 은은한 수면 빛 */}
        <Path
          d="M8 218 Q75 211 140 217 T250 216 T312 217"
          fill="none"
          stroke="#EFFFFB"
          strokeWidth={2}
          opacity={0.35}
        />

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
      </G>
    </>
  );
}

export function ConstructionScene() {
  return (
    <>
      <Defs>
        {/* 맑은 수채화 하늘 */}
        <LinearGradient id="constructionSky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#DDEFF9" />
          <Stop offset="1" stopColor="#FFF8EF" />
        </LinearGradient>

        {/* 포근한 모래 바닥 */}
        <LinearGradient id="constructionSand" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#F4E8D1" />
          <Stop offset="1" stopColor="#EADCC8" />
        </LinearGradient>
      </Defs>

      {/* 둥근 크림색 바탕 */}
      <Rect x={0} y={0} width={406} height={326} rx={14} fill="#FFF8EF" />

      <G>
        {/* 하늘 */}
        <Rect
          x={0}
          y={0}
          width={406}
          height={326}
          rx={14}
          fill="url(#constructionSky)"
        />

        {/* 멀리 보이는 파스텔 도심 실루엣 */}
        <G fill="#D7E0E8" opacity={0.42}>
          <Rect x={13} y={36} width={20} height={27} rx={2} />
          <Rect x={36} y={27} width={25} height={36} rx={2} />
          <Rect x={65} y={40} width={18} height={23} rx={2} />
          <Rect x={88} y={33} width={27} height={30} rx={2} />
          <Rect x={119} y={43} width={17} height={20} rx={2} />
          <Rect x={244} y={38} width={20} height={25} rx={2} />
          <Rect x={267} y={29} width={25} height={34} rx={2} />
          <Rect x={295} y={42} width={14} height={21} rx={2} />
        </G>

        {/* 건물 창문 */}
        <G fill="#FFF8EF" opacity={0.65}>
          <Rect x={41} y={33} width={4} height={5} rx={1} />
          <Rect x={51} y={33} width={4} height={5} rx={1} />
          <Rect x={41} y={43} width={4} height={5} rx={1} />
          <Rect x={51} y={43} width={4} height={5} rx={1} />
          <Rect x={96} y={39} width={4} height={5} rx={1} />
          <Rect x={105} y={39} width={4} height={5} rx={1} />
          <Rect x={274} y={35} width={4} height={5} rx={1} />
          <Rect x={284} y={35} width={4} height={5} rx={1} />
        </G>

        {/* 상단의 부드러운 햇살 */}
        <Circle cx={264} cy={32} r={26} fill="#FFF5CC" opacity={0.3} />
        <Circle cx={264} cy={32} r={16} fill="#FFE885" opacity={0.75} />

        {/* 작은 구름 */}
        <G fill="#FFFDFA" opacity={0.85}>
          <Circle cx={145} cy={25} r={8} />
          <Circle cx={156} cy={20} r={11} />
          <Circle cx={169} cy={25} r={8} />
          <Ellipse cx={157} cy={29} rx={18} ry={6} />

          <Circle cx={208} cy={30} r={7} />
          <Circle cx={218} cy={25} r={10} />
          <Circle cx={230} cy={30} r={7} />
          <Ellipse cx={219} cy={33} rx={17} ry={5} />
        </G>

        {/* 넓은 모래 바닥 */}
        {/* <Path
          d="M7 69 Q63 61 120 68 T231 66 T313 69 L313 233 L7 233 Z"
          fill="url(#constructionSand)"
        /> */}
        <Path
          d="
    M-20 69
    Q65 58 120 68
    T231 66
    T340 69
 L313 280
L7 280
    Z
  "
          fill="url(#constructionSand)"
        />

        {/* 🏗️ 우측 상단: 은은한 미니 타워 크레인 */}
        <G transform="translate(260 36) scale(0.65)" opacity={0.8}>
          {/* 크레인 바닥 받침 */}
          <Path
            d="M8 69 H36 L32 74 H12 Z"
            fill="#D8D0C5"
            stroke="#B0A699"
            strokeWidth={1.2}
          />
          <Path
            d="M13 68 L19 63 H29 L34 68 Z"
            fill="#FFF3E0"
            stroke="#B0A699"
            strokeWidth={1}
          />

          {/* 수직 격자 타워 */}
          <Path
            d="M17 65 L20 13 L31 13 L34 65 Z"
            fill="#FFF3E0"
            stroke="#B0A699"
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
          <G
            fill="none"
            stroke="#B0A699"
            strokeWidth={1.3}
            strokeLinecap="round"
            opacity={0.85}
          >
            <Path d="M19 24 H32 M19 35 H32 M18 46 H33 M18 57 H33" />
            <Path d="M20 14 L31 24 L20 35 L32 46 L19 57 L32 65" />
            <Path d="M31 14 L20 24 L32 35 L19 46 L32 57 L20 65" />
          </G>

          {/* 꼭대기 회전부 */}
          <Rect
            x={14}
            y={8}
            width={19}
            height={8}
            rx={2}
            fill="#FFF3E0"
            stroke="#B0A699"
            strokeWidth={1.3}
          />
          <Circle cx={23.5} cy={11.5} r={2} fill="#D8D0C5" />

          {/* 오른쪽으로 뻗은 크레인 붐대 */}
          <Path
            d="M23 9 L75 9 L72 15 L23 15 Z"
            fill="#FFF3E0"
            stroke="#B0A699"
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
          {/* 붐대 격자 */}
          <G
            fill="none"
            stroke="#B0A699"
            strokeWidth={1.2}
            strokeLinecap="round"
          >
            <Path d="M35 9 L40 15 L47 9 L54 15 L61 9 L68 15" />
            <Path d="M35 15 L40 9 L47 15 L54 9 L61 15 L68 9" />
          </G>

          {/* 왼쪽 균형추 */}
          <Path
            d="M14 8 L3 8 L5 16 L15 16 Z"
            fill="#D8D0C5"
            stroke="#B0A699"
            strokeWidth={1.2}
            strokeLinejoin="round"
          />

          {/* 붐대 지지 케이블 */}
          <Path
            d="M23 8 L43 2 L70 9"
            fill="none"
            stroke="#B0A699"
            strokeWidth={1.2}
            strokeLinecap="round"
          />

          {/* 와이어와 작은 도르래 */}
          <Circle
            cx={68}
            cy={15}
            r={2.5}
            fill="#FFF3E0"
            stroke="#B0A699"
            strokeWidth={1}
          />
          <Path d="M68 17 V40" fill="none" stroke="#B0A699" strokeWidth={1.2} />

          {/* 귀여운 갈고리 */}
          <Path
            d="M68 40 V45 Q68 50 73 48 Q76 46 73 43"
            fill="none"
            stroke="#B0A699"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Circle cx={68} cy={40} r={2} fill="#D8D0C5" />
        </G>

        {/* 먼 모래 언덕 */}
        <Path
          d="
            M7 91
            Q36 76 66 86
            Q92 75 120 88
            Q145 84 166 92
            L166 110
            L7 110 Z
          "
          fill="#E5D3B7"
          opacity={0.55}
        />

        {/* 바닥에 겹쳐지는 부드러운 모래 결 */}
        <G
          fill="none"
          stroke="#DCC6A5"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={0.5}
        >
          <Path d="M17 119 Q47 110 77 119" />
          <Path d="M237 137 Q267 128 300 137" />
          <Path d="M96 218 Q126 210 155 218" />
          <Path d="M166 229 Q193 222 220 228" />
        </G>

        {/* 상단 중앙 우측의 포근한 모래산 */}
        <G opacity={0.85}>
          <Ellipse
            cx={214}
            cy={91}
            rx={36}
            ry={5}
            fill="#C9B18F"
            opacity={0.35}
          />
          <Path
            d="
              M177 91
              Q185 82 195 78
              Q204 63 215 65
              Q229 67 235 79
              Q246 82 251 91 Z
            "
            fill="#D9BF9C"
          />
          <Path
            d="M195 78 Q204 68 215 69 Q223 70 228 78"
            fill="none"
            stroke="#E9D3B2"
            strokeWidth={2}
            strokeLinecap="round"
            opacity={0.8}
          />
        </G>

        {/* 모래산 옆에 비스듬히 놓인 작은 삽 */}
        <G transform="translate(245 64) rotate(23)" opacity={0.85}>
          {/* 손잡이 */}
          <Path
            d="M0 0 V19"
            stroke="#FDE4EC"
            strokeWidth={4}
            strokeLinecap="round"
          />
          <Path
            d="M-3 0 Q0 -4 3 0"
            fill="none"
            stroke="#FDE4EC"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
          {/* 삽 목 */}
          <Path
            d="M0 18 V23"
            stroke="#C9B59C"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
          {/* 삽날 */}
          <Path
            d="M-1 22 Q-7 24 -6 30 Q0 34 6 30 Q7 24 1 22 Z"
            fill="#C9B59C"
            stroke="#B6A28A"
            strokeWidth={1}
            strokeLinejoin="round"
          />
          <Path
            d="M-3 26 Q0 24 3 26"
            fill="none"
            stroke="#E9DCCB"
            strokeWidth={1}
            strokeLinecap="round"
          />
        </G>

        {/* 🚜 좌측 상단: 파스텔 미니 지게차 */}
        <G transform="translate(170 150) scale(1)" opacity={1}>
          {/* 바닥 그림자 */}
          <Ellipse
            cx={38}
            cy={47}
            rx={34}
            ry={3.5}
            fill="#C9B59C"
            opacity={0.35}
          />

          {/* 뒤쪽 바퀴 */}
          <Circle
            cx={19}
            cy={38}
            r={8}
            fill="#DBC6AC"
            stroke="#B9A58D"
            strokeWidth={1.3}
          />
          <Circle cx={19} cy={38} r={3.2} fill="#FFF3E0" />

          {/* 앞쪽 바퀴 */}
          <Circle
            cx={48}
            cy={38}
            r={8}
            fill="#DBC6AC"
            stroke="#B9A58D"
            strokeWidth={1.3}
          />
          <Circle cx={48} cy={38} r={3.2} fill="#FFF3E0" />

          {/* 지게차 하부 차체 */}
          <Path
            d="M8 29 Q8 25 13 25 H49 Q54 25 56 30 L57 36 H10 Q7 34 8 29 Z"
            fill="#FDE4EC"
            stroke="#D9B5B9"
            strokeWidth={1.5}
            strokeLinejoin="round"
          />

          {/* 운전석과 둥근 지붕 */}
          <Path
            d="M23 25 L25 10 Q26 6 31 6 H41 Q45 6 46 11 L49 25 Z"
            fill="#FFF9EF"
            stroke="#D8C9B4"
            strokeWidth={1.5}
            strokeLinejoin="round"
          />

          {/* 운전석 창문 */}
          <Path
            d="M29 11 Q30 9 33 9 H39 Q42 9 42 12 L44 21 H28 Z"
            fill="#DCEFFA"
            stroke="#D8C9B4"
            strokeWidth={1}
          />
          <Path
            d="M35 10 V21"
            stroke="#FFFDF8"
            strokeWidth={1.5}
            strokeLinecap="round"
          />

          {/* 운전석 아래 작은 발판 */}
          <Path
            d="M22 26 H49"
            stroke="#D8C9B4"
            strokeWidth={2}
            strokeLinecap="round"
          />

          {/* 지게차 뒤쪽 둥근 엔진 덮개 */}
          <Path
            d="M8 19 Q8 15 12 15 H22 L23 29 H9 Q6 27 8 19 Z"
            fill="#FDE4EC"
            stroke="#D9B5B9"
            strokeWidth={1.4}
          />
          <Circle cx={12} cy={22} r={1.4} fill="#FFF9EF" />

          {/* 마스트: 상자 앞의 수직 프레임 */}
          <Path
            d="M55 5 V39 M60 5 V39"
            fill="none"
            stroke="#DBC6AC"
            strokeWidth={3}
            strokeLinecap="round"
          />
          <Path
            d="M55 8 H60 M55 16 H60 M55 24 H60"
            fill="none"
            stroke="#B9A58D"
            strokeWidth={1}
          />

          {/* 지게발 위에 쌓인 파스텔 상자 2개 */}
          <Rect
            x={61}
            y={19}
            width={11}
            height={10}
            rx={1.5}
            fill="#EADCC8"
            opacity={0.7}
            stroke="#C9B59C"
            strokeWidth={0.8}
          />
          <Path
            d="M66.5 19 V29 M61 23 H72"
            fill="none"
            stroke="#D8C4AA"
            strokeWidth={0.7}
            opacity={0.8}
          />

          <Rect
            x={63}
            y={9}
            width={10}
            height={10}
            rx={1.5}
            fill="#EADCC8"
            opacity={0.7}
            stroke="#C9B59C"
            strokeWidth={0.8}
          />
          <Path
            d="M68 9 V19 M63 13 H73"
            fill="none"
            stroke="#D8C4AA"
            strokeWidth={0.7}
            opacity={0.8}
          />

          {/* 앞으로 뻗은 지게발 */}
          <Path
            d="M56 34 L77 34 Q79 34 79 36 V38 H56 Z"
            fill="#DBC6AC"
            stroke="#B9A58D"
            strokeWidth={1}
            strokeLinejoin="round"
          />
          <Path
            d="M57 39 H77"
            stroke="#DBC6AC"
            strokeWidth={2.5}
            strokeLinecap="round"
          />

          {/* 차체의 작은 장식 라이트 */}
          <Rect x={8} y={29} width={4} height={3} rx={1} fill="#FFF3E0" />
          <Circle cx={52} cy={29} r={1.5} fill="#FFF3E0" />
        </G>

        {/* 왼쪽 아래 안전 바리케이드와 라바콘 */}
        <G opacity={0.82}>
          {/* 바리케이드 다리 */}
          <Path
            d="M27 195 L24 207 M61 195 L64 207"
            stroke="#C8B69E"
            strokeWidth={3}
            strokeLinecap="round"
          />

          {/* 바리케이드 본체 */}
          <Rect
            x={22}
            y={177}
            width={43}
            height={20}
            rx={3}
            fill="#FFF3E0"
            stroke="#D9C8B2"
            strokeWidth={1.2}
          />

          {/* 코랄색 안전 띠 */}
          <Path d="M25 194 L34 179 H41 L32 194 Z" fill="#F6D0D9" />
          <Path d="M41 194 L50 179 H57 L48 194 Z" fill="#F6D0D9" />
          <Path d="M56 194 L62 184 V194 Z" fill="#F6D0D9" />

          {/* 바리케이드 윗부분 */}
          <Path
            d="M24 177 H63"
            stroke="#FFFDF8"
            strokeWidth={2}
            strokeLinecap="round"
          />

          {/* 왼쪽 라바콘 */}
          <Path
            d="M17 207 L22 189 Q23 186 25 189 L31 207 Z"
            fill="#F6D0D9"
            stroke="#D9B5B9"
            strokeWidth={1}
            strokeLinejoin="round"
          />
          <Path d="M20 198 L28 198 L29 202 L19 202 Z" fill="#FFF8EF" />
          <Path
            d="M14 207 H33"
            stroke="#C8B69E"
            strokeWidth={2.5}
            strokeLinecap="round"
          />

          {/* 오른쪽 라바콘 */}
          <Path
            d="M57 207 L62 189 Q63 186 65 189 L71 207 Z"
            fill="#F6D0D9"
            stroke="#D9B5B9"
            strokeWidth={1}
            strokeLinejoin="round"
          />
          <Path d="M60 198 L68 198 L69 202 L59 202 Z" fill="#FFF8EF" />
          <Path
            d="M54 207 H73"
            stroke="#C8B69E"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        </G>

        {/* 오른쪽 아래 콘크리트 파이프 2개 */}
        <G opacity={0.84}>
          {/* 뒤쪽 파이프 */}
          <Ellipse cx={270} cy={191} rx={17} ry={9} fill="#C0B5A7" />
          <Rect x={253} y={191} width={34} height={17} fill="#D8D0C5" />
          <Ellipse cx={270} cy={208} rx={17} ry={9} fill="#C0B5A7" />
          <Ellipse
            cx={270}
            cy={191}
            rx={12}
            ry={5.5}
            fill="#EEE7DC"
            stroke="#C0B5A7"
            strokeWidth={1}
          />
          <Ellipse cx={270} cy={191} rx={6} ry={2.5} fill="#C9BFB2" />

          {/* 앞쪽 파이프 */}
          <Ellipse cx={291} cy={201} rx={14} ry={8} fill="#B8ADA0" />
          <Rect x={277} y={201} width={28} height={13} fill="#D8D0C5" />
          <Ellipse cx={291} cy={214} rx={14} ry={7} fill="#C0B5A7" />
          <Ellipse
            cx={291}
            cy={201}
            rx={10}
            ry={5}
            fill="#F0E9DE"
            stroke="#C0B5A7"
            strokeWidth={1}
          />
          <Ellipse cx={291} cy={201} rx={5} ry={2.3} fill="#C9BFB2" />
        </G>

        {/* 파이프 옆의 작은 흙수레 */}
        <G transform="translate(244 197)" opacity={0.8}>
          {/* 손잡이 */}
          <Path
            d="M-2 4 L-10 -1"
            stroke="#B7A38A"
            strokeWidth={2}
            strokeLinecap="round"
          />

          {/* 수레 몸체 */}
          <Path
            d="M-3 -4 L14 -4 L10 7 L1 7 Z"
            fill="#EADCC8"
            stroke="#C9B59C"
            strokeWidth={1.2}
            strokeLinejoin="round"
          />

          {/* 흙 */}
          <Path d="M-1 -4 Q5 -9 12 -4" fill="#D9BF9C" />

          {/* 바퀴 */}
          <Circle cx={7} cy={10} r={3.5} fill="#B7A99A" />
          <Circle cx={7} cy={10} r={1.3} fill="#F8EFE2" />
        </G>

        {/* 바닥의 작은 모래 알갱이 */}
        <G fill="#CDB99A" opacity={0.45}>
          <Circle cx={89} cy={205} r={1.3} />
          <Circle cx={103} cy={192} r={1} />
          <Circle cx={175} cy={215} r={1.2} />
          <Circle cx={230} cy={225} r={1} />
          <Circle cx={120} cy={226} r={1.1} />
        </G>
        {/* 먼 곳의 작은 덤프트럭 */}
        <G transform="translate(60 93) scale(2)" opacity={1}>
          {/* 적재함 */}
          <Path
            d="M-19 -9 L4 -9 L8 5 L-19 5 Z"
            fill="#FFF3E0"
            stroke="#D9C9AE"
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
          {/* 운전석 */}
          <Path
            d="M7 -5 H18 L25 4 H7 Z"
            fill="#FDE4EC"
            stroke="#D9C9AE"
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
          {/* 창문 */}
          <Path d="M12 -3 H17 L21 2 H12 Z" fill="#DCEFFA" />
          {/* 바퀴 */}
          <Circle cx={-10} cy={7} r={4} fill="#B8AFA4" />
          <Circle cx={17} cy={7} r={4} fill="#B8AFA4" />
          <Circle cx={-10} cy={7} r={1.5} fill="#FFF8EF" />
          <Circle cx={17} cy={7} r={1.5} fill="#FFF8EF" />
        </G>
        {/* 마지막 우유빛 라이팅 */}
        <Rect
          x={0}
          y={0}
          width={406}
          height={326}
          rx={14}
          fill="#FFFDF6"
          opacity={0.32}
        />
      </G>
    </>
  );
}

function RailMiniTrain() {
  return (
    <G>
      {/* 철로 위에 생기는 은은한 그림자 */}
      <Ellipse cx={213} cy={170} rx={75} ry={5} fill="#8DAEBB" opacity={0.2} />

      {/* 뒤쪽 열차 칸 */}

      {/* 앞쪽 기관차 차체 */}
      <Path
        d="
          M190 139
          Q193 134 201 132
          L249 123
          Q258 121 264 127
          L275 139
          Q280 145 277 153
          L273 159
          L198 174
          Q192 175 190 168
          Z
        "
        fill="#FFF8EF"
        stroke="#C5DDE8"
        strokeWidth={1.2}
        strokeLinejoin="round"
      />

      {/* 상단의 부드러운 지붕 */}
      <Path
        d="
          M197 137
          Q201 132 208 131
          L249 124
          Q256 123 262 129
          L267 135
          Z
        "
        fill="#FFFFFF"
      />

      {/* 앞쪽 운전석 유리 */}
      <Path
        d="
          M197 141
          Q199 137 204 136
          L216 134
          L213 146
          L197 149
          Z
        "
        fill="#C7E8F8"
      />

      {/* 객실 창문 */}
      <G fill="#C7E8F8">
        <Path d="M220 133 L230 131 L229 143 L218 145 Z" />
        <Path d="M234 130 L244 128 L244 140 L232 142 Z" />
        <Path d="M248 127 L257 130 L260 137 L247 139 Z" />
      </G>

      {/* 차체 측면의 파스텔 블루 띠 */}
      <Path d="M194 154 L275 139 L273 148 L196 164 Z" fill="#C2E4F2" />

      {/* 앞부분의 부드러운 둥근 코 */}
      <Path
        d="
          M263 130
          Q270 133 275 140
          Q280 146 276 153
          Q273 158 266 159
          L258 160
          Q267 151 267 143
          Z
        "
        fill="#F4FBFF"
      />

      {/* 앞쪽 헤드라이트 */}
      <Circle cx={272} cy={149} r={1.7} fill="#FFF0BC" />

      {/* 바퀴 */}
      <G fill="#B7CAD2">
        <Circle cx={204} cy={169} r={3.5} />
        <Circle cx={247} cy={160} r={3.5} />
        <Circle cx={267} cy={156} r={3.5} />
      </G>

      {/* 바퀴 안쪽 */}
      <G fill="#E9F2F5">
        <Circle cx={204} cy={169} r={1.5} />
        <Circle cx={247} cy={160} r={1.5} />
        <Circle cx={267} cy={156} r={1.5} />
      </G>
    </G>
  );
}

export function RailScene() {
  const sleepers = Array.from({ length: 17 }, (_, i) => {
    const t = i / 16;
    const x = 4 + t * 312;
    const y = 207 - t * 55;

    return (
      <Path
        key={`sleeper-${i}`}
        d={`M${x - 5} ${y - 17} L${x + 7} ${y + 11}`}
        stroke="#9C8B7A"
        strokeWidth={3.5}
        strokeLinecap="round"
      />
    );
  });

  const meadowFlowers = [
    [23, 157, 2.2],
    [48, 166, 2.5],
    [77, 151, 2],
    [102, 169, 2.4],
    [126, 155, 2],
    [154, 166, 2.3],
    [181, 151, 2],
    [209, 159, 2.5],
    [237, 145, 2],
    [267, 153, 2.3],
    [293, 140, 2],
    [64, 188, 2.1],
    [113, 183, 2.4],
    [169, 187, 2],
    [218, 177, 2.2],
  ];

  type ForegroundFlower = [number, number, string];
  const foregroundFlowers: ForegroundFlower[] = [
    [205, 224, "#F8DCE7"],
    [222, 213, "#FFF0C7"],
    [240, 229, "#FFFFFF"],
    [256, 208, "#F8DCE7"],
    [275, 222, "#FFF0C7"],
    [292, 207, "#FFFFFF"],
    [306, 229, "#F8DCE7"],
    [235, 194, "#FFFFFF"],
    [267, 190, "#FFE7B3"],
    [288, 238, "#FFFFFF"],
    [184, 236, "#FFF0C7"],
    [216, 239, "#F8DCE7"],
    [248, 240, "#FFF0C7"],
    [306, 190, "#FFE4EC"],
  ];

  return (
    <>
      <Defs>
        <LinearGradient id="railSky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#DFF2FE" />
          <Stop offset="1" stopColor="#F5F9FF" />
        </LinearGradient>

        <LinearGradient id="railMeadow" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#C9F0AC" />
          <Stop offset="1" stopColor="#A5E093" />
        </LinearGradient>

        <LinearGradient id="railBallast" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#EDE1D0" />
          <Stop offset="1" stopColor="#D8C8B5" />
        </LinearGradient>

        {/* <clipPath id="railSceneClip">
          <Rect x={7} y={7} width={306} height={226} rx={12} />
        </clipPath> */}
      </Defs>

      {/* 둥근 모서리 배경 */}
      <Rect x={0} y={0} width={406} height={326} rx={12} fill="#E4F2F9" />

      {/* <G clipPath="url(#railSceneClip)"> */}
      <G>
        <G opacity={0.85}>
          {/* 하늘 */}
          <Rect x={7} y={7} width={306} height={130} fill="url(#railSky)" />

          {/* 햇살 */}
          <Circle cx={263} cy={36} r={13} fill="#FFE9A6" />
          <Circle cx={263} cy={36} r={19} fill="#FFF5D0" opacity={0.25} />

          {/* 왼쪽 뭉게구름 */}
          <G fill="#FFFFFF" opacity={0.88}>
            <Circle cx={18} cy={76} r={15} />
            <Circle cx={34} cy={66} r={18} />
            <Circle cx={52} cy={76} r={15} />
            <Circle cx={69} cy={83} r={12} />

            <Circle cx={82} cy={88} r={10} />
            <Circle cx={98} cy={81} r={13} />
            <Circle cx={111} cy={89} r={10} />

            <Circle cx={8} cy={92} r={13} />
            <Circle cx={30} cy={91} r={12} />
          </G>

          {/* 오른쪽 구름 */}
          <G fill="#FFFFFF" opacity={0.88}>
            <Circle cx={253} cy={79} r={13} />
            <Circle cx={269} cy={67} r={18} />
            <Circle cx={287} cy={76} r={16} />
            <Circle cx={304} cy={66} r={19} />
            <Circle cx={311} cy={87} r={14} />
          </G>

          <G transform="scale(1.12 1.12) translate(-15 -15)">
            {/* 먼 산 */}
            <Path
              d="M7 108
               Q25 102 40 94
               Q57 82 72 91
               Q91 104 111 108
               Q134 99 154 91
               Q172 83 191 97
               Q211 108 228 98
               Q250 87 271 78
               Q290 69 313 81
               L313 151 L7 151 Z"
              fill="#A8D3A0"
              opacity={0.75}
            />

            {/* 중간 산맥 */}
            <Path
              d="M7 122
               Q31 110 49 117
               Q69 105 87 116
               Q109 128 128 119
               Q150 109 171 118
               Q191 127 211 115
               Q233 102 252 112
               Q278 120 295 106
               Q304 102 313 105
               L313 158 L7 158 Z"
              fill="#82C37C"
            />

            {/* 먼 들판 */}
            <Path
              d="M7 132
               Q55 124 95 133
               T175 128
               T250 130
               T313 121
               L313 233 L7 233 Z"
              fill="url(#railMeadow)"
            />

            {/* 방음벽 */}
            <Path
              d="M7 130 L313 119"
              stroke="#B8C4B5"
              strokeWidth={1.5}
              opacity={0.8}
            />
            <Path
              d="M7 135 L313 124"
              stroke="#F4F7F0"
              strokeWidth={2}
              opacity={0.8}
            />

            {Array.from({ length: 16 }, (_, i) => {
              const x = 10 + i * 19;
              const y = 130 - i * 0.68;

              return (
                <G key={`fence-${i}`} opacity={0.65}>
                  <Path
                    d={`M${x} ${y} l0 10`}
                    stroke="#B8C4B5"
                    strokeWidth={1}
                  />
                  <Path
                    d={`M${x + 2} ${y + 1} l13 -0.5`}
                    stroke="#D5E1D5"
                    strokeWidth={1.5}
                  />
                </G>
              );
            })}

            {/* 멀리 있는 침엽수 */}
            {Array.from({ length: 11 }, (_, i) => {
              const x = 17 + i * 28;
              const y = 126 - i * 0.7;
              const size = 4 + (i % 3);

              return (
                <G key={`far-tree-${i}`} opacity={0.7}>
                  <Path
                    d={`M${x} ${y - size * 2}
                      L${x - size} ${y + size * 0.2}
                      L${x - size * 0.4} ${y + size * 0.2}
                      L${x - size * 1.1} ${y + size}
                      L${x + size * 1.1} ${y + size}
                      L${x + size * 0.4} ${y + size * 0.2}
                      L${x + size} ${y + size * 0.2} Z`}
                    fill="#6DB667"
                  />
                  <Path
                    d={`M${x} ${y + size} v3`}
                    stroke="#A58A67"
                    strokeWidth={1}
                  />
                </G>
              );
            })}

            {/* 들꽃 언덕 */}
            <Path
              d="M7 149
               Q48 137 86 148
               Q126 159 164 145
               Q203 133 239 140
               Q276 143 313 127
               L313 194
               Q264 186 226 194
               Q183 202 142 188
               Q92 174 7 196 Z"
              fill="#B3EA9F"
            />

            {/* 들판의 작은 흰색·노란색 꽃 */}
            {meadowFlowers.map(([x, y, r], i) => (
              <G key={`meadow-flower-${i}`} opacity={0.85}>
                <Path
                  d={`M${x} ${y + r} v3`}
                  stroke="#8EBE75"
                  strokeWidth={0.8}
                />
                <Circle
                  cx={x}
                  cy={y}
                  r={r}
                  fill={i % 3 === 0 ? "#FFF3E0" : "#FFFDF0"}
                />
                <Circle cx={x} cy={y} r={0.8} fill="#F8D77B" />
              </G>
            ))}

            {/* 철로 아래 자갈밭 */}
            <Path
              d="M7 208 L313 151
               L313 190 L7 233 Z"
              fill="url(#railBallast)"
              stroke="#C2B29F"
              strokeWidth={1}
            />

            {/* 자갈 */}
            {Array.from({ length: 54 }, (_, i) => {
              const t = i / 53;
              const x = 10 + t * 300;
              const y = 218 - t * 49 + ((i % 3) - 1) * 5;

              return (
                <Ellipse
                  key={`stone-${i}`}
                  cx={x}
                  cy={y}
                  rx={1.8 + (i % 3) * 0.45}
                  ry={1.1}
                  fill={i % 2 === 0 ? "#CBBBA8" : "#F5E9D9"}
                  opacity={0.8}
                />
              );
            })}
            <G transform="rotate(1 160 180) translate(0,20)">
              {/* 나무 침목 */}

              {sleepers}

              {/* 레일 바깥쪽 어두운 윤곽 */}
              <Path
                d="M-2 222 L321 160"
                stroke="#8D8174"
                strokeWidth={4}
                strokeLinecap="round"
              />
              <Path
                d="M-2 194 L321 132"
                stroke="#8D8174"
                strokeWidth={4}
                strokeLinecap="round"
              />

              {/* 두 줄의 레일 */}
              <Path
                d="M-2 222 L321 160"
                stroke="#6E6255"
                strokeWidth={2.1}
                strokeLinecap="round"
              />
              <Path
                d="M-2 194 L321 132"
                stroke="#6E6255"
                strokeWidth={2.1}
                strokeLinecap="round"
              />

              {/* 레일 하이라이트 */}
              <Path d="M-2 220 L321 158" stroke="#D9D0C5" strokeWidth={0.8} />
              <Path d="M-2 192 L321 130" stroke="#D9D0C5" strokeWidth={0.8} />
            </G>

            {/* 아래쪽 꽃밭 */}
            <Path
              d="M7 222
               Q47 209 88 220
               Q131 231 168 216
               Q208 204 242 216
               Q281 225 313 205
               L313 233 L7 233 Z"
              fill="#A5E093"
            />

            {/* 꽃밭의 잎 */}
            {Array.from({ length: 18 }, (_, i) => {
              const x = 190 + (i % 9) * 14;
              const y = 222 + Math.floor(i / 9) * 10;

              return (
                <G key={`leaf-${i}`} opacity={0.7}>
                  <Ellipse
                    cx={x}
                    cy={y}
                    rx={3.2}
                    ry={6}
                    fill="#7FC77A"
                    transform={`rotate(-35 ${x} ${y})`}
                  />
                  <Ellipse
                    cx={x + 4}
                    cy={y + 1}
                    rx={2.7}
                    ry={5}
                    fill="#B6E8A0"
                    transform={`rotate(35 ${x + 4} ${y + 1})`}
                  />
                </G>
              );
            })}

            {/* 전경의 파스텔 꽃송이 */}
            {foregroundFlowers.map(([x, y, color], i) => (
              <G key={`foreground-flower-${i}`} opacity={0.9}>
                <Path
                  d={`M${x} ${y + 2} v7`}
                  stroke="#83B975"
                  strokeWidth={1}
                />
                <G fill={String(color)}>
                  <Circle cx={Number(x) - 3} cy={Number(y)} r={3.1} />
                  <Circle cx={Number(x) + 3} cy={Number(y)} r={3.1} />
                  <Circle cx={Number(x)} cy={Number(y) - 3} r={3.1} />
                  <Circle cx={Number(x)} cy={Number(y) + 3} r={3.1} />
                </G>
                <Circle cx={Number(x)} cy={Number(y)} r={1.5} fill="#FFE28C" />
              </G>
            ))}
          </G>
        </G>

        {/* 전체를 부드럽게 감싸는 우유빛 햇살 */}
        <Rect
          x={0}
          y={0}
          width={406}
          height={326}
          fill="#FFFDF6"
          opacity={0.3}
        />
        <G transform="translate(-200 60)">
          {/* 보조 열차 */}
          <RailMiniTrain />
        </G>
      </G>
    </>
  );
}

export default function VehicleCategoryBackground({
  category,
  width = "100%",
  height = "100%",
}: Props) {
  const palette = COLORS[category];
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

      {category === "vehicle" && <VehicleScene />}
      {category === "road_vehicle" && <RoadScene />}
      {category === "rail_vehicle" && <RailScene />}
      {category === "air_vehicle" && <AirScene />}
      {category === "water_vehicle" && <WaterScene />}
      {category === "construction_vehicle" && <ConstructionScene />}
    </Svg>
  );
}

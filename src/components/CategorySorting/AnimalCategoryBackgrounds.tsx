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

export type AnimalBackgroundKind =
  | "animal"
  | "pet"
  | "farm_animal"
  | "wild_animal"
  | "sea_animal"
  | "bird"
  | "insect";

type Props = {
  width?: string | number;
  height?: string | number;
};

const Sky = () => (
  <>
    <Defs>
      <LinearGradient id="animalLandSky" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0" stopColor="#C9F0FB" />
        <Stop offset="1" stopColor="#F2FBFD" />
      </LinearGradient>
    </Defs>
    <Rect width="240" height="180" fill="url(#animalLandSky)" />
  </>
);

const Cloud = ({
  x,
  y,
  scale = 1,
}: {
  x: number;
  y: number;
  scale?: number;
}) => (
  <G transform={`translate(${x} ${y}) scale(${scale})`} opacity={0.86}>
    <Circle cx="0" cy="8" r="10" fill="#FFFFFF" />
    <Circle cx="12" cy="1" r="14" fill="#FFFFFF" />
    <Circle cx="27" cy="8" r="10" fill="#FFFFFF" />
    <Rect x="-2" y="7" width="32" height="11" rx="5" fill="#FFFFFF" />
  </G>
);

const Grass = ({
  x,
  y,
  color = "#79BE69",
}: {
  x: number;
  y: number;
  color?: string;
}) => (
  <G>
    <Path d={`M${x} ${y} q-8 -12 -2 -18 q8 7 2 18`} fill={color} />
    <Path d={`M${x} ${y} q2 -16 12 -19 q2 12 -12 19`} fill={color} />
    <Path d={`M${x} ${y} q9 -8 16 -5 q-4 9 -16 5`} fill={color} />
  </G>
);

const Fence = ({
  x = 0,
  y = 105,
  width = 84,
}: {
  x?: number;
  y?: number;
  width?: number;
}) => {
  const posts = Math.max(2, Math.floor(width / 18));
  return (
    <G transform={`translate(${x} ${y})`}>
      <Rect x="0" y="8" width={width} height="5" rx="2" fill="#FFF8E9" />
      <Rect x="0" y="22" width={width} height="5" rx="2" fill="#FFF8E9" />
      {Array.from({ length: posts + 1 }, (_, i) => (
        <G key={i} transform={`translate(${i * (width / posts)} 0)`}>
          <Rect x="-3" y="0" width="6" height="31" rx="2" fill="#FFF8E9" />
          <Path d="M-3 2 L0 -3 L3 2 Z" fill="#FFF8E9" />
        </G>
      ))}
    </G>
  );
};

export function AnimalBackground({ width = "100%", height = 220 }: Props) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 360 220"
      preserveAspectRatio="xMidYMid meet"
    >
      <Defs>
        <LinearGradient id="animalSky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#B9E0E9" />
          <Stop offset="1" stopColor="#E4F0E8" />
        </LinearGradient>

        <LinearGradient id="animalWater" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#A9DDE0" />
          <Stop offset="1" stopColor="#83C4CB" />
        </LinearGradient>

        <LinearGradient id="animalGround" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#8DB48A" />
          <Stop offset="1" stopColor="#709B79" />
        </LinearGradient>
      </Defs>

      {/* 하늘 */}
      <Rect width="360" height="220" fill="url(#animalSky)" />

      {/* 부드러운 구름 */}
      <G fill="#F8FBF6" opacity={0.95}>
        <Path d="M65 39 Q69 32 78 35 Q83 22 94 31 Q103 23 111 34 Q121 31 126 39Z" />
        <Path d="M207 58 Q213 51 221 54 Q228 42 239 51 Q249 46 256 58Z" />
      </G>

      {/* 먼 산: 낮고 완만하게 배치 */}
      <Path
        d="M0 111
           L28 91 L52 107 L80 76 L112 111
           L145 92 L177 112 L210 85 L243 112
           L278 79 L311 110 L338 94 L360 106
           L360 151 L0 151Z"
        fill="#A8CDD0"
      />

      {/* 산의 은은한 밝은 면 */}
      <Path d="M62 98 L80 76 L100 99 L82 91Z" fill="#D9ECE7" opacity={0.8} />
      <Path
        d="M258 99 L278 79 L297 100 L279 92Z"
        fill="#D9ECE7"
        opacity={0.8}
      />

      {/* 멀리 이어지는 숲 */}
      {/* <Path
        d="M0 126
           Q28 112 55 125
           T112 124 T169 125
           T227 123 T284 125 T360 120
           L360 158 L0 158Z"
        fill="#6F9D80"
      /> */}

      {/* 먼 숲의 둥근 나무 실루엣 */}
      {/* {[
        [8, 127, 13],
        [27, 122, 15],
        [48, 127, 12],
        [68, 123, 14],
        [290, 124, 13],
        [312, 120, 16],
        [335, 125, 14],
        [354, 127, 12],
      ].map(([x, y, r], i) => (
        <Circle
          key={i}
          cx={x}
          cy={y}
          r={r}
          fill={i % 2 === 0 ? "#5F8D72" : "#7BA487"}
        />
      ))} */}

      {/* 숲 사이로 보이는 넓은 물 */}
      <Path
        d="M0 132
           Q44 127 84 132
           T166 130 T250 131 T360 128
           L360 169 L0 169Z"
        fill="#D5E9DE"
      />
      <Path
        d="M0 136
           Q44 131 84 136
           T166 134 T250 135 T360 132
           L360 164 L0 164Z"
        fill="url(#animalWater)"
      />

      {/* 물 위의 잔잔한 물결 */}
      <G fill="none" stroke="#DDF1EB" strokeLinecap="round" opacity={0.85}>
        <Path d="M15 143 Q32 139 49 143 T82 143" strokeWidth={1.5} />
        <Path d="M112 153 Q132 149 151 153 T190 153" strokeWidth={1.5} />
        <Path d="M223 143 Q241 139 259 143 T296 143" strokeWidth={1.5} />
        <Path d="M284 156 Q302 152 322 156 T350 156" strokeWidth={1.5} />
      </G>

      {/* 물 건너편의 풀숲 */}
      <Path
        d="M0 159
           Q35 153 70 159 T140 158
           T210 159 T280 156 T360 158
           L360 178 L0 178Z"
        fill="#6D9B75"
      />

      {/* 앞쪽의 완만한 초원 */}
      <Path
        d="M0 163
           Q44 153 84 163
           T164 161 T244 158 T360 160
           L360 220 L0 220Z"
        fill="url(#animalGround)"
      />

      {/* 전경의 부드러운 풀밭 */}
      <Path
        d="M0 184
           Q52 173 104 183
           T205 181 T302 180 T360 183
           L360 220 L0 220Z"
        fill="#7FA77F"
        opacity={0.55}
      />

      <G transform="translate(0,30)">
        {/* 왼쪽의 커다란 나무 */}
        <Path
          d="M24 155 Q27 124 24 83 M24 126 L9 111 M25 113 L40 98"
          stroke="#987E67"
          strokeWidth={4}
          strokeLinecap="round"
          fill="none"
        />
        <Ellipse cx="23" cy="77" rx="31" ry="43" fill="#88AD70" />
        <Ellipse cx="34" cy="75" rx="12" ry="25" fill="#B4CB8D" opacity={0.8} />

        {/* 오른쪽의 커다란 나무 */}
        <Path
          d="M337 154 Q332 122 338 85 M335 126 L320 111 M336 113 L350 99"
          stroke="#987E67"
          strokeWidth={4}
          strokeLinecap="round"
          fill="none"
        />
        <Ellipse cx="338" cy="79" rx="28" ry="39" fill="#88AD70" />
        <Ellipse
          cx="328"
          cy="77"
          rx="11"
          ry="23"
          fill="#B4CB8D"
          opacity={0.8}
        />
      </G>
      {/* 중앙의 낮은 바위: 스티커를 가리지 않도록 작게 */}
      <Path
        d="M155 178 Q162 166 174 171
           L187 187 L150 187Z"
        fill="#9DB7B8"
      />
      <Path
        d="M155 178 Q162 166 174 171 L165 181Z"
        fill="#C4D7D2"
        opacity={0.8}
      />

      <Path
        d="M201 184 Q211 162 228 166
           Q246 171 253 190 L196 190Z"
        fill="#8DAEB4"
      />
      <Path
        d="M211 171 Q218 164 228 166
           L216 184 L201 187Z"
        fill="#BDD2D1"
        opacity={0.85}
      />

      {/* 가장자리의 잎사귀: 중앙은 비워두기 */}
      <G strokeLinecap="round" strokeLinejoin="round">
        <Path d="M0 220 Q1 197 13 187 Q17 207 14 220Z" fill="#83AA75" />
        <Path d="M8 220 Q18 196 34 191 Q30 211 27 220Z" fill="#A8C68B" />
        <Path d="M30 220 Q38 202 51 198 Q49 212 49 220Z" fill="#719D77" />

        <Path d="M360 220 Q359 198 347 187 Q343 207 346 220Z" fill="#83AA75" />
        <Path d="M352 220 Q342 197 326 191 Q330 211 333 220Z" fill="#A8C68B" />
        <Path d="M330 220 Q322 202 309 198 Q311 212 311 220Z" fill="#719D77" />

        <Path
          d="M4 220 Q14 210 24 207 M19 220 Q28 211 39 210"
          fill="none"
          stroke="#638D6D"
          strokeWidth={1.5}
        />
        <Path
          d="M356 220 Q346 210 336 207 M341 220 Q332 211 321 210"
          fill="none"
          stroke="#638D6D"
          strokeWidth={1.5}
        />
      </G>

      {/* 작은 풀잎 */}
      {[
        [87, 202],
        [111, 212],
        [270, 204],
        [291, 214],
      ].map(([x, y], i) => (
        <Path
          key={i}
          d={`M${x} ${y + 5} q-3 -7 1 -11 q5 5 2 11`}
          fill={i % 2 === 0 ? "#A6C38B" : "#648F70"}
          opacity={0.8}
        />
      ))}
    </Svg>
  );
}

//동화책 색감
export function WildAnimalBackground({ width = "100%", height = 220 }: Props) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 360 220"
      preserveAspectRatio="xMidYMid meet"
    >
      <Defs>
        <LinearGradient id="animalSky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#C9E5EB" />
          <Stop offset="1" stopColor="#E8F0E7" />
        </LinearGradient>

        <LinearGradient id="animalGrass" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#A5C58A" />
          <Stop offset="1" stopColor="#739E73" />
        </LinearGradient>

        <LinearGradient id="animalWater" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#D1EAE2" />
          <Stop offset="1" stopColor="#8FCBD0" />
        </LinearGradient>
      </Defs>

      {/* 하늘 */}
      <Rect width="360" height="220" fill="url(#animalSky)" />

      {/* 햇살 */}
      <Circle cx="299" cy="35" r="25" fill="#FFF8DC" opacity={0.3} />
      <Circle cx="299" cy="35" r="14" fill="#FFEDBA" />

      {/* 구름 */}
      <G fill="#FFFFFF" opacity={0.88}>
        <Path d="M75 43 Q79 35 88 39 Q95 24 107 37 Q119 31 125 42 L137 43 L137 47 L75 47Z" />
        <Path d="M213 62 Q219 53 228 59 Q235 46 246 57 Q256 53 262 63 L213 65Z" />
        <Path d="M20 83 Q26 76 34 81 Q41 69 51 80 L61 83Z" opacity={0.7} />
      </G>

      {/* 먼 산 */}
      <Path
        d="M0 122 L34 91 L63 119 L103 73 L145 121
            L184 88 L224 123 L266 78 L307 119 L338 93
            L360 112 L360 157 L0 157Z"
        fill="#A4CDD0"
      />

      {/* 산의 밝은 능선 */}
      <Path
        d="M81 99 L103 73 L124 99 L109 92 L103 99 L96 92 L89 99Z"
        fill="#F0F8F5"
      />
      <Path
        d="M244 99 L266 78 L286 100 L272 92 L266 99 L258 92Z"
        fill="#F0F8F5"
      />

      {/* 먼 숲 */}
      <Path
        d="M0 128 Q36 110 72 126 T145 124 T217 124
            T290 122 T360 126 L360 158 L0 158Z"
        fill="#81B69A"
      />

      {/* 숲의 나무 실루엣 */}
      {[
        [8, 128, 12],
        [27, 122, 15],
        [48, 128, 11],
        [68, 124, 13],
        [292, 125, 12],
        [313, 121, 15],
        [335, 126, 13],
        [353, 128, 12],
      ].map(([x, y, r], i) => (
        <Circle
          key={i}
          cx={x}
          cy={y}
          r={r}
          fill={i % 2 === 0 ? "#638D72" : "#739D7C"}
        />
      ))}

      {/* 왼쪽 프레임 나무 */}
      <Path
        d="M23 151 Q28 116 24 75 M25 111 L10 96 M25 99 L40 84"
        fill="none"
        stroke="#AA896E"
        strokeWidth={4}
        strokeLinecap="round"
      />
      <Ellipse cx="22" cy="75" rx="30" ry="43" fill="#91B875" />
      <Ellipse cx="34" cy="76" rx="13" ry="26" fill="#B5CD8F" opacity={0.8} />

      {/* 오른쪽 프레임 나무 */}
      <Path
        d="M337 151 Q331 115 338 81 M335 112 L318 99 M335 101 L350 86"
        fill="none"
        stroke="#AA896E"
        strokeWidth={4}
        strokeLinecap="round"
      />
      <Ellipse cx="338" cy="79" rx="27" ry="39" fill="#91B875" />
      <Ellipse cx="328" cy="77" rx="12" ry="23" fill="#B5CD8F" opacity={0.8} />

      {/* 넓은 초원 */}
      <Path
        d="M0 145 Q44 133 83 142 T164 139
            T244 138 T360 135 L360 220 L0 220Z"
        fill="url(#animalGrass)"
      />

      {/* 초원에 이어지는 완만한 풀밭 */}
      <Path
        d="M0 163 Q49 151 93 160 T183 157
            T276 153 T360 155 L360 220 L0 220Z"
        fill="#82AD82"
      />

      {/* 오른쪽 아래 물가 */}
      <Path
        d="M188 185 Q205 160 249 158
            Q309 156 360 177 L360 220 L176 220
            Q176 200 188 185Z"
        fill="#E4F5F0"
      />
      <Path
        d="M188 188 Q211 165 251 164
            Q311 162 360 182 L360 220 L181 220
            Q180 202 188 188Z"
        fill="url(#animalWater)"
      />

      {/* 물결 */}
      <Path
        d="M211 184 Q231 177 251 182 T293 182 T339 190"
        fill="none"
        stroke="#F4FFFF"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <Path
        d="M204 198 Q223 192 242 197 T280 198 T326 205"
        fill="none"
        stroke="#BFE6E8"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M246 211 Q266 206 288 212"
        fill="none"
        stroke="#F4FFFF"
        strokeWidth={2}
        strokeLinecap="round"
      />

      {/* 물가의 풀 */}
      <Path d="M174 190 Q183 177 201 175 Q188 185 187 198Z" fill="#88C290" />
      <Path
        d="M180 190 L175 183 M187 190 L196 181 M192 185 L201 180"
        stroke="#659B74"
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
      />

      {/* 화면 가장자리의 잎사귀 */}
      <Path d="M0 220 L0 192 Q12 201 18 220Z" fill="#719B78" />
      <Path d="M8 220 Q14 198 31 185 Q27 207 27 220Z" fill="#A4C985" />
      <Path d="M32 220 Q39 201 53 191 Q49 211 50 220Z" fill="#77A27E" />
      <Path d="M63 220 Q59 199 75 185 Q77 208 82 220Z" fill="#B2D48F" />
      <Path d="M98 220 Q105 204 120 195 Q115 214 118 220Z" fill="#739E7C" />
      <Path d="M135 220 Q131 200 145 188 Q149 209 153 220Z" fill="#A7CC84" />
      <Path d="M275 220 Q279 202 293 190 Q290 211 297 220Z" fill="#78A27F" />
      <Path d="M306 220 Q311 202 326 192 Q322 211 328 220Z" fill="#A6CC83" />
      <Path d="M337 220 Q340 202 355 190 Q352 211 360 220Z" fill="#719B78" />

      {/* 작은 들꽃 */}
      {[
        [43, 195],
        [83, 207],
        [146, 199],
        [162, 212],
      ].map(([x, y], i) => (
        <G key={i}>
          <Circle cx={x} cy={y - 4} r={2.5} fill="#FFFDF5" />
          <Circle cx={x - 4} cy={y} r={2.5} fill="#FFFDF5" />
          <Circle cx={x + 4} cy={y} r={2.5} fill="#FFFDF5" />
          <Circle cx={x} cy={y + 3} r={2.5} fill="#FFFDF5" />
          <Circle cx={x} cy={y} r={2} fill="#EBD27A" />
        </G>
      ))}
    </Svg>
  );
}
export function PetBackground({ width = "100%", height = 220 }: Props) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 360 220"
      preserveAspectRatio="xMidYMid meet"
    >
      <Defs>
        <LinearGradient id="petSky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#B8D9D7" />
          <Stop offset="1" stopColor="#E7F0E8" />
        </LinearGradient>

        <LinearGradient id="petGrass" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#B1C994" />
          <Stop offset="1" stopColor="#8EAD7C" />
        </LinearGradient>

        <LinearGradient id="petHouseWall" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#F4EFE6" />
          <Stop offset="0.5" stopColor="#FAF5EE" />
          <Stop offset="1" stopColor="#E5DCB7" />
        </LinearGradient>
      </Defs>

      {/* 하늘 */}
      <Rect width="360" height="220" fill="url(#petSky)" />

      {/* 부드러운 구름 */}
      <Path
        d="M49 35
            C45 35 44 30 48 28
            C49 22 57 21 61 26
            C64 18 75 19 78 27
            C85 25 91 29 91 35Z"
        fill="#FCFDFB"
        opacity={0.94}
      />
      <Path
        d="M232 53
            C228 52 229 47 233 45
            C234 39 243 38 247 44
            C251 36 262 38 265 45
            C272 44 277 48 277 53Z"
        fill="#FCFDFB"
        opacity={0.9}
      />

      {/* 먼 언덕 */}
      <Path
        d="M0 117
            Q37 93 72 111
            Q112 88 151 113
            Q194 94 231 111
            Q282 89 320 108
            Q343 99 360 109
            L360 157 L0 157Z"
        fill="#B8D3AD"
      />
      <Path
        d="M0 133
            Q44 119 83 132
            Q128 116 168 132
            Q213 117 254 132
            Q306 116 360 130
            L360 165 L0 165Z"
        fill="#9EBF96"
      />

      {/* 뒤쪽 나무와 관목 */}
      <Path
        d="M0 139 Q20 125 40 138 T80 136
            T122 138 T164 135 T208 138
            T250 135 T294 137 T338 134 L360 139
            L360 158 L0 158Z"
        fill="#8DAD83"
      />

      <Ellipse cx="28" cy="137" rx="22" ry="11" fill="#99BA8F" />
      <Ellipse cx="94" cy="138" rx="27" ry="12" fill="#9DBE93" />
      <Ellipse cx="274" cy="137" rx="25" ry="12" fill="#9ABE90" />
      <Ellipse cx="333" cy="137" rx="28" ry="13" fill="#90B286" />

      {/* 울타리 */}
      <Rect x="0" y="116" width="360" height="9" rx="2" fill="#C5A17E" />
      <Rect x="0" y="137" width="360" height="9" rx="2" fill="#C5A17E" />

      {Array.from({ length: 10 }, (_, i) => {
        const x = 4 + i * 39;
        return (
          <Path
            key={i}
            d={`M${x} 151 L${x} 108 L${x + 8} 100 L${x + 16} 108 L${x + 16} 151Z`}
            fill="#C5A17E"
            stroke="#AD8B70"
            strokeWidth={1}
            strokeLinejoin="round"
          />
        );
      })}

      {/* 잔디밭 */}
      <Path
        d="M0 151
            Q42 145 82 151
            T164 150
            T245 149
            T360 148
            L360 220 L0 220Z"
        fill="url(#petGrass)"
      />

      {/* 잔디의 은은한 명암 */}
      <Path
        d="M0 178
            Q55 169 105 178
            T205 176
            T305 174 T360 177
            L360 220 L0 220Z"
        fill="#A2BD8B"
        opacity={0.45}
      />

      {/* 오른쪽 뒤편의 둥근 관목 */}
      <Ellipse cx="318" cy="151" rx="28" ry="10" fill="#9CC390" />
      <Ellipse cx="338" cy="148" rx="20" ry="12" fill="#ABD19F" />

      <G transform="translate(10,50) scale(0.9)">
        {/* 개집 본체 */}
        <Path
          d="M18 145 L18 105 L54 79 L92 105 L92 145Z"
          fill="url(#petHouseWall)"
          stroke="#E5DAC9"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />

        {/* 개집 지붕 */}
        <Path
          d="M12 108 L54 76 L99 108 L92 114 L54 87 L19 114Z"
          fill="#C69A83"
          stroke="#B0836C"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />

        {/* 지붕 안쪽 밝은 면 */}
        <Path
          d="M23 106 L54 84 L86 106"
          fill="none"
          stroke="#E8C6B3"
          strokeWidth={3}
          strokeLinecap="round"
        />

        {/* 개집 벽의 가로 판자 */}
        {[117, 127, 137].map((y) => (
          <Path
            key={y}
            d={`M21 ${y} L89 ${y}`}
            stroke="#E3D7C5"
            strokeWidth={1.5}
            opacity={0.85}
          />
        ))}

        {/* 개집 입구 */}
        <Path
          d="M37 145
            L37 126
            C37 113 44 106 54 106
            C65 106 72 114 72 126
            L72 145Z"
          fill="#615550"
        />

        {/* 입구 안쪽의 은은한 깊이 */}
        <Path
          d="M42 145 L42 126
            C42 116 46 112 53 111"
          fill="none"
          stroke="#7F706A"
          strokeWidth={2}
          strokeLinecap="round"
        />

        {/* 개집 바닥 */}
        <Path d="M14 145 L96 145 L96 151 L14 151Z" fill="#E8D9C0" />
      </G>

      {/* 앞쪽 잔디 장식: 작은 풀 */}
      <Path
        d="M119 215 Q122 205 118 199
            M122 215 Q130 206 132 200
            M126 215 Q124 207 128 204"
        fill="none"
        stroke="#7AA669"
        strokeWidth={1.8}
        strokeLinecap="round"
      />

      <Path
        d="M287 214 Q283 204 285 198
            M290 214 Q297 206 299 201
            M293 214 Q292 208 295 204"
        fill="none"
        stroke="#7AA669"
        strokeWidth={1.8}
        strokeLinecap="round"
      />

      {/* 잔디의 작은 풀잎 */}
      {[
        [112, 170],
        [153, 190],
        [201, 166],
        [245, 194],
        [327, 183],
        [343, 208],
      ].map(([x, y], i) => (
        <Path
          key={i}
          d={`M${x} ${y + 4} q-2 -5 1 -7 q4 4 1 7`}
          fill={i % 2 === 0 ? "#94B875" : "#88AC6C"}
          opacity={0.8}
        />
      ))}
    </Svg>
  );
}

export function FarmAnimalBackground({ width = "100%", height = 180 }: Props) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 240 180"
      preserveAspectRatio="xMidYMid meet"
    >
      <Defs>
        {/* 부드러운 동화책 하늘 */}
        <LinearGradient id="farmSky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#D5E9E8" />
          <Stop offset="1" stopColor="#F2F0DF" />
        </LinearGradient>

        {/* 멀리 있는 언덕 */}
        <LinearGradient id="farmHill" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#B7D3A5" />
          <Stop offset="1" stopColor="#9EBF8B" />
        </LinearGradient>

        {/* 중앙의 넓은 초원 */}
        <LinearGradient id="farmGrass" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#B8D69A" />
          <Stop offset="1" stopColor="#96BD82" />
        </LinearGradient>

        {/* 축사 나무 */}
        <LinearGradient id="farmBarnWood" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#D8A875" />
          <Stop offset="1" stopColor="#BD875B" />
        </LinearGradient>

        {/* 지붕 */}
        <LinearGradient id="farmRoof" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#C98F73" />
          <Stop offset="1" stopColor="#AD755F" />
        </LinearGradient>
      </Defs>

      {/* 1. 하늘 */}
      <Rect width="240" height="180" fill="url(#farmSky)" />

      {/* 햇빛이 은은하게 번지는 부분 */}
      <Circle cx="190" cy="28" r="25" fill="#F8E9B9" opacity={0.28} />
      <Circle cx="190" cy="28" r="13" fill="#F8E7B0" opacity={0.55} />

      {/* 부드러운 구름 */}
      <G fill="#FFFFFF" opacity={0.76}>
        <Path d="M90 28 Q91 22 98 23 Q102 13 110 21 Q119 17 123 26 L130 28Z" />
        <Path d="M166 45 Q169 39 176 42 Q182 32 190 41 Q199 37 203 45 L210 47Z" />
        <Path d="M8 57 Q13 50 20 54 Q25 46 33 54 L40 57Z" />
      </G>

      {/* 2. 먼 산과 언덕 */}
      <Path
        d="M0 87
           L18 70 L35 81 L57 62 L80 82
           L106 68 L128 84 L153 65 L177 82
           L202 70 L222 82 L240 74
           L240 126 L0 126Z"
        fill="#C0D9D2"
      />

      {/* 산의 부드러운 능선 */}
      <Path
        d="M43 75 L57 62 L72 76 L61 71 L57 76 L52 71Z"
        fill="#E9F0E5"
        opacity={0.8}
      />
      <Path
        d="M139 78 L153 65 L168 79 L157 74 L153 79 L148 74Z"
        fill="#E9F0E5"
        opacity={0.8}
      />

      {/* 먼 초록 언덕 */}
      <Path
        d="M0 96
           Q28 76 55 92
           Q82 76 111 94
           Q143 77 169 91
           Q206 75 240 91
           L240 143 L0 143Z"
        fill="url(#farmHill)"
      />

      {/* 3. 오른쪽 뒤편의 농작물 밭 */}
      <Path
        d="M153 88
           Q194 79 240 88
           L240 128
           Q210 116 174 118
           L146 108Z"
        fill="#D9D5A0"
      />

      {/* 밭의 고랑: 사선 방향으로 반복 */}
      <G fill="none" strokeLinecap="round" strokeLinejoin="round">
        <Path
          d="M172 89 L196 118 M190 86 L214 119
             M209 85 L231 119 M228 87 L246 115"
          stroke="#B6B982"
          strokeWidth={5}
          opacity={0.8}
        />
        <Path
          d="M169 91 L191 117 M188 89 L209 117
             M207 88 L226 117 M226 89 L242 112"
          stroke="#E8D9A0"
          strokeWidth={2}
        />
      </G>

      {/* 4. 먼 나무와 관목 */}
      <G>
        <Path
          d="M8 116 L8 91 M8 103 L1 96 M8 100 L15 92"
          stroke="#A58B70"
          strokeWidth={2}
          strokeLinecap="round"
          fill="none"
        />
        <Circle cx="5" cy="88" r="12" fill="#A5C49A" />
        <Circle cx="15" cy="91" r="10" fill="#B6CEA3" />

        <Path
          d="M226 115 L226 89 M226 102 L218 95 M226 99 L234 91"
          stroke="#A58B70"
          strokeWidth={2}
          strokeLinecap="round"
          fill="none"
        />
        <Circle cx="220" cy="86" r="13" fill="#A3C19A" />
        <Circle cx="231" cy="89" r="12" fill="#B5CEA3" />
      </G>

      {/* 뒤쪽 낮은 관목 */}
      <Path
        d="M0 112
           Q13 101 27 111
           Q39 101 51 112
           Q64 102 77 112
           Q93 103 107 112
           Q124 102 140 112
           Q160 101 176 111
           Q194 101 209 111
           Q227 100 240 110
           L240 139 L0 139Z"
        fill="#8EAF83"
      />

      {/* 5. 왼쪽 뒤편의 축사 그림자 */}
      <Ellipse cx="43" cy="137" rx="37" ry="5" fill="#718E70" opacity={0.18} />

      {/* 축사 본체 */}
      <Path
        d="M11 91 L11 117 L67 117 L67 91 L39 70Z"
        fill="url(#farmBarnWood)"
        stroke="#B9855E"
        strokeWidth={1}
        strokeLinejoin="round"
      />

      {/* 축사 측면의 명암 */}
      <Path d="M57 83 L67 91 L67 117 L57 117Z" fill="#B47D56" opacity={0.65} />

      {/* 축사 지붕 */}
      <Path
        d="M5 92 L39 65 L73 92 L68 97 L39 75 L10 97Z"
        fill="url(#farmRoof)"
        stroke="#A96F5B"
        strokeWidth={1.2}
        strokeLinejoin="round"
      />

      {/* 지붕의 빛 받는 가장자리 */}
      <Path
        d="M11 91 L39 70 L67 91"
        fill="none"
        stroke="#E1B59A"
        strokeWidth={2}
        strokeLinecap="round"
      />

      {/* 축사 벽의 나무 판자 */}
      <G stroke="#A96F4F" strokeWidth={0.8} opacity={0.52}>
        <Path d="M14 96 L64 96" />
        <Path d="M13 103 L65 103" />
        <Path d="M13 110 L65 110" />
      </G>

      {/* 축사 위쪽 환기창 */}
      <Rect
        x="31"
        y="82"
        width="16"
        height="9"
        rx="1"
        fill="#F4E5C9"
        stroke="#A96F4F"
        strokeWidth={1}
      />
      <Rect x="34" y="84" width="10" height="5" fill="#A9C8C8" />

      {/* 축사 문 */}
      <Rect
        x="27"
        y="96"
        width="25"
        height="21"
        rx="1"
        fill="#B47C54"
        stroke="#9F6B4C"
        strokeWidth={1}
      />
      <Path
        d="M27 96 L52 117 M52 96 L27 117"
        stroke="#E9C6A1"
        strokeWidth={2}
        opacity={0.95}
      />

      {/* 6. 중앙의 넓은 초원 */}
      <Path
        d="M0 119
           Q34 105 66 118
           Q102 105 134 117
           Q176 105 206 117
           Q225 111 240 116
           L240 180 L0 180Z"
        fill="url(#farmGrass)"
      />

      {/* 초원 안쪽의 밝은 완만한 영역 */}
      <Path
        d="M0 139
           Q45 124 89 138
           Q128 126 170 138
           Q207 127 240 136
           L240 180 L0 180Z"
        fill="#B4D193"
        opacity={0.55}
      />

      {/* 7. 농장 울타리: 중앙보다 뒤쪽에 배치 */}
      <G transform="translate(15,-5)">
        {/* 가로대 그림자 */}
        <Path
          d="M83 119 L240 119"
          stroke="#A17C5E"
          strokeWidth={5}
          strokeLinecap="round"
          opacity={0.25}
        />

        {/* 울타리 기둥 */}
        {[91, 124, 157, 190, 223].map((x, i) => (
          <G key={x}>
            <Path
              d={`M${x} 108 L${x - 2} 135 L${x + 7} 135 L${x + 5} 108Z`}
              fill="#C6A17B"
              stroke="#AA8666"
              strokeWidth={0.8}
            />
            <Path
              d={`M${x} 109 L${x + 1} 132`}
              stroke="#E1C19A"
              strokeWidth={1.5}
              opacity={0.8}
            />
          </G>
        ))}

        {/* 가로 울타리 */}
        <Path
          d="M84 115 L240 115"
          stroke="#B78D68"
          strokeWidth={5}
          strokeLinecap="round"
        />
        <Path
          d="M84 127 L240 127"
          stroke="#B78D68"
          strokeWidth={5}
          strokeLinecap="round"
        />

        {/* 가로대 위의 빛 */}
        <Path
          d="M84 114 L240 114"
          stroke="#D8B28A"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <Path
          d="M84 126 L240 126"
          stroke="#D8B28A"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </G>

      {/* 8. 앞쪽 풀밭: 중앙 스티커를 가리지 않도록 가장자리에만 */}
      <Path
        d="M0 163
           Q27 153 49 163
           Q69 157 89 165
           L89 180 L0 180Z"
        fill="#9ABD7F"
      />
      <Path
        d="M184 165
           Q208 153 240 161
           L240 180 L184 180Z"
        fill="#9ABD7F"
      />

      {/* 가장자리의 풀잎 */}
      <G fill="none" strokeLinecap="round" strokeWidth={1.5}>
        <Path
          d="M10 177 Q8 169 5 167 M11 177 Q15 168 19 166
             M27 178 Q24 171 25 167 M29 178 Q34 170 38 170"
          stroke="#7FA778"
        />
        <Path
          d="M202 178 Q199 169 196 168 M205 178 Q211 168 215 167
             M228 178 Q225 171 227 166 M231 178 Q236 171 239 170"
          stroke="#7FA778"
        />
      </G>

      {/* 작은 들꽃: 화면 가장자리 장식 */}
      <G>
        <Circle cx="47" cy="169" r="2.2" fill="#F7F0D8" />
        <Circle cx="44.5" cy="171" r="2" fill="#F7F0D8" />
        <Circle cx="49.5" cy="171" r="2" fill="#F7F0D8" />
        <Circle cx="47" cy="171" r="1.3" fill="#E5C778" />

        <Circle cx="185" cy="170" r="2.2" fill="#F7F0D8" />
        <Circle cx="182.5" cy="172" r="2" fill="#F7F0D8" />
        <Circle cx="187.5" cy="172" r="2" fill="#F7F0D8" />
        <Circle cx="185" cy="172" r="1.3" fill="#E5C778" />
      </G>
    </Svg>
  );
}

/** Underwater scene: water, light rays and sea plants only. */
// export function SeaAnimalBackground({ width = "240", height = "180" }: Props) {
//   return (
//     <Svg width={width} height={height} viewBox="0 0 240 180">
//       <Defs>
//         <LinearGradient id="animalUnderwater" x1="0" y1="0" x2="0" y2="1">
//           <Stop offset="0" stopColor="#76D8F0" />
//           <Stop offset="1" stopColor="#168FC8" />
//         </LinearGradient>
//       </Defs>
//       <Rect width="240" height="180" fill="url(#animalUnderwater)" />
//       <Path
//         d="M0 28 Q32 17 60 29 T120 28 T180 28 T240 24"
//         stroke="#B8F0F8"
//         strokeWidth="3"
//         opacity="0.7"
//         fill="none"
//       />
//       <Path d="M24 0 L67 0 L112 138 L76 138Z" fill="#C5F6FC" opacity="0.13" />
//       <Path
//         d="M124 0 L158 0 L193 128 L165 128Z"
//         fill="#C5F6FC"
//         opacity="0.13"
//       />
//       {[
//         { x: 26, y: 54, r: 4 },
//         { x: 48, y: 79, r: 3 },
//         { x: 199, y: 48, r: 5 },
//         { x: 215, y: 86, r: 3 },
//         { x: 151, y: 62, r: 3 },
//       ].map((b, i) => (
//         <Circle
//           key={i}
//           cx={b.x}
//           cy={b.y}
//           r={b.r}
//           fill="#D8FAFF"
//           opacity="0.75"
//         />
//       ))}
//       <Path
//         d="M0 143 Q42 135 82 145 T160 143 T240 140 L240 180 L0 180Z"
//         fill="#F5DDA5"
//       />
//       <Path d="M18 151 Q7 127 18 111 Q31 130 18 151Z" fill="#278FB0" />
//       <Path d="M29 153 Q22 126 42 116 Q47 139 29 153Z" fill="#36A8BD" />
//       <Path d="M218 151 Q207 126 219 107 Q231 128 218 151Z" fill="#278FB0" />
//       <Path d="M229 154 Q222 131 237 119 L240 144Z" fill="#36A8BD" />
//       <Path d="M10 151 Q17 138 29 145 Q24 158 10 151Z" fill="#7DCFC5" />
//       <Path d="M205 153 Q216 139 229 147 Q220 161 205 153Z" fill="#7DCFC5" />
//       <Ellipse cx="120" cy="170" rx="82" ry="5" fill="#E8C987" opacity="0.45" />
//     </Svg>
//   );
// }
export function SeaAnimalBackground({ width = "240", height = "180" }: Props) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 240 180"
      preserveAspectRatio="xMidYMid meet"
    >
      <Defs>
        <LinearGradient id="animalUnderwater" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#A1E2E4" />
          <Stop offset="1" stopColor="#5C9EAD" />
        </LinearGradient>
      </Defs>

      {/* 바닷속 배경 */}
      <Rect width="240" height="180" fill="url(#animalUnderwater)" />

      {/* 수면 물결 */}
      <Path
        d="M0 28 Q32 17 60 29 T120 28 T180 28 T240 24"
        stroke="#E8FAFC"
        strokeWidth="3"
        opacity="0.65"
        fill="none"
      />

      {/* 부드러운 햇살 빛줄기 */}
      <Path d="M24 0 L67 0 L112 138 L76 138Z" fill="#FFFFFF" opacity="0.12" />
      <Path
        d="M124 0 L158 0 L193 128 L165 128Z"
        fill="#FFFFFF"
        opacity="0.12"
      />

      {/* 물방울 */}
      {[
        { x: 26, y: 54, r: 4 },
        { x: 48, y: 79, r: 3 },
        { x: 199, y: 48, r: 5 },
        { x: 215, y: 86, r: 3 },
        { x: 151, y: 62, r: 3 },
      ].map((b, i) => (
        <Circle
          key={i}
          cx={b.x}
          cy={b.y}
          r={b.r}
          fill="#F2FEFF"
          opacity="0.75"
        />
      ))}

      {/* 따뜻한 파스텔 모래 바닥 */}
      <Path
        d="M0 143 Q42 135 82 145 T160 143 T240 140 L240 180 L0 180Z"
        fill="#F2E2BE"
      />

      {/* 은은한 해초 및 바닷속 풀잎 (세이지/티엘 톤) */}
      <Path d="M18 151 Q7 127 18 111 Q31 130 18 151Z" fill="#4D8B95" />
      <Path d="M29 153 Q22 126 42 116 Q47 139 29 153Z" fill="#5E9EA7" />
      <Path d="M218 151 Q207 126 219 107 Q231 128 218 151Z" fill="#4D8B95" />
      <Path d="M229 154 Q222 131 237 119 L240 144Z" fill="#5E9EA7" />
      <Path d="M10 151 Q17 138 29 145 Q24 158 10 151Z" fill="#85C3B7" />
      <Path d="M205 153 Q216 139 229 147 Q220 161 205 153Z" fill="#85C3B7" />

      {/* 모래사장 그림자/명암 */}
      <Ellipse cx="120" cy="170" rx="82" ry="5" fill="#DFCDA3" opacity={0.45} />
    </Svg>
  );
}

// export function BirdBackground({ width = "240", height = "180" }: Props) {
//   return (
//     <Svg
//       width={width}
//       height={height}
//       viewBox="0 0 240 180"
//       preserveAspectRatio="xMidYMid meet"
//     >
//       <Defs>
//         <LinearGradient id="birdSky" x1="0" y1="0" x2="0" y2="1">
//           <Stop offset="0" stopColor="#B9E1F0" />
//           <Stop offset="1" stopColor="#E5F0E8" />
//         </LinearGradient>

//         <LinearGradient id="birdTrunk" x1="0" y1="0" x2="1" y2="0">
//           <Stop offset="0" stopColor="#805438" />
//           <Stop offset="0.48" stopColor="#A8734B" />
//           <Stop offset="1" stopColor="#70472F" />
//         </LinearGradient>

//         <LinearGradient id="birdNest" x1="0" y1="0" x2="0" y2="1">
//           <Stop offset="0" stopColor="#C69A69" />
//           <Stop offset="1" stopColor="#936744" />
//         </LinearGradient>

//         <LinearGradient id="birdHill" x1="0" y1="0" x2="0" y2="1">
//           <Stop offset="0" stopColor="#B7D58F" />
//           <Stop offset="1" stopColor="#91B77D" />
//         </LinearGradient>
//       </Defs>

//       {/* 하늘 */}
//       <Rect width="240" height="180" fill="url(#birdSky)" />

//       {/* 멀리 있는 부드러운 구름 */}
//       <G fill="#F8FBF7" opacity={0.85}>
//         <Path d="M0 36 Q5 28 13 33 Q17 20 27 29 Q35 26 39 36Z" />
//         <Path d="M120 57 Q126 49 134 54 Q141 42 150 51 Q159 47 164 57Z" />
//       </G>

//       {/* 멀리 보이는 낮은 언덕 */}
//       <Path
//         d="M0 143 Q38 130 76 142 T151 140 T240 136
//            L240 180 L0 180Z"
//         fill="url(#birdHill)"
//       />

//       {/* 먼 곳의 작은 나무 실루엣 */}
//       <G fill="#7CA47A">
//         <Circle cx="21" cy="139" r="10" />
//         <Circle cx="31" cy="136" r="13" />
//         <Circle cx="42" cy="141" r="9" />
//         <Circle cx="179" cy="139" r="10" />
//         <Circle cx="190" cy="136" r="13" />
//         <Circle cx="201" cy="141" r="9" />
//       </G>

//       {/* 오른쪽의 큰 나무줄기 */}
//       <Path
//         d="M174 180
//            Q185 151 181 126
//            Q178 106 161 87
//            Q149 72 143 51
//            Q139 39 146 31
//            L160 25
//            Q158 41 166 55
//            Q177 76 190 89
//            Q202 108 202 133
//            Q204 157 222 180Z"
//         fill="url(#birdTrunk)"
//       />

//       {/* 나무줄기의 밝은 면 */}
//       <Path
//         d="M179 174
//            Q190 146 186 126
//            Q184 106 170 88
//            Q158 72 153 51
//            Q150 41 154 34"
//         fill="none"
//         stroke="#C18B5D"
//         strokeWidth={5}
//         strokeLinecap="round"
//       />

//       {/* 나무껍질의 결 */}
//       <G
//         fill="none"
//         stroke="#6E4933"
//         strokeWidth={1.5}
//         strokeLinecap="round"
//         opacity={0.8}
//       >
//         <Path d="M193 126 Q204 132 215 128" />
//         <Path d="M190 145 Q199 149 207 146" />
//         <Path d="M183 161 Q191 165 199 162" />
//       </G>

//       {/* 둥지를 받치는 굵은 가지 */}
//       <Path
//         d="M235 145
//            Q211 132 184 126
//            Q158 120 132 125
//            Q104 130 75 120
//            Q52 114 26 117"
//         fill="none"
//         stroke="#754B32"
//         strokeWidth={13}
//         strokeLinecap="round"
//       />
//       <Path
//         d="M235 140
//            Q205 127 183 122
//            Q155 116 132 121
//            Q104 126 75 116
//            Q51 110 27 113"
//         fill="none"
//         stroke="#A8754E"
//         strokeWidth={7}
//         strokeLinecap="round"
//       />

//       {/* 가지 끝의 작은 곁가지 */}
//       <Path
//         d="M54 114 Q43 105 38 96 M78 119 Q69 126 66 132"
//         fill="none"
//         stroke="#93623F"
//         strokeWidth={4}
//         strokeLinecap="round"
//       />

//       {/* 둥지 뒤쪽 그림자 */}
//       <Ellipse
//         cx="118"
//         cy="115"
//         rx="36"
//         ry="10"
//         fill="#75543D"
//         opacity={0.22}
//       />

//       {/* 둥지 몸체 */}
//       <Path
//         d="M81 94
//            Q91 87 105 91
//            Q123 86 140 92
//            Q154 97 153 108
//            Q150 126 119 130
//            Q88 127 81 110Z"
//         fill="url(#birdNest)"
//         stroke="#8A6040"
//         strokeWidth={1.5}
//       />

//       {/* 둥지 안쪽 */}
//       <Path
//         d="M86 98
//            Q103 104 119 101
//            Q137 103 149 97
//            Q145 112 120 115
//            Q97 113 86 98Z"
//         fill="#78543B"
//       />

//       {/* 둥지 안의 알: 새 없이도 둥지임을 알 수 있게 */}
//       <Ellipse
//         cx="105"
//         cy="98"
//         rx="6"
//         ry="8"
//         fill="#F8F0D8"
//         stroke="#D8C9A9"
//         strokeWidth={0.8}
//       />
//       <Ellipse
//         cx="119"
//         cy="96"
//         rx="6.5"
//         ry="9"
//         fill="#FFF8E7"
//         stroke="#D8C9A9"
//         strokeWidth={0.8}
//       />
//       <Ellipse
//         cx="132"
//         cy="99"
//         rx="5.5"
//         ry="7"
//         fill="#F3E7CC"
//         stroke="#D8C9A9"
//         strokeWidth={0.8}
//       />

//       {/* 둥지에 엮인 가지 */}
//       <G fill="none" strokeLinecap="round" strokeLinejoin="round">
//         <Path d="M80 96 Q100 108 151 96" stroke="#D8B27A" strokeWidth={3} />
//         <Path d="M82 102 Q112 116 150 103" stroke="#E0BD84" strokeWidth={2.5} />
//         <Path d="M87 111 Q114 122 145 110" stroke="#B88A58" strokeWidth={3} />
//         <Path
//           d="M91 92 Q82 103 92 117 M101 91 Q95 107 104 122
//              M138 92 Q147 105 139 118"
//           stroke="#C49A68"
//           strokeWidth={2}
//         />
//         <Path
//           d="M76 98 Q92 87 108 94 T155 97"
//           stroke="#E4C58F"
//           strokeWidth={3}
//         />
//       </G>

//       {/* 둥지 앞쪽의 테두리 */}
//       <Path
//         d="M80 96
//            Q99 108 119 104
//            Q140 106 153 96"
//         fill="none"
//         stroke="#E3C18A"
//         strokeWidth={4}
//         strokeLinecap="round"
//       />

//       {/* 둥지 앞쪽으로 내려오는 잔가지 */}
//       <Path
//         d="M96 119 Q105 124 110 129
//            M133 117 Q141 121 145 126"
//         fill="none"
//         stroke="#8B6243"
//         strokeWidth={2.5}
//         strokeLinecap="round"
//       />

//       {/* 위쪽 나뭇잎: 둥지를 둘러싼 수관 */}
//       <G>
//         <Path
//           d="M0 0 H240 V45
//              Q218 54 201 39
//              Q183 54 167 38
//              Q148 53 132 36
//              Q111 51 94 35
//              Q72 50 54 32
//              Q33 43 17 29
//              L0 35Z"
//           fill="#6E9C59"
//         />

//         {[
//           [12, 12, 24],
//           [38, 17, 25],
//           [65, 7, 28],
//           [92, 14, 27],
//           [120, 7, 29],
//           [150, 15, 27],
//           [178, 7, 31],
//           [207, 15, 28],
//           [233, 8, 29],
//         ].map(([x, y, r], i) => (
//           <Circle
//             key={i}
//             cx={x}
//             cy={y}
//             r={r}
//             fill={i % 2 === 0 ? "#8DBB62" : "#A0C96E"}
//           />
//         ))}
//       </G>

//       {/* 나무 오른쪽의 작은 잎사귀 */}
//       <G fill="#8CB66B">
//         <Circle cx="219" cy="51" r="17" />
//         <Circle cx="234" cy="43" r="19" />
//         <Circle cx="227" cy="64" r="15" />
//       </G>

//       {/* 아래쪽은 작은 풀잎만 배치 */}
//       <G fill="none" strokeLinecap="round" strokeWidth={2}>
//         <Path
//           d="M8 180 Q10 169 17 165 M14 180 Q22 169 29 168"
//           stroke="#789E6D"
//         />
//         <Path
//           d="M53 180 Q55 173 61 170 M59 180 Q65 174 70 174"
//           stroke="#88AC70"
//         />
//         <Path
//           d="M145 180 Q149 171 155 168 M152 180 Q159 174 164 174"
//           stroke="#789E6D"
//         />
//       </G>
//     </Svg>
//   );
// }
export function BirdBackground({ width = "240", height = "180" }: Props) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 240 180"
      preserveAspectRatio="xMidYMid meet"
    >
      <Defs>
        <LinearGradient id="birdSky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#C7E8F2" />
          <Stop offset="1" stopColor="#E8F0E8" />
        </LinearGradient>

        <LinearGradient id="birdTrunk" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#8E6A52" />
          <Stop offset="0.48" stopColor="#B08C73" />
          <Stop offset="1" stopColor="#7B5B45" />
        </LinearGradient>

        <LinearGradient id="birdNest" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#D4B48D" />
          <Stop offset="1" stopColor="#A48160" />
        </LinearGradient>

        <LinearGradient id="birdHill" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#B2D494" />
          <Stop offset="1" stopColor="#8CBA77" />
        </LinearGradient>
      </Defs>

      {/* 하늘 */}
      <Rect width="240" height="180" fill="url(#birdSky)" />

      {/* 멀리 있는 부드러운 구름 */}
      <G fill="#FCFDFB" opacity={0.88}>
        <Path d="M0 36 Q5 28 13 33 Q17 20 27 29 Q35 26 39 36Z" />
        <Path d="M120 57 Q126 49 134 54 Q141 42 150 51 Q159 47 164 57Z" />
      </G>

      {/* 멀리 보이는 낮은 언덕 */}
      <Path
        d="M0 143 Q38 130 76 142 T151 140 T240 136
           L240 180 L0 180Z"
        fill="url(#birdHill)"
      />

      {/* 먼 곳의 작은 나무 실루엣 */}
      <G fill="#77A376">
        <Circle cx="21" cy="139" r="10" />
        <Circle cx="31" cy="136" r="13" />
        <Circle cx="42" cy="141" r="9" />
        <Circle cx="179" cy="139" r="10" />
        <Circle cx="190" cy="136" r="13" />
        <Circle cx="201" cy="141" r="9" />
      </G>
      {/* 둥지를 받치는 굵은 가지 (나무줄기 x=188 좌표 내부에서 자연스럽게 뻗어 나오도록 수정) */}
      <Path
        d="M188 128
     Q162 120 132 125
     Q104 130 75 120
     Q52 114 26 117"
        fill="none"
        stroke="#805F4A"
        strokeWidth={13}
        strokeLinecap="round"
      />
      <Path
        d="M186 124
     Q159 116 132 121
     Q104 126 75 116
     Q51 110 27 113"
        fill="none"
        stroke="#B08B71"
        strokeWidth={7}
        strokeLinecap="round"
      />

      {/* 가지 끝의 작은 곁가지 */}
      <Path
        d="M54 114 Q43 105 38 96 M78 119 Q69 126 66 132"
        fill="none"
        stroke="#9B785E"
        strokeWidth={4}
        strokeLinecap="round"
      />
      {/* 오른쪽의 큰 나무줄기 */}
      <Path
        d="M174 180
           Q185 151 181 126
           Q178 106 161 87
           Q149 72 143 51
           Q139 39 146 31
           L160 25
           Q158 41 166 55
           Q177 76 190 89
           Q202 108 202 133
           Q204 157 222 180Z"
        fill="url(#birdTrunk)"
      />

      {/* 나무줄기의 밝은 면 */}
      <Path
        d="M179 174
           Q190 146 186 126
           Q184 106 170 88
           Q158 72 153 51
           Q150 41 154 34"
        fill="none"
        stroke="#C9A387"
        strokeWidth={5}
        strokeLinecap="round"
      />

      {/* 나무껍질의 결 */}
      <G
        fill="none"
        stroke="#6D4F3C"
        strokeWidth={1.5}
        strokeLinecap="round"
        opacity={0.65}
      >
        <Path d="M193 126 Q204 132 215 128" />
        <Path d="M190 145 Q199 149 207 146" />
        <Path d="M183 161 Q191 165 199 162" />
      </G>

      {/* 둥지를 받치는 굵은 가지 */}
      {/* <Path
        d="M235 145
           Q211 132 184 126
           Q158 120 132 125
           Q104 130 75 120
           Q52 114 26 117"
        fill="none"
        stroke="#805F4A"
        strokeWidth={13}
        strokeLinecap="round"
      />
      <Path
        d="M235 140
           Q205 127 183 122
           Q155 116 132 121
           Q104 126 75 116
           Q51 110 27 113"
        fill="none"
        stroke="#B08B71"
        strokeWidth={7}
        strokeLinecap="round"
      /> */}

      {/* 가지 끝의 작은 곁가지 */}
      <Path
        d="M54 114 Q43 105 38 96 M78 119 Q69 126 66 132"
        fill="none"
        stroke="#9B785E"
        strokeWidth={4}
        strokeLinecap="round"
      />

      {/* 둥지 뒤쪽 그림자 */}
      <Ellipse
        cx="118"
        cy="115"
        rx="36"
        ry="10"
        fill="#755845"
        opacity={0.18}
      />

      {/* 둥지 몸체 */}
      <Path
        d="M81 94
           Q91 87 105 91
           Q123 86 140 92
           Q154 97 153 108
           Q150 126 119 130
           Q88 127 81 110Z"
        fill="url(#birdNest)"
        stroke="#997758"
        strokeWidth={1.5}
      />

      {/* 둥지 안쪽 */}
      <Path
        d="M86 98
           Q103 104 119 101
           Q137 103 149 97
           Q145 112 120 115
           Q97 113 86 98Z"
        fill="#83634B"
      />

      {/* 둥지 안의 알 */}
      <Ellipse
        cx="105"
        cy="98"
        rx="6"
        ry="8"
        fill="#FAF2E1"
        stroke="#E2D4B9"
        strokeWidth={0.8}
      />
      <Ellipse
        cx="119"
        cy="96"
        rx="6.5"
        ry="9"
        fill="#FFFBF0"
        stroke="#E2D4B9"
        strokeWidth={0.8}
      />
      <Ellipse
        cx="132"
        cy="99"
        rx="5.5"
        ry="7"
        fill="#F7EBD6"
        stroke="#E2D4B9"
        strokeWidth={0.8}
      />

      {/* 둥지에 엮인 가지 */}
      <G fill="none" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M80 96 Q100 108 151 96" stroke="#E5C799" strokeWidth={3} />
        <Path d="M82 102 Q112 116 150 103" stroke="#ECCF9E" strokeWidth={2.5} />
        <Path d="M87 111 Q114 122 145 110" stroke="#C9A071" strokeWidth={3} />
        <Path
          d="M91 92 Q82 103 92 117 M101 91 Q95 107 104 122
             M138 92 Q147 105 139 118"
          stroke="#D4B081"
          strokeWidth={2}
        />
        <Path
          d="M76 98 Q92 87 108 94 T155 97"
          stroke="#EED7AF"
          strokeWidth={3}
        />
      </G>

      {/* 둥지 앞쪽의 테두리 */}
      <Path
        d="M80 96
           Q99 108 119 104
           Q140 106 153 96"
        fill="none"
        stroke="#EED3A5"
        strokeWidth={4}
        strokeLinecap="round"
      />

      {/* 둥지 앞쪽으로 내려오는 잔가지 */}
      <Path
        d="M96 119 Q105 124 110 129
           M133 117 Q141 121 145 126"
        fill="none"
        stroke="#9B7558"
        strokeWidth={2.5}
        strokeLinecap="round"
      />

      {/* 위쪽 나뭇잎 */}
      <G>
        <Path
          d="M0 0 H240 V45
             Q218 54 201 39
             Q183 54 167 38
             Q148 53 132 36
             Q111 51 94 35
             Q72 50 54 32
             Q33 43 17 29
             L0 35Z"
          fill="#78A164"
        />

        {[
          [12, 12, 24],
          [38, 17, 25],
          [65, 7, 28],
          [92, 14, 27],
          [120, 7, 29],
          [150, 15, 27],
          [178, 7, 31],
          [207, 15, 28],
          [233, 8, 29],
        ].map(([x, y, r], i) => (
          <Circle
            key={i}
            cx={x}
            cy={y}
            r={r}
            fill={i % 2 === 0 ? "#8EAF74" : "#A6C78B"}
          />
        ))}
      </G>

      {/* 나무 오른쪽의 작은 잎사귀 */}
      <G fill="#92B877">
        <Circle cx="219" cy="51" r="17" />
        <Circle cx="234" cy="43" r="19" />
        <Circle cx="227" cy="64" r="15" />
      </G>

      {/* 아래쪽 풀잎 */}
      <G fill="none" strokeLinecap="round" strokeWidth={2}>
        <Path
          d="M8 180 Q10 169 17 165 M14 180 Q22 169 29 168"
          stroke="#7A9E6E"
        />
        <Path
          d="M53 180 Q55 173 61 170 M59 180 Q65 174 70 174"
          stroke="#8CAE78"
        />
        <Path
          d="M145 180 Q149 171 155 168 M152 180 Q159 174 164 174"
          stroke="#7A9E6E"
        />
      </G>
    </Svg>
  );
}
/** Flower meadow for insects: no butterflies, ladybugs, or other insect-like decorations. */
export function InsectBackground({ width = "240", height = "180" }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 240 180">
      <Sky />
      <Cloud x={18} y={25} scale={0.75} />
      <Cloud x={164} y={22} scale={0.8} />
      <Path
        d="M0 94 Q44 71 87 91 T166 85 T240 92 L240 180 L0 180Z"
        fill="#A9DCA0"
      />
      <Path
        d="M0 120 Q47 102 100 120 T190 113 T240 119 L240 180 L0 180Z"
        fill="#C6E99B"
      />
      <Path
        d="M0 145 Q65 130 124 145 T240 138 L240 180 L0 180Z"
        fill="#A5D97D"
      />
      <G transform="translate(26 116)">
        {[0, 72, 144, 216, 288].map((a) => (
          <Ellipse
            key={a}
            cx="0"
            cy="-8"
            rx="4.5"
            ry="7"
            fill="#F7A7C3"
            transform={`rotate(${a})`}
          />
        ))}
        <Circle r="5" fill="#F7D76A" />
        <Path
          d="M0 6 L-2 34"
          stroke="#65AF6C"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <Path d="M-2 22 Q-14 12 -16 23 Q-9 29 -2 22Z" fill="#79C77B" />
      </G>
      <G transform="translate(209 129)">
        {[0, 72, 144, 216, 288].map((a) => (
          <Ellipse
            key={a}
            cx="0"
            cy="-7"
            rx="4"
            ry="6"
            fill="#FFF6E5"
            transform={`rotate(${a})`}
          />
        ))}
        <Circle r="4.5" fill="#F6D35E" />
        <Path
          d="M0 5 L-2 27"
          stroke="#65AF6C"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </G>
      <G transform="translate(68 145)">
        {[0, 72, 144, 216, 288].map((a) => (
          <Ellipse
            key={a}
            cx="0"
            cy="-6"
            rx="4"
            ry="5.5"
            fill="#F7D76A"
            transform={`rotate(${a})`}
          />
        ))}
        <Circle r="4" fill="#FFF0B2" />
        <Path
          d="M0 5 L2 21"
          stroke="#65AF6C"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </G>
      <Grass x={7} y={169} color="#6DBB69" />
      <Grass x={125} y={163} color="#7FC774" />
      <Grass x={230} y={167} color="#6DBB69" />
    </Svg>
  );
}

const BACKGROUNDS: Record<AnimalBackgroundKind, React.ComponentType<Props>> = {
  animal: AnimalBackground,
  pet: PetBackground,
  farm_animal: FarmAnimalBackground,
  wild_animal: WildAnimalBackground,
  sea_animal: SeaAnimalBackground,
  bird: BirdBackground,
  insect: InsectBackground,
};

/** Use this when the target category is dynamic. */
export default function AnimalCategoryBackground({
  category,
  width = "240",
  height = "180",
}: Props & { category: AnimalBackgroundKind }) {
  const Background = BACKGROUNDS[category];
  return <Background width={width} height={height} />;
}

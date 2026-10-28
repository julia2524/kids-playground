import React from "react";
import Svg, { Rect, Path, Circle, Ellipse, G, Line } from "react-native-svg";

export function EgyptPyramidPuzzleScene() {
  return (
    <>
      {/* ===================================== */}
      {/* 1. 하늘과 구름 */}
      {/* ===================================== */}
      <Rect x="0" y="0" width="240" height="300" fill="#4DBCEB" />

      <G fill="#F5FAF8">
        <Path d="M12 49 Q15 42 22 45 Q27 36 35 43 Q43 41 47 49 Z" />
        <Path d="M165 32 Q169 24 176 28 Q183 19 191 27 Q198 26 202 33 Z" />
        <Path d="M204 78 Q208 72 214 76 Q220 68 227 77 L232 82 L203 82 Z" />
      </G>

      {/* 먼 곳의 모래 언덕 */}
      <Path
        d="
          M0 145
          Q26 127 53 143
          Q78 128 105 143
          Q130 128 156 141
          Q187 124 213 140
          Q228 133 240 139
          L240 211 L0 211 Z
        "
        fill="#F6AD55"
      />

      {/* 먼 언덕의 햇빛 */}
      <Path
        d="
          M0 159
          Q34 139 66 154
          Q96 140 126 156
          Q163 137 191 153
          Q220 143 240 151
          L240 207 L0 207 Z
        "
        fill="#F9C879"
      />

      {/* ===================================== */}
      {/* 2. 먼 배경 피라미드 */}
      {/* ===================================== */}

      {/* 왼쪽 작은 피라미드 */}
      <G>
        <Path d="M9 170 L42 120 L76 170 Z" fill="#FCD34D" />
        <Path d="M42 120 L76 170 L42 164 Z" fill="#DD8B2F" />
        <Path d="M15 165 L42 126 L42 165 Z" fill="#FFE18A" />
        <Path d="M42 126 L70 165 L42 164 Z" fill="#E8A33E" />
      </G>

      {/* 오른쪽 뒤편 피라미드 */}
      <G>
        <Path d="M153 158 L191 103 L231 158 Z" fill="#FCD34D" />
        <Path d="M191 103 L231 158 L191 153 Z" fill="#C9772C" />
        <Path d="M160 154 L191 109 L191 154 Z" fill="#FFE18A" />
        <Path d="M191 109 L224 154 L191 153 Z" fill="#DD8B2F" />
      </G>

      {/* ===================================== */}
      {/* 3. 메인 대피라미드 */}
      {/* ===================================== */}

      {/* 피라미드 전체 실루엣 */}
      <Path d="M48 190 L113 91 L183 190 Z" fill="#FCD34D" />

      {/* 왼쪽 햇빛을 받는 면 */}
      <Path d="M48 190 L113 91 L116 190 Z" fill="#FFE18A" />

      {/* 오른쪽 깊은 그림자 면 */}
      <Path d="M113 91 L183 190 L116 190 Z" fill="#DD8B2F" />

      {/* 왼쪽 면의 따뜻한 중간톤 */}
      <Path d="M58 184 L110 105 L109 184 Z" fill="#FCD34D" />

      {/* 오른쪽 면의 짙은 삼각형 음영 */}
      <Path d="M118 111 L173 184 L118 184 Z" fill="#C05621" opacity={0.38} />

      {/* 피라미드 돌 블록 - 왼쪽 */}
      <G stroke="#DDA83D" strokeWidth={0.8} opacity={0.8} fill="none">
        <Path d="M61 170 L145 170" />
        <Path d="M70 155 L155 155" />
        <Path d="M80 140 L144 140" />
        <Path d="M90 125 L133 125" />
        <Path d="M54 180 L166 180" />
        <Path d="M76 155 L73 170" />
        <Path d="M99 140 L96 155" />
        <Path d="M119 125 L120 140" />
      </G>

      {/* 오른쪽 면의 돌 블록 */}
      <G stroke="#B96B28" strokeWidth={0.8} opacity={0.8} fill="none">
        <Path d="M125 125 L137 140" />
        <Path d="M137 140 L149 155" />
        <Path d="M149 155 L161 170" />
        <Path d="M161 170 L173 184" />
        <Path d="M124 140 L144 140" />
        <Path d="M135 155 L155 155" />
        <Path d="M146 170 L166 170" />
      </G>

      {/* 피라미드 바닥 그림자 */}
      <Ellipse cx={117} cy={192} rx={72} ry={5} fill="#C77B34" opacity={0.3} />

      {/* ===================================== */}
      {/* 4. 스핑크스 */}
      {/* ===================================== */}

      <G>
        {/* 바닥에 드리운 그림자 */}
        <Ellipse cx={83} cy={205} rx={31} ry={4} fill="#C77B34" opacity={0.3} />

        {/* 몸통과 앞발 */}
        <Path
          d="
            M54 197
            Q57 187 69 187
            L91 189
            Q103 191 108 199
            L112 204
            L98 204
            L95 200
            L89 204
            L76 204
            L72 199
            L68 204
            L55 204
            Z
          "
          fill="#E8A33E"
        />

        {/* 몸통의 밝은 면 */}
        <Path d="M59 196 Q67 189 82 192 L84 199 L60 200 Z" fill="#FCD979" />

        {/* 목 */}
        <Path d="M70 190 L72 180 L84 180 L88 192 Z" fill="#DFA044" />

        {/* 머리와 왕관 모양의 머리 장식 */}
        <Path
          d="
            M69 181
            L66 171
            L70 166
            L83 166
            L88 173
            L87 184
            L82 190
            L73 189
            Z
          "
          fill="#F4C15E"
        />

        {/* 머리 장식의 줄무늬 */}
        <Path
          d="M68 171 Q77 176 87 171"
          stroke="#C77B34"
          strokeWidth={2}
          fill="none"
        />
        <Path
          d="M69 175 Q78 180 87 175"
          stroke="#C77B34"
          strokeWidth={1.5}
          fill="none"
        />

        {/* 얼굴 옆면 */}
        <Path d="M81 168 Q88 174 86 183 L81 189 L78 181 Z" fill="#D99537" />

        {/* 얼굴 */}
        <Circle cx={77} cy={178} r={1.2} fill="#69452D" />
        <Path
          d="M76 183 Q80 185 83 182"
          stroke="#B96B28"
          strokeWidth={1}
          fill="none"
          strokeLinecap="round"
        />

        {/* 앞발 디테일 */}
        <Path
          d="M91 202 L92 199 M97 202 L98 199 M103 202 L104 199"
          stroke="#B96B28"
          strokeWidth={1}
          strokeLinecap="round"
        />
      </G>

      {/* ===================================== */}
      {/* 5. 전경 사막 */}
      {/* ===================================== */}

      <Path
        d="
          M0 207
          Q29 195 54 205
          Q79 198 104 207
          Q133 195 160 205
          Q199 193 240 207
          L240 300 L0 300 Z
        "
        fill="#F6AD55"
      />

      {/* 앞쪽 밝은 모래 언덕 */}
      <Path
        d="
          M0 228
          Q36 214 69 228
          Q106 216 137 229
          Q185 214 240 230
          L240 300 L0 300 Z
        "
        fill="#F9C879"
      />

      {/* 오른쪽의 주황빛 모래 */}
      <Path
        d="
          M145 233
          Q191 218 240 235
          L240 300 L145 300 Z
        "
        fill="#F6AD55"
      />

      {/* 모래 언덕의 부드러운 곡선 */}
      <Path
        d="M0 246 Q44 232 87 246"
        stroke="#ED8936"
        strokeWidth={1.5}
        opacity={0.6}
        fill="none"
      />
      <Path
        d="M158 250 Q198 235 240 250"
        stroke="#ED8936"
        strokeWidth={1.5}
        opacity={0.6}
        fill="none"
      />

      {/* ===================================== */}
      {/* 6. 멀리 걷는 여행자 커플 */}
      {/* ===================================== */}

      <G>
        {/* 여행자 1 - 빨간 상의 */}
        <Circle cx={125} cy={216} r={3.5} fill="#8A5A3B" />
        <Path
          d="M121 221 Q125 219 129 221 L130 231 L120 231 Z"
          fill="#E94E43"
        />
        <Path
          d="M122 222 L117 228 M128 222 L132 226"
          stroke="#E94E43"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
        <Path
          d="M122 231 L120 238 M128 231 L130 238"
          stroke="#41536B"
          strokeWidth={2.5}
          strokeLinecap="round"
        />

        {/* 여행자 2 - 파란 상의 */}
        <Circle cx={139} cy={216} r={3.5} fill="#70492F" />
        <Path
          d="M135 221 Q139 219 143 221 L144 231 L134 231 Z"
          fill="#4296D5"
        />
        <Path
          d="M136 222 L132 226 M142 222 L147 227"
          stroke="#4296D5"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
        <Path
          d="M136 231 L134 238 M142 231 L144 238"
          stroke="#41536B"
          strokeWidth={2.5}
          strokeLinecap="round"
        />

        {/* 서로 손을 잡은 모습 */}
        <Path
          d="M132 226 L133 226"
          stroke="#F4D3AD"
          strokeWidth={2.5}
          strokeLinecap="round"
        />

        {/* 여행자 2의 초록 백팩 */}
        <Rect x={143} y={222} width={4} height={6} rx={1.5} fill="#24A95D" />
      </G>

      {/* ===================================== */}
      {/* 7. 전면 왼쪽 - 사진을 찍는 여행자 */}
      {/* ===================================== */}

      <G>
        {/* 머리 */}
        <Circle cx={35} cy={249} r={5.5} fill="#8A5A3B" />

        {/* 얼굴 */}
        <Circle cx={37} cy={250} r={0.7} fill="#49372B" />

        {/* 상의 */}
        <Path d="M29 256 Q35 253 41 256 L44 273 L27 273 Z" fill="#E94E43" />

        {/* 백팩 */}
        <Path d="M27 257 Q23 257 24 264 L28 268 L30 260 Z" fill="#24A95D" />

        {/* 팔 */}
        <Path
          d="M30 259 L24 267"
          stroke="#F4D3AD"
          strokeWidth={3.5}
          strokeLinecap="round"
        />
        <Path
          d="M40 259 L47 253"
          stroke="#F4D3AD"
          strokeWidth={3.5}
          strokeLinecap="round"
        />

        {/* 스마트폰 */}
        <G transform="rotate(-12 49 251)">
          <Rect x={45} y={246} width={7} height={11} rx={1.5} fill="#31445E" />
          <Rect
            x={46.2}
            y={247.5}
            width={4.6}
            height={7.5}
            rx={0.6}
            fill="#8BE0F4"
          />
          <Circle cx={48.5} cy={256} r={0.5} fill="#F5FAF8" />
        </G>

        {/* 다리 */}
        <Path
          d="M31 273 L29 285 M39 273 L42 285"
          stroke="#41536B"
          strokeWidth={3.5}
          strokeLinecap="round"
        />

        {/* 신발 */}
        <Path
          d="M27 285 L31 285 M40 285 L44 285"
          stroke="#F5FAF8"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
      </G>

      {/* ===================================== */}
      {/* 8. 전면 오른쪽 - 손을 흔드는 여행자 */}
      {/* ===================================== */}

      <G>
        {/* 머리 */}
        <Circle cx={202} cy={253} r={5.5} fill="#70492F" />

        {/* 얼굴 */}
        <Circle cx={204} cy={254} r={0.7} fill="#49372B" />
        <Path
          d="M203 257 Q205 258 207 256"
          stroke="#49372B"
          strokeWidth={0.8}
          fill="none"
          strokeLinecap="round"
        />

        {/* 몸통 */}
        <Path
          d="M196 260 Q202 257 208 260 L211 277 L194 277 Z"
          fill="#4296D5"
        />

        {/* 초록 백팩 */}
        <Path
          d="M195 261 Q191 261 192 267 L196 272 L198 263 Z"
          fill="#24A95D"
        />

        {/* 손을 흔드는 팔 */}
        <Path
          d="M207 262 L213 253 L216 248"
          stroke="#F4D3AD"
          strokeWidth={3.5}
          strokeLinecap="round"
          fill="none"
        />

        {/* 반대쪽 팔 */}
        <Path
          d="M197 262 L191 270"
          stroke="#F4D3AD"
          strokeWidth={3.5}
          strokeLinecap="round"
        />

        {/* 다리 */}
        <Path
          d="M198 277 L196 289 M206 277 L209 289"
          stroke="#41536B"
          strokeWidth={3.5}
          strokeLinecap="round"
        />

        {/* 신발 */}
        <Path
          d="M193 289 L198 289 M207 289 L212 289"
          stroke="#F5FAF8"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
      </G>

      {/* ===================================== */}
      {/* 9. 사막의 작은 돌과 모래 무늬 */}
      {/* ===================================== */}

      <G fill="#D8893C">
        <Ellipse cx={62} cy={285} rx={3} ry={1.5} />
        <Ellipse cx={88} cy={263} rx={2} ry={1} />
        <Ellipse cx={166} cy={282} rx={3} ry={1.5} />
        <Ellipse cx={226} cy={273} rx={2.5} ry={1.2} />
      </G>

      <G stroke="#ED8936" strokeWidth={1.5} strokeLinecap="round" fill="none">
        <Path d="M12 293 L17 291" />
        <Path d="M72 296 L78 294" />
        <Path d="M151 293 L157 291" />
        <Path d="M222 296 L228 294" />
      </G>

      {/* 작은 반짝임 */}
      {/* <G stroke="#FFF4D7" strokeWidth={1.4} strokeLinecap="round">
        <Path d="M91 198 L91 204 M88 201 L94 201" />
        <Path d="M184 225 L184 231 M181 228 L187 228" />
      </G> */}
    </>
  );
}

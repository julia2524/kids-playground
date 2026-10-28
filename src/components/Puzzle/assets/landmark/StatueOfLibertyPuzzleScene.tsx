import React from "react";
import { Rect, Path, Circle, Ellipse, G, Line } from "react-native-svg";

export function StatueOfLibertyPuzzleScene() {
  return (
    <>
      {/* ===================================== */}
      {/* 1. 하늘과 구름 */}
      {/* ===================================== */}

      <Rect x="0" y="0" width="240" height="300" fill="#4DBCEB" />

      <G fill="#F5FAF8">
        <Path d="M10 43 Q14 34 22 39 Q28 29 37 38 Q45 36 49 43 Z" />
        <Path d="M177 39 Q182 30 190 35 Q197 26 205 35 Q214 33 219 41 L219 44 L177 44 Z" />
        <Path d="M18 91 Q22 83 30 87 Q36 78 44 86 Q52 84 56 91 Z" />
      </G>

      {/* ===================================== */}
      {/* 2. 먼 하늘과 구름 산맥 */}
      {/* ===================================== */}

      <Path
        d="
          M0 133
          Q15 124 28 132
          Q38 112 55 126
          Q68 108 84 126
          Q101 114 115 132
          Q133 113 149 129
          Q165 110 181 127
          Q198 112 213 130
          Q228 121 240 132
          L240 183 L0 183 Z
        "
        fill="#B9E8E8"
      />

      <Path
        d="
          M0 148
          Q22 137 42 147
          Q64 132 84 147
          Q108 136 130 148
          Q153 133 174 146
          Q199 135 220 147
          Q232 143 240 148
          L240 187 L0 187 Z
        "
        fill="#D5F0E9"
      />

      {/* ===================================== */}
      {/* 3. 리버티 섬과 나무 */}
      {/* ===================================== */}

      <Path
        d="
          M0 157
          Q36 149 66 158
          Q103 149 132 158
          Q170 148 204 157
          Q225 152 240 158
          L240 190 L0 190 Z
        "
        fill="#78C98B"
      />

      {/* 왼쪽 숲 */}
      <G>
        <Circle cx="13" cy="151" r="12" fill="#2EAA79" />
        <Circle cx="27" cy="147" r="15" fill="#48BD7D" />
        <Circle cx="42" cy="153" r="11" fill="#218E6B" />
        <Circle cx="54" cy="150" r="12" fill="#66CC86" />
      </G>

      {/* 오른쪽 숲 */}
      <G>
        <Circle cx="188" cy="151" r="12" fill="#218E6B" />
        <Circle cx="203" cy="145" r="16" fill="#48BD7D" />
        <Circle cx="220" cy="151" r="13" fill="#2EAA79" />
        <Circle cx="234" cy="153" r="11" fill="#66CC86" />
      </G>

      {/* 섬의 잔디 */}
      <Path
        d="M0 166 Q55 159 110 166 Q177 158 240 165 L240 192 L0 192 Z"
        fill="#9BD8A0"
      />

      <Path
        d="M0 177 Q55 170 120 177 Q185 169 240 176 L240 205 L0 205 Z"
        fill="#08B98B"
      />

      {/* ===================================== */}
      {/* 4. 허드슨강 */}
      {/* ===================================== */}

      <Path
        d="
          M0 185
          Q40 179 80 185
          Q120 179 160 185
          Q205 179 240 185
          L240 300 L0 300 Z
        "
        fill="#3EAED0"
      />

      {/* 아래쪽으로 깊어지는 강물 */}
      <Path
        d="
          M0 235
          Q58 228 120 235
          Q183 228 240 235
          L240 300 L0 300 Z
        "
        fill="#2B93D3"
      />

      {/* 강물의 반짝이는 물결 */}
      <G stroke="#B8F0F0" strokeWidth="2" strokeLinecap="round" fill="none">
        <Path d="M12 201 Q21 197 30 201" />
        <Path d="M48 218 Q58 214 68 218" />
        <Path d="M173 198 Q182 194 191 198" />
        <Path d="M205 225 Q214 221 223 225" />
        <Path d="M101 248 Q112 244 123 248" />
        <Path d="M18 267 Q28 263 38 267" />
        <Path d="M158 278 Q169 274 180 278" />
      </G>

      <G stroke="#167FAF" strokeWidth="1.5" strokeLinecap="round" fill="none">
        <Path d="M81 211 L96 211" />
        <Path d="M130 229 L146 229" />
        <Path d="M49 252 L63 252" />
        <Path d="M195 257 L210 257" />
        <Path d="M112 286 L127 286" />
      </G>

      {/* ===================================== */}
      {/* 5. 자유의 여신상 받침대 그림자 */}
      {/* ===================================== */}

      <Ellipse cx="150" cy="184" rx="46" ry="7" fill="#087E68" opacity={0.2} />
      {/* ===================================== */}
      {/* 7. 자유의 여신상 드레스와 몸체 */}
      {/* ===================================== */}
      <G transform="translate(5,-15)">
        {/* ===================================== */}
        {/* 1. 드레스 전체 실루엣 */}
        {/* ===================================== */}
        <Path
          d="
      M128 103
      Q132 98 139 98
      L149 98
      Q156 100 160 106
      L166 119
      L172 139
      L163 146
      L155 136
      L154 144
      Q145 151 135 147
      L128 144
      L123 135
      L116 145
      L108 140
      L116 119
      L122 108
      Q124 105 128 103
      Z
    "
          fill="#6AD1C8"
        />

        {/* 왼쪽에서 들어오는 밝은 면 */}
        <Path
          d="
      M128 103
      Q132 98 139 98
      L144 100
      L139 115
      L137 133
      L145 149
      L135 147
      L128 144
      L123 135
      L116 145
      L108 140
      L116 119
      L122 108
      Z
    "
          fill="#8DE5DC"
        />

        {/* 오른쪽 측면의 깊은 음영 */}
        <Path
          d="
      M149 99
      Q156 100 160 106
      L166 119
      L172 139
      L163 146
      L155 136
      L154 144
      Q150 147 145 149
      L145 130
      L149 115
      Z
    "
          fill="#41A8A0"
        />

        {/* 드레스의 입체적인 주름 */}
        <G stroke="#369D97" strokeWidth={1.5} strokeLinecap="round" fill="none">
          <Path d="M131 110 Q136 123 130 141" />
          <Path d="M140 110 Q145 127 142 145" />
          <Path d="M151 110 Q155 123 153 136" />
          <Path d="M121 121 Q119 131 115 138" />
        </G>

        {/* 드레스 중앙의 밝은 반사광 */}
        <Path
          d="M137 106 Q140 120 137 133"
          stroke="#B4F1E9"
          strokeWidth={1.5}
          strokeLinecap="round"
          fill="none"
        />

        {/* ===================================== */}
        {/* 2. 목과 얼굴 */}
        {/* ===================================== */}

        {/* 목 */}
        <Path d="M137 91 L149 91 L150 102 Q145 106 139 102 Z" fill="#6AD1C8" />

        {/* 얼굴 */}
        <Ellipse cx={143} cy={84} rx={9} ry={12} fill="#8DE5DC" />

        {/* 얼굴 오른쪽의 부드러운 음영 */}
        <Path
          d="
      M145 73
      Q152 76 152 84
      Q152 92 146 96
      L145 85
      Z
    "
          fill="#6AD1C8"
        />

        {/* 옆으로 살짝 돌아간 얼굴과 머리 */}
        <Path
          d="
      M134 84
      Q131 76 137 71
      Q144 67 151 72
      Q155 76 154 82
      L150 79
      L146 76
      L139 78
      L138 89
      L134 92
      Z
    "
          fill="#41A8A0"
        />

        {/* 얼굴의 코와 턱선을 살짝 표현 */}
        <Path
          d="M151 83 L154 86 L151 88"
          stroke="#6AD1C8"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* 얼굴 표정 */}
        <G stroke="#287F7B" strokeWidth={1.2} strokeLinecap="round" fill="none">
          <Path d="M139 83 L141 83" />
          <Path d="M146 83 L148 83" />
          <Path d="M141 90 Q144 92 147 90" />
        </G>

        {/* ===================================== */}
        {/* 3. 왕관 - 좌우 균형을 맞춘 일곱 개의 가시 */}
        {/* ===================================== */}

        <Path
          d="
      M132 77
      L126 65
      L135 71
      L136 60
      L142 70
      L145 57
      L149 70
      L156 60
      L155 72
      L164 65
      L157 79
      Q145 82 132 77
      Z
    "
          fill="#6AD1C8"
          stroke="#41A8A0"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />

        {/* 왕관 중앙의 밝은 면 */}
        <Path d="M136 72 L136 62 L142 72 L145 59 L145 77 Z" fill="#8DE5DC" />

        {/* 왕관 띠 */}
        <Path
          d="M132 76 Q145 81 158 76 L157 82 Q145 86 133 81 Z"
          fill="#41A8A0"
        />

        {/* 왕관 띠의 하이라이트 */}
        <Path
          d="M134 77 Q145 81 156 77"
          stroke="#8DE5DC"
          strokeWidth={1.2}
          strokeLinecap="round"
          fill="none"
        />

        {/* ===================================== */}
        {/* 4. 오른팔 - 화면 왼쪽 위로 횃불을 든 팔 */}
        {/* ===================================== */}

        {/* 어깨에서 팔꿈치까지 */}
        <Path
          d="M130 105 Q124 101 120 94"
          stroke="#6AD1C8"
          strokeWidth={10}
          strokeLinecap="round"
          fill="none"
        />

        {/* 팔꿈치에서 손목까지 곧게 뻗은 팔 */}
        <Path
          d="M120 94 Q115 84 109 65"
          stroke="#6AD1C8"
          strokeWidth={9}
          strokeLinecap="round"
          fill="none"
        />

        {/* 팔의 밝은 면 */}
        <Path
          d="M128 103 Q122 96 119 92 Q114 81 109 66"
          stroke="#8DE5DC"
          strokeWidth={3}
          strokeLinecap="round"
          fill="none"
        />

        {/* 손 */}
        <Path
          d="
      M106 66
      Q102 64 103 60
      L106 56
      Q109 54 111 58
      L112 64
      Q110 68 106 66
      Z
    "
          fill="#6AD1C8"
        />

        {/* 횃불 손잡이 */}
        <Path
          d="M104 61 L110 61 L110 45 L104 45 Z"
          fill="#D69E2E"
          stroke="#B98222"
          strokeWidth={0.8}
        />

        {/* 손잡이의 빛 반사 */}
        <Path
          d="M106 59 L106 47"
          stroke="#FFF4D7"
          strokeWidth={1.4}
          strokeLinecap="round"
        />

        {/* 횃불 받침 */}
        <Path
          d="M101 46 L113 46 L111 42 L103 42 Z"
          fill="#ECC94B"
          stroke="#D69E2E"
          strokeWidth={0.8}
        />

        {/* 횃불 바깥쪽 불꽃 */}
        <Path
          d="
      M107 43
      Q99 37 104 29
      Q106 33 109 34
      Q115 27 111 21
      Q122 31 116 40
      Q113 45 107 43
      Z
    "
          fill="#E94E43"
        />

        {/* 불꽃 안쪽 */}
        <Path
          d="
      M108 41
      Q104 36 108 31
      Q110 35 113 36
      Q116 40 111 42
      Z
    "
          fill="#F4D84D"
        />

        {/* ===================================== */}
        {/* 5. 왼팔 - 화면 오른쪽 품에 책자를 안은 팔 */}
        {/* ===================================== */}

        {/* 어깨에서 팔꿈치까지 */}
        <Path
          d="M153 105 Q160 108 160 116"
          stroke="#6AD1C8"
          strokeWidth={9}
          strokeLinecap="round"
          fill="none"
        />

        {/* 팔꿈치에서 책자를 받치는 손까지 */}
        <Path
          d="M160 116 Q160 124 155 130"
          stroke="#6AD1C8"
          strokeWidth={8}
          strokeLinecap="round"
          fill="none"
        />

        {/* 팔의 밝은 면 */}
        <Path
          d="M154 106 Q158 111 158 116 Q158 123 155 127"
          stroke="#8DE5DC"
          strokeWidth={2.5}
          strokeLinecap="round"
          fill="none"
        />

        {/* ===================================== */}
        {/* 6. 독립선언서 - 몸통 오른쪽에 비스듬히 */}
        {/* ===================================== */}

        {/* 책자 그림자 */}
        <Path
          d="M148 111 L163 114 L161 135 L146 132 Z"
          fill="#369D97"
          opacity={0.35}
        />

        {/* 책자 본체 */}
        <Path
          d="M147 109 L162 112 L160 133 L145 130 Z"
          fill="#E8CFA0"
          stroke="#41A8A0"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />

        {/* 책자 표지의 밝은 면 */}
        <Path d="M147 109 L153 110 L151 131 L145 130 Z" fill="#FFF4D7" />

        {/* 책등 */}
        <Path d="M153 110 L155 111 L153 132 L151 131 Z" fill="#D5B984" />

        {/* 책자 상단 장식 */}
        <Path d="M147 109 L162 112 L161 116 L146 113 Z" fill="#F7E6BE" />

        {/* 책자 글줄 */}
        <G stroke="#B99B68" strokeWidth={1} strokeLinecap="round" fill="none">
          <Path d="M150 117 L158 119" />
          <Path d="M149 121 L157 123" />
          <Path d="M148 125 L156 127" />
        </G>

        {/* 책자를 감싸 쥔 손 */}
        <Path
          d="
      M153 127
      Q157 126 159 129
      Q160 132 156 134
      L151 133
      Q149 131 153 127
      Z
    "
          fill="#8DE5DC"
          stroke="#41A8A0"
          strokeWidth={0.8}
        />

        {/* 손가락 디테일 */}
        <Path
          d="M153 130 Q155 131 157 130"
          stroke="#41A8A0"
          strokeWidth={1}
          strokeLinecap="round"
          fill="none"
        />

        {/* ===================================== */}
        {/* 7. 몸통 장식과 드레스 밑단 */}
        {/* ===================================== */}

        {/* 가슴 부분의 옷 주름 */}
        <Path
          d="M135 104 L142 108 L150 104"
          stroke="#B4F1E9"
          strokeWidth={1.5}
          fill="none"
          strokeLinecap="round"
        />

        {/* 드레스 하단의 장식선 */}
        <Path
          d="M115 140 Q140 153 166 140"
          stroke="#8DE5DC"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
        />
      </G>

      {/* ===================================== */}
      {/* 6. 석조 대좌 */}
      {/* ===================================== */}

      <G>
        {/* 대좌의 뒤쪽 상단 */}
        <Path d="M113 128 L174 128 L186 139 L101 139 Z" fill="#FFF4D7" />

        {/* 대좌 본체 */}
        <Path d="M108 138 L179 138 L183 165 L104 165 Z" fill="#E8CFA0" />

        {/* 왼쪽 밝은 면 */}
        <Path d="M108 138 L121 138 L119 165 L104 165 Z" fill="#FFF4D7" />

        {/* 오른쪽 음영 */}
        <Path d="M165 138 L179 138 L183 165 L165 165 Z" fill="#D5C19A" />

        {/* 세로 석조 분할선 */}
        <G stroke="#C5A66D" strokeWidth="1.2">
          <Path d="M128 141 L128 162" />
          <Path d="M145 141 L145 162" />
          <Path d="M160 141 L160 162" />
        </G>

        {/* 아치형 창문 */}
        <G fill="#75B8CB" stroke="#B99B68" strokeWidth="1">
          <Path d="M117 160 L117 149 Q117 144 121 144 Q125 144 125 149 L125 160 Z" />
          <Path d="M135 160 L135 149 Q135 144 139 144 Q143 144 143 149 L143 160 Z" />
          <Path d="M152 160 L152 149 Q152 144 156 144 Q160 144 160 149 L160 160 Z" />
        </G>

        {/* 창문 반사광 */}
        <G stroke="#D7F5F2" strokeWidth="1.2" strokeLinecap="round">
          <Path d="M120 148 L120 154" />
          <Path d="M138 148 L138 154" />
          <Path d="M155 148 L155 154" />
        </G>

        {/* 대좌 중간 단 */}
        <Path d="M99 164 L188 164 L194 171 L93 171 Z" fill="#FFF4D7" />

        <Path d="M93 171 L194 171 L191 179 L96 179 Z" fill="#D5C19A" />

        <Path d="M99 164 L188 164 L188 168 L97 168 Z" fill="#E8CFA0" />

        {/* 최하단 계단 */}
        <Path d="M86 178 L201 178 L208 185 L79 185 Z" fill="#FFF4D7" />

        <Path d="M79 185 L208 185 L204 190 L83 190 Z" fill="#D5C19A" />

        <Path d="M86 178 L201 178 L201 181 L83 181 Z" fill="#E8CFA0" />
      </G>

      {/* ===================================== */}
      {/* 11. 섬의 작은 산책로 */}
      {/* ===================================== */}

      <Path d="M0 188 Q44 181 79 188 L79 196 Q40 191 0 197 Z" fill="#E8CFA0" />

      <Path
        d="M0 190 Q42 184 79 190"
        stroke="#FFF4D7"
        strokeWidth="2"
        fill="none"
      />

      {/* ===================================== */}
      {/* 12. 왼쪽 앞쪽 페리 */}
      {/* ===================================== */}

      <G>
        {/* 배의 그림자 */}
        <Ellipse
          cx="52"
          cy="263"
          rx="43"
          ry="7"
          fill="#176F91"
          opacity={0.25}
        />

        {/* 선체 */}
        <Path
          d="
            M7 247
            L93 247
            L82 268
            Q76 275 64 276
            L29 271
            Q18 267 7 247
            Z
          "
          fill="#0B6B8A"
        />

        {/* 선체 밝은 면 */}
        <Path d="M7 247 L93 247 L87 255 L12 255 Z" fill="#2B93D3" />

        {/* 갑판 */}
        <Path d="M15 228 L82 228 L93 247 L7 247 Z" fill="#F5FAF8" />

        {/* 갑판 가장자리 */}
        <Path d="M15 228 L82 228" stroke="#D9E5D8" strokeWidth="2" />

        {/* 선실 */}
        <Path d="M29 210 L66 210 L75 228 L21 228 Z" fill="#FFFDF4" />

        {/* 선실 지붕 */}
        <Path d="M25 207 L69 207 L73 212 L21 212 Z" fill="#F5FAF8" />

        {/* 선실 창문 */}
        <G fill="#75B8CB">
          <Rect x="29" y="215" width="8" height="8" rx="1" />
          <Rect x="41" y="215" width="8" height="8" rx="1" />
          <Rect x="53" y="215" width="8" height="8" rx="1" />
        </G>

        {/* 선실 창문 반사광 */}
        <G stroke="#D7F5F2" strokeWidth="1" strokeLinecap="round">
          <Path d="M31 217 L31 220" />
          <Path d="M43 217 L43 220" />
          <Path d="M55 217 L55 220" />
        </G>

        {/* 상부 갑판 난간 */}
        <G stroke="#D9E5D8" strokeWidth="1.5" strokeLinecap="round" fill="none">
          <Path d="M18 231 L79 231" />
          <Path d="M21 231 L21 238" />
          <Path d="M34 231 L34 238" />
          <Path d="M47 231 L47 238" />
          <Path d="M60 231 L60 238" />
          <Path d="M73 231 L73 238" />
        </G>

        {/* 배 앞쪽 물보라 */}
        <Path
          d="M13 273 Q24 269 34 274 Q44 278 53 274"
          stroke="#C5F2F0"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </G>

      {/* ===================================== */}
      {/* 13. 페리의 여행자 1 - 손 흔들기 */}
      {/* ===================================== */}

      <G>
        <Circle cx="36" cy="198" r="4" fill="#754A30" />

        <Path d="M32 203 L40 203 L43 216 L29 216 Z" fill="#E94E43" />

        {/* 손을 흔드는 팔 */}
        <Path
          d="M32 205 L27 198 L29 192"
          stroke="#F2C9A3"
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="none"
        />

        <Path
          d="M40 205 L44 211"
          stroke="#F2C9A3"
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="none"
        />

        <Path
          d="M33 216 L32 224 M39 216 L41 224"
          stroke="#384B68"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
      </G>

      {/* ===================================== */}
      {/* 14. 페리의 여행자 2 - 사진 찍기 */}
      {/* ===================================== */}

      <G>
        <Circle cx="64" cy="197" r="4" fill="#583D2C" />

        <Path d="M60 202 L68 202 L71 215 L57 215 Z" fill="#F4D84D" />

        {/* 팔 */}
        <Path
          d="M61 204 L57 198 L62 193"
          stroke="#F2C9A3"
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="none"
        />

        <Path
          d="M67 204 L72 199"
          stroke="#F2C9A3"
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* 스마트폰 */}
        <Rect x="60" y="189" width="6" height="9" rx="1" fill="#344C69" />

        <Rect x="61.5" y="190.5" width="3" height="5" rx="0.5" fill="#B8F0F0" />

        <Path
          d="M61 215 L60 224 M67 215 L69 224"
          stroke="#344C69"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
      </G>

      {/* ===================================== */}
      {/* 15. 페리의 앞쪽 난간 */}
      {/* ===================================== */}

      <G stroke="#E5F0D0" strokeWidth="1.8" strokeLinecap="round" fill="none">
        <Path d="M11 239 L89 239" />
        <Path d="M15 239 L15 246" />
        <Path d="M29 239 L29 246" />
        <Path d="M43 239 L43 246" />
        <Path d="M57 239 L57 246" />
        <Path d="M71 239 L71 246" />
        <Path d="M85 239 L85 246" />
      </G>

      {/* ===================================== */}
      {/* 16. 전경의 물결 장식 */}
      {/* ===================================== */}

      <G stroke="#B8F0F0" strokeWidth="1.8" strokeLinecap="round" fill="none">
        <Path d="M105 265 Q113 262 121 265" />
        <Path d="M139 250 Q147 247 155 250" />
        <Path d="M187 241 Q195 238 203 241" />
        <Path d="M91 291 Q99 288 107 291" />
        <Path d="M187 286 Q195 283 203 286" />
      </G>

      {/* ===================================== */}
      {/* 17. 작은 햇빛 반짝임 */}
      {/* ===================================== */}

      <G stroke="#FFF4D7" strokeWidth="1.5" strokeLinecap="round">
        <Path d="M202 65 L202 73" />
        <Path d="M198 69 L206 69" />
        <Path d="M45 109 L45 115" />
        <Path d="M42 112 L48 112" />
      </G>
    </>
  );
}

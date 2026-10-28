import React from "react";
import { Rect, Path, Circle, Ellipse, G } from "react-native-svg";

export function EiffelTowerPuzzleScene() {
  return (
    <>
      {/* 하늘 */}
      <Rect x="0" y="0" width="240" height="300" fill="#4DBCEB" />

      {/* 구름 */}
      <G fill="#F5FAF8">
        <Path d="M12 55 Q15 48 22 51 Q27 42 35 49 Q43 47 46 55 Z" />
        <Path d="M155 30 Q159 23 166 27 Q172 18 180 26 Q188 25 191 30 Z" />
        <Path d="M205 82 Q210 75 216 80 Q222 72 229 82 Z" />
      </G>

      {/* 먼 산과 둥근 수목 배경 */}
      <Path
        d="M0 158 Q18 144 35 158 Q50 139 68 157
           Q88 143 105 158 Q125 141 143 157
           Q164 143 184 157 Q213 138 240 158
           L240 200 L0 200 Z"
        fill="#B9E8E8"
      />

      {/* 에펠탑 본체 */}
      <G>
        {/* 첨탑 */}
        <Path d="M151 22 L149 37 L153 37 Z" fill="#D69A39" />
        <Rect x="149" y="18" width="4" height="5" fill="#E8B74D" />

        {/* 상단 안테나와 기둥 */}
        <Path d="M151 36 L144 83 L157 83 Z" fill="#E9B84D" />

        {/* 탑의 외곽 */}
        <Path
          d="M144 75
             L133 116
             L111 172
             L120 172
             L141 129
             L151 91
             L162 129
             L182 172
             L191 172
             L169 116
             L158 75 Z"
          fill="#F0C45B"
        />

        {/* 철골의 밝은 면 */}
        <Path
          d="M145 82 L138 116 L151 91
             L148 121 L120 168 L128 168
             L146 128 L153 92 Z"
          fill="#FFE18A"
        />

        {/* 철골의 어두운 면 */}
        <Path
          d="M157 83 L165 116 L153 92
             L157 122 L183 168 L175 168
             L158 128 L151 92 Z"
          fill="#DFA63F"
        />

        {/* 상단 전망대 */}
        <Path
          d="M141 79 L161 79 L164 84
             L139 84 Z"
          fill="#C78D31"
        />
        <Rect x="140" y="76" width="22" height="3" fill="#FBE18A" />

        {/* 중간 전망대 */}
        <Path
          d="M130 112 L172 112 L176 118
             L126 118 Z"
          fill="#C78D31"
        />
        <Rect x="128" y="109" width="46" height="3" fill="#FFE18A" />

        {/* 하부 전망대 */}
        <Path
          d="M115 148 L187 148 L190 153
             L112 153 Z"
          fill="#C78D31"
        />
        <Rect x="114" y="145" width="72" height="3" fill="#FFE18A" />

        {/* 철골 가로 연결선 */}
        <G stroke="#C58B32" strokeWidth="1.5" fill="none">
          <Path d="M140 91 L163 105" />
          <Path d="M163 91 L140 105" />
          <Path d="M130 120 L169 142" />
          <Path d="M169 120 L130 142" />
          <Path d="M124 154 L181 170" />
          <Path d="M181 154 L124 170" />
        </G>

        {/* 하부 아치 */}
        <Path
          d="M139 172
             L143 156
             Q151 145 159 156
             L164 172 Z"
          fill="#4DBCEB"
        />

        {/* 아치 경계 */}
        <Path
          d="M139 172 L143 156 Q151 145 159 156 L164 172"
          stroke="#D49A37"
          strokeWidth="2"
          fill="none"
        />

        {/* 탑 기초 */}
        <Path d="M107 172 L123 172 L121 176 L104 176 Z" fill="#D69A39" />
        <Path d="M179 172 L195 172 L198 176 L181 176 Z" fill="#D69A39" />
      </G>

      {/* 지평선 */}
      <Rect x="0" y="176" width="240" height="8" fill="#9BD8A0" />

      {/* 잔디 */}
      <Rect x="0" y="184" width="240" height="116" fill="#08B98B" />

      {/* 왼쪽 나무 */}
      <G>
        <Path
          d="M13 205 L13 229 M23 210 L23 229"
          stroke="#8A6A40"
          strokeWidth="2"
        />
        <Circle cx="13" cy="204" r="9" fill="#24A95D" />
        <Circle cx="7" cy="209" r="6" fill="#39C66C" />
        <Circle cx="20" cy="208" r="7" fill="#119B53" />
        <Circle cx="23" cy="211" r="5" fill="#48CE6C" />
      </G>

      {/* 오른쪽 나무 */}
      <G>
        <Path
          d="M222 204 L222 231 M231 210 L231 231"
          stroke="#8A6A40"
          strokeWidth="2"
        />
        <Circle cx="222" cy="203" r="10" fill="#159D52" />
        <Circle cx="215" cy="208" r="7" fill="#3ACB68" />
        <Circle cx="230" cy="207" r="8" fill="#27B95C" />
        <Circle cx="233" cy="213" r="5" fill="#54D779" />
      </G>

      {/* 작은 여행자 1 */}
      <G>
        <Circle cx="48" cy="253" r="4" fill="#633D27" />
        <Path d="M45 258 L52 258 L55 274 L43 274 Z" fill="#E94E43" />
        <Path
          d="M45 261 L39 271 M52 261 L57 270"
          stroke="#E94E43"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <Path
          d="M46 274 L44 285 M51 274 L54 285"
          stroke="#384B68"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <Path
          d="M43 259 L38 272"
          stroke="#F4D3AD"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </G>

      {/* 작은 여행자 2 */}
      <G>
        <Circle cx="91" cy="261" r="4" fill="#583D2C" />
        <Path d="M87 266 L95 266 L97 278 L85 278 Z" fill="#F4D84D" />
        <Path
          d="M87 278 L85 287 M94 278 L97 287"
          stroke="#334B70"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <Path
          d="M87 268 L81 275 M95 268 L101 274"
          stroke="#F4D84D"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </G>

      {/* 작은 여행자 3 */}
      <G>
        <Circle cx="177" cy="250" r="4" fill="#654832" />
        <Path d="M173 255 L181 255 L185 270 L171 270 Z" fill="#57D3D5" />
        <Path
          d="M174 270 L171 281 M181 270 L184 281"
          stroke="#344C69"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <Path
          d="M173 257 L168 267 M181 257 L187 265"
          stroke="#F2C9A3"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </G>

      {/* 잔디 장식 */}
      <G stroke="#078D6C" strokeWidth="1.5" strokeLinecap="round">
        <Path d="M30 292 L32 287 M32 292 L36 288" />
        <Path d="M115 292 L117 286 M118 292 L121 288" />
        <Path d="M205 292 L208 286 M208 292 L212 288" />
      </G>
    </>
  );
}

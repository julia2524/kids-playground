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

export type FoodBackgroundKind =
  | "food"
  | "fruit"
  | "vegetable"
  | "meal"
  | "snack"
  | "drink";

type Props = { width?: number | string; height?: number | string };

function FoodTableScene() {
  return (
    <>
      <Defs>
        {/* 더 환하고 화사한 크림 버터빛 벽면 그라데이션 */}
        <LinearGradient id="foodWall" x1="0" x2="0" y1="0" y2="1">
          <Stop offset="0" stopColor="#FFFCF4" />
          <Stop offset="1" stopColor="#FFEECE" />
        </LinearGradient>

        {/* 맑고 화사한 밝은 우드 식탁 그라데이션 */}
        <LinearGradient id="foodTable" x1="0" x2="0" y1="0" y2="1">
          <Stop offset="0" stopColor="#F5D0A1" />
          <Stop offset="1" stopColor="#DEAB72" />
        </LinearGradient>

        {/* 뽀얗고 환한 스노우 도자기 접시 */}
        <LinearGradient id="foodPlate" x1="0" x2="0" y1="0" y2="1">
          <Stop offset="0" stopColor="#FFFFFF" />
          <Stop offset="1" stopColor="#F5F3EC" />
        </LinearGradient>

        {/* 맑고 깨끗한 실버 커트러리 */}
        <LinearGradient id="foodMetal" x1="0" x2="1" y1="0" y2="0">
          <Stop offset="0" stopColor="#E2ECEF" />
          <Stop offset="0.35" stopColor="#FFFFFF" />
          <Stop offset="0.7" stopColor="#EEF4F6" />
          <Stop offset="1" stopColor="#C9D6DD" />
        </LinearGradient>

        {/* 맑고 청량한 투명 유리잔 */}
        <LinearGradient id="foodGlass" x1="0" x2="1" y1="0" y2="0">
          <Stop offset="0" stopColor="#E2F8FC" />
          <Stop offset="0.35" stopColor="#FFFFFF" />
          <Stop offset="0.7" stopColor="#D5F4FA" />
          <Stop offset="1" stopColor="#B3E9F2" />
        </LinearGradient>
      </Defs>

      {/* 화사한 실내 배경 */}
      <Rect fill="url(#foodWall)" height="240" width="320" />

      {/* 동화책 느낌의 은은한 햇살 빛무리 효과 (환한 느낌 극대화) */}
      <Circle cx="70" cy="45" r="60" fill="#FFFFFF" opacity=".6" />
      <Circle cx="260" cy="40" r="80" fill="#FFFBE6" opacity=".5" />

      {/* 식탁 영역 */}
      <Path d="M0 68 Q80 63 160 68 T320 68 V240 H0Z" fill="url(#foodTable)" />

      {/* 부드럽고 환한 식탁 나뭇결 */}
      <Path
        d="M0 95 Q82 90 160 95 T320 93"
        fill="none"
        opacity=".7"
        stroke="#F0C79A"
        strokeWidth="2"
      />
      <Path
        d="M0 165 Q85 160 170 165 T320 162"
        fill="none"
        opacity=".45"
        stroke="#CC9B6A"
        strokeWidth="2"
      />

      {/* 물컵 & 그림자 그룹 */}
      <G transform="translate(-45,-15)">
        <Ellipse
          cx="160"
          cy="116"
          fill="#B58D5F"
          opacity=".15"
          rx="22"
          ry="5"
        />

        <Path
          d="M145 74
            Q145 71 149 71
            H171
            Q175 71 175 74
            L172 112
            Q171 119 165 120
            H155
            Q149 119 148 112Z"
          fill="url(#foodGlass)"
          stroke="#A6E2EC"
          strokeWidth="1.8"
        />

        <Path
          d="M149 90 Q160 87 171 90 L169 108
            Q168 114 164 115 H156
            Q151 114 151 108Z"
          fill="#CBEFF7"
          opacity=".75"
        />

        <Path
          d="M151 77 L153 104"
          opacity=".95"
          stroke="#FFFFFF"
          strokeLinecap="round"
          strokeWidth="3"
        />
        <Path
          d="M169 78 L168 88"
          stroke="#FFFFFF"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <Ellipse
          cx="160"
          cy="74"
          fill="#FFFFFF"
          rx="11"
          ry="2.8"
          stroke="#A6E2EC"
          strokeWidth="1.5"
        />
      </G>

      {/* 접시 & 커트러리 그룹 */}
      <G transform="translate(0, -25)">
        <Ellipse
          cx="160"
          cy="182"
          fill="#9E7048"
          opacity=".15"
          rx="74"
          ry="44"
        />

        <Ellipse
          cx="160"
          cy="175"
          fill="url(#foodPlate)"
          rx="73"
          ry="43"
          stroke="#EAE4D9"
          strokeWidth="2"
        />

        <Ellipse
          cx="160"
          cy="172"
          fill="#FFFFFF"
          rx="58"
          ry="32"
          stroke="#F1ECE4"
          strokeWidth="2"
        />

        <Path
          d="M103 168 Q110 142 153 137"
          fill="none"
          opacity=".95"
          stroke="#FFFFFF"
          strokeLinecap="round"
          strokeWidth="3"
        />

        {/* 왼쪽 포크 */}
        <G transform="translate(60 169) rotate(-9)">
          <Rect
            fill="url(#foodMetal)"
            height="45"
            rx="4"
            stroke="#C9D6DD"
            strokeWidth="1.2"
            width="10"
            x="-5"
            y="-1"
          />
          <Path
            d="M-7 -22
              Q-7 -26 -4 -26
              V-11
              Q-2 -8 0 -11
              V-27
              Q3 -27 3 -23
              V-11
              Q5 -8 7 -11
              V-23
              Q7 -26 9 -24
              V-8
              Q9 -2 2 1
              L2 5 H-2 L-2 1
              Q-9 -2 -9 -8
              V-24
              Q-9 -26 -7 -22Z"
            fill="url(#foodMetal)"
            stroke="#C9D6DD"
            strokeLinejoin="round"
            strokeWidth="1.2"
          />
          <Path
            d="M-2 7 V38"
            opacity=".95"
            stroke="#FFFFFF"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
        </G>

        {/* 오른쪽 숟가락 */}
        <G transform="translate(260 169) rotate(9)">
          <Rect
            fill="url(#foodMetal)"
            height="44"
            rx="4"
            stroke="#C9D6DD"
            strokeWidth="1.2"
            width="10"
            x="-5"
            y="1"
          />
          <Ellipse
            cx="0"
            cy="-13"
            fill="url(#foodMetal)"
            rx="9"
            ry="13"
            stroke="#C9D6DD"
            strokeWidth="1.2"
          />
          <Ellipse
            cx="-2"
            cy="-15"
            fill="#FFFFFF"
            opacity=".8"
            rx="3.5"
            ry="7"
          />
          <Path
            d="M-2 6 V38"
            opacity=".95"
            stroke="#FFFFFF"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
        </G>
      </G>

      {/* 식탁 앞쪽 가장자리 입체감 */}
      <Path d="M0 224 Q80 219 160 224 T320 221 V240 H0Z" fill="#CCA071" />
      <Path
        d="M0 225 Q80 220 160 225 T320 222"
        fill="none"
        stroke="#FFE3C2"
        strokeWidth="2"
      />
    </>
  );
}

function FruitScene() {
  return (
    <>
      <Defs>
        {/* 아주 부드럽고 차분한 밀크 크림 벽면 */}
        <LinearGradient id="fruitWall" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFFDF9" />
          <Stop offset="1" stopColor="#F9F3EA" />
        </LinearGradient>

        {/* 채도를 뺀 은은한 연아이보리 우드 식탁 */}
        <LinearGradient id="fruitTable" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FAF1E6" />
          <Stop offset="1" stopColor="#EFE3D3" />
        </LinearGradient>

        {/*Soft 베이지 등나무 바구니 */}
        <LinearGradient id="fruitBasket" x1="0" y1="0" x2="0.8" y2="1">
          <Stop offset="0" stopColor="#EBDCC8" />
          <Stop offset="0.55" stopColor="#DBC6AC" />
          <Stop offset="1" stopColor="#C9B397" />
        </LinearGradient>

        {/* 연한 파스텔 피치 사과 */}
        <LinearGradient id="appleRed" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FFC2B8" />
          <Stop offset="1" stopColor="#F29E94" />
        </LinearGradient>

        {/* 연한 크림버터 배 */}
        <LinearGradient id="pearYellow" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FFF8D6" />
          <Stop offset="1" stopColor="#EFE0A3" />
        </LinearGradient>

        {/* 은은한 파스텔 올리브 배 */}
        <LinearGradient id="pearGreen" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#E2F0C8" />
          <Stop offset="1" stopColor="#B3D194" />
        </LinearGradient>
      </Defs>

      {/* 포근한 배경 */}
      <Rect width="320" height="240" fill="url(#fruitWall)" />

      {/* 은은한 햇살 (투명하게) */}
      <Circle cx="80" cy="40" r="70" fill="#FFFFFF" opacity=".45" />
      <Circle cx="250" cy="50" r="90" fill="#FFFDF5" opacity=".4" />

      {/* 경계선 및 식탁 */}
      <Path
        d="M0 100 Q80 94 160 100 T320 98 V240 H0Z"
        fill="url(#fruitTable)"
      />

      {/* 식탁 나뭇결 (매우 옅게) */}
      <Path
        d="M0 126 Q75 120 145 126 T320 124"
        fill="none"
        stroke="#E2D4C3"
        strokeWidth="1.5"
        opacity=".5"
      />
      <Path
        d="M0 211 Q80 205 160 211 T320 209"
        fill="none"
        stroke="#D8C8B5"
        strokeWidth="1.5"
        opacity=".35"
      />

      {/* 아주 연한 바구니 그림자 */}
      <Ellipse cx="160" cy="183" rx="90" ry="18" fill="#B39F8A" opacity=".12" />

      {/* 바구니 손잡이 */}
      <Path
        d="M91 154 C89 113 111 86 160 85 C209 86 231 113 229 154"
        fill="none"
        stroke="#D5BF9F"
        strokeWidth="10"
        strokeLinecap="round"
        opacity=".8"
      />
      <Path
        d="M93 151 C93 117 116 94 160 93 C204 94 227 117 227 151"
        fill="none"
        stroke="#FAF1E0"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* 과일 요소들 (채소/과일이 배경에 묻히지 않도록 투명도 및 파스텔톤 적용) */}
      <G opacity=".82">
        {/* 사과 */}
        <G transform="translate(-5,20)">
          <Path
            d="M111 137 C96 126 98 105 111 98 C120 93 129 99 135 104 C144 98 153 97 160 105 C172 119 163 139 151 147 C140 155 121 151 111 137Z"
            fill="url(#appleRed)"
            stroke="#E28B82"
            strokeWidth="1.2"
          />
          <Path
            d="M135 104 Q135 98 140 94"
            fill="none"
            stroke="#A89280"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <Path d="M139 98 Q147 89 155 94 Q149 102 139 98Z" fill="#A8CD8C" />
        </G>

        {/* 배 */}
        <G transform="translate(-15, 10)">
          <Path
            d="M177 105 C174 117 164 126 165 137 C166 151 179 158 193 153 C208 148 212 136 203 124 C196 115 192 108 193 99 Q186 105 177 105Z"
            fill="url(#pearYellow)"
            stroke="#D8CA8D"
            strokeWidth="1.2"
          />
          <Path
            d="M190 103 Q190 96 195 91"
            fill="none"
            stroke="#A89280"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <Path d="M194 97 Q204 90 210 96 Q204 104 194 97Z" fill="#A8CD8C" />
        </G>

        {/* 초록 배 */}
        <G transform="translate(-15,5)">
          <Path
            d="M218 121 C214 131 207 139 209 148 C212 161 227 166 240 158 C251 151 252 140 242 131 C236 125 233 117 235 111 Q228 119 218 121Z"
            fill="url(#pearGreen)"
            stroke="#9DC07A"
            strokeWidth="1.2"
          />
          <Path
            d="M234 115 Q234 109 239 105"
            fill="none"
            stroke="#A89280"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </G>
      </G>

      {/* 바구니 몸체 (부드러운 베이지/크림 톤) */}
      <Path
        d="M75 145 Q160 158 245 145 L226 194 Q222 204 211 207 Q160 218 109 207 Q98 204 94 194Z"
        fill="url(#fruitBasket)"
        stroke="#C2AB8E"
        strokeWidth="1.5"
      />

      {/* 세로/가로 결 (은은한 콘트라스트) */}
      <G fill="none" strokeLinecap="round" strokeWidth="4" opacity=".8">
        <Path d="M99 154 Q104 179 112 201" stroke="#F5E8D3" />
        <Path d="M121 157 Q125 183 128 208" stroke="#F5E8D3" />
        <Path d="M144 159 Q145 187 145 212" stroke="#F5E8D3" />
        <Path d="M166 159 Q166 187 166 212" stroke="#F5E8D3" />
        <Path d="M188 157 Q184 184 183 209" stroke="#F5E8D3" />
        <Path d="M210 153 Q204 181 200 203" stroke="#F5E8D3" />
        <Path d="M230 150 Q222 177 217 197" stroke="#F5E8D3" />
      </G>

      <Path
        d="M87 164 Q160 177 233 163 M92 179 Q160 192 228 178 M98 194 Q160 207 221 193"
        fill="none"
        stroke="#BCA68C"
        strokeWidth="3"
        opacity=".4"
      />

      {/* 바구니 윗단 */}
      <Path
        d="M76 144 Q160 158 244 144 L241 154 Q160 169 79 154Z"
        fill="#DFCAB1"
        stroke="#C0A98E"
        strokeWidth="1.5"
      />
    </>
  );
}

function VegetableScene() {
  return (
    <>
      <Defs>
        <LinearGradient id="vegWall" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFFDF9" />
          <Stop offset="1" stopColor="#F9F3EA" />
        </LinearGradient>

        <LinearGradient id="vegTable" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FAF1E6" />
          <Stop offset="1" stopColor="#EFE3D3" />
        </LinearGradient>

        <LinearGradient id="vegBasket" x1="0" y1="0" x2="0.8" y2="1">
          <Stop offset="0" stopColor="#EBDCC8" />
          <Stop offset="0.55" stopColor="#DBC6AC" />
          <Stop offset="1" stopColor="#C9B397" />
        </LinearGradient>

        <LinearGradient id="carrotOrange" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FFD3A3" />
          <Stop offset="1" stopColor="#F0A66C" />
        </LinearGradient>

        <LinearGradient id="cabbageGreen" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#E2F0CE" />
          <Stop offset="1" stopColor="#A2CD93" />
        </LinearGradient>

        <LinearGradient id="eggplantPurple" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#DBCDF5" />
          <Stop offset="1" stopColor="#A793CE" />
        </LinearGradient>

        <LinearGradient id="radishWhite" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FFFFFF" />
          <Stop offset="1" stopColor="#EFEADF" />
        </LinearGradient>
      </Defs>

      {/* 배경 */}
      <Rect width="320" height="240" fill="url(#vegWall)" />

      <Circle cx="80" cy="40" r="70" fill="#FFFFFF" opacity=".45" />
      <Circle cx="250" cy="50" r="90" fill="#FFFDF5" opacity=".4" />

      {/* 식탁 */}
      <Path d="M0 100 Q80 94 160 100 T320 98 V240 H0Z" fill="url(#vegTable)" />

      <Path
        d="M0 126 Q75 120 145 126 T320 124"
        fill="none"
        stroke="#E2D4C3"
        strokeWidth="1.5"
        opacity=".5"
      />
      <Path
        d="M0 211 Q80 205 160 211 T320 209"
        fill="none"
        stroke="#D8C8B5"
        strokeWidth="1.5"
        opacity=".35"
      />

      {/* 바구니 그림자 */}
      <Ellipse cx="160" cy="183" rx="90" ry="18" fill="#B39F8A" opacity=".12" />

      {/* 손잡이 */}
      <Path
        d="M91 154 C89 113 111 86 160 85 C209 86 231 113 229 154"
        fill="none"
        stroke="#D5BF9F"
        strokeWidth="10"
        strokeLinecap="round"
        opacity=".8"
      />
      <Path
        d="M93 151 C93 117 116 94 160 93 C204 94 227 117 227 151"
        fill="none"
        stroke="#FAF1E0"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* 채소 요소 (소프트 파스텔 투명도 적용) */}
      <G opacity=".82">
        {/* 양배추 */}
        <G transform="translate(0, 25)">
          <Path
            d="M103 126 C91 118 91 105 102 99 C110 88 126 94 132 104 C145 103 150 117 141 127 C134 139 113 140 103 126Z"
            fill="url(#cabbageGreen)"
            stroke="#91B881"
            strokeWidth="1.2"
          />
        </G>

        {/* 무 */}
        <G transform="translate(-15, 10)">
          <Path
            d="M155 111 C146 118 145 131 154 141 C160 149 169 148 174 139 C180 128 173 116 166 111Z"
            fill="url(#radishWhite)"
            stroke="#D3C7B5"
            strokeWidth="1.2"
          />
          <Path
            d="M160 113 Q156 104 152 99 M163 113 Q170 104 177 103 M161 111 Q160 101 163 96"
            fill="none"
            stroke="#8FBE84"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </G>

        {/* 가지 */}
        <G transform="translate(-20, 5) rotate(13 199 129)">
          <Path
            d="M184 118 C179 126 181 143 194 150 C206 157 220 146 220 134 C220 124 211 118 201 119 Q192 117 184 118Z"
            fill="url(#eggplantPurple)"
            stroke="#9E8CBF"
            strokeWidth="1.2"
          />
          <Path
            d="M184 119 Q177 112 180 105 L190 113 L198 108 L199 118"
            fill="#88B174"
            stroke="#739A60"
            strokeWidth="1"
          />
        </G>

        {/* 당근 */}
        <G transform="translate(5, 0) rotate(12 214 145)">
          <Path
            d="M195 119 Q209 122 222 130 L207 169 Q204 174 201 168 L191 131Z"
            fill="url(#carrotOrange)"
            stroke="#E0985F"
            strokeWidth="1.2"
          />
          <Path
            d="M201 124 Q195 111 200 104 Q206 112 204 125 M204 125 Q211 111 219 113 Q215 124 204 128"
            fill="#8FBE84"
            stroke="#72A167"
            strokeWidth="1"
          />
        </G>
      </G>

      {/* 바구니 몸체 */}
      <Path
        d="M75 145 Q160 158 245 145 L226 194 Q222 204 211 207 Q160 218 109 207 Q98 204 94 194Z"
        fill="url(#vegBasket)"
        stroke="#C2AB8E"
        strokeWidth="1.5"
      />

      {/* 세로/가로 엮임결 */}
      <G fill="none" strokeLinecap="round" strokeWidth="4" opacity=".8">
        <Path d="M99 154 Q104 179 112 201" stroke="#F5E8D3" />
        <Path d="M121 157 Q125 183 128 208" stroke="#F5E8D3" />
        <Path d="M144 159 Q145 187 145 212" stroke="#F5E8D3" />
        <Path d="M166 159 Q166 187 166 212" stroke="#F5E8D3" />
        <Path d="M188 157 Q184 184 183 209" stroke="#F5E8D3" />
        <Path d="M210 153 Q204 181 200 203" stroke="#F5E8D3" />
        <Path d="M230 150 Q222 177 217 197" stroke="#F5E8D3" />
      </G>

      <Path
        d="M87 164 Q160 177 233 163 M92 179 Q160 192 228 178 M98 194 Q160 207 221 193"
        fill="none"
        stroke="#BCA68C"
        strokeWidth="3"
        opacity=".4"
      />

      {/* 바구니 윗단 */}
      <Path
        d="M76 144 Q160 158 244 144 L241 154 Q160 169 79 154Z"
        fill="#DFCAB1"
        stroke="#C0A98E"
        strokeWidth="1.5"
      />
    </>
  );
}
function MealScene() {
  return (
    <>
      <Defs>
        {/* 더 환하고 화사한 크림 버터빛 벽면 그라데이션 */}
        <LinearGradient id="foodWall" x1="0" x2="0" y1="0" y2="1">
          <Stop offset="0" stopColor="#FFFCF4" />
          <Stop offset="1" stopColor="#FFEECE" />
        </LinearGradient>

        {/* 맑고 화사한 밝은 우드 식탁 그라데이션 */}
        <LinearGradient id="foodTable" x1="0" x2="0" y1="0" y2="1">
          <Stop offset="0" stopColor="#F5D0A1" />
          <Stop offset="1" stopColor="#DEAB72" />
        </LinearGradient>

        {/* 뽀얗고 환한 스노우 도자기 접시 */}
        <LinearGradient id="foodPlate" x1="0" x2="0" y1="0" y2="1">
          <Stop offset="0" stopColor="#FFFFFF" />
          <Stop offset="1" stopColor="#F5F3EC" />
        </LinearGradient>

        {/* 맑고 깨끗한 실버 커트러리 */}
        <LinearGradient id="foodMetal" x1="0" x2="1" y1="0" y2="0">
          <Stop offset="0" stopColor="#E2ECEF" />
          <Stop offset="0.35" stopColor="#FFFFFF" />
          <Stop offset="0.7" stopColor="#EEF4F6" />
          <Stop offset="1" stopColor="#C9D6DD" />
        </LinearGradient>

        {/* 맑고 청량한 투명 유리잔 */}
        <LinearGradient id="foodGlass" x1="0" x2="1" y1="0" y2="0">
          <Stop offset="0" stopColor="#E2F8FC" />
          <Stop offset="0.35" stopColor="#FFFFFF" />
          <Stop offset="0.7" stopColor="#D5F4FA" />
          <Stop offset="1" stopColor="#B3E9F2" />
        </LinearGradient>
      </Defs>

      {/* 화사한 실내 배경 */}
      <Rect fill="url(#foodWall)" height="240" width="320" />

      {/* 동화책 느낌의 은은한 햇살 빛무리 효과 (환한 느낌 극대화) */}
      <Circle cx="70" cy="45" r="60" fill="#FFFFFF" opacity=".6" />
      <Circle cx="260" cy="40" r="80" fill="#FFFBE6" opacity=".5" />

      {/* 식탁 영역 */}
      <Path d="M0 68 Q80 63 160 68 T320 68 V240 H0Z" fill="url(#foodTable)" />

      {/* 부드럽고 환한 식탁 나뭇결 */}
      <Path
        d="M0 95 Q82 90 160 95 T320 93"
        fill="none"
        opacity=".7"
        stroke="#F0C79A"
        strokeWidth="2"
      />
      <Path
        d="M0 165 Q85 160 170 165 T320 162"
        fill="none"
        opacity=".45"
        stroke="#CC9B6A"
        strokeWidth="2"
      />

      {/* 접시 & 커트러리 그룹 */}
      <G transform="translate(0, -25)">
        <Ellipse
          cx="160"
          cy="182"
          fill="#9E7048"
          opacity=".15"
          rx="74"
          ry="44"
        />

        <Ellipse
          cx="160"
          cy="175"
          fill="url(#foodPlate)"
          rx="73"
          ry="43"
          stroke="#EAE4D9"
          strokeWidth="2"
        />

        <Ellipse
          cx="160"
          cy="172"
          fill="#FFFFFF"
          rx="58"
          ry="32"
          stroke="#F1ECE4"
          strokeWidth="2"
        />

        <Path
          d="M103 168 Q110 142 153 137"
          fill="none"
          opacity=".95"
          stroke="#FFFFFF"
          strokeLinecap="round"
          strokeWidth="3"
        />

        {/* 왼쪽 포크 */}
        <G transform="translate(60 169) rotate(-9)">
          <Rect
            fill="url(#foodMetal)"
            height="45"
            rx="4"
            stroke="#C9D6DD"
            strokeWidth="1.2"
            width="10"
            x="-5"
            y="-1"
          />
          <Path
            d="M-7 -22
              Q-7 -26 -4 -26
              V-11
              Q-2 -8 0 -11
              V-27
              Q3 -27 3 -23
              V-11
              Q5 -8 7 -11
              V-23
              Q7 -26 9 -24
              V-8
              Q9 -2 2 1
              L2 5 H-2 L-2 1
              Q-9 -2 -9 -8
              V-24
              Q-9 -26 -7 -22Z"
            fill="url(#foodMetal)"
            stroke="#C9D6DD"
            strokeLinejoin="round"
            strokeWidth="1.2"
          />
          <Path
            d="M-2 7 V38"
            opacity=".95"
            stroke="#FFFFFF"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
        </G>

        {/* 오른쪽 숟가락 */}
        <G transform="translate(260 169) rotate(9)">
          <Rect
            fill="url(#foodMetal)"
            height="44"
            rx="4"
            stroke="#C9D6DD"
            strokeWidth="1.2"
            width="10"
            x="-5"
            y="1"
          />
          <Ellipse
            cx="0"
            cy="-13"
            fill="url(#foodMetal)"
            rx="9"
            ry="13"
            stroke="#C9D6DD"
            strokeWidth="1.2"
          />
          <Ellipse
            cx="-2"
            cy="-15"
            fill="#FFFFFF"
            opacity=".8"
            rx="3.5"
            ry="7"
          />
          <Path
            d="M-2 6 V38"
            opacity=".95"
            stroke="#FFFFFF"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
        </G>
      </G>

      {/* 식탁 앞쪽 가장자리 입체감 */}
      <Path d="M0 224 Q80 219 160 224 T320 221 V240 H0Z" fill="#CCA071" />
      <Path
        d="M0 225 Q80 220 160 225 T320 222"
        fill="none"
        stroke="#FFE3C2"
        strokeWidth="2"
      />
    </>
  );
}
function DrinkScene() {
  return (
    <>
      <Defs>
        {/* 따뜻하고 은은한 크림빛 벽면 */}
        <LinearGradient id="drinkWall" x1="0" x2="0" y1="0" y2="1">
          <Stop offset="0" stopColor="#FFFCF4" />
          <Stop offset="1" stopColor="#FFEECE" />
        </LinearGradient>

        {/* 기존에 마음에 드셨던 밝은 꿀빛 원목 식탁 유지 */}
        <LinearGradient id="drinkTable" x1="0" x2="0" y1="0" y2="1">
          <Stop offset="0" stopColor="#F5D0A1" />
          <Stop offset="1" stopColor="#DEAB72" />
        </LinearGradient>

        {/* 채도를 쫙 빼서 배경처럼 부드러운 소프트 아이보리 찻잔 */}
        <LinearGradient id="drinkCup" x1="0" x2="1" y1="0" y2="0">
          <Stop offset="0" stopColor="#F4EDE0" />
          <Stop offset="0.3" stopColor="#FFFFFF" />
          <Stop offset="0.8" stopColor="#FCF9F3" />
          <Stop offset="1" stopColor="#EFE5D5" />
        </LinearGradient>

        {/* 채도가 낮고 편안한 연한 밀크티 차 */}
        <LinearGradient id="drinkTea" x1="0" x2="0" y1="0" y2="1">
          <Stop offset="0" stopColor="#EED9B9" />
          <Stop offset="1" stopColor="#D2B58A" />
        </LinearGradient>

        {/* 은은한 도자기 받침 */}
        <LinearGradient id="drinkSaucer" x1="0" x2="0" y1="0" y2="1">
          <Stop offset="0" stopColor="#FFFFFF" />
          <Stop offset="1" stopColor="#F2ECE1" />
        </LinearGradient>
      </Defs>

      {/* 따뜻한 실내 벽면 */}
      <Rect width="320" height="240" fill="url(#drinkWall)" />

      {/* 은은한 햇살 */}
      <Circle cx="65" cy="38" r="57" fill="#FFFFFF" opacity=".48" />
      <Circle cx="265" cy="45" r="72" fill="#FFFBE8" opacity=".38" />

      {/* 식탁 */}
      <Path d="M0 68 Q80 63 160 68 T320 68 V240 H0Z" fill="url(#drinkTable)" />

      {/* 부드러운 나뭇결 */}
      <Path
        d="M0 105 Q82 100 160 105 T320 103"
        fill="none"
        stroke="#F0C79A"
        strokeWidth="2"
        opacity=".65"
      />
      <Path
        d="M0 207 Q80 202 160 207 T320 205"
        fill="none"
        stroke="#CC9B6A"
        strokeWidth="1.8"
        opacity=".35"
      />

      {/* 찻잔 아래 그림자 (투명도 조절로 은은하게) */}
      <Ellipse cx="160" cy="177" rx="57" ry="11" fill="#98683F" opacity=".12" />

      {/* 찻잔 손잡이: 뒤쪽에 먼저 배치 (선을 연하게 수정) */}
      {/* <Path
        d="M193 116
            C218 111 231 122 228 139
            C226 154 212 161 193 153"
        fill="none"
        stroke="#E8DFD0"
        strokeWidth="12"
        strokeLinecap="round"
      /> */}
      <Path
        d="M195 120
            C213 117 222 125 219 138
            C217 148 208 153 195 149"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* 받침 접시 (배경에 녹아들도록 부드러운 라인) */}
      <Ellipse cx="158" cy="166" rx="65" ry="15" fill="#B98B59" opacity=".1" />
      <Ellipse
        cx="158"
        cy="162"
        rx="64"
        ry="15"
        fill="url(#drinkSaucer)"
        stroke="#EAE2D5"
        strokeWidth="1.5"
      />
      <Ellipse
        cx="158"
        cy="160"
        rx="47"
        ry="8"
        fill="#FFFEFA"
        stroke="#F5EFE6"
        strokeWidth="1.2"
      />
      <Path
        d="M111 160 Q130 168 157 168"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".8"
      />

      {/* 찻잔 본체 (콘트라스트를 낮춰 포근하게 안착) */}
      <Path
        d="M111 112
            Q158 120 198 112
            L190 151
            Q188 163 175 166
            Q157 170 138 165
            Q125 162 122 151Z"
        fill="url(#drinkCup)"
        stroke="#E2D6C5"
        strokeWidth="1.5"
      />

      {/* 컵의 부드러운 빛 반사 */}
      <Path
        d="M124 122 Q128 143 135 153"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity=".8"
      />
      <Path
        d="M184 123 Q182 139 178 148"
        fill="none"
        stroke="#F5EFE6"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity=".7"
      />

      {/* 컵 윗면과 차 */}
      <Ellipse
        cx="155"
        cy="113"
        rx="44"
        ry="10"
        fill="#EADFCF"
        stroke="#D9CEBD"
        strokeWidth="1.2"
      />
      <Ellipse cx="155" cy="112" rx="39" ry="7" fill="#FFFEFA" />
      <Ellipse cx="155" cy="113" rx="34" ry="5.5" fill="url(#drinkTea)" />

      {/* 차 표면의 은은한 빛 */}
      <Path
        d="M133 112 Q145 108 157 112"
        fill="none"
        stroke="#FBF0DF"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity=".75"
      />

      {/* 컵 앞면의 작은 장식: 아주 은은하고 연한 톤의 꽃잎 */}
      <G transform="translate(157 141)" opacity=".7">
        <Ellipse cx="0" cy="-4" rx="3" ry="5" fill="#F0D5C9" />
        <Ellipse
          cx="-4"
          cy="0"
          rx="3"
          ry="5"
          fill="#F0D5C9"
          transform="rotate(-45 -4 0)"
        />
        <Ellipse
          cx="4"
          cy="0"
          rx="3"
          ry="5"
          fill="#F0D5C9"
          transform="rotate(45 4 0)"
        />
        <Circle cx="0" cy="0" r="2" fill="#E6C89C" />
      </G>

      {/* 식탁 앞쪽 가장자리 */}
      <Path d="M0 224 Q80 219 160 224 T320 221 V240 H0Z" fill="#CCA071" />
      <Path
        d="M0 225 Q80 220 160 225 T320 222"
        fill="none"
        stroke="#FFE3C2"
        strokeWidth="2"
      />
    </>
  );
}

function SnackScene() {
  return (
    <>
      <Defs>
        {/* 벽 */}
        <LinearGradient id="snackWall" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFFDF9" />
          <Stop offset="1" stopColor="#F9F3EA" />
        </LinearGradient>

        {/* 식탁 */}
        <LinearGradient id="snackTable" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FAF1E6" />
          <Stop offset="1" stopColor="#EFE3D3" />
        </LinearGradient>

        {/* 바구니 */}
        <LinearGradient id="snackBasket" x1="0" y1="0" x2="0.8" y2="1">
          <Stop offset="0" stopColor="#EBDCC8" />
          <Stop offset="0.55" stopColor="#DBC6AC" />
          <Stop offset="1" stopColor="#C9B397" />
        </LinearGradient>

        {/* 채도 낮춘 소프트 쿠키 */}
        <LinearGradient id="snackCookie" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#F5E4C3" />
          <Stop offset="1" stopColor="#D6B68C" />
        </LinearGradient>

        {/* 은은한 파스텔 핑크 도넛 */}
        <LinearGradient id="snackDonut" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FCE4EC" />
          <Stop offset="1" stopColor="#F2B8C8" />
        </LinearGradient>

        {/* 연한 크림버터 과자 포장지 */}
        <LinearGradient id="snackWrapper" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFF3D6" />
          <Stop offset="1" stopColor="#EAD89C" />
        </LinearGradient>

        {/* 부드러운 소프트 아이스크림 */}
        <LinearGradient id="snackIceCream" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FFF3E8" />
          <Stop offset="1" stopColor="#E6C2B8" />
        </LinearGradient>
      </Defs>

      {/* 배경 */}
      <Rect width="320" height="240" fill="url(#snackWall)" />
      <Circle cx="80" cy="40" r="70" fill="#FFFFFF" opacity=".45" />
      <Circle cx="250" cy="50" r="90" fill="#FFFDF5" opacity=".4" />

      {/* 식탁 */}
      <Path
        d="M0 100 Q80 94 160 100 T320 98 V240 H0Z"
        fill="url(#snackTable)"
      />
      <Path
        d="M0 126 Q75 120 145 126 T320 124"
        fill="none"
        stroke="#E2D4C3"
        strokeWidth="1.5"
        opacity=".5"
      />
      <Path
        d="M0 211 Q80 205 160 211 T320 209"
        fill="none"
        stroke="#D8C8B5"
        strokeWidth="1.5"
        opacity=".35"
      />

      {/* 바구니 그림자 */}
      <Ellipse cx="160" cy="185" rx="91" ry="17" fill="#B39F8A" opacity=".12" />

      {/* 바구니 손잡이 - 간식 뒤쪽 */}
      <Path
        d="M91 157 C89 113 111 86 160 85 C209 86 231 113 229 157"
        fill="none"
        stroke="#D5BF9F"
        strokeWidth="10"
        strokeLinecap="round"
        opacity=".8"
      />
      <Path
        d="M93 154 C93 117 116 94 160 93 C204 94 227 117 227 154"
        fill="none"
        stroke="#FAF1E0"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* ================================================== */}
      {/* 간식들: 투명도(.82)를 주어 배경처럼 은은하게 스며들도록 조정 */}
      {/* ================================================== */}
      <G opacity=".82">
        {/* 왼쪽 뒤쪽 - 길쭉한 웨이퍼 과자 */}
        <G transform="rotate(-15 104 130)">
          <Rect
            x="83"
            y="104"
            width="31"
            height="53"
            rx="5"
            fill="#EAD2B2"
            stroke="#CCA988"
            strokeWidth="1.2"
          />
          <Rect x="87" y="108" width="23" height="45" rx="3" fill="#F7E6CC" />
          <Path
            d="M89 114 L108 114 M89 121 L108 121 M89 128 L108 128 M89 135 L108 135 M89 142 L108 142"
            stroke="#E2CCA8"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </G>

        {/* 왼쪽 위 - 쿠키 */}
        <G>
          <Circle
            cx="116"
            cy="115"
            r="17"
            fill="url(#snackCookie)"
            stroke="#D6BD9B"
            strokeWidth="1.4"
          />
          <Circle cx="108" cy="109" r="2.5" fill="#A88768" />
          <Circle cx="120" cy="107" r="2.8" fill="#A88768" />
          <Circle cx="125" cy="117" r="2.5" fill="#A88768" />
          <Circle cx="113" cy="121" r="2.8" fill="#A88768" />
          <Circle cx="122" cy="126" r="2" fill="#A88768" />
          <Circle cx="106" cy="116" r="1.8" fill="#A88768" />
        </G>

        {/* 가운데 뒤쪽 - 과자 봉지 */}
        <G transform="rotate(7 158 125)">
          <Path
            d="M138 103 L179 103 L183 113 L180 148 L137 148 L134 113Z"
            fill="url(#snackWrapper)"
            stroke="#E4D1A0"
            strokeWidth="1.4"
          />
          <Path d="M138 103 L179 103 L181 111 L136 111Z" fill="#FFF8E4" />
          <Path d="M137 141 L181 141 L180 148 L137 148Z" fill="#E6CA87" />
          <Path
            d="M145 119 Q158 112 172 119 L169 132 Q158 138 147 132Z"
            fill="#F7C4A5"
          />
        </G>

        {/* 오른쪽 뒤쪽 - 초콜릿 */}
        <G transform="rotate(15 204 126)">
          <Rect
            x="185"
            y="104"
            width="37"
            height="42"
            rx="5"
            fill="#C79D89"
            stroke="#AA7A66"
            strokeWidth="1.3"
          />
          <Rect x="189" y="108" width="29" height="34" rx="3" fill="#9E7362" />
          <Path
            d="M189 119 H218 M189 130 H218 M199 108 V142 M209 108 V142"
            stroke="#B98E7B"
            strokeWidth="1.6"
          />
        </G>

        {/* 오른쪽 위 - 도넛 */}
        <G transform="rotate(13 216 112)">
          <Path
            d="M197 116
              C194 106 202 97 213 97
              C225 96 235 105 233 116
              C232 127 222 134 211 132
              C201 131 196 125 197 116Z"
            fill="#DCA992"
            stroke="#C49179"
            strokeWidth="1.2"
          />
          <Path
            d="M199 112
              C200 104 207 100 214 101
              C222 100 229 106 229 114
              C227 122 222 128 213 127
              C205 127 200 122 199 112Z"
            fill="url(#snackDonut)"
            stroke="#E8C5CE"
            strokeWidth="1"
          />
          <Ellipse
            cx="214"
            cy="114"
            rx="5.5"
            ry="5"
            fill="#DCA992"
            stroke="#C49179"
            strokeWidth="1"
          />
        </G>

        {/* 가운데 왼쪽 - 작은 컵케이크 */}
        <G>
          <Path
            d="M130 132
              C123 128 126 121 132 120
              C129 113 138 109 143 115
              C148 110 157 116 155 122
              C162 125 158 132 152 133Z"
            fill="#FFF5EC"
            stroke="#EAD9CB"
            strokeWidth="1"
          />
          <Path
            d="M131 131 L154 131 L150 151 Q143 156 136 151Z"
            fill="#F2C4CE"
            stroke="#E2A6B4"
            strokeWidth="1.2"
          />
        </G>

        {/* 가운데 오른쪽 - 아이스크림 콘 */}
        <G transform="rotate(9 181 132)">
          <Path
            d="M167 127 L194 127 L182 160 Q181 163 179 159Z"
            fill="#EAD0AE"
            stroke="#D0B28C"
            strokeWidth="1.2"
          />
          <Path
            d="M165 128
              C159 122 163 114 170 113
              C168 104 178 100 184 106
              C193 104 198 112 194 119
              C200 125 193 131 187 131 L170 131Z"
            fill="url(#snackIceCream)"
            stroke="#E0C6BC"
            strokeWidth="1.2"
          />
        </G>

        {/* 앞쪽 왼쪽 - 사탕 */}
        <G transform="rotate(-18 101 145)">
          <Rect
            x="94"
            y="135"
            width="18"
            height="20"
            rx="7"
            fill="#F9D6DF"
            stroke="#E2AAB7"
            strokeWidth="1.2"
          />
        </G>

        {/* 앞쪽 가운데 - 샌드 쿠키 */}
        <G transform="rotate(-8 151 145)">
          <Rect
            x="132"
            y="135"
            width="39"
            height="22"
            rx="5"
            fill="#E5C198"
            stroke="#CCA475"
            strokeWidth="1.2"
          />
          <Rect x="135" y="137" width="33" height="7" rx="3" fill="#F4E3C9" />
          <Rect x="135" y="146" width="33" height="8" rx="3" fill="#EAD2B0" />
        </G>

        {/* 앞쪽 오른쪽 - 크래커 */}
        <G transform="rotate(9 205 148)">
          <Rect
            x="184"
            y="136"
            width="35"
            height="22"
            rx="4"
            fill="#F4E2BF"
            stroke="#DEC59B"
            strokeWidth="1.2"
          />
        </G>
      </G>

      {/* 바구니 몸체 */}
      <Path
        d="M75 145 Q160 158 245 145
          L226 194
          Q222 204 211 207
          Q160 218 109 207
          Q98 204 94 194Z"
        fill="url(#snackBasket)"
        stroke="#C2AB8E"
        strokeWidth="1.5"
      />

      {/* 바구니의 세로 엮임결 */}
      <G fill="none" strokeLinecap="round" strokeWidth="4" opacity=".8">
        <Path d="M99 154 Q104 179 112 201" stroke="#F5E8D3" />
        <Path d="M121 157 Q125 183 128 208" stroke="#F5E8D3" />
        <Path d="M144 159 Q145 187 145 212" stroke="#F5E8D3" />
        <Path d="M166 159 Q166 187 166 212" stroke="#F5E8D3" />
        <Path d="M188 157 Q184 184 183 209" stroke="#F5E8D3" />
        <Path d="M210 153 Q204 181 200 203" stroke="#F5E8D3" />
        <Path d="M230 150 Q222 177 217 197" stroke="#F5E8D3" />
      </G>

      {/* 가로 엮임결 */}
      <Path
        d="M87 164 Q160 177 233 163
          M92 179 Q160 192 228 178
          M98 194 Q160 207 221 193"
        fill="none"
        stroke="#BCA68C"
        strokeWidth="3"
        opacity=".4"
      />

      {/* 바구니 윗단 */}
      <Path
        d="M76 144 Q160 158 244 144 L241 154 Q160 169 79 154Z"
        fill="#DFCAB1"
        stroke="#C0A98E"
        strokeWidth="1.5"
      />
    </>
  );
}

const SCENES: Record<FoodBackgroundKind, React.FC> = {
  food: FoodTableScene,
  fruit: FruitScene, // 남은 Scene 파일들도 필요시 추가/매칭
  vegetable: VegetableScene,
  meal: MealScene,
  snack: SnackScene,
  drink: DrinkScene,
};

const BORDER: Record<FoodBackgroundKind, string> = {
  food: "#56B67C",
  fruit: "#56B67C",
  vegetable: "#56B67C",
  meal: "#F7BA45",
  snack: "#F4769B",
  drink: "#4DADE8",
};

// 🌟 Animal과 완전 동일한 240x180 규격 스케일 적용
export default function FoodCategoryBackground({
  category,
  width = "100%",
  height = "100%",
}: Props & { category: FoodBackgroundKind }) {
  const Scene = SCENES[category] || FoodTableScene;
  const border = BORDER[category] || "#56B67C";

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 240 180"
      preserveAspectRatio="none"
      style={{ width: "100%", height: "100%" }}
    >
      {/* 240x180 바깥 배경과 테두리 */}
      <Rect width="240" height="180" rx="12" fill="#FFFFFF" />

      {/* 320x240으로 제작되었던 Scene들을 240x180 (scale 0.75)에 딱 맞춰 감싸기 */}
      <G transform="scale(0.75)">
        <Scene />
      </G>
    </Svg>
  );
}

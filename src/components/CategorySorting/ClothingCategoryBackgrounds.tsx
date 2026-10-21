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
export type ClothingBackgroundKind =
  | "clothing"
  | "hat"
  | "clothes"
  | "shoes"
  | "hairpin"
  | "necklace"
  | "glasses";

type Props = {
  category: ClothingBackgroundKind;
  width?: number | string;
  height?: number | string;
};

const PALETTE: Record<ClothingBackgroundKind, { main: string; pale: string }> =
  {
    clothing: { main: "#D99A48", pale: "#FFF0CF" },
    hat: { main: "#D99A48", pale: "#FFF0CF" },
    clothes: { main: "#E8759B", pale: "#FFE5ED" },
    shoes: { main: "#6A9EDB", pale: "#E5F0FF" },
    hairpin: { main: "#A77BE0", pale: "#F0E6FF" },
    necklace: { main: "#D9A53F", pale: "#FFF4CC" },
    glasses: { main: "#53A9B6", pale: "#DFF7F7" },
  };

function Wall({ warm = false }: { warm?: boolean }) {
  return (
    <>
      <Defs>
        <LinearGradient
          id={warm ? "clothingWarm" : "clothingCool"}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <Stop offset="0" stopColor={warm ? "#FFF9ED" : "#F5FBFF"} />
          <Stop offset="1" stopColor={warm ? "#F4DDBB" : "#DDEFFA"} />
        </LinearGradient>
      </Defs>
      <Rect
        width="320"
        height="240"
        fill={`url(#${warm ? "clothingWarm" : "clothingCool"})`}
      />
    </>
  );
}

function HatScene() {
  const wood = "#DBC6AC";
  const woodLine = "#C2AB8E";

  // 보조 모자: 스티커가 주인공이 되도록 낮은 채도로 표현
  const Hat = ({
    x,
    y,
    color,
    stroke,
    type = "fedora",
    rotate = 0,
  }: {
    x: number;
    y: number;
    color: string;
    stroke: string;
    type?: "fedora" | "panama" | "mini";
    rotate?: number;
  }) => (
    <G transform={`translate(${x} ${y}) rotate(${rotate})`} opacity={0.85}>
      {type === "fedora" && (
        <>
          {/* 모자 챙 */}
          <Path
            d="M-23 1 Q-19-5 -9-4 L12-4 Q21-3 24 2 Q3 8-23 1Z"
            fill={color}
            stroke={stroke}
            strokeWidth={1.1}
          />
          {/* 모자 몸통 */}
          <Path
            d="M-14-4 L-10-17 Q-9-21 0-21 Q9-21 11-16 L15-4 Q0-1-14-4Z"
            fill={color}
            stroke={stroke}
            strokeWidth={1.1}
          />
          {/* 리본 */}
          <Path
            d="M-11-7 Q0-5 13-7"
            stroke={stroke}
            strokeWidth={2.4}
            fill="none"
          />
          <Ellipse
            cx={0}
            cy={-20}
            rx={8}
            ry={2}
            fill="#FFFFFF"
            opacity={0.28}
          />
        </>
      )}

      {type === "panama" && (
        <>
          {/* 넓은 챙 */}
          <Path
            d="M-28 0 Q-19-7 0-6 Q20-7 28 1 Q4 9-28 0Z"
            fill={color}
            stroke={stroke}
            strokeWidth={1.1}
          />
          {/* 둥근 모자 윗부분 */}
          <Path
            d="M-16-3 Q-13-17-5-20 Q2-23 9-18 Q15-12 16-3 Q0 0-16-3Z"
            fill={color}
            stroke={stroke}
            strokeWidth={1.1}
          />
          <Path
            d="M-14-7 Q0-4 14-7"
            stroke={stroke}
            strokeWidth={2.5}
            fill="none"
          />
        </>
      )}

      {type === "mini" && (
        <>
          <Path
            d="M-20 1 Q-12-4 0-3 Q13-5 20 2 Q0 7-20 1Z"
            fill={color}
            stroke={stroke}
            strokeWidth={1}
          />
          <Path
            d="M-11-3 L-7-13 Q0-18 7-12 L11-3 Q0 0-11-3Z"
            fill={color}
            stroke={stroke}
            strokeWidth={1}
          />
          <Path
            d="M-8-5 Q0-3 9-5"
            stroke={stroke}
            strokeWidth={2}
            fill="none"
          />
        </>
      )}
    </G>
  );

  return (
    <>
      <Defs>
        <LinearGradient id="hatWallGradient" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFF9ED" />
          <Stop offset="1" stopColor="#F4DDBB" />
        </LinearGradient>

        <LinearGradient id="hatFloorGradient" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFF9EF" />
          <Stop offset="1" stopColor="#F4E8D8" />
        </LinearGradient>

        <LinearGradient id="hatWoodGradient" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#CDB496" />
          <Stop offset="0.45" stopColor="#E8D7C0" />
          <Stop offset="1" stopColor="#CDB496" />
        </LinearGradient>

        <LinearGradient id="hatMirrorGradient" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#F7FCFA" />
          <Stop offset="0.55" stopColor="#DCEAE7" />
          <Stop offset="1" stopColor="#F9F4EA" />
        </LinearGradient>
      </Defs>

      {/* 바깥쪽 둥근 프레임 */}
      <Rect x={0} y={0} width={320} height={240} rx={14} fill="#FFF0CF" />

      {/* 따뜻한 벽면 */}
      <Rect
        x={0}
        y={0}
        width={320}
        height={240}
        rx={11}
        fill="url(#hatWallGradient)"
      />

      {/* 벽면의 햇살 */}
      <Circle cx={68} cy={40} r={48} fill="#FFFFFF" opacity={0.16} />
      <Circle cx={68} cy={40} r={30} fill="#FFFFFF" opacity={0.19} />
      <Circle cx={244} cy={40} r={36} fill="#FFFDF6" opacity={0.22} />

      {/* 벽과 바닥의 경계 */}
      <Path
        d="M5 169 Q160 160 315 169"
        fill="none"
        stroke="#E6D5C0"
        strokeWidth={1.5}
      />

      {/* 원근감이 느껴지는 바닥 */}
      <Path
        d="M5 169 Q160 160 315 169 L315 231 Q160 237 5 231 Z"
        fill="url(#hatFloorGradient)"
      />

      {/* 바닥 타일 선 */}
      <G stroke="#E2D4C3" strokeWidth={0.8} opacity={0.5} fill="none">
        <Path d="M5 190 Q160 184 315 190" />
        <Path d="M5 211 Q160 207 315 211" />
        <Path d="M48 168 L25 233" />
        <Path d="M115 165 L103 235" />
        <Path d="M205 165 L217 235" />
        <Path d="M272 168 L296 233" />
      </G>

      {/* 오른쪽 벽걸이 거울 */}
      <G opacity={0.82}>
        <Ellipse
          cx={265}
          cy={91}
          rx={22}
          ry={39}
          fill="#E2CAB2"
          opacity={0.25}
        />
        <Ellipse
          cx={265}
          cy={88}
          rx={20}
          ry={35}
          fill="#E2CAB2"
          stroke="#D1B89D"
          strokeWidth={1}
        />
        <Ellipse
          cx={265}
          cy={88}
          rx={16}
          ry={30}
          fill="url(#hatMirrorGradient)"
          stroke="#F8EBDD"
          strokeWidth={1}
        />
        <Path
          d="M255 68 Q250 83 256 99"
          stroke="#FFFFFF"
          strokeWidth={2}
          opacity={0.55}
          fill="none"
          strokeLinecap="round"
        />
        <Circle cx={265} cy={48} r={2} fill="#D1B89D" />
        <Circle cx={265} cy={128} r={2} fill="#D1B89D" />
      </G>

      {/* 왼쪽 미니 협탁 */}
      <G>
        <Ellipse
          cx={49}
          cy={190}
          rx={25}
          ry={4}
          fill="#9E8D80"
          opacity={0.08}
        />
        <Path
          d="M27 164 L71 164 L68 188 Q49 192 30 188 Z"
          fill="#EADFCF"
          stroke="#D7C5AF"
          strokeWidth={1}
        />
        <Rect
          x={24}
          y={159}
          width={50}
          height={8}
          rx={3}
          fill="#F5EBDD"
          stroke="#D7C5AF"
          strokeWidth={1}
        />
        <Path
          d="M34 167 L33 187 M65 167 L66 187"
          stroke="#D7C5AF"
          strokeWidth={2}
          strokeLinecap="round"
        />

        {/* 디퓨저 병 */}
        <G opacity={0.7}>
          <Rect
            x={42}
            y={145}
            width={14}
            height={14}
            rx={3}
            fill="#DBCDF5"
            stroke="#C5B3E0"
            strokeWidth={0.8}
          />
          <Rect x={46} y={141} width={6} height={5} rx={1} fill="#C9B6E4" />
          <Path
            d="M47 141 L44 131 M49 141 L52 129 M51 142 L57 134"
            stroke="#B5A0D2"
            strokeWidth={1}
            strokeLinecap="round"
          />
          <Path
            d="M45 150 Q49 147 53 150"
            stroke="#FFFFFF"
            strokeWidth={1}
            opacity={0.7}
            fill="none"
          />
        </G>
      </G>

      {/* 스탠드 받침대 그림자 */}
      {/* <Ellipse cx={160} cy={211} rx={38} ry={6} fill="#9E8D80" opacity={0.1} /> */}

      {/* 스탠드의 바닥 다리 */}
      <G
        fill="url(#hatWoodGradient)"
        stroke={woodLine}
        strokeWidth={1}
        strokeLinejoin="round"
      >
        <Path d="M157 194 Q151 202 126 210 Q123 213 130 214 Q150 210 163 201 Z" />
        <Path d="M163 194 Q169 202 194 210 Q197 213 190 214 Q170 210 157 201 Z" />
        <Path d="M157 197 Q153 207 154 213 Q160 216 166 213 Q167 206 163 197 Z" />
      </G>

      {/* 중앙 기둥 */}
      <G>
        <Path
          d="M155 200 L155 48 Q155 44 160 44 Q165 44 165 48 L165 200 Q160 204 155 200Z"
          fill="url(#hatWoodGradient)"
          stroke={woodLine}
          strokeWidth={1.2}
        />
        <Path
          d="M158 51 L158 194"
          stroke="#FFF8ED"
          strokeWidth={1.2}
          opacity={0.65}
          strokeLinecap="round"
        />
        {/* 기둥 상단 마감 */}
        <Ellipse
          cx={160}
          cy={47}
          rx={6}
          ry={4}
          fill="#E9D8C2"
          stroke={woodLine}
          strokeWidth={1}
        />
      </G>

      {/* 모자걸이 가지 */}
      <G
        stroke={woodLine}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <Path d="M160 80 Q148 70 130 60" />
        <Path d="M160 95 Q174 85 190 75" />
        <Path d="M160 120 Q149 112 135 105" />
        <Path d="M160 135 Q172 130 185 125" />
      </G>

      {/* 가지의 부드러운 나무결 하이라이트 */}
      <G
        stroke="#F8EBDD"
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
        opacity={0.8}
      >
        <Path d="M155 77 L133 62" />
        <Path d="M164 93 L188 77" />
        <Path d="M155 118 L138 107" />
        <Path d="M164 134 L182 126" />
      </G>

      {/* 가지 끝의 둥근 손잡이 */}
      <G fill="#C2AB8E" stroke="#B69D80" strokeWidth={0.7}>
        <Circle cx={130} cy={60} r={3.5} />
        <Circle cx={190} cy={75} r={3.5} />
        <Circle cx={135} cy={105} r={3.5} />
        <Circle cx={185} cy={125} r={3.5} />
      </G>

      {/* 왼쪽 위: 피치 핑크 페도라 */}
      <Hat
        x={119}
        y={59}
        color="#FCE4EC"
        stroke="#E8BCC8"
        type="fedora"
        rotate={-14}
      />

      {/* 오른쪽 위: 파스텔 그린 페도라 */}
      <Hat
        x={202}
        y={74}
        color="#E2F0CE"
        stroke="#B2D0A0"
        type="fedora"
        rotate={12}
      />

      {/* 왼쪽 아래: 버터크림 파나마햇 */}
      <Hat
        x={119}
        y={105}
        color="#FFF3E0"
        stroke="#EADDC8"
        type="panama"
        rotate={-8}
      />

      {/* 오른쪽 아래: 민트블루 미니 햇 */}
      <Hat
        x={194}
        y={124}
        color="#E4F2F9"
        stroke="#B8D9EA"
        type="mini"
        rotate={10}
      />

      {/* 스탠드와 소품 전체를 부드럽게 */}
      <Rect
        x={5}
        y={5}
        width={310}
        height={230}
        rx={10}
        fill="#FFFDF6"
        opacity={0.025}
        pointerEvents="none"
      />

      {/* 앞쪽의 피치버터 빛무리 */}
      <Ellipse
        cx={160}
        cy={227}
        rx={120}
        ry={14}
        fill="#FDE4EC"
        opacity={0.3}
      />
      <Ellipse cx={160} cy={218} rx={88} ry={8} fill="#FFFDF6" opacity={0.4} />
    </>
  );
}

function ClothesScene() {
  const wood = "#DBC6AC";
  const woodStroke = "#C2AB8E";

  return (
    <>
      <Defs>
        <LinearGradient id="clothesWallGradient" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFFCFE" />
          <Stop offset="1" stopColor="#F4DCE5" />
        </LinearGradient>

        <LinearGradient id="clothesFloorGradient" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FAF6ED" />
          <Stop offset="1" stopColor="#F0E5D8" />
        </LinearGradient>

        <LinearGradient id="clothesWoodGradient" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#CDB496" />
          <Stop offset="0.48" stopColor="#E9D9C4" />
          <Stop offset="1" stopColor="#CDB496" />
        </LinearGradient>
      </Defs>

      {/* 바깥쪽 라운드 배경 */}
      <Rect x={0} y={0} width={320} height={240} rx={14} fill="#FFE5ED" />

      {/* 크림 핑크 벽면 */}
      <Rect
        x={0}
        y={0}
        width={320}
        height={240}
        rx={11}
        fill="url(#clothesWallGradient)"
      />

      {/* 은은한 햇살 */}
      <Circle cx={62} cy={38} r={43} fill="#FFFFFF" opacity={0.18} />
      <Circle cx={62} cy={38} r={26} fill="#FFFDF6" opacity={0.22} />
      <Circle cx={248} cy={48} r={36} fill="#FFFFFF" opacity={0.12} />

      {/* 바닥과 벽의 경계 */}
      <Path
        d="M5 180 Q160 173 315 180"
        stroke="#E8D8D0"
        strokeWidth={1.2}
        fill="none"
      />

      {/* 원근감이 있는 크림 베이지 바닥 */}
      <Path
        d="M5 180 Q160 173 315 180 L315 232 Q160 237 5 232 Z"
        fill="url(#clothesFloorGradient)"
      />

      {/* 바닥 타일 결 */}
      <G stroke="#E2D4C3" strokeWidth={0.8} opacity={0.5} fill="none">
        <Path d="M5 198 Q160 192 315 198" />
        <Path d="M5 216 Q160 212 315 216" />
        <Path d="M65 178 L45 234" />
        <Path d="M135 176 L127 235" />
        <Path d="M205 176 L213 235" />
        <Path d="M270 178 L291 234" />
      </G>

      {/* 행거 아래 그림자 */}
      <Ellipse
        cx={160}
        cy={216}
        rx={137}
        ry={7}
        fill="#9E8D80"
        opacity={0.08}
      />

      {/* A자형 행거 프레임 - 뒤쪽 다리 */}
      <G stroke="#CDB496" strokeWidth={5} strokeLinecap="round" fill="none">
        <Path d="M20 215 L45 40" />
        <Path d="M300 215 L275 40" />
      </G>

      {/* A자형 행거 프레임 - 앞쪽 다리 */}
      <G
        stroke="url(#clothesWoodGradient)"
        strokeWidth={5}
        strokeLinecap="round"
        fill="none"
      >
        <Path d="M40 215 L45 40" />
        <Path d="M280 215 L275 40" />
      </G>

      {/* 다리의 은은한 나무결 */}
      <G
        stroke="#F8EBDD"
        strokeWidth={1}
        opacity={0.8}
        fill="none"
        strokeLinecap="round"
      >
        <Path d="M23 205 L44 53" />
        <Path d="M297 205 L276 53" />
      </G>

      {/* 상단 행거봉 */}
      <Path
        d="M15 40 H305"
        stroke={wood}
        strokeWidth={5}
        strokeLinecap="round"
      />
      <Path
        d="M18 39 H302"
        stroke="#F8EBDD"
        strokeWidth={1.2}
        strokeLinecap="round"
        opacity={0.8}
      />

      {/* 상단 봉 양쪽 끝 마감 */}
      <G fill="#C2AB8E">
        <Circle cx={15} cy={40} r={3} />
        <Circle cx={305} cy={40} r={3} />
      </G>

      {/* 행거 상단 연결 부품 */}
      <G fill="#D8C2A8" stroke={woodStroke} strokeWidth={0.8}>
        <Circle cx={45} cy={40} r={4} />
        <Circle cx={275} cy={40} r={4} />
      </G>

      {/* 옷걸이에 걸린 의류 */}
      <G opacity={0.82}>
        {/* 2. 버터크림 오버롤 */}
        <G>
          <Path
            d="M59 43 Q55 38 59 35 Q63 35 61 40 L76 48 L92 40"
            stroke="#C9BBAF"
            strokeWidth={1.2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <Path
            d="M64 48
               L69 57
               L82 57
               L87 48
               L94 51
               L91 93
               Q76 97 61 93
               L58 51 Z"
            fill="#FFF3E0"
            stroke="#EADDC8"
            strokeWidth={1.2}
            strokeLinejoin="round"
          />

          {/* 어깨끈 */}
          <Path
            d="M65 49 L69 58 M86 49 L82 58"
            stroke="#EADDC8"
            strokeWidth={3}
            strokeLinecap="round"
          />

          {/* 가슴 포켓 */}
          <Path
            d="M69 61 Q76 59 83 61 L82 71 Q76 74 70 71 Z"
            fill="#F9E8CA"
            stroke="#E6D5B9"
            strokeWidth={0.9}
          />
          <Circle cx={76} cy={63} r={1} fill="#D9C39E" />

          {/* 바지 밑단 */}
          <Path
            d="M62 91 L75 92 L75 95 M78 92 L90 91"
            stroke="#EADDC8"
            strokeWidth={0.9}
            fill="none"
          />
        </G>

        {/* 3. 라벤더 상의와 미니스커트 */}
        <G>
          <Path
            d="M94 43 Q90 38 94 35 Q98 35 96 40 L111 48 L127 40"
            stroke="#C9BBAF"
            strokeWidth={1.2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 상의 */}
          <Path
            d="M101 49
               L107 46 L114 46
               L120 49 L127 59
               L122 63 L118 58
               L119 70 L102 70
               L103 58 L99 63 L94 59 Z"
            fill="#EEEAF9"
            stroke="#D0C8EA"
            strokeWidth={1.1}
            strokeLinejoin="round"
          />
          <Path
            d="M107 47 L110 52 L114 47"
            fill="#F8F5FF"
            stroke="#D0C8EA"
            strokeWidth={0.8}
          />

          {/* 미니스커트 */}
          <Path
            d="M102 70 L119 70 L124 89 Q111 94 97 89 Z"
            fill="#E3DDF4"
            stroke="#D0C8EA"
            strokeWidth={1.1}
          />
          <Path
            d="M101 75 Q111 78 121 75"
            stroke="#D0C8EA"
            strokeWidth={0.8}
            fill="none"
          />
        </G>

        {/* 4. 피치 핑크 자켓과 롱 드레스 */}
        <G>
          <Path
            d="M129 43 Q125 38 129 35 Q133 35 131 40 L146 48 L162 40"
            stroke="#C9BBAF"
            strokeWidth={1.2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 안쪽 롱 드레스 */}
          <Path
            d="M140 50 L151 50
               L153 61
               L160 96
               Q146 100 132 96
               L139 61 Z"
            fill="#FFF4F0"
            stroke="#F0D2D5"
            strokeWidth={0.9}
          />
          <Path
            d="M140 53 L146 58 L151 53"
            stroke="#F0D2D5"
            strokeWidth={0.8}
            fill="none"
          />

          {/* 바깥 자켓 */}
          <Path
            d="M137 48
               L143 46 L147 53
               L151 46 L157 48
               L163 59 L158 63
               L155 58 L158 88
               L150 91 L147 70
               L144 91 L135 88
               L138 58 L135 63
               L130 59 Z"
            fill="#FDE4EC"
            stroke="#E8BCC8"
            strokeWidth={1.1}
            strokeLinejoin="round"
          />
          <Path
            d="M143 47 L147 59 L151 47"
            fill="#FFF6F7"
            stroke="#E8BCC8"
            strokeWidth={0.9}
          />
          <Path
            d="M147 61 L147 84"
            stroke="#E8BCC8"
            strokeWidth={0.8}
            fill="none"
          />
          <Circle cx={150} cy={66} r={1} fill="#DCA9B9" />
          <Circle cx={150} cy={73} r={1} fill="#DCA9B9" />
        </G>

        {/* 5. 세이지 그린 슬랙스 */}
        <G>
          <Path
            d="M163 43 Q159 38 163 35 Q167 35 165 40 L180 48 L196 40"
            stroke="#C9BBAF"
            strokeWidth={1.2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <Path
            d="M167 48
               Q180 51 193 48
               L192 68
               L196 94
               Q189 98 183 94
               L180 70
               L177 94
               Q170 98 164 94
               L168 68 Z"
            fill="#E2F0CE"
            stroke="#B2D0A0"
            strokeWidth={1.1}
            strokeLinejoin="round"
          />
          <Path
            d="M168 53 Q180 56 192 53"
            stroke="#C8DEB7"
            strokeWidth={0.9}
            fill="none"
          />
          <Path
            d="M180 55 L180 68"
            stroke="#C8DEB7"
            strokeWidth={0.8}
            fill="none"
          />
        </G>

        {/* 6. 크림 아이보리 블라우스 */}
        <G>
          <Path
            d="M198 43 Q194 38 198 35 Q202 35 200 40 L215 48 L231 40"
            stroke="#C9BBAF"
            strokeWidth={1.2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <Path
            d="M205 49
               L211 46 L218 46
               L224 49 L232 59
               L227 63 L223 58
               L224 87
               Q214 91 204 87
               L205 58 L201 63
               L196 59 Z"
            fill="#FFF8EF"
            stroke="#EADCC8"
            strokeWidth={1.1}
            strokeLinejoin="round"
          />

          {/* 셔츠 깃 */}
          <Path
            d="M211 47 L214 54 L218 47"
            fill="#FFFFFF"
            stroke="#EADCC8"
            strokeWidth={0.9}
          />

          {/* 단추 */}
          <Path
            d="M215 56 L215 81"
            stroke="#EADCC8"
            strokeWidth={0.8}
            fill="none"
          />
          <G fill="#D8C7B3">
            <Circle cx={215} cy={60} r={1} />
            <Circle cx={215} cy={66} r={1} />
            <Circle cx={215} cy={72} r={1} />
            <Circle cx={215} cy={78} r={1} />
          </G>
        </G>

        {/* 7. 연보라 숏팬츠 */}
        <G>
          <Path
            d="M230 43 Q226 38 230 35 Q234 35 232 40 L247 48 L263 40"
            stroke="#C9BBAF"
            strokeWidth={1.2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <Path
            d="M234 49
               Q247 52 260 49
               L259 72
               L248 73
               L246 64
               L244 73
               L233 72 Z"
            fill="#EEEAF9"
            stroke="#D0C8EA"
            strokeWidth={1.1}
            strokeLinejoin="round"
          />
          <Path
            d="M235 54 Q247 57 259 54"
            stroke="#D0C8EA"
            strokeWidth={0.9}
            fill="none"
          />
          <Path
            d="M247 56 L247 64"
            stroke="#D0C8EA"
            strokeWidth={0.8}
            fill="none"
          />
        </G>
      </G>

      {/* 하단 연결 지지대 */}
      <Path
        d="M30 195 H290"
        stroke="#DFCAB1"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <Path
        d="M32 194 H288"
        stroke="#F8EBDD"
        strokeWidth={0.8}
        strokeLinecap="round"
        opacity={0.8}
      />

      {/* 바닥에 닿는 다리 끝 */}
      <G fill="#C2AB8E">
        <Circle cx={20} cy={215} r={2.5} />
        <Circle cx={40} cy={215} r={2.5} />
        <Circle cx={280} cy={215} r={2.5} />
        <Circle cx={300} cy={215} r={2.5} />
      </G>

      {/* 전체 장면의 부드러운 앞쪽 라이팅 */}
      <Rect
        x={5}
        y={5}
        width={310}
        height={230}
        rx={10}
        fill="#FFFDF6"
        opacity={0.04}
        pointerEvents="none"
      />
    </>
  );
}

function ShoesScene() {
  const shoeColors = [
    "#FDE4EC", // 1층 왼쪽: 피치 핑크
    "#E4F2F9", // 1층 오른쪽: 하늘색
    "#EEEAF9", // 2층 왼쪽: 라벤더
    "#FFF3E0", // 2층 오른쪽: 버터 옐로우
    "#E2F0CE", // 3층 왼쪽: 올리브 그린
    "#DBCDF5", // 3층 오른쪽: 연보라
    "#F5DEB8", // 4층 왼쪽: 살구빛 부츠
  ];

  const Shoe = ({
    x,
    y,
    color,
    opacity = 0.65,
    kind = "sneaker",
  }: {
    x: number;
    y: number;
    color: string;
    opacity?: number;
    kind?: "sneaker" | "loafer" | "flat" | "boot";
  }) => (
    <G transform={`translate(${x} ${y})`} opacity={opacity}>
      {/* 신발 아래 은은한 그림자 */}
      <Ellipse
        cx="0"
        cy="13"
        rx={kind === "boot" ? 15 : 19}
        ry="2.5"
        fill="#9E8D80"
        opacity=".12"
      />

      {kind === "boot" ? (
        <>
          {/* 앵클 부츠의 목 부분 */}
          <Path
            d="M-8 -13 L7 -13 L8 1 L13 5 L16 9 L15 12 L-13 12 L-15 9 L-10 3 Z"
            fill={color}
            stroke="#CDB797"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <Path
            d="M-8 -10 L5 -10 M-8 -5 L6 -5"
            stroke="#FFFFFF"
            strokeWidth="1"
            opacity=".65"
          />
          <Path
            d="M-13 10 H15"
            stroke="#D5BFA4"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      ) : kind === "loafer" || kind === "flat" ? (
        <>
          {/* 로퍼 또는 플랫 슈즈 */}
          <Path
            d="M-19 3 Q-12 1 -7 -5 Q-2 -8 4 -4 L11 2 Q16 4 19 7 Q20 11 14 12 H-15 Q-21 11 -19 3 Z"
            fill={color}
            stroke="#CDBDAA"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <Path d="M-6 -3 Q1 -5 7 1 Q1 3 -5 1 Z" fill="#FFFFFF" opacity=".65" />
          <Path
            d="M-18 9 Q0 12 18 9"
            stroke="#D6C7B6"
            strokeWidth="1.5"
            fill="none"
          />
        </>
      ) : (
        <>
          {/* 스니커즈 윗부분 */}
          <Path
            d="M-20 2 Q-12 1 -7 -7 L-1 -5 L6 1 Q12 5 18 6 Q22 8 19 11 Q16 13 10 12 H-15 Q-22 11 -20 2 Z"
            fill={color}
            stroke="#CDBDAA"
            strokeWidth="1"
            strokeLinejoin="round"
          />

          {/* 발등과 뒤꿈치의 디테일 */}
          <Path
            d="M-7 -5 L-2 1 M-10 -2 L-4 4 M-13 1 L-7 6"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity=".85"
          />
          <Path
            d="M5 2 Q10 5 16 6"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            fill="none"
            opacity=".8"
          />

          {/* 밑창 */}
          <Path
            d="M-20 8 Q-2 12 19 8 Q21 10 18 12 Q0 15 -17 12 Q-21 11 -20 8 Z"
            fill="#FFFCF7"
            stroke="#D9CDBD"
            strokeWidth=".8"
          />
        </>
      )}
    </G>
  );

  const ShoeBox = () => (
    <G opacity=".7">
      <Ellipse cx="229" cy="151" rx="24" ry="3" fill="#9E8D80" opacity=".1" />
      <Path
        d="M205 135 L224 130 L251 135 L232 141 Z"
        fill="#EEE4D7"
        stroke="#CDBDAA"
        strokeWidth="1"
      />
      <Path
        d="M205 135 L232 141 L232 154 L205 148 Z"
        fill="#E0D4C5"
        stroke="#CDBDAA"
        strokeWidth="1"
      />
      <Path
        d="M232 141 L251 135 L251 148 L232 154 Z"
        fill="#D6C8B7"
        stroke="#CDBDAA"
        strokeWidth="1"
      />
      <Path
        d="M210 140 L227 144"
        stroke="#CDB797"
        strokeWidth="1"
        opacity=".8"
      />
      {/* 작은 금빛 장식 */}
      <Path
        d="M215 143 Q218 140 221 144 Q224 147 220 147 Q217 146 215 143"
        fill="none"
        stroke="#CDB797"
        strokeWidth=".8"
        opacity=".7"
      />
    </G>
  );

  return (
    <>
      {/* ───── 배경 그라데이션 ───── */}
      <Defs>
        <LinearGradient id="shoesSceneWall" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFFDF9" />
          <Stop offset="1" stopColor="#FCEEDC" />
        </LinearGradient>

        <LinearGradient id="shoesSceneWood" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#EFE3D3" />
          <Stop offset="1" stopColor="#DBC6AC" />
        </LinearGradient>

        <LinearGradient id="shoesSceneCabinet" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#F8F3EC" />
          <Stop offset="1" stopColor="#F0E8DE" />
        </LinearGradient>
      </Defs>

      {/* 둥근 배경: 모서리에 크림색 여백 유지 */}
      <Rect x="0" y="0" width="320" height="240" rx="14" fill="#F9F3EA" />
      <Rect
        x={0}
        y={0}
        width={320}
        height={240}
        rx="12"
        fill="url(#shoesSceneWall)"
      />

      {/* 상단의 부드러운 햇살 */}
      <Circle cx="77" cy="31" r="33" fill="#FFFFFF" opacity=".25" />
      <Circle cx="77" cy="31" r="19" fill="#FFFFFF" opacity=".18" />
      <Circle cx="251" cy="30" r="36" fill="#FFFFFF" opacity=".25" />
      <Circle cx="251" cy="30" r="20" fill="#FFFFFF" opacity=".18" />

      {/* 벽면의 은은한 하단 그림자 */}
      <Path
        d="M15 161 Q160 151 305 161 L305 177 L15 177 Z"
        fill="#9E8D80"
        opacity=".055"
      />

      {/* ───── 신발장 전체 외곽 ───── */}
      <Rect
        x="22"
        y="25"
        width="276"
        height="198"
        rx="5"
        fill="#9E8D80"
        opacity=".07"
      />
      <Rect
        x="20"
        y="23"
        width="280"
        height="198"
        rx="5"
        fill="url(#shoesSceneWood)"
        stroke="#C2AB8E"
        strokeWidth="1.2"
      />

      {/* 상단 몰딩 */}
      <Path
        d="M17 22 Q17 20 21 20 H299 Q303 20 303 23 L301 31 H19 Z"
        fill="#F5EBDD"
        stroke="#CDB99F"
        strokeWidth="1"
      />
      <Path d="M22 24 H298" stroke="#FFFFFF" strokeWidth="1.5" opacity=".85" />

      {/* ───── 4단 8칸 선반 ───── */}

      {/* 선반 뒤쪽의 은은한 안쪽 면 */}
      <Rect x="27" y="32" width="266" height="132" fill="#F8F1E7" />

      {/* 각 칸의 안쪽 면 */}
      {[
        { y: 32, h: 31 },
        { y: 65, h: 31 },
        { y: 98, h: 31 },
        { y: 131, h: 32 },
      ].map((row, i) => (
        <G key={`shoe-row-${i}`}>
          <Rect
            x="28"
            y={row.y}
            width="132"
            height={row.h}
            fill={i % 2 === 0 ? "#FBF7F0" : "#F7F0E6"}
          />
          <Rect
            x="161"
            y={row.y}
            width="131"
            height={row.h}
            fill={i % 2 === 0 ? "#FBF7F0" : "#F7F0E6"}
          />
        </G>
      ))}

      {/* 선반 안쪽의 얇은 그림자 */}
      <Path
        d="M28 33 H292 M28 66 H292 M28 99 H292 M28 132 H292"
        stroke="#9E8D80"
        strokeWidth="1"
        opacity=".07"
      />

      {/* 네 개의 가로 선반: 크림색 윗면 + 꿀빛 앞면 */}
      {[63, 96, 129, 163].map((y, i) => (
        <G key={`shoe-shelf-${i}`}>
          <Path
            d={`M25 ${y - 3} L295 ${y - 3} L295 ${y + 1} L25 ${y + 1} Z`}
            fill="#FAF6ED"
          />
          <Path
            d={`M25 ${y + 1} L295 ${y + 1} L295 ${y + 5} L25 ${y + 5} Z`}
            fill="#DFCAB1"
            stroke="#C2AB8E"
            strokeWidth=".65"
          />
          <Path
            d={`M28 ${y + 1} H292`}
            stroke="#FFFFFF"
            strokeWidth=".8"
            opacity=".8"
          />
          <Path
            d={`M27 ${y + 5} H293`}
            stroke="#9E8D80"
            strokeWidth=".8"
            opacity=".08"
          />
        </G>
      ))}

      {/* 중앙 세로 칸막이 */}
      <Rect x="157" y="30" width="6" height="135" fill="#E9D9C5" />
      <Path d="M158 31 V164" stroke="#FFFFFF" strokeWidth="1" opacity=".8" />
      <Path d="M163 31 V164" stroke="#9E8D80" strokeWidth="1" opacity=".08" />

      {/* 좌우 프레임의 부드러운 안쪽 테두리 */}
      <Path
        d="M26 31 V164 M294 31 V164"
        stroke="#C2AB8E"
        strokeWidth="1.2"
        opacity=".8"
      />

      {/* ───── 1층: 피치 핑크 스니커즈 / 하늘색 로퍼 ───── */}
      <Shoe x={91} y={49} color="#FDE4EC" opacity={0.6} kind="sneaker" />
      <Shoe x={127} y={49} color="#FDE4EC" opacity={0.6} kind="sneaker" />
      <Shoe x={213} y={49} color="#E4F2F9" opacity={0.6} kind="loafer" />
      <Shoe x={247} y={49} color="#E4F2F9" opacity={0.6} kind="loafer" />

      {/* ───── 2층: 라벤더 플랫 / 버터 옐로우 단화 ───── */}
      <Shoe x={91} y={82} color="#EEEAF9" opacity={0.7} kind="flat" />
      <Shoe x={127} y={82} color="#EEEAF9" opacity={0.7} kind="flat" />
      <Shoe x={213} y={82} color="#FFF3E0" opacity={0.7} kind="loafer" />
      <Shoe x={247} y={82} color="#FFF3E0" opacity={0.7} kind="loafer" />

      {/* ───── 3층: 올리브 그린 / 연보라 스니커즈 ───── */}
      <Shoe x={91} y={115} color="#E2F0CE" opacity={0.6} kind="sneaker" />
      <Shoe x={127} y={115} color="#E2F0CE" opacity={0.6} kind="sneaker" />
      <Shoe x={213} y={115} color="#DBCDF5" opacity={0.6} kind="sneaker" />
      <Shoe x={247} y={115} color="#DBCDF5" opacity={0.6} kind="sneaker" />

      {/* ───── 4층: 앵클 부츠 / 신발 상자 ───── */}
      <Shoe x={91} y={150} color="#F5DEB8" opacity={0.7} kind="boot" />
      <Shoe x={127} y={150} color="#F5DEB8" opacity={0.7} kind="boot" />
      {/* <ShoeBox /> */}

      {/* ───── 하단 캐비닛 ───── */}
      <Rect
        x="23"
        y="169"
        width="274"
        height="49"
        rx="3"
        fill="url(#shoesSceneCabinet)"
        stroke="#DBCDC0"
        strokeWidth="1.2"
      />

      {/* 왼쪽 문짝 */}
      <Rect
        x="29"
        y="174"
        width="129"
        height="38"
        rx="2"
        fill="#F2ECE4"
        stroke="#DBCDC0"
        strokeWidth="1"
      />
      <Rect
        x="34"
        y="178"
        width="119"
        height="30"
        rx="1.5"
        fill="#F7F2EB"
        stroke="#FFFFFF"
        strokeWidth=".8"
        opacity=".9"
      />

      {/* 오른쪽 문짝 */}
      <Rect
        x="162"
        y="174"
        width="129"
        height="38"
        rx="2"
        fill="#F2ECE4"
        stroke="#DBCDC0"
        strokeWidth="1"
      />
      <Rect
        x="167"
        y="178"
        width="119"
        height="30"
        rx="1.5"
        fill="#F7F2EB"
        stroke="#FFFFFF"
        strokeWidth=".8"
        opacity=".9"
      />

      {/* 문짝 손잡이: 로즈 베이지 */}
      <Rect
        x="143"
        y="188"
        width="5"
        height="13"
        rx="2.5"
        fill="#C2AB8E"
        stroke="#FFFFFF"
        strokeWidth=".8"
      />
      <Rect
        x="172"
        y="188"
        width="5"
        height="13"
        rx="2.5"
        fill="#C2AB8E"
        stroke="#FFFFFF"
        strokeWidth=".8"
      />

      {/* 손잡이의 은은한 하이라이트 */}
      <Path
        d="M144.5 191 V198 M173.5 191 V198"
        stroke="#FFFFFF"
        strokeWidth=".8"
        strokeLinecap="round"
        opacity=".8"
      />

      {/* 캐비닛 하단 받침 */}
      <Path
        d="M20 218 H300 L297 222 H23 Z"
        fill="#E2D3C0"
        stroke="#CDBDAA"
        strokeWidth=".8"
      />
      <Path d="M25 219 H295" stroke="#FFFFFF" strokeWidth="1" opacity=".8" />

      {/* 바닥 경계의 피치 핑크 빛무리 */}
      <Ellipse cx="160" cy="223" rx="100" ry="12" fill="#FDE4EC" opacity=".3" />
      <Ellipse cx="160" cy="224" rx="70" ry="6" fill="#FFF3E0" opacity=".45" />

      {/* 앞쪽 바닥의 은은한 그림자 */}
      <Path
        d="M15 228 Q160 220 305 228 L305 233 H15 Z"
        fill="#9E8D80"
        opacity=".045"
      />
    </>
  );
}

function HairpinScene() {
  const wood = "#EADCC8";
  const woodStroke = "#D6C2A8";
  const cord = "#FFF8EF";

  return (
    <>
      <Defs>
        <LinearGradient id="hairpinWallGradient" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFFCFF" />
          <Stop offset="1" stopColor="#F5F0FA" />
        </LinearGradient>

        <LinearGradient id="hairpinWoodGradient" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FFF8EF" />
          <Stop offset="0.5" stopColor="#EADCC8" />
          <Stop offset="1" stopColor="#E0CFB8" />
        </LinearGradient>
      </Defs>

      {/* 바깥쪽 라벤더 프레임 */}
      <Rect x={0} y={0} width={320} height={240} rx={14} fill="#F0E6FF" />

      {/* 우유빛 벽면 */}
      <Rect
        x={0}
        y={0}
        width={320}
        height={240}
        rx={11}
        fill="url(#hairpinWallGradient)"
      />

      {/* 벽면 햇살 */}
      <Circle cx={160} cy={45} r={52} fill="#FFFFFF" opacity={0.2} />
      <Circle cx={160} cy={45} r={34} fill="#FFFFFF" opacity={0.2} />
      <Circle cx={70} cy={32} r={25} fill="#FFFDF9" opacity={0.18} />

      {/* 위쪽 걸이 끈 */}
      <Path d="M160 0 V29" stroke="#E2D4C3" strokeWidth={1.5} />

      {/* 구름판 그림자 */}
      <Path
        d="M105 72
           C91 72 83 63 85 53
           C87 43 96 39 106 42
           C111 28 124 24 136 32
           C146 19 166 20 176 33
           C190 27 205 35 208 47
           C221 46 230 55 228 65
           C226 73 217 77 207 77
           H109 Z"
        fill="#D9C9B8"
        opacity={0.18}
      />

      {/* 구름 모양 우드 판 */}
      <Path
        d="M105 68
           C91 68 83 59 85 49
           C87 39 96 35 106 38
           C111 24 124 20 136 28
           C146 15 166 16 176 29
           C190 23 205 31 208 43
           C221 42 230 51 228 61
           C226 69 217 73 207 73
           H109 Z"
        fill="url(#hairpinWoodGradient)"
        stroke={woodStroke}
        strokeWidth={1.2}
        strokeLinejoin="round"
      />

      {/* 구름판의 나무결 */}
      <Path
        d="M103 44 Q120 39 133 44 M176 39 Q190 35 201 43"
        stroke="#FFFDF8"
        strokeWidth={1.2}
        opacity={0.65}
        strokeLinecap="round"
        fill="none"
      />

      {/* 구름판 아래 끈 구멍 */}
      <G fill="#D8C5AD">
        <Rect x={103} y={68} width={13} height={7} rx={3} />
        <Rect x={153.5} y={68} width={13} height={7} rx={3} />
        <Rect x={204} y={68} width={13} height={7} rx={3} />
      </G>

      {/* 감은 눈과 속눈썹 */}
      <G
        stroke="#A88F75"
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* 왼쪽 눈 */}
        <Path d="M124 48 Q132 57 140 48" />
        <Path d="M126 49 L123 46 M131 53 L131 57 M137 50 L140 47" />

        {/* 오른쪽 눈 */}
        <Path d="M180 48 Q188 57 196 48" />
        <Path d="M182 50 L179 47 M188 53 L188 57 M194 49 L197 46" />
      </G>

      {/* 작은 미소 */}
      <Path
        d="M151 54 Q160 61 169 54"
        stroke="#A88F75"
        strokeWidth={1.4}
        strokeLinecap="round"
        fill="none"
      />

      {/* 마크라메 끈 3줄 */}
      <G opacity={0.95}>
        {[110, 160, 210].map((x) => (
          <G key={x}>
            {/* 부드러운 끈 그림자 */}
            <Path
              d={`M${x} 75 V220`}
              stroke="#E5D6C7"
              strokeWidth={4}
              strokeLinecap="round"
              opacity={0.35}
            />

            {/* 끈 본체 */}
            <Path
              d={`M${x - 1} 75 V220`}
              stroke={cord}
              strokeWidth={2.2}
              strokeLinecap="round"
            />

            {/* 꼬임 텍스처 */}
            {Array.from({ length: 18 }, (_, i) => {
              const y = 82 + i * 7.5;
              return (
                <Path
                  key={`${x}-${i}`}
                  d={`M${x - 1.2} ${y} l2.4 3`}
                  stroke="#EADCC8"
                  strokeWidth={0.8}
                  opacity={0.65}
                  strokeLinecap="round"
                />
              );
            })}
          </G>
        ))}
      </G>

      {/* 머리핀 그룹 전체: 배경 소품이므로 은은하게 */}
      <G opacity={0.82}>
        {/* 왼쪽 1: 스마일 사각핀 */}
        <G>
          <Rect
            x={96}
            y={96}
            width={28}
            height={17}
            rx={5}
            fill="#FFF3E0"
            stroke="#EADCC8"
            strokeWidth={1}
            opacity={0.75}
          />
          <Circle cx={105} cy={103} r={1.2} fill="#B7A18B" />
          <Circle cx={115} cy={103} r={1.2} fill="#B7A18B" />
          <Path
            d="M103 107 Q110 113 117 107"
            stroke="#B7A18B"
            strokeWidth={1}
            fill="none"
            strokeLinecap="round"
          />
        </G>

        {/* 왼쪽 2: 입체 꽃핀 */}
        <G transform="translate(110 128)" opacity={0.7}>
          <G fill="#FDE4EC" stroke="#E8BCC8" strokeWidth={0.8}>
            <Ellipse cx={0} cy={-6} rx={4.5} ry={6} />
            <Ellipse cx={0} cy={6} rx={4.5} ry={6} />
            <Ellipse cx={-6} cy={0} rx={6} ry={4.5} />
            <Ellipse cx={6} cy={0} rx={6} ry={4.5} />
          </G>
          <Circle cx={0} cy={0} r={3} fill="#FFF3E0" />
        </G>

        {/* 왼쪽 3: 패브릭 사각 집게핀 */}
        <G opacity={0.75}>
          <Rect
            x={97}
            y={145}
            width={26}
            height={15}
            rx={4}
            fill="#E2F0CE"
            stroke="#B2D0A0"
            strokeWidth={1}
          />
          <Path
            d="M101 149 L119 149 M101 153 L119 153 M101 157 L119 157"
            stroke="#C4DAB2"
            strokeWidth={0.8}
          />
        </G>

        {/* 왼쪽 4: 라벤더 곰돌이 핀 */}
        <G transform="translate(110 179)" opacity={0.8}>
          <Circle cx={-7} cy={-7} r={5} fill="#EEEAF9" stroke="#D0C8EA" />
          <Circle cx={7} cy={-7} r={5} fill="#EEEAF9" stroke="#D0C8EA" />
          <Circle cx={0} cy={0} r={10} fill="#EEEAF9" stroke="#D0C8EA" />
          <Circle cx={-3} cy={-1} r={1} fill="#A99CC5" />
          <Circle cx={3} cy={-1} r={1} fill="#A99CC5" />
          <Ellipse cx={0} cy={3} rx={2.5} ry={1.8} fill="#D7B7D0" />
        </G>

        {/* 왼쪽 5: 오벌 폼폼 */}
        <G opacity={0.7}>
          <Ellipse
            cx={110}
            cy={207}
            rx={10}
            ry={6}
            fill="#FFF8EF"
            stroke="#EADCC8"
            strokeWidth={1}
          />
          <Circle cx={103} cy={204} r={2} fill="#FFFFFF" />
          <Circle cx={111} cy={203} r={2.2} fill="#FFFFFF" />
          <Circle cx={117} cy={207} r={1.8} fill="#FFFFFF" />
          <Circle cx={109} cy={211} r={1.8} fill="#F3E9DB" />
        </G>

        {/* 중앙 1: 삼각 꽃핀 */}
        <G transform="translate(160 118)" opacity={0.7}>
          <Path
            d="M0-10 L3-3 L10-3 L5 2 L7 9 L0 5 L-7 9 L-5 2 L-10-3 L-3-3 Z"
            fill="#EADCC8"
            stroke="#D6C2A8"
            strokeWidth={0.9}
          />
          <Circle cx={0} cy={0} r={2.3} fill="#FFF8EF" />
        </G>

        {/* 중앙 2: 리본 똑딱핀 */}
        <G transform="translate(160 145)" opacity={0.65}>
          <Path
            d="M0 0 L-12-7 L-13 5 L-2 4 Z"
            fill="#FDE4EC"
            stroke="#E8BCC8"
            strokeWidth={0.8}
          />
          <Path
            d="M0 0 L12-7 L13 5 L2 4 Z"
            fill="#FDE4EC"
            stroke="#E8BCC8"
            strokeWidth={0.8}
          />
          <Ellipse cx={0} cy={1} rx={3} ry={4} fill="#E8BCC8" />
        </G>

        {/* 중앙 3: 폼폼 볼 2개 */}
        <G opacity={0.75}>
          <Circle cx={153} cy={169} r={6} fill="#FFF3E0" stroke="#EADCC8" />
          <Circle cx={167} cy={169} r={6} fill="#FFF3E0" stroke="#EADCC8" />
          <Circle cx={151} cy={167} r={1.5} fill="#FFFFFF" />
          <Circle cx={165} cy={167} r={1.5} fill="#FFFFFF" />
        </G>

        {/* 중앙 4: 꼬임 웨이브 핀 */}
        <Path
          d="M145 198 Q150 190 155 198 T165 198 T175 198"
          stroke="#D0C8EA"
          strokeWidth={5}
          strokeLinecap="round"
          fill="none"
          opacity={0.7}
        />
        <Path
          d="M145 197 Q150 189 155 197 T165 197 T175 197"
          stroke="#EEEAF9"
          strokeWidth={3.5}
          strokeLinecap="round"
          fill="none"
        />

        {/* 오른쪽 1: 동물 장식 사각핀 */}
        <G opacity={0.7}>
          <Rect
            x={196}
            y={103}
            width={28}
            height={17}
            rx={5}
            fill="#E2CAB2"
            stroke="#D1B89D"
            strokeWidth={1}
          />
          <Circle cx={210} cy={111} r={5} fill="#F6E8D7" />
          <Circle cx={206} cy={107} r={2.5} fill="#F6E8D7" />
          <Circle cx={214} cy={107} r={2.5} fill="#F6E8D7" />
          <Circle cx={208} cy={111} r={0.8} fill="#A88F75" />
          <Circle cx={212} cy={111} r={0.8} fill="#A88F75" />
        </G>

        {/* 오른쪽 2: 뽀글 핑크 집게핀 */}
        <G opacity={0.75}>
          <Rect
            x={198}
            y={132}
            width={24}
            height={13}
            rx={6}
            fill="#FDE4EC"
            stroke="#E8BCC8"
            strokeWidth={0.8}
          />
          {[202, 207, 212, 217].map((x) => (
            <Circle key={x} cx={x} cy={133} r={2.3} fill="#FFF5F7" />
          ))}
          <Path d="M201 138 H219" stroke="#E8BCC8" strokeWidth={0.8} />
        </G>

        {/* 오른쪽 3: 타원 니트 핀 */}
        <G opacity={0.65}>
          <Ellipse
            cx={210}
            cy={162}
            rx={11}
            ry={7}
            fill="#E4F2F9"
            stroke="#B8D9EA"
            strokeWidth={1}
          />
          <Path
            d="M203 159 Q210 164 217 159 M203 163 Q210 168 217 163"
            stroke="#C5E1ED"
            strokeWidth={0.8}
            fill="none"
          />
        </G>

        {/* 오른쪽 4: 물방울 바비핀 */}
        <Path
          d="M210 179
             Q222 187 210 198
             Q198 187 210 179 Z"
          fill="#FFF8EF"
          stroke="#EADCC8"
          strokeWidth={1}
          opacity={0.8}
        />
        <Path
          d="M210 182 L210 194"
          stroke="#E0CFB8"
          strokeWidth={0.8}
          strokeLinecap="round"
        />

        {/* 오른쪽 5: 곰돌이 패치 핀 */}
        <G opacity={0.75}>
          <Rect
            x={197}
            y={205}
            width={26}
            height={14}
            rx={4}
            fill="#FFF3E0"
            stroke="#EADCC8"
            strokeWidth={0.9}
          />
          <Circle cx={210} cy={211} r={4.5} fill="#E2CAB2" />
          <Circle cx={206.5} cy={208} r={2.2} fill="#E2CAB2" />
          <Circle cx={213.5} cy={208} r={2.2} fill="#E2CAB2" />
          <Circle cx={208.5} cy={210} r={0.7} fill="#8E7A68" />
          <Circle cx={211.5} cy={210} r={0.7} fill="#8E7A68" />
          <Ellipse cx={210} cy={213} rx={1.5} ry={1} fill="#B69D80" />
        </G>
      </G>

      {/* 앞쪽의 우유빛 라이팅 */}
      <Ellipse
        cx={160}
        cy={224}
        rx={120}
        ry={17}
        fill="#FFFDF6"
        opacity={0.35}
      />
    </>
  );
}

function NecklaceScene() {
  return (
    <>
      {/* 포근하고 따뜻한 실내 벽면 */}
      <Wall warm />

      {/* 내부 보더 프레임 (은은한 피치크림) */}
      <Rect x="18" y="15" width="284" height="210" rx="12" fill="#FFFCF7" />

      {/* 목걸이 마네킹 (소프트 크림 베이지 톤) */}
      <Path
        d="M134 58V92Q130 101 111 108L76 124Q64 130 69 145L80 176H240L251 145Q256 130 244 124L209 108Q190 101 186 92V58Z"
        fill="#F4ECE2"
        stroke="#DBCDC0"
        strokeWidth="1.2"
      />

      {/* 마네킹 목선 디테일 */}
      <Path
        d="M134 58Q160 69 186 58M132 93Q160 119 188 93"
        stroke="#D8C9B9"
        strokeWidth="1.2"
        fill="none"
        opacity=".7"
      />

      {/* 보조 목걸이 체인 (은은한 버터크림 로즈골드) */}
      <Path
        d="M132 98Q117 135 160 153Q203 135 188 98"
        stroke="#E6D0AC"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity=".8"
      />
      <Path
        d="M132 98Q117 135 160 153Q203 135 188 98"
        stroke="#FFF8EC"
        strokeWidth="1.2"
        fill="none"
        opacity=".9"
      />

      {/* 보조 목걸이 펜던트 (소프트 피치 파스텔) */}
      <G opacity=".8">
        <Circle
          cx="160"
          cy="153"
          r="10"
          fill="#FFEACC"
          stroke="#E0C29A"
          strokeWidth="1.2"
        />
        <Path
          d="M160 145C150 137 145 148 160 160C175 148 170 137 160 145Z"
          fill="#FDE4EC"
          stroke="#E8BCC8"
          strokeWidth="1.2"
        />
      </G>

      {/* 하단 진열대 받침 (소프트 우드 베이지) */}
      {/* <Rect
        x="35"
        y="187"
        width="250"
        height="18"
        rx="5"
        fill="#EADFCF"
        stroke="#D9C9BD"
        strokeWidth="1"
      /> */}

      {/* 은은한 배경 반짝임 반사광 (투명하게 처리) */}
      <Path
        d="M51 72L55 82L65 86L55 90L51 100L47 90L37 86L47 82Z M264 69L267 76L274 79L267 82L264 89L261 82L254 79L261 76Z"
        fill="#FFF3D6"
        opacity=".6"
      />
    </>
  );
}

function GlassesScene() {
  // 안경 한 쌍을 그리는 공통 SVG 컴포넌트
  const Glasses = ({
    color = "#76C9D2",
    stroke = "#A8DDE0",
    shape = "round",
  }: {
    color?: string;
    stroke?: string;
    shape?: "round" | "square" | "cat" | "oval";
  }) => {
    const frame =
      shape === "square"
        ? "M-25-9 Q-25-12-21-12 H-7 Q-4-12-4-8 V7 Q-4 11-8 11 H-21 Q-25 11-25 7 Z M4-8 Q4-12 8-12 H21 Q25-12 25-8 V7 Q25 11 21 11 H8 Q4 11 4 7 Z"
        : shape === "cat"
          ? "M-26-10 L-8-13 Q-4-12-4-7 L-7 7 Q-10 13-20 9 Q-25 5-26-10 Z M8-13 L26-10 Q25 5 20 9 Q10 13 7 7 L4-7 Q4-12 8-13 Z"
          : shape === "oval"
            ? "M-26-2 Q-26-13-15-12 Q-4-12-4 0 Q-4 12-15 12 Q-26 12-26-2 Z M4 0 Q4-12 15-12 Q26-13 26-2 Q26 12 15 12 Q4 12 4 0 Z"
            : "M-27-2 Q-27-13-16-12 Q-5-12-4-2 Q-4 11-16 11 Q-27 11-27-2 Z M4-2 Q5-12 16-12 Q27-13 27-2 Q27 11 16 11 Q4 11 4-2 Z";

    return (
      <G>
        <Path
          d={frame}
          fill={color}
          fillOpacity={0.13}
          stroke={stroke}
          strokeWidth={2.2}
          strokeLinejoin="round"
        />
        <Path
          d="M-4-3 Q0-7 4-3 M-27-5 L-34-9 M27-5 L34-9"
          fill="none"
          stroke={stroke}
          strokeWidth={2}
          strokeLinecap="round"
        />
        <Path
          d="M-21-7 Q-15-11-10-7 M10-7 Q16-11 21-7"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={1.2}
          opacity={0.85}
          strokeLinecap="round"
        />
      </G>
    );
  };

  return (
    <>
      {/* 1. 배경과 벽면 */}
      <Rect x="0" y="0" width="320" height="240" rx="14" fill="#DFF7F7" />

      <Defs>
        <LinearGradient id="glassesWall" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FDFEFF" />
          <Stop offset="1" stopColor="#EAF8F9" />
        </LinearGradient>

        <LinearGradient id="glassesCounter" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#D7F0F0" />
          <Stop offset="1" stopColor="#B9DDE0" />
        </LinearGradient>
      </Defs>

      <Rect
        x={0}
        y={0}
        width={320}
        height={260}
        rx="12"
        fill="url(#glassesWall)"
      />

      {/* 천장 펜던트 조명 */}
      <G opacity={0.7}>
        {[70, 250].map((x) => (
          <G key={x}>
            <Path d={`M${x} 3 V15`} stroke="#A8DDE0" strokeWidth={1.2} />
            <Circle
              cx={x}
              cy="18"
              r="5"
              fill="#FFF8EF"
              stroke="#A8DDE0"
              strokeWidth={1}
            />
            <Circle cx={x} cy="18" r="9" fill="#FFF8EF" opacity={0.22} />
          </G>
        ))}
      </G>

      {/* 가구와 안경 진열 소품 전체를 은은하게 표현 */}
      <G opacity={0.82}>
        {/* 2. 중앙 아치형 쇼룸 */}
        <Path
          d="M105 181 V82 Q160 34 215 82 V181 Z"
          fill="#C4E8E9"
          stroke="#A8DDE0"
          strokeWidth={1.5}
        />

        <Path
          d="M114 175 V84 Q160 46 206 84 V175 Z"
          fill="#FFFDF7"
          stroke="#D3E9E9"
          strokeWidth={1}
        />

        {/* 아치 안쪽의 은은한 세로 장식 */}
        <Path d="M160 59 V171" stroke="#EAF8F9" strokeWidth={1.2} />

        {/* 중앙 아치 안경 - 위쪽 */}
        <G transform="translate(160 87)">
          <Glasses color="#F2B5C7" stroke="#E5A1B7" shape="round" />
        </G>
        {/* <G transform="translate(182 82)">
          <Glasses color="#76C9D2" stroke="#65B7C0" shape="round" />
        </G> */}

        {/* 중앙 아치 안경 - 가운데 */}
        <G transform="translate(160 113)">
          <Glasses color="#B7A5E8" stroke="#A294D2" shape="square" />
        </G>
        {/* <G transform="translate(182 108)">
          <Glasses color="#C79C3B" stroke="#B58A34" shape="cat" />
        </G> */}

        {/* 중앙 아치 안경 - 아래쪽 */}
        <G transform="translate(160 139)">
          <Glasses color="#F4D27A" stroke="#D8B85F" shape="oval" />
        </G>
        {/* <G transform="translate(182 134)">
          <Glasses color="#8874C4" stroke="#9B8ACF" shape="square" />
        </G> */}

        {/* 아치 하단 장식 선반 */}
        <Rect x="108" y="151" width="104" height="4" rx="2" fill="#D8F1F1" />
        <Rect x="112" y="173" width="96" height="5" rx="2.5" fill="#C4E8E9" />

        {/* 3. 좌우 세로형 진열 프레임 */}
        {[25, 245].map((x, index) => (
          <G key={x}>
            <Rect
              x={x}
              y="55"
              width="50"
              height="96"
              rx="6"
              fill="#FDFEFF"
              stroke="#A8DDE0"
              strokeWidth={1.2}
            />

            {[82, 110, 138].map((y) => (
              <Path
                key={y}
                d={`M${x + 5} ${y} H${x + 45}`}
                stroke="#D8F1F1"
                strokeWidth={1.4}
              />
            ))}

            <G transform={`translate(${x + 25} 72)`}>
              <Glasses
                color={index === 0 ? "#F2B5C7" : "#76C9D2"}
                stroke={index === 0 ? "#E5A1B7" : "#65B7C0"}
                shape="round"
              />
            </G>

            <G transform={`translate(${x + 25} 100)`}>
              <Glasses
                color={index === 0 ? "#B7A5E8" : "#C79C3B"}
                stroke={index === 0 ? "#A294D2" : "#B58A34"}
                shape="square"
              />
            </G>

            <G transform={`translate(${x + 25} 128)`}>
              <Glasses
                color={index === 0 ? "#F4D27A" : "#B7A5E8"}
                stroke={index === 0 ? "#D8B85F" : "#A294D2"}
                shape="oval"
              />
            </G>
          </G>
        ))}

        {/* 카운터 전면의 은은한 패널 */}
        <Rect
          x="91"
          y="195"
          width="138"
          height="14"
          rx="3"
          fill="#D8F1F1"
          opacity={0.8}
        />

        {/* 미니 안경 케이스 */}
        <G>
          <Rect
            x="143"
            y="171"
            width="23"
            height="9"
            rx="3"
            fill="#F2B5C7"
            stroke="#E5A1B7"
            strokeWidth={0.8}
          />
          <Path
            d="M145 171 Q154 165 164 171"
            fill="#FFF3F5"
            stroke="#E5A1B7"
            strokeWidth={0.8}
          />
          <Rect
            x="171"
            y="173"
            width="15"
            height="7"
            rx="2.5"
            fill="#FFF8EF"
            stroke="#D8CDBD"
            strokeWidth={0.8}
          />
        </G>

        {/* 쇼룸 바닥선 */}
        <Path
          d="M15 220 Q160 216 305 220"
          fill="none"
          stroke="#D8F1F1"
          strokeWidth={2}
        />
      </G>

      {/* 6. 전체를 부드럽게 감싸는 민트빛 오버레이 */}
      <Rect
        x="3"
        y="3"
        width="314"
        height="234"
        rx="12"
        fill="#FFFFFF"
        opacity={0.16}
      />

      {/* 상단 조명에서 퍼지는 부드러운 빛 */}
      <Ellipse
        cx="160"
        cy="30"
        rx="112"
        ry="27"
        fill="#FFFFFF"
        opacity={0.18}
      />
    </>
  );
}

function ClothingScene() {
  // 옷 색상: 원색을 빼고 아주 연한 소프트 파스텔 톤으로 변경
  const garmentColors = [
    { fill: "#FDE4EC", stroke: "#E8BCC8" }, // 연핑크
    { fill: "#E4F2F9", stroke: "#B8D9EA" }, // 연블루
    { fill: "#EEEAF9", stroke: "#D0C8EA" }, // 연퍼플
    { fill: "#FFF3E0", stroke: "#EADDC8" }, // 연옐로우
  ];

  // 바닥 타일 선: 색상을 연하게
  const floorTiles = [
    "M0 190 L320 190",
    "M0 211 L320 211",
    "M0 235 L320 235",
    "M45 170 L20 240",
    "M100 170 L87 240",
    "M160 170 L160 240",
    "M220 170 L233 240",
    "M275 170 L300 240",
  ];

  // 옷걸이 컴포넌트 업데이트
  const Hanger = ({
    x,
    y,
    color,
    kind = "top",
    scale = 1,
  }: {
    x: number;
    y: number;
    color: string;
    kind?: "top" | "dress" | "pants";
    scale?: number;
  }) => (
    <G transform={`translate(${x} ${y}) scale(${scale})`} opacity=".9">
      {/* 옷걸이 고리 & 바: 색상을 연한 베이지로 */}
      <Path
        d="M0 0 Q-4 -5 0 -8 Q4 -8 3 -4"
        fill="none"
        stroke="#C9BBAF"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <Path
        d="M0 0 L-12 7 L12 7 Z"
        fill="none"
        stroke="#E2D4C3"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* 옷 형태 (공통 스트로크 색상 변경) */}
      {kind === "top" && (
        <Path
          d="M-9 8 L-15 12 L-12 19 L-10 18 L-10 35 Q0 38 10 35 L10 18 L12 19 L15 12 L9 8 L4 11 L-4 11 Z"
          fill={color}
          stroke="#D4B9BD"
          strokeWidth=".8"
          strokeLinejoin="round"
        />
      )}

      {kind === "dress" && (
        <Path
          d="M-7 8 L-13 12 L-10 19 L-7 17 L-15 39 Q0 43 15 39 L7 17 L10 19 L13 12 L7 8 L3 11 L-3 11 Z"
          fill={color}
          stroke="#D4B9BD"
          strokeWidth=".8"
          strokeLinejoin="round"
        />
      )}

      {kind === "pants" && (
        <Path
          d="M-9 8 L9 8 L10 19 L6 38 L0 38 L-2 23 L-5 38 L-11 38 L-10 19 Z"
          fill={color}
          stroke="#D4B9BD"
          strokeWidth=".8"
          strokeLinejoin="round"
        />
      )}
    </G>
  );

  // 가방 컴포넌트 업데이트
  const Bag = ({
    x,
    y,
    color,
    scale = 1,
  }: {
    x: number;
    y: number;
    color: string;
    scale?: number;
  }) => (
    <G transform={`translate(${x} ${y}) scale(${scale})`} opacity=".85">
      <Ellipse cx="0" cy="20" rx="16" ry="3" fill="#9E8D80" opacity=".1" />
      {/* 손잡이 & 본체 스트로크 연하게 */}
      <Path
        d="M-10 3 Q-10 -8 0 -8 Q10 -8 10 3"
        fill="none"
        stroke="#C9C2DB"
        strokeWidth="2.5"
      />
      <Path
        d="M-14 2 Q-14 -1 -10 -1 H10 Q14 -1 14 3 L12 19 Q0 23 -12 19 Z"
        fill={color}
        stroke="#C9AAB9"
        strokeWidth="1"
      />
      <Path
        d="M-5 2 Q0 -2 5 2"
        fill="none"
        stroke="#FFFDF9"
        strokeWidth="1.2"
      />
      <Circle cx="0" cy="8" r="1.8" fill="#EBD9AE" />
    </G>
  );

  // 모자 컴포넌트 업데이트
  const Hat = ({
    x,
    y,
    color,
    scale = 1,
  }: {
    x: number;
    y: number;
    color: string;
    scale?: number;
  }) => (
    <G transform={`translate(${x} ${y}) scale(${scale})`} opacity=".85">
      <Ellipse
        cx="0"
        cy="9"
        rx="17"
        ry="4"
        fill={color}
        stroke="#CDB59A"
        strokeWidth="1"
      />
      <Path
        d="M-11 7 L-8 -3 Q0 -11 8 -3 L11 7 Z"
        fill={color}
        stroke="#CDB59A"
        strokeWidth="1"
      />
      <Path d="M-8 3 H8" stroke="#FFF9EB" strokeWidth="1.5" />
    </G>
  );

  // 구두 컴포넌트 업데이트
  const ShoePair = ({
    x,
    y,
    color,
    scale = 1,
  }: {
    x: number;
    y: number;
    color: string;
    scale?: number;
  }) => (
    <G transform={`translate(${x} ${y}) scale(${scale})`} opacity=".8">
      <Ellipse cx="0" cy="16" rx="22" ry="3" fill="#9E8D80" opacity=".08" />
      <Path
        d="M-20 4 Q-12 4 -8 -5 L-3 -3 L1 7 Q5 11 14 11 Q20 12 19 16 H-17 Q-23 14 -20 4 Z"
        fill={color}
        stroke="#C9AAB5"
        strokeWidth="1"
      />
      <Path
        d="M-20 13 H19"
        stroke="#FFFEFA"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </G>
  );

  return (
    <>
      {/* 따뜻한 벽면 (Wall 컴포넌트는 그대로 유지하거나 색상을 살짝 더 연하게 조정) */}
      <Wall warm />

      {/* 천장과 벽의 안쪽 테두리: 색상 완화 */}
      <Path
        d="M8 12 L312 12 L312 179 L8 179 Z"
        fill="none"
        stroke="#F2EAE0"
        strokeWidth="1.5"
      />
      <Path
        d="M8 12 L160 4 L312 12"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        opacity=".8"
      />

      {/* 천장 조명: 채도 낮춤 */}
      <Path
        d="M140 9 V18 Q160 28 180 18 V9"
        fill="#EADFCF"
        stroke="#CDB797"
        strokeWidth="1.2"
      />
      <Path
        d="M143 18 Q160 25 177 18"
        fill="none"
        stroke="#FFFDF2"
        strokeWidth="1.5"
      />
      <Ellipse cx="160" cy="31" rx="43" ry="9" fill="#FFFFFF" opacity=".15" />

      {/* 바닥: 색상을 더 밝고 크리미하게 */}
      <Path d="M52 158 L268 158 L320 240 L0 240 Z" fill="#FAF6ED" />
      <Path
        d="M52 158 L268 158 L320 240 L0 240 Z"
        fill="#FFFFFF"
        opacity=".15"
      />
      {floorTiles.map((d, i) => (
        <Path
          key={`floor-${i}`}
          d={d}
          fill="none"
          stroke="#E2D4C3"
          strokeWidth={i < 3 ? 0.6 : 0.8}
          opacity=".6"
        />
      ))}
      <Path
        d="M52 158 L0 240 M268 158 L320 240"
        stroke="#E2D4C3"
        strokeWidth="0.8"
        opacity=".7"
      />

      {/* 바닥의 전체적인 빛과 그림자: 아주 옅게 */}
      <Path
        d="M28 193 Q160 175 292 193 L320 240 H0 Z"
        fill="#B39F8A"
        opacity=".02"
      />

      {/* ───── 왼쪽 측면 수납장: 톤다운 및 스트로크 완화 ───── */}
      <Path
        d="M8 30 L65 39 L65 181 L8 194 Z"
        fill="#F2ECE4"
        stroke="#DBCDC0"
        strokeWidth="1.2"
      />
      <Path d="M8 30 L65 39 L65 49 L8 41 Z" fill="#EADFCF" />
      <Path d="M8 41 L65 49 L65 53 L8 45 Z" fill="#D9C9BD" opacity=".5" />

      {/* 왼쪽 상단 선반 */}
      <Path
        d="M9 69 L65 75 L65 82 L9 76 Z"
        fill="#EADFCF"
        stroke="#D9C9BD"
        strokeWidth=".6"
      />
      <Bag x={24} y={52} color="#DBCDF5" scale={0.62} />
      <Bag x={46} y={55} color="#FCE4EC" scale={0.55} />
      <Hat x={37} y={45} color="#EADCC8" scale={0.55} />

      {/* 왼쪽 옷걸이봉: 색상 변경 */}
      <Path
        d="M10 87 L64 93"
        stroke="#DBCDF5"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {[
        { x: 18, y: 90, c: garmentColors[0].fill },
        { x: 30, y: 91, c: garmentColors[1].fill },
        { x: 42, y: 92, c: garmentColors[2].fill },
        { x: 54, y: 93, c: garmentColors[3].fill },
      ].map((item, i) => (
        <Hanger
          key={`left-hanger-${i}`}
          x={item.x}
          y={item.y}
          color={item.c}
          kind={i === 2 ? "dress" : "top"}
          scale={0.72}
        />
      ))}

      {/* 왼쪽 아래 선반 */}
      <Path
        d="M9 137 L65 132 L65 140 L9 145 Z"
        fill="#EADFCF"
        stroke="#D9C9BD"
        strokeWidth=".6"
      />
      <Bag x={25} y={119} color="#DBCDF5" scale={0.5} />
      <Bag x={47} y={120} color="#FCE4EC" scale={0.48} />

      {/* 왼쪽 하단 대형 가방 */}
      <Ellipse cx="35" cy="185" rx="22" ry="4" fill="#9E8D80" opacity=".08" />
      <Bag x={35} y={157} color="#FCE4EC" scale={1.05} />

      {/* ───── 오른쪽 측면 수납장 ───── */}
      <Path
        d="M255 39 L312 30 L312 194 L255 181 Z"
        fill="#F2ECE4"
        stroke="#DBCDC0"
        strokeWidth="1.2"
      />
      <Path d="M255 39 L312 30 L312 41 L255 49 Z" fill="#EADFCF" />
      <Path d="M255 49 L312 41 L312 45 L255 53 Z" fill="#D9C9BD" opacity=".5" />

      {/* 오른쪽 위 선반 */}
      <Path
        d="M255 75 L311 69 L311 76 L255 82 Z"
        fill="#EADFCF"
        stroke="#D9C9BD"
        strokeWidth=".6"
      />
      <Bag x={274} y={52} color="#DBCDF5" scale={0.55} />
      <Bag x={295} y={49} color="#FCE4EC" scale={0.48} />

      {/* 오른쪽 옷걸이봉 */}
      <Path
        d="M256 93 L310 87"
        stroke="#DBCDF5"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {[
        { x: 264, y: 92, c: garmentColors[0].fill },
        { x: 276, y: 91, c: garmentColors[1].fill },
        { x: 288, y: 90, c: garmentColors[2].fill },
        { x: 300, y: 89, c: garmentColors[3].fill },
      ].map((item, i) => (
        <Hanger
          key={`right-hanger-${i}`}
          x={item.x}
          y={item.y}
          color={item.c}
          kind={i === 1 ? "dress" : "top"}
          scale={0.72}
        />
      ))}

      {/* 오른쪽 아래 선반 */}
      <Path
        d="M255 132 L311 137 L311 145 L255 140 Z"
        fill="#EADFCF"
        stroke="#D9C9BD"
        strokeWidth=".6"
      />
      <Bag x={274} y={119} color="#DBCDF5" scale={0.48} />
      <Bag x={296} y={120} color="#FCE4EC" scale={0.45} />

      {/* 오른쪽 하단 구두 */}
      <ShoePair x={286} y={171} color="#FCE4EC" scale={0.78} />

      {/* ───── 중앙 뒷벽 수납장 ───── */}
      <Path
        d="M64 31 L256 31 L256 171 L64 171 Z"
        fill="#EADFCF"
        stroke="#D9C9BD"
        strokeWidth="1.2"
      />

      {/* 수납장 상단 몰딩: 색상 연하게 */}
      <Path
        d="M60 27 L260 27 L260 36 L60 36 Z"
        fill="#E2CAB2"
        stroke="#CDB59A"
        strokeWidth="1"
      />
      <Path d="M64 36 H256" stroke="#FFFAF5" strokeWidth="1.5" />

      {/* 중앙 상단 선반 */}
      <Path
        d="M70 43 L250 43 L250 50 L70 50 Z"
        fill="#E2CAB2"
        stroke="#CDB59A"
        strokeWidth=".6"
      />

      {/* 선반 위 소품 상자: 소프트 톤 */}
      <Rect
        x="78"
        y="31"
        width="23"
        height="12"
        rx="2"
        fill="#DBCDF5"
        stroke="#BCACD9"
        strokeWidth=".8"
      />
      <Rect x="105" y="34" width="18" height="9" rx="2" fill="#EADCC8" />
      <Rect
        x="202"
        y="32"
        width="21"
        height="11"
        rx="2"
        fill="#EADCC8"
        stroke="#CDB59A"
        strokeWidth=".6"
      />
      <Rect x="227" y="35" width="14" height="8" rx="2" fill="#DBCDF5" />

      {/* 중앙 수납장 칸막이: 부드럽게 */}
      <Path d="M122 50 V153 M198 50 V153" stroke="#D9C9BD" strokeWidth="1.5" />
      <Path
        d="M124 50 V153 M200 50 V153"
        stroke="#FFFFFF"
        strokeWidth="1"
        opacity=".6"
      />

      {/* 중앙 거울 프레임: 톤다운 */}
      <Rect
        x="130"
        y="51"
        width="60"
        height="91"
        rx="10"
        fill="#E2CAB2"
        stroke="#CDB59A"
        strokeWidth="1.2"
      />
      <Rect
        x="135"
        y="56"
        width="50"
        height="81"
        rx="7"
        fill="#CECAE0"
        stroke="#FFFFFF"
        strokeWidth="2"
      />
      {/* 거울의 반사광: 더 투명하게 */}
      <Path
        d="M143 65 Q151 60 158 63 L143 91 Q140 83 143 65 Z"
        fill="#FFFFFF"
        opacity=".4"
      />
      <Path
        d="M164 63 Q175 66 178 77 L164 98 Q169 80 164 63 Z"
        fill="#E4F2F9"
        opacity=".5"
      />

      {/* 거울 양옆 옷걸이봉 */}
      <Path
        d="M72 57 H119 M201 57 H248"
        stroke="#DBCDF5"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* 왼쪽 중앙 옷 */}
      <Hanger x={82} y={59} color="#FCE4EC" kind="dress" scale={0.9} />
      <Hanger x={102} y={59} color="#E4F2F9" kind="top" scale={0.9} />

      {/* 오른쪽 중앙 옷 */}
      <Hanger x={211} y={59} color="#EEEAF9" kind="top" scale={0.9} />
      <Hanger x={232} y={59} color="#FFF3E0" kind="dress" scale={0.9} />

      {/* 중앙 하단 수납 서랍: 색상 연하게 */}
      <Rect
        x="72"
        y="145"
        width="176"
        height="23"
        rx="2"
        fill="#F2ECE4"
        stroke="#DBCDC0"
        strokeWidth="1"
      />
      <Path d="M72 156 H248" stroke="#DBCDC0" strokeWidth="1" />
      {[91, 143, 195, 229].map((x) => (
        <G key={`drawer-${x}`} opacity=".7">
          <Rect
            x={x - 4}
            y="150"
            width="8"
            height="3"
            rx="1.5"
            fill="#CDB59A"
          />
        </G>
      ))}

      {/* ───── 중앙 화장대 그림자: 옅게 ───── */}
      <Ellipse cx="160" cy="207" rx="66" ry="9" fill="#9E8D80" opacity=".06" />

      {/* 화장대 다리와 상판 */}
      <Path d="M115 180 L124 180 L121 205 L115 205 Z" fill="#DFCAB1" />
      <Path d="M196 180 L205 180 L205 205 L199 205 Z" fill="#DFCAB1" />
      <Path
        d="M110 174 L210 174 L206 183 L114 183 Z"
        fill="#DFCAB1"
        opacity=".8"
      />
      <Path
        d="M110 171 Q160 166 210 171 L210 179 Q160 184 110 179 Z"
        fill="#EADFCF"
        stroke="#D9C9BD"
        strokeWidth="1"
      />
      <Path
        d="M117 173 Q160 169 203 173"
        fill="none"
        stroke="#FFFEFA"
        strokeWidth="1.2"
        opacity=".8"
      />

      {/* 화장대 위 화장품: 소프트 톤 */}
      <Rect
        x="127"
        y="158"
        width="11"
        height="13"
        rx="2"
        fill="#FCE4EC"
        stroke="#E8BCC8"
        strokeWidth=".6"
      />
      <Rect
        x="145"
        y="161"
        width="10"
        height="10"
        rx="2"
        fill="#EEEAF9"
        opacity=".8"
      />
      <Rect
        x="164"
        y="159"
        width="12"
        height="12"
        rx="2"
        fill="#EADCC8"
        stroke="#CDB59A"
        strokeWidth=".6"
      />
      <Path
        d="M183 171 L184 162 Q189 158 194 162 L195 171 Z"
        fill="#FDE4EC"
        stroke="#E8BCC8"
        strokeWidth=".6"
      />

      {/* 화장대 의자: 색상 완화 */}
      <Ellipse cx="160" cy="220" rx="25" ry="4" fill="#9E8D80" opacity=".05" />
      <Path d="M146 212 L151 212 L148 228 L143 228 Z" fill="#DBCDC0" />
      <Path d="M169 212 L174 212 L177 228 L172 228 Z" fill="#DBCDC0" />
      <Path
        d="M141 199 Q160 194 179 199 L177 214 Q160 219 143 214 Z"
        fill="#F2ECE4"
        stroke="#DBCDC0"
        strokeWidth="1"
      />
      <Path
        d="M146 201 Q160 197 174 201"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        opacity=".7"
      />

      {/* 앞쪽 바닥의 부드러운 빛: 더 몽환적으로 */}
      <Ellipse cx="160" cy="231" rx="92" ry="7" fill="#FFFFFF" opacity=".6" />
    </>
  );
}
const SCENES: Record<ClothingBackgroundKind, React.FC> = {
  clothing: ClothingScene,
  hat: HatScene,
  clothes: ClothesScene,
  shoes: ShoesScene,
  hairpin: HairpinScene,
  necklace: NecklaceScene,
  glasses: GlassesScene,
};

export default function ClothingCategoryBackground({
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

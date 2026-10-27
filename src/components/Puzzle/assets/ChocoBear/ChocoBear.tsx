import React from "react";
import {
  G,
  Path,
  Circle,
  Ellipse,
  Defs,
  RadialGradient,
  LinearGradient,
  Stop,
} from "react-native-svg";

interface ChocoBearProps {
  x?: number;
  y?: number;
  scale?: number;
}

export const ChocoBear: React.FC<ChocoBearProps> = ({
  x = 0,
  y = 0,
  scale = 1,
}) => (
  <>
    <Defs>
      <RadialGradient id="chocoBodyGrad" cx="30%" cy="20%" rx="80%" ry="88%">
        <Stop offset="0" stopColor="#D9A77C" />
        <Stop offset="0.35" stopColor="#B8794D" />
        <Stop offset="0.72" stopColor="#8B5336" />
        <Stop offset="0.92" stopColor="#6D3D2B" />
        <Stop offset="1" stopColor="#4E2A20" />
      </RadialGradient>
      <RadialGradient id="chocoFaceGrad" cx="36%" cy="24%" rx="78%" ry="85%">
        <Stop offset="0" stopColor="#E5BD99" />
        <Stop offset="0.4" stopColor="#C99268" />
        <Stop offset="0.78" stopColor="#A96B45" />
        <Stop offset="1" stopColor="#74452F" />
      </RadialGradient>
      <RadialGradient id="chocoMuzzleGrad" cx="36%" cy="24%" rx="75%" ry="85%">
        <Stop offset="0" stopColor="#FFF0D5" />
        <Stop offset="0.55" stopColor="#F2D7B1" />
        <Stop offset="1" stopColor="#D2AA83" />
      </RadialGradient>
      <RadialGradient id="chocoEarInnerGrad" cx="40%" cy="30%" r="80%">
        <Stop offset="0" stopColor="#DDA17E" />
        <Stop offset="1" stopColor="#96583E" />
      </RadialGradient>
      <RadialGradient id="chocoEyeGrad" cx="30%" cy="20%" r="90%">
        <Stop offset="0" stopColor="#6C4939" />
        <Stop offset="0.45" stopColor="#382219" />
        <Stop offset="0.85" stopColor="#1A100C" />
        <Stop offset="1" stopColor="#563729" />
      </RadialGradient>
      <RadialGradient id="chocoCookieGrad" cx="32%" cy="22%" rx="75%" ry="80%">
        <Stop offset="0" stopColor="#FFF6A8" />
        <Stop offset="0.4" stopColor="#FFE36A" />
        <Stop offset="0.8" stopColor="#FFC52E" />
        <Stop offset="1" stopColor="#E99A17" />
      </RadialGradient>
      <LinearGradient id="chocoCookieEdge" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0" stopColor="#E8A21A" />
        <Stop offset="1" stopColor="#C87913" />
      </LinearGradient>
      <RadialGradient id="chocoBlushGrad" cx="45%" cy="35%" r="75%">
        <Stop offset="0" stopColor="#F59A8B" stopOpacity="0.68" />
        <Stop offset="1" stopColor="#F59A8B" stopOpacity="0" />
      </RadialGradient>
    </Defs>

    <G transform={`translate(${x} ${y}) scale(${scale})`}>
      <Ellipse cx={120} cy={179} rx={62} ry={8} fill="#55301F" opacity={0.17} />

      {/* 귀 */}
      <Circle cx={81} cy={48} r={22} fill="#75432D" />
      <Circle cx={81} cy={47} r={17} fill="url(#chocoBodyGrad)" />
      <Circle cx={81} cy={48} r={9} fill="url(#chocoEarInnerGrad)" />
      <Circle cx={159} cy={48} r={22} fill="#75432D" />
      <Circle cx={159} cy={47} r={17} fill="url(#chocoBodyGrad)" />
      <Circle cx={159} cy={48} r={9} fill="url(#chocoEarInnerGrad)" />

      {/* 몸통 */}
      <Path
        d="M120 78
           C83 78 59 104 59 136
           C59 161 81 174 120 174
           C159 174 181 161 181 136
           C181 104 157 78 120 78 Z"
        fill="url(#chocoBodyGrad)"
      />
      <Ellipse cx={98} cy={115} rx={29} ry={33} fill="#FFE4C7" opacity={0.12} />

      {/* 발 */}
      <Path
        d="M76 147 Q65 151 69 165 Q77 174 101 170 L109 160 Z"
        fill="url(#chocoBodyGrad)"
      />
      <Path
        d="M131 160 L139 170 Q163 174 171 165 Q175 151 164 147 Z"
        fill="url(#chocoBodyGrad)"
      />
      <Ellipse cx={88} cy={166} rx={16} ry={8} fill="#6A3A29" />
      <Ellipse cx={152} cy={166} rx={16} ry={8} fill="#6A3A29" />
      <Path
        d="M78 165 Q87 169 96 165"
        stroke="#C78C63"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M144 165 Q153 169 162 165"
        stroke="#C78C63"
        strokeWidth={2}
        strokeLinecap="round"
      />

      {/* 머리 */}
      <Path
        d="M120 27
           C89 27 67 48 67 77
           C67 104 88 122 120 123
           C152 122 173 104 173 77
           C173 48 151 27 120 27 Z"
        fill="url(#chocoFaceGrad)"
      />
      <Ellipse cx={101} cy={47} rx={33} ry={19} fill="#FFF0D9" opacity={0.15} />

      {/* 눈가 음영 */}
      <Ellipse cx={96} cy={68} rx={13} ry={15} fill="#633C2A" opacity={0.28} />
      <Ellipse cx={144} cy={68} rx={13} ry={15} fill="#633C2A" opacity={0.28} />

      {/* 행복한 눈웃음 */}
      <Path
        d="M84 68 Q96 80 108 68"
        stroke="#583321"
        strokeWidth={3.5}
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M132 68 Q144 80 156 68"
        stroke="#583321"
        strokeWidth={3.5}
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M87 65 Q96 72 105 65"
        stroke="#F3D0A8"
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
        opacity={0.75}
      />
      <Path
        d="M135 65 Q144 72 153 65"
        stroke="#F3D0A8"
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
        opacity={0.75}
      />

      {/* 볼 */}
      <Ellipse cx={84} cy={88} rx={17} ry={11} fill="url(#chocoBlushGrad)" />
      <Ellipse cx={156} cy={88} rx={17} ry={11} fill="url(#chocoBlushGrad)" />

      {/* 크림 베이지 주둥이 */}
      <Ellipse cx={120} cy={89} rx={30} ry={23} fill="url(#chocoMuzzleGrad)" />

      {/* 코 */}
      <Path
        d="M109 79 Q120 72 131 79 Q131 87 120 89 Q109 87 109 79 Z"
        fill="#4A2A20"
      />
      <Ellipse cx={115} cy={78} rx={3.5} ry={2} fill="#E5B99A" opacity={0.75} />

      {/* 벌어진 미소 */}
      <Path
        d="M105 93 Q120 104 135 93"
        stroke="#4D2A20"
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M109 96 Q120 101 131 96 Q129 108 120 108 Q111 108 109 96 Z"
        fill="#4B211F"
      />
      <Path
        d="M114 97 Q120 100 126 97 Q125 103 120 103 Q115 103 114 97 Z"
        fill="#F28D91"
      />

      {/* 별 쿠키의 두께 */}
      <Path
        d="M119 104 L129 116 L143 118 L133 129 L135 143 L120 136 L106 143 L108 129 L97 118 L111 116 Z"
        fill="url(#chocoCookieEdge)"
      />
      {/* 쿠키 본체 */}
      <Path
        d="M119 100 L129 112 L143 114 L133 125 L135 139 L120 132 L106 139 L108 125 L97 114 L111 112 Z"
        fill="url(#chocoCookieGrad)"
        stroke="#E6A51B"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Path
        d="M110 113 Q114 107 119 105"
        stroke="#FFFFFF"
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.85}
      />
      <Circle cx={126} cy={116} r={2} fill="#FFF9CF" />

      {/* 쿠키를 감싸는 왼쪽 앞발 */}
      <Path
        d="M78 105
           C67 112 71 129 84 137
           C94 143 105 137 111 128
           L103 117 L91 108 Z"
        fill="url(#chocoBodyGrad)"
      />
      <Path
        d="M82 115 Q88 126 99 130"
        stroke="#E3B38B"
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.75}
      />

      {/* 오른쪽 앞발 */}
      <Path
        d="M162 105
           C173 112 169 129 156 137
           C146 143 135 137 129 128
           L137 117 L149 108 Z"
        fill="url(#chocoBodyGrad)"
      />
      <Path
        d="M158 115 Q152 126 141 130"
        stroke="#E3B38B"
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.75}
      />

      {/* 머리 옆의 작은 별 장식 */}
      <Path
        d="M173 28 L177 37 L187 39 L179 46 L181 56 L173 51 L164 56 L166 46 L159 39 L169 37 Z"
        fill="#E9A51D"
      />
      <Path
        d="M173 25 L177 34 L187 36 L179 43 L181 53 L173 48 L164 53 L166 43 L159 36 L169 34 Z"
        fill="url(#chocoCookieGrad)"
        stroke="#E9A51D"
        strokeWidth={1}
        strokeLinejoin="round"
      />
      <Path
        d="M166 36 L171 30"
        stroke="#FFFFFF"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.9}
      />
    </G>
  </>
);

export default ChocoBear;

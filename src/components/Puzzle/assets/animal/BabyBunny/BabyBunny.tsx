import React from "react";
import {
  G,
  Path,
  Circle,
  Ellipse,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
} from "react-native-svg";

interface BabyBunnyProps {
  x?: number;
  y?: number;
  scale?: number;
}

export const BabyBunny: React.FC<BabyBunnyProps> = ({
  x = 0,
  y = 0,
  scale = 1,
}) => {
  return (
    <>
      <Defs>
        {/* 코튼 화이트 클레이 몸통 */}
        <RadialGradient id="bunny-bodyGrad" cx="32%" cy="20%" rx="78%" ry="86%">
          <Stop offset="0" stopColor="#FFFFFF" />
          <Stop offset="0.38" stopColor="#FFFDF9" />
          <Stop offset="0.68" stopColor="#FDF3F0" />
          <Stop offset="0.88" stopColor="#F3DEDA" />
          <Stop offset="1" stopColor="#DFC6C3" />
        </RadialGradient>

        {/* 얼굴의 부드러운 입체감 */}
        <RadialGradient id="bunny-faceGrad" cx="34%" cy="20%" rx="78%" ry="86%">
          <Stop offset="0" stopColor="#FFFFFF" />
          <Stop offset="0.45" stopColor="#FFFDF9" />
          <Stop offset="0.75" stopColor="#FFF4F0" />
          <Stop offset="0.93" stopColor="#F4E0DC" />
          <Stop offset="1" stopColor="#E6CDCA" />
        </RadialGradient>

        {/* 이마의 빛 */}
        <RadialGradient
          id="bunny-faceLight"
          cx="50%"
          cy="10%"
          rx="75%"
          ry="80%"
        >
          <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
          <Stop offset="0.52" stopColor="#FFFFFF" stopOpacity="0.35" />
          <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </RadialGradient>

        {/* 귀 바깥쪽 */}
        <RadialGradient
          id="bunny-earOuterGrad"
          cx="30%"
          cy="18%"
          rx="80%"
          ry="88%"
        >
          <Stop offset="0" stopColor="#FFFFFF" />
          <Stop offset="0.55" stopColor="#FFFDF9" />
          <Stop offset="0.84" stopColor="#F5E5E2" />
          <Stop offset="1" stopColor="#E3CECB" />
        </RadialGradient>

        {/* 귓속의 핑크빛 */}
        <RadialGradient id="bunny-earGrad" cx="38%" cy="24%" rx="78%" ry="88%">
          <Stop offset="0" stopColor="#FFE9EB" />
          <Stop offset="0.48" stopColor="#FEE2E2" />
          <Stop offset="0.78" stopColor="#F4BFC9" />
          <Stop offset="1" stopColor="#E69BAF" />
        </RadialGradient>

        {/* 주둥이 */}
        <RadialGradient
          id="bunny-muzzleGrad"
          cx="35%"
          cy="20%"
          rx="78%"
          ry="85%"
        >
          <Stop offset="0" stopColor="#FFFFFF" />
          <Stop offset="0.62" stopColor="#FFFDF9" />
          <Stop offset="1" stopColor="#F0DFD9" />
        </RadialGradient>

        {/* 앞발 */}
        <RadialGradient id="bunny-pawGrad" cx="32%" cy="20%" rx="80%" ry="88%">
          <Stop offset="0" stopColor="#FFFFFF" />
          <Stop offset="0.55" stopColor="#FFFDF9" />
          <Stop offset="0.84" stopColor="#F4E5E1" />
          <Stop offset="1" stopColor="#E0C9C5" />
        </RadialGradient>

        {/* 딥 네이비 눈동자 */}
        <RadialGradient id="bunny-eyeGrad" cx="28%" cy="18%" rx="82%" ry="88%">
          <Stop offset="0" stopColor="#40516B" />
          <Stop offset="0.42" stopColor="#192D49" />
          <Stop offset="0.78" stopColor="#0E1B30" />
          <Stop offset="1" stopColor="#07111F" />
        </RadialGradient>

        {/* 코 */}
        <RadialGradient id="bunny-noseGrad" cx="30%" cy="20%" rx="80%" ry="85%">
          <Stop offset="0" stopColor="#F8C2C9" />
          <Stop offset="0.55" stopColor="#E99BAA" />
          <Stop offset="1" stopColor="#C9768C" />
        </RadialGradient>

        {/* 볼터치 */}
        <RadialGradient
          id="bunny-blushGrad"
          cx="45%"
          cy="38%"
          rx="70%"
          ry="72%"
        >
          <Stop offset="0" stopColor="#FF9C9C" stopOpacity="0.7" />
          <Stop offset="0.6" stopColor="#FF9C9C" stopOpacity="0.35" />
          <Stop offset="1" stopColor="#FF9C9C" stopOpacity="0" />
        </RadialGradient>

        {/* 바닥 그림자 */}
        <RadialGradient
          id="bunny-shadowGrad"
          cx="50%"
          cy="50%"
          rx="50%"
          ry="50%"
        >
          <Stop offset="0" stopColor="#A98A91" stopOpacity="0.24" />
          <Stop offset="0.65" stopColor="#A98A91" stopOpacity="0.1" />
          <Stop offset="1" stopColor="#A98A91" stopOpacity="0" />
        </RadialGradient>

        {/* 발 아래쪽의 음영 */}
        <LinearGradient id="bunny-lowerShade" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
          <Stop offset="1" stopColor="#D9BFBC" stopOpacity="0.45" />
        </LinearGradient>
      </Defs>

      <G transform={`translate(${x} ${y}) scale(${scale})`}>
        {/* 바닥 그림자 */}
        <Ellipse
          cx={120}
          cy={166}
          rx={67}
          ry={10}
          fill="url(#bunny-shadowGrad)"
        />
        <Ellipse
          cx={120}
          cy={165}
          rx={45}
          ry={5}
          fill="#BDA1A4"
          opacity={0.1}
        />

        {/* 뒤쪽 귀: 왼쪽 */}
        <Path
          d="M80 73
             C67 55 57 30 63 15
             C67 5 79 7 85 18
             C94 35 99 57 102 76
             Z"
          fill="#E5CECB"
        />
        <Path
          d="M80 70
             C68 51 60 30 66 17
             C70 10 78 13 83 23
             C91 40 96 58 98 75
             Z"
          fill="url(#bunny-earOuterGrad)"
        />
        <Path
          d="M80 60
             C73 43 68 27 71 21
             C74 17 78 24 82 34
             C87 47 90 57 91 66
             Z"
          fill="url(#bunny-earGrad)"
        />
        <Path
          d="M71 22 Q74 17 77 24"
          stroke="#FFFFFF"
          strokeWidth={2.5}
          strokeLinecap="round"
          opacity={0.9}
        />
        <Path
          d="M78 30 Q85 49 88 58"
          stroke="#FFF8F5"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={0.75}
        />

        {/* 뒤쪽 귀: 오른쪽, 살짝 기울어짐 */}
        <Path
          d="M126 73
             C128 51 137 25 151 15
             C161 8 171 16 167 29
             C163 48 150 68 140 82
             Z"
          fill="#E5CECB"
        />
        <Path
          d="M130 73
             C133 52 141 29 152 19
             C159 13 165 19 162 29
             C157 47 147 65 139 78
             Z"
          fill="url(#bunny-earOuterGrad)"
        />
        <Path
          d="M137 63
             C141 46 149 29 155 25
             C159 23 159 29 155 39
             C150 51 144 62 139 70
             Z"
          fill="url(#bunny-earGrad)"
        />
        <Path
          d="M151 26 Q157 20 159 26"
          stroke="#FFFFFF"
          strokeWidth={2.5}
          strokeLinecap="round"
          opacity={0.9}
        />
        <Path
          d="M150 34 Q145 49 139 59"
          stroke="#FFF8F5"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={0.75}
        />

        {/* 몸통: 통통한 오뚝이 실루엣 */}
        <Path
          d="M78 100
             C62 108 57 127 63 143
             C68 158 84 166 105 166
             L137 166
             C158 166 174 158 179 143
             C185 127 180 108 164 100
             C143 88 99 88 78 100Z"
          fill="#E3CDCA"
        />
        <Path
          d="M79 98
             C64 107 60 126 66 142
             C71 156 86 162 106 162
             L136 162
             C156 162 171 156 176 142
             C182 126 178 107 163 98
             C143 88 99 88 79 98Z"
          fill="url(#bunny-bodyGrad)"
        />

        {/* 몸통 아래쪽의 부드러운 음영 */}
        <Path
          d="M67 134
             C80 147 98 152 121 152
             C144 152 162 147 175 134
             C173 151 159 160 140 162
             L102 162
             C83 160 69 151 67 134Z"
          fill="url(#bunny-lowerShade)"
          opacity={0.65}
        />

        {/* 짧고 통통한 뒷발 */}
        <Path
          d="M80 143
             C70 143 65 150 69 158
             C72 165 86 168 101 164
             L108 157
             L99 146Z"
          fill="#E4CFCC"
        />
        <Path
          d="M82 143
             C73 144 69 150 72 157
             C75 163 87 165 100 161
             L105 156
             L97 147Z"
          fill="url(#bunny-pawGrad)"
        />

        <Path
          d="M160 143
             C170 143 175 150 171 158
             C168 165 154 168 139 164
             L132 157
             L141 146Z"
          fill="#E4CFCC"
        />
        <Path
          d="M158 143
             C167 144 171 150 168 157
             C165 163 153 165 140 161
             L135 156
             L143 147Z"
          fill="url(#bunny-pawGrad)"
        />

        {/* 솜뭉치 꼬리 */}
        <Circle cx={178} cy={132} r={12} fill="#E4D1CD" />
        <Circle cx={177} cy={129} r={10} fill="url(#bunny-bodyGrad)" />
        <Circle cx={173} cy={125} r={4} fill="#FFFFFF" opacity={0.9} />
        <Circle cx={181} cy={127} r={3.5} fill="#FFFDF9" />
        <Circle cx={180} cy={134} r={4} fill="#F3E1DD" opacity={0.7} />

        {/* 머리: 살짝 갸웃한 둥근 얼굴 */}
        <G transform="rotate(-5 119 91)">
          <Path
            d="M120 31
               C95 31 75 45 69 67
               C62 90 74 111 95 121
               C103 125 112 127 120 127
               C128 127 137 125 145 121
               C166 111 178 90 171 67
               C165 45 145 31 120 31Z"
            fill="#E2CDCA"
          />
          <Path
            d="M120 31
               C97 31 78 45 73 67
               C67 88 78 107 97 117
               C104 121 112 123 120 123
               C128 123 136 121 143 117
               C162 107 173 88 167 67
               C162 45 143 31 120 31Z"
            fill="url(#bunny-faceGrad)"
          />

          {/* 이마의 빛 */}
          <Ellipse
            cx={119}
            cy={54}
            rx={42}
            ry={28}
            fill="url(#bunny-faceLight)"
            opacity={0.9}
          />
          <Path
            d="M84 55 Q91 41 105 39"
            stroke="#FFFFFF"
            strokeWidth={3}
            strokeLinecap="round"
            opacity={0.9}
          />

          {/* 눈썹 */}
          <Path
            d="M83 75 Q94 68 105 74"
            stroke="#D5B8B4"
            strokeWidth={3}
            strokeLinecap="round"
            opacity={0.75}
          />
          <Path
            d="M135 74 Q146 68 157 75"
            stroke="#D5B8B4"
            strokeWidth={3}
            strokeLinecap="round"
            opacity={0.75}
          />

          {/* 딥 네이비 눈동자 */}
          <Ellipse cx={96} cy={87} rx={12} ry={15} fill="url(#bunny-eyeGrad)" />
          <Ellipse
            cx={144}
            cy={87}
            rx={12}
            ry={15}
            fill="url(#bunny-eyeGrad)"
          />

          {/* 큰 반사광 */}
          <Ellipse cx={92} cy={81} rx={4.5} ry={5.5} fill="#FFFFFF" />
          <Ellipse cx={140} cy={81} rx={4.5} ry={5.5} fill="#FFFFFF" />

          {/* 작은 점 반사광 */}
          <Circle cx={101} cy={92} r={2.2} fill="#FFFFFF" />
          <Circle cx={149} cy={92} r={2.2} fill="#FFFFFF" />

          {/* 시그니처 버터 옐로 4각 별 */}
          <Path
            d="M108 77
               L111 83
               L117 86
               L111 89
               L108 95
               L105 89
               L99 86
               L105 83Z"
            fill="#FFD66E"
          />
          <Path
            d="M156 77
               L159 83
               L165 86
               L159 89
               L156 95
               L153 89
               L147 86
               L153 83Z"
            fill="#FFD66E"
          />

          {/* 코랄 핑크 볼터치 */}
          <Ellipse
            cx={79}
            cy={104}
            rx={17}
            ry={11}
            fill="url(#bunny-blushGrad)"
          />
          <Ellipse
            cx={161}
            cy={104}
            rx={17}
            ry={11}
            fill="url(#bunny-blushGrad)"
          />
          <Ellipse
            cx={76}
            cy={101}
            rx={4}
            ry={2}
            fill="#FFFFFF"
            opacity={0.75}
          />
          <Ellipse
            cx={158}
            cy={101}
            rx={4}
            ry={2}
            fill="#FFFFFF"
            opacity={0.75}
          />

          {/* 폭신한 주둥이 */}
          <Ellipse
            cx={120}
            cy={106}
            rx={27}
            ry={19}
            fill="#E9D8D3"
            opacity={0.55}
          />
          <Ellipse
            cx={120}
            cy={104}
            rx={26}
            ry={18}
            fill="url(#bunny-muzzleGrad)"
          />
          <Ellipse
            cx={111}
            cy={100}
            rx={9}
            ry={4}
            fill="#FFFFFF"
            opacity={0.55}
          />

          {/* 작은 핑크 코 */}
          <Path
            d="M114 98
               Q120 94 126 98
               Q126 104 120 106
               Q114 104 114 98Z"
            fill="url(#bunny-noseGrad)"
          />
          <Ellipse
            cx={117}
            cy={98}
            rx={2.5}
            ry={1.5}
            fill="#FFFFFF"
            opacity={0.75}
          />

          {/* 귀여운 ω 형태의 입 */}
          <Path
            d="M120 106
               L120 111
               M120 111
               C116 117 109 115 109 110
               M120 111
               C124 117 131 115 131 110"
            stroke="#805B57"
            strokeWidth={2.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* 작은 혀 */}
          <Path
            d="M116 116
               Q120 119 124 116
               Q123 122 120 122
               Q117 121 116 116Z"
            fill="#F3A0B2"
          />
          <Path
            d="M120 117 L120 120"
            stroke="#FFD5DC"
            strokeWidth={1.5}
            strokeLinecap="round"
          />
        </G>

        {/* 앞발: 가슴 앞에 모은 자세 */}
        {/* <Path
          d="M86 111
             C77 115 77 126 84 132
             C91 139 103 138 112 131
             L120 124
             L107 113Z"
          fill="#E3CDCA"
        />
        <Path
          d="M87 110
             C80 115 81 124 87 130
             C93 136 103 135 111 129
             L117 124
             L106 114Z"
          fill="url(#bunny-pawGrad)"
        />

        <Path
          d="M154 111
             C163 115 163 126 156 132
             C149 139 137 138 128 131
             L120 124
             L133 113Z"
          fill="#E3CDCA"
        />
        <Path
          d="M153 110
             C160 115 159 124 153 130
             C147 136 137 135 129 129
             L123 124
             L134 114Z"
          fill="url(#bunny-pawGrad)"
        /> */}

        {/* 앞발 하이라이트 */}
        {/* <Path
          d="M87 117 Q92 113 98 116"
          stroke="#FFFFFF"
          strokeWidth={2.5}
          strokeLinecap="round"
          opacity={0.9}
        />
        <Path
          d="M153 117 Q148 113 142 116"
          stroke="#FFFFFF"
          strokeWidth={2.5}
          strokeLinecap="round"
          opacity={0.9}
        /> */}

        {/* 몸통의 부드러운 하이라이트 */}
        <Path
          d="M91 104 Q104 95 117 99"
          stroke="#FFFFFF"
          strokeWidth={3.5}
          strokeLinecap="round"
          opacity={0.65}
        />
        <Path
          d="M76 126 Q76 139 85 146"
          stroke="#FFFFFF"
          strokeWidth={3}
          strokeLinecap="round"
          opacity={0.65}
        />

        {/* 발끝의 은은한 음영 */}
        <Path
          d="M78 157 Q87 162 98 158"
          stroke="#D8C1BD"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={0.5}
        />
        <Path
          d="M142 158 Q153 162 162 157"
          stroke="#D8C1BD"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={0.5}
        />

        {/* 작은 광택 */}
        <Circle cx={64} cy={83} r={2.5} fill="#FFFFFF" opacity={0.85} />
        <Path
          d="M183 88 L185 92 L189 94 L185 96 L183 100 L181 96 L177 94 L181 92Z"
          fill="#FFD66E"
          opacity={0.9}
        />
      </G>
    </>
  );
};

export default BabyBunny;

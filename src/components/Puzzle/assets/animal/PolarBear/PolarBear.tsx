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

interface PolarBearProps {
  x?: number;
  y?: number;
  scale?: number;
}

export const PolarBear: React.FC<PolarBearProps> = ({
  x = 0,
  y = 0,
  scale = 1,
}) => {
  return (
    <>
      <Defs>
        {/* 몸통의 쿨 화이트 클레이 음영 */}
        <RadialGradient id="polarBodyGrad" cx="34%" cy="22%" rx="76%" ry="84%">
          <Stop offset="0" stopColor="#FFFFFF" />
          <Stop offset="0.38" stopColor="#FCFEFF" />
          <Stop offset="0.72" stopColor="#F3F9FD" />
          <Stop offset="0.92" stopColor="#DFECF5" />
          <Stop offset="1" stopColor="#C8DCEB" />
        </RadialGradient>

        {/* 얼굴의 부드러운 입체감 */}
        <RadialGradient id="polarFaceGrad" cx="42%" cy="24%" rx="72%" ry="82%">
          <Stop offset="0" stopColor="#FFFFFF" />
          <Stop offset="0.42" stopColor="#FFFFFF" />
          <Stop offset="0.72" stopColor="#F7FBFE" />
          <Stop offset="0.91" stopColor="#E6F0F7" />
          <Stop offset="1" stopColor="#D4E4F0" />
        </RadialGradient>

        {/* 이마의 부드러운 빛 */}
        <RadialGradient id="polarFaceLight" cx="50%" cy="10%" rx="72%" ry="76%">
          <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.9" />
          <Stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.32" />
          <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </RadialGradient>

        {/* 귀 바깥쪽 */}
        <RadialGradient id="polarEarGrad" cx="35%" cy="25%" rx="80%" ry="80%">
          <Stop offset="0" stopColor="#FFFFFF" />
          <Stop offset="0.56" stopColor="#F8FCFF" />
          <Stop offset="0.86" stopColor="#E3EFF7" />
          <Stop offset="1" stopColor="#C7DCEB" />
        </RadialGradient>

        {/* 귓속의 분홍색 */}
        <RadialGradient
          id="polarEarInnerGrad"
          cx="40%"
          cy="28%"
          rx="80%"
          ry="85%"
        >
          <Stop offset="0" stopColor="#FFDCE7" />
          <Stop offset="0.6" stopColor="#F6AFC5" />
          <Stop offset="1" stopColor="#E889A9" />
        </RadialGradient>

        {/* 주둥이 */}
        <RadialGradient
          id="polarMuzzleGrad"
          cx="38%"
          cy="24%"
          rx="75%"
          ry="85%"
        >
          <Stop offset="0" stopColor="#FFFFFF" />
          <Stop offset="0.62" stopColor="#FBFDFF" />
          <Stop offset="1" stopColor="#E6EFF6" />
        </RadialGradient>

        {/* 앞발 */}
        <RadialGradient id="polarPawGrad" cx="34%" cy="20%" rx="78%" ry="90%">
          <Stop offset="0" stopColor="#FFFFFF" />
          <Stop offset="0.52" stopColor="#F8FCFF" />
          <Stop offset="0.84" stopColor="#E7F1F8" />
          <Stop offset="1" stopColor="#D0E2EF" />
        </RadialGradient>

        {/* 초콜릿색 코 */}
        <RadialGradient id="polarNoseGrad" cx="30%" cy="22%" rx="80%" ry="85%">
          <Stop offset="0" stopColor="#79513F" />
          <Stop offset="0.38" stopColor="#543426" />
          <Stop offset="0.78" stopColor="#38231D" />
          <Stop offset="1" stopColor="#261814" />
        </RadialGradient>

        {/* 볼터치 */}
        <RadialGradient id="polarBlushGrad" cx="45%" cy="38%" rx="70%" ry="70%">
          <Stop offset="0" stopColor="#FFB7CC" stopOpacity="0.78" />
          <Stop offset="0.62" stopColor="#F9A9C3" stopOpacity="0.45" />
          <Stop offset="1" stopColor="#F9A9C3" stopOpacity="0" />
        </RadialGradient>

        {/* 바닥에 가까운 부드러운 음영 */}
        <LinearGradient id="polarLowerShade" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
          <Stop offset="1" stopColor="#BBD4E6" stopOpacity="0.6" />
        </LinearGradient>
      </Defs>

      <G transform={`translate(${x} ${y}) scale(${scale})`}>
        {/* 바닥에 닿는 부드러운 그림자 */}
        <Ellipse
          cx={120}
          cy={165}
          rx={68}
          ry={10}
          fill="#9BBFD8"
          opacity={0.2}
        />
        <Ellipse
          cx={120}
          cy={164}
          rx={48}
          ry={5}
          fill="#A9C9DF"
          opacity={0.18}
        />

        {/* 귀: 머리 뒤쪽에 배치 */}
        <G>
          <Path
            d="M68 51
               C61 38 66 25 77 23
               C89 21 99 31 101 44
               L94 60 Z"
            fill="#C9DDEB"
          />
          <Path
            d="M68 48
               C64 37 69 27 78 26
               C88 25 96 34 98 45
               L92 57 Z"
            fill="url(#polarEarGrad)"
          />
          <Path
            d="M73 43
               C71 35 76 31 81 32
               C87 33 91 39 92 45
               L85 49 Z"
            fill="url(#polarEarInnerGrad)"
          />
          <Path
            d="M72 36 Q75 29 81 29"
            stroke="#FFFFFF"
            strokeWidth={2}
            strokeLinecap="round"
            opacity={0.9}
          />

          <Path
            d="M139 44
               C142 31 152 21 163 24
               C174 27 179 39 172 51
               L148 60 Z"
            fill="#C9DDEB"
          />
          <Path
            d="M142 45
               C145 34 153 27 162 27
               C171 29 175 39 170 49
               L149 56 Z"
            fill="url(#polarEarGrad)"
          />
          <Path
            d="M149 44
               C151 36 156 32 162 33
               C168 35 171 41 167 47
               L155 50 Z"
            fill="url(#polarEarInnerGrad)"
          />
          <Path
            d="M151 36 Q156 30 162 31"
            stroke="#FFFFFF"
            strokeWidth={2}
            strokeLinecap="round"
            opacity={0.9}
          />
        </G>

        {/* 통통한 몸통: 머리와 자연스럽게 이어지는 오뚝이 형태 */}
        <Path
          d="M78 91
             C62 99 52 115 52 134
             C52 151 65 163 84 164
             L156 164
             C175 163 188 151 188 134
             C188 115 178 99 162 91
             C143 82 97 82 78 91 Z"
          fill="#C9DDEB"
        />
        <Path
          d="M80 90
             C65 98 56 115 56 133
             C56 150 69 159 86 160
             L154 160
             C171 159 184 150 184 133
             C184 115 175 98 160 90
             C141 82 99 82 80 90 Z"
          fill="url(#polarBodyGrad)"
        />

        {/* 몸통 아래쪽의 은은한 음영 */}
        <Path
          d="M61 133
             C74 145 94 150 120 150
             C146 150 166 145 179 133
             C176 150 166 158 151 160
             L89 160
             C74 158 64 150 61 133 Z"
          fill="url(#polarLowerShade)"
          opacity={0.52}
        />

        {/* 뒷발: 좌우로 편안하게 놓인 둥근 발 */}
        <Path
          d="M72 139
             C60 138 54 145 57 154
             C60 163 75 166 91 162
             L101 155
             L94 143 Z"
          fill="#C8DCEB"
        />
        <Path
          d="M74 140
             C63 140 58 146 61 153
             C64 160 77 162 90 158
             L97 153
             L91 144 Z"
          fill="url(#polarPawGrad)"
        />

        <Path
          d="M168 139
             C180 138 186 145 183 154
             C180 163 165 166 149 162
             L139 155
             L146 143 Z"
          fill="#C8DCEB"
        />
        <Path
          d="M166 140
             C177 140 182 146 179 153
             C176 160 163 162 150 158
             L143 153
             L149 144 Z"
          fill="url(#polarPawGrad)"
        />

        {/* 몸통 앞쪽의 부드러운 빛 */}
        <Ellipse
          cx={120}
          cy={118}
          rx={49}
          ry={40}
          fill="url(#polarFaceLight)"
          opacity={0.6}
        />

        {/* 팔 뒤쪽 실루엣 */}
        <Path
          d="M79 105
             C69 110 66 122 73 132
             C79 141 92 144 103 139
             L112 125 L102 109 Z"
          fill="#D5E6F1"
        />
        <Path
          d="M161 105
             C171 110 174 122 167 132
             C161 141 148 144 137 139
             L128 125 L138 109 Z"
          fill="#D5E6F1"
        />

        {/* 머리: 넓고 둥근 찐빵형 얼굴 */}
        <Path
          d="M120 24
             C94 24 74 39 69 61
             C63 86 76 108 97 116
             C104 119 112 121 120 121
             C128 121 136 119 143 116
             C164 108 177 86 171 61
             C166 39 146 24 120 24 Z"
          fill="#C9DDEB"
        />
        <Path
          d="M120 25
             C96 25 77 40 73 61
             C68 83 80 103 99 112
             C105 115 113 118 120 118
             C127 118 135 115 141 112
             C160 103 172 83 167 61
             C163 40 144 25 120 25 Z"
          fill="url(#polarFaceGrad)"
        />

        {/* 이마의 넓은 반사광 */}
        <Ellipse
          cx={119}
          cy={48}
          rx={40}
          ry={27}
          fill="url(#polarFaceLight)"
          opacity={0.88}
        />
        <Path
          d="M84 48 Q91 36 103 33"
          stroke="#FFFFFF"
          strokeWidth={3}
          strokeLinecap="round"
          opacity={0.82}
        />

        {/* 감은 눈: 부드러운 눈웃음 */}
        <Path
          d="M84 73
             Q94 84 105 73"
          stroke="#C8D9E7"
          strokeWidth={7}
          strokeLinecap="round"
          fill="none"
          opacity={0.75}
        />
        <Path
          d="M83 71
             Q94 82 105 71"
          stroke="#513B37"
          strokeWidth={3.5}
          strokeLinecap="round"
          fill="none"
        />
        <Path
          d="M135 71
             Q146 82 157 71"
          stroke="#C8D9E7"
          strokeWidth={7}
          strokeLinecap="round"
          fill="none"
          opacity={0.75}
        />
        <Path
          d="M135 71
             Q146 82 157 71"
          stroke="#513B37"
          strokeWidth={3.5}
          strokeLinecap="round"
          fill="none"
        />

        {/* 눈가의 작은 웃음 주름 */}
        <Path
          d="M80 68 L76 65"
          stroke="#D5E3ED"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <Path
          d="M160 68 L164 65"
          stroke="#D5E3ED"
          strokeWidth={2}
          strokeLinecap="round"
        />

        {/* 볼터치 */}
        <Ellipse cx={83} cy={89} rx={17} ry={12} fill="url(#polarBlushGrad)" />
        <Ellipse cx={157} cy={89} rx={17} ry={12} fill="url(#polarBlushGrad)" />
        <Ellipse cx={79} cy={86} rx={3} ry={2} fill="#FFFFFF" opacity={0.72} />
        <Ellipse cx={153} cy={86} rx={3} ry={2} fill="#FFFFFF" opacity={0.72} />

        {/* 둥글고 폭신한 주둥이 */}
        <Ellipse
          cx={120}
          cy={91}
          rx={30}
          ry={22}
          fill="#D7E6F0"
          opacity={0.7}
        />
        <Ellipse
          cx={120}
          cy={89}
          rx={29}
          ry={21}
          fill="url(#polarMuzzleGrad)"
        />

        {/* 코의 부드러운 아래쪽 음영 */}
        <Ellipse
          cx={120}
          cy={85}
          rx={10}
          ry={7}
          fill="#B9C9D6"
          opacity={0.36}
        />
        <Path
          d="M109 80
             C109 76 115 74 120 75
             C125 74 131 76 131 80
             C131 86 126 90 120 90
             C114 90 109 86 109 80 Z"
          fill="url(#polarNoseGrad)"
        />
        <Ellipse
          cx={115}
          cy={78}
          rx={3.5}
          ry={2}
          fill="#FFFFFF"
          opacity={0.62}
        />
        <Circle cx={126} cy={80} r={1.5} fill="#C99D86" opacity={0.75} />

        {/* 해맑은 미소 */}
        <Path
          d="M108 94
             Q114 101 120 97
             Q126 101 132 94"
          stroke="#634139"
          strokeWidth={2.8}
          strokeLinecap="round"
          fill="none"
        />
        <Path
          d="M114 98
             Q120 101 126 98
             Q125 104 120 104
             Q115 104 114 98 Z"
          fill="#F49AB1"
          opacity={0.92}
        />

        {/* 앞발: 가슴 앞에서 다정하게 모으기 */}
        <Path
          d="M85 108
             C77 111 77 121 83 128
             C89 135 101 137 112 130
             L120 123
             L109 111 Z"
          fill="#C8DCEB"
        />
        <Path
          d="M86 108
             C80 112 81 121 86 127
             C92 133 102 133 111 127
             L117 122
             L107 112 Z"
          fill="url(#polarPawGrad)"
        />

        <Path
          d="M155 108
             C163 111 163 121 157 128
             C151 135 139 137 128 130
             L120 123
             L131 111 Z"
          fill="#C8DCEB"
        />
        <Path
          d="M154 108
             C160 112 159 121 154 127
             C148 133 138 133 129 127
             L123 122
             L133 112 Z"
          fill="url(#polarPawGrad)"
        />

        {/* 앞발의 부드러운 하이라이트 */}
        <Path
          d="M87 114 Q91 110 97 113"
          stroke="#FFFFFF"
          strokeWidth={2.5}
          strokeLinecap="round"
          opacity={0.9}
        />
        <Path
          d="M153 114 Q149 110 143 113"
          stroke="#FFFFFF"
          strokeWidth={2.5}
          strokeLinecap="round"
          opacity={0.9}
        />

        {/* 앞발이 모이는 중앙의 작은 음영 */}
        <Path
          d="M116 122 Q120 126 124 122"
          stroke="#C6D9E8"
          strokeWidth={2}
          strokeLinecap="round"
          fill="none"
        />
      </G>
    </>
  );
};

export default PolarBear;

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

interface PinkyPigProps {
  x?: number;
  y?: number;
  scale?: number;
}

export const PinkyPig: React.FC<PinkyPigProps> = ({
  x = 0,
  y = 0,
  scale = 1,
}) => (
  <>
    <Defs>
      <RadialGradient id="pigBodyGrad" cx="32%" cy="20%" rx="78%" ry="85%">
        <Stop offset="0" stopColor="#FFF0F3" />
        <Stop offset="0.38" stopColor="#FFD9E2" />
        <Stop offset="0.72" stopColor="#FFC0CB" />
        <Stop offset="0.92" stopColor="#F39AAF" />
        <Stop offset="1" stopColor="#D97591" />
      </RadialGradient>
      <RadialGradient id="pigFaceGrad" cx="38%" cy="24%" rx="75%" ry="82%">
        <Stop offset="0" stopColor="#FFF6F7" />
        <Stop offset="0.42" stopColor="#FFDDE5" />
        <Stop offset="0.78" stopColor="#FFC0CB" />
        <Stop offset="1" stopColor="#E98EA8" />
      </RadialGradient>
      <RadialGradient id="pigEarGrad" cx="30%" cy="20%" rx="80%" ry="90%">
        <Stop offset="0" stopColor="#FFE9EF" />
        <Stop offset="0.55" stopColor="#FFB9CC" />
        <Stop offset="1" stopColor="#E981A2" />
      </RadialGradient>
      <RadialGradient id="pigSnoutGrad" cx="35%" cy="25%" rx="75%" ry="80%">
        <Stop offset="0" stopColor="#FFDFE7" />
        <Stop offset="0.55" stopColor="#FF9EB8" />
        <Stop offset="1" stopColor="#E66F94" />
      </RadialGradient>
      <RadialGradient id="pigNostrilGrad" cx="30%" cy="20%" r="90%">
        <Stop offset="0" stopColor="#9F4965" />
        <Stop offset="1" stopColor="#713148" />
      </RadialGradient>
      <RadialGradient id="pigEyeGrad" cx="30%" cy="20%" r="90%">
        <Stop offset="0" stopColor="#654051" />
        <Stop offset="0.5" stopColor="#30202C" />
        <Stop offset="1" stopColor="#170F18" />
      </RadialGradient>
      <RadialGradient id="pigBlushGrad" cx="45%" cy="35%" r="70%">
        <Stop offset="0" stopColor="#FF7FA5" stopOpacity="0.8" />
        <Stop offset="1" stopColor="#FF8EB1" stopOpacity="0" />
      </RadialGradient>
      <LinearGradient id="pigHoofGrad" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0" stopColor="#E88BA5" />
        <Stop offset="1" stopColor="#BD5E7D" />
      </LinearGradient>
    </Defs>

    <G transform={`translate(${x} ${y}) scale(${scale})`}>
      {/* 바닥 그림자 */}
      <Ellipse cx={120} cy={181} rx={56} ry={8} fill="#B96580" opacity={0.17} />

      {/* 꼬마 꼬리 */}
      <Path
        d="M166 133 C183 133 190 120 183 113 C177 107 168 113 173 119 C177 123 182 117 179 115"
        fill="none"
        stroke="#E98DA8"
        strokeWidth={8}
        strokeLinecap="round"
      />
      <Path
        d="M169 131 C181 129 185 120 180 116"
        fill="none"
        stroke="#FFE8EE"
        strokeWidth={2.5}
        strokeLinecap="round"
      />

      {/* 짧고 통통한 다리 */}
      <Path
        d="M76 150 Q68 159 72 174 Q78 182 98 179 L104 164 Z"
        fill="url(#pigBodyGrad)"
      />
      <Path
        d="M137 164 L143 179 Q162 182 168 174 Q172 159 164 150 Z"
        fill="url(#pigBodyGrad)"
      />

      <Ellipse cx={87} cy={174} rx={17} ry={9} fill="url(#pigHoofGrad)" />
      <Ellipse cx={153} cy={174} rx={17} ry={9} fill="url(#pigHoofGrad)" />
      <Path
        d="M87 169 L87 177 M153 169 L153 177"
        stroke="#FFD0DC"
        strokeWidth={2}
        strokeLinecap="round"
      />

      {/* 몸통 */}
      <Path
        d="M120 78
           C87 78 65 101 65 132
           C65 158 84 171 120 171
           C156 171 175 158 175 132
           C175 101 153 78 120 78 Z"
        fill="url(#pigBodyGrad)"
      />
      <Ellipse
        cx={100}
        cy={113}
        rx={29}
        ry={34}
        fill="#FFFFFF"
        opacity={0.14}
      />
      <Path
        d="M76 139 Q91 157 120 158 Q149 157 164 139"
        fill="none"
        stroke="#E58AA4"
        strokeWidth={4}
        strokeLinecap="round"
        opacity={0.42}
      />

      {/* 귀 뒤쪽 */}
      <Path d="M72 64 C54 51 48 29 61 25 C76 21 89 39 91 57 Z" fill="#E58AA4" />
      <Path
        d="M74 58 C60 47 57 32 64 30 C74 29 84 43 86 55 Z"
        fill="url(#pigEarGrad)"
      />
      <Path
        d="M168 64 C186 51 192 29 179 25 C164 21 151 39 149 57 Z"
        fill="#E58AA4"
      />
      <Path
        d="M166 58 C180 47 183 32 176 30 C166 29 156 43 154 55 Z"
        fill="url(#pigEarGrad)"
      />

      {/* 머리 */}
      <Path
        d="M120 27
           C88 27 66 47 66 77
           C66 105 87 123 120 124
           C153 123 174 105 174 77
           C174 47 152 27 120 27 Z"
        fill="url(#pigFaceGrad)"
      />
      <Ellipse cx={103} cy={49} rx={34} ry={21} fill="#FFFFFF" opacity={0.25} />

      {/* 귀 안쪽 */}
      <Path
        d="M65 37 Q71 36 79 52 L75 57 Q66 49 65 37 Z"
        fill="#E9789B"
        opacity={0.8}
      />
      <Path
        d="M175 37 Q169 36 161 52 L165 57 Q174 49 175 37 Z"
        fill="#E9789B"
        opacity={0.8}
      />

      {/* 눈 주변 음영 */}
      <Ellipse cx={95} cy={71} rx={13} ry={17} fill="#C96E8C" opacity={0.18} />
      <Ellipse cx={145} cy={71} rx={13} ry={17} fill="#C96E8C" opacity={0.18} />

      {/* 반짝이는 눈 */}
      <Ellipse cx={95} cy={70} rx={10} ry={13} fill="url(#pigEyeGrad)" />
      <Ellipse cx={145} cy={70} rx={10} ry={13} fill="url(#pigEyeGrad)" />
      <Ellipse cx={92} cy={65} rx={3.8} ry={4.5} fill="#FFFFFF" />
      <Circle cx={98} cy={73} r={2.2} fill="#FFFFFF" />
      <Ellipse cx={142} cy={65} rx={3.8} ry={4.5} fill="#FFFFFF" />
      <Circle cx={148} cy={73} r={2.2} fill="#FFFFFF" />

      {/* 별 반사광 */}
      <Path
        d="M105 66 L108 72 L114 75 L108 78 L105 84 L102 78 L96 75 L102 72 Z"
        fill="#FFF19A"
      />
      <Path
        d="M155 66 L158 72 L164 75 L158 78 L155 84 L152 78 L146 75 L152 72 Z"
        fill="#FFF19A"
      />

      {/* 볼터치 */}
      <Ellipse cx={83} cy={91} rx={19} ry={12} fill="url(#pigBlushGrad)" />
      <Ellipse cx={157} cy={91} rx={19} ry={12} fill="url(#pigBlushGrad)" />

      {/* 둥근 돼지코 */}
      <Ellipse cx={120} cy={91} rx={25} ry={19} fill="#E7839F" opacity={0.5} />
      <Ellipse cx={120} cy={88} rx={24} ry={18} fill="url(#pigSnoutGrad)" />
      <Ellipse cx={111} cy={80} rx={7} ry={3} fill="#FFFFFF" opacity={0.5} />
      <Ellipse cx={111} cy={89} rx={4} ry={6} fill="url(#pigNostrilGrad)" />
      <Ellipse cx={129} cy={89} rx={4} ry={6} fill="url(#pigNostrilGrad)" />

      {/* 활짝 웃는 입 */}
      <Path
        d="M105 104 Q120 115 135 104"
        stroke="#853D57"
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M110 107 Q120 111 130 107 Q128 118 120 118 Q112 118 110 107 Z"
        fill="#9D3E5E"
      />
      <Path
        d="M114 109 Q120 112 126 109 Q125 115 120 115 Q115 115 114 109 Z"
        fill="#FF9AB8"
      />

      {/* 내린 앞발 */}
      <Path
        d="M77 105 C63 111 61 130 72 140 C81 147 92 137 94 126 L91 110 Z"
        fill="url(#pigBodyGrad)"
      />

      {/* 인사하는 앞발 */}
      <Path
        d="M155 105
           C166 96 174 83 177 68
           C179 60 187 59 192 65
           C196 72 190 91 181 105
           C175 116 166 123 158 122 Z"
        fill="url(#pigBodyGrad)"
      />
      <Ellipse
        cx={189}
        cy={65}
        rx={9}
        ry={11}
        transform="rotate(22 189 65)"
        fill="url(#pigFaceGrad)"
      />
      <Path
        d="M185 61 Q190 58 193 63"
        stroke="#FFFFFF"
        strokeWidth={2.5}
        strokeLinecap="round"
        opacity={0.8}
      />

      {/* 앞발의 하이라이트 */}
      <Path
        d="M161 108 Q169 99 173 89"
        stroke="#FFFFFF"
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.65}
      />
    </G>
  </>
);

export default PinkyPig;

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

interface PochiPenguinProps {
  x?: number;
  y?: number;
  scale?: number;
}

export const PochiPenguin: React.FC<PochiPenguinProps> = ({
  x = 0,
  y = 0,
  scale = 1,
}) => (
  <>
    <Defs>
      <RadialGradient id="penguinBodyGrad" cx="32%" cy="20%" rx="78%" ry="86%">
        <Stop offset="0" stopColor="#536982" />
        <Stop offset="0.3" stopColor="#27394F" />
        <Stop offset="0.7" stopColor="#172638" />
        <Stop offset="0.92" stopColor="#101B2A" />
        <Stop offset="1" stopColor="#080F19" />
      </RadialGradient>
      <RadialGradient id="penguinBellyGrad" cx="38%" cy="22%" rx="75%" ry="85%">
        <Stop offset="0" stopColor="#FFFFFF" />
        <Stop offset="0.45" stopColor="#FFFDF8" />
        <Stop offset="0.8" stopColor="#FFF2DC" />
        <Stop offset="1" stopColor="#E6D7BF" />
      </RadialGradient>
      <RadialGradient id="penguinFaceGrad" cx="35%" cy="25%" rx="80%" ry="85%">
        <Stop offset="0" stopColor="#FFFFFF" />
        <Stop offset="0.5" stopColor="#FFFDF8" />
        <Stop offset="1" stopColor="#EADBC7" />
      </RadialGradient>
      <RadialGradient id="penguinEyeGrad" cx="30%" cy="20%" r="90%">
        <Stop offset="0" stopColor="#4C5870" />
        <Stop offset="0.45" stopColor="#1B2436" />
        <Stop offset="0.85" stopColor="#080D16" />
        <Stop offset="1" stopColor="#3C4050" />
      </RadialGradient>
      <LinearGradient id="penguinBeakGrad" x1="0" y1="0" x2="0.8" y2="1">
        <Stop offset="0" stopColor="#FFE98A" />
        <Stop offset="0.45" stopColor="#FFC94D" />
        <Stop offset="1" stopColor="#E88924" />
      </LinearGradient>
      <LinearGradient id="penguinFootGrad" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0" stopColor="#FFD96B" />
        <Stop offset="1" stopColor="#F28A30" />
      </LinearGradient>
      <RadialGradient id="penguinBlushGrad" cx="40%" cy="35%" r="75%">
        <Stop offset="0" stopColor="#FFB5A0" stopOpacity="0.65" />
        <Stop offset="1" stopColor="#FFB5A0" stopOpacity="0" />
      </RadialGradient>
    </Defs>

    <G transform={`translate(${x} ${y}) scale(${scale})`}>
      <Ellipse cx={120} cy={181} rx={52} ry={7} fill="#172638" opacity={0.18} />

      {/* 짧은 주황색 발 */}
      <Path
        d="M86 156 Q76 167 77 175 Q89 181 108 175 L112 165 Z"
        fill="url(#penguinFootGrad)"
      />
      <Path
        d="M130 165 L134 175 Q153 181 165 175 Q166 167 154 156 Z"
        fill="url(#penguinFootGrad)"
      />
      <Path
        d="M83 173 L98 171 M139 171 L158 173"
        stroke="#FFE7A0"
        strokeWidth={2.5}
        strokeLinecap="round"
      />

      {/* 몸통: 아래가 묵직한 물방울형 */}
      <Path
        d="M120 31
           C89 31 69 55 65 91
           C59 127 69 157 91 169
           C105 176 135 176 149 169
           C171 157 181 127 175 91
           C171 55 151 31 120 31 Z"
        fill="url(#penguinBodyGrad)"
      />

      {/* 왼쪽 날개 */}
      <Path
        d="M76 83
           C60 88 50 108 55 127
           C58 139 67 142 75 131
           L88 106 Z"
        fill="#0E1928"
      />
      <Path
        d="M70 94 Q59 111 64 128"
        stroke="#62748B"
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.7}
      />

      {/* 오른쪽 날개 */}
      <Path
        d="M164 83
           C180 88 190 108 185 127
           C182 139 173 142 165 131
           L152 106 Z"
        fill="url(#penguinBodyGrad)"
      />
      <Path
        d="M170 94 Q181 111 176 128"
        stroke="#62748B"
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.7}
      />

      {/* 크림색 배 */}
      <Path
        d="M120 79
           C96 79 83 101 85 128
           C86 150 99 163 120 164
           C141 163 154 150 155 128
           C157 101 144 79 120 79 Z"
        fill="url(#penguinBellyGrad)"
      />
      <Ellipse cx={103} cy={111} rx={13} ry={28} fill="#FFFFFF" opacity={0.5} />

      {/* 살짝 갸웃한 머리 */}
      <G transform="rotate(-5 120 67)">
        <Ellipse
          cx={120}
          cy={62}
          rx={51}
          ry={43}
          fill="url(#penguinBodyGrad)"
        />

        {/* 얼굴 중앙의 크림색 마스크 */}
        <Path
          d="M120 34
             C99 34 87 49 88 69
             C89 87 101 99 120 101
             C139 99 151 87 152 69
             C153 49 141 34 120 34 Z"
          fill="url(#penguinFaceGrad)"
        />

        {/* 눈 */}
        <Ellipse
          cx={103}
          cy={62}
          rx={12}
          ry={15}
          fill="#111827"
          opacity={0.5}
        />
        <Ellipse
          cx={137}
          cy={62}
          rx={12}
          ry={15}
          fill="#111827"
          opacity={0.5}
        />
        <Ellipse cx={103} cy={60} rx={10} ry={13} fill="url(#penguinEyeGrad)" />
        <Ellipse cx={137} cy={60} rx={10} ry={13} fill="url(#penguinEyeGrad)" />
        <Ellipse cx={100} cy={55} rx={4} ry={4.5} fill="#FFFFFF" />
        <Circle cx={106} cy={64} r={2.2} fill="#FFFFFF" />
        <Ellipse cx={134} cy={55} rx={4} ry={4.5} fill="#FFFFFF" />
        <Circle cx={140} cy={64} r={2.2} fill="#FFFFFF" />

        {/* 별 반사광 */}
        <Path
          d="M113 56 L116 62 L122 65 L116 68 L113 74 L110 68 L104 65 L110 62 Z"
          fill="#FFF19A"
        />
        <Path
          d="M147 56 L150 62 L156 65 L150 68 L147 74 L144 68 L138 65 L144 62 Z"
          fill="#FFF19A"
        />

        {/* 볼 */}
        <Ellipse cx={92} cy={77} rx={13} ry={9} fill="url(#penguinBlushGrad)" />
        <Ellipse
          cx={148}
          cy={77}
          rx={13}
          ry={9}
          fill="url(#penguinBlushGrad)"
        />

        {/* 부리 */}
        <Path d="M108 75 Q120 69 132 75 L120 90 Z" fill="#D97C25" />
        <Path
          d="M109 73 Q120 68 131 73 L120 85 Z"
          fill="url(#penguinBeakGrad)"
        />
        <Path
          d="M113 73 Q120 71 125 73"
          stroke="#FFF4B4"
          strokeWidth={2}
          strokeLinecap="round"
        />

        {/* 작은 미소 */}
        <Path
          d="M111 94 Q120 100 129 94"
          fill="none"
          stroke="#725044"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
      </G>

      {/* 날개 끝 하이라이트 */}
      <Path
        d="M58 116 Q59 127 65 130"
        stroke="#91A2B5"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.65}
      />
      <Path
        d="M182 116 Q181 127 175 130"
        stroke="#91A2B5"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.65}
      />
    </G>
  </>
);

export default PochiPenguin;

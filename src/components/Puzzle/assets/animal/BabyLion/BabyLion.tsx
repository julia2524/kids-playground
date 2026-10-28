import React from "react";
import {
  Circle,
  Ellipse,
  G,
  Path,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
} from "react-native-svg";
interface BabyLionProps {
  x?: number;
  y?: number;
  scale?: number;
}

export const BabyLion: React.FC<BabyLionProps> = ({
  x = 0,
  y = 0,
  scale = 1,
}) => {
  return (
    <>
      <Defs>
        {/* Golden brown mane */}
        <RadialGradient id="lionManeGrad" cx="35%" cy="22%" r="85%">
          <Stop offset="0%" stopColor="#FFE09A" />
          <Stop offset="38%" stopColor="#F5B94F" />
          <Stop offset="72%" stopColor="#D98A2E" />
          <Stop offset="100%" stopColor="#AD6429" />
        </RadialGradient>

        <LinearGradient
          id="lionManeLockGrad"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <Stop offset="0%" stopColor="#FFD77E" />
          <Stop offset="55%" stopColor="#EBA13B" />
          <Stop offset="100%" stopColor="#BF722B" />
        </LinearGradient>

        {/* Cream body */}
        <RadialGradient id="lionBodyGrad" cx="30%" cy="20%" r="90%">
          <Stop offset="0%" stopColor="#FFF9E9" />
          <Stop offset="48%" stopColor="#F7E8C8" />
          <Stop offset="82%" stopColor="#E9CCA0" />
          <Stop offset="100%" stopColor="#D2AC78" />
        </RadialGradient>

        <RadialGradient id="lionFaceGrad" cx="32%" cy="22%" r="85%">
          <Stop offset="0%" stopColor="#FFF6D9" />
          <Stop offset="60%" stopColor="#F5DDA9" />
          <Stop offset="100%" stopColor="#D9AC70" />
        </RadialGradient>

        <RadialGradient id="lionMuzzleGrad" cx="35%" cy="20%" r="90%">
          <Stop offset="0%" stopColor="#FFFDF4" />
          <Stop offset="72%" stopColor="#F8EBD5" />
          <Stop offset="100%" stopColor="#E3C9A4" />
        </RadialGradient>

        <RadialGradient id="lionEarGrad" cx="35%" cy="25%" r="90%">
          <Stop offset="0%" stopColor="#FFE1C7" />
          <Stop offset="100%" stopColor="#D88E68" />
        </RadialGradient>

        <RadialGradient id="lionEyeGrad" cx="30%" cy="18%" r="85%">
          <Stop offset="0%" stopColor="#514039" />
          <Stop offset="45%" stopColor="#302522" />
          <Stop offset="100%" stopColor="#120F12" />
        </RadialGradient>

        <LinearGradient id="lionPawGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#FFF4D8" />
          <Stop offset="65%" stopColor="#F1D8AC" />
          <Stop offset="100%" stopColor="#D9B788" />
        </LinearGradient>

        <LinearGradient id="lionTailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#F5B94F" />
          <Stop offset="100%" stopColor="#BF722B" />
        </LinearGradient>
      </Defs>

      <G
        transform={`
    translate(${x} ${y})
    scale(${scale})
    translate(-150 -150)
  `}
      >
        {/* Ground shadow */}
        {/* Ground shadow */}
        <Ellipse
          cx="151"
          cy="273"
          rx="72"
          ry="11"
          fill="#8D633D"
          opacity={0.15}
        />
        <Ellipse
          cx="151"
          cy="273"
          rx="48"
          ry="5"
          fill="#8D633D"
          opacity={0.08}
        />

        {/* Tail */}
        <Path
          d="M191 222 C218 226 228 208 224 190 C222 179 229 173 239 179"
          stroke="#C67C30"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <Path
          d="M193 220 C216 221 223 205 220 191"
          stroke="#F5C568"
          strokeWidth="3"
          strokeLinecap="round"
          opacity={0.9}
        />
        <Ellipse
          cx="241"
          cy="181"
          rx="12"
          ry="15"
          transform="rotate(28 241 181)"
          fill="#A85F2B"
        />
        <Path
          d="M235 171 Q245 173 248 182"
          stroke="#D99443"
          strokeWidth="3"
          strokeLinecap="round"
          opacity={0.8}
        />

        {/* Body */}
        <Ellipse
          cx="151"
          cy="220"
          rx="54"
          ry="48"
          fill="#B57A42"
          opacity={0.12}
        />
        <Path
          d="M111 180
           C91 188 88 211 96 237
           C102 258 121 268 151 268
           C181 268 200 256 206 235
           C213 211 205 189 187 180
           C166 169 132 169 111 180Z"
          fill="url(#lionBodyGrad)"
        />
        <Path
          d="M109 198 C102 216 106 240 120 250"
          stroke="#FFFDF1"
          strokeWidth="5"
          strokeLinecap="round"
          opacity={0.58}
        />
        <Path
          d="M193 205 C201 225 194 246 181 254"
          stroke="#D2AC78"
          strokeWidth="4"
          strokeLinecap="round"
          opacity={0.45}
        />

        {/* Feet */}
        <Ellipse cx="126" cy="261" rx="26" ry="14" fill="url(#lionPawGrad)" />
        <Ellipse cx="177" cy="261" rx="26" ry="14" fill="url(#lionPawGrad)" />
        <Path
          d="M111 260 Q119 265 126 260"
          stroke="#D7B88B"
          strokeWidth="2"
          strokeLinecap="round"
          opacity={0.8}
        />
        <Path
          d="M164 260 Q172 265 179 260"
          stroke="#D7B88B"
          strokeWidth="2"
          strokeLinecap="round"
          opacity={0.8}
        />

        {/* Mane silhouette */}
        <Path
          d="M150 25
           C165 14 180 25 183 39
           C200 31 215 43 212 60
           C231 61 239 77 229 93
           C246 105 243 122 229 134
           C242 150 233 167 216 173
           C220 192 204 203 187 196
           C177 215 159 216 148 202
           C133 215 116 209 111 194
           C91 202 76 190 81 173
           C62 166 57 149 71 135
           C55 120 59 103 75 94
           C65 76 76 60 94 60
           C92 42 109 31 125 40
           C130 25 141 20 150 25Z"
          fill="url(#lionManeGrad)"
        />

        {/* Mane locks: soft sculpted layers */}
        <Path
          d="M113 35 C122 29 133 34 137 45 C131 56 120 60 108 54 C104 46 106 40 113 35Z"
          fill="url(#lionManeLockGrad)"
        />
        <Path
          d="M143 27 C155 22 166 31 165 43 C159 51 148 54 139 46 C137 38 138 32 143 27Z"
          fill="#FFD77E"
          opacity={0.92}
        />
        <Path
          d="M174 39 C187 36 197 47 190 59 C184 66 172 66 165 57 C165 49 168 43 174 39Z"
          fill="url(#lionManeLockGrad)"
        />
        <Path
          d="M199 64 C211 62 220 73 213 84 C207 92 195 91 188 82 C189 74 192 68 199 64Z"
          fill="#EAA13B"
        />
        <Path
          d="M214 97 C225 103 225 116 215 123 C205 127 195 120 195 110 C199 102 206 98 214 97Z"
          fill="url(#lionManeLockGrad)"
        />
        <Path
          d="M211 140 C222 147 217 161 206 165 C195 167 188 159 191 149 C196 141 203 138 211 140Z"
          fill="#E8A03B"
        />
        <Path
          d="M187 174 C196 185 187 197 175 196 C164 194 160 184 166 175 C173 170 181 170 187 174Z"
          fill="url(#lionManeLockGrad)"
        />
        <Path
          d="M146 186 C158 183 167 194 160 205 C152 213 140 208 136 199 C137 192 140 188 146 186Z"
          fill="#E9A13D"
        />
        <Path
          d="M111 174 C123 171 132 181 127 193 C120 202 107 198 103 188 C103 182 106 177 111 174Z"
          fill="#F5BD59"
        />
        <Path
          d="M83 143 C93 138 104 145 103 156 C100 167 87 170 80 161 C77 154 78 148 83 143Z"
          fill="url(#lionManeLockGrad)"
        />
        <Path
          d="M82 99 C93 94 104 102 102 113 C98 124 86 125 79 117 C76 110 77 104 82 99Z"
          fill="#F7C66A"
        />
        <Path
          d="M98 65 C108 60 119 67 117 78 C114 88 102 91 95 83 C92 76 93 70 98 65Z"
          fill="url(#lionManeLockGrad)"
        />

        {/* Mane highlights */}
        <Path
          d="M116 39 Q124 34 129 41"
          stroke="#FFF0BD"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity={0.75}
        />
        <Path
          d="M147 31 Q155 28 160 35"
          stroke="#FFF2C5"
          strokeWidth="3"
          strokeLinecap="round"
          opacity={0.85}
        />
        <Path
          d="M177 44 Q184 42 188 49"
          stroke="#FFF0BD"
          strokeWidth="3"
          strokeLinecap="round"
          opacity={0.75}
        />
        <Path
          d="M203 72 Q208 71 210 77"
          stroke="#FFE6A3"
          strokeWidth="3"
          strokeLinecap="round"
          opacity={0.75}
        />

        {/* Ears */}
        <G>
          <Circle cx="104" cy="78" r="20" fill="#D18A39" />
          <Circle cx="104" cy="78" r="13" fill="url(#lionEarGrad)" />
          <Ellipse
            cx="99"
            cy="72"
            rx="5"
            ry="3"
            transform="rotate(-30 99 72)"
            fill="#FFF1D4"
            opacity={0.8}
          />
          <Circle cx="197" cy="78" r="20" fill="#C97D30" />
          <Circle cx="197" cy="78" r="13" fill="url(#lionEarGrad)" />
          <Ellipse
            cx="192"
            cy="72"
            rx="5"
            ry="3"
            transform="rotate(-30 192 72)"
            fill="#FFF1D4"
            opacity={0.8}
          />
        </G>

        {/* Face */}
        <Ellipse cx="151" cy="108" rx="65" ry="66" fill="url(#lionFaceGrad)" />
        <Ellipse
          cx="126"
          cy="65"
          rx="22"
          ry="9"
          transform="rotate(-18 126 65)"
          fill="#FFF9E5"
          opacity={0.35}
        />

        {/* Forehead tuft */}
        <Path
          d="M137 49
           C132 38 142 34 148 44
           C155 32 166 38 162 49
           C159 57 150 60 144 55Z"
          fill="#E7A13C"
        />
        <Path
          d="M143 44 Q148 41 150 47"
          stroke="#FFE4A0"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity={0.9}
        />

        {/* Eyes */}
        <Ellipse cx="128" cy="105" rx="12" ry="15" fill="url(#lionEyeGrad)" />
        <Ellipse cx="174" cy="105" rx="12" ry="15" fill="url(#lionEyeGrad)" />

        {/* Eye reflections */}
        <Ellipse cx="124" cy="99" rx="4.5" ry="5.5" fill="#FFFFFF" />
        <Circle cx="133" cy="109" r="2.3" fill="#FFFFFF" />
        <Ellipse cx="170" cy="99" rx="4.5" ry="5.5" fill="#FFFFFF" />
        <Circle cx="179" cy="109" r="2.3" fill="#FFFFFF" />

        {/* Starry eye glints */}
        <Path
          d="M136 95 L138 99 L142 101 L138 103 L136 107 L134 103 L130 101 L134 99Z"
          fill="#FFE78A"
        />
        <Path
          d="M182 95 L184 99 L188 101 L184 103 L182 107 L180 103 L176 101 L180 99Z"
          fill="#FFE78A"
        />

        {/* Eyebrows */}
        <Path
          d="M115 86 Q126 79 137 86"
          stroke="#A66A36"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <Path
          d="M165 86 Q176 79 187 86"
          stroke="#A66A36"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Blush */}
        <Ellipse
          cx="108"
          cy="128"
          rx="14"
          ry="8"
          fill="#F49A99"
          opacity={0.48}
        />
        <Ellipse
          cx="194"
          cy="128"
          rx="14"
          ry="8"
          fill="#F49A99"
          opacity={0.48}
        />
        <Ellipse
          cx="105"
          cy="126"
          rx="6"
          ry="2.5"
          fill="#FFD2C6"
          opacity={0.75}
        />

        {/* Muzzle */}
        <Ellipse
          cx="151"
          cy="133"
          rx="31"
          ry="24"
          fill="url(#lionMuzzleGrad)"
        />
        <Ellipse
          cx="140"
          cy="127"
          rx="10"
          ry="5"
          fill="#FFFFFF"
          opacity={0.38}
        />
        <Ellipse cx="151" cy="126" rx="10" ry="7" fill="#704632" />
        <Path
          d="M145 126 Q151 131 157 126"
          stroke="#704632"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Smile */}
        <Path
          d="M151 133
           C151 142 143 145 137 140
           M151 133
           C151 142 159 145 165 140"
          stroke="#754633"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <Path
          d="M143 142 Q151 149 159 142 Q156 152 151 151 Q146 150 143 142Z"
          fill="#E9787A"
        />
        <Path
          d="M147 144 Q151 146 155 144"
          stroke="#FFB5B3"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Raised waving arm — behind paw */}
        <Path
          d="M193 184
           C207 174 215 157 212 141
           C211 132 216 126 224 128
           C232 131 232 140 231 147
           C230 170 220 192 203 201Z"
          fill="url(#lionBodyGrad)"
        />
        <Path
          d="M207 169 Q219 153 217 139"
          stroke="#FFF9E8"
          strokeWidth="4"
          strokeLinecap="round"
          opacity={0.65}
        />

        {/* Waving paw */}
        <Ellipse
          cx="225"
          cy="126"
          rx="16"
          ry="19"
          transform="rotate(18 225 126)"
          fill="url(#lionPawGrad)"
        />
        <Ellipse
          cx="231"
          cy="119"
          rx="6"
          ry="4"
          transform="rotate(-25 231 119)"
          fill="#FFFFFF"
          opacity={0.65}
        />
        <Path
          d="M219 128 Q216 133 220 136"
          stroke="#D9B788"
          strokeWidth="2"
          strokeLinecap="round"
          opacity={0.7}
        />
        <Path
          d="M228 130 Q226 135 230 138"
          stroke="#D9B788"
          strokeWidth="2"
          strokeLinecap="round"
          opacity={0.7}
        />

        {/* Other arm */}
        <Path
          d="M108 185
           C96 191 92 204 100 214
           C107 223 120 218 127 209
           L133 198Z"
          fill="url(#lionBodyGrad)"
        />
        <Ellipse
          cx="111"
          cy="207"
          rx="15"
          ry="12"
          transform="rotate(-25 111 207)"
          fill="url(#lionPawGrad)"
        />
        <Ellipse
          cx="107"
          cy="202"
          rx="5"
          ry="3"
          transform="rotate(-25 107 202)"
          fill="#FFFFFF"
          opacity={0.55}
        />

        {/* Body highlight */}
        <Path
          d="M130 188 Q143 181 158 186"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
          opacity={0.45}
        />

        {/* Tiny floating sparkle */}
        <Path
          d="M72 115 L75 122 L82 125 L75 128 L72 135 L69 128 L62 125 L69 122Z"
          fill="#FFE18A"
          opacity={0.95}
        />
        <Circle cx="86" cy="143" r="2.5" fill="#FFF2C8" />
      </G>
    </>
  );
};

export default BabyLion;

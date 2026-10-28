import React from "react";
import Svg, {
  Circle,
  Ellipse,
  G,
  Path,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
} from "react-native-svg";

interface BabyElephantProps {
  x?: number;
  y?: number;
  scale?: number;
}

export const BabyElephant: React.FC<BabyElephantProps> = ({
  x = 0,
  y = 0,
  scale = 1,
}) => {
  return (
    <G transform={`translate(${x} ${y})`}>
      <G
        transform={`translate(${150 * (1 - scale)} ${150 * (1 - scale)}) scale(${scale})`}
      >
        <Svg width={300} height={300} viewBox="0 0 300 300" fill="none">
          <Defs>
            {/* Main soft blue clay skin */}
            <RadialGradient id="elephant-bodyGrad" cx="30%" cy="20%" r="85%">
              <Stop offset="0%" stopColor="#DDF3FF" />
              <Stop offset="35%" stopColor="#B8E3FC" />
              <Stop offset="70%" stopColor="#93C5FD" />
              <Stop offset="100%" stopColor="#579EDB" />
            </RadialGradient>

            <LinearGradient
              id="elephant-bodySideGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <Stop offset="0%" stopColor="#C8EBFF" />
              <Stop offset="60%" stopColor="#93C5FD" />
              <Stop offset="100%" stopColor="#4E9DD5" />
            </LinearGradient>

            {/* Inner ears */}
            <RadialGradient id="elephant-earGrad" cx="38%" cy="25%" r="85%">
              <Stop offset="0%" stopColor="#FFD8DD" />
              <Stop offset="60%" stopColor="#F6AEBE" />
              <Stop offset="100%" stopColor="#D986A4" />
            </RadialGradient>

            <RadialGradient
              id="elephant-earOuterGrad"
              cx="30%"
              cy="20%"
              r="90%"
            >
              <Stop offset="0%" stopColor="#D7F1FF" />
              <Stop offset="65%" stopColor="#93C5FD" />
              <Stop offset="100%" stopColor="#4B98D0" />
            </RadialGradient>

            {/* Face */}
            <RadialGradient id="elephant-faceGrad" cx="30%" cy="18%" r="90%">
              <Stop offset="0%" stopColor="#E7F8FF" />
              <Stop offset="45%" stopColor="#C5E9FC" />
              <Stop offset="80%" stopColor="#93C5FD" />
              <Stop offset="100%" stopColor="#72AEDD" />
            </RadialGradient>

            {/* Trunk */}
            <LinearGradient
              id="elephant-trunkGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <Stop offset="0%" stopColor="#D8F2FF" />
              <Stop offset="40%" stopColor="#A8D8F7" />
              <Stop offset="80%" stopColor="#80BCE9" />
              <Stop offset="100%" stopColor="#5599D0" />
            </LinearGradient>

            {/* Deep navy glossy eyes */}
            <RadialGradient id="elephant-eyeGrad" cx="28%" cy="18%" r="85%">
              <Stop offset="0%" stopColor="#40546F" />
              <Stop offset="42%" stopColor="#182D4B" />
              <Stop offset="100%" stopColor="#091525" />
            </RadialGradient>

            {/* Creamy feet */}
            <LinearGradient
              id="elephant-footGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <Stop offset="0%" stopColor="#D9F1FF" />
              <Stop offset="65%" stopColor="#9DCFF2" />
              <Stop offset="100%" stopColor="#6FA9D8" />
            </LinearGradient>

            {/* Soft ground shadow */}
            <RadialGradient id="elephant-shadowGrad" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#557FA3" stopOpacity={0.25} />
              <Stop offset="65%" stopColor="#557FA3" stopOpacity={0.12} />
              <Stop offset="100%" stopColor="#557FA3" stopOpacity={0} />
            </RadialGradient>
          </Defs>

          {/* Ground shadow */}
          <Ellipse
            cx="150"
            cy="270"
            rx="86"
            ry="17"
            fill="url(#elephant-shadowGrad)"
          />

          {/* Back legs */}
          <Path
            d="M94 211
               C91 225 91 245 96 258
               C99 267 111 270 121 264
               C127 260 126 248 126 237
               L129 211Z"
            fill="url(#elephant-footGrad)"
          />
          <Path
            d="M174 211
               L178 238
               C178 249 177 260 185 265
               C194 271 207 266 209 257
               L207 216Z"
            fill="url(#elephant-footGrad)"
          />

          {/* Back foot highlights */}
          <Path
            d="M99 247 Q102 254 110 254"
            stroke="#E9F8FF"
            strokeWidth="3"
            strokeLinecap="round"
            opacity={0.8}
          />
          <Path
            d="M187 250 Q193 255 200 252"
            stroke="#D5EEFF"
            strokeWidth="3"
            strokeLinecap="round"
            opacity={0.75}
          />

          {/* Tail */}
          <Path
            d="M194 192
               C215 193 222 207 217 219
               C214 225 209 228 205 228"
            stroke="#7DB5E3"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <Path
            d="M194 192
               C213 195 217 206 213 215"
            stroke="#D9F3FF"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity={0.8}
          />
          <Path
            d="M202 225 L206 231 L211 224"
            stroke="#6DA7D7"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Large ears behind the head */}
          <Path
            d="M112 105
               C95 77 66 73 49 91
               C34 107 38 145 56 163
               C70 177 91 170 108 151Z"
            fill="url(#elephant-earOuterGrad)"
          />
          <Path
            d="M104 112
               C89 91 67 89 56 104
               C47 117 53 143 66 153
               C78 163 91 153 103 141Z"
            fill="url(#elephant-earGrad)"
          />
          <Path
            d="M63 105
               C72 99 85 103 91 112"
            stroke="#FFE8EB"
            strokeWidth="4"
            strokeLinecap="round"
            opacity={0.8}
          />

          <Path
            d="M188 105
               C205 77 234 73 251 91
               C266 107 262 145 244 163
               C230 177 209 170 192 151Z"
            fill="url(#elephant-earOuterGrad)"
          />
          <Path
            d="M196 112
               C211 91 233 89 244 104
               C253 117 247 143 234 153
               C222 163 209 153 197 141Z"
            fill="url(#elephant-earGrad)"
          />
          <Path
            d="M237 105
               C228 99 215 103 209 112"
            stroke="#FFE8EB"
            strokeWidth="4"
            strokeLinecap="round"
            opacity={0.8}
          />

          {/* Plump body */}
          <Path
            d="M91 165
               C82 181 79 207 87 229
               C95 250 119 260 151 260
               C183 260 207 250 215 229
               C223 207 220 181 211 165
               C195 145 107 145 91 165Z"
            fill="url(#elephant-bodyGrad)"
          />

          {/* Body side shading */}
          <Path
            d="M194 177
               C207 190 207 218 195 237
               C188 247 179 251 171 253
               C194 249 211 239 215 222
               C220 203 214 184 204 173Z"
            fill="url(#elephant-bodySideGrad)"
            opacity={0.55}
          />

          {/* Front legs */}
          <Path
            d="M101 218
               C99 231 101 249 105 260
               C109 268 124 269 131 263
               C135 259 133 246 132 235
               L132 215Z"
            fill="url(#elephant-footGrad)"
          />
          <Path
            d="M166 215
               L166 236
               C165 247 163 259 170 264
               C178 270 193 268 196 260
               C200 248 198 232 195 218Z"
            fill="url(#elephant-footGrad)"
          />

          {/* Feet detail */}
          <Path
            d="M108 258 Q117 263 126 258"
            stroke="#6DA6D7"
            strokeWidth="2"
            strokeLinecap="round"
            opacity={0.6}
          />
          <Path
            d="M173 258 Q182 263 191 258"
            stroke="#6DA6D7"
            strokeWidth="2"
            strokeLinecap="round"
            opacity={0.6}
          />

          {/* Head */}
          <Ellipse
            cx="150"
            cy="125"
            rx="74"
            ry="76"
            fill="url(#elephant-faceGrad)"
          />

          {/* Head contour shading */}
          <Path
            d="M88 108
               C91 73 116 52 149 51
               C180 50 204 71 211 100"
            stroke="#EAF9FF"
            strokeWidth="6"
            strokeLinecap="round"
            opacity={0.65}
          />

          {/* Fluffy forehead tuft */}
          <Path
            d="M125 57
               C117 46 127 36 136 46
               C140 32 154 34 157 47
               C168 37 179 47 171 59
               C161 67 138 68 125 57Z"
            fill="url(#elephant-bodyGrad)"
          />
          <Path
            d="M130 48 Q136 44 140 50"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
            opacity={0.8}
          />
          <Path
            d="M150 43 Q157 41 160 48"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity={0.8}
          />

          {/* Eyebrows */}
          <Path
            d="M103 108 Q117 99 130 106"
            stroke="#679AC8"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity={0.75}
          />
          <Path
            d="M169 106 Q182 99 196 108"
            stroke="#679AC8"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity={0.75}
          />

          {/* Eyes */}
          <Ellipse
            cx="118"
            cy="124"
            rx="13"
            ry="16"
            fill="url(#elephant-eyeGrad)"
          />
          <Ellipse
            cx="182"
            cy="124"
            rx="13"
            ry="16"
            fill="url(#elephant-eyeGrad)"
          />

          {/* Large eye reflections */}
          <Ellipse cx="113.5" cy="117.5" rx="5" ry="6" fill="#FFFFFF" />
          <Circle cx="123" cy="129" r="2.5" fill="#FFFFFF" />
          <Ellipse cx="177.5" cy="117.5" rx="5" ry="6" fill="#FFFFFF" />
          <Circle cx="187" cy="129" r="2.5" fill="#FFFFFF" />

          {/* Signature butter-yellow four-point stars */}
          <Path
            d="M132 112
               L135 118
               L141 121
               L135 124
               L132 130
               L129 124
               L123 121
               L129 118Z"
            fill="#FFD66E"
          />
          <Path
            d="M196 112
               L199 118
               L205 121
               L199 124
               L196 130
               L193 124
               L187 121
               L193 118Z"
            fill="#FFD66E"
          />

          {/* Coral-pink blush */}
          <Ellipse
            cx="96"
            cy="147"
            rx="15"
            ry="9"
            fill="#FF9C9C"
            opacity={0.48}
          />
          <Ellipse
            cx="204"
            cy="147"
            rx="15"
            ry="9"
            fill="#FF9C9C"
            opacity={0.48}
          />
          <Ellipse
            cx="92"
            cy="144"
            rx="6"
            ry="2.5"
            fill="#FFD9D9"
            opacity={0.8}
          />
          <Ellipse
            cx="200"
            cy="144"
            rx="6"
            ry="2.5"
            fill="#FFD9D9"
            opacity={0.8}
          />

          {/* Trunk: raised and gently curled */}
          <Path
            d="M146 126
               C143 139 141 149 143 158
               C145 169 157 172 165 164
               C172 157 169 150 164 151
               C160 152 159 157 162 159"
            stroke="#5A9DD4"
            strokeWidth="26"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M144 125
               C141 138 139 149 141 157
               C143 166 154 169 162 162"
            stroke="url(#elephant-trunkGrad)"
            strokeWidth="23"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Trunk glossy highlight */}
          <Path
            d="M146 132
               C143 142 142 151 145 157"
            stroke="#E8F8FF"
            strokeWidth="4"
            strokeLinecap="round"
            opacity={0.9}
          />
          <Path
            d="M152 163 Q157 165 161 160"
            stroke="#DDF4FF"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity={0.9}
          />

          {/* Trunk tip */}
          <Ellipse
            cx="163"
            cy="157"
            rx="5"
            ry="4"
            transform="rotate(-25 163 157)"
            fill="#80BCE9"
          />
          <Circle cx="164" cy="156" r="1.4" fill="#4C8FC5" />

          {/* Gentle smile */}
          <Path
            d="M130 157
               Q139 166 147 157"
            stroke="#477FA8"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <Path
            d="M173 157
               Q181 166 190 157"
            stroke="#477FA8"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Soft highlights on the cheeks and head */}
          <Path
            d="M99 88 Q112 70 131 69"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            opacity={0.6}
          />
          <Path
            d="M180 73 Q195 80 201 93"
            stroke="#EAF9FF"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity={0.65}
          />

          {/* Body highlights */}
          <Path
            d="M109 184 Q124 174 139 179"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            opacity={0.45}
          />
          <Path
            d="M94 203 Q93 217 100 227"
            stroke="#E5F7FF"
            strokeWidth="3"
            strokeLinecap="round"
            opacity={0.55}
          />
        </Svg>
      </G>
    </G>
  );
};

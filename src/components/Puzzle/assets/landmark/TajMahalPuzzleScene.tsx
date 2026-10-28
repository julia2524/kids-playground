import React from "react";
import Svg, {
  Rect,
  Path,
  Circle,
  Ellipse,
  G,
  Line,
  Stop,
  Defs,
  LinearGradient,
} from "react-native-svg";

export function TajMahalPuzzleScene() {
  return (
    <>
      <Defs>
        <LinearGradient id="tajMarble" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#FFFFFF" />
          <Stop offset="0.55" stopColor="#FAF8ED" />
          <Stop offset="1" stopColor="#E5DEC9" />
        </LinearGradient>
        <LinearGradient id="tajWater" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#91E6E9" />
          <Stop offset="1" stopColor="#38AFCB" />
        </LinearGradient>
      </Defs>

      {/* Sky */}
      <Rect width="240" height="300" fill="#4DBCEB" />

      {/* Soft clouds */}
      <G fill="#F5FAF8">
        <Ellipse cx="28" cy="31" rx="20" ry="9" />
        <Circle cx="18" cy="27" r="9" />
        <Circle cx="30" cy="23" r="12" />
        <Circle cx="42" cy="29" r="8" />

        <Ellipse cx="204" cy="43" rx="22" ry="8" />
        <Circle cx="193" cy="38" r="9" />
        <Circle cx="207" cy="34" r="12" />
        <Circle cx="219" cy="41" r="8" />
      </G>

      {/* Cloudy horizon behind the palace */}
      <G fill="#B9E8E8">
        <Circle cx="28" cy="116" r="22" />
        <Circle cx="53" cy="105" r="28" />
        <Circle cx="82" cy="116" r="21" />
        <Circle cx="163" cy="113" r="24" />
        <Circle cx="192" cy="103" r="30" />
        <Circle cx="220" cy="116" r="21" />
        <Rect x="12" y="115" width="216" height="20" />
      </G>

      {/* Garden lawn */}
      <Rect x="0" y="179" width="240" height="121" fill="#73C92D" />
      <Path
        d="M0 179 Q120 170 240 179 L240 191 Q120 184 0 191 Z"
        fill="#8BD84A"
      />

      {/* Symmetrical sandstone paths */}
      <Path d="M0 300 L0 246 L93 177 L105 177 L36 300 Z" fill="#E5C3A6" />
      <Path d="M240 300 L240 246 L147 177 L135 177 L204 300 Z" fill="#E5C3A6" />
      <Path
        d="M0 300 L0 267 L82 193 L91 193 L29 300 Z"
        fill="#F7C0B7"
        opacity={0.85}
      />
      <Path
        d="M240 300 L240 267 L158 193 L149 193 L211 300 Z"
        fill="#F7C0B7"
        opacity={0.85}
      />

      {/* Distant garden hedges */}
      <Path d="M0 194 Q35 187 68 194 L68 201 L0 205 Z" fill="#4EAD35" />
      <Path d="M172 194 Q205 187 240 194 L240 205 L172 201 Z" fill="#4EAD35" />

      {/* Far side minarets */}
      <G>
        <Path d="M64 103 L69 103 L72 171 L61 171 Z" fill="#E5DEC9" />
        <Path d="M66 105 L69 105 L70 169 L65 169 Z" fill="#FFFFFF" />
        <Path d="M60 119 L73 119 L73 123 L60 123 Z" fill="#D6CDB7" />
        <Path d="M60 145 L73 145 L73 149 L60 149 Z" fill="#D6CDB7" />
        <Path d="M59 103 Q66 89 73 103 Z" fill="#FAF8ED" />
        <Path d="M66 89 L66 84 L68 84 L68 89 Z" fill="#D69E2E" />

        <Path d="M171 103 L176 103 L179 171 L168 171 Z" fill="#E5DEC9" />
        <Path d="M173 105 L176 105 L177 169 L172 169 Z" fill="#FFFFFF" />
        <Path d="M167 119 L180 119 L180 123 L167 123 Z" fill="#D6CDB7" />
        <Path d="M167 145 L180 145 L180 149 L167 149 Z" fill="#D6CDB7" />
        <Path d="M166 103 Q173 89 180 103 Z" fill="#FAF8ED" />
        <Path d="M173 89 L173 84 L175 84 L175 89 Z" fill="#D69E2E" />
      </G>

      {/* Main palace base and platform */}
      <Path d="M53 158 L187 158 L194 174 L46 174 Z" fill="#D6CDB7" />
      <Rect x="49" y="151" width="142" height="13" fill="url(#tajMarble)" />
      <Rect x="44" y="164" width="152" height="5" rx="1" fill="#E5DEC9" />
      <Rect x="40" y="169" width="160" height="5" rx="1" fill="#FAF8ED" />

      {/* Main palace body */}
      <Path
        d="M65 122 Q65 118 70 118 L170 118 Q175 118 175 122 L181 158 L59 158 Z"
        fill="url(#tajMarble)"
      />
      <Path d="M65 122 L70 118 L70 158 L59 158 Z" fill="#E5DEC9" />
      <Path d="M175 122 L170 118 L170 158 L181 158 Z" fill="#E5DEC9" />

      {/* Roof cornice */}
      <Path d="M60 119 L180 119 L184 123 L56 123 Z" fill="#FFFFFF" />
      <Path d="M61 124 L179 124" stroke="#D6CDB7" strokeWidth="1.5" />

      {/* Main onion dome */}
      <Path
        d="M91 119
           C92 108 98 99 105 93
           C110 89 112 82 112 76
           C116 80 119 80 120 80
           C124 80 127 78 128 76
           C128 84 131 90 136 94
           C143 100 148 109 149 119 Z"
        fill="#FAF8ED"
      />
      <Path
        d="M120 80
           C124 80 127 78 128 76
           C128 84 131 90 136 94
           C143 100 148 109 149 119
           L120 119 Z"
        fill="#E5DEC9"
      />
      <Path
        d="M112 78 Q120 73 128 78"
        stroke="#D6CDB7"
        strokeWidth="1.2"
        fill="none"
      />

      {/* Golden finial */}
      <Path d="M118 79 L120 67 L122 79 Z" fill="#D69E2E" />
      <Ellipse cx="120" cy="78" rx="4" ry="1.5" fill="#E8B84D" />
      <Circle cx="120" cy="66" r="2" fill="#F3CF69" />

      {/* Smaller rooftop domes */}
      <G fill="#FAF8ED">
        <Path d="M75 119 C75 111 79 106 84 103 C88 106 92 111 92 119 Z" />
        <Path d="M148 119 C148 111 152 106 156 103 C161 106 165 111 165 119 Z" />
        <Path d="M57 119 C57 114 60 110 64 108 C68 110 71 114 71 119 Z" />
        <Path d="M169 119 C169 114 172 110 176 108 C180 110 183 114 183 119 Z" />
      </G>
      <G fill="#E5DEC9">
        <Path d="M84 103 C88 106 92 111 92 119 L84 119 Z" />
        <Path d="M156 103 C161 106 165 111 165 119 L156 119 Z" />
        <Path d="M64 108 C68 110 71 114 71 119 L64 119 Z" />
        <Path d="M176 108 C180 110 183 114 183 119 L176 119 Z" />
      </G>
      <G fill="#D69E2E">
        <Path d="M83 104 L84 99 L85 104 Z" />
        <Path d="M155 104 L156 99 L157 104 Z" />
        <Path d="M63 109 L64 105 L65 109 Z" />
        <Path d="M175 109 L176 105 L177 109 Z" />
      </G>

      {/* Central grand arch */}
      <Path
        d="M105 158 L105 140
           C105 128 111 123 120 123
           C129 123 135 128 135 140
           L135 158 Z"
        fill="#4A5568"
      />
      <Path
        d="M110 158 L110 141
           C110 132 114 128 120 128
           C126 128 130 132 130 141
           L130 158 Z"
        fill="#2D3748"
      />
      <Path
        d="M113 158 L113 141 Q113 132 120 132 Q127 132 127 141 L127 158 Z"
        fill="#4A5568"
      />

      {/* Side arches */}
      <G fill="#4A5568">
        <Path d="M73 158 L73 142 Q73 132 81 132 Q89 132 89 142 L89 158 Z" />
        <Path d="M151 158 L151 142 Q151 132 159 132 Q167 132 167 142 L167 158 Z" />
      </G>
      <G fill="#2D3748">
        <Path d="M77 158 L77 143 Q77 137 81 137 Q85 137 85 143 L85 158 Z" />
        <Path d="M155 158 L155 143 Q155 137 159 137 Q163 137 163 143 L163 158 Z" />
      </G>

      {/* Marble details and decorative panels */}
      <G fill="#D6CDB7">
        <Rect x="94" y="128" width="4" height="24" rx="1" />
        <Rect x="142" y="128" width="4" height="24" rx="1" />
        <Rect x="67" y="127" width="3" height="24" rx="1" />
        <Rect x="170" y="127" width="3" height="24" rx="1" />
      </G>
      <G fill="#B9A77E">
        <Circle cx="96" cy="132" r="1.2" />
        <Circle cx="144" cy="132" r="1.2" />
        <Circle cx="68.5" cy="131" r="1" />
        <Circle cx="171.5" cy="131" r="1" />
      </G>

      {/* Foreground minarets */}
      <G>
        <Path d="M28 123 L34 123 L39 187 L24 187 Z" fill="#E5DEC9" />
        <Path d="M29 126 L32 126 L34 185 L27 185 Z" fill="#FFFFFF" />
        <Path d="M23 140 L40 140 L40 144 L23 144 Z" fill="#D6CDB7" />
        <Path d="M23 164 L40 164 L40 168 L23 168 Z" fill="#D6CDB7" />
        <Path d="M22 123 Q31 106 40 123 Z" fill="#FAF8ED" />
        <Path d="M30 107 L31 101 L32 107 Z" fill="#D69E2E" />

        <Path d="M206 123 L212 123 L216 187 L201 187 Z" fill="#E5DEC9" />
        <Path d="M208 126 L211 126 L213 185 L204 185 Z" fill="#FFFFFF" />
        <Path d="M200 140 L217 140 L217 144 L200 144 Z" fill="#D6CDB7" />
        <Path d="M200 164 L217 164 L217 168 L200 168 Z" fill="#D6CDB7" />
        <Path d="M199 123 Q208 106 217 123 Z" fill="#FAF8ED" />
        <Path d="M207 107 L208 101 L209 107 Z" fill="#D69E2E" />
      </G>

      {/* Garden trees: layered cypress silhouettes */}
      <G>
        {[
          { x: 12, y: 203, s: 1 },
          { x: 48, y: 205, s: 0.8 },
          { x: 72, y: 199, s: 0.65 },
          { x: 168, y: 199, s: 0.65 },
          { x: 192, y: 205, s: 0.8 },
          { x: 228, y: 203, s: 1 },
        ].map((tree, index) => (
          <G
            key={index}
            transform={`translate(${tree.x} ${tree.y}) scale(${tree.s})`}
          >
            <Path d="M0 -24 L-9 0 L9 0 Z" fill="#278E3B" />
            <Path d="M0 -18 L-6 -3 L0 -3 Z" fill="#54B94B" />
            <Rect x="-1.5" y="0" width="3" height="6" fill="#9B6A42" />
          </G>
        ))}
      </G>

      {/* Central reflecting pool: perspective toward the palace */}
      <Path d="M104 177 L136 177 L169 300 L71 300 Z" fill="#55C7D8" />
      <Path d="M108 179 L132 179 L151 300 L89 300 Z" fill="url(#tajWater)" />
      <Path
        d="M117 184 L123 184 L127 300 L113 300 Z"
        fill="#B9F1ED"
        opacity={0.8}
      />
      <G stroke="#E9FFFF" strokeWidth="1.2" strokeLinecap="round">
        <Line x1="111" y1="192" x2="129" y2="192" />
        <Line x1="108" y1="207" x2="132" y2="207" />
        <Line x1="104" y1="226" x2="136" y2="226" />
        <Line x1="98" y1="249" x2="142" y2="249" />
        <Line x1="91" y1="276" x2="149" y2="276" />
      </G>

      {/* Pool edge */}
      <Path d="M102 178 L138 178 L140 182 L100 182 Z" fill="#F5FAF8" />

      {/* Tourists taking a selfie on the left */}
      <G>
        {/* shadow */}
        <Ellipse
          cx="49"
          cy="281"
          rx="11"
          ry="3"
          fill="#398B3D"
          opacity={0.35}
        />

        {/* legs */}
        <Path d="M44 265 L43 278 L47 278 L49 267 Z" fill="#F3C7A0" />
        <Path d="M50 265 L52 278 L56 278 L54 264 Z" fill="#F3C7A0" />
        <Path d="M42 277 L48 277 L48 280 L41 280 Z" fill="#344B6A" />
        <Path d="M51 277 L57 277 L58 280 L51 280 Z" fill="#344B6A" />

        {/* body and backpack */}
        <Path
          d="M41 247 Q48 243 55 248 L57 265 Q49 269 42 265 Z"
          fill="#F2A65A"
        />
        <Path d="M39 249 Q36 251 38 260 L42 260 L44 250 Z" fill="#4D7C9D" />

        {/* head */}
        <Circle cx="48" cy="239" r="7" fill="#F3C7A0" />
        <Path
          d="M41 239 Q40 230 48 231 Q56 231 55 239 L52 237 Q47 233 42 238 Z"
          fill="#65452F"
        />

        {/* raised selfie arm */}
        <Path
          d="M54 250 Q61 244 62 237"
          stroke="#F3C7A0"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <Rect
          x="59"
          y="232"
          width="6"
          height="9"
          rx="1.5"
          fill="#344B6A"
          transform="rotate(12 62 236)"
        />
        <Circle cx="62" cy="234" r="1" fill="#B9E8E8" />
      </G>

      {/* Walking couple on the right path */}
      <G>
        {/* Adult 1 shadow */}
        <Ellipse
          cx="190"
          cy="282"
          rx="8"
          ry="2.5"
          fill="#398B3D"
          opacity={0.35}
        />
        <Path d="M186 266 L185 278 L188 278 L190 267 Z" fill="#F1C49D" />
        <Path d="M191 266 L193 278 L196 278 L194 266 Z" fill="#F1C49D" />
        <Path d="M184 277 L189 277 L189 280 L183 280 Z" fill="#42536B" />
        <Path d="M192 277 L197 277 L198 280 L192 280 Z" fill="#42536B" />
        <Path
          d="M184 248 Q190 245 195 249 L196 266 Q190 269 184 266 Z"
          fill="#6B9BD2"
        />
        <Path d="M184 249 L181 259 L184 261 L188 251 Z" fill="#F1C49D" />
        <Circle cx="190" cy="241" r="6" fill="#F1C49D" />
        <Path
          d="M184 241 Q183 234 190 234 Q197 234 196 242 L193 239 L186 239 Z"
          fill="#5A3E2B"
        />

        {/* Adult 2 shadow */}
        <Ellipse
          cx="211"
          cy="286"
          rx="8"
          ry="2.5"
          fill="#398B3D"
          opacity={0.35}
        />
        <Path d="M207 269 L206 281 L209 281 L211 270 Z" fill="#E8B58D" />
        <Path d="M212 269 L214 281 L217 281 L215 269 Z" fill="#E8B58D" />
        <Path d="M205 280 L210 280 L210 283 L204 283 Z" fill="#D66B79" />
        <Path d="M213 280 L218 280 L219 283 L213 283 Z" fill="#D66B79" />
        <Path
          d="M205 251 Q211 248 216 252 L217 269 Q211 272 205 269 Z"
          fill="#E987A0"
        />
        <Path d="M205 253 L201 262 L204 264 L209 254 Z" fill="#E8B58D" />
        <Circle cx="211" cy="244" r="6" fill="#E8B58D" />
        <Path
          d="M205 244 Q204 237 211 237 Q218 237 217 245 L214 242 L207 242 Z"
          fill="#4B3528"
        />
        {/* small handbag */}
        <Path d="M216 258 L221 258 L222 265 L217 265 Z" fill="#D69E2E" />
        <Path
          d="M217 258 Q218 254 220 258"
          stroke="#B77B24"
          strokeWidth="1.2"
          fill="none"
        />
      </G>

      {/* Tiny flowers along the garden */}
      <G>
        <Circle cx="16" cy="231" r="2" fill="#FFE7A3" />
        <Circle cx="19" cy="234" r="1.5" fill="#F7C0B7" />
        <Circle cx="226" cy="229" r="2" fill="#FFE7A3" />
        <Circle cx="222" cy="233" r="1.5" fill="#F7C0B7" />
        <Circle cx="77" cy="217" r="1.5" fill="#FFFFFF" />
        <Circle cx="163" cy="217" r="1.5" fill="#FFFFFF" />
      </G>

      {/* Small decorative sparkles */}
      <G fill="#FFF3B0">
        <Path d="M87 54 L89 60 L95 62 L89 64 L87 70 L85 64 L79 62 L85 60 Z" />
        <Path d="M157 64 L158.5 68 L163 69.5 L158.5 71 L157 75 L155.5 71 L151 69.5 L155.5 68 Z" />
      </G>
    </>
  );
}

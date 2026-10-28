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

export function OperaHousePuzzleScene() {
  return (
    <>
      <Defs>
        <LinearGradient id="operaWater" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#48BDB5" />
          <Stop offset="1" stopColor="#3398DC" />
        </LinearGradient>
        <LinearGradient id="operaShell" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FFFFFF" />
          <Stop offset="0.55" stopColor="#FFF9EE" />
          <Stop offset="1" stopColor="#D1E0E8" />
        </LinearGradient>
        <LinearGradient id="operaHull" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#38566C" />
          <Stop offset="1" stopColor="#1C3144" />
        </LinearGradient>
      </Defs>

      {/* Sky */}
      <Rect width="240" height="300" fill="#4DBCEB" />

      {/* Soft white clouds */}
      <G fill="#F5FAF8">
        <Ellipse cx="34" cy="32" rx="23" ry="8" />
        <Circle cx="22" cy="29" r="8" />
        <Circle cx="34" cy="25" r="10" />
        <Circle cx="45" cy="30" r="7" />

        <Ellipse cx="192" cy="45" rx="24" ry="7" />
        <Circle cx="181" cy="42" r="7" />
        <Circle cx="194" cy="37" r="10" />
        <Circle cx="206" cy="43" r="7" />
      </G>

      {/* Cloudy horizon */}
      <G fill="#B9E8E8">
        <Circle cx="13" cy="119" r="22" />
        <Circle cx="38" cy="111" r="28" />
        <Circle cx="66" cy="120" r="20" />
        <Circle cx="178" cy="119" r="22" />
        <Circle cx="205" cy="109" r="29" />
        <Circle cx="232" cy="120" r="21" />
        <Rect x="0" y="120" width="240" height="22" />
      </G>

      {/* Distant harbor shoreline */}
      <Path
        d="M0 132 Q30 127 59 133 T119 132 T180 133 T240 131 L240 150 L0 150 Z"
        fill="#72C7BE"
      />

      {/* Harbor water */}
      <Rect x="0" y="143" width="240" height="157" fill="url(#operaWater)" />

      {/* Distant water glints */}
      <G stroke="#B9F0E9" strokeWidth="1.2" strokeLinecap="round" opacity={0.8}>
        <Line x1="13" y1="159" x2="37" y2="159" />
        <Line x1="48" y1="171" x2="68" y2="171" />
        <Line x1="151" y1="158" x2="177" y2="158" />
        <Line x1="190" y1="174" x2="214" y2="174" />
        <Line x1="19" y1="198" x2="39" y2="198" />
        <Line x1="123" y1="188" x2="142" y2="188" />
      </G>

      {/* Opera House podium */}
      <Path d="M34 139 L191 139 L180 154 L47 154 Z" fill="#C99E6E" />
      <Path d="M41 135 L185 135 L191 140 L34 140 Z" fill="#F0D6B2" />
      <Path d="M47 154 L180 154 L176 159 L51 159 Z" fill="#B88658" />

      {/* Red-brown roofline beneath the shells */}
      <Path
        d="M48 137 L83 125 L117 135 L147 126 L181 138 L181 143 L48 143 Z"
        fill="#C77D68"
      />
      <Path
        d="M48 137 L83 125 L117 135 L147 126 L181 138"
        fill="none"
        stroke="#E7AD91"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Glass facade */}
      <Path d="M55 142 L177 142 L171 154 L61 154 Z" fill="#2C3E50" />
      <G stroke="#7399A9" strokeWidth="1.3">
        <Line x1="70" y1="142" x2="70" y2="153" />
        <Line x1="84" y1="142" x2="84" y2="153" />
        <Line x1="98" y1="142" x2="98" y2="153" />
        <Line x1="112" y1="142" x2="112" y2="153" />
        <Line x1="126" y1="142" x2="126" y2="153" />
        <Line x1="140" y1="142" x2="140" y2="153" />
        <Line x1="154" y1="142" x2="154" y2="153" />
        <Line x1="168" y1="142" x2="168" y2="153" />
      </G>

      {/* Left rear shell */}
      <Path
        d="M54 135
           Q59 111 79 91
           Q77 113 94 135
           Q74 132 54 135 Z"
        fill="#D1E0E8"
      />
      <Path
        d="M54 135
           Q59 111 79 91
           Q76 112 83 131
           Q67 132 54 135 Z"
        fill="#FFFFFF"
      />
      <Path
        d="M79 91 Q77 113 94 135"
        stroke="#B3C9D6"
        strokeWidth="1.2"
        fill="none"
      />

      {/* Large left shell */}
      <Path
        d="M72 137
           Q81 105 105 78
           Q103 112 128 137
           Q99 132 72 137 Z"
        fill="#D1E0E8"
      />
      <Path
        d="M72 137
           Q81 105 105 78
           Q102 111 110 133
           Q90 133 72 137 Z"
        fill="#FFFFFF"
      />
      <Path
        d="M105 78 Q103 112 128 137"
        stroke="#B3C9D6"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Central tall shell */}
      <Path
        d="M99 136
           Q108 101 132 66
           Q130 108 154 136
           Q127 131 99 136 Z"
        fill="#D1E0E8"
      />
      <Path
        d="M99 136
           Q108 101 132 66
           Q130 107 137 133
           Q117 133 99 136 Z"
        fill="#FFFFFF"
      />
      <Path
        d="M132 66 Q130 108 154 136"
        stroke="#B3C9D6"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Right rear shell */}
      <Path
        d="M133 137
           Q148 111 163 91
           Q162 114 184 137
           Q158 132 133 137 Z"
        fill="#D1E0E8"
      />
      <Path
        d="M133 137
           Q148 111 163 91
           Q160 114 165 133
           Q149 133 133 137 Z"
        fill="#FFF9EE"
      />
      <Path
        d="M163 91 Q162 114 184 137"
        stroke="#B3C9D6"
        strokeWidth="1.2"
        fill="none"
      />

      {/* Right foreground shell */}
      <Path
        d="M128 137
           Q148 108 174 82
           Q169 115 196 139
           Q163 132 128 137 Z"
        fill="#B3C9D6"
      />
      <Path
        d="M128 137
           Q148 108 174 82
           Q168 113 172 133
           Q148 133 128 137 Z"
        fill="#FFF9EE"
      />
      <Path
        d="M174 82 Q169 115 196 139"
        stroke="#AFC4D2"
        strokeWidth="1.4"
        fill="none"
      />

      {/* Shell base highlights */}
      <Path
        d="M49 137 Q118 129 193 138"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Soft inverted shell reflection */}
      <G opacity={0.35}>
        <Path
          d="M54 157
             Q59 177 79 192
             Q77 174 94 157 Z"
          fill="#82C2E5"
        />
        <Path
          d="M72 157
             Q81 184 105 207
             Q103 179 128 157 Z"
          fill="#B9E8F5"
        />
        <Path
          d="M99 157
             Q108 190 132 217
             Q130 183 154 157 Z"
          fill="#82C2E5"
        />
        <Path
          d="M133 157
             Q148 180 163 197
             Q162 176 184 157 Z"
          fill="#B9E8F5"
        />
        <Path
          d="M128 157
             Q148 184 174 206
             Q169 178 196 157 Z"
          fill="#82C2E5"
        />
      </G>

      {/* Reflection shimmer */}
      <G stroke="#D9F7F5" strokeWidth="1.3" strokeLinecap="round" opacity={0.7}>
        <Line x1="67" y1="176" x2="93" y2="176" />
        <Line x1="111" y1="187" x2="135" y2="187" />
        <Line x1="151" y1="176" x2="173" y2="176" />
        <Line x1="80" y1="204" x2="104" y2="204" />
      </G>

      {/* Small harbor boat in the distance */}
      <G>
        <Path d="M12 158 L45 158 L39 165 L19 165 Z" fill="#F5FAF8" />
        <Rect x="22" y="151" width="13" height="7" rx="1" fill="#FFFFFF" />
        <Rect x="26" y="153" width="4" height="3" fill="#5E9AB7" />
        <Path d="M12 158 L45 158 L39 165 L19 165 Z" fill="#E5C39C" />
        <Path
          d="M18 166 Q29 169 41 166"
          stroke="#E9FFFF"
          strokeWidth="1.2"
          fill="none"
        />
      </G>

      {/* Large foreground ferry */}
      <G>
        {/* Water shadow */}
        <Ellipse
          cx="171"
          cy="272"
          rx="65"
          ry="8"
          fill="#176D8C"
          opacity={0.35}
        />

        {/* Main hull */}
        <Path
          d="M92 224
             L235 238
             L217 267
             Q209 277 190 279
             L126 270
             Q111 266 104 253 Z"
          fill="url(#operaHull)"
        />
        <Path
          d="M104 253 L217 267 Q209 277 190 279 L126 270 Q111 266 104 253 Z"
          fill="#172B3B"
        />

        {/* Hull stripe */}
        <Path d="M99 239 L231 251 L226 258 L103 246 Z" fill="#E5F4F7" />
        <Path
          d="M101 241 L229 253"
          stroke="#6EAFC7"
          strokeWidth="1.2"
          fill="none"
        />

        {/* Upper deck */}
        <Path d="M105 210 L216 221 L235 238 L92 224 Z" fill="#F5FAF8" />
        <Path d="M105 210 L216 221 L222 226 L100 215 Z" fill="#FFFFFF" />

        {/* Cabin */}
        <Path d="M124 192 L180 198 L203 221 L113 212 Z" fill="#FFFFFF" />
        <Path d="M130 196 L176 201 L188 214 L121 208 Z" fill="#C7E5ED" />

        {/* Cabin windows */}
        <G fill="#2C536B">
          <Path d="M132 199 L140 200 L143 205 L134 204 Z" />
          <Path d="M145 201 L153 202 L156 207 L148 206 Z" />
          <Path d="M158 202 L166 203 L170 209 L161 208 Z" />
          <Path d="M171 204 L178 205 L182 211 L174 210 Z" />
        </G>

        {/* Roof and smokestack */}
        <Path d="M120 192 L179 198 L185 203 L125 197 Z" fill="#E5E9E9" />
        <Path d="M151 184 L160 185 L163 198 L153 197 Z" fill="#D69E2E" />
        <Path d="M151 184 L160 185 L160 189 L152 188 Z" fill="#F4CF72" />

        {/* Deck railings */}
        <Path
          d="M100 218 L216 230"
          stroke="#F5FAF8"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <G stroke="#F5FAF8" strokeWidth="1.2">
          <Line x1="108" y1="218" x2="108" y2="228" />
          <Line x1="123" y1="220" x2="123" y2="230" />
          <Line x1="138" y1="222" x2="138" y2="232" />
          <Line x1="153" y1="223" x2="153" y2="233" />
          <Line x1="168" y1="225" x2="168" y2="235" />
          <Line x1="183" y1="226" x2="183" y2="236" />
          <Line x1="198" y1="228" x2="198" y2="238" />
          <Line x1="212" y1="230" x2="212" y2="240" />
        </G>

        {/* Traveler 1: taking a photo */}
        <G>
          <Circle cx="132" cy="204" r="5" fill="#F3C7A0" />
          <Path
            d="M127 204 Q127 198 132 199 Q138 199 137 205 L134 202 Z"
            fill="#65452F"
          />
          <Path d="M126 210 L137 211 L139 222 L127 221 Z" fill="#E987A0" />
          <Path d="M127 212 L122 207 L124 205 L130 210 Z" fill="#F3C7A0" />
          <Path d="M136 212 L141 207 L143 209 L139 216 Z" fill="#F3C7A0" />
          <Rect
            x="140"
            y="204"
            width="5"
            height="6"
            rx="1"
            fill="#344B6A"
            transform="rotate(12 142 207)"
          />
          <Path d="M128 221 L128 227 L132 227 L133 221 Z" fill="#344B6A" />
          <Path d="M134 221 L136 227 L140 227 L138 221 Z" fill="#344B6A" />
        </G>

        {/* Traveler 2: enjoying the view */}
        <G>
          <Circle cx="166" cy="208" r="5" fill="#E8B58D" />
          <Path
            d="M161 208 Q160 202 166 203 Q172 203 171 209 L168 206 Z"
            fill="#4B3528"
          />
          <Path d="M160 214 L171 215 L173 226 L160 225 Z" fill="#6B9BD2" />
          <Path d="M161 216 L156 221 L158 223 L164 218 Z" fill="#E8B58D" />
          <Path d="M171 216 L176 220 L174 222 L170 219 Z" fill="#E8B58D" />
          <Path d="M162 225 L162 231 L166 231 L167 225 Z" fill="#42536B" />
          <Path d="M168 225 L170 231 L174 231 L172 225 Z" fill="#42536B" />
        </G>

        {/* Small life ring */}
        <Circle cx="205" cy="245" r="5" fill="#F5FAF8" />
        <Circle cx="205" cy="245" r="2.5" fill="#E987A0" />
      </G>

      {/* Foreground sparkle details */}
      <G fill="#FFF3B0">
        <Path d="M25 80 L27 86 L33 88 L27 90 L25 96 L23 90 L17 88 L23 86 Z" />
        <Path d="M204 72 L205.5 76 L210 77.5 L205.5 79 L204 83 L202.5 79 L198 77.5 L202.5 76 Z" />
      </G>
    </>
  );
}

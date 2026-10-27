import React from "react";
import {
  Rect,
  Path,
  Circle,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
} from "react-native-svg";

export default function PolarBearBackground() {
  return (
    <>
      <Defs>
        <LinearGradient id="arcticNight" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#11182F" />
          <Stop offset="0.55" stopColor="#20294C" />
          <Stop offset="1" stopColor="#364E78" />
        </LinearGradient>

        <LinearGradient id="arcticAuroraGreen" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#53BDB5" stopOpacity="0" />
          <Stop offset="0.35" stopColor="#53BDB5" stopOpacity="0.7" />
          <Stop offset="0.65" stopColor="#9BE8D0" stopOpacity="0.55" />
          <Stop offset="1" stopColor="#53BDB5" stopOpacity="0" />
        </LinearGradient>

        <LinearGradient id="arcticAuroraPurple" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#9B8AEF" stopOpacity="0" />
          <Stop offset="0.5" stopColor="#9B8AEF" stopOpacity="0.65" />
          <Stop offset="1" stopColor="#C7B9FF" stopOpacity="0" />
        </LinearGradient>

        <LinearGradient id="arcticMountain" x1="0" y1="0" x2="0.8" y2="1">
          <Stop offset="0" stopColor="#F9FCFF" />
          <Stop offset="1" stopColor="#A6D8F1" />
        </LinearGradient>

        <LinearGradient id="arcticWater" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#345D91" />
          <Stop offset="0.45" stopColor="#288FAD" />
          <Stop offset="1" stopColor="#17466F" />
        </LinearGradient>

        <RadialGradient id="arcticReflection" cx="50%" cy="0%" r="100%">
          <Stop offset="0" stopColor="#73E3C9" stopOpacity="0.65" />
          <Stop offset="1" stopColor="#53BDB5" stopOpacity="0" />
        </RadialGradient>
      </Defs>

      {/* Night sky */}
      <Rect width={240} height={180} fill="url(#arcticNight)" />

      {/* Aurora curtain */}
      <Path
        d="M-12 0
           L44 0
           C35 17 47 28 37 43
           C29 55 37 66 29 78
           L8 82
           C17 63 8 54 19 38
           C28 23 12 15 -12 18 Z"
        fill="url(#arcticAuroraGreen)"
        opacity={0.9}
      />

      <Path
        d="M28 -8
           C61 7 72 24 64 43
           C57 61 72 73 61 92
           L40 92
           C53 73 39 61 49 43
           C58 24 43 11 28 -8 Z"
        fill="url(#arcticAuroraGreen)"
        opacity={0.85}
      />

      <Path
        d="M87 -8
           C111 10 118 23 107 39
           C97 54 111 69 102 84
           L82 84
           C94 67 81 55 92 39
           C103 23 97 8 87 -8 Z"
        fill="url(#arcticAuroraPurple)"
        opacity={0.9}
      />

      <Path
        d="M146 -8
           C175 11 180 24 167 43
           C157 59 173 72 161 89
           L142 89
           C154 70 141 59 152 42
           C163 24 157 11 146 -8 Z"
        fill="url(#arcticAuroraGreen)"
        opacity={0.75}
      />

      <Path
        d="M185 -8
           C212 11 218 24 207 39
           C198 53 211 66 201 82
           L181 82
           C193 65 181 54 192 39
           C203 23 197 10 185 -8 Z"
        fill="url(#arcticAuroraPurple)"
        opacity={0.9}
      />

      {/* Soft flowing aurora bands */}
      <Path
        d="M-8 32
           C29 10 43 22 59 37
           S87 60 112 30
           S152 13 173 32
           S213 47 248 17"
        fill="none"
        stroke="#73E3C9"
        strokeWidth={5}
        strokeLinecap="round"
        opacity={0.4}
      />

      <Path
        d="M-8 46
           C25 26 43 39 61 51
           S91 70 115 47
           S151 30 173 47
           S216 61 248 34"
        fill="none"
        stroke="#9B8AEF"
        strokeWidth={4}
        strokeLinecap="round"
        opacity={0.45}
      />

      {/* Stars */}
      {[
        [13, 17, 1.1],
        [53, 11, 1.4],
        [78, 25, 0.9],
        [111, 12, 1.3],
        [137, 28, 1],
        [177, 12, 1.3],
        [219, 20, 1.5],
        [230, 49, 0.9],
        [14, 66, 0.8],
        [91, 61, 0.8],
        [188, 58, 1],
      ].map(([cx, cy, r], index) => (
        <Circle
          key={index}
          cx={cx}
          cy={cy}
          r={r}
          fill="#FFF9F0"
          opacity={0.85}
        />
      ))}

      {/* Distant snow-covered mountains */}
      <Path
        d="M0 101 L16 80 L25 88 L42 68 L62 96 L78 84 L96 102 Z"
        fill="url(#arcticMountain)"
        opacity={0.9}
      />

      <Path
        d="M15 81 L25 88 L42 68 L35 89 L25 85 L20 92 Z"
        fill="#FFFFFF"
        opacity={0.95}
      />

      <Path
        d="M151 101 L174 80 L185 87 L202 66 L222 91 L232 83 L240 92 L240 110 Z"
        fill="url(#arcticMountain)"
        opacity={0.95}
      />

      <Path
        d="M174 80 L185 87 L202 66 L195 89 L185 84 L179 92 Z"
        fill="#FFFFFF"
        opacity={0.95}
      />

      {/* Water */}
      <Path
        d="M0 99
           Q35 94 65 100
           T128 99
           T190 100
           T240 98
           L240 180 L0 180 Z"
        fill="url(#arcticWater)"
      />

      {/* Broad aurora reflection */}
      <Path
        d="M26 101
           C56 97 78 102 92 107
           C103 112 110 116 119 116
           C103 121 83 116 70 112
           C55 107 40 108 26 111 Z"
        fill="url(#arcticReflection)"
      />

      <Path
        d="M158 101
           C184 98 207 101 226 106
           L226 112
           C203 107 182 108 160 112 Z"
        fill="#9B8AEF"
        opacity={0.22}
      />

      {/* Horizontal water glints */}
      <Path
        d="M8 116 Q22 112 37 116
           M47 123 Q62 120 76 123
           M176 119 Q194 115 209 119
           M196 130 Q211 127 226 130"
        stroke="#9AECE0"
        strokeWidth={1.5}
        strokeLinecap="round"
        opacity={0.65}
        fill="none"
      />

      <Path
        d="M17 137 Q34 133 49 137
           M183 141 Q201 136 221 140
           M66 151 Q77 148 88 151"
        stroke="#8ED6F2"
        strokeWidth={1.2}
        strokeLinecap="round"
        opacity={0.6}
        fill="none"
      />

      {/* Snow particles */}
      {[
        [28, 34, 1],
        [76, 46, 1.3],
        [124, 36, 0.9],
        [165, 42, 1.1],
        [218, 71, 1.2],
        [11, 88, 1.3],
        [53, 94, 0.8],
        [210, 96, 1],
        [31, 119, 0.9],
        [221, 151, 1.2],
      ].map(([cx, cy, r], index) => (
        <Circle
          key={index}
          cx={cx}
          cy={cy}
          r={r}
          fill="#FFFFFF"
          opacity={0.65}
        />
      ))}
    </>
  );
}

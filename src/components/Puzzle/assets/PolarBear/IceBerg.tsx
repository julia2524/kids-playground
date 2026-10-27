import React from "react";
import {
  Path,
  Ellipse,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

export default function Iceberg() {
  return (
    <>
      <Defs>
        <LinearGradient id="icebergSide" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#A7E6F7" />
          <Stop offset="0.5" stopColor="#38BDF8" />
          <Stop offset="1" stopColor="#1477A8" />
        </LinearGradient>

        <LinearGradient id="icebergTop" x1="0" y1="0" x2="0.8" y2="1">
          <Stop offset="0" stopColor="#FFFFFF" />
          <Stop offset="0.55" stopColor="#F0F8FF" />
          <Stop offset="1" stopColor="#C7EAF9" />
        </LinearGradient>
      </Defs>

      {/* Thick floating ice side */}
      <Path
        d="M29 128
           C34 116 69 111 118 112
           C165 112 203 117 211 128
           L215 143
           C215 153 174 161 122 160
           C72 160 32 152 26 143 Z"
        fill="url(#icebergSide)"
        stroke="#27678D"
        strokeWidth={1.2}
        strokeLinejoin="round"
      />

      {/* Side facet */}
      <Path
        d="M39 140
           C76 149 160 151 205 137
           L211 145
           C174 158 75 157 33 145 Z"
        fill="#1679A5"
        opacity={0.55}
      />

      {/* Ice top surface */}
      <Path
        d="M27 128
           C28 118 69 112 119 112
           C170 112 209 118 213 128
           C216 138 176 146 122 146
           C69 146 28 138 27 128 Z"
        fill="url(#icebergTop)"
        stroke="#D4F0FA"
        strokeWidth={1.3}
      />

      {/* Top surface highlights */}
      <Path
        d="M48 125 Q79 117 111 122"
        stroke="#FFFFFF"
        strokeWidth={2.2}
        strokeLinecap="round"
        opacity={0.9}
        fill="none"
      />

      <Path
        d="M151 121 Q174 122 191 127"
        stroke="#FFFFFF"
        strokeWidth={1.6}
        strokeLinecap="round"
        opacity={0.85}
        fill="none"
      />

      <Ellipse cx={69} cy={132} rx={8} ry={2} fill="#8ED6F2" opacity={0.4} />

      <Ellipse cx={180} cy={133} rx={10} ry={2} fill="#8ED6F2" opacity={0.45} />

      {/* Tiny ice crystals */}
      <Path
        d="M55 124 L58 120 L61 124 L58 127 Z"
        fill="#FFFFFF"
        opacity={0.9}
      />

      <Circle cx={193} cy={123} r={1.3} fill="#FFFFFF" opacity={0.9} />
    </>
  );
}

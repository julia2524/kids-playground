import React from "react";
import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  Polygon,
  Rect,
  Stop,
} from "react-native-svg";

export type ThingsCategoryKind =
  | "things"
  | "musical_instrument"
  | "clock"
  | "stationery"
  | "electronics"
  | "furniture"
  | "ball"
  | "balloon"
  | "toys_sports";

type ThingsCategoryBackgroundProps = {
  category: ThingsCategoryKind;
  width?: number | string;
  height?: number | string;
};

const PALETTE: Record<
  ThingsCategoryKind,
  { edge: string; pale: string; accent: string }
> = {
  things: { edge: "#A98AE8", pale: "#F5EFFF", accent: "#D8C7F7" },
  musical_instrument: { edge: "#F0B94F", pale: "#FFF5D9", accent: "#F6D98A" },
  clock: { edge: "#F17F9B", pale: "#FFF0F4", accent: "#F8C3D0" },
  stationery: { edge: "#48BFB6", pale: "#E9FAF7", accent: "#A8E6DB" },
  electronics: { edge: "#4DAFE6", pale: "#EAF7FF", accent: "#B4E2F8" },
  furniture: { edge: "#65B58C", pale: "#EDF9F0", accent: "#BCE3C8" },
  ball: { edge: "#25BDB6", pale: "#E8FBF8", accent: "#9CE4D9" },
  balloon: { edge: "#F17CA4", pale: "#FFF0F6", accent: "#F8BED3" },
  toys_sports: { edge: "#F0AC48", pale: "#FFF5E2", accent: "#F8D18C" },
};

function BaseFrame({
  category,
  children,
}: {
  category: ThingsCategoryKind;
  children?: React.ReactNode;
}) {
  const p = PALETTE[category];
  return (
    <>
      <Rect width="320" height="240" rx="18" fill={p.pale} />
      <Rect
        x="8"
        y="8"
        width="304"
        height="224"
        rx="13"
        fill="#FFFFFF"
        opacity=".55"
      />
      {children}
      <Rect
        x="3"
        y="3"
        width="314"
        height="234"
        rx="16"
        fill="none"
        stroke={p.edge}
        strokeWidth="4"
      />
      <Rect
        x="10"
        y="10"
        width="300"
        height="220"
        rx="11"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2"
        opacity=".95"
      />
    </>
  );
}

function ThingsScene({
  width = "100%",
  height = "100%",
}: {
  width?: number | string;
  height?: number | string;
}) {
  return (
    <Svg width={width} height={height} viewBox="0 0 320 240">
      <Defs>
        <LinearGradient id="thingsWall" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFFDF7" />
          <Stop offset="1" stopColor="#F7E9D5" />
        </LinearGradient>
        <LinearGradient id="thingsFloor" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#F2D5A8" />
          <Stop offset="1" stopColor="#D9A76F" />
        </LinearGradient>
      </Defs>
      <BaseFrame category="things">
        <Rect
          x="7"
          y="7"
          width="306"
          height="157"
          rx="11"
          fill="url(#thingsWall)"
        />
        <Rect
          x="7"
          y="164"
          width="306"
          height="69"
          rx="8"
          fill="url(#thingsFloor)"
        />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <Path
            key={i}
            d={`M${18 + i * 43} 166 L${5 + i * 43} 232`}
            stroke="#C9915D"
            strokeWidth="1.6"
            opacity=".65"
          />
        ))}
        <Path d="M15 54 L305 54" stroke="#D9C5B0" strokeWidth="3" />
        <Path
          d="M22 54 L22 136 M298 54 L298 136"
          stroke="#D9C5B0"
          strokeWidth="3"
        />
        <Path
          d="M30 27 L56 48 L82 27 L108 48 L134 27 L160 48 L186 27 L212 48 L238 27 L264 48 L290 27"
          fill="none"
          stroke="#C7B2ED"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {[0, 1, 2, 3, 4].map((i) => (
          <G key={i} transform={`translate(${48 + i * 56} 34)`}>
            <Path
              d="M0 0 L-8 14 L8 14Z"
              fill={["#F6B5C6", "#F5D27D", "#9BD8CF", "#A9CFF1", "#C8B2F1"][i]}
            />
          </G>
        ))}
        <Rect
          x="23"
          y="72"
          width="84"
          height="79"
          rx="5"
          fill="#E5D5F6"
          stroke="#B89AE5"
          strokeWidth="3"
        />
        <Rect x="31" y="80" width="68" height="63" rx="3" fill="#FAF5FF" />
        <Path d="M35 101 H95 M35 119 H95" stroke="#D9C9EE" strokeWidth="3" />
        <Rect
          x="122"
          y="81"
          width="78"
          height="70"
          rx="5"
          fill="#D6EDE0"
          stroke="#8AC9A5"
          strokeWidth="3"
        />
        <Rect x="130" y="89" width="62" height="54" rx="3" fill="#F6FFF9" />
        <Path
          d="M135 108 H187 M135 124 H187"
          stroke="#B9DFCA"
          strokeWidth="3"
        />
        <Rect
          x="215"
          y="73"
          width="80"
          height="78"
          rx="5"
          fill="#F8D9B7"
          stroke="#E2B17D"
          strokeWidth="3"
        />
        <Rect x="223" y="81" width="64" height="62" rx="3" fill="#FFF9EE" />
        <Path
          d="M228 101 H282 M228 119 H282"
          stroke="#EED0A9"
          strokeWidth="3"
        />
        <Ellipse
          cx="160"
          cy="199"
          rx="69"
          ry="21"
          fill="#B9E6F1"
          opacity=".95"
        />
        <Ellipse cx="160" cy="198" rx="51" ry="13" fill="#DDF7FC" />
        <Ellipse cx="160" cy="198" rx="32" ry="7" fill="#B3DCEB" />
        <G transform="translate(35 164)">
          <Rect
            x="0"
            y="0"
            width="38"
            height="29"
            rx="4"
            fill="#A7D8CB"
            stroke="#70BCA9"
            strokeWidth="2"
          />
          <Rect x="7" y="-11" width="24" height="11" rx="3" fill="#F7D27C" />
        </G>
        <G transform="translate(250 164)">
          <Rect
            x="0"
            y="0"
            width="36"
            height="28"
            rx="4"
            fill="#F3B6C7"
            stroke="#D98DA6"
            strokeWidth="2"
          />
          <Rect x="6" y="-10" width="24" height="10" rx="3" fill="#B7B1EF" />
        </G>
        <Circle cx="38" cy="30" r="4" fill="#F1C96D" />
        <Circle cx="282" cy="30" r="4" fill="#F1C96D" />
      </BaseFrame>
    </Svg>
  );
}

function MusicScene({
  width = "100%",
  height = "100%",
}: {
  width?: number | string;
  height?: number | string;
}) {
  return (
    <Svg width={width} height={height} viewBox="0 0 320 240">
      <BaseFrame category="musical_instrument">
        <Rect x="7" y="7" width="306" height="226" rx="12" fill="#FFF6E5" />
        <Path
          d="M8 35 Q80 62 160 35 T312 35"
          fill="none"
          stroke="#E6C8A2"
          strokeWidth="3"
        />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <G
            key={i}
            transform={`translate(${28 + i * 52} ${35 + (i % 2) * 8})`}
          >
            <Path
              d="M0 0 L-9 16 L9 16Z"
              fill={
                [
                  "#F4A6B8",
                  "#F3CE6D",
                  "#9AD8CC",
                  "#B8A4EA",
                  "#9BC9EF",
                  "#F4A6B8",
                ][i]
              }
            />
          </G>
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <Path
            key={i}
            d={`M${20 + i * 65} 83 H${300 - i * 4}`}
            stroke="#E9D7BE"
            strokeWidth="2"
            opacity=".9"
          />
        ))}
        <Rect x="18" y="190" width="284" height="35" rx="5" fill="#EAC69B" />
        <Path d="M18 202 H302 M18 214 H302" stroke="#D6AA7B" strokeWidth="2" />
        <Circle cx="160" cy="130" r="47" fill="#F8E6C5" opacity=".55" />
        <Circle cx="160" cy="130" r="33" fill="#FFF9EF" opacity=".9" />
        <Path
          d="M94 95 Q110 83 126 95 M194 95 Q210 83 226 95"
          fill="none"
          stroke="#E4C29A"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <Path
          d="M118 145 Q128 157 138 145 M182 145 Q192 157 202 145"
          fill="none"
          stroke="#E4C29A"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <Path
          d="M144 83 V68 M176 83 V68"
          stroke="#E4C29A"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <Circle cx="144" cy="65" r="5" fill="#F1C86C" />
        <Circle cx="176" cy="65" r="5" fill="#E99AB0" />
      </BaseFrame>
    </Svg>
  );
}

function ClockScene({
  width = "100%",
  height = "100%",
}: {
  width?: number | string;
  height?: number | string;
}) {
  return (
    <Svg width={width} height={height} viewBox="0 0 320 240">
      <BaseFrame category="clock">
        <Rect x="7" y="7" width="306" height="226" rx="12" fill="#FFF5F6" />
        <Rect x="18" y="20" width="284" height="182" rx="8" fill="#FCE5E9" />
        <Path d="M20 54 H300 M20 176 H300" stroke="#F5C4D0" strokeWidth="3" />
        <Rect x="30" y="37" width="260" height="9" rx="4" fill="#F4B4C5" />
        <Rect x="30" y="181" width="260" height="9" rx="4" fill="#F4B4C5" />
        {[0, 1, 2, 3, 4].map((i) => (
          <G key={i} transform={`translate(${52 + i * 54} 116)`}>
            <Circle
              r="17"
              fill={["#F8C6D3", "#F3D88A", "#D4C5F5", "#B7E5E0", "#F8C6D3"][i]}
              opacity=".75"
            />
            <Circle r="7" fill="#FFFFFF" opacity=".8" />
          </G>
        ))}
        <Path
          d="M22 213 Q80 197 160 213 T298 213"
          stroke="#E9A8B9"
          strokeWidth="3"
          fill="none"
        />
        <Circle cx="160" cy="78" r="18" fill="#FFFFFF" opacity=".85" />
        <Path
          d="M160 66 V78 L170 84"
          stroke="#E68EA6"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </BaseFrame>
    </Svg>
  );
}

function StationeryScene({
  width = "100%",
  height = "100%",
}: {
  width?: number | string;
  height?: number | string;
}) {
  return (
    <Svg width={width} height={height} viewBox="0 0 320 240">
      <BaseFrame category="stationery">
        <Rect x="7" y="7" width="306" height="226" rx="12" fill="#F0FCF8" />
        <Rect
          x="20"
          y="20"
          width="280"
          height="125"
          rx="8"
          fill="#D5F1F8"
          stroke="#B5E2E8"
          strokeWidth="3"
        />
        <Path
          d="M22 111 Q65 81 105 109 T190 104 T298 98 V145 H22Z"
          fill="#C4E8D5"
        />
        <Rect
          x="28"
          y="34"
          width="264"
          height="7"
          rx="3"
          fill="#FFFFFF"
          opacity=".8"
        />
        <Rect
          x="28"
          y="65"
          width="264"
          height="5"
          rx="2"
          fill="#FFFFFF"
          opacity=".8"
        />
        <Rect
          x="28"
          y="94"
          width="264"
          height="5"
          rx="2"
          fill="#FFFFFF"
          opacity=".8"
        />
        <Rect x="7" y="150" width="306" height="83" rx="8" fill="#E9C18D" />
        <Path d="M7 165 H313 M7 216 H313" stroke="#D7A56D" strokeWidth="3" />
        <G transform="translate(45 165) rotate(-8)">
          <Rect
            x="0"
            y="0"
            width="76"
            height="46"
            rx="4"
            fill="#F7AFC1"
            stroke="#D987A1"
            strokeWidth="2"
          />
          <Path
            d="M12 12 H63 M12 22 H63 M12 32 H52"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
        </G>
        <G transform="translate(138 164) rotate(7)">
          <Rect
            x="0"
            y="0"
            width="112"
            height="49"
            rx="4"
            fill="#FFF9E9"
            stroke="#6DBFB2"
            strokeWidth="2"
          />
          <Path
            d="M10 12 H102 M10 22 H102 M10 32 H102 M10 42 H70"
            stroke="#9BD8CE"
            strokeWidth="2"
          />
        </G>
        <Path
          d="M260 183 L282 160 L291 168 L269 191Z"
          fill="#F2C45D"
          stroke="#D8A23D"
          strokeWidth="2"
        />
        <Path d="M260 183 L255 197 L269 191Z" fill="#E7B6A0" />
        <Circle cx="277" cy="166" r="3" fill="#F8E8C6" />
      </BaseFrame>
    </Svg>
  );
}

function ElectronicsScene({
  width = "100%",
  height = "100%",
}: {
  width?: number | string;
  height?: number | string;
}) {
  return (
    <Svg width={width} height={height} viewBox="0 0 320 240">
      <BaseFrame category="electronics">
        <Rect x="7" y="7" width="306" height="226" rx="12" fill="#EFF8FF" />
        <Rect
          x="22"
          y="19"
          width="276"
          height="126"
          rx="8"
          fill="#D3EAF8"
          stroke="#A8D2EB"
          strokeWidth="3"
        />
        <Path
          d="M28 48 H292 M28 76 H292 M28 104 H292"
          stroke="#FFFFFF"
          strokeWidth="3"
          opacity=".8"
        />
        <Rect x="7" y="151" width="306" height="82" rx="8" fill="#D7B18B" />
        <Path d="M7 168 H313 M7 216 H313" stroke="#C7966D" strokeWidth="3" />
        <Rect
          x="68"
          y="63"
          width="184"
          height="91"
          rx="7"
          fill="#8BAFC5"
          stroke="#6C91A8"
          strokeWidth="3"
        />
        <Rect x="76" y="71" width="168" height="73" rx="3" fill="#BDE9F4" />
        <Path d="M78 127 Q111 99 145 124 T243 115 V143 H78Z" fill="#89C8D8" />
        <Path d="M130 155 L120 168 H200 L190 155" fill="#91AEC0" />
        <Rect x="107" y="168" width="106" height="8" rx="4" fill="#6C91A8" />
        <Circle
          cx="258"
          cy="185"
          r="16"
          fill="#A4D8ED"
          stroke="#6CAFD0"
          strokeWidth="2"
        />
        <Circle cx="258" cy="185" r="5" fill="#FFFFFF" />
        <Rect
          x="30"
          y="181"
          width="42"
          height="27"
          rx="5"
          fill="#F6D38A"
          stroke="#D8B263"
          strokeWidth="2"
        />
      </BaseFrame>
    </Svg>
  );
}

function FurnitureScene({
  width = "100%",
  height = "100%",
}: {
  width?: number | string;
  height?: number | string;
}) {
  return (
    <Svg width={width} height={height} viewBox="0 0 320 240">
      <Defs>
        <LinearGradient id="furnitureWall" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#F7FFF6" />
          <Stop offset="1" stopColor="#D9F0DC" />
        </LinearGradient>
      </Defs>
      <BaseFrame category="furniture">
        <Rect
          x="7"
          y="7"
          width="306"
          height="226"
          rx="12"
          fill="url(#furnitureWall)"
        />
        <Rect
          x="20"
          y="20"
          width="280"
          height="119"
          rx="8"
          fill="#CDECF2"
          stroke="#A4D8D8"
          strokeWidth="3"
        />
        <Path
          d="M24 112 Q67 80 110 109 T205 103 T296 95 V139 H24Z"
          fill="#A8D4A1"
        />
        <Rect x="7" y="146" width="306" height="87" rx="8" fill="#D7B186" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Path
            key={i}
            d={`M${12 + i * 52} 148 L${30 + i * 52} 233`}
            stroke="#BD8F65"
            strokeWidth="2"
            opacity=".7"
          />
        ))}
        <Rect
          x="32"
          y="48"
          width="61"
          height="83"
          rx="4"
          fill="#E4C9A7"
          stroke="#A7C8A8"
          strokeWidth="3"
        />
        <Rect x="40" y="56" width="45" height="67" rx="2" fill="#F9F1E4" />
        <Path d="M63 57 V122" stroke="#D6B48C" strokeWidth="3" />
        <Rect
          x="110"
          y="60"
          width="92"
          height="71"
          rx="4"
          fill="#C5E2C8"
          stroke="#8FC39A"
          strokeWidth="3"
        />
        <Path d="M118 84 H194 M118 107 H194" stroke="#F5FFF3" strokeWidth="4" />
        <Rect
          x="220"
          y="48"
          width="68"
          height="83"
          rx="4"
          fill="#E9D8B9"
          stroke="#A7C8A8"
          strokeWidth="3"
        />
        <Path
          d="M228 68 H280 M228 88 H280 M228 108 H280"
          stroke="#C9B28D"
          strokeWidth="3"
        />
        <Ellipse
          cx="160"
          cy="204"
          rx="68"
          ry="17"
          fill="#F4D5E0"
          opacity=".8"
        />
      </BaseFrame>
    </Svg>
  );
}

function BallScene({
  width = "100%",
  height = "100%",
}: {
  width?: number | string;
  height?: number | string;
}) {
  return (
    <Svg width={width} height={height} viewBox="0 0 320 240">
      <BaseFrame category="ball">
        <Rect x="7" y="7" width="306" height="226" rx="12" fill="#E7F8F5" />
        <Rect x="18" y="19" width="284" height="183" rx="8" fill="#C8ECF2" />
        <Path
          d="M20 50 Q80 26 138 48 T300 42"
          stroke="#FFFFFF"
          strokeWidth="4"
          fill="none"
          opacity=".9"
        />
        <Path
          d="M20 84 Q80 60 138 82 T300 76"
          stroke="#FFFFFF"
          strokeWidth="3"
          fill="none"
          opacity=".7"
        />
        <Rect x="18" y="124" width="284" height="78" rx="4" fill="#8ED0A4" />
        <Path
          d="M18 162 H302 M160 124 V202"
          stroke="#FFFFFF"
          strokeWidth="3"
          opacity=".9"
        />
        <Circle
          cx="160"
          cy="162"
          r="28"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3"
        />
        <Rect x="7" y="204" width="306" height="29" rx="7" fill="#B9E4D2" />
        <Path
          d="M20 218 H300"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeDasharray="8 7"
        />
        <Circle cx="48" cy="40" r="8" fill="#FFFFFF" opacity=".8" />
        <Circle cx="272" cy="55" r="6" fill="#FFFFFF" opacity=".8" />
      </BaseFrame>
    </Svg>
  );
}

function BalloonScene({
  width = "100%",
  height = "100%",
}: {
  width?: number | string;
  height?: number | string;
}) {
  return (
    <Svg width={width} height={height} viewBox="0 0 320 240">
      <BaseFrame category="balloon">
        <Rect x="7" y="7" width="306" height="226" rx="12" fill="#FFF0F6" />
        <Path d="M20 25 H300 V205 H20Z" fill="#FFF8FC" />
        <Path
          d="M20 25 L300 205 M300 25 L20 205"
          stroke="#F9D7E4"
          strokeWidth="2"
          opacity=".7"
        />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <G
            key={i}
            transform={`translate(${38 + i * 49} ${70 + (i % 3) * 18})`}
          >
            <Circle
              r={11 + (i % 2) * 4}
              fill={
                [
                  "#F6A7C2",
                  "#A8D8F3",
                  "#F5D27A",
                  "#C6B5F3",
                  "#9DDCCF",
                  "#F6A7C2",
                ][i]
              }
              opacity=".65"
            />
            <Path
              d={`M0 ${12 + (i % 2) * 4} Q${(i % 2) * 6} 42 8 54`}
              stroke="#C5A4B8"
              strokeWidth="1.5"
              fill="none"
            />
          </G>
        ))}
        <Path d="M20 205 Q80 190 160 205 T300 205 V233 H20Z" fill="#F8D8E5" />
        <Path
          d="M20 219 Q80 204 160 219 T300 219"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3"
        />
        <Circle cx="160" cy="40" r="4" fill="#E99CB8" />
        <Path d="M153 40 H167" stroke="#E99CB8" strokeWidth="2" />
      </BaseFrame>
    </Svg>
  );
}

function ToysScene({
  width = "100%",
  height = "100%",
}: {
  width?: number | string;
  height?: number | string;
}) {
  return (
    <Svg width={width} height={height} viewBox="0 0 320 240">
      <BaseFrame category="toys_sports">
        <Rect x="7" y="7" width="306" height="226" rx="12" fill="#FFF5E5" />
        <Rect x="18" y="20" width="284" height="128" rx="8" fill="#D9F0F6" />
        <Path
          d="M22 110 Q72 77 125 108 T226 103 T298 95 V148 H22Z"
          fill="#B8DDA5"
        />
        <Path d="M18 149 H302 V233 H18Z" fill="#EAC28F" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Path
            key={i}
            d={`M${20 + i * 54} 150 L${34 + i * 54} 233`}
            stroke="#D4A774"
            strokeWidth="2"
          />
        ))}
        <Rect
          x="35"
          y="85"
          width="67"
          height="63"
          rx="5"
          fill="#F3C86F"
          stroke="#D8A54C"
          strokeWidth="3"
        />
        <Rect x="43" y="93" width="51" height="47" rx="3" fill="#FFF0C6" />
        <Path
          d="M49 105 H88 M49 116 H88 M49 127 H78"
          stroke="#E5B75B"
          strokeWidth="3"
        />
        <Rect
          x="124"
          y="91"
          width="70"
          height="57"
          rx="5"
          fill="#9DD8CF"
          stroke="#64BBAE"
          strokeWidth="3"
        />
        <Path
          d="M132 103 H186 M132 116 H186 M132 129 H176"
          stroke="#E8FFF9"
          strokeWidth="3"
        />
        <Path
          d="M224 119 L246 81 L268 119Z"
          fill="#F3A9BE"
          stroke="#D9819C"
          strokeWidth="3"
        />
        <Path d="M246 81 V119 M232 104 H260" stroke="#FFF4F5" strokeWidth="3" />
        <Circle cx="276" cy="45" r="12" fill="#FFE18B" />
        <Path d="M18 167 H302" stroke="#D5A26B" strokeWidth="3" />
      </BaseFrame>
    </Svg>
  );
}

export function ThingsCategoryBackground({
  category = "things",
  width = "100%",
  height = "100%",
}: Partial<ThingsCategoryBackgroundProps>) {
  const props = { width, height };
  switch (category) {
    case "musical_instrument":
      return <MusicScene {...props} />;
    case "clock":
      return <ClockScene {...props} />;
    case "stationery":
      return <StationeryScene {...props} />;
    case "electronics":
      return <ElectronicsScene {...props} />;
    case "furniture":
      return <FurnitureScene {...props} />;
    case "ball":
      return <BallScene {...props} />;
    case "balloon":
      return <BalloonScene {...props} />;
    case "toys_sports":
      return <ToysScene {...props} />;
    case "things":
    default:
      return <ThingsScene {...props} />;
  }
}

export {
  ThingsScene,
  MusicScene,
  ClockScene,
  StationeryScene,
  ElectronicsScene,
  FurnitureScene,
  BallScene,
  BalloonScene,
  ToysScene,
};

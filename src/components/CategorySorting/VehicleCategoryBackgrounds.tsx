import React from "react";
import Svg, {
  Circle,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from "react-native-svg";

/**
 * Vehicle-category backgrounds for a preschool sorting game.
 * These scenes show the environment only: no cars, trains, aircraft, boats,
 * trucks, or other draggable vehicle stickers are drawn.
 *
 * Example:
 * <VehicleCategoryBackground category="road_vehicle" />
 * <VehicleCategoryBackground category="rail_vehicle" />
 */
export type VehicleBackgroundCategory =
  | "vehicle"
  | "road_vehicle"
  | "rail_vehicle"
  | "air_vehicle"
  | "water_vehicle"
  | "construction_vehicle";

type Props = {
  category: VehicleBackgroundCategory;
  width?: number | string;
  height?: number | string;
};

const COLORS = {
  vehicle: { border: "#70B9D8", pale: "#EAF7FC" },
  road_vehicle: { border: "#E6B66B", pale: "#FFF5E3" },
  rail_vehicle: { border: "#8AABD7", pale: "#EEF4FF" },
  air_vehicle: { border: "#67B9E8", pale: "#EAF8FF" },
  water_vehicle: { border: "#5DAED0", pale: "#E8F8FC" },
  construction_vehicle: { border: "#D9A653", pale: "#FFF5D9" },
};

function Frame({
  border,
  pale,
  children,
}: {
  border: string;
  pale: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <Rect width={320} height={240} rx={20} fill={pale} />
      {children}
      <Rect
        x={3}
        y={3}
        width={314}
        height={234}
        rx={17}
        fill="none"
        stroke={border}
        strokeWidth={4}
      />
      <Rect
        x={9}
        y={9}
        width={302}
        height={222}
        rx={12}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={2}
        opacity={0.9}
      />
    </>
  );
}

function Clouds({ opacity = 0.95 }: { opacity?: number }) {
  return (
    <G fill="#FFFFFF" opacity={opacity}>
      <Circle cx={52} cy={54} r={13} />
      <Circle cx={69} cy={47} r={19} />
      <Circle cx={88} cy={56} r={13} />
      <Rect x={46} y={54} width={49} height={15} rx={7} />
      <Circle cx={208} cy={77} r={10} />
      <Circle cx={223} cy={70} r={15} />
      <Circle cx={240} cy={78} r={11} />
      <Rect x={203} y={77} width={42} height={12} rx={6} />
    </G>
  );
}

function VehicleScene() {
  return (
    <>
      <Rect x={7} y={7} width={306} height={226} rx={12} fill="#BDEBFA" />
      <Path
        d="M8 112 Q48 78 88 108 T169 103 T246 102 T312 91 V233 H8Z"
        fill="#A8D8A1"
      />
      <Path
        d="M8 142 Q65 116 122 145 T233 137 T312 129 V233 H8Z"
        fill="#78C58C"
      />
      <Path d="M8 174 Q70 154 143 174 T312 164 V233 H8Z" fill="#5BB77C" />
      <Circle cx={264} cy={38} r={19} fill="#FFE28A" />
      <Path
        d="M20 189 Q78 169 135 189 T300 184"
        stroke="#F8E3AC"
        strokeWidth={29}
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M20 189 Q78 169 135 189 T300 184"
        stroke="#FFF4D0"
        strokeWidth={3}
        fill="none"
        strokeDasharray="12 10"
      />
      <Path
        d="M20 215 Q79 201 134 215 T300 210"
        stroke="#E9D7A3"
        strokeWidth={3}
        fill="none"
        opacity={0.9}
      />
      <Clouds />
      <G fill="#4E9C67">
        <Circle cx={26} cy={157} r={12} />
        <Circle cx={39} cy={150} r={16} />
        <Circle cx={51} cy={160} r={12} />
        <Circle cx={281} cy={151} r={13} />
        <Circle cx={294} cy={145} r={17} />
        <Circle cx={305} cy={158} r={12} />
      </G>
      <G fill="#DFF4B9">
        <Circle cx={36} cy={155} r={4} />
        <Circle cx={289} cy={150} r={4} />
      </G>
    </>
  );
}

function RoadScene() {
  return (
    <>
      <Rect x={7} y={7} width={306} height={226} rx={12} fill="#BFE9FA" />
      <Circle cx={265} cy={36} r={18} fill="#FFE28B" />
      <Clouds />
      <Path
        d="M8 122 Q65 96 121 121 T230 117 T312 108 V233 H8Z"
        fill="#A9D99A"
      />
      <Path d="M8 153 Q80 131 148 153 T312 143 V233 H8Z" fill="#79C47B" />
      <Path d="M-18 240 L85 134 Q106 118 131 130 L238 240Z" fill="#8B929A" />
      <Path
        d="M-18 240 L85 134 Q106 118 131 130 L238 240"
        stroke="#F8F4E9"
        strokeWidth={4}
        fill="none"
      />
      <Path
        d="M33 240 L100 151"
        stroke="#F8F4E9"
        strokeWidth={3}
        strokeDasharray="12 10"
        fill="none"
      />
      <Path
        d="M154 240 L132 151"
        stroke="#F8F4E9"
        strokeWidth={3}
        strokeDasharray="12 10"
        fill="none"
      />
      <Path
        d="M245 169 V129 M245 139 L265 131"
        stroke="#9A714C"
        strokeWidth={4}
        strokeLinecap="round"
      />
      <Rect
        x={258}
        y={119}
        width={35}
        height={27}
        rx={4}
        fill="#FFFFFF"
        stroke="#6FAD7B"
        strokeWidth={3}
      />
      <Path
        d="M265 128 H286 M265 135 H280"
        stroke="#7AB78A"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <G fill="#4F9C62">
        <Circle cx={35} cy={140} r={15} />
        <Circle cx={48} cy={133} r={18} />
        <Circle cx={62} cy={142} r={13} />
      </G>
    </>
  );
}

function RailScene() {
  return (
    <>
      <Rect x={7} y={7} width={306} height={226} rx={12} fill="#C7EBFC" />
      <Circle cx={263} cy={37} r={18} fill="#FFE18A" />
      <Clouds />
      <Path
        d="M8 119 Q56 92 107 117 T212 113 T312 107 V233 H8Z"
        fill="#A6D39A"
      />
      <Path d="M8 148 Q77 126 147 148 T312 139 V233 H8Z" fill="#75BD7B" />
      <Path d="M8 190 L312 157 V233 H8Z" fill="#D7C99D" />
      <Path
        d="M8 183 L312 150 M8 211 L312 178"
        stroke="#8C8B83"
        strokeWidth={8}
      />
      <Path
        d="M8 183 L312 150 M8 211 L312 178"
        stroke="#E9E6D8"
        strokeWidth={3}
      />
      {[25, 58, 91, 124, 157, 190, 223, 256, 289].map((x, i) => (
        <Path
          key={i}
          d={`M${x} ${181 - x * 0.105} l4 28`}
          stroke="#8D684C"
          strokeWidth={5}
          strokeLinecap="round"
        />
      ))}
      <Path d="M18 124 H302" stroke="#F4F7F7" strokeWidth={3} opacity={0.7} />
      <G fill="#4C9865">
        <Circle cx={29} cy={146} r={13} />
        <Circle cx={42} cy={138} r={17} />
        <Circle cx={57} cy={147} r={12} />
        <Circle cx={277} cy={137} r={15} />
        <Circle cx={291} cy={131} r={17} />
      </G>
      <Path d="M20 111 H72 M20 121 H72" stroke="#B4D4E4" strokeWidth={3} />
    </>
  );
}

function AirScene() {
  return (
    <>
      <Rect x={7} y={7} width={306} height={226} rx={12} fill="url(#airSky)" />
      <Circle cx={263} cy={38} r={20} fill="#FFE58B" />
      <Clouds opacity={0.98} />
      <Path
        d="M8 177 Q64 155 120 176 T226 170 T312 163 V233 H8Z"
        fill="#A9DDA1"
      />
      <Path d="M8 200 Q69 183 140 202 T312 190 V233 H8Z" fill="#7CCB8E" />
      <Path
        d="M25 118 Q48 106 70 118 M240 113 Q261 101 284 113"
        stroke="#78C2E3"
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
      />
      <G fill="#FFFFFF" opacity={0.65}>
        <Ellipse cx={45} cy={92} rx={20} ry={3} />
        <Ellipse cx={161} cy={121} rx={26} ry={3} />
        <Ellipse cx={252} cy={92} rx={18} ry={3} />
      </G>
      <Path
        d="M18 214 Q84 201 142 214 T300 208"
        stroke="#D7ECA7"
        strokeWidth={4}
        fill="none"
      />
    </>
  );
}

function WaterScene() {
  return (
    <>
      <Rect x={7} y={7} width={306} height={226} rx={12} fill="#BDEBFA" />
      <Circle cx={264} cy={36} r={18} fill="#FFE28B" />
      <Clouds />
      <Path
        d="M8 118 Q55 100 102 118 T199 117 T312 111 V144 H8Z"
        fill="#A8D99C"
      />
      <Path d="M8 135 Q75 123 142 136 T312 130 V233 H8Z" fill="#55B9DE" />
      <Path
        d="M8 157 Q53 147 98 157 T188 157 T278 157 T312 155"
        stroke="#B9F1FA"
        strokeWidth={4}
        fill="none"
      />
      <Path
        d="M8 181 Q53 171 98 181 T188 181 T278 181 T312 179"
        stroke="#7AD2E8"
        strokeWidth={3}
        fill="none"
      />
      <Path
        d="M8 207 Q53 197 98 207 T188 207 T278 207 T312 205"
        stroke="#8BD9EB"
        strokeWidth={3}
        fill="none"
      />
      <Path d="M8 132 Q31 119 54 132 L54 145 H8Z" fill="#E9D69C" />
      <Path d="M267 123 L312 112 V145 H267Z" fill="#80C77E" />
      <G fill="#4DA86E">
        <Circle cx={282} cy={119} r={12} />
        <Circle cx={295} cy={113} r={14} />
        <Circle cx={306} cy={122} r={11} />
      </G>
      <Path
        d="M25 146 Q37 139 49 146 M217 144 Q229 137 241 144"
        stroke="#FFFFFF"
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
      />
    </>
  );
}

function ConstructionScene() {
  return (
    <>
      <Rect x={7} y={7} width={306} height={226} rx={12} fill="#C8EAF7" />
      <Circle cx={264} cy={36} r={18} fill="#FFE18A" />
      <Path
        d="M8 113 Q60 88 111 113 T220 108 T312 104 V233 H8Z"
        fill="#A8D59A"
      />
      <Path d="M8 152 H312 V233 H8Z" fill="#D8C18E" />
      <Path d="M8 178 L312 155 V233 H8Z" fill="#C6AD79" />
      <Path
        d="M20 205 L93 169 L142 183 L212 151 L294 174"
        stroke="#E8D4A6"
        strokeWidth={13}
        fill="none"
      />
      <Path
        d="M20 205 L93 169 L142 183 L212 151 L294 174"
        stroke="#F5E7C4"
        strokeWidth={3}
        fill="none"
      />
      <G>
        <Rect
          x={30}
          y={79}
          width={76}
          height={58}
          rx={5}
          fill="#F3D27B"
          stroke="#D3A64D"
          strokeWidth={3}
        />
        <Path
          d="M42 93 H94 M42 106 H94 M42 119 H83"
          stroke="#D3A64D"
          strokeWidth={4}
          strokeLinecap="round"
        />
      </G>
      <G>
        <Path
          d="M212 48 V143 M212 51 L275 51 M263 51 V70"
          stroke="#D69D42"
          strokeWidth={7}
          strokeLinecap="round"
          fill="none"
        />
        <Path d="M222 61 L273 61" stroke="#FFE7A3" strokeWidth={3} />
        <Path d="M263 70 L257 83 H269Z" fill="#E0AD54" />
        <Path
          d="M198 143 H226"
          stroke="#9E7949"
          strokeWidth={7}
          strokeLinecap="round"
        />
      </G>
      <Path
        d="M8 150 H312"
        stroke="#F8E9C8"
        strokeWidth={3}
        strokeDasharray="10 8"
      />
      <G fill="#6FB879">
        <Circle cx={136} cy={123} r={11} />
        <Circle cx={148} cy={117} r={13} />
        <Circle cx={160} cy={124} r={10} />
      </G>
    </>
  );
}

export default function VehicleCategoryBackground({
  category,
  width = "100%",
  height = "100%",
}: Props) {
  const palette = COLORS[category];
  return (
    <Svg width={width} height={height} viewBox="0 0 320 240">
      <Defs>
        <LinearGradient id="airSky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#79D0F5" />
          <Stop offset="1" stopColor="#E3F8FF" />
        </LinearGradient>
      </Defs>
      <Frame border={palette.border} pale={palette.pale}>
        {category === "vehicle" && <VehicleScene />}
        {category === "road_vehicle" && <RoadScene />}
        {category === "rail_vehicle" && <RailScene />}
        {category === "air_vehicle" && <AirScene />}
        {category === "water_vehicle" && <WaterScene />}
        {category === "construction_vehicle" && <ConstructionScene />}
      </Frame>
    </Svg>
  );
}

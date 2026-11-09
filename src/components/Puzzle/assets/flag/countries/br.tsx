import * as React from "react";
import Svg, {
  Circle,
  ClipPath,
  Defs,
  G,
  Path,
  Polygon,
  Rect,
  Use,
} from "react-native-svg";
import type { SvgProps } from "react-native-svg";

// 기존 퍼즐판과 조각이 공유하는 좌표계입니다.
export const FLAG_VIEW_BOX = "0 0 240 180";

// 원본 좌표(-2100 -1470 4200 2940)를 240×160 표시 영역(x=0, y=10)에 비율을 유지해 배치합니다.
const ARTWORK_TRANSFORM = "translate(120 90) scale(0.054421768707483)";

type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// 이미 Svg가 있는 퍼즐 장면에서는 도형만 따로 넣을 수 있습니다.
export const BRFlagArtwork = React.memo(function BRFlagArtwork() {
  const prefix = "br-" + React.useId().replace(/:/g, "");

  return (
    <>
      {/* 퍼즐 전체 영역: 브라질 국기의 가장자리 초록색 연장 */}
      <Rect x={0} y={0} width={240} height={180} fill="#009B3A" />
      <G transform={ARTWORK_TRANSFORM}>
        {/* 이 기에서 재사용하는 도형, 클립 또는 그라디언트 */}
        <Defs>
          <Path
            id={`${prefix}-i`}
            fillRule="evenodd"
            d="M-31.5 0h33a30 30 0 0030-30v-10a30 30 0 00-30-30h-33zm13-13h19a19 19 0 0019-19v-6a19 19 0 00-19-19h-19z"
          />
          <Path
            id={`${prefix}-n`}
            d="M-15.75-22C-15.75-15-9-11.5 1-11.5s14.74-3.25 14.75-7.75c0-14.25-46.75-5.25-46.5-30.25C-30.5-71-6-70 3-70s26 4 25.75 21.25H13.5c0-7.5-7-10.25-15-10.25-7.75 0-13.25 1.25-13.25 8.5-.25 11.75 46.25 4 46.25 28.75C31.5-3.5 13.5 0 0 0c-11.5 0-31.55-4.5-31.5-22z"
          />
          <Path
            id={`${prefix}-l`}
            d="M-26.25 0h52.5v-12h-40.5v-16h33v-12h-33v-11H25v-12h-51.25z"
          />
          <Path
            id={`${prefix}-k`}
            d="M-31.5 0h12v-48l14 48h11l14-48V0h12v-70H14L0-22l-14-48h-17.5z"
          />
          <Path
            id={`${prefix}-d`}
            fillRule="evenodd"
            d="M0 0a31.5 35 0 000-70A31.5 35 0 000 0m0-13a18.5 22 0 000-44 18.5 22 0 000 44"
          />
          <Path
            id={`${prefix}-f`}
            fillRule="evenodd"
            d="M-31.5 0h13v-26h28a22 22 0 000-44h-40zm13-39h27a9 9 0 000-18h-27z"
          />
          <Path
            id={`${prefix}-j`}
            transform="translate(-31.5)"
            d="M0 0h63v-13H12v-18h40v-12H12v-14h48v-13H0z"
          />
          <Use id={`${prefix}-q`} transform="scale(15)" href={`#${prefix}-a`} />
          <Use
            id={`${prefix}-s`}
            transform="scale(10.5)"
            href={`#${prefix}-a`}
          />
          <Use id={`${prefix}-r`} transform="scale(21)" href={`#${prefix}-a`} />
          <Use
            id={`${prefix}-o`}
            transform="scale(31.5)"
            href={`#${prefix}-a`}
          />
          <Use
            id={`${prefix}-p`}
            transform="scale(26.25)"
            href={`#${prefix}-a`}
          />
          <G id={`${prefix}-a`} fill="#fff">
            <G id={`${prefix}-c`}>
              <Path
                id={`${prefix}-b`}
                transform="rotate(18 0 -1)"
                d="M0-1v1h.5"
              />
              <Use transform="scale(-1 1)" href={`#${prefix}-b`} />
            </G>
            <Use transform="rotate(72)" href={`#${prefix}-c`} />
            <Use transform="rotate(-72)" href={`#${prefix}-c`} />
            <Use transform="rotate(144)" href={`#${prefix}-c`} />
            <Use transform="rotate(216)" href={`#${prefix}-c`} />
          </G>
          <G id={`${prefix}-m`}>
            <ClipPath id={`${prefix}-e`}>
              <Path d="M-31.5 0v-70h63V0zM0-47v12h31.5v-12z" />
            </ClipPath>
            <Use clipPath={`url(#${prefix}-e)`} href={`#${prefix}-d`} />
            <Path d="M5-35h26.5v10H5z" />
            <Path d="M21.5-35h10V0h-10z" />
          </G>
          <G id={`${prefix}-h`}>
            <Use href={`#${prefix}-f`} />
            <Path d="M28 0c0-10 0-32-15-32H-6c22 0 22 22 22 32" />
          </G>
        </Defs>

        {/* 바탕과 색띠 */}
        <Rect x={-2100} y={-1470} width={4200} height={2940} fill="#009B3A" />

        {/* diamond */}
        <Polygon points="-1743,0 0,1113 1743,0 0,-1113" fill="#FEDF00" />

        {/* globe */}
        <Circle cx={0} cy={0} r={735} fill="#002776" />

        {/* g */}
        <ClipPath id={`${prefix}-g`}>
          <Circle r={735} />
        </ClipPath>

        {/* 표어가 들어 있는 띠 */}
        <G>
          <Path
            fill="#fff"
            d="M-2205 1470a1785 1785 0 013570 0h-105a1680 1680 0 10-3360 0z"
            clipPath={`url(#${prefix}-g)`}
          />
          <G transform="translate(-420 1470)" fill="#009b3a">
            <Use y={-1697.5} transform="rotate(-7)" href={`#${prefix}-d`} />
            <Use y={-1697.5} transform="rotate(-4)" href={`#${prefix}-h`} />
            <Use y={-1697.5} transform="rotate(-1)" href={`#${prefix}-i`} />
            <Use y={-1697.5} transform="rotate(2)" href={`#${prefix}-j`} />
            <Use y={-1697.5} transform="rotate(5)" href={`#${prefix}-k`} />
            <Use y={-1697.5} transform="rotate(9.75)" href={`#${prefix}-l`} />
            <Use y={-1697.5} transform="rotate(14.5)" href={`#${prefix}-f`} />
            <Use y={-1697.5} transform="rotate(17.5)" href={`#${prefix}-h`} />
            <Use y={-1697.5} transform="rotate(20.5)" href={`#${prefix}-d`} />
            <Use y={-1697.5} transform="rotate(23.5)" href={`#${prefix}-m`} />
            <Use y={-1697.5} transform="rotate(26.5)" href={`#${prefix}-h`} />
            <Use y={-1697.5} transform="rotate(29.5)" href={`#${prefix}-j`} />
            <Use y={-1697.5} transform="rotate(32.5)" href={`#${prefix}-n`} />
            <Use y={-1697.5} transform="rotate(35.5)" href={`#${prefix}-n`} />
            <Use y={-1697.5} transform="rotate(38.5)" href={`#${prefix}-d`} />
          </G>
        </G>

        {/* 별자리 */}
        <G>
          <Use y={-132} x={-600} href={`#${prefix}-o`} />
          <Use y={177} x={-535} href={`#${prefix}-o`} />
          <Use y={243} x={-625} href={`#${prefix}-p`} />
          <Use y={132} x={-463} href={`#${prefix}-q`} />
          <Use y={250} x={-382} href={`#${prefix}-p`} />
          <Use y={323} x={-404} href={`#${prefix}-r`} />
          <Use y={-228} x={228} href={`#${prefix}-o`} />
          <Use y={258} x={515} href={`#${prefix}-o`} />
          <Use y={265} x={617} href={`#${prefix}-r`} />
          <Use y={323} x={545} href={`#${prefix}-p`} />
          <Use y={477} x={368} href={`#${prefix}-p`} />
          <Use y={551} x={367} href={`#${prefix}-r`} />
          <Use y={419} x={441} href={`#${prefix}-r`} />
          <Use y={382} x={500} href={`#${prefix}-p`} />
          <Use y={405} x={365} href={`#${prefix}-r`} />
          <Use y={30} x={-280} href={`#${prefix}-p`} />
          <Use y={-37} x={200} href={`#${prefix}-r`} />
          <Use y={330} href={`#${prefix}-o`} />
          <Use y={184} x={85} href={`#${prefix}-p`} />
          <Use y={118} href={`#${prefix}-p`} />
          <Use y={184} x={-74} href={`#${prefix}-r`} />
          <Use y={235} x={-37} href={`#${prefix}-q`} />
          <Use y={495} x={220} href={`#${prefix}-p`} />
          <Use y={430} x={283} href={`#${prefix}-r`} />
          <Use y={412} x={162} href={`#${prefix}-r`} />
          <Use y={390} x={-295} href={`#${prefix}-o`} />
          <Use y={575} href={`#${prefix}-s`} />
        </G>
      </G>
    </>
  );
});

export default function BRFlag(props: FlagProps) {
  return (
    <Svg
      width={240}
      height={180}
      {...props}
      viewBox={FLAG_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <BRFlagArtwork />
    </Svg>
  );
}

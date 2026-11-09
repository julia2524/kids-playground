import * as React from "react";
import Svg, { Defs, G, Polygon, Rect, Use } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

// 기존 퍼즐판과 조각이 공유하는 좌표계
export const FLAG_VIEW_BOX = "0 0 240 180";

type FlagProps = Omit<SvgProps, "children" | "viewBox" | "preserveAspectRatio">;

// 가로는 1900 → 240, 세로는 1000 → 180
// 가로 비율은 유지하고 세로만 퍼즐판 높이에 맞춰 확장
const ARTWORK_TRANSFORM = "scale(0.126315789473684 0.18)";

export const USFlagArtwork = React.memo(function USFlagArtwork() {
  const prefix = "us-" + React.useId().replace(/:/g, "");

  return (
    <G transform={ARTWORK_TRANSFORM}>
      <Defs>
        <Polygon
          id={`${prefix}-star-shape`}
          points="
            0,-30.8
            6.91503,-9.51772
            29.29254,-9.51772
            11.18875,3.63545
            18.10379,24.91772
            0,11.76455
            -18.10379,24.91772
            -11.18875,3.63545
            -29.29254,-9.51772
            -6.91503,-9.51772
          "
          fill="#FFFFFF"
        />
      </Defs>

      {/* 전체 빨간색 바탕 */}
      <Rect x={0} y={0} width={1900} height={1000} fill="#B22234" />

      {/* 흰색 줄무늬 6개 */}
      <G>
        {[76.92308, 230.76923, 384.61538, 538.46154, 692.30769, 846.15385].map(
          (y, index) => (
            <Rect
              key={`white-stripe-${index}`}
              x={0}
              y={y}
              width={1900}
              height={76.92308}
              fill="#FFFFFF"
            />
          ),
        )}
      </G>

      {/* 파란색 칸톤: 전체 가로의 정확히 40% */}
      <Rect x={0} y={0} width={760} height={538.46154} fill="#3C3B6E" />

      {/* 별 50개: 6개와 5개가 교차하는 9개 행 */}
      <G>
        {/* 1행: 6개 */}
        {[63.33333, 190, 316.66667, 443.33333, 570, 696.66667].map(
          (x, index) => (
            <Use
              key={`star-1-${index}`}
              href={`#${prefix}-star-shape`}
              x={x}
              y={53.84615}
            />
          ),
        )}

        {/* 2행: 5개 */}
        {[126.66667, 253.33333, 380, 506.66667, 633.33333].map((x, index) => (
          <Use
            key={`star-2-${index}`}
            href={`#${prefix}-star-shape`}
            x={x}
            y={107.69231}
          />
        ))}

        {/* 3행: 6개 */}
        {[63.33333, 190, 316.66667, 443.33333, 570, 696.66667].map(
          (x, index) => (
            <Use
              key={`star-3-${index}`}
              href={`#${prefix}-star-shape`}
              x={x}
              y={161.53846}
            />
          ),
        )}

        {/* 4행: 5개 */}
        {[126.66667, 253.33333, 380, 506.66667, 633.33333].map((x, index) => (
          <Use
            key={`star-4-${index}`}
            href={`#${prefix}-star-shape`}
            x={x}
            y={215.38462}
          />
        ))}

        {/* 5행: 6개 */}
        {[63.33333, 190, 316.66667, 443.33333, 570, 696.66667].map(
          (x, index) => (
            <Use
              key={`star-5-${index}`}
              href={`#${prefix}-star-shape`}
              x={x}
              y={269.23077}
            />
          ),
        )}

        {/* 6행: 5개 */}
        {[126.66667, 253.33333, 380, 506.66667, 633.33333].map((x, index) => (
          <Use
            key={`star-6-${index}`}
            href={`#${prefix}-star-shape`}
            x={x}
            y={323.07692}
          />
        ))}

        {/* 7행: 6개 */}
        {[63.33333, 190, 316.66667, 443.33333, 570, 696.66667].map(
          (x, index) => (
            <Use
              key={`star-7-${index}`}
              href={`#${prefix}-star-shape`}
              x={x}
              y={376.92308}
            />
          ),
        )}

        {/* 8행: 5개 */}
        {[126.66667, 253.33333, 380, 506.66667, 633.33333].map((x, index) => (
          <Use
            key={`star-8-${index}`}
            href={`#${prefix}-star-shape`}
            x={x}
            y={430.76923}
          />
        ))}

        {/* 9행: 6개 */}
        {[63.33333, 190, 316.66667, 443.33333, 570, 696.66667].map(
          (x, index) => (
            <Use
              key={`star-9-${index}`}
              href={`#${prefix}-star-shape`}
              x={x}
              y={484.61538}
            />
          ),
        )}
      </G>
    </G>
  );
});

export default function USFlag(props: FlagProps) {
  return (
    <Svg
      width={240}
      height={180}
      {...props}
      viewBox={FLAG_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
    >
      <USFlagArtwork />
    </Svg>
  );
}

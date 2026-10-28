import React from "react";
import { Rect, G, Polygon } from "react-native-svg";

export default function UsaFlagPuzzleScene() {
  // 별 하나의 표준 좌표계 (중앙 정렬용)
  // 폭 약 10, 높이 약 9 기준
  const starPoints =
    "5,1 6.3,3.8 9.5,3.8 6.9,5.5 7.9,8.5 5,6.8 2.1,8.5 3.1,5.5 0.5,3.8 3.7,3.8";

  // 50개 별을 생성하는 함수 (9행: 6개/5개 교대 배치)
  const renderStars = () => {
    const stars = [];
    const cantonWidth = 96;
    const cantonHeight = (180 / 13) * 7; // 약 96.92

    // 가로/세로 간격 계산
    const colSpacing = cantonWidth / 12; // 약 8배수 간격
    const rowSpacing = cantonHeight / 10; // 약 9.69 간격

    for (let row = 0; row < 9; row++) {
      const isEvenRow = row % 2 === 0;
      const colsInRow = isEvenRow ? 6 : 5;

      for (let col = 0; col < colsInRow; col++) {
        // 짝수 행은 6개 (인덱스 1, 3, 5, 7, 9, 11), 홀수 행은 5개 (인덱스 2, 4, 6, 8, 10)
        const x = isEvenRow
          ? col * (colSpacing * 2) + colSpacing
          : col * (colSpacing * 2) + colSpacing * 2;
        const y = row * rowSpacing + rowSpacing * 0.75;

        stars.push(
          <Polygon
            key={`star-${row}-${col}`}
            points={starPoints}
            transform={`translate(${x - 3.5}, ${y - 3.5}) scale(0.65)`}
          />,
        );
      }
    }
    return stars;
  };

  return (
    <>
      {/* 바탕 및 스트라이프 영역을 살짝 여유 있게(244x184) 잡아 조각 모서리 깎임 방지 */}
      <Rect x="-2" y="-2" width="244" height="184" fill="#B22234" />
      {[1, 3, 5, 7, 9, 11].map((i) => (
        <Rect
          key={i}
          x="-2"
          y={(180 / 13) * i - 1}
          width="244"
          height={180 / 13}
          fill="#FFFFFF"
        />
      ))}

      {/* 캔톤 (파란 영역) */}
      <Rect
        x="-2"
        y="-2"
        width="98"
        height={(180 / 13) * 7 + 2}
        fill="#3C3B6E"
      />

      {/* 50개의 별 장식 그룹 */}
      <G fill="#FFFFFF">{renderStars()}</G>
    </>
  );
}

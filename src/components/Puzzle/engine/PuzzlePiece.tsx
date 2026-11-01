import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Animated, Easing, PanResponder } from "react-native";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";
import styled from "styled-components/native";

import type { PuzzleArtworkComponent, PuzzlePieceData } from "./puzzleTypes";
import { triggerHaptic } from "../../../utils/haptic";
import { playSound } from "../../../utils/sound";

interface Props {
  piece: PuzzlePieceData;
  Artwork: PuzzleArtworkComponent;
  viewBoxWidth: number;
  viewBoxHeight: number;
  // x, y, width, height 는 돌기를 제외한 "기본 칸" 기준 좌표/크기
  x: number;
  y: number;
  width: number;
  height: number;
  targetX: number;
  targetY: number;
  targetWidth: number;
  targetHeight: number;
  placed: boolean;
  onMove: (pieceId: string, x: number, y: number) => void;
  // "correct" = 정답, "wrong" = 오답, "free" = 오답 아님(자유 배치)
  onDrop: (
    pieceId: string,
    x: number,
    y: number,
  ) => "correct" | "wrong" | "free";
  boundsWidth?: number;
  boundsHeight?: number;
}

const PARTICLE_COUNT = 10;
const PARTICLE_COLORS = ["#FFC93C", "#7C5CFF", "#FF7AA8"];

// 경계 안쪽 여유
const BOUNDS_INSET_LEFT = 8;
const BOUNDS_INSET_TOP = 8;
const BOUNDS_INSET_RIGHT = 8;
const BOUNDS_INSET_BOTTOM = 8;

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

// 경계 밖으로 나가면 손가락보다 느리게 따라오는 저항 효과
const rubber = (v: number, min: number, max: number) => {
  if (v < min) return min + (v - min) * 0.25;
  if (v > max) return max + (v - max) * 0.25;
  return v;
};

// ============================================================
// 조각 그림 (SVG) - 메모이즈해서 드래그 시작/끝 리렌더 때 다시 그리지 않음
// ============================================================
interface ArtworkProps {
  piece: PuzzlePieceData;
  Artwork: PuzzleArtworkComponent;
  viewBoxWidth: number;
  viewBoxHeight: number;
  viewBox: string;
  clipId: string;
  placed: boolean;
  pxToSrc: number;
}

const PieceArtwork = React.memo(function PieceArtwork({
  piece,
  Artwork,
  viewBoxWidth,
  viewBoxHeight,
  viewBox,
  clipId,
  placed,
  pxToSrc,
}: ArtworkProps) {
  return (
    <ArtworkClip>
      <Svg
        width="100%"
        height="100%"
        viewBox={viewBox}
        preserveAspectRatio="none"
      >
        <Defs>
          <ClipPath id={clipId}>
            <Path d={piece.path} />
          </ClipPath>
        </Defs>

        {/* 그림자 */}
        {!placed && (
          <Path
            d={piece.path}
            fill="#39465d"
            opacity={0.28}
            transform={`translate(0 ${piece.margin * 0.1})`}
          />
        )}

        <G clipPath={`url(#${clipId})`}>
          <Artwork width={viewBoxWidth} height={viewBoxHeight} />
        </G>

        {/* 외곽선 */}
        <Path
          d={piece.path}
          fill="none"
          stroke={placed ? "#39465d" : "#ffffff"}
          strokeOpacity={placed ? 0.3 : 1}
          strokeWidth={(placed ? 1 : 1.6) * pxToSrc}
          strokeLinejoin="round"
        />
      </Svg>
    </ArtworkClip>
  );
});

function PuzzlePiece({
  piece,
  Artwork,
  viewBoxWidth,
  viewBoxHeight,
  x,
  y,
  width,
  height,
  targetX,
  targetY,
  targetWidth,
  targetHeight,
  placed,
  onDrop,
  boundsWidth,
  boundsHeight,
}: Props) {
  const [isDragging, setIsDragging] = useState(false);

  const renderWidth = placed ? targetWidth : width;
  const renderHeight = placed ? targetHeight : height;
  const renderX = placed ? targetX : x;
  const renderY = placed ? targetY : y;

  // 돌기가 튀어나갈 여유 공간(px)
  const marginX = (piece.margin * renderWidth) / piece.sourceWidth;
  const marginY = (piece.margin * renderHeight) / piece.sourceHeight;

  // viewBox 단위 → px 변환 비율 (선 두께 보정용)
  const pxToSrc = piece.sourceWidth / Math.max(1, renderWidth);

  const clipId = `puzzle-clip-${piece.id}`;

  // 드래그 좌표
  const position = useRef(
    new Animated.ValueXY({ x: renderX, y: renderY }),
  ).current;

  const start = useRef({ x: renderX, y: renderY });

  // 조각(돌기 포함)이 머무를 수 있는 x, y 범위
  const minX = marginX + BOUNDS_INSET_LEFT;
  const maxX =
    (boundsWidth ?? Infinity) - renderWidth - marginX - BOUNDS_INSET_RIGHT;
  const minY = marginY + BOUNDS_INSET_TOP;
  const maxY =
    (boundsHeight ?? Infinity) - renderHeight - marginY - BOUNDS_INSET_BOTTOM;

  // 정답 효과
  const scale = useRef(new Animated.Value(1)).current;
  const burst = useRef(new Animated.Value(0)).current;

  // 오답 흔들림
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // 정답 사운드와 햅틱 중복 실행 방지
  const successPlayed = useRef(false);

  useEffect(() => {
    position.setValue({ x: renderX, y: renderY });
  }, [position, renderX, renderY]);

  // ==========================================================
  // 정답 애니메이션
  // ==========================================================
  useEffect(() => {
    if (!placed || successPlayed.current) return;

    successPlayed.current = true;

    triggerHaptic("success");
    void playSound("correct_sound");

    scale.setValue(0.72);
    burst.setValue(0);
    rotateAnim.setValue(0);

    Animated.parallel([
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.18,
          duration: 130,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 5,
          tension: 150,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(burst, {
        toValue: 1,
        duration: 520,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [placed, scale, burst, rotateAnim]);

  // ==========================================================
  // 오답 애니메이션
  // ==========================================================
  const playWrongAnimation = useCallback(() => {
    rotateAnim.stopAnimation();
    rotateAnim.setValue(0);

    triggerHaptic("error");
    void playSound("wrong_puzzle_sound");

    Animated.sequence([
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 55,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: -1,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 0.65,
        duration: 65,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 70,
        useNativeDriver: true,
      }),
    ]).start();
  }, [rotateAnim]);

  // ==========================================================
  // 드롭 결과 처리
  // ==========================================================
  const finishDrop = useCallback(
    (rawX: number, rawY: number) => {
      const finalX = clamp(rawX, minX, maxX);
      const finalY = clamp(rawY, minY, maxY);

      const commit = () => {
        position.setValue({ x: finalX, y: finalY });
        const result = onDrop(piece.id, finalX, finalY);
        if (result === "wrong") {
          playWrongAnimation();
        }
        setIsDragging(false);
      };

      if (finalX !== rawX || finalY !== rawY) {
        // 경계 밖: 안쪽으로 spring 복귀 후 드롭 처리
        Animated.spring(position, {
          toValue: { x: finalX, y: finalY },
          friction: 6,
          tension: 120,
          useNativeDriver: true,
        }).start(commit);
      } else {
        commit();
      }
    },
    [position, onDrop, piece.id, playWrongAnimation, minX, maxX, minY, maxY],
  );

  // ==========================================================
  // PanResponder
  // ==========================================================
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !placed,

        onMoveShouldSetPanResponder: (_, gesture) =>
          !placed && (Math.abs(gesture.dx) > 2 || Math.abs(gesture.dy) > 2),

        onPanResponderGrant: () => {
          start.current = { x: renderX, y: renderY };
          // spring 도중에 다시 잡은 경우: 멈추고 현재 위치에서 이어서 드래그
          position.stopAnimation((value) => {
            start.current = { x: value.x, y: value.y };
          });
          setIsDragging(true);
          triggerHaptic("light");
        },

        onPanResponderMove: (_, gesture) => {
          position.setValue({
            x: rubber(start.current.x + gesture.dx, minX, maxX),
            y: rubber(start.current.y + gesture.dy, minY, maxY),
          });
        },

        onPanResponderRelease: (_, gesture) => {
          finishDrop(
            start.current.x + gesture.dx,
            start.current.y + gesture.dy,
          );
        },

        onPanResponderTerminate: (_, gesture) => {
          finishDrop(
            start.current.x + gesture.dx,
            start.current.y + gesture.dy,
          );
        },
      }),
    [placed, renderX, renderY, position, finishDrop, minX, maxX, minY, maxY],
  );

  const spin = rotateAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-8deg", "8deg"],
  });

  // ==========================================================
  // 정답 파티클 (놓인 조각에서만 생성)
  // ==========================================================
  const particles = useMemo(() => {
    if (!placed) return null;

    return Array.from({ length: PARTICLE_COUNT }, (_, index) => {
      const angle = (index / PARTICLE_COUNT) * Math.PI * 2;
      const distance =
        Math.min(renderWidth, renderHeight) * (index % 2 === 0 ? 0.65 : 0.48);
      const size = index % 2 === 0 ? 8 : 6;
      const color = PARTICLE_COLORS[index % PARTICLE_COLORS.length];

      return (
        <Particle
          key={index}
          color={color}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            opacity: burst.interpolate({
              inputRange: [0, 0.1, 0.65, 1],
              outputRange: [0, 1, 1, 0],
            }),
            transform: [
              {
                translateX: burst.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, Math.cos(angle) * distance],
                }),
              },
              {
                translateY: burst.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, Math.sin(angle) * distance],
                }),
              },
              {
                scale: burst.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1],
                }),
              },
            ],
          }}
        />
      );
    });
  }, [placed, burst, renderWidth, renderHeight]);

  // 돌기 여유 공간을 포함한 viewBox
  const viewBox = `${piece.sourceX - piece.margin} ${piece.sourceY - piece.margin} ${
    piece.sourceWidth + piece.margin * 2
  } ${piece.sourceHeight + piece.margin * 2}`;

  return (
    <Piece
      {...panResponder.panHandlers}
      // 놓이기 전 조각은 비트맵으로 캐싱해서 드래그 비용을 줄임
      renderToHardwareTextureAndroid={!placed}
      shouldRasterizeIOS={!placed}
      style={{
        // 기본 칸이 (x, y) 에 오도록 여유 공간만큼 바깥으로 확장
        left: -marginX,
        top: -marginY,
        width: renderWidth + marginX * 2,
        height: renderHeight + marginY * 2,
        transform: [
          ...position.getTranslateTransform(),
          { rotate: spin },
          { scale: placed ? scale : 1 },
        ],
        zIndex: isDragging ? 999 : placed ? 1 : 10,
      }}
    >
      {/* 조각 모양대로 잘라낸 그림 */}
      <PieceArtwork
        piece={piece}
        Artwork={Artwork}
        viewBoxWidth={viewBoxWidth}
        viewBoxHeight={viewBoxHeight}
        viewBox={viewBox}
        clipId={clipId}
        placed={placed}
        pxToSrc={pxToSrc}
      />

      {placed && (
        <BurstLayer pointerEvents="none">
          <Ring
            color="#FFC93C"
            style={{
              opacity: burst.interpolate({
                inputRange: [0, 0.1, 1],
                outputRange: [0, 0.85, 0],
              }),
              transform: [
                {
                  scale: burst.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.55, 1.8],
                  }),
                },
              ],
            }}
          />
          {particles}
        </BurstLayer>
      )}
    </Piece>
  );
}

export default React.memo(PuzzlePiece);

// ============================================================
// Styled Components
// ============================================================

const Piece = styled(Animated.View)`
  position: absolute;
  overflow: visible;
  background-color: rgba(255, 255, 255, 0.01);
`;

const ArtworkClip = styled.View`
  flex: 1;
  overflow: hidden;
`;

const BurstLayer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
`;

const Ring = styled(Animated.View)<{ color: string }>`
  position: absolute;
  width: 72%;
  height: 72%;
  border-radius: 999px;
  border-width: 3px;
  border-color: ${(p) => p.color};
`;

const Particle = styled(Animated.View)<{ color: string }>`
  position: absolute;
  background-color: ${(p) => p.color};
`;
//직선퍼즐
// import React, {
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import { Animated, Easing, PanResponder } from "react-native";
// import Svg from "react-native-svg";
// import styled, { css } from "styled-components/native";

// import type { PuzzleArtworkComponent, PuzzlePieceData } from "./puzzleTypes";
// import { triggerHaptic } from "../../../utils/haptic";
// import { playSound } from "../../../utils/sound";

// interface Props {
//   piece: PuzzlePieceData;
//   Artwork: PuzzleArtworkComponent;
//   viewBoxWidth: number;
//   viewBoxHeight: number;
//   x: number;
//   y: number;
//   width: number;
//   height: number;
//   targetX: number;
//   targetY: number;
//   targetWidth: number;
//   targetHeight: number;
//   placed: boolean;
//   onMove: (pieceId: string, x: number, y: number) => void;
//   // true = 정답, false = 오답
//   onDrop: (pieceId: string, x: number, y: number) => boolean;
// }

// const PARTICLE_COUNT = 10;
// const PARTICLE_COLORS = ["#FFC93C", "#7C5CFF", "#FF7AA8"];

// export default function PuzzlePiece({
//   piece,
//   Artwork,
//   viewBoxWidth,
//   viewBoxHeight,
//   x,
//   y,
//   width,
//   height,
//   targetX,
//   targetY,
//   targetWidth,
//   targetHeight,
//   placed,
//   onDrop,
// }: Props) {
//   const [isDragging, setIsDragging] = useState(false);

//   const renderWidth = placed ? targetWidth : width;
//   const renderHeight = placed ? targetHeight : height;
//   const renderX = placed ? targetX : x;
//   const renderY = placed ? targetY : y;

//   // 드래그 좌표
//   const position = useRef(
//     new Animated.ValueXY({ x: renderX, y: renderY }),
//   ).current;

//   const start = useRef({ x: renderX, y: renderY });

//   // 정답 효과
//   const scale = useRef(new Animated.Value(1)).current;
//   const burst = useRef(new Animated.Value(0)).current;

//   // 오답 흔들림
//   const rotateAnim = useRef(new Animated.Value(0)).current;

//   // 정답 사운드와 햅틱 중복 실행 방지
//   const successPlayed = useRef(false);

//   useEffect(() => {
//     position.setValue({ x: renderX, y: renderY });
//   }, [position, renderX, renderY]);

//   // ==========================================================
//   // 정답 애니메이션
//   // 새로 마운트된 placed 조각에서 실행
//   // ==========================================================
//   useEffect(() => {
//     if (!placed || successPlayed.current) return;

//     successPlayed.current = true;

//     triggerHaptic("success");
//     void playSound("correct_sound");

//     scale.setValue(0.72);
//     burst.setValue(0);
//     rotateAnim.setValue(0);

//     Animated.parallel([
//       Animated.sequence([
//         Animated.timing(scale, {
//           toValue: 1.18,
//           duration: 130,
//           easing: Easing.out(Easing.back(1.5)),
//           useNativeDriver: true,
//         }),
//         Animated.spring(scale, {
//           toValue: 1,
//           friction: 5,
//           tension: 150,
//           useNativeDriver: true,
//         }),
//       ]),
//       Animated.timing(burst, {
//         toValue: 1,
//         duration: 520,
//         easing: Easing.out(Easing.cubic),
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, [placed, scale, burst, rotateAnim]);

//   // ==========================================================
//   // 오답 애니메이션
//   // 조각은 이동시키거나 숨기지 않고 놓은 자리에 유지
//   // ==========================================================
//   const playWrongAnimation = useCallback(() => {
//     rotateAnim.stopAnimation();
//     rotateAnim.setValue(0);

//     triggerHaptic("error");
//     void playSound("wrong_puzzle_sound");

//     Animated.sequence([
//       Animated.timing(rotateAnim, {
//         toValue: 1,
//         duration: 55,
//         easing: Easing.out(Easing.quad),
//         useNativeDriver: true,
//       }),
//       Animated.timing(rotateAnim, {
//         toValue: -1,
//         duration: 80,
//         useNativeDriver: true,
//       }),
//       Animated.timing(rotateAnim, {
//         toValue: 0.65,
//         duration: 65,
//         useNativeDriver: true,
//       }),
//       Animated.timing(rotateAnim, {
//         toValue: 0,
//         duration: 70,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, [rotateAnim]);

//   // 드롭 결과 처리
//   const finishDrop = useCallback(
//     (finalX: number, finalY: number) => {
//       position.setValue({ x: finalX, y: finalY });

//       const isCorrect = onDrop(piece.id, finalX, finalY);

//       if (!isCorrect) {
//         // 부모가 위치를 갱신해도 조각은 그 자리에 남아 흔들림
//         playWrongAnimation();
//       }

//       setIsDragging(false);
//     },
//     [position, onDrop, piece.id, playWrongAnimation],
//   );

//   // ==========================================================
//   // PanResponder
//   // ==========================================================
//   const panResponder = useMemo(
//     () =>
//       PanResponder.create({
//         onStartShouldSetPanResponder: () => !placed,

//         onMoveShouldSetPanResponder: (_, gesture) =>
//           !placed && (Math.abs(gesture.dx) > 2 || Math.abs(gesture.dy) > 2),

//         onPanResponderGrant: () => {
//           start.current = { x: renderX, y: renderY };
//           setIsDragging(true);
//           triggerHaptic("light");
//         },

//         onPanResponderMove: (_, gesture) => {
//           position.setValue({
//             x: start.current.x + gesture.dx,
//             y: start.current.y + gesture.dy,
//           });
//         },

//         onPanResponderRelease: (_, gesture) => {
//           finishDrop(
//             start.current.x + gesture.dx,
//             start.current.y + gesture.dy,
//           );
//         },

//         onPanResponderTerminate: (_, gesture) => {
//           finishDrop(
//             start.current.x + gesture.dx,
//             start.current.y + gesture.dy,
//           );
//         },
//       }),
//     [placed, renderX, renderY, position, finishDrop],
//   );

//   const spin = rotateAnim.interpolate({
//     inputRange: [-1, 1],
//     outputRange: ["-8deg", "8deg"],
//   });

//   // ==========================================================
//   // 정답 파티클
//   // ==========================================================
//   const particles = useMemo(
//     () =>
//       Array.from({ length: PARTICLE_COUNT }, (_, index) => {
//         const angle = (index / PARTICLE_COUNT) * Math.PI * 2;
//         const distance =
//           Math.min(renderWidth, renderHeight) * (index % 2 === 0 ? 0.65 : 0.48);
//         const size = index % 2 === 0 ? 8 : 6;
//         const color = PARTICLE_COLORS[index % PARTICLE_COLORS.length];

//         return (
//           <Particle
//             key={index}
//             color={color}
//             style={{
//               width: size,
//               height: size,
//               borderRadius: size / 2,
//               opacity: burst.interpolate({
//                 inputRange: [0, 0.1, 0.65, 1],
//                 outputRange: [0, 1, 1, 0],
//               }),
//               transform: [
//                 {
//                   translateX: burst.interpolate({
//                     inputRange: [0, 1],
//                     outputRange: [0, Math.cos(angle) * distance],
//                   }),
//                 },
//                 {
//                   translateY: burst.interpolate({
//                     inputRange: [0, 1],
//                     outputRange: [0, Math.sin(angle) * distance],
//                   }),
//                 },
//                 {
//                   scale: burst.interpolate({
//                     inputRange: [0, 1],
//                     outputRange: [0.5, 1],
//                   }),
//                 },
//               ],
//             }}
//           />
//         );
//       }),
//     [burst, renderWidth, renderHeight],
//   );

//   return (
//     <Piece
//       {...panResponder.panHandlers}
//       placed={placed}
//       isDragging={isDragging}
//       style={{
//         left: 0,
//         top: 0,
//         width: renderWidth,
//         height: renderHeight,
//         transform: [
//           ...position.getTranslateTransform(),
//           { rotate: spin },
//           { scale: placed ? scale : 1 },
//         ],
//         zIndex: isDragging ? 999 : placed ? 1 : 10,
//         elevation: isDragging ? 20 : placed ? 1 : 4,
//       }}
//     >
//       {/* SVG만 잘라내고, 파티클은 바깥으로 퍼질 수 있게 분리 */}
//       <ArtworkClip>
//         <Svg
//           width="100%"
//           height="100%"
//           viewBox={`${piece.sourceX} ${piece.sourceY} ${piece.sourceWidth} ${piece.sourceHeight}`}
//           preserveAspectRatio="none"
//         >
//           <Artwork width={viewBoxWidth} height={viewBoxHeight} />
//         </Svg>
//       </ArtworkClip>

//       {placed && (
//         <BurstLayer pointerEvents="none">
//           <Ring
//             color="#FFC93C"
//             style={{
//               opacity: burst.interpolate({
//                 inputRange: [0, 0.1, 1],
//                 outputRange: [0, 0.85, 0],
//               }),
//               transform: [
//                 {
//                   scale: burst.interpolate({
//                     inputRange: [0, 1],
//                     outputRange: [0.55, 1.8],
//                   }),
//                 },
//               ],
//             }}
//           />
//           {particles}
//         </BurstLayer>
//       )}
//     </Piece>
//   );
// }

// // ============================================================
// // Styled Components
// // ============================================================

// const Piece = styled(Animated.View)<{
//   placed: boolean;
//   isDragging: boolean;
// }>`
//   position: absolute;
//   overflow: visible;
//   background-color: rgba(255, 255, 255, 0.01);
//   opacity: ${(p) => (p.isDragging ? 1 : 1)};

//   ${(p) =>
//     !p.placed &&
//     css`
//       border-width: 1.5px;
//       border-color: #ffffff;
//       border-radius: 5px;
//       shadow-color: #39465d;
//       shadow-offset: 0px 3px;
//       shadow-opacity: 0.22;
//       shadow-radius: 4px;
//       elevation: 4;
//     `}
// `;

// const ArtworkClip = styled.View`
//   flex: 1;
//   overflow: hidden;
//   /* border-radius: 5px; */
// `;

// const BurstLayer = styled.View`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   align-items: center;
//   justify-content: center;
// `;

// const Ring = styled(Animated.View)<{ color: string }>`
//   position: absolute;
//   width: 72%;
//   height: 72%;
//   border-radius: 999px;
//   border-width: 3px;
//   border-color: ${(p) => p.color};
// `;

// const Particle = styled(Animated.View)<{ color: string }>`
//   position: absolute;
//   background-color: ${(p) => p.color};
// `;

// import {
//   useCallback,
//   useEffect,
//   useMemo,
//   useReducer,
//   useRef,
//   useState,
// } from "react";
// import { type LayoutChangeEvent } from "react-native";
// import {
//   runOnJS,
//   useFrameCallback,
//   useSharedValue,
// } from "react-native-reanimated";
// import { SafeAreaView } from "react-native-safe-area-context";
// import styled from "styled-components/native";

// import { resolveWalls } from "../../games/magnetMaze/physics/wallCollision";
// import { GameBoard } from "../../components/MagnetMaze/GameBoard";
// import { MagnetPen } from "../../components/MagnetMaze/MagnetPen";
// import { IronBall } from "../../components/MagnetMaze/IronBall";
// import { PathGuide } from "../../components/MagnetMaze/PathGuide";
// import { PathWall } from "../../components/MagnetMaze/PathWall";
// import { TimeBar } from "../../components/MagnetMaze/TimeBar";
// import { GAME_CONFIG } from "../../constants/magnetMaze/gameConfig";
// import { goalRadiusFor, isArrived } from "../../games/magnetMaze/game/arrival";
// import {
//   AUTO_ADVANCE_MS,
//   createGame,
//   gameReducer,
//   isLevelPassed,
//   remainingMs,
//   starsOf,
// } from "../../games/magnetMaze/game/gameState";
// import {
//   LEVEL_CONFIGS,
//   fitConfigToBoard,
//   getLevelConfig,
// } from "../../games/magnetMaze/levels/levelConfigs";
// import { generateRound } from "../../games/magnetMaze/levels/levelGenerator";
// import { buildWallGeometry } from "../../games/magnetMaze/physics/collisionGeometry";
// import { stepPhysics } from "../../games/magnetMaze/physics/physicsEngine";
// import { BallMode, type PhysicsShared } from "../../games/magnetMaze/physics/physicsTypes";
// import { RoundProgress } from "../../components/MagnetMaze/RoundProgress";
// import ResultOverlay from "../../components/ResultOverlay";

// const PEN_START = { x: 0.5, y: 0.85 }; // 보드 비율

// type Props = {
//   /** 뒤로가기 (Kids Playground 이전 시 AppHeader 의 뒤로가기에 연결). 없으면 버튼 숨김 */
//   onBack?: () => void;
//   /** 연구용 레벨 선택 칩 표시 */
//   showLevelPicker?: boolean;
// };

// export default function MagnetMazeScreen({
//   onBack,
//   showLevelPicker = true,
// }: Props) {
//   const s: PhysicsShared = {
//     boardW: useSharedValue(0),
//     boardH: useSharedValue(0),
//     ballX: useSharedValue(-100),
//     ballY: useSharedValue(-100),
//     ballVX: useSharedValue(0),
//     ballVY: useSharedValue(0),
//     ballMode: useSharedValue<number>(BallMode.FREE),
//     attachOffX: useSharedValue(0),
//     attachOffY: useSharedValue(0),
//     penX: useSharedValue(-100),
//     penY: useSharedValue(-100),
//     penActive: useSharedValue(0),
//     penVX: useSharedValue(0),
//     penVY: useSharedValue(0),
//     prevTipX: useSharedValue(0),
//     prevTipY: useSharedValue(0),
//     ballRadius: useSharedValue<number>(GAME_CONFIG.BALL_RADIUS),
//     wallSegs: useSharedValue<number[]>([]),
//     wallCount: useSharedValue(0),
//     wallReach: useSharedValue(0),
//     locked: useSharedValue(1), // 라운드 준비 전까지는 잠금
//     goalX: useSharedValue(0),
//     goalY: useSharedValue(0),
//     goalR: useSharedValue(0),
//   };

//   // ── 게임 진행 상태 (라운드/별/결과) ────────────────────────────
//   const [game, dispatch] = useReducer(gameReducer, undefined, () =>
//     createGame(1, LEVEL_CONFIGS[0].roundCount),
//   );
//   const { levelId, roundIndex } = game;
//   const [size, setSize] = useState<{ w: number; h: number } | null>(null);
//   const baseConfig = getLevelConfig(levelId);

//   // 정사각형 보드 한 변(px): 보드 영역의 가로/세로 중 짧은 쪽
//   const [side, setSide] = useState(0);
//   const onWrapLayout = (ev: LayoutChangeEvent) => {
//     const { width, height } = ev.nativeEvent.layout;
//     const next = Math.floor(Math.min(width, height));
//     if (next > 0) setSide((prev) => (prev === next ? prev : next));
//   };

//   // 작은 화면에서는 통로 폭·벽 두께·구슬 반지름을 같은 비율로 줄여 보드 대비 비율을 유지
//   const config = useMemo(
//     () => (size ? fitConfigToBoard(baseConfig, size.w) : baseConfig),
//     [baseConfig, size],
//   );

//   const { round, error } = useMemo(() => {
//     if (!size) return { round: null, error: null };
//     try {
//       return {
//         round: generateRound(config, roundIndex, {
//           boardAspect: size.w / size.h,
//           boardWidthPx: size.w,
//         }),
//         error: null,
//       };
//     } catch (e) {
//       return { round: null, error: e instanceof Error ? e.message : String(e) };
//     }
//   }, [config, roundIndex, size]);

//   const onBoardLayout = (w: number, h: number) => {
//     if (w < 1 || h < 1) return;
//     s.boardW.value = w;
//     s.boardH.value = h;
//     if (s.ballX.value < 0 || s.ballY.value < 0) {
//       const r =
//         s.ballRadius.value > 1 ? s.ballRadius.value : GAME_CONFIG.BALL_RADIUS;
//       s.ballX.value = w * 0.5;
//       s.ballY.value = h * 0.5;
//       s.ballRadius.value = r;
//     }
//     setSize((prev) =>
//       prev && Math.abs(prev.w - w) < 0.5 && Math.abs(prev.h - h) < 0.5
//         ? prev
//         : { w, h },
//     );
//   };

//   // 벽 데이터는 라운드가 시작될 때 한 번만 계산 (렌더링과 충돌이 같은 데이터를 쓴다)
//   const walls = useMemo(
//     () =>
//       round && size
//         ? buildWallGeometry(
//             round,
//             config.walls,
//             config.ballRadius,
//             size.w,
//             size.h,
//           )
//         : null,
//     [round, size, config],
//   );

//   // ── 성공/실패 확정 (한 라운드에서 한 번만) ─────────────────────
//   const resolvedSerial = useRef(-1);
//   const resolve = useCallback(
//     (kind: "SUCCESS" | "FAIL") => {
//       if (resolvedSerial.current === game.serial) return; // 이미 확정됨
//       resolvedSerial.current = game.serial;
//       s.locked.value = 1; // 조작 차단 + 물리 정지
//       s.penActive.value = 0;
//       dispatch({ type: kind });
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [game.serial],
//   );
//   const resolveRef = useRef(resolve);
//   resolveRef.current = resolve;
//   const onArriveJS = useCallback(() => resolveRef.current("SUCCESS"), []);

//   // ── 물리 + 도착 판정 (UI 스레드, 매 프레임) ────────────────────
//   useFrameCallback((frame) => {
//     "worklet";
//     const ms = frame.timeSincePreviousFrame;
//     if (ms == null || s.boardW.value === 0 || s.locked.value === 1) return;
//     stepPhysics(s, ms / 1000);
//     if (
//       isArrived(
//         s.ballX.value,
//         s.ballY.value,
//         s.goalX.value,
//         s.goalY.value,
//         s.goalR.value,
//       )
//     ) {
//       s.locked.value = 1;
//       s.penActive.value = 0;
//       runOnJS(onArriveJS)();
//     }
//   });

//   // ── 라운드 배치 / 초기화 ───────────────────────────────────────
//   const playing = game.phase === "PLAYING";
//   const placeStart = useCallback(() => {
//     if (!round || !size) return;
//     const r =
//       config.ballRadius > 1 ? config.ballRadius : GAME_CONFIG.BALL_RADIUS;
//     s.ballRadius.value = r;
//     if (walls) {
//       s.wallSegs.value = walls.segs;
//       s.wallCount.value = walls.segCount;
//       s.wallReach.value = walls.reach;
//     } else {
//       s.wallSegs.value = [];
//       s.wallCount.value = 0;
//       s.wallReach.value = 0;
//     }
//     let sx = round.startPosition.x * size.w;
//     let sy = round.startPosition.y * size.h;
//     if (walls && walls.segCount > 0 && walls.reach > 0) {
//       const snapped = resolveWalls(
//         walls.segs,
//         walls.segCount,
//         walls.reach,
//         sx,
//         sy,
//       );
//       sx = snapped.x;
//       sy = snapped.y;
//     }
//     sx = Math.max(r, Math.min(size.w - r, sx));
//     sy = Math.max(r, Math.min(size.h - r, sy));
//     s.ballX.value = sx;
//     s.ballY.value = sy;
//     s.ballVX.value = 0;
//     s.ballVY.value = 0;
//     s.ballMode.value = BallMode.FREE;
//     s.attachOffX.value = 0;
//     s.attachOffY.value = 0;
//     s.penX.value = size.w * PEN_START.x;
//     s.penY.value = size.h * PEN_START.y;
//     s.penActive.value = 0;
//     // 목적지 판정 영역 (화면에 그리는 표시와 같은 반지름)
//     s.goalX.value = round.goalPosition.x * size.w;
//     s.goalY.value = round.goalPosition.y * size.h;
//     s.goalR.value = goalRadiusFor(
//       config.walls.hasWalls ? config.walls.corridorWidth : undefined,
//     );
//     s.locked.value = 0; // 새 라운드: 조작 가능
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [round, size, walls, config]);

//   // 라운드가 (재)시작될 때마다 배치. serial 이 바뀌면 같은 라운드라도 다시 배치한다.
//   useEffect(() => {
//     if (playing) placeStart();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [placeStart, game.serial, playing]);

//   // ── 타이머: 실제 경과 시간(Date.now) 기준. 물리/프레임과 독립 ──────
//   const totalMs = config.timeLimitSeconds * 1000;
//   const [timeLeft, setTimeLeft] = useState(totalMs);
//   const timerActive = playing && !!round;
//   useEffect(() => {
//     if (!timerActive) return; // 확정되면 멈춘 채로 남는다 (정지)
//     const start = Date.now();
//     setTimeLeft(totalMs);
//     const id = setInterval(() => {
//       const left = remainingMs(start, Date.now(), totalMs);
//       setTimeLeft(left);
//       if (left <= 0) {
//         clearInterval(id);
//         resolveRef.current("FAIL");
//       }
//     }, 50);
//     return () => clearInterval(id);
//   }, [timerActive, game.serial, totalMs]);

//   // ── 라운드 결과 → 잠시 후 자동으로 다음 라운드 ────────────────
//   useEffect(() => {
//     if (game.phase !== "ROUND_RESULT") return;
//     const id = setTimeout(() => dispatch({ type: "NEXT" }), AUTO_ADVANCE_MS);
//     return () => clearTimeout(id);
//   }, [game.phase, game.serial, game.roundIndex]);

//   const stars = starsOf(game.results);
//   const startLevel = (id: number) =>
//     dispatch({
//       type: "START_LEVEL",
//       levelId: id,
//       roundCount: getLevelConfig(id).roundCount,
//     });
//   const nextLevelId = LEVEL_CONFIGS.find((c) => c.levelId > levelId)?.levelId;

//   return (
//     <Safe>
//       {/* 1. 헤더: 뒤로가기 + 별 */}
//       <Header>
//         {onBack ? (
//           <BackBtn onPress={onBack}>
//             <BackText>←</BackText>
//           </BackBtn>
//         ) : (
//           <BackBtn />
//         )}
//         <StarRow>
//           {Array.from({ length: game.roundCount }, (_, i) => (
//             <Star key={`star-${i}`}>
//               {game.results[i] === "success" ? "★" : "☆"}
//             </Star>
//           ))}
//         </StarRow>
//         <ResetBtn onPress={() => dispatch({ type: "RESTART_ROUND" })}>
//           <ResetText>다시</ResetText>
//         </ResetBtn>
//       </Header>

//       {showLevelPicker && (
//         <Chips>
//           {LEVEL_CONFIGS.map((c) => (
//             <Chip
//               key={c.levelId}
//               label={`L${c.levelId}`}
//               selected={c.levelId === levelId}
//               onPress={() => startLevel(c.levelId)}
//             />
//           ))}
//         </Chips>
//       )}

//       {/* 2. 시간 막대 */}
//       <TimeBar remainingMs={timeLeft} totalMs={totalMs} />
//       {error && <ErrorText>{error}</ErrorText>}

//       {/* 3. 게임판 (정사각형) */}
//       <BoardWrap onLayout={onWrapLayout}>
//         <SquareBoard side={side}>
//           <GameBoard s={s} onBoardLayout={onBoardLayout}>
//             {walls && size && (
//               <PathWall geometry={walls} width={size.w} height={size.h} />
//             )}
//             {round && size && (
//               <PathGuide
//                 round={round}
//                 width={size.w}
//                 height={size.h}
//                 corridorWidth={
//                   config.walls.hasWalls ? config.walls.corridorWidth : undefined
//                 }
//                 ballRadius={config.ballRadius}
//               />
//             )}
//             <MagnetPen s={s} />
//             <IronBall s={s} />
//           </GameBoard>
//         </SquareBoard>
//       </BoardWrap>

//       {/* 4. 라운드 진행 */}
//       <RoundProgress
//         currentRound={roundIndex}
//         totalRounds={game.roundCount}
//         results={game.results}
//       />

//       {/* 5. 결과 */}
//       {game.phase === "ROUND_RESULT" && (
//         <ResultOverlay
//           kind="round"
//           success={game.lastResult === "success"}
//           onNext={() => dispatch({ type: "NEXT" })}
//         />
//       )}
//       {game.phase === "LEVEL_RESULT" && (
//         <ResultOverlay
//           kind="level"
//           levelId={levelId}
//           stars={stars}
//           total={game.roundCount}
//           passed={isLevelPassed(game.results)}
//           hasNextLevel={nextLevelId !== undefined}
//           onRetry={() => startLevel(levelId)}
//           onNextLevel={() => nextLevelId && startLevel(nextLevelId)}
//         />
//       )}
//     </Safe>
//   );
// }

// function Chip({
//   label,
//   selected,
//   onPress,
// }: {
//   label: string;
//   selected: boolean;
//   onPress: () => void;
// }) {
//   return (
//     <ChipButton onPress={onPress} selected={selected}>
//       <ChipText selected={selected}>{label}</ChipText>
//     </ChipButton>
//   );
// }
// const Safe = styled(SafeAreaView)`
//   flex: 1;
//   background-color: #ffe9b8;
// `;

// const Header = styled.View`
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
//   padding: 8px 16px;
// `;

// const BackBtn = styled.Pressable`
//   width: 44px;
//   height: 36px;
//   align-items: center;
//   justify-content: center;
// `;

// const BackText = styled.Text`
//   font-size: 24px;
//   font-weight: 800;
//   color: #8a4b08;
// `;

// const StarRow = styled.View`
//   flex-direction: row;
// `;

// const Star = styled.Text`
//   font-size: 28px;
//   color: #f59e0b;
// `;

// const ResetBtn = styled.Pressable`
//   background-color: #ff8a3d;
//   padding: 8px 14px;
//   border-radius: 16px;
// `;

// const ResetText = styled.Text`
//   color: white;
//   font-size: 15px;
//   font-weight: 700;
// `;

// const Chips = styled.View`
//   flex-direction: row;
//   padding: 0 16px 4px;
// `;

// const ChipButton = styled.Pressable<{ selected: boolean }>`
//   padding: 4px 10px;
//   border-radius: 14px;
//   border-width: 2px;
//   background-color: ${({ selected }) => (selected ? "#FF8A3D" : "#FFF3D6")};
//   border-color: ${({ selected }) => (selected ? "#FF8A3D" : "#F5C26B")};
// `;

// const ChipText = styled.Text<{ selected: boolean }>`
//   font-size: 13px;
//   font-weight: 700;
//   color: ${({ selected }) => (selected ? "#FFFFFF" : "#8A4B08")};
// `;

// const ErrorText = styled.Text`
//   color: #b91c1c;
//   padding: 0 20px 4px;
//   font-size: 12px;
// `;

// const BoardWrap = styled.View`
//   flex: 1;
//   padding: 8px 16px;
//   align-items: center;
//   justify-content: center;
// `;

// const SquareBoard = styled.View<{ side: number }>`
//   width: ${({ side }) => side}px;
//   height: ${({ side }) => side}px;
// `;

import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";

import { type LayoutChangeEvent } from "react-native";

import {
  runOnJS,
  useFrameCallback,
  useSharedValue,
} from "react-native-reanimated";

import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

// ============================================================
// Kids Playground 공통 컴포넌트
// ============================================================

import AppHeader from "../../components/AppHeader";
import ResultOverlay from "../../components/ResultOverlay";

// ============================================================
// Magnet Maze 컴포넌트
// ============================================================

import { GameBoard } from "../../components/MagnetMaze/GameBoard";
import { MagnetPen } from "../../components/MagnetMaze/MagnetPen";
import { IronBall } from "../../components/MagnetMaze/IronBall";
import { PathGuide } from "../../components/MagnetMaze/PathGuide";
import { PathWall } from "../../components/MagnetMaze/PathWall";
import { TimeBar } from "../../components/MagnetMaze/TimeBar";
import { RoundProgress } from "../../components/MagnetMaze/RoundProgress";

// ============================================================
// Magnet Maze 게임 로직
// ============================================================

import { GAME_CONFIG } from "../../constants/magnetMaze/gameConfig";

import { goalRadiusFor, isArrived } from "../../games/magnetMaze/game/arrival";

import {
  AUTO_ADVANCE_MS,
  createGame,
  gameReducer,
  remainingMs,
  starsOf,
} from "../../games/magnetMaze/game/gameState";

import {
  LEVEL_CONFIGS,
  fitConfigToBoard,
  getLevelConfig,
} from "../../games/magnetMaze/levels/levelConfigs";

import { generateRound } from "../../games/magnetMaze/levels/levelGenerator";

import { buildWallGeometry } from "../../games/magnetMaze/physics/collisionGeometry";

import { resolveWalls } from "../../games/magnetMaze/physics/wallCollision";

import { stepPhysics } from "../../games/magnetMaze/physics/physicsEngine";

import {
  BallMode,
  type PhysicsShared,
} from "../../games/magnetMaze/physics/physicsTypes";
import StarRow from "../../design-system/components/StarRow";

// ============================================================
// Constants
// ============================================================

const PEN_START = {
  x: 0.5,
  y: 0.85,
};

// ============================================================
// Props
// ============================================================

type Props = {
  /** 게임 화면 뒤로가기 */
  onBack?: () => void;

  /** 홈으로 이동 */
  onHome?: () => void;

  /** 로드맵으로 이동 */
  onGoRoadmap?: () => void;

  /** 개발용 레벨 선택 칩 */
  showLevelPicker?: boolean;
};

// ============================================================
// Screen
// ============================================================

export default function MagnetMazePlayScreen({
  onBack,
  onHome,
  onGoRoadmap,
  showLevelPicker = false,
}: Props) {
  // ==========================================================
  // Physics Shared Values
  // ==========================================================

  const s: PhysicsShared = {
    boardW: useSharedValue(0),
    boardH: useSharedValue(0),

    ballX: useSharedValue(-100),
    ballY: useSharedValue(-100),

    ballVX: useSharedValue(0),
    ballVY: useSharedValue(0),

    ballMode: useSharedValue<number>(BallMode.FREE),

    attachOffX: useSharedValue(0),
    attachOffY: useSharedValue(0),

    penX: useSharedValue(-100),
    penY: useSharedValue(-100),

    penActive: useSharedValue(0),

    penVX: useSharedValue(0),
    penVY: useSharedValue(0),

    prevTipX: useSharedValue(0),
    prevTipY: useSharedValue(0),

    ballRadius: useSharedValue<number>(GAME_CONFIG.BALL_RADIUS),

    wallSegs: useSharedValue<number[]>([]),
    wallCount: useSharedValue(0),
    wallReach: useSharedValue(0),

    locked: useSharedValue(1),

    goalX: useSharedValue(0),
    goalY: useSharedValue(0),
    goalR: useSharedValue(0),
  };

  // ==========================================================
  // Game State
  // ==========================================================

  const [game, dispatch] = useReducer(gameReducer, undefined, () =>
    createGame(1, LEVEL_CONFIGS[0].roundCount),
  );

  const { levelId, roundIndex } = game;

  const [size, setSize] = useState<{
    w: number;
    h: number;
  } | null>(null);

  const [side, setSide] = useState(0);

  const baseConfig = getLevelConfig(levelId);

  const playing = game.phase === "PLAYING";

  // ==========================================================
  // Board Layout
  // ==========================================================

  const onWrapLayout = useCallback((ev: LayoutChangeEvent) => {
    const { width, height } = ev.nativeEvent.layout;

    const next = Math.floor(Math.min(width, height));

    if (next > 0) {
      setSide((prev) => (prev === next ? prev : next));
    }
  }, []);

  const onBoardLayout = useCallback(
    (w: number, h: number) => {
      if (w < 1 || h < 1) return;

      s.boardW.value = w;
      s.boardH.value = h;

      if (s.ballX.value < 0 || s.ballY.value < 0) {
        const r =
          s.ballRadius.value > 1 ? s.ballRadius.value : GAME_CONFIG.BALL_RADIUS;

        s.ballX.value = w * 0.5;
        s.ballY.value = h * 0.5;
        s.ballRadius.value = r;
      }

      setSize((prev) =>
        prev && Math.abs(prev.w - w) < 0.5 && Math.abs(prev.h - h) < 0.5
          ? prev
          : { w, h },
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // ==========================================================
  // Level Configuration
  // ==========================================================

  const config = useMemo(
    () => (size ? fitConfigToBoard(baseConfig, size.w) : baseConfig),
    [baseConfig, size],
  );

  // ==========================================================
  // Round Generation
  // ==========================================================

  const { round, error } = useMemo(() => {
    if (!size) {
      return {
        round: null,
        error: null,
      };
    }

    try {
      return {
        round: generateRound(config, roundIndex, {
          boardAspect: size.w / size.h,
          boardWidthPx: size.w,
        }),
        error: null,
      };
    } catch (e) {
      return {
        round: null,
        error: e instanceof Error ? e.message : String(e),
      };
    }
  }, [config, roundIndex, size]);

  // ==========================================================
  // Wall Geometry
  // ==========================================================

  const walls = useMemo(
    () =>
      round && size
        ? buildWallGeometry(
            round,
            config.walls,
            config.ballRadius,
            size.w,
            size.h,
          )
        : null,
    [round, size, config],
  );

  // ==========================================================
  // Resolve Round
  // ==========================================================

  const resolvedSerial = useRef(-1);

  const resolve = useCallback(
    (kind: "SUCCESS" | "FAIL") => {
      if (resolvedSerial.current === game.serial) {
        return;
      }

      resolvedSerial.current = game.serial;

      // 라운드 종료 시 조작과 물리 정지
      s.locked.value = 1;
      s.penActive.value = 0;

      dispatch({
        type: kind,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [game.serial],
  );

  const resolveRef = useRef(resolve);

  resolveRef.current = resolve;

  const onArriveJS = useCallback(() => {
    resolveRef.current("SUCCESS");
  }, []);

  // ==========================================================
  // Physics + Arrival Detection
  // ==========================================================

  useFrameCallback((frame) => {
    "worklet";

    const ms = frame.timeSincePreviousFrame;

    if (ms == null || s.boardW.value === 0 || s.locked.value === 1) {
      return;
    }

    stepPhysics(s, ms / 1000);

    if (
      isArrived(
        s.ballX.value,
        s.ballY.value,
        s.goalX.value,
        s.goalY.value,
        s.goalR.value,
      )
    ) {
      s.locked.value = 1;
      s.penActive.value = 0;

      runOnJS(onArriveJS)();
    }
  });

  // ==========================================================
  // Place Ball + Initialize Round
  // ==========================================================

  const placeStart = useCallback(() => {
    if (!round || !size) return;

    const r =
      config.ballRadius > 1 ? config.ballRadius : GAME_CONFIG.BALL_RADIUS;

    s.ballRadius.value = r;

    if (walls) {
      s.wallSegs.value = walls.segs;
      s.wallCount.value = walls.segCount;
      s.wallReach.value = walls.reach;
    } else {
      s.wallSegs.value = [];
      s.wallCount.value = 0;
      s.wallReach.value = 0;
    }

    let sx = round.startPosition.x * size.w;
    let sy = round.startPosition.y * size.h;

    if (walls && walls.segCount > 0 && walls.reach > 0) {
      const snapped = resolveWalls(
        walls.segs,
        walls.segCount,
        walls.reach,
        sx,
        sy,
      );

      sx = snapped.x;
      sy = snapped.y;
    }

    sx = Math.max(r, Math.min(size.w - r, sx));

    sy = Math.max(r, Math.min(size.h - r, sy));

    s.ballX.value = sx;
    s.ballY.value = sy;

    s.ballVX.value = 0;
    s.ballVY.value = 0;

    s.ballMode.value = BallMode.FREE;

    s.attachOffX.value = 0;
    s.attachOffY.value = 0;

    s.penX.value = size.w * PEN_START.x;
    s.penY.value = size.h * PEN_START.y;

    s.penActive.value = 0;

    s.goalX.value = round.goalPosition.x * size.w;

    s.goalY.value = round.goalPosition.y * size.h;

    s.goalR.value = goalRadiusFor(
      config.walls.hasWalls ? config.walls.corridorWidth : undefined,
    );

    s.locked.value = 0;
  }, [round, size, walls, config]);

  useEffect(() => {
    if (playing) {
      placeStart();
    }
  }, [placeStart, game.serial, playing]);

  // ==========================================================
  // Timer
  // ==========================================================

  const totalMs = config.timeLimitSeconds * 1000;

  const [timeLeft, setTimeLeft] = useState(totalMs);

  const timerActive = playing && !!round;

  useEffect(() => {
    if (!timerActive) return;

    const start = Date.now();

    setTimeLeft(totalMs);

    const id = setInterval(() => {
      const left = remainingMs(start, Date.now(), totalMs);

      setTimeLeft(left);

      if (left <= 0) {
        clearInterval(id);

        // 시간 초과: 별을 얻지 못하고 라운드 종료
        // 별도의 실패 팝업은 표시하지 않는다.
        resolveRef.current("FAIL");
      }
    }, 50);

    return () => clearInterval(id);
  }, [timerActive, game.serial, totalMs]);

  // ==========================================================
  // Automatic Next Round
  // ==========================================================

  useEffect(() => {
    if (game.phase !== "ROUND_RESULT") {
      return;
    }

    const id = setTimeout(() => {
      dispatch({
        type: "NEXT",
      });
    }, AUTO_ADVANCE_MS);

    return () => clearTimeout(id);
  }, [game.phase, game.serial, game.roundIndex]);

  // ==========================================================
  // Level Actions
  // ==========================================================

  const startLevel = useCallback((id: number) => {
    dispatch({
      type: "START_LEVEL",
      levelId: id,
      roundCount: getLevelConfig(id).roundCount,
    });
  }, []);

  const restartLevel = useCallback(() => {
    startLevel(levelId);
  }, [startLevel, levelId]);

  const nextLevelId = LEVEL_CONFIGS.find((c) => c.levelId > levelId)?.levelId;

  // ==========================================================
  // Stars
  // ==========================================================

  const earnedStars = starsOf(game.results);

  // ==========================================================
  // Navigation Actions
  // ==========================================================

  const handleHome = useCallback(() => {
    onHome?.();
    if (!onHome) {
      onBack?.();
    }
  }, [onHome, onBack]);

  const handleGoRoadmap = useCallback(() => {
    onGoRoadmap?.();
    if (!onGoRoadmap) {
      onBack?.();
    }
  }, [onGoRoadmap, onBack]);

  const handleNextLevel = useCallback(() => {
    if (nextLevelId !== undefined) {
      startLevel(nextLevelId);
    }
  }, [nextLevelId, startLevel]);

  // ==========================================================
  // Render
  // ==========================================================

  return (
    <Safe>
      {/* ==================================================== */}
      {/* 1. 공통 헤더 */}
      {/* ==================================================== */}

      <AppHeader
        onBackPress={onBack}
        title={
          <StarRow
            earnedStars={earnedStars}
            totalStars={game.roundCount}
            gameType="maze"
            size={30}
          />
        }
      />

      {/* ==================================================== */}
      {/* 개발용 레벨 선택 */}
      {/* ==================================================== */}

      {showLevelPicker && (
        <Chips>
          {LEVEL_CONFIGS.map((c) => (
            <Chip
              key={c.levelId}
              label={`L${c.levelId}`}
              selected={c.levelId === levelId}
              onPress={() => startLevel(c.levelId)}
            />
          ))}
        </Chips>
      )}

      {/* ==================================================== */}
      {/* 2. 타이머 */}
      {/* ==================================================== */}

      <TimeBar remainingMs={timeLeft} totalMs={totalMs} />

      {error && <ErrorText>{error}</ErrorText>}

      {/* ==================================================== */}
      {/* 3. 게임판 */}
      {/* ==================================================== */}

      <BoardWrap onLayout={onWrapLayout}>
        <SquareBoard side={side}>
          <GameBoard s={s} onBoardLayout={onBoardLayout}>
            {walls && size && (
              <PathWall geometry={walls} width={size.w} height={size.h} />
            )}

            {round && size && (
              <PathGuide
                round={round}
                width={size.w}
                height={size.h}
                corridorWidth={
                  config.walls.hasWalls ? config.walls.corridorWidth : undefined
                }
                ballRadius={config.ballRadius}
              />
            )}

            <MagnetPen s={s} />

            <IronBall s={s} />
          </GameBoard>
        </SquareBoard>
      </BoardWrap>

      {/* ==================================================== */}
      {/* 4. 라운드 진행 */}
      {/* ==================================================== */}

      <RoundProgress
        currentRound={roundIndex}
        totalRounds={game.roundCount}
        results={game.results}
      />

      {/* ==================================================== */}
      {/* 5. 레벨 완료 결과 화면 */}
      {/* ==================================================== */}

      {game.phase === "LEVEL_RESULT" && (
        <ResultOverlay
          level={levelId}
          earnedStars={earnedStars}
          isLastLevel={nextLevelId === undefined}
          gameType="maze"
          onHome={handleHome}
          onRestart={restartLevel}
          onNextLevel={handleNextLevel}
          onGoRoadmap={handleGoRoadmap}
        />
      )}
    </Safe>
  );
}

// ============================================================
// Developer Level Picker
// ============================================================

function Chip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <ChipButton onPress={onPress} selected={selected}>
      <ChipText selected={selected}>{label}</ChipText>
    </ChipButton>
  );
}

// ============================================================
// Styles
// ============================================================

const Safe = styled(SafeAreaView)`
  flex: 1;
  background-color: #ffe9b8;
`;

const Chips = styled.View`
  flex-direction: row;
  padding: 0 16px 4px;
`;

const ChipButton = styled.Pressable<{
  selected: boolean;
}>`
  padding: 4px 10px;
  border-radius: 14px;
  border-width: 2px;
  background-color: ${({ selected }) => (selected ? "#FF8A3D" : "#FFF3D6")};
  border-color: ${({ selected }) => (selected ? "#FF8A3D" : "#F5C26B")};
`;

const ChipText = styled.Text<{
  selected: boolean;
}>`
  font-size: 13px;
  font-weight: 700;
  color: ${({ selected }) => (selected ? "#FFFFFF" : "#8A4B08")};
`;

const ErrorText = styled.Text`
  color: #b91c1c;
  padding: 0 20px 4px;
  font-size: 12px;
`;

const BoardWrap = styled.View`
  flex: 1;
  padding: 8px 16px;
  align-items: center;
  justify-content: center;
`;

const SquareBoard = styled.View<{
  side: number;
}>`
  width: ${({ side }) => side}px;
  height: ${({ side }) => side}px;
`;

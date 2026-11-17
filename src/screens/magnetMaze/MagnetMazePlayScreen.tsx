// import {
//   useCallback,
//   useEffect,
//   useMemo,
//   useReducer,
//   useRef,
//   useState,
// } from "react";

// import { StyleSheet, View } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { useNavigation } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// import {
//   runOnJS,
//   useFrameCallback,
//   useSharedValue,
// } from "react-native-reanimated";

// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import styled from "styled-components/native";

// // ============================================================
// // Kids Playground 공통 컴포넌트
// // ============================================================

// import AppHeader from "../../components/AppHeader";
// import ColorSortingFooter from "../../components/ColorSorting/ColorSortingFooter";
// import ClassificationTestControls from "../../components/common/ClassificationTestControls";
// import { RootStackParamList } from "../../navigation/types";
// import { computeBoardLayout } from "../../utils/magnetMaze/boardLayout";
// import ResultOverlay from "../../components/ResultOverlay";

// // ============================================================
// // Magnet Maze 컴포넌트
// // ============================================================

// import { GameBoard } from "../../components/MagnetMaze/GameBoard";
// import { MagnetPen } from "../../components/MagnetMaze/MagnetPen";
// import { IronBall } from "../../components/MagnetMaze/IronBall";
// import { PathGuide } from "../../components/MagnetMaze/PathGuide";
// import { PathWall } from "../../components/MagnetMaze/PathWall";
// import { TimeBar } from "../../components/MagnetMaze/TimeBar";

// // ============================================================
// // Magnet Maze 게임 로직
// // ============================================================

// import { GAME_CONFIG } from "../../constants/magnetMaze/gameConfig";

// import {
//   goalArrivalRadiusFor,
//   isArrived,
// } from "../../games/magnetMaze/game/arrival";

// import {
//   AUTO_ADVANCE_MS,
//   createGame,
//   gameReducer,
//   newSessionSeed,
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

// import { resolveWalls } from "../../games/magnetMaze/physics/wallCollision";

// import {
//   getTip,
//   movePen,
//   stepPhysics,
// } from "../../games/magnetMaze/physics/physicsEngine";

// import {
//   BallMode,
//   type PhysicsShared,
// } from "../../games/magnetMaze/physics/physicsTypes";
// import StarRow from "../../design-system/components/StarRow";

// import { TutorialGhostBall } from "../../components/Tutorial/MagnetMaze/TutorialGoastBall";
// import {
//   TutPhase,
//   TUTORIAL_PEN_SPEED,
//   TUTORIAL_ATTACH_DISTANCE,
//   TUTORIAL_GOAL_ARRIVE,
//   TUTORIAL_FINISH_HOLD,
//   TUTORIAL_FADE_OUT,
//   shouldRunMazeTutorial,
// } from "../../components/Tutorial/MagnetMaze/MazeTutorialController";
// import { GoalBurst } from "../../components/MagnetMaze/GoalBurst";
// import { useBackgroundMusic } from "../../utils/BackgroundMusicContext";
// import { playMagnetGoalSound, playSound } from "../../utils/sound";

// // ============================================================
// // Constants
// // ============================================================

// /** 개발/테스트용 레벨·라운드 컨트롤 (다른 게임과 동일하게 기본 숨김) */
// const SHOW_TEST_CONTROLS = true;

// type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

// const PEN_START = {
//   x: 0.5,
//   y: 0.85,
// };

// // ============================================================
// // Props
// // ============================================================

// type Props = {
//   /** 게임 화면 뒤로가기 */
//   onBack?: () => void;

//   /** 홈으로 이동 */
//   onHome?: () => void;

//   /** 로드맵으로 이동 */
//   onGoRoadmap?: () => void;
// };

// // ============================================================
// // Screen
// // ============================================================

// export default function MagnetMazePlayScreen({
//   onBack,
//   onHome,
//   onGoRoadmap,
// }: Props) {
//   const insets = useSafeAreaInsets();
//   const navigation = useNavigation<NavigationProps>();

//   const { playThemeBGM } = useBackgroundMusic();

//   useEffect(() => {
//     playThemeBGM("game");
//     return () => {
//       playThemeBGM("main");
//     };
//   }, []);

//   // ==========================================================
//   // Physics Shared Values
//   // ==========================================================

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
//     penMargin: useSharedValue(0),

//     penVX: useSharedValue(0),
//     penVY: useSharedValue(0),

//     prevTipX: useSharedValue(0),
//     prevTipY: useSharedValue(0),

//     ballRadius: useSharedValue<number>(GAME_CONFIG.BALL_RADIUS),

//     wallSegs: useSharedValue<number[]>([]),
//     wallCount: useSharedValue(0),
//     wallReach: useSharedValue(0),

//     locked: useSharedValue(1),

//     goalX: useSharedValue(0),
//     goalY: useSharedValue(0),
//     goalR: useSharedValue(0),
//   };

//   // ==========================================================
//   // Tutorial Shared Values (UI thread 즉시 취소용)
//   // ==========================================================

//   /** 1 = Level 1 자동 시연 중. 터치 시 GameBoard 에서 즉시 0 */
//   const tutorialActive = useSharedValue<number>(0);
//   /** TutPhase 값 (0~4). 리터럴 0 추론을 막기 위해 number 로 명시 */
//   const tutorialPhase = useSharedValue<number>(TutPhase.IDLE);
//   /** 현재 단계에서 경과한 시간 (초) */
//   const tutorialElapsed = useSharedValue<number>(0);
//   /** 시연용 가짜 구슬 (물리와 분리, 별 중심까지 이동) */
//   const tutBallX = useSharedValue<number>(-100);
//   const tutBallY = useSharedValue<number>(-100);
//   const tutBallOpacity = useSharedValue<number>(0);
//   const tutBallRadius = useSharedValue<number>(GAME_CONFIG.BALL_RADIUS);
//   /** 시연 중 실제 구슬 숨김 (1=보임, 0=숨김) */
//   const realBallVisibility = useSharedValue<number>(1);

//   /**
//    * 시연이 끝난 뒤 타이머를 켜야 하는지 JS 와 동기화.
//    * false = 아직 시연 중, true = 플레이 가능(타이머 가동)
//    */
//   const [tutorialDone, setTutorialDone] = useState(true);

//   // ==========================================================
//   // Success Animation Shared Values
//   // ==========================================================

//   // 1 = 흡수 애니메이션 진행 중
//   const successAnimationActive = useSharedValue<number>(0);

//   // 애니메이션 경과 시간 (초)
//   const successAnimationElapsed = useSharedValue<number>(0);

//   // 0 ~ 1 전체 진행률
//   const successProgress = useSharedValue<number>(0);

//   // 전체 애니메이션 길이
//   const SUCCESS_ANIMATION_SECONDS = 0.9;

//   // 파티클 폭발 효과음 중복 재생 방지
//   const successBurstSoundTriggered = useSharedValue<number>(0);

//   // ==========================================================
//   // Game State
//   // ==========================================================

//   const [game, dispatch] = useReducer(gameReducer, undefined, () =>
//     createGame(1, LEVEL_CONFIGS[0].roundCount),
//   );

//   const { levelId, roundIndex } = game;

//   /** size = 실제 미로 크기. 물리/벽/구슬 좌표의 기준 */
//   const [size, setSize] = useState<{
//     w: number;
//     h: number;
//   } | null>(null);

//   /** 투명 여유 공간 두께 (눈에 보이는 게임판 - 실제 미로) */
//   const [margin, setMargin] = useState(0);

//   const baseConfig = getLevelConfig(levelId);

//   const playing = game.phase === "PLAYING";

//   // ==========================================================
//   // Board Layout
//   // ==========================================================

//   // 눈에 보이는 게임판 크기가 측정되면 → 실제 미로 크기 + 투명 여유 공간을 계산한다.
//   const onBoardLayout = useCallback(
//     (boardW: number, boardH: number) => {
//       if (boardW < 1 || boardH < 1) return;

//       const layout = computeBoardLayout(boardW, boardH);
//       const w = layout.mazeW;
//       const h = layout.mazeH;

//       s.boardW.value = w;
//       s.boardH.value = h;
//       s.penMargin.value = layout.margin;

//       if (s.ballX.value < 0 || s.ballY.value < 0) {
//         const r =
//           s.ballRadius.value > 1 ? s.ballRadius.value : GAME_CONFIG.BALL_RADIUS;

//         s.ballX.value = w * 0.5;
//         s.ballY.value = h * 0.5;
//         s.ballRadius.value = r;
//       }

//       setMargin((prev) => (prev === layout.margin ? prev : layout.margin));
//       setSize((prev) =>
//         prev && Math.abs(prev.w - w) < 0.5 && Math.abs(prev.h - h) < 0.5
//           ? prev
//           : { w, h },
//       );
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [],
//   );

//   // ==========================================================
//   // Level Configuration
//   // ==========================================================

//   const config = useMemo(
//     () => (size ? fitConfigToBoard(baseConfig, size.w) : baseConfig),
//     [baseConfig, size],
//   );

//   // ==========================================================
//   // Round Generation
//   // ==========================================================

//   const { round, error } = useMemo(() => {
//     if (!size) {
//       return {
//         round: null,
//         error: null,
//       };
//     }

//     try {
//       return {
//         round: generateRound(config, roundIndex, {
//           boardAspect: size.w / size.h,
//           boardWidthPx: size.w,
//           // 레벨 플레이마다 고정된 시드 → 리렌더링/라운드 재시작에도 같은 미로, 레벨 재시작 시 새 미로
//           baseSeed: game.sessionSeed,
//         }),
//         error: null,
//       };
//     } catch (e) {
//       return {
//         round: null,
//         error: e instanceof Error ? e.message : String(e),
//       };
//     }
//   }, [config, roundIndex, size, game.sessionSeed]);

//   // ==========================================================
//   // Wall Geometry
//   // ==========================================================

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

//   // ==========================================================
//   // Resolve Round
//   // ==========================================================

//   const resolvedSerial = useRef(-1);

//   const resolve = useCallback(
//     (kind: "SUCCESS" | "FAIL") => {
//       if (resolvedSerial.current === game.serial) {
//         return;
//       }

//       resolvedSerial.current = game.serial;

//       // 라운드 종료 시 조작과 물리 정지
//       s.locked.value = 1;
//       s.penActive.value = 0;
//       // 시연 중이면 강제 종료
//       tutorialActive.value = 0;
//       tutorialPhase.value = TutPhase.IDLE;
//       tutBallOpacity.value = 0;
//       realBallVisibility.value = 1;

//       dispatch({
//         type: kind,
//       });
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [game.serial],
//   );

//   const resolveRef = useRef(resolve);

//   resolveRef.current = resolve;

//   const onArriveJS = useCallback(() => {
//     resolveRef.current("SUCCESS");
//   }, []);

//   const onGoalAnimationStartJS = useCallback(() => {
//     playMagnetGoalSound();
//   }, []);

//   const onSuccessBurstJS = useCallback(() => {
//     playSound("correct_sound");
//   }, []);
//   // ==========================================================
//   // Tutorial end / interrupt → JS 타이머 동기화
//   // ==========================================================

//   const endTutorialJS = useCallback(() => {
//     setTutorialDone(true);
//   }, []);

//   const endTutorialJSRef = useRef(endTutorialJS);
//   endTutorialJSRef.current = endTutorialJS;

//   const onEndTutorialFromWorklet = useCallback(() => {
//     endTutorialJSRef.current();
//   }, []);

//   const onTutorialInterrupted = useCallback(() => {
//     // GameBoard worklet 에서 tutorialActive 를 이미 0 으로 내림
//     tutorialPhase.value = TutPhase.IDLE;
//     tutBallOpacity.value = 0;
//     realBallVisibility.value = 1;
//     endTutorialJSRef.current();
//   }, []);

//   // ==========================================================
//   // Physics + Arrival Detection + Tutorial
//   // ==========================================================

//   useFrameCallback((frame) => {
//     "worklet";

//     const ms = frame.timeSincePreviousFrame;

//     if (ms == null || s.boardW.value === 0) {
//       return;
//     }

//     const dt = Math.min(ms / 1000, GAME_CONFIG.MAX_DT);

//     // ── 정답 흡수 애니메이션 ──
//     // 물리엔진이 잠겨 있어도 이 애니메이션은 계속 실행한다.
//     // if (successAnimationActive.value === 1) {
//     //   successAnimationElapsed.value += dt;

//     //   const progress = Math.min(
//     //     1,
//     //     successAnimationElapsed.value / SUCCESS_ANIMATION_SECONDS,
//     //   );

//     //   successProgress.value = progress;

//     //   if (progress >= 1) {
//     //     successAnimationActive.value = 0;

//     //     // 애니메이션이 완전히 끝난 후 기존 성공 처리
//     //     runOnJS(onArriveJS)();
//     //   }

//     //   return;
//     // }

//     // ── 정답 흡수 애니메이션 ──
//     if (successAnimationActive.value === 1) {
//       successAnimationElapsed.value += dt;

//       const progress = Math.min(
//         1,
//         successAnimationElapsed.value / SUCCESS_ANIMATION_SECONDS,
//       );

//       successProgress.value = progress;

//       // 파티클이 터지는 시점에 정답 효과음 한 번 재생
//       if (progress >= 0.58 && successBurstSoundTriggered.value === 0) {
//         successBurstSoundTriggered.value = 1;
//         runOnJS(onSuccessBurstJS)();
//       }

//       if (progress >= 1) {
//         successAnimationActive.value = 0;
//         runOnJS(onArriveJS)();
//       }

//       return;
//     }

//     // 기존 라운드 종료 상태라면 물리 계산 중단
//     if (s.locked.value === 1) {
//       return;
//     }

//     // ── 자동 시연: 실제 펜 + 가짜 구슬로 별 중심까지 ──
//     if (tutorialActive.value === 1) {
//       tutorialElapsed.value += dt;
//       const phase = tutorialPhase.value;

//       if (phase === TutPhase.APPROACH) {
//         // 자석 팁이 시연 구슬 쪽으로 천천히 접근
//         const tip = getTip(s.penX.value, s.penY.value);
//         const bx = tutBallX.value;
//         const by = tutBallY.value;
//         const dx = bx - tip.x;
//         const dy = by - tip.y;
//         const dist = Math.sqrt(dx * dx + dy * dy);

//         s.penActive.value = 1;

//         if (dist <= TUTORIAL_ATTACH_DISTANCE) {
//           tutorialPhase.value = TutPhase.ATTACH;
//           tutorialElapsed.value = 0;
//           // 팁에 스냅
//           tutBallX.value = tip.x;
//           tutBallY.value = tip.y;
//         } else if (dist > 0.5) {
//           const step = Math.min(TUTORIAL_PEN_SPEED * dt, dist);
//           const nx = tip.x + (dx / dist) * step;
//           const ny = tip.y + (dy / dist) * step;
//           const fingerX = nx - GAME_CONFIG.TIP_OFFSET_X;
//           const fingerY = ny - GAME_CONFIG.TIP_OFFSET_Y;
//           movePen(s, fingerX, fingerY, false);
//         }
//       } else if (phase === TutPhase.ATTACH) {
//         // 짧게 붙인 느낌을 보여 준 뒤 이동
//         s.penActive.value = 1;
//         const tip = getTip(s.penX.value, s.penY.value);
//         tutBallX.value = tip.x;
//         tutBallY.value = tip.y;
//         if (tutorialElapsed.value > 0.2) {
//           tutorialPhase.value = TutPhase.MOVE_TO_GOAL;
//           tutorialElapsed.value = 0;
//         }
//       } else if (phase === TutPhase.MOVE_TO_GOAL) {
//         s.penActive.value = 1;

//         const tip = getTip(s.penX.value, s.penY.value);
//         // 별(목적지) 한가운데
//         const gx = s.goalX.value;
//         const gy = s.goalY.value;

//         const dx = gx - tip.x;
//         const dy = gy - tip.y;
//         const dist = Math.sqrt(dx * dx + dy * dy);

//         if (dist <= TUTORIAL_GOAL_ARRIVE) {
//           // 팁·시연구슬을 별 중심에 고정
//           const fingerX = gx - GAME_CONFIG.TIP_OFFSET_X;
//           const fingerY = gy - GAME_CONFIG.TIP_OFFSET_Y;
//           movePen(s, fingerX, fingerY, false);
//           const tip2 = getTip(s.penX.value, s.penY.value);
//           tutBallX.value = tip2.x;
//           tutBallY.value = tip2.y;
//           tutorialPhase.value = TutPhase.FINISHING;
//           tutorialElapsed.value = 0;
//         } else if (dist > 0.5) {
//           const step = Math.min(TUTORIAL_PEN_SPEED * dt, dist);
//           const nx = tip.x + (dx / dist) * step;
//           const ny = tip.y + (dy / dist) * step;
//           const fingerX = nx - GAME_CONFIG.TIP_OFFSET_X;
//           const fingerY = ny - GAME_CONFIG.TIP_OFFSET_Y;
//           movePen(s, fingerX, fingerY, false);
//           const tip2 = getTip(s.penX.value, s.penY.value);
//           tutBallX.value = tip2.x;
//           tutBallY.value = tip2.y;
//         }
//       } else if (phase === TutPhase.FINISHING) {
//         // 별 위에서 잠깐 보여 준 뒤 페이드아웃
//         const tip = getTip(s.penX.value, s.penY.value);
//         tutBallX.value = tip.x;
//         tutBallY.value = tip.y;

//         if (tutorialElapsed.value > TUTORIAL_FINISH_HOLD) {
//           const fadeT = tutorialElapsed.value - TUTORIAL_FINISH_HOLD;
//           const fade = Math.max(0, 1 - fadeT / TUTORIAL_FADE_OUT);
//           tutBallOpacity.value = fade;

//           if (fadeT >= TUTORIAL_FADE_OUT) {
//             s.penActive.value = 0;
//             tutorialActive.value = 0;
//             tutorialPhase.value = TutPhase.IDLE;
//             tutBallOpacity.value = 0;
//             realBallVisibility.value = 1;
//             runOnJS(onEndTutorialFromWorklet)();
//           }
//         }
//       }

//       // 시연 중에는 물리 구슬을 움직이지 않음 (시작 위치 유지)
//       return;
//     }

//     // 기존 물리 한 스텝
//     stepPhysics(s, dt);

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

//       successAnimationElapsed.value = 0;
//       successProgress.value = 0;
//       successBurstSoundTriggered.value = 0;

//       successAnimationActive.value = 1;

//       // 흡수 애니메이션 시작과 동시에 블랙홀 효과음
//       runOnJS(onGoalAnimationStartJS)();
//     }
//   });

//   // ==========================================================
//   // Place Ball + Initialize Round
//   // ==========================================================

//   const placeStart = useCallback(() => {
//     if (!round || !size) return;

//     const r =
//       config.ballRadius > 1 ? config.ballRadius : GAME_CONFIG.BALL_RADIUS;

//     s.ballRadius.value = r;

//     // 이전 라운드의 성공 애니메이션 초기화
//     successAnimationActive.value = 0;
//     successAnimationElapsed.value = 0;
//     successProgress.value = 0;
//     successBurstSoundTriggered.value = 0;

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

//     // 펜 속도 기준점 초기화 (시연 시작 시 튀지 않게)
//     const tip0 = getTip(s.penX.value, s.penY.value);
//     s.prevTipX.value = tip0.x;
//     s.prevTipY.value = tip0.y;
//     s.penVX.value = 0;
//     s.penVY.value = 0;

//     s.goalX.value = round.goalPosition.x * size.w;

//     s.goalY.value = round.goalPosition.y * size.h;

//     s.goalR.value = goalArrivalRadiusFor(
//       config.walls.hasWalls ? config.walls.corridorWidth : undefined,
//     );

//     s.locked.value = 0;

//     // Level 1 전 라운드(1~5) 진입 시 자동 시연
//     // Level 2 이상에서는 실행하지 않음
//     if (shouldRunMazeTutorial(levelId)) {
//       // 시연 구슬을 실제 시작 위치에 두고, 실제 구슬은 잠시 숨김
//       tutBallX.value = sx;
//       tutBallY.value = sy;
//       tutBallRadius.value = r;
//       tutBallOpacity.value = 1;
//       realBallVisibility.value = 0;

//       tutorialActive.value = 1;
//       tutorialPhase.value = TutPhase.APPROACH;
//       tutorialElapsed.value = 0;
//       // 타이머는 시연이 끝나거나 아이가 터치할 때까지 대기
//       setTutorialDone(false);
//       // 시연 시작: 펜 활성화 (시각적으로 잡는 느낌)
//       s.penActive.value = 1;
//       const tip = getTip(s.penX.value, s.penY.value);
//       s.prevTipX.value = tip.x;
//       s.prevTipY.value = tip.y;
//     } else {
//       tutorialActive.value = 0;
//       tutorialPhase.value = TutPhase.IDLE;
//       tutorialElapsed.value = 0;
//       tutBallOpacity.value = 0;
//       realBallVisibility.value = 1;
//       setTutorialDone(true);
//     }
//   }, [round, size, walls, config, levelId, roundIndex]);

//   useEffect(() => {
//     if (playing) {
//       placeStart();
//     } else {
//       // 결과 화면 등에서는 시연 정리
//       tutorialActive.value = 0;
//       tutorialPhase.value = TutPhase.IDLE;
//       tutBallOpacity.value = 0;
//       realBallVisibility.value = 1;
//       setTutorialDone(true);
//     }
//   }, [placeStart, game.serial, playing, levelId, roundIndex]);

//   // ==========================================================
//   // Timer (시연 중에는 정지)
//   // ==========================================================

//   const totalMs = config.timeLimitSeconds * 1000;

//   const [timeLeft, setTimeLeft] = useState(totalMs);

//   // 시연이 끝나야(또는 시연 대상이 아니어야) 타이머 가동
//   const timerActive = playing && !!round && tutorialDone;

//   useEffect(() => {
//     if (!timerActive) return;

//     const start = Date.now();

//     setTimeLeft(totalMs);

//     const id = setInterval(() => {
//       // 성공 애니메이션이 시작되면 타이머 정지
//       if (s.locked.value === 1) {
//         clearInterval(id);
//         return;
//       }
//       const left = remainingMs(start, Date.now(), totalMs);

//       setTimeLeft(left);

//       if (left <= 0) {
//         clearInterval(id);

//         // 시간 초과: 별을 얻지 못하고 라운드 종료
//         // 별도의 실패 팝업은 표시하지 않는다.
//         resolveRef.current("FAIL");
//       }
//     }, 50);

//     return () => clearInterval(id);
//   }, [timerActive, game.serial, totalMs]);

//   // ==========================================================
//   // Automatic Next Round
//   // ==========================================================

//   // useEffect(() => {
//   //   if (game.phase !== "ROUND_RESULT") {
//   //     return;
//   //   }

//   //   const id = setTimeout(() => {
//   //     dispatch({
//   //       type: "NEXT",
//   //     });
//   //   }, AUTO_ADVANCE_MS);

//   //   return () => clearTimeout(id);
//   // }, [game.phase, game.serial, game.roundIndex]);

//   useEffect(() => {
//     if (game.phase !== "ROUND_RESULT") return;

//     const result = game.results[game.roundIndex];

//     const delay = result === "success" ? 150 : AUTO_ADVANCE_MS;

//     const id = setTimeout(() => {
//       dispatch({ type: "NEXT" });
//     }, delay);

//     return () => clearTimeout(id);
//   }, [game.phase, game.serial, game.roundIndex]);
//   // ==========================================================
//   // Level Actions
//   // ==========================================================

//   const startLevel = useCallback((id: number) => {
//     dispatch({
//       type: "START_LEVEL",
//       levelId: id,
//       roundCount: getLevelConfig(id).roundCount,
//       sessionSeed: newSessionSeed(),
//     });
//   }, []);

//   const restartLevel = useCallback(() => {
//     startLevel(levelId);
//   }, [startLevel, levelId]);

//   const nextLevelId = LEVEL_CONFIGS.find((c) => c.levelId > levelId)?.levelId;

//   // ==========================================================
//   // Stars
//   // ==========================================================

//   const earnedStars = starsOf(game.results);

//   // ==========================================================
//   // Navigation Actions
//   // ==========================================================

//   const handleBack = useCallback(() => {
//     if (onBack) onBack();
//     else navigation.goBack();
//   }, [onBack, navigation]);

//   const handleHome = useCallback(() => {
//     if (onHome) onHome();
//     else navigation.reset({ index: 0, routes: [{ name: "Home" }] });
//   }, [onHome, navigation]);

//   const handleGoRoadmap = useCallback(() => {
//     if (onGoRoadmap) onGoRoadmap();
//     else navigation.goBack();
//   }, [onGoRoadmap, navigation]);

//   // 테스트 컨트롤: 이전/다음 라운드 이동
//   const gotoRound = useCallback((index: number) => {
//     dispatch({ type: "GOTO_ROUND", roundIndex: index });
//   }, []);

//   const handleNextLevel = useCallback(() => {
//     if (nextLevelId !== undefined) {
//       startLevel(nextLevelId);
//     }
//   }, [nextLevelId, startLevel]);

//   // ==========================================================
//   // Render
//   // ==========================================================

//   return (
//     <View
//       style={{
//         flex: 1,
//         paddingTop: insets.top,
//         paddingBottom: insets.bottom,
//         backgroundColor: "#eef0fe",
//       }}
//     >
//       {/* 배경: 분류게임/패턴게임과 동일한 Kids Playground 보라 계열 */}
//       <LinearGradient
//         colors={["#D9EAFF", "#EEE8FF", "#F8F5FF"]}
//         style={StyleSheet.absoluteFill}
//       />

//       {/* 1. 공통 헤더 */}
//       <AppHeader
//         onBackPress={handleBack}
//         title={
//           <StarRow
//             earnedStars={earnedStars}
//             totalStars={game.roundCount}
//             gameType="maze"
//             size={30}
//           />
//         }
//       />

//       <Container>
//         {/* 2. 타이머 */}
//         <TimeBar remainingMs={timeLeft} totalMs={totalMs} />

//         {error && <ErrorText>{error}</ErrorText>}

//         {/* 3. 게임판: 남는 공간 전체. 안쪽에 투명 여유 공간 + 실제 미로 */}
//         <GameArea>
//           <GameBoard
//             s={s}
//             margin={margin}
//             mazeW={size?.w ?? 0}
//             mazeH={size?.h ?? 0}
//             onBoardLayout={onBoardLayout}
//             tutorialActive={tutorialActive}
//             onTutorialInterrupted={onTutorialInterrupted}
//           >
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

//             <IronBall
//               s={s}
//               visibility={realBallVisibility}
//               absorbProgress={successProgress}
//             />

//             <GoalBurst s={s} progress={successProgress} />

//             <TutorialGhostBall
//               x={tutBallX}
//               y={tutBallY}
//               opacity={tutBallOpacity}
//               radius={tutBallRadius}
//             />
//           </GameBoard>
//         </GameArea>

//         {/* 4. 라운드 진행: 분류/패턴게임과 같은 Footer */}
//         <FooterWrapper collapsable={false}>
//           <ColorSortingFooter
//             totalRounds={game.roundCount}
//             roundIndex={roundIndex}
//           />
//         </FooterWrapper>

//         {SHOW_TEST_CONTROLS && (
//           <ClassificationTestControls
//             level={levelId}
//             totalLevels={LEVEL_CONFIGS.length}
//             roundIndex={roundIndex}
//             totalRounds={game.roundCount}
//             onChangeLevel={startLevel}
//             onPreviousRound={() => gotoRound(roundIndex - 1)}
//             onNextRound={() => gotoRound(roundIndex + 1)}
//           />
//         )}
//       </Container>

//       {/* 5. 레벨 완료 결과 화면 */}
//       {game.phase === "LEVEL_RESULT" && (
//         <ResultOverlay
//           level={levelId}
//           earnedStars={earnedStars}
//           isLastLevel={nextLevelId === undefined}
//           gameType="maze"
//           onHome={handleHome}
//           onRestart={restartLevel}
//           onNextLevel={handleNextLevel}
//           onGoRoadmap={handleGoRoadmap}
//         />
//       )}
//     </View>
//   );
// }

// // ============================================================
// // Styles
// // ============================================================

// const Container = styled.View`
//   flex: 1;
//   padding-left: 16px;
//   padding-right: 16px;
//   padding-bottom: 8px;
// `;

// const ErrorText = styled.Text`
//   color: #b91c1c;
//   padding: 0 4px 4px;
//   font-size: 12px;
// `;

// const GameArea = styled.View`
//   flex: 1;
//   direction: ltr;
// `;

// const FooterWrapper = styled.View`
//   width: 100%;
//   height: 44px;
//   justify-content: center;
//   margin-top: 4px;
//   margin-bottom: 4px;
// `;

import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";

import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  runOnJS,
  useFrameCallback,
  useSharedValue,
} from "react-native-reanimated";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

// ============================================================
// Kids Playground 공통 컴포넌트
// ============================================================

import AppHeader from "../../components/AppHeader";
import ColorSortingFooter from "../../components/ColorSorting/ColorSortingFooter";
import ClassificationTestControls from "../../components/common/ClassificationTestControls";
import { RootStackParamList } from "../../navigation/types";
import { computeBoardLayout } from "../../utils/magnetMaze/boardLayout";
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

// ============================================================
// Magnet Maze 게임 로직
// ============================================================

import { GAME_CONFIG } from "../../constants/magnetMaze/gameConfig";

import {
  goalArrivalRadiusFor,
  isArrived,
} from "../../games/magnetMaze/game/arrival";

import {
  AUTO_ADVANCE_MS,
  createGame,
  gameReducer,
  newSessionSeed,
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

import {
  getTip,
  movePen,
  stepPhysics,
} from "../../games/magnetMaze/physics/physicsEngine";

import {
  BallMode,
  type PhysicsShared,
} from "../../games/magnetMaze/physics/physicsTypes";
import StarRow from "../../design-system/components/StarRow";

import { TutorialGhostBall } from "../../components/Tutorial/MagnetMaze/TutorialGoastBall";
import {
  TutPhase,
  TUTORIAL_PEN_SPEED,
  TUTORIAL_ATTACH_DISTANCE,
  TUTORIAL_GOAL_ARRIVE,
  TUTORIAL_FINISH_HOLD,
  TUTORIAL_FADE_OUT,
  shouldRunMazeTutorial,
} from "../../components/Tutorial/MagnetMaze/MazeTutorialController";
import { GoalBurst } from "../../components/MagnetMaze/GoalBurst";
import { useBackgroundMusic } from "../../utils/BackgroundMusicContext";
import {
  playEarnedNotes,
  playMagnetGoalSound,
  playMagnetWallSound,
  playSound,
} from "../../utils/sound";
import { triggerHaptic } from "../../utils/haptic";

// ============================================================
// Constants
// ============================================================

/** 개발/테스트용 레벨·라운드 컨트롤 (다른 게임과 동일하게 기본 숨김) */
const SHOW_TEST_CONTROLS = true;

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

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
};

// ============================================================
// Screen
// ============================================================

export default function MagnetMazePlayScreen({
  onBack,
  onHome,
  onGoRoadmap,
}: Props) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProps>();

  const { playThemeBGM } = useBackgroundMusic();

  useEffect(() => {
    playThemeBGM("game");
    return () => {
      playThemeBGM("main");
    };
  }, []);

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
    penMargin: useSharedValue(0),

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

    wallCollisionEvent: useSharedValue(0),
    wallCollisionIntensity: useSharedValue(0),
    wallContactTime: useSharedValue(0),
    wallContactNormals: useSharedValue<number[]>([0, 0, 0, 0, 0]),
  };

  // 이미 소리를 낸 충돌 번호 (UI 스레드 전용)
  const lastWallEventHandled = useSharedValue(0);

  // ==========================================================
  // Tutorial Shared Values (UI thread 즉시 취소용)
  // ==========================================================

  /** 1 = Level 1 자동 시연 중. 터치 시 GameBoard 에서 즉시 0 */
  const tutorialActive = useSharedValue<number>(0);
  /** TutPhase 값 (0~4). 리터럴 0 추론을 막기 위해 number 로 명시 */
  const tutorialPhase = useSharedValue<number>(TutPhase.IDLE);
  /** 현재 단계에서 경과한 시간 (초) */
  const tutorialElapsed = useSharedValue<number>(0);
  /** 시연용 가짜 구슬 (물리와 분리, 별 중심까지 이동) */
  const tutBallX = useSharedValue<number>(-100);
  const tutBallY = useSharedValue<number>(-100);
  const tutBallOpacity = useSharedValue<number>(0);
  const tutBallRadius = useSharedValue<number>(GAME_CONFIG.BALL_RADIUS);
  /** 시연 중 실제 구슬 숨김 (1=보임, 0=숨김) */
  const realBallVisibility = useSharedValue<number>(1);

  /**
   * 시연이 끝난 뒤 타이머를 켜야 하는지 JS 와 동기화.
   * false = 아직 시연 중, true = 플레이 가능(타이머 가동)
   */
  const [tutorialDone, setTutorialDone] = useState(true);

  // ==========================================================
  // Success Animation Shared Values
  // ==========================================================

  // 1 = 흡수 애니메이션 진행 중
  const successAnimationActive = useSharedValue<number>(0);

  // 애니메이션 경과 시간 (초)
  const successAnimationElapsed = useSharedValue<number>(0);

  // 0 ~ 1 전체 진행률
  const successProgress = useSharedValue<number>(0);

  // 전체 애니메이션 길이
  const SUCCESS_ANIMATION_SECONDS = 0.9;

  // 파티클 폭발 효과음 중복 재생 방지
  const successBurstSoundTriggered = useSharedValue<number>(0);

  // ==========================================================
  // Game State
  // ==========================================================

  const [game, dispatch] = useReducer(gameReducer, undefined, () =>
    createGame(1, LEVEL_CONFIGS[0].roundCount),
  );

  const { levelId, roundIndex } = game;

  /** size = 실제 미로 크기. 물리/벽/구슬 좌표의 기준 */
  const [size, setSize] = useState<{
    w: number;
    h: number;
  } | null>(null);

  /** 투명 여유 공간 두께 (눈에 보이는 게임판 - 실제 미로) */
  const [margin, setMargin] = useState(0);

  const baseConfig = getLevelConfig(levelId);

  const playing = game.phase === "PLAYING";

  // ==========================================================
  // Board Layout
  // ==========================================================

  // 눈에 보이는 게임판 크기가 측정되면 → 실제 미로 크기 + 투명 여유 공간을 계산한다.
  const onBoardLayout = useCallback(
    (boardW: number, boardH: number) => {
      if (boardW < 1 || boardH < 1) return;

      const layout = computeBoardLayout(boardW, boardH);
      const w = layout.mazeW;
      const h = layout.mazeH;

      s.boardW.value = w;
      s.boardH.value = h;
      s.penMargin.value = layout.margin;

      if (s.ballX.value < 0 || s.ballY.value < 0) {
        const r =
          s.ballRadius.value > 1 ? s.ballRadius.value : GAME_CONFIG.BALL_RADIUS;

        s.ballX.value = w * 0.5;
        s.ballY.value = h * 0.5;
        s.ballRadius.value = r;
      }

      setMargin((prev) => (prev === layout.margin ? prev : layout.margin));
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
          // 레벨 플레이마다 고정된 시드 → 리렌더링/라운드 재시작에도 같은 미로, 레벨 재시작 시 새 미로
          baseSeed: game.sessionSeed,
        }),
        error: null,
      };
    } catch (e) {
      return {
        round: null,
        error: e instanceof Error ? e.message : String(e),
      };
    }
  }, [config, roundIndex, size, game.sessionSeed]);

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
      // 시연 중이면 강제 종료
      tutorialActive.value = 0;
      tutorialPhase.value = TutPhase.IDLE;
      tutBallOpacity.value = 0;
      realBallVisibility.value = 1;

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

  const onGoalAnimationStartJS = useCallback(() => {
    playMagnetGoalSound();
  }, []);

  const onSuccessBurstJS = useCallback(() => {
    playSound("correct_sound");
  }, []);

  // 쇠구슬이 벽/보드 경계에 부딪힘 → 효과음 (볼륨은 강도에 비례)
  const onMagnetWallCollisionJS = useCallback((intensity: number) => {
    playMagnetWallSound(intensity);
  }, []);

  // 자석펜을 잡음 → grab 효과음 + 가벼운 햅틱
  const onPenGrabJS = useCallback(() => {
    playSound("grab");
    triggerHaptic("light");
  }, []);
  // ==========================================================
  // Tutorial end / interrupt → JS 타이머 동기화
  // ==========================================================

  const endTutorialJS = useCallback(() => {
    setTutorialDone(true);
  }, []);

  const endTutorialJSRef = useRef(endTutorialJS);
  endTutorialJSRef.current = endTutorialJS;

  const onEndTutorialFromWorklet = useCallback(() => {
    endTutorialJSRef.current();
  }, []);

  const onTutorialInterrupted = useCallback(() => {
    // GameBoard worklet 에서 tutorialActive 를 이미 0 으로 내림
    tutorialPhase.value = TutPhase.IDLE;
    tutBallOpacity.value = 0;
    realBallVisibility.value = 1;
    endTutorialJSRef.current();
  }, []);

  // ==========================================================
  // Physics + Arrival Detection + Tutorial
  // ==========================================================

  useFrameCallback((frame) => {
    "worklet";

    const ms = frame.timeSincePreviousFrame;

    if (ms == null || s.boardW.value === 0) {
      return;
    }

    const dt = Math.min(ms / 1000, GAME_CONFIG.MAX_DT);

    // ── 정답 흡수 애니메이션 ──
    // 물리엔진이 잠겨 있어도 이 애니메이션은 계속 실행한다.
    // if (successAnimationActive.value === 1) {
    //   successAnimationElapsed.value += dt;

    //   const progress = Math.min(
    //     1,
    //     successAnimationElapsed.value / SUCCESS_ANIMATION_SECONDS,
    //   );

    //   successProgress.value = progress;

    //   if (progress >= 1) {
    //     successAnimationActive.value = 0;

    //     // 애니메이션이 완전히 끝난 후 기존 성공 처리
    //     runOnJS(onArriveJS)();
    //   }

    //   return;
    // }

    // ── 정답 흡수 애니메이션 ──
    if (successAnimationActive.value === 1) {
      successAnimationElapsed.value += dt;

      const progress = Math.min(
        1,
        successAnimationElapsed.value / SUCCESS_ANIMATION_SECONDS,
      );

      successProgress.value = progress;

      // 파티클이 터지는 시점에 정답 효과음 한 번 재생
      if (progress >= 0.58 && successBurstSoundTriggered.value === 0) {
        successBurstSoundTriggered.value = 1;
        runOnJS(onSuccessBurstJS)();
      }

      if (progress >= 1) {
        successAnimationActive.value = 0;
        runOnJS(onArriveJS)();
      }

      return;
    }

    // 기존 라운드 종료 상태라면 물리 계산 중단
    if (s.locked.value === 1) {
      return;
    }

    // ── 자동 시연: 실제 펜 + 가짜 구슬로 별 중심까지 ──
    if (tutorialActive.value === 1) {
      tutorialElapsed.value += dt;
      const phase = tutorialPhase.value;

      if (phase === TutPhase.APPROACH) {
        // 자석 팁이 시연 구슬 쪽으로 천천히 접근
        const tip = getTip(s.penX.value, s.penY.value);
        const bx = tutBallX.value;
        const by = tutBallY.value;
        const dx = bx - tip.x;
        const dy = by - tip.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        s.penActive.value = 1;

        if (dist <= TUTORIAL_ATTACH_DISTANCE) {
          tutorialPhase.value = TutPhase.ATTACH;
          tutorialElapsed.value = 0;
          // 팁에 스냅
          tutBallX.value = tip.x;
          tutBallY.value = tip.y;
        } else if (dist > 0.5) {
          const step = Math.min(TUTORIAL_PEN_SPEED * dt, dist);
          const nx = tip.x + (dx / dist) * step;
          const ny = tip.y + (dy / dist) * step;
          const fingerX = nx - GAME_CONFIG.TIP_OFFSET_X;
          const fingerY = ny - GAME_CONFIG.TIP_OFFSET_Y;
          movePen(s, fingerX, fingerY, false);
        }
      } else if (phase === TutPhase.ATTACH) {
        // 짧게 붙인 느낌을 보여 준 뒤 이동
        s.penActive.value = 1;
        const tip = getTip(s.penX.value, s.penY.value);
        tutBallX.value = tip.x;
        tutBallY.value = tip.y;
        if (tutorialElapsed.value > 0.2) {
          tutorialPhase.value = TutPhase.MOVE_TO_GOAL;
          tutorialElapsed.value = 0;
        }
      } else if (phase === TutPhase.MOVE_TO_GOAL) {
        s.penActive.value = 1;

        const tip = getTip(s.penX.value, s.penY.value);
        // 별(목적지) 한가운데
        const gx = s.goalX.value;
        const gy = s.goalY.value;

        const dx = gx - tip.x;
        const dy = gy - tip.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist <= TUTORIAL_GOAL_ARRIVE) {
          // 팁·시연구슬을 별 중심에 고정
          const fingerX = gx - GAME_CONFIG.TIP_OFFSET_X;
          const fingerY = gy - GAME_CONFIG.TIP_OFFSET_Y;
          movePen(s, fingerX, fingerY, false);
          const tip2 = getTip(s.penX.value, s.penY.value);
          tutBallX.value = tip2.x;
          tutBallY.value = tip2.y;
          tutorialPhase.value = TutPhase.FINISHING;
          tutorialElapsed.value = 0;
        } else if (dist > 0.5) {
          const step = Math.min(TUTORIAL_PEN_SPEED * dt, dist);
          const nx = tip.x + (dx / dist) * step;
          const ny = tip.y + (dy / dist) * step;
          const fingerX = nx - GAME_CONFIG.TIP_OFFSET_X;
          const fingerY = ny - GAME_CONFIG.TIP_OFFSET_Y;
          movePen(s, fingerX, fingerY, false);
          const tip2 = getTip(s.penX.value, s.penY.value);
          tutBallX.value = tip2.x;
          tutBallY.value = tip2.y;
        }
      } else if (phase === TutPhase.FINISHING) {
        // 별 위에서 잠깐 보여 준 뒤 페이드아웃
        const tip = getTip(s.penX.value, s.penY.value);
        tutBallX.value = tip.x;
        tutBallY.value = tip.y;

        if (tutorialElapsed.value > TUTORIAL_FINISH_HOLD) {
          const fadeT = tutorialElapsed.value - TUTORIAL_FINISH_HOLD;
          const fade = Math.max(0, 1 - fadeT / TUTORIAL_FADE_OUT);
          tutBallOpacity.value = fade;

          if (fadeT >= TUTORIAL_FADE_OUT) {
            s.penActive.value = 0;
            tutorialActive.value = 0;
            tutorialPhase.value = TutPhase.IDLE;
            tutBallOpacity.value = 0;
            realBallVisibility.value = 1;
            runOnJS(onEndTutorialFromWorklet)();
          }
        }
      }

      // 시연 중에는 물리 구슬을 움직이지 않음 (시작 위치 유지)
      return;
    }

    // 기존 물리 한 스텝
    stepPhysics(s, dt);

    // 새 벽 충돌이 있었으면 JS 스레드로 효과음 요청
    // (한 프레임에 여러 번 부딪혀도 카운터만 보고 가장 강한 충돌 1회만 전달)
    if (s.wallCollisionEvent.value !== lastWallEventHandled.value) {
      lastWallEventHandled.value = s.wallCollisionEvent.value;
      runOnJS(onMagnetWallCollisionJS)(s.wallCollisionIntensity.value);
    }

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

      successAnimationElapsed.value = 0;
      successProgress.value = 0;
      successBurstSoundTriggered.value = 0;

      successAnimationActive.value = 1;

      // 흡수 애니메이션 시작과 동시에 블랙홀 효과음
      runOnJS(onGoalAnimationStartJS)();
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

    // 이전 라운드의 성공 애니메이션 초기화
    successAnimationActive.value = 0;
    successAnimationElapsed.value = 0;
    successProgress.value = 0;
    successBurstSoundTriggered.value = 0;

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

    // 펜 속도 기준점 초기화 (시연 시작 시 튀지 않게)
    const tip0 = getTip(s.penX.value, s.penY.value);
    s.prevTipX.value = tip0.x;
    s.prevTipY.value = tip0.y;
    s.penVX.value = 0;
    s.penVY.value = 0;

    s.goalX.value = round.goalPosition.x * size.w;

    s.goalY.value = round.goalPosition.y * size.h;

    s.goalR.value = goalArrivalRadiusFor(
      config.walls.hasWalls ? config.walls.corridorWidth : undefined,
    );

    s.locked.value = 0;

    // Level 1 전 라운드(1~5) 진입 시 자동 시연
    // Level 2 이상에서는 실행하지 않음
    if (shouldRunMazeTutorial(levelId)) {
      // 시연 구슬을 실제 시작 위치에 두고, 실제 구슬은 잠시 숨김
      tutBallX.value = sx;
      tutBallY.value = sy;
      tutBallRadius.value = r;
      tutBallOpacity.value = 1;
      realBallVisibility.value = 0;

      tutorialActive.value = 1;
      tutorialPhase.value = TutPhase.APPROACH;
      tutorialElapsed.value = 0;
      // 타이머는 시연이 끝나거나 아이가 터치할 때까지 대기
      setTutorialDone(false);
      // 시연 시작: 펜 활성화 (시각적으로 잡는 느낌)
      s.penActive.value = 1;
      const tip = getTip(s.penX.value, s.penY.value);
      s.prevTipX.value = tip.x;
      s.prevTipY.value = tip.y;
    } else {
      tutorialActive.value = 0;
      tutorialPhase.value = TutPhase.IDLE;
      tutorialElapsed.value = 0;
      tutBallOpacity.value = 0;
      realBallVisibility.value = 1;
      setTutorialDone(true);
    }
  }, [round, size, walls, config, levelId, roundIndex]);

  useEffect(() => {
    if (playing) {
      placeStart();
    } else {
      // 결과 화면 등에서는 시연 정리
      tutorialActive.value = 0;
      tutorialPhase.value = TutPhase.IDLE;
      tutBallOpacity.value = 0;
      realBallVisibility.value = 1;
      setTutorialDone(true);
    }
  }, [placeStart, game.serial, playing, levelId, roundIndex]);

  // ==========================================================
  // Timer (시연 중에는 정지)
  // ==========================================================

  const totalMs = config.timeLimitSeconds * 1000;

  const [timeLeft, setTimeLeft] = useState(totalMs);

  // 시연이 끝나야(또는 시연 대상이 아니어야) 타이머 가동
  const timerActive = playing && !!round && tutorialDone;

  useEffect(() => {
    if (!timerActive) return;

    const start = Date.now();

    setTimeLeft(totalMs);

    const id = setInterval(() => {
      // 성공 애니메이션이 시작되면 타이머 정지
      if (s.locked.value === 1) {
        clearInterval(id);
        return;
      }
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

  // useEffect(() => {
  //   if (game.phase !== "ROUND_RESULT") {
  //     return;
  //   }

  //   const id = setTimeout(() => {
  //     dispatch({
  //       type: "NEXT",
  //     });
  //   }, AUTO_ADVANCE_MS);

  //   return () => clearTimeout(id);
  // }, [game.phase, game.serial, game.roundIndex]);

  useEffect(() => {
    if (game.phase !== "ROUND_RESULT") return;

    const result = game.results[game.roundIndex];

    const delay = result === "success" ? 150 : AUTO_ADVANCE_MS;

    const id = setTimeout(() => {
      dispatch({ type: "NEXT" });
    }, delay);

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
      sessionSeed: newSessionSeed(),
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
  // Earned Notes
  // ==========================================================

  const playedNotesSessionRef = useRef<string | null>(null);

  useEffect(() => {
    if (game.phase !== "LEVEL_RESULT") return;

    const sessionKey = `${levelId}:${game.sessionSeed}`;

    // 동일 레벨 결과에서 중복 재생 방지
    if (playedNotesSessionRef.current === sessionKey) return;

    playedNotesSessionRef.current = sessionKey;

    const noteCount = Math.min(
      game.roundCount,
      Math.max(0, Math.round(earnedStars)),
    );

    if (noteCount > 0) {
      playEarnedNotes(noteCount);
    }
  }, [game.phase, game.sessionSeed, game.roundCount, levelId, earnedStars]);

  // ==========================================================
  // Navigation Actions
  // ==========================================================

  const handleBack = useCallback(() => {
    if (onBack) onBack();
    else navigation.goBack();
  }, [onBack, navigation]);

  const handleHome = useCallback(() => {
    if (onHome) onHome();
    else navigation.reset({ index: 0, routes: [{ name: "Home" }] });
  }, [onHome, navigation]);

  const handleGoRoadmap = useCallback(() => {
    if (onGoRoadmap) onGoRoadmap();
    else navigation.goBack();
  }, [onGoRoadmap, navigation]);

  // 테스트 컨트롤: 이전/다음 라운드 이동
  const gotoRound = useCallback((index: number) => {
    dispatch({ type: "GOTO_ROUND", roundIndex: index });
  }, []);

  const handleNextLevel = useCallback(() => {
    if (nextLevelId !== undefined) {
      startLevel(nextLevelId);
    }
  }, [nextLevelId, startLevel]);

  // ==========================================================
  // Render
  // ==========================================================

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: "#eef0fe",
      }}
    >
      {/* 배경: 분류게임/패턴게임과 동일한 Kids Playground 보라 계열 */}
      <LinearGradient
        colors={["#D9EAFF", "#EEE8FF", "#F8F5FF"]}
        style={StyleSheet.absoluteFill}
      />

      {/* 1. 공통 헤더 */}
      <AppHeader
        onBackPress={handleBack}
        title={
          <StarRow
            earnedStars={earnedStars}
            totalStars={game.roundCount}
            gameType="maze"
            size={30}
          />
        }
      />

      <Container>
        {/* 2. 타이머 */}
        <TimeBar remainingMs={timeLeft} totalMs={totalMs} />

        {error && <ErrorText>{error}</ErrorText>}

        {/* 3. 게임판: 남는 공간 전체. 안쪽에 투명 여유 공간 + 실제 미로 */}
        <GameArea>
          <GameBoard
            s={s}
            margin={margin}
            mazeW={size?.w ?? 0}
            mazeH={size?.h ?? 0}
            onBoardLayout={onBoardLayout}
            tutorialActive={tutorialActive}
            onTutorialInterrupted={onTutorialInterrupted}
            onGrab={onPenGrabJS}
          >
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

            <IronBall
              s={s}
              visibility={realBallVisibility}
              absorbProgress={successProgress}
            />

            <GoalBurst s={s} progress={successProgress} />

            <TutorialGhostBall
              x={tutBallX}
              y={tutBallY}
              opacity={tutBallOpacity}
              radius={tutBallRadius}
            />
          </GameBoard>
        </GameArea>

        {/* 4. 라운드 진행: 분류/패턴게임과 같은 Footer */}
        <FooterWrapper collapsable={false}>
          <ColorSortingFooter
            totalRounds={game.roundCount}
            roundIndex={roundIndex}
          />
        </FooterWrapper>

        {SHOW_TEST_CONTROLS && (
          <ClassificationTestControls
            level={levelId}
            totalLevels={LEVEL_CONFIGS.length}
            roundIndex={roundIndex}
            totalRounds={game.roundCount}
            onChangeLevel={startLevel}
            onPreviousRound={() => gotoRound(roundIndex - 1)}
            onNextRound={() => gotoRound(roundIndex + 1)}
          />
        )}
      </Container>

      {/* 5. 레벨 완료 결과 화면 */}
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
    </View>
  );
}

// ============================================================
// Styles
// ============================================================

const Container = styled.View`
  flex: 1;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 8px;
`;

const ErrorText = styled.Text`
  color: #b91c1c;
  padding: 0 4px 4px;
  font-size: 12px;
`;

const GameArea = styled.View`
  flex: 1;
  direction: ltr;
`;

const FooterWrapper = styled.View`
  width: 100%;
  height: 44px;
  justify-content: center;
  margin-top: 4px;
  margin-bottom: 4px;
`;

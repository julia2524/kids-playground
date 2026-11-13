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
  };

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

            <IronBall s={s} />
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

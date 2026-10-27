import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Easing,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import type {
  GeneratedPattern,
  PatternElement,
} from "../../types/Pattern/patternTypes";
import { generatePattern } from "../../generators/generatePatternProblem";
import { classificationItems } from "../../data/classification/classificationItems";
import {
  getPatternLevel,
  PATTERN_LEVELS,
} from "../../types/Pattern/patternLevels";
import { RenderClassificationObjectSvg } from "../../assets/Classification/classificationItemSvgs";

const COLOR_MAP: Record<string, string> = {
  red: "#FF6464",
  yellow: "#F6D45B",
  green: "#6EBF8B",
  blue: "#68A7EE",
  black: "#3D4856",
  purple: "#B39AE8",
  white: "#FFFFFF",
  orange: "#F4A866",
  pink: "#F1A3C4",
  brown: "#A78369",
  natural: "#69A98A",
};

function areSameElement(a: PatternElement, b: PatternElement): boolean {
  if (a.kind !== b.kind) return false;
  if (a.kind === "color" && b.kind === "color") return a.colorId === b.colorId;
  if (a.kind === "shape" && b.kind === "shape")
    return a.shape === b.shape && a.colorId === b.colorId;
  if (a.kind === "item" && b.kind === "item") return a.item.id === b.item.id;
  return false;
}

export default function PatternTestScreen() {
  const { width: windowWidth } = useWindowDimensions();
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [roundData, setRoundData] = useState<GeneratedPattern | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<PatternElement | null>(
    null,
  );
  const [feedback, setFeedback] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [testLogs, setTestLogs] = useState<string[]>([]);

  // 🎬 통통 튀는 애니메이션 전용 상태
  const [visibleCount, setVisibleCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const bounceValues = useRef<Animated.Value[]>([]);
  const sequenceRunId = useRef(0);

  const currentConfig = getPatternLevel(selectedLevel);
  const contentWidth = Math.min(windowWidth - 32, 560);
  const slotGap = 5;
  const slotWidth = useMemo(() => {
    const count = currentConfig?.slotCount ?? 5;
    return Math.max(
      30,
      Math.min(64, (contentWidth - slotGap * (count - 1)) / count),
    );
  }, [contentWidth, currentConfig?.slotCount]);

  // 컴포넌트 첫 마운트 시 레벨 1 자동 생성
  useEffect(() => {
    generateRound(1);
  }, []);

  // 🎵 통통 튀는 순차 공개 애니메이션 로직 (물음표 포함!)
  useEffect(() => {
    if (!roundData) {
      setVisibleCount(0);
      setIsPlaying(false);
      bounceValues.current = [];
      return;
    }

    sequenceRunId.current += 1;
    const currentRun = sequenceRunId.current;

    // 각 슬롯별로 애니메이션 Value 생성
    const values = roundData.sequence.map(() => new Animated.Value(0));
    bounceValues.current = values;

    setVisibleCount(0);
    setSelectedChoice(null);
    setFeedback("");
    setIsPlaying(true);

    const revealNext = (index: number) => {
      if (currentRun !== sequenceRunId.current) return;

      if (index >= roundData.sequence.length) {
        setIsPlaying(false);
        return;
      }

      // 화면에 해당 슬롯을 보이게 설정
      setVisibleCount(index + 1);

      // 물음표 슬롯도 포함하여 모든 슬롯이 통통 튀어 오르도록 애니메이션 실행!
      const stepAnimation = Animated.sequence([
        // 1. 위로 솟구치며 커짐
        Animated.timing(values[index], {
          toValue: 1,
          duration: 200,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: false,
        }),
        // 2. 바닥으로 살짝 튀면서 착지
        Animated.timing(values[index], {
          toValue: 0,
          duration: 180,
          easing: Easing.bounce,
          useNativeDriver: false,
        }),
        // 3. 리듬감을 위한 잠깐 쉼
        Animated.delay(220),
      ]);

      stepAnimation.start(({ finished }) => {
        if (!finished || currentRun !== sequenceRunId.current) return;
        revealNext(index + 1);
      });
    };

    revealNext(0);

    return () => {
      sequenceRunId.current += 1;
      values.forEach((val) => val.stopAnimation());
    };
  }, [roundData]);

  const generateRound = (levelNum: number) => {
    setSelectedLevel(levelNum);
    setErrorMsg(null);
    setSelectedChoice(null);
    setFeedback("");
    try {
      setRoundData(generatePattern(levelNum, { items: classificationItems }));
    } catch (error) {
      setErrorMsg(
        error instanceof Error ? error.message : "알 수 없는 오류가 발생했어.",
      );
      setRoundData(null);
    }
  };

  const runAllLevelsVerification = () => {
    const logs: string[] = [];
    let successCount = 0;
    PATTERN_LEVELS.forEach((config) => {
      try {
        for (let i = 0; i < 3; i += 1)
          generatePattern(config.level, { items: classificationItems });
        logs.push(
          `✅ LV.${config.level} (${config.rule} / ${config.elementType}) 생성 성공`,
        );
        successCount += 1;
      } catch (error) {
        logs.push(
          `❌ LV.${config.level} 생성 실패: ${error instanceof Error ? error.message : "알 수 없는 오류"}`,
        );
      }
    });
    setTestLogs(logs);
    Alert.alert(
      successCount === PATTERN_LEVELS.length
        ? "전체 검증 성공!"
        : "일부 레벨 확인 필요",
      successCount === PATTERN_LEVELS.length
        ? `아이템 ${classificationItems.length}개로 레벨 1~20 생성 검증을 완료했어.`
        : "아래 로그에서 실패한 레벨을 확인해 줘.",
    );
  };

  const chooseAnswer = (choice: PatternElement) => {
    if (!roundData || isPlaying) return;
    setSelectedChoice(choice);
    setFeedback(
      areSameElement(choice, roundData.answer)
        ? "딩동댕! 패턴을 잘 찾았어!"
        : "다시 살펴볼까? 반복되는 순서를 찾아봐!",
    );
  };

  const renderElement = (
    element: PatternElement | null,
    size: number,
  ): React.ReactNode => {
    if (!element) return <Text style={styles.questionMark}>?</Text>;
    if (element.kind === "color") {
      return (
        <View
          style={[
            styles.colorDot,
            {
              width: size * 0.7,
              height: size * 0.7,
              borderRadius: size * 0.35,
              backgroundColor: COLOR_MAP[element.colorId] ?? "#C7CDD6",
              borderColor:
                element.colorId === "white" ? "#D9DEE7" : "rgba(0,0,0,0.03)",
            },
          ]}
        />
      );
    }
    if (element.kind === "shape") {
      return (
        <RenderClassificationObjectSvg
          object={{ kind: "simple_shape", shapeId: element.shape } as any}
          primary={COLOR_MAP[element.colorId] ?? "#68A7EE"}
          size={size}
        />
      );
    }
    const variant = element.item.variants[0];
    return (
      <RenderClassificationObjectSvg
        object={{ kind: "item", itemId: element.item.id } as any}
        primary={variant?.primary ?? "#69A98A"}
        secondary={variant?.secondary}
        accent={variant?.accent}
        size={size}
      />
    );
  };

  const isCorrect =
    !!roundData &&
    !!selectedChoice &&
    areSameElement(selectedChoice, roundData.answer);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.screen}>
          <View style={styles.topRow}>
            <View style={styles.levelPill}>
              <Text style={styles.levelPillText}>PATTERN LAB</Text>
            </View>
            <Text style={styles.gameName}>패턴 놀이</Text>
            <View style={styles.itemCountPill}>
              <Text style={styles.itemCountText}>
                아이템 {classificationItems.length}개
              </Text>
            </View>
          </View>

          <View style={styles.intro}>
            <Text style={styles.eyebrow}>차례차례, 리듬을 따라!</Text>
            <Text style={styles.title}>다음에는 무엇이 올까?</Text>
            <Text style={styles.subtitle}>
              통통 튀며 나타나는 패턴을 보고 빈칸에 올 친구를 맞춰봐.
            </Text>
          </View>

          <Pressable
            onPress={runAllLevelsVerification}
            style={({ pressed }) => [
              styles.batchButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.batchButtonText}>
              ⚡ 전체 레벨(1~20) 생성 검증
            </Text>
          </Pressable>

          <View style={styles.levelPanel}>
            <Text style={styles.panelTitle}>레벨 선택</Text>
            <View style={styles.levelGrid}>
              {PATTERN_LEVELS.map((level) => {
                const active = selectedLevel === level.level;
                return (
                  <Pressable
                    key={level.level}
                    onPress={() => generateRound(level.level)}
                    style={[styles.levelChip, active && styles.levelChipActive]}
                  >
                    <Text
                      style={[
                        styles.levelChipText,
                        active && styles.levelChipTextActive,
                      ]}
                    >
                      {level.level}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {errorMsg ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>생성 오류: {errorMsg}</Text>
            </View>
          ) : null}

          {currentConfig && roundData ? (
            <>
              <View style={styles.gameCard}>
                <View style={styles.gameCardHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardEyebrow}>
                      LEVEL {currentConfig.level}
                    </Text>
                    <Text style={styles.cardTitle}>{currentConfig.title}</Text>
                  </View>
                  <View style={styles.rulePill}>
                    <Text style={styles.rulePillText}>
                      {roundData.rule} · {currentConfig.slotCount}칸
                    </Text>
                  </View>
                </View>
                <Text style={styles.description}>
                  {currentConfig.description}
                </Text>
                <View style={styles.beatHeader}>
                  <View style={styles.musicBadge}>
                    <Text style={styles.musicBadgeText}>♪</Text>
                  </View>
                  <Text style={styles.beatCaption}>
                    {isPlaying
                      ? "하나, 둘! 통통 나타나고 있어!"
                      : "빈칸에 들어갈 친구를 찾아봐!"}
                  </Text>
                </View>

                {/* 슬롯 영역 */}
                <View style={styles.patternRow}>
                  {roundData.sequence.map((element, index) => {
                    const isBlank = index === roundData.blankIndex;
                    const isVisible = index < visibleCount;
                    const bounceAnim = bounceValues.current[index];

                    // 높이 점프(translateY) & 통통 튀는 크기 변화(scale) 보간
                    const translateY = bounceAnim
                      ? bounceAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -28], // 위로 28px 높이 튀어오름
                        })
                      : 0;

                    const scale = bounceAnim
                      ? bounceAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.25], // 튀어오를 때 1.25배 확대
                        })
                      : 1;

                    return (
                      <View
                        key={`pattern-${index}`}
                        style={[
                          styles.patternSlot,
                          {
                            width: slotWidth,
                            height: Math.max(48, slotWidth * 1.18),
                          },
                          isBlank && styles.blankSlot,
                        ]}
                      >
                        {isVisible ? (
                          <Animated.View
                            style={{
                              transform: [{ translateY }, { scale }],
                            }}
                          >
                            {renderElement(
                              isBlank ? null : element,
                              slotWidth * 0.72,
                            )}
                          </Animated.View>
                        ) : (
                          <View style={styles.hiddenPlaceholder} />
                        )}
                      </View>
                    );
                  })}
                </View>

                <Text style={styles.sequenceHint}>
                  {isPlaying
                    ? "패턴이 통통 나타나는 중..."
                    : "왼쪽부터 차례대로 살펴봐."}
                </Text>

                <Pressable
                  onPress={() => generateRound(selectedLevel)}
                  style={({ pressed }) => [
                    styles.replayButton,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.replayIcon}>↻</Text>
                  <Text style={styles.replayButtonText}>
                    새로운 문제로 다시 만들기
                  </Text>
                </Pressable>
              </View>

              <View style={styles.answerSection}>
                <Text style={styles.answerTitle}>어떤 친구가 들어갈까?</Text>
                <Text style={styles.answerSubtitle}>
                  보기 중에서 알맞은 것을 선택해 봐.
                </Text>
                <View style={styles.choicesRow}>
                  {roundData.choices.map((choice, index) => {
                    const selected =
                      selectedChoice !== null &&
                      areSameElement(selectedChoice, choice);
                    return (
                      <Pressable
                        key={`choice-${index}`}
                        disabled={
                          isPlaying || visibleCount < roundData.sequence.length
                        }
                        onPress={() => chooseAnswer(choice)}
                        style={[
                          styles.choiceButton,
                          selected && styles.choiceButtonSelected,
                          (isPlaying ||
                            visibleCount < roundData.sequence.length) &&
                            styles.choiceDisabled,
                        ]}
                      >
                        <View style={styles.choiceVisual}>
                          {renderElement(choice, 42)}
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
                {feedback ? (
                  <View
                    style={[
                      styles.feedbackBubble,
                      isCorrect
                        ? styles.feedbackCorrect
                        : styles.feedbackTryAgain,
                    ]}
                  >
                    <Text style={styles.feedbackText}>{feedback}</Text>
                  </View>
                ) : (
                  <Text style={styles.helperText}>
                    {isPlaying
                      ? "패턴이 모두 나타나면 골라 봐!"
                      : "정답을 누르면 여기에서 반응을 확인할 수 있어."}
                  </Text>
                )}
              </View>

              <View style={styles.debugCard}>
                <Text style={styles.debugTitle}>개발 확인 정보</Text>
                <Text style={styles.debugText}>
                  빈칸 인덱스: {roundData.blankIndex}
                </Text>
                <Text style={styles.debugText}>
                  정답:{" "}
                  {roundData.answer.kind === "item"
                    ? `${roundData.answer.item.name} (${roundData.answer.item.id})`
                    : roundData.answer.kind === "shape"
                      ? `${roundData.answer.colorId} / ${roundData.answer.shape}`
                      : roundData.answer.colorId}
                </Text>
                <Text style={styles.debugText}>
                  보기 개수: {roundData.choices.length}
                </Text>
              </View>
            </>
          ) : (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>레벨을 선택해 봐!</Text>
              <Text style={styles.emptyText}>
                선택하면 생성된 패턴과 보기들이 여기에 나타나.
              </Text>
              <Pressable
                onPress={() => generateRound(1)}
                style={styles.startButton}
              >
                <Text style={styles.startButtonText}>레벨 1 시작하기</Text>
              </Pressable>
            </View>
          )}

          {testLogs.length > 0 ? (
            <View style={styles.logCard}>
              <Text style={styles.logTitle}>전체 레벨 검증 로그</Text>
              {testLogs.map((log, index) => (
                <Text key={`log-${index}`} style={styles.logText}>
                  {log}
                </Text>
              ))}
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F7F8FC" },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
  },
  screen: { width: "100%", maxWidth: 560, alignSelf: "center" },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 7,
    marginBottom: 22,
  },
  levelPill: {
    backgroundColor: "#E4F2E8",
    borderRadius: 14,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  levelPillText: {
    color: "#477B5A",
    fontWeight: "900",
    fontSize: 10,
    letterSpacing: 0.4,
  },
  gameName: { color: "#28364B", fontSize: 16, fontWeight: "900" },
  itemCountPill: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E7EAF1",
    paddingHorizontal: 8,
    paddingVertical: 7,
  },
  itemCountText: { color: "#7A8494", fontSize: 10, fontWeight: "800" },
  intro: { alignItems: "center", marginBottom: 18 },
  eyebrow: {
    color: "#6A9A78",
    fontWeight: "900",
    fontSize: 13,
    marginBottom: 7,
  },
  title: {
    color: "#25344A",
    fontSize: 25,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: -0.6,
  },
  subtitle: {
    color: "#7D8797",
    fontSize: 13,
    marginTop: 8,
    textAlign: "center",
    lineHeight: 19,
  },
  batchButton: {
    minHeight: 48,
    borderRadius: 16,
    backgroundColor: "#7A6BC4",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    paddingHorizontal: 12,
  },
  batchButtonText: { color: "#FFF", fontSize: 14, fontWeight: "900" },
  levelPanel: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EDF0F5",
    padding: 14,
    marginBottom: 16,
  },
  panelTitle: {
    color: "#344257",
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 10,
  },
  levelGrid: { flexDirection: "row", flexWrap: "wrap", gap: 7 },
  levelChip: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: "#F0F2F7",
    alignItems: "center",
    justifyContent: "center",
  },
  levelChipActive: { backgroundColor: "#79A989" },
  levelChipText: { color: "#6E7888", fontSize: 13, fontWeight: "900" },
  levelChipTextActive: { color: "#FFF" },
  errorBox: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#FDECEC",
    marginBottom: 14,
  },
  errorText: { color: "#B42318", fontSize: 13, fontWeight: "800" },
  gameCard: {
    backgroundColor: "#FFF",
    borderRadius: 26,
    paddingHorizontal: 12,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: "#EDF0F5",
    shadowColor: "#25344A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 14,
    elevation: 2,
  },
  gameCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  cardEyebrow: {
    color: "#7AA789",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.8,
    marginBottom: 3,
  },
  cardTitle: { color: "#29384D", fontSize: 18, fontWeight: "900" },
  rulePill: {
    backgroundColor: "#EEF2FF",
    borderRadius: 11,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  rulePillText: { color: "#6266A8", fontSize: 11, fontWeight: "900" },
  description: {
    color: "#778294",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
    marginBottom: 18,
  },
  beatHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 15,
  },
  musicBadge: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: "#F0EAFE",
    alignItems: "center",
    justifyContent: "center",
  },
  musicBadgeText: { color: "#8B70CE", fontSize: 17, fontWeight: "900" },
  beatCaption: {
    color: "#6F7888",
    fontSize: 12,
    fontWeight: "800",
    flexShrink: 1,
  },
  patternRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  patternSlot: {
    flexGrow: 0,
    flexShrink: 1,
    borderRadius: 13,
    backgroundColor: "#F1F4F8",
    borderWidth: 1,
    borderColor: "#E6EAF1",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  blankSlot: {
    backgroundColor: "#FFFAE9",
    borderWidth: 2,
    borderColor: "#E9BD59",
    borderStyle: "dashed",
  },
  questionMark: { color: "#D4A43D", fontSize: 27, fontWeight: "900" },
  colorDot: { borderWidth: 2 },
  hiddenPlaceholder: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "transparent",
  },
  sequenceHint: {
    color: "#9AA3B1",
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 12,
  },
  replayButton: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 18,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#F3F5F9",
    borderRadius: 14,
  },
  replayIcon: { color: "#66758A", fontSize: 18, fontWeight: "900" },
  replayButtonText: { color: "#5E6C80", fontSize: 12, fontWeight: "900" },
  answerSection: { marginTop: 22, alignItems: "center" },
  answerTitle: { color: "#2B394D", fontSize: 18, fontWeight: "900" },
  answerSubtitle: {
    color: "#8993A2",
    fontSize: 12,
    marginTop: 5,
    marginBottom: 12,
  },
  choicesRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 10,
    width: "100%",
  },
  choiceButton: {
    width: 82,
    height: 76,
    borderRadius: 19,
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#E8ECF2",
    alignItems: "center",
    justifyContent: "center",
  },
  choiceButtonSelected: { borderColor: "#7FAE8C", backgroundColor: "#F0F8F1" },
  choiceDisabled: { opacity: 0.5 },
  choiceVisual: {
    width: 54,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: { opacity: 0.78, transform: [{ scale: 0.98 }] },
  feedbackBubble: {
    width: "100%",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 13,
  },
  feedbackCorrect: { backgroundColor: "#E7F5E9" },
  feedbackTryAgain: { backgroundColor: "#FFF4DB" },
  feedbackText: {
    color: "#4E6856",
    fontSize: 13,
    fontWeight: "900",
    textAlign: "center",
    lineHeight: 19,
  },
  helperText: {
    color: "#929BA8",
    fontSize: 12,
    marginTop: 13,
    textAlign: "center",
  },
  debugCard: {
    marginTop: 16,
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#EEF1F6",
  },
  debugTitle: {
    color: "#475467",
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 7,
  },
  debugText: { color: "#667085", fontSize: 11, lineHeight: 18 },
  emptyCard: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#EDF0F5",
    padding: 24,
    alignItems: "center",
  },
  emptyTitle: { color: "#29384D", fontSize: 19, fontWeight: "900" },
  emptyText: {
    color: "#7D8797",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 19,
    marginTop: 8,
    marginBottom: 18,
  },
  startButton: {
    backgroundColor: "#79A989",
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  startButtonText: { color: "#FFF", fontSize: 13, fontWeight: "900" },
  logCard: {
    backgroundColor: "#202B3B",
    borderRadius: 18,
    padding: 14,
    marginTop: 18,
  },
  logTitle: {
    color: "#D7DFEA",
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 10,
  },
  logText: { color: "#A7E3C0", fontSize: 11, lineHeight: 17, marginBottom: 3 },
});

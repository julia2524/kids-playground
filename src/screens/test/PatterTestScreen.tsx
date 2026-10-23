import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

/**
 * PatternPlaygroundScreen.tsx
 *
 * Standalone React Native screen mockup for the Pattern Play concept.
 * - Shows a pattern appearing one item at a time with a small rhythmic bounce.
 * - Keeps each item visible after it appears.
 * - Pauses at the final empty slot so the child can predict the next item.
 * - Lets the child choose an answer and replay the sequence.
 *
 * No image assets or additional animation libraries required.
 */

type PatternItem = "blue" | "yellow";

const COLORS: Record<PatternItem, string> = {
  blue: "#5796E8",
  yellow: "#F4C84B",
};

const PATTERN: PatternItem[] = ["blue", "yellow", "blue", "yellow"];
const CORRECT_ANSWER: PatternItem = "blue";

export default function PatternTestScreen() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<PatternItem | null>(
    null,
  );
  const [feedback, setFeedback] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  const bounceValues = useRef(PATTERN.map(() => new Animated.Value(0))).current;
  const sequenceRunId = useRef(0);

  useEffect(() => {
    playPattern();
    // Start the demonstration automatically when the screen opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playPattern = () => {
    sequenceRunId.current += 1;
    const currentRun = sequenceRunId.current;

    setVisibleCount(0);
    setSelectedAnswer(null);
    setFeedback("");
    setIsPlaying(true);
    setHasStarted(true);
    bounceValues.forEach((value) => value.setValue(0));

    const revealNext = (index: number) => {
      if (currentRun !== sequenceRunId.current) return;

      if (index >= PATTERN.length) {
        setIsPlaying(false);
        return;
      }

      setVisibleCount(index + 1);
      bounceValues[index].setValue(0);

      Animated.sequence([
        Animated.timing(bounceValues[index], {
          toValue: 1,
          duration: 180,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(bounceValues[index], {
          toValue: 0,
          duration: 160,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (!finished || currentRun !== sequenceRunId.current) return;
        setTimeout(() => revealNext(index + 1), 220);
      });
    };

    revealNext(0);
  };

  const chooseAnswer = (answer: PatternItem) => {
    if (isPlaying || visibleCount < PATTERN.length) return;

    setSelectedAnswer(answer);
    setFeedback(
      answer === CORRECT_ANSWER
        ? "딩동댕! 패턴을 잘 찾았어!"
        : "다시 살펴볼까? 파랑, 노랑이 반복되고 있어.",
    );
  };

  const renderPatternItem = (item: PatternItem, index: number) => {
    const isVisible = index < visibleCount;
    const translateY = bounceValues[index].interpolate({
      inputRange: [0, 1],
      outputRange: [0, -14],
    });
    const scale = bounceValues[index].interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.12],
    });

    return (
      <View
        key={`pattern-${index}`}
        style={[
          styles.patternSlot,
          item === "blue" ? styles.blueSlot : styles.yellowSlot,
        ]}
      >
        {isVisible ? (
          <Animated.View
            style={[
              styles.dot,
              { backgroundColor: COLORS[item] },
              { transform: [{ translateY }, { scale }] },
            ]}
          />
        ) : (
          <View style={styles.hiddenDot} />
        )}
      </View>
    );
  };

  const renderAnswer = (answer: PatternItem, label: string) => {
    const isSelected = selectedAnswer === answer;
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${label} 선택`}
        disabled={isPlaying || visibleCount < PATTERN.length}
        onPress={() => chooseAnswer(answer)}
        style={({ pressed }) => [
          styles.answerButton,
          isSelected && styles.answerButtonSelected,
          pressed && styles.answerButtonPressed,
          (isPlaying || visibleCount < PATTERN.length) && styles.answerDisabled,
        ]}
      >
        <View style={[styles.answerDot, { backgroundColor: COLORS[answer] }]} />
        <Text style={styles.answerLabel}>{label}</Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.screen}>
          <View style={styles.topRow}>
            <View style={styles.levelPill}>
              <Text style={styles.levelPillText}>LEVEL 1</Text>
            </View>
            <Text style={styles.gameName}>패턴 놀이</Text>
            <View style={styles.roundPill}>
              <Text style={styles.roundPillText}>1 / 10</Text>
            </View>
          </View>

          <View style={styles.intro}>
            <Text style={styles.eyebrow}>차례차례, 리듬을 따라!</Text>
            <Text style={styles.title}>다음에는 무엇이 올까?</Text>
            <Text style={styles.subtitle}>
              움직이는 순서를 잘 보고, 다음 친구를 찾아봐!
            </Text>
          </View>

          <View style={styles.gameCard}>
            <View style={styles.beatHeader}>
              <View style={styles.beatIcon}>
                <Text style={styles.beatIconText}>♪</Text>
              </View>
              <Text style={styles.beatCaption}>
                {isPlaying
                  ? "하나, 둘! 차례대로 나타나고 있어"
                  : visibleCount === PATTERN.length
                    ? "이제 다음 순서를 찾아봐!"
                    : "준비되면 패턴을 다시 볼 수 있어"}
              </Text>
            </View>

            <View style={styles.patternRow}>
              {PATTERN.map(renderPatternItem)}
              <View style={[styles.patternSlot, styles.questionSlot]}>
                <Text style={styles.questionMark}>?</Text>
              </View>
            </View>

            <View style={styles.patternLegend}>
              <View style={styles.legendItem}>
                <View
                  style={[styles.legendDot, { backgroundColor: COLORS.blue }]}
                />
                <Text style={styles.legendText}>파랑</Text>
              </View>
              <View style={styles.legendItem}>
                <View
                  style={[styles.legendDot, { backgroundColor: COLORS.yellow }]}
                />
                <Text style={styles.legendText}>노랑</Text>
              </View>
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={playPattern}
              style={({ pressed }) => [
                styles.replayButton,
                pressed && styles.replayButtonPressed,
              ]}
            >
              <Text style={styles.replayIcon}>↻</Text>
              <Text style={styles.replayText}>
                {isPlaying ? "처음부터 다시 보기" : "패턴 다시 보기"}
              </Text>
            </Pressable>
          </View>

          <View style={styles.answerSection}>
            <Text style={styles.answerTitle}>다음에 올 색깔은?</Text>
            <View style={styles.answerRow}>
              {renderAnswer("blue", "파랑")}
              {renderAnswer("yellow", "노랑")}
            </View>
            {!!feedback && (
              <View
                style={[
                  styles.feedbackBubble,
                  selectedAnswer === CORRECT_ANSWER
                    ? styles.feedbackCorrect
                    : styles.feedbackTryAgain,
                ]}
              >
                <Text style={styles.feedbackText}>{feedback}</Text>
              </View>
            )}
            {!feedback && (
              <Text style={styles.helperText}>
                {isPlaying
                  ? "패턴이 모두 나타나면 골라 봐!"
                  : "알맞은 색깔을 톡 눌러 봐."}
              </Text>
            )}
          </View>

          <View style={styles.footer}>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
            <Text style={styles.footerText}>오늘도 하나씩 배워 가는 중!</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F8FC",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  screen: {
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  levelPill: {
    backgroundColor: "#E4F2E8",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  levelPillText: {
    color: "#477B5A",
    fontWeight: "800",
    fontSize: 12,
    letterSpacing: 0.5,
  },
  gameName: {
    color: "#28364B",
    fontSize: 16,
    fontWeight: "800",
  },
  roundPill: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: "#E7EAF1",
  },
  roundPillText: {
    color: "#7A8494",
    fontSize: 12,
    fontWeight: "700",
  },
  intro: {
    alignItems: "center",
    marginBottom: 22,
  },
  eyebrow: {
    color: "#6A9A78",
    fontWeight: "800",
    fontSize: 13,
    marginBottom: 8,
  },
  title: {
    color: "#25344A",
    fontSize: 27,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: -0.8,
  },
  subtitle: {
    color: "#7D8797",
    fontSize: 14,
    marginTop: 9,
    textAlign: "center",
    lineHeight: 21,
  },
  gameCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: "#EDF0F5",
    shadowColor: "#25344A",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 3,
  },
  beatHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
    gap: 8,
  },
  beatIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F0EAFE",
    alignItems: "center",
    justifyContent: "center",
  },
  beatIconText: {
    color: "#8B70CE",
    fontSize: 19,
    fontWeight: "900",
  },
  beatCaption: {
    color: "#6F7888",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
    flexShrink: 1,
  },
  patternRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
  },
  patternSlot: {
    flex: 1,
    maxWidth: 78,
    aspectRatio: 1,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  blueSlot: {
    backgroundColor: "#E7F0FD",
  },
  yellowSlot: {
    backgroundColor: "#FFF5D5",
  },
  questionSlot: {
    backgroundColor: "#FBFCFE",
    borderWidth: 2,
    borderColor: "#C7CED9",
    borderStyle: "dashed",
  },
  dot: {
    width: "44%",
    aspectRatio: 1,
    borderRadius: 999,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.8)",
  },
  hiddenDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.0)",
  },
  questionMark: {
    color: "#A4ADBA",
    fontSize: 34,
    fontWeight: "800",
  },
  patternLegend: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    color: "#8A93A2",
    fontSize: 12,
    fontWeight: "700",
  },
  replayButton: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 22,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#F4F6FA",
    borderRadius: 16,
  },
  replayButtonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
  replayIcon: {
    color: "#66758A",
    fontSize: 20,
    fontWeight: "700",
  },
  replayText: {
    color: "#5E6C80",
    fontSize: 13,
    fontWeight: "800",
  },
  answerSection: {
    marginTop: 24,
    alignItems: "center",
  },
  answerTitle: {
    color: "#2B394D",
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 13,
  },
  answerRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    width: "100%",
  },
  answerButton: {
    flex: 1,
    maxWidth: 210,
    minHeight: 66,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E8ECF2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 11,
  },
  answerButtonSelected: {
    borderColor: "#7FAE8C",
    backgroundColor: "#F0F8F1",
  },
  answerButtonPressed: {
    transform: [{ scale: 0.97 }],
  },
  answerDisabled: {
    opacity: 0.7,
  },
  answerDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.04)",
  },
  answerLabel: {
    color: "#354257",
    fontSize: 16,
    fontWeight: "800",
  },
  feedbackBubble: {
    width: "100%",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 13,
  },
  feedbackCorrect: {
    backgroundColor: "#E7F5E9",
  },
  feedbackTryAgain: {
    backgroundColor: "#FFF4DB",
  },
  feedbackText: {
    color: "#4E6856",
    fontSize: 13,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 19,
  },
  helperText: {
    color: "#929BA8",
    fontSize: 12,
    marginTop: 13,
  },
  footer: {
    marginTop: 25,
    alignItems: "center",
  },
  progressTrack: {
    width: "100%",
    height: 7,
    backgroundColor: "#E8ECF3",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    width: "10%",
    height: "100%",
    backgroundColor: "#8AB797",
    borderRadius: 4,
  },
  footerText: {
    color: "#A0A8B4",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 10,
  },
});

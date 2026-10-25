import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
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
  red: "#FF5252",
  yellow: "#FFEB3B",
  green: "#66BB6A",
  blue: "#42A5F5",
  black: "#37474F",
  purple: "#AB47BC",
  white: "#FFFFFF",
  orange: "#FFA726",
  pink: "#F48FB1",
  brown: "#8D6E63",
  natural: "#4D9B79",
};

export default function PatternGeneratorTestScreen() {
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [roundData, setRoundData] = useState<GeneratedPattern | null>(null);
  const [testLogs, setTestLogs] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 특정 레벨 생성 테스트 (진짜 classificationItems 전달)
  const handleGenerateRound = (levelNum: number) => {
    setSelectedLevel(levelNum);
    setErrorMsg(null);
    try {
      const result = generatePattern(levelNum, { items: classificationItems });
      setRoundData(result);
    } catch (e: any) {
      setErrorMsg(e.message);
      setRoundData(null);
    }
  };

  // 전체 1~20 레벨 일괄 스트레스 테스트
  const handleRunAllLevelsVerification = () => {
    const logs: string[] = [];
    let successCount = 0;

    PATTERN_LEVELS.forEach((config) => {
      try {
        for (let i = 0; i < 3; i++) {
          generatePattern(config.level, { items: classificationItems });
        }
        logs.push(
          `✅ LV.${config.level} (${config.rule} / ${config.elementType}) 생성 성공`,
        );
        successCount++;
      } catch (e: any) {
        logs.push(`❌ LV.${config.level} 생성 실패: ${e.message}`);
      }
    });

    setTestLogs(logs);
    if (successCount === PATTERN_LEVELS.length) {
      alert(
        `🎉 대성공! 진짜 데이터베이스(${classificationItems.length}) 기반 레벨 1~20 검증 완료!`,
      );
    } else {
      alert(`⚠️ 일부 레벨에 오류가 있습니다. 아래 로그를 확인해 주세요.`);
    }
  };

  // 요소 렌더러
  const renderElementSvg = (element: PatternElement | null) => {
    if (!element) {
      return <Text style={styles.questionMark}>?</Text>;
    }

    if (element.kind === "color") {
      return (
        <View
          style={[
            styles.shapeCircle,
            { backgroundColor: COLOR_MAP[element.colorId] || "#ccc" },
          ]}
        />
      );
    }

    if (element.kind === "shape") {
      return (
        <RenderClassificationObjectSvg
          object={{ kind: "simple_shape", shapeId: element.shape } as any}
          primary={COLOR_MAP[element.colorId] || "#42A5F5"}
          size={44}
        />
      );
    }

    if (element.kind === "item") {
      const variant = element.item.variants[0];
      return (
        <RenderClassificationObjectSvg
          object={{ kind: "item", itemId: element.item.id } as any}
          primary={variant?.primary || "#4D9B79"}
          secondary={variant?.secondary}
          accent={variant?.accent}
          size={44}
        />
      );
    }

    return null;
  };

  const currentConfig = getPatternLevel(selectedLevel);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>🧪 패턴 제너레이터 실전 검증기</Text>
        <Text style={styles.subtitle}>
          진짜 DB (아이템 {classificationItems.length}개) 연동 완료! 레벨별로
          무작위 생성을 테스트해보세요.
        </Text>

        <Pressable
          style={styles.batchBtn}
          onPress={handleRunAllLevelsVerification}
        >
          <Text style={styles.batchBtnText}>
            ⚡ 전체 레벨(1~20) 일괄 생성 검증 실행
          </Text>
        </Pressable>

        <View style={styles.levelGrid}>
          {PATTERN_LEVELS.map((lvl) => (
            <Pressable
              key={lvl.level}
              style={[
                styles.levelChip,
                selectedLevel === lvl.level && styles.levelChipActive,
              ]}
              onPress={() => handleGenerateRound(lvl.level)}
            >
              <Text
                style={[
                  styles.levelChipText,
                  selectedLevel === lvl.level && styles.levelChipTextActive,
                ]}
              >
                {lvl.level}
              </Text>
            </Pressable>
          ))}
        </View>

        {errorMsg && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>🚨 생성 에러: {errorMsg}</Text>
          </View>
        )}

        {currentConfig && roundData && (
          <View style={styles.previewCard}>
            <View style={styles.previewHeader}>
              <Text style={styles.previewLevelTitle}>
                LEVEL {currentConfig.level}: {currentConfig.title}
              </Text>
              <Text style={styles.previewRuleBadge}>
                {roundData.rule} | {currentConfig.elementType}
              </Text>
            </View>
            <Text style={styles.previewDesc}>{currentConfig.description}</Text>

            <Text style={styles.sectionLabel}>
              1. 생성된 패턴 시퀀스 (빈칸 인덱스: {roundData.blankIndex})
            </Text>
            <View style={styles.sequenceRow}>
              {roundData.sequence.map((el, idx) => (
                <View
                  key={`seq-${idx}`}
                  style={[
                    styles.slot,
                    idx === roundData.blankIndex && styles.blankSlot,
                  ]}
                >
                  {renderElementSvg(idx === roundData.blankIndex ? null : el)}
                  <Text style={styles.slotIndexLabel}>#{idx + 1}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.sectionLabel}>2. 정답 (Answer)</Text>
            <View style={styles.answerBox}>
              <View style={styles.smallSlot}>
                {renderElementSvg(roundData.answer)}
              </View>
              <Text style={styles.answerText}>
                {roundData.answer.kind === "item"
                  ? `${roundData.answer.item.name} (${roundData.answer.item.id})`
                  : JSON.stringify(roundData.answer)}
              </Text>
            </View>

            <Text style={styles.sectionLabel}>3. 보기 목록 (Choices)</Text>
            <View style={styles.choicesRow}>
              {roundData.choices.map((choice, cIdx) => (
                <View key={`choice-${cIdx}`} style={styles.choiceSlot}>
                  {renderElementSvg(choice)}
                </View>
              ))}
            </View>

            <Pressable
              style={styles.refreshBtn}
              onPress={() => handleGenerateRound(selectedLevel)}
            >
              <Text style={styles.refreshBtnText}>
                🎲 이 레벨로 다시 무작위 생성하기
              </Text>
            </Pressable>
          </View>
        )}

        {testLogs.length > 0 && (
          <View style={styles.logContainer}>
            <Text style={styles.logTitle}>📋 전체 레벨 검증 로그</Text>
            {testLogs.map((log, lIdx) => (
              <Text key={lIdx} style={styles.logItem}>
                {log}
              </Text>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  scrollContent: { padding: 16, alignItems: "center" },
  title: { fontSize: 20, fontWeight: "900", color: "#1F2937", marginBottom: 4 },
  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 16,
  },
  batchBtn: {
    width: "100%",
    backgroundColor: "#7C3AED",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  batchBtnText: { color: "#FFF", fontSize: 15, fontWeight: "800" },
  levelGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
    marginBottom: 20,
    width: "100%",
  },
  levelChip: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  levelChipActive: { backgroundColor: "#10B981" },
  levelChipText: { fontSize: 14, fontWeight: "700", color: "#4B5563" },
  levelChipTextActive: { color: "#FFF" },
  errorBox: {
    width: "100%",
    backgroundColor: "#FEE2E2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: { color: "#DC2626", fontWeight: "700", fontSize: 13 },
  previewCard: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 20,
  },
  previewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
    flexWrap: "wrap",
  },
  previewLevelTitle: { fontSize: 16, fontWeight: "900", color: "#111827" },
  previewRuleBadge: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2563EB",
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  previewDesc: { fontSize: 13, color: "#4B5563", marginBottom: 16 },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "800",
    color: "#374151",
    marginTop: 12,
    marginBottom: 8,
  },
  sequenceRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    flexWrap: "wrap",
  },
  slot: {
    width: 52,
    height: 52,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  blankSlot: {
    backgroundColor: "#FEF3C7",
    borderColor: "#F59E0B",
    borderStyle: "dashed",
  },
  slotIndexLabel: {
    position: "absolute",
    bottom: 2,
    right: 4,
    fontSize: 9,
    color: "#9CA3AF",
    fontWeight: "700",
  },
  questionMark: { fontSize: 24, fontWeight: "900", color: "#D97706" },
  shapeCircle: { width: 34, height: 34, borderRadius: 17 },
  answerBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#F9FAFB",
    padding: 8,
    borderRadius: 8,
  },
  smallSlot: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  answerText: { fontSize: 14, fontWeight: "700", color: "#1F2937" },
  choicesRow: { flexDirection: "row", gap: 10, flexWrap: "wrap" },
  choiceSlot: {
    width: 52,
    height: 52,
    borderRadius: 10,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
  },
  refreshBtn: {
    marginTop: 16,
    backgroundColor: "#0284C7",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  refreshBtnText: { color: "#FFF", fontWeight: "800", fontSize: 13 },
  logContainer: {
    width: "100%",
    backgroundColor: "#111827",
    padding: 12,
    borderRadius: 12,
  },
  logTitle: {
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
  },
  logItem: {
    color: "#34D399",
    fontSize: 11,
    fontFamily: "monospace",
    marginBottom: 4,
  },
});

import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import {
  RenderBasicShapeSvg,
  RenderClassificationItemSvg,
} from "../../assets/Classification/classificationItemSvgs";
import { ShapeSortingLevels } from "../../types/Classification/Shape/shapeSortingLevels";
import { classificationItems } from "../../data/classification/classificationItems";
import { generateShapeSortingProblem } from "../../generators/classification/generateShapeSortingProblem";

// ============================================================
// Shape Sorting Test Screen
// ============================================================

const SHAPE_LABELS: Record<string, string> = {
  circle: "원",
  triangle: "삼각형",
  square: "사각형",
  star: "별",
  heart: "하트",
};

const COLOR_HEX: Record<string, string> = {
  natural: "#8A817C",
  red: "#F44336",
  orange: "#FF9800",
  yellow: "#FFCA28",
  green: "#4CAF50",
  blue: "#2196F3",
  purple: "#9C27B0",
  black: "#303030",
  white: "#FFFFFF",
  pink: "#F48FB1",
  brown: "#795548",
};

// ============================================================
// Target SVG
// ============================================================

function TargetPreview({
  shapeId,
  size = 76,
}: {
  shapeId: string;
  size?: number;
}) {
  return (
    <RenderBasicShapeSvg
      shapeId={shapeId as any}
      colorHex="#5B8068"
      size={size}
    />
  );
}

// ============================================================
// Object SVG
// ============================================================

function ObjectPreview({ object, size = 84 }: { object: any; size?: number }) {
  // 기본 도형
  if (object.kind === "simple_shape") {
    return (
      <RenderBasicShapeSvg
        shapeId={object.shapeId}
        colorHex={
          COLOR_HEX[object.colorId] ?? object.variant?.primary ?? "#5B8068"
        }
        size={size}
      />
    );
  }

  // 실제 ClassificationItem SVG
  return (
    <RenderClassificationItemSvg
      itemId={object.itemId}
      colorHex={object.variant?.primary}
      primary={object.variant?.primary}
      secondary={object.variant?.secondary}
      accent={object.variant?.accent}
      pattern={object.variant?.pattern}
      size={size}
    />
  );
}

// ============================================================
// Main Screen
// ============================================================

export default function ShapeSortingTestScreen() {
  const [level, setLevel] = useState(1);
  const [roundNumber, setRoundNumber] = useState(0);
  const [round, setRound] = useState<any>(null);
  const [error, setError] = useState("");

  const generateRound = (levelToGenerate: number) => {
    try {
      const config = ShapeSortingLevels.find(
        (item) => item.level === levelToGenerate,
      );

      if (!config) {
        throw new Error(`${levelToGenerate}레벨 설정을 찾을 수 없습니다.`);
      }

      const generated = generateShapeSortingProblem(
        config,
        classificationItems,
      );

      setRound(generated);
      setError("");
      setRoundNumber((prev) => prev + 1);
    } catch (e) {
      setRound(null);
      setError(
        e instanceof Error ? e.message : "문제 생성 중 오류가 발생했습니다.",
      );
    }
  };

  useEffect(() => {
    generateRound(level);
    // 레벨이 바뀔 때 새 문제 생성
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  const changeLevel = (nextLevel: number) => {
    if (nextLevel < 1 || nextLevel > ShapeSortingLevels.length) {
      return;
    }

    setRoundNumber(0);
    setLevel(nextLevel);
  };

  const config = ShapeSortingLevels.find((item) => item.level === level);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>모양 분류 테스트</Text>
        <Text style={styles.subtitle}>
          Target과 Object가 제대로 생성되는지 확인해 보자!
        </Text>

        {/* 레벨 이동 */}
        <View style={styles.levelNavigation}>
          <Pressable
            style={[
              styles.navigationButton,
              level === 1 && styles.disabledButton,
            ]}
            disabled={level === 1}
            onPress={() => changeLevel(level - 1)}
          >
            <Text style={styles.navigationText}>← 이전</Text>
          </Pressable>

          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>LEVEL {level}</Text>
          </View>

          <Pressable
            style={[
              styles.navigationButton,
              level === 17 && styles.disabledButton,
            ]}
            disabled={level === 17}
            onPress={() => changeLevel(level + 1)}
          >
            <Text style={styles.navigationText}>다음 →</Text>
          </Pressable>
        </View>

        {/* 레벨 설정 */}
        {config && (
          <View style={styles.configCard}>
            <Text style={styles.configTitle}>현재 레벨 설정</Text>

            <View style={styles.configRow}>
              <Text style={styles.configLabel}>Target</Text>
              <Text style={styles.configValue}>{config.targetCount}개</Text>
            </View>

            <View style={styles.configRow}>
              <Text style={styles.configLabel}>Object</Text>
              <Text style={styles.configValue}>{config.objectCount}개</Text>
            </View>

            <View style={styles.configRow}>
              <Text style={styles.configLabel}>Target당 개수</Text>
              <Text style={styles.configValue}>
                {config.objectsPerTarget}개
              </Text>
            </View>

            <View style={styles.configRow}>
              <Text style={styles.configLabel}>오브젝트 모드</Text>
              <Text style={styles.configValue}>{config.objectMode}</Text>
            </View>

            <View style={styles.configRow}>
              <Text style={styles.configLabel}>색상 모드</Text>
              <Text style={styles.configValue}>{config.objectColorMode}</Text>
            </View>
          </View>
        )}

        {/* 오류 */}
        {!!error && (
          <View style={styles.errorCard}>
            <Text style={styles.errorTitle}>문제 생성 실패</Text>
            <Text style={styles.errorMessage}>{error}</Text>
          </View>
        )}

        {round && (
          <>
            {/* TARGETS */}
            <Text style={styles.sectionTitle}>
              🎯 Target ({round.targets.length})
            </Text>

            <View style={styles.targetGrid}>
              {round.targets.map((target: any, index: number) => (
                <View key={target.id} style={styles.targetCard}>
                  <Text style={styles.targetNumber}>TARGET {index + 1}</Text>

                  <TargetPreview shapeId={target.shapeId} size={76} />

                  <Text style={styles.targetName}>
                    {SHAPE_LABELS[target.shapeId] ?? target.shapeId}
                  </Text>
                </View>
              ))}
            </View>

            {/* OBJECTS */}
            <Text style={styles.sectionTitle}>
              🧩 Object ({round.objects.length})
            </Text>

            <View style={styles.objectGrid}>
              {round.objects.map((object: any, index: number) => {
                const target = round.targets.find(
                  (item: any) => item.id === object.targetId,
                );

                return (
                  <View key={object.id} style={styles.objectCard}>
                    <Text style={styles.objectNumber}>OBJECT {index + 1}</Text>

                    <ObjectPreview object={object} size={84} />

                    <Text style={styles.objectName}>
                      {object.name ??
                        SHAPE_LABELS[object.shapeId] ??
                        object.shapeId}
                    </Text>

                    <View style={styles.answerBadge}>
                      <Text style={styles.answerText}>
                        정답:{" "}
                        {target
                          ? (SHAPE_LABELS[target.shapeId] ?? target.shapeId)
                          : "연결 오류"}
                      </Text>
                    </View>

                    <Text style={styles.objectDetail}>
                      {object.kind === "simple_shape"
                        ? `색상: ${object.colorId ?? "-"}`
                        : `itemId: ${object.itemId ?? "-"}`}
                    </Text>

                    <Text style={styles.objectDetail}>
                      targetId: {object.targetId}
                    </Text>
                  </View>
                );
              })}
            </View>
            {/* NEW ROUND */}
            <Pressable
              style={styles.generateButton}
              onPress={() => generateRound(level)}
            >
              <Text style={styles.generateButtonText}>🔄 새 라운드 만들기</Text>
            </Pressable>

            {/* ANSWER CHECK */}
            <Text style={styles.sectionTitle}>🔍 정답 연결 검사</Text>

            <View style={styles.configCard}>
              {round.objects.map((object: any) => {
                const target = round.targets.find(
                  (item: any) => item.id === object.targetId,
                );

                return (
                  <View key={object.id} style={styles.mappingRow}>
                    <Text style={styles.mappingObject}>
                      {object.name ?? object.itemId ?? object.shapeId}
                    </Text>

                    <Text style={styles.mappingArrow}>→</Text>

                    <Text
                      style={[
                        styles.mappingTarget,
                        !target && styles.errorText,
                      ]}
                    >
                      {target
                        ? (SHAPE_LABELS[target.shapeId] ?? target.shapeId)
                        : "대상 없음"}
                    </Text>
                  </View>
                );
              })}
            </View>

            <Text style={styles.roundInfo}>
              LEVEL {level} · 생성 횟수 {roundNumber}
            </Text>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ============================================================
// Styles
// ============================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7F3",
  },
  content: {
    padding: 18,
    paddingBottom: 48,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#26352C",
  },
  subtitle: {
    fontSize: 14,
    color: "#777777",
    marginTop: 6,
    marginBottom: 22,
  },
  levelNavigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
    gap: 8,
  },
  navigationButton: {
    backgroundColor: "#5B8068",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  navigationText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
  disabledButton: {
    opacity: 0.35,
  },
  levelBadge: {
    backgroundColor: "#E6EFE7",
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 12,
  },
  levelText: {
    fontSize: 18,
    fontWeight: "900",
    color: "#26352C",
  },
  configCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    gap: 10,
  },
  configTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#26352C",
    marginBottom: 4,
  },
  configRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  configLabel: {
    color: "#777777",
    fontSize: 13,
  },
  configValue: {
    color: "#26352C",
    fontSize: 13,
    fontWeight: "700",
  },
  errorCard: {
    backgroundColor: "#FDE8E7",
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
  },
  errorTitle: {
    color: "#B42318",
    fontWeight: "900",
    fontSize: 17,
    marginBottom: 6,
  },
  errorMessage: {
    color: "#842029",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#26352C",
    marginTop: 6,
    marginBottom: 14,
  },
  targetGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },
  targetCard: {
    width: "47%",
    flexGrow: 1,
    backgroundColor: "#E6EFE7",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    gap: 8,
  },
  targetNumber: {
    fontSize: 11,
    color: "#5B8068",
    fontWeight: "900",
  },
  targetName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#26352C",
  },
  objectGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  objectCard: {
    width: "47%",
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#E6E6E0",
    gap: 7,
  },
  objectNumber: {
    fontSize: 11,
    color: "#777777",
    fontWeight: "900",
  },
  objectName: {
    fontSize: 14,
    fontWeight: "800",
    color: "#26352C",
    textAlign: "center",
  },
  answerBadge: {
    backgroundColor: "#E6EFE7",
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  answerText: {
    color: "#34734A",
    fontSize: 12,
    fontWeight: "900",
  },
  objectDetail: {
    fontSize: 10,
    color: "#777777",
    textAlign: "center",
  },
  mappingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  mappingObject: {
    flex: 1,
    fontSize: 12,
    color: "#333333",
  },
  mappingArrow: {
    color: "#999999",
  },
  mappingTarget: {
    fontSize: 12,
    fontWeight: "800",
    color: "#34734A",
  },
  errorText: {
    color: "#B42318",
  },
  generateButton: {
    backgroundColor: "#26352C",
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
    marginTop: 4,
  },
  generateButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
  },
  roundInfo: {
    textAlign: "center",
    color: "#777777",
    fontSize: 12,
    marginTop: 12,
  },
});

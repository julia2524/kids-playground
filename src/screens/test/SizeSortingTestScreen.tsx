import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import {
  SizeSortingObject,
  SizeSortingProblem,
  generateSizeSortingProblem,
} from "../../generators/classification/generateSizeSortingProblem"; // 실제 경로에 맞게 수정
import { SizeSortingLevels } from "../../types/Classification/Size/sizeSortingLevels";
import { RenderClassificationItemSvg } from "../../assets/Classification/classificationItemSvgs";

// ============================================================
// LABELS
// ============================================================

const SIZE_LABELS: Record<string, string> = {
  large: "큰 공간",
  medium: "중간 공간",
  small: "작은 공간",
};

const COLOR_LABELS: Record<string, string> = {
  natural: "자연색",
  pink: "분홍",
  blue: "파랑",
  yellow: "노랑",
  red: "빨강",
  orange: "주황",
  green: "초록",
  purple: "보라",
  black: "검정",
  white: "하양",
  brown: "갈색",
};

const SIZE_MODE_LABELS: Record<string, string> = {
  twoSizes: "2단계 (큰/작은)",
  threeSizes: "3단계 (큰/중간/작은)",
};

const ITEM_RELATION_LABELS: Record<string, string> = {
  sameObject: "같은 사물",
  sameSubcategory: "같은 소범주",
};

const DISTRIBUTION_LABELS: Record<string, string> = {
  sameItemAllSizes: "모든 크기에 같은 사물",
  sameSetAcrossSizes: "모든 크기에 같은 사물 세트",
  differentSetPerSize: "크기마다 다른 사물",
};

const COLOR_SCHEME_LABELS: Record<string, string> = {
  naturalOnly: "자연색만",
  naturalAndOther: "자연색 + 다른 색",
  naturalAndDistinctOthers: "자연색 + 서로 다른 색들",
};

const COLOR_ASSIGNMENT_LABELS: Record<string, string> = {
  round: "라운드 전체",
  sizeGroup: "크기별",
  itemType: "사물 종류별",
  instance: "인스턴스별 (서로 다른 색)",
  matchedSet: "세트별 (한 세트끼리 같은 색)",
};
// ============================================================
// OBJECT PREVIEW
// ============================================================

function ObjectPreview({
  object,
  size = 84,
}: {
  object: SizeSortingObject;
  size?: number;
}) {
  const variant = object.variant;

  return (
    <View style={{ alignItems: "center" }}>
      {/* 실제 크기를 반영한 스케일 표시 */}
      <View
        style={{
          transform: [{ scale: object.scale }],
          marginBottom: (1 - object.scale) * 20,
        }}
      >
        <RenderClassificationItemSvg
          itemId={object.itemId}
          primary={variant?.primary}
          secondary={variant?.secondary}
          accent={variant?.accent}
          size={size}
        />
      </View>
    </View>
  );
}

// ============================================================
// TARGET PREVIEW (크기 박스)
// ============================================================

function TargetPreview({
  target,
}: {
  target: SizeSortingProblem["targets"][number];
}) {
  const scale = target.scale;

  return (
    <View
      style={[
        styles.targetBox,
        {
          width: 70 * scale + 40,
          height: 70 * scale + 30,
        },
      ]}
    >
      <View
        style={[
          styles.targetInnerBox,
          {
            width: 50 * scale + 20,
            height: 50 * scale + 16,
          },
        ]}
      />
      <Text style={styles.targetBoxLabel}>{SIZE_LABELS[target.sizeKey]}</Text>
    </View>
  );
}

// ============================================================
// MAIN SCREEN
// ============================================================

export default function SizeSortingTestScreen() {
  const [level, setLevel] = useState(1);
  const [roundNumber, setRoundNumber] = useState(0);
  const [round, setRound] = useState<SizeSortingProblem | null>(null);
  const [error, setError] = useState("");

  const generateRound = useCallback((levelToGenerate: number) => {
    try {
      const generated = generateSizeSortingProblem(levelToGenerate, undefined, {
        seed: Date.now() + Math.floor(Math.random() * 1000),
      });

      setRound(generated);
      setError("");
      setRoundNumber((prev) => prev + 1);
    } catch (e) {
      setRound(null);
      setError(
        e instanceof Error ? e.message : "문제 생성 중 오류가 발생했어요.",
      );
    }
  }, []);

  useEffect(() => {
    generateRound(level);
  }, [level, generateRound]);

  const changeLevel = (nextLevel: number) => {
    if (nextLevel < 1 || nextLevel > SizeSortingLevels.length) return;
    setRoundNumber(0);
    setLevel(nextLevel);
  };

  const config = SizeSortingLevels.find((item) => item.level === level);

  // 색상 다양성 간단 체크
  const colorStats = React.useMemo(() => {
    if (!round) return null;

    const colorIds = round.objects.map((o) => o.variant?.colorId ?? "unknown");
    const unique = [...new Set(colorIds)];
    const naturalCount = colorIds.filter((c) => c === "natural").length;

    return {
      total: colorIds.length,
      uniqueCount: unique.length,
      naturalCount,
      colors: unique,
    };
  }, [round]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>크기 분류 테스트</Text>
        <Text style={styles.subtitle}>
          Target(크기 공간)과 Object가 올바르게 생성되는지 확인해 보자!
        </Text>

        {/* LEVEL NAVIGATION */}
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
              level === SizeSortingLevels.length && styles.disabledButton,
            ]}
            disabled={level === SizeSortingLevels.length}
            onPress={() => changeLevel(level + 1)}
          >
            <Text style={styles.navigationText}>다음 →</Text>
          </Pressable>
        </View>

        {/* LEVEL CONFIG */}
        {config && (
          <View style={styles.configCard}>
            <Text style={styles.configTitle}>현재 레벨 설정</Text>

            <View style={styles.configRow}>
              <Text style={styles.configLabel}>제목</Text>
              <Text style={styles.configValue}>{config.title}</Text>
            </View>

            <View style={styles.configRow}>
              <Text style={styles.configLabel}>학습 목표</Text>
              <Text style={[styles.configValue, { flex: 1 }]}>
                {config.goal}
              </Text>
            </View>

            <View style={styles.configRow}>
              <Text style={styles.configLabel}>크기 모드</Text>
              <Text style={styles.configValue}>
                {SIZE_MODE_LABELS[config.sizeMode] ?? config.sizeMode}
              </Text>
            </View>

            <View style={styles.configRow}>
              <Text style={styles.configLabel}>사물 관계</Text>
              <Text style={styles.configValue}>
                {ITEM_RELATION_LABELS[config.itemRelation] ??
                  config.itemRelation}
              </Text>
            </View>

            <View style={styles.configRow}>
              <Text style={styles.configLabel}>배치 방식</Text>
              <Text style={styles.configValue}>
                {DISTRIBUTION_LABELS[config.itemDistribution] ??
                  config.itemDistribution}
              </Text>
            </View>

            <View style={styles.configRow}>
              <Text style={styles.configLabel}>크기당 사물 종류</Text>
              <Text style={styles.configValue}>
                {config.itemTypesPerSize}종
              </Text>
            </View>

            <View style={styles.configRow}>
              <Text style={styles.configLabel}>종류당 반복</Text>
              <Text style={styles.configValue}>
                {config.instancesPerItemPerSize}개
              </Text>
            </View>

            <View style={styles.configRow}>
              <Text style={styles.configLabel}>크기당 총 오브젝트</Text>
              <Text style={styles.configValue}>{config.objectsPerSize}개</Text>
            </View>

            <View style={styles.configRow}>
              <Text style={styles.configLabel}>색상 구성</Text>
              <Text style={styles.configValue}>
                {COLOR_SCHEME_LABELS[config.colorScheme] ?? config.colorScheme}
              </Text>
            </View>

            <View style={styles.configRow}>
              <Text style={styles.configLabel}>색상 배정</Text>
              <Text style={styles.configValue}>
                {COLOR_ASSIGNMENT_LABELS[config.colorAssignment] ??
                  config.colorAssignment}
              </Text>
            </View>

            <View style={styles.configRow}>
              <Text style={styles.configLabel}>non-natural 색 개수</Text>
              <Text style={styles.configValue}>
                {config.nonNaturalColorCount}개
              </Text>
            </View>
          </View>
        )}

        {/* ERROR */}
        {!!error && (
          <View style={styles.errorCard}>
            <Text style={styles.errorTitle}>문제 생성 실패</Text>
            <Text style={styles.errorMessage}>{error}</Text>
            <Text style={styles.errorHint}>
              해당 레벨에 필요한 사물·색상 variant가 충분한지 확인해 보세요.
            </Text>
            <Pressable
              style={styles.retryButton}
              onPress={() => generateRound(level)}
            >
              <Text style={styles.retryButtonText}>다시 시도하기</Text>
            </Pressable>
          </View>
        )}

        {round && (
          <>
            {/* NOTES */}
            {round.notes.length > 0 && (
              <View style={styles.notesCard}>
                <Text style={styles.notesTitle}>⚠️ Generator Notes</Text>
                {round.notes.map((note, idx) => (
                  <Text key={idx} style={styles.notesText}>
                    • {note}
                  </Text>
                ))}
              </View>
            )}

            {/* COLOR STATS */}
            {colorStats && (
              <View style={styles.statsCard}>
                <Text style={styles.statsTitle}>🎨 색상 통계</Text>
                <Text style={styles.statsText}>
                  총 {colorStats.total}개 · 고유 색상 {colorStats.uniqueCount}종
                  · natural {colorStats.naturalCount}개
                </Text>
                <Text style={styles.statsText}>
                  [
                  {colorStats.colors
                    .map((c) => COLOR_LABELS[c] ?? c)
                    .join(", ")}
                  ]
                </Text>
              </View>
            )}

            {/* TARGETS */}
            <Text style={styles.sectionTitle}>
              🎯 Target ({round.targets.length})
            </Text>

            <View style={styles.targetGrid}>
              {round.targets.map((target, index) => (
                <View key={target.id} style={styles.targetCard}>
                  <Text style={styles.targetNumber}>TARGET {index + 1}</Text>
                  <TargetPreview target={target} />
                  <Text style={styles.targetName}>
                    {SIZE_LABELS[target.sizeKey]}
                  </Text>
                  <Text style={styles.targetDescription}>
                    sizeKey: {target.sizeKey}
                  </Text>
                  <Text style={styles.targetDescription}>
                    scale: {target.scale}
                  </Text>
                </View>
              ))}
            </View>

            {/* OBJECTS */}
            <Text style={styles.sectionTitle}>
              🧩 Object ({round.objects.length})
            </Text>

            <View style={styles.objectGrid}>
              {round.objects.map((object, index) => {
                const target = round.targets.find(
                  (t) => t.id === object.targetId,
                );
                const colorId = object.variant?.colorId ?? "unknown";

                return (
                  <View key={object.id} style={styles.objectCard}>
                    <Text style={styles.objectNumber}>OBJECT {index + 1}</Text>

                    <ObjectPreview object={object} size={78} />

                    <Text style={styles.objectName}>{object.name}</Text>

                    <View
                      style={[
                        styles.sizeBadge,
                        object.sizeKey === "large" && styles.sizeLarge,
                        object.sizeKey === "medium" && styles.sizeMedium,
                        object.sizeKey === "small" && styles.sizeSmall,
                      ]}
                    >
                      <Text style={styles.sizeBadgeText}>
                        {SIZE_LABELS[object.sizeKey]}
                      </Text>
                    </View>

                    <Text style={styles.objectDetail}>
                      색상: {COLOR_LABELS[colorId] ?? colorId}
                    </Text>

                    <Text style={styles.objectDetail}>
                      scale: {object.scale}
                    </Text>

                    <View style={styles.answerBadge}>
                      <Text style={styles.answerText}>
                        → {target ? SIZE_LABELS[target.sizeKey] : "연결 오류"}
                      </Text>
                    </View>
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
              {round.objects.map((object) => {
                const target = round.targets.find(
                  (t) => t.id === object.targetId,
                );
                const sizeMatch = !!target && target.sizeKey === object.sizeKey;
                const connectionValid = !!target && sizeMatch;

                return (
                  <View key={object.id} style={styles.mappingRow}>
                    <Text style={styles.mappingObject}>
                      {object.name} ({SIZE_LABELS[object.sizeKey]})
                    </Text>

                    <Text style={styles.mappingArrow}>→</Text>

                    <Text
                      style={[
                        styles.mappingTarget,
                        !connectionValid && styles.errorText,
                      ]}
                    >
                      {target ? SIZE_LABELS[target.sizeKey] : "대상 없음"}
                    </Text>

                    <Text
                      style={[
                        styles.mappingStatus,
                        connectionValid
                          ? styles.validStatus
                          : styles.invalidStatus,
                      ]}
                    >
                      {connectionValid ? "OK" : "오류"}
                    </Text>
                  </View>
                );
              })}
            </View>

            {/* 추가 검증: sameObject일 때 사물 통일성 */}
            {config?.itemRelation === "sameObject" && (
              <View style={styles.configCard}>
                <Text style={styles.configTitle}>sameObject 검증</Text>
                {(() => {
                  const uniqueItemIds = [
                    ...new Set(round.objects.map((o) => o.itemId)),
                  ];
                  const isSame = uniqueItemIds.length === 1;

                  return (
                    <Text
                      style={[
                        styles.statsText,
                        isSame ? styles.validStatus : styles.invalidStatus,
                      ]}
                    >
                      {isSame
                        ? `✅ 모든 오브젝트가 같은 사물 (${round.objects[0]?.name})`
                        : `❌ 서로 다른 사물 ${uniqueItemIds.length}종 사용됨`}
                    </Text>
                  );
                })()}
              </View>
            )}

            {/* instance 색상 검증 (레벨 2/5/7/10) */}
            {/* {config?.colorAssignment === "instance" && colorStats && (
              <View style={styles.configCard}>
                <Text style={styles.configTitle}>instance 색상 검증</Text>
                <Text style={styles.statsText}>
                  기대 non-natural: {config.nonNaturalColorCount} · 실제 고유
                  색상: {colorStats.uniqueCount} · natural:{" "}
                  {colorStats.naturalCount}
                </Text>
                <Text
                  style={[
                    styles.statsText,
                    colorStats.naturalCount === 1 &&
                    colorStats.uniqueCount === config.nonNaturalColorCount + 1
                      ? styles.validStatus
                      : styles.invalidStatus,
                  ]}
                >
                  {colorStats.naturalCount === 1 &&
                  colorStats.uniqueCount === config.nonNaturalColorCount + 1
                    ? "✅ natural 1개 + 서로 다른 non-natural 색상"
                    : "⚠️ 색상 구성이 기대와 다를 수 있음 (variant 부족 가능)"}
                </Text>
              </View>
            )} */}
            {config?.colorAssignment === "matchedSet" && colorStats && (
              <View style={styles.configCard}>
                <Text style={styles.configTitle}>matchedSet 색상 검증</Text>
                <Text style={styles.statsText}>
                  기대: natural 세트 1 + non-natural 세트{" "}
                  {config.nonNaturalColorCount}
                </Text>
                <Text style={styles.statsText}>
                  실제 고유 색상 {colorStats.uniqueCount}종 · natural{" "}
                  {colorStats.naturalCount}개
                </Text>
                <Text
                  style={[
                    styles.statsText,
                    colorStats.uniqueCount ===
                      config.nonNaturalColorCount + 1 &&
                    colorStats.naturalCount ===
                      (config.sizeMode === "twoSizes" ? 2 : 3)
                      ? styles.validStatus
                      : styles.invalidStatus,
                  ]}
                >
                  {colorStats.uniqueCount === config.nonNaturalColorCount + 1
                    ? "✅ 세트별 색상 구성 정상"
                    : "⚠️ 색상 구성 확인 필요"}
                </Text>
              </View>
            )}

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
// STYLES
// ============================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FC",
  },
  content: {
    padding: 18,
    paddingBottom: 48,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#252A3A",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#777D8C",
    lineHeight: 21,
  },

  levelNavigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 22,
  },
  navigationButton: {
    paddingHorizontal: 15,
    paddingVertical: 11,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E3E7F0",
  },
  navigationText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#46506A",
  },
  disabledButton: {
    opacity: 0.35,
  },
  levelBadge: {
    paddingHorizontal: 22,
    paddingVertical: 11,
    borderRadius: 14,
    backgroundColor: "#5267D8",
  },
  levelText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 15,
  },

  configCard: {
    marginTop: 20,
    padding: 16,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EAF2",
  },
  configTitle: {
    marginBottom: 12,
    fontSize: 16,
    fontWeight: "800",
    color: "#30364A",
  },
  configRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F1F6",
  },
  configLabel: {
    fontSize: 13,
    color: "#777D8C",
    minWidth: 110,
  },
  configValue: {
    flexShrink: 1,
    fontSize: 13,
    fontWeight: "700",
    color: "#414B69",
    textAlign: "right",
  },

  errorCard: {
    marginTop: 18,
    padding: 16,
    borderRadius: 15,
    backgroundColor: "#FFF0F0",
    borderWidth: 1,
    borderColor: "#F1CACA",
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#B52D3A",
  },
  errorMessage: {
    marginTop: 8,
    color: "#8C3D46",
    lineHeight: 21,
  },
  errorHint: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 18,
    color: "#9A656B",
  },
  retryButton: {
    alignSelf: "flex-start",
    marginTop: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#B52D3A",
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  notesCard: {
    marginTop: 16,
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#FFF8E8",
    borderWidth: 1,
    borderColor: "#F0E0B8",
  },
  notesTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#9A7B2F",
    marginBottom: 6,
  },
  notesText: {
    fontSize: 12,
    color: "#8A6F2A",
    lineHeight: 18,
  },

  statsCard: {
    marginTop: 14,
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#F0F4FF",
    borderWidth: 1,
    borderColor: "#D4DCF5",
  },
  statsTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#3A4A8A",
    marginBottom: 4,
  },
  statsText: {
    fontSize: 12,
    color: "#4A5A8A",
    lineHeight: 18,
  },

  sectionTitle: {
    marginTop: 28,
    marginBottom: 13,
    fontSize: 17,
    fontWeight: "800",
    color: "#343B52",
  },

  targetGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  targetCard: {
    flexGrow: 1,
    width: "30%",
    minWidth: 120,
    alignItems: "center",
    padding: 14,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#DDE3F4",
  },
  targetNumber: {
    alignSelf: "flex-start",
    fontSize: 11,
    fontWeight: "800",
    color: "#858CA0",
  },
  targetBox: {
    marginTop: 10,
    borderRadius: 16,
    backgroundColor: "#EEF1FF",
    borderWidth: 2,
    borderColor: "#A8B4E0",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  targetInnerBox: {
    borderRadius: 10,
    backgroundColor: "#D8DFF5",
  },
  targetBoxLabel: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: "700",
    color: "#5A6A9A",
  },
  targetName: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "800",
    color: "#30364A",
    textAlign: "center",
  },
  targetDescription: {
    marginTop: 4,
    fontSize: 11,
    color: "#858B99",
    textAlign: "center",
  },

  objectGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  objectCard: {
    width: "31%",
    minWidth: 100,
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 7,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E7EAF2",
  },
  objectNumber: {
    alignSelf: "flex-start",
    fontSize: 10,
    fontWeight: "700",
    color: "#8B91A1",
  },
  objectName: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "800",
    color: "#30364A",
    textAlign: "center",
  },
  objectDetail: {
    marginTop: 4,
    fontSize: 10,
    color: "#737B90",
    textAlign: "center",
  },
  sizeBadge: {
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  sizeLarge: {
    backgroundColor: "#FFE8E0",
  },
  sizeMedium: {
    backgroundColor: "#FFF4D6",
  },
  sizeSmall: {
    backgroundColor: "#E0F5E8",
  },
  sizeBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#4A4A4A",
  },
  answerBadge: {
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: "#EDF0FF",
  },
  answerText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#5267D8",
    textAlign: "center",
  },

  generateButton: {
    marginTop: 24,
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: "#5267D8",
  },
  generateButtonText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  mappingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F1F6",
  },
  mappingObject: {
    flex: 1.4,
    fontSize: 12,
    fontWeight: "700",
    color: "#41485C",
  },
  mappingArrow: {
    color: "#A0A5B4",
  },
  mappingTarget: {
    flex: 1,
    fontSize: 12,
    fontWeight: "700",
    color: "#5267D8",
  },
  mappingStatus: {
    fontSize: 10,
    fontWeight: "800",
    minWidth: 36,
    textAlign: "right",
  },
  validStatus: {
    color: "#27845A",
  },
  invalidStatus: {
    color: "#C23B48",
  },
  errorText: {
    color: "#C23B48",
  },
  roundInfo: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 12,
    color: "#858B99",
  },
});

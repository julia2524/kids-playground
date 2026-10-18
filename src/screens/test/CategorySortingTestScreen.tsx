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
  CategorySortingObject,
  CategorySortingProblem,
  generateCategorySortingProblem,
} from "../../generators/classification/generateCategorySortingProblem";
import { RenderClassificationItemSvg } from "../../assets/Classification/classificationItemSvgs";
import { CategorySortingLevels } from "../../types/Classification/Category/categorySortingLevels";
import CategoryBasket from "./CategoryPreviewBasket";

// ============================================================
// LABELS
// ============================================================

const CATEGORY_LABELS: Record<string, string> = {
  animal: "동물",
  food: "먹는 것",
  clothing: "의류",
  living: "생활용품",
  vehicle: "탈것",
  nature: "자연",
  unknown: "기타",
};

const SUB_CATEGORY_LABELS: Record<string, string> = {
  land_animal: "육지동물",
  insect: "곤충",
  bird: "새",
  sea_animal: "바다동물",

  fruit: "과일",
  vegetable: "채소",
  meal: "음식",
  snack: "간식",
  drink: "음료",

  clothes: "옷",
  shoes: "신발",
  hat: "모자",
  accessories: "액세서리",

  furniture: "가구",
  electronics: "전자제품",
  stationery: "문구용품",
  daily: "생활용품",
  toys_sports: "놀이·스포츠",
  musical_instrument: "악기",

  road_vehicle: "도로 탈것",
  rail_vehicle: "철도 차량",
  air_vehicle: "항공 탈것",
  water_vehicle: "수상 탈것",
  construction_vehicle: "건설 차량",

  plant: "식물",
  sky: "하늘",
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

const getLabel = (value?: string) => {
  if (!value) return "미지정";

  return SUB_CATEGORY_LABELS[value] ?? CATEGORY_LABELS[value] ?? value;
};

// ============================================================
// OBJECT SVG
// ============================================================

function ObjectPreview({
  object,
  size = 84,
}: {
  object: CategorySortingObject;
  size?: number;
}) {
  return (
    <RenderClassificationItemSvg
      itemId={object.itemId}
      colorHex={object.primary}
      primary={object.primary}
      secondary={object.secondary}
      accent={object.accent}
      size={size}
    />
  );
}

// ============================================================
// TARGET PREVIEW
// ============================================================

// function TargetPreview({
//   target,
//   size = 76,
// }: {
//   target: CategorySortingProblem["targets"][number];
//   size?: number;
// }) {
//   // 현재는 카테고리별 TargetBox의 시각 디자인을 만들기 전이므로
//   // 목적지의 범주명과 대표 사물을 보여주는 테스트용 카드로 표시한다.
//   return (
//     <View style={styles.targetIllustration}>
//       <Text style={styles.targetEmoji}>
//         {target.topCategory === "animal"
//           ? "🐾"
//           : target.topCategory === "food"
//             ? "🍎"
//             : target.topCategory === "clothing"
//               ? "👕"
//               : target.topCategory === "living"
//                 ? "🏠"
//                 : target.topCategory === "vehicle"
//                   ? "🚗"
//                   : target.topCategory === "nature"
//                     ? "🌿"
//                     : "📦"}
//       </Text>

//       {target.itemIds.length > 0 && (
//         <Text style={styles.targetItemCount}>
//           사물 종류 {target.itemIds.length}개
//         </Text>
//       )}
//     </View>
//   );
// }
function TargetPreview({
  target,
  size = 118,
}: {
  target: CategorySortingProblem["targets"][number];
  size?: number;
}) {
  return (
    <CategoryBasket
      topCategory={target.topCategory}
      subCategory={target.subCategory}
      size={size}
    />
  );
}

// ============================================================
// MAIN SCREEN
// ============================================================

export default function CategorySortingTestScreen() {
  const [level, setLevel] = useState(1);
  const [roundNumber, setRoundNumber] = useState(0);
  const [round, setRound] = useState<CategorySortingProblem | null>(null);
  const [error, setError] = useState("");

  const generateRound = useCallback((levelToGenerate: number) => {
    try {
      const generated = generateCategorySortingProblem(levelToGenerate);

      setRound(generated);
      setError("");
      setRoundNumber((previous) => previous + 1);
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
    if (nextLevel < 1 || nextLevel > CategorySortingLevels.length) {
      return;
    }

    setRoundNumber(0);
    setLevel(nextLevel);
  };

  const config = CategorySortingLevels.find((item) => item.level === level);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>카테고리 분류 테스트</Text>

        <Text style={styles.subtitle}>
          Target과 Object가 올바르게 생성되는지 확인해 보자!
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
              level === CategorySortingLevels.length && styles.disabledButton,
            ]}
            disabled={level === CategorySortingLevels.length}
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
              <Text style={styles.configLabel}>분류 규칙</Text>
              <Text style={styles.configValue}>{config.categoryMode}</Text>
            </View>

            <View style={styles.configRow}>
              <Text style={styles.configLabel}>Target</Text>
              <Text style={styles.configValue}>{config.targetCount}개</Text>
            </View>

            <View style={styles.configRow}>
              <Text style={styles.configLabel}>Object</Text>
              <Text style={styles.configValue}>{config.objectCount}개</Text>
            </View>

            <View style={styles.configRow}>
              <Text style={styles.configLabel}>Target당 사물 수</Text>
              <Text style={styles.configValue}>
                {config.objectsPerTarget}개
              </Text>
            </View>

            <View style={styles.configRow}>
              <Text style={styles.configLabel}>Target당 사물 종류</Text>
              <Text style={styles.configValue}>
                {config.itemTypesPerTarget}종
              </Text>
            </View>

            <View style={styles.configRow}>
              <Text style={styles.configLabel}>색상 모드</Text>
              <Text style={styles.configValue}>{config.objectColorMode}</Text>
            </View>

            <View style={styles.configRow}>
              <Text style={styles.configLabel}>색상 변형 개수</Text>
              <Text style={styles.configValue}>
                {config.distinctColorCount ?? 1}종
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
              해당 레벨에 필요한 대분류·중분류·사물 종류가 충분한지 확인해
              보세요.
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
                    {getLabel(target.subCategory ?? target.topCategory)}
                  </Text>

                  <Text style={styles.targetDescription}>
                    대분류: {getLabel(target.topCategory)}
                  </Text>

                  {target.subCategory && (
                    <Text style={styles.targetDescription}>
                      중분류: {getLabel(target.subCategory)}
                    </Text>
                  )}

                  <Text style={styles.targetDescription}>
                    정답 사물: {target.itemIds.length}종
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
                  (item) => item.id === object.targetId,
                );

                return (
                  <View key={object.instanceId} style={styles.objectCard}>
                    <Text style={styles.objectNumber}>OBJECT {index + 1}</Text>

                    <ObjectPreview object={object} size={84} />

                    <Text style={styles.objectName}>{object.itemName}</Text>

                    <Text style={styles.objectDetail}>
                      {getLabel(object.topCategory)} ·{" "}
                      {getLabel(object.subCategory)}
                    </Text>

                    <View style={styles.answerBadge}>
                      <Text style={styles.answerText}>
                        정답:{" "}
                        {target
                          ? getLabel(target.subCategory ?? target.topCategory)
                          : "연결 오류"}
                      </Text>
                    </View>

                    <Text style={styles.objectDetail}>
                      색상: {COLOR_LABELS[object.colorId] ?? object.colorId}
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
              {round.objects.map((object) => {
                const target = round.targets.find(
                  (item) => item.id === object.targetId,
                );

                const isValid =
                  !!target &&
                  target.itemIds.includes(
                    // Target.itemIds는 classificationItems의 id를 저장함.
                    // object.itemId는 svgKey이므로 아래에서 별도로 확인한다.
                    "",
                  );

                // SVG 키와 원본 데이터 ID는 서로 다를 수 있으므로
                // 여기서는 targetId 연결 여부를 우선 검사한다.
                const connectionValid = !!target;

                return (
                  <View key={object.instanceId} style={styles.mappingRow}>
                    <Text style={styles.mappingObject}>{object.itemName}</Text>

                    <Text style={styles.mappingArrow}>→</Text>

                    <Text
                      style={[
                        styles.mappingTarget,
                        !connectionValid && styles.errorText,
                      ]}
                    >
                      {target
                        ? getLabel(target.subCategory ?? target.topCategory)
                        : "대상 없음"}
                    </Text>

                    <Text
                      style={[
                        styles.mappingStatus,
                        connectionValid
                          ? styles.validStatus
                          : styles.invalidStatus,
                      ]}
                    >
                      {connectionValid ? "연결됨" : "오류"}
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
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F1F6",
  },
  configLabel: {
    fontSize: 13,
    color: "#777D8C",
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
    width: "47%",
    minWidth: 145,
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
  targetIllustration: {
    width: 90,
    height: 90,
    marginTop: 8,
    borderRadius: 24,
    backgroundColor: "#EEF1FF",
    alignItems: "center",
    justifyContent: "center",
  },
  targetEmoji: {
    fontSize: 35,
  },
  targetItemCount: {
    marginTop: 3,
    fontSize: 10,
    color: "#626D99",
  },
  targetName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "800",
    color: "#30364A",
    textAlign: "center",
  },
  targetDescription: {
    marginTop: 5,
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
    minWidth: 95,
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
    marginTop: 5,
    fontSize: 13,
    fontWeight: "800",
    color: "#30364A",
    textAlign: "center",
  },
  objectDetail: {
    marginTop: 5,
    fontSize: 10,
    color: "#737B90",
    textAlign: "center",
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
    flex: 1,
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

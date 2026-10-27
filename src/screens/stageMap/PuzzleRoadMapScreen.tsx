import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
  RouteProp,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import AppHeader from "../../components/AppHeader";
import { RootStackParamList } from "../../navigation/types";
import {
  getPuzzleProgress,
  isPuzzleLevelUnlocked,
  PuzzleProgress,
} from "../../utils/asyncStorage/puzzleProgressStorage";
import {
  PUZZLE_LEVELS,
  TOTAL_PUZZLE_LEVELS,
} from "../../types/Puzzle/puzzleLevels";

type RoadmapRoute = RouteProp<RootStackParamList, "PuzzleRoadMapScreen">;

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function PuzzleRoadMapScreen() {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RoadmapRoute>();

  const { character = "polarbear", puzzleCategory = "animal" } = route.params;

  const [progress, setProgress] = useState<PuzzleProgress>({
    bestStars: {},
    clearedLevels: [],
  });

  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let active = true;

      setLoading(true);

      getPuzzleProgress(character)
        .then((result) => {
          if (active) setProgress(result);
        })
        .catch((error) => {
          console.warn("퍼즐 진행 상황을 불러오지 못했어요.", error);
        })
        .finally(() => {
          if (active) setLoading(false);
        });

      return () => {
        active = false;
      };
    }, [character]),
  );

  const handleSelectLevel = (level: number) => {
    if (!isPuzzleLevelUnlocked(level, progress)) return;

    navigation.navigate("PuzzlePlayScreen", {
      gameType: "puzzle",
      puzzleCategory,
      character,
      level,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <LinearGradient
        colors={["#D9EAFF", "#EEE8FF", "#F8F5FF"]}
        style={StyleSheet.absoluteFill}
      />

      <AppHeader
        title="퍼즐 탐험 지도"
        onBackPress={() => navigation.goBack()}
        onMascotPress={() => navigation.navigate("SettingScreen")}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.intro}>
          <Text style={styles.title}>어디까지 모험했을까?</Text>
          <Text style={styles.subtitle}>퍼즐을 완성하고 별을 모아 보자!</Text>
          <Text style={styles.character}>{getCharacterLabel(character)}</Text>
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#7665D5"
            style={styles.loader}
          />
        ) : (
          <>
            <View style={styles.summary}>
              <Text style={styles.summaryText}>
                클리어한 레벨 {progress.clearedLevels.length} /{" "}
                {TOTAL_PUZZLE_LEVELS}
              </Text>
            </View>

            <View style={styles.levelGrid}>
              {PUZZLE_LEVELS.map((item) => {
                const unlocked = isPuzzleLevelUnlocked(item.level, progress);

                const cleared = progress.clearedLevels.includes(item.level);

                const bestStars = progress.bestStars[String(item.level)];

                return (
                  <TouchableOpacity
                    key={item.level}
                    activeOpacity={unlocked ? 0.75 : 1}
                    disabled={!unlocked}
                    onPress={() => handleSelectLevel(item.level)}
                    style={[
                      styles.levelCard,
                      unlocked ? styles.unlockedCard : styles.lockedCard,
                      cleared && styles.clearedCard,
                    ]}
                  >
                    <View style={styles.levelTop}>
                      <Text
                        style={[
                          styles.levelLabel,
                          !unlocked && styles.lockedText,
                        ]}
                      >
                        LEVEL
                      </Text>

                      <Text
                        style={[
                          styles.levelNumber,
                          !unlocked && styles.lockedText,
                        ]}
                      >
                        {String(item.level).padStart(2, "0")}
                      </Text>
                    </View>

                    <Text
                      style={[
                        styles.pieceCount,
                        !unlocked && styles.lockedText,
                      ]}
                    >
                      {unlocked ? `${item.pieceCount}조각` : "🔒 잠김"}
                    </Text>

                    <View style={styles.stars}>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Text
                          key={index}
                          style={[
                            styles.star,
                            bestStars !== undefined && index < bestStars
                              ? styles.earnedStar
                              : styles.emptyStar,
                          ]}
                        >
                          ★
                        </Text>
                      ))}
                    </View>

                    <Text
                      style={[styles.status, !unlocked && styles.lockedText]}
                    >
                      {cleared
                        ? "클리어!"
                        : unlocked
                          ? "도전하기"
                          : "이전 레벨을 클리어해 봐!"}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.footer}>
              별을 모두 모으지 않아도 다음 레벨에 도전할 수 있어.
            </Text>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function getCharacterLabel(character: string): string {
  const labels: Record<string, string> = {
    polarbear: "🐻‍❄️ 북극곰과 함께",
    rabbit: "🐰 토끼와 함께",
    lion: "🦁 사자와 함께",
    penguin: "🐧 펭귄과 함께",
    elephant: "🐘 코끼리와 함께",
    pig: "🐷 돼지와 함께",
    bear: "🐻 곰과 함께",
  };

  return labels[character] ?? "🐾 동물 친구와 함께";
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F5FF",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  intro: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 18,
  },
  title: {
    color: "#39465D",
    fontSize: 24,
    fontWeight: "900",
  },
  subtitle: {
    color: "#69758C",
    fontSize: 15,
    marginTop: 8,
  },
  character: {
    color: "#7665D5",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 14,
  },
  loader: {
    marginTop: 40,
  },
  summary: {
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E4DFFC",
  },
  summaryText: {
    color: "#5545A8",
    fontWeight: "800",
    fontSize: 14,
  },
  levelGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  levelCard: {
    width: "48%",
    minHeight: 166,
    borderRadius: 22,
    padding: 14,
    marginBottom: 14,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  unlockedCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#C9BFFF",
  },
  lockedCard: {
    backgroundColor: "#ECEBF2",
    borderColor: "#D9D7E2",
  },
  clearedCard: {
    backgroundColor: "#FFF9E7",
    borderColor: "#F4D36E",
  },
  levelTop: {
    alignItems: "center",
  },
  levelLabel: {
    color: "#8A7BD4",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
  },
  levelNumber: {
    color: "#39465D",
    fontSize: 30,
    fontWeight: "900",
    marginTop: 1,
  },
  pieceCount: {
    color: "#65728A",
    fontSize: 13,
    fontWeight: "800",
    marginTop: 4,
  },
  stars: {
    flexDirection: "row",
    marginTop: 9,
  },
  star: {
    fontSize: 15,
    marginHorizontal: 1,
  },
  earnedStar: {
    color: "#F2B632",
  },
  emptyStar: {
    color: "#D7D7E0",
  },
  status: {
    color: "#6655B8",
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 7,
  },
  lockedText: {
    color: "#A3A2AE",
  },
  footer: {
    color: "#737D90",
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 12,
  },
});

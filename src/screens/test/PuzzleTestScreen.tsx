import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import PuzzleBoard from "../../components/Puzzle/engine/PuzzleBoard";

import PolarBearPuzzleScene from "../../components/Puzzle/assets/PolarBear/PolarBearPuzzleScene";
import BabyBunnyPuzzleScene from "../../components/Puzzle/assets/BabyBunny/BabyBunnyPuzzleScene";

export default function PuzzleTestScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} activeOpacity={0.7}>
          <Text style={styles.backButtonText}>〈</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>🦁 아기 사자 퍼즐</Text>

        <View style={styles.placeholderBox} />
      </View>

      {/* 퍼즐 엔진이 보드와 조각을 직접 관리 */}
      <View style={styles.gameContainer}>
        <PuzzleBoard
          title="🦁 아기 사자 퍼즐"
          Artwork={BabyBunnyPuzzleScene}
          viewBoxWidth={240}
          viewBoxHeight={180}
          rows={1}
          columns={1}
          onComplete={() => {
            // TODO: 완성 효과음 및 애니메이션
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F0",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EBF8FF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#39465D",
  },

  backButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#39465D",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#39465D",
  },

  placeholderBox: {
    width: 40,
  },

  gameContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});

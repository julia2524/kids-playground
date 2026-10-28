import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressMoon from "../../components/stageMap/ProgressMoon";

const PROGRESS_VALUES = Array.from({ length: 11 }, (_, index) => index);

export default function ProgressMoonTestScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>달 진행도 테스트</Text>
        <Text style={styles.subtitle}>
          진행도에 따라 달 모양이 어떻게 변하는지 확인해 봐!
        </Text>

        <View style={styles.grid}>
          {PROGRESS_VALUES.map((progress) => (
            <View key={progress} style={styles.moonCard}>
              <ProgressMoon progress={progress} size={76} />

              <Text style={styles.progressText}>{progress}/10</Text>

              <Text style={styles.percentText}>{progress * 10}%</Text>
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>큰 사이즈 미리보기</Text>

        <View style={styles.largePreview}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((progress) => (
            <View key={progress} style={styles.largeCard}>
              <ProgressMoon progress={progress} size={112} />
              <Text style={styles.progressText}>{progress}/10</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F5F0",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#282A35",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: "#777985",
    marginBottom: 24,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 14,
  },
  moonCard: {
    width: "31.5%",
    minHeight: 126,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 14,
    marginBottom: 2,
  },
  progressText: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: "700",
    color: "#343644",
  },
  percentText: {
    marginTop: 3,
    fontSize: 12,
    color: "#898B96",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E1D9",
    marginVertical: 28,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#282A35",
    marginBottom: 16,
  },
  largePreview: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 14,
  },
  largeCard: {
    width: "48%",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 18,
  },
});

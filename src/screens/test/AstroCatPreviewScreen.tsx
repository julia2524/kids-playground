import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import AstroCatMascot from "../../components/Puzzle/assets/AstroCatMascot";

export const AstroCatPreviewScreen = () => {
  const [mascotSize, setMascotSize] = useState<number>(280);
  const [bgColor, setBgColor] = useState<string>("#1E1B2E"); // 우주 느낌의 어두운 배경 기본값

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 타이틀 */}
        <Text style={styles.title}>🚀 Kids Playground 마스코트 미리보기</Text>

        {/* 마스코트 SVG 렌더링 영역 */}
        <View style={styles.mascotCard}>
          <AstroCatMascot size={mascotSize} />
        </View>

        {/* 컨트롤러 1: 마스코트 크기 조절 */}
        <View style={styles.controlGroup}>
          <Text style={styles.label}>크기 조절 (현재: {mascotSize}px)</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => setMascotSize(180)}
            >
              <Text style={styles.btnText}>소 (180)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => setMascotSize(280)}
            >
              <Text style={styles.btnText}>중 (280)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => setMascotSize(360)}
            >
              <Text style={styles.btnText}>대 (360)</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 컨트롤러 2: 배경색 변경 (퍼즐 게임 배경 매칭 테스트) */}
        <View style={styles.controlGroup}>
          <Text style={styles.label}>배경색 테스트</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: "#1E1B2E" }]}
              onPress={() => setBgColor("#1E1B2E")}
            >
              <Text style={styles.btnText}>어두운 우주</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: "#F0E6FF" }]}
              onPress={() => setBgColor("#F0E6FF")}
            >
              <Text style={[styles.btnText, { color: "#333" }]}>
                파스텔 연보라
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: "#FFFFFF" }]}
              onPress={() => setBgColor("#FFFFFF")}
            >
              <Text style={[styles.btnText, { color: "#333" }]}>화이트</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00FFFF",
    marginVertical: 20,
    textAlign: "center",
  },
  mascotCard: {
    padding: 20,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    // 간단한 그림자
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  controlGroup: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#AAA",
    marginBottom: 8,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#7A56C4",
  },
  btnText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default AstroCatPreviewScreen;

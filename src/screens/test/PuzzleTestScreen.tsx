// import React from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   TouchableOpacity,
// } from "react-native";
// import BearPuzzleScene from "../../components/Puzzle/assets/PolarBear/PolarBearPuzzleScene";
// import PolarBearPuzzleScene from "../../components/Puzzle/assets/PolarBear/PolarBearPuzzleScene";
// import PinkyFarmBackground from "../../components/Puzzle/assets/PinkyPig/PinkyFarmBackground";
// import PinkyPigPuzzleScene from "../../components/Puzzle/assets/PinkyPig/PinkyPigPuzzleScene";
// import PochiPenguinPuzzleScene from "../../components/Puzzle/assets/PochiPenguin/PochiPenguinPuzzleScene";
// import BabyBunnyPuzzleScene from "../../components/Puzzle/assets/BabyBunny/BabyBunnyPuzzleScene";
// import BabyElephantPuzzleScene from "../../components/Puzzle/assets/BabyElephant/BabyElephantPuzzleScene";
// import ChocoBearPuzzleScene from "../../components/Puzzle/assets/ChocoBear/ChocoBearPuzzleScene";
// import BabyLion from "../../components/Puzzle/assets/BabyLion/BabyLion";
// import BabyLionPuzzleScene from "../../components/Puzzle/assets/BabyLion/BabyLionPuzzleScene";

// export default function PuzzleTestScreen() {
//   return (
//     <SafeAreaView style={styles.container}>
//       {/* 1. 상단 네비게이션 헤더 */}
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton} activeOpacity={0.7}>
//           <Text style={styles.backButtonText}>〈</Text>
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>🐻 곰 퍼즐 맞추기</Text>
//         <View style={styles.placeholderBox} />
//       </View>

//       {/* 2. 중앙 퍼즐 보드 영역 (SVG 그림이 들어가는 메인 판) */}
//       <View style={styles.boardContainer}>
//         <View style={styles.puzzleBoardCard}>
//           {/* <PolarBearPuzzleScene width="100%" height="100%" /> */}
//           {/* <PinkyPigPuzzleScene /> */}
//           {/* <PochiPenguinPuzzleScene /> */}
//           {/* <BabyBunnyPuzzleScene /> */}
//           {/* <BabyElephantPuzzleScene /> */}
//           {/* <ChocoBearPuzzleScene /> */}
//           <BabyLionPuzzleScene />
//         </View>
//       </View>

//       {/* 3. 하단 퍼즐 조각 대기 트레이 영역 */}
//       <View style={styles.trayContainer}>
//         <Text style={styles.trayTitle}>퍼즐 조각을 드래그해서 맞춰보세요!</Text>
//         <View style={styles.piecesRow}>
//           <View style={styles.piecePlaceholder}>
//             <Text style={styles.pieceText}>조각 1</Text>
//           </View>
//           <View style={styles.piecePlaceholder}>
//             <Text style={styles.pieceText}>조각 2</Text>
//           </View>
//           <View style={styles.piecePlaceholder}>
//             <Text style={styles.pieceText}>조각 3</Text>
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFF9F0", // 지침서의 크림 화이트 배경
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//   },
//   backButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#EBF8FF",
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 2,
//     borderColor: "#39465D",
//   },
//   backButtonText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#39465D",
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: "800",
//     color: "#39465D",
//   },
//   placeholderBox: {
//     width: 40,
//   },
//   boardContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 20,
//   },
//   puzzleBoardCard: {
//     width: "100%",
//     aspectRatio: 4 / 3, // 240:180 비율 유지
//     backgroundColor: "#FFFFFF",
//     borderRadius: 24,
//     borderWidth: 3.5,
//     borderColor: "#39465D",
//     // 부드러운 입체감 그림자 효과
//     shadowColor: "#39465D",
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//     elevation: 6,
//     overflow: "hidden",
//   },
//   trayContainer: {
//     height: 150,
//     backgroundColor: "#8ED6F2", // 스카이 블루 계열 트레이
//     borderTopLeftRadius: 28,
//     borderTopRightRadius: 28,
//     borderTopWidth: 3.5,
//     borderLeftWidth: 3.5,
//     borderRightWidth: 3.5,
//     borderColor: "#39465D",
//     padding: 16,
//     alignItems: "center",
//   },
//   trayTitle: {
//     fontSize: 15,
//     fontWeight: "700",
//     color: "#39465D",
//     marginBottom: 12,
//   },
//   piecesRow: {
//     flexDirection: "row",
//     gap: 12,
//   },
//   piecePlaceholder: {
//     width: 75,
//     height: 60,
//     backgroundColor: "#FFF9F0",
//     borderRadius: 14,
//     borderWidth: 2.5,
//     borderColor: "#39465D",
//     alignItems: "center",
//     justifyContent: "center",
//     shadowColor: "#39465D",
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   pieceText: {
//     fontSize: 13,
//     fontWeight: "700",
//     color: "#39465D",
//   },
// });

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import PuzzleBoard from "../../components/Puzzle/engine/PuzzleBoard";
import BabyLionPuzzleArtwork from "../../components/Puzzle/assets/BabyLion/BabyLionPuzzleArtwork";
import BabyBunnyPuzzleScene from "../../components/Puzzle/assets/BabyBunny/BabyBunnyPuzzleScene";
import BabyElephantPuzzleScene from "../../components/Puzzle/assets/BabyElephant/BabyElephantPuzzleScene";
import ChocoBearPuzzleScene from "../../components/Puzzle/assets/ChocoBear/ChocoBearPuzzleScene";
import PinkyPigPuzzleScene from "../../components/Puzzle/assets/PinkyPig/PinkyPigPuzzleScene";
import PochiPenguinPuzzleScene from "../../components/Puzzle/assets/PochiPenguin/PochiPenguinPuzzleScene";
import PolarBearPuzzleScene from "../../components/Puzzle/assets/PolarBear/PolarBearPuzzleScene";

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
          Artwork={PolarBearPuzzleScene}
          viewBoxWidth={240}
          viewBoxHeight={180}
          rows={3}
          columns={2}
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

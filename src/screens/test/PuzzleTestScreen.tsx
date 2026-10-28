// import React from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   TouchableOpacity,
// } from "react-native";

// import PuzzleBoard from "../../components/Puzzle/engine/PuzzleBoard";

// import PolarBearPuzzleScene from "../../components/Puzzle/assets/animal/PolarBear/PolarBearPuzzleScene";
// import BabyBunnyPuzzleScene from "../../components/Puzzle/assets/animal/BabyBunny/BabyBunnyPuzzleScene";
// import KoreaFlagPuzzleScene from "../../components/Puzzle/assets/flag/Korea/KoreaFlagPuzzleScene";

// export default function PuzzleTestScreen() {
//   return (
//     <SafeAreaView style={styles.container}>
//       {/* 상단 헤더 */}
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton} activeOpacity={0.7}>
//           <Text style={styles.backButtonText}>〈</Text>
//         </TouchableOpacity>

//         <Text style={styles.headerTitle}>🦁 아기 사자 퍼즐</Text>

//         <View style={styles.placeholderBox} />
//       </View>

//       {/* 퍼즐 엔진이 보드와 조각을 직접 관리 */}
//       <View style={styles.gameContainer}>
//         <PuzzleBoard
//           title="🦁 아기 사자 퍼즐"
//           Artwork={BabyBunnyPuzzleScene}
//           viewBoxWidth={240}
//           viewBoxHeight={180}
//           rows={2}
//           columns={2}
//           onComplete={() => {
//             // TODO: 완성 효과음 및 애니메이션
//           }}
//         />
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFF9F0",
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

//   gameContainer: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingTop: 12,
//     paddingBottom: 16,
//     alignItems: "center",
//     justifyContent: "center",
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
import KoreaFlagPuzzleArtwork from "../../components/Puzzle/assets/flag/KoreaFlagPuzzleScene";
import UsaFlagPuzzleScene from "../../components/Puzzle/assets/flag/UsaFlagPuzzleScene";
import KoreaFlagPuzzleScene from "../../components/Puzzle/assets/flag/KoreaFlagPuzzleScene";
import { JapanFlagPuzzleScene } from "../../components/Puzzle/assets/flag/JapanFlagPuzzleScene";
import { FranceFlagPuzzleScene } from "../../components/Puzzle/assets/flag/FranceFlagPuzzleScene";
import { ChinaFlagPuzzleScene } from "../../components/Puzzle/assets/flag/ChinaFlagPuzzleScene";
import { UKFlagPuzzleScene } from "../../components/Puzzle/assets/flag/UKFlagPuzzleScene";
import { AustraliaPuzzleScene } from "../../components/Puzzle/assets/flag/AustraliaPuzzleScene";

export default function PuzzleTestScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} activeOpacity={0.7}>
          <Text style={styles.backButtonText}>〈</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>🇰🇷 태극기 퍼즐</Text>

        <View style={styles.placeholderBox} />
      </View>

      {/* 퍼즐 엔진이 보드와 조각을 직접 관리 */}
      <View style={styles.gameContainer}>
        <PuzzleBoard
          title="🇰🇷 태극기 퍼즐"
          Artwork={AustraliaPuzzleScene}
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

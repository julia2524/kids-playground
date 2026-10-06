import React, { useMemo, useState } from "react";

import { Button, Text, View } from "react-native";
import { colorSortingLevels } from "../../types/colorSortingLevels";
import { generateColorSortingProblem } from "../../generators/generateColorSortingProblem";
import { classificationItems } from "../../data/classification/classificationItems";
import ColorSortingProblemPreview from "./ColorSortProblemPreview";

export default function ColorSortingPreviewScreen() {
  const [level, setLevel] = useState(1);

  const [round, setRound] = useState(1);

  const problem = useMemo(() => {
    const config = colorSortingLevels.find((item) => item.level === level);

    if (!config) {
      return null;
    }

    return generateColorSortingProblem(config, round, classificationItems);
  }, [level, round]);

  if (!problem) {
    return (
      <View>
        <Text>Problem을 만들 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* ================================================= */}
      {/* CONTROL */}
      {/* ================================================= */}

      <View
        style={{
          padding: 16,
          gap: 10,
        }}
      >
        <Text>현재 Level: {level}</Text>

        <View
          style={{
            flexDirection: "row",
            gap: 8,
          }}
        >
          <Button
            title="← Level"
            onPress={() => setLevel(Math.max(1, level - 1))}
          />

          <Button
            title="Level →"
            onPress={() => setLevel(Math.min(8, level + 1))}
          />

          <Button
            title="🎲 다시 생성"
            onPress={() => setRound((prev) => prev + 1)}
          />
        </View>
      </View>

      {/* ================================================= */}
      {/* PREVIEW */}
      {/* ================================================= */}

      <ColorSortingProblemPreview problem={problem} />
    </View>
  );
}

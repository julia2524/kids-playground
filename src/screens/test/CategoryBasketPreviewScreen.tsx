import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import {
  BasketTargetData,
  CATEGORY_BASKETS,
  SUB_CATEGORY_BASKETS,
} from "../../types/Classification/Category/categorySortingTypes";

type BasketMode = "category" | "subcategory";

export default function CategoryBasketPreviewScreen() {
  const [mode, setMode] = useState<BasketMode>("category");

  const targets: BasketTargetData[] =
    mode === "category"
      ? Object.values(CATEGORY_BASKETS)
      : Object.values(SUB_CATEGORY_BASKETS);

  return (
    <Screen>
      <Heading>분류 바구니 미리보기</Heading>

      <Description>그림을 보고 알맞은 바구니를 찾아봐!</Description>

      <ModeRow>
        <ModeButton
          $active={mode === "category"}
          onPress={() => setMode("category")}
        >
          <ModeText $active={mode === "category"}>큰 분류</ModeText>
        </ModeButton>

        <ModeButton
          $active={mode === "subcategory"}
          onPress={() => setMode("subcategory")}
        >
          <ModeText $active={mode === "subcategory"}>작은 분류</ModeText>
        </ModeButton>
      </ModeRow>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 32,
        }}
        showsVerticalScrollIndicator={false}
      >
        <BasketGrid>
          {targets.map((target) => (
            <BasketCard
              key={target.id}
              target={target}
              onPress={() => {
                console.log("선택한 바구니:", target.id);
              }}
            />
          ))}
        </BasketGrid>
      </ScrollView>
    </Screen>
  );
}

function BasketCard({
  target,
  onPress,
}: {
  target: BasketTargetData;
  onPress: () => void;
}) {
  return (
    <BasketPressable onPress={onPress}>
      <Basket
        style={{
          backgroundColor: target.backgroundColor,
          borderColor: target.borderColor,
        }}
      >
        <BasketOpening
          style={{
            borderColor: target.borderColor,
          }}
        />

        <BasketEmoji>{target.emoji}</BasketEmoji>

        <BasketBody
          style={{
            borderColor: target.borderColor,
          }}
        >
          <BasketLabel>{target.label}</BasketLabel>
        </BasketBody>
      </Basket>

      <BasketDescription>{target.description}</BasketDescription>
    </BasketPressable>
  );
}

const Screen = styled(SafeAreaView)`
  flex: 1;
  background-color: #eef0fe;
  padding: 16px;
`;

const Heading = styled.Text`
  font-size: 23px;
  font-weight: 900;
  color: #514b59;
  text-align: center;
  margin-top: 18px;
`;

const Description = styled.Text`
  font-size: 14px;
  color: #777184;
  text-align: center;
  margin-top: 8px;
  margin-bottom: 20px;
`;

const ModeRow = styled.View`
  flex-direction: row;
  gap: 10px;
  margin-bottom: 20px;
`;

const ModeButton = styled(TouchableOpacity)<{
  $active: boolean;
}>`
  flex: 1;
  padding: 13px;
  border-radius: 16px;
  align-items: center;
  background-color: ${({ $active }) => ($active ? "#7164D8" : "#FFFFFF")};
  border-width: 2px;
  border-color: ${({ $active }) => ($active ? "#7164D8" : "#E1DDF0")};
`;

const ModeText = styled.Text<{ $active: boolean }>`
  font-size: 15px;
  font-weight: 800;
  color: ${({ $active }) => ($active ? "#FFFFFF" : "#716B7D")};
`;

const BasketGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 18px;
`;

const BasketPressable = styled(TouchableOpacity)`
  width: 48%;
  align-items: center;
`;

const Basket = styled.View`
  width: 100%;
  height: 150px;
  border-width: 2px;
  border-radius: 24px;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
`;

const BasketOpening = styled.View`
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  height: 13px;
  border-width: 2px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.65);
`;

const BasketEmoji = styled.Text`
  font-size: 47px;
  margin-top: 16px;
  margin-bottom: 8px;
`;

const BasketBody = styled.View`
  width: 100%;
  padding: 9px 4px;
  border-width: 1.5px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.8);
  align-items: center;
`;

const BasketLabel = styled.Text`
  font-size: 14px;
  font-weight: 900;
  color: #514b59;
  text-align: center;
`;

const BasketDescription = styled.Text`
  margin-top: 8px;
  font-size: 12px;
  line-height: 17px;
  color: #777184;
  text-align: center;
`;

import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import styled from "styled-components/native";
import CategoryScene, {
  CategorySceneType,
} from "../../assets/Classification/CategoryScene";

const categories: {
  id: CategorySceneType;
  label: string;
}[] = [
  { id: "animal", label: "동물" },
  { id: "food", label: "음식" },
  { id: "clothing", label: "옷과 꾸미기" },
  { id: "nature", label: "자연" },
  { id: "vehicle", label: "탈것" },
  { id: "living", label: "생활용품" },
];

export default function CategoryScenePreviewScreen() {
  return (
    <Screen>
      <Heading>대분류 SVG 미리보기</Heading>

      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <Grid>
          {categories.map((category) => (
            <Card key={category.id}>
              <CategoryScene category={category.id} width={160} height={120} />
              <Label>{category.label}</Label>
            </Card>
          ))}
        </Grid>
      </ScrollView>
    </Screen>
  );
}

const Screen = styled(SafeAreaView)`
  flex: 1;
  background-color: #eef0fe;
  padding: 12px;
`;

const Heading = styled.Text`
  font-size: 21px;
  font-weight: 900;
  color: #514b59;
  text-align: center;
  margin: 20px 0;
`;

const Grid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  row-gap: 16px;
`;

const Card = styled.View`
  width: 48%;
  align-items: center;
  padding: 8px;
  border-radius: 20px;
  background-color: #ffffff;
`;

const Label = styled.Text`
  font-size: 15px;
  font-weight: 800;
  color: #514b59;
  margin-top: 6px;
`;

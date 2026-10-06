import React from "react";
import styled from "styled-components/native";

import { ClassificationColorId, ClassificationItem } from "../../types/game";

import { COLOR_SORTING_COLORS } from "../../data/classification/colorSortingColors";

import { ColorSortingProblem } from "../../types/colorSotringTypes";

// ⚠️ 이 import 경로는 네 ClassificationItem 데이터가 실제로 있는 곳으로 맞춰줘.
// 예:
// import { classificationItems } from "../../data/classification/classificationItems";

import { classificationItems } from "../../data/classification/classificationItems";
import { RenderColorSortingObjectSvg } from "../../assets/Classification/classificationItemSvgs";

// ============================================================
// COLOR LABELS
// ============================================================

const COLOR_LABELS: Record<ClassificationColorId, string> = {
  natural: "자연색",
  red: "빨강",
  orange: "주황",
  yellow: "노랑",
  green: "초록",
  blue: "파랑",
  purple: "보라",
  pink: "분홍",
  brown: "갈색",
  black: "검정",
  white: "하양",
};

// ============================================================
// TYPES
// ============================================================

type Props = {
  problem: ColorSortingProblem;
};

// ============================================================
// COMPONENT
// ============================================================

export default function ColorSortingProblemPreview({ problem }: Props) {
  return (
    <Container>
      {/* ======================================================
       * HEADER
       * ====================================================== */}

      <Header>
        <Title>Color Sorting Preview</Title>

        <Meta>
          Level {problem.level} / Round {problem.round}
        </Meta>
      </Header>

      {/* ======================================================
       * OBJECTS
       * ====================================================== */}

      <SectionTitle>Objects</SectionTitle>

      <ObjectArea>
        {problem.objects.map((object) => {
          // ----------------------------------------------------
          // L2 ~ L8
          // 실제 ClassificationItem 찾기
          // ----------------------------------------------------

          const item = classificationItems.find(
            (item: ClassificationItem) => item.id === object.itemId,
          );

          // ----------------------------------------------------
          // 해당 Item의 현재 색상 variant 찾기
          // ----------------------------------------------------

          const variant = item?.variants.find(
            (variant) => variant.colorId === object.colorId,
          );

          // ----------------------------------------------------
          // L1 기본 도형용 색상
          //
          // colorId → HEX
          // ----------------------------------------------------

          const basicColor = COLOR_SORTING_COLORS[object.colorId];

          return (
            <ObjectCard key={object.id}>
              {/* SVG */}

              <SvgArea>
                <RenderColorSortingObjectSvg
                  object={object}
                  primary={variant?.primary ?? basicColor}
                  secondary={variant?.secondary}
                  accent={variant?.accent}
                  size={95}
                />
              </SvgArea>

              {/* 이름 */}

              <ObjectLabel>{object.label}</ObjectLabel>

              {/* Object ID */}

              <ObjectId>{object.id}</ObjectId>

              {/* 개발 확인용 정보 */}

              <DebugText>{object.itemId}</DebugText>

              <DebugText>{object.colorId}</DebugText>

              <DebugText>shape: {object.shape}</DebugText>
            </ObjectCard>
          );
        })}
      </ObjectArea>

      {/* ======================================================
       * TARGETS
       * ====================================================== */}

      <SectionTitle>Targets</SectionTitle>

      <TargetArea>
        {problem.targets.map((target) => (
          <Target
            key={target.id}
            style={{
              borderColor: COLOR_SORTING_COLORS[target.colorId],
            }}
          >
            <TargetDot
              style={{
                backgroundColor: COLOR_SORTING_COLORS[target.colorId],
              }}
            />

            <TargetLabel>{target.label}</TargetLabel>
          </Target>
        ))}
      </TargetArea>

      {/* ======================================================
       * ANSWER
       * ====================================================== */}

      <SectionTitle>Answer</SectionTitle>

      <AnswerArea>
        {problem.answer.map((group) => (
          <AnswerGroup key={group.targetColorId}>
            <AnswerTitle>{COLOR_LABELS[group.targetColorId]}</AnswerTitle>

            {group.objectIds.map((objectId) => (
              <AnswerObject key={objectId}>{objectId}</AnswerObject>
            ))}
          </AnswerGroup>
        ))}
      </AnswerArea>
    </Container>
  );
}

// ============================================================
// STYLES
// ============================================================

const Container = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

const Header = styled.View`
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: 700;
`;

const Meta = styled.Text`
  margin-top: 6px;
  font-size: 14px;
  color: #666;
`;

const SectionTitle = styled.Text`
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 700;
`;

const ObjectArea = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
`;

const ObjectCard = styled.View`
  width: 140px;
  min-height: 180px;
  padding: 10px;
  border-radius: 12px;
  background-color: #f5f5f5;
  align-items: center;
`;

const SvgArea = styled.View`
  width: 100px;
  height: 100px;
  align-items: center;
  justify-content: center;
`;

const ObjectLabel = styled.Text`
  margin-top: 6px;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
`;

const ObjectId = styled.Text`
  margin-top: 4px;
  font-size: 11px;
  color: #777;
`;

const DebugText = styled.Text`
  margin-top: 2px;
  font-size: 10px;
  color: #999;
`;

const TargetArea = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
`;

const Target = styled.View`
  min-width: 120px;
  padding: 12px;
  border-width: 3px;
  border-radius: 12px;
  flex-direction: row;
  align-items: center;
`;

const TargetDot = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  margin-right: 8px;
`;

const TargetLabel = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;

const AnswerArea = styled.View`
  gap: 10px;
`;

const AnswerGroup = styled.View`
  padding: 12px;
  border-radius: 12px;
  background-color: #f5f5f5;
`;

const AnswerTitle = styled.Text`
  margin-bottom: 6px;
  font-size: 16px;
  font-weight: 700;
`;

const AnswerObject = styled.Text`
  font-size: 13px;
  color: #666;
`;

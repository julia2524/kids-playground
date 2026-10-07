import React from "react";

import { useWindowDimensions } from "react-native";

import styled from "styled-components/native";

const DESIGN_WIDTH = 360;

const DESIGN_HEIGHT = 800;

export default function ResponsiveScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const { width, height } = useWindowDimensions();

  const scale = Math.min(width / DESIGN_WIDTH, height / DESIGN_HEIGHT);

  const scaledWidth = DESIGN_WIDTH * scale;

  const scaledHeight = DESIGN_HEIGHT * scale;

  return (
    <Screen>
      <Viewport style={{ width: scaledWidth, height: scaledHeight }}>
        <ScaledContent
          style={{
            width: DESIGN_WIDTH,

            height: DESIGN_HEIGHT,

            transform: [
              { translateX: (scaledWidth - DESIGN_WIDTH) / 2 },

              { translateY: (scaledHeight - DESIGN_HEIGHT) / 2 },

              { scale },
            ],
          }}
        >
          {children}
        </ScaledContent>
      </Viewport>
    </Screen>
  );
}

const Screen = styled.View`
  flex: 1;

  align-items: center;

  justify-content: center;

  overflow: hidden;
`;

const Viewport = styled.View`
  overflow: hidden;
`;

const ScaledContent = styled.View`
  /* children이 디자인 좌표계(360×800)로 배치됨 */
`;

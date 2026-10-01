import styled from "styled-components/native";
import CandyStar from "./CandyStar";

interface StarBadgeProps {
  type?: "full" | "half" | "empty";
  size?: number;
}

export default function StarBadge({
  type = "empty",
  size = 30,
}: StarBadgeProps) {
  return (
    <Badge>
      <CandyStar size={size} type={type} />
    </Badge>
  );
}

const Badge = styled.View`
  flex-direction: row;
  align-items: center;
`;

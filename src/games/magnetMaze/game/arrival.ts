import { GAME_CONFIG } from "../../../constants/magnetMaze/gameConfig";

/**
 * 화면에 표시하는 목적지 반지름.
 * PathGuide의 별 크기와 동일하게 유지한다.
 */
export function goalRadiusFor(corridorWidth?: number): number {
  return corridorWidth
    ? Math.min(GAME_CONFIG.GOAL_RADIUS, corridorWidth / 2 - 3)
    : GAME_CONFIG.GOAL_RADIUS;
}

/**
 * 실제 도착 판정 반지름.
 *
 * 쇠구슬 중심이 목적지 중심에 충분히 가까워져야 성공한다.
 * 화면에 그리는 별의 크기와는 별도로 관리한다.
 */
export function goalArrivalRadiusFor(corridorWidth?: number): number {
  const visualRadius = goalRadiusFor(corridorWidth);

  return Math.min(GAME_CONFIG.BALL_RADIUS * 0.6, visualRadius * 0.4);
}

/**
 * 쇠구슬 중심이 실제 도착 판정 영역 안에 들어오면 도착.
 */
export function isArrived(
  ballX: number,
  ballY: number,
  goalX: number,
  goalY: number,
  radius: number,
): boolean {
  "worklet";

  if (radius <= 0) return false;

  const dx = ballX - goalX;
  const dy = ballY - goalY;

  return dx * dx + dy * dy <= radius * radius;
}

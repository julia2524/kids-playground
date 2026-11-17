/**
 * Level 1 자동 시연 컨트롤러 (worklet-friendly 상수 + 단계 정의)
 *
 * 시연 구슬은 물리 구슬과 별개인 TutorialGhostBall 을 쓴다.
 * 펜은 실제 MagnetPen 을 움직여, 가짜 구슬을 별(목적지) 한가운데까지 가져간다.
 *
 * 설계 원칙:
 * - 아이의 터치가 항상 우선 (tutorialActive SharedValue 를 제스처에서 즉시 0).
 * - 시연 중 타이머는 돌리지 않는다 (JS 쪽 tutorialDone 플래그로 게이트).
 * - 시연이 실제 라운드를 클리어하지 않는다 (물리 구슬은 시작 위치 유지).
 */

export const TutPhase = {
  IDLE: 0,
  /** 펜이 시연 구슬(시작 위치)로 접근 */
  APPROACH: 1,
  /** 시연 구슬이 팁에 "붙음" (시각적 부착) */
  ATTACH: 2,
  /** 시연 구슬을 별 중심(goal)까지 이동 */
  MOVE_TO_GOAL: 3,
  /** 별 한가운데에서 잠깐 보여 준 뒤 페이드아웃 */
  FINISHING: 4,
} as const;

export type TutPhaseValue = (typeof TutPhase)[keyof typeof TutPhase];

/** 시연 중 펜(팁) 이동 속도 px/s — 아이 시선에 맞춘 느린 속도 */
export const TUTORIAL_PEN_SPEED = 150;

/** 부착으로 간주하는 팁–구슬 거리 (px) */
export const TUTORIAL_ATTACH_DISTANCE = 36;

/** 별 중심에 도달했다고 보는 거리 (px) */
export const TUTORIAL_GOAL_ARRIVE = 8;

/** FINISHING 단계에서 별 위에서 보여 주는 시간(초) */
export const TUTORIAL_FINISH_HOLD = 0.45;

/** FINISHING 페이드아웃 시간(초) */
export const TUTORIAL_FADE_OUT = 0.35;

/**
 * Level 1 의 모든 라운드(1~5) 진입 시 시연한다.
 * Level 2 이상에서는 false.
 */
export function shouldRunMazeTutorial(levelId: number): boolean {
  return levelId === 1;
}

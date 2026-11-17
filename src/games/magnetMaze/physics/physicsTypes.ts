import type { SharedValue } from "react-native-reanimated";

// 쇠구슬 상태 (worklet에서 쓰기 편하도록 숫자 상수로 정의)
export const BallMode = {
  FREE: 0, // 자유 상태
  ATTACHED: 1, // 자석펜에 부착
  RELEASED: 2, // 방금 분리되어 굴러가는 중
} as const;

// 물리 계산과 렌더링이 함께 읽고 쓰는 값들. 전부 "게임 보드 기준 좌표"다.
export interface PhysicsShared {
  // 보드 크기
  boardW: SharedValue<number>;
  boardH: SharedValue<number>;

  // 쇠구슬
  ballX: SharedValue<number>;
  ballY: SharedValue<number>;
  ballVX: SharedValue<number>;
  ballVY: SharedValue<number>;
  ballMode: SharedValue<number>;
  ballRadius: SharedValue<number>; // 레벨마다 다를 수 있음
  // 부착 시 (구슬 - 자석끝) 상대 좌표. 0으로 서서히 줄어들며 "착!" 하고 빨려 붙는다
  attachOffX: SharedValue<number>;
  attachOffY: SharedValue<number>;

  // 자석펜 (손가락 위치 = 펜 중심)
  penX: SharedValue<number>;
  penY: SharedValue<number>;
  penActive: SharedValue<number>; // 1 = 터치 중
  /** 미로 바깥 투명 여유 공간 두께(px). 자석 끝은 미로 사각형 바깥 이만큼까지 나갈 수 있다 (구슬은 못 나감) */
  penMargin: SharedValue<number>;
  penVX: SharedValue<number>; // 자석 끝의 부드러운 속도 (손 뗄 때 관성에 사용)
  penVY: SharedValue<number>;
  prevTipX: SharedValue<number>;
  prevTipY: SharedValue<number>;

  // 벽 (라운드 시작 때 한 번 계산해서 넣어 두고, 매 프레임 읽기만 한다)
  wallSegs: SharedValue<number[]>; // 통로 중심선 선분 [ax, ay, bx, by, ...] (보드 px)
  wallCount: SharedValue<number>; // 선분 개수. 0 이면 벽 없음(충돌 안 함)
  wallReach: SharedValue<number>; // 구슬 "중심"이 중심선에서 떨어질 수 있는 최대 거리
  /** 1 = 라운드 확정(성공/실패) → 입력 차단, 물리 정지 */
  locked: SharedValue<number>;
  /** 목적지 도착 판정 영역 (보드 px). goalR <= 0 이면 목적지 없음 */
  goalX: SharedValue<number>;
  goalY: SharedValue<number>;
  goalR: SharedValue<number>;

  // ── 벽 충돌음 이벤트 (물리 → 화면). 화면은 wallCollisionEvent 가 바뀐 것을 보고 소리를 낸다 ──
  /** 새 충돌이 생길 때마다 1씩 증가하는 번호 (boolean 이 아니라 카운터라서 프레임 사이에 누락되지 않음) */
  wallCollisionEvent: SharedValue<number>;
  /** 가장 최근 충돌의 강도 0~1 (법선 방향 충돌 속도 / MAX_SPEED) */
  wallCollisionIntensity: SharedValue<number>;
  /** 벽 접촉 유지 시간(초). 0 = 접촉 없음. 접촉이 끊긴 뒤 잠깐 남겨 두어 벽 슬라이딩 중 소리 반복을 막는다 */
  wallContactTime: SharedValue<number>;
  /**
   * 최근 소리를 낸 접촉면 법선 2개 [ax, ay, bx, by, 다음에 덮어쓸 슬롯(0|1)].
   * 코너(면 2개에 동시에 닿음)에서 소리가 번갈아 반복되지 않으면서, 새로운 면에 부딪힌 것은 구별하는 데 쓴다
   */
  wallContactNormals: SharedValue<number[]>;
}

// import { GAME_CONFIG } from "../../../constants/magnetMaze/gameConfig";
// import { clamp, distance } from "./collision";
// import { magnetAccel } from "./magneticForce";
// import { BallMode, type PhysicsShared } from "./physicsTypes";
// import { moveWithWalls, resolveWalls } from "./wallCollision";

// /** 펜 중심(손가락) 좌표 → 자석 끝 좌표 */
// export function getTip(penX: number, penY: number) {
//   "worklet";
//   return {
//     x: penX + GAME_CONFIG.TIP_OFFSET_X,
//     y: penY + GAME_CONFIG.TIP_OFFSET_Y,
//   };
// }

// /** 손가락(미로 사각형 기준 좌표)이 움직였을 때 펜 위치 갱신. 자석 끝은 미로 + 투명 여유 공간 안으로 제한. */
// export function movePen(
//   s: PhysicsShared,
//   x: number,
//   y: number,
//   isBegin: boolean,
// ) {
//   "worklet";
//   if (s.locked.value === 1) return; // 성공/실패 확정 후에는 조작 차단
//   // 자석 "끝"이 보드 안에 머물도록 제한한다. (끝은 손가락보다 위쪽이라, 손가락 기준으로 제한하면
//   // 보드 아래쪽 TIP_OFFSET 만큼은 자석 끝이 닿지 못해 그곳의 목적지에 갈 수 없다)
//   // 좌표 기준은 "미로 사각형"이다. 투명 여유 공간(penMargin)만큼은 미로 바깥으로도 나갈 수 있다.
//   const m = s.penMargin.value;
//   const px =
//     clamp(x + GAME_CONFIG.TIP_OFFSET_X, -m, s.boardW.value + m) -
//     GAME_CONFIG.TIP_OFFSET_X;
//   const py =
//     clamp(y + GAME_CONFIG.TIP_OFFSET_Y, -m, s.boardH.value + m) -
//     GAME_CONFIG.TIP_OFFSET_Y;
//   s.penX.value = px;
//   s.penY.value = py;
//   if (isBegin) {
//     // 처음 터치한 순간 속도가 튀지 않도록 기준점을 맞춰 둔다
//     const tip = getTip(px, py);
//     s.prevTipX.value = tip.x;
//     s.prevTipY.value = tip.y;
//     s.penVX.value = 0;
//     s.penVY.value = 0;
//     s.penActive.value = 1;
//   }
// }

// export function resetBall(s: PhysicsShared, x: number, y: number) {
//   "worklet";
//   s.ballX.value = x;
//   s.ballY.value = y;
//   s.ballVX.value = 0;
//   s.ballVY.value = 0;
//   s.ballMode.value = BallMode.FREE;
//   s.attachOffX.value = 0;
//   s.attachOffY.value = 0;
// }

// /** 충돌 결과: 위치 보정 + "어디에 부딪혔는지"를 경로 벽과 보드 테두리로 나눠서 돌려준다 */
// interface ClampResult {
//   x: number;
//   y: number;
//   /**
//    * 경로(미로) 벽에 부딪힘. 법선은 "통로 안쪽"(벽에서 멀어지는 방향)이다.
//    * 보드 테두리 법선(edgeNx/edgeNy)과 같은 방향 규칙이라 같은 반응 함수(bounceVelocity)를 쓸 수 있다.
//    * (resolveWalls 가 돌려주는 법선은 통로 중심선에서 구슬 쪽, 즉 벽 쪽을 향하므로 부호를 뒤집어 담는다.
//    *  예전에는 이 부호를 그대로 써서 벽으로 들어가는 속도(vn > 0)가 반응 조건(vn < 0)에 걸리지 않았고,
//    *  Level 2 이후 경로 벽에서는 튕김이 전혀 적용되지 않았다.)
//    */
//   wallHit: boolean;
//   wallNx: number;
//   wallNy: number;
//   /** 보드 테두리에 부딪힘. 축마다 따로 (모서리에서는 x, y 둘 다 나올 수 있다). 0 = 안 부딪힘 */
//   edgeNx: number; // +1 = 왼쪽 테두리, -1 = 오른쪽 테두리
//   edgeNy: number; // +1 = 위쪽 테두리, -1 = 아래쪽 테두리
// }

// /**
//  * 보드 경계 + 경로 벽 충돌을 한 번에 적용.
//  * 경로 벽이 있으면 중심선 reach 안으로 되돌리고, 없으면 보드 테두리만 처리.
//  *
//  * 경로 벽 법선과 보드 테두리 법선을 서로 덮어쓰지 않고 따로 돌려준다.
//  * (테두리 법선이 경로 벽 법선을 지우거나, 모서리에서 y 법선이 x 법선을 지우던 문제 방지)
//  */
// function clampToBoardAndWalls(
//   s: PhysicsShared,
//   x: number,
//   y: number,
//   r: number,
//   anchorX?: number,
//   anchorY?: number,
// ): ClampResult {
//   "worklet";
//   const segs = s.wallSegs.value;
//   const count = s.wallCount.value;
//   const reach = s.wallReach.value;

//   let cx = x;
//   let cy = y;
//   let wallHit = false;
//   let wallNx = 0;
//   let wallNy = 0;
//   let edgeNx = 0;
//   let edgeNy = 0;

//   // 경로 벽 (Level 1 은 count=0 → 스킵)
//   // anchor = 직전 구슬 위치 → 다른 통로로 순간이동 방지
//   if (count > 0 && reach > 0) {
//     const res = resolveWalls(segs, count, reach, cx, cy, anchorX, anchorY);
//     cx = res.x;
//     cy = res.y;
//     wallHit = res.hit;
//     wallNx = -res.nx;
//     wallNy = -res.ny;
//   }

//   // 보드 테두리
//   const maxX = s.boardW.value - r;
//   const maxY = s.boardH.value - r;
//   if (cx < r) {
//     cx = r;
//     edgeNx = 1;
//   } else if (cx > maxX) {
//     cx = maxX;
//     edgeNx = -1;
//   }
//   if (cy < r) {
//     cy = r;
//     edgeNy = 1;
//   } else if (cy > maxY) {
//     cy = maxY;
//     edgeNy = -1;
//   }

//   return { x: cx, y: cy, wallHit, wallNx, wallNy, edgeNx, edgeNy };
// }

// /**
//  * 충돌 속도 반응. 법선 방향 속도만 반전(반발 계수 e)하고, 벽을 따라 흐르는 접선 성분은 그대로 둔다.
//  * 이미 벽에서 멀어지는 중(vn >= 0)이면 건드리지 않는다.
//  */
// function bounceVelocity(
//   vx: number,
//   vy: number,
//   nx: number,
//   ny: number,
//   e: number,
// ): { vx: number; vy: number } {
//   "worklet";
//   const vn = vx * nx + vy * ny;
//   if (vn >= 0) return { vx, vy };
//   return { vx: vx - (1 + e) * vn * nx, vy: vy - (1 + e) * vn * ny };
// }

// /**
//  * 한 번의 위치 보정 결과에 대한 속도 반응.
//  *  - 보드 테두리: 모든 레벨 공통으로 WALL_BOUNCE (Level 1 의 튕김과 같음). 모서리면 x, y 축 각각 반발.
//  *  - 경로 벽: PATH_WALL_BOUNCE (내부 벽 전용, 따로 조절 가능)
//  * 위치는 이미 clamp 가 경계 위로 되돌려 놓았으므로, 여기서는 속도만 바꾼다. 위치/속도 처리가 서로 섞이지 않는다.
//  */
// function applyCollisionResponse(
//   vx: number,
//   vy: number,
//   res: ClampResult,
// ): { vx: number; vy: number } {
//   "worklet";
//   const C = GAME_CONFIG;
//   let v = { vx, vy };
//   if (res.wallHit) {
//     v = bounceVelocity(v.vx, v.vy, res.wallNx, res.wallNy, C.PATH_WALL_BOUNCE);
//   }
//   if (res.edgeNx !== 0) {
//     v = bounceVelocity(v.vx, v.vy, res.edgeNx, 0, C.WALL_BOUNCE);
//   }
//   if (res.edgeNy !== 0) {
//     v = bounceVelocity(v.vx, v.vy, 0, res.edgeNy, C.WALL_BOUNCE);
//   }
//   return v;
// }

// /** 물리 한 스텝. 프레임마다 실제 경과 시간(dt, 초)을 넣어서 호출한다. */
// export function stepPhysics(s: PhysicsShared, rawDt: number) {
//   "worklet";
//   const C = GAME_CONFIG;
//   // 프레임이 크게 늦어져도 구슬이 튀지 않도록 dt 상한
//   const dt = Math.min(rawDt, C.MAX_DT);
//   if (dt <= 0) return;

//   const active = s.penActive.value === 1;
//   const tip = getTip(s.penX.value, s.penY.value);
//   // 레벨마다 구슬 크기가 다를 수 있음
//   const r = s.ballRadius.value > 0 ? s.ballRadius.value : C.BALL_RADIUS;

//   // ── 1) 손가락을 뗐다 → 분리 (펜 속도를 약하게 전달) ──
//   if (!active && s.ballMode.value === BallMode.ATTACHED) {
//     let vx = s.penVX.value * C.RELEASE_INERTIA;
//     let vy = s.penVY.value * C.RELEASE_INERTIA;
//     const sp = Math.sqrt(vx * vx + vy * vy);
//     if (sp > C.MAX_RELEASE_SPEED) {
//       vx = (vx / sp) * C.MAX_RELEASE_SPEED;
//       vy = (vy / sp) * C.MAX_RELEASE_SPEED;
//     }
//     s.ballVX.value = vx;
//     s.ballVY.value = vy;
//     s.ballMode.value = BallMode.RELEASED;
//   }

//   // ── 2) 자석 끝의 속도 추정 (부드럽게) ──
//   const ivx = (tip.x - s.prevTipX.value) / dt;
//   const ivy = (tip.y - s.prevTipY.value) / dt;
//   const k = Math.min(1, dt * 20);
//   s.penVX.value += (ivx - s.penVX.value) * k;
//   s.penVY.value += (ivy - s.penVY.value) * k;
//   // 입력 거의 없음 → 잔여 속도 빠르게 소멸 (정지 떨림 원인 제거)
//   const tipMoved = Math.sqrt(
//     (tip.x - s.prevTipX.value) * (tip.x - s.prevTipX.value) +
//       (tip.y - s.prevTipY.value) * (tip.y - s.prevTipY.value),
//   );
//   if (tipMoved < 0.15) {
//     s.penVX.value *= Math.exp(-25 * dt);
//     s.penVY.value *= Math.exp(-25 * dt);
//     if (Math.abs(s.penVX.value) < 8) s.penVX.value = 0;
//     if (Math.abs(s.penVY.value) < 8) s.penVY.value = 0;
//   }
//   s.prevTipX.value = tip.x;
//   s.prevTipY.value = tip.y;

//   let bx = s.ballX.value;
//   let by = s.ballY.value;
//   let vx = s.ballVX.value;
//   let vy = s.ballVY.value;

//   const segs = s.wallSegs.value;
//   const wallCount = s.wallCount.value;
//   const reach = s.wallReach.value;
//   const step = C.COLLISION_STEP;

//   // ── 3) 부착 상태: 속도 PD 단일 제어기 ──
//   //
//   // 점프 원인: 목표 좌표로 moveWithWalls 하면 코너에서 다른 통로 중심선으로 보정됨
//   // 진동 원인: 속도 추종 + moveWithWalls 를 한 프레임에 같이 씀
//   // 해결: 목표를 향한 PD 속도만 사용 + 서브스텝 적분 + 앵커 기반 벽 슬라이드
//   //       정지 데드존으로 잔여 떨림 제거. 분리 시에만 속도 유지.
//   if (s.ballMode.value === BallMode.ATTACHED) {
//     const decay = Math.exp(-C.ATTACH_SNAP_RATE * dt);
//     const ox = s.attachOffX.value * decay;
//     const oy = s.attachOffY.value * decay;
//     s.attachOffX.value = ox;
//     s.attachOffY.value = oy;

//     const targetX = tip.x + ox;
//     const targetY = tip.y + oy;
//     const tdx = targetX - bx;
//     const tdy = targetY - by;
//     const td = Math.sqrt(tdx * tdx + tdy * tdy);

//     // 펜 잔여 속도 정리
//     let pvx = s.penVX.value;
//     let pvy = s.penVY.value;
//     const penSp = Math.sqrt(pvx * pvx + pvy * pvy);
//     if (penSp < 15) {
//       pvx = 0;
//       pvy = 0;
//       s.penVX.value = 0;
//       s.penVY.value = 0;
//     }

//     const POS_DEAD = 1.5; // px — 이 안이면 목표에 스냅 후 정지
//     const VEL_DEAD = 18; // px/s

//     // 완전 정지 조건: 목표 근접 + 펜 정지
//     if (td <= POS_DEAD && penSp < 15) {
//       bx = targetX;
//       by = targetY;
//       const clamped = clampToBoardAndWalls(s, bx, by, r, bx, by);
//       bx = clamped.x;
//       by = clamped.y;
//       s.ballVX.value = 0;
//       s.ballVY.value = 0;
//     } else {
//       // PD 추종: 위치 오차 → 스프링, 속도 오차 → 댐핑, 펜 속도 → 피드포워드
//       // 계수: 프레임 60fps 기준 안정 범위
//       const KP = 28; // 1/s 에 가까운 위치 이득 (속도 = KP * error 형태에 가깝게)
//       const KD = 8; // 감쇠
//       let fvx = pvx; // 피드포워드
//       let fvy = pvy;
//       if (td > 1e-4) {
//         // 목표 상대 속도: 오차에 비례하되 상한
//         const pull = Math.min(C.MAX_SPEED * 0.9, KP * td);
//         fvx += (tdx / td) * pull;
//         fvy += (tdy / td) * pull;
//       }
//       // 현재 구슬 속도에 대한 감쇠 (진동 억제)
//       fvx -= vx * (KD * dt);
//       fvy -= vy * (KD * dt);

//       // 속도 상한
//       let fsp = Math.sqrt(fvx * fvx + fvy * fvy);
//       if (fsp > C.MAX_SPEED) {
//         fvx = (fvx / fsp) * C.MAX_SPEED;
//         fvy = (fvy / fsp) * C.MAX_SPEED;
//         fsp = C.MAX_SPEED;
//       }

//       // 서브스텝 적분 + 앵커 기반 벽 처리
//       if (wallCount > 0 && reach > 0) {
//         let remaining = dt;
//         const maxIter = C.MAX_FOLLOW_STEPS;
//         for (let iter = 0; iter < maxIter && remaining > 1e-5; iter++) {
//           const spd = Math.sqrt(fvx * fvx + fvy * fvy);
//           if (spd < VEL_DEAD * 0.25 && td <= POS_DEAD * 2) {
//             fvx = 0;
//             fvy = 0;
//             break;
//           }
//           const stepDt = Math.min(remaining, step / Math.max(spd, 1));
//           const prevX = bx;
//           const prevY = by;
//           const nx0 = bx + fvx * stepDt;
//           const ny0 = by + fvy * stepDt;
//           // 직전 위치를 앵커로 전달 → 다른 통로 점프 차단
//           const res = clampToBoardAndWalls(s, nx0, ny0, r, prevX, prevY);

//           // ATTACHED: 튕기지 않고 법선 침투 속도만 제거 (슬라이드)
//           if (res.wallHit) {
//             const vn = fvx * res.wallNx + fvy * res.wallNy;
//             if (vn < 0) {
//               fvx -= vn * res.wallNx;
//               fvy -= vn * res.wallNy;
//             }
//           }
//           if (res.edgeNx !== 0) {
//             const vn = fvx * res.edgeNx;
//             if (vn < 0) fvx -= vn * res.edgeNx;
//           }
//           if (res.edgeNy !== 0) {
//             const vn = fvy * res.edgeNy;
//             if (vn < 0) fvy -= vn * res.edgeNy;
//           }

//           // 한 스텝 이동 거리 하드 캡 (순간이동 2차 방어)
//           const mdx = res.x - prevX;
//           const mdy = res.y - prevY;
//           const md = Math.sqrt(mdx * mdx + mdy * mdy);
//           const maxMove = step * 1.5;
//           if (md > maxMove) {
//             bx = prevX + (mdx / md) * maxMove;
//             by = prevY + (mdy / md) * maxMove;
//             const fix = clampToBoardAndWalls(s, bx, by, r, prevX, prevY);
//             bx = fix.x;
//             by = fix.y;
//           } else {
//             bx = res.x;
//             by = res.y;
//           }
//           remaining -= stepDt;
//         }
//       } else {
//         // Level 1: 벽 없음
//         bx += fvx * dt;
//         by += fvy * dt;
//         const res = clampToBoardAndWalls(s, bx, by, r);
//         bx = res.x;
//         by = res.y;
//       }

//       // 분리 판정
//       const distToTip = distance(bx, by, tip.x, tip.y);
//       if (distToTip > C.DETACH_DISTANCE) {
//         s.ballMode.value = BallMode.RELEASED;
//         let rvx = fvx * 0.85;
//         let rvy = fvy * 0.85;
//         const rsp = Math.sqrt(rvx * rvx + rvy * rvy);
//         if (rsp > C.MAX_RELEASE_SPEED) {
//           rvx = (rvx / rsp) * C.MAX_RELEASE_SPEED;
//           rvy = (rvy / rsp) * C.MAX_RELEASE_SPEED;
//         }
//         s.ballVX.value = rvx;
//         s.ballVY.value = rvy;
//       } else {
//         // 부착 중: 다음 프레임 PD / 분리용으로 속도 유지
//         // 단, 거의 정지 상태면 0으로 스냅해 잔떨림 제거
//         const fsp2 = Math.sqrt(fvx * fvx + fvy * fvy);
//         if (fsp2 < VEL_DEAD && td < POS_DEAD * 3) {
//           s.ballVX.value = 0;
//           s.ballVY.value = 0;
//         } else {
//           s.ballVX.value = fvx;
//           s.ballVY.value = fvy;
//         }
//       }
//     }
//   } else {
//     // ── 4) 자유/분리 상태: 자기력 → 가속 → 속도 → 위치 ──
//     if (active) {
//       const d = distance(tip.x, tip.y, bx, by);
//       if (d <= C.ATTACH_DISTANCE) {
//         // 부착! 현재의 상대 위치를 기억해 두고 거기서부터 빨려 들어간다
//         // 단, 벽에 막혀 있지 않은 경우에만 (이미 통로 안이어야 함)
//         s.ballMode.value = BallMode.ATTACHED;
//         s.attachOffX.value = bx - tip.x;
//         s.attachOffY.value = by - tip.y;
//         s.ballVX.value = 0;
//         s.ballVY.value = 0;
//         s.ballX.value = bx;
//         s.ballY.value = by;
//         return; // 다음 프레임부터 부착 계산
//       }
//       if (d < C.MAGNET_RANGE && d > 0.001) {
//         const a = magnetAccel(d);
//         vx += ((tip.x - bx) / d) * a * dt;
//         vy += ((tip.y - by) / d) * a * dt;
//       }
//     }

//     // 마찰(감속): 프레임 속도와 무관하게 같은 느낌
//     const damp = Math.exp(-C.FRICTION * dt);
//     vx *= damp;
//     vy *= damp;

//     // 최대 속도 제한
//     const sp = Math.sqrt(vx * vx + vy * vy);
//     if (sp > C.MAX_SPEED) {
//       vx = (vx / sp) * C.MAX_SPEED;
//       vy = (vy / sp) * C.MAX_SPEED;
//     }
//     // 아주 느려지면 완전히 멈춤
//     if (sp < 4) {
//       vx = 0;
//       vy = 0;
//       if (s.ballMode.value === BallMode.RELEASED)
//         s.ballMode.value = BallMode.FREE;
//       // 정지해도 통로 밖으로 나가지 않게 보정
//       const idle = clampToBoardAndWalls(s, bx, by, r);
//       bx = idle.x;
//       by = idle.y;
//     }

//     // 연속 충돌(Swept): 한 번에 step 이상 움직이지 않고 매 걸음마다 벽 보정
//     // 빠른 이동에도 벽을 뚫지 않도록 남은 시간을 나눠 이동
//     let remaining = dt;
//     if (wallCount > 0 && reach > 0) {
//       const maxIter = C.MAX_FOLLOW_STEPS;
//       for (let iter = 0; iter < maxIter && remaining > 1e-5; iter++) {
//         const spd = Math.sqrt(vx * vx + vy * vy);
//         if (spd < 0.5) {
//           vx = 0;
//           vy = 0;
//           break;
//         }
//         // 이번 걸음에서 이동할 거리 (최대 step px)
//         const stepDt = Math.min(remaining, step / spd);
//         const prevX = bx;
//         const prevY = by;
//         const nx0 = bx + vx * stepDt;
//         const ny0 = by + vy * stepDt;
//         const res = clampToBoardAndWalls(s, nx0, ny0, r, prevX, prevY);
//         // 부딪히면 법선 방향 속도만 반발 → 접선 속도는 남아 벽을 따라 미끄러짐
//         const bounced = applyCollisionResponse(vx, vy, res);
//         vx = bounced.vx;
//         vy = bounced.vy;
//         // 한 스텝 이동 상한 (다른 통로 점프 2차 방어)
//         const mdx = res.x - prevX;
//         const mdy = res.y - prevY;
//         const md = Math.sqrt(mdx * mdx + mdy * mdy);
//         const maxMove = step * 1.5;
//         if (md > maxMove) {
//           bx = prevX + (mdx / md) * maxMove;
//           by = prevY + (mdy / md) * maxMove;
//           const fix = clampToBoardAndWalls(s, bx, by, r, prevX, prevY);
//           bx = fix.x;
//           by = fix.y;
//         } else {
//           bx = res.x;
//           by = res.y;
//         }
//         remaining -= stepDt;
//       }
//     } else {
//       // 벽 없음: 한 번에 이동 후 보드 경계만
//       bx += vx * dt;
//       by += vy * dt;
//       const res = clampToBoardAndWalls(s, bx, by, r);
//       const bounced = applyCollisionResponse(vx, vy, res);
//       vx = bounced.vx;
//       vy = bounced.vy;
//       bx = res.x;
//       by = res.y;
//     }

//     s.ballVX.value = vx;
//     s.ballVY.value = vy;
//   }

//   // 최종 위치 확정 (항상 보드 안 + 벽 안)
//   const final = clampToBoardAndWalls(s, bx, by, r);
//   s.ballX.value = final.x;
//   s.ballY.value = final.y;
// }

import { GAME_CONFIG } from "../../../constants/magnetMaze/gameConfig";
import { clamp, distance } from "./collision";
import { magnetAccel } from "./magneticForce";
import { BallMode, type PhysicsShared } from "./physicsTypes";
import { moveWithWalls, resolveWalls } from "./wallCollision";

/** 펜 중심(손가락) 좌표 → 자석 끝 좌표 */
export function getTip(penX: number, penY: number) {
  "worklet";
  return {
    x: penX + GAME_CONFIG.TIP_OFFSET_X,
    y: penY + GAME_CONFIG.TIP_OFFSET_Y,
  };
}

/** 손가락(미로 사각형 기준 좌표)이 움직였을 때 펜 위치 갱신. 자석 끝은 미로 + 투명 여유 공간 안으로 제한. */
export function movePen(
  s: PhysicsShared,
  x: number,
  y: number,
  isBegin: boolean,
) {
  "worklet";
  if (s.locked.value === 1) return; // 성공/실패 확정 후에는 조작 차단
  // 자석 "끝"이 보드 안에 머물도록 제한한다. (끝은 손가락보다 위쪽이라, 손가락 기준으로 제한하면
  // 보드 아래쪽 TIP_OFFSET 만큼은 자석 끝이 닿지 못해 그곳의 목적지에 갈 수 없다)
  // 좌표 기준은 "미로 사각형"이다. 투명 여유 공간(penMargin)만큼은 미로 바깥으로도 나갈 수 있다.
  const m = s.penMargin.value;
  const px =
    clamp(x + GAME_CONFIG.TIP_OFFSET_X, -m, s.boardW.value + m) -
    GAME_CONFIG.TIP_OFFSET_X;
  const py =
    clamp(y + GAME_CONFIG.TIP_OFFSET_Y, -m, s.boardH.value + m) -
    GAME_CONFIG.TIP_OFFSET_Y;
  s.penX.value = px;
  s.penY.value = py;
  if (isBegin) {
    // 처음 터치한 순간 속도가 튀지 않도록 기준점을 맞춰 둔다
    const tip = getTip(px, py);
    s.prevTipX.value = tip.x;
    s.prevTipY.value = tip.y;
    s.penVX.value = 0;
    s.penVY.value = 0;
    s.penActive.value = 1;
  }
}

export function resetBall(s: PhysicsShared, x: number, y: number) {
  "worklet";
  s.ballX.value = x;
  s.ballY.value = y;
  s.ballVX.value = 0;
  s.ballVY.value = 0;
  s.ballMode.value = BallMode.FREE;
  s.attachOffX.value = 0;
  s.attachOffY.value = 0;
}

/** 충돌 결과: 위치 보정 + "어디에 부딪혔는지"를 경로 벽과 보드 테두리로 나눠서 돌려준다 */
interface ClampResult {
  x: number;
  y: number;
  /**
   * 경로(미로) 벽에 부딪힘. 법선은 "통로 안쪽"(벽에서 멀어지는 방향)이다.
   * 보드 테두리 법선(edgeNx/edgeNy)과 같은 방향 규칙이라 같은 반응 함수(bounceVelocity)를 쓸 수 있다.
   * (resolveWalls 가 돌려주는 법선은 통로 중심선에서 구슬 쪽, 즉 벽 쪽을 향하므로 부호를 뒤집어 담는다.
   *  예전에는 이 부호를 그대로 써서 벽으로 들어가는 속도(vn > 0)가 반응 조건(vn < 0)에 걸리지 않았고,
   *  Level 2 이후 경로 벽에서는 튕김이 전혀 적용되지 않았다.)
   */
  wallHit: boolean;
  wallNx: number;
  wallNy: number;
  /** 보드 테두리에 부딪힘. 축마다 따로 (모서리에서는 x, y 둘 다 나올 수 있다). 0 = 안 부딪힘 */
  edgeNx: number; // +1 = 왼쪽 테두리, -1 = 오른쪽 테두리
  edgeNy: number; // +1 = 위쪽 테두리, -1 = 아래쪽 테두리
}

/**
 * 보드 경계 + 경로 벽 충돌을 한 번에 적용.
 * 경로 벽이 있으면 중심선 reach 안으로 되돌리고, 없으면 보드 테두리만 처리.
 *
 * 경로 벽 법선과 보드 테두리 법선을 서로 덮어쓰지 않고 따로 돌려준다.
 * (테두리 법선이 경로 벽 법선을 지우거나, 모서리에서 y 법선이 x 법선을 지우던 문제 방지)
 */
function clampToBoardAndWalls(
  s: PhysicsShared,
  x: number,
  y: number,
  r: number,
  anchorX?: number,
  anchorY?: number,
): ClampResult {
  "worklet";
  const segs = s.wallSegs.value;
  const count = s.wallCount.value;
  const reach = s.wallReach.value;

  let cx = x;
  let cy = y;
  let wallHit = false;
  let wallNx = 0;
  let wallNy = 0;
  let edgeNx = 0;
  let edgeNy = 0;

  // 경로 벽 (Level 1 은 count=0 → 스킵)
  // anchor = 직전 구슬 위치 → 다른 통로로 순간이동 방지
  if (count > 0 && reach > 0) {
    const res = resolveWalls(segs, count, reach, cx, cy, anchorX, anchorY);
    cx = res.x;
    cy = res.y;
    wallHit = res.hit;
    wallNx = -res.nx;
    wallNy = -res.ny;
  }

  // 보드 테두리
  const maxX = s.boardW.value - r;
  const maxY = s.boardH.value - r;
  if (cx < r) {
    cx = r;
    edgeNx = 1;
  } else if (cx > maxX) {
    cx = maxX;
    edgeNx = -1;
  }
  if (cy < r) {
    cy = r;
    edgeNy = 1;
  } else if (cy > maxY) {
    cy = maxY;
    edgeNy = -1;
  }

  return { x: cx, y: cy, wallHit, wallNx, wallNy, edgeNx, edgeNy };
}

/**
 * 충돌 속도 반응. 법선 방향 속도만 반전(반발 계수 e)하고, 벽을 따라 흐르는 접선 성분은 그대로 둔다.
 * 이미 벽에서 멀어지는 중(vn >= 0)이면 건드리지 않는다.
 */
function bounceVelocity(
  vx: number,
  vy: number,
  nx: number,
  ny: number,
  e: number,
): { vx: number; vy: number } {
  "worklet";
  const vn = vx * nx + vy * ny;
  if (vn >= 0) return { vx, vy };
  return { vx: vx - (1 + e) * vn * nx, vy: vy - (1 + e) * vn * ny };
}

/**
 * 한 번의 위치 보정 결과에 대한 속도 반응.
 *  - 보드 테두리: 모든 레벨 공통으로 WALL_BOUNCE (Level 1 의 튕김과 같음). 모서리면 x, y 축 각각 반발.
 *  - 경로 벽: PATH_WALL_BOUNCE (내부 벽 전용, 따로 조절 가능)
 * 위치는 이미 clamp 가 경계 위로 되돌려 놓았으므로, 여기서는 속도만 바꾼다. 위치/속도 처리가 서로 섞이지 않는다.
 */
function applyCollisionResponse(
  vx: number,
  vy: number,
  res: ClampResult,
): { vx: number; vy: number } {
  "worklet";
  const C = GAME_CONFIG;
  let v = { vx, vy };
  if (res.wallHit) {
    v = bounceVelocity(v.vx, v.vy, res.wallNx, res.wallNy, C.PATH_WALL_BOUNCE);
  }
  if (res.edgeNx !== 0) {
    v = bounceVelocity(v.vx, v.vy, res.edgeNx, 0, C.WALL_BOUNCE);
  }
  if (res.edgeNy !== 0) {
    v = bounceVelocity(v.vx, v.vy, 0, res.edgeNy, C.WALL_BOUNCE);
  }
  return v;
}

// ───────────────────────────────────────────────────────────────
// 벽 충돌음 이벤트 (기존 물리는 건드리지 않고, 충돌 결과를 읽어서 기록만 한다)
// ───────────────────────────────────────────────────────────────

/** 한 프레임 동안의 충돌 기록. 서브스텝마다 쌓고, 프레임 끝에서 한 번만 이벤트로 내보낸다 */
interface ImpactAcc {
  touched: boolean; // 이번 프레임에 벽/테두리에 닿았나
  impact: number; // 가장 강한 충돌 속도 (px/s, 법선 방향)
  /** "새 면"(접촉이 없었거나, 소리를 낸 접촉면과 법선이 다른 면)에 대한 가장 강한 충돌. 코너 재충돌 감지용 */
  newImpact: number;
  nx: number; // newImpact 충돌의 법선
  ny: number;
}

/** 이 강도(MAX_SPEED 대비) 미만의 살짝 닿음은 소리를 내지 않고, 접촉으로도 치지 않는다 */
const IMPACT_MIN_INTENSITY = 0.03;
/** ATTACHED 에서 접촉이 끊긴 뒤에도 "계속 붙어 있다"고 보는 시간(초). 벽 따라 이동 중 떨림으로 소리가 반복되는 것 방지 */
const CONTACT_GRACE_ATTACHED = 0.12;
/** 접촉면 법선의 내적이 이 값보다 작으면(= 충분히 다른 방향) "다른 면(코너)"에 새로 부딪힌 것으로 본다 */
const NEW_SURFACE_DOT = 0.5;

function trackImpact(
  s: PhysicsShared,
  acc: ImpactAcc,
  vx: number,
  vy: number,
  nx: number,
  ny: number,
) {
  "worklet";
  acc.touched = true;
  const impact = -(vx * nx + vy * ny); // 벽을 향해 움직일 때만 양수
  if (impact <= 0) return;
  if (impact > acc.impact) acc.impact = impact;

  // 새 면인가? (접촉 중이 아니거나, 소리를 낸 접촉면과 다른 방향의 면)
  let isNewSurface = true;
  if (s.wallContactTime.value > 0) {
    const c = s.wallContactNormals.value;
    isNewSurface =
      nx * c[0] + ny * c[1] < NEW_SURFACE_DOT &&
      nx * c[2] + ny * c[3] < NEW_SURFACE_DOT;
  }
  if (isNewSurface && impact > acc.newImpact) {
    acc.newImpact = impact;
    acc.nx = nx;
    acc.ny = ny;
  }
}

/** 반응(속도 변경)을 적용하기 "직전" 속도로 호출해야 한다 */
function trackHits(
  s: PhysicsShared,
  acc: ImpactAcc,
  res: ClampResult,
  vx: number,
  vy: number,
) {
  "worklet";
  if (res.wallHit) trackImpact(s, acc, vx, vy, res.wallNx, res.wallNy);
  if (res.edgeNx !== 0) trackImpact(s, acc, vx, vy, res.edgeNx, 0);
  if (res.edgeNy !== 0) trackImpact(s, acc, vx, vy, 0, res.edgeNy);
}

/**
 * 프레임 끝에서 호출. 새 충돌일 때만 이벤트 번호를 올린다.
 *  - 새 충돌 = 접촉이 없다가 처음 닿음, 또는 접촉 중이어도 다른 면(코너)에 새로 부딪힘
 *  - 접촉이 유지되는 동안(벽에 밀착/슬라이딩)에는 올리지 않는다
 */
function commitImpact(
  s: PhysicsShared,
  acc: ImpactAcc,
  dt: number,
  graceSec: number,
) {
  "worklet";
  if (!acc.touched) {
    // 접촉 없음 → 유지 시간 감소 (0 이 되면 다음 충돌은 새 충돌)
    if (s.wallContactTime.value > 0) {
      s.wallContactTime.value = Math.max(0, s.wallContactTime.value - dt);
    }
    return;
  }

  const maxSpeed = GAME_CONFIG.MAX_SPEED;
  const newIntensity = Math.min(1, acc.newImpact / maxSpeed);

  if (newIntensity >= IMPACT_MIN_INTENSITY) {
    s.wallCollisionIntensity.value = newIntensity;
    s.wallCollisionEvent.value += 1;
    if (s.wallContactTime.value <= 0) {
      // 접촉이 새로 시작됨 → 기억하던 면 초기화
      s.wallContactNormals.value = [acc.nx, acc.ny, 0, 0, 1];
    } else {
      // 접촉 중 다른 면 추가 → 두 슬롯을 번갈아 덮어씀
      const c = s.wallContactNormals.value;
      const slot = c[4] === 1 ? 1 : 0;
      const next = [c[0], c[1], c[2], c[3], 1 - slot];
      next[slot * 2] = acc.nx;
      next[slot * 2 + 1] = acc.ny;
      s.wallContactNormals.value = next;
    }
    s.wallContactTime.value = graceSec;
  } else if (
    s.wallContactTime.value > 0 ||
    acc.impact / maxSpeed >= IMPACT_MIN_INTENSITY
  ) {
    // 새 충돌은 아니지만 접촉은 계속 유지 중
    s.wallContactTime.value = graceSec;
  }
}

/** 물리 한 스텝. 프레임마다 실제 경과 시간(dt, 초)을 넣어서 호출한다. */
export function stepPhysics(s: PhysicsShared, rawDt: number) {
  "worklet";
  const C = GAME_CONFIG;
  // 프레임이 크게 늦어져도 구슬이 튀지 않도록 dt 상한
  const dt = Math.min(rawDt, C.MAX_DT);
  if (dt <= 0) return;

  // 이번 프레임의 충돌 기록 (충돌음용. 물리 계산에는 영향 없음)
  const acc: ImpactAcc = {
    touched: false,
    impact: 0,
    newImpact: 0,
    nx: 0,
    ny: 0,
  };

  const active = s.penActive.value === 1;
  const tip = getTip(s.penX.value, s.penY.value);
  // 레벨마다 구슬 크기가 다를 수 있음
  const r = s.ballRadius.value > 0 ? s.ballRadius.value : C.BALL_RADIUS;

  // ── 1) 손가락을 뗐다 → 분리 (펜 속도를 약하게 전달) ──
  if (!active && s.ballMode.value === BallMode.ATTACHED) {
    let vx = s.penVX.value * C.RELEASE_INERTIA;
    let vy = s.penVY.value * C.RELEASE_INERTIA;
    const sp = Math.sqrt(vx * vx + vy * vy);
    if (sp > C.MAX_RELEASE_SPEED) {
      vx = (vx / sp) * C.MAX_RELEASE_SPEED;
      vy = (vy / sp) * C.MAX_RELEASE_SPEED;
    }
    s.ballVX.value = vx;
    s.ballVY.value = vy;
    s.ballMode.value = BallMode.RELEASED;
  }

  // ── 2) 자석 끝의 속도 추정 (부드럽게) ──
  const ivx = (tip.x - s.prevTipX.value) / dt;
  const ivy = (tip.y - s.prevTipY.value) / dt;
  const k = Math.min(1, dt * 20);
  s.penVX.value += (ivx - s.penVX.value) * k;
  s.penVY.value += (ivy - s.penVY.value) * k;
  // 입력 거의 없음 → 잔여 속도 빠르게 소멸 (정지 떨림 원인 제거)
  const tipMoved = Math.sqrt(
    (tip.x - s.prevTipX.value) * (tip.x - s.prevTipX.value) +
      (tip.y - s.prevTipY.value) * (tip.y - s.prevTipY.value),
  );
  if (tipMoved < 0.15) {
    s.penVX.value *= Math.exp(-25 * dt);
    s.penVY.value *= Math.exp(-25 * dt);
    if (Math.abs(s.penVX.value) < 8) s.penVX.value = 0;
    if (Math.abs(s.penVY.value) < 8) s.penVY.value = 0;
  }
  s.prevTipX.value = tip.x;
  s.prevTipY.value = tip.y;

  let bx = s.ballX.value;
  let by = s.ballY.value;
  let vx = s.ballVX.value;
  let vy = s.ballVY.value;

  const segs = s.wallSegs.value;
  const wallCount = s.wallCount.value;
  const reach = s.wallReach.value;
  const step = C.COLLISION_STEP;

  // ── 3) 부착 상태: 속도 PD 단일 제어기 ──
  //
  // 점프 원인: 목표 좌표로 moveWithWalls 하면 코너에서 다른 통로 중심선으로 보정됨
  // 진동 원인: 속도 추종 + moveWithWalls 를 한 프레임에 같이 씀
  // 해결: 목표를 향한 PD 속도만 사용 + 서브스텝 적분 + 앵커 기반 벽 슬라이드
  //       정지 데드존으로 잔여 떨림 제거. 분리 시에만 속도 유지.
  if (s.ballMode.value === BallMode.ATTACHED) {
    const decay = Math.exp(-C.ATTACH_SNAP_RATE * dt);
    const ox = s.attachOffX.value * decay;
    const oy = s.attachOffY.value * decay;
    s.attachOffX.value = ox;
    s.attachOffY.value = oy;

    const targetX = tip.x + ox;
    const targetY = tip.y + oy;
    const tdx = targetX - bx;
    const tdy = targetY - by;
    const td = Math.sqrt(tdx * tdx + tdy * tdy);

    // 펜 잔여 속도 정리
    let pvx = s.penVX.value;
    let pvy = s.penVY.value;
    const penSp = Math.sqrt(pvx * pvx + pvy * pvy);
    if (penSp < 15) {
      pvx = 0;
      pvy = 0;
      s.penVX.value = 0;
      s.penVY.value = 0;
    }

    const POS_DEAD = 1.5; // px — 이 안이면 목표에 스냅 후 정지
    const VEL_DEAD = 18; // px/s

    // 완전 정지 조건: 목표 근접 + 펜 정지
    if (td <= POS_DEAD && penSp < 15) {
      bx = targetX;
      by = targetY;
      const clamped = clampToBoardAndWalls(s, bx, by, r, bx, by);
      bx = clamped.x;
      by = clamped.y;
      s.ballVX.value = 0;
      s.ballVY.value = 0;
    } else {
      // PD 추종: 위치 오차 → 스프링, 속도 오차 → 댐핑, 펜 속도 → 피드포워드
      // 계수: 프레임 60fps 기준 안정 범위
      const KP = 28; // 1/s 에 가까운 위치 이득 (속도 = KP * error 형태에 가깝게)
      const KD = 8; // 감쇠
      let fvx = pvx; // 피드포워드
      let fvy = pvy;
      if (td > 1e-4) {
        // 목표 상대 속도: 오차에 비례하되 상한
        const pull = Math.min(C.MAX_SPEED * 0.9, KP * td);
        fvx += (tdx / td) * pull;
        fvy += (tdy / td) * pull;
      }
      // 현재 구슬 속도에 대한 감쇠 (진동 억제)
      fvx -= vx * (KD * dt);
      fvy -= vy * (KD * dt);

      // 속도 상한
      let fsp = Math.sqrt(fvx * fvx + fvy * fvy);
      if (fsp > C.MAX_SPEED) {
        fvx = (fvx / fsp) * C.MAX_SPEED;
        fvy = (fvy / fsp) * C.MAX_SPEED;
        fsp = C.MAX_SPEED;
      }

      // 서브스텝 적분 + 앵커 기반 벽 처리
      if (wallCount > 0 && reach > 0) {
        let remaining = dt;
        const maxIter = C.MAX_FOLLOW_STEPS;
        for (let iter = 0; iter < maxIter && remaining > 1e-5; iter++) {
          const spd = Math.sqrt(fvx * fvx + fvy * fvy);
          if (spd < VEL_DEAD * 0.25 && td <= POS_DEAD * 2) {
            fvx = 0;
            fvy = 0;
            break;
          }
          const stepDt = Math.min(remaining, step / Math.max(spd, 1));
          const prevX = bx;
          const prevY = by;
          const nx0 = bx + fvx * stepDt;
          const ny0 = by + fvy * stepDt;
          // 직전 위치를 앵커로 전달 → 다른 통로 점프 차단
          const res = clampToBoardAndWalls(s, nx0, ny0, r, prevX, prevY);

          // 충돌음용 기록 (속도를 바꾸기 전 값)
          trackHits(s, acc, res, fvx, fvy);

          // ATTACHED: 튕기지 않고 법선 침투 속도만 제거 (슬라이드)
          if (res.wallHit) {
            const vn = fvx * res.wallNx + fvy * res.wallNy;
            if (vn < 0) {
              fvx -= vn * res.wallNx;
              fvy -= vn * res.wallNy;
            }
          }
          if (res.edgeNx !== 0) {
            const vn = fvx * res.edgeNx;
            if (vn < 0) fvx -= vn * res.edgeNx;
          }
          if (res.edgeNy !== 0) {
            const vn = fvy * res.edgeNy;
            if (vn < 0) fvy -= vn * res.edgeNy;
          }

          // 한 스텝 이동 거리 하드 캡 (순간이동 2차 방어)
          const mdx = res.x - prevX;
          const mdy = res.y - prevY;
          const md = Math.sqrt(mdx * mdx + mdy * mdy);
          const maxMove = step * 1.5;
          if (md > maxMove) {
            bx = prevX + (mdx / md) * maxMove;
            by = prevY + (mdy / md) * maxMove;
            const fix = clampToBoardAndWalls(s, bx, by, r, prevX, prevY);
            bx = fix.x;
            by = fix.y;
          } else {
            bx = res.x;
            by = res.y;
          }
          remaining -= stepDt;
        }
      } else {
        // Level 1: 벽 없음
        bx += fvx * dt;
        by += fvy * dt;
        const res = clampToBoardAndWalls(s, bx, by, r);
        trackHits(s, acc, res, fvx, fvy);
        bx = res.x;
        by = res.y;
      }

      // 분리 판정
      const distToTip = distance(bx, by, tip.x, tip.y);
      if (distToTip > C.DETACH_DISTANCE) {
        s.ballMode.value = BallMode.RELEASED;
        let rvx = fvx * 0.85;
        let rvy = fvy * 0.85;
        const rsp = Math.sqrt(rvx * rvx + rvy * rvy);
        if (rsp > C.MAX_RELEASE_SPEED) {
          rvx = (rvx / rsp) * C.MAX_RELEASE_SPEED;
          rvy = (rvy / rsp) * C.MAX_RELEASE_SPEED;
        }
        s.ballVX.value = rvx;
        s.ballVY.value = rvy;
      } else {
        // 부착 중: 다음 프레임 PD / 분리용으로 속도 유지
        // 단, 거의 정지 상태면 0으로 스냅해 잔떨림 제거
        const fsp2 = Math.sqrt(fvx * fvx + fvy * fvy);
        if (fsp2 < VEL_DEAD && td < POS_DEAD * 3) {
          s.ballVX.value = 0;
          s.ballVY.value = 0;
        } else {
          s.ballVX.value = fvx;
          s.ballVY.value = fvy;
        }
      }
    }
  } else {
    // ── 4) 자유/분리 상태: 자기력 → 가속 → 속도 → 위치 ──
    if (active) {
      const d = distance(tip.x, tip.y, bx, by);
      if (d <= C.ATTACH_DISTANCE) {
        // 부착! 현재의 상대 위치를 기억해 두고 거기서부터 빨려 들어간다
        // 단, 벽에 막혀 있지 않은 경우에만 (이미 통로 안이어야 함)
        s.ballMode.value = BallMode.ATTACHED;
        s.attachOffX.value = bx - tip.x;
        s.attachOffY.value = by - tip.y;
        s.ballVX.value = 0;
        s.ballVY.value = 0;
        s.ballX.value = bx;
        s.ballY.value = by;
        return; // 다음 프레임부터 부착 계산
      }
      if (d < C.MAGNET_RANGE && d > 0.001) {
        const a = magnetAccel(d);
        vx += ((tip.x - bx) / d) * a * dt;
        vy += ((tip.y - by) / d) * a * dt;
      }
    }

    // 마찰(감속): 프레임 속도와 무관하게 같은 느낌
    const damp = Math.exp(-C.FRICTION * dt);
    vx *= damp;
    vy *= damp;

    // 최대 속도 제한
    const sp = Math.sqrt(vx * vx + vy * vy);
    if (sp > C.MAX_SPEED) {
      vx = (vx / sp) * C.MAX_SPEED;
      vy = (vy / sp) * C.MAX_SPEED;
    }
    // 아주 느려지면 완전히 멈춤
    if (sp < 4) {
      vx = 0;
      vy = 0;
      if (s.ballMode.value === BallMode.RELEASED)
        s.ballMode.value = BallMode.FREE;
      // 정지해도 통로 밖으로 나가지 않게 보정
      const idle = clampToBoardAndWalls(s, bx, by, r);
      bx = idle.x;
      by = idle.y;
    }

    // 연속 충돌(Swept): 한 번에 step 이상 움직이지 않고 매 걸음마다 벽 보정
    // 빠른 이동에도 벽을 뚫지 않도록 남은 시간을 나눠 이동
    let remaining = dt;
    if (wallCount > 0 && reach > 0) {
      const maxIter = C.MAX_FOLLOW_STEPS;
      for (let iter = 0; iter < maxIter && remaining > 1e-5; iter++) {
        const spd = Math.sqrt(vx * vx + vy * vy);
        if (spd < 0.5) {
          vx = 0;
          vy = 0;
          break;
        }
        // 이번 걸음에서 이동할 거리 (최대 step px)
        const stepDt = Math.min(remaining, step / spd);
        const prevX = bx;
        const prevY = by;
        const nx0 = bx + vx * stepDt;
        const ny0 = by + vy * stepDt;
        const res = clampToBoardAndWalls(s, nx0, ny0, r, prevX, prevY);
        // 충돌음용 기록 (반발 적용 전 속도)
        trackHits(s, acc, res, vx, vy);
        // 부딪히면 법선 방향 속도만 반발 → 접선 속도는 남아 벽을 따라 미끄러짐
        const bounced = applyCollisionResponse(vx, vy, res);
        vx = bounced.vx;
        vy = bounced.vy;
        // 한 스텝 이동 상한 (다른 통로 점프 2차 방어)
        const mdx = res.x - prevX;
        const mdy = res.y - prevY;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        const maxMove = step * 1.5;
        if (md > maxMove) {
          bx = prevX + (mdx / md) * maxMove;
          by = prevY + (mdy / md) * maxMove;
          const fix = clampToBoardAndWalls(s, bx, by, r, prevX, prevY);
          bx = fix.x;
          by = fix.y;
        } else {
          bx = res.x;
          by = res.y;
        }
        remaining -= stepDt;
      }
    } else {
      // 벽 없음: 한 번에 이동 후 보드 경계만
      bx += vx * dt;
      by += vy * dt;
      const res = clampToBoardAndWalls(s, bx, by, r);
      trackHits(s, acc, res, vx, vy);
      const bounced = applyCollisionResponse(vx, vy, res);
      vx = bounced.vx;
      vy = bounced.vy;
      bx = res.x;
      by = res.y;
    }

    s.ballVX.value = vx;
    s.ballVY.value = vy;
  }

  // 최종 위치 확정 (항상 보드 안 + 벽 안)
  const final = clampToBoardAndWalls(s, bx, by, r);
  s.ballX.value = final.x;
  s.ballY.value = final.y;

  // 충돌음 이벤트 확정 (ATTACHED 만 접촉 유지 시간을 둔다)
  commitImpact(
    s,
    acc,
    dt,
    s.ballMode.value === BallMode.ATTACHED ? CONTACT_GRACE_ATTACHED : 0.0001,
  );
}

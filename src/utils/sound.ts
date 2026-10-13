import { createAudioPlayer, AudioPlayer } from "expo-audio";
import {
  getCorrectEffectEnabled,
  getSoundEnabled,
} from "./asyncStorage/audioSettingsStorage";

const players = {
  grab: [] as AudioPlayer[],
  correct: [] as AudioPlayer[],
  wrong: [] as AudioPlayer[],
  correct_sound: [] as AudioPlayer[],
  wrong_sound: [] as AudioPlayer[],
  notes: [] as AudioPlayer[], // ⭐ 음계용
};

// ⭐ 마지막으로 성공한 음계 인덱스를 기억
let isPreloaded = false;
let lastSuccessNoteIndex: number | null = null;
let isNotesReady = false;
let isPlayingNote = false; // ⭐ 연달아 재생 방지용

// ⭐ 추가: 정답 효과 전용 플래그
let successSoundEnabled = true;

// 기존 general 사운드용도 같이 관리하고 싶으면
let generalSoundEnabled = true;

export function setSuccessSoundEnabled(enabled: boolean) {
  successSoundEnabled = enabled;

  // 끄는 순간 진행 중인 음계도 바로 멈춰주기 (선택사항이지만 추천)
  if (!enabled) {
    stopAllNotes();
  }
}

export function setGeneralSoundEnabled(enabled: boolean) {
  generalSoundEnabled = enabled;
}

// 음계 전부 정지 헬퍼
async function stopAllNotes() {
  for (const player of players.notes) {
    try {
      if (player) {
        await player.pause();
        await player.seekTo(0);
      }
    } catch (e) {}
  }
  isPlayingNote = false;
}

export async function preloadSounds() {
  console.log("🔥 preloadSounds 시작");
  // ⭐ 이미 생성했으면 다시 생성하지 않음
  if (isPreloaded) {
    console.log("🔥 이미 preload 되어 있음");
    return;
  }

  try {
    players.grab = [
      createAudioPlayer(require("../../assets/sounds/grab.wav")),
      createAudioPlayer(require("../../assets/sounds/grab.wav")),
      createAudioPlayer(require("../../assets/sounds/grab.wav")),
    ];
    // 💡 정답 효과음 (correct_1, correct_2) 개별 볼륨 설정
    const correct1 = createAudioPlayer(
      require("../../assets/sounds/correct_1.wav"),
    );
    const correct2 = createAudioPlayer(
      require("../../assets/sounds/correct_2.wav"),
    );
    correct1.volume = 0.4; // 원하는 정답 소리 크기 (0.0 ~ 1.0)
    correct2.volume = 1;
    players.correct_sound = [correct1, correct2];

    // 💡 오답 효과음 (wrong_1, wrong_2, wrong_3) 개별 볼륨 설정
    const wrong1 = createAudioPlayer(
      require("../../assets/sounds/wrong_1.wav"),
    );
    const wrong2 = createAudioPlayer(
      require("../../assets/sounds/wrong_2.wav"),
    );
    const wrong3 = createAudioPlayer(
      require("../../assets/sounds/wrong_3.wav"),
    );
    wrong1.volume = 0.5; // 오답 소리가 너무 크다면 더 작게 조절 (예: 0.2)
    wrong2.volume = 0.8;
    wrong3.volume = 0.8;
    players.wrong_sound = [wrong1, wrong2, wrong3];

    // ⭐ 음계 10개 미리 로드
    players.notes = [
      createAudioPlayer(require("../../assets/sounds/note_1.wav")), // 도
      createAudioPlayer(require("../../assets/sounds/note_2.wav")), // 레
      createAudioPlayer(require("../../assets/sounds/note_3.wav")), // 미
      createAudioPlayer(require("../../assets/sounds/note_4.wav")), // 파
      createAudioPlayer(require("../../assets/sounds/note_5.wav")), // 솔
      createAudioPlayer(require("../../assets/sounds/note_6.wav")), // 라
      createAudioPlayer(require("../../assets/sounds/note_7.wav")), // 시
      createAudioPlayer(require("../../assets/sounds/note_8.wav")), // 높은 도
      createAudioPlayer(require("../../assets/sounds/note_9.wav")), // 높은 레
      createAudioPlayer(require("../../assets/sounds/note_10.wav")), // 높은 미
    ];
    isPreloaded = true;
    isNotesReady = true; // ⭐⭐⭐ 이 줄 반드시 추가!

    console.log("🔊 사운드 프리로드 완료!");
  } catch (e) {
    console.log("사운드 프리로드 실패:", e);
    isPreloaded = false;
  }
}
// ⭐ 사운드 타입별로 "다음에 쓸 플레이어 인덱스"를 순환시킴
const roundRobinIndex: Record<string, number> = {
  grab: 0,
  correct: 0,
  wrong: 0,
  correct_sound: 0,
  wrong_sound: 0,
};

async function playPlayerSafely(player: AudioPlayer) {
  try {
    await player.seekTo(0);
    await player.play();
  } catch (error) {
    console.log("오디오 재생 실패:", error);
  }
}
// 기존 랜덤 재생
export async function playSound(
  soundType: "grab" | "correct_sound" | "wrong_sound",
) {
  // if (!generalSoundEnabled) return; // ⭐ 일반 효과음
  const enabled = await getSoundEnabled();
  if (!enabled) return;

  try {
    const list = players[soundType];
    // console.log("🔊 playSound 호출:", soundType);
    // console.log("🔊 player 개수:", list?.length);
    if (!list || list.length === 0) {
      // console.log("❌ 플레이어가 없음:", soundType);
      return;
    }

    const randomIndex = Math.floor(Math.random() * list.length);
    const player = list[randomIndex];
    await playPlayerSafely(player);

    // console.log("🔊 실제 play:", soundType, randomIndex);

    // player.seekTo(0);
    // player.play();
  } catch (error) {
    // console.log("오디오 재생 실패:", error);
  }
}

export function resetLastSuccessNote() {
  lastSuccessNoteIndex = 0;
}

// 안전하게 음 하나 재생
async function playNoteByIndex(index: number) {
  if (!isNotesReady || !players.notes[index]) {
    console.log("음계 아직 준비 안 됨:", index);
    return;
  }

  // 이미 다른 음이 재생 중이면 잠시 무시 (마구 클릭 방지)
  if (isPlayingNote) {
    return;
  }

  try {
    isPlayingNote = true;
    const player = players.notes[index];
    // player.seekTo(0);
    // player.play();
    await playPlayerSafely(player);

    // 음 길이만큼 잠금 (0.35초 정도 추천)
    setTimeout(() => {
      isPlayingNote = false;
    }, 350);
  } catch (e) {
    console.log("음 재생 실패:", e);
    isPlayingNote = false;
  }
}

// 정답일 때
export async function playStreakNote(streakCount: number) {
  // if (!successSoundEnabled) return; // ⭐ 정답 효과
  const enabled = await getSoundEnabled();
  if (!enabled) return;

  const index = Math.min(Math.max(streakCount, 1), 10) - 1;
  lastSuccessNoteIndex = index;
  await playNoteByIndex(index);
}

export async function playLastSuccessNote() {
  // if (!successSoundEnabled) return; // ⭐
  const enabled = await getSoundEnabled();
  if (!enabled) return;

  try {
    // ⭐ 아직 성공한 적이 없으면 아무 소리도 안 냄
    if (lastSuccessNoteIndex === null) {
      return;
    }

    const player = players.notes[lastSuccessNoteIndex];
    if (!player) return;
    await playPlayerSafely(player);
  } catch (error) {
    // console.log("이전 음계 재생 실패:", error);
  }
}

// ⭐ earnedStars 개수만큼 도 → 레 → 미 ... 순차 연주!
// ⭐ earnedStars 개수만큼 도 → 레 → 미 ... 깨끗하게 순차 연주
export async function playEarnedNotes(earnedStars: number) {
  // if (!successSoundEnabled) return; // ⭐ 가장 중요!
  const enabled = await getCorrectEffectEnabled();
  if (!enabled) return;

  if (!players.notes || players.notes.length === 0) {
    console.log("음계 플레이어가 아직 준비되지 않음");
    return;
  }

  const count = Math.min(Math.max(earnedStars, 0), players.notes.length);
  if (count <= 0) return;

  // 이전 연주 중인 음들을 일단 전부 정지
  await stopAllNotes();

  // 순차 재생 (간격을 충분히 줌)
  for (let i = 0; i < count; i++) {
    setTimeout(async () => {
      const player = players.notes[i];
      if (player) {
        await playPlayerSafely(player);
      }
    }, i * 220);
  }
}

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AppState } from "react-native";
import { useAudioPlayer } from "expo-audio";

import {
  getBGMEnabled,
  setBGMEnabled,
} from "./asyncStorage/audioSettingsStorage";

// 💡 곡별로 source, 이름, 개별 볼륨 설정 가능
const BGM_LIST = [
  {
    source: require("../../assets/sounds/bgm_1.mp3"),
    name: "bgm_1.mp3",
    volume: 0.2,
  },

  {
    source: require("../../assets/sounds/bgm_3.mp3"),
    name: "bgm_3.mp3",
    volume: 0.5,
  },
  {
    source: require("../../assets/sounds/bgm_4.mp3"),
    name: "bgm_4.mp3",
    volume: 0.4,
  },
  {
    source: require("../../assets/sounds/bgm_5.mp3"),
    name: "bgm_5.mp3",
    volume: 0.4,
  },
];

interface BackgroundMusicContextType {
  backgroundMusic: boolean;
  setBackgroundMusic: (enabled: boolean) => Promise<void>;
  changeTrack: (index: number) => void;
  currentTrackIndex: number;
  nextTrack: () => void; // 👈 추가
}

const BackgroundMusicContext = createContext<BackgroundMusicContextType | null>(
  null,
);

export function BackgroundMusicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [backgroundMusic, setBackgroundMusicState] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  // 현재 트랙 인덱스 참조 (이벤트 리스너 내 최신값 참조용)
  const trackIndexRef = useRef(0);
  trackIndexRef.current = currentTrackIndex;

  const bgmEnabledRef = useRef(true);
  bgmEnabledRef.current = backgroundMusic;

  // 1️⃣ 첫 번째 트랙으로 플레이어 초기화 (loop = false 지정)
  const player = useAudioPlayer(BGM_LIST[0].source);

  // 🎵 다음 트랙으로 넘어가기 (순환)
  const playNextTrack = () => {
    const nextIndex = (trackIndexRef.current + 1) % BGM_LIST.length;
    changeTrack(nextIndex);
  };

  // 💡 음원 재생 완료 상태 감지 및 다음 곡 자동 재생
  useEffect(() => {
    // player의 재생 상태 변화 리스너 등록
    const subscription = player.addListener(
      "playbackStatusUpdate",
      (status) => {
        // 재생이 완료되었을 때(didJustFinish / isEnded)
        if (status.isLoaded && status.didJustFinish && bgmEnabledRef.current) {
          playNextTrack();
        }
      },
    );

    return () => {
      subscription?.remove();
    };
  }, [player]);

  // 2️⃣ 앱 시작 시 BGM 설정 및 첫 곡 재생
  useEffect(() => {
    let cancelled = false;

    const loadSetting = async () => {
      const enabled = await getBGMEnabled();
      if (cancelled) return;

      setBackgroundMusicState(enabled);

      if (enabled) {
        player.loop = false; // 👈 단일 곡 루프 OFF (다음 곡으로 넘어가기 위함)
        player.volume = BGM_LIST[0].volume; // 💡 첫 곡 개별 볼륨 적용
        player.play();
      }
    };

    loadSetting();

    return () => {
      cancelled = true;
      try {
        player.pause();
      } catch {}
    };
  }, []);

  // 3️⃣ 백그라운드/포그라운드 앱 상태 처리
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active" && backgroundMusic) {
        try {
          player.play();
        } catch {}
      } else if (nextAppState.match(/inactive|background/)) {
        try {
          player.pause();
        } catch {}
      }
    });

    return () => {
      subscription.remove();
    };
  }, [backgroundMusic]);

  // 4️⃣ BGM On/Off 토글
  const setBackgroundMusic = async (enabled: boolean) => {
    setBackgroundMusicState(enabled);
    await setBGMEnabled(enabled);

    if (enabled) {
      player.loop = false;
      player.volume = BGM_LIST[currentTrackIndex].volume; // 💡 첫 곡 개별 볼륨 적용
      player.play();
    } else {
      try {
        player.pause();
      } catch {}
    }
  };

  // 5️⃣ 특정 트랙 교체 함수
  const changeTrack = (index: number) => {
    const trackItem = BGM_LIST[index]; // 👈 객체 전체를 담기
    if (!trackItem) return;

    setCurrentTrackIndex(index);
    player.replace(trackItem.source);
    player.loop = false;
    player.volume = trackItem.volume; // 👈 이제 개별 볼륨(0.2, 0.4 등)이 정확히 적용됩니다!

    if (bgmEnabledRef.current) {
      player.play();
      console.log(
        `▶️ [BGM] 재생 시작: ${trackItem.name} (Volume: ${trackItem.volume})`,
      );
    }
  }; // ⏭️ 외부에서 강제로 다음 곡으로 넘길 수 있는 테스트용 함수
  const nextTrack = () => {
    const nextIndex = (trackIndexRef.current + 1) % BGM_LIST.length;
    console.log(
      `⏭️ [BGM Test] 수동 스킵! 다음 곡으로 이동: Index ${nextIndex} (${BGM_LIST[nextIndex].name})`,
    );
    changeTrack(nextIndex);
  };

  return (
    <BackgroundMusicContext.Provider
      value={{
        backgroundMusic,
        setBackgroundMusic,
        changeTrack,
        nextTrack,
        currentTrackIndex,
      }}
    >
      {children}
    </BackgroundMusicContext.Provider>
  );
}

export function useBackgroundMusic() {
  const context = useContext(BackgroundMusicContext);

  if (!context) {
    throw new Error(
      "useBackgroundMusic must be used inside BackgroundMusicProvider",
    );
  }

  return context;
}

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

// 💡 용도별 BGM 정의 (메인, 게임, 스티커북 등)
const BGM_THEMES = {
  main: {
    source: require("../../assets/sounds/bgm_main_1.mp3"),
    name: "bgm_main_1.mp3",
    volume: 0.2,
    loop: true, // 👈 메인은 무한 반복!
  },
  game: {
    source: require("../../assets/sounds/bgm_3.mp3"),
    name: "bgm_3.mp3 (Game)",
    volume: 0.5,
    loop: true,
  },
  sticker: {
    source: require("../../assets/sounds/bgm_sticker_1.mp3"),
    name: "bgm_sticker_1",
    volume: 0.4,
    loop: true,
  },
  fun: {
    source: require("../../assets/sounds/bgm_5.mp3"),
    name: "bgm_5.mp3 (Extra)",
    volume: 0.4,
    loop: true,
  },
};

export type BGMThemeKey = keyof typeof BGM_THEMES;

interface BackgroundMusicContextType {
  backgroundMusic: boolean;
  setBackgroundMusic: (enabled: boolean) => Promise<void>;
  playThemeBGM: (themeKey: BGMThemeKey) => void; // 👈 테마별 BGM 재생 함수
  currentTheme: BGMThemeKey;
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
  const [currentTheme, setCurrentTheme] = useState<BGMThemeKey>("main");

  const bgmEnabledRef = useRef(true);
  bgmEnabledRef.current = backgroundMusic;

  const currentThemeRef = useRef<BGMThemeKey>("main");
  currentThemeRef.current = currentTheme;

  // 1️⃣ 기본 메인 BGM으로 플레이어 초기화
  const player = useAudioPlayer(BGM_THEMES.main.source);

  // 2️⃣ 앱 시작 시 BGM 설정 불러오기 및 메인 BGM 재생
  useEffect(() => {
    let cancelled = false;

    const loadSetting = async () => {
      const enabled = await getBGMEnabled();
      if (cancelled) return;

      setBackgroundMusicState(enabled);

      if (enabled) {
        player.loop = BGM_THEMES.main.loop;
        player.volume = BGM_THEMES.main.volume;
        player.play();
        console.log(`▶️ [BGM] 앱 시작 - Main BGM 재생`);
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
      const activeTheme = BGM_THEMES[currentThemeRef.current];
      player.loop = activeTheme.loop;
      player.volume = activeTheme.volume;
      player.play();
    } else {
      try {
        player.pause();
      } catch {}
    }
  };

  // 5️⃣ 💡 화면에 따라 원하는 테마 BGM으로 전환하는 함수
  const playThemeBGM = (themeKey: BGMThemeKey) => {
    const theme = BGM_THEMES[themeKey];
    if (!theme) return;

    setCurrentTheme(themeKey);
    player.replace(theme.source);
    player.loop = theme.loop;
    player.volume = theme.volume;

    if (bgmEnabledRef.current) {
      player.play();
      console.log(
        `🎵 [BGM Switch] 테마 변경 -> ${theme.name} (Vol: ${theme.volume})`,
      );
    }
  };

  return (
    <BackgroundMusicContext.Provider
      value={{
        backgroundMusic,
        setBackgroundMusic,
        playThemeBGM,
        currentTheme,
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

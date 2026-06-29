"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { OpeningTransition } from "@/components/providers/opening-transition";
import { finishIntro, shouldPlayIntroFromDom } from "@/lib/intro";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type IntroContextValue = {
  introComplete: boolean;
  introWasPlayed: boolean;
  skipIntro: boolean;
};

const IntroContext = createContext<IntroContextValue>({
  introComplete: false,
  introWasPlayed: false,
  skipIntro: false,
});

export function useIntro() {
  return useContext(IntroContext);
}

export function IntroProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [playIntro, setPlayIntro] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [introWasPlayed, setIntroWasPlayed] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);

    const shouldPlay = shouldPlayIntroFromDom();
    setPlayIntro(shouldPlay);

    if (!shouldPlay) {
      setIntroComplete(true);
      return;
    }

    setIntroWasPlayed(true);

    if (reducedMotion) {
      finishIntro();
      setPlayIntro(false);
      setIntroComplete(true);
    }
  }, [reducedMotion]);

  const onIntroComplete = useCallback(() => {
    finishIntro();
    setPlayIntro(false);
    setIntroComplete(true);
  }, []);

  const skipIntro = reducedMotion || introComplete;
  const showIntro = mounted && playIntro && !skipIntro;

  const value = useMemo(
    () => ({ introComplete, introWasPlayed, skipIntro }),
    [introComplete, introWasPlayed, skipIntro],
  );

  return (
    <IntroContext.Provider value={value}>
      {showIntro ? <OpeningTransition onComplete={onIntroComplete} /> : null}
      <div id="site-root">{children}</div>
    </IntroContext.Provider>
  );
}

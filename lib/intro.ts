export const INTRO_SESSION_KEY = "sanct-intro-v2-seen";

export const INTRO_BOOT_SCRIPT = `
(function () {
  try {
    var root = document.documentElement;
    var env = root.getAttribute("data-env");
    var seen = sessionStorage.getItem("${INTRO_SESSION_KEY}") === "1";
    var skipParam = location.search.indexOf("skip-intro") !== -1;
    var shouldPlay = !skipParam && (env === "development" || !seen);
    var fallback = document.getElementById("intro-fallback");

    root.dataset.intro = shouldPlay ? "pending" : "complete";

    if (fallback) {
      fallback.dataset.active = shouldPlay ? "true" : "false";
    }
  } catch (error) {
    document.documentElement.dataset.intro = "complete";
    var fallback = document.getElementById("intro-fallback");
    if (fallback) fallback.dataset.active = "false";
  }
})();
`.trim();

export function hasSeenIntro(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(INTRO_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function markIntroSeen(): void {
  try {
    sessionStorage.setItem(INTRO_SESSION_KEY, "1");
  } catch {
    // sessionStorage may be unavailable in private mode
  }
}

export function finishIntro(): void {
  if (typeof document === "undefined") return;

  document.documentElement.dataset.intro = "complete";

  const fallback = document.getElementById("intro-fallback");
  if (fallback) {
    fallback.dataset.active = "false";
  }

  markIntroSeen();
}

export function shouldPlayIntroFromDom(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.dataset.intro === "pending";
}

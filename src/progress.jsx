import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { MODULES } from "./data/modules.js";
import { lessonKey } from "./utils.js";

const STORAGE_KEY = "sap-lernapp-progress-v1";

const EMPTY = {
  xp: 0,
  lessons: {}, // key → { best: Prozent, done: true }
  tcode: { right: 0, total: 0, bestStreak: 0 },
  processes: {}, // id → true
  exam: { best: null, passedAt: null },
  theme: null
};

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const data = JSON.parse(raw);
    return { ...EMPTY, ...data, tcode: { ...EMPTY.tcode, ...data.tcode }, exam: { ...EMPTY.exam, ...data.exam } };
  } catch {
    return EMPTY;
  }
}

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [state, setState] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* Speicher nicht verfügbar (z. B. privater Modus) – App läuft trotzdem */
    }
  }, [state]);

  useEffect(() => {
    if (state.theme) document.documentElement.dataset.theme = state.theme;
    else delete document.documentElement.dataset.theme;
  }, [state.theme]);

  const completeLesson = useCallback((key, pct) => {
    setState((s) => {
      const prev = s.lessons[key];
      const first = !prev;
      const improved = !prev || pct > prev.best;
      return {
        ...s,
        xp: s.xp + (first ? 50 : 0) + (improved ? Math.round(pct / 10) * 5 : 0),
        lessons: { ...s.lessons, [key]: { done: true, best: Math.max(pct, prev?.best ?? 0) } }
      };
    });
  }, []);

  const recordTcode = useCallback((correct, streak) => {
    setState((s) => ({
      ...s,
      xp: s.xp + (correct ? 5 : 0),
      tcode: {
        right: s.tcode.right + (correct ? 1 : 0),
        total: s.tcode.total + 1,
        bestStreak: Math.max(s.tcode.bestStreak, streak)
      }
    }));
  }, []);

  const completeProcess = useCallback((id, perfect) => {
    setState((s) => ({
      ...s,
      xp: s.xp + (s.processes[id] ? 0 : perfect ? 60 : 30),
      processes: { ...s.processes, [id]: true }
    }));
  }, []);

  const recordExam = useCallback((pct) => {
    setState((s) => ({
      ...s,
      xp: s.xp + (pct >= 70 && !s.exam.passedAt ? 200 : 0),
      exam: {
        best: Math.max(pct, s.exam.best ?? 0),
        passedAt: s.exam.passedAt ?? (pct >= 70 ? new Date().toISOString() : null)
      }
    }));
  }, []);

  const toggleTheme = useCallback(() => {
    setState((s) => {
      const current = s.theme ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      return { ...s, theme: current === "dark" ? "light" : "dark" };
    });
  }, []);

  const reset = useCallback(() => setState((s) => ({ ...EMPTY, theme: s.theme })), []);

  const stats = useMemo(() => {
    const allLessons = MODULES.flatMap((m) => m.lessons.map((l) => lessonKey(m.id, l.id)));
    const done = allLessons.filter((k) => state.lessons[k]?.done).length;
    const xp = state.xp;
    const levels = [
      [0, "SAP-Neuling"],
      [200, "Easy-Access-Entdecker"],
      [600, "Key User"],
      [1200, "Junior Consultant"],
      [2000, "Senior Consultant"],
      [3000, "Solution Architect"]
    ];
    let idx = 0;
    levels.forEach(([min], i) => { if (xp >= min) idx = i; });
    const next = levels[idx + 1];
    return {
      totalLessons: allLessons.length,
      doneLessons: done,
      level: levels[idx][1],
      levelNo: idx + 1,
      nextLevelXp: next ? next[0] : null,
      levelProgress: next ? (xp - levels[idx][0]) / (next[0] - levels[idx][0]) : 1
    };
  }, [state]);

  const value = { state, stats, completeLesson, recordTcode, completeProcess, recordExam, toggleTheme, reset };
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  return useContext(ProgressContext);
}

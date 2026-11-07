import { MODULES } from "./data/modules.js";
import { PROCESSES } from "./data/processes.js";
import { TASK_BY_ID, TASK_TYPES } from "./data/tasks.js";
import { lessonKey } from "./utils.js";

export const PATH_TEST_PASS = 70;

/** Anzeige-Infos zu einem Lernpfad-Schritt. */
export function stepInfo(step, path) {
  switch (step.type) {
    case "lesson": {
      const m = MODULES.find((x) => x.id === step.module);
      const l = m?.lessons.find((x) => x.id === step.lesson);
      return {
        kind: "Lektion",
        icon: "📘",
        title: l?.title ?? "Unbekannte Lektion",
        sub: m ? `${m.icon} ${m.title}` : "",
        href: `#lektion--${step.module}--${step.lesson}`,
        minutes: (l?.minutes ?? 5) + 2
      };
    }
    case "task": {
      const t = TASK_BY_ID[step.id];
      const type = TASK_TYPES[t?.type];
      return {
        kind: `Aufgabe · ${type?.label ?? ""}`,
        icon: type?.icon ?? "📝",
        title: t?.title ?? "Unbekannte Aufgabe",
        sub: "Praxisaufgabe",
        href: `#aufgabe--${step.id}`,
        minutes: 5
      };
    }
    case "tcodes":
      return {
        kind: "T-Code-Drill",
        icon: "⌨️",
        title: `${step.target} Transaktionen im Bereich ${step.area}`,
        sub: "Im Befehlsfeld richtig eingeben",
        href: `#tcodes--${step.area}`,
        minutes: 5
      };
    case "process": {
      const p = PROCESSES.find((x) => x.id === step.id);
      return {
        kind: "Prozess-Puzzle",
        icon: "🔗",
        title: p?.title ?? "Prozess",
        sub: p?.subtitle ?? "",
        href: `#prozesse--${step.id}`,
        minutes: 4
      };
    }
    case "test":
      return {
        kind: "Abschlusstest",
        icon: "🎓",
        title: `Abschlusstest: ${path.title}`,
        sub: `10 Fragen · ab ${PATH_TEST_PASS}% bestanden`,
        href: `#pfadtest--${path.id}`,
        minutes: 8
      };
    default:
      return { kind: "", icon: "•", title: "", sub: "", href: "#start", minutes: 0 };
  }
}

export function isStepDone(step, state, path) {
  switch (step.type) {
    case "lesson":
      return !!state.lessons[lessonKey(step.module, step.lesson)]?.done;
    case "task":
      return !!state.tasks[step.id]?.done;
    case "tcodes":
      return (state.tcode.byArea?.[step.area] ?? 0) >= step.target;
    case "process":
      return !!state.processes[step.id];
    case "test":
      return (state.pathTests[path.id] ?? 0) >= PATH_TEST_PASS;
    default:
      return false;
  }
}

export function pathProgress(path, state) {
  const flags = path.steps.map((s) => isStepDone(s, state, path));
  const done = flags.filter(Boolean).length;
  const nextIndex = flags.findIndex((f) => !f);
  const minutesLeft = path.steps.reduce((sum, s, i) => sum + (flags[i] ? 0 : stepInfo(s, path).minutes), 0);
  return { flags, done, total: path.steps.length, nextIndex, minutesLeft, complete: nextIndex === -1 };
}

export function pathMinutes(path) {
  return path.steps.reduce((sum, s) => sum + stepInfo(s, path).minutes, 0);
}

/** Alle Quizfragen der Lektionen eines Pfades. */
export function pathQuestions(path) {
  const seen = new Set();
  const qs = [];
  for (const s of path.steps) {
    if (s.type !== "lesson") continue;
    const key = lessonKey(s.module, s.lesson);
    if (seen.has(key)) continue;
    seen.add(key);
    const l = MODULES.find((m) => m.id === s.module)?.lessons.find((x) => x.id === s.lesson);
    if (l) qs.push(...l.quiz);
  }
  return qs;
}

export function formatMinutes(min) {
  if (min < 60) return `${min} Min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} Std ${m} Min` : `${h} Std`;
}

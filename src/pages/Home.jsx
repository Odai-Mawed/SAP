import { useState } from "react";
import { MODULES } from "../data/modules.js";
import { useProgress } from "../progress.jsx";
import { lessonKey } from "../utils.js";
import { PATHS, PATH_BY_ID } from "../data/paths.js";
import { TASKS } from "../data/tasks.js";
import { pathProgress, stepInfo } from "../pathLogic.js";
import PathNext from "../components/PathNext.jsx";

export default function Home() {
  const { state, stats, reset } = useProgress();
  const [confirming, setConfirming] = useState(false);

  // Nächste noch nicht abgeschlossene Lektion
  let nextLesson = null;
  for (const m of MODULES) {
    const l = m.lessons.find((l) => !state.lessons[lessonKey(m.id, l.id)]?.done);
    if (l) {
      nextLesson = { m, l };
      break;
    }
  }

  const tasksDone = TASKS.filter((t) => state.tasks[t.id]?.done).length;
  const activePath = PATH_BY_ID[state.activePath];
  const activeProg = activePath ? pathProgress(activePath, state) : null;
  const activeNext = activeProg && !activeProg.complete ? stepInfo(activePath.steps[activeProg.nextIndex], activePath) : null;
  const pct = Math.round((stats.doneLessons / stats.totalLessons) * 100);

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <span className="eyebrow">Level {stats.levelNo} · {stats.level}</span>
          <h1>Lerne SAP – Schritt für Schritt.</h1>
          <p>
            Von den Grundlagen über FI, CO, MM, SD und PP bis zu S/4HANA und ABAP. Mit Lektionen, Quizzen,
            Praxisaufgaben, einem Transaktions-Trainer im SAP-GUI-Stil und rollenbasierten Lernpfaden.
          </p>
          <div className="hero-actions">
            {activeNext ? (
              <a className="btn btn-lg" href={activeNext.href}>
                Weiter im Pfad: {activeNext.title} →
              </a>
            ) : !activePath ? (
              <a className="btn btn-lg" href="#lernpfade">Lernpfad wählen →</a>
            ) : nextLesson ? (
              <a className="btn btn-lg" href={`#lektion--${nextLesson.m.id}--${nextLesson.l.id}`}>
                {stats.doneLessons === 0 ? "Jetzt starten" : "Weiterlernen"}: {nextLesson.l.title} →
              </a>
            ) : (
              <a className="btn btn-lg" href="#pruefung">Alle Lektionen geschafft – zur Abschlussprüfung →</a>
            )}
          </div>
          {stats.nextLevelXp && (
            <div className="level-bar" title={`Noch ${stats.nextLevelXp - state.xp} XP bis zum nächsten Level`}>
              <div style={{ width: `${stats.levelProgress * 100}%` }} />
              <small>{state.xp} / {stats.nextLevelXp} XP bis zum nächsten Level</small>
            </div>
          )}
        </div>
        <div className="stats">
          <Stat value={`${stats.doneLessons}/${stats.totalLessons}`} label="Lektionen" sub={`${pct}% abgeschlossen`} />
          <Stat value={state.xp} label="XP gesammelt" sub={stats.level} />
          <Stat value={`${tasksDone}/${TASKS.length}`} label="Praxisaufgaben" sub="gelöst" />
          <Stat
            value={state.exam.best != null ? `${state.exam.best}%` : "–"}
            label="Prüfung"
            sub={state.exam.passedAt ? "Bestanden ✅" : "Noch nicht bestanden"}
          />
        </div>
      </section>

      {activePath ? (
        <PathNext />
      ) : (
        <>
          <h2 className="section-title">Wähle deinen Lernpfad</h2>
          <section className="path-pick">
            {PATHS.map((p) => (
              <a key={p.id} href={`#pfad--${p.id}`} className="path-mini" style={{ "--accent": p.color }}>
                <span>{p.icon}</span>
                <div><strong>{p.title}</strong><small>{p.role}</small></div>
              </a>
            ))}
          </section>
        </>
      )}

      <section className="quick">
        <a className="quick-card" href="#aufgaben">
          <span>📝</span>
          <div><strong>Praxisaufgaben</strong><small>Buchungen, SAP-Masken, Support-Fälle</small></div>
        </a>
        <a className="quick-card" href="#tcodes">
          <span>⌨️</span>
          <div><strong>T-Code-Trainer</strong><small>Transaktionen im Befehlsfeld üben</small></div>
        </a>
        <a className="quick-card" href="#prozesse">
          <span>🔗</span>
          <div><strong>Prozess-Puzzle</strong><small>P2P, O2C & Co. in die richtige Reihenfolge</small></div>
        </a>
      </section>

      <h2 className="section-title">Lernmodule</h2>
      <section className="module-grid">
        {MODULES.map((m) => {
          const done = m.lessons.filter((l) => state.lessons[lessonKey(m.id, l.id)]?.done).length;
          const p = (done / m.lessons.length) * 100;
          return (
            <a key={m.id} className="module-card" href={`#modul--${m.id}`} style={{ "--accent": m.color }}>
              <div className="mc-top">
                <span className="mc-icon">{m.icon}</span>
                <span className={`level-tag lvl-${m.level}`}>{m.level}</span>
              </div>
              <h3>{m.title}</h3>
              <p>{m.description}</p>
              <div className="mc-foot">
                <div className="bar small"><div style={{ width: `${p}%` }} /></div>
                <small>{done}/{m.lessons.length} {done === m.lessons.length ? "✅" : ""}</small>
              </div>
            </a>
          );
        })}
      </section>

      <div className="reset-row">
        {confirming ? (
          <div className="confirm-box">
            <span>Gesamten Lernfortschritt wirklich löschen?</span>
            <button className="btn danger" onClick={() => { reset(); setConfirming(false); }}>Ja, zurücksetzen</button>
            <button className="btn ghost" onClick={() => setConfirming(false)}>Abbrechen</button>
          </div>
        ) : (
          <button className="btn ghost" onClick={() => setConfirming(true)}>
            Fortschritt zurücksetzen
          </button>
        )}
      </div>
    </>
  );
}

function Stat({ value, label, sub }) {
  return (
    <div className="stat">
      <strong>{value}</strong>
      <span>{label}</span>
      <small>{sub}</small>
    </div>
  );
}

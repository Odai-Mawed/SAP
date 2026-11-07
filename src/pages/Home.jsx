import { MODULES } from "../data/modules.js";
import { useProgress } from "../progress.jsx";
import { lessonKey } from "../utils.js";

export default function Home() {
  const { state, stats, reset } = useProgress();

  // Nächste noch nicht abgeschlossene Lektion
  let nextLesson = null;
  for (const m of MODULES) {
    const l = m.lessons.find((l) => !state.lessons[lessonKey(m.id, l.id)]?.done);
    if (l) {
      nextLesson = { m, l };
      break;
    }
  }

  const tcodeRate = state.tcode.total ? Math.round((state.tcode.right / state.tcode.total) * 100) : 0;
  const pct = Math.round((stats.doneLessons / stats.totalLessons) * 100);

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <span className="eyebrow">Level {stats.levelNo} · {stats.level}</span>
          <h1>Lerne SAP – Schritt für Schritt.</h1>
          <p>
            Von den Grundlagen über FI, CO, MM, SD und PP bis zu S/4HANA und ABAP. Mit Lektionen, Quizzen,
            einem Transaktions-Trainer im SAP-GUI-Stil und Prozess-Übungen.
          </p>
          <div className="hero-actions">
            {nextLesson ? (
              <a className="btn btn-lg" href={`#/lektion/${nextLesson.m.id}/${nextLesson.l.id}`}>
                {stats.doneLessons === 0 ? "Jetzt starten" : "Weiterlernen"}: {nextLesson.l.title} →
              </a>
            ) : (
              <a className="btn btn-lg" href="#/pruefung">Alle Lektionen geschafft – zur Abschlussprüfung →</a>
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
          <Stat value={`${tcodeRate}%`} label="T-Code-Trefferquote" sub={`${state.tcode.total} Versuche`} />
          <Stat
            value={state.exam.best != null ? `${state.exam.best}%` : "–"}
            label="Prüfung"
            sub={state.exam.passedAt ? "Bestanden ✅" : "Noch nicht bestanden"}
          />
        </div>
      </section>

      <section className="quick">
        <a className="quick-card" href="#/tcodes">
          <span>⌨️</span>
          <div><strong>T-Code-Trainer</strong><small>Transaktionen im Befehlsfeld üben</small></div>
        </a>
        <a className="quick-card" href="#/prozesse">
          <span>🔗</span>
          <div><strong>Prozess-Puzzle</strong><small>P2P, O2C & Co. in die richtige Reihenfolge</small></div>
        </a>
        <a className="quick-card" href="#/glossar">
          <span>📖</span>
          <div><strong>Glossar</strong><small>SAP-Begriffe nachschlagen</small></div>
        </a>
      </section>

      <h2 className="section-title">Lernmodule</h2>
      <section className="module-grid">
        {MODULES.map((m) => {
          const done = m.lessons.filter((l) => state.lessons[lessonKey(m.id, l.id)]?.done).length;
          const p = (done / m.lessons.length) * 100;
          return (
            <a key={m.id} className="module-card" href={`#/modul/${m.id}`} style={{ "--accent": m.color }}>
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
        <button
          className="btn ghost"
          onClick={() => {
            if (window.confirm("Gesamten Lernfortschritt wirklich zurücksetzen?")) reset();
          }}
        >
          Fortschritt zurücksetzen
        </button>
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

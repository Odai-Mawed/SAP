import { PATHS } from "../data/paths.js";
import { formatMinutes, pathMinutes, pathProgress } from "../pathLogic.js";
import { useProgress } from "../progress.jsx";

export default function Paths() {
  const { state } = useProgress();
  return (
    <>
      <h1>Lernpfade</h1>
      <p className="lead">
        Wähle einen Pfad passend zu deiner Rolle. Jeder Pfad führt dich Schritt für Schritt durch Lektionen,
        Praxisaufgaben, T-Code-Drills und Prozess-Übungen und endet mit einem Abschlusstest.
      </p>
      <div className="path-grid">
        {PATHS.map((p) => {
          const prog = pathProgress(p, state);
          const active = state.activePath === p.id;
          const pct = Math.round((prog.done / prog.total) * 100);
          return (
            <a key={p.id} href={`#pfad--${p.id}`} className={`path-card ${active ? "active" : ""}`} style={{ "--accent": p.color }}>
              <div className="pc-top">
                <span className="pc-icon">{p.icon}</span>
                {active && <span className="active-badge">Aktiver Pfad</span>}
                {prog.complete && <span className="done-badge">🏆 Abgeschlossen</span>}
              </div>
              <h3>{p.title}</h3>
              <small className="pc-role">{p.role}</small>
              <p>{p.description}</p>
              <div className="pc-meta">
                <span>{prog.total} Schritte</span>
                <span>≈ {formatMinutes(pathMinutes(p))}</span>
              </div>
              <div className="mc-foot">
                <div className="bar small"><div style={{ width: `${pct}%` }} /></div>
                <small>{pct}%</small>
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
}

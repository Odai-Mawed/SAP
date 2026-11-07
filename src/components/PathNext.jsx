import { PATH_BY_ID } from "../data/paths.js";
import { pathProgress, stepInfo } from "../pathLogic.js";
import { useProgress } from "../progress.jsx";

/** Zeigt den nächsten offenen Schritt des aktiven Lernpfads. */
export default function PathNext({ compact = false }) {
  const { state } = useProgress();
  const path = PATH_BY_ID[state.activePath];
  if (!path) return null;
  const prog = pathProgress(path, state);

  if (prog.complete) {
    return (
      <div className={`path-next done ${compact ? "compact" : ""}`} style={{ "--accent": path.color }}>
        <span className="pn-icon">🏆</span>
        <div className="pn-text">
          <small>Lernpfad {path.title}</small>
          <strong>Alle {prog.total} Schritte geschafft!</strong>
        </div>
        <a className="btn ghost" href="#lernpfade">Neuen Pfad wählen</a>
      </div>
    );
  }

  const step = path.steps[prog.nextIndex];
  const info = stepInfo(step, path);
  return (
    <div className={`path-next ${compact ? "compact" : ""}`} style={{ "--accent": path.color }}>
      <span className="pn-icon">{info.icon}</span>
      <div className="pn-text">
        <small>
          Lernpfad {path.title} · Schritt {prog.nextIndex + 1} von {prog.total}
        </small>
        <strong>{info.title}</strong>
        <div className="bar small"><div style={{ width: `${(prog.done / prog.total) * 100}%` }} /></div>
      </div>
      <a className="btn" href={info.href}>Weiter →</a>
    </div>
  );
}

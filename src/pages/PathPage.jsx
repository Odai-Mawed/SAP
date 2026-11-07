import { PATH_BY_ID } from "../data/paths.js";
import { formatMinutes, pathProgress, stepInfo } from "../pathLogic.js";
import { useProgress } from "../progress.jsx";
import NotFound from "./NotFound.jsx";

export default function PathPage({ pathId }) {
  const { state, setActivePath } = useProgress();
  const path = PATH_BY_ID[pathId];
  if (!path) return <NotFound />;

  const prog = pathProgress(path, state);
  const active = state.activePath === path.id;
  const next = prog.nextIndex >= 0 ? stepInfo(path.steps[prog.nextIndex], path) : null;

  return (
    <div className="path-page" style={{ "--accent": path.color }}>
      <a className="back" href="#lernpfade">← Alle Lernpfade</a>
      <header className="path-head">
        <span className="mh-icon">{path.icon}</span>
        <div className="ph-text">
          <small className="pc-role">{path.role}</small>
          <h1>{path.title}</h1>
          <p>{path.description}</p>
          <div className="ph-stats">
            <span><b>{prog.done}</b> / {prog.total} Schritte</span>
            <span>{prog.complete ? "Abgeschlossen 🏆" : <>noch ≈ <b>{formatMinutes(prog.minutesLeft)}</b></>}</span>
          </div>
          <div className="bar"><div style={{ width: `${(prog.done / prog.total) * 100}%` }} /></div>
          <div className="row">
            {next && (
              <a className="btn btn-lg" href={next.href} onClick={() => setActivePath(path.id)}>
                {prog.done === 0 ? "Pfad starten" : "Weiter"}: {next.title} →
              </a>
            )}
            {active ? (
              <span className="active-badge">Aktiver Pfad</span>
            ) : (
              <button className="btn ghost" onClick={() => setActivePath(path.id)}>Als aktiven Pfad festlegen</button>
            )}
          </div>
        </div>
      </header>

      <ol className="timeline">
        {path.steps.map((step, i) => {
          const info = stepInfo(step, path);
          const done = prog.flags[i];
          const isNext = i === prog.nextIndex;
          return (
            <li key={i} className={`${done ? "done" : ""} ${isNext ? "next" : ""}`}>
              <span className="tl-dot">{done ? "✓" : i + 1}</span>
              <a className="tl-card" href={info.href} onClick={() => setActivePath(path.id)}>
                <span className="tl-icon">{info.icon}</span>
                <span className="tl-text">
                  <small>{info.kind}{isNext ? " · Als Nächstes" : ""}</small>
                  <strong>{info.title}</strong>
                  {info.sub && <span className="tl-sub">{info.sub}</span>}
                </span>
                <span className="tl-min">{info.minutes} Min</span>
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

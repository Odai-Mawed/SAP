import { useState } from "react";
import { PROCESSES } from "../data/processes.js";
import { useProgress } from "../progress.jsx";
import { shuffle } from "../utils.js";

export default function Processes() {
  const { state } = useProgress();
  const [selected, setSelected] = useState(null);
  const proc = PROCESSES.find((p) => p.id === selected);

  return (
    <>
      <h1>Prozess-Puzzle</h1>
      <p className="lead">
        SAP denkt in End-to-End-Prozessen. Bring die Schritte in die richtige Reihenfolge – danach siehst du zu jedem
        Schritt die Transaktion und die Buchung in der Finanzbuchhaltung.
      </p>
      <div className="proc-tabs">
        {PROCESSES.map((p) => (
          <button key={p.id} className={`proc-tab ${selected === p.id ? "active" : ""}`} onClick={() => setSelected(p.id)}>
            <span>{p.icon}</span>
            <strong>{p.title}</strong>
            <small>{p.subtitle}</small>
            {state.processes[p.id] && <em>✅ gelöst</em>}
          </button>
        ))}
      </div>
      {proc ? <Puzzle key={proc.id} proc={proc} /> : <div className="card center muted">Wähle oben einen Prozess aus.</div>}
    </>
  );
}

function Puzzle({ proc }) {
  const { completeProcess } = useProgress();
  const [pool, setPool] = useState(() => {
    let s = shuffle(proc.steps.map((step, idx) => ({ ...step, idx })));
    // nicht zufällig schon korrekt sortiert anzeigen
    if (s.every((x, i) => x.idx === i)) s = s.reverse();
    return s;
  });
  const [placed, setPlaced] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [shake, setShake] = useState(null);

  const done = placed.length === proc.steps.length;

  function pick(item) {
    if (item.idx === placed.length) {
      const nextPlaced = [...placed, item];
      setPlaced(nextPlaced);
      setPool(pool.filter((p) => p !== item));
      if (nextPlaced.length === proc.steps.length) completeProcess(proc.id, mistakes === 0);
    } else {
      setMistakes((m) => m + 1);
      setShake(item.idx);
      setTimeout(() => setShake(null), 450);
    }
  }

  function restart() {
    setPool(shuffle(proc.steps.map((step, idx) => ({ ...step, idx }))));
    setPlaced([]);
    setMistakes(0);
  }

  return (
    <div className="card puzzle">
      <div className="puzzle-head">
        <h2>{proc.icon} {proc.title}</h2>
        <span className="muted">Fehler: {mistakes}</span>
      </div>

      <ol className="placed">
        {proc.steps.map((_, i) => {
          const s = placed[i];
          return (
            <li key={i} className={s ? "filled" : ""}>
              <span className="p-no">{i + 1}</span>
              {s ? (
                <div className="p-content">
                  <strong>{s.label}</strong>
                  <div className="p-meta">
                    <code className="tc">{s.tcode}</code>
                    <span>💶 {s.fi}</span>
                  </div>
                </div>
              ) : (
                <span className="p-empty">{i === placed.length ? "Welcher Schritt kommt jetzt?" : "…"}</span>
              )}
            </li>
          );
        })}
      </ol>

      {!done ? (
        <div className="pool">
          {pool.map((p) => (
            <button key={p.idx} className={`pool-item ${shake === p.idx ? "shake" : ""}`} onClick={() => pick(p)}>
              {p.label}
            </button>
          ))}
        </div>
      ) : (
        <div className="feedback ok">
          <strong>{mistakes === 0 ? "Fehlerfrei gelöst! 🏆" : `Geschafft mit ${mistakes} Fehler${mistakes === 1 ? "" : "n"}.`}</strong>{" "}
          Präge dir die Transaktionen und Buchungen ein – sie kommen in der Prüfung und im echten Projektalltag ständig vor.
          <button className="btn" onClick={restart}>Nochmal</button>
        </div>
      )}
    </div>
  );
}

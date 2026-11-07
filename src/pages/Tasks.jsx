import { useState } from "react";
import { MODULES } from "../data/modules.js";
import { DIFFICULTY, TASKS, TASK_TYPES } from "../data/tasks.js";
import { useProgress } from "../progress.jsx";
import { taskXp } from "./TaskPage.jsx";

export default function Tasks() {
  const { state } = useProgress();
  const [type, setType] = useState("alle");
  const [module, setModule] = useState("alle");
  const [hideDone, setHideDone] = useState(false);

  const list = TASKS.filter(
    (t) =>
      (type === "alle" || t.type === type) &&
      (module === "alle" || t.module === module) &&
      (!hideDone || !state.tasks[t.id]?.done)
  );
  const doneCount = TASKS.filter((t) => state.tasks[t.id]?.done).length;
  const usedModules = MODULES.filter((m) => TASKS.some((t) => t.module === m.id));

  return (
    <>
      <h1>Praxisaufgaben</h1>
      <p className="lead">
        Wende dein Wissen an wie im Job: Buchungssätze bilden, SAP-Masken ausfüllen, Support-Tickets lösen und ABAP-Code
        vervollständigen. {doneCount} von {TASKS.length} Aufgaben gelöst.
      </p>

      <div className="filters">
        <div className="chips">
          <button className={`chip ${type === "alle" ? "on" : ""}`} onClick={() => setType("alle")}>Alle Typen</button>
          {Object.entries(TASK_TYPES).map(([id, t]) => (
            <button key={id} className={`chip ${type === id ? "on" : ""}`} onClick={() => setType(id)}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
        <div className="filter-row">
          <label className="select" htmlFor="task-module">
            Modul:
            <select id="task-module" value={module} onChange={(e) => setModule(e.target.value)}>
              <option value="alle">Alle</option>
              {usedModules.map((m) => <option key={m.id} value={m.id}>{m.title}</option>)}
            </select>
          </label>
          <label className="check" htmlFor="task-hide">
            <input id="task-hide" type="checkbox" checked={hideDone} onChange={(e) => setHideDone(e.target.checked)} />
            Gelöste ausblenden
          </label>
        </div>
      </div>

      <div className="task-grid">
        {list.map((t) => {
          const done = state.tasks[t.id]?.done;
          const m = MODULES.find((x) => x.id === t.module);
          return (
            <a key={t.id} href={`#aufgabe--${t.id}`} className={`task-card ${done ? "done" : ""}`}>
              <div className="tc-top">
                <span className="type-badge">{TASK_TYPES[t.type].icon} {TASK_TYPES[t.type].label}</span>
                {done ? <span className="done-badge">✓ Gelöst</span> : <span className="xp-badge">+{taskXp(t)} XP</span>}
              </div>
              <h3>{t.title}</h3>
              <p>{t.scenario}</p>
              <div className="tc-foot">
                <span>{m?.icon} {m?.title}</span>
                <span className="diff" title={DIFFICULTY[t.difficulty]}>
                  {[1, 2, 3].map((n) => <i key={n} className={n <= t.difficulty ? "on" : ""} />)}
                  {DIFFICULTY[t.difficulty]}
                </span>
              </div>
            </a>
          );
        })}
      </div>
      {list.length === 0 && <div className="card center muted">Keine Aufgaben für diesen Filter.</div>}
    </>
  );
}

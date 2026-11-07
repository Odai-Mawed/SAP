import { useState } from "react";
import { MODULES } from "../data/modules.js";
import { DIFFICULTY, TASKS, TASK_BY_ID, TASK_TYPES } from "../data/tasks.js";
import { useProgress } from "../progress.jsx";
import { TASK_VIEWS } from "../components/TaskViews.jsx";
import PathNext from "../components/PathNext.jsx";
import NotFound from "./NotFound.jsx";

export const taskXp = (t) => 10 + t.difficulty * 20;

export default function TaskPage({ taskId }) {
  const task = TASK_BY_ID[taskId];
  const [run, setRun] = useState(0);
  if (!task) return <NotFound />;
  return <TaskRunner key={`${task.id}-${run}`} task={task} onRestart={() => setRun((r) => r + 1)} />;
}

function TaskRunner({ task, onRestart }) {
  const { state, completeTask } = useProgress();
  const V = TASK_VIEWS[task.type];
  const [value, setValue] = useState(() => V.init(task));
  const [result, setResult] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [reveal, setReveal] = useState(false);

  const solved = result?.ok;
  const locked = solved || reveal;
  const m = MODULES.find((x) => x.id === task.module);
  const wasDone = state.tasks[task.id]?.done;
  const ready = V.ready ? V.ready(task, value) : true;

  const idx = TASKS.indexOf(task);
  const nextTask = TASKS.slice(idx + 1).find((t) => !state.tasks[t.id]?.done) ?? TASKS[(idx + 1) % TASKS.length];

  function check() {
    const r = V.check(task, value);
    const n = attempts + 1;
    setAttempts(n);
    setResult(r);
    if (r.ok) completeTask(task.id, n, taskXp(task));
  }

  function change(v) {
    setValue(v);
    if (result && !result.ok) setResult(null);
  }

  const wrongCount = result && !result.ok ? Object.values(result.items).filter((x) => !x).length : 0;

  return (
    <article className="task-page">
      <a className="back" href="#aufgaben">← Alle Aufgaben</a>
      <header className="task-head">
        <div className="th-meta">
          <span className="type-badge">{TASK_TYPES[task.type].icon} {TASK_TYPES[task.type].label}</span>
          <span>{m?.icon} {m?.title}</span>
          <span>{DIFFICULTY[task.difficulty]}</span>
          {wasDone ? <span className="done-badge">✓ Bereits gelöst</span> : <span className="xp-badge">+{taskXp(task)} XP</span>}
        </div>
        <h1>{task.title}</h1>
      </header>

      <div className="scenario">
        <span className="scenario-label">Ausgangslage</span>
        <p>{task.scenario}</p>
      </div>

      <div className="card task-work">
        <V.View task={task} value={value} onChange={change} result={result} locked={locked} reveal={reveal} />

        {!locked && (
          <div className="task-actions">
            <button className="btn btn-lg" onClick={check} disabled={!ready}>Prüfen</button>
            {attempts > 0 && (
              <button className="btn ghost" onClick={() => { setReveal(true); setResult(V.check(task, value)); }}>
                Lösung anzeigen
              </button>
            )}
            {result && !result.ok && (
              <span className="task-msg bad">
                {wrongCount === 1 ? "Eine Angabe stimmt noch nicht." : `${wrongCount} Angaben stimmen noch nicht.`} Korrigiere die rot markierten Stellen.
              </span>
            )}
          </div>
        )}
      </div>

      {(solved || reveal) && (
        <div className={`card result-card ${solved ? "ok" : "revealed"}`}>
          <h3>
            {solved
              ? attempts === 1
                ? "Auf Anhieb richtig! 🏆"
                : `Gelöst im ${attempts}. Versuch 🎉`
              : "Lösung"}
          </h3>
          {V.Solution && <V.Solution task={task} />}
          {task.explain && <p>{task.explain}</p>}
          {!solved && <p className="muted">Versuch es gleich noch einmal ohne Hilfe, dann zählt die Aufgabe als gelöst.</p>}
          <div className="row">
            <button className="btn ghost" onClick={onRestart}>Nochmal üben</button>
            {nextTask && nextTask !== task && <a className="btn" href={`#aufgabe--${nextTask.id}`}>Nächste Aufgabe: {nextTask.title} →</a>}
          </div>
        </div>
      )}

      <PathNext compact />
    </article>
  );
}

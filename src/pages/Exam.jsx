import { useState } from "react";
import { MODULES } from "../data/modules.js";
import { useProgress } from "../progress.jsx";
import { shuffle } from "../utils.js";
import Quiz from "../components/Quiz.jsx";

const PASS = 70;
const COUNT = 20;

export default function Exam() {
  const { state, stats, recordExam } = useProgress();
  const [run, setRun] = useState(null); // { id, questions }
  const [modules, setModules] = useState(() => MODULES.map((m) => m.id));

  function start() {
    const all = MODULES.filter((m) => modules.includes(m.id)).flatMap((m) =>
      m.lessons.flatMap((l) => l.quiz.map((q) => ({ ...q, module: m.title })))
    );
    setRun({ id: Date.now(), questions: shuffle(all).slice(0, COUNT) });
  }

  const toggle = (id) => setModules((ms) => (ms.includes(id) ? ms.filter((x) => x !== id) : [...ms, id]));

  if (run) {
    return (
      <>
        <a className="back" href="#/pruefung" onClick={(e) => { e.preventDefault(); setRun(null); }}>← Prüfung verlassen</a>
        <Quiz
          key={run.id}
          title="Abschlussprüfung"
          questions={run.questions}
          passPct={PASS}
          onFinish={(score, total) => recordExam(Math.round((score / total) * 100))}
          onRestart={start}
        />
        {state.exam.passedAt && <Certificate date={state.exam.passedAt} best={state.exam.best} />}
      </>
    );
  }

  const available = MODULES.filter((m) => modules.includes(m.id)).reduce(
    (n, m) => n + m.lessons.reduce((k, l) => k + l.quiz.length, 0),
    0
  );

  return (
    <>
      <h1>Abschlussprüfung</h1>
      <p className="lead">
        {COUNT} zufällige Fragen aus den gewählten Modulen. Ab {PASS}% hast du bestanden und erhältst dein
        Lern-Zertifikat (+200 XP).
      </p>
      <div className="card">
        <h3>Module auswählen</h3>
        <div className="chips">
          {MODULES.map((m) => (
            <button key={m.id} className={`chip ${modules.includes(m.id) ? "on" : ""}`} onClick={() => toggle(m.id)}>
              {m.icon} {m.title}
            </button>
          ))}
        </div>
        <div className="row">
          <button className="btn btn-lg" onClick={start} disabled={available === 0}>
            Prüfung starten ({Math.min(COUNT, available)} Fragen)
          </button>
          <span className="muted">
            Lektionen abgeschlossen: {stats.doneLessons}/{stats.totalLessons}
            {state.exam.best != null && <> · Bestes Ergebnis: {state.exam.best}%</>}
          </span>
        </div>
      </div>
      {state.exam.passedAt && <Certificate date={state.exam.passedAt} best={state.exam.best} />}
    </>
  );
}

function Certificate({ date, best }) {
  return (
    <div className="certificate">
      <div className="cert-seal">🎓</div>
      <small>Lern-Zertifikat</small>
      <h2>SAP Lernpfad – Grundlagenprüfung bestanden</h2>
      <p>
        Bestanden am {new Date(date).toLocaleDateString("de-DE")} · Bestes Ergebnis {best}%
      </p>
      <em>Kein offizielles SAP-Zertifikat – aber ein toller erster Schritt Richtung SAP Certified Associate!</em>
    </div>
  );
}

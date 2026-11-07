import { useState } from "react";
import { MODULES } from "../data/modules.js";
import { useProgress } from "../progress.jsx";
import { lessonKey } from "../utils.js";
import Quiz from "../components/Quiz.jsx";
import PathNext from "../components/PathNext.jsx";
import NotFound from "./NotFound.jsx";

export default function LessonPage({ moduleId, lessonId }) {
  const m = MODULES.find((x) => x.id === moduleId);
  const l = m?.lessons.find((x) => x.id === lessonId);
  if (!m || !l) return <NotFound />;
  // key erzwingt frischen Zustand beim Wechsel der Lektion
  return <Lesson key={`${m.id}/${l.id}`} m={m} l={l} />;
}

function Lesson({ m, l }) {
  const { state, completeLesson } = useProgress();
  const [quizRun, setQuizRun] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [finished, setFinished] = useState(false);

  const key = lessonKey(m.id, l.id);
  const progress = state.lessons[key];
  const idx = m.lessons.indexOf(l);
  const prev = m.lessons[idx - 1];
  const next = m.lessons[idx + 1];
  const nextModule = !next ? MODULES[MODULES.indexOf(m) + 1] : null;

  return (
    <article className="lesson" style={{ "--accent": m.color }}>
      <a className="back" href={`#modul--${m.id}`}>← {m.icon} {m.title}</a>
      <header className="lesson-head">
        <small>Lektion {idx + 1} von {m.lessons.length} · ⏱ {l.minutes} Min</small>
        <h1>{l.title}</h1>
        {progress?.done && <span className="badge-done">✓ Abgeschlossen · Bestwert {progress.best}%</span>}
      </header>

      <div className="card lesson-body" dangerouslySetInnerHTML={{ __html: l.content }} />

      {!showQuiz ? (
        <div className="card cta">
          <div>
            <strong>Wissen testen</strong>
            <p>{l.quiz.length} Fragen zu dieser Lektion. Schließe das Quiz ab, um die Lektion abzuhaken und XP zu sammeln.</p>
          </div>
          <button className="btn btn-lg" onClick={() => setShowQuiz(true)}>Quiz starten</button>
        </div>
      ) : (
        <Quiz
          key={quizRun}
          title={`Quiz: ${l.title}`}
          questions={l.quiz}
          onFinish={(score, total) => {
            completeLesson(key, Math.round((score / total) * 100));
            setFinished(true);
          }}
          onRestart={() => {
            setQuizRun((r) => r + 1);
            setFinished(false);
          }}
        />
      )}

      <nav className={`lesson-nav ${finished ? "highlight" : ""}`}>
        {prev ? <a className="btn ghost" href={`#lektion--${m.id}--${prev.id}`}>← {prev.title}</a> : <span />}
        {next && <a className="btn" href={`#lektion--${m.id}--${next.id}`}>{next.title} →</a>}
        {!next && nextModule && (
          <a className="btn" href={`#modul--${nextModule.id}`}>Nächstes Modul: {nextModule.title} →</a>
        )}
        {!next && !nextModule && <a className="btn" href="#pruefung">Zur Abschlussprüfung →</a>}
      </nav>
      <PathNext compact />
    </article>
  );
}

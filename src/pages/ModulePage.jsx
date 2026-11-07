import { MODULES } from "../data/modules.js";
import { useProgress } from "../progress.jsx";
import { lessonKey } from "../utils.js";
import NotFound from "./NotFound.jsx";

export default function ModulePage({ moduleId }) {
  const { state } = useProgress();
  const m = MODULES.find((x) => x.id === moduleId);
  if (!m) return <NotFound />;

  return (
    <>
      <a className="back" href="#start">← Alle Module</a>
      <div className="module-head" style={{ "--accent": m.color }}>
        <span className="mh-icon">{m.icon}</span>
        <div>
          <span className={`level-tag lvl-${m.level}`}>{m.level}</span>
          <h1>{m.title}</h1>
          <p>{m.description}</p>
        </div>
      </div>
      <ol className="lesson-list">
        {m.lessons.map((l, i) => {
          const p = state.lessons[lessonKey(m.id, l.id)];
          return (
            <li key={l.id}>
              <a href={`#lektion--${m.id}--${l.id}`} className={p?.done ? "done" : ""}>
                <span className="ll-no">{p?.done ? "✓" : i + 1}</span>
                <span className="ll-title">
                  {l.title}
                  <small>⏱ {l.minutes} Min · {l.quiz.length} Quizfragen</small>
                </span>
                {p?.done && <span className="ll-score">{p.best}%</span>}
                <span className="ll-arrow">→</span>
              </a>
            </li>
          );
        })}
      </ol>
    </>
  );
}

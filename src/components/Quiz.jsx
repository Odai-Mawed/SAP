import { useMemo, useState } from "react";
import { shuffle } from "../utils.js";

/**
 * Multiple-Choice-Quiz. Mischt Antwortoptionen, zeigt sofort Feedback mit Erklärung
 * und meldet am Ende das Ergebnis über onFinish(richtig, gesamt).
 */
export default function Quiz({ questions, onFinish, onRestart, title = "Quiz", passPct }) {
  const prepared = useMemo(
    () =>
      questions.map((q) => {
        const opts = shuffle(q.options.map((text, i) => ({ text, correct: i === q.answer })));
        return { ...q, opts };
      }),
    [questions]
  );

  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState([]);
  const [done, setDone] = useState(false);

  const q = prepared[idx];

  function pick(i) {
    if (picked !== null) return;
    setPicked(i);
    if (q.opts[i].correct) setScore((s) => s + 1);
    else setWrong((w) => [...w, q]);
  }

  function next() {
    if (idx + 1 >= prepared.length) {
      setDone(true);
      onFinish?.(score, prepared.length);
    } else {
      setIdx(idx + 1);
      setPicked(null);
    }
  }

  if (done) {
    const pct = Math.round((score / prepared.length) * 100);
    const passed = passPct == null || pct >= passPct;
    return (
      <div className="card quiz-result">
        <div className="result-ring" style={{ "--p": pct }}>
          <span>{pct}%</span>
        </div>
        <h3>
          {pct === 100 ? "Perfekt! 🏆" : passed ? "Gut gemacht! 🎉" : "Weiter üben! 💪"}
        </h3>
        <p>
          {score} von {prepared.length} Fragen richtig
          {passPct != null && <> · Bestehensgrenze {passPct}%</>}
        </p>
        {wrong.length > 0 && (
          <div className="review">
            <h4>Das solltest du wiederholen:</h4>
            {wrong.map((w, i) => (
              <div key={i} className="review-item">
                <strong>{w.q}</strong>
                <span>✅ {w.options[w.answer]}</span>
                {w.explain && <small>{w.explain}</small>}
              </div>
            ))}
          </div>
        )}
        {onRestart && (
          <button className="btn" onClick={onRestart}>
            Nochmal versuchen
          </button>
        )}
      </div>
    );
  }

  const correctIdx = q.opts.findIndex((o) => o.correct);

  return (
    <div className="card quiz">
      <div className="quiz-head">
        <span className="quiz-title">{title}</span>
        <span className="quiz-count">
          Frage {idx + 1} / {prepared.length}
        </span>
      </div>
      <div className="bar">
        <div style={{ width: `${(idx / prepared.length) * 100}%` }} />
      </div>
      <h3 className="quiz-q">{q.q}</h3>
      <div className="options">
        {q.opts.map((o, i) => {
          let cls = "option";
          if (picked !== null) {
            if (i === correctIdx) cls += " correct";
            else if (i === picked) cls += " wrong";
            else cls += " dim";
          }
          return (
            <button key={i} className={cls} onClick={() => pick(i)} disabled={picked !== null}>
              <span className="opt-letter">{String.fromCharCode(65 + i)}</span>
              {o.text}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className={`feedback ${q.opts[picked].correct ? "ok" : "bad"}`}>
          <strong>{q.opts[picked].correct ? "Richtig!" : "Leider falsch."}</strong> {q.explain}
          <button className="btn" onClick={next} autoFocus>
            {idx + 1 >= prepared.length ? "Auswertung" : "Weiter →"}
          </button>
        </div>
      )}
    </div>
  );
}

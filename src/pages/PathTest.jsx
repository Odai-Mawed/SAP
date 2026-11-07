import { useState } from "react";
import { PATH_BY_ID } from "../data/paths.js";
import { PATH_TEST_PASS, pathQuestions } from "../pathLogic.js";
import { useProgress } from "../progress.jsx";
import { shuffle } from "../utils.js";
import Quiz from "../components/Quiz.jsx";
import PathNext from "../components/PathNext.jsx";
import NotFound from "./NotFound.jsx";

export default function PathTest({ pathId }) {
  const { state, recordPathTest } = useProgress();
  const path = PATH_BY_ID[pathId];
  const [run, setRun] = useState(() => ({ id: 1, qs: path ? shuffle(pathQuestions(path)).slice(0, 10) : [] }));
  const [finished, setFinished] = useState(false);
  if (!path) return <NotFound />;

  const best = state.pathTests[path.id];

  return (
    <div style={{ "--accent": path.color }}>
      <a className="back" href={`#pfad--${path.id}`}>← {path.icon} {path.title}</a>
      <h1>Abschlusstest: {path.title}</h1>
      <p className="lead">
        {run.qs.length} Fragen aus den Lektionen dieses Pfads. Ab {PATH_TEST_PASS}% ist der Pfad abgeschlossen.
        {best != null && <> Bisher bestes Ergebnis: {best}%.</>}
      </p>
      <Quiz
        key={run.id}
        title={`Abschlusstest ${path.title}`}
        questions={run.qs}
        passPct={PATH_TEST_PASS}
        onFinish={(score, total) => {
          recordPathTest(path.id, Math.round((score / total) * 100));
          setFinished(true);
        }}
        onRestart={() => {
          setRun((r) => ({ id: r.id + 1, qs: shuffle(pathQuestions(path)).slice(0, 10) }));
          setFinished(false);
        }}
      />
      {finished && <PathNext />}
    </div>
  );
}

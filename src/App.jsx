import { useRoute } from "./router.js";
import { useProgress } from "./progress.jsx";
import Home from "./pages/Home.jsx";
import ModulePage from "./pages/ModulePage.jsx";
import LessonPage from "./pages/LessonPage.jsx";
import TcodeTrainer from "./pages/TcodeTrainer.jsx";
import Processes from "./pages/Processes.jsx";
import Glossary from "./pages/Glossary.jsx";
import Exam from "./pages/Exam.jsx";

const NAV = [
  { path: "", label: "Start", icon: "🏠" },
  { path: "tcodes", label: "T-Code-Trainer", icon: "⌨️" },
  { path: "prozesse", label: "Prozesse", icon: "🔗" },
  { path: "glossar", label: "Glossar", icon: "📖" },
  { path: "pruefung", label: "Prüfung", icon: "🎓" }
];

export default function App() {
  const route = useRoute();
  const { state, stats, toggleTheme } = useProgress();
  const [page, a, b] = route;

  let content;
  switch (page) {
    case "modul":
      content = <ModulePage moduleId={a} />;
      break;
    case "lektion":
      content = <LessonPage moduleId={a} lessonId={b} />;
      break;
    case "tcodes":
      content = <TcodeTrainer />;
      break;
    case "prozesse":
      content = <Processes />;
      break;
    case "glossar":
      content = <Glossary />;
      break;
    case "pruefung":
      content = <Exam />;
      break;
    default:
      content = <Home />;
  }

  const activeNav = page === "modul" || page === "lektion" ? "" : page ?? "";

  return (
    <div className="app">
      <header className="topbar">
        <a className="brand" href="#start">
          <span className="brand-logo">SAP</span>
          <span className="brand-name">Lernpfad</span>
        </a>
        <nav className="nav">
          {NAV.map((n) => (
            <a key={n.path} href={`#${n.path || "start"}`} className={activeNav === n.path ? "active" : ""}>
              <span className="nav-icon" aria-hidden="true">{n.icon}</span>
              <span className="nav-label">{n.label}</span>
            </a>
          ))}
        </nav>
        <div className="topbar-right">
          <span className="xp-pill" title={`Level ${stats.levelNo}: ${stats.level}`}>⭐ {state.xp} XP</span>
          <button className="icon-btn" onClick={toggleTheme} aria-label="Hell/Dunkel umschalten">🌓</button>
        </div>
      </header>
      <main className="main">{content}</main>
      <footer className="footer">
        SAP Lernpfad – ein inoffizielles Lernprojekt. SAP, S/4HANA, Fiori und ABAP sind Marken der SAP SE.
      </footer>
    </div>
  );
}
